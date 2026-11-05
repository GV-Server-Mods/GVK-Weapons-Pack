// The page shows the bundled Snapshot, which tools/export_snapshots.js builds with Curation
// (snapshot freshness is checked by `node tools/export_snapshots.js --check`). This test checks the
// Curation actually reached the Snapshot: curated weapon ids and names, magazine categories and price tiers.
// Run: node tests/test_curation.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
let failed = 0;
function check(name, ok, detail) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) { failed++; if (detail !== undefined) console.log('      ' + JSON.stringify(detail).slice(0, 400)); }
}

const ctx = {};
vm.createContext(ctx);
for (const f of ['weapons_data.js', 'magazines_blueprints_data.js', 'curation.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'studio/data', f), 'utf8'), ctx, { filename: f });
}
const { weapons, mags, cur } = vm.runInContext(
  '({ weapons: BUNDLED_WEAPONS_DATA, mags: MAGAZINES_BLUEPRINTS_DATA, cur: STUDIO_CURATION })', ctx);

// The NPC flare launchers come from a helper call (Other_Flare_NPC in CoreParts/Other_Flare_Weapons.cs)
// that the Source Pipeline does not evaluate, so they are not in the Snapshot.
const KNOWN_MISSING = new Set(['LargeFlareLauncher_NPC', 'SmallFlareLauncher_NPC']);
const curatedWeapons = Object.keys(cur.weapons || {}).filter((k) => !KNOWN_MISSING.has(k));
const ids = new Set(weapons.map((w) => w.id));
const missing = curatedWeapons.filter((k) => {
  const c = cur.weapons[k];
  return c && c.id && !ids.has(c.id);
});
check('Every curated weapon id is in the Snapshot', curatedWeapons.length > 100 && missing.length === 0, missing.slice(0, 10));

const named = curatedWeapons.filter((k) => cur.weapons[k] && cur.weapons[k].name);
const wrongName = named.filter((k) => {
  const c = cur.weapons[k];
  const w = weapons.find((x) => x.id === c.id) || weapons.find((x) => x.subtypeId === k);
  return !w || w.name !== c.name;
});
check('Curated weapon names reach the Snapshot', named.length > 0 && wrongName.length === 0, wrongName.slice(0, 10));

const categorised = mags.filter((m) => m.category);
check('Magazines carry their curated categories (19 in 6 categories)',
  categorised.length === 19 && new Set(categorised.map((m) => m.category)).size === 6, categorised.length);
const tiers = mags.filter((m) => m.roleMultiplier && m.roleMultiplier !== 1);
const torpedo = mags.find((m) => m.subtypeId === 'Missiles_Torpedo');
check('Price tiers (roleMultiplier) reach 10 magazines; Torpedo 1.25',
  tiers.length === 10 && torpedo && torpedo.roleMultiplier === 1.25, tiers.map((m) => m.subtypeId));

process.exit(failed ? 1 : 0);
