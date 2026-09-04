// Test harness for docs/source_pipeline.js (M1). Run: node scratch/test_source_pipeline.js
const fs = require('fs'), path = require('path');
const SP = require('../docs/source_pipeline.js');

const dir = path.join(__dirname, '..', 'CoreParts');
const sources = {};
for (const f of fs.readdirSync(dir)) {
  if (f.endsWith('.cs') && !/Animations/.test(f)) sources[f] = fs.readFileSync(path.join(dir, f), 'utf8');
}

const r = SP.parseAll(sources);
const defCount = Object.keys(r.defs).length;
console.log('files parsed:', Object.keys(sources).length,
  '| defs:', defCount,
  '| ammoDefs:', Object.keys(r.ammos).length,
  '| weaponDefs:', r.weapons.length);

let failures = 0;
function check(label, cond, extra) {
  console.log((cond ? 'PASS ' : 'FAIL ') + label + (cond ? '' : '   got: ' + extra));
  if (!cond) failures++;
}

const base = r.ammos['Ballistics_HeavyCannon'] && r.ammos['Ballistics_HeavyCannon'].def;
const odin = r.ammos['Ballistics_HeavyCannon_Odin'] && r.ammos['Ballistics_HeavyCannon_Odin'].def;
check('Odin clone ammo exists', !!odin);
check('base 480mm ammo exists', !!base);
if (odin) {
  check('Odin magazine inherits base 480mm', odin.AmmoMagazine === 'Ballistics_HeavyCannon', odin.AmmoMagazine);
  check('Odin round name', odin.AmmoRound === 'Ballistics_HeavyCannon_Odin', odin.AmmoRound);
  check('Odin mass 2000', odin.Mass === 2000, odin.Mass);
  check('Odin backKickForce 1500000', odin.BackKickForce === 1500000, odin.BackKickForce);
  check('Odin maxTrajectory 4300', odin.Trajectory && odin.Trajectory.MaxTrajectory === 4300,
    odin.Trajectory && odin.Trajectory.MaxTrajectory);
  console.log('   info: Odin NpcSafe =', odin.NpcSafe, '| Base NpcSafe =', base && base.NpcSafe);
}
if (base && base.Trajectory) {
  check('base 480mm untouched by clone eval (MaxTrajectory 3300)', base.Trajectory.MaxTrajectory === 3300,
    base.Trajectory.MaxTrajectory);
  check('base magazine intact', base.AmmoMagazine === 'Ballistics_HeavyCannon', base.AmmoMagazine);
}

const hurricane = r.weapons.find((w) => w.subtypeIds.includes('ARYXHurricaneCannon'));
const odinW = r.weapons.find((w) => w.subtypeIds.includes('odin'));
check('Hurricane weapon def found', !!hurricane);
check('Odin weapon def found', !!odinW);
if (hurricane) {
  check('Hurricane assignedAmmos = [Ballistics_HeavyCannon]',
    JSON.stringify(hurricane.assignedAmmos) === '["Ballistics_HeavyCannon"]',
    JSON.stringify(hurricane.assignedAmmos));
  check('Hurricane NPC subtype present', hurricane.subtypeIds.includes('ARYXHurricaneCannon_NPC'));
  check('Hurricane PartName', /hurricane/i.test(hurricane.name), hurricane.name);
}
if (odinW) {
  check('Odin assignedAmmos = [Ballistics_HeavyCannon_Odin]',
    JSON.stringify(odinW.assignedAmmos) === '["Ballistics_HeavyCannon_Odin"]',
    JSON.stringify(odinW.assignedAmmos));
  check('Odin NPC subtype present', odinW.subtypeIds.includes('odin_NPC'));
}

check('zero unresolved weapon→ammo refs', r.warnings.length === 0, r.warnings.join('; '));
check('zero parse errors', r.errors.length === 0, r.errors.slice(0, 6).join(' | '));

console.log('\n--- all weapon defs (defName | subtypes | ammos | RoF | reload) ---');
for (const w of r.weapons) {
  console.log(w.defName, '|', w.subtypeIds.join(','), '=>', JSON.stringify(w.assignedAmmos),
    '|', w.rateOfFire, '|', w.reloadTime);
}
// ---------------- M2: full studio data build from C# + SBC + overrides ----------------
const dataDir = path.join(__dirname, '..', 'docs', 'data');
function loadBundledJs(file) {
  let s = fs.readFileSync(path.join(dataDir, file), 'utf8');
  s = s.replace(/^\/\/.*$/gm, '');
  s = s.slice(s.indexOf('=') + 1);
  const end = Math.max(s.lastIndexOf('}'), s.lastIndexOf(']')); // trailing window-guard lines exist in some files
  return JSON.parse(s.slice(0, end + 1));
}
const overridesSrc = fs.readFileSync(path.join(dataDir, 'studio_overrides.js'), 'utf8');
const overrides = JSON.parse(overridesSrc.slice(overridesSrc.indexOf('=') + 1).trim().replace(/;\s*$/, ''));
const sbcDir = path.join(__dirname, '..', 'Content', 'Data');
const cubeBlocks = {};
for (const f of fs.readdirSync(path.join(sbcDir, 'CubeBlocks'))) {
  if (f.endsWith('.sbc')) cubeBlocks[f] = fs.readFileSync(path.join(sbcDir, 'CubeBlocks', f), 'utf8');
}
const built = SP.buildStudioData(sources, {
  magazines: [
    fs.readFileSync(path.join(sbcDir, 'AmmoMagazines_Ship.sbc'), 'utf8'),
    fs.readFileSync(path.join(sbcDir, 'AmmoMagazines_Handheld.sbc'), 'utf8'),
  ],
  blueprints: fs.readFileSync(path.join(sbcDir, 'Blueprints.sbc'), 'utf8'),
  cubeBlocks,
}, overrides);

console.log('\n--- M2: buildStudioData ---');
console.log('built: weapons', built.weapons.length, '| ammos', Object.keys(built.ammos).length,
  '| magazines', built.magazines.length, '| blocks', Object.keys(built.blocks).length);
check('M2 build: zero errors (incl. phantom-magazine scan)', built.errors.length === 0,
  built.errors.slice(0, 4).join(' | '));

const bHur = built.weapons.find((w) => w.subtypeId === 'ARYXHurricaneCannon');
const bOdin = built.weapons.find((w) => w.subtypeId === 'odin');
const bOdinNpc = built.weapons.find((w) => w.subtypeId === 'odin_NPC');
check('built Hurricane keeps curated id', bHur && bHur.id === 'L__Heavy_Cannon_Hurricane_Turret', bHur && bHur.id);
check('built Hurricane displayName from SBC', bHur && bHur.displayName === '*H.Cannon* Hurricane Turret',
  bHur && bHur.displayName);
check('built Hurricane magazineSize 1 (480mm)', bHur && bHur.magazineSize === 1, bHur && bHur.magazineSize);
check('built Hurricane ammo = 480mm round', bHur && bHur.ammoName === 'Ballistics_HeavyCannon', bHur && bHur.ammoName);
check('built Hurricane components from SBC', bHur && bHur.components.length > 5, bHur && bHur.components.length);
check('built Odin exists', !!bOdin);
check('built Odin ammo = Odin round', bOdin && bOdin.ammoName === 'Ballistics_HeavyCannon_Odin', bOdin && bOdin.ammoName);
check('built Odin maxTrajectory 4300 (from clone)', bOdin && bOdin.maxTrajectory === 4300, bOdin && bOdin.maxTrajectory);
check('built Odin NPC entry exists', !!bOdinNpc, !!bOdinNpc);

// Magazine parity: the real 480mm magazine must resolve with blueprint data.
const bMag = built.magazines.find((m) => m.subtypeId === 'Ballistics_HeavyCannon');
check('built 480mm magazine exists', !!bMag);
if (bMag) {
  check('480mm magazine capacity 1', bMag.capacity === 1, bMag.capacity);
  check('480mm magazine has blueprint + prerequisites',
    !!bMag.blueprintSubtype && bMag.prerequisites.length > 0 && bMag.productionTime > 0,
    JSON.stringify([bMag.blueprintSubtype, bMag.prerequisites.length, bMag.productionTime]));
  check('480mm magazine localIcon from overrides', !!bMag.localIcon, bMag.localIcon);
}

// Ammo parity vs bundled for the plain def; for the Odin clone assert the CORRECTED values
// (bundled data was the corrupt version: phantom mag, mass 1, npcSafe false, range 1500).
const bundledAmmos = loadBundledJs('ammos_data.js');
// These two exist only as COMMENTED-OUT defs in CoreParts (Missiles_LightMissile_Ammo.cs:219,
// Missiles_Torpedo_Ammos.cs:352) — the old bundled data wrongly catalogued them as live.
const deadInSource = ['Missiles_Missile_NPC', 'Missiles_Torpedo_NPC'];
function pick(a) {
  return a && JSON.stringify([a.ammoMagazine, a.baseDamage, a.mass, a.backKickForce, a.npcSafe,
    a.trajectory.maxTrajectory, a.trajectory.desiredSpeed, a.shape]);
}
check('ammo parity vs bundled: Ballistics_HeavyCannon',
  pick(built.ammos['Ballistics_HeavyCannon']) === pick(bundledAmmos['Ballistics_HeavyCannon']),
  '\n   built:   ' + pick(built.ammos['Ballistics_HeavyCannon']) + '\n   bundled: ' + pick(bundledAmmos['Ballistics_HeavyCannon']));
check('Odin clone data corrected (fixes the original Studio bug)',
  pick(built.ammos['Ballistics_HeavyCannon_Odin']) ===
    '["Ballistics_HeavyCannon",10000,2000,1500000,true,4300,600,"LineShape"]',
  pick(built.ammos['Ballistics_HeavyCannon_Odin']));
check('all bundled ammo keys present in built data (minus dead defs)',
  Object.keys(bundledAmmos).every((k) => built.ammos[k] || deadInSource.includes(k)),
  Object.keys(bundledAmmos).filter((k) => !built.ammos[k] && !deadInSource.includes(k)).join(', '));

// Informational: field-level parity across ALL ammos (count mismatches, don't fail).
let mismatches = 0;
const mismatchSamples = [];
for (const k of Object.keys(bundledAmmos)) {
  const b = built.ammos[k], o = bundledAmmos[k];
  if (!b) { mismatches++; mismatchSamples.push(k + ': missing in built'); continue; }
  for (const f of ['ammoMagazine', 'baseDamage', 'mass', 'backKickForce', 'shape']) {
    if (JSON.stringify(b[f]) !== JSON.stringify(o[f])) {
      mismatches++;
      if (mismatchSamples.length < 8) mismatchSamples.push(k + '.' + f + ': built=' + JSON.stringify(b[f]) + ' bundled=' + JSON.stringify(o[f]));
      break;
    }
  }
}
console.log('info: ammo field parity vs bundled — mismatches:', mismatches);
for (const s of mismatchSamples) console.log('   ', s);

// --- validateLiveData (atomic-swap guard) tests ---
function checkV(label, cond, detail) {
  if (cond) { console.log('PASS', label); }
  else { console.log('FAIL', label, '—', detail); failures++; }
}
const V = SP.validateLiveData;
checkV('accepts complete data', V({weapons:[{assignedAmmos:['A'],ammoName:'A'}],ammos:{A:{}},magazines:[{subtypeId:'m'}],blocks:{b:{}}}) === null);
checkV('rejects null', V(null) === 'no data object');
checkV('rejects empty weapons', V({weapons:[],ammos:{A:{}},magazines:[{subtypeId:'m'}],blocks:{b:{}}}).indexOf('weapons') >= 0);
checkV('rejects empty ammos', V({weapons:[{assignedAmmos:['A']}],ammos:{},magazines:[{subtypeId:'m'}],blocks:{b:{}}}).indexOf('ammos') >= 0);
checkV('rejects empty magazines', V({weapons:[{assignedAmmos:['A']}],ammos:{A:{}},magazines:[],blocks:{b:{}}}).indexOf('magazines') >= 0);
checkV('rejects empty blocks', V({weapons:[{assignedAmmos:['A']}],ammos:{A:{}},magazines:[{subtypeId:'m'}],blocks:{}}).indexOf('blocks') >= 0);
checkV('rejects unresolved ammo ref', V({weapons:[{assignedAmmos:['Missing'],ammoName:'Missing'}],ammos:{A:{}},magazines:[{subtypeId:'m'}],blocks:{b:{}}}).indexOf('unresolved') >= 0);

console.log('\nRESULT:', failures === 0 ? 'ALL PASS' : failures + ' FAILURES');
process.exit(failures === 0 ? 0 : 1);
