// Telemetry cadence on the bundled data: barrel spin-up, burst RPM in whole ticks, fencepost-free continuous
// weapons, radar range, flight time with acceleration, and uranium from the average charge draw.
// Expected values come from the WC rules in wc_math.js (tick replica), worked by hand from the defs.
// Run: node tests/test_cadence.js
'use strict';
const { loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();
const studio = loadStudio();

const r = studio.run(`(() => {
  const W = (sub) => weaponsDb.find((x) => x.subtypeId === sub);
  const A = (w) => ammosDb[getSelectableAmmos(w)[0] || w.ammoName];
  const cyc = (sub) => { const w = W(sub); return computeFireCycle(getFireCycleParams(w, A(w), false)); };
  const dps = (sub) => calculateWeaponMetrics(W(sub)).sustainedDps;
  const ui = (sub) => {
    selectWeapon(W(sub).id);
    const t = (id) => (document.getElementById(id) || {}).textContent || '';
    const h = (id) => (document.getElementById(id) || {}).innerHTML || '';
    return { cycle: t('outCycleTime'), flight: t('outFlightDelay1km'), latency: t('outTriggerLatencyDetail'),
      consumption: h('outCooldownTime'), drawSub: t('outAmmoDrawSub'), power: h('outPowerMw') };
  };
  const gat = cyc('LargeGatlingTurret');
  return {
    sentinel: dps('SentinelTurret'), gatlings: ['LargeGatlingTurret', 'SmallGatlingGun', 'SmallGatlingGun_Gimbal'].map(dps),
    avenger: dps('GVK_AvengerGatlingTurret'),
    gat: { cycle: Math.round(gat.totalCycleSec * 60), spool: Math.round(gat.spoolSec * 60), tps: gat.ticksPerShot, burst: gat.burstRpm },
    av: (() => { const c = cyc('GVK_AvengerGatlingTurret'); return { tps: c.ticksPerShot, burst: c.burstRpm, perBarrel: c.burstRpmPerBarrel }; })(),
    hydra: cyc('ARYXHydraTurret').ticksPerShot,
    oki: (() => { const c = cyc('OKIDesignator'); return { rpm: c.effectiveRps * 60, cycle: c.totalCycleSec }; })(),
    radar: getEngagementRange(W('ARYXSmallRadar'), A(W('ARYXSmallRadar')), false),
    maxRange: getModMaxMetrics().maxRange,
    uiAvenger: ui('GVK_AvengerGatlingTurret'),
    uiGatling: ui('LargeGatlingTurret'),
    uiGriffin: ui('GVK_GriffinMissileTurret'),
    uiTorpedo: ui('Missile_Torpedo_Large'),
    uiXfel: ui('MA_T2PDX'),
    uiSpartan: ui('ARYXSpartanTurret')
  };
})()`);

check('Gatlings with spinning barrels: 9 spin-up ticks per reload, cycle 431 -> 440 ticks',
  r.gat.cycle === 440 && r.gat.spool === 9, r.gat);
check('Sentinel and the other spinning Gatlings land on 1,636 DPS', r.sentinel === 1636 && r.gatlings.every((d) => d === 1636), [r.sentinel, r.gatlings]);
check('Avenger (no spinning barrels) is unchanged at 3,987 DPS', r.avenger === 3987, r.avenger);
check('Burst RPM uses whole ticks: Gatling 2 ticks = 1,800 RPM; Avenger 3 ticks x 2 barrels = 2,400 RPM; Hydra 7 ticks',
  r.gat.tps === 2 && r.gat.burst === 1800 && r.av.tps === 3 && r.av.burst === 2400 && r.av.perBarrel === 1200 && r.hydra === 7, { gat: r.gat, av: r.av, hydra: r.hydra });
check('Burst label names the whole weapon and the per-barrel rate',
  /^Burst: 2,400 RPM · 1,200\/barrel \(/.test(r.uiAvenger.cycle) && /^Burst: 1,800 RPM \(/.test(r.uiGatling.cycle), [r.uiAvenger.cycle, r.uiGatling.cycle]);
check('Trigger latency shows the barrel spin-up', /Barrel spin-up \(9 ticks\)/.test(r.uiGatling.latency), r.uiGatling.latency);
check('OKI Designator fires 5 per minute (12 s cycle), no extra fencepost shot',
  Math.abs(r.oki.rpm - 5) < 1e-6 && Math.abs(r.oki.cycle - 12) < 1e-6, r.oki);
check('Fixed small radar (ShootBlanks) ranges by its 5,000 m targeting, not the 20 km beam',
  r.radar.range === 5000 && r.radar.source === 'targeting', r.radar);
check('Radar chart range ceiling is no longer the 20 km radar beam', r.maxRange < 20000, r.maxRange);
check('Flight time includes acceleration: Griffin 2,300 m 5.86 s, Torpedo 3,000 m 17.00 s',
  r.uiGriffin.flight === 'Flight to 2,300m: 5.86s' && r.uiTorpedo.flight === 'Flight to 3,000m: 17.00s', [r.uiGriffin.flight, r.uiTorpedo.flight]);
check('Uranium uses the average charge draw on a GVK Large Reactor: XFEL-H 733 g/min, Spartan 1.47 kg/min',
  r.uiXfel.consumption.includes('733g Uranium / min') && r.uiSpartan.consumption.includes('1.47 kg Uranium / min'), [r.uiXfel.consumption, r.uiSpartan.consumption]);
check('Power card keeps the peak draw; the subline adds the average', /^117\.01/.test(r.uiXfel.power) && /MW peak · 58\.63 MW avg/.test(r.uiXfel.drawSub), [r.uiXfel.power, r.uiXfel.drawSub]);

done('Cadence');
