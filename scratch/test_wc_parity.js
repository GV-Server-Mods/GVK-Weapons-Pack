// WeaponCore parity suite: checks the Studio's weapon and ammo maths against WeaponCore (CoreSystems) behaviour.
// Expectations are hand-derived from the WC source (tick traces, float32 energy maths, RadiantAoe loops, damage
// scaling) and are independent of the Studio code under test. Also verifies the source pipeline maps every WC field
// the maths reads, and that no calculation keys off a specific weapon or ammo name.
// Run: node scratch/test_wc_parity.js
'use strict';
const fs = require('fs');
const path = require('path');
const { root, loadStudio, makeChecker } = require('./studio_harness.js');
const W = require('../studio/wc_math.js');
const SP = require('../studio/source_pipeline.js');
const { check, done } = makeChecker();

const range = (from, step, n) => Array.from({ length: n }, (_, i) => from + i * step);
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

// ============================================================================
// A. Fire cycle: WeaponShoot.cs / WeaponReload.cs / SessionUpdate.cs shoot gate, per tick
// ============================================================================
console.log('\n[A] Fire cycle tick traces');
{
  // 600 RPM -> TicksPerShot = (uint)(3600f/600) = 6. 10-rd mag, ReloadTime 60.
  // Shots 1..55; tick 56 the AiLoop sees CurrentAmmo 0 and starts the reload (ReloadEndTick = 116);
  // at 116 Reloaded() runs before the shoot gate, so the next shot lands on 116 -> 115-tick cycle.
  const s = W.simulateFire({ rof: 600, magSize: 10, reloadTicks: 60, trace: 20 });
  check('Mag + reload: shots every 6 ticks, reload handoff costs ReloadTime + 1', eq(s.trace, range(1, 6, 10).concat(range(116, 6, 10))), s.trace);
  check('Mag + reload: steady state = 10 rounds / 115 ticks', near(s.roundsPerSec, 10 * 60 / 115, 1e-9), s.roundsPerSec);

  // DelayUntilFire 30: _ticksUntilShoot++ < 30 holds for 30 Shoot() calls, and StopShooting() resets it every reload
  const d = W.simulateFire({ rof: 600, magSize: 10, reloadTicks: 60, delayUntilFire: 30, trace: 11 });
  check('DelayUntilFire replays after every reload (first shots at 31 and 176)', d.trace[0] === 31 && d.trace[10] === 176, d.trace);

  // ReloadTime 0 reloads inside the same AiLoop pass, so the gate never closes and the spool is not replayed
  const z = W.simulateFire({ rof: 600, magSize: 10, reloadTicks: 0, delayUntilFire: 30, trace: 12 });
  check('ReloadTime 0: no spool replay, fire rate holds at TicksPerShot', z.trace[10] === z.trace[9] + 6 && near(z.roundsPerSec, 10, 1e-9), z.trace);

  // Barrels: each barrel spends one mag unit per fire event; the loop breaks when the mag runs dry mid-event
  const b = W.simulateFire({ rof: 600, barrels: 2, magSize: 5, reloadTicks: 60, trace: 6 });
  check('BarrelsPerShot 2 on a 5-rd mag: events at 1, 7, 13 (last event fires one barrel)', eq(b.trace, [1, 1, 7, 7, 13, 74]), b.trace);

  // RoF above 3600: TicksPerShot truncates to 0, Shoot() still runs once per tick
  const f = W.simulateFire({ rof: 7200, magSize: 30, reloadTicks: 0 });
  check('RoF 7200 fires once per tick (TicksPerShot 0)', near(f.roundsPerSec, 60, 1e-9), f.roundsPerSec);

  // BurstMode (capacity 18 >= ShotsInBurst 9): FinishMode StopShooting + ShootTime = max(DelayAfterBurst, TPS)
  // Burst 1: 1..57 (TPS 7); burst 2 waits to 57+380 = 437 -> 493; reload starts 494, ends 904 (ShotsFired = 9, no delay)
  const bm = W.simulateFire({ rof: 480, magSize: 18, reloadTicks: 410, shotsInBurst: 9, delayAfterBurst: 380, trace: 19 });
  check('Burst mode: 9-shot bursts 380 ticks apart, reload from the tick after the last shot', eq(bm.trace, range(1, 7, 9).concat(range(437, 7, 9), [904])), bm.trace);

  // Shot-reload mode (capacity 4 < ShotsInBurst 9): ShotsFired persists across reloads (Reloaded() keeps it),
  // every 9th shot pushes ShootTime out by DelayAfterBurst
  const sr = W.simulateFire({ rof: 480, magSize: 4, reloadTicks: 100, shotsInBurst: 9, delayAfterBurst: 380, trace: 14 });
  check('Shot-reload mode: burst count carries across 4-rd mags', eq(sr.trace, [1, 8, 15, 22, 123, 130, 137, 144, 245, 625, 632, 639, 740, 747]), sr.trace);
  // After the 36th shot the burst resets on an empty mag: StartReload waits DelayAfterBurst - 1 (379) instead of 100
  const srLong = W.simulateFire({ rof: 480, magSize: 4, reloadTicks: 100, shotsInBurst: 9, delayAfterBurst: 380, trace: 40 });
  const i36 = srLong.trace[35], i37 = srLong.trace[36];
  check('Shot-reload mode: burst ending on an empty mag stretches the reload to DelayAfterBurst', i37 - i36 === 380, [i36, i37]);

  // Energy (MustCharge): the charger adds DesiredPower per pass until MaxCharge; 240-shot mag at 3600 RPM, ReloadTime 241
  const e = W.energy({ energy: true, energyCost: 0.78, baseDamage: 150, rof: 3600, reloadTicks: 241, energyMagazineSize: 240 });
  const el = W.simulateFire({ rof: 3600, magSize: 240, reloadTicks: 241, energy: true, chargeTicks: e.chargeTicks, trace: 241 });
  check('Energy reload: 241 charge passes from the tick after the last shot (next shot at 482)', e.chargeTicks === 241 && el.trace[240] === 482, [e.chargeTicks, el.trace[240]]);

  // Hybrid: ReloadEndTick timer and the charge both have to finish; DelayUntilFire replays after
  const hy = W.simulateFire({ rof: 60, magSize: 1, reloadTicks: 600, delayUntilFire: 120, hybrid: true, chargeTicks: 600, trace: 2 });
  check('Hybrid reload: max(timer, charge) + DelayUntilFire (shots at 121 and 842)', eq(hy.trace, [121, 842]), hy.trace);

  // Non-reloadable energy (ReloadTime 0) never stops
  const c = W.simulateFire({ rof: 1200, magSize: 1, reloadTicks: 0, energy: true });
  check('Continuous energy weapon fires at full RoF', near(c.roundsPerSec, 20, 1e-9) && !c.reloadable, c.roundsPerSec);

  // Heat: with heat never draining to 0, heat in = heat out, so the long-run rate is HeatSinkRate / HeatPerShot
  const h1 = W.simulateFire({ rof: 1200, magSize: 1, energy: true, heatPerShot: 2, maxHeat: 200, cooldown: 0.95, heatSinkRate: 4, degradeRof: true, maxTicks: 216000 });
  check('Heat + DegradeRof (PD laser): sustained rate = HeatSinkRate / HeatPerShot = 2/s', near(h1.roundsPerSec, 2, 0.01) && h1.heatLimited, h1.roundsPerSec);
  const h2 = W.simulateFire({ rof: 600, magSize: 1, energy: true, heatPerShot: 10, maxHeat: 100, cooldown: 0.5, heatSinkRate: 30, maxTicks: 216000 });
  check('Overheat + Cooldown 0.5: sustained rate = HeatSinkRate / HeatPerShot = 3/s', near(h2.roundsPerSec, 3, 0.01), h2.roundsPerSec);
  const h3 = W.simulateFire({ rof: 600, magSize: 1, energy: true, heatPerShot: 10, maxHeat: 100, cooldown: 0.5, heatSinkRate: 30, allowOverheatShooting: true });
  check('AllowOverheatShooting: heat clamps at MaxHeat and the weapon never stalls', near(h3.roundsPerSec, 10, 1e-9), h3.roundsPerSec);
  const h4 = W.simulateFire({ rof: 600, magSize: 1, energy: true, heatPerShot: 1, maxHeat: 100, heatSinkRate: 60 });
  check('Heat sink above heat generation: full rate', near(h4.roundsPerSec, 10, 1e-9) && !h4.heatLimited, h4.roundsPerSec);

  // Cooldown clamps to 0.95 (WeaponSystem.Heat) and DegradeRof falls back to WC defaults
  const hc = W.heatConstants({ degradeRof: true, cooldown: 2, heatThresholdStart: 0, rofAt100Heat: 0 });
  check('Heat constants: Cooldown clamp 0.95, DegradeRof defaults 0.8 / 0.4 / 1 / 0.25', hc.coolDown === 0.95 && hc.heatThresholdStart === 0.8 && hc.heatThresholdEnd === 0.4 && hc.rofAt0Heat === 1 && hc.rofAt100Heat === 0.25, hc);
}

// ============================================================================
// B. AmmoConstants.Energy(): float32 maths
// ============================================================================
console.log('\n[B] Energy constants (float32)');
{
  const f = Math.fround;
  // 500f * (60 / 3600f) = 8.333334f; x2 barrels = 16.666668f; x120 ticks = 2000.0002f -> Math.Ceiling = 2001
  const e = W.energy({ energy: true, energyCost: 0.5, baseDamage: 1000, rof: 60, barrels: 2, traj: 1, reloadTicks: 120 });
  const hand = Math.ceil(f(f(f(f(f(0.5) * f(1000)) * f(60 / 3600)) * 2) * 120));
  check('Derived energy magazine = ceil(float32 power x ReloadTime) = 2001', e.energyMagSize === 2001 && hand === 2001, e.energyMagSize);
  const ew = W.energy({ energy: true, energyCost: 2, baseDamage: 1000, ewar: true, ewarStrength: 50, rof: 3600, reloadTicks: 10 });
  check('EWAR rounds cost EnergyCost x Ewar.Strength per shot', ew.shotEnergyCost === 100, ew.shotEnergyCost);
  const hy = W.energy({ hybrid: true, energyCost: 1, baseDamage: 10, rof: 60, reloadTicks: 60, magCapacity: 3 });
  check('Hybrid rounds must charge but keep the physical magazine capacity', hy.mustCharge && hy.reloadable && hy.magazineSize === 3, hy);
  const ph = W.energy({ energyCost: 5, baseDamage: 100, rof: 600, magCapacity: 30, reloadTicks: 60 });
  check('Plain physical rounds draw no charge power even with an EnergyCost', !ph.mustCharge && ph.desiredPower === 0, ph);
  const zero = W.energy({ energy: true, energyCost: 0, baseDamage: 100, rof: 60, reloadTicks: 300 });
  check('Zero-cost energy weapons finish charging on the first pass', zero.chargeTicks === 1, zero.chargeTicks);
  const bmE = W.energy({ energy: true, shotsInBurst: 5, reloadTicks: 60 }), bmP = W.energy({ magCapacity: 4, shotsInBurst: 5, delayAfterBurst: 10 });
  check('BurstMode: energy always, physical only when capacity >= ShotsInBurst (else shot-reload mode)', bmE.burstMode && !bmP.burstMode && bmP.shotReload);
}

// ============================================================================
// C. Area damage: SessionDamageMgr.RadiantAoe + falloff switch
// ============================================================================
console.log('\n[C] Area of effect');
{
  // Literal transcription of RadiantAoe's loops on a solid hull (cubes exist for depth index >= 0 into the hull)
  function radiantReference(radiusM, depthM, shape, grid) {
    const gridSizeR = grid === 'Small' ? 2 : 0.4;
    const radius = radiusM * gridSizeR, depth = depthM * gridSizeR;
    if (depth <= 0 || radius <= 0) return [];
    const maxradius = Math.floor(radius), maxdepth = Math.ceil(depth);
    let minX = -maxradius, maxX = maxradius;
    if (depth < radius) { minX = -maxdepth + 1; maxX = maxdepth - 1; }
    const rings = new Array(maxradius + 1).fill(0);
    for (let i = minX; i <= maxX; i++) {
      if (i < 0) continue; // outside the hull: TryGetCube fails
      for (let j = -maxradius; j <= maxradius; j++) {
        for (let k = -maxradius; k <= maxradius; k++) {
          const hitdist = shape === 'Diamond' ? Math.abs(i) + Math.abs(j) + Math.abs(k) : Math.round(Math.sqrt(i * i + j * j + k * k));
          if (hitdist <= maxradius) rings[hitdist]++;
        }
      }
    }
    return rings;
  }
  const cases = [[7, 7, 'Diamond', 'Large'], [5, 2, 'Round', 'Large'], [4, 4, 'Round', 'Small'], [101, 1, 'Round', 'Large'], [3, 1, 'Diamond', 'Small'], [2, 0, 'Round', 'Large']];
  for (const [r, d, sh, g] of cases) {
    check(`RadiantAoe rings r=${r} m depth=${d} m ${sh} ${g}`, eq(W.aoeRings(r, d, sh, g), radiantReference(r, d, sh, g)));
  }
  // Falloff: per-ring damage from the DamageGrid switch, maxfalldist = radius x GridSizeR + 1
  const rings = W.aoeRings(5, 5, 'Diamond', 'Large');
  const mfd = 5 * 0.4 + 1;
  const sum = (fn) => rings.reduce((s, n, j) => s + n * fn(j), 0);
  const D = 1000;
  const expect = {
    NoFalloff: sum(() => D), Linear: sum((j) => (mfd - j) / mfd * D), Curve: sum((j) => D - j / mfd / (mfd - j) * D),
    InvCurve: sum((j) => (mfd - j) / mfd * (mfd - j) / mfd * D), Squeeze: sum((j) => (j + 1) / mfd / (mfd - j) * D),
    Exponential: sum((j) => 1 / (j + 1) * D), Pooled: D, Legacy: 0
  };
  for (const [fo, want] of Object.entries(expect)) {
    const got = W.aoeDamage({ enable: true, damage: D, radius: 5, depth: 5, falloff: fo, shape: 'Diamond' }, 'Large', false);
    check(`EndOfLife ${fo} total on a solid hull`, near(got, want, 1e-12), [got, want]);
  }
  const bbh = W.aoeDamage({ enable: true, damage: D, radius: 5, depth: 5, falloff: 'NoFalloff', shape: 'Diamond' }, 'Large', true);
  check('ByBlockHit skips the impact block (root step takes the base hit)', bbh === expect.NoFalloff - D, bbh);
  const cap = W.aoeDamage({ enable: true, damage: D, radius: 5, depth: 5, falloff: 'NoFalloff', shape: 'Diamond', maxAbsorb: 2500 }, 'Large', false);
  check('MaxAbsorb caps the area total', cap === 2500, cap);
  check('Disabled area effect deals nothing', W.aoeDamage({ enable: false, damage: D, radius: 5, depth: 5, falloff: 'Pooled' }, 'Large') === 0);
}

// ============================================================================
// D. Damage model and scaling
// ============================================================================
console.log('\n[D] Damage model');
{
  const p1 = W.penetration(1000000, 20000), p2 = W.penetration(1010000, 20000);
  check('BaseDamageCutoff: pool spends Cutoff per block while > 0.5 remains (50 / 51 blocks)', p1.blocks === 50 && p2.blocks === 51 && p1.perBlock === 20000, [p1, p2]);

  const T = (grid, armor) => ({ grid, armor });
  const ammo = (ds, extra) => Object.assign({ damageScales: ds }, extra || {});
  const flak = ammo({ gridLarge: 0, gridSmall: 0 });
  check('Grids = 0 zeroes block damage on both grid sizes', W.blockDamageScale(flak, T('Large', 'heavy'), 'Large') === 0 && W.blockDamageScale(flak, T('Small', 'light'), 'Large') === 0);
  const ap = ammo({ armorArmor: 2, heavyArmor: 1.5, lightArmor: 0.5, nonArmor: 0.25, gridSmall: 0.75 });
  check('Armor scaling: Armor x Heavy, Armor x Light, NonArmor alone, Small grid scale on top',
    W.blockDamageScale(ap, T('Large', 'heavy')) === 3 && W.blockDamageScale(ap, T('Large', 'light')) === 1 && W.blockDamageScale(ap, T('Large', 'nonArmor')) === 0.25
    && W.blockDamageScale(ap, T('Small', 'heavy')) === 2.25);
  check('NoGridOrArmorScaling ignores armor and grid multipliers', W.blockDamageScale(Object.assign({}, ap, { noGridOrArmorScaling: true }), T('Small', 'heavy')) === 1);
  const plain = ammo({ gridLarge: -1, gridSmall: -1 });
  check('Large-grid shooter vs small grid with unset Grids scales: 0.25x (smallVsLargeBuff)',
    W.blockDamageScale(plain, T('Small', 'heavy'), 'Large') === 0.25 && W.blockDamageScale(plain, T('Small', 'heavy'), 'Small') === 1
    && W.blockDamageScale(ammo({ gridLarge: -1, gridSmall: 0.75 }), T('Small', 'heavy'), 'Large') === 0.75);

  // Weapon-mode Pattern (Weapon.Shoot patternIndex)
  const resolve = (n) => ({ ammoRound: n });
  const pStep = W.weaponPattern({ pattern: { mode: 'Weapon', patterns: ['A'], patternSteps: 2 } }, resolve);
  check('Pattern PatternSteps 2 of [parent, A] spawns 2 per trajectile', pStep.active && pStep.count === 2 && pStep.members.length === 2, pStep);
  const pRand = W.weaponPattern({ pattern: { mode: 'Weapon', random: true, randomMin: 1, randomMax: 2, skipParent: true, patterns: ['A', 'B', 'C'] } }, resolve);
  check('Pattern Random Range(1, 2) always rolls 1 (XorShift Range is max-exclusive)', pRand.count === 1 && pRand.members.length === 3, pRand);
  const pAll = W.weaponPattern({ pattern: { enable: true, patterns: ['A', 'B'] } }, resolve);
  check('Pattern without steps spawns every entry (parent + 2)', pAll.count === 3, pAll.count);
  const pFrag = W.weaponPattern({ pattern: { mode: 'Fragment', patterns: ['A'] } }, resolve);
  const pEmpty = W.weaponPattern({ pattern: { mode: 'Weapon', patterns: [''] } }, resolve);
  check('Fragment-mode and empty patterns do not multiply weapon shots', !pFrag.active && !pEmpty.active);

  const hk = W.pdHitsToKill({ damageScales: { healthHitModifier: 10 } }, { health: 95 });
  const hk0 = W.pdHitsToKill({ damageScales: { healthHitModifier: 0 } }, { health: 3 });
  check('PD hits to kill = ceil(Health / HealthHitModifier), modifier <= 0 counts as 1', hk === 10 && hk0 === 3, [hk, hk0]);
  check('Hitscan: Beams.Enable with Guidance None, or >= 10 km/s',
    W.isHitscan({ beams: { enable: true }, trajectory: { guidance: 'None', desiredSpeed: 4100 } })
    && !W.isHitscan({ beams: { enable: true }, trajectory: { guidance: 'Smart', desiredSpeed: 500 } })
    && W.isHitscan({ trajectory: { desiredSpeed: 50000 } }) && !W.isHitscan({ trajectory: { desiredSpeed: 0 } }));
}

// ============================================================================
// E. Source pipeline maps every WC field the maths reads (all ammos and weapons)
// ============================================================================
console.log('\n[E] Pipeline field fidelity (live CoreParts source)');
const cs = {};
for (const f of fs.readdirSync(path.join(root, 'CoreParts'))) {
  if (f.endsWith('.cs') && !/Animation/.test(f)) cs[f] = fs.readFileSync(path.join(root, 'CoreParts', f), 'utf8');
}
const parsed = SP.parseAll(cs);
{
  const bad = [];
  const eqv = (name, field, got, want) => { if (JSON.stringify(got) !== JSON.stringify(want)) bad.push(`${name}.${field}: ${JSON.stringify(got)} != ${JSON.stringify(want)}`); };
  for (const [name, entry] of Object.entries(parsed.ammos)) {
    const d = entry.def, s = SP.ammoShape(name, d, '');
    const ao = d.AreaOfDamage || {}, eol = ao.EndOfLife || {}, bb = ao.ByBlockHit || {}, ew = d.Ewar || {}, pat = d.Pattern || {};
    const ds = d.DamageScales || {}, grids = ds.Grids || {}, traj = d.Trajectory || {}, frag = d.Fragment || {}, ts = frag.TimedSpawns || {};
    eqv(name, 'endOfLife.enable', s.areaOfDamage.endOfLife.enable, eol.Enable === true);
    eqv(name, 'endOfLife.damage', s.areaOfDamage.endOfLife.damage, eol.Damage || 0);
    eqv(name, 'endOfLife.falloff', s.areaOfDamage.endOfLife.falloff, eol.Falloff || 'Legacy');
    eqv(name, 'byBlockHit.enable', s.areaOfDamage.byBlockHit.enable, bb.Enable === true);
    eqv(name, 'ewar.enable', s.ewar.enable, ew.Enable === true);
    eqv(name, 'ewar.strength', s.ewar.strength, ew.Strength || 0);
    eqv(name, 'pattern.mode', s.pattern.mode, pat.Mode || 'Never');
    eqv(name, 'pattern.patterns', s.pattern.patterns, pat.Patterns || []);
    eqv(name, 'pattern.patternSteps', s.pattern.patternSteps, pat.PatternSteps || 0);
    eqv(name, 'beams.enable', s.beams.enable, !!(d.Beams && d.Beams.Enable));
    eqv(name, 'isBeam', s.isBeam, !!(d.Beams && d.Beams.Enable && (traj.Guidance || 'None') === 'None') || (traj.DesiredSpeed || 0) >= 10000);
    eqv(name, 'gridLarge', s.damageScales.gridLarge, grids.Large !== undefined ? grids.Large : -1);
    eqv(name, 'gridSmall', s.damageScales.gridSmall, grids.Small !== undefined ? grids.Small : -1);
    eqv(name, 'noGridOrArmorScaling', s.noGridOrArmorScaling, d.NoGridOrArmorScaling === true);
    eqv(name, 'hybridRound', s.hybridRound, d.HybridRound === true);
    eqv(name, 'objectsHit.maxObjectsHit', s.objectsHit.maxObjectsHit, (d.ObjectsHit && d.ObjectsHit.MaxObjectsHit) || 0);
    eqv(name, 'fragment.ammoRound', s.fragment.ammoRound, frag.AmmoRound || '');
    eqv(name, 'timedSpawns.maxSpawns', s.fragment.timedSpawns.maxSpawns, ts.MaxSpawns || 0);
    eqv(name, 'timedSpawns.parentDies', s.fragment.timedSpawns.parentDies, ts.ParentDies === true);
    eqv(name, 'heatModifier', s.heatModifier, d.HeatModifier === undefined ? 1 : d.HeatModifier);
    eqv(name, 'guidance', s.trajectory.guidance, traj.Guidance || 'None');
  }
  check(`Every ammo def maps AoE / EWAR / Pattern / Beams / scaling / fragment fields (${Object.keys(parsed.ammos).length} ammos)`, bad.length === 0, bad.slice(0, 8));

  const wbad = [];
  for (const w of parsed.weapons) {
    const subs = w.subtypeIds || [];
    subs.forEach((sub, idx) => {
      const e = SP.weaponEntry(w, sub, idx, null, {}, parsed.defs, {}, {});
      const hp = (typeof w.def.HardPoint === 'object' && !w.def.HardPoint.__id) ? w.def.HardPoint : (parsed.defs[w.def.HardPoint] || {}).value || {};
      const L = (typeof hp.Loading === 'string' ? (parsed.defs[hp.Loading] || {}).value : hp.Loading) || {};
      const want = {
        rateOfFire: L.RateOfFire || 0, barrelsPerShot: L.BarrelsPerShot || 1, trajectilesPerBarrel: L.TrajectilesPerBarrel || 1,
        reloadTime: L.ReloadTime || 0, magsToLoad: L.MagsToLoad || 0, shotsInBurst: L.ShotsInBurst || 0, delayAfterBurst: L.DelayAfterBurst || 0,
        delayUntilFire: L.DelayUntilFire || 0, heatPerShot: L.HeatPerShot || 0, maxHeat: L.MaxHeat || 0, cooldown: L.Cooldown || 0,
        heatSinkRate: L.HeatSinkRate || 0, degradeRof: L.DegradeRof === true, fireFull: L.FireFull === true,
        allowOverheatShooting: L.AllowOverheatShooting === true
      };
      for (const [k, v] of Object.entries(want)) if (e[k] !== v) wbad.push(`${sub}.${k}: ${e[k]} != ${v}`);
      if (JSON.stringify(e.allAmmos) !== JSON.stringify(w.assignedAmmos)) wbad.push(`${sub}.allAmmos`);
    });
  }
  check(`Every weapon mount maps HardPoint.Loading + full Ammos list (${parsed.weapons.length} weapon defs)`, wbad.length === 0, wbad.slice(0, 8));
}

// ============================================================================
// F. Studio maths on the bundled data
// ============================================================================
console.log('\n[F] Studio maths on the mod data');
const studio = loadStudio();
{
  const r = studio.run(`(() => {
    const out = { ewarLeaks: [], eolLeaks: [], fragMiss: [], rateOver: [], nonFinite: [], weapons: weaponsDb.length };
    for (const [k, a] of Object.entries(ammosDb)) {
      const d = getAmmoDamageDetailed(a, 0, null, { noPattern: true });
      if (a.ewar && a.ewar.enable && (d.base !== 0 || d.aoe !== 0)) out.ewarLeaks.push(k);
      if (a.areaOfDamage && a.areaOfDamage.endOfLife && !a.areaOfDamage.endOfLife.enable && d.eol !== 0) out.eolLeaks.push(k);
    }
    for (const w of weaponsDb) {
      const pool = w.allAmmos || w.assignedAmmos || [];
      for (const k of pool) {
        const a = ammosDb[k];
        if (!a || !a.fragment || !a.fragment.enable || !a.fragment.ammoRound) continue;
        const inWeapon = pool.some((x) => ammosDb[x] && ammosDb[x].ammoRound === a.fragment.ammoRound);
        const child = resolveAmmoRound(a.fragment.ammoRound, w);
        if (inWeapon && (!child || child.ammoRound !== a.fragment.ammoRound)) out.fragMiss.push(w.subtypeId + ':' + k);
      }
      const a = ammosDb[getSelectableAmmos(w)[0]];
      if (!a) continue;
      const fp = getFireCycleParams(w, a, false);
      const cyc = computeFireCycle(fp);
      const cap = Math.max(1, Math.floor(fp.rof)) / 60 * fp.barrels;
      if (cyc.roundsPerSec > Math.max(cap, 60 * fp.barrels) + 1e-9) out.rateOver.push(w.subtypeId);
      const m = calculateWeaponMetrics(w);
      if (![m.sustainedDps, m.effectiveDps, m.magazineDamage, m.power].every(Number.isFinite)) out.nonFinite.push(w.subtypeId);
    }
    const W = (sub) => weaponsDb.find((w) => w.subtypeId === sub);
    const byAmmo = (key) => weaponsDb.find((w) => (w.allAmmos || []).includes(key) && !isNpcWeapon(w));
    const warheadW = weaponsDb.find((w) => { const a = ammosDb[w.ammoName]; return a && a.pattern && a.pattern.mode === 'Weapon' && a.pattern.patternSteps > 1; });
    const warhead = warheadW ? getAmmoDamageDetailed(ammosDb[warheadW.ammoName], 0, warheadW) : null;
    const flakW = weaponsDb.find((w) => { const a = ammosDb[w.ammoName]; return a && a.damageScales && a.damageScales.gridLarge === 0 && a.damageScales.gridSmall === 0 && a.fragment && a.fragment.enable; });
    const flakM = flakW ? calculateWeaponMetrics(flakW) : null;
    const pd = weaponsDb.find((w) => w.heatPerShot > 0 && w.degradeRof && !isNpcWeapon(w));
    const pdCyc = pd ? computeFireCycle(getFireCycleParams(pd, ammosDb[pd.ammoName], false)) : null;
    const pdPower = pd ? getWeaponPowerDraw(pd, ammosDb[pd.ammoName]) : null;
    return Object.assign(out, {
      warhead: warhead && { count: warhead.pattern && warhead.pattern.count, frag: warhead.frag },
      flak: flakM && { sustained: flakM.sustainedDps, effective: flakM.effectiveDps, frag: getAmmoDamageDetailed(ammosDb[flakW.ammoName], 0, flakW).frag },
      pd: pdCyc && { rate: pdCyc.roundsPerSec, rof: pd.rateOfFire, heat: pd.heatPerShot, sink: pd.heatSinkRate, limited: pdCyc.heatLimited },
      pdPower
    });
  })()`);
  check('EWAR rounds deal no base / area damage in the data', r.ewarLeaks.length === 0, r.ewarLeaks);
  check('Disabled EndOfLife never adds damage in the data', r.eolLeaks.length === 0, r.eolLeaks);
  check('Fragment rounds resolve by AmmoRound within each weapon\'s Ammos', r.fragMiss.length === 0, r.fragMiss);
  check(`No weapon fires faster than RoF x barrels (${r.weapons} mounts)`, r.rateOver.length === 0, r.rateOver);
  check('All weapon metrics are finite', r.nonFinite.length === 0, r.nonFinite);
  check('Weapon-mode pattern with PatternSteps spawns its members per shot, fragments included', !!r.warhead && r.warhead.count === 2 && r.warhead.frag > 0, r.warhead);
  check('Proximity flak: the carrier 1 hp anti-missile blast is not block damage, so DPS is the shrapnel alone',
    !!r.flak && r.flak.sustained === r.flak.effective && r.flak.effective > 0 && r.flak.frag > 0, r.flak);
  check('Heat-limited PD weapon sustains HeatSinkRate / HeatPerShot, not its RoF',
    !!r.pd && r.pd.limited && near(r.pd.rate, r.pd.sink / r.pd.heat, 0.02) && r.pd.rate < r.pd.rof / 60, r.pd);
  check('Energy weapon power = IdlePower + charge draw (SinkPower)', !!r.pdPower && r.pdPower.mustCharge && r.pdPower.operational > r.pdPower.idle, r.pdPower);
  const phys = studio.run(`(() => { const w = weaponsDb.find((x) => { const a = ammosDb[x.ammoName]; return a && !isEnergyAmmo(a) && !a.hybridRound; });
    const a = Object.assign({}, ammosDb[w.ammoName], { energyCost: 5 }); return getWeaponPowerDraw(w, a); })()`);
  check('Physical rounds draw only IdlePower even with an EnergyCost', phys.operational === phys.idle && !phys.mustCharge, phys);

  // Cross-check against WeaponCore's own estimator (AmmoConstants.GetShotsPerSecond) for plain mag weapons:
  // it ignores DelayUntilFire and the one-tick reload handoff, so it may only differ by a small margin.
  function wcGetShotsPerSecond(magCapacity, magPerReload, rof, reloadTime, barrels, traj) {
    magPerReload = Math.max(1, magPerReload);
    const tot = magCapacity * magPerReload;
    let shotsPerMag = tot === 1 ? 0 : Math.ceil(tot / barrels) - 1;
    if (reloadTime === 0) shotsPerMag = tot === 1 ? 0 : Math.ceil(tot / barrels);
    let t = (shotsPerMag === 0 ? 0 : shotsPerMag * (3600 / rof)) + reloadTime;
    if (t === 0) t = 3600 / rof;
    if (t < 3600 / rof) t = 3600 / rof;
    return 1 / ((t / 60) / tot) * traj;
  }
  const rows = studio.run(`weaponsDb.filter((w) => !isNpcWeapon(w)).map((w) => {
    const a = ammosDb[getSelectableAmmos(w)[0]]; if (!a) return null;
    const fp = getFireCycleParams(w, a, false);
    if (fp.delayUntilFire || fp.shotsInBurst || fp.heatPerShot || fp.energy || fp.hybrid || (3600 / fp.rof) % 1) return null;
    return { sub: w.subtypeId, fp, rate: computeFireCycle(fp).roundsPerSec * fp.trajPerBarrel };
  }).filter(Boolean)`);
  const off = rows.filter((x) => !near(x.rate, wcGetShotsPerSecond(x.fp.magSize, x.fp.mags, x.fp.rof, x.fp.reloadTicks, x.fp.barrels, x.fp.trajPerBarrel), 0.03));
  check(`Plain mag weapons within 3% of WC GetShotsPerSecond (${rows.length} weapons)`, rows.length > 0 && off.length === 0, off.map((x) => x.sub));
}

// ============================================================================
// G. Scalability: no calculation keys off a specific weapon or ammo name
// ============================================================================
console.log('\n[G] Scalability lint');
{
  const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:\\])\/\/.*$/gm, '$1');
  const files = ['app.js', 'ammo_maths.js', 'wc_math.js', 'wc_editor.js'];
  const vocab = new Set();
  const add = (s) => { if (s && s.length >= 4) vocab.add(s.toLowerCase()); };
  const words = (s) => String(s || '').split(/[^A-Za-z0-9]+/).forEach(add);
  const data = { w: JSON.parse(fs.readFileSync(path.join(root, 'studio/data/weapons_db.json'), 'utf8')), a: JSON.parse(fs.readFileSync(path.join(root, 'studio/data/ammos_db.json'), 'utf8')) };
  for (const w of data.w) { add(w.subtypeId); add(w.id); words(w.name); }
  for (const [k, a] of Object.entries(data.a)) { add(k); add(a.ammoRound); add(a.ammoMagazine); words(a.terminalName); }
  ['laser', 'plasma', 'railgun', 'coilgun', 'flak', 'gatling', 'torpedo', 'missile', 'rocket', 'drone', 'radar', 'designator', 'sensor', 'flare', 'sabot', 'cannon', 'warhead', 'falcon', 'tuukka', 'longsword'].forEach(add);
  // Engine vocabulary that legitimately appears in code: SE block TypeIds, default icon/sound names, WC enum members
  // (Heavy/Light armor classes, Fragment pattern mode, ...) and UI theme names
  const allow = new Set(['smallgatlinggun', 'smallmissilelauncher', 'interiorturret', 'md_largegatlingloopfire', 'wepturretgatlingrotate', 'wepshipgatlingnoammo',
    'icons/l__gatling_avenger_turret.png', 'energy', 'none', 'large', 'small', 'fixed', 'turret', 'heavy', 'light', 'nonarmor', 'dark']);
  const schemaSrc = fs.readFileSync(path.join(root, 'studio/data/wc_schema.js'), 'utf8');
  const schema = JSON.parse(schemaSrc.slice(schemaSrc.indexOf('{'), schemaSrc.lastIndexOf('}') + 1));
  for (const members of Object.values(schema.enums || {})) for (const m of (Array.isArray(members) ? members : Object.keys(members))) allow.add(String(m).toLowerCase());
  // UI-only: the landing page preselects the Avenger when present and falls back to the first weapon otherwise
  const uiDefaults = [/const avenger = nonHandheld\.find\(/];
  const hits = [];
  for (const f of files) {
    const src = strip(fs.readFileSync(path.join(root, 'studio', f), 'utf8'));
    const lines = src.split(/\r?\n/);
    lines.forEach((line, i) => {
      if (uiDefaults.some((re) => re.test(line))) return;
      // Name tests: /x|y/i.test(...), .includes('x'), .indexOf('x'), .startsWith('x'), === 'x' / !== 'x'
      const pats = [/\/([^/\n]+)\/[gimsuy]*\.test\(/g, /\.(?:includes|indexOf|startsWith|endsWith)\(\s*['"`]([^'"`]+)['"`]/g, /[!=]==\s*['"`]([^'"`]+)['"`]/g];
      for (const re of pats) {
        let m;
        while ((m = re.exec(line))) {
          const lit = m[1].toLowerCase();
          if (allow.has(lit)) continue;
          const tokens = lit.split(/[^a-z0-9_]+/).filter(Boolean);
          if (tokens.some((t) => vocab.has(t) && !allow.has(t))) hits.push(`${f}:${i + 1}: ${line.trim().slice(0, 110)}`);
        }
      }
    });
  }
  check('No weapon/ammo-name rules in the studio maths (name literals in tests or comparisons)', hits.length === 0, hits.slice(0, 12));
}

done('WeaponCore parity');
