// Telemetry screen fixes: compare list, share links, specialty and salvo labels, PD-only hero, fixed mounts,
// magazine lines, cargo and range labels, readable ammo names, the Support role and the Data Core badge.
// Run: node tests/test_screen.js
'use strict';
const fs = require('fs');
const path = require('path');
const { loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();

const studio = loadStudio();
const trim = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
const r = studio.run(`(() => {
  const t = (id) => { const e = document.getElementById(id); return e ? e.textContent : null; };
  const h = (id) => { const e = document.getElementById(id); return e ? e.innerHTML : null; };
  const Wid = (id) => weaponsDb.find((x) => x.id === id);
  const sw = (id, k) => { selectWeapon(id); if (k) selectAmmo(k); };
  const out = {};
  // Compare list: rebuilt, never appended twice
  out.compareOpts = [];
  for (let i = 0; i < 3; i++) { populateWeaponDropdowns(); out.compareOpts.push((h('compareSelect').match(/<option/g) || []).length); }
  out.filterable = getFilterableWeapons().length;
  out.bench = [document.getElementById('compareSelect').value, benchmarkWeapon && benchmarkWeapon.id];
  // Specialty badges
  const badge = (id, k) => getWeaponSpecialtyBadge(Wid(id), ammosDb[k || getSelectableAmmos(Wid(id))[0]]);
  out.badges = {};
  for (const [id, k] of [['L__Cannon_Turret', 'LargeCalibreAmmo'], ['L__Flak_Turret', 'Ballistics_Flak'], ['L__Heavy_Laser_Turret'], ['L__SRBM_Turret'],
    ['L__MAC_Gun'], ['L__Railgun_Turret'], ['L__Torpedo_Launcher'], ['L__Drone_Bay'], ['L__PD_Laser'], ['L__OKIDesignator'], ['L__Chaingun_Turret']]) out.badges[id] = badge(id, k);
  out.droneBadges = getSelectableAmmos(Wid('L__Drone_Bay')).map((k) => badge('L__Drone_Bay', k));
  out.badBadges = [];
  for (const w of getFilterableWeapons()) for (const k of getSelectableAmmos(w)) {
    const b = getWeaponSpecialtyBadge(w, ammosDb[k]);
    if (/Direct Kinetic AP|Shield/.test(b)) out.badBadges.push(w.id + ':' + k + '=' + b);
  }
  // Salvo labels and blast lines
  out.salvo = {};
  for (const [id, k] of [['L__MAC_Gun'], ['L__Torpedo_Launcher'], ['S__Cannon_Gun', 'LargeCalibreAmmo'], ['L__ARYXCycloneCannon', 'LargeCalibreAmmoHE'], ['L__PD_Laser'], ['L__Heavy_Laser_Turret']]) {
    sw(id, k); out.salvo[id] = t('pillarAlphaSalvo');
  }
  sw('L__Heavy_Laser_Turret'); out.blastHL = t('tmBlastSub');
  sw('L__SRBM_Turret'); out.blastSrbm = t('tmBlastSub');
  // PD-only hero
  sw('L__PD_Laser'); out.pd = { sus: t('outSustainedDps'), type: t('teleDpsType'), eff: t('outEffectiveDps') };
  currentBatteryMultiplier = 4; sw('L__PD_Laser'); out.pd4 = t('outSustainedDps'); currentBatteryMultiplier = 1;
  sw('L__Gatling_Turret'); out.pdCtl = { sus: t('outSustainedDps'), eff: t('outEffectiveDps') };
  // Fixed mounts
  sw('L__MAC_Gun'); out.mac = { trav: t('outTraverseDeg'), az: t('outTraverseAzEl'), tol: t('outAimingTolerance'), tolD: t('outAimingToleranceDetail'),
    track: calculateWeaponMetrics(activeWeapon).tracking, cargo: t('outMagReload') };
  sw('S__Gatling_Gimbal'); out.gimbal = { trav: t('outTraverseDeg'), az: t('outTraverseAzEl') };
  // Magazine lines (effective first, base second)
  const magLines = () => { const s = h('outMagDamageSub') || ''; return { eff: (s.match(/metric-sub-eff">([^<]*)/) || [])[1] || '', base: (s.match(/metric-sub-base">([^<]*)/) || [])[1] || '' }; };
  sw('L__Cannon_Turret', 'LargeCalibreAmmo'); out.magCannon = magLines(); out.rangeCannon = t('pillarRangeRadar');
  sw('L__Heavy_Cannon_Hurricane_Turret'); out.magHurricane = magLines();
  sw('L__Gatling_Turret'); out.magGat = magLines();
  sw('L__Cannon_Gun'); out.rangeGun = t('pillarRangeRadar');
  // Cargo continuous-fire time per gun
  sw('L__ARYXCycloneCannon'); out.cargoAryx = t('outMagReload');
  currentBatteryMultiplier = 4; sw('L__ARYXCycloneCannon'); out.cargoAryx4 = t('outMagReload'); currentBatteryMultiplier = 1;
  sw('S__Gatling_Gun'); out.cargoSg = t('outMagReload');
  // Readable ammo names in the compare card and radar legend
  sw('L__PD_Laser'); setBenchmarkWeapon('L__Heavy_Laser_Turret'); out.names = [t('qcAmmoTypeBench'), t('legendBenchName')];
  setBenchmarkWeapon('L__Torpedo_Launcher'); out.legendTorp = t('legendBenchName');
  setBenchmarkWeapon('L__Flak_Turret', 'Ballistics_Flak'); out.legendFlak = t('legendBenchName');
  out.rawNames = [];
  for (const w of getFilterableWeapons()) { setBenchmarkWeapon(w.id); for (const id of ['qcAmmoTypeBench', 'legendBenchName']) if (/\\b[A-Z][a-z]+_[A-Za-z_]+\\b/.test(t(id) || '')) out.rawNames.push(w.id + ':' + t(id)); }
  // Roles
  out.roles = {};
  for (const id of ['L__LargeFlareLauncher', 'S__SmallFlareLauncher', 'L__OKIDesignator', 'S__ARYXSmallRadar', 'S__SmallBlockRadioAntenna_WCRadar',
    'S__SmallBlockCompactRadioAntennaReskin_WCRadar', 'L__PD_Laser', 'L__Heavy_Cannon_Odin_Turret', 'L__Loki_Plasma_Turret']) out.roles[id] = getWeaponRole(Wid(id)).id;
  out.roleLabels = WEAPON_ROLES.map((x) => x.label);
  // Data Core: turrets and guided weapons over 2,000 m
  out.dc = {};
  for (const w of getFilterableWeapons()) { const s = getDataCoreStatus(w).state; if (s !== 'none') (out.dc[s] = out.dc[s] || []).push(w.id); }
  out.dcEdge = ['S__Cannon_Turret', 'S__Missile_Launcher', 'L__Cannon_Gun', 'L__MAC_Gun'].map((id) => getDataCoreStatus(Wid(id)).state);
  sw('L__OKIDesignator'); out.dcOki = [t('scopeBadgeDataCore'), document.getElementById('scopeBadgeDataCore').style.display];
  sw('L__Cannon_Turret'); out.dcCannon = t('scopeBadgeDataCore');
  return out;
})()`);

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
check('Compare list: 66 player weapons plus the placeholder, every rebuild', eq(r.compareOpts, [67, 67, 67]) && r.filterable === 66, r.compareOpts);
check('Compare list selection is the benchmark (XFEL-H for the default Avenger)', r.bench[0] === r.bench[1] && r.bench[0] === 'L__Heavy_Laser_Turret', r.bench);
check('Specialty badges', eq(r.badges, {
  L__Cannon_Turret: '🔩 Kinetic · Anti-Heavy ×3', L__Flak_Turret: '🎯 Anti-Missile Screen (101m)', L__Heavy_Laser_Turret: '⚡ Energy · Anti-Systems',
  L__SRBM_Turret: '🧨 Fragments (10×)', L__MAC_Gun: '🪡 Overpen (100 blk)', L__Railgun_Turret: '🪡 Overpen (9 blk)', L__Torpedo_Launcher: '💥 Blast (25m)',
  L__Drone_Bay: '🤖 Drone Deployment', L__PD_Laser: '🎯 Point Defense Only', L__OKIDesignator: '📡 Sensor / Utility', L__Chaingun_Turret: '🔩 Kinetic · Anti-Armor ×1.5'
}), r.badges);
check('Drone bay: every ammo is Drone Deployment', r.droneBadges.length > 1 && r.droneBadges.every((b) => b === '🤖 Drone Deployment'), r.droneBadges);
check('No badge says "Direct Kinetic AP" or "Shield"', r.badBadges.length === 0, r.badBadges);
check('Salvo labels', eq(Object.fromEntries(Object.entries(r.salvo).map(([k, v]) => [k, trim(v)])), {
  L__MAC_Gun: 'SINGLE BEAM SHOT', L__Torpedo_Launcher: 'SINGLE MISSILE', S__Cannon_Gun: 'HEAVY SLUG', L__ARYXCycloneCannon: 'HE SHELL',
  L__PD_Laser: 'CONTINUOUS BEAM', L__Heavy_Laser_Turret: 'CAPACITOR BURST'
}), r.salvo);
check('Blast lines: XFEL-H has no area blast; SRBM lists its fragments',
  r.blastHL === 'Direct energy hit · no area blast' && r.blastSrbm === 'No area blast · 10 fragments × 17,001 hp', [r.blastHL, r.blastSrbm]);
check('PD-only hero: 2 PD hp/s, VS MUNITIONS, hits per missile; ×4 battery 8 PD hp/s',
  r.pd.sus === '2 PD hp/s' && r.pd.type === 'VS MUNITIONS (PD)' && /1 PD hp per hit/.test(r.pd.eff) && /200 hits per Offense Falcon V2/.test(r.pd.eff)
  && !/All Blocks \(×0\)/.test(r.pd.eff) && r.pd4 === '8 PD hp/s', [r.pd, r.pd4]);
check('PD turret with block damage keeps the normal hero (Gatling 1,636 hp/s)', r.pdCtl.sus === '1,636 hp/s' && /Effective against Heavy Armor/.test(r.pdCtl.eff), r.pdCtl);
check('MAC is a fixed mount: no traverse, boresight only, tracking 0',
  eq([r.mac.trav, r.mac.az, r.mac.tol, r.mac.tolD, r.mac.track], ['Fixed Mount', 'Fires Along Block Facing', 'Fixed', 'Fixed (boresight only)', 0]), r.mac);
check('Gimbal keeps its steering cone (34.4°/s)', r.gimbal.trav === '34.4°/s' && r.gimbal.az === 'Gimbal Steering Cone', r.gimbal);
check('Magazine lines: 155 mm effective first, base second, never mixed',
  r.magCannon.eff === 'Alpha: 18,000 hp · × 2 loaded = 36,000 hp' && r.magCannon.base === 'Base (×1): 6,000 hp/mag · Alpha 6,000 · × 2 loaded = 12,000', r.magCannon);
check('Magazine lines: Hurricane 160,000 alpha; base line 80,000/mag',
  r.magHurricane.eff === 'Alpha: 160,000 hp · × 2 loaded = 320,000 hp' && /^Base \(×1\): 80,000 hp\/mag/.test(r.magHurricane.base), r.magHurricane);
check('Magazine lines: Gatling (×1) has no base line', r.magGat.eff === 'Alpha: 100 hp · × 4 loaded = 12,000 hp' && r.magGat.base === '', r.magGat);
check('Cargo: continuous fire per gun (ARYX 23 s, MAC 6m 0s, small Gatling 18 s; battery ×4 unchanged)',
  r.cargoAryx === '1.2 m³ cargo (23s continuous fire)' && r.mac.cargo === '6.754 m³ cargo (6m 0s continuous fire)'
  && r.cargoSg === '0.3 m³ cargo (18s continuous fire)' && r.cargoAryx4 === r.cargoAryx, [r.cargoAryx, r.mac.cargo, r.cargoSg, r.cargoAryx4]);
check('Range chip: turret TARGETING, fixed gun BORESIGHT', trim(r.rangeCannon) === 'TARGETING' && trim(r.rangeGun) === 'BORESIGHT', [trim(r.rangeCannon), trim(r.rangeGun)]);
check('Readable ammo names in the compare card and legend',
  r.names[0] === '⚡ H.Laser Energy' && r.names[1] === '*H.Laser* XFEL-H Turret [H.Laser Energy]' && /\[Crusader Disruptor\]$/.test(r.legendTorp) && /\[Proximity Flak\]$/.test(r.legendFlak),
  [r.names, r.legendTorp, r.legendFlak]);
check('No raw ammo ids in the compare card or legend', r.rawNames.length === 0, r.rawNames.slice(0, 5));
check('Support role: flares and sensors; PD, Odin and Loki unchanged', eq(r.roles, {
  L__LargeFlareLauncher: 'support', S__SmallFlareLauncher: 'support', L__OKIDesignator: 'support', S__ARYXSmallRadar: 'support',
  S__SmallBlockRadioAntenna_WCRadar: 'support', S__SmallBlockCompactRadioAntennaReskin_WCRadar: 'support',
  L__PD_Laser: 'pd', L__Heavy_Cannon_Odin_Turret: 'breaker', L__Loki_Plasma_Turret: 'artillery'
}) && r.roleLabels.length === 9 && r.roleLabels[8] === 'Support', [r.roles, r.roleLabels]);
check('Data Core fitted on the 14 weapons over 2 km', eq(r.dc.fitted, ['L__ARYXCycloneCannon', 'L__GVK_CycloneCannonTurret', 'L__Cannon_Turret',
  'L__Heavy_Cannon_Hurricane_Turret', 'L__Heavy_Cannon_Odin_Turret', 'L__Railgun_Turret', 'L__Loki_Plasma_Turret', 'L__Tuukka_Missile_Turret', 'L__Missile_Turret',
  'L__Missile_Launcher', 'L__SRBM_Turret', 'L__Torpedo_Launcher', 'S__Torpedo_Launcher', 'L__Drone_Bay']) && !r.dc.extra, r.dc);
check('Data Core missing on the OKI Designator and the three radars (targeting over 2 km, no Data Core)',
  eq(r.dc.missing, ['L__OKIDesignator', 'S__ARYXSmallRadar', 'S__SmallBlockRadioAntenna_WCRadar', 'S__SmallBlockCompactRadioAntennaReskin_WCRadar']), r.dc.missing);
check('Data Core boundary: exactly 2,000 m and fixed unguided guns need none', r.dcEdge.every((s) => s === 'none'), r.dcEdge);
check('Data Core badge: OKI required, missing; 155 mm turret fitted',
  /required, missing/.test(r.dcOki[0]) && r.dcOki[1] === 'inline-flex' && /Data Core fitted/.test(r.dcCannon), [r.dcOki, r.dcCannon]);

// Share links: ?gun=&ammo=&vs= opens that gun with that ammo against that benchmark; legacy display-name ammo still resolves
const link = (search) => {
  const s = loadStudio();
  s.sandbox.window.location.search = search;
  return s.run(`(() => {
    parseUrlParams();
    const t = (id) => { const e = document.getElementById(id); return e ? e.textContent : null; };
    const o = { gun: activeWeapon.id, ammo: activeAmmo && activeAmmo.name, select: document.getElementById('telemetryAmmoSelect').value,
      mag: t('outMagDamage'), bench: benchmarkWeapon && benchmarkWeapon.id, benchAmmo: benchmarkAmmoKey, legend: t('legendBenchName') };
    o.share = new URL(buildShareUrl()).searchParams.get('ammo');
    return o;
  })()`);
};
const p = link('?gun=LargeBlockMediumCalibreTurret&vs=SentinelTurret&ammo=Ballistics_Flak_HE');
check('Share link opens the gun, ammo and benchmark it names',
  p.gun === 'L__Flak_Turret' && p.ammo === 'Ballistics_Flak_HE' && p.select === 'Ballistics_Flak_HE' && /^4,000/.test(trim(p.mag))
  && p.bench === 'L__Gatling_Turret' && p.benchAmmo === 'NATO_25x184mm' && p.legend === '*Gatling* Sentinel Turret [NATO 25mm]', p);
check('Share link round trip keeps the ammo', p.share === 'Ballistics_Flak_HE', p.share);
const legacy = link('?gun=LargeBlockMediumCalibreTurret&ammo=Impact%20Flak');
check('Legacy link with an ammo display name still resolves (Impact Flak → Ballistics_Flak_HE)', legacy.ammo === 'Ballistics_Flak_HE', legacy);

// Block durability and welding: one "damage to destroy" number in Telemetry and the 1v1 table; weld time is the SBC value
const d = studio.run(`(() => {
  const t = (id) => { const e = document.getElementById(id); return e ? e.textContent : null; };
  const av = weaponsDb.find((x) => x.id === 'L__Gatling_Avenger_Turret');
  selectWeapon(av.id);
  return { box: t('outEffectiveIntegrity'), weld: t('outBuildTime'), integ: getBlockIntegrity(av), destroy: getDamageToDestroy(av),
    metric: calculateWeaponMetrics(av).integrity, bts: av.buildTimeSeconds, note: t('tmGvkBlockNote') };
})()`);
check('Avenger: integrity 106,370, damage to destroy 212,740 in the box and the 1v1 metric',
  d.integ === 106370 && d.destroy === 212740 && /^212,740/.test(trim(d.box)) && d.metric === 212740, d);
check('Weld time shows the block BuildTimeSeconds (MAX(5, ROUND(integrity / 750)))',
  d.bts === Math.max(5, Math.round(106370 / 750)) && trim(d.weld) === 'Welding: 2m 22s · integrity 106,370 hp', [d.bts, d.weld]);
const note = (fs.readFileSync(path.join(__dirname, '..', 'studio', 'index.html'), 'utf8').match(/id="tmGvkBlockNote"[^>]*>([^<]*)</) || [])[1];
check('Matrix note names the GVK block multipliers', /weapons and thrusters take half, gyros double/.test(note || ''), note);

// Phone layout: the weapon picker row wraps (no DOM layout in the harness, so check the markup and CSS)
const html =fs.readFileSync(path.join(__dirname, '..', 'studio', 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '..', 'studio', 'style.css'), 'utf8');
const pickRow = (html.match(/<div[^>]*class="[^"]*weapon-select-row[^"]*"[^>]*>/) || [''])[0];
check('Phone layout: the weapon picker row wraps under 768 px',
  pickRow && !/flex-wrap:\s*nowrap/.test(pickRow) && /@media \(max-width: 768px\)[\s\S]*?\.weapon-select-row\s*\{[^}]*flex-wrap:\s*wrap/.test(css), pickRow);

done('Screen');
