// CI validation gate — fails the deploy if the parsed Studio data has any unresolved reference.
// Reuses the SAME parser the browser runs (docs/source_pipeline.js), so CI and the page can't disagree.
// Run: node tools/validate_studio_data.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import SP from '../docs/source_pipeline.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const csSources = {};
for (const f of fs.readdirSync(path.join(root, 'CoreParts'))) {
  // Animation files use C# generics/#region the parser doesn't handle and contribute no studio data.
  if (f.endsWith('.cs') && !/Animations/.test(f)) {
    csSources[f] = fs.readFileSync(path.join(root, 'CoreParts', f), 'utf8');
  }
}
const dataDir = path.join(root, 'Content', 'Data');
const cubeBlocks = {};
for (const f of fs.readdirSync(path.join(dataDir, 'CubeBlocks'))) {
  if (f.endsWith('.sbc')) cubeBlocks[f] = fs.readFileSync(path.join(dataDir, 'CubeBlocks', f), 'utf8');
}
const ovSrc = fs.readFileSync(path.join(root, 'docs', 'data', 'studio_overrides.js'), 'utf8');
const overrides = JSON.parse(ovSrc.slice(ovSrc.indexOf('=') + 1).trim().replace(/;\s*$/, ''));

const built = SP.buildStudioData(csSources, {
  magazines: [
    fs.readFileSync(path.join(dataDir, 'AmmoMagazines_Ship.sbc'), 'utf8'),
    fs.readFileSync(path.join(dataDir, 'AmmoMagazines_Handheld.sbc'), 'utf8'),
  ],
  blueprints: fs.readFileSync(path.join(dataDir, 'Blueprints.sbc'), 'utf8'),
  cubeBlocks,
}, overrides);

let fail = 0;
const die = (msg) => { console.error('GATE FAIL: ' + msg); fail++; };
const info = (msg) => console.log('gate: ' + msg);

info(`parsed ${Object.keys(csSources).length} C# files, ${built.weapons.length} weapon entries, `
  + `${Object.keys(built.ammos).length} ammos, ${built.magazines.length} magazines`);

// Hard gate: any parse error (includes the phantom-magazine scan) or unresolved weapon->ammo ref.
if (built.errors.length) die(built.errors.join('\nGATE FAIL: '));
if (built.warnings.length) die(built.warnings.join('\nGATE FAIL: '));

// Spot checks on the pair that started all this — cheap insurance against parser regressions.
const hurricane = built.weapons.find((w) => w.subtypeId === 'ARYXHurricaneCannon');
const odin = built.weapons.find((w) => w.subtypeId === 'odin');
if (!hurricane) die('Hurricane entry missing');
else if (hurricane.ammoName !== 'Ballistics_HeavyCannon') die(`Hurricane ammo = ${hurricane.ammoName}`);
if (!odin) die('Odin entry missing');
else if (odin.ammoName !== 'Ballistics_HeavyCannon_Odin') die(`Odin ammo = ${odin.ammoName}`);
else if (odin.maxTrajectory !== 4300) die(`Odin maxTrajectory = ${odin.maxTrajectory}`);

if (fail) {
  console.error(`\nGate rejected the deploy: ${fail} problem(s). Fix the definitions, not this script.`);
  process.exit(1);
}
console.log('\nGate PASS — data resolves clean. Deploying.');
