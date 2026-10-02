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

done('Glossary checks');
