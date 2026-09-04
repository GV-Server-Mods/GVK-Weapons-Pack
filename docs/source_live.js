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

// ---------- UI: status chip + error banner (mounted in header next to WC sync) ----------
let chipEl = null;
let lastData = null;
let exportBtn = null;
function ensureChip() {
  if (chipEl) return chipEl;
  chipEl = document.getElementById('gvk-live-chip');
  if (chipEl) return chipEl;
  chipEl = document.createElement('span');
  chipEl.id = 'gvk-live-chip';
  chipEl.className = 'badge badge-green';
  chipEl.style.cssText = 'cursor: pointer; padding: 2px 8px; font-size: 10px;';
  chipEl.title = 'Data source. Click: hosted=reload / snapshot=link mod folder.';
  const headerGroup = document.querySelector('.logo-title div');
  if (headerGroup) headerGroup.appendChild(chipEl);
  else document.body.appendChild(chipEl);
  return chipEl;
}
function setChip(text, color, severity) {
  const el = ensureChip();
  el.textContent = text;
  el.classList.remove('badge-green', 'badge-amber', 'badge-red', 'badge-cyan');
  if (severity === 'error' || color === '#a33') {
    el.classList.add('badge-red');
  } else if (severity === 'warn' || color === '#a38' || color === '#d97706') {
    el.classList.add('badge-amber');
  } else {
    el.classList.add('badge-green');
  }
  if (color) el.style.borderColor = color;
  el.style.cursor = 'pointer';
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
  const data = lastData || {
    weapons: typeof BUNDLED_WEAPONS_DATA !== 'undefined' ? BUNDLED_WEAPONS_DATA : (typeof weaponsDb !== 'undefined' ? weaponsDb : []),
    ammos: typeof BUNDLED_AMMOS_DATA !== 'undefined' ? BUNDLED_AMMOS_DATA : (typeof ammosDb !== 'undefined' ? ammosDb : {}),
    magazines: typeof MAGAZINES_BLUEPRINTS_DATA !== 'undefined' ? MAGAZINES_BLUEPRINTS_DATA : (typeof magazinesBlueprintsDb !== 'undefined' ? magazinesBlueprintsDb : []),
  };
  if (!data || !data.weapons || !data.weapons.length) return;
  const w = JSON.stringify(data.weapons, null, 2);
  const a = JSON.stringify(data.ammos, null, 2);
  const m = JSON.stringify(data.magazines, null, 2);
  download('weapons_data.js', GEN_HEADER + 'const BUNDLED_WEAPONS_DATA = ' + w + ';\n');
  download('weapons_db.json', w + '\n');
  download('ammos_data.js', GEN_HEADER + 'const BUNDLED_AMMOS_DATA = ' + a + ';\n');
  download('ammos_db.json', a + '\n');
  download('magazines_blueprints_data.js', GEN_HEADER + 'const MAGAZINES_BLUEPRINTS_DATA = ' + m + ';\n');
  if (typeof showToast === 'function') {
    showToast('⬇ Exported 5 studio snapshot files to Downloads!');
  }
}
function showExportBtn() {
  if (!exportBtn) {
    exportBtn = document.getElementById('btnExportSnapshots');
  }
  if (exportBtn) {
    exportBtn.disabled = false;
    exportBtn.onclick = exportSnapshots;
  }
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

function formatCommitDate(raw) {
  if (!raw) return '';
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(raw)) return raw;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return '';
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  return `${mm}.${dd}.${yyyy}`;
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
  let dateStr = formatCommitDate(manifest.date);
  const sev = reportProblems(data, 'hosted @ ' + short);
  const chip = severityChip(sev);
  const dateTag = dateStr ? ' · ' + dateStr : '';
  const label = chip.icon + ' LIVE @ ' + short + dateTag + (manifest.ref ? ' (' + manifest.ref + ')' : '');

  // Asynchronous fallback: if manifest.date was empty, fetch commit date from GitHub API
  if (!dateStr && manifest.commit) {
    fetch('https://api.github.com/repos/gv-server-mods/GVK-Weapons-Pack/commits/' + manifest.commit)
      .then(res => res.ok ? res.json() : null)
      .then(info => {
        const d = info && info.commit && info.commit.committer && info.commit.committer.date;
        const formatted = formatCommitDate(d);
        const el = ensureChip();
        if (formatted && el) {
          const cur = el.textContent;
          if (!cur.includes(formatted)) {
            el.textContent = cur.replace(/(@\s*[0-9a-fA-F]+)/, `$1 · ${formatted}`);
          }
        }
      })
      .catch(() => {});
  }

  return { data, label, mode: 'hosted', severity: sev };
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
    // Atomic swap: validate ALL legs before pushing ANY to the app.
    const bad = window.SourcePipeline.validateLiveData(result.data);
    if (bad) {
      console.warn('Live data rejected, falling back to bundled:', bad);
      showBanner('⚠ Live source data problem (showing bundled fallback where possible):\n[' + result.mode + '] ' + bad, 'error');
      setChip('🔴 BUNDLED SNAPSHOT — click to link mod folder', '#a33');
      chipEl.onclick = async () => { try { await initFolderLink(opts.onReapply); } catch (e) { console.warn(e); showBanner('Folder link failed: ' + (e && e.message || e)); } };
      return { data: null, mode: 'snapshot' };
    }
    lastData = result.data;
  showExportBtn();
  const sev = severityChip(result.severity || 'clean');
  setChip(result.label, sev.color, result.severity || 'clean');
  chipEl.onclick = () => location.reload();
  if (opts.onReapply) opts.onReapply(result.data);
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
    setChip(chipSev.icon + ' LIVE — local folder' + (sev === 'clean' ? '' : ' (see banner)'), chipSev.color, sev);
    chipEl.onclick = () => initFolderLink(opts.onReapply);
    return { data, mode: 'folder' };
  }
} catch (e) {
  console.warn('Linked-folder read failed:', e);
}
// 3) Bundled snapshot fallback
showExportBtn();
setChip('🔴 BUNDLED SNAPSHOT — click to link mod folder', '#a33', 'error');
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
