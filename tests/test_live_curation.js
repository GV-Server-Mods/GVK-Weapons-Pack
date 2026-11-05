// Loads the Studio's data scripts the way a browser does (classic scripts sharing one global scope),
// stages the repo files the way deploy-studio.yml does, runs the hosted live loader and checks that
// Curation is applied: the live data must match the bundled Snapshot, which is built with Curation.
// Run: node tests/test_live_curation.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const studio = path.join(root, 'studio');
let failed = 0;
function check(name, ok, detail) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) {
    failed++;
    if (detail !== undefined) console.log('      ' + JSON.stringify(detail).slice(0, 400));
  }
}

// The files deploy-studio.yml copies to _site/data/source/.
function stagedSources() {
  const files = {};
  const list = (dir, re) => fs.readdirSync(path.join(root, dir)).filter((f) => re.test(f));
  const coreParts = list('CoreParts', /\.cs$/);
  const cubeBlocks = list('Content/Data/CubeBlocks', /\.sbc$/);
  for (const f of coreParts) files['data/source/CoreParts/' + f] = path.join(root, 'CoreParts', f);
  for (const f of ['AmmoMagazines_Ship.sbc', 'AmmoMagazines_Handheld.sbc', 'Blueprints.sbc', 'PhysicalItems.sbc']) {
    files['data/source/Data/' + f] = path.join(root, 'Content/Data', f);
  }
  for (const f of cubeBlocks) files['data/source/Data/CubeBlocks/' + f] = path.join(root, 'Content/Data/CubeBlocks', f);
  files['data/source/_manifest.json'] = JSON.stringify({ commit: 'test', ref: 'test', date: '01.01.2026', coreParts, cubeBlocks });
  return files;
}

function stubElement() {
  const el = {
    style: {}, classList: { add() {}, remove() {} }, appendChild() {}, set textContent(v) { this._t = v; },
    get textContent() { return this._t || ''; },
  };
  return el;
}

async function main() {
  const files = stagedSources();
  const sandbox = {
    console: { log() {}, warn() {}, error() {}, info() {} },
    setTimeout, clearTimeout, URL, Blob,
    document: {
      getElementById: () => null, querySelector: () => null, createElement: stubElement,
      body: { appendChild() {} },
    },
    location: { reload() {} },
    fetch: async (url) => {
      const key = String(url);
      if (!(key in files)) return { ok: false, status: 404, text: async () => '', json: async () => null };
      const body = key.endsWith('_manifest.json') ? files[key] : fs.readFileSync(files[key], 'utf8');
      return { ok: true, status: 200, text: async () => body, json: async () => JSON.parse(body) };
    },
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  const scripts = ['data/wc_schema.js', 'data/weapons_data.js', 'data/ammos_data.js', 'data/magazines_blueprints_data.js',
    'data/wc_defs_data.js', 'data/components_data.js', 'data/economy_values.js', 'data/curation.js',
    'source_pipeline.js', 'source_live.js'];
  for (const s of scripts) {
    vm.runInContext(fs.readFileSync(path.join(studio, s), 'utf8'), sandbox, { filename: s });
  }

  check('curation.js stays a top-level const (not a window property)',
    vm.runInContext('typeof STUDIO_CURATION', sandbox) === 'object' && sandbox.STUDIO_CURATION === undefined);

  const result = await sandbox.GVKLiveSource.init({});
  check('Hosted live loader returns data', !!(result && result.data), result && result.mode);
  if (!result || !result.data) return;
  const live = result.data;
  const snap = vm.runInContext('({ weapons: BUNDLED_WEAPONS_DATA, ammos: BUNDLED_AMMOS_DATA, magazines: MAGAZINES_BLUEPRINTS_DATA })', sandbox);

  const ids = (arr) => arr.map((w) => w.id).sort();
  check('Live weapon ids match the curated Snapshot', JSON.stringify(ids(live.weapons)) === JSON.stringify(ids(snap.weapons)),
    ids(live.weapons).filter((id) => !ids(snap.weapons).includes(id)).slice(0, 10));
  const names = (arr) => arr.map((w) => w.id + '=' + w.name).sort();
  check('Live weapon names match the curated Snapshot', JSON.stringify(names(live.weapons)) === JSON.stringify(names(snap.weapons)),
    names(live.weapons).filter((n) => !names(snap.weapons).includes(n)).slice(0, 10));
  const magKey = (m) => JSON.stringify(m);
  const liveMags = live.magazines.map(magKey).sort();
  const snapMags = snap.magazines.map(magKey).sort();
  check('Live magazines (categories, price tiers) match the curated Snapshot',
    JSON.stringify(liveMags) === JSON.stringify(snapMags), liveMags.filter((m) => !snapMags.includes(m)).slice(0, 2));
  check('Live data is identical to the Snapshot (weapons, ammos, magazines)',
    JSON.stringify(live.weapons) === JSON.stringify(snap.weapons)
    && JSON.stringify(live.ammos) === JSON.stringify(snap.ammos)
    && JSON.stringify(live.magazines) === JSON.stringify(snap.magazines));
}

main().then(() => {
  console.log(failed ? `\n${failed} check(s) failed` : '\nLive curation checks passed');
  process.exit(failed ? 1 : 0);
}).catch((e) => { console.log('FAIL  test crashed: ' + (e && e.stack || e)); process.exit(1); });
