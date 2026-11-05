// Every block's BuildTimeSeconds follows the weld-time formula MAX(5, ROUND(integrity / 750)).
// Fix a failure with: node tools/apply_build_time.js
// Run: node tests/test_build_time.js
'use strict';
const { scan } = require('../tools/apply_build_time.js');

const { rows, problems } = scan(true);
let failed = 0;
for (const p of problems) { console.log('FAIL  ' + p); failed++; }
for (const r of rows.filter((x) => x.shipped !== x.formula)) {
  console.log(`FAIL  ${r.file} ${r.subtype}: BuildTimeSeconds ${r.shipped}, formula ${r.formula} (run node tools/apply_build_time.js)`);
  failed++;
}
if (rows.length < 100) { console.log(`FAIL  only ${rows.length} blocks found`); failed++; }
if (!failed) console.log(`PASS  ${rows.length} blocks follow the weld-time formula`);
process.exit(failed ? 1 : 0);
