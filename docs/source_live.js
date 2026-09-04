// source_live.js — live source loader for the GVK Weapon Studio.
// Hosted: fetches the repo source mirror (data/source/) staged by the deploy workflow and parses it
// in-browser via source_pipeline.js. Local: reads the mod folder via File System Access API.
// Falls back to bundled datasets with a visible status chip; never silently shows wrong data.
(function () {
'use strict';

const MANIFEST_URL = 'data/source/_manifest.json';
const MAG_FILES = ['AmmoMagazines_Ship.sbc', 'AmmoMagazines_Handheld.sbc'];

// ---------- tiny IndexedDB kv (persists the linked folder handle) ----------
function idb() {
  return new Promise((resolve, reject) => {
    const rq = indexedDB.open('gvk-studio', 1);
    rq.onupgradeneeded = () => rq.result.createObjectStore('kv');
    rq.onsuccess = () => resolve(rq.result);
    rq.onerror = () => reject(rq.error);
  });
}
async function idbGet(key) {
  const db = await idb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('kv').objectStore('kv').get(key);
    tx.onsuccess = () => resolve(tx.result);
    tx.onerror = () => reject(tx.error);
  });
}
async function idbSet(key, val) {
  const db = await idb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('kv', 'readwrite');
    tx.objectStore('kv').put(val, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ---------- UI: status chip + error banner (created here, zero index.html surgery) ----------
let chipEl = null;
let lastData = null;
let exportBtn = null;
function ensureChip() {
  if (chipEl) return chipEl;
  chipEl = document.createElement('div');
  chipEl.id = 'gvk-live-chip';
  chipEl.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:99999;font:12px/1.4 monospace;'
    + 'padding:6px 10px;border-radius:6px;background:#1b1e24;color:#cfd3dc;border:1px solid #3a3f4a;'
    + 'cursor:pointer;user-select:none;box-shadow:0 2px 8px rgba(0,0,0,.4);';
  chipEl.title = 'Data source. Click: hosted=reload / snapshot=link mod folder.';
  document.body.appendChild(chipEl);
  return chipEl;
}
function setChip(text, color) {
  const el = ensureChip();
  el.textContent = text;
  el.style.borderColor = color;
}
function showBanner(msg, severity) {
  let b = document.getElementById('gvk-live-banner');
  if (!b) {
    b = document.createElement('div');
    b.id = 'gvk-live-banner';
    b.style.cssText = 'position:fixed;left:10px;top:10px;right:10px;z-index:99998;font:13px/1.5 monospace;'
      + 'padding:10px 14px;border-radius:6px;'
      + 'white-space:pre-wrap;max-height:40vh;overflow:auto;';
    document.body.appendChild(b);
  }
  const bg = severity === 'warn' ? '#5c4a1a' : '#5c1a1a';
  const fg = severity === 'warn' ? '#ffe9b8' : '#ffd9d9';
  const border = severity === 'warn' ? '#a38' : '#a33';
  b.style.background = bg; b.style.color = fg; b.style.border = '1px solid ' + border;
  b.textContent = '';
  const span = document.createElement('span');
  span.textContent = msg;
  b.appendChild(span);
  const x = document.createElement('span');
  x.textContent = ' ✕';
  x.style.cssText = 'cursor:pointer;float:right;font-weight:bold;margin-left:12px;';
  x.onclick = () => { b.style.display = 'none'; };
  b.appendChild(x);
  b.style.display = 'block';
  // Auto-dismiss after 10s so the studio stays usable even with non-fatal problems.
  clearTimeout(b._dismissTimer);
  b._dismissTimer = setTimeout(() => { if (b) b.style.display = 'none'; }, 10000);
}

// ---------- source readers ----------
async function readFolderSources(rootHandle) {
  const csSources = {};
  const dir = await rootHandle.getDirectoryHandle('CoreParts');
  for await (const [name, h] of dir.entries()) {
    if (name.endsWith('.cs') && !/Animations/.test(name) && h.kind === 'file') {
      csSources[name] = await (await h.getFile()).text();
    }
  }
  const dataDir = await rootHandle.getDirectoryHandle('Content').then((d) => d.getDirectoryHandle('Data'));
  const magazines = [];
  for (const f of MAG_FILES) {
    magazines.push(await (await (await dataDir.getFileHandle(f)).getFile()).text());
  }
  const blueprints = await (await (await dataDir.getFileHandle('Blueprints.sbc')).getFile()).text();
  const cubeBlocks = {};
  const cbDir = await dataDir.getDirectoryHandle('CubeBlocks');
  for await (const [name, h] of cbDir.entries()) {
    if (name.endsWith('.sbc') && h.kind === 'file') {
      cubeBlocks[name] = await (await h.getFile()).text();
    }
  }
  return { csSources, sbc: { magazines, blueprints, cubeBlocks } };
}

async function fetchText(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('fetch ' + url + ' -> ' + res.status);
  return res.text();
}

// ---------- snapshot export (the one-time regen tool / offline fallback refresher) ----------
function download(name, text) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
const GEN_HEADER = '// GENERATED by the GVK Weapon Studio live pipeline (source_pipeline.js) — DO NOT HAND-EDIT.\n'
  + '// Regenerate: open the Studio in LIVE mode and click "Export snapshots".\n';
function exportSnapshots() {
  if (!lastData) return;
  const w = JSON.stringify(lastData.weapons, null, 2);
  const a = JSON.stringify(lastData.ammos, null, 2);
  const m = JSON.stringify(lastData.magazines, null, 2);
  download('weapons_data.js', GEN_HEADER + 'const BUNDLED_WEAPONS_DATA = ' + w + ';\n');
  download('weapons_db.json', w + '\n');
  download('ammos_data.js', GEN_HEADER + 'const BUNDLED_AMMOS_DATA = ' + a + ';\n');
  download('ammos_db.json', a + '\n');
  download('magazines_blueprints_data.js', GEN_HEADER + 'const MAGAZINES_BLUEPRINTS_DATA = ' + m + ';\n');
}
function showExportBtn() {
  if (exportBtn || !lastData) return;
  exportBtn = document.createElement('div');
  exportBtn.style.cssText = 'position:fixed;left:10px;bottom:40px;z-index:99999;font:12px/1.4 monospace;'
    + 'padding:6px 10px;border-radius:6px;background:#1b1e24;color:#cfd3dc;border:1px solid #3a7;'
    + 'cursor:pointer;user-select:none;';
  exportBtn.textContent = '⬇ Export snapshots';
  exportBtn.title = 'Download the parsed live data as the bundled fallback datasets (drops 5 files into your Downloads folder).';
  exportBtn.onclick = exportSnapshots;
  document.body.appendChild(exportBtn);
}

async function buildFrom(csSources, sbc) {
  const overrides = window.STUDIO_OVERRIDES || {};
  const data = window.SourcePipeline.buildStudioData(csSources, sbc, overrides);
  return data;
}

// Classify data problems: 'error' (unresolved refs, missing data — real breakage),
// 'warn' (non-fatal quirks), 'clean' (no problems).
function classifySeverity(data) {
  if (data.errors && data.errors.length) return 'error';
  if (data.warnings && data.warnings.length) return 'warn';
  return 'clean';
}

// Map a severity to chip emoji + border color so the chip reflects data health.
function severityChip(sev) {
  if (sev === 'error') return { icon: '🔴', color: '#a33' };
  if (sev === 'warn') return { icon: '🟡', color: '#a38' };
  return { icon: '🟢', color: '#3a7' };
}

function reportProblems(data, mode) {
  const sev = classifySeverity(data);
  const probs = [];
  if (data.errors && data.errors.length) probs.push(...data.errors);
  if (data.warnings && data.warnings.length) probs.push(...data.warnings.map((w) => 'WARN: ' + w));
  if (probs.length) {
    const prefix = sev === 'warn'
      ? '⚠ Live source warnings (data loaded, some quirks):\n'
      : '⚠ Live source data errors (showing partial data where possible):\n';
    showBanner(prefix + '[' + mode + '] ' + probs.join('\n'), sev);
  }
  return sev;
}

async function initHosted() {
  const manifestRes = await fetch(MANIFEST_URL, { cache: 'no-store' });
  if (!manifestRes.ok) return null;
  const manifest = await manifestRes.json();
  const csSources = {};
  for (const name of manifest.coreParts || []) {
    csSources[name] = await fetchText('data/source/CoreParts/' + name);
  }
  const magazines = [];
  for (const f of MAG_FILES) magazines.push(await fetchText('data/source/Data/' + f));
  const blueprints = await fetchText('data/source/Data/Blueprints.sbc');
  const cubeBlocks = {};
  for (const name of manifest.cubeBlocks || []) {
    cubeBlocks[name] = await fetchText('data/source/Data/CubeBlocks/' + name);
  }
  const data = await buildFrom(csSources, { magazines, blueprints, cubeBlocks });
  const short = String(manifest.commit || '').slice(0, 7);
  const sev = reportProblems(data, 'hosted @ ' + short);
  const chip = severityChip(sev);
  return { data, label: chip.icon + ' LIVE @ ' + short + ' (' + manifest.ref + ')', mode: 'hosted', severity: sev };
}

async function initFolderLink(onReapply) {
  if (!window.showDirectoryPicker) return null;
  const rootHandle = await window.showDirectoryPicker({ id: 'gvk-weapons-mod' });
  await idbSet('rootHandle', rootHandle);
  const src = await readFolderSources(rootHandle);
  const data = await buildFrom(src.csSources, src.sbc);
  lastData = data;
  showExportBtn();
  const sev = reportProblems(data, 'local folder');
  const chip = severityChip(sev);
  setChip(chip.icon + ' LIVE — local folder' + (sev === 'clean' ? '' : ' (see banner)'), chip.color);
  if (onReapply) onReapply(data);
  return { data };
}

async function init(opts) {
  opts = opts || {};
  const chip = ensureChip();
  let result = null;
  // 1) Hosted repo mirror
  try {
    result = await initHosted();
  } catch (e) {
    console.warn('Hosted source fetch failed:', e);
  }
  if (result && result.data) {
    lastData = result.data;
    showExportBtn();
    const sev = severityChip(result.severity || 'clean');
    setChip(result.label, sev.color);
    chipEl.onclick = () => location.reload();
    return result;
  }
  // 2) Previously linked mod folder (persisted handle)
  try {
    const saved = await idbGet('rootHandle');
    if (saved && await saved.queryPermission({ mode: 'read' }) === 'granted') {
      const src = await readFolderSources(saved);
      const data = await buildFrom(src.csSources, src.sbc);
      lastData = data;
      showExportBtn();
      const sev = reportProblems(data, 'local folder');
      const chipSev = severityChip(sev);
      setChip(chipSev.icon + ' LIVE — local folder' + (sev === 'clean' ? '' : ' (see banner)'), chipSev.color);
      chipEl.onclick = () => initFolderLink(opts.onReapply);
      return { data, mode: 'folder' };
    }
  } catch (e) {
    console.warn('Linked-folder read failed:', e);
  }
  // 3) Bundled snapshot fallback
  setChip('🔴 BUNDLED SNAPSHOT — click to link mod folder', '#a33');
  chip.onclick = async () => {
    try {
      await initFolderLink(opts.onReapply);
    } catch (e) {
      console.warn(e);
      showBanner('Folder link failed: ' + (e && e.message || e));
    }
  };
  return { data: null, mode: 'snapshot' };
}

window.GVKLiveSource = { init, showBanner, exportSnapshots };
})();
