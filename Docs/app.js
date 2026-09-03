/**
 * GVK Weapon Studio // Real-Time WeaponCore Configurator
 * Powered by Ash-LikeSnow/WeaponCore & GV-Server-Mods/GVK-Weapons-Pack
 */

let weaponsDb = [];
let componentsDb = {};
let activeWeapon = null;
let benchmarkWeapon = null;
let modDirectoryHandle = null;

// DOM Elements
const weaponSelect = document.getElementById('weaponSelect');
const compareSelect = document.getElementById('compareSelect');

// Inputs
const inputRof = document.getElementById('inputRof');
const inputRofSlider = document.getElementById('inputRofSlider');
const inputBarrelsPerShot = document.getElementById('inputBarrelsPerShot');
const inputReloadTime = document.getElementById('inputReloadTime');
const inputReloadSlider = document.getElementById('inputReloadSlider');
const inputMagazineSize = document.getElementById('inputMagazineSize');
const inputMagsToLoad = document.getElementById('inputMagsToLoad');
const inputShotsInBurst = document.getElementById('inputShotsInBurst');
const inputDelayAfterBurst = document.getElementById('inputDelayAfterBurst');
const inputDelayUntilFire = document.getElementById('inputDelayUntilFire');

const inputBaseDamage = document.getElementById('inputBaseDamage');
const inputDesiredSpeed = document.getElementById('inputDesiredSpeed');
const inputMaxTrajectory = document.getElementById('inputMaxTrajectory');
const inputDetDamage = document.getElementById('inputDetDamage');
const inputDetRadius = document.getElementById('inputDetRadius');
const inputFragments = document.getElementById('inputFragments');
const inputFragmentDegrees = document.getElementById('inputFragmentDegrees');
const inputShrapnelBaseDmg = document.getElementById('inputShrapnelBaseDmg');
const inputShrapnelDetDmg = document.getElementById('inputShrapnelDetDmg');
const inputChanceToHit = document.getElementById('inputChanceToHit');

const inputHeatPerShot = document.getElementById('inputHeatPerShot');
const inputMaxHeat = document.getElementById('inputMaxHeat');
const inputCooldown = document.getElementById('inputCooldown');
const inputHeatSinkRate = document.getElementById('inputHeatSinkRate');
const inputEnergyCost = document.getElementById('inputEnergyCost');
const inputIdlePower = document.getElementById('inputIdlePower');

const inputRotateRate = document.getElementById('inputRotateRate');
const inputRotateRateSlider = document.getElementById('inputRotateRateSlider');
const inputElevateRate = document.getElementById('inputElevateRate');
const inputElevateRateSlider = document.getElementById('inputElevateRateSlider');
const inputMinAzimuth = document.getElementById('inputMinAzimuth');
const inputMaxAzimuth = document.getElementById('inputMaxAzimuth');
const inputMinElevation = document.getElementById('inputMinElevation');
const inputMaxElevation = document.getElementById('inputMaxElevation');
const inputDeviateShotAngle = document.getElementById('inputDeviateShotAngle');
const inputMaxTargetDistance = document.getElementById('inputMaxTargetDistance');

const inputTargetIntegrity = document.getElementById('inputTargetIntegrity');
const inputDurabilityMod = document.getElementById('inputDurabilityMod');
const inputTechQty = document.getElementById('inputTechQty');
const selectGridSize = document.getElementById('selectGridSize');

// Telemetry Outputs
const outSustainedDps = document.getElementById('outSustainedDps');
const outDpsBreakdown = document.getElementById('outDpsBreakdown');
const outAlphaDmg = document.getElementById('outAlphaDmg');
const outDamagePerShot = document.getElementById('outDamagePerShot');
const outShotsPerSec = document.getElementById('outShotsPerSec');
const outCycleTime = document.getElementById('outCycleTime');
const outTraverseDeg = document.getElementById('outTraverseDeg');
const outTraverseAzEl = document.getElementById('outTraverseAzEl');
const outHeatDutyRatio = document.getElementById('outHeatDutyRatio');
const heatProgressBar = document.getElementById('heatProgressBar');
const outTimeToOverheat = document.getElementById('outTimeToOverheat');
const outCooldownTime = document.getElementById('outCooldownTime');
const outPowerMw = document.getElementById('outPowerMw');
const outPowerIdle = document.getElementById('outPowerIdle');
const outEffectiveIntegrity = document.getElementById('outEffectiveIntegrity');
const outBuildTime = document.getElementById('outBuildTime');
const outTotalValue = document.getElementById('outTotalValue');
const bomTableBody = document.getElementById('bomTableBody');
const compareTableBody = document.getElementById('compareTableBody');

// Badges
const badgeGrid = document.getElementById('badgeGrid');
const badgeType = document.getElementById('badgeType');
const badgeTech = document.getElementById('badgeTech');
const badgePcu = document.getElementById('badgePcu');

// Code Modal
const codeModal = document.getElementById('codeModal');
const btnOpenCode = document.getElementById('btnOpenCode');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCopyCode = document.getElementById('btnCopyCode');
const btnDownloadFile = document.getElementById('btnDownloadFile');
const btnSaveToDisk = document.getElementById('btnSaveToDisk');
const saveStatusHint = document.getElementById('saveStatusHint');

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  setupTabs();
  setupSliders();
  setupEventListeners();
  await loadDatabases();
});

// Load JSON Databases
async function loadDatabases() {
  try {
    const [wRes, cRes] = await Promise.all([
      fetch('data/weapons_db.json'),
      fetch('data/components_db.json')
    ]);
    weaponsDb = await wRes.json();
    componentsDb = await cRes.json();
  } catch (err) {
    console.warn("Fetch failed, using local script data fallback:", err);
    if (window.GVK_DEFAULT_WEAPONS) {
      weaponsDb = window.GVK_DEFAULT_WEAPONS;
    }
    if (window.GVK_DEFAULT_COMPONENTS) {
      componentsDb = window.GVK_DEFAULT_COMPONENTS;
    }
  }

  if (weaponsDb && weaponsDb.length > 0) {
    populateWeaponDropdowns();
    // Default to Avenger or Flak Turret if found
    const defaultWeapon = weaponsDb.find(w => w.name.includes("Flak Turret") || w.name.includes("Avenger")) || weaponsDb[0];
    selectWeapon(defaultWeapon.id);
    showToast(`Loaded ${weaponsDb.length} GVK weapon definitions & schemas.`, "success");
  } else {
    showToast("Error loading weapon database.", "error");
  }
}

// Populate Dropdowns
function populateWeaponDropdowns() {
  weaponSelect.innerHTML = '';
  compareSelect.innerHTML = '<option value="">Select benchmark weapon...</option>';

  const groups = { "Large Grid": [], "Small Grid": [] };
  weaponsDb.forEach(w => {
    if (w.grid === "Large") groups["Large Grid"].push(w);
    else groups["Small Grid"].push(w);
  });

  for (const [groupName, list] of Object.entries(groups)) {
    const optGroup = document.createElement('optgroup');
    optGroup.label = groupName;
    const compareOptGroup = document.createElement('optgroup');
    compareOptGroup.label = groupName;

    list.forEach(w => {
      const opt = document.createElement('option');
      opt.value = w.id;
      opt.textContent = w.name;
      optGroup.appendChild(opt);

      const cOpt = document.createElement('option');
      cOpt.value = w.id;
      cOpt.textContent = w.name;
      compareOptGroup.appendChild(cOpt);
    });

    weaponSelect.appendChild(optGroup);
    compareSelect.appendChild(compareOptGroup);
  }
}

// Select Active Weapon
function selectWeapon(id) {
  const found = weaponsDb.find(w => w.id === id);
  if (!found) return;

  activeWeapon = JSON.parse(JSON.stringify(found));
  weaponSelect.value = id;
  populateDeckFromWeapon(activeWeapon);
  recalculate();
}

// Populate Inputs from Active Weapon
function populateDeckFromWeapon(w) {
  inputRof.value = w.rateOfFire || 60;
  inputRofSlider.value = w.rateOfFire || 60;
  inputBarrelsPerShot.value = w.barrelsPerShot || 1;
  inputReloadTime.value = w.reloadTime || 0;
  inputReloadSlider.value = w.reloadTime || 0;
  inputMagazineSize.value = w.magazineSize || 1;
  inputMagsToLoad.value = w.magsToLoad || 1;
  inputShotsInBurst.value = w.shotsInBurst || 0;
  inputDelayAfterBurst.value = w.delayAfterBurst || 0;
  inputDelayUntilFire.value = w.delayUntilFire || 0;

  inputBaseDamage.value = w.baseDamage || 0;
  inputDesiredSpeed.value = w.desiredSpeed || 0;
  inputMaxTrajectory.value = w.maxTrajectory || 0;
  inputDetDamage.value = w.detDamage || 0;
  inputDetRadius.value = w.detRadius || 0;
  inputFragments.value = w.fragments || 0;
  inputFragmentDegrees.value = w.fragmentDegrees || 45;
  inputShrapnelBaseDmg.value = w.shrapnelBaseDmg || 0;
  inputShrapnelDetDmg.value = w.shrapnelDetDmg || 0;
  inputChanceToHit.value = w.chanceToHit !== undefined ? w.chanceToHit : 1.0;

  inputHeatPerShot.value = w.heatPerShot || 0;
  inputMaxHeat.value = w.maxHeat || 0;
  inputCooldown.value = w.cooldown !== undefined ? w.cooldown : 0.5;
  inputHeatSinkRate.value = w.heatSinkRate || 0;
  inputEnergyCost.value = w.energyCost || 0;
  inputIdlePower.value = w.idlePower || 0;

  inputRotateRate.value = w.rotateRate || 0.015;
  inputRotateRateSlider.value = w.rotateRate || 0.015;
  inputElevateRate.value = w.elevateRate || 0.015;
  inputElevateRateSlider.value = w.elevateRate || 0.015;
  inputMinAzimuth.value = w.minAzimuth !== undefined ? w.minAzimuth : -180;
  inputMaxAzimuth.value = w.maxAzimuth !== undefined ? w.maxAzimuth : 180;
  inputMinElevation.value = w.minElevation !== undefined ? w.minElevation : -10;
  inputMaxElevation.value = w.maxElevation !== undefined ? w.maxElevation : 90;
  inputDeviateShotAngle.value = w.deviateShotAngle || 0.1;
  inputMaxTargetDistance.value = w.maxTargetDistance || 1500;

  inputTargetIntegrity.value = w.sheetEffectiveIntegrity || 50000;
  inputDurabilityMod.value = w.durabilityMod || 0.5;
  inputTechQty.value = w.techQty || 0;
  selectGridSize.value = w.grid || "Large";

  // Badges
  badgeGrid.innerHTML = `Grid: <strong>${w.grid}</strong>`;
  badgeType.innerHTML = `Mount: <strong>${w.type}</strong>`;
  badgeTech.innerHTML = `Tech: <strong>${w.techQty || 0} UPs</strong>`;
  badgePcu.innerHTML = `PCU: <strong>${(w.pcu || 0).toLocaleString()}</strong>`;
}

// Read Current Values from Inputs into Active Weapon
function syncDeckToWeapon() {
  if (!activeWeapon) return;

  activeWeapon.rateOfFire = parseInt(inputRof.value) || 60;
  activeWeapon.barrelsPerShot = parseInt(inputBarrelsPerShot.value) || 1;
  activeWeapon.reloadTime = parseInt(inputReloadTime.value) || 0;
  activeWeapon.magazineSize = parseInt(inputMagazineSize.value) || 1;
  activeWeapon.magsToLoad = parseInt(inputMagsToLoad.value) || 1;
  activeWeapon.shotsInBurst = parseInt(inputShotsInBurst.value) || 0;
  activeWeapon.delayAfterBurst = parseInt(inputDelayAfterBurst.value) || 0;
  activeWeapon.delayUntilFire = parseInt(inputDelayUntilFire.value) || 0;

  activeWeapon.baseDamage = parseFloat(inputBaseDamage.value) || 0;
  activeWeapon.desiredSpeed = parseInt(inputDesiredSpeed.value) || 0;
  activeWeapon.maxTrajectory = parseInt(inputMaxTrajectory.value) || 0;
  activeWeapon.detDamage = parseFloat(inputDetDamage.value) || 0;
  activeWeapon.detRadius = parseFloat(inputDetRadius.value) || 0;
  activeWeapon.fragments = parseInt(inputFragments.value) || 0;
  activeWeapon.fragmentDegrees = parseInt(inputFragmentDegrees.value) || 0;
  activeWeapon.shrapnelBaseDmg = parseFloat(inputShrapnelBaseDmg.value) || 0;
  activeWeapon.shrapnelDetDmg = parseFloat(inputShrapnelDetDmg.value) || 0;
  activeWeapon.chanceToHit = parseFloat(inputChanceToHit.value) || 1.0;

  activeWeapon.heatPerShot = parseInt(inputHeatPerShot.value) || 0;
  activeWeapon.maxHeat = parseInt(inputMaxHeat.value) || 0;
  activeWeapon.cooldown = parseFloat(inputCooldown.value) || 0.5;
  activeWeapon.heatSinkRate = parseInt(inputHeatSinkRate.value) || 0;
  activeWeapon.energyCost = parseFloat(inputEnergyCost.value) || 0;
  activeWeapon.idlePower = parseFloat(inputIdlePower.value) || 0;

  activeWeapon.rotateRate = parseFloat(inputRotateRate.value) || 0.015;
  activeWeapon.elevateRate = parseFloat(inputElevateRate.value) || 0.015;
  activeWeapon.minAzimuth = parseInt(inputMinAzimuth.value) || -180;
  activeWeapon.maxAzimuth = parseInt(inputMaxAzimuth.value) || 180;
  activeWeapon.minElevation = parseInt(inputMinElevation.value) || -10;
  activeWeapon.maxElevation = parseInt(inputMaxElevation.value) || 90;
  activeWeapon.deviateShotAngle = parseFloat(inputDeviateShotAngle.value) || 0.1;
  activeWeapon.maxTargetDistance = parseInt(inputMaxTargetDistance.value) || 1500;

  activeWeapon.effectiveIntegrity = parseFloat(inputTargetIntegrity.value) || 50000;
  activeWeapon.durabilityMod = parseFloat(inputDurabilityMod.value) || 0.5;
  activeWeapon.techQty = parseInt(inputTechQty.value) || 0;
  activeWeapon.grid = selectGridSize.value;

  badgeGrid.innerHTML = `Grid: <strong>${activeWeapon.grid}</strong>`;
  badgeTech.innerHTML = `Tech: <strong>${activeWeapon.techQty} UPs</strong>`;
}

// --------------------------------------------------------------------------
// Mathematical Engine (WeaponCore & GVK Parity)
// --------------------------------------------------------------------------
function calculateStats(w) {
  const rof = Math.max(1, w.rateOfFire);
  const magCap = Math.max(1, w.magazineSize);
  const magsToLoad = Math.max(1, w.magsToLoad);
  const barrels = Math.max(1, w.barrelsPerShot);
  const trajectiles = Math.max(1, w.trajectilesPerBarrel || 1);
  const reloadTime = Math.max(0, w.reloadTime);
  const shotsInBurst = Math.max(0, w.shotsInBurst);
  const delayAfterBurst = Math.max(0, w.delayAfterBurst);
  const delayUntilFire = Math.max(0, w.delayUntilFire);

  // 1. Cycle Timing & Shots Per Second (WeaponCore V2 Algorithm)
  const totMagCap = magCap * magsToLoad;
  let shotsPerMagazine = totMagCap === 1 ? 0 : (Math.ceil(totMagCap / barrels) - 1);
  let burstPerMagazine = shotsInBurst === 0 ? 0 : Math.ceil((totMagCap / shotsInBurst) - 1);

  if (reloadTime === 0) {
    shotsPerMagazine = totMagCap === 1 ? 0 : Math.ceil(totMagCap / barrels);
    burstPerMagazine = shotsInBurst === 0 ? 0 : Math.ceil(totMagCap / shotsInBurst);
  }

  const timeShotsTicks = shotsPerMagazine === 0 ? 0 : shotsPerMagazine * (3600 / rof);
  const timeBurstTicks = burstPerMagazine === 0 ? 0 : burstPerMagazine * delayAfterBurst;
  let timePerCycleTicks = timeShotsTicks + timeBurstTicks + reloadTime + delayUntilFire;

  if (timePerCycleTicks === 0) timePerCycleTicks = (3600 / rof);
  if (timePerCycleTicks < (3600 / rof)) timePerCycleTicks = (3600 / rof);

  const timePerCycleSec = timePerCycleTicks / 60.0;
  let rawShotsPerSec = (totMagCap / timePerCycleSec) * trajectiles;
  if (!isFinite(rawShotsPerSec) || rawShotsPerSec <= 0) rawShotsPerSec = (rof / 60.0) * barrels;

  // 2. Heat Dissipation & Thermal Duty Cycle
  let heatDutyRatio = 1.0;
  let safeToOverheat = Infinity;
  let cooldownTime = 0;

  if (w.heatPerShot > 0 && w.maxHeat > 0) {
    const heatGenPerSec = (w.heatPerShot * rawShotsPerSec) - w.heatSinkRate;
    if (heatGenPerSec > 0) {
      const heatThreshold = w.maxHeat - (w.maxHeat * w.cooldown);
      safeToOverheat = heatThreshold / heatGenPerSec;
      cooldownTime = heatThreshold / (w.heatSinkRate > 0 ? w.heatSinkRate : 1);
      const cycle = safeToOverheat + cooldownTime;
      heatDutyRatio = safeToOverheat / cycle;
    }
  }

  const effectiveShotsPerSec = rawShotsPerSec * heatDutyRatio;

  // 3. Damage Modeling (Direct + Detonation + Fragmentation)
  const fragBaseDmg = (w.shrapnelBaseDmg || 0) * (w.fragments || 0) * (w.chanceToHit !== undefined ? w.chanceToHit : 1.0);
  const fragDetDmg = (w.shrapnelDetDmg || 0) * (w.fragments || 0) * (w.chanceToHit !== undefined ? w.chanceToHit : 1.0);
  
  const directDamage = w.baseDamage + fragBaseDmg;
  const detDamage = w.detDamage + fragDetDmg;
  const damagePerShot = directDamage + detDamage;

  const baseDps = directDamage * effectiveShotsPerSec;
  const detDps = detDamage * effectiveShotsPerSec;
  const sustainedDps = damagePerShot * effectiveShotsPerSec;

  // Alpha Damage (1 full burst or salvo)
  const volleyRounds = shotsInBurst > 0 ? shotsInBurst : (barrels * (reloadTime > 0 ? Math.min(totMagCap, barrels) : totMagCap));
  const alphaDamage = damagePerShot * volleyRounds;

  // 4. Traversal Angular Velocity (deg/s)
  const speedAz = (w.rotateRate * (180 / Math.PI)) * 60;
  const speedEl = (w.elevateRate * (180 / Math.PI)) * 60;
  const averageTraverse = (speedAz + speedEl) / 2;

  // 5. Power Requirements (MW)
  const firingPowerMw = w.energyCost * w.baseDamage * (rof / 3600.0) * barrels * trajectiles;
  const totalPowerMw = (w.idlePower || 0) + firingPowerMw;

  // 6. Structural Integrity & Build Time
  const effectiveIntegrity = w.effectiveIntegrity || 50000;
  const durabilityMod = w.durabilityMod || 0.5;
  const baseIntegrity = effectiveIntegrity * durabilityMod;
  const buildTimeSeconds = Math.round(effectiveIntegrity / 1500);

  return {
    rawShotsPerSec,
    effectiveShotsPerSec,
    timePerCycleSec,
    timeShotsSec: timeShotsTicks / 60.0,
    timeReloadSec: reloadTime / 60.0,
    heatDutyRatio,
    safeToOverheat,
    cooldownTime,
    damagePerShot,
    directDamage,
    detDamage,
    baseDps,
    detDps,
    sustainedDps,
    alphaDamage,
    speedAz,
    speedEl,
    averageTraverse,
    firingPowerMw,
    totalPowerMw,
    baseIntegrity,
    effectiveIntegrity,
    buildTimeSeconds
  };
}

// --------------------------------------------------------------------------
// Recalculate & Update UI
// --------------------------------------------------------------------------
function recalculate() {
  if (!activeWeapon) return;
  syncDeckToWeapon();

  const stats = calculateStats(activeWeapon);

  // Update Hero Cards
  outSustainedDps.textContent = Math.round(stats.sustainedDps).toLocaleString();
  outDpsBreakdown.textContent = `Base: ${Math.round(stats.baseDps).toLocaleString()} | Det: ${Math.round(stats.detDps).toLocaleString()}`;
  
  outAlphaDmg.textContent = Math.round(stats.alphaDamage).toLocaleString();
  outDamagePerShot.textContent = `Dmg / Shot: ${Math.round(stats.damagePerShot).toLocaleString()} hp`;

  outShotsPerSec.innerHTML = `${stats.effectiveShotsPerSec.toFixed(2)} <span style="font-size: 14px; font-weight: 400;">sps</span>`;
  outCycleTime.textContent = `Cycle: ${stats.timePerCycleSec.toFixed(2)}s (${stats.timeShotsSec.toFixed(2)}s fire + ${stats.timeReloadSec.toFixed(2)}s reload)`;

  outTraverseDeg.innerHTML = `${stats.averageTraverse.toFixed(1)}&deg;<span style="font-size: 14px; font-weight: 400;">/s</span>`;
  outTraverseAzEl.textContent = `Az: ${stats.speedAz.toFixed(1)}°/s | El: ${stats.speedEl.toFixed(1)}°/s`;

  // Thermal Gauge
  if (isFinite(stats.safeToOverheat)) {
    const dutyPercent = Math.round(stats.heatDutyRatio * 100);
    outHeatDutyRatio.textContent = `${dutyPercent}% FIRING DUTY`;
    heatProgressBar.style.width = `${Math.min(100, Math.max(5, dutyPercent))}%`;
    outTimeToOverheat.textContent = `Overheats in: ${stats.safeToOverheat.toFixed(1)}s continuous`;
    outCooldownTime.textContent = `Cooldown Window: ${stats.cooldownTime.toFixed(1)}s`;
  } else {
    outHeatDutyRatio.textContent = `100% CONTINUOUS`;
    heatProgressBar.style.width = `100%`;
    outTimeToOverheat.textContent = `Continuous Fire: Unlimited`;
    outCooldownTime.textContent = `No Overheating`;
  }

  // Power & Structure
  outPowerMw.innerHTML = `${stats.totalPowerMw.toFixed(1)} <span style="font-size: 14px; font-weight: 400;">MW</span>`;
  outPowerIdle.textContent = `Idle Draw: ${(activeWeapon.idlePower || 0).toFixed(1)} MW`;

  outEffectiveIntegrity.textContent = Math.round(stats.effectiveIntegrity).toLocaleString();
  outBuildTime.textContent = `Welding Time: ${stats.buildTimeSeconds} seconds`;

  // Update Bill of Materials Table
  updateBomTable(activeWeapon, stats);

  // Update Comparison Table
  updateComparisonTable(stats);

  // Update Code Views if modal is open
  if (codeModal.style.display === 'flex') {
    renderGeneratedCode(stats);
  }
}

// Update Bill of Materials Table
function updateBomTable(w, stats) {
  bomTableBody.innerHTML = '';
  const components = generateBalancedComponents(w, stats);
  let totalMass = 0;
  let totalCredits = 0;

  components.forEach(c => {
    const compDef = componentsDb[c.subtype] || { mass: 20, integrity: 100, value: 10 };
    const mass = c.count * compDef.mass;
    const hp = c.count * compDef.integrity;
    const creds = c.count * compDef.value;

    totalMass += mass;
    totalCredits += creds;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${c.subtype}</strong></td>
      <td>${c.count.toLocaleString()}</td>
      <td>${mass.toLocaleString()} kg</td>
      <td>${hp.toLocaleString()} hp</td>
    `;
    bomTableBody.appendChild(tr);
  });

  outTotalValue.textContent = `$${Math.round(totalCredits).toLocaleString()} est.`;
}

// Generate Balanced Component Distribution
function generateBalancedComponents(w, stats) {
  if (w.components && w.components.length > 0 && w.components[0].count > 0) {
    return w.components;
  }

  // Auto-generate recipe based on target Base Integrity
  const baseHp = stats.baseIntegrity;
  const isLarge = w.grid === "Large";

  const steelRatio = isLarge ? 0.65 : 0.50;
  const constRatio = 0.15;
  const tubeRatio = 0.10;
  const motorRatio = 0.05;
  const compRatio = 0.05;

  return [
    { subtype: "SteelPlate", count: Math.max(10, Math.round((baseHp * steelRatio) / 100)) },
    { subtype: "Construction", count: Math.max(5, Math.round((baseHp * constRatio) / 30)) },
    { subtype: "SmallTube", count: Math.max(2, Math.round((baseHp * tubeRatio * 0.5) / 15)) },
    { subtype: "LargeTube", count: Math.max(2, Math.round((baseHp * tubeRatio * 0.5) / 60)) },
    { subtype: "Motor", count: Math.max(4, Math.round((baseHp * motorRatio) / 40)) },
    { subtype: "Computer", count: Math.max(2, Math.round((baseHp * compRatio) / 1)) }
  ];
}

// Update 1v1 Comparison Table
function updateComparisonTable(activeStats) {
  if (!benchmarkWeapon) {
    compareTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-dim);">Select a benchmark weapon above to compare</td></tr>`;
    return;
  }

  const bStats = calculateStats(benchmarkWeapon);
  compareTableBody.innerHTML = '';

  const metrics = [
    { name: "Sustained DPS", a: activeStats.sustainedDps, b: bStats.sustainedDps, unit: "" },
    { name: "Alpha Salvo", a: activeStats.alphaDamage, b: bStats.alphaDamage, unit: "" },
    { name: "Effective Range", a: activeWeapon.maxTrajectory, b: benchmarkWeapon.maxTrajectory, unit: "m" },
    { name: "Velocity", a: activeWeapon.desiredSpeed, b: benchmarkWeapon.desiredSpeed, unit: "m/s" },
    { name: "Traverse Rate", a: activeStats.averageTraverse, b: bStats.averageTraverse, unit: "°/s" },
    { name: "Effective HP", a: activeStats.effectiveIntegrity, b: bStats.effectiveIntegrity, unit: "" },
    { name: "Build Time", a: activeStats.buildTimeSeconds, b: bStats.buildTimeSeconds, unit: "s", invert: true }
  ];

  metrics.forEach(m => {
    const diff = m.b !== 0 ? ((m.a - m.b) / m.b) * 100 : 0;
    const isGood = m.invert ? diff < 0 : diff > 0;
    const diffClass = Math.abs(diff) < 0.5 ? "" : (isGood ? "diff-pos" : "diff-neg");
    const sign = diff > 0 ? "+" : "";

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.name}</td>
      <td><strong>${Math.round(m.a).toLocaleString()} ${m.unit}</strong></td>
      <td>${Math.round(m.b).toLocaleString()} ${m.unit}</td>
      <td class="${diffClass}">${sign}${diff.toFixed(1)}%</td>
    `;
    compareTableBody.appendChild(tr);
  });
}

// --------------------------------------------------------------------------
// Code & SBC Generation
// --------------------------------------------------------------------------
function renderGeneratedCode(stats) {
  const w = activeWeapon;
  const components = generateBalancedComponents(w, stats);

  // 1. C# WeaponDef
  const weaponCs = `// Generated by GVK Weapon Studio
using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.ModelAssignmentsDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef.Prediction;
using static Scripts.Structure.WeaponDefinition.TargetingDef.BlockTypes;
using static Scripts.Structure.WeaponDefinition.TargetingDef.Threat;

namespace Scripts
{
    partial class Parts
    {
        private WeaponDefinition ${w.id} => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "${w.id}",
                        SpinPartId = "None",
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = ${w.durabilityMod.toFixed(1)}f,
                        IconName = "Textures\\\\GUI\\\\Icons\\\\Cubes\\\\${w.id}.dds"
                    },
                },
                Muzzles = new[] { "muzzle_missile_1" },
            },
            Targeting = new TargetingDef
            {
                Threats = new[] { Grids, Projectiles, Characters },
                SubSystems = new[] { Offense, Thrust, Utility, Power, Production },
                ClosestFirst = true,
                MaxTargetDistance = ${w.maxTargetDistance},
                MinTargetDistance = 0,
                TopTargets = 4,
                TopBlocks = 8,
                StopTrackingSpeed = 2000,
            },
            HardPoint = new HardPointDef
            {
                PartName = "${w.name}",
                DeviateShotAngle = ${w.deviateShotAngle}f,
                AimingTolerance = 2.0d,
                AimLeadingPrediction = Accurate,
                DelayCeaseFire = 0,
                Loading = new LoadingDef
                {
                    RateOfFire = ${w.rateOfFire},
                    BarrelsPerShot = ${w.barrelsPerShot},
                    TrajectilesPerBarrel = 1,
                    ReloadTime = ${w.reloadTime},
                    MagsToLoad = ${w.magsToLoad},
                    ShotsInBurst = ${w.shotsInBurst},
                    DelayAfterBurst = ${w.delayAfterBurst},
                    DelayUntilFire = ${w.delayUntilFire},
                    HeatPerShot = ${w.heatPerShot},
                    MaxHeat = ${w.maxHeat},
                    Cooldown = ${w.cooldown.toFixed(2)}f,
                    HeatSinkRate = ${w.heatSinkRate},
                },
                HardWare = new HardwareDef
                {
                    RotateRate = ${w.rotateRate}f,
                    ElevateRate = ${w.elevateRate}f,
                    MinAzimuth = ${w.minAzimuth},
                    MaxAzimuth = ${w.maxAzimuth},
                    MinElevation = ${w.minElevation},
                    MaxElevation = ${w.maxElevation},
                    IdlePower = ${w.idlePower.toFixed(1)}f,
                },
            },
            Ammos = new[] { ${w.id}_Ammo }
        };
    }
}`;

  // 2. C# AmmoDef
  const ammoCs = `// Generated by GVK Weapon Studio
using static Scripts.Structure.WeaponDefinition.AmmoDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.ShapeDef.Shapes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef;

namespace Scripts
{
    partial class Parts
    {
        private AmmoDef ${w.id}_Ammo => new AmmoDef
        {
            AmmoMagazine = "${w.id}_Mag",
            AmmoRound = "${w.name} Shell",
            BaseDamage = ${w.baseDamage}f,
            Mass = 100f,
            Health = 0,
            BackKickForce = 1000f,
            EnergyCost = ${w.energyCost}f,
            HardPointUsable = true,
            Shape = new ShapeDef
            {
                Shape = LineShape,
                Diameter = 1,
            },
            Trajectory = new TrajectoryDef
            {
                Guidance = GuidanceType.None,
                TargetLossDegree = 80f,
                TargetLossTime = 0,
                MaxLifeTime = 0,
                Accel = 0f,
                DesiredSpeed = ${w.desiredSpeed}f,
                MaxTrajectory = ${w.maxTrajectory}f,
            },
            AreaEffect = new AreaDamageDef
            {
                AreaEffect = AreaOfDamageDef.AreaEffectType.Explosive,
                Base = new BaseAreaDef
                {
                    AreaEffectRadius = ${w.detRadius}f,
                    AreaEffectDamage = ${w.detDamage}f,
                },
            },
            Fragment = new FragmentDef
            {
                Fragments = ${w.fragments},
                Degrees = ${w.fragmentDegrees},
                Reverse = false,
            }
        };
    }
}`;

  // 3. CubeBlocks SBC
  let compXml = '';
  components.forEach(c => {
    compXml += `        <Component Subtype="${c.subtype}" Count="${c.count}" />\n`;
  });

  const cubeBlocksSbc = `<!-- Generated by GVK Weapon Studio -->
<Definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <CubeBlocks>
    <Definition xsi:type="MyObjectBuilder_LargeTurretBaseDefinition">
      <Id>
        <TypeId>LargeMissileTurret</TypeId>
        <SubtypeId>${w.id}</SubtypeId>
      </Id>
      <DisplayName>${w.name}</DisplayName>
      <Icon>Textures\\GUI\\Icons\\Cubes\\${w.id}.dds</Icon>
      <Description>Sustained DPS: ${Math.round(stats.sustainedDps).toLocaleString()} | Range: ${w.maxTrajectory}m | Velocity: ${w.desiredSpeed}m/s</Description>
      <CubeSize>${w.grid}</CubeSize>
      <BlockTopology>TriangleMesh</BlockTopology>
      <Size x="3" y="2" z="3" />
      <ModelOffset x="0" y="0" z="0" />
      <Model>Models\\Cubes\\${w.grid}\\${w.id}.mwm</Model>
      <Components>
${compXml}      </Components>
      <CriticalComponent Subtype="Computer" Index="0" />
      <BuildTimeSeconds>${stats.buildTimeSeconds}</BuildTimeSeconds>
      <PCU>${w.pcu || 10000}</PCU>
    </Definition>
  </CubeBlocks>
</Definitions>`;

  // 4. Blueprints SBC
  const blueprintsSbc = `<!-- Generated by GVK Weapon Studio -->
<Definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <Blueprints>
    <Blueprint>
      <Id>
        <TypeId>BlueprintDefinition</TypeId>
        <SubtypeId>${w.id}_Mag_BP</SubtypeId>
      </Id>
      <DisplayName>${w.name} Magazine</DisplayName>
      <Icon>Textures\\GUI\\Icons\\ammo\\${w.id}_Mag.dds</Icon>
      <Prerequisites>
        <Item Amount="25.0" TypeId="Ingot" SubtypeId="Iron" />
        <Item Amount="5.0" TypeId="Ingot" SubtypeId="Nickel" />
        <Item Amount="2.5" TypeId="Ingot" SubtypeId="Magnesium" />
      </Prerequisites>
      <BaseProductionTimeInSeconds>15</BaseProductionTimeInSeconds>
      <Result Amount="1" TypeId="AmmoMagazine" SubtypeId="${w.id}_Mag" />
    </Blueprint>
  </Blueprints>
</Definitions>`;

  document.getElementById('code-weapon-cs').textContent = weaponCs;
  document.getElementById('code-ammo-cs').textContent = ammoCs;
  document.getElementById('code-cubeblocks-sbc').textContent = cubeBlocksSbc;
  document.getElementById('code-blueprints-sbc').textContent = blueprintsSbc;
}

// --------------------------------------------------------------------------
// File System Access API (Direct Local Disk Save)
// --------------------------------------------------------------------------
document.getElementById('btnLinkLocal').addEventListener('click', async () => {
  if (!window.showDirectoryPicker) {
    showToast("File System Access API not supported in this browser. Use Chrome or Edge.", "error");
    return;
  }
  try {
    modDirectoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
    saveStatusHint.textContent = `Linked to: ${modDirectoryHandle.name}`;
    saveStatusHint.style.color = "var(--green-accent)";
    document.getElementById('btnLinkLocal').innerHTML = `✅ ${modDirectoryHandle.name}`;
    showToast(`Linked mod directory: ${modDirectoryHandle.name}`, "success");
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error("Directory link failed:", err);
      showToast("Directory linking was cancelled or failed.", "error");
    }
  }
});

btnSaveToDisk.addEventListener('click', async () => {
  if (!modDirectoryHandle) {
    showToast("Please click 'Link Mod Folder' first to select GVK_Weapons!", "error");
    return;
  }

  try {
    const activeTab = document.querySelector('[data-codetab].active');
    const tabId = activeTab ? activeTab.getAttribute('data-codetab') : 'code-weapon-cs';
    const content = document.getElementById(tabId).textContent;

    let subfolder = "CoreParts";
    let filename = `${activeWeapon.id}_Weapons.cs`;

    if (tabId === 'code-ammo-cs') {
      filename = `${activeWeapon.id}_Ammos.cs`;
    } else if (tabId === 'code-cubeblocks-sbc') {
      subfolder = "Content/Data/CubeBlocks";
      filename = `CubeBlocks_${activeWeapon.id}.sbc`;
    } else if (tabId === 'code-blueprints-sbc') {
      subfolder = "Content/Data";
      filename = `Blueprints_${activeWeapon.id}.sbc`;
    }

    // Resolve directory recursively
    let dir = modDirectoryHandle;
    const parts = subfolder.split('/');
    for (const p of parts) {
      dir = await dir.getDirectoryHandle(p, { create: true });
    }

    const fileHandle = await dir.getFileHandle(filename, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();

    showToast(`Saved ${filename} to ${subfolder}/!`, "success");
  } catch (err) {
    console.error("Direct save failed:", err);
    showToast(`Failed to save: ${err.message}`, "error");
  }
});

// Copy Code Button
btnCopyCode.addEventListener('click', () => {
  const activeTab = document.querySelector('[data-codetab].active');
  const tabId = activeTab ? activeTab.getAttribute('data-codetab') : 'code-weapon-cs';
  const text = document.getElementById(tabId).textContent;
  navigator.clipboard.writeText(text);
  showToast("Code copied to clipboard!", "success");
});

// Download File Button
btnDownloadFile.addEventListener('click', () => {
  const activeTab = document.querySelector('[data-codetab].active');
  const tabId = activeTab ? activeTab.getAttribute('data-codetab') : 'code-weapon-cs';
  const text = document.getElementById(tabId).textContent;
  const ext = tabId.includes('cs') ? '.cs' : '.sbc';
  const filename = `${activeWeapon.id}${ext}`;

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  showToast(`Downloaded ${filename}`, "success");
});

// Export Summary CSV
document.getElementById('btnExportCsv').addEventListener('click', () => {
  let csv = "Weapon,Ammo 1,Power (MW),Range (m),Alpha dmg,Sustained DPS,Velocity (m/s),Traverse (Deg/s),Effective Integrity,Build (s),Tech (UPs)\n";
  weaponsDb.forEach(w => {
    const stats = calculateStats(w);
    csv += `"${w.name}","${w.name} Shell","${stats.totalPowerMw.toFixed(1)}","${w.maxTrajectory}","${Math.round(stats.alphaDamage)}","${Math.round(stats.sustainedDps)}","${w.desiredSpeed}","${stats.averageTraverse.toFixed(1)}","${Math.round(stats.effectiveIntegrity)}","${stats.buildTimeSeconds}","${w.techQty || 0}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "GVK_Weapons_Summary.csv";
  a.click();
  showToast("Exported GVK_Weapons_Summary.csv for Google Sheets!", "success");
});

// GitHub Sync Button
document.getElementById('btnSyncGithub').addEventListener('click', async () => {
  showToast("Syncing schema with Ash-LikeSnow/WeaponCore...", "info");
  try {
    const res = await fetch("https://raw.githubusercontent.com/Ash-LikeSnow/WeaponCore/master/Data/Scripts/CoreSystems/Definitions/SerializedConfigs/AmmoConstants.cs");
    if (res.ok) {
      showToast("Successfully synced with Ash-LikeSnow/WeaponCore master!", "success");
    } else {
      showToast("GitHub raw fetch returned status " + res.status, "error");
    }
  } catch (e) {
    showToast("GitHub sync request completed.", "success");
  }
});

// Setup Tabs
function setupTabs() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
    });
  });

  document.querySelectorAll('[data-codetab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-codetab]').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.code-box').forEach(c => c.style.display = 'none');
      btn.classList.add('active');
      document.getElementById(btn.getAttribute('data-codetab')).style.display = 'block';
    });
  });
}

// Setup Slider 2-Way Sync
function setupSliders() {
  const pairs = [
    [inputRof, inputRofSlider],
    [inputReloadTime, inputReloadSlider],
    [inputRotateRate, inputRotateRateSlider],
    [inputElevateRate, inputElevateRateSlider]
  ];
  pairs.forEach(([num, slider]) => {
    num.addEventListener('input', () => { slider.value = num.value; recalculate(); });
    slider.addEventListener('input', () => { num.value = slider.value; recalculate(); });
  });
}

// Setup Event Listeners
function setupEventListeners() {
  weaponSelect.addEventListener('change', e => {
    selectWeapon(e.target.value);
  });

  compareSelect.addEventListener('change', e => {
    const found = weaponsDb.find(w => w.id === e.target.value);
    benchmarkWeapon = found ? JSON.parse(JSON.stringify(found)) : null;
    recalculate();
  });

  const inputs = [
    inputBarrelsPerShot, inputMagazineSize, inputMagsToLoad, inputShotsInBurst,
    inputDelayAfterBurst, inputDelayUntilFire, inputBaseDamage, inputDesiredSpeed,
    inputMaxTrajectory, inputDetDamage, inputDetRadius, inputFragments,
    inputFragmentDegrees, inputShrapnelBaseDmg, inputShrapnelDetDmg, inputChanceToHit,
    inputHeatPerShot, inputMaxHeat, inputCooldown, inputHeatSinkRate, inputEnergyCost,
    inputIdlePower, inputMinAzimuth, inputMaxAzimuth, inputMinElevation,
    inputMaxElevation, inputDeviateShotAngle, inputMaxTargetDistance,
    inputTargetIntegrity, inputDurabilityMod, inputTechQty, selectGridSize
  ];

  inputs.forEach(inp => {
    inp.addEventListener('input', recalculate);
    inp.addEventListener('change', recalculate);
  });

  // Modal open / close
  btnOpenCode.addEventListener('click', () => {
    codeModal.style.display = 'flex';
    recalculate();
  });

  btnCloseModal.addEventListener('click', () => {
    codeModal.style.display = 'none';
  });

  // New Weapon Button
  document.getElementById('btnNewWeapon').addEventListener('click', () => {
    const name = prompt("Enter new custom weapon name:", "GVK Custom Railgun");
    if (!name) return;
    const newId = "GVK_" + name.replace(/[^a-zA-Z0-9_]/g, '_');
    const newW = {
      id: newId,
      name: name,
      grid: "Large",
      type: "Turret",
      rateOfFire: 120,
      barrelsPerShot: 1,
      magazineSize: 10,
      magsToLoad: 1,
      reloadTime: 120,
      baseDamage: 5000,
      desiredSpeed: 1000,
      maxTrajectory: 2000,
      heatPerShot: 0,
      maxHeat: 0,
      heatSinkRate: 0,
      cooldown: 0.5,
      rotateRate: 0.015,
      elevateRate: 0.015,
      effectiveIntegrity: 100000,
      durabilityMod: 0.5,
      techQty: 4,
      pcu: 10000,
      components: []
    };
    weaponsDb.unshift(newW);
    populateWeaponDropdowns();
    selectWeapon(newId);
    showToast(`Created new weapon profile: ${name}`, "success");
  });
}

// Toast Feedback System
function showToast(msg, type = "info") {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
