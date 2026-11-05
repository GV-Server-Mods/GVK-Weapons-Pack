// Sets every block's BuildTimeSeconds in Content/Data/CubeBlocks to the GVK weld-time formula:
//   BuildTimeSeconds = MAX(5, ROUND(block integrity / 750))
// Block integrity is the sum of its components' integrity (studio/data/components_data.js), as the
// game sums it. The game welds at integrity / BuildTimeSeconds, so this sets the weld time directly.
// Run: node tools/apply_build_time.js          rewrite the SBC files
//      node tools/apply_build_time.js --check  list blocks off the formula; exit 1 if any
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const BUILD_TIME_DIVIDEND = 750;
const MIN_SECONDS = 5;

function loadComponents() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'studio/data/components_data.js'), 'utf8'), sandbox);
  return sandbox.window.COMPONENTS_DATA;
}

function buildTimeFor(integrity) {
  return Math.max(MIN_SECONDS, Math.round(integrity / BUILD_TIME_DIVIDEND));
}

// Returns [{ file, subtype, shipped, formula, integrity }] and, unless check, the rewritten texts.
function scan(check) {
  const comps = loadComponents();
  const dir = path.join(root, 'Content/Data/CubeBlocks');
  const rows = [];
  const problems = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.sbc')).sort()) {
    const full = path.join(dir, file);
    const text = fs.readFileSync(full, 'utf8');
    const out = text.replace(/<Definition\b[\s\S]*?<\/Definition>/g, (def) => {
      const subtype = (def.match(/<SubtypeId>([^<]*)<\/SubtypeId>/) || [])[1] || '?';
      const compBlock = (def.match(/<Components>([\s\S]*?)<\/Components>/) || [])[1];
      if (!compBlock) return def;
      let integrity = 0;
      for (const m of compBlock.matchAll(/<Component\s+Subtype="([^"]+)"\s+Count="(\d+)"/g)) {
        const meta = comps[m[1]];
        if (!meta) { problems.push(`${file} ${subtype}: unknown component ${m[1]}`); return def; }
        integrity += meta.integrity * Number(m[2]);
      }
      const formula = buildTimeFor(integrity);
      const bt = def.match(/<BuildTimeSeconds>([^<]*)<\/BuildTimeSeconds>/);
      if (!bt) { problems.push(`${file} ${subtype}: no BuildTimeSeconds`); return def; }
      rows.push({ file, subtype, shipped: Number(bt[1]), formula, integrity });
      return def.replace(bt[0], `<BuildTimeSeconds>${formula}</BuildTimeSeconds>`);
    });
    if (!check && out !== text) fs.writeFileSync(full, out, 'utf8');
  }
  return { rows, problems };
}

if (require.main === module) {
  const check = process.argv.includes('--check');
  const { rows, problems } = scan(check);
  const off = rows.filter((r) => r.shipped !== r.formula);
  for (const p of problems) console.log('WARN  ' + p);
  if (check) {
    for (const r of off) console.log(`OFF   ${r.file} ${r.subtype}: ${r.shipped}s, formula ${r.formula}s (integrity ${r.integrity})`);
    console.log(`${rows.length} blocks checked, ${off.length} off the formula`);
    process.exit(off.length || problems.length ? 1 : 0);
  }
  console.log(`${rows.length} blocks, ${off.length} BuildTimeSeconds values changed`);
}

module.exports = { buildTimeFor, scan, BUILD_TIME_DIVIDEND };
