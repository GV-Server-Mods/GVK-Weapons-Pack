// Flight profile tags and roles: HOMING needs SmartsDef steering; a non-steering Smart round with a bursting proximity
// fuse is an AIR BURST; non-steering proximity-split rounds stay BALLISTIC.
// Run: node scratch/test_flight_profile.js
'use strict';
const { loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();
const studio = loadStudio();

const r = studio.run(`(() => {
  const r = { rows: [] };
  const tagOf = (w, a) => {
    renderPropulsionVector(w, a, isBeamWeapon(w, a));
    return (document.getElementById('pillarPropulsionVector').innerHTML.match(/propulsion-tag[^>]*>([^<]+)/) || [])[1];
  };
  for (const [k, a] of Object.entries(ammosDb)) {
    if (!a.trajectory || a.trajectory.guidance === 'None') continue;
    const w = weaponsDb.find((x) => (x.allAmmos || x.assignedAmmos || []).includes(k));
    if (!w) continue;
    const ts = a.fragment && a.fragment.enable && a.fragment.timedSpawns && a.fragment.timedSpawns.enable ? a.fragment.timedSpawns : null;
    r.rows.push({ k, sub: w.subtypeId, steers: a.trajectory.steers, tag: tagOf(w, a), role: getAutomatedWeaponRole(w, a).id,
      airBurst: isAirBurstAmmo(a), loiter: !!(ts && ts.maxSpawns > 1), prox: !!(ts && ts.proximity > 0) });
  }
  const flakGun = weaponsDb.find((w) => w.type === 'Fixed' && !isNpcWeapon(w) && (w.allAmmos || []).includes('Ballistics_Flak'));
  r.flakGunRole = flakGun ? getAutomatedWeaponRole(flakGun, ammosDb.Ballistics_Flak).label : null;

  // isAirBurstAmmo on fixtures: guided, non-steering, TimedSpawns proximity fuse that bursts
  const fx = (o) => Object.assign({
    trajectory: { guidance: 'Smart', steers: false },
    fragment: { enable: true, fragments: 30, timedSpawns: { enable: true, proximity: 100 } },
    areaOfDamage: { endOfLife: { enable: false, radius: 0 } }
  }, o);
  r.fx = {
    shrapnel: isAirBurstAmmo(fx()),
    steering: isAirBurstAmmo(fx({ trajectory: { guidance: 'Smart', steers: true } })),
    unknownSteer: isAirBurstAmmo(fx({ trajectory: { guidance: 'Smart' } })),
    unguided: isAirBurstAmmo(fx({ trajectory: { guidance: 'None', steers: false } })),
    noProximity: isAirBurstAmmo(fx({ fragment: { enable: true, fragments: 30, timedSpawns: { enable: true, proximity: 0 } } })),
    singleSplit: isAirBurstAmmo(fx({ fragment: { enable: true, fragments: 1, timedSpawns: { enable: true, proximity: 1700 } } })),
    singleWithBlast: isAirBurstAmmo(fx({ fragment: { enable: true, fragments: 1, timedSpawns: { enable: true, proximity: 1700 } },
      areaOfDamage: { endOfLife: { enable: true, radius: 12 } } }))
  };
  return r;
})()`);

const row = (k) => r.rows.find((x) => x.k === k) || {};
const nonSteer = r.rows.filter((x) => x.steers === false);
const steer = r.rows.filter((x) => x.steers !== false);
check('Guided rounds found in the data (both steering and non-steering)', steer.length >= 4 && nonSteer.length >= 3, [steer.length, nonSteer.length]);
check('No non-steering Smart round reads HOMING', nonSteer.every((x) => x.tag !== 'HOMING'), nonSteer.map((x) => x.k + ':' + x.tag));
check('No non-steering, non-loitering round gets the Homing Ordnance role', nonSteer.filter((x) => !x.loiter).every((x) => x.role !== 'homing'),
  nonSteer.map((x) => x.k + ':' + x.role));
check('Every steering Smart round reads HOMING or DRONE with the Homing Ordnance role',
  steer.every((x) => (x.tag === 'HOMING' || x.tag === 'DRONE') && x.role === 'homing'), steer.map((x) => x.k + ':' + x.tag + ':' + x.role));
check('Flak PROX reads AIR BURST', row('Ballistics_Flak').tag === 'AIR BURST' && row('Ballistics_Flak').airBurst, row('Ballistics_Flak'));
check('Fixed flak gun firing Flak PROX is Area Denial', r.flakGunRole === 'Area Denial', r.flakGunRole);
check('25mm Dual and NPC cannon proximity-split rounds read BALLISTIC again',
  row('NATO_25x184mm_Dual').tag === 'BALLISTIC' && row('Ballistics_Cannon_NPC').tag === 'BALLISTIC', [row('NATO_25x184mm_Dual').tag, row('Ballistics_Cannon_NPC').tag]);
check('Single-fragment proximity splits without a blast are never AIR BURST',
  nonSteer.filter((x) => x.prox && x.k !== 'Ballistics_Flak').every((x) => !x.airBurst && x.tag !== 'AIR BURST'), nonSteer.map((x) => x.k + ':' + x.tag));

const f = r.fx;
check('isAirBurstAmmo: non-steering Smart + proximity fuse + 30 fragments = air burst', f.shrapnel === true);
check('isAirBurstAmmo: steering rounds and rounds with unknown steering are not air bursts', f.steering === false && f.unknownSteer === false);
check('isAirBurstAmmo: unguided rounds or a fuse with no proximity are not air bursts', f.unguided === false && f.noProximity === false);
check('isAirBurstAmmo: one fragment needs an EndOfLife blast radius to count', f.singleSplit === false && f.singleWithBlast === true);

done('Flight profile checks');
