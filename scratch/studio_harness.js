// Shared headless loader for the Weapon Studio: stubs the DOM, loads docs/ scripts in index.html order and
// injects the bundled snapshot data. Used by the scratch/test_*.js suites.
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const docs = (f) => path.join(root, 'docs', f);

function makeClassList() {
  const set = new Set();
  return {
    add(...c) { c.forEach((x) => set.add(x)); }, remove(...c) { c.forEach((x) => set.delete(x)); },
    toggle(c, force) { const on = force === undefined ? !set.has(c) : !!force; if (on) set.add(c); else set.delete(c); return on; },
    contains(c) { return set.has(c); }
  };
}

// Tag and input type per id from index.html, so checkbox/select-aware code (default markers, bindings) runs as in the page
const htmlTags = new Map();
for (const m of fs.readFileSync(docs('index.html'), 'utf8').matchAll(/<(\w+)\b([^>]*?)\bid="([^"]+)"([^>]*)>/g)) {
  const attrs = m[2] + m[4];
  const type = (attrs.match(/\btype="([^"]+)"/) || [])[1];
  htmlTags.set(m[3], { tagName: m[1].toUpperCase(), type: type || (m[1] === 'select' ? 'select-one' : m[1] === 'input' ? 'text' : undefined) });
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ', deg: '°', middot: '·', times: '×', plusmn: '±' };
const htmlToText = (h) => String(h).replace(/<[^>]*>/g, '').replace(/&(#?\w+);/g, (m, e) => ENTITIES[e] !== undefined ? ENTITIES[e] : m);

function makeElement(id) {
  const tag = htmlTags.get(id) || {};
  // innerHTML and textContent stay in sync like the DOM, so code that reads back a rendered value sees what a browser would
  let html = '', text = '';
  return {
    get innerHTML() { return html; }, set innerHTML(v) { html = String(v); text = htmlToText(html); },
    get textContent() { return text; }, set textContent(v) { text = String(v); html = text.replace(/&/g, '&amp;').replace(/</g, '&lt;'); },
    id, tagName: tag.tagName || 'DIV', type: tag.type, value: '', checked: false, title: '', className: '',
    style: {}, disabled: false, dataset: {}, width: 400, height: 400, childNodes: [], options: [],
    classList: makeClassList(),
    addEventListener() {}, removeEventListener() {}, setAttribute() {}, removeAttribute() {},
    appendChild() {}, append() {}, remove() {}, focus() {}, blur() {},
    querySelector(sel) { return makeElement(sel); }, querySelectorAll() { return []; },
    getContext() {
      return { clearRect() {}, beginPath() {}, arc() {}, stroke() {}, fill() {}, moveTo() {}, lineTo() {}, fillText() {},
        measureText() { return { width: 10 }; }, closePath() {}, save() {}, restore() {} };
    }
  };
}

function readData(file) {
  const s = fs.readFileSync(docs(file), 'utf8');
  return file.endsWith('.json') ? JSON.parse(s) : JSON.parse(s.replace(/^[\s\S]*?=\s*/, '').replace(/;\s*$/, ''));
}

/// Loads the studio into a fresh VM context. opts.data = false skips injecting the bundled snapshots.
function loadStudio(opts) {
  opts = opts || {};
  const elements = new Map();
  const document = {
    documentElement: { getAttribute() { return null; }, setAttribute() {} },
    getElementById(id) { if (!elements.has(id)) elements.set(id, makeElement(id)); return elements.get(id); },
    querySelector(sel) { return makeElement(sel); }, querySelectorAll() { return []; },
    createElement(tag) { return makeElement(tag); }, createTextNode(t) { return { textContent: t }; },
    addEventListener() {}
  };
  const sandbox = {
    console, setTimeout, clearTimeout, URL, URLSearchParams, document,
    window: { addEventListener() {}, matchMedia: null, location: { href: 'file:///harness', search: '' }, scrollTo() {} },
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    navigator: { clipboard: { writeText() { return Promise.resolve(); } } },
    prompt() { return null; }, alert() {}, fetch() { return Promise.resolve({ ok: false }); },
    Option: function Option(text, value) { this.text = text; this.value = value; }
  };
  vm.createContext(sandbox);
  const files = ['source_pipeline.js', 'wc_math.js', 'data/wc_schema.js', 'data/wc_defs_data.js', 'data/economy_values.js',
    'data/magazines_blueprints_data.js', 'app.js', 'ammo_maths.js', 'wc_editor.js'];
  vm.runInContext(files.map((f) => fs.readFileSync(docs(f), 'utf8')).join('\n;\n') + '\n;\nsetWcDefs(null);\n', sandbox, { filename: 'studio.js' });
  if (opts.data !== false) {
    sandbox.__w = readData('data/weapons_db.json');
    sandbox.__a = readData('data/ammos_db.json');
    sandbox.__m = readData('data/magazines_blueprints_data.js');
    vm.runInContext('weaponsDb = __w; ammosDb = __a; magazinesBlueprintsDb = __m; refreshAfterDataLoad();', sandbox);
  }
  return {
    sandbox,
    elements,
    run(code) { return vm.runInContext(code, sandbox); },
    call(fn, ...args) { sandbox.__args = args; return vm.runInContext(fn + '(...__args)', sandbox); }
  };
}

function makeChecker() {
  let failures = 0, passes = 0;
  const check = (name, cond, detail) => {
    if (cond) { passes++; console.log('  PASS  ' + name); }
    else { failures++; console.error('  FAIL  ' + name + (detail !== undefined ? '   got: ' + (typeof detail === 'string' ? detail : JSON.stringify(detail)) : '')); }
  };
  const done = (label) => {
    console.log(`\n${label}: ${passes} passed, ${failures} failed`);
    if (failures) process.exit(1);
  };
  return { check, done };
}

module.exports = { root, docs, loadStudio, makeChecker, readData };
