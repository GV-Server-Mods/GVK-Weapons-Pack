// Glossary wording: each workspace's visible text uses the GLOSSARY.md terms, not the retired ones.
// Run: node scratch/test_glossary.js
'use strict';
const fs = require('fs');
const path = require('path');
const { root, studioFile, loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();
const studio = loadStudio();
// Every element's text so far; renders overwrite elements, so the sweeps call __grab after each one.
// Block descriptions are Mod Source flavor text, not studio wording.
const seen = new Set();
const MOD_TEXT = new Set(['legendActiveDesc', 'legendBenchDesc']);
studio.sandbox.__grab = () => studio.elements.forEach((el, id) => { if (!MOD_TEXT.has(id)) { seen.add(el.textContent); seen.add(el.innerHTML); seen.add(el.title || ''); } });
const html = fs.readFileSync(studioFile('index.html'), 'utf8');
const doc = fs.readFileSync(path.join(root, 'docs', 'WEAPON_STUDIO_DESIGN_DOCUMENT.md'), 'utf8');

const htmlSection = (id, nextId) => html.slice(html.indexOf(`id="${id}"`), nextId ? html.indexOf(`id="${nextId}"`) : undefined);
const docSection = (start, end) => doc.slice(doc.indexOf(start), end ? doc.indexOf(end) : undefined);
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const found = (text, terms) => terms.filter((t) => (t instanceof RegExp ? t : new RegExp(escape(t), 'i')).test(text)).map(String);

// --- Telemetry (#56) ---
const OLD_TELEMETRY = ['Alpha Volley', 'Volley Alpha', 'Effective RPM', 'Non-Armor', 'Anti-Missile Burst', 'anti-smart screen',
  'Anti-Smart', 'chaff', /(?<!Prototech)Circuitry/, /\bSabot\b/];
// Renders Telemetry for every player weapon and each ammo it can load
const tel = studio.run(`(() => {
  let pairs = 0;
  benchmarkWeapon = weaponsDb.find((w) => w.subtypeId === 'GVK_AvengerGatlingTurret');
  benchmarkAmmoKey = getSelectableAmmos(benchmarkWeapon)[0];
  for (const w of getFilterableWeapons()) {
    for (const k of getSelectableAmmos(w)) {
      selectWeapon(w.id);
      selectAmmo(k);
      updateCombatTelemetry();
      updateRadarQuickCompare();
      updateComparisonRadar();
      __grab();
      pairs++;
    }
  }
  const gat = weaponsDb.find((w) => w.subtypeId === 'LargeGatlingTurret');
  selectWeapon(gat.id);
  updateCombatTelemetry();
  const cyc = computeSustainedDps();
  return { pairs, gat: { mag: cyc.magazineDamage, alpha: cyc.alphaDamage, rounds: cyc.totalRounds,
    sub: document.getElementById('outMagDamageSub').textContent, hud: document.getElementById('hudTelAlpha').textContent } };
})()`);
const telText = [...seen].join('\n');
const telOld = found(telText, OLD_TELEMETRY);
check(`Telemetry shows none of the retired terms (${tel.pairs} weapon + ammo renders)`, tel.pairs > 60 && telOld.length === 0, telOld);
const telHtmlOld = found(htmlSection('ws-telemetry', 'ws-workbench') + htmlSection('hudTelName', 'hudWbName'), OLD_TELEMETRY);
check('Telemetry markup shows none of the retired terms', telHtmlOld.length === 0, telHtmlOld);
check('Telemetry hero cards read MAGAZINE DAMAGE and SUSTAINED RPM',
  /MAGAZINE DAMAGE/.test(htmlSection('ws-telemetry', 'ws-workbench')) && /SUSTAINED RPM/.test(telText));
check('Magazine Damage and Alpha differ when a magazine holds more than one Burst (Gatling turret)',
  tel.gat.rounds > 1 && tel.gat.alpha > 0 && tel.gat.mag > tel.gat.alpha && /Alpha: /.test(tel.gat.sub), tel.gat);
check('Telemetry footer Alpha shows one trigger pull, not the magazine', tel.gat.hud.replace(/[^0-9]/g, '') === String(tel.gat.alpha), tel.gat);
const telNew = ['Systems', 'Anti-Missile Screen', 'Missile Scramble', 'Data Core'].filter((t) => !telText.includes(t));
check('Systems, Anti-Missile Screen, Missile Scramble and Data Core appear in Telemetry', telNew.length === 0, telNew);
const docTelOld = found(docSection('### Workspace 1', '### Workspace 2'), OLD_TELEMETRY);
check('Design doc Telemetry section uses the new terms', docTelOld.length === 0, docTelOld);

// --- Workbench and data-source labels (#57) ---
const OLD_WORKBENCH = [/server defaults?/i, 'Detonation Depth', /Area Detonation/i, /phantom mag/i, /BUNDLED SNAPSHOT/i, /bundled fallback/i];
seen.clear();
studio.run(`(() => {
  for (const w of getFilterableWeapons()) {
    selectWeapon(w.id);
    updateCombatTelemetry();
    __grab();
  }
})()`);
const htmlOutsideLogistics = html.slice(0, html.indexOf('id="ws-logistics"'))
  + html.slice(html.indexOf('data-hud="ws-workbench"'), html.indexOf('data-hud="ws-logistics"'));
const wbOld = found([...seen].join('\n') + htmlOutsideLogistics, OLD_WORKBENCH);
check('Workbench text, tooltips and footer show none of the retired terms', wbOld.length === 0, wbOld);
check('Workbench uses AoE Depth and Shipped', /AoE Depth/.test(htmlSection('ws-workbench', 'ws-logistics')) && /Shipped/.test(html));
const liveSrc = fs.readFileSync(studioFile('source_live.js'), 'utf8');
const liveOld = found(liveSrc.split(/\r?\n/).filter((l) => /setChip\(|showBanner\(/.test(l)).join('\n'), OLD_WORKBENCH.concat([/bundled/i]));
check('Data-source chip reads SNAPSHOT and its messages never say bundled', liveOld.length === 0 && /'🔴 SNAPSHOT/.test(liveSrc), liveOld);
const SP = require('../studio/source_pipeline.js');
const coreParts = {};
for (const f of fs.readdirSync(path.join(root, 'CoreParts'))) if (f.endsWith('.cs') && !/Animation/.test(f)) coreParts[f] = fs.readFileSync(path.join(root, 'CoreParts', f), 'utf8');
const noMags = SP.buildStudioData(coreParts, { magazines: [], blueprints: '', cubeBlocks: {} }, {});
const magError = noMags.errors.find((e) => /MAGAZINE/i.test(e)) || '';
check('Data health names a missing magazine an Unresolved magazine, not a phantom one', /^UNRESOLVED MAGAZINES: /.test(magError) && !/phantom/i.test(noMags.errors.join(' ')), magError.slice(0, 80));
const gateSrc = fs.readFileSync(path.join(root, 'tools', 'validate_studio_data.mjs'), 'utf8');
check('CI data check speaks of unresolved magazines', !/phantom/i.test(gateSrc), gateSrc.match(/.*phantom.*/i));
const docWbOld = found(docSection('### Workspace 2', '### Workspace 3') + docSection('## 7. Data Pipeline', '## 8.'), OLD_WORKBENCH.concat([/phantom,/i]));
check('Design doc Workbench and data-pipeline sections use the new terms', docWbOld.length === 0, docWbOld);

// --- Logistics and the Balance Matrix (#58) ---
const OLD_LOGISTICS = [/\bMSRP\b/, /anchor/i, /\bFits\b/, /Ammo Maths defaults/i, /official GVK defaults/i, /GVK defaults/i, /(?<!-)\brole\b(?![-="])/]; // lowercase "role" was the Price Tier; capital Role is the weapon's
seen.clear();
studio.run(`(() => {
  populateLogisticsAmmoDropdown();
  for (const m of amTrackedMags()) {
    selectLogisticsMagazine(m.subtypeId, true);
    updateAmmoLogistics({ force: true });
    __grab();
  }
})()`);
const logMarkup = html.slice(html.indexOf('id="ws-logistics"'), html.indexOf('data-hud="ws-telemetry"'))
  + html.slice(html.indexOf('id="balanceMatrixModal"'), html.indexOf('<!-- Main Container -->'))
  + html.slice(html.indexOf('data-hud="ws-logistics"'));
const toasts = ['app.js', 'ammo_maths.js'].map((f) => fs.readFileSync(studioFile(f), 'utf8')).join('\n')
  .split(/\r?\n/).filter((l) => /showToast\(/.test(l)).join('\n');
const logOld = found([...seen].join('\n') + logMarkup + toasts, OLD_LOGISTICS);
check('Logistics, the Balance Matrix and their toasts show none of the retired terms', logOld.length === 0, logOld);
const logNew = ['Baseline Magazine', 'Baseline price', 'Recipe Budget', 'Mags Carried', 'Price Tier', 'Shipped'].filter((t) => !([...seen].join('\n') + logMarkup + toasts).includes(t));
check('Logistics uses Baseline Magazine, Baseline price, Recipe Budget, Mags Carried, Price Tier and Shipped', logNew.length === 0, logNew);
check('The Anchor EWAR stays named Anchor in the Workbench',
  /<option value="Anchor">Anchor \(/.test(htmlSection('ws-workbench', 'ws-logistics')) && studio.run(`ewarTypeLabel('Anchor')`) === 'Anchor');

// Settings saved before the rename still load
const legacyMatrix = { ammoAnchorMsrp: 1800, ammoAnchorMag: 'LargeCalibreAmmo', ruShare: 0.6 };
const legacyLevers = { NATO_25x184mm: { sizeMult: 1.2, roleMult: 1.1 } };
const old = loadStudio({ storage: { GVK_BALANCE_MATRIX: JSON.stringify(legacyMatrix), GVK_AMMO_LEVERS: JSON.stringify(legacyLevers) } });
const mig = old.run(`({ bm: balanceMatrix, env: amEnv(), lev: amLeversFor(amMag('NATO_25x184mm')) })`);
check('A Balance Matrix saved with the old Anchor keys loads as the Baseline Magazine and its Baseline price',
  mig.bm.baselineMagPrice === 1800 && mig.bm.baselineMag === 'LargeCalibreAmmo' && mig.bm.ruShare === 0.6 && !('ammoAnchorMsrp' in mig.bm) && !('ammoAnchorMag' in mig.bm), mig.bm);
check('Lever edits saved before the rename still load', mig.lev.sizeMult === 1.2 && mig.lev.roleMult === 1.1, mig.lev);
const imp = old.run(`(() => { amImportSettings({ kind: 'gvk-ammo-settings', version: 1, levers: {}, economyValues: {}, autoInventorySize: {},
  balance: { ammoAnchorMsrp: 2100, ammoAnchorMag: 'NATO_25x184mm' } }); return balanceMatrix; })()`);
check('An exported settings file with the old Anchor keys still imports', imp.baselineMagPrice === 2100 && imp.baselineMag === 'NATO_25x184mm', imp);
const docLogOld = found(docSection('### Workspace 3', '## 4. Design Tokens'), OLD_LOGISTICS.filter((t) => String(t) !== '/anchor/i').concat([/anchor mag/i, /Anchor MSRP/]));
check('Design doc Logistics section uses the new terms', docLogOld.length === 0, docLogOld);

// --- Design doc wording (#59) ---
check('Design doc has no "over-penetration" for the AP Light Armor multiplier', !/over-penetration/i.test(doc), doc.match(/.{0,60}over-penetration.{0,20}/i));
check('Design doc expands UPs as Utility Points everywhere', !/Upgrade Module/i.test(doc) && /Utility Points \(UPs\)/.test(doc), doc.match(/.{0,40}Upgrade Module.{0,30}/i));
const truthLines = doc.split(/\r?\n/).filter((l) => /source of truth/i.test(l));
check('"Source of truth" appears only for the Mod Source', truthLines.length > 0 && truthLines.every((l) => /Mod Source/.test(l)), truthLines.map((l) => l.slice(0, 90)));

done('Glossary checks');
