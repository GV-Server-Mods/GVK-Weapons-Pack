// Definition Workbench defaults: "default" = WeaponCore's value for an omitted field (C# struct default), unset fields
// display it, and choosing it removes the line from the exported definition.
// Run: node scratch/test_wc_defaults.js
'use strict';
const { loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();
const studio = loadStudio();

const r = studio.run(`(() => {
  const r = {};
  const bind = (id) => WC_BINDINGS.find((b) => b.id === id);
  const el = (id) => document.getElementById(id);
  const av = weaponsDb.find((w) => w.subtypeId === 'GVK_AvengerGatlingTurret');
  selectWeapon(av.id);

  // 1. wcDefaultDom = the C# struct default for every curated binding
  r.badDefaults = [];
  for (const b of WC_BINDINGS) {
    const mode = b.mode.split(':')[0];
    const d = wcDefaultDom(b);
    let want;
    if (['bool', 'member', 'fragEnable'].includes(mode)) want = false;
    else if (mode === 'ctrl') want = true;
    else if (['num', 'vec', 'rand'].includes(mode)) want = 0;
    else if (mode === 'enum') {
      // Independent of wcDefaultDom: the raw enum list in wc_schema.js, member 0
      const t = wcTypeAt(b.kind, wcBindingPath(b));
      const list = t && window.GVK_WC_SCHEMA.enums[t.name];
      want = list && list.length ? String(list[0]).split('=')[0].trim() : undefined;
    } else want = '';
    if (d !== want) r.badDefaults.push(b.id + ': ' + JSON.stringify(d) + ' != ' + JSON.stringify(want));
  }
  r.aimDefault = wcDefaultDom(bind('wAimLeading'));
  r.rofDefault = wcDefaultDom(bind('wRateOfFire'));
  r.npcSafeDefault = wcDefaultDom(bind('wNpcSafe'));

  // 2. Unset fields display WC's default and carry the default marker; set fields off default do not
  const tree = wcTree('weapon');
  r.unsetShown = [];
  r.unsetWrong = [];
  r.setOffMarked = [];
  for (const b of WC_BINDINGS) {
    if (b.kind !== 'weapon') continue;
    const mode = b.mode.split(':')[0];
    if (!['num', 'str', 'enum', 'bool'].includes(mode)) continue;
    const e = el(b.id);
    const rb = wcReadBinding(b, tree);
    const d = wcDefaultDom(b);
    if (!rb.set) {
      const shown = e.type === 'checkbox' ? e.checked : (typeof d === 'number' ? parseFloat(e.value) : e.value);
      if (shown !== d && !(typeof d === 'number' && String(e.value).trim() === '')) r.unsetWrong.push(b.id + '=' + JSON.stringify(e.type === 'checkbox' ? e.checked : e.value) + ' want ' + JSON.stringify(d));
      else r.unsetShown.push(b.id);
      if (!e.classList.contains('is-wc-default')) r.unsetWrong.push(b.id + ' (no default marker)');
    } else if (!wcIsDefaultDom(b, e) && e.classList.contains('is-wc-default')) {
      r.setOffMarked.push(b.id);
    }
  }

  // 3. Choosing the default removes the field from the definition; any other value writes it
  const aim = el('wAimLeading');
  aim.value = 'Advanced';
  wcWriteBinding(bind('wAimLeading'), aim);
  r.aimSetCs = generateCSharpWeapon();
  aim.value = r.aimDefault;
  wcWriteBinding(bind('wAimLeading'), aim);
  r.aimDefaultCs = generateCSharpWeapon();
  r.aimTreeAfter = wcGet(wcTree('weapon'), wcBindingPath(bind('wAimLeading')));

  const npc = el('wNpcSafe');
  npc.checked = true;
  wcWriteBinding(bind('wNpcSafe'), npc);
  r.npcSetCs = generateCSharpWeapon();
  r.npcMarkedWhenOn = wcIsDefaultDom(bind('wNpcSafe'), npc);
  npc.checked = false;
  wcWriteBinding(bind('wNpcSafe'), npc);
  r.npcDefaultCs = generateCSharpWeapon();
  r.npcMarkedWhenOff = wcIsDefaultDom(bind('wNpcSafe'), npc);

  // ValidControlModes: all three allowed == field omitted
  const ctrl = ['wCtrlAutomatic', 'wCtrlManual', 'wCtrlPainter'];
  ctrl.forEach((id) => { el(id).checked = true; });
  el('wCtrlPainter').checked = false;
  wcWriteBinding(bind('wCtrlPainter'), el('wCtrlPainter'));
  r.ctrlTwo = (wcGet(wcTree('weapon'), ['Targeting', 'ValidControlModes']) || []).map(wcIdName);
  el('wCtrlPainter').checked = true;
  wcWriteBinding(bind('wCtrlPainter'), el('wCtrlPainter'));
  r.ctrlAll = wcGet(wcTree('weapon'), ['Targeting', 'ValidControlModes']);
  delete wcWorking.weapon[av.defName];

  // 4. Source fields left untouched keep their line even when it equals the default
  r.keptDefaults = null;
  for (const w of weaponsDb) {
    if (!w.defName || !BUNDLED_WC_DEFS.weapons[w.defName]) continue;
    const t = BUNDLED_WC_DEFS.weapons[w.defName].tree;
    const hp = t.HardPoint && !t.HardPoint.__id ? t.HardPoint : null;
    if (hp && hp.AddToleranceToTracking === false) {
      selectWeapon(w.id);
      r.keptDefaults = { sub: w.subtypeId, kept: /AddToleranceToTracking = false,/.test(generateCSharpWeapon()) };
      break;
    }
  }
  return r;
})()`);

check('wcDefaultDom = C# struct default for every curated binding (false / 0 / "" / first enum member / all control modes)',
  r.badDefaults.length === 0, r.badDefaults.slice(0, 8));
check('Aim Leading default is Off (WC Prediction member 0), not the old "Advanced" fallback', r.aimDefault === 'Off', r.aimDefault);
check('RateOfFire default is 0 (not the old 1000) and NpcSafe default is off', r.rofDefault === 0 && r.npcSafeDefault === false, [r.rofDefault, r.npcSafeDefault]);
check('Unset Avenger fields display the WC default and carry the default marker', r.unsetWrong.length === 0 && r.unsetShown.length > 10,
  r.unsetWrong.slice(0, 8));
check('Fields set off their default are not marked default', r.setOffMarked.length === 0, r.setOffMarked);
check('A non-default Aim Leading is written to the export', /AimLeadingPrediction = (Prediction\.)?Advanced,/.test(r.aimSetCs));
check('Choosing the default Aim Leading removes the line from the export',
  !/AimLeadingPrediction =/.test(r.aimDefaultCs) && r.aimTreeAfter === undefined, r.aimTreeAfter);
check('NpcSafe on is written; switching it back off removes the line',
  /NpcSafe = true,/.test(r.npcSetCs) && !/NpcSafe =/.test(r.npcDefaultCs.slice(r.npcDefaultCs.indexOf('HardPoint'))), null);
check('Default marker follows the checkbox (off = default, on = not)', r.npcMarkedWhenOff === true && r.npcMarkedWhenOn === false);
check('Unticking one control mode writes the other two; ticking all three removes ValidControlModes',
  r.ctrlTwo.join(',') === 'Automatic,Manual' && r.ctrlAll === undefined, [r.ctrlTwo, r.ctrlAll]);
check('Untouched source lines equal to the default are kept as written', !!r.keptDefaults && r.keptDefaults.kept, r.keptDefaults);

done('WC defaults checks');
