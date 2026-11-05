// Telemetry damage on the bundled data: area damage skips the small-vs-large debuff, overpen badge matches the
// matrix chip, loitering drones open with their first group only, the headline is large-grid Heavy Armor, and
// proximity fragments count the expected share that hits the chosen target size.
// Run: node tests/test_damage.js
'use strict';
const W = require('../studio/wc_math.js');
const { loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();
const near = (a, b, tol) => Math.abs(a - b) <= tol;

// Unit: fragment hit fraction (closed form, ProjectileTypes.cs cone + Projectile.cs Start velocity)
const srbm = (dia) => W.fragmentHitFraction({ degrees: 20, dropVelocity: true, distance: 147.5, targetDiameter: dia });
const flak = (dia) => W.fragmentHitFraction({ degrees: 45, dropVelocity: false, parentSpeed: 900, childSpeed: 1200, distance: 92.5, targetDiameter: dia });
check('Fragment hits: SRBM cone 15 m 29.1%, 30 m 58.4%', near(srbm(15), 0.29146, 1e-4) && near(srbm(30), 0.58368, 1e-4), [srbm(15), srbm(30)]);
check('Fragment hits: flak cone (inherits 900 m/s) 3 m 7.2%, 15 m 36.2%, 30 m 72.5%',
  near(flak(3), 0.07227, 1e-4) && near(flak(15), 0.36165, 1e-4) && near(flak(30), 0.72525, 1e-4), [flak(3), flak(15), flak(30)]);
check('Fragment hits: 0° cone always hits; inside the target always hits; half-cone edge gives 50%',
  W.fragmentHitFraction({ degrees: 0, distance: 100, targetDiameter: 15 }) === 1
  && W.fragmentHitFraction({ degrees: 45, distance: 5, targetDiameter: 15 }) === 1
  && near(W.fragmentHitFraction({ degrees: 20, dropVelocity: true, distance: 1 / Math.sin(5 * Math.PI / 180), targetDiameter: 2 }), 0.5, 1e-9));

// Unit: the small-vs-large debuff scales direct damage only
const plain = { damageScales: {} };
check('Small-vs-large debuff: direct 0.25, area 1; a set Grids.Small scale replaces it',
  W.blockDamageScale(plain, { grid: 'Small', armor: 'heavy' }, 'Large') === 0.25
  && W.blockDamageScale(plain, { grid: 'Small', armor: 'heavy' }, 'Large', true) === 1
  && W.blockDamageScale({ damageScales: { gridLarge: -1, gridSmall: 0.75 } }, { grid: 'Small', armor: 'heavy' }, 'Large', true) === 0.75);

const studio = loadStudio();
const r = studio.run(`(() => {
  const Wp = (sub) => weaponsDb.find((x) => x.subtypeId === sub);
  const at = (size, fn) => { const keep = currentTargetSize; currentTargetSize = size; try { return fn(); } finally { currentTargetSize = keep; } };
  const m = (sub, k) => calculateWeaponMetrics(Wp(sub), k);
  const prof = (sub, k) => getEffectiveProfile(getAmmoDamageDetailed(ammosDb[k], 0, Wp(sub)), Wp(sub));
  const badge = (sub, k) => getWeaponSpecialtyBadge(Wp(sub), ammosDb[k]);
  const out = {};
  // AoE vs small grid at max hits (fragment model off)
  out.flakHeSmall = at(0, () => prof('LargeBlockMediumCalibreTurret', 'Ballistics_Flak_HE').byTarget.Small.heavy);
  out.torpSmall = at(0, () => prof('Missile_Torpedo_Large', 'Missiles_Torpedo').byTarget.Small.heavy);
  out.flakHeSmallSg = at(0, () => prof('SmallBlockMediumCalibreTurret', 'Ballistics_Flak_HE').byTarget.Small.heavy);
  out.he155Small = at(0, () => prof('LargeCalibreTurret', 'LargeCalibreAmmoHE').byTarget.Small.heavy);
  // Overpen badge = matrix chip
  out.badges = [badge('LargeRailgun', 'LargeRailgunSabot'), badge('SmallRailgun', 'SmallRailgunAmmo_Ares'),
    badge('ARYXRailgunTurret', 'SmallRailgunAmmo'), badge('LargeRailgun_NPC', 'LargeRailgunSabot_NPC')];
  out.npcMacPen = getAmmoDamageDetailed(ammosDb.LargeRailgunSabot_NPC, 0, Wp('LargeRailgun_NPC')).penBlocks;
  out.badgeMismatch = [];
  for (const w of weaponsDb) {
    if (isNpcWeapon(w)) continue;
    for (const k of getSelectableAmmos(w)) {
      const a = ammosDb[k]; if (!a) continue;
      const d = getAmmoDamageDetailed(a, 0, w);
      if (d.cutoff > 0 && !isDetonationWeapon(w) && !(a.ewar && a.ewar.enable) && badge(w.subtypeId, k) !== '🪡 Overpen (' + d.penBlocks + ' blk)') out.badgeMismatch.push(w.subtypeId + ':' + k);
    }
  }
  // Loitering drones: opening volley is the first group only
  const dr = getAmmoDamageDetailed(ammosDb.Others_Drone_Offense_Advanced, 0, Wp('ARYX_Small_Sidekick_Hangar'));
  out.drone = { instant: dr.instantTotal, total: dr.total, mag: m('ARYX_Small_Sidekick_Hangar', 'Others_Drone_Offense_Advanced').magazineDamage,
    dps: m('ARYX_Small_Sidekick_Hangar', 'Others_Drone_Offense_Advanced').sustainedDps };
  out.droneSizes = [3, 15, 30, 0].map((s) => at(s, () => m('ARYX_Small_Sidekick_Hangar', 'Others_Drone_Offense_Advanced').sustainedDps));
  // Headline: large-grid Heavy Armor
  const xf = m('MA_T2PDX', 'Lasers_Laser_Large');
  out.xfel = { eff: xf.effectiveDps, mag: xf.effectiveMagazineDamage, label: xf.profile.label, best: xf.profile.best.label, bestDps: Math.round(xf.sustainedDps * xf.profile.best.mult) };
  out.ap155 = m('GVK_CycloneCannonTurret', 'LargeCalibreAmmo').effectiveDps;
  out.he155 = m('GVK_CycloneCannonTurret', 'LargeCalibreAmmoHE').effectiveDps;
  out.interior = m('LargeInteriorTurret', 'Ballistics_Interior').effectiveDps;
  out.spartan = m('ARYXSpartanTurret').effectiveDps;
  // Fragments: expected hits per target size
  out.flak = [15, 30, 3, 0].map((s) => at(s, () => m('LargeBlockMediumCalibreTurret', 'Ballistics_Flak').sustainedDps));
  out.flakMag = at(15, () => m('LargeBlockMediumCalibreTurret', 'Ballistics_Flak').magazineDamage);
  out.flakSg = at(15, () => m('SmallBlockMediumCalibreTurret', 'Ballistics_Flak').sustainedDps);
  out.srbm = [15, 30, 0].map((s) => at(s, () => m('ARYXMissileBattery', 'Missiles_Siege').sustainedDps));
  out.srbmMag = at(15, () => m('ARYXMissileBattery', 'Missiles_Siege').magazineDamage);
  out.avenger = [15, 30, 3].map((s) => at(s, () => m('GVK_AvengerGatlingTurret').sustainedDps));
  // UI
  selectWeapon(Wp('ARYX_Small_Sidekick_Hangar').id);
  out.uiDrone = { mag: document.getElementById('outMagDamage').innerHTML, heavySub: document.getElementById('tmHeavySub').textContent, breakdown: document.getElementById('outDpsBreakdown').textContent };
  selectWeapon(Wp('MA_T2PDX').id);
  out.uiXfel = { type: document.getElementById('teleDpsType').textContent, eff: document.getElementById('outEffectiveDps').textContent };
  selectWeapon(Wp('LargeBlockMediumCalibreTurret').id);
  out.uiFlak = { eff: document.getElementById('outEffectiveDps').textContent, idle: document.getElementById('targetSizeGroup').classList.contains('is-idle') };
  return out;
})()`);

check('Area damage skips the debuff vs small grids: Impact Flak HE 3,250, Torpedo 1,500,025 (large-grid shooter)',
  Math.round(r.flakHeSmall) === 3250 && Math.round(r.torpSmall) === 1500025, [r.flakHeSmall, r.torpSmall]);
check('Controls unchanged: small-grid Flak HE 4,000; 155 HE (Grids.Small set) 9,000', Math.round(r.flakHeSmallSg) === 4000 && Math.round(r.he155Small) === 9000, [r.flakHeSmallSg, r.he155Small]);
check('Overpen badge uses the WC block count: MAC 100, Ares 6, ARYX Railgun 9, NPC MAC carrier 100',
  r.badges.join('|') === ['🪡 Overpen (100 blk)', '🪡 Overpen (6 blk)', '🪡 Overpen (9 blk)', '🪡 Overpen (100 blk)'].join('|') && r.npcMacPen === 100, r.badges);
check('Overpen badge equals the matrix chip for every player weapon', r.badgeMismatch.length === 0, r.badgeMismatch);
check('Drone bay opening volley is the first 10-drone group (25,000 hp), lifetime 670,001; DPS unchanged',
  r.drone.instant === 25000 && r.drone.total === 670001 && r.drone.mag === 25000 && r.drone.dps === 19648, r.drone);
check('Drones are not proximity fragments: same DPS at every target size', r.droneSizes.every((d) => d === 19648), r.droneSizes);
check('Drone Telemetry: magazine 25,000; matrix Mag Damage 25,000; Initial 25,000',
  /^25,000/.test(r.uiDrone.mag) && /Mag Damage: 25,000 hp/.test(r.uiDrone.heavySub) && /Initial: 25,000 hp/.test(r.uiDrone.breakdown), r.uiDrone);
check('Headline is large-grid Heavy Armor: XFEL-H 2,695 DPS, 21,600 hp; best (Systems) 4,491 DPS',
  r.xfel.eff === 2695 && r.xfel.mag === 21600 && r.xfel.label === 'Heavy Armor' && r.xfel.best === 'Systems' && r.xfel.bestDps === 4491, r.xfel);
check('Headline unchanged where Heavy Armor is already best: 155 AP 15,882, 155 HE 10,588; Interior Turret 127; Spartan 5,389',
  r.ap155 === 15882 && r.he155 === 10588 && r.interior === 127 && r.spartan === 5389, [r.ap155, r.he155, r.interior, r.spartan]);
check('Flak expected hits: 15 m 4,724, 30 m 9,473, 3 m 944, every fragment 13,061 DPS; magazine 4,340',
  r.flak.join() === [4724, 9473, 944, 13061].join() && r.flakMag === 4340, { flak: r.flak, mag: r.flakMag });
check('Small-grid flak 15 m 3,092 DPS', r.flakSg === 3092, r.flakSg);
check('Longsword SRBM expected hits: 15 m 11,006, 30 m 22,041, every fragment 37,763; magazine 49,551',
  r.srbm.join() === [11006, 22041, 37763].join() && r.srbmMag === 49551, { srbm: r.srbm, mag: r.srbmMag });
check('Avenger (one narrow fragment): 3,987 at 15 and 30 m, 2,701 vs a 3 m rover', r.avenger.join() === [3987, 3987, 2701].join(), r.avenger);
check('Hero labels name Heavy Armor and show the best block', r.uiXfel.type === 'VS HEAVY ARMOR' && /Best: 4,491 DPS vs Systems/.test(r.uiXfel.eff), r.uiXfel);
check('Flak hero subline shows the every-fragment maximum; the TARGET buttons are live',
  /Max if every fragment hits: [\d,]+ DPS/.test(r.uiFlak.eff) && !r.uiFlak.idle, r.uiFlak);

done('Damage');
