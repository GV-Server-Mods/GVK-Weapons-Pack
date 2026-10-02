// Warheads and explosive barrels (HardwareDef.CriticalReaction): single-use detonations, never beams or sustained DPS.
// Run: node scratch/test_detonations.js
'use strict';
const { loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();
const studio = loadStudio();

const r = studio.run(`(() => {
  const r = { weapons: [] };
  const det = weaponsDb.filter((w) => isDetonationWeapon(w));
  r.count = det.length;
  for (const w of det) {
    const a = ammosDb[w.ammoName];
    const frag = a.fragment;
    const child = resolveAmmoRound(frag.ammoRound, w);
    const eng = getEngagementRange(w, a, false);
    const m = calculateWeaponMetrics(w);
    const p = getWeaponPowerDraw(w, a);
    r.weapons.push({
      sub: w.subtypeId, grid: w.gridSize, triggerIsBeamDef: !!(a.beams && a.beams.enable), beam: isBeamWeapon(w, a),
      range: eng.range, source: eng.source, label: eng.label, blastReach: child.trajectory.maxTrajectory,
      fragments: frag.fragments, degrees: frag.degrees, sustained: m.sustainedDps, alpha: m.magazineDamage,
      role: getAutomatedWeaponRole(w, a).id, spec: getWeaponSpecialtyBadge(w, a),
      idle: p.idle, operational: p.operational, mustCharge: p.mustCharge
    });
  }

  // Combat Telemetry on the large warhead, benchmarked against a regular gun
  const wh = weaponsDb.find((w) => w.subtypeId === 'LargeWarhead');
  const gun = weaponsDb.find((w) => w.subtypeId === 'GVK_AvengerGatlingTurret');
  selectWeapon(wh.id);
  benchmarkWeapon = gun;
  benchmarkAmmoKey = getSelectableAmmos(gun)[0];
  document.getElementById('wMuzzles').value = '';
  updateCombatTelemetry();
  updateComparisonRadar();
  runWeaponCoreLinter();
  const html = (id) => document.getElementById(id).innerHTML;
  const text = (id) => document.getElementById(id).textContent;
  r.tel = {
    dps: html('outSustainedDps'), rps: html('outShotsPerSec'), velocity: html('outMuzzleVelocityPreview'),
    flight: text('outFlightDelay1km'), range: html('outMaxRange'), rangeSource: text('outMaxRangeSource'),
    rangeVisual: html('pillarRangeRadar'), flightTag: html('pillarPropulsionVector'), blast: text('tmBlastRadius'),
    hudDps: text('hudTelDps'), hudBenchHidden: document.getElementById('hudTelBench').style.display === 'none',
    compare: html('compareTableBody'), lint: html('linterText')
  };
  // Positive control: the same empty muzzle list on a gun is still an error
  selectWeapon(gun.id);
  document.getElementById('wMuzzles').value = '';
  runWeaponCoreLinter();
  r.gunLint = html('linterText');
  return r;
})()`);

check('Exactly 4 detonation blocks (large/small warhead + explosive barrel)', r.count === 4, r.count);
const W = (sub) => r.weapons.find((w) => w.sub === sub) || {};
check('Warhead trigger round is a Beams.Enable def, yet no detonation block is a beam weapon',
  r.weapons.every((w) => w.triggerIsBeamDef && !w.beam), r.weapons.map((w) => [w.sub, w.beam]));
check('No sustained DPS on any detonation block (no 60 RPM placeholder cycle)', r.weapons.every((w) => w.sustained === 0), r.weapons.map((w) => w.sustained));
check('Alpha is the full fragment payload (> 0)', r.weapons.every((w) => w.alpha > 0), r.weapons.map((w) => w.alpha));
check('Max range = fragment blast reach (20 m large, 7.5 m small), not the 1 m trigger round',
  W('LargeWarhead').range === 20 && W('LargeExplosiveBarrel').range === 20 && W('SmallWarhead').range === 7.5 && W('SmallExplosiveBarrel').range === 7.5
  && r.weapons.every((w) => w.range === w.blastReach && w.source === 'blast'), r.weapons.map((w) => [w.sub, w.range, w.source]));
check('Range label reads "Blast reach · <n> fragments, <deg>° spread"',
  r.weapons.every((w) => w.label === 'Blast reach · ' + w.fragments + ' fragments, ' + w.degrees + '° spread'), r.weapons.map((w) => w.label));
check('Role = Demolition Charge, specialty = Fragment Burst',
  r.weapons.every((w) => w.role === 'demolition' && w.spec === '💥 Fragment Burst'), r.weapons.map((w) => [w.role, w.spec]));
check('Power = idle only (no charge draw, no operational load)', r.weapons.every((w) => w.operational === w.idle && !w.mustCharge), r.weapons.map((w) => [w.idle, w.operational]));

const t = r.tel;
check('Telemetry DPS reads "Single use" and fire mode "One-shot"', t.dps === 'Single use' && t.rps === 'One-shot', [t.dps, t.rps]);
check('Velocity reads "Static" with no flight time', t.velocity === 'Static' && t.flight === 'Fragments burst from the block', [t.velocity, t.flight]);
check('Max Range card shows 20 m from Blast reach', /^20\b/.test(t.range) && /^Blast reach/.test(t.rangeSource), [t.range, t.rangeSource]);
check('Range pillar draws a BLAST burst, not a BORESIGHT corridor', t.rangeVisual.includes('BLAST') && !t.rangeVisual.includes('BORESIGHT'));
check('Flight profile tag is FRAG BURST', t.flightTag.includes('FRAG BURST'));
check('Blast badge shows the 20 m burst', t.blast === '20m Burst', t.blast);
check('HUD DPS is n/a (single use) and the benchmark chip is hidden', t.hudDps === 'n/a (single use)' && t.hudBenchHidden, t.hudDps);
const rows = {};
for (const m of t.compare.matchAll(/<tr>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>/g)) rows[m[1]] = [m[2], m[3], m[4]];
const dpsRows = ['Sustained DPS', 'Effective DPS'].map((k) => rows[k] || []);
check('Comparison table: DPS rows read n/a (single use) with no delta instead of -100%',
  dpsRows.every((x) => x[0] === 'n/a (single use)' && x[2] === '—'), dpsRows);
check('Comparison table: velocity reads Static, range is marked (blast), alpha is the payload (not 0 hp)',
  (rows.Velocity || [])[0] === 'Static' && /^20 m \(blast\)$/.test((rows.Range || [])[0]) && !/^0 hp/.test((rows['Effective Magazine Damage'] || [''])[0]), rows);
check('Linter does not flag the empty muzzle list on a warhead', !/Muzzle dummy list is empty/.test(t.lint), t.lint);
check('Linter still flags an empty muzzle list on a gun', /Muzzle dummy list is empty/.test(r.gunLint), r.gunLint);

done('Detonation checks');
