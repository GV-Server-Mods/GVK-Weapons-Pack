// Runs every Weapon Studio test suite plus the CI data gate and prints one summary.
// Run: node scratch/run_studio_tests.js
'use strict';
const { spawnSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
const suites = [
  ['Source pipeline', 'scratch/test_source_pipeline.js'],
  ['WeaponCore parity', 'scratch/test_wc_parity.js'],
  ['Studio smoke', 'scratch/test_studio_smoke.js'],
  ['EWAR / PD', 'scratch/test_ewar_pd.js'],
  ['Max Range card', 'scratch/test_max_range_card.js'],
  ['Detonations', 'scratch/test_detonations.js'],
  ['WC defaults', 'scratch/test_wc_defaults.js'],
  ['Flight profile', 'scratch/test_flight_profile.js'],
  ['Catalog', 'scratch/test_catalog.js'],
  ['CI data gate', 'tools/validate_studio_data.mjs'],
];

let failed = 0;
for (const [label, file] of suites) {
  const r = spawnSync(process.execPath, [file], { cwd: root, encoding: 'utf8' });
  const out = (r.stdout || '') + (r.stderr || '');
  const passes = (out.match(/^\s*PASS\b/gm) || []).length;
  const fails = out.match(/^\s*FAIL\b.*$/gm) || [];
  const ok = r.status === 0;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(18)} ${passes} checks passed${fails.length ? `, ${fails.length} failed` : ''}`);
  if (!ok) {
    for (const f of fails) console.log('        ' + f.trim());
    if (!fails.length) console.log(out.split(/\r?\n/).slice(-15).map((l) => '        ' + l).join('\n'));
  }
}
console.log(failed ? `\n${failed} suite(s) failed` : '\nAll suites passed');
process.exit(failed ? 1 : 0);
