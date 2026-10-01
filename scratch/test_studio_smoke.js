// Headless smoke test: loads docs/app.js with a stubbed DOM and asserts the
// WC C# exporters run clean with zero shield output (GVK is a shieldless server).
// Run: node scratch/test_studio_smoke.js
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { root, docs, loadStudio, makeChecker, readData } = require('./studio_harness.js');
const { check, done } = makeChecker();

const appSource = fs.readFileSync(docs('app.js'), 'utf8');
const htmlSource = fs.readFileSync(docs('index.html'), 'utf8');
// Exporter checks run on hand-built fixtures first, so the bundled data is injected later
const studio = loadStudio({ data: false });
const sandbox = studio.sandbox;

// Static checks on tool sources (bundled data intentionally keeps WC shield fields)
check('docs/app.js has no shield code paths',
  !/dsShield|ShieldHitDraw|ShieldHitSound|HitPlayShield|DamageToShields|damageToShields|shieldHitDraw|shieldHitSound|hitPlayShield/.test(appSource));
check('docs/index.html has no shield UI', !/shield/i.test(htmlSource));

// Dynamic checks: exercise the exporters inside app.js's shared script scope
const testBody = `
(() => {
  activeAmmo = {
    name: 'LargeCalibreAmmo', ammoRound: 'LargeCalibreAmmo',
    ammoMagazine: 'LargeCalibreAmmo', terminalName: '155 AP',
    baseDamage: 6000, mass: 300,
    damageScales: { lightArmor: 0.5, heavyArmor: 3.0, characters: 0.25, nonArmor: 1.0 },
    fragment: null,
    areaOfDamage: { enable: false, endOfLife: { enable: false }, areaEffect: { areaEffect: false } },
    trajectory: { desiredSpeed: 600, maxTrajectory: 2400 }
  };
  activeWeapon = {
    id: 'SmokeTest', name: 'Smoke Test', subtypeId: 'SmokeTest', partName: 'Smoke Test',
    type: 'Fixed', gridSize: 'Large', assignedAmmos: ['LargeCalibreAmmo'],
    extendedTags: {}, components: []
  };
  document.getElementById('aAmmoRound').value = 'LargeCalibreAmmo';
  document.getElementById('aAmmoMagazine').value = 'LargeCalibreAmmo';
  document.getElementById('aTerminalName').value = '155 AP';
  document.getElementById('aBaseDamage').value = '6000';
  document.getElementById('aShape').value = 'LineShape';
  document.getElementById('tGuidance').value = 'None';
  document.getElementById('dsLightArmor').value = '0.5';
  document.getElementById('dsHeavyArmor').value = '3.0';
  document.getElementById('dsNonArmor').value = '1.0';
  document.getElementById('dsDamageType').value = 'BaseDamage';
  document.getElementById('wSubtypeId').value = 'SmokeTest';
  document.getElementById('wPartName').value = 'Smoke Test';
  document.getElementById('wMuzzles').value = 'muzzle_1';

  const ammoCs = generateCSharpAmmo();
  const weaponCs = generateCSharpWeapon();
  const sbcXml = generateSbcCubeBlocks();
  const dmg = getAmmoDamageDetailed(activeAmmo);
  const prof155 = getTopArmorProfile(activeAmmo.damageScales);
  const eff155 = Math.round(1000 * prof155.mult);

  // Overmatch scenario: Heavy Railgun (1M base, 20k/block cap)
  activeAmmo = {
    name: 'HeavyRailgunAmmo', ammoRound: 'HeavyRailgunAmmo',
    ammoMagazine: 'Energy', terminalName: 'Heavy Railgun',
    baseDamage: 1000000, baseDamageCutoff: 20000, mass: 4000,
    damageScales: { lightArmor: 0.5, heavyArmor: 3.0, characters: 0.25, nonArmor: 1.0 },
    fragment: null,
    areaOfDamage: { enable: false, endOfLife: { enable: false }, areaEffect: { areaEffect: false } },
    trajectory: { desiredSpeed: 400, maxTrajectory: 1000 }
  };
  const rgDmg = getAmmoDamageDetailed(activeAmmo);
  const rgAmmoCs = generateCSharpAmmo();
  const profRg = getTopArmorProfile(activeAmmo.damageScales);
  const effRg = Math.round(100000 * profRg.mult);
  const profNa = getTopArmorProfile({ heavyArmor: 0.5, lightArmor: 0.5, nonArmor: 2.0 });
  const profAll = getTopArmorProfile({ heavyArmor: 1.0, lightArmor: 1.0, nonArmor: 1.0 });

  __report({
    ammoCsLength: ammoCs.length,
    ammoCsShieldFree: !/shield/i.test(ammoCs) || /Shield/.test(JSON.stringify(BUNDLED_WC_DEFS.ammos.LargeCalibreAmmo.tree)),
    ammoCsHasDamageScales: ammoCs.includes('DamageScales'),
    ammoCsRoundTrip: JSON.stringify(window.SourcePipeline.parseAll({ 'x.cs': ammoCs }).defs.LargeCalibreAmmo.value)
      === JSON.stringify(BUNDLED_WC_DEFS.ammos.LargeCalibreAmmo.tree),
    weaponCsShieldFree: !/shield/i.test(weaponCs),
    sbcXmlShieldFree: !/shield/i.test(sbcXml),
    dmgTotal: dmg.total,
    dmgBase: dmg.base,
    eff155: eff155,
    prof155Label: prof155.label,
    prof155Mult: prof155.mult,
    effRg: effRg,
    profRgLabel: profRg.label,
    profNaLabel: profNa.label,
    profNaMult: profNa.mult,
    profAllLabel: profAll.label,
    rgPerBlock: rgDmg.perBlockBase,
    rgPenBlocks: rgDmg.penBlocks,
    rgShieldFree: !/shield/i.test(rgAmmoCs) || /Shield/.test(JSON.stringify((BUNDLED_WC_DEFS.ammos.HeavyRailgunAmmo || {}).tree))
  });
})();
`;

let report = null;
sandbox.__report = (r) => { report = r; };

studio.run(testBody);

check('WC AmmoDef exporter runs without throwing (no phantom dsShield reference)', report !== null && report.ammoCsLength > 100);
check('AmmoDef export contains DamageScales block', report.ammoCsHasDamageScales);
check('AmmoDef export round-trips the full LargeCalibreAmmo def tree', report.ammoCsRoundTrip);
check('AmmoDef export adds no shield tags beyond the source def', report.ammoCsShieldFree);
check('WeaponDef export emits zero shield tags', report.weaponCsShieldFree);
check('SBC export emits zero shield tags', report.sbcXmlShieldFree);
check('recursive damage total resolves (6000 base)', report.dmgTotal === 6000);
check('155 AP best-fit = Heavy Armor ×3.0 (1000 paper → 3000 eff)', report.eff155 === 3000 && report.prof155Label === 'Heavy Armor' && report.prof155Mult === 3.0);
check('Heavy Railgun peak ideal = ×3.0 on full payload (100k → 300k, cap not diluting)', report.effRg === 300000 && report.profRgLabel === 'Heavy Armor');
check('Non-Armor winner detected (×2.0)', report.profNaLabel === 'Non-Armor (Systems)' && report.profNaMult === 2.0);
check('all-equal multipliers report All Blocks', report.profAllLabel === 'All Blocks');
check('Heavy Railgun per-block cap = 20000 hp', report.rgPerBlock === 20000);
check('Heavy Railgun penetration capacity = 50 blocks', report.rgPenBlocks === 50);
check('Railgun export adds no shield tags beyond the source def', report.rgShieldFree);

// Dynamic lifecycle checks: populate datasets and verify weapon selection + metrics
sandbox.__injectedWeapons = readData('data/weapons_db.json');
sandbox.__injectedAmmos = readData('data/ammos_db.json');
sandbox.__injectedMags = readData('data/magazines_blueprints_data.js');

let lcReport = null;
sandbox.__lifecycleReport = (r) => { lcReport = r; };

studio.run(`
  weaponsDb = __injectedWeapons;
  ammosDb = __injectedAmmos;
  magazinesBlueprintsDb = __injectedMags;
  activeWeapon = null;
  activeAmmo = null;

  refreshAfterDataLoad();
  const defaultW = activeWeapon;
  const defaultA = activeAmmo;
  const defaultSelVal = document.getElementById('weaponSelect').value;
  const avengerMetrics = calculateWeaponMetrics(defaultW);

  // Select Tsunami (Cyclone Cannon)
  const tsunami = weaponsDb.find(w => w.subtypeId === 'ARYXCycloneCannon');
  selectWeapon(tsunami.id);
  const tsuW = activeWeapon;
  const tsuA = activeAmmo;
  const tsuMetrics = calculateWeaponMetrics(tsuW);

  // Select Hurricane
  const hurricane = weaponsDb.find(w => w.subtypeId === 'ARYXHurricaneCannon');
  selectWeapon(hurricane.id);
  const hurW = activeWeapon;
  const hurA = activeAmmo;
  const hurMetrics = calculateWeaponMetrics(hurW);

  // Check Khopesh & Thrasher metrics
  const khoW = weaponsDb.find(w => w.subtypeId === 'KhopeshTurret');
  const khoMetrics = calculateWeaponMetrics(khoW);
  const thrW = weaponsDb.find(w => w.subtypeId === 'ARYXHeavyFlakTurret');
  const thrMetrics = calculateWeaponMetrics(thrW);

  // Check selectable ammos for Avenger
  const avengerSelectable = getSelectableAmmos(defaultW);

  // Check weapon icons
  let missingIcons = 0;
  for (const w of weaponsDb) {
    const iconPath = getWeaponIconUrl(w);
    if (!iconPath || !iconPath.startsWith('icons/')) missingIcons++;
  }

  __lifecycleReport({
    defaultWeaponId: defaultW && defaultW.id,
    defaultSelectVal: defaultSelVal,
    defaultAmmoRound: defaultA && defaultA.ammoRound,
    avengerSelectableCount: avengerSelectable.length,
    avengerSelectableFirst: avengerSelectable[0],
    avengerEffectiveDps: avengerMetrics.effectiveDps,
    avengerAlpha: avengerMetrics.effectiveAlphaVolley,
    tsuAmmoRound: tsuA && tsuA.ammoRound,
    tsuEffectiveDps: tsuMetrics.effectiveDps,
    tsuAlpha: tsuMetrics.effectiveAlphaVolley,
    tsuArmorMult: getTopArmorProfile(tsuA.damageScales).mult,
    hurAmmoRound: hurA && hurA.ammoRound,
    hurAlphaVolley: hurMetrics.alphaVolley,
    hurSustainedDps: hurMetrics.sustainedDps,
    hurEffectiveDps: hurMetrics.effectiveDps,
    hurAlpha: hurMetrics.effectiveAlphaVolley,
    hurArmorMult: getTopArmorProfile(hurA.damageScales).mult,
    khoRof: khoW && khoW.rateOfFire,
    khoDps: khoMetrics.sustainedDps,
    thrRof: thrW && thrW.rateOfFire,
    thrDps: thrMetrics.sustainedDps,
    missingIcons,

    // Energy Virtual Magazine checks
    hLaserMagSize: getShotsPerMag(weaponsDb.find(w => w.subtypeId === 'MA_T2PDX'), ammosDb['Lasers_Laser_Large']),
    hLaserAlpha: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'MA_T2PDX')).alphaVolley,
    spartanMagSize: getShotsPerMag(weaponsDb.find(w => w.subtypeId === 'ARYXSpartanTurret'), ammosDb['Lasers_Laser_Dual']),
    spartanAlpha: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'ARYXSpartanTurret')).alphaVolley,
    hLaserDps: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'MA_T2PDX')).sustainedDps,
    spartanDps: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'ARYXSpartanTurret')).sustainedDps,
    tsuDps: tsuMetrics.sustainedDps,
    hudBench: (() => {
      selectWeapon(weaponsDb.find(w => w.subtypeId === 'ARYXSpartanTurret').id);
      benchmarkWeapon = weaponsDb.find(w => w.subtypeId === 'MA_T2PDX');
      benchmarkAmmoKey = getSelectableAmmos(benchmarkWeapon)[0];
      updateCombatTelemetry();
      updateComparisonRadar();
      const out = {
        chip: document.getElementById('hudTelBench').textContent,
        range: document.getElementById('hudTelRange').textContent,
        cycle: document.getElementById('hudTelCycle').textContent,
        expectRange: Math.round(activeWeapon.maxTargetDistance).toLocaleString() + ' m'
      };
      selectWeapon(hurW.id); // later checks expect Hurricane selected
      return out;
    })(),
    railDps: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'ARYXRailgunTurret')).sustainedDps,
    railShotDmg: (() => { const w = weaponsDb.find(x => x.subtypeId === 'ARYXRailgunTurret'); return getAmmoDamageDetailed(ammosDb[getSelectableAmmos(w)[0] || w.ammoName]).total; })(),
    burstCycle: computeFireCycle({ rof: 480, barrels: 1, trajPerBarrel: 1, magSize: 18, mags: 1, reloadTicks: 410, shotsInBurst: 9, delayAfterBurst: 380, energy: false }),
    shotDelayCycle: computeFireCycle({ rof: 480, barrels: 1, trajPerBarrel: 1, magSize: 4, mags: 1, reloadTicks: 100, shotsInBurst: 9, delayAfterBurst: 380, energy: false }),
    derivedEnergyMag: getShotsPerMag({ reloadTime: 120, rateOfFire: 60, barrelsPerShot: 2, trajectilesPerBarrel: 1 }, { ammoMagazine: 'Energy', energyMagazineSize: 0, energyCost: 0.5, baseDamage: 1000 }),
    cutScaleHeavy: getCutoffArmorScale({ damageScales: { cutoffArmorArmor: -1, cutoffLightArmor: 2, cutoffHeavyArmor: 0.5, cutoffNonArmor: -1 } }, 'heavy'),
    cutScaleNon: getCutoffArmorScale({ damageScales: { cutoffArmorArmor: -1, cutoffLightArmor: 2, cutoffHeavyArmor: 0.5, cutoffNonArmor: -1 } }, 'nonArmor'),
    cutScaleOff: getCutoffArmorScale({ damageScales: { cutoffArmorArmor: -1, cutoffLightArmor: -1, cutoffHeavyArmor: -1, cutoffNonArmor: -1 } }, 'heavy'),
    cycloneDps: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'GVK_CycloneCannonTurret')).sustainedDps,
    harbMagSize: getShotsPerMag(weaponsDb.find(w => w.subtypeId === 'HarbingerTurret_NPC'), ammosDb['HeavyRailgunAmmo']),
    harbAlpha: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'HarbingerTurret_NPC')).alphaVolley,
    pdMagSize: getShotsPerMag(weaponsDb.find(w => w.subtypeId === 'MA_PDT'), ammosDb['Lasers_AMS']),
    pdAlpha: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'MA_PDT')).alphaVolley,
    hurWId: hurW.id,
    workbenchSelectVal: document.getElementById('weaponSelectWorkbench').value,
    bannerDisplayWorkbench: (() => { switchWorkspace('ws-workbench'); return document.getElementById('weaponBanner').style.display; })(),
    bannerDisplayTelemetry: (() => { switchWorkspace('ws-telemetry'); return document.getElementById('weaponBanner').style.display; })(),
    pdWeaponsCount: weaponsDb.filter(w => w.pdProjectiles).length,
    npcSbcXml: (() => {
      const npcw = weaponsDb.find(w => w.subtypeId.includes('NPC') && w.components.some(c => c.name.includes('Prototech')));
      if (!npcw) return '';
      selectWeapon(npcw.id);
      return generateSbcCubeBlocks();
    })(),
    playerSbcXml: (() => {
      const plrw = weaponsDb.find(w => !w.subtypeId.includes('NPC') && w.components.some(c => c.name.includes('Prototech')));
      if (!plrw) return '';
      selectWeapon(plrw.id);
      return generateSbcCubeBlocks();
    })(),
  });
`);

check('Default weapon dropdown matches activeWeapon (no desync)', lcReport.defaultWeaponId === lcReport.defaultSelectVal);
check('Default weapon has primary ammo NATO_25x184mm_Dual', lcReport.defaultAmmoRound === 'NATO_25x184mm_Dual');
check('Avenger has only 1 selectable ammo (no NATO 25mm [Energy] fragment)',
  lcReport.avengerSelectableCount === 1 && lcReport.avengerSelectableFirst === 'NATO_25x184mm_Dual');
check('Avenger has non-zero effective DPS', lcReport.avengerEffectiveDps > 0);
check('Avenger has non-zero alpha volley', lcReport.avengerAlpha > 0);
check('Tsunami selects LargeCalibreAmmo (155 AP)', lcReport.tsuAmmoRound === 'LargeCalibreAmmo');
check('Tsunami has non-zero effective DPS', lcReport.tsuEffectiveDps > 0);
check('Tsunami has non-zero alpha volley', lcReport.tsuAlpha > 0);
check('Tsunami has 3.0x heavy armor multiplier', lcReport.tsuArmorMult === 3.0);
check('Hurricane selects Ballistics_HeavyCannon (480mm)', lcReport.hurAmmoRound === 'Ballistics_HeavyCannon');
check('Hurricane alpha volley reflects loaded magazines capacity (2 rds * 80k = 160,000 hp)', lcReport.hurAlphaVolley === 160000);
check('Hurricane sustained DPS reflects 80k payload (> 14,000 DPS)', lcReport.hurSustainedDps > 14000);
check('Hurricane has 2.0x heavy armor multiplier', lcReport.hurArmorMult === 2.0);
check('Khopesh has inlined rateOfFire 360 RPM', lcReport.khoRof === 360);
check('Thrasher has rateOfFire 480 RPM', lcReport.thrRof === 480);
check('Thrasher sustained DPS (~4500) > Khopesh sustained DPS (~2400)', lcReport.thrDps > lcReport.khoDps);
check('All weapon icons resolve to icons/ paths (0 missing)', lcReport.missingIcons === 0);

// Energy Virtual Magazine & Continuous Energy checks
check('Heavy Laser resolves 240-rd virtual magazine', lcReport.hLaserMagSize === 240);
check('Heavy Laser alpha volley spans 240-rd burst (36,000 hp)', lcReport.hLaserAlpha === 36000);
check('Spartan Turret resolves 480-rd virtual magazine', lcReport.spartanMagSize === 480);
check('Spartan Turret alpha volley spans 480-rd burst (72,000 hp)', lcReport.spartanAlpha === 72000);
// WC: 240 shots span 239 ticks; the reload starts the tick after the last shot and needs 241 charge passes -> 481-tick cycle
check('Heavy Laser sustained DPS is 4,491 (240 rds x 150 hp per 481-tick WC cycle)', lcReport.hLaserDps === Math.round(36000 * 60 / 481));
check('Spartan sustained DPS is 2x Heavy Laser (8,981)', lcReport.spartanDps === Math.round(72000 * 60 / 481));
check('Tsunami sustained DPS within 2% of Cyclone', Math.abs(lcReport.tsuDps / lcReport.cycloneDps - 1) < 0.02);
check('Footer benchmark chip: Spartan vs Heavy Laser = +100% DPS', lcReport.hudBench.chip.includes('+100% DPS'));
check('Footer range is targeting range, not projectile travel', lcReport.hudBench.range === lcReport.hudBench.expectRange);
check('Footer cycle shows fire / reload (no leftover Overheat)', /s fire \/ .*s reload/.test(lcReport.hudBench.cycle));
const hudHtml = htmlSource.slice(htmlSource.indexOf('id="stickyHudBar"'), htmlSource.indexOf('<!-- Code Generation Modal'));
check('Footer has no Overheat label', !/Overheat/i.test(hudHtml));
check('Footer has telemetry, workbench and logistics groups',
  ['ws-telemetry', 'ws-workbench', 'ws-logistics'].every(ws => hudHtml.includes(`data-hud="${ws}"`)));
check('Export Code & SBC lives in the Workbench footer group',
  hudHtml.indexOf('id="btnHudExport"') > hudHtml.indexOf('data-hud="ws-workbench"') && hudHtml.indexOf('id="btnHudExport"') < hudHtml.indexOf('data-hud="ws-logistics"'));
const wbHtml = htmlSource.slice(htmlSource.indexOf('id="ws-workbench"'), htmlSource.indexOf('id="ws-logistics"'));
check('Export Snapshots moved into the Workbench tab', wbHtml.includes('id="btnExportSnapshots"') && !hudHtml.includes('btnExportSnapshots'));
check('ARYX Railgun cycle includes DelayUntilFire spool (120 + 1 + 600 ticks = 721)', lcReport.railDps === Math.round(lcReport.railShotDmg * 60 / 721));
check('Burst mode: 2x9 shots, 380-tick burst gap, reload starts after the final shot (903 ticks)',
  Math.round(lcReport.burstCycle.totalCycleSec * 60) === 903 && lcReport.burstCycle.bursts === 2);
check('Shot-delay mode: ShotsFired carries across 4-rd mags, so every 9th shot waits 380 ticks (2,436 ticks per 9 mags)',
  Math.round(lcReport.shotDelayCycle.totalCycleSec * 60 * 9) === 2436);
check('Energy mag derived from power x ReloadTime in float32 like WC (2,000.0002 -> 2,001)', lcReport.derivedEnergyMag === 2001);
check('ArmorForCutoff scales cap vs heavy armor (0.5x), leaves -1 classes unchanged',
  lcReport.cutScaleHeavy === 0.5 && lcReport.cutScaleNon === 1 && lcReport.cutScaleOff === 1);
check('Harbinger Railgun resolves 1-rd energy magazine (1,000,000 hp)', lcReport.harbMagSize === 1 && lcReport.harbAlpha === 1000000);
check('Point Defense Laser (continuous, no virtual mag) resolves 1 round (100 hp, NOT 10,000 hp fallback)', lcReport.pdMagSize === 1 && lcReport.pdAlpha === 100);

check('Definition Workbench hides weaponBanner', lcReport.bannerDisplayWorkbench === 'none');
check('Combat Telemetry displays weaponBanner', lcReport.bannerDisplayTelemetry === 'flex');
check('Tuning Weapon dropdown matches activeWeapon', lcReport.workbenchSelectVal === lcReport.hurWId);
check('Point defense weapons count is exactly 26 (turreted smart ammo hunters only, no fixed mounts)', lcReport.pdWeaponsCount === 26);

// Definition Workbench cleanup checks
check('Upgrade button removed from workbench scope bar', !htmlSource.includes('id="btnNewMinimalUpgrade"'));
check('Duplicate Export button removed from workbench scope bar', !htmlSource.includes('id="btnOpenCodeWorkbench"'));
check('Auto-Assign NPC Tech Scrap button exists in SBC table', htmlSource.includes('id="btnAutoNpcScrap"'));
check('Apply Scrap Yield Multiplier button exists in SBC table', htmlSource.includes('id="btnApplyScrapYield"'));
check('Scrap Yield badge exists in SBC table', htmlSource.includes('id="sbcScrapYieldBadge"'));

// SBC Component Scrap & DeconstructId checks
check('NPC weapon SBC XML outputs <DeconstructId> for tech components',
  lcReport.npcSbcXml.includes('<DeconstructId>') && lcReport.npcSbcXml.includes('<TypeId>Ore</TypeId>') && lcReport.npcSbcXml.includes('Scrap</SubtypeId>'));
check('Player weapon SBC XML does not output <DeconstructId>', !lcReport.playerSbcXml.includes('<DeconstructId>'));

// Commit date format check (mm.dd.yyyy)
const sourceLiveContent = fs.readFileSync(path.join(root, 'docs', 'source_live.js'), 'utf8');
const dateRegexMatch = sourceLiveContent.includes("d.getUTCFullYear()") && sourceLiveContent.includes("${mm}.${dd}.${yyyy}");
check('source_live.js formats commit date as mm.dd.yyyy', dateRegexMatch);

// WeaponCore schema guard + new WC definition fields
const SP = require(path.join(root, 'docs', 'source_pipeline.js'));
const schemaSandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'docs', 'data', 'wc_schema.js'), 'utf8'), schemaSandbox);
const bundledSchema = schemaSandbox.window.GVK_WC_SCHEMA;
const liveSchema = SP.extractWcSchema(fs.readFileSync(path.join(root, 'CoreParts', 'script', 'Structure.cs'), 'utf8'));
check('Bundled wc_schema.js matches Structure.cs (re-run export_snapshots.js after syncing WC)',
  SP.diffWcSchema(bundledSchema, liveSchema).length === 0 && !!bundledSchema.upstream);
check('Schema diff flags added WC fields', SP.diffWcSchema(
  { enums: {}, structs: { TargetingDef: {} } }, { enums: {}, structs: { TargetingDef: { ValidControlModes: 'ControlModes[]' } } }
).includes('+ TargetingDef.ValidControlModes : ControlModes[]'));
const wcFieldSrc = `namespace Scripts { partial class Parts {
 private AmmoDef CutAmmo => new AmmoDef { AmmoRound = "CutAmmo", BaseDamage = 1000f, BaseDamageCutoff = 200f,
   DamageScales = new DamageScaleDef { ArmorForCutoff = new ArmorDef { Armor = -1f, Heavy = 0.5f, Light = 2f }, GridSizeForCutoff = new GridSizeDef { Large = 1.5f } } };
 WeaponDefinition CtrlW => new WeaponDefinition { Assignments = new ModelAssignmentsDef { MountPoints = new[] { new MountPointDef { SubtypeId = "CtrlW" } } },
   Targeting = new TargetingDef { ValidControlModes = new[] { ControlModes.Automatic, ControlModes.Painter } },
   HardPoint = new HardPointDef { PartName = "C", Loading = new LoadingDef { RateOfFire = 60 } }, Ammos = new[] { CutAmmo } };
}}`;
const wcParsed = SP.parseAll({ 'T.cs': wcFieldSrc });
const cutDs = SP.ammoShape('CutAmmo', wcParsed.ammos.CutAmmo.def, 'T.cs').damageScales;
check('Pipeline parses ArmorForCutoff (omitted field = 0, like C#) and GridSizeForCutoff',
  cutDs.cutoffHeavyArmor === 0.5 && cutDs.cutoffLightArmor === 2 && cutDs.cutoffNonArmor === 0 && cutDs.cutoffGridLarge === 1.5 && cutDs.cutoffGridSmall === -1);
const ctrlEntry = SP.weaponEntry(wcParsed.weapons[0], 'CtrlW', 0, null, {}, wcParsed.defs, {}, {});
check('Pipeline parses Targeting.ValidControlModes', ctrlEntry.validControlModes.join(',') === 'Automatic,Painter');

// Curated workbench bindings: every path exists in Structure.cs, every element exists, enum <select>s only offer WC members
const wcTypesLive = SP.extractWcTypes(fs.readFileSync(path.join(root, 'CoreParts', 'script', 'Structure.cs'), 'utf8'));
const editorSrc = fs.readFileSync(path.join(root, 'docs', 'wc_editor.js'), 'utf8');
const bindingProblems = [];
for (const m of editorSrc.matchAll(/\['(ammo|weapon)', '(\w+)', '([\w.#]+)', '(\w+)(?::\w+)?'/g)) {
  const [, kind, id, bpath, mode] = m;
  let t = SP.wcRootType(wcTypesLive, kind);
  for (const k of bpath.split('.')) t = t && (k === '#' ? SP.wcElemType(t) : SP.wcFieldType(wcTypesLive, t, k));
  if (!t) { bindingProblems.push(id + ' -> ' + bpath); continue; }
  if (!htmlSource.includes('id="' + id + '"')) bindingProblems.push(id + ' (no element)');
  if (mode === 'enum') {
    const at = htmlSource.indexOf('<select id="' + id + '"');
    const opts = [...htmlSource.slice(at, htmlSource.indexOf('</select>', at)).matchAll(/value="([^"]*)"/g)].map((x) => x[1]);
    if (!opts.length || opts.some((o) => !t.members.includes(o))) bindingProblems.push(id + ' options ' + opts.join('|'));
  }
}
check('Workbench bindings map to real Structure.cs fields and WC enum members', bindingProblems.length === 0);
if (bindingProblems.length) console.error('    ' + bindingProblems.join('\n    '));

// Full-tree export: every def round-trips through the studio exporter; curated + field edits land in the tree
let rtReport = null;
sandbox.__rtReport = (r) => { rtReport = r; };
studio.run(`
  (() => {
    const SPx = window.SourcePipeline;
    const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const lost = [];
    for (const k of Object.keys(ammosDb)) {
      selectAmmo(k);
      const back = SPx.parseAll({ 'x.cs': generateCSharpAmmo() }).defs[k];
      if (!back || !same(back.value, BUNDLED_WC_DEFS.ammos[k].tree)) lost.push(k);
    }
    const seen = new Set();
    for (const w of weaponsDb) {
      if (!w.defName || seen.has(w.defName)) continue;
      seen.add(w.defName);
      selectWeapon(w.id);
      const back = SPx.parseAll({ 'x.cs': generateCSharpWeapon() }).defs[w.defName];
      if (!back || !same(back.value, BUNDLED_WC_DEFS.weapons[w.defName].tree)) lost.push(w.defName);
    }
    const bind = (id) => WC_BINDINGS.find((b) => b.id === id);
    const av = weaponsDb.find((w) => w.subtypeId === 'GVK_AvengerGatlingTurret');
    selectWeapon(av.id);
    const rof = document.getElementById('wRateOfFire');
    rof.value = '1500';
    wcWriteBinding(bind('wRateOfFire'), rof);
    const ui = document.getElementById('wUiEnableOverload');
    ui.checked = true;
    wcWriteBinding(bind('wUiEnableOverload'), ui);
    const edited = generateCSharpWeapon();
    const helperUntouched = BUNDLED_WC_DEFS.helpers.Common_Weapons_Hardpoint_Ui_FullDisable.tree.EnableOverload !== true;
    delete wcWorking.weapon[av.defName];
    const reverted = generateCSharpWeapon();
    selectAmmo('NATO_25x184mm');
    const bd = document.getElementById('aBaseDamage');
    bd.value = '250';
    wcWriteBinding(bind('aBaseDamage'), bd);
    const shapeDamage = activeAmmo.baseDamage;
    wcSet('ammo', ['Trajectory', 'DragPerSecond'], 12.5);
    const ammoCs = generateCSharpAmmo();
    delete wcWorking.ammo.NATO_25x184mm;
    wcRefreshAmmoShape();
    __rtReport({
      defs: seen.size + Object.keys(ammosDb).length, lost,
      rofEdited: /RateOfFire = 1500,/.test(edited),
      uiDetached: /Ui = new UiDef/.test(edited) && /EnableOverload = true/.test(edited) && helperUntouched,
      revertedRef: /Ui = Common_Weapons_Hardpoint_Ui_FullDisable,/.test(reverted) && /RateOfFire = 1000,/.test(reverted),
      shapeDamage, newField: /DragPerSecond = 12.5f,/.test(ammoCs), restoredDamage: activeAmmo.baseDamage,
    });
  })();
`);
check('Every ammo + weapon def round-trips losslessly through the studio exporter (' + (rtReport && rtReport.defs) + ' defs)',
  !!rtReport && rtReport.lost.length === 0);
if (rtReport && rtReport.lost.length) console.error('    lost fidelity:', rtReport.lost.join(', '));
check('Curated input edit (Avenger RateOfFire) lands in the exported def', !!rtReport && rtReport.rofEdited);
check('Editing a shared helper field detaches a local copy and leaves the helper untouched', !!rtReport && rtReport.uiDetached);
check('Reverting restores the shared helper reference', !!rtReport && rtReport.revertedRef);
check('Ammo edits rebuild the studio shape (DPS follows)', !!rtReport && rtReport.shapeDamage === 250 && rtReport.restoredDamage === 100);
check('Fields with no curated input (Trajectory.DragPerSecond) export from the field editor', !!rtReport && rtReport.newField);

// Ammo Maths: reproduces the xlsx "Ammo Maths" tab (cached sheet values; these mags match their live SBC)
let amReport = null;
sandbox.__amReport = (r) => { amReport = r; };
studio.run(`
  (() => {
    const pick = (sub) => {
      const r = amCompute(amMag(sub));
      return { vol: r.vol, mass: r.mass, craft: r.craft, price: r.serverPrice, adj: r.adjMsrp, rus: r.rus,
        recipe: r.prereqs.map((p) => p.subtypeId + ':' + p.amount).join(' '), drift: r.driftPct, weapons: r.weapons };
    };
    const gat = pick('NATO_25x184mm'), hc = pick('Ballistics_HeavyCannon'), rail = pick('SmallRailgunAmmo');
    const gatRows = gat.weapons.map((w) => ({ def: w.defName, n: w.magsToLoad, inv: w.suggestedInv, short: w.short }));

    // Workbench: Avenger (MagsToLoad 14, InventorySize 0.9) is below 2.2 x 14 x 30 L = 924 L
    const av = weaponsDb.find((w) => w.subtypeId === 'GVK_AvengerGatlingTurret');
    selectWeapon(av.id);
    selectAmmo('NATO_25x184mm');
    const warnings = [];
    amCheckWorkbench(warnings);
    const shortWarning = warnings.some((w) => /below the 2.2/.test(w));
    const sugg = suggestedInventorySize('NATO_25x184mm', 14);
    amApplyInventorySize(sugg.suggested);
    const cs = generateCSharpWeapon();
    const warnings2 = [];
    amCheckWorkbench(warnings2);
    delete wcWorking.weapon[av.defName];

    // Lever edit + export patching
    const gatMag = amMag('NATO_25x184mm');
    amSetLever('NATO_25x184mm', 'sizeMult', 1.6667);
    const seeked = amCompute(gatMag, { weapons: false });
    const bpXml = amBlueprintXml(gatMag, seeked), magXml = amMagazineXml(gatMag, seeked);
    const changed = amChangedMags().map((x) => x.m.subtypeId);
    amSetLever('NATO_25x184mm', 'sizeMult', undefined);
    const restored = amCompute(gatMag, { weapons: false }).vol;

    updateAmmoLogistics();
    __amReport({ gat, hc, rail, gatRows, shortWarning, sugg: sugg.suggested, cs, noWarnAfterUse: !warnings2.some((w) => /below the 2.2/.test(w)),
      seekedVol: seeked.vol, bpXml, magXml, changed, restored,
      overviewRows: (document.getElementById('amOverviewTable').innerHTML.match(/data-mag=/g) || []).length,
      tracked: amTrackedMags().length,
      footprintDiffs: amTrackedMags().map((m) => m.subtypeId)
        .filter((k) => amCompute(amMag(k), { weapons: false }).changes.some((c) => /^(Volume|Mass|Craft Time)$/.test(c.field))) });
  })();
`);
const am = amReport || {};
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
check('Ammo Maths: Gatling = baseline anchor (30 L, 30 kg, 13 s, 1500 / 4500 SC, Mg 4 Fe 53.5 Ni 13.4)',
  !!am.gat && eq([am.gat.vol, am.gat.mass, am.gat.craft, am.gat.price, am.gat.adj, am.gat.recipe], [30, 30, 13, 1500, 4500, 'Magnesium:4 Iron:53.5 Nickel:13.4']));
check('Ammo Maths: Heavy Cannon = SBC (400 L, 4000 kg, 150 s, 44000 / 132000 SC, 4.5 RUs)',
  !!am.hc && eq([am.hc.vol, am.hc.mass, am.hc.craft, am.hc.price, am.hc.adj, am.hc.rus], [400, 4000, 150, 44000, 132000, 4.5])
  && am.hc.recipe === 'GVK_RUs:4.5 Magnesium:93.4 Iron:933.9 Cobalt:140.1 Silver:23.3');
check('Ammo Maths: Railgun = SBC (130 L, 1300 kg, 38 s, 30000 / 90000 SC, 3.1 RUs, 0% drift)',
  !!am.rail && eq([am.rail.vol, am.rail.mass, am.rail.craft, am.rail.price, am.rail.adj, am.rail.rus], [130, 1300, 38, 30000, 90000, 3.1])
  && Math.abs(am.rail.drift) < 0.01);
const gl = (am.gatRows || []).find((w) => w.def === 'LargeGatlingTurret'), ga = (am.gatRows || []).find((w) => w.def === 'GVK_AvengerGatlingTurret');
check('Suggested InventorySize is per weapon: Gatling N=4 -> 0.27 kL, Avenger N=14 -> 0.93 kL (short at 0.9)',
  !!gl && !!ga && gl.n === 4 && gl.inv === 0.27 && !gl.short && ga.n === 14 && ga.inv === 0.93 && ga.short);
check('Workbench flags InventorySize below the 2.2 x MagsToLoad buffer as a lint warning', am.shortWarning === true);
check('"Use suggested" writes InventorySize into the exported C# and clears the warning',
  am.sugg === 0.93 && /InventorySize = 0\.93f/.test(am.cs || '') && am.noWarnAfterUse);
check('Size × 1.6667 on the Gatling gives Vol 50 L', am.seekedVol === 50);
check('Blueprint export patches the SBC block (prereqs + craft time), magazine export patches Volume (Size × leaves Mass alone)',
  /<SubtypeId>001_NATO_25x184mmMagazine<\/SubtypeId>/.test(am.bpXml || '') && /<BaseProductionTimeInSeconds>13</.test(am.bpXml || '')
  && /<Volume>50<\/Volume>/.test(am.magXml || '') && /<Mass>30<\/Mass>/.test(am.magXml || '') && /<Model>Models\\Weapons\\Ammo_Box.mwm<\/Model>/.test(am.magXml || ''));
check('Changed-mags export picks up the edited magazine; reverting the lever restores the default',
  (am.changed || []).includes('NATO_25x184mm') && am.restored === 30);
check('All Magazines overview renders one row per tracked magazine', am.tracked >= 15 && am.overviewRows === am.tracked);
check('Default multipliers reproduce the live SBC volume, mass and craft time of every tracked magazine',
  Array.isArray(am.footprintDiffs) && am.footprintDiffs.length === 0);
if (am.footprintDiffs && am.footprintDiffs.length) console.error('    differs:', am.footprintDiffs.join(', '));

// Engagement range: one resolver gates turrets and guided munitions by the block's targeting range
let erReport = null;
sandbox.__erReport = (r) => { erReport = r; };
studio.run(`
  (() => {
    const er = (sub) => { const w = weaponsDb.find((x) => x.subtypeId === sub); return getEngagementRange(w, ammosDb[w.ammoName], false); };
    const fixedUnguided = weaponsDb.find((w) => w.type === 'Fixed' && ammosDb[w.ammoName]
      && ammosDb[w.ammoName].trajectory.guidance === 'None' && ammosDb[w.ammoName].trajectory.maxTrajectory > 0);
    __erReport({ drone: er('ARYX_Small_Sidekick_Hangar'), torpedo: er('Missile_Torpedo_Large'),
      fixed: getEngagementRange(fixedUnguided, ammosDb[fixedUnguided.ammoName], false),
      fixedReach: ammosDb[fixedUnguided.ammoName].trajectory.maxTrajectory });
  })();
`);
const er = erReport || {};
check('Drone Bay range = its 2,500 m targeting range, not the 30 km drone trajectory',
  !!er.drone && er.drone.range === 2500 && er.drone.source === 'targeting');
check('Guided fixed launchers are gated by targeting range (Torpedo 3,000 m < 3,500 m reach)', !!er.torpedo && er.torpedo.range === 3000);
check('Manually aimed fixed guns with unguided rounds use the reach of the round', !!er.fixed && er.fixed.range === er.fixedReach && !er.fixed.gated);

done('Studio smoke');
