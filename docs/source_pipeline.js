// source_pipeline.js — parses WeaponCore CoreParts C# definitions into Studio data shapes.
// Zero dependencies. Browser: window.SourcePipeline. Node: module.exports (used by CI gate + tests).
(function (root) {
'use strict';

// Strip // and /* */ comments, preserving string literal contents.
function stripComments(src) {
  let out = '', i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '"') {
      out += c; i++;
      while (i < src.length && src[i] !== '"') {
        if (src[i] === '\\') { out += src[i] + src[i + 1]; i += 2; } else out += src[i++];
      }
      out += '"'; i++; continue;
    }
    if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') { i += 2; while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++; i += 2; continue; }
    out += c; i++;
  }
  return out;
}

// Index of the '}' matching the '{' at |open|; skips string literals. -1 if unbalanced.
function braceMatch(s, open) {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    const c = s[i];
    if (c === '"') { i++; while (i < s.length && s[i] !== '"') { if (s[i] === '\\') i++; i++; } continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return i;
  }
  return -1;
}

// Recursive-descent parser for C# object-initializer expressions.
// Bare identifiers become {__id:name}; calls like Vector(x:1) become {__call,args}.
function exprParser(s) {
  let i = 0;
  function fail(what) { throw new Error('parse ' + what + ' @' + i + ': …' + s.slice(Math.max(0, i - 25), i + 40)); }
  function ws() { while (i < s.length && /\s/.test(s[i])) i++; }
  function word() { ws(); const m = /^\w+/.exec(s.slice(i)); if (!m) fail('word'); i += m[0].length; return m[0]; }
  function strv() { ws(); if (s[i] !== '"') fail('string'); i++; let o = '';
    while (s[i] !== '"') { if (s[i] === '\\') { o += s[i + 1]; i += 2; } else o += s[i++]; } i++; return o; }
  function numv() { ws(); const m = /^-?[\d.]+(?:[eE][+-]?\d+)?[fFdDmM]?/.exec(s.slice(i)); if (!m) fail('number'); i += m[0].length; return parseFloat(m[0]); }
  function val() {
    ws();
    const c = s[i];
    if (c === '"') return strv();
    if (c === '-' || c === '.' || (c >= '0' && c <= '9')) return numv();
    if (c === '{') return objv();
    let w = word();
    if (w === 'new') {
      ws();
      if (s[i] === '[') { const m = /^\[\s*\]\s*\{/.exec(s.slice(i)); if (!m) fail('new[]'); i += m[0].length; return listv(); }
      const t = word(); ws();
      if (s[i] === '(') { const c = parseCall(t); c.__new = true; return c; }
      if (s[i] !== '{') fail('initializer');
      return objv();
    }
    if (w === 'true') return true;
    if (w === 'false') return false;
    if (w === 'null' || w === 'default') { ws(); if (s[i] === '(') { i++; ws(); if (s[i] === ')') i++; } return null; }
    ws();
    while (s[i] === '.' && /\w/.test(s[i + 1] || '')) { i++; w += '.' + word(); ws(); }
    if (s[i] === '(') return parseCall(w);
    return { __id: w };
  }
  // Constructor call: named args (Vector(x: 1)) and/or positional (Vector4(1f,1f,1f,1f)).
  function parseCall(name) {
    i++; const a = {}, pos = [];
    while (true) {
      ws(); if (s[i] === ')') { i++; break; }
      const m = /^(\w+)\s*:/.exec(s.slice(i));
      if (m) { i += m[0].length; a[m[1]] = val(); }
      else pos.push(val());
      ws(); if (s[i] === ',') i++;
    }
    const out = { __call: name };
    if (Object.keys(a).length) out.args = a;
    if (pos.length) out.pos = pos;
    return out;
  }
  function objv() {
    i++; const o = {};
    while (true) {
      ws(); if (s[i] === '}') { i++; return o; }
      const name = word(); ws();
      if (s[i] !== '=') fail('= after ' + name); i++;
      o[name] = val(); ws(); if (s[i] === ',') i++;
    }
  }
  function listv() {
    const a = [];
    while (true) {
      ws(); if (s[i] === '}') { i++; return a; }
      a.push(val()); ws(); if (s[i] === ',') i++;
    }
  }
  return { val, objv };
}

// Top-level defs always declare ownerType == defType (e.g. "AmmoDef X => new AmmoDef {").
const INIT_RE = /(\w+)\s+(\w+)\s*(?:=>|=)\s*new\s+(\w+)\s*(?:\[[^\]]*\]\s*)?\{/g;
// Property with a getter body: "AmmoDef X { get { ... } }" (clone-getter pattern).
const GET_RE = /(\w+)\s+(\w+)\s*\{\s*get\s*\{/g;

function extractDefs(src, fileName, into, errors, warnings) {
  const text = stripComments(src);
  const ranges = [];
  let m;
  INIT_RE.lastIndex = 0;
  while ((m = INIT_RE.exec(text))) {
    if (m[1] !== m[3]) continue; // nested "X = new OtherType {" — not a top-level def
    const open = m.index + m[0].length - 1;
    const close = braceMatch(text, open);
    if (close < 0) { errors.push(fileName + ': unbalanced braces after ' + m[2]); continue; }
    ranges.push({ start: m.index, end: close, name: m[2], type: m[3], open });
  }
  GET_RE.lastIndex = 0;
  while ((m = GET_RE.exec(text))) {
    const open = m.index + m[0].length - 1;
    const close = braceMatch(text, open);
    if (close < 0) { errors.push(fileName + ': unbalanced getter ' + m[2]); continue; }
    ranges.push({ start: m.index, end: close, name: m[2], type: m[1], getter: text.slice(open, close + 1) });
  }
  ranges.sort((a, b) => a.start - b.start);
  const tops = ranges.filter((r) => !ranges.some((o) => o !== r && o.start < r.start && o.end > r.end));
  for (const r of tops) {
    if (into[r.name]) warnings.push(fileName + ': duplicate def ' + r.name + ' — overriding');
    if (r.getter !== undefined) {
      into[r.name] = { type: r.type, getter: r.getter, file: fileName };
    } else {
      try {
        const p = exprParser(text.slice(r.open, r.end + 1));
        into[r.name] = { type: r.type, value: p.objv(), file: fileName };
      } catch (e) { errors.push(fileName + ' [' + r.name + ']: ' + e.message); }
    }
  }
}

function setPath(obj, path, value) {
  const segs = path.split('.').map((part) => {
    const mm = /^(\w+)(?:\[(\d+)\])?$/.exec(part);
    if (!mm) throw new Error('bad path ' + path);
    return { key: mm[1], idx: mm[2] === undefined ? null : +mm[2] };
  });
  let cur = obj;
  for (let k = 0; k < segs.length - 1; k++) {
    const s2 = segs[k];
    cur = s2.idx !== null ? cur[s2.key][s2.idx] : cur[s2.key];
  }
  const last = segs[segs.length - 1];
  if (last.idx !== null) cur[last.key][last.idx] = value; else cur[last.key] = value;
}

// Evaluate a clone-getter body: deep-copy the base def, then apply its assignments.
// Returns undefined while the base is itself an unevaluated getter (multi-pass chaining).
function evalGetter(getter, defs, errors, name) {
  let base = null, varName = null;
  const assigns = [];
  const pieces = getter.split(';');
  for (let k = 0; k < pieces.length; k++) {
    let st = pieces[k];
    if (k === 0) st = st.replace(/^[^{]*\{/, ''); // getter body opening brace
    if (k === pieces.length - 1) st = st.replace(/\}[\s\S]*$/, ''); // closing brace + tail
    st = st.replace(/\bget\b/, ' ').trim();
    if (!st) continue;
    let mm = /^var\s+(\w+)\s*=\s*([\w.]+)$/.exec(st);
    if (mm) { varName = mm[1]; base = mm[2]; continue; }
    mm = /^return\s+([\w.]+)$/.exec(st);
    if (mm) continue; // return value is always the clone var in this codebase
    if (/^[\w.]+\s*\(.*\)$/.test(st)) continue; // method-call side effect (e.g. muzzle FX config) — no data impact
    mm = /^([\w.[\]]+)\s*=\s*([\s\S]+)$/.exec(st);
    if (mm) assigns.push([mm[1], mm[2]]);
    else errors.push('getter ' + name + ': unhandled statement: ' + st.slice(0, 70));
  }
  if (!base) { errors.push('getter ' + name + ': no base var found'); return null; }
  const b = defs[base];
  if (!b) { errors.push('getter ' + name + ': base def ' + base + ' not found'); return null; }
  if (b.value === undefined) return undefined; // pending — retry next pass
  const out = JSON.parse(JSON.stringify(b.value));
  const prefix = new RegExp('^' + varName + '\\s*\\.\\s*');
  for (const [path, rhs] of assigns) {
    const p = path.replace(prefix, '');
    try { setPath(out, p, exprParser(rhs).val()); }
    catch (e) { errors.push('getter ' + name + ' [' + path + ']: ' + e.message); }
  }
  return out;
}

// Resolve bare {__id} refs: known def → plain string name (collected as helper), else enum literal kept as string.
function resolveTree(v, defs, helpers) {
  if (Array.isArray(v)) return v.map((x) => resolveTree(x, defs, helpers));
  if (v && typeof v === 'object') {
    if (v.__id !== undefined) {
      if (defs[v.__id]) helpers.add(v.__id);
      return v.__id;
    }
    if (v.__call !== undefined) {
      const args = {};
      for (const k in v.args) args[k] = resolveTree(v.args[k], defs, helpers);
      return { __call: v.__call, args };
    }
    const o = {};
    for (const k in v) o[k] = resolveTree(v[k], defs, helpers);
    return o;
  }
  return v;
}

// sources: {fileName: text}. Returns {defs, ammos, weapons, errors, warnings}.
function parseAll(sources) {
  const defs = {}, errors = [], warnings = [];
  for (const f of Object.keys(sources).sort()) {
    // Animation files use C# generics/#region the parser doesn't handle and contribute no studio data.
    if (f.includes('Animations') || f.endsWith('Animation.cs')) continue;
    extractDefs(sources[f], f, defs, errors, warnings);
  }
  for (let pass = 0; pass < 6; pass++) {
    let changed = false;
    for (const name of Object.keys(defs)) {
      const d = defs[name];
      if (d && d.getter !== undefined && d.value === undefined) {
        const v = evalGetter(d.getter, defs, errors, name);
        if (v === undefined) continue; // base not ready yet
        d.value = v; changed = true;
      }
    }
    if (!changed) break;
  }
  for (const name of Object.keys(defs)) {
    if (defs[name].value === undefined) errors.push('clone chain never resolved for ' + name);
  }
  const wcDefs = collectWcDefs(defs);
  const ammos = {}, weapons = [];
  for (const name of Object.keys(defs)) {
    const d = defs[name];
    if (!d.value) continue;
    if (d.type === 'AmmoDef') {
      const helpers = new Set();
      ammos[name] = { def: resolveTree(inlineHelpers(d.value, wcDefs.helpers), defs, helpers), helpers: [...helpers] };
    } else if (d.type === 'WeaponDefinition') {
      const helpers = new Set();
      const def = resolveTree(d.value, defs, helpers);
      const mp = (def.Assignments && def.Assignments.MountPoints) || [];
      const hp = def.HardPoint || {};
      const loading = hp.Loading || {};
      const assigned = [];
      for (const a of def.Ammos || []) {
        const ad = defs[a];
        if (ad && ad.value) assigned.push(a); // def identifier — unique key into ammosDb
        else warnings.push('weapon ' + name + ': Ammos ref does not resolve: ' + a);
      }
      weapons.push({
        defName: name,
        subtypeIds: mp.map((mm) => mm.SubtypeId),
        subtypeId: mp.length ? mp[0].SubtypeId : null,
        name: hp.PartName || name,
        rateOfFire: loading.RateOfFire,
        reloadTime: loading.ReloadTime,
        barrelsPerShot: loading.BarrelsPerShot,
        magsToLoad: loading.MagsToLoad,
        assignedAmmos: assigned,
        ammoName: assigned[0] || null,
        helpers: [...helpers],
        def,
      });
    }
  }
  return { defs, ammos, weapons, wcDefs, errors, warnings };
}

// Lossless per-def source trees for the Studio's full-field editor and C# serializer. Bare identifiers stay
// {__id} (enum literal or shared helper ref) and constructor calls stay {__call}, so export round-trips.
function collectWcDefs(defs) {
  const out = { ammos: {}, weapons: {}, helpers: {} };
  for (const name of Object.keys(defs)) {
    const d = defs[name];
    if (!d.value) continue;
    const entry = { type: d.type, file: d.file, tree: JSON.parse(JSON.stringify(d.value)) };
    if (d.type === 'AmmoDef') out.ammos[name] = entry;
    else if (d.type === 'WeaponDefinition') out.weapons[name] = entry;
    else out.helpers[name] = entry;
  }
  return out;
}

// Replace shared-helper refs ({__id} naming a helper def) with that helper's tree; enum ids stay as-is.
function inlineHelpers(v, helpers, depth) {
  depth = depth || 0;
  if (Array.isArray(v)) return v.map((x) => inlineHelpers(x, helpers, depth));
  if (v && typeof v === 'object') {
    if (v.__id !== undefined) {
      const h = helpers[v.__id];
      return (h && depth < 8) ? inlineHelpers(h.tree, helpers, depth + 1) : v;
    }
    if (v.__call !== undefined) return v;
    const o = {};
    for (const k in v) o[k] = inlineHelpers(v[k], helpers, depth);
    return o;
  }
  return v;
}

// ---------- SBC (XML) parsing ----------
// Minimal XML parser sufficient for SBC files: elements, attributes, text, comments. No namespaces/CDATA.
function decodeXml(s) {
  return s.replace(/&(lt|gt|amp|quot|apos);/g, (_, e) => ({ lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" }[e]));
}
function parseXml(src) {
  let i = 0;
  const root = { tag: '#root', attrs: {}, children: [], text: '' };
  const stack = [root];
  while (i < src.length) {
    const lt = src.indexOf('<', i);
    if (lt < 0) break;
    if (lt > i) {
      const t = decodeXml(src.slice(i, lt).trim());
      if (t) stack[stack.length - 1].text += (stack[stack.length - 1].text ? ' ' : '') + t;
    }
    if (src.startsWith('<!--', lt)) { const e = src.indexOf('-->', lt); i = e < 0 ? src.length : e + 3; continue; }
    if (src.startsWith('<?', lt) || src.startsWith('<!', lt)) { i = src.indexOf('>', lt) + 1; continue; }
    const gt = src.indexOf('>', lt);
    if (gt < 0) break;
    const inner = src.slice(lt + 1, gt).trim();
    if (inner[0] === '/') { stack.pop(); i = gt + 1; continue; }
    const m = /^([\w:.-]+)\s*([\s\S]*?)\s*(\/?)$/.exec(inner);
    const node = { tag: m[1], attrs: {}, children: [], text: '' };
    const am = /([\w:.-]+)\s*=\s*"([^"]*)"/g; let a;
    while ((a = am.exec(m[2]))) node.attrs[a[1]] = decodeXml(a[2]);
    stack[stack.length - 1].children.push(node);
    if (m[3] !== '/') stack.push(node);
    i = gt + 1;
  }
  return root.children[0] || root;
}
function xmlKids(node, tag) { return node ? node.children.filter((c) => c.tag === tag) : []; }
function xmlKid(node, tag) { return node ? node.children.find((c) => c.tag === tag) : null; }
function xmlText(node) { return node ? (node.text || '').trim() : ''; }
function xmlNum(node) { const t = xmlText(node); return t ? parseFloat(t) || 0 : 0; }
function subId(defNode) { return xmlText(xmlKid(xmlKid(defNode, 'Id'), 'SubtypeId')); }

// Raw source text of each <tag>…</tag> element, keyed by its first <SubtypeId> (the Id block's).
function rawElements(xmlText2, tag) {
  const out = {};
  const re = new RegExp('<' + tag + '(\\s[^>]*)?>[\\s\\S]*?</' + tag + '>', 'g');
  let m;
  while ((m = re.exec(xmlText2))) {
    const sub = /<SubtypeId>([^<]*)<\/SubtypeId>/.exec(m[0]);
    if (sub && !(sub[1].trim() in out)) out[sub[1].trim()] = m[0].replace(/\r\n/g, '\n');
  }
  return out;
}
function parseMagazines(xmlText2) {
  const out = {};
  const raws = rawElements(xmlText2, 'AmmoMagazine');
  xmlKids(xmlKid(parseXml(xmlText2), 'AmmoMagazines'), 'AmmoMagazine').forEach((d) => {
    out[subId(d)] = {
      subtypeId: subId(d),
      displayName: xmlText(xmlKid(d, 'DisplayName')),
      icon: xmlText(xmlKid(d, 'Icon')),
      capacity: xmlNum(xmlKid(d, 'Capacity')),
      volume: xmlNum(xmlKid(d, 'Volume')),
      mass: xmlNum(xmlKid(d, 'Mass')),
      xml: raws[subId(d)] || null,
    };
  });
  return out;
}
function parseBlueprints(xmlText2) {
  const out = [];
  const raws = rawElements(xmlText2, 'Blueprint');
  for (const b of xmlKids(xmlKid(parseXml(xmlText2), 'Blueprints'), 'Blueprint')) {
    const res = xmlKid(b, 'Result');
    out.push({
      xml: raws[subId(b)] || null,
      blueprintSubtype: subId(b),
      resultSubtype: res ? res.attrs.SubtypeId : null,
      productionTime: xmlNum(xmlKid(b, 'BaseProductionTimeInSeconds')),
      prerequisites: xmlKids(xmlKid(b, 'Prerequisites'), 'Item').map((it) => ({
        amount: parseFloat(it.attrs.Amount) || 0,
        typeId: it.attrs.TypeId,
        subtypeId: it.attrs.SubtypeId,
      })),
    });
  }
  return out;
}
function parseCubeBlocks(xmlText2) {
  const out = {};
  for (const d of xmlKids(xmlKid(parseXml(xmlText2), 'CubeBlocks'), 'Definition')) {
    if (d.attrs.Enabled === 'false' || d.attrs.enabled === 'false') {
      continue;
    }
    const comps = xmlKid(d, 'Components');
    const crit = xmlKid(d, 'CriticalComponent');
    const szNode = xmlKid(d, 'Size');
    const idNode = xmlKid(d, 'Id');
    const typeIdVal = xmlText(xmlKid(idNode, 'TypeId'));
    const subIdVal = subId(d) || typeIdVal;
    const blockData = {
      subtypeId: subIdVal,
      typeId: typeIdVal,
      xsiType: d.attrs['xsi:type'] || '',
      displayName: xmlText(xmlKid(d, 'DisplayName')),
      description: xmlText(xmlKid(d, 'Description')),
      icon: xmlText(xmlKid(d, 'Icon')),
      cubeSize: xmlText(xmlKid(d, 'CubeSize')) || 'Large',
      size: szNode ? {
        x: parseInt(szNode.attrs.x) || 1,
        y: parseInt(szNode.attrs.y) || 1,
        z: parseInt(szNode.attrs.z) || 1
      } : null,
      pcu: xmlNum(xmlKid(d, 'PCU')),
      buildTimeSeconds: xmlNum(xmlKid(d, 'BuildTimeSeconds')),
      components: comps ? xmlKids(comps, 'Component').map((c) => {
        const decomp = xmlKid(c, 'DeconstructId');
        return {
          name: c.attrs.Subtype,
          count: parseInt(c.attrs.Count) || 0,
          deconstructSubtype: decomp ? xmlText(xmlKid(decomp, 'SubtypeId')) : null,
          deconstructType: decomp ? xmlText(xmlKid(decomp, 'TypeId')) : null,
        };
      }) : [],
      criticalComponent: crit ? crit.attrs.Subtype || null : null,
    };
    out[subIdVal] = blockData;
  }
  return out;
}

// ---------- Studio data-shape builders (match docs/data bundled shapes exactly) ----------
function randStart(v) {
  if (v && v.__call === 'Random') return (v.args && v.args.start) || 0;
  return typeof v === 'number' ? v : 0;
}
// WC AreaOfDamageDef.ByBlockHit / EndOfLife: only Enable switches the effect on (AmmoConstants.AreaEffects)
function aoeShape(x) {
  x = x || {};
  return {
    enable: x.Enable === true, damage: x.Damage || 0, radius: x.Radius || 0, depth: x.Depth || 0,
    maxAbsorb: x.MaxAbsorb || 0, falloff: (typeof x.Falloff === 'string' && x.Falloff) || 'Legacy',
    shape: (typeof x.Shape === 'string' && x.Shape) || 'Round', minArmingTime: x.MinArmingTime || 0,
    armOnlyOnHit: x.ArmOnlyOnHit === true,
  };
}
function ammoShape(name, d, file) {
  const hp = d.HardPoint || {};
  const ao = d.AreaOfDamage || {};
  const ae = ao.AreaEffect || {};
  const ew = d.Ewar || {};
  const pat = d.Pattern || {};
  const oh = d.ObjectsHit || {};
  const fo = (d.DamageScales && d.DamageScales.FallOff) || {};
  const frag = d.Fragment || {};
  const ts = frag.TimedSpawns || {};
  const traj = d.Trajectory || {};
  const ds = d.DamageScales || {};
  const arm = ds.Armor || {};
  const grids = ds.Grids || {};
  const cutArm = (ds.ArmorForCutoff && typeof ds.ArmorForCutoff === 'object') ? ds.ArmorForCutoff : null;
  const cutGrid = (ds.GridSizeForCutoff && typeof ds.GridSizeForCutoff === 'object') ? ds.GridSizeForCutoff : null;
  const dmgType = ds.DamageType || {};
  const lines = (d.AmmoGraphics && d.AmmoGraphics.Lines) || {};
  const tracer = lines.Tracer || {};
  const col = (tracer.Color && tracer.Color.args) || {};
  const audio = d.AmmoAudio || {};
  const beams = d.Beams || {};
  return {
    name, base_name: null, file,
    ammoMagazine: d.AmmoMagazine || 'Energy',
    ammoRound: d.AmmoRound || name,
    terminalName: d.TerminalName || d.AmmoRound || name,
    // AmmoConstants.IsBeamWeapon = Beams.Enable && Guidance None; >= 10 km/s rounds are hitscan in practice
    isBeam: (beams.Enable === true && (traj.Guidance || 'None') === 'None') || (traj.DesiredSpeed || 0) >= 10000,
    beams: { enable: beams.Enable === true, virtualBeams: beams.VirtualBeams === true },
    baseDamage: d.BaseDamage || 0,
    baseDamageCutoff: d.BaseDamageCutoff || 0,
    mass: d.Mass || 0,
    health: d.Health || 0,
    backKickForce: d.BackKickForce || 0,
    hardPointUsable: d.HardPointUsable !== false,
    npcSafe: !(d.NpcSafe === false),
    noGridOrArmorScaling: d.NoGridOrArmorScaling === true,
    hybridRound: d.HybridRound === true,
    energyCost: d.EnergyCost || 0,
    energyMagazineSize: d.EnergyMagazineSize || 0,
    decayPerShot: d.DecayPerShot || 0,
    heatPerShot: d.HeatPerShot || 0,
    heatModifier: d.HeatModifier === undefined ? 1 : d.HeatModifier,
    allowNegativeHeatModifier: d.AllowNegativeHeatModifier === true,
    heatNeededToFire: d.HeatNeededToFire || 0,
    shape: typeof d.Shape === 'string' ? d.Shape : 'LineShape',
    diameter: d.Diameter === undefined ? -1 : d.Diameter,
    objectsHit: { maxObjectsHit: oh.MaxObjectsHit || 0, countBlocks: oh.CountBlocks === true, skipBlocksForAOE: oh.SkipBlocksForAOE === true },
    ewar: {
      enable: ew.Enable === true, type: (typeof ew.Type === 'string' && ew.Type) || 'AntiSmart',
      mode: (typeof ew.Mode === 'string' && ew.Mode) || 'Effect', strength: ew.Strength || 0, radius: ew.Radius || 0,
      duration: ew.Duration || 0, maxStacks: ew.MaxStacks || 0, stackDuration: ew.StackDuration === true, deplete: ew.Depletable === true,
    },
    pattern: {
      enable: pat.Enable === true, mode: (typeof pat.Mode === 'string' && pat.Mode) || 'Never',
      patterns: Array.isArray(pat.Patterns) ? pat.Patterns.map((x) => (typeof x === 'string' ? x : '')) : [],
      triggerChance: pat.TriggerChance === undefined ? 1 : pat.TriggerChance, random: pat.Random === true,
      randomMin: pat.RandomMin || 0, randomMax: pat.RandomMax || 0, skipParent: pat.SkipParent === true, patternSteps: pat.PatternSteps || 0,
    },
    fragment: {
      enable: frag.Enable === true || !!frag.Fragments,
      ammoRound: frag.AmmoRound || '', fragments: frag.Fragments || 0,
      degrees: frag.Degrees || 0, reverse: frag.Reverse === true, dropVelocity: frag.DropVelocity === true,
      ignoreArming: frag.IgnoreArming === true, radial: frag.Radial || 0, offset: frag.Offset || 0,
      maxChildren: frag.MaxChildren || 0, armWhenHit: frag.ArmWhenHit === true,
      timedSpawns: {
        enable: ts.Enable === true, startTime: ts.StartTime || 0, interval: ts.Interval || 0,
        maxSpawns: ts.MaxSpawns || 0, proximity: ts.Proximity || 0, parentDies: ts.ParentDies === true,
        pointAtTarget: ts.PointAtTarget === true, pointType: (typeof ts.PointType === 'string' && ts.PointType) || 'Direct',
        directAimCone: ts.DirectAimCone || 0, groupSize: ts.GroupSize || 0, groupDelay: ts.GroupDelay || 0,
      },
    },
    areaOfDamage: {
      enable: (ao.ByBlockHit && ao.ByBlockHit.Enable === true) || (ao.EndOfLife && ao.EndOfLife.Enable === true) || false,
      byBlockHit: aoeShape(ao.ByBlockHit),
      endOfLife: aoeShape(ao.EndOfLife),
      areaEffect: { areaEffect: ae.AreaEffect === true, damage: ae.Damage || 0, radius: ae.Radius || 0 },
    },
    trajectory: {
      desiredSpeed: traj.DesiredSpeed || 0, maxTrajectory: traj.MaxTrajectory || 0,
      maxLifeTime: traj.MaxLifeTime || 0, accelPerSec: traj.AccelPerSec || 0, speedVariance: randStart(traj.SpeedVariance),
      rangeVariance: randStart(traj.RangeVariance),
      guidance: (typeof traj.Guidance === 'string' && traj.Guidance) || 'None',
      desiredElevation: (function() {
        const apps = traj.Approaches;
        if (Array.isArray(apps)) {
          for (const a of apps) {
            if (a && a.DesiredElevation !== undefined && parseFloat(a.DesiredElevation) > 0) return parseFloat(a.DesiredElevation);
          }
        } else if (apps && typeof apps === 'object' && apps.DesiredElevation !== undefined) {
          return parseFloat(apps.DesiredElevation) || 0;
        }
        return 0;
      })(),
    },
    damageScales: {
      shield: ds.Shields !== undefined ? ds.Shields : (ds.Shield !== undefined ? ds.Shield : 0),
      armorArmor: arm.Armor !== undefined ? arm.Armor : (ds.ArmorArmor !== undefined ? ds.ArmorArmor : -1),
      lightArmor: arm.Light !== undefined ? arm.Light : (ds.Lights !== undefined ? ds.Lights : (ds.LightArmor !== undefined ? ds.LightArmor : -1)),
      heavyArmor: arm.Heavy !== undefined ? arm.Heavy : (ds.Heavies !== undefined ? ds.Heavies : (ds.HeavyArmor !== undefined ? ds.HeavyArmor : -1)),
      nonArmor: arm.NonArmor !== undefined ? arm.NonArmor : (ds.NonArmor !== undefined ? ds.NonArmor : -1),
      characters: ds.Characters !== undefined ? ds.Characters : 1.0,
      healthHitModifier: ds.HealthHitModifier !== undefined ? ds.HealthHitModifier : 0,
      maxIntegrity: ds.MaxIntegrity || 0,
      falloffDistance: fo.Distance || 0,
      falloffMinMult: fo.MinMultipler || 0,
      damageType: (typeof dmgType === 'string' ? dmgType : dmgType.Base) || 'Kinetic',
      gridLarge: grids.Large !== undefined ? grids.Large : -1,
      gridSmall: grids.Small !== undefined ? grids.Small : -1,
      // WC ArmorForCutoff / GridSizeForCutoff scale BaseDamageCutoff. An omitted struct field is 0 in C# (not -1),
      // so a present ArmorForCutoff with a missing field zeroes the cutoff vs that armor class.
      cutoffArmorArmor: cutArm ? (cutArm.Armor !== undefined ? cutArm.Armor : 0) : -1,
      cutoffLightArmor: cutArm ? (cutArm.Light !== undefined ? cutArm.Light : 0) : -1,
      cutoffHeavyArmor: cutArm ? (cutArm.Heavy !== undefined ? cutArm.Heavy : 0) : -1,
      cutoffNonArmor: cutArm ? (cutArm.NonArmor !== undefined ? cutArm.NonArmor : 0) : -1,
      cutoffGridLarge: cutGrid && cutGrid.Large !== undefined ? cutGrid.Large : -1,
      cutoffGridSmall: cutGrid && cutGrid.Small !== undefined ? cutGrid.Small : -1,
    },
    approachesRef: null,
    audio: { travelSound: audio.TravelSound || '', hitSound: audio.HitSound || '', shieldHitSound: '' },
    graphics: {
      visualProbability: (d.AmmoGraphics && d.AmmoGraphics.VisualProbability) || 1,
      tracer: { enable: tracer.Enable === true, length: tracer.Length || 0, width: tracer.Width || 0,
        color: { r: col.red || 0, g: col.green || 0, b: col.blue || 0, a: col.alpha === undefined ? 1 : col.alpha } },
    },
  };
}

// Inline a def section that is a bare reference to a common def (e.g. HardPoint = Common_...).
function inlineRef(v, defs) {
  if (!v) return null;
  const name = typeof v === 'string' ? v : (v.__id || null);
  if (name && defs[name] && defs[name].value) return defs[name].value;
  if (typeof v === 'object' && !v.__id) return v;
  return null;
}
function refName(v, defs) {
  if (!v) return null;
  const name = typeof v === 'string' ? v : (v.__id || null);
  return (name && defs[name]) ? name : null;
}

function weaponEntry(w, sub, idx, block, magByKey, defs, ammos, ov) {
  const def = w.def;
  const hp = inlineRef(def.HardPoint, defs) || {};
  const tgt = inlineRef(def.Targeting, defs) || {};
  const loading = inlineRef(hp.Loading, defs) || inlineRef(def.Loading, defs) || {};
  const hw = inlineRef(hp.HardWare, defs) || inlineRef(def.HardWare, defs) || {};
  const mp = (def.Assignments && def.Assignments.MountPoints && def.Assignments.MountPoints[idx]) || {};
  const allRounds = w.assignedAmmos || [];
  const usable = allRounds.filter((r) => !ammos[r] || ammos[r].hardPointUsable !== false);
  const a0 = ammos[usable[0]];
  const grid = (block && block.cubeSize) || 'Large';
  const partName = w.name;
  const isTurret = (block && block.xsiType && block.xsiType.indexOf('Turret') >= 0)
    || (block && /Turret/i.test(block.displayName || ''))
    || /Turret/i.test(partName || '')
    || /Turret/i.test(ov.name || '')
    || (mp.AzimuthPartId && mp.AzimuthPartId !== 'None' && !/Gimbal/i.test((block && block.displayName) || partName || ov.name || ''));
  const type = isTurret ? 'Turret' : 'Fixed';
  const id = ov.id || (grid[0] + '__' + sub);
  const mag = a0 && magByKey[a0.ammoMagazine];
  // Fragment rounds are referenced by terminal round name, which may differ from the def name.
  const fragAmmo = a0 && a0.fragment.ammoRound
    ? (ammos[a0.fragment.ammoRound] || Object.values(ammos).find((x) => x.ammoRound === a0.fragment.ammoRound))
    : null;
  const fragEol = fragAmmo ? fragAmmo.areaOfDamage.endOfLife : null;
  const threats = Array.isArray(tgt.Threats)
    ? tgt.Threats.map((t) => (typeof t === 'string' ? t : (t && t.__id)) || '')
    : [];
  // WC Targeting.ValidControlModes: empty/absent = all modes allowed
  const controlModes = Array.isArray(tgt.ValidControlModes)
    ? tgt.ValidControlModes.map((m) => String((typeof m === 'string' ? m : (m && m.__id)) || '').split('.').pop())
      .filter((m) => m === 'Automatic' || m === 'Manual' || m === 'Painter')
    : [];
  const isFixed = type === 'Fixed' || (hw.RotateRate <= 0 && hw.ElevateRate <= 0);
  const pdProjectiles = !isFixed && threats.includes('Projectiles');
  return {
    id,
    defName: w.defName, mountIndex: idx,
    pdProjectiles,
    pdSmartOnly: tgt.LockedSmartOnly === true,
    name: ov.name || '(' + grid[0] + ') ' + partName,
    grid, type,
    isHandheld: (hw.Type === 'HandWeapon') || (sub && /Item$/i.test(sub)) || false,
    rateOfFire: loading.RateOfFire || 0,
    shotsInBurst: loading.ShotsInBurst || 0,
    barrelsPerShot: loading.BarrelsPerShot || 1,
    delayAfterBurst: loading.DelayAfterBurst || 0,
    reloadTime: loading.ReloadTime || 0,
    magsToLoad: loading.MagsToLoad || 0,
    maxActiveProjectiles: loading.MaxActiveProjectiles || 0,
    delayUntilFire: loading.DelayUntilFire || 0,
    trajectilesPerBarrel: loading.TrajectilesPerBarrel || 1,
    maxTargetDistance: tgt.MaxTargetDistance || 0,
    validControlModes: controlModes.length ? controlModes : ['Automatic', 'Manual', 'Painter'],
    deviateShotAngle: hp.DeviateShotAngle || 0,
    aimingTolerance: (hp.AimingTolerance !== undefined ? hp.AimingTolerance : (tgt.AimingTolerance !== undefined ? tgt.AimingTolerance : 0)),
    addToleranceToTracking: (hp.AddToleranceToTracking === true || tgt.AddToleranceToTracking === true),
    rotateRate: hw.RotateRate || 0, elevateRate: hw.ElevateRate || 0,
    minAzimuth: hw.MinAzimuth !== undefined ? hw.MinAzimuth : -180,
    maxAzimuth: hw.MaxAzimuth !== undefined ? hw.MaxAzimuth : 180,
    minElevation: hw.MinElevation !== undefined ? hw.MinElevation : -15,
    maxElevation: hw.MaxElevation !== undefined ? hw.MaxElevation : 45,
    heatPerShot: (loading.HeatPerShot !== undefined ? loading.HeatPerShot : hw.HeatPerShot) || 0,
    maxHeat: (loading.MaxHeat !== undefined ? loading.MaxHeat : hw.MaxHeat) || 0,
    cooldown: (loading.Cooldown !== undefined ? loading.Cooldown : hw.Cooldown) || 0,
    heatSinkRate: (loading.HeatSinkRate !== undefined ? loading.HeatSinkRate : hw.HeatSinkRate) || 0,
    degradeRof: loading.DegradeRof === true,
    degradeRofSettings: (function() {
      const s = inlineRef(loading.DegradeRofSettings, defs) || {};
      return { heatThresholdStart: s.HeatThresholdStart || 0, heatThresholdEnd: s.HeatThresholdEnd || 0, rofAt0Heat: s.RofAt0Heat || 0, rofAt100Heat: s.RofAt100Heat || 0 };
    })(),
    allowOverheatShooting: loading.AllowOverheatShooting === true,
    heatSinkRateOverheatMult: loading.HeatSinkRateOverheatMult || 0,
    fireFull: loading.FireFull === true,
    energyCost: a0 ? a0.energyCost : 0,
    magazineSize: mag ? mag.capacity : 0,
    baseDamage: a0 ? a0.baseDamage : 0,
    maxTrajectory: a0 ? a0.trajectory.maxTrajectory : 0,
    desiredSpeed: a0 ? a0.trajectory.desiredSpeed : 0,
    detRadius: a0 ? a0.areaOfDamage.endOfLife.radius : 0,
    detDamage: a0 ? a0.areaOfDamage.endOfLife.damage : 0,
    fragments: a0 ? a0.fragment.fragments : 0,
    fragmentDegrees: a0 ? a0.fragment.degrees : 0,
    shrapnelBaseDmg: fragAmmo ? fragAmmo.baseDamage : 0,
    shrapnelDetRadius: fragEol ? fragEol.radius : 0,
    shrapnelDetDmg: fragEol ? fragEol.damage : 0,
    chanceToHit: 1,
    durabilityMod: mp.DurabilityMod === undefined ? 0 : mp.DurabilityMod,
    idlePower: hw.IdlePower || 0,
    // HardwareDef.CriticalReaction.Enable: WC warhead behaviour (fires once when the block detonates)
    criticalReaction: !!(hw.CriticalReaction && hw.CriticalReaction.Enable === true),
    components: block ? block.components : [],
    icon: ov.icon || ('icons/' + sub + '.png'),
    subtypeId: sub,
    ammoName: usable[0] || null,
    buildTimeSeconds: block ? block.buildTimeSeconds : 0,
    pcu: block ? block.pcu : 0,
    assignedAnimation: refName(def.Animations, defs) || (typeof def.Animations === 'string' ? def.Animations : null),
    assignedAmmos: usable,
    // Full WeaponDefinition.Ammos list: WC resolves Fragment / Pattern AmmoRound references only within it
    allAmmos: allRounds.slice(),
    helpers: {
      targeting: refName(def.Targeting, defs),
      hardware: refName(hp.HardWare, defs) || refName(def.HardWare, defs),
      loading: refName(hp.Loading, defs) || refName(def.Loading, defs),
      ui: refName(hp.Ui, defs) || refName(def.Ui, defs),
      ai: refName(hp.Ai, defs) || refName(def.Ai, defs),
      audio: refName(hp.Audio, defs) || refName(def.Audio, defs),
      other: refName(hp.Other, defs) || refName(def.Other, defs),
      graphics: refName(hp.Graphics, defs) || refName(def.Graphics, defs),
    },
    displayName: block ? block.displayName : partName,
    gridSize: grid, cubeSize: grid,
    description: block ? block.description : '',
    criticalComponent: block ? block.criticalComponent : null,
    size: block && block.size ? block.size : null,
  };
}

function magazineEntries(magSbc, blueprints, overrides) {
  const bpByResult = {};
  for (const b of blueprints) bpByResult[b.resultSubtype] = b;
  const ov = (overrides && overrides.magazines) || {};
  const out = [];
  for (const sub of Object.keys(magSbc)) {
    const m = magSbc[sub], o = ov[sub] || {}, b = bpByResult[sub];
    out.push({
      subtypeId: sub,
      blueprintSubtype: b ? b.blueprintSubtype : (o.blueprintSubtype || null),
      displayName: m.displayName,
      category: o.category || '',
      icon: m.icon,
      localIcon: o.localIcon || null,
      capacity: m.capacity,
      volume: m.volume,
      mass: m.mass,
      productionTime: b ? b.productionTime : (o.productionTime || 0),
      roleMultiplier: o.roleMultiplier === undefined ? 1 : o.roleMultiplier,
      // Ammo Logistics design inputs (baseline × multiplier per output); absent -> derived from the SBC values
      sizeMult: o.sizeMult || null,
      massMult: o.massMult || null,
      craftMult: o.craftMult || null,
      usesRUs: o.usesRUs === undefined ? null : o.usesRUs,
      baseComp: o.baseComp || null,
      prerequisites: b ? b.prerequisites : [],
      // Raw SBC definitions, patched (not regenerated) on export so untouched tags survive
      sbcXml: m.xml || null,
      bpXml: b ? b.xml || null : null,
    });
  }
  return out;
}

// Build the full Studio datasets. csSources: {file: text}; sbc: {magazines, blueprints, cubeBlocks:{file: text}};
// overrides: {weapons:{[subtypeId]:{id,name,icon}}, magazines:{[subtypeId]:{category,localIcon,...}}}.
function buildStudioData(csSources, sbc, overrides) {
  overrides = overrides || {};
  const parsed = parseAll(csSources);
  const errors = parsed.errors.slice(), warnings = parsed.warnings.slice();
  const magSbc = {};
  const magTexts = Array.isArray(sbc.magazines) ? sbc.magazines : [sbc.magazines];
  for (const t of magTexts) Object.assign(magSbc, parseMagazines(t));
  const blueprints = parseBlueprints(sbc.blueprints);
  const blocks = {};
  for (const f of Object.keys(sbc.cubeBlocks || {})) Object.assign(blocks, parseCubeBlocks(sbc.cubeBlocks[f]));
  const ammos = {}; // keyed by C# def name — unique, and what assignedAmmos/ammosDb reference
  for (const name of Object.keys(parsed.ammos)) {
    ammos[name] = ammoShape(name, parsed.ammos[name].def, parsed.defs[name] && parsed.defs[name].file);
  }
  const magazines = magazineEntries(magSbc, blueprints, overrides);
  const magByKey = {};
  for (const m of magazines) magByKey[m.subtypeId] = m;
  const weapons = [];
  for (const w of parsed.weapons) {
    const subs = w.subtypeIds.length ? w.subtypeIds : [null];
    subs.forEach((sub, idx) => {
      const ov = (overrides.weapons || {})[sub] || {};
      weapons.push(weaponEntry(w, sub, idx, sub ? blocks[sub] : null, magByKey, parsed.defs, ammos, ov));
    });
  }
  const phantom = [];
  for (const name of Object.keys(ammos)) {
    const am = ammos[name].ammoMagazine;
    if (am && am !== 'Energy' && !magByKey[am]) phantom.push(name + ' -> ' + am);
  }
  if (phantom.length) errors.push('PHANTOM MAGAZINES: ' + phantom.join(', '));
  return { weapons, ammos, magazines, blocks, wcDefs: parsed.wcDefs, errors, warnings };
}

// Atomic-swap validation: the app consumes weapons + ammos + magazines + blocks as a unit.
// If any leg is missing or any weapon's ammo doesn't resolve, reject ALL of it — a hybrid
// (some live, some bundled) is a credibility trap. Returns null if valid, else a reason string.
function validateLiveData(data) {
  if (!data) return 'no data object';
  const need = ['weapons', 'ammos', 'magazines', 'blocks'];
  for (const k of need) {
    const v = data[k];
    if (!v || (Array.isArray(v) && v.length === 0) || (!Array.isArray(v) && typeof v === 'object' && Object.keys(v).length === 0)) {
      return 'missing or empty: ' + k;
    }
  }
  const ammos = data.ammos;
  let unresolved = 0;
  const unresolvedList = [];
  for (const w of data.weapons) {
    const keys = (w.assignedAmmos && w.assignedAmmos.length) ? w.assignedAmmos : (w.ammoName ? [w.ammoName] : []);
    for (const key of keys) {
      if (!ammos[key]) {
        unresolved++;
        if (unresolvedList.length < 5) unresolvedList.push((w.subtypeId || w.id || '?') + ' → ' + key);
      }
    }
  }
  if (unresolved > 0) {
    return 'unresolved weapon→ammo refs: ' + unresolved + ' (e.g. ' + unresolvedList.join(', ') + ')';
  }
  return null;
}

// ---------- WeaponCore schema signature (Structure.cs / upstream CoreDefinitions.cs) ----------
// Returns { enums: {Name: [members]}, structs: {Name: {field: type}} } from [ProtoMember] fields only,
// so WC-internal fields (Const, AutoGenerated) and deprecated commented-out members are ignored.
function extractWcSchema(src) {
  const s = stripComments(src.replace(/\r/g, ''));
  const enums = {}, structs = {};
  const stack = [];
  let pending = null;
  const re = /\b(struct|class|enum)\s+(\w+)|(\{)|(\})|\[ProtoMember\(\s*\d+\s*\)\]\s*internal\s+([\w.<>\[\], ]+?)\s+(\w+)\s*[;=]/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m[1] === 'enum') {
      const open = s.indexOf('{', re.lastIndex);
      const close = open >= 0 ? braceMatch(s, open) : -1;
      if (close < 0) break;
      enums[m[2]] = s.slice(open + 1, close).split(',')
        .map((x) => x.split('=')[0].trim()).filter((x) => /^\w+$/.test(x));
      re.lastIndex = close + 1;
    } else if (m[1]) {
      pending = m[2];
    } else if (m[3]) {
      stack.push(pending);
      if (pending && !structs[pending]) structs[pending] = {};
      pending = null;
    } else if (m[4]) {
      stack.pop();
    } else if (m[6]) {
      const owner = stack[stack.length - 1];
      if (owner) structs[owner][m[6]] = m[5].replace(/\s+/g, '');
    }
  }
  return { enums, structs };
}

// Lists differences from |local| to |upstream| schema signatures (both from extractWcSchema).
function diffWcSchema(local, upstream) {
  const out = [];
  for (const [name, ups] of Object.entries(upstream.enums || {})) {
    const loc = (local.enums || {})[name];
    if (!loc) out.push('+ enum ' + name);
    else if (loc.join(',') !== ups.join(',')) {
      const added = ups.filter((x) => !loc.includes(x));
      const removed = loc.filter((x) => !ups.includes(x));
      out.push('~ enum ' + name + (added.length ? ' +' + added.join(' +') : '') + (removed.length ? ' -' + removed.join(' -') : '')
        + (!added.length && !removed.length ? ' (member order changed)' : ''));
    }
  }
  for (const name of Object.keys(local.enums || {})) if (!(upstream.enums || {})[name]) out.push('- enum ' + name);
  for (const [name, ups] of Object.entries(upstream.structs || {})) {
    const loc = (local.structs || {})[name];
    if (!loc) { if (Object.keys(ups).length) out.push('+ ' + name + ' { ' + Object.keys(ups).join(', ') + ' }'); continue; }
    for (const [f, t] of Object.entries(ups)) {
      if (!(f in loc)) out.push('+ ' + name + '.' + f + ' : ' + t);
      else if (loc[f] !== t) out.push('~ ' + name + '.' + f + ' : ' + loc[f] + ' -> ' + t);
    }
    for (const f of Object.keys(loc)) if (!(f in ups)) out.push('- ' + name + '.' + f);
  }
  for (const name of Object.keys(local.structs || {})) {
    if (!(upstream.structs || {})[name] && Object.keys(local.structs[name]).length) out.push('- ' + name);
  }
  return out;
}

// ---------- Typed WC schema (qualified struct/enum tree) for the full-field editor + serializer ----------
// structs: { 'Structure.WeaponDefinition.AmmoDef': { Field: 'DeclaredType', ... } }, enums: { qualified: [members] }.
function extractWcTypes(src) {
  const s = stripComments(src.replace(/\r/g, ''));
  const structs = {}, enums = {};
  const stack = [];
  let pending = null;
  const owner = () => { for (let k = stack.length - 1; k >= 0; k--) if (stack[k]) return stack[k]; return ''; };
  const re = /\b(struct|class|enum)\s+(\w+)|(\{)|(\})|\[ProtoMember\(\s*\d+\s*\)[^\]]*\]\s*internal\s+([\w.<>\[\], ]+?)\s+(\w+)\s*[;=]/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    if (m[1] === 'enum') {
      const open = s.indexOf('{', re.lastIndex);
      const close = open >= 0 ? braceMatch(s, open) : -1;
      if (close < 0) break;
      const q = (owner() ? owner() + '.' : '') + m[2];
      enums[q] = s.slice(open + 1, close).split(',').map((x) => x.split('=')[0].trim()).filter((x) => /^\w+$/.test(x));
      re.lastIndex = close + 1;
    } else if (m[1]) {
      pending = (owner() ? owner() + '.' : '') + m[2];
    } else if (m[3]) {
      stack.push(pending);
      if (pending && !structs[pending]) structs[pending] = {};
      pending = null;
    } else if (m[4]) {
      stack.pop();
    } else if (m[6] && stack[stack.length - 1]) {
      structs[stack[stack.length - 1]][m[6]] = m[5].replace(/\s+/g, '');
    }
  }
  return { structs, enums };
}

const PRIM_TYPES = new Set(['bool', 'int', 'uint', 'long', 'short', 'byte', 'float', 'double', 'string']);
const VECTOR_TYPES = new Set(['Vector2D', 'Vector3D', 'Vector4', 'Vector3']);

// Resolve a declared field type within |scope| the way C# nested-type lookup does (innermost scope first).
function resolveWcType(types, scope, decl) {
  let t = decl, arr = false;
  if (t.endsWith('[]')) { arr = true; t = t.slice(0, -2); }
  if (PRIM_TYPES.has(t)) return { kind: 'prim', name: t, decl: t, arr };
  if (VECTOR_TYPES.has(t)) return { kind: 'vector', name: t, decl: t, arr };
  let sc = scope || '';
  while (true) {
    const q = sc ? sc + '.' + t : t;
    if (types.structs[q]) return { kind: 'struct', q, name: t.split('.').pop(), decl: t, arr };
    if (types.enums[q]) return { kind: 'enum', q, name: t.split('.').pop(), decl: t, arr, members: types.enums[q] };
    if (!sc) break;
    sc = sc.includes('.') ? sc.slice(0, sc.lastIndexOf('.')) : '';
  }
  return { kind: 'unknown', name: t, decl: t, arr };
}

function wcRootType(types, kind) {
  const tail = kind === 'ammo' ? 'WeaponDefinition.AmmoDef' : 'WeaponDefinition';
  const q = Object.keys(types.structs).filter((k) => k === tail || k.endsWith('.' + tail))
    .sort((a, b) => a.length - b.length)[0];
  return q ? { kind: 'struct', q, name: q.split('.').pop(), decl: q.split('.').pop(), arr: false } : null;
}

// Type of |field| on a resolved struct type, or null when the schema doesn't know it.
function wcFieldType(types, structType, field) {
  if (!structType || structType.kind !== 'struct') return null;
  const decl = (types.structs[structType.q] || {})[field];
  return decl ? resolveWcType(types, structType.q, decl) : null;
}

// Element type for an array type (same resolution, arr=false).
function wcElemType(t) { return t ? Object.assign({}, t, { arr: false }) : null; }

// ---------- Def tree helpers (paths are arrays of keys / indices) ----------
function isHelperRef(v, helpers) { return !!(v && typeof v === 'object' && v.__id !== undefined && helpers && helpers[v.__id]); }

// Read |path| from |tree|, seeing through shared-helper refs. Returns undefined when absent.
function treeGet(tree, path, helpers) {
  let cur = tree;
  for (const k of path) {
    if (isHelperRef(cur, helpers)) cur = helpers[cur.__id].tree;
    if (cur === null || typeof cur !== 'object') return undefined;
    cur = cur[k];
    if (cur === undefined) return undefined;
  }
  return isHelperRef(cur, helpers) ? helpers[cur.__id].tree : cur;
}

// Write |value| at |path| (undefined deletes). Shared-helper refs along the path are detached into local
// copies so the helper itself (and every other def using it) is untouched.
function treeSet(tree, path, value, helpers) {
  let cur = tree;
  for (let k = 0; k < path.length - 1; k++) {
    const key = path[k];
    let next = cur[key];
    if (isHelperRef(next, helpers)) { next = JSON.parse(JSON.stringify(helpers[next.__id].tree)); cur[key] = next; }
    if (next === undefined || next === null || typeof next !== 'object' || next.__id !== undefined || next.__call !== undefined) {
      if (value === undefined) return;
      next = typeof path[k + 1] === 'number' ? [] : {};
      cur[key] = next;
    }
    cur = next;
  }
  const last = path[path.length - 1];
  if (value === undefined) { if (Array.isArray(cur)) cur.splice(last, 1); else delete cur[last]; }
  else cur[last] = value;
}

// ---------- C# serializer (def tree -> CoreParts-style C#) ----------
function csString(v) { return '"' + String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"'; }

function csNumber(n, prim) {
  if (prim === 'int' || prim === 'uint' || prim === 'long' || prim === 'short' || prim === 'byte') return String(Math.trunc(n));
  const s = String(n);
  if (prim === 'double') return s;
  if (prim === 'float') return s + 'f';
  return Number.isInteger(n) ? s : s + 'f'; // untyped (call args): float literals convert implicitly to double params
}

function csInline(v) {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return csNumber(v, null);
  if (typeof v === 'string') return csString(v);
  if (v.__id !== undefined) return v.__id;
  if (v.__call !== undefined) {
    const parts = v.args ? Object.keys(v.args).map((k) => k + ': ' + csInline(v.args[k])) : (v.pos || []).map(csInline);
    return (v.__new ? 'new ' : '') + v.__call + '(' + parts.join(', ') + ')';
  }
  return null; // arrays / objects are not inline-able
}

function csValue(v, t, types, ind) {
  const pad = ' '.repeat(ind);
  if (typeof v === 'number' && t && t.kind === 'prim') return csNumber(v, t.name);
  if (!Array.isArray(v)) { const simple = csInline(v); if (simple !== null) return simple; }
  if (Array.isArray(v)) {
    const et = t ? wcElemType(t) : null;
    if (!v.length) return 'new ' + (t ? t.decl : 'object') + '[0]';
    const items = v.map((x) => csValue(x, et, types, ind + 4));
    const oneLine = 'new[] { ' + items.join(', ') + ' }';
    if (!items.some((x) => x.includes('\n')) && oneLine.length <= 110) return oneLine;
    return 'new[]\n' + pad + '{\n' + items.map((x) => pad + '    ' + x + ',\n').join('') + pad + '}';
  }
  const lines = Object.keys(v).map((k) => pad + '    ' + k + ' = ' + csValue(v[k], wcFieldType(types, t, k), types, ind + 4) + ',\n');
  const head = t && t.kind === 'struct' ? 'new ' + t.decl : 'new';
  return head + '\n' + pad + '{\n' + lines.join('') + pad + '}';
}

// Serialize a whole AmmoDef / WeaponDefinition tree as a CoreParts expression-bodied property.
function serializeWcDef(kind, name, tree, types) {
  const root = wcRootType(types, kind);
  const decl = kind === 'ammo' ? 'AmmoDef' : 'WeaponDefinition';
  return '        ' + decl + ' ' + name + ' => ' + csValue(tree, root || { kind: 'struct', q: '', decl, name: decl }, types, 8) + ';\n';
}

// Field comments harvested from CoreParts sources: { 'TypeName.Field': 'comment' } (first one wins).
function extractFieldHelp(sources) {
  const help = {};
  for (const f of Object.keys(sources)) {
    const stack = [];
    let pendingType = null;
    for (const line of sources[f].replace(/\r/g, '').split('\n')) {
      const code = line.replace(/\/\/.*$/, '');
      const cm = /\/\/\s*(.+?)\s*$/.exec(line);
      const fm = /^\s*(\w+)\s*=\s*(.*)$/.exec(code);
      const nm = /(?:=|=>)\s*new\s+(\w+)\s*(?:\[\s*\])?\s*$/.exec(code.trim()) || /(?:=|=>)\s*new\s+(\w+)\s*(?:\[\s*\])?\s*\{/.exec(code);
      const top = stack.length ? stack[stack.length - 1] : null;
      if (fm && cm && top) {
        const key = top + '.' + fm[1];
        if (!help[key] && cm[1].length > 3) help[key] = cm[1];
      }
      if (nm) pendingType = nm[1];
      for (const ch of code) {
        if (ch === '{') { stack.push(pendingType || top); pendingType = null; }
        else if (ch === '}') stack.pop();
      }
    }
  }
  return help;
}

const SourcePipeline = {
  extractWcTypes, resolveWcType, wcRootType, wcFieldType, wcElemType, treeGet, treeSet, isHelperRef,
  serializeWcDef, csInline, extractFieldHelp, inlineHelpers, collectWcDefs,
  extractWcSchema, diffWcSchema,
  stripComments, braceMatch, exprParser, extractDefs, evalGetter, resolveTree, parseAll,
  parseXml, parseMagazines, parseBlueprints, parseCubeBlocks, ammoShape, weaponEntry, magazineEntries, buildStudioData, validateLiveData,
};
if (typeof module !== 'undefined' && module.exports) module.exports = SourcePipeline;
else root.SourcePipeline = SourcePipeline;
})(typeof window !== 'undefined' ? window : globalThis);
