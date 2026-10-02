/**
 * GVK Weapon Studio // Ammo Logistics & Blueprints ("Ammo Maths")
 * Port of the "Ammo Maths" tab of GVK Ship Weapon Scales Kharak.xlsx. computeAmmoMaths() is pure
 * (magazine + levers + env -> every sheet row) and is shared by the Logistics tab, the All Magazines
 * overview, the Workbench InventorySize check and the smoke test.
 */

// ==========================================================================
// STATE (per-viewer, persisted in localStorage)
// ==========================================================================
let selectedLogisticsMagSubtype = 'NATO_25x184mm';
const AM_LS = { levers: 'GVK_AMMO_LEVERS', values: 'GVK_ECONOMY_VALUES', autoInv: 'GVK_AUTO_INVSIZE' };
function amLoad(key, fb) {
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fb; } catch (e) { return fb; }
}
function amStore(key, v) {
  try {
    if (v && Object.keys(v).length) localStorage.setItem(key, JSON.stringify(v));
    else localStorage.removeItem(key);
  } catch (e) { /* storage blocked: edits live for this session only */ }
}
// Per-magazine levers: baseline curves (Balance Matrix) × one multiplier per output region
const AM_LEVER_KEYS = ['ammoKey', 'sizeMult', 'massMult', 'craftMult', 'roleMult', 'hybrid', 'usesRUs', 'rusManual', 'baseComp'];
function amCleanLevers(all) {
  const out = {};
  for (const sub of Object.keys(all || {})) {
    const keep = {};
    for (const k of AM_LEVER_KEYS) if (all[sub] && all[sub][k] !== undefined) keep[k] = all[sub][k];
    if (Object.keys(keep).length) out[sub] = keep;
  }
  return out;
}
let amLevers = amCleanLevers(amLoad(AM_LS.levers, {})); // mag subtype -> lever values that differ from defaults
let amValueEdits = amLoad(AM_LS.values, {});  // item subtype -> edited SC value
let amAutoInv = amLoad(AM_LS.autoInv, {});    // weapon defName -> true: keep InventorySize at the suggestion
const amPinnedWeapon = {};                     // mag subtype -> defName the HUD reports
let amChartMetric = 'dmgPerSc';

// Balance-matrix keys owned by this tab (defaults live in DEFAULT_BALANCE_MATRIX, app.js)
const AM_MATRIX_INPUTS = [
  ['baselineMagPrice', 'matBaselineMagPrice', 'num'], ['baselineMag', 'matBaselineMag', 'str'],
  ['hybridDiscount', 'matHybridDiscount', 'num'], ['ruShare', 'matRuShare', 'num'],
  ['bufferReloads', 'matBufferReloads', 'num'], ['smallCargoL', 'matSmallCargoL', 'num'],
  ['largeCargoL', 'matLargeCargoL', 'num'],
  ['playerInvL', 'matPlayerInvL', 'num'],
  ['refVolL', 'matRefVolL', 'num'], ['sizeExp', 'matSizeExp', 'num'],
  ['refMassKg', 'matRefMassKg', 'num'], ['massExp', 'matMassExp', 'num'],
  ['refCraftS', 'matRefCraftS', 'num'], ['craftExp', 'matCraftExp', 'num'],
];
const AM_DRIFT_PCT = 5;
const $am = (id) => document.getElementById(id);

// ==========================================================================
// SHEET ROUNDING (Excel semantics)
// ==========================================================================
/// <summary>Excel ROUND(x, digits): half away from zero; negative digits round left of the point.</summary>
function amExcelRound(x, digits) {
  if (!isFinite(x)) return 0;
  const s = Math.sign(x), a = Math.abs(x);
  if (digits >= 0) {
    const f = Math.pow(10, digits);
    return s * Math.round(Number((a * f).toPrecision(15))) / f;
  }
  const f = Math.pow(10, -digits);
  return s * Math.round(Number((a / f).toPrecision(15))) * f;
}
/// <summary>
/// Sheet price rounding: ROUND(x, 2 - (1 + INT(LOG10(|ref|)))) — two significant figures of ref (default x).
/// The Recipe Budget passes ref = price before assembler efficiency, exactly as the sheet does.
/// </summary>
function amRound2Sig(x, ref) {
  const r = ref === undefined ? x : ref;
  if (!x || !r || !isFinite(x) || !isFinite(r)) return 0;
  return amExcelRound(x, 2 - (1 + Math.floor(Math.log10(Math.abs(r)))));
}
/// <summary>Volumes/masses: 10 L steps from 100 up, whole units from 10, hundredths below (handheld mags).</summary>
function amRoundQty(x) {
  if (!(x > 0)) return 0;
  return x >= 100 ? amExcelRound(x, -1) : x >= 10 ? amExcelRound(x, 0) : amExcelRound(x, 2);
}
/// <summary>Excel ROUNDUP(x, -1) for positive x.</summary>
function amRoundUp10(x) { return Math.ceil(Number((x / 10).toPrecision(15))) * 10; }

function amNum(v) { return String(Number(Number(v).toFixed(4))); }
function amFmt(v, maxDigits) {
  if (v === null || v === undefined || !isFinite(v)) return '∞';
  const d = maxDigits === undefined ? (Math.abs(v) >= 100 ? 0 : Math.abs(v) >= 1 ? 2 : 3) : maxDigits;
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: d });
}
function amTime(sec) { return isFinite(sec) ? formatTime(sec) : '∞'; }
function amEsc(s) { return String(s === undefined || s === null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

// ==========================================================================
// DATA ACCESS
// ==========================================================================
function amMagazines() {
  if (typeof magazinesBlueprintsDb !== 'undefined' && magazinesBlueprintsDb.length) return magazinesBlueprintsDb;
  return typeof MAGAZINES_BLUEPRINTS_DATA !== 'undefined' ? MAGAZINES_BLUEPRINTS_DATA : [];
}
function amMag(sub) { return amMagazines().find((m) => m.subtypeId === sub) || null; }
/// <summary>Ship magazines the sheet balances (handheld and countermeasure mags are listed but not tracked).</summary>
function amIsTracked(mag) {
  return !!(mag && (mag.sizeMult || (mag.category && !/Handheld|Countermeasure|Decoy/i.test(mag.category))));
}
function amTrackedMags() { return amMagazines().filter(amIsTracked); }
/// <summary>
/// AmmoDefs a player weapon can actually select for this magazine: HardPointUsable and listed in some non-NPC
/// weapon's Ammos (weaponsDb assignedAmmos is already HardPointUsable-filtered). NPC rounds and unassigned
/// leftovers are skipped.
/// </summary>
const AM_NPC_RE = /_NPC$/i;
function amMagAmmoKeys(sub) {
  const assigned = new Set();
  for (const w of weaponsDb) {
    if (AM_NPC_RE.test(w.subtypeId || '') || AM_NPC_RE.test(w.defName || '')) continue;
    for (const k of (w.assignedAmmos || [])) assigned.add(k);
  }
  return Object.keys(ammosDb).filter((k) => ammosDb[k].ammoMagazine === sub && !AM_NPC_RE.test(k)
    && ammosDb[k].hardPointUsable !== false && assigned.has(k));
}
function amDefaultAmmoKey(mag) {
  const keys = amMagAmmoKeys(mag.subtypeId);
  if (keys.includes(mag.subtypeId)) return mag.subtypeId;
  return keys.find((k) => !/_NPC$/i.test(k)) || keys[0] || '';
}
function amMagDamage(ammo, capacity) { return ammo ? getAmmoDamageDetailed(ammo).total * (capacity || 1) : 0; }

function amValueDefaults() { return (typeof window !== 'undefined' && window.GVK_ECONOMY_VALUES_DEFAULT) || {}; }
function amValue(sub) {
  if (amValueEdits[sub] !== undefined) return amValueEdits[sub];
  const d = amValueDefaults()[sub];
  return d ? d.value : 0;
}
function amTypeId(sub) { const d = amValueDefaults()[sub]; return d ? d.typeId : 'Ingot'; }

// ==========================================================================
// BASELINE CURVES: every output scales with magazine damage relative to the Baseline Magazine
// ==========================================================================
function amRefDmg() {
  const baseMag = amMag(balanceMatrix.baselineMag);
  if (!baseMag) return 0;
  const key = (amLevers[baseMag.subtypeId] || {}).ammoKey || amDefaultAmmoKey(baseMag);
  return amMagDamage(ammosDb[key], baseMag.capacity);
}
/// <summary>Baseline volume (L), mass (kg) and craft time (s) for a magazine carrying magDmg damage; each has its own curve.</summary>
function amBaseline(magDmg, refDmg) {
  const bm = balanceMatrix;
  const ratio = refDmg > 0 && magDmg > 0 ? magDmg / refDmg : 0;
  return {
    ratio,
    vol: bm.refVolL * Math.pow(ratio, bm.sizeExp),
    mass: bm.refMassKg * Math.pow(ratio, bm.massExp),
    craft: bm.refCraftS * Math.pow(ratio, bm.craftExp),
  };
}

// ==========================================================================
// LEVERS (one multiplier per output region; defaults reproduce the live SBC)
// ==========================================================================
function amDefaults(mag, ammoKeyOverride) {
  const ammoKey = (ammoKeyOverride && ammosDb[ammoKeyOverride]) ? ammoKeyOverride : amDefaultAmmoKey(mag);
  const magDmg = amMagDamage(ammosDb[ammoKey], mag.capacity);
  const base = amBaseline(magDmg, amRefDmg());
  const r4 = (x) => Math.round(x * 10000) / 10000;
  const prereqs = mag.prerequisites || [];
  const comp = (mag.baseComp && mag.baseComp.length)
    ? mag.baseComp
    : prereqs.filter((p) => p.subtypeId !== 'GVK_RUs').map((p) => ({ subtype: p.subtypeId, weight: p.amount }));
  return {
    ammoKey: amDefaultAmmoKey(mag),
    // Stored multipliers (studio_overrides) lock a magazine's character so damage changes flow through the curves;
    // without one the multiplier is read back from the SBC, which reproduces the live values exactly.
    sizeMult: mag.sizeMult || (base.vol > 0 && mag.volume > 0 ? r4(mag.volume / base.vol) : 1),
    massMult: mag.massMult || (base.mass > 0 && mag.mass > 0 ? r4(mag.mass / base.mass) : 1),
    craftMult: mag.craftMult || (base.craft > 0 && mag.productionTime > 0 ? r4(mag.productionTime / base.craft) : 1),
    roleMult: mag.roleMultiplier || 1,
    hybrid: !!(ammosDb[ammoKey] && ammosDb[ammoKey].hybridRound),
    usesRUs: (mag.usesRUs === null || mag.usesRUs === undefined) ? prereqs.some((p) => p.subtypeId === 'GVK_RUs') : !!mag.usesRUs,
    rusManual: 0,
    baseComp: comp.map((c) => ({ subtype: c.subtype, weight: c.weight })),
  };
}
function amLeversFor(mag) {
  const saved = JSON.parse(JSON.stringify(amLevers[mag.subtypeId] || {}));
  return Object.assign(amDefaults(mag, saved.ammoKey), saved);
}
function amSetLever(sub, key, value) {
  const mag = amMag(sub);
  if (!mag) return;
  const def = amDefaults(mag, key === 'ammoKey' ? value : (amLevers[sub] || {}).ammoKey)[key];
  const saved = amLevers[sub] || (amLevers[sub] = {});
  if (value === undefined || JSON.stringify(def) === JSON.stringify(value)) delete saved[key];
  else saved[key] = value;
  if (!Object.keys(saved).length) delete amLevers[sub];
  amStore(AM_LS.levers, amLevers);
}
function amIsModified(sub) { return !!(amLevers[sub] && Object.keys(amLevers[sub]).length); }

function amEnv() {
  const bm = balanceMatrix;
  const baseMag = amMag(bm.baselineMag);
  const baselineMagDmg = amRefDmg();
  return {
    baselineMagPrice: bm.baselineMagPrice, baselineMagDmg, baselineMagName: baseMag ? baseMag.displayName : '(none)',
    hybridDiscount: bm.hybridDiscount, ruShare: bm.ruShare, assemblerEff: bm.assemblerEff || 3,
    bufferReloads: bm.bufferReloads, scrapYield: bm.scrapYield !== undefined ? bm.scrapYield : 0.25,
    cargo: [
      { key: 'small', label: 'Small Cargo Container', liters: bm.smallCargoL },
      { key: 'large', label: 'Large Cargo Container', liters: bm.largeCargoL },
    ],
    playerInvL: bm.playerInvL, value: amValue, typeId: amTypeId,
  };
}

// ==========================================================================
// WEAPONS FIRING A MAGAZINE (one row per WeaponDefinition; InventorySize and MagsToLoad are per def)
// ==========================================================================
function amWeaponTree(defName) {
  try {
    if (typeof wcWorking !== 'undefined' && wcWorking.weapon[defName]) return wcWorking.weapon[defName];
    const s = typeof wcSource === 'function' ? wcSource('weapon', defName) : null;
    return s ? s.tree : null;
  } catch (e) { return null; }
}
function amTreeNum(tree, path, fb) {
  const v = tree && typeof wcGet === 'function' ? wcGet(tree, path) : undefined;
  return typeof v === 'number' ? v : fb;
}
function amWeaponGroups(sub) {
  const groups = new Map();
  for (const w of weaponsDb) {
    // Player weapons only: NPC defs and NPC mount points (which share the player def) are left out
    if (AM_NPC_RE.test(w.subtypeId || '') || AM_NPC_RE.test(w.defName || '')) continue;
    const ammos = w.assignedAmmos || [w.ammoName];
    if (!ammos.some((k) => ammosDb[k] && ammosDb[k].ammoMagazine === sub)) continue;
    const key = w.defName || w.id;
    if (!groups.has(key)) groups.set(key, { defName: w.defName || w.id, weapons: [] });
    groups.get(key).weapons.push(w);
  }
  return [...groups.values()];
}
/// <summary>Live loading/hardware values: the Workbench working tree when edited, else the source def.</summary>
function amWeaponParams(g) {
  const w = g.weapons[0], t = amWeaponTree(g.defName), L = ['HardPoint', 'Loading'];
  return {
    rof: amTreeNum(t, L.concat('RateOfFire'), w.rateOfFire || 0),
    magsToLoad: amTreeNum(t, L.concat('MagsToLoad'), w.magsToLoad || 1),
    reloadTicks: amTreeNum(t, L.concat('ReloadTime'), w.reloadTime || 0),
    barrels: amTreeNum(t, L.concat('BarrelsPerShot'), w.barrelsPerShot || 1),
    delayUntilFire: amTreeNum(t, L.concat('DelayUntilFire'), w.delayUntilFire || 0),
    shotsInBurst: amTreeNum(t, L.concat('ShotsInBurst'), w.shotsInBurst || 0),
    delayAfterBurst: amTreeNum(t, L.concat('DelayAfterBurst'), w.delayAfterBurst || 0),
    inventorySize: amTreeNum(t, ['HardPoint', 'HardWare', 'InventorySize'], 0),
  };
}

// ==========================================================================
// CORE MATHS
// ==========================================================================
/// <summary>
/// Every row of the Ammo Maths sheet for one magazine. mag = magazine entry, L = levers, env = amEnv().
/// opts.weapons === false skips the per-weapon rows (overview / Workbench hint).
/// </summary>
function computeAmmoMaths(mag, L, env, opts) {
  opts = opts || {};
  const f = {};
  const ammo = ammosDb[L.ammoKey] || null;
  const shots = mag.capacity || 1;
  const dmgPerHit = ammo ? getAmmoDamageDetailed(ammo).total : 0;
  const magDmg = dmgPerHit * shots;
  f.magDmg = `${amFmt(dmgPerHit)} dmg/hit × ${shots} rounds = ${amFmt(magDmg)} dmg`;

  // Physical footprint: baseline curve × this magazine's multiplier, one region each
  const bm = balanceMatrix;
  const base = amBaseline(magDmg, env.baselineMagDmg);
  const ratioTxt = `(${amFmt(magDmg)} ÷ ${amFmt(env.baselineMagDmg)} dmg)`;
  f.baseVol = `${bm.refVolL} L × ${ratioTxt}^${bm.sizeExp} = ${amFmt(base.vol, 1)} L`;
  f.baseMass = `${bm.refMassKg} kg × ${ratioTxt}^${bm.massExp} = ${amFmt(base.mass, 1)} kg`;
  f.baseCraft = `${bm.refCraftS} s × ${ratioTxt}^${bm.craftExp} = ${amFmt(base.craft, 1)} s`;
  const vol = amRoundQty(base.vol * L.sizeMult);
  f.vol = `${amFmt(base.vol, 1)} L baseline × ${L.sizeMult} size = ${amFmt(vol)} L`;
  const mass = amRoundQty(base.mass * L.massMult);
  f.mass = `${amFmt(base.mass, 1)} kg baseline × ${L.massMult} mass = ${amFmt(mass)} kg`;
  const craft = Math.max(1, Math.round(base.craft * L.craftMult));
  f.craft = `${amFmt(base.craft, 1)} s baseline × ${L.craftMult} craft = ${craft} s`;

  // Economy (rows 44-50)
  const hybridMult = L.hybrid ? env.hybridDiscount : 1;
  const baselinePrice = env.baselineMagDmg > 0 ? env.baselineMagPrice / env.baselineMagDmg * magDmg * hybridMult : 0;
  f.baselinePrice = `${amFmt(env.baselineMagPrice)} SC ÷ ${amFmt(env.baselineMagDmg)} dmg (${env.baselineMagName}) × ${amFmt(magDmg)} dmg`
    + (L.hybrid ? ` × ${env.hybridDiscount} hybrid` : '') + ` = ${amFmt(baselinePrice)} SC`;
  const serverPrice = amRound2Sig(baselinePrice * L.roleMult);
  f.serverPrice = `2 sig. figs of ${amFmt(baselinePrice)} × ${L.roleMult} Price Tier = ${amFmt(serverPrice)} SC`;
  const recipeBudget = amRound2Sig(baselinePrice * L.roleMult * env.assemblerEff, baselinePrice * L.roleMult);
  f.recipeBudget = `${amFmt(baselinePrice * L.roleMult)} × ${env.assemblerEff} assembler eff., rounded at the price's 2nd sig. fig = ${amFmt(recipeBudget)} SC. `
    + `Only used to size the recipe: the server's assembler efficiency multiplier cuts ingot use, so the recipe is inflated to match. Players pay the Server Price.`;
  const scPerDmg = magDmg > 0 ? recipeBudget / magDmg / env.assemblerEff : 0;
  f.scPerDmg = `${amFmt(recipeBudget)} ÷ ${amFmt(magDmg)} dmg ÷ ${env.assemblerEff} = ${amFmt(scPerDmg, 4)} SC/dmg`;
  const cuValue = env.value('GVK_CUs'), ruValue = env.value('GVK_RUs');
  const rus = L.usesRUs ? (cuValue > 0 ? amExcelRound(recipeBudget * env.ruShare / cuValue, 1) : 0) : (L.rusManual || 0);
  f.rus = L.usesRUs
    ? `ROUND(${amFmt(recipeBudget)} × ${env.ruShare} ÷ ${amFmt(cuValue)} (CU value), 1) = ${rus} RUs`
    : `Manual: ${rus} RUs`;
  const ruCost = Math.round(ruValue * rus);
  f.ruCost = `ROUND(${rus} RUs × ${amFmt(ruValue)} (RU value)) = ${amFmt(ruCost)} SC`;

  // Recipe (rows 53-90): split the ingot budget across the base composition by value share
  const comps = (L.baseComp || []).filter((c) => c.subtype && c.weight > 0 && env.value(c.subtype) > 0);
  const baseVals = comps.map((c) => Math.round(env.value(c.subtype) * c.weight));
  const baseSum = baseVals.reduce((a, b) => a + b, 0);
  const ingotBudget = Math.max(0, recipeBudget - ruCost);
  f.ingotBudget = `${amFmt(recipeBudget)} − ${amFmt(ruCost)} RU cost = ${amFmt(ingotBudget)} SC across ingots`;
  const prereqs = [];
  if (rus > 0) prereqs.push({ typeId: env.typeId('GVK_RUs'), subtypeId: 'GVK_RUs', amount: rus, formula: f.rus });
  comps.forEach((c, i) => {
    const val = env.value(c.subtype);
    const amount = baseSum > 0 ? amExcelRound(baseVals[i] / baseSum * ingotBudget / val, 1) : 0;
    if (amount > 0) {
      prereqs.push({
        typeId: env.typeId(c.subtype), subtypeId: c.subtype, amount,
        formula: `ROUND(${amFmt(baseVals[i])} ÷ ${amFmt(baseSum)} × ${amFmt(ingotBudget)} ÷ ${amFmt(val)}, 1) = ${amount}`,
      });
    }
  });
  // Per Base Composition row (same order as L.baseComp): value share and resulting amount, null when skipped
  const compRows = (L.baseComp || []).map((c) => {
    const i = comps.indexOf(c);
    if (i < 0) return null;
    const p = prereqs.find((q) => q.subtypeId === c.subtype);
    return { share: baseSum > 0 ? baseVals[i] / baseSum : 0, amount: p ? p.amount : 0 };
  });
  const recipeValue = prereqs.reduce((a, p) => a + p.amount * env.value(p.subtypeId), 0);
  const sbcPrereqs = mag.prerequisites || [];
  const sbcRecipeValue = sbcPrereqs.reduce((a, p) => a + p.amount * env.value(p.subtypeId), 0);
  const driftPct = sbcRecipeValue > 0 ? (recipeValue / sbcRecipeValue - 1) * 100 : null;

  // Every SBC field export compares (fields) and the ones it would change (changes)
  const fields = [], changes = [];
  const cmp = (field, oldV, newV, unit) => {
    const row = { field, old: oldV || 0, new: newV || 0, unit, changed: Math.abs((oldV || 0) - (newV || 0)) > 1e-9 };
    fields.push(row);
    if (row.changed) changes.push(row);
  };
  cmp('Volume', mag.volume, vol, 'L');
  cmp('Mass', mag.mass, mass, 'kg');
  if (mag.bpXml || sbcPrereqs.length) {
    cmp('Craft Time', mag.productionTime, craft, 's');
    const subs = [];
    for (const p of sbcPrereqs.concat(prereqs)) if (!subs.includes(p.subtypeId)) subs.push(p.subtypeId);
    for (const s of subs) {
      const o = sbcPrereqs.find((p) => p.subtypeId === s), n = prereqs.find((p) => p.subtypeId === s);
      cmp(s, o ? o.amount : 0, n ? n.amount : 0, s === 'GVK_RUs' ? 'RUs' : 'kg');
    }
  }

  // Cargo packing (rows 28-42): mags / damage / weight are weapon-independent
  const cargo = env.cargo.map((c) => ({
    key: c.key, label: c.label, liters: c.liters,
    mags: vol > 0 ? Math.floor(c.liters / vol) : 0,
    dmg: vol > 0 ? c.liters / vol * magDmg : 0,
    kg: vol > 0 ? c.liters / vol * mass : 0,
  }));

  const scrap = prereqs.map((p) => ({ subtypeId: p.subtypeId, amount: Math.round(p.amount * env.scrapYield * 100) / 100 }));
  const scrapValue = scrap.reduce((a, s) => a + s.amount * env.value(s.subtypeId), 0);

  const r = {
    mag, levers: L, ammo, shots, dmgPerHit, magDmg,
    sbc: {
      volume: mag.volume, mass: mag.mass, craft: mag.productionTime, prereqs: sbcPrereqs, recipeValue: sbcRecipeValue,
      dmgPerL: mag.volume > 0 ? magDmg / mag.volume : 0, dmgPerKg: mag.mass > 0 ? magDmg / mag.mass : 0,
    },
    baseVol: base.vol, baseMass: base.mass, baseCraft: base.craft, vol, mass, dmgPerL: vol > 0 ? magDmg / vol : 0,
    playerMags: vol > 0 ? Math.floor(env.playerInvL / vol) : 0, dmgPerKg: mass > 0 ? magDmg / mass : 0,
    craft, baselinePrice, serverPrice, recipeBudget, scPerDmg, rus, ruCost, ingotBudget,
    prereqs, compRows, recipeValue, driftPct, fields, changes, cargo, scrap, scrapValue, formulas: f, weapons: [],
  };
  if (opts.weapons !== false) r.weapons = amWeaponRows(r, env);
  return r;
}

function amWeaponRows(r, env) {
  return amWeaponGroups(r.mag.subtypeId).map((g) => {
    const p = amWeaponParams(g);
    const N = Math.max(1, p.magsToLoad || 1);
    // Heat, FireFull and hybrid charge come from the weapon; loading levers from the working tree
    const cyc = computeFireCycle(Object.assign(getFireCycleParams(g.weapons[0], r.ammo, false), {
      rof: p.rof, barrels: p.barrels, trajPerBarrel: 1, magSize: r.shots, mags: N,
      reloadTicks: p.reloadTicks, delayUntilFire: p.delayUntilFire,
      shotsInBurst: p.shotsInBurst, delayAfterBurst: p.delayAfterBurst, energy: false,
    }));
    const sps = cyc.totalCycleSec > 0 ? cyc.totalRounds / cyc.totalCycleSec : 0;
    const lps = r.vol / r.shots * sps;
    const minL = r.vol * env.bufferReloads * N;
    const suggestedInv = amRoundUp10(minL) / 1000;
    const liveL = p.inventorySize * 1000;
    const magsPerMin = sps * 60 / r.shots;
    const subs = g.weapons.map((w) => w.subtypeId).filter(Boolean);
    return {
      defName: g.defName, weapons: g.weapons, name: g.weapons[0].name || g.defName, subtypes: subs,
      params: p, magsToLoad: N, sps, lps, kgps: r.mass / r.shots * sps, dps: sps * r.dmgPerHit,
      minMags: env.bufferReloads * N, minL, suggestedInv, liveInv: p.inventorySize,
      magsHeld: r.vol > 0 ? Math.floor(liveL / r.vol + 1e-9) : 0,
      short: liveL + 1e-6 < minL,
      // Live inventory above the suggestion: "Apply" would shrink it
      overPct: suggestedInv > 0 && liveL > suggestedInv * 1000 + 1e-6 ? (liveL / (suggestedInv * 1000) - 1) * 100 : 0,
      playerSec: lps > 0 ? env.playerInvL / lps : Infinity,
      depleteSec: lps > 0 ? suggestedInv * 1000 / lps : Infinity,
      depleteLiveSec: lps > 0 ? liveL / lps : Infinity,
      cargoSec: r.cargo.map((c) => (lps > 0 ? c.liters / lps : Infinity)),
      magsPerMin, scPerMin: magsPerMin * r.serverPrice,
      ingotPerMin: r.prereqs.map((q) => ({ subtypeId: q.subtypeId, perMin: q.amount * magsPerMin })),
      formula: `ROUNDUP(${amFmt(r.vol)} L × ${env.bufferReloads} × ${N} MagsToLoad, −1) ÷ 1000 = ${suggestedInv} kL`,
    };
  });
}

function amCompute(mag, opts) { return computeAmmoMaths(mag, amLeversFor(mag), amEnv(), opts); }

/// <summary>Suggested WC InventorySize (kL) for a weapon loading magSubtype with the given MagsToLoad.</summary>
function suggestedInventorySize(magSubtype, magsToLoad) {
  const mag = amMag(magSubtype);
  if (!mag) return null;
  const r = amCompute(mag, { weapons: false });
  const N = Math.max(1, magsToLoad || 1);
  const buf = balanceMatrix.bufferReloads;
  const minL = r.vol * buf * N;
  const suggested = amRoundUp10(minL) / 1000;
  return {
    mag, vol: r.vol, sbcVol: mag.volume, minL, suggested, buffer: buf, magsToLoad: N,
    formula: `ROUNDUP(${amFmt(r.vol)} L × ${buf} × ${N} MagsToLoad, −1) ÷ 1000 = ${suggested} kL`,
  };
}

// ==========================================================================
// SBC EXPORT (raw source definitions are patched so untouched tags survive)
// ==========================================================================
function amRootIndent(x) { const m = /\n([ \t]*)<\/[\w]+>\s*$/.exec(x); return m ? m[1] : '\t\t'; }

function amBlueprintXml(mag, r) {
  const items = r.prereqs.map((p) => `<Item Amount="${amNum(p.amount)}" TypeId="${p.typeId}" SubtypeId="${p.subtypeId}"/>`);
  if (mag.bpXml) {
    let x = mag.bpXml;
    const ind = /\n([ \t]*)<Prerequisites/.exec(x);
    const pi = ind ? ind[1] : '\t\t\t';
    const block = '<Prerequisites>\n' + items.map((i) => pi + '\t' + i).join('\n') + '\n' + pi + '</Prerequisites>';
    x = x.replace(/<Prerequisites>[\s\S]*?<\/Prerequisites>|<Prerequisites\s*\/>/, block);
    x = x.replace(/<BaseProductionTimeInSeconds>[^<]*</, `<BaseProductionTimeInSeconds>${r.craft}<`);
    return amRootIndent(x) + x;
  }
  const t = '\t\t';
  return [
    `${t}<Blueprint>`, `${t}\t<Id>`, `${t}\t\t<TypeId>BlueprintDefinition</TypeId>`,
    `${t}\t\t<SubtypeId>${mag.blueprintSubtype || mag.subtypeId}</SubtypeId>`, `${t}\t</Id>`,
    `${t}\t<DisplayName>${amEsc(mag.displayName)}</DisplayName>`,
    `${t}\t<Icon>${amEsc(mag.icon || '')}</Icon>`, `${t}\t<Prerequisites>`,
    ...items.map((i) => `${t}\t\t${i}`), `${t}\t</Prerequisites>`,
    `${t}\t<BaseProductionTimeInSeconds>${r.craft}</BaseProductionTimeInSeconds>`,
    `${t}\t<Result Amount="1" TypeId="AmmoMagazine" SubtypeId="${mag.subtypeId}"/>`, `${t}</Blueprint>`,
  ].join('\n');
}

function amMagazineXml(mag, r) {
  if (!mag.sbcXml) return `<!-- ${mag.subtypeId}: no source AmmoMagazine definition; set <Mass>${amNum(r.mass)}</Mass> <Volume>${amNum(r.vol)}</Volume> -->`;
  let x = mag.sbcXml;
  x = x.replace(/<Mass>[^<]*<\/Mass>/, `<Mass>${amNum(r.mass)}</Mass>`);
  x = x.replace(/<Volume>[^<]*<\/Volume>/, `<Volume>${amNum(r.vol)}</Volume>`);
  return amRootIndent(x) + x;
}

// ==========================================================================
// LOGISTICS TAB: selection & lever inputs
// ==========================================================================
// All Magazines filters (also scope the ◀ ▶ stepper)
const AM_FILTERS = [
  ['all', 'All', () => true],
  ['changed', 'Changed', (r) => r.changes.length > 0],
  ['drift', 'Drift', (r) => r.driftPct !== null && Math.abs(r.driftPct) > AM_DRIFT_PCT],
  ['short', 'Short Inv', (r) => r.weapons.some((w) => w.short)],
  ['carried', 'Mags Carried < 2', (r) => r.playerMags < 2 || r.cargo[0].mags < 2],
];
const AM_OUTLIER_PCT = 15;   // "vs median" tolerance band
let amFilter = 'all';
let amSort = { key: null, dir: 1 };
let amFleet = [];            // [{ m, r }] per tracked magazine, refreshed by amRenderFleet
let amFleetTimer = null;
let amThroughput = false;

function populateLogisticsAmmoDropdown() {
  const sel = $am('logisticsAmmoSelect');
  if (sel) {
    const cats = {};
    amMagazines().forEach((m) => { if (m.category) (cats[m.category] = cats[m.category] || []).push(m); });
    sel.innerHTML = Object.entries(cats).map(([c, mags]) => `<optgroup label="── ${amEsc(c)} ──">`
      + mags.map((m) => `<option value="${amEsc(m.subtypeId)}">${amIsModified(m.subtypeId) ? '● ' : ''}${amEsc(m.displayName)} [${amEsc(m.subtypeId)}]</option>`).join('')
      + '</optgroup>').join('');
    sel.value = selectedLogisticsMagSubtype;
  }
  const baseSel = $am('matBaselineMag');
  if (baseSel) {
    baseSel.innerHTML = amTrackedMags().map((m) => `<option value="${amEsc(m.subtypeId)}">${amEsc(m.displayName)}</option>`).join('');
    baseSel.value = balanceMatrix.baselineMag;
  }
}

function selectLogisticsMagazine(magSubtype, syncInputs) {
  const mag = amMag(magSubtype) || amMagazines().find((m) => m.category);
  if (!mag) return;
  selectedLogisticsMagSubtype = mag.subtypeId;
  const sel = $am('logisticsAmmoSelect');
  if (sel) sel.value = mag.subtypeId;
  const icon = $am('logisticsAmmoIcon');
  if (icon) {
    icon.onerror = () => { icon.onerror = null; icon.src = 'icons/ammo_NATO_25x184mm.png'; };
    icon.src = mag.localIcon || `icons/ammo_${mag.subtypeId}.png`;
  }
  if (syncInputs !== false) amSyncLeverInputs();
  updateAmmoLogistics();
}

function amSetVal(id, v) { const el = $am(id); if (el) el.value = v; }
function amSetChk(id, v) { const el = $am(id); if (el) el.checked = !!v; }
function amFocused(el) { return !!el && typeof document !== 'undefined' && document.activeElement === el; }
function amItemName(sub) {
  if (sub === 'GVK_RUs') return 'RUs';
  const d = amValueDefaults()[sub];
  return d ? d.name : sub;
}

/// <summary>Writes the selected magazine's levers into the inputs (on select/reset only, so typing is never clobbered).</summary>
function amSyncLeverInputs() {
  const mag = amMag(selectedLogisticsMagSubtype);
  if (!mag) return;
  const L = amLeversFor(mag);
  const ammoSel = $am('amAmmoSelect');
  if (ammoSel) {
    const keys = amMagAmmoKeys(mag.subtypeId);
    ammoSel.innerHTML = keys.length
      ? keys.map((k) => `<option value="${amEsc(k)}">${amEsc(k)} — ${amFmt(getAmmoDamageDetailed(ammosDb[k]).total)} dmg/hit</option>`).join('')
      : '<option value="">(no AmmoDef loads this magazine)</option>';
    ammoSel.value = L.ammoKey;
  }
  amSetVal('inputSizeMult', L.sizeMult);
  amSetVal('inputMassMult', L.massMult);
  amSetVal('inputCraftMult', L.craftMult);
  amSetVal('inputRoleMult', L.roleMult);
  amSyncRoleSelect(L.roleMult);
  amSetChk('chkHybridRound', L.hybrid);
  amRenderBaseComp(L);
}

/// <summary>Price Tier dropdown follows the Price × value ("Custom" when no preset matches).</summary>
function amSyncRoleSelect(v) {
  const sel = $am('amRoleSelect');
  if (!sel) return;
  const opt = Array.from(sel.options || []).find((o) => o.value !== 'custom' && Math.abs(parseFloat(o.value) - v) < 1e-9);
  sel.value = opt ? opt.value : 'custom';
}

// Ammo blueprints are refined metals only: no components, ore, gravel, or the RU/CU currencies (RUs have their own row)
const AM_RECIPE_EXCLUDE = ['GVK_RUs', 'GVK_CUs', 'Gravel'];
function amItemOptions(selected) {
  const defs = amValueDefaults();
  const keys = Object.keys(defs).filter((k) => defs[k].typeId === 'Ingot' && !AM_RECIPE_EXCLUDE.includes(k))
    .sort((a, b) => defs[a].name.localeCompare(defs[b].name));
  if (selected && !keys.includes(selected)) keys.unshift(selected);
  return keys.map((k) => `<option value="${amEsc(k)}"${k === selected ? ' selected' : ''} title="${amEsc(k)}">${amEsc(defs[k] ? defs[k].name : k)}</option>`).join('');
}

/// <summary>Recipe rows: editable ingot + weight, then computed share / new / SBC / Δ cells (filled by amRenderCompValues).</summary>
function amRenderBaseComp(L) {
  const box = $am('amBaseComp');
  if (box) {
    box.innerHTML = (L.baseComp || []).map((c, i) => `
      <div class="am-bc-row" data-idx="${i}">
        <select class="control-input am-bc-item">${amItemOptions(c.subtype)}</select>
        <input type="number" class="control-input am-bc-weight" min="0" step="any" value="${c.weight}">
        <span class="am-bc-share"></span><span class="am-bc-new"></span><span class="am-bc-sbc"></span><span class="am-bc-delta"></span>
        <button class="btn btn-sm am-bc-remove" title="Remove">✕</button>
      </div>`).join('') || '<div class="am-muted">No ingredients — add one below.</div>';
  }
  const ru = $am('amBaseCompRU');
  if (ru) ru.dataset.state = ''; // magazine switched/reset: rebuild the RU row on the next render
}

function amRenderCompValues(r) {
  const box = $am('amBaseComp');
  if (!box || !box.querySelectorAll) return;
  box.querySelectorAll('.am-bc-row').forEach((row) => {
    const c = (r.levers.baseComp || [])[parseInt(row.getAttribute('data-idx'), 10)];
    const v = r.compRows[parseInt(row.getAttribute('data-idx'), 10)];
    const old = c ? (r.sbc.prereqs.find((q) => q.subtypeId === c.subtype) || {}).amount : undefined;
    const set = (cls, html, title) => { const el = row.querySelector(cls); if (el) { el.innerHTML = html; el.title = title || ''; } };
    const p = v && c ? r.prereqs.find((q) => q.subtypeId === c.subtype) : null;
    set('.am-bc-share', v ? `${(v.share * 100).toFixed(0)}%` : '—', 'Share of the recipe value (weight × ingot value)');
    set('.am-bc-new', v ? `<strong>${amFmt(v.amount, 2)}</strong> <span class="am-unit">kg</span>` : '<span class="am-muted">skipped</span>',
      p ? p.formula : 'Weight 0 or the item has no value');
    set('.am-bc-sbc', old === undefined ? '—' : `${amFmt(old, 2)}`);
    set('.am-bc-delta', old === undefined ? (v && v.amount ? '<span class="am-delta">new</span>' : '') : amDelta(old, v ? v.amount : 0));
  });
}

/// <summary>
/// RU line above the ingots: None / Fixed (typed quantity) / Auto from price (relic ammo, Balance Matrix → RU Share).
/// Rebuilt only when the mode changes, so typing a fixed quantity is never clobbered.
/// </summary>
function amRuMode(L) { return L.usesRUs ? 'auto' : (L.rusManual > 0 ? 'manual' : 'none'); }
function amRenderRuRow(L, r) {
  const box = $am('amBaseCompRU');
  if (!box) return;
  const state = amRuMode(L);
  if (box.dataset.state !== state) {
    const seg = (k, label, tip) => `<button type="button" class="am-seg-btn${state === k ? ' active' : ''}" data-ru-mode="${k}" title="${tip}">${label}</button>`;
    box.innerHTML = `<div class="am-ru-row"><span class="am-ru-label">RUs</span>
        <div class="am-seg">${seg('none', 'None', 'No RUs in the recipe')}${seg('manual', 'Fixed', 'A fixed RU quantity you type')}`
      + `${seg('auto', 'Auto from price', 'Relic ammo: part of the price is paid in RUs (Balance Matrix → RU Share)')}</div>
        ${state === 'manual' ? `<input type="number" class="control-input am-bc-ru-qty" min="0" step="0.1" value="${L.rusManual}" title="Fixed RU quantity">` : ''}
        <span class="am-ru-auto"></span>
        <button class="am-lever-reset" data-lever-reset="usesRUs" title="Revert to default">↺</button></div>`;
    box.dataset.state = state;
  }
  const auto = box.querySelector ? box.querySelector('.am-ru-auto') : null;
  if (auto) {
    auto.textContent = state === 'none' ? '' : `${state === 'auto' ? `${amFmt(r.rus, 1)} RUs · ` : ''}${amFmt(r.ruCost)} SC of the Recipe Budget`;
    auto.title = `${r.formulas.rus}\n${r.formulas.ruCost}`;
  }
  const add = $am('amBaseCompAdd');
  if (add && !add.innerHTML) add.innerHTML = amItemOptions('');
}

function amReadBaseComp() {
  const box = $am('amBaseComp');
  if (!box) return [];
  return Array.from(box.querySelectorAll('.am-bc-row')).map((row) => ({
    subtype: row.querySelector('.am-bc-item').value,
    weight: parseFloat(row.querySelector('.am-bc-weight').value) || 0,
  }));
}

function amEditLever(key, value) {
  amSetLever(selectedLogisticsMagSubtype, key, value);
  amAfterLeverEdit();
}
function amAfterLeverEdit() {
  updateAmmoLogistics({ deferFleet: true });
  const sel = $am('logisticsAmmoSelect');
  const mag = amMag(selectedLogisticsMagSubtype);
  if (sel && mag && sel.selectedOptions && sel.selectedOptions[0]) {
    sel.selectedOptions[0].textContent = `${amIsModified(mag.subtypeId) ? '● ' : ''}${mag.displayName} [${mag.subtypeId}]`;
  }
  if (typeof runWeaponCoreLinter === 'function') runWeaponCoreLinter(); // Workbench drift / auto InventorySize
}

// ==========================================================================
// LOGISTICS TAB: rendering
// ==========================================================================
let amLastResult = null;

/// <summary>
/// Renders the selected magazine. opts.deferFleet (lever typing) debounces the all-magazine views
/// (list, overview, chart, HUD count), which recompute every tracked magazine.
/// </summary>
function updateAmmoLogistics(opts) {
  const mag = amMag(selectedLogisticsMagSubtype);
  if (!mag || typeof ammosDb === 'undefined') return;
  const env = amEnv();
  const L = amLeversFor(mag);
  const r = computeAmmoMaths(mag, L, env);
  amLastResult = r;
  if (opts && opts.deferFleet && amFleet.length) amScheduleFleet();
  else amRenderFleet();
  amRenderRuRow(L, r);
  amRenderStatus(mag, r);
  amRenderPhysical(r);
  amRenderPrice(r, env);
  amRenderCompare(r);
  amRenderRecipe(mag, r, env);
  amRenderCarry(r, env);
  amRenderWeapons(r, env);
  amRenderModified(mag);
  amRenderHud(r);
}

function amScheduleFleet() {
  clearTimeout(amFleetTimer);
  amFleetTimer = setTimeout(() => {
    amRenderFleet();
    if (!amLastResult) return;
    amRenderPhysical(amLastResult);
    amRenderPrice(amLastResult, amEnv());
    amRenderHud(amLastResult);
  }, 150);
}

/// <summary>Recomputes every tracked magazine and redraws the overview table and chart.</summary>
function amRenderFleet() {
  amFleet = amTrackedMags().map((m) => ({
    m, r: amLastResult && m.subtypeId === amLastResult.mag.subtypeId ? amLastResult : amCompute(m),
  }));
  amRenderFilters();
  amRenderOverview();
  amRenderChart();
}

/// <summary>Chart metrics all read "higher = more damage for the cost"; Damage / SC is the inverse of SC / Dmg.</summary>
function amMetric(r, key) {
  if (key === 'dmgPerSc') return r.scPerDmg > 0 ? 1 / r.scPerDmg : 0;
  return r[key] || 0;
}
function amFleetMedian(key) {
  const v = amFleet.map(({ r }) => amMetric(r, key)).filter((x) => x > 0).sort((a, b) => a - b);
  return v.length ? v[Math.floor(v.length / 2)] : 0;
}
/// <summary>"+10% vs median" (amber outside the tolerance band).</summary>
function amVsMedian(r, key) {
  const med = amFleetMedian(key), v = amMetric(r, key);
  if (!(med > 0) || !(v > 0)) return '';
  const pct = (v / med - 1) * 100;
  const txt = Math.abs(pct) < 0.5 ? 'at median' : `${pct > 0 ? '+' : ''}${pct.toFixed(0)}% vs median`;
  return `<span class="am-vs${Math.abs(pct) > AM_OUTLIER_PCT ? ' am-vs-out' : ''}" title="Fleet median: ${amFmt(med, 2)}">${txt}</span>`;
}

function amChip(cls, html, title, jump) {
  const tag = jump ? 'button' : 'div';
  return `<${tag} class="badge ${cls}"${jump ? ` type="button" data-am-jump="${jump}"` : ''} title="${amEsc(title || '')}">${html}</${tag}>`;
}

/// <summary>Header chips: identity, then status (problems in red/amber only).</summary>
function amRenderStatus(mag, r) {
  const box = $am('amStatusChips');
  const name = $am('logActiveAmmoName');
  if (name) name.textContent = mag.displayName;
  if (!box) return;
  const edited = Object.keys(amLevers[mag.subtypeId] || {}).length;
  const shortN = r.weapons.filter((w) => w.short).length;
  const d = r.driftPct;
  let html = amChip('', `Subtype: <strong>${amEsc(mag.subtypeId)}</strong>`)
    + amChip('', `Capacity: <strong>${mag.capacity} rd${mag.capacity === 1 ? '' : 's'}</strong>`);
  if (edited) html += amChip('badge-amber', `● <strong>${edited}</strong> lever${edited === 1 ? '' : 's'} edited`, 'Levers that differ from the Shipped values');
  if (amIsTracked(mag) && d !== null && Math.abs(d) > AM_DRIFT_PCT) {
    html += amChip('badge-red', `⚠ Recipe drift <strong>${d > 0 ? '+' : ''}${d.toFixed(1)}%</strong>`, 'Ammo Maths recipe value vs the SBC recipe value', 'amCompareTable');
  }
  html += r.changes.length
    ? amChip('badge-amber', `<strong>${r.changes.length}</strong> SBC field${r.changes.length === 1 ? '' : 's'} change`, 'Show what export writes', 'amCompareTable')
    : amChip('badge-green', '✓ Matches SBC', 'Export would not change this magazine');
  if (shortN) html += amChip('badge-red', `⚠ ${shortN} weapon${shortN === 1 ? '' : 's'} short on inventory`, 'Live InventorySize below the reload buffer', 'amWeaponsTable');
  if (r.playerMags < 2) html += amChip('badge-red', `⚠ Player carries ${r.playerMags}`, 'Fewer than 2 magazines carried in a player inventory', 'amCarryTable');
  box.innerHTML = html;
}

function amDelta(oldV, newV) {
  if (!oldV) return '';
  const d = (newV / oldV - 1) * 100;
  if (Math.abs(d) < 0.05) return '<span class="am-muted">=</span>';
  return `<span class="am-delta">${d > 0 ? '+' : ''}${d.toFixed(1)}%</span>`;
}

/// <summary>Physical panel: curve hints, target inputs (unless being typed in) and damage density.</summary>
function amRenderPhysical(r, force) {
  const f = r.formulas;
  const hint = (id, text, formula) => { const el = $am(id); if (el) { el.textContent = text; el.title = formula; } };
  hint('amSizeHint', `curve ${amFmt(r.baseVol, 1)} L × ${r.levers.sizeMult} → ${amFmt(r.vol)} L`, `${f.baseVol}\n${f.vol}`);
  hint('amMassHint', `curve ${amFmt(r.baseMass, 1)} kg × ${r.levers.massMult} → ${amFmt(r.mass)} kg`, `${f.baseMass}\n${f.mass}`);
  hint('amCraftHint', `curve ${amFmt(r.baseCraft, 1)} s × ${r.levers.craftMult} → ${r.craft} s`, `${f.baseCraft}\n${f.craft}`);
  amSyncTargets(r, force);
  amRenderBasis(r);
  const dens = $am('amDensity');
  if (dens) {
    dens.innerHTML = `<span class="am-formula" title="${amEsc(f.magDmg)}"><strong>${amFmt(r.magDmg)}</strong> dmg / mag</span>`
      + `<span><strong>${amFmt(r.dmgPerL, 1)}</strong> dmg / L ${amVsMedian(r, 'dmgPerL')}</span>`
      + `<span><strong>${amFmt(r.dmgPerKg, 1)}</strong> dmg / kg ${amVsMedian(r, 'dmgPerKg')}</span>`;
  }
  const warn = $am('amVolWarning');
  if (warn) {
    const bad = r.vol <= 0;
    warn.style.display = bad ? '' : 'none';
    warn.textContent = bad ? '⚠ Magazine volume rounds to 0 L — raise the Volume multiplier (or pick another reference ammo).' : '';
  }
}

/// <summary>
/// Damage Basis card: the AmmoDef's damage per hit (edited in the Workbench) × capacity, its ratio to the Baseline Magazine
/// magazine (Balance Matrix), and the curve values that ratio produces before the multipliers.
/// </summary>
function amRenderBasis(r) {
  const box = $am('amDamageBasis');
  if (!box) return;
  const env = amEnv(), bm = balanceMatrix;
  const key = r.levers.ammoKey;
  const d = r.ammo ? getAmmoDamageDetailed(r.ammo) : null;
  const parts = d ? [['base', d.base], ['area', d.aoe], ['end-of-life', d.eol], ['fragments', d.frag], ['block HP bonus', d.bbh]]
    .filter(([, v]) => v > 0).map(([k, v]) => `${amFmt(v)} ${k}`).join(' + ')
    + (d.antiProjectile ? ' (anti-missile blast not counted: HealthHitModifier with 1 hp or less per block)' : '') : '';
  const ratio = env.baselineMagDmg > 0 ? r.magDmg / env.baselineMagDmg : 0;
  const isBaselineMag = r.mag.subtypeId === bm.baselineMag;
  const baselineLink = `<a href="#" class="am-bm-link" data-bm-focus="matBaselineMag" title="Change the Baseline Magazine (Balance Matrix)">${amEsc(env.baselineMagName)}</a>`;
  box.innerHTML = `<div class="am-basis-row">
      <span class="am-formula" title="${amEsc(parts ? `Per hit: ${parts}` : 'No AmmoDef')}"><strong>${amFmt(r.dmgPerHit)}</strong> dmg/hit</span>
      <span class="am-op">×</span><span><strong>${r.shots}</strong> rd${r.shots === 1 ? '' : 's'}</span>
      <span class="am-op">=</span><span class="am-basis-total"><strong>${amFmt(r.magDmg)}</strong> dmg / mag</span>
      ${key ? `<button type="button" class="btn btn-sm" data-am-edit-damage="${amEsc(key)}" title="Open ${amEsc(key)} in the Definition Workbench to change its damage">✎ Edit damage in Workbench</button>` : ''}
    </div>
    <div class="am-basis-row">${isBaselineMag
      ? `<span>This is the <strong>Baseline Magazine</strong>: every curve sits at its reference value (1×).</span>`
      : `<span>Baseline Magazine ${baselineLink} = ${amFmt(env.baselineMagDmg)} dmg / mag</span><span class="am-op">→</span><span><strong>${amFmt(ratio, 2)}×</strong> its damage</span>`}</div>
    <div class="am-basis-curves">
      <span class="am-formula" title="${amEsc(r.formulas.baseVol)}">Volume curve <strong>${amFmt(r.baseVol, 1)} L</strong> <span class="am-muted">(${bm.refVolL} L × ratio^${bm.sizeExp})</span></span>
      <span class="am-formula" title="${amEsc(r.formulas.baseMass)}">Mass curve <strong>${amFmt(r.baseMass, 1)} kg</strong> <span class="am-muted">(${bm.refMassKg} kg × ratio^${bm.massExp})</span></span>
      <span class="am-formula" title="${amEsc(r.formulas.baseCraft)}">Craft curve <strong>${amFmt(r.baseCraft, 1)} s</strong> <span class="am-muted">(${bm.refCraftS} s × ratio^${bm.craftExp})</span></span>
      <a href="#" class="am-bm-link" data-bm-focus="matRefVolL">⚙ Edit curves</a>
    </div>`;
}

/// <summary>Opens the Workbench on a player weapon that fires this AmmoDef, with the ammo selected and BaseDamage in view.</summary>
function amEditDamageInWorkbench(ammoKey) {
  const w = weaponsDb.find((x) => !AM_NPC_RE.test(x.subtypeId || '') && (x.assignedAmmos || [x.ammoName]).includes(ammoKey));
  if (!w || !ammosDb[ammoKey]) { showToast(`⚠ No player weapon fires ${ammoKey}.`); return; }
  selectWeapon(w.id);
  selectAmmo(ammoKey);
  switchWorkspace('ws-workbench');
  const inp = $am('aBaseDamage');
  if (!inp) return;
  if (typeof wbReveal === 'function') { wbReveal(inp, { delay: 350 }); return; }
  setTimeout(() => {
    amScrollTo(inp, 'center');
    inp.classList.add('am-flash');
    setTimeout(() => inp.classList.remove('am-flash'), 1600);
  }, 350);
}

/// <summary>Target fields show the resulting value; the one being typed in is left alone until it loses focus.</summary>
function amSyncTargets(r, force) {
  [['amTargetVol', r.vol], ['amTargetMass', r.mass], ['amTargetCraft', r.craft], ['amTargetPrice', r.serverPrice]].forEach(([id, v]) => {
    const el = $am(id);
    if (el && (force || !amFocused(el))) el.value = amNum(v);
  });
}

/// <summary>Economy headline: Server Price first; Baseline price, value vs the fleet and the Recipe Budget as supporting lines.</summary>
function amRenderPrice(r, env) {
  const note = $am('amBaselineNote');
  if (note) note.textContent = `Baseline Magazine: ${env.baselineMagName} = ${amFmt(env.baselineMagPrice)} SC`;
  const hint = $am('amPriceHint');
  if (hint) { hint.textContent = `Baseline price ${amFmt(r.baselinePrice)} × ${r.levers.roleMult} → ${amFmt(r.serverPrice)} SC (2 sig. figs)`; hint.title = `${r.formulas.baselinePrice}\n${r.formulas.serverPrice}`; }
  const g = $am('amPriceHero');
  if (!g) return;
  const f = r.formulas;
  g.innerHTML = `<div class="am-hero-main">
      <div class="stat-title">Server Price</div>
      <div class="am-hero-value am-formula" title="${amEsc(f.serverPrice)}">${amFmt(r.serverPrice)} <span class="am-hero-unit">SC</span></div>
      <div class="am-stat-note">what the player pays · <span class="am-formula" title="${amEsc(f.baselinePrice)}">Baseline price ${amFmt(r.baselinePrice)}</span> × ${r.levers.roleMult} Price Tier${r.levers.hybrid ? ' (hybrid discount applied)' : ''}</div>
    </div>
    <div class="am-hero-side">
      <div class="am-hero-line"><span class="stat-title">Damage / SC</span>
        <strong class="am-formula" title="${amEsc(f.scPerDmg)} (inverse shown)">${amFmt(amMetric(r, 'dmgPerSc'), 2)}</strong> ${amVsMedian(r, 'dmgPerSc')}</div>
      <div class="am-hero-line"><span class="stat-title">Recipe Budget</span>
        <strong class="am-formula" title="${amEsc(f.recipeBudget)}">${amFmt(r.recipeBudget)} SC</strong>
        <span class="am-muted">× ${env.assemblerEff} assembler eff. · sizes the recipe, not a price</span></div>
      ${r.rus > 0 ? `<div class="am-hero-line"><span class="stat-title">RU Cost</span>
        <strong class="am-formula" title="${amEsc(f.ruCost)}">${amFmt(r.ruCost)} SC</strong> <span class="am-muted">${amFmt(r.rus, 1)} RUs</span></div>` : ''}
    </div>`;
}

/// <summary>Every SBC field export compares; unchanged rows muted. Matches the "N fields" count everywhere else.</summary>
function amRenderCompare(r) {
  const t = $am('amCompareTable');
  const count = $am('amChangeCount');
  if (count) {
    count.textContent = r.changes.length ? `${r.changes.length} of ${r.fields.length} fields change` : `all ${r.fields.length} fields match the SBC`;
    count.className = r.changes.length ? 'am-change-count' : 'am-muted';
  }
  if (!t) return;
  const label = (field) => (/^(Volume|Mass|Craft Time)$/.test(field) ? field : `${amItemName(field)} <span class="am-muted">${field === 'GVK_RUs' ? 'recipe' : 'ingot'}</span>`);
  const row = (c) => `<tr class="${c.changed ? 'am-row-changed' : 'am-row-same'}"><td>${label(c.field)}</td>`
    + `<td>${c.old ? `${amFmt(c.old, 2)} ${c.unit}` : '—'}</td>`
    + `<td><strong>${c.new ? `${amFmt(c.new, 2)} ${c.unit}` : '<span class="am-delta">removed</span>'}</strong></td>`
    + `<td>${c.changed ? (amDelta(c.old, c.new) || '<span class="am-delta">new</span>') : '<span class="am-muted">=</span>'}</td></tr>`;
  t.innerHTML = '<thead><tr><th>SBC Field</th><th>SBC (live)</th><th>New</th><th>Δ vs SBC</th></tr></thead><tbody>'
    + r.fields.map(row).join('')
    + `<tr class="am-row-summary" title="${amEsc(r.formulas.ingotBudget)}"><td>Recipe value <span class="am-muted">total, not an SBC field</span></td>`
    + `<td>${amFmt(r.sbc.recipeValue)} SC</td><td><strong>${amFmt(r.recipeValue)} SC</strong></td>`
    + `<td>${r.driftPct === null ? '' : amDelta(r.sbc.recipeValue, r.recipeValue)}</td></tr>`
    + '</tbody>';
}

function amRenderRecipe(mag, r, env) {
  amRenderCompValues(r);
  const note = $am('amRecipeValueNote');
  if (note) {
    note.textContent = `value ${amFmt(r.recipeValue)} SC (= Recipe Budget) · SBC ${amFmt(r.sbc.recipeValue)} SC`
      + (r.driftPct === null ? '' : ` (${r.driftPct > 0 ? '+' : ''}${r.driftPct.toFixed(1)}%)`);
    note.title = r.formulas.ingotBudget;
  }
  const tot = $am('amRecipeTotals');
  if (tot) {
    const kg = r.prereqs.filter((p) => p.subtypeId !== 'GVK_RUs').reduce((a, p) => a + p.amount, 0);
    const comp = (r.levers.baseComp || []).map((c) => c.subtype);
    const gone = r.sbc.prereqs.filter((p) => p.subtypeId !== 'GVK_RUs' && !comp.includes(p.subtypeId));
    tot.innerHTML = `<strong>${amFmt(kg, 1)} kg</strong> of ingots → <strong>${amFmt(r.mass)} kg</strong> magazine`
      + (gone.length ? ` · <span class="am-delta">removed from SBC: ${gone.map((p) => `${amEsc(amItemName(p.subtypeId))} ${amFmt(p.amount, 2)} kg`).join(', ')}</span>` : '');
  }
  const warn = $am('amRecipeWarn');
  if (warn) {
    const ratio = r.sbc.recipeValue > 0 ? r.recipeValue / r.sbc.recipeValue : 1;
    const bad = amIsTracked(mag) && (ratio > 2 || ratio < 0.5);
    warn.style.display = bad ? '' : 'none';
    warn.textContent = bad ? `⚠ The new recipe is worth ${ratio > 1 ? `${amFmt(ratio, 1)}×` : `${(ratio * 100).toFixed(0)}% of`} the live SBC recipe. Check the composition and Server Price before exporting.` : '';
  }
  const bp = $am('codeBlueprintXml');
  if (bp) bp.textContent = amBlueprintXml(mag, r);
  const mx = $am('codeMagazineXml');
  if (mx) mx.textContent = amMagazineXml(mag, r);
  const scrap = $am('amScrap');
  if (scrap) {
    scrap.innerHTML = `<span class="am-formula" title="Recipe × ${env.scrapYield} Scrap Yield">♻️ Salvage ≈ ${amFmt(r.scrapValue)} SC</span>: `
      + (r.scrap.map((s) => `${amEsc(amItemName(s.subtypeId))} ${amFmt(s.amount, 2)} ${s.subtypeId === 'GVK_RUs' ? 'RUs' : 'kg'}`).join(' · ') || '—');
  }
}

function amPinned(r) {
  const pinned = amPinnedWeapon[r.mag.subtypeId];
  return r.weapons.find((w) => w.defName === pinned) || r.weapons[0] || null;
}

/// <summary>Player inventory and both cargo sizes in one table; fire times use the pinned weapon.</summary>
function amRenderCarry(r, env) {
  const t = $am('amCarryTable');
  const w = amPinned(r);
  const rows = [{ label: 'Player inventory', liters: env.playerInvL, mags: r.playerMags, sec: w ? w.playerSec : Infinity, warn: r.playerMags < 2 }]
    .concat(r.cargo.map((c, i) => ({ label: c.label, liters: c.liters, mags: c.mags, sec: w ? w.cargoSec[i] : Infinity, warn: c.mags < 2 })));
  if (t) {
    t.innerHTML = `<thead><tr><th>Container</th><th>Capacity</th><th>Mags</th><th>Damage Stored</th><th>Weight</th><th>1 Gun Fires For</th></tr></thead><tbody>`
      + rows.map((x) => {
        const n = r.vol > 0 ? x.liters / r.vol : 0;
        return `<tr><td>${x.label}</td><td>${amFmt(x.liters)} L</td>
          <td class="${x.warn ? 'am-short' : ''}"${x.warn ? ' title="Fewer than 2 magazines fit"' : ''}><strong>${x.mags.toLocaleString()}</strong>${x.warn ? ' ⚠' : ''}</td>
          <td>${Math.round(n * r.magDmg).toLocaleString()} hp</td><td>${Math.round(n * r.mass).toLocaleString()} kg</td>
          <td>${w ? amTime(x.sec) : '—'}</td></tr>`;
      }).join('') + '</tbody>';
  }
  const note = $am('amCarryNote');
  if (note) {
    note.innerHTML = w ? `Fire times use 📌 <strong>${amEsc(w.name)}</strong> firing continuously (sheet method). Click another weapon below to switch.`
      : 'No player weapon fires this magazine.';
  }
}

/// <summary>Weapons firing this magazine. Core columns by default; "Show throughput" adds the sheet's rate columns.</summary>
function amRenderWeapons(r, env) {
  const t = $am('amWeaponsTable');
  const note = $am('amWeaponsNote');
  if (note) {
    note.textContent = `Suggested InventorySize = ROUNDUP(Vol × ${env.bufferReloads} × MagsToLoad, −1) ÷ 1000 kL, per WeaponDefinition (WC HardPoint.HardWare.InventorySize).`;
  }
  if (!t) return;
  const pinned = amPinned(r);
  const rows = r.weapons.slice().sort((a, b) => a.name.localeCompare(b.name));
  const tp = amThroughput;
  const head = '<thead><tr><th>Weapon</th><th>MagsToLoad</th><th>Rounds/s</th><th>DPS</th>'
    + `<th>Suggested Inv.</th><th>Live Inv. (WC)</th><th title="Continuous fire from a full live inventory">Live Inv. Lasts</th>`
    + (tp ? `<th>L/s</th><th title="${env.bufferReloads} × MagsToLoad">Min Mags</th><th>Mags/min</th><th>SC/min</th>`
      + r.cargo.map((c) => `<th>${c.key === 'small' ? 'Small' : 'Large'} Cargo <span class="am-muted">1 gun</span></th>`).join('') : '')
    + '<th></th></tr></thead>';
  const body = rows.map((w) => {
    const subs = w.subtypes.length > 1 ? ` <span class="am-muted" title="${amEsc(w.subtypes.join(', '))}">+${w.subtypes.length - 1}</span>` : '';
    const status = w.short ? '<span class="am-inv-flag am-inv-flag-short">⚠ short</span>'
      : w.overPct > 0.5 ? `<span class="am-inv-flag am-inv-flag-over" title="Applying the suggestion would shrink it">+${w.overPct.toFixed(0)}% over</span>`
        : '<span class="am-inv-flag am-inv-flag-ok">✓</span>';
    const same = Math.abs(w.liveInv - w.suggestedInv) < 1e-9;
    const ingots = w.ingotPerMin.map((q) => `${amItemName(q.subtypeId)}: ${amFmt(q.perMin, 2)}/min`).join('\n');
    return `<tr class="am-click${w === pinned ? ' am-row-selected' : ''}" data-def="${amEsc(w.defName)}" title="Click to use ${amEsc(w.name)} for the fire times">
      <td>${w === pinned ? '📌 ' : ''}${amEsc(w.name)}${subs}</td>
      <td>${w.magsToLoad}</td><td>${amFmt(w.sps, 3)}</td><td>${amFmt(w.dps)}</td>
      <td class="am-formula" title="${amEsc(w.formula)}"><strong>${amNum(w.suggestedInv)} kL</strong></td>
      <td class="${w.short ? 'am-short' : ''}" title="Holds ${w.magsHeld} mags">${amNum(w.liveInv)} kL <span class="am-muted">(${w.magsHeld} mags)</span> ${status}</td>
      <td title="At the suggested size: ${amTime(w.depleteSec)}">${amTime(w.depleteLiveSec)}</td>
      ${tp ? `<td>${amFmt(w.lps, 2)}</td><td>${amFmt(w.minMags, 1)}</td><td>${amFmt(w.magsPerMin, 2)}</td><td title="${amEsc(ingots)}">${amFmt(w.scPerMin)}</td>`
        + w.cargoSec.map((s) => `<td>${amTime(s)}</td>`).join('') : ''}
      <td class="am-actions">
        <button class="btn btn-sm${w.short ? ' btn-primary' : ''}" data-am-action="apply" data-def="${amEsc(w.defName)}" data-inv="${w.suggestedInv}"${same ? ' disabled' : ''}
          title="${same ? 'Already at the suggested size' : `Open in the Workbench and set InventorySize ${amNum(w.liveInv)} → ${amNum(w.suggestedInv)} kL${w.overPct > 0.5 ? ' (shrinks it)' : ''}`}">Set ${amNum(w.suggestedInv)} kL</button>
        <button class="btn btn-sm" data-am-action="copy" data-inv="${w.suggestedInv}" title="Copy the C# line">📋 C#</button>
      </td></tr>`;
  }).join('');
  const cols = 8 + (tp ? 4 + r.cargo.length : 0);
  t.innerHTML = head + '<tbody>' + (body || `<tr><td colspan="${cols}" class="am-muted">No player weapon loads this magazine.</td></tr>`) + '</tbody>';
}

/// <summary>Filter chips (with counts) in the All Magazines header.</summary>
function amRenderFilters() {
  if (typeof document.querySelectorAll !== 'function') return;
  const html = AM_FILTERS.map(([k, label, fn]) => {
    const n = amFleet.filter(({ r }) => fn(r)).length;
    return `<button type="button" class="filter-pill${amFilter === k ? ' active' : ''}" data-am-filter="${k}"${k !== 'all' && !n ? ' disabled' : ''}>${label} (${n})</button>`;
  }).join('');
  document.querySelectorAll('[data-am-filters]').forEach((el) => { el.innerHTML = html; });
}
function amFiltered() {
  const fn = (AM_FILTERS.find(([k]) => k === amFilter) || AM_FILTERS[0])[2];
  return amFleet.filter(({ r }) => fn(r));
}

const AM_SORT_KEYS = {
  name: ({ m }) => m.displayName, magDmg: ({ r }) => r.magDmg, vol: ({ r }) => r.vol, mass: ({ r }) => r.mass,
  craft: ({ r }) => r.craft, price: ({ r }) => r.serverPrice, dmgPerSc: ({ r }) => amMetric(r, 'dmgPerSc'), rus: ({ r }) => r.rus,
  carried: ({ r }) => r.playerMags, drift: ({ r }) => (r.driftPct === null ? -Infinity : Math.abs(r.driftPct)),
  short: ({ r }) => r.weapons.filter((w) => w.short).length, changes: ({ r }) => r.changes.length,
};

/// <summary>Tracked magazines in the All Magazines order (filter + sort); the ◀ ▶ stepper walks the same list.</summary>
function amOrdered() {
  let rows = amFiltered();
  if (amSort.key && AM_SORT_KEYS[amSort.key]) {
    const get = AM_SORT_KEYS[amSort.key];
    rows = rows.slice().sort((a, b) => {
      const x = get(a), y = get(b);
      return (typeof x === 'string' ? x.localeCompare(y) : x - y) * amSort.dir;
    });
  }
  return rows;
}
/// <summary>Selects the previous (-1) or next (+1) magazine of amOrdered(), wrapping; off-list selections start at the ends.</summary>
function amStep(dir) {
  const rows = amOrdered();
  if (!rows.length) return;
  const i = rows.findIndex(({ m }) => m.subtypeId === selectedLogisticsMagSubtype);
  const j = i < 0 ? (dir > 0 ? 0 : rows.length - 1) : (i + dir + rows.length) % rows.length;
  selectLogisticsMagazine(rows[j].m.subtypeId, true);
}

function amRenderOverview() {
  const t = $am('amOverviewTable');
  if (!t) return;
  const rows = amOrdered();
  const cell = (oldV, newV, unit) => (Math.abs((oldV || 0) - newV) > 1e-9
    ? `<span class="am-muted">${amFmt(oldV)} →</span> <strong>${amFmt(newV)}</strong>${unit}` : `${amFmt(newV)}${unit}`);
  const th = (key, label, title) => `<th class="am-sortable" data-sort="${key}"${title ? ` title="${amEsc(title)}"` : ''}>${label}`
    + `${amSort.key === key ? (amSort.dir > 0 ? ' ▲' : ' ▼') : ''}</th>`;
  const medSc = amFleetMedian('dmgPerSc');
  t.innerHTML = '<thead><tr>' + th('name', 'Magazine') + th('magDmg', 'Dmg / Mag') + th('vol', 'Volume') + th('mass', 'Mass')
    + th('craft', 'Craft') + th('price', 'Server Price') + th('dmgPerSc', 'Dmg / SC', 'Damage per space credit (higher = cheaper damage)')
    + th('rus', 'RUs') + th('carried', 'Mags Carried (Player / Small Cargo)', 'Magazines per player inventory / per small cargo container (aim for 2+)')
    + th('drift', 'Recipe Drift') + th('short', 'Short Inv.') + th('changes', 'SBC Changes') + '</tr></thead><tbody>'
    + rows.map(({ m, r }) => {
      const shortN = r.weapons.filter((w) => w.short).length;
      const drift = r.driftPct === null ? '—' : `${r.driftPct > 0 ? '+' : ''}${r.driftPct.toFixed(1)}%`;
      const driftBad = r.driftPct !== null && Math.abs(r.driftPct) > AM_DRIFT_PCT;
      const dps = amMetric(r, 'dmgPerSc');
      const scOut = medSc > 0 && Math.abs(dps / medSc - 1) * 100 > AM_OUTLIER_PCT;
      return `<tr class="am-click${m.subtypeId === selectedLogisticsMagSubtype ? ' am-row-selected' : ''}" data-mag="${amEsc(m.subtypeId)}">
        <td>${amIsModified(m.subtypeId) ? '<span class="am-dot" title="Levers edited">●</span> ' : ''}${amEsc(m.displayName)}</td>
        <td>${amFmt(r.magDmg)}</td><td>${cell(m.volume, r.vol, ' L')}</td><td>${cell(m.mass, r.mass, ' kg')}</td>
        <td>${cell(m.productionTime, r.craft, ' s')}</td><td>${amFmt(r.serverPrice)}</td>
        <td class="${scOut ? 'am-vs-out' : ''}" title="${amEsc(r.formulas.scPerDmg)} (inverse shown)">${amFmt(dps, 2)}</td>
        <td>${r.rus ? amFmt(r.rus, 1) : '—'}</td>
        <td class="${r.playerMags < 2 || r.cargo[0].mags < 2 ? 'am-short' : ''}" title="${amFmt(r.vol)} L vs ${amFmt(amEnv().playerInvL)} L player / ${amFmt(r.cargo[0].liters)} L small cargo">${r.playerMags} / ${r.cargo[0].mags}</td>
        <td class="${driftBad ? 'am-short' : ''}">${drift}</td>
        <td class="${shortN ? 'am-short' : ''}">${shortN ? `⚠ ${shortN}` : '—'}</td>
        <td>${r.changes.length ? `${r.changes.length} field${r.changes.length === 1 ? '' : 's'}` : '✓'}</td></tr>`;
    }).join('') + '</tbody>';
}

function amRenderModified(mag) {
  const saved = amLevers[mag.subtypeId] || {};
  document.querySelectorAll('.am-lever[data-lever]').forEach((el) => {
    const key = el.getAttribute('data-lever');
    const on = key in saved || (key === 'usesRUs' && 'rusManual' in saved);
    el.classList.toggle('am-modified', on);
  });
}

/// <summary>Footer: price and drift of the selected magazine, fleet change count + export.</summary>
function amRenderHud(r) {
  const set = (id, txt) => { const el = $am(id); if (el) el.textContent = txt; };
  const w = amPinned(r);
  set('hudLogName', r.mag.displayName);
  set('hudLogPrice', `${amFmt(r.serverPrice)} SC`);
  set('hudLogDmgSc', amFmt(amMetric(r, 'dmgPerSc'), 2));
  set('hudLogMagDmg', `${Math.round(r.magDmg).toLocaleString()} hp`);
  const lasts = w && w.sps > 0 ? r.shots / w.sps : 0;
  set('hudLogMagLasts', !w ? '—' : lasts < 60 ? `${lasts.toFixed(1)}s` : amTime(lasts));
  const drift = $am('hudLogDrift');
  if (drift) {
    const d = r.driftPct;
    const show = amIsTracked(r.mag) && d !== null && Math.abs(d) > AM_DRIFT_PCT;
    drift.style.display = show ? '' : 'none';
    if (show) drift.textContent = `⚠ Drift ${d > 0 ? '+' : ''}${d.toFixed(0)}%`;
  }
  const chip = $am('hudLogChanged');
  if (chip) {
    const n = amFleet.filter(({ r: x }) => x.changes.length).length;
    chip.textContent = n ? `${n} mag${n === 1 ? '' : 's'} changed` : '✓ All match SBC';
    chip.className = `badge hud-chip ${n ? 'badge-amber' : 'badge-green'}`;
  }
}

// ==========================================================================
// AMMO COMPARISON CHART (single series, canvas; the overview table is its table view)
// ==========================================================================
// Every metric reads "higher = more damage for the cost", so Damage / SC is the inverse of the sheet's SC / Dmg
const AM_CHART_LABELS = { dmgPerSc: 'damage / SC', dmgPerL: 'damage / L', dmgPerKg: 'damage / kg' };
let amChartBars = [];

function amRenderChart() {
  const cv = $am('amChart');
  if (!cv || typeof cv.getContext !== 'function') return;
  const ctx = cv.getContext('2d');
  if (!ctx || typeof ctx.fillRect !== 'function') return;
  const css = typeof getComputedStyle === 'function' ? getComputedStyle(document.documentElement) : null;
  const tok = (n, fb) => (css && css.getPropertyValue(n).trim()) || fb;
  const rows = amFleet.map(({ m, r }) => ({ sub: m.subtypeId, name: m.displayName, v: amMetric(r, amChartMetric) }))
    .filter((x) => x.v > 0).sort((a, b) => b.v - a.v);
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth || 800;
  const rowH = 24, top = 8, h = Math.max(60, rows.length * rowH + top + 22);
  cv.width = Math.round(w * dpr);
  cv.height = Math.round(h * dpr);
  cv.style.height = h + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  if (!rows.length) return;
  const font = tok('--font-mono', 'monospace');
  const labelW = Math.min(280, Math.round(w * 0.38)), valueW = 70;
  const plotW = Math.max(40, w - labelW - valueW);
  const max = rows[0].v;
  const median = amFleetMedian(amChartMetric);
  const cMuted = tok('--text-muted', '#94a3b8'), cDim = tok('--text-dim', '#64748b');
  const cBar = tok('--cyan-primary', '#38bdf8'), cSel = tok('--amber-primary', '#f59e0b');
  const digits = amChartMetric === 'dmgPerSc' ? 2 : 0;
  amChartBars = [];
  ctx.font = `11px ${font}`;
  ctx.textBaseline = 'middle';
  rows.forEach((row, i) => {
    const y = top + i * rowH;
    const bw = Math.max(2, plotW * row.v / max);
    const sel = row.sub === selectedLogisticsMagSubtype;
    ctx.fillStyle = sel ? cSel : cBar;
    ctx.globalAlpha = sel ? 1 : 0.75;
    const bh = rowH - 8, by = y + 4, rad = Math.min(4, bw / 2, bh / 2);
    ctx.beginPath();
    ctx.moveTo(labelW, by);
    ctx.lineTo(labelW + bw - rad, by);
    ctx.arcTo(labelW + bw, by, labelW + bw, by + rad, rad);
    ctx.lineTo(labelW + bw, by + bh - rad);
    ctx.arcTo(labelW + bw, by + bh, labelW + bw - rad, by + bh, rad);
    ctx.lineTo(labelW, by + bh);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = sel ? tok('--text-main', cMuted) : cMuted;
    ctx.textAlign = 'right';
    const label = row.name.length > 34 ? row.name.slice(0, 33) + '…' : row.name;
    ctx.fillText(label, labelW - 8, y + rowH / 2);
    ctx.textAlign = 'left';
    ctx.fillText(amFmt(row.v, digits), labelW + bw + 6, y + rowH / 2);
    amChartBars.push({ x0: 0, x1: labelW + bw, y0: y, y1: y + rowH, row });
  });
  const mx = labelW + plotW * median / max;
  ctx.strokeStyle = cDim;
  ctx.lineWidth = 1;
  if (typeof ctx.setLineDash === 'function') ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(mx, top);
  ctx.lineTo(mx, top + rows.length * rowH);
  ctx.stroke();
  if (typeof ctx.setLineDash === 'function') ctx.setLineDash([]);
  ctx.fillStyle = cDim;
  ctx.textAlign = 'center';
  ctx.fillText(`median ${amFmt(median, digits)} ${AM_CHART_LABELS[amChartMetric]}`, mx, top + rows.length * rowH + 12);
}

// ==========================================================================
// EXPORT, SETTINGS & VALUES TABLE
// ==========================================================================
function amDownload(name, text, type) {
  const blob = new Blob([text], { type: type || 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
}

function amChangedMags() {
  return amTrackedMags().map((m) => ({ m, r: amCompute(m, { weapons: false }) }))
    .filter((x) => x.r.changes.length && x.r.vol > 0);
}

function amOpenExport() {
  const list = amChangedMags();
  const diff = $am('amExportDiff');
  if (diff) {
    diff.innerHTML = list.length ? list.map(({ m, r }) => `<div class="am-card"><div class="am-card-title">${amEsc(m.displayName)} <span class="am-muted">[${amEsc(m.subtypeId)}]</span></div>
      <table class="bom-table am-table"><thead><tr><th>Field</th><th>SBC</th><th>New</th><th>Δ</th></tr></thead><tbody>`
      + r.changes.map((c) => `<tr><td>${amEsc(c.field)}</td><td>${amFmt(c.old, 2)} ${c.unit}</td><td><strong>${amFmt(c.new, 2)} ${c.unit}</strong></td><td>${amDelta(c.old, c.new) || '<span class="am-delta">new</span>'}</td></tr>`).join('')
      + '</tbody></table></div>').join('')
      : '<p class="am-muted">Every tracked magazine already matches its Ammo Maths result. Nothing to export.</p>';
  }
  const bpList = list.filter(({ r }) => r.changes.some((c) => c.field !== 'Volume' && c.field !== 'Mass'));
  const magList = list.filter(({ r }) => r.changes.some((c) => c.field === 'Volume' || c.field === 'Mass'));
  const bp = $am('amExportBp');
  if (bp) {
    bp.textContent = `<!-- GVK Weapon Studio: ${bpList.length} changed blueprint(s). Replace the matching <Blueprint> blocks in Content/Data/Blueprints.sbc -->\n`
      + bpList.map(({ m, r }) => amBlueprintXml(m, r)).join('\n');
  }
  const mg = $am('amExportMag');
  if (mg) {
    mg.textContent = `<!-- GVK Weapon Studio: ${magList.length} changed magazine(s). Replace the matching <AmmoMagazine> blocks in Content/Data/AmmoMagazines_*.sbc -->\n`
      + magList.map(({ m, r }) => amMagazineXml(m, r)).join('\n');
  }
  const modal = $am('amExportModal');
  if (modal) modal.style.display = 'flex';
}

/// <summary>One click: every tracked magazine's Blueprint + AmmoMagazine as two complete, drop-in SBC files.</summary>
function amExportAllSbc() {
  const list = amTrackedMags().map((m) => ({ m, r: amCompute(m, { weapons: false }) })).filter((x) => x.r.vol > 0);
  if (!list.length) { showToast('⚠ No tracked magazines to export.'); return; }
  const stamp = new Date().toISOString().slice(0, 10);
  const wrap = (tag, note, blocks) => '<?xml version="1.0"?>\n'
    + '<Definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n'
    + `\t<!-- GVK Weapon Studio ${stamp}: ${list.length} ${note}. Replaces the matching definitions in the mod's existing SBCs; remove those to avoid duplicates. -->\n`
    + `\t<${tag}>\n${blocks.join('\n')}\n\t</${tag}>\n</Definitions>\n`;
  const crlf = (s) => s.replace(/\r?\n/g, '\r\n');
  amDownload('GVK_AmmoBlueprints.sbc', crlf(wrap('Blueprints', 'ammo blueprint(s)', list.map(({ m, r }) => amBlueprintXml(m, r)))), 'application/xml');
  // Stagger the second download so the browser doesn't drop it
  setTimeout(() => amDownload('GVK_AmmoMagazines.sbc', crlf(wrap('AmmoMagazines', 'ammo magazine(s)', list.map(({ m, r }) => amMagazineXml(m, r)))), 'application/xml'), 400);
  showToast(`⬇ Exported ${list.length} blueprints + magazines.`);
}

function amSettingsSnapshot() {
  const balance = {};
  AM_MATRIX_INPUTS.forEach(([k]) => { balance[k] = balanceMatrix[k]; });
  balance.assemblerEff = balanceMatrix.assemblerEff;
  balance.scrapYield = balanceMatrix.scrapYield;
  return {
    kind: 'gvk-ammo-settings', version: 1, exported: new Date().toISOString(),
    levers: amLevers, economyValues: amValueEdits, balance, autoInventorySize: amAutoInv,
  };
}

function amImportSettings(data) {
  if (!data || data.kind !== 'gvk-ammo-settings') throw new Error('Not a GVK ammo settings file.');
  const obj = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
  amLevers = obj(data.levers);
  amValueEdits = obj(data.economyValues);
  amAutoInv = obj(data.autoInventorySize);
  const bal = obj(data.balance);
  const balNow = migrateBalanceMatrix(bal);
  for (const k of Object.keys(balNow)) if (k in DEFAULT_BALANCE_MATRIX) balanceMatrix[k] = balNow[k];
  amStore(AM_LS.levers, amLevers);
  amStore(AM_LS.values, amValueEdits);
  amStore(AM_LS.autoInv, amAutoInv);
  try { localStorage.setItem('GVK_BALANCE_MATRIX', JSON.stringify(balanceMatrix)); } catch (e) { /* blocked */ }
}

function amRenderValuesTable() {
  const t = $am('amValuesTable');
  if (!t) return;
  const defs = amValueDefaults();
  t.innerHTML = '<thead><tr><th>Item</th><th>Subtype</th><th>Type</th><th>Value (SC)</th></tr></thead><tbody>'
    + Object.keys(defs).map((k) => `<tr class="${amValueEdits[k] !== undefined ? 'am-modified-row' : ''}">
      <td>${amEsc(defs[k].name)}</td><td>${amEsc(k)}</td><td>${amEsc(defs[k].typeId)}</td>
      <td><input type="number" class="control-input am-value-input" data-sub="${amEsc(k)}" step="any" min="0" value="${amValue(k)}" title="Default: ${defs[k].value}"></td></tr>`).join('')
    + '</tbody>';
}

/// <summary>Balance-matrix modal hooks (called from app.js sync/apply).</summary>
function amSyncMatrixInputs() {
  AM_MATRIX_INPUTS.forEach(([key, id]) => amSetVal(id, balanceMatrix[key]));
  amRenderValuesTable();
}
function amApplyMatrixInputs() {
  AM_MATRIX_INPUTS.forEach(([key, id, kind]) => {
    const el = $am(id);
    if (!el) return;
    if (kind === 'str') balanceMatrix[key] = el.value || DEFAULT_BALANCE_MATRIX[key];
    else {
      const v = parseFloat(el.value);
      balanceMatrix[key] = isFinite(v) && v >= 0 ? v : DEFAULT_BALANCE_MATRIX[key];
    }
  });
}

// ==========================================================================
// WORKBENCH LINK: suggested InventorySize, below-buffer flag, recipe drift
// ==========================================================================
function amApplyInventorySize(value, silent) {
  const inp = $am('wInventorySize');
  if (!inp) return;
  inp.value = String(value);
  const b = typeof WC_BINDINGS !== 'undefined' ? WC_BINDINGS.find((x) => x.id === 'wInventorySize') : null;
  if (b) wcWriteBinding(b, inp);
  if (silent) {
    if (typeof wcScheduleRender === 'function') wcScheduleRender('weapon');
    return;
  }
  wcAfterEdit('weapon', true);
  showToast(`📦 InventorySize set to ${value} kL`);
}

function amApplyInWorkbench(defName, value) {
  const w = weaponsDb.find((x) => x.defName === defName && !/_NPC$/i.test(x.subtypeId || '')) || weaponsDb.find((x) => x.defName === defName);
  if (!w) return;
  selectWeapon(w.id);
  switchWorkspace('ws-workbench');
  amApplyInventorySize(value);
  const inp = $am('wInventorySize');
  if (inp && typeof wbReveal === 'function') wbReveal(inp, { delay: 350 });
  else if (inp && inp.scrollIntoView) inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/// <summary>Runs inside runWeaponCoreLinter: hint + red flag under InventorySize, auto-sync, drift chip; adds lint warnings.</summary>
function amCheckWorkbench(warnings) {
  const box = $am('wInvSuggestBox'), hint = $am('wInvSuggestHint'), inp = $am('wInventorySize');
  const chip = $am('hudWbDrift'), auto = $am('chkAutoInvSize');
  const sub = activeAmmo && activeAmmo.ammoMagazine;
  const mag = sub && sub !== 'Energy' ? amMag(sub) : null;
  if (inp && inp.dataset.helpTitle === undefined) inp.dataset.helpTitle = inp.title || '';
  if (!inp || !amIsTracked(mag)) {
    if (box) box.style.display = 'none';
    if (inp) { inp.classList.remove('input-below-min'); inp.title = inp.dataset.helpTitle || ''; }
    if (chip) chip.style.display = 'none';
    return;
  }
  const N = Math.max(1, parseInt(($am('wMagsToLoad') || {}).value, 10) || 1);
  const s = suggestedInventorySize(sub, N);
  const defName = activeWeapon && activeWeapon.defName;
  if (auto) auto.checked = !!(defName && amAutoInv[defName]);
  if (defName && amAutoInv[defName] && s.suggested > 0 && Math.abs((parseFloat(inp.value) || 0) - s.suggested) > 1e-9) {
    amApplyInventorySize(s.suggested, true);
  }
  const cur = parseFloat(inp.value) || 0;
  const short = s.minL > 0 && cur * 1000 + 1e-6 < s.minL;
  const reloads = s.vol > 0 ? cur * 1000 / s.vol / N : 0;
  inp.classList.toggle('input-below-min', short);
  inp.title = (inp.dataset.helpTitle || '') + (short
    ? `\n\n⚠ Below the ${s.buffer} × MagsToLoad reload buffer: holds ${reloads.toFixed(2)} reloads (min ${s.suggested} kL).` : '');
  if (box) {
    box.style.display = '';
    box.classList.toggle('am-inv-short', short);
    box.title = s.formula;
  }
  if (hint) {
    const volNote = Math.abs(s.vol - s.sbcVol) > 1e-9 ? ` · Ammo Maths mag ${amFmt(s.vol)} L (SBC ${amFmt(s.sbcVol)} L)` : '';
    hint.textContent = short
      ? `⚠ Holds ${reloads.toFixed(2)} of ${s.buffer} × ${N} reloads — min ${amNum(s.suggested)} kL${volNote}`
      : `Suggested: ${amNum(s.suggested)} kL (${s.buffer} × ${N} mags × ${amFmt(s.vol)} L)${volNote}`;
  }
  if (short) {
    warnings.push(`InventorySize ${cur} kL is below the ${s.buffer} × MagsToLoad buffer (${amNum(s.suggested)} kL) for ${mag.displayName}.`);
  }
  const r = amCompute(mag, { weapons: false });
  const d = r.driftPct;
  const drifted = d !== null && Math.abs(d) > AM_DRIFT_PCT;
  if (chip) {
    chip.style.display = drifted ? '' : 'none';
    chip.dataset.mag = sub;
    if (drifted) chip.textContent = `📦 Recipe drift ${d > 0 ? '+' : ''}${d.toFixed(0)}% · Open in Logistics`;
  }
  if (drifted) {
    warnings.push(`Ammo recipe for ${mag.displayName} is ${d > 0 ? '+' : ''}${d.toFixed(0)}% off its Ammo Maths value (the SBC recipe is stale) — re-balance it in Ammo Logistics.`);
  }
}

// ==========================================================================
// EVENTS
// ==========================================================================
function amOn(id, ev, fn) { const el = $am(id); if (el) el.addEventListener(ev, fn); }

function amScrollTo(el, block) { if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: block || 'start' }); }
function amOpenMag(sub) {
  selectLogisticsMagazine(sub, true);
  amScrollTo(document.querySelector('#ws-logistics .logistics-ammo-bar'));
}

function setupLogisticsEvents() {
  amOn('logisticsAmmoSelect', 'change', (e) => selectLogisticsMagazine(e.target.value, true));
  amOn('btnResetAmmoLogistics', 'click', () => {
    delete amLevers[selectedLogisticsMagSubtype];
    amStore(AM_LS.levers, amLevers);
    amSyncLeverInputs();
    amAfterLeverEdit();
    showToast('↺ Levers reset to the Shipped values for this magazine.');
  });

  amOn('amAmmoSelect', 'change', (e) => {
    amSetLever(selectedLogisticsMagSubtype, 'ammoKey', e.target.value);
    const mag = amMag(selectedLogisticsMagSubtype);
    amSetChk('chkHybridRound', amLeversFor(mag).hybrid);
    amAfterLeverEdit();
  });
  const multIn = (id, key) => amOn(id, 'input', (e) => { const v = parseFloat(e.target.value); if (v > 0) amEditLever(key, v); });
  multIn('inputSizeMult', 'sizeMult');
  multIn('inputMassMult', 'massMult');
  multIn('inputCraftMult', 'craftMult');
  amOn('inputRoleMult', 'input', (e) => {
    const v = parseFloat(e.target.value);
    if (!(v >= 0)) return;
    amSyncRoleSelect(v);
    amEditLever('roleMult', v);
  });
  amOn('amRoleSelect', 'change', (e) => {
    if (e.target.value === 'custom') { const inp = $am('inputRoleMult'); if (inp && inp.focus) inp.focus(); return; }
    const v = parseFloat(e.target.value);
    amSetVal('inputRoleMult', v);
    amEditLever('roleMult', v);
  });

  // Target values: solve the multiplier from the value typed (4 decimals, like the stored defaults)
  const target = (id, multId, key, base, after) => {
    amOn(id, 'input', (e) => {
      const t = parseFloat(e.target.value), r = amLastResult;
      const b = r ? base(r) : 0;
      if (!(t > 0) || !(b > 0)) return;
      const m = Math.round(t / b * 10000) / 10000;
      if (!(m > 0)) return;
      amSetVal(multId, m);
      if (after) after(m);
      amEditLever(key, m);
    });
    // Leaving the field shows the value the rounding actually lands on
    amOn(id, 'change', () => { if (amLastResult) amSyncTargets(amLastResult, true); });
  };
  target('amTargetVol', 'inputSizeMult', 'sizeMult', (r) => r.baseVol);
  target('amTargetMass', 'inputMassMult', 'massMult', (r) => r.baseMass);
  target('amTargetCraft', 'inputCraftMult', 'craftMult', (r) => r.baseCraft);
  target('amTargetPrice', 'inputRoleMult', 'roleMult', (r) => r.baselinePrice, amSyncRoleSelect);
  amOn('chkHybridRound', 'change', (e) => amEditLever('hybrid', e.target.checked));

  // RU mode (None / Fixed / Auto from price) + fixed quantity
  amOn('amBaseCompRU', 'click', (e) => {
    const btn = e.target.closest ? e.target.closest('[data-ru-mode]') : null;
    if (!btn) return;
    const sub = selectedLogisticsMagSubtype, mag = amMag(sub), mode = btn.getAttribute('data-ru-mode');
    if (mode === 'auto') { amSetLever(sub, 'usesRUs', true); amSetLever(sub, 'rusManual', undefined); }
    if (mode === 'none') { amSetLever(sub, 'usesRUs', false); amSetLever(sub, 'rusManual', undefined); }
    if (mode === 'manual') {
      // Seed the fixed quantity with what auto-from-price would give
      const auto = computeAmmoMaths(mag, Object.assign(amLeversFor(mag), { usesRUs: true }), amEnv()).rus;
      amSetLever(sub, 'usesRUs', false);
      amSetLever(sub, 'rusManual', auto > 0 ? auto : 1);
    }
    amAfterLeverEdit();
  });
  amOn('amBaseCompRU', 'input', (e) => {
    if (!e.target.classList.contains('am-bc-ru-qty')) return;
    const v = parseFloat(e.target.value);
    if (v > 0) amEditLever('rusManual', v); // 0 would switch the mode to None mid-typing; use the None button
  });

  // Per-lever revert (↺ next to each label)
  document.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest ? e.target.closest('.am-lever-reset') : null;
    if (!btn) return;
    e.preventDefault();
    const key = btn.getAttribute('data-lever-reset');
    amSetLever(selectedLogisticsMagSubtype, key, undefined);
    if (key === 'usesRUs') amSetLever(selectedLogisticsMagSubtype, 'rusManual', undefined);
    amSyncLeverInputs();
    amAfterLeverEdit();
  });

  // Balance Matrix links: open the modal at the setting they name
  document.addEventListener('click', (e) => {
    const link = e.target && e.target.closest ? e.target.closest('.am-bm-link') : null;
    if (!link) return;
    e.preventDefault();
    const open = $am('btnBalanceMatrix');
    if (open) open.click();
    const el = $am(link.getAttribute('data-bm-focus'));
    if (!el) return;
    setTimeout(() => {
      amScrollTo(el, 'center');
      if (el.focus && /INPUT|SELECT/.test(el.tagName)) el.focus();
      el.classList.add('am-flash');
      setTimeout(() => el.classList.remove('am-flash'), 1600);
    }, 50);
  });

  // Status chips jump to the section they summarise; filter chips (list + overview share one filter)
  document.addEventListener('click', (e) => {
    const t = e.target && e.target.closest ? e.target : null;
    if (!t) return;
    const dmg = t.closest('[data-am-edit-damage]');
    if (dmg) { amEditDamageInWorkbench(dmg.getAttribute('data-am-edit-damage')); return; }
    const jump = t.closest('[data-am-jump]');
    if (jump) { amScrollTo($am(jump.getAttribute('data-am-jump')), 'center'); return; }
    const chip = t.closest('[data-am-filter]');
    if (chip) {
      amFilter = chip.getAttribute('data-am-filter');
      amRenderFilters();
      amRenderOverview();
    }
  });

  // Recipe editor
  const bc = $am('amBaseComp');
  if (bc) {
    bc.addEventListener('input', (e) => { if (e.target.classList.contains('am-bc-weight')) amEditLever('baseComp', amReadBaseComp()); });
    bc.addEventListener('change', (e) => { if (e.target.classList.contains('am-bc-item')) amEditLever('baseComp', amReadBaseComp()); });
    bc.addEventListener('click', (e) => {
      if (!e.target.classList.contains('am-bc-remove')) return;
      const comp = amReadBaseComp();
      comp.splice(parseInt(e.target.closest('.am-bc-row').getAttribute('data-idx'), 10), 1);
      amSetLever(selectedLogisticsMagSubtype, 'baseComp', comp);
      amRenderBaseComp(amLeversFor(amMag(selectedLogisticsMagSubtype)));
      amAfterLeverEdit();
    });
  }
  amOn('btnAmBaseCompAdd', 'click', () => {
    const add = $am('amBaseCompAdd');
    if (!add || !add.value) return;
    const comp = amReadBaseComp();
    comp.push({ subtype: add.value, weight: 1 });
    amSetLever(selectedLogisticsMagSubtype, 'baseComp', comp);
    amRenderBaseComp(amLeversFor(amMag(selectedLogisticsMagSubtype)));
    amAfterLeverEdit();
  });

  // XML tabs + copy
  document.querySelectorAll('[data-amxml]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-amxml]').forEach((x) => x.classList.toggle('active', x === b));
    const mag = b.getAttribute('data-amxml') === 'mag';
    const bp = $am('codeBlueprintXml'), mx = $am('codeMagazineXml');
    if (bp) bp.style.display = mag ? 'none' : '';
    if (mx) mx.style.display = mag ? '' : 'none';
  }));
  amOn('btnCopyBlueprintXml', 'click', () => {
    const mx = $am('codeMagazineXml');
    const el = mx && mx.style.display !== 'none' ? mx : $am('codeBlueprintXml');
    navigator.clipboard.writeText(el.textContent).then(() => showToast('📋 XML copied to clipboard!'));
  });

  // Weapons table: buttons act, anywhere else on the row pins that weapon for the fire times
  amOn('amWeaponsTable', 'click', (e) => {
    if (!e.target.closest) return;
    const btn = e.target.closest('[data-am-action]');
    if (btn) {
      const action = btn.getAttribute('data-am-action');
      const inv = parseFloat(btn.getAttribute('data-inv'));
      if (action === 'apply') amApplyInWorkbench(btn.getAttribute('data-def'), inv);
      if (action === 'copy') {
        navigator.clipboard.writeText(`InventorySize = ${amNum(inv)}f, // Inventory capacity in kL.`)
          .then(() => showToast('📋 InventorySize line copied!'));
      }
      return;
    }
    const row = e.target.closest('tr[data-def]');
    if (!row) return;
    amPinnedWeapon[selectedLogisticsMagSubtype] = row.getAttribute('data-def');
    updateAmmoLogistics();
  });
  amOn('chkAmThroughput', 'change', (e) => {
    amThroughput = e.target.checked;
    if (amLastResult) amRenderWeapons(amLastResult, amEnv());
  });

  // Magazine stepper, overview (sort + select) and chart
  amOn('btnAmPrev', 'click', () => amStep(-1));
  amOn('btnAmNext', 'click', () => amStep(1));
  amOn('amOverviewTable', 'click', (e) => {
    if (!e.target.closest) return;
    const th = e.target.closest('th[data-sort]');
    if (th) {
      const key = th.getAttribute('data-sort');
      amSort = amSort.key === key ? { key, dir: -amSort.dir } : { key, dir: key === 'name' ? 1 : -1 };
      amRenderOverview();
      return;
    }
    const row = e.target.closest('tr[data-mag]');
    if (row) amOpenMag(row.getAttribute('data-mag'));
  });
  document.querySelectorAll('[data-amchart]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-amchart]').forEach((x) => x.classList.toggle('active', x === b));
    amChartMetric = b.getAttribute('data-amchart');
    amRenderChart();
  }));
  const chart = $am('amChart');
  if (chart) {
    chart.addEventListener('mousemove', (e) => {
      const rect = chart.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const hit = amChartBars.find((b) => y >= b.y0 && y < b.y1);
      chart.title = hit ? `${hit.row.name}: ${amFmt(hit.row.v, 4)} ${AM_CHART_LABELS[amChartMetric]} (click to open)` : '';
      chart.style.cursor = hit ? 'pointer' : 'default';
    });
    chart.addEventListener('click', (e) => {
      const y = e.clientY - chart.getBoundingClientRect().top;
      const hit = amChartBars.find((b) => y >= b.y0 && y < b.y1);
      if (hit) amOpenMag(hit.row.sub);
    });
  }
  window.addEventListener('resize', () => amRenderChart());

  // Footer: changed count shows them in All Magazines; export opens the changed-mags modal
  amOn('hudLogChanged', 'click', () => {
    amFilter = amFleet.some(({ r }) => r.changes.length) ? 'changed' : 'all';
    amRenderFilters();
    amRenderOverview();
    amScrollTo($am('amOverviewTable'), 'center');
  });
  amOn('btnHudAmExport', 'click', amOpenExport);

  // Export modal
  amOn('btnAmExportChanged', 'click', amOpenExport);
  amOn('btnAmExportAllSbc', 'click', amExportAllSbc);
  amOn('btnAmCloseExport', 'click', () => { $am('amExportModal').style.display = 'none'; });
  document.querySelectorAll('[data-amexport]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-amexport]').forEach((x) => x.classList.toggle('active', x === b));
    const mag = b.getAttribute('data-amexport') === 'mag';
    $am('amExportBp').style.display = mag ? 'none' : '';
    $am('amExportMag').style.display = mag ? '' : 'none';
  }));
  const exportActive = () => ($am('amExportMag').style.display === 'none' ? $am('amExportBp') : $am('amExportMag'));
  amOn('btnAmExportCopy', 'click', () => navigator.clipboard.writeText(exportActive().textContent).then(() => showToast('📋 Copied!')));
  amOn('btnAmExportDownload', 'click', () => {
    const el = exportActive();
    amDownload(el.id === 'amExportMag' ? 'AmmoMagazines_changed.sbc' : 'Blueprints_changed.sbc', el.textContent, 'application/xml');
  });

  // Values table + settings (balance matrix modal)
  amOn('amValuesTable', 'input', (e) => {
    if (!e.target.classList.contains('am-value-input')) return;
    const sub = e.target.getAttribute('data-sub');
    const v = parseFloat(e.target.value);
    if (!(v >= 0)) return;
    const def = amValueDefaults()[sub];
    if (def && Math.abs(def.value - v) < 1e-12) delete amValueEdits[sub];
    else amValueEdits[sub] = v;
    amStore(AM_LS.values, amValueEdits);
    e.target.closest('tr').classList.toggle('am-modified-row', amValueEdits[sub] !== undefined);
    updateAmmoLogistics();
  });
  amOn('btnAmResetValues', 'click', () => {
    amValueEdits = {};
    amStore(AM_LS.values, amValueEdits);
    amRenderValuesTable();
    updateAmmoLogistics();
    showToast('↺ Ingot & component values reset to the sheet defaults.');
  });
  amOn('btnAmExportSettings', 'click', () => {
    amDownload('gvk_ammo_settings.json', JSON.stringify(amSettingsSnapshot(), null, 2), 'application/json');
  });
  amOn('btnAmImportSettings', 'click', () => { const f = $am('amImportFile'); if (f) f.click(); });
  amOn('amImportFile', 'change', (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    file.text().then((text) => {
      const data = JSON.parse(text);
      if (!data || data.kind !== 'gvk-ammo-settings') throw new Error('Not a GVK ammo settings file.');
      const n = (o) => Object.keys(o || {}).length;
      if (!confirm(`Import ${n(data.levers)} magazine lever set(s), ${n(data.economyValues)} value edit(s), `
        + `${n(data.balance)} economy setting(s) and ${n(data.autoInventorySize)} auto-InventorySize flag(s)?\n\nThis replaces your current ammo settings.`)) return;
      amImportSettings(data);
      if (typeof syncBalanceMatrixInputs === 'function') syncBalanceMatrixInputs();
      populateLogisticsAmmoDropdown();
      amSyncLeverInputs();
      amAfterLeverEdit();
      showToast('⬆ Ammo settings imported.');
    }).catch((err) => showToast(`⚠️ Import failed: ${err.message}`));
  });

  // Workbench InventorySize link
  amOn('btnUseSuggestedInv', 'click', () => {
    const sub = activeAmmo && activeAmmo.ammoMagazine;
    const s = sub ? suggestedInventorySize(sub, parseInt(($am('wMagsToLoad') || {}).value, 10) || 1) : null;
    if (s && s.suggested > 0) amApplyInventorySize(s.suggested);
  });
  amOn('chkAutoInvSize', 'change', (e) => {
    const defName = activeWeapon && activeWeapon.defName;
    if (!defName) return;
    if (e.target.checked) amAutoInv[defName] = true;
    else delete amAutoInv[defName];
    amStore(AM_LS.autoInv, amAutoInv);
    runWeaponCoreLinter();
    if (e.target.checked) wcAfterEdit('weapon', true);
  });
  amOn('hudWbDrift', 'click', (e) => {
    const sub = e.currentTarget.dataset.mag;
    if (!sub) return;
    switchWorkspace('ws-logistics');
    selectLogisticsMagazine(sub, true);
  });
}
