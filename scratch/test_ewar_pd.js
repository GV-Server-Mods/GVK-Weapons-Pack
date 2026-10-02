// EWAR / point-defense functional checks on hand-built WC ammo fixtures.
// Run: node scratch/test_ewar_pd.js
'use strict';
const { loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();
const studio = loadStudio();

const r = studio.run(`(() => {
  const r = {};
  const noAoe = { enable: false, byBlockHit: { enable: false }, endOfLife: { enable: false }, areaEffect: { areaEffect: false } };
  ammosDb.Ballistics_Flak_Shrapnel = { name: 'Ballistics_Flak_Shrapnel', ammoRound: 'Ballistics_Flak_Shrapnel', baseDamage: 400, fragment: null, areaOfDamage: noAoe };
  const flak = {
    name: 'Ballistics_Flak', ammoRound: 'Proximity Flak', terminalName: 'Proximity Flak', ammoMagazine: 'MediumCalibreAmmo',
    baseDamage: 1000, damageScales: { lightArmor: -1, heavyArmor: -1, characters: 0.1, healthHitModifier: 10, nonArmor: -1 },
    fragment: { enable: true, ammoRound: 'Ballistics_Flak_Shrapnel', fragments: 30, degrees: 45, reverse: false, dropVelocity: false },
    areaOfDamage: { enable: true, byBlockHit: { enable: false }, endOfLife: { enable: true, damage: 1, radius: 101, depth: 1, falloff: 'Pooled' }, areaEffect: { areaEffect: false, damage: 0, radius: 0 } },
    trajectory: { desiredSpeed: 900, maxTrajectory: 2000 }
  };
  const flare = {
    name: 'FlareWC', ammoRound: 'Flare', terminalName: 'Flare', ammoMagazine: 'FlareClip', baseDamage: 1,
    areaOfDamage: { enable: true, byBlockHit: { enable: false }, endOfLife: { enable: true, damage: 1, radius: 5, depth: 5, falloff: 'Pooled' }, areaEffect: { areaEffect: false } },
    ewar: { enable: true, type: 'AntiSmartv2', mode: 'Field', strength: 99, radius: 700, duration: 1000 },
    trajectory: { desiredSpeed: 100, maxTrajectory: 400 }
  };
  const shrap = { name: 'Missiles_Torpedo_Shrapnel', ammoRound: 'Missiles_Torpedo_Shrapnel', baseDamage: 1, fragment: null, areaOfDamage: noAoe,
    ewar: { enable: true, type: 'Offense', mode: 'Effect', strength: 100000, radius: 100, duration: 2400 } };
  ammosDb.Missiles_Torpedo_Shrapnel = shrap;
  const torpedo = { name: 'Missiles_Torpedo', ammoRound: 'Missiles_Torpedo', baseDamage: 100,
    fragment: { enable: true, ammoRound: 'Missiles_Torpedo_Shrapnel', fragments: 1, degrees: 0.1 },
    areaOfDamage: { enable: true, byBlockHit: { enable: false }, endOfLife: { enable: true, damage: 1500000, radius: 25, depth: 25, falloff: 'Pooled' }, areaEffect: { areaEffect: false } } };

  const dFlak = getAmmoDamageDetailed(flak);
  r.flakTotal = dFlak.total;
  r.flakEwar = dFlak.ewar;
  const dFlare = getAmmoDamageDetailed(flare);
  r.flareTotal = dFlare.total;
  r.flareEwar = dFlare.ewar;
  r.torpTotal = getAmmoDamageDetailed(torpedo).total;

  const badge = (ammo, weapon) => { activeWeapon = weapon; activeAmmo = ammo; updateTelemetryAmmoBadge(); return document.getElementById('badgeAmmoTypeDesc').textContent; };
  const pdW = weaponsDb.find((w) => w.pdProjectiles && !isNpcWeapon(w));
  r.flakBadge = badge(flak, pdW);
  r.flareBadge = badge(flare, pdW);
  // Sub-munition classification from WC fields (no names): loitering TimedSpawns carrier, launch stage
  const owner = (key) => weaponsDb.find((w) => (w.allAmmos || w.assignedAmmos || []).includes(key));
  const loiter = Object.values(ammosDb).find((a) => a.fragment && a.fragment.enable && a.fragment.fragments === 1
    && a.fragment.timedSpawns && a.fragment.timedSpawns.enable && a.fragment.timedSpawns.maxSpawns > 1);
  r.droneBadge = loiter ? badge(loiter, owner(loiter.name)) : '';
  const stage = Object.values(ammosDb).find((a) => a.fragment && a.fragment.enable && a.fragment.fragments === 1
    && !(a.fragment.timedSpawns && a.fragment.timedSpawns.enable) && (a.baseDamage || 0) <= 1 && resolveAmmoRound(a.fragment.ammoRound, owner(a.name)));
  r.stageBadge = stage ? badge(stage, owner(stage.name)) : '';

  // PD kill counts come from data: the sturdiest guided munitions in the loaded mod, HealthHitModifier per hit
  const refs = getPdReferenceTargets(2);
  r.refs = refs.map((a) => ({ name: a.terminalName || a.name, health: a.health }));
  r.flakKills = describePdKills(flak, 'bursts');
  r.expectKills = refs.map((a) => Math.ceil(a.health / 10) + ' bursts per ' + (a.terminalName || a.name)).join(' · ');
  const hvy = refs[0];
  r.survival = describePdSurvival(hvy);
  return r;
})()`);

check('Flak PROX total = 13000 (1000 base + 30 x 400 shrapnel; the 1 hp anti-missile EoL is not block damage)', r.flakTotal === 13000, r.flakTotal);
check('Flak PROX not flagged ewar', r.flakEwar === false);
check('FlareWC EWAR zeroes base and area payload (total 0)', r.flareTotal === 0 && r.flareEwar === true, r.flareTotal);
check('Torpedo EWAR shrapnel child contributes 0 (total 1,500,100)', r.torpTotal === 1500100, r.torpTotal);
check('Flak badge shows Anti-Missile Screen (101m)', r.flakBadge.includes('Anti-Missile Screen (101m)'), r.flakBadge);
check('Flare badge shows EWAR Missile Scramble (700m)', r.flareBadge.includes('EWAR Missile Scramble (700m)'), r.flareBadge);
check('Loitering TimedSpawns carrier is badged as a drone deployment', r.droneBadge.includes('Drone Deployment'), r.droneBadge);
check('Single-fragment launch stage is badged as a staged booster', r.stageBadge.includes('Staged Kinetic Booster'), r.stageBadge);
check('PD reference munitions are the two healthiest guided rounds in the data', r.refs.length === 2 && r.refs[0].health >= r.refs[1].health, r.refs);
check('PD kill line = ceil(Health / HealthHitModifier) per reference munition (no hard-coded names)', r.flakKills === r.expectKills, r.flakKills);
check('Munition survival tooltip lists hits from the mod\'s own PD rounds', /\(\d+ hits? from .+\)/.test(r.survival), r.survival);

done('EWAR / PD checks');
