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

// --- Class filter bar (the four glossary Classes) ---
const f = studio.run(`(() => {
  const list = getFilterableWeapons();
  const declared = WEAPON_CLASSES.flatMap((c) => c.types);
  const byClass = {};
  list.forEach((w) => { const k = getWeaponClass(w); (byClass[k] = byClass[k] || []).push(w); });
  const grid = (g) => { currentFilterGrid = g; const n = list.filter(matchesGridFilter).length;
    const sum = Object.keys(byClass).reduce((s, k) => s + list.filter((w) => matchesGridFilter(w) && getWeaponClass(w) === k).length, 0);
    currentFilterGrid = 'all'; return [n, sum]; };
  currentFilterClass = 'missile'; currentFilterType = 'Torpedo';
  const torp = weaponsDb.filter(filterMatchesWeapon).map(getWeaponTypePrefix);
  currentFilterType = 'all';
  const missiles = weaponsDb.filter(filterMatchesWeapon).map(getWeaponTypePrefix);
  currentFilterClass = 'all';
  const classOf = (t) => (WEAPON_CLASSES.find((c) => c.types.includes(t)) || {}).key;
  const bySub = Object.fromEntries(weaponsDb.map((w) => [w.subtypeId, w]));
  const npcMismatch = weaponsDb.filter((w) => isNpcWeapon(w) && bySub[w.subtypeId.replace(/_NPC$/, '')] && getWeaponClass(w) !== getWeaponClass(bySub[w.subtypeId.replace(/_NPC$/, '')])).map((w) => w.subtypeId);
  return {
    labels: WEAPON_CLASSES.map((c) => c.label),
    total: list.length, classTotal: Object.values(byClass).reduce((s, a) => s + a.length, 0),
    dupTypes: declared.filter((t, i) => declared.indexOf(t) !== i),
    unclassed: weaponsDb.filter((w) => !isHandheldWeapon(w) && !WEAPON_CLASSES.some((c) => c.key === getWeaponClass(w))).map((w) => w.subtypeId),
    untyped: list.filter((w) => !getWeaponTypePrefix(w)).map((w) => getWeaponClass(w)),
    flak: classOf('Flak'), ams: classOf('AMS'), heavyRailgun: classOf('Heavy Railgun'),
    special: ['Flare', 'Drone', 'Sensor'].map(classOf),
    npcCount: weaponsDb.filter(isNpcWeapon).length, npcMismatch,
    large: grid('Large'), small: grid('Small'), torp, missiles,
    missileTypes: WEAPON_CLASSES.find((c) => c.key === 'missile').types
  };
})()`);
check('Filter bar Classes are exactly Ballistic / Laser / Missile / Special', JSON.stringify(f.labels) === '["Ballistic","Laser","Missile","Special"]', f.labels);
check('Class counts add up to the filterable weapon list', f.classTotal === f.total && f.total > 0, [f.classTotal, f.total]);
check('Class counts follow the grid filter (Large / Small)', f.large[0] === f.large[1] && f.small[0] === f.small[1] && f.large[0] + f.small[0] === f.total, [f.large, f.small]);
check('Each type belongs to exactly one Class', f.dupTypes.length === 0, f.dupTypes);
check('Every weapon, NPC included, lands in one of the four Classes', f.unclassed.length === 0, f.unclassed);
check('Flak and Heavy Railgun are Ballistic, AMS is Laser', f.flak === 'ballistic' && f.heavyRailgun === 'ballistic' && f.ams === 'laser', [f.flak, f.heavyRailgun, f.ams]);
check('Flares, Drones, Sensors and the untyped Warheads are Special', f.special.every((k) => k === 'special') && f.untyped.length === 4 && f.untyped.every((k) => k === 'special'), [f.special, f.untyped]);
check(`NPC weapons share their player twin's Class (${f.npcCount} NPC weapons)`, f.npcCount > 40 && f.npcMismatch.length === 0, f.npcMismatch);
check('Class + type filter narrows to the picked type (Missile → Torpedo)', f.torp.length > 0 && f.torp.every((t) => t === 'Torpedo'), f.torp);
check('Class filter keeps only that Class\'s types (Missile)', f.missiles.length > f.torp.length && f.missiles.every((t) => f.missileTypes.includes(t)), f.missiles);
check('index.html has the CLASS row, the type sub-row and the ROLE filter',
  html.includes('id="classFilterGroup"') && html.includes('id="typeFilterRow"') && html.includes('id="typeFilterGroup"') && html.includes('id="roleFilterSelect"'));

// --- Role filter ---
const rf = studio.run(`(() => {
  currentFilterRole = 'pd';
  const pd = weaponsDb.filter(filterMatchesWeapon);
  const pdRoles = pd.map((w) => getWeaponRole(w).id);
  buildRoleFilter();
  const options = document.getElementById('roleFilterSelect').innerHTML;
  currentFilterRole = 'all';
  const all = weaponsDb.filter(filterMatchesWeapon).length;
  return { pdCount: pd.length, pdRoles, all, options };
})()`);
check('Role filter set to Point Defense shows only Point Defense weapons', rf.pdCount > 0 && rf.pdCount < rf.all && rf.pdRoles.every((r) => r === 'pd'), rf.pdRoles);
check('Role filter lists the Roles with an All option', /All Roles/.test(rf.options) && /Point Defense/.test(rf.options) && /Homing Ordnance/.test(rf.options), rf.options);

// --- Roles (GLOSSARY.md names) ---
const GLOSSARY_ROLES = ['Point Defense', 'Brawler', 'Armor Breaker', 'Area Denial', 'Beam', 'Homing Ordnance', 'Standoff Artillery', 'Demolition Charge'];
const roles = studio.run(`(() => {
  const seen = new Set();
  weaponsDb.forEach((w) => getSelectableAmmos(w).concat([null]).forEach((k) => seen.add(getAutomatedWeaponRole(w, k && ammosDb[k]).label)));
  seen.add(getAutomatedWeaponRole(null).label);
  return { seen: [...seen], declared: WEAPON_ROLES.map((r) => r.label) };
})()`);
check('Every Role the studio assigns is a glossary Role', roles.seen.every((l) => GLOSSARY_ROLES.includes(l)), roles.seen);
check('WEAPON_ROLES lists exactly the eight glossary Roles', JSON.stringify(roles.declared) === JSON.stringify(GLOSSARY_ROLES), roles.declared);
const studioText = ['app.js', 'index.html', 'ammo_maths.js', 'workbench_ui.js'].map((f) => fs.readFileSync(studioFile(f), 'utf8')).join('\n');
const oldRoleNames = ['Kinetic Brawler', 'Directed Energy', 'Area Denial / Flak', 'Guided Ordnance'].filter((n) => studioText.includes(n));
check('No studio screen uses the old Role names', oldRoleNames.length === 0, oldRoleNames);

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
    if (String(row[0]) !== '0' || String(row[1]) !== '0' || row[2] !== 'Fixed Mount' || row[3] !== 'Fires Along Block Facing') bad.push(w.subtypeId + ': ' + row.join(' | '));
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
check(`Fixed guns with no RotateRate/ElevateRate show 0, "Fixed Mount" and "Fires Along Block Facing", not a 51.6°/s turret slew (${m.fixedCount} guns)`,
  m.fixedCount > 20 && m.bad.length === 0, m.bad.slice(0, 6));
check('Quick compare reads "Fixed Forward" depression on a fixed gun (no "undefined°")',
  m.fixedVsTurret.dep === 'Fixed Forward' && !/undefined/.test(m.fixedVsTurret.dep + m.fixedVsTurret.mount), m.fixedVsTurret);
check('Comparison table tracking rate for a fixed gun is 0.0 °/s, same as its radar metric',
  !!m.fixedVsTurret.track && m.fixedVsTurret.track[0] === '0.0 °/s' && m.metricsTrack === 0, m.fixedVsTurret.track);
check('A turret compared with itself shows the same tracking rate on both sides (+0.0%)',
  !!m.self && m.self[0] === m.self[1] && m.self[2] === '+0.0%', m.self);

// --- Limited-arc Turrets vs Gimbals ---
const g = studio.run(`(() => {
  const text = (id) => document.getElementById(id).textContent;
  const readout = (w) => {
    selectWeapon(w.id);
    updateCombatTelemetry();
    updateRadarQuickCompare();
    const arc = getWeaponArcSummary(w);
    return { sub: w.subtypeId, type: w.type, pd: !!w.pdProjectiles, gimbal: arc.isGimbal, limited: arc.isLimitedArc,
      mount: text('qcMountActive'), azEl: text('outTraverseAzEl'), role: getWeaponRole(w).id };
  };
  const base = weaponsDb.find((x) => x.subtypeId === 'GVK_AvengerGatlingTurret');
  const narrow = Object.assign({}, base, { id: 'TEST_NarrowTurret', subtypeId: 'TEST_NarrowTurret', minAzimuth: -60, maxAzimuth: 60 });
  weaponsDb.push(narrow);
  const out = {
    gimbals: weaponsDb.filter((x) => /Gimbal/.test(x.displayName || '')).map(readout),
    narrow: readout(narrow), full: readout(base)
  };
  weaponsDb.pop();
  return out;
})()`);
check('A Turret with under 350° of traverse reads as a limited-arc Turret, never Gimbal',
  g.narrow.limited && !g.narrow.gimbal && /Limited-arc Turret/.test(g.narrow.mount) && !/Gimbal/i.test(g.narrow.mount + g.narrow.azEl), g.narrow);
check('A full-traverse Turret is not limited-arc', !g.full.limited && /360° Turret/.test(g.full.mount), g.full);
check(`Gimbal blocks (25mm Gatling Gimbal, XFEL-H Gimbal) read as Fixed Gimbals, not Turrets or PD (${g.gimbals.length})`,
  g.gimbals.length >= 4 && g.gimbals.every((x) => x.type === 'Fixed' && x.gimbal && !x.limited && !x.pd && x.role !== 'pd' && /^Fixed/.test(x.mount) && /Gimbal/.test(x.azEl)), g.gimbals);
const doc = fs.readFileSync(require('path').join(__dirname, '..', 'docs', 'WEAPON_STUDIO_DESIGN_DOCUMENT.md'), 'utf8');
const pdLine = doc.split(/\r?\n/).find((l) => l.includes('[ 📡 Point Defense ]')) || '';
check('Design doc no longer lists gimbals as point defense', pdLine && !/turrets\/Gimbal/i.test(pdLine) && /Point Defense needs a Turret/.test(pdLine), pdLine);

done('Catalog checks');
