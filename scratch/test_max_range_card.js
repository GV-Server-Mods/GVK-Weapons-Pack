// Max Range card: turrets are gated by targeting range, manually aimed fixed guns by the round's reach.
// Run: node scratch/test_max_range_card.js
'use strict';
const { loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();
const studio = loadStudio({ data: false });

const defaults = {
  wMaxTargetDistance: '1600', tMaxTrajectory: '1500', tDesiredSpeed: '1000', wRotateRate: '0', wElevateRate: '0',
  wDurabilityMod: '0.5', wIdlePower: '0.01', aEnergyCost: '0', aBaseDamage: '0', wTrajectilesPerBarrel: '1', wHeatPerShot: '0',
  wMaxHeat: '0', wHeatSinkRate: '0', wCooldown: '0.5', wRateOfFire: '600', wBarrelsPerShot: '1', wReloadTime: '0',
  wMagsToLoad: '1', wInventorySize: '0.9'
};
for (const [id, v] of Object.entries(defaults)) studio.sandbox.document.getElementById(id).value = v;

const r = studio.run(`(() => {
  const r = {};
  weaponsDb = [{ id: 'TurretTest', name: 'Turret Test', subtypeId: 'TurretTest', type: 'Turret', maxTargetDistance: 2000, assignedAmmos: ['AmmoA'], rotateRate: 0.015, elevateRate: 0.015, durabilityMod: 0.5, effectiveIntegrity: 150000, components: [] }];
  ammosDb = { AmmoA: { name: 'AmmoA', ammoRound: 'AmmoA', ammoMagazine: 'AmmoA', terminalName: 'Ammo A', baseDamage: 100, mass: 1, damageScales: {}, fragment: null, areaOfDamage: { enable: false, endOfLife: { enable: false }, areaEffect: { areaEffect: false } }, trajectory: { desiredSpeed: 500, maxTrajectory: 3000 } } };
  componentsDb = {};
  selectWeapon('TurretTest');
  r.turretRange = document.getElementById('outMaxRange').innerHTML;
  r.turretSource = document.getElementById('outMaxRangeSource').textContent;
  weaponsDb[0].type = 'Fixed';
  selectWeapon('TurretTest');
  r.fixedRange = document.getElementById('outMaxRange').innerHTML;
  r.fixedSource = document.getElementById('outMaxRangeSource').textContent;
  return r;
})()`);

check('Turret card shows the 2,000 m targeting range', r.turretRange.includes('2,000'), r.turretRange);
check('Turret card source is Targeting Range (ammo reaches farther)', /^Targeting Range/.test(r.turretSource), r.turretSource);
check('Fixed unguided gun shows the 3,000 m round reach', r.fixedRange.includes('3,000'), r.fixedRange);
check('Fixed card source is the ammo max trajectory', /Max Trajectory|Ammo Reach/.test(r.fixedSource), r.fixedSource);

done('Max Range card checks');
