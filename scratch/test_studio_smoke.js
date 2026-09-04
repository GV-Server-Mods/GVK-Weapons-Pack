// Headless smoke test: loads docs/app.js with a stubbed DOM and asserts the
// WC C# exporters run clean with zero shield output (GVK is a shieldless server).
// Run: node scratch/test_studio_smoke.js
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const appSource = fs.readFileSync(path.join(root, 'docs', 'app.js'), 'utf8');
const htmlSource = fs.readFileSync(path.join(root, 'docs', 'index.html'), 'utf8');

let failures = 0;
function check(name, cond) {
  if (cond) console.log('  PASS  ' + name);
  else { failures++; console.error('  FAIL  ' + name); }
}

const mockCtx = {
  clearRect() {}, beginPath() {}, arc() {}, stroke() {}, fill() {},
  moveTo() {}, lineTo() {}, fillText() {}, measureText() { return { width: 10 }; },
  closePath() {}, save() {}, restore() {}, strokeStyle: '', fillStyle: '', lineWidth: 1
};

function makeElement(id) {
  return {
    id, value: '', checked: false, textContent: '', innerHTML: '', title: '',
    style: {}, disabled: false, dataset: {}, width: 400, height: 400,
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {}, removeEventListener() {},
    setAttribute() {}, removeAttribute() {},
    appendChild() {},
    querySelector(sel) { return makeElement(sel); },
    querySelectorAll() { return []; },
    getContext() { return mockCtx; }
  };
}

const elements = new Map();
const documentStub = {
  documentElement: { getAttribute() { return null; }, setAttribute() {} },
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  },
  querySelector(sel) { return makeElement(sel); },
  querySelectorAll() { return []; },
  createElement(tag) { return makeElement(tag); },
  addEventListener() {}
};

const windowStub = {
  addEventListener() {},
  matchMedia: null,
  location: { href: 'file:///smoke-test', search: '' },
  scrollTo() {}
};

const sandbox = {
  console, setTimeout, clearTimeout,
  document: documentStub,
  window: windowStub,
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  navigator: { clipboard: { writeText() { return Promise.resolve(); } } },
  prompt() { return null; },
  alert() {},
  fetch() { return Promise.resolve({ ok: false }); },
  URL, URLSearchParams
};
vm.createContext(sandbox);

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
    ammoCsShieldFree: !/shield/i.test(ammoCs),
    ammoCsHasDamageScales: ammoCs.includes('DamageScales'),
    ammoCsHeavy: ammoCs.includes('Heavy = 3'),
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
    rgShieldFree: !/shield/i.test(rgAmmoCs)
  });
})();
`;

let report = null;
sandbox.__report = (r) => { report = r; };

vm.runInContext(appSource + '\n;\n' + testBody, sandbox, { filename: 'app.js' });

check('WC AmmoDef exporter runs without throwing (no phantom dsShield reference)', report !== null && report.ammoCsLength > 100);
check('AmmoDef export contains DamageScales block', report.ammoCsHasDamageScales);
check('AmmoDef export emits Heavy armor scale', report.ammoCsHeavy);
check('AmmoDef export emits zero shield tags', report.ammoCsShieldFree);
check('WeaponDef export emits zero shield tags', report.weaponCsShieldFree);
check('SBC export emits zero shield tags', report.sbcXmlShieldFree);
check('recursive damage total resolves (6000 base)', report.dmgTotal === 6000);
check('155 AP best-fit = Heavy Armor ×3.0 (1000 paper → 3000 eff)', report.eff155 === 3000 && report.prof155Label === 'Heavy Armor' && report.prof155Mult === 3.0);
check('Heavy Railgun peak ideal = ×3.0 on full payload (100k → 300k, cap not diluting)', report.effRg === 300000 && report.profRgLabel === 'Heavy Armor');
check('Non-Armor winner detected (×2.0)', report.profNaLabel === 'Non-Armor (Systems)' && report.profNaMult === 2.0);
check('all-equal multipliers report All Targets', report.profAllLabel === 'All Targets');
check('Heavy Railgun per-block cap = 20000 hp', report.rgPerBlock === 20000);
check('Heavy Railgun penetration capacity = 50 blocks', report.rgPenBlocks === 50);
check('Railgun export emits zero shield tags', report.rgShieldFree);

// Dynamic lifecycle checks: populate datasets and verify weapon selection + metrics
const bundledW = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'data', 'weapons_db.json'), 'utf8'));
const bundledA = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'data', 'ammos_db.json'), 'utf8'));
const bundledM = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'data', 'magazines_blueprints_data.js'), 'utf8').replace(/^[\s\S]*?=\s*/, '').replace(/;\s*$/, ''));

sandbox.__injectedWeapons = bundledW;
sandbox.__injectedAmmos = bundledA;
sandbox.__injectedMags = bundledM;

let lcReport = null;
sandbox.__lifecycleReport = (r) => { lcReport = r; };

vm.runInContext(`
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
    harbMagSize: getShotsPerMag(weaponsDb.find(w => w.subtypeId === 'HarbingerTurret_NPC'), ammosDb['HeavyRailgunAmmo']),
    harbAlpha: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'HarbingerTurret_NPC')).alphaVolley,
    pdMagSize: getShotsPerMag(weaponsDb.find(w => w.subtypeId === 'MA_PDT'), ammosDb['Lasers_AMS']),
    pdAlpha: calculateWeaponMetrics(weaponsDb.find(w => w.subtypeId === 'MA_PDT')).alphaVolley,
  });
`, sandbox);

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
check('Spartan Turret resolves 360-rd virtual magazine', lcReport.spartanMagSize === 360);
check('Spartan Turret alpha volley spans 360-rd burst (54,000 hp)', lcReport.spartanAlpha === 54000);
check('Harbinger Railgun resolves 1-rd energy magazine (1,000,000 hp)', lcReport.harbMagSize === 1 && lcReport.harbAlpha === 1000000);
check('Point Defense Laser (continuous, no virtual mag) resolves 1 round (100 hp, NOT 10,000 hp fallback)', lcReport.pdMagSize === 1 && lcReport.pdAlpha === 100);

// Commit date format check (mm.dd.yyyy)
const sourceLiveContent = fs.readFileSync(path.join(root, 'docs', 'source_live.js'), 'utf8');
const dateRegexMatch = sourceLiveContent.includes("d.getUTCFullYear()") && sourceLiveContent.includes("${mm}.${dd}.${yyyy}");
check('source_live.js formats commit date as mm.dd.yyyy', dateRegexMatch);

if (failures > 0) {
  console.error('\n' + failures + ' check(s) failed.');
  process.exit(1);
}
