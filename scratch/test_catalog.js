// Weapon catalog: icons match their NPC twins, the class filter bar covers every weapon once, and fixed mounts read
// as fixed everywhere (WC's RotateRate/ElevateRate default is 0).
// Run: node scratch/test_catalog.js
'use strict';
const fs = require('fs');
const crypto = require('crypto');
const { studioFile, loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();
const studio = loadStudio();
const html = fs.readFileSync(studioFile('index.html'), 'utf8');

// --- Icons ---
const icons = studio.run(`weaponsDb.map((w) => ({ sub: w.subtypeId, npc: isNpcWeapon(w), icon: getWeaponIconUrl(w) }))`);
const hash = (p) => crypto.createHash('sha1').update(fs.readFileSync(studioFile(p))).digest('hex');
const missing = icons.filter((w) => !fs.existsSync(studioFile(w.icon)));
check('Every weapon icon file exists in studio/icons', missing.length === 0, missing.map((w) => w.sub + ' -> ' + w.icon));
const bySub = Object.fromEntries(icons.map((w) => [w.sub, w]));
const twins = icons.filter((w) => /_NPC$/.test(w.sub) && bySub[w.sub.replace(/_NPC$/, '')]);
const iconDiff = missing.length ? [] : twins.filter((n) => hash(n.icon) !== hash(bySub[n.sub.replace(/_NPC$/, '')].icon)).map((n) => n.sub);
check(`Every player weapon shows the same icon image as its NPC twin (${twins.length} pairs)`, twins.length > 40 && iconDiff.length === 0, iconDiff);
const sameImage = (a, b) => !missing.length && hash(bySub[a].icon) === hash(bySub[b].icon);
check('Hydra Turret [Large] and CIWS Turret [Large] no longer borrow the Griffin / Sentinel icons',
  !sameImage('LargeMissileTurret', 'GVK_GriffinMissileTurret') && !sameImage('LargeGatlingTurret', 'SentinelTurret'));

// --- Class filter bar ---
const f = studio.run(`(() => {
  const list = getFilterableWeapons();
  const declared = WEAPON_CATEGORIES.flatMap((c) => c.types);
  const byCat = {};
  list.forEach((w) => { const k = getWeaponCategory(w); (byCat[k] = byCat[k] || []).push(w); });
  const grid = (g) => { currentFilterGrid = g; const n = list.filter(matchesGridFilter).length;
    const sum = Object.keys(byCat).reduce((s, k) => s + list.filter((w) => matchesGridFilter(w) && getWeaponCategory(w) === k).length, 0);
    currentFilterGrid = 'all'; return [n, sum]; };
  currentFilterCategory = 'missile'; currentFilterType = 'Torpedo';
  const torp = weaponsDb.filter(filterMatchesWeapon).map(getWeaponTypePrefix);
  currentFilterType = 'all';
  const missiles = weaponsDb.filter(filterMatchesWeapon).map(getWeaponTypePrefix);
  currentFilterCategory = 'all';
  return {
    total: list.length, catTotal: Object.values(byCat).reduce((s, a) => s + a.length, 0),
    dupTypes: declared.filter((t, i) => declared.indexOf(t) !== i),
    unmapped: list.filter((w) => getWeaponTypePrefix(w) && !declared.includes(getWeaponTypePrefix(w))).map((w) => w.subtypeId),
    other: (byCat.other || []).map((w) => ({ sub: w.subtypeId, prefix: getWeaponTypePrefix(w), det: isDetonationWeapon(w) })),
    large: grid('Large'), small: grid('Small'), torp, missiles,
    missileTypes: WEAPON_CATEGORIES.find((c) => c.key === 'missile').types
  };
})()`);
check('Class counts add up to the filterable weapon list', f.catTotal === f.total && f.total > 0, [f.catTotal, f.total]);
check('Class counts follow the grid filter (Large / Small)', f.large[0] === f.large[1] && f.small[0] === f.small[1] && f.large[0] + f.small[0] === f.total, [f.large, f.small]);
check('Each type belongs to exactly one class', f.dupTypes.length === 0, f.dupTypes);
check('Every typed player weapon maps to a declared class (no *TYPE* falls into Other)', f.unmapped.length === 0, f.unmapped);
check('Other holds only untyped blocks (the warheads and explosive barrels)', f.other.length === 4 && f.other.every((w) => !w.prefix && w.det), f.other);
check('Class + type filter narrows to the picked type (Missile → Torpedo)', f.torp.length > 0 && f.torp.every((t) => t === 'Torpedo'), f.torp);
check('Class filter keeps only that class\'s types (Missile)', f.missiles.length > f.torp.length && f.missiles.every((t) => f.missileTypes.includes(t)), f.missiles);
check('index.html has the CLASS row and the type sub-row', html.includes('id="categoryFilterGroup"') && html.includes('id="typeFilterRow"') && html.includes('id="typeFilterGroup"'));

// --- Fixed mounts ---
const m = studio.run(`(() => {
  const text = (id) => document.getElementById(id).textContent;
  const trackRow = () => {
    const mm = document.getElementById('compareTableBody').innerHTML.match(/Tracking Rate<\\/td>\\s*<td[^>]*>([^<]*)<\\/td>\\s*<td[^>]*>([^<]*)<\\/td>\\s*<td[^>]*>([^<]*)<\\/td>/);
    return mm ? [mm[1], mm[2], mm[3]] : null;
  };
  const bad = [];
  let fixedCount = 0;
  for (const w of weaponsDb.filter((x) => x.type === 'Fixed' && !x.rotateRate && !x.elevateRate)) {
    fixedCount++;
    selectWeapon(w.id);
    updateCombatTelemetry();
    const row = [document.getElementById('wRotateRate').value, document.getElementById('wElevateRate').value, text('outTraverseDeg'), text('outTraverseAzEl')];
    if (String(row[0]) !== '0' || String(row[1]) !== '0' || row[2] !== 'Fixed Mount' || row[3] !== 'Rigid Forward Mount') bad.push(w.subtypeId + ': ' + row.join(' | '));
  }
  // Quick compare and comparison table: a fixed gun against a turret, then the turret against itself
  const gun = weaponsDb.find((x) => x.subtypeId === 'SmallGatlingGun');
  const turret = weaponsDb.find((x) => x.subtypeId === 'GVK_AvengerGatlingTurret');
  benchmarkWeapon = turret;
  benchmarkAmmoKey = getSelectableAmmos(turret)[0];
  selectWeapon(gun.id);
  updateCombatTelemetry();
  updateComparisonRadar();
  updateRadarQuickCompare();
  const fixedVsTurret = { dep: text('qcDepressionActive'), mount: text('qcMountActive'), track: trackRow() };
  selectWeapon(turret.id);
  updateCombatTelemetry();
  updateComparisonRadar();
  const self = trackRow();
  return { bad, fixedCount, fixedVsTurret, self, metricsTrack: calculateWeaponMetrics(gun).tracking };
})()`);
check(`Fixed guns with no RotateRate/ElevateRate show 0 and "Fixed Mount", not a 51.6°/s turret slew (${m.fixedCount} guns)`,
  m.fixedCount > 20 && m.bad.length === 0, m.bad.slice(0, 6));
check('Quick compare reads "Fixed Forward" depression on a fixed gun (no "undefined°")',
  m.fixedVsTurret.dep === 'Fixed Forward' && !/undefined/.test(m.fixedVsTurret.dep + m.fixedVsTurret.mount), m.fixedVsTurret);
check('Comparison table tracking rate for a fixed gun is 0.0 °/s, same as its radar metric',
  !!m.fixedVsTurret.track && m.fixedVsTurret.track[0] === '0.0 °/s' && m.metricsTrack === 0, m.fixedVsTurret.track);
check('A turret compared with itself shows the same tracking rate on both sides (+0.0%)',
  !!m.self && m.self[0] === m.self[1] && m.self[2] === '+0.0%', m.self);

done('Catalog checks');
