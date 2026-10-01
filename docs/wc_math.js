// wc_math.js — WeaponCore (CoreSystems) runtime math, replicated for the Studio.
// Zero dependencies, no DOM. Browser: global WcMath. Node: module.exports (tests).
// Every rule here is driven by def fields only (never by a weapon or ammo name), and each
// function cites the CoreSystems source it mirrors so it can be re-checked after a WC update.
(function (root) {
'use strict';

const f32 = Math.fround;
const TICKS_PER_SEC = 60;

function num(v, d) { const n = parseFloat(v); return isFinite(n) ? n : (d || 0); }
function int(v, d) { const n = parseInt(v, 10); return isFinite(n) ? n : (d || 0); }

/// <summary>
/// AmmoConstants.Energy() + WeaponState.UpdateDesiredPower(), in float32 like the C# source.
/// energy = magazine "Energy"/empty; hybrid = HybridRound. MustCharge = energy || hybrid.
/// Returns the per-tick power draw, charge size, charge passes (SessionCharging) and magazine size.
/// </summary>
function energy(p) {
  const isEnergy = !!p.energy;
  const hybrid = !!p.hybrid && !isEnergy;
  const mustCharge = isEnergy || hybrid;
  const reloadTicks = Math.max(0, int(p.reloadTicks));
  const rof = Math.max(0, int(p.rof));
  const barrels = Math.max(1, int(p.barrels, 1));
  const traj = Math.max(1, int(p.traj, 1));
  const S = Math.max(0, int(p.shotsInBurst));
  const DAB = Math.max(0, int(p.delayAfterBurst));
  const capacity = Math.max(0, int(p.magCapacity));
  const burstMode = S > 0 && (isEnergy || capacity >= S);
  const shotReload = !burstMode && S > 0 && DAB > 0;
  const reloadable = !isEnergy || (mustCharge && reloadTicks > 0);
  if (!mustCharge) {
    return { mustCharge, hybrid, reloadable, burstMode, shotReload, shotEnergyCost: 0, powerPerTick: 0, desiredPower: 0, chargeSize: 0, chargeTicks: 0, energyMagSize: 0, magazineSize: capacity };
  }
  const baseDamage = f32(Math.max(num(p.baseDamage), 0.000001));
  const cost = f32(num(p.energyCost));
  const shotEnergyCost = p.ewar ? f32(cost * f32(num(p.ewarStrength))) : f32(cost * baseDamage);
  const shotsPerTick = f32(rof / 3600);
  const powerPerTick = f32(f32(f32(shotEnergyCost * shotsPerTick) * barrels) * traj);
  const chargeSize = f32(powerPerTick * (reloadTicks > 0 ? reloadTicks : 1));
  const explicitMag = Math.max(0, int(p.energyMagazineSize));
  const energyMagSize = explicitMag > 0 ? explicitMag : Math.ceil(chargeSize);
  // WeaponState.UpdateDesiredPower: ShotEnergyCost * (RoF / 60 * 1/60) * barrels * trajectiles
  const desiredPower = f32(f32(f32(shotEnergyCost * f32(f32(rof / 60) * f32(1 / 60))) * barrels) * traj);
  // SessionCharging.WeaponCharged: CurrentCharge += AssignedPower each charger pass, clamped to MaxCharge
  let chargeTicks = 1;
  if (chargeSize > 0 && desiredPower > 0) {
    let c = 0;
    chargeTicks = 0;
    while (c < chargeSize && chargeTicks < 1e7) { c = f32(Math.min(f32(c + desiredPower), chargeSize)); chargeTicks++; }
  } else if (chargeSize > 0) chargeTicks = Infinity;
  return {
    mustCharge, hybrid, reloadable, burstMode, shotReload, shotEnergyCost, powerPerTick, desiredPower, chargeSize, chargeTicks,
    energyMagSize, magazineSize: isEnergy ? energyMagSize : capacity
  };
}

/// <summary>
/// WeaponSystem.Heat(): DegradeRof settings fall back to WC defaults, Cooldown is clamped to 0..0.95.
/// </summary>
function heatConstants(p) {
  const deg = !!p.degradeRof;
  let start = num(p.heatThresholdStart), end = num(p.heatThresholdEnd), r0 = num(p.rofAt0Heat), r100 = num(p.rofAt100Heat);
  if (!deg || start <= 0 || start > 1) start = 0.8;
  if (!deg || end <= 0 || end > 1) end = 0.4;
  if (!deg || r0 <= 0) r0 = 1;
  if (!deg || r100 <= 0) r100 = 0.25;
  return {
    degradeRof: deg, maxHeat: int(p.maxHeat), coolDown: Math.min(0.95, Math.max(0, num(p.cooldown))),
    heatThresholdStart: start, heatThresholdEnd: end, rofAt0Heat: r0, rofAt100Heat: r100,
    overheatMult: num(p.heatSinkRateOverheatMult), allowOverheatShooting: !!p.allowOverheatShooting
  };
}

/// <summary>
/// Tick-accurate replica of a weapon holding the trigger on a live target with an unlimited ammo supply.
/// Mirrors, per game tick and in the same order as Session.Simulate():
///   FutureEvents  - Weapon.UpdateWeaponHeat every 20 ticks (HeatSinkRate / 3, overheat clear, DegradeRof)
///   AiLoop        - reload check (ComputeServerStorage/ServerReload/StartReload, ReloadEndTick) then the
///                   shoot gate (reloadingGuard, overheat + OverHeatCountDown, StopShooting)
///   Charger       - SessionCharging passes for energy / hybrid reloads
///   ShootWeapons  - Weapon.Shoot(): DelayUntilFire, TicksPerShot, barrels, heat, ShotsInBurst modes, FinishMode
/// Returns the steady-state consumption measured between reload (or overheat-recovery) boundaries.
/// </summary>
function simulateFire(p) {
  const rofBase = Math.max(0, num(p.rof));
  const B = Math.max(1, int(p.barrels, 1));
  const T = Math.max(1, int(p.traj, 1));
  const M = Math.max(1, int(p.magSize, 1));
  const K = Math.max(1, int(p.mags, 1));
  const R = Math.max(0, int(p.reloadTicks));
  const D = Math.max(0, int(p.delayUntilFire));
  const S = Math.max(0, int(p.shotsInBurst));
  const DAB = Math.max(0, int(p.delayAfterBurst));
  const isEnergy = !!p.energy;
  const hybrid = !!p.hybrid && !isEnergy;
  const mustCharge = isEnergy || hybrid;
  const reloadable = !isEnergy || (mustCharge && R > 0);
  const burstMode = S > 0 && (isEnergy || M >= S);
  const shotReload = !burstMode && S > 0 && DAB > 0;
  const fireFull = !!p.fireFull;
  const chargeTicks = mustCharge ? (p.chargeTicks === undefined ? Math.max(1, R) : p.chargeTicks) : 0;
  const hc = heatConstants(p);
  const heatPerShot = num(p.heatPerShot);
  const hasHeat = heatPerShot > 0;
  const sinkPerUpdate = num(p.heatSinkRate) / 3;
  const load = K * M;

  // Weapon.UpdateRof(): (int)(RoF * heat lerp when degrading), floor 1; TicksPerShot = (uint)(3600f / RateOfFire)
  let degrading = false, rofInt = 1, tps = 3600;
  function updateRof(heat) {
    let rate = rofBase;
    if (degrading) rate *= hc.rofAt0Heat + (hc.rofAt100Heat - hc.rofAt0Heat) * (hc.maxHeat > 0 ? heat / hc.maxHeat : 0);
    if (rate < 1) rate = 1;
    rofInt = Math.floor(rate);
    tps = Math.floor(f32(3600 / rofInt));
  }
  updateRof(0);
  const tpsBase = tps;

  // Run long enough for many cycles, capped at one game hour
  const events = Math.ceil(load / B);
  const estCycle = D + events * Math.max(1, tpsBase) + Math.max(R, chargeTicks === Infinity ? 0 : chargeTicks) + (S > 0 ? Math.ceil(events / S) * DAB : 0);
  const heatCycle = hasHeat && hc.maxHeat > 0 ? (hc.maxHeat / Math.max(sinkPerUpdate, 1e-3)) * 20 + hc.maxHeat / heatPerShot * Math.max(1, tpsBase) : 0;
  const ticks = Math.min(p.maxTicks || 216000, Math.max(7200, 30 * (estCycle + heatCycle)));

  let ammo = reloadable ? load : Infinity;
  let loading = false, loadEnd = Infinity, chargeLeft = 0, chargeDone = true, timerWait = false;
  let shotsFired = 0, ticksUntilShoot = 0, isShooting = false, preFired = false, shootTime = 0, lastShootTick = 0;
  let heat = 0, overheated = false, countdown = 0, heatNext = -1, pendingShoot = false;
  let rounds = 0, stallTicks = 0, prevShot = -1;
  const traceMax = int(p.trace);
  const trace = traceMax > 0 ? [] : null; // optional: tick of each round fired (tests)
  // Cycle boundaries: a load becoming ready (or, for non-reloadable weapons, an overheat clearing)
  const bounds = [];

  function boundary(t) { bounds.push({ t, rounds, first: -1, lastBefore: prevShot }); }
  function reloaded(t) {
    ammo = load;
    if (!shotReload) shotsFired = 0;
    loading = false; loadEnd = Infinity; timerWait = false;
    boundary(t);
  }
  // Weapon.StopShooting -> ResetShotState
  function stopShooting() { ticksUntilShoot = 0; isShooting = false; preFired = false; }

  for (let t = 1; t <= ticks; t++) {
    // FutureEvents: Weapon.UpdateWeaponHeat
    if (heatNext === t) {
      const hs = sinkPerUpdate * (overheated && hc.overheatMult !== 0 ? hc.overheatMult : 1);
      heat = heat >= hs ? heat - hs : 0;
      if (hc.degradeRof && heat >= hc.maxHeat * hc.heatThresholdStart) { degrading = true; updateRof(heat); }
      else if (degrading) { if (heat <= hc.maxHeat * hc.heatThresholdEnd) degrading = false; updateRof(heat); }
      if (overheated && heat <= hc.maxHeat * hc.coolDown) {
        overheated = false; countdown = 0;
        if (!reloadable) boundary(t);
      }
      heatNext = heat > 0 ? t + 20 : -1;
    }

    // AiLoop: reload check
    if (reloadable && !loading) {
      if (ammo === 0) {
        loading = true;
        let timer = 0;
        if (!mustCharge || hybrid) {
          const since = lastShootTick > 0 ? t - lastShootTick : 0;
          const delayTime = since <= DAB ? DAB - since : 0;
          const delay = delayTime > 0 && shotsFired === 0;
          if (R > 0 || delay) timer = (!delay || R > delayTime) ? R : delayTime;
        }
        chargeDone = !mustCharge;
        chargeLeft = mustCharge ? chargeTicks : 0;
        if (!mustCharge) {
          if (timer > 0) loadEnd = t + timer; else reloaded(t);
        } else if (hybrid) {
          if (timer > 0) loadEnd = t + timer; else reloaded(t);
        }
      }
    } else if (loading && t >= loadEnd) {
      if (hybrid && !chargeDone) { loadEnd = Infinity; timerWait = true; } else reloaded(t);
    }

    // AiLoop: shoot gate (SessionUpdate reloadingGuard / overHeat)
    const reloadingGuard = reloadable && (loading || ammo === 0);
    let overHeat = false;
    if (overheated) {
      if (countdown === 0) overHeat = true;
      else countdown--;
    }
    pendingShoot = !overHeat && !reloadingGuard;
    if (!pendingShoot) {
      if (isShooting || preFired) stopShooting();
      stallTicks++;
    }

    // Charger: energy / hybrid charge passes
    if (loading && mustCharge && !chargeDone) {
      if (--chargeLeft <= 0) {
        chargeDone = true;
        if (isEnergy || timerWait) reloaded(t + 1);
      }
    }

    // ShootWeapons: Weapon.Shoot()
    if (pendingShoot) {
      if (ticksUntilShoot++ < D) { preFired = true; continue; }
      preFired = false;
      if (t < shootTime) continue;
      shootTime = t + tps;
      lastShootTick = t;
      isShooting = true;
      for (let i = 0; i < B; i++) {
        if (reloadable) { if (ammo === 0) break; ammo--; }
        rounds++;
        const cur = bounds[bounds.length - 1];
        if (cur && cur.first < 0) cur.first = t;
        prevShot = t;
        if (trace && trace.length < traceMax) trace.push(t);
        if (hasHeat) {
          if (heatNext < 0) heatNext = t + 20;
          heat += heatPerShot;
          if ((heat >= hc.maxHeat || overheated) && !hc.allowOverheatShooting) {
            if (!overheated) countdown = 15;
            overheated = true;
            break;
          } else if (hc.allowOverheatShooting && heat >= hc.maxHeat) heat = hc.maxHeat;
        }
      }
      if (shotReload && ++shotsFired === S) {
        shotsFired = 0;
        shootTime = t + Math.max(DAB, tps);
      }
      if (fireFull || burstMode) {
        if (burstMode && ++shotsFired > S) shotsFired = 1;
        const outOfShots = reloadable && ammo === 0;
        const burstReset = burstMode && shotsFired === S;
        if (burstReset) shootTime = t + Math.max(DAB, tps);
        if (burstReset || (!burstMode && outOfShots)) stopShooting();
      }
    }
  }

  // Steady state: whole cycles between the first boundary past the warm-up and the last boundary
  let rate, cycles = 0, b0 = -1;
  const warm = ticks * 0.25;
  for (let i = 0; i < bounds.length; i++) if (bounds[i].t >= warm) { b0 = i; break; }
  const b1 = bounds.length - 1;
  if (b0 >= 0 && b1 > b0) {
    rate = (bounds[b1].rounds - bounds[b0].rounds) / (bounds[b1].t - bounds[b0].t);
    cycles = b1 - b0;
  } else {
    rate = rounds / ticks;
  }
  const roundsPerSec = rate * TICKS_PER_SEC;

  // Average cycle phases over the measured window (boundary -> first shot -> last shot -> next boundary)
  let spoolTicks = 0, fireTicks = 0, gapTicks = 0;
  if (cycles > 0 && reloadable) {
    let n = 0;
    for (let i = b0; i < b1; i++) {
      const first = bounds[i].first, last = bounds[i + 1].lastBefore, end = bounds[i + 1].t;
      if (first < 0 || last < first) continue;
      spoolTicks += first - bounds[i].t; fireTicks += last - first; gapTicks += end - last; n++;
    }
    if (n > 0) { spoolTicks /= n; fireTicks /= n; gapTicks /= n; }
  }
  return {
    roundsPerSec, reloadable, burstMode, shotReload, mustCharge, events, load, trace,
    ticksPerShot: tpsBase, spoolTicks, fireTicks, gapTicks,
    heatLimited: hasHeat && stallTicks > 0 && !reloadable, stallShare: stallTicks / ticks, simTicks: ticks
  };
}

const GRID_SIZE_M = { Large: 2.5, Small: 0.5 };
const ringCache = new Map();
/// <summary>
/// SessionDamageMgr.RadiantAoe block count per distance ring j (0 = impact block) on an ideal target: a solid
/// armor hull of 1x1x1 blocks hit square-on. Radius/Depth are metres (converted with GridSizeR); when Depth is
/// shorter than Radius only Depth layers into the hull are reached. Diamond = Manhattan distance, Round = rounded Euclidean.
/// </summary>
function aoeRings(radiusM, depthM, shape, grid) {
  const size = GRID_SIZE_M[grid] || GRID_SIZE_M.Large;
  const radius = num(radiusM) / size, depth = num(depthM) / size;
  if (!(radius > 0) || !(depth > 0)) return [];
  const maxR = Math.floor(radius), maxD = Math.ceil(depth);
  const layers = depth < radius ? Math.max(0, maxD - 1) : maxR;
  const diamond = shape === 'Diamond';
  const key = maxR + '|' + layers + '|' + (diamond ? 'D' : 'R');
  const hit = ringCache.get(key);
  if (hit) return hit;
  const rings = new Array(maxR + 1).fill(0);
  for (let dz = 0; dz <= layers; dz++) {
    for (let dx = 0; dx <= maxR; dx++) {
      const mx = dx === 0 ? 1 : 2;
      for (let dy = 0; dy <= maxR; dy++) {
        const d = diamond ? dx + dy + dz : Math.round(Math.sqrt(dx * dx + dy * dy + dz * dz));
        if (d > maxR) break; // distance only grows with dy
        rings[d] += mx * (dy === 0 ? 1 : 2);
      }
    }
  }
  if (ringCache.size > 200) ringCache.clear();
  ringCache.set(key, rings);
  return rings;
}

/// <summary>
/// Area damage one ByBlockHit / EndOfLife event deals to the ideal hull (SessionDamageMgr.DamageGrid falloff switch):
/// Pooled spends the whole pool; other falloffs apply per block by ring distance j with maxfalldist = radius blocks + 1;
/// Legacy (unset) has no falloff case in WC and deals nothing. ByBlockHit skips the impact block (the root step).
/// MaxAbsorb > 0 caps the total. Returns 0 when disabled.
/// </summary>
function aoeDamage(area, grid, byBlockHit) {
  if (!area || !area.enable) return 0;
  const dmg = num(area.damage);
  if (!(dmg > 0)) return 0;
  const falloff = area.falloff || 'Legacy';
  if (falloff === 'Pooled') return dmg;
  const size = GRID_SIZE_M[grid] || GRID_SIZE_M.Large;
  const mfd = num(area.radius) / size + 1;
  let total = 0;
  const rings = aoeRings(area.radius, area.depth, area.shape, grid);
  for (let j = 0; j < rings.length; j++) {
    let fall;
    switch (falloff) {
      case 'NoFalloff': fall = dmg; break;
      case 'Linear': fall = (mfd - j) / mfd * dmg; break;
      case 'Curve': fall = dmg - j / mfd / (mfd - j) * dmg; break;
      case 'InvCurve': fall = (mfd - j) / mfd * (mfd - j) / mfd * dmg; break;
      case 'Squeeze': fall = (j + 1) / mfd / (mfd - j) * dmg; break;
      case 'Exponential': fall = 1 / (j + 1) * dmg; break;
      default: fall = 0;
    }
    const count = (byBlockHit && j === 0) ? Math.max(0, rings[j] - 1) : rings[j];
    total += count * Math.max(0, fall);
  }
  const absorb = num(area.maxAbsorb);
  return absorb > 0 ? Math.min(total, absorb) : total;
}

/// <summary>
/// Expected projectiles spawned per trajectile by a Weapon-mode ammo Pattern (AmmoConstants.ComputeAmmoPattern +
/// Weapon.Shoot). Returns { active, count, members } where members are the pattern entries in spawn order
/// (the parent first unless SkipParent). Random uses XorShiftRandomStruct.Range(min, max) exactly.
/// resolve(round) must return the ammo with that AmmoRound among the weapon's Ammos, or null.
/// </summary>
function weaponPattern(ammo, resolve) {
  const pat = ammo && ammo.pattern;
  if (!pat) return { active: false, count: 1, members: [ammo] };
  const mode = pat.mode || 'Never';
  const weaponMode = !!pat.enable || mode === 'Both' || mode === 'Weapon';
  const names = (Array.isArray(pat.patterns) ? pat.patterns : []).filter((n) => n);
  if (!weaponMode || names.length === 0) return { active: false, count: 1, members: [ammo] };
  const members = [];
  if (!pat.skipParent && mode !== 'Fragment') members.push(ammo);
  for (const n of names) members.push(resolve(n) || null);
  const slots = (Array.isArray(pat.patterns) ? pat.patterns.length : 0) + (pat.skipParent ? 0 : 1);
  let count = slots;
  if (pat.random) {
    const lo = int(pat.randomMin), hi = int(pat.randomMax), span = hi - lo;
    let rolled = lo;
    if (span > 0) {
      // (int)NextUInt64() is a signed int, so rndInt % span is uniform over -(span-1)..(span-1) by sign halves
      let sum = 0;
      for (let r = 0; r < span; r++) {
        for (const v of [lo + r, lo - r]) {
          const val = (v < lo || v > hi) ? -v : v;
          sum += Math.max(0, Math.min(val, slots));
        }
      }
      rolled = sum / (2 * span);
    }
    const chance = num(pat.triggerChance, 1);
    count = chance >= 1 ? rolled : chance * rolled + (1 - chance) * slots;
  } else if (int(pat.patternSteps) > 0 && int(pat.patternSteps) <= slots) {
    count = int(pat.patternSteps);
  }
  return { active: true, count, members, slots };
}

/// <summary>
/// SessionDamageMgr.DamageGrid per-block damageScale for a target block (grid size + armor class), including the
/// small-vs-large debuff (0.25x when a large-grid shooter hits a small grid and both Grids scales are unset).
/// target = { grid: 'Large'|'Small', armor: 'heavy'|'light'|'nonArmor' }; shooterGrid = 'Large'|'Small'|undefined.
/// </summary>
function blockDamageScale(ammo, target, shooterGrid) {
  const ds = (ammo && ammo.damageScales) || {};
  const v = (x) => (x === undefined || x === null) ? -1 : num(x, -1);
  const gL = v(ds.gridLarge), gS = v(ds.gridSmall);
  const large = target.grid !== 'Small';
  let scale = 1;
  if (shooterGrid === 'Large' && !large && gL < 0 && gS < 0) scale *= 0.25;
  if (ammo && ammo.noGridOrArmorScaling) return scale;
  if (large && gL >= 0) scale *= gL;
  else if (!large && gS >= 0) scale *= gS;
  const armor = v(ds.armorArmor), heavy = v(ds.heavyArmor), light = v(ds.lightArmor), non = v(ds.nonArmor);
  if (target.armor === 'nonArmor') {
    if (non >= 0) scale *= non;
  } else {
    if (armor >= 0) scale *= armor;
    if (target.armor === 'heavy' && heavy >= 0) scale *= heavy;
    else if (target.armor === 'light' && light >= 0) scale *= light;
  }
  return scale;
}

/// <summary>
/// SessionDamageMgr.DamageGrid penetration: each block hit spends at most BaseDamageCutoff (x cutoff scales) of the
/// pool, and the round keeps going while more than 0.5 of the pool remains.
/// </summary>
function penetration(baseDamage, cutoff) {
  const base = Math.max(0, num(baseDamage)), cut = num(cutoff);
  if (!(cut > 0) || base <= 0) return { perBlock: base, blocks: 1 };
  return { perBlock: Math.min(base, cut), blocks: Math.max(1, Math.ceil((base - 0.5) / cut)) };
}

/// <summary>
/// SessionDamageMgr.DamageProjectile: one hit removes HealthHitModifier (<= 0 means 1) of the target's Health.
/// </summary>
function pdHitsToKill(attacker, target) {
  const hhm = num(attacker && attacker.damageScales && attacker.damageScales.healthHitModifier);
  const dmg = hhm > 0 ? hhm : 1;
  const hp = num(target && target.health);
  return hp <= 0 ? 1 : Math.ceil(hp / dmg - 1e-9);
}

/// <summary>
/// AmmoConstants.IsBeamWeapon (Beams.Enable with no guidance), plus rounds fast enough to be hitscan in practice.
/// </summary>
function isHitscan(ammo) {
  if (!ammo) return false;
  const traj = ammo.trajectory || {};
  const guided = traj.guidance && traj.guidance !== 'None';
  if (ammo.beams && ammo.beams.enable && !guided) return true;
  return num(traj.desiredSpeed) >= 10000;
}

const WcMath = { TICKS_PER_SEC, GRID_SIZE_M, energy, heatConstants, simulateFire, aoeRings, aoeDamage, weaponPattern, blockDamageScale, penetration, pdHitsToKill, isHitscan };
if (typeof module !== 'undefined' && module.exports) module.exports = WcMath;
root.WcMath = WcMath;
if (typeof window !== 'undefined' && window !== root) window.WcMath = WcMath;
})(typeof globalThis !== 'undefined' ? globalThis : this);
