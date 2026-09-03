// ==========================================================================
// COMPREHENSIVE WEAPON & AMMO DOM REFERENCES
// ==========================================================================
// Scope A: ModelAssignmentsDef & HardwareDef
const wSpinPartId = document.getElementById('wSpinPartId');
const wMuzzlePartId = document.getElementById('wMuzzlePartId');
const wAzimuthPartId = document.getElementById('wAzimuthPartId');
const wElevationPartId = document.getElementById('wElevationPartId');
const wIconName = document.getElementById('wIconName');
const wHomeAzimuth = document.getElementById('wHomeAzimuth');
const wHomeElevation = document.getElementById('wHomeElevation');
const wHardwareType = document.getElementById('wHardwareType');
const wCriticalChance = document.getElementById('wCriticalChance');
const wOffsetX = document.getElementById('wOffsetX');
const wOffsetY = document.getElementById('wOffsetY');
const wOffsetZ = document.getElementById('wOffsetZ');

// Scope A: LoadingDef extras
const wTrajectilesPerBarrel = document.getElementById('wTrajectilesPerBarrel');
const wSkipBarrels = document.getElementById('wSkipBarrels');
const wDelayUntilFire = document.getElementById('wDelayUntilFire');
const wShotsInBurst = document.getElementById('wShotsInBurst');
const wDelayAfterBurst = document.getElementById('wDelayAfterBurst');
const wFireFull = document.getElementById('wFireFull');
const wGiveUpAfter = document.getElementById('wGiveUpAfter');
const wGoHomeToReload = document.getElementById('wGoHomeToReload');
const wDropTargetUntilLoaded = document.getElementById('wDropTargetUntilLoaded');
const wDegradeWithHeat = document.getElementById('wDegradeWithHeat');
const wUseFillSound = document.getElementById('wUseFillSound');

// Scope A: HardPointDef extras
const wAddToleranceToTracking = document.getElementById('wAddToleranceToTracking');
const wCanShootSubmerged = document.getElementById('wCanShootSubmerged');
const wNpcSafe = document.getElementById('wNpcSafe');

// Scope A: TargetingDef extras
const wMaxCost = document.getElementById('wMaxCost');
const wThreatGrids = document.getElementById('wThreatGrids');
const wThreatProjectiles = document.getElementById('wThreatProjectiles');
const wThreatCharacters = document.getElementById('wThreatCharacters');
const wThreatMeteors = document.getElementById('wThreatMeteors');
const wThreatNeutrals = document.getElementById('wThreatNeutrals');
const wSubOffense = document.getElementById('wSubOffense');
const wSubPower = document.getElementById('wSubPower');
const wSubProduction = document.getElementById('wSubProduction');
const wSubThrust = document.getElementById('wSubThrust');
const wSubJumping = document.getElementById('wSubJumping');
const wSubSteering = document.getElementById('wSubSteering');
const wSubAny = document.getElementById('wSubAny');

// Scope A: AiDef & UiDef
const wAiTrackTargets = document.getElementById('wAiTrackTargets');
const wAiTurretAttached = document.getElementById('wAiTurretAttached');
const wAiTurretController = document.getElementById('wAiTurretController');
const wAiPrimaryTracking = document.getElementById('wAiPrimaryTracking');
const wAiLockOnFocus = document.getElementById('wAiLockOnFocus');
const wAiSuppressInfracted = document.getElementById('wAiSuppressInfracted');
const wUiRateOfFire = document.getElementById('wUiRateOfFire');
const wUiDamageModifier = document.getElementById('wUiDamageModifier');
const wUiToggleGuidance = document.getElementById('wUiToggleGuidance');
const wUiEnableOverload = document.getElementById('wUiEnableOverload');

// Scope A: Audio & Other
const wSoundPreFiring = document.getElementById('wSoundPreFiring');
const wSoundFiringPerShot = document.getElementById('wSoundFiringPerShot');
const wConstructPartCap = document.getElementById('wConstructPartCap');
const wEnergyPriority = document.getElementById('wEnergyPriority');
const wRestrictionRadius = document.getElementById('wRestrictionRadius');
const wOtherDebug = document.getElementById('wOtherDebug');
const wCheckInflatedBox = document.getElementById('wCheckInflatedBox');
const wCheckForAnySupport = document.getElementById('wCheckForAnySupport');
const wStayCharged = document.getElementById('wStayCharged');
const wRotateToTarget = document.getElementById('wRotateToTarget');
const wStopTrackingAfterFiring = document.getElementById('wStopTrackingAfterFiring');
const wNoVoxelLOSCheck = document.getElementById('wNoVoxelLOSCheck');

// Scope B: Core AmmoDef extras
const aBaseDamageCutoff = document.getElementById('aBaseDamageCutoff');
const aDecayPerShot = document.getElementById('aDecayPerShot');
const aEnergyMagazineSize = document.getElementById('aEnergyMagazineSize');
const aHeatModifier = document.getElementById('aHeatModifier');
const aHeatNeededToFire = document.getElementById('aHeatNeededToFire');
const aHybridRound = document.getElementById('aHybridRound');
const aIgnoreWater = document.getElementById('aIgnoreWater');
const aIgnoreVoxels = document.getElementById('aIgnoreVoxels');
const aIgnoreGrids = document.getElementById('aIgnoreGrids');
const aAllowNegativeHeatModifier = document.getElementById('aAllowNegativeHeatModifier');
const aGridsTargetSeekersTargetingThis = document.getElementById('aGridsTargetSeekersTargetingThis');

// Scope B: Trajectory & Smarts
const tAccelPerSec = document.getElementById('tAccelPerSec');
const tSpeedVariance = document.getElementById('tSpeedVariance');
const tRangeVariance = document.getElementById('tRangeVariance');
const tDeaccelTime = document.getElementById('tDeaccelTime');
const tFieldExponent = document.getElementById('tFieldExponent');
const tTargetLossDegree = document.getElementById('tTargetLossDegree');
const tTargetLossTime = document.getElementById('tTargetLossTime');
const sInaccuracy = document.getElementById('sInaccuracy');
const sAggressiveness = document.getElementById('sAggressiveness');
const sNavAcceleration = document.getElementById('sNavAcceleration');
const sMaxLateralThrust = document.getElementById('sMaxLateralThrust');
const sNavAngle = document.getElementById('sNavAngle');
const sMinArmingRange = document.getElementById('sMinArmingRange');
const sScanRounds = document.getElementById('sScanRounds');
const sSpeedLimit = document.getElementById('sSpeedLimit');
const sVelocity = document.getElementById('sVelocity');
const sSteeringLimit = document.getElementById('sSteeringLimit');
const sOverSteer = document.getElementById('sOverSteer');
const sStepVel = document.getElementById('sStepVel');
const sAltNavigation = document.getElementById('sAltNavigation');

// Scope B: ObjectsHitDef
const oMaxObjectsHit = document.getElementById('oMaxObjectsHit');
const oCountBlocks = document.getElementById('oCountBlocks');
const oSkipBlocksForAOE = document.getElementById('oSkipBlocksForAOE');

// Scope B: DamageScaleDef extras
const dsMaxIntegrity = document.getElementById('dsMaxIntegrity');
const dsCharacters = document.getElementById('dsCharacters');
const dsDamageType = document.getElementById('dsDamageType');
const dsArmorArmor = document.getElementById('dsArmorArmor');
const dsNonArmor = document.getElementById('dsNonArmor');
const dsGridLarge = document.getElementById('dsGridLarge');
const dsGridSmall = document.getElementById('dsGridSmall');
const dsFalloffDistance = document.getElementById('dsFalloffDistance');
const dsFalloffMinMult = document.getElementById('dsFalloffMinMult');
const dsShieldModifier = document.getElementById('dsShieldModifier');
const dsShieldType = document.getElementById('dsShieldType');
const dsShieldBypassMod = document.getElementById('dsShieldBypassMod');

// Scope B: AreaOfDamageDef (BlockHit & EndOfLife)
const aodBlockEnable = document.getElementById('aodBlockEnable');
const aodBlockRadius = document.getElementById('aodBlockRadius');
const aodBlockDamage = document.getElementById('aodBlockDamage');
const aodBlockDepth = document.getElementById('aodBlockDepth');
const aodBlockMaxAbsorb = document.getElementById('aodBlockMaxAbsorb');
const aodBlockFalloff = document.getElementById('aodBlockFalloff');
const aodBlockShape = document.getElementById('aodBlockShape');
const aodEolEnable = document.getElementById('aodEolEnable');
const aodEolRadius = document.getElementById('aodEolRadius');
const aodEolDamage = document.getElementById('aodEolDamage');
const aodEolDepth = document.getElementById('aodEolDepth');
const aodEolMaxAbsorb = document.getElementById('aodEolMaxAbsorb');
const aodEolFalloff = document.getElementById('aodEolFalloff');
const aodEolShape = document.getElementById('aodEolShape');

// Scope B: Fragment extras
const fBackwardDegrees = document.getElementById('fBackwardDegrees');
const fOffset = document.getElementById('fOffset');
const fIgnoreArming = document.getElementById('fIgnoreArming');
const fRadial = document.getElementById('fRadial');

// Scope B: PatternDef
const pEnable = document.getElementById('pEnable');
const pPatterns = document.getElementById('pPatterns');
const pTriggerChance = document.getElementById('pTriggerChance');
const pRandomMin = document.getElementById('pRandomMin');
const pRandomMax = document.getElementById('pRandomMax');
const pPatternSteps = document.getElementById('pPatternSteps');
const pMode = document.getElementById('pMode');
const pSkipParent = document.getElementById('pSkipParent');
const pRandom = document.getElementById('pRandom');

// Scope B: EwarDef
const ewEnable = document.getElementById('ewEnable');
const ewType = document.getElementById('ewType');
const ewMode = document.getElementById('ewMode');
const ewStrength = document.getElementById('ewStrength');
const ewRadius = document.getElementById('ewRadius');
const ewDuration = document.getElementById('ewDuration');
const ewMaxStacks = document.getElementById('ewMaxStacks');
const ewStackDuration = document.getElementById('ewStackDuration');
const ewDeplete = document.getElementById('ewDeplete');

// Scope B: GraphicDef extras
const gShieldHitDraw = document.getElementById('gShieldHitDraw');
const gTracerColor = document.getElementById('gTracerColor');
const gTracerTexture = document.getElementById('gTracerTexture');
const gTracerSegmented = document.getElementById('gTracerSegmented');
const gTrailEnable = document.getElementById('gTrailEnable');
const gTrailAlwaysDraw = document.getElementById('gTrailAlwaysDraw');
const gTrailDecay = document.getElementById('gTrailDecay');
const gTrailWidth = document.getElementById('gTrailWidth');
const gTrailColor = document.getElementById('gTrailColor');
const gTrailTextures = document.getElementById('gTrailTextures');

// Scope B: Audio extras
const aSoundShot = document.getElementById('aSoundShot');
const aSoundVoxelHit = document.getElementById('aSoundVoxelHit');
const aSoundPlayerHit = document.getElementById('aSoundPlayerHit');
const aSoundWaterHit = document.getElementById('aSoundWaterHit');
const aHitPlayChance = document.getElementById('aHitPlayChance');
const aHitPlayShield = document.getElementById('aHitPlayShield');

// Scope B: SynchronizeDef
const syncInterval = document.getElementById('syncInterval');
const syncPatchWindow = document.getElementById('syncPatchWindow');
const syncFull = document.getElementById('syncFull');
const syncPointDefense = document.getElementById('syncPointDefense');
const syncOnHitDeath = document.getElementById('syncOnHitDeath');
const syncUpdateOnRandomize = document.getElementById('syncUpdateOnRandomize');

const codeSbcXmlDirect = document.getElementById('codeSbcXmlDirect');
const btnCopySbcXmlDirect = document.getElementById('btnCopySbcXmlDirect');
const btnDownloadSbcDirect = document.getElementById('btnDownloadSbcDirect');
// Schema Guard Elements
const wcSchemaBadge = document.getElementById('wcSchemaBadge');
const wcSchemaNotice = document.getElementById('wcSchemaNotice');
const wcSchemaNoticeText = document.getElementById('wcSchemaNoticeText');

const weaponExtendedTagsContainer = document.getElementById('weaponExtendedTagsContainer');
const weaponExtendedCountBadge = document.getElementById('weaponExtendedCountBadge');
const btnAddWeaponExtendedTag = document.getElementById('btnAddWeaponExtendedTag');

const ammoExtendedTagsContainer = document.getElementById('ammoExtendedTagsContainer');
const ammoExtendedCountBadge = document.getElementById('ammoExtendedCountBadge');
const btnAddAmmoExtendedTag = document.getElementById('btnAddAmmoExtendedTag');

// ==========================================================================
// DATA VALIDATION & TYPE SAFETY HELPERS
// ==========================================================================
function safeFloat(val, fallback = 0, min = -Infinity, max = Infinity) {
  const parsed = parseFloat(val);
  if (isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

function safeInt(val, fallback = 0, min = -Infinity, max = Infinity) {
  const parsed = parseInt(val, 10);
  if (isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

/**
 * GVK Weapon Studio // Real-Time WeaponCore Configurator & Logistics Engine
 * Powered by Ash-LikeSnow/WeaponCore & GV-Server-Mods/GVK-Weapons-Pack
 */

// Global State & Databases
let weaponsDb = [];
let ammosDb = {};
let animationsDb = [];
let componentsDb = {};
let activeWeapon = null;
let activeAmmo = null;
let benchmarkWeapon = null;
let modDirectoryHandle = null;

// Server Balance Matrix Multipliers (with defaults)
const DEFAULT_BALANCE_MATRIX = {
  buildTimeDividend: 750,
  scPer1U: 207284,
  scPerDamage: 3.00,
  minIntegrity: 2500,
  midIntegrity: 25000,
  maxIntegrity: 400000,
  minSize: 0.032,
  midSize: 1.0,
  maxSize: 125.0,
  assemblerEff: 3.0,
  scrapYield: 0.25
};

let balanceMatrix = { ...DEFAULT_BALANCE_MATRIX };

// Load stored balance matrix if present
try {
  const savedMatrix = localStorage.getItem('GVK_BALANCE_MATRIX');
  if (savedMatrix) {
    balanceMatrix = { ...DEFAULT_BALANCE_MATRIX, ...JSON.parse(savedMatrix) };
  }
} catch (e) {
  console.warn("Using default balance matrix:", e);
}

// DOM Elements - Navigation & Workspaces
const wsTabs = document.querySelectorAll('.ws-tab');
const wsSections = document.querySelectorAll('.workspace-section');
const scopeBtns = document.querySelectorAll('.scope-btn');
const scopeContents = document.querySelectorAll('.scope-content');

// DOM Elements - Universal Weapon Banner
const weaponSelect = document.getElementById('weaponSelect');
const activeWeaponIcon = document.getElementById('activeWeaponIcon');
const btnResetDefaults = document.getElementById('btnResetDefaults');
const badgeGrid = document.getElementById('badgeGrid');
const badgeType = document.getElementById('badgeType');
const badgeTech = document.getElementById('badgeTech');
const badgeCircuitry = document.getElementById('badgeCircuitry');
const badgeRelic = document.getElementById('badgeRelic');
const badgeNpc = document.getElementById('badgeNpc');

// DOM Elements - Telemetry Deck
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

// DOM Elements - Simulator Tools (TTK & Drift)
const ttkTargetSelect = document.getElementById('ttkTargetSelect');
const outTtkMain = document.getElementById('outTtkMain');
const outTtkRounds = document.getElementById('outTtkRounds');
const ttkProgressFill = document.getElementById('ttkProgressFill');
const outFlightMuzzleSpd = document.getElementById('outFlightMuzzleSpd');
const outDelay500m = document.getElementById('outDelay500m');
const outLead500m = document.getElementById('outLead500m');
const outDelay1000m = document.getElementById('outDelay1000m');
const outLead1000m = document.getElementById('outLead1000m');
const outMaxRangeLabel = document.getElementById('outMaxRangeLabel');
const outDelayMax = document.getElementById('outDelayMax');
const outLeadMax = document.getElementById('outLeadMax');

// DOM Elements - 1v1 Radar & Comparison
const compareSelect = document.getElementById('compareSelect');
const compActiveIcon = document.getElementById('compActiveIcon');
const compBenchIcon = document.getElementById('compBenchIcon');
const legendActiveName = document.getElementById('legendActiveName');
const legendBenchItem = document.getElementById('legendBenchItem');
const legendBenchName = document.getElementById('legendBenchName');
const compareTableBody = document.getElementById('compareTableBody');
const radarCanvas = document.getElementById('radarCanvas');

// DOM Elements - Definition Workbench (Scope A: WeaponDef)
const wSubtypeId = document.getElementById('wSubtypeId');
const wPartName = document.getElementById('wPartName');
const wDurabilityMod = document.getElementById('wDurabilityMod');
const wScope = document.getElementById('wScope');
const wMuzzles = document.getElementById('wMuzzles');

const wMaxTargetDistance = document.getElementById('wMaxTargetDistance');
const wMinTargetDistance = document.getElementById('wMinTargetDistance');
const wTopTargets = document.getElementById('wTopTargets');
const wTopBlocks = document.getElementById('wTopBlocks');
const wStopTrackingSpeed = document.getElementById('wStopTrackingSpeed');
const wClosestFirst = document.getElementById('wClosestFirst');
const wIgnoreDumb = document.getElementById('wIgnoreDumb');
const wLockedSmartOnly = document.getElementById('wLockedSmartOnly');
const badgeTargetingHelper = document.getElementById('badgeTargetingHelper');
const btnRevertTargeting = document.getElementById('btnRevertTargeting');

const wDeviateAngle = document.getElementById('wDeviateAngle');
const wAimingTolerance = document.getElementById('wAimingTolerance');
const wAimLeading = document.getElementById('wAimLeading');
const wDelayCeaseFire = document.getElementById('wDelayCeaseFire');

const wRateOfFire = document.getElementById('wRateOfFire');
const wBarrelsPerShot = document.getElementById('wBarrelsPerShot');
const wReloadTime = document.getElementById('wReloadTime');
const wMagsToLoad = document.getElementById('wMagsToLoad');
const wHeatPerShot = document.getElementById('wHeatPerShot');
const wMaxHeat = document.getElementById('wMaxHeat');
const wHeatSinkRate = document.getElementById('wHeatSinkRate');
const wCooldown = document.getElementById('wCooldown');

const wRotateRate = document.getElementById('wRotateRate');
const wElevateRate = document.getElementById('wElevateRate');
const wMinAzimuth = document.getElementById('wMinAzimuth');
const wMaxAzimuth = document.getElementById('wMaxAzimuth');
const wMinElevation = document.getElementById('wMinElevation');
const wMaxElevation = document.getElementById('wMaxElevation');
const wInventorySize = document.getElementById('wInventorySize');
const wIdlePower = document.getElementById('wIdlePower');

const wSoundFiring = document.getElementById('wSoundFiring');
const wSoundReload = document.getElementById('wSoundReload');
const wSoundRotate = document.getElementById('wSoundRotate');
const wSoundNoAmmo = document.getElementById('wSoundNoAmmo');

const assignedAmmosList = document.getElementById('assignedAmmosList');
const assignAmmoDropdown = document.getElementById('assignAmmoDropdown');
const btnAssignAmmo = document.getElementById('btnAssignAmmo');
const btnTuneActiveAmmo = document.getElementById('btnTuneActiveAmmo');
const selectAnimationDef = document.getElementById('selectAnimationDef');
const currentAnimBadge = document.getElementById('currentAnimBadge');

// DOM Elements - Definition Workbench (Scope B: AmmoDef)
const ammoSelectGlobal = document.getElementById('ammoSelectGlobal');
const scopeActiveAmmoLabel = document.getElementById('scopeActiveAmmoLabel');
const btnNewFragAmmo = document.getElementById('btnNewFragAmmo');

const aAmmoRound = document.getElementById('aAmmoRound');
const aAmmoMagazine = document.getElementById('aAmmoMagazine');
const aTerminalName = document.getElementById('aTerminalName');
const aBaseDamage = document.getElementById('aBaseDamage');
const aMass = document.getElementById('aMass');
const aHealth = document.getElementById('aHealth');
const aBackKick = document.getElementById('aBackKick');
const aEnergyCost = document.getElementById('aEnergyCost');
const aHardPointUsable = document.getElementById('aHardPointUsable');
const aNpcSafe = document.getElementById('aNpcSafe');
const aNoGridOrArmorScaling = document.getElementById('aNoGridOrArmorScaling');

const aShape = document.getElementById('aShape');
const aDiameter = document.getElementById('aDiameter');

const fEnable = document.getElementById('fEnable');
const fReverse = document.getElementById('fReverse');
const fDropVelocity = document.getElementById('fDropVelocity');
const fFragments = document.getElementById('fFragments');
const fDegrees = document.getElementById('fDegrees');
const fChildAmmoRound = document.getElementById('fChildAmmoRound');
const fragStatusBadge = document.getElementById('fragStatusBadge');
const fragChainVisual = document.getElementById('fragChainVisual');

const dsShield = document.getElementById('dsShield');
const dsLightArmor = document.getElementById('dsLightArmor');
const dsHeavyArmor = document.getElementById('dsHeavyArmor');


const tDesiredSpeed = document.getElementById('tDesiredSpeed');
const tMaxTrajectory = document.getElementById('tMaxTrajectory');
const tMaxLifeTime = document.getElementById('tMaxLifeTime');
const tGuidance = document.getElementById('tGuidance');

const gTracerEnable = document.getElementById('gTracerEnable');
const gTracerLength = document.getElementById('gTracerLength');
const gTracerWidth = document.getElementById('gTracerWidth');
const gVisualProb = document.getElementById('gVisualProb');

const aSoundTravel = document.getElementById('aSoundTravel');
const aSoundHit = document.getElementById('aSoundHit');
const aSoundShieldHit = document.getElementById('aSoundShieldHit');

// DOM Elements - Definition Workbench (Scope C: CubeBlocks SBC)
const sbcDisplayName = document.getElementById('sbcDisplayName');
const sbcCubeSize = document.getElementById('sbcCubeSize');
const sbcBuildTime = document.getElementById('sbcBuildTime');
const sbcUpCost = document.getElementById('sbcUpCost');
const sbcTechSummary = document.getElementById('sbcTechSummary');
const sbcTechQtyDisplay = document.getElementById('sbcTechQtyDisplay');
const badgeUps = document.getElementById('badgeUps');
const sbcIsRelic = document.getElementById('sbcIsRelic');
const sbcHasCircuitry = document.getElementById('sbcHasCircuitry');

// DOM Elements - Ammo Logistics ("Ammo Maths")
const logActiveAmmoName = document.getElementById('logActiveAmmoName');
const inputDmgDensitySlider = document.getElementById('inputDmgDensitySlider');
const inputDmgDensity = document.getElementById('inputDmgDensity');
const inputPhysicalDensity = document.getElementById('inputPhysicalDensity');
const selectRoleMultiplier = document.getElementById('selectRoleMultiplier');
const inputRUs = document.getElementById('inputRUs');
const inputCraftTime = document.getElementById('inputCraftTime');

const outMagVolume = document.getElementById('outMagVolume');
const outMagMass = document.getElementById('outMagMass');
const outSuggestedVol = document.getElementById('outSuggestedVol');
const outDepletionTime = document.getElementById('outDepletionTime');

const outSmallCargoMags = document.getElementById('outSmallCargoMags');
const outSmallCargoDmg = document.getElementById('outSmallCargoDmg');
const outSmall1GunTime = document.getElementById('outSmall1GunTime');
const outSmall20GunTime = document.getElementById('outSmall20GunTime');

const outLargeCargoMags = document.getElementById('outLargeCargoMags');
const outLargeCargoDmg = document.getElementById('outLargeCargoDmg');
const outLarge1GunTime = document.getElementById('outLarge1GunTime');
const outLarge20GunTime = document.getElementById('outLarge20GunTime');
const codeBlueprintXml = document.getElementById('codeBlueprintXml');
const btnCopyBlueprintXml = document.getElementById('btnCopyBlueprintXml');

// Sticky HUD Elements
const hudWeaponName = document.getElementById('hudWeaponName');
const hudDps = document.getElementById('hudDps');
const hudRange = document.getElementById('hudRange');
const hudOverheat = document.getElementById('hudOverheat');
const btnHudExport = document.getElementById('btnHudExport');

// Linter Banner
const linterBanner = document.getElementById('linterBanner');
const linterText = document.getElementById('linterText');

// Modals
const balanceMatrixModal = document.getElementById('balanceMatrixModal');
const btnBalanceMatrix = document.getElementById('btnBalanceMatrix');
const btnCloseMatrix = document.getElementById('btnCloseMatrix');
const btnApplyMatrix = document.getElementById('btnApplyMatrix');
const btnResetMatrix = document.getElementById('btnResetMatrix');

const codeModal = document.getElementById('codeModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnOpenCodeWorkbench = document.getElementById('btnOpenCodeWorkbench');
const btnCopyCode = document.getElementById('btnCopyCode');
const btnDownloadFile = document.getElementById('btnDownloadFile');
const btnSaveToDisk = document.getElementById('btnSaveToDisk');
const saveStatusHint = document.getElementById('saveStatusHint');

const btnShareUrl = document.getElementById('btnShareUrl');
const btnNewMinimalWeapon = document.getElementById('btnNewMinimalWeapon');
const btnNewMinimalAmmo = document.getElementById('btnNewMinimalAmmo');
const btnLinkLocal = document.getElementById('btnLinkLocal');

// Toast Function
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ==========================================================================
// INITIALIZATION & DATA LOADING
// ==========================================================================
async function initStudio() {
  // Load databases
  if (window.GVK_DEFAULT_WEAPONS) weaponsDb = JSON.parse(JSON.stringify(window.GVK_DEFAULT_WEAPONS));
  if (window.GVK_DEFAULT_AMMOS) ammosDb = JSON.parse(JSON.stringify(window.GVK_DEFAULT_AMMOS));
  if (window.GVK_ANIMATION_DEFS) animationsDb = [...window.GVK_ANIMATION_DEFS];
  if (window.GVK_DEFAULT_COMPONENTS) componentsDb = { ...window.GVK_DEFAULT_COMPONENTS };

  // Fetch live JSON if served via HTTP
  try {
    const wRes = await fetch('data/weapons_db.json');
    if (wRes.ok) weaponsDb = await wRes.json();
    const aRes = await fetch('data/ammos_db.json');
    if (aRes.ok) ammosDb = await aRes.json();
    const cRes = await fetch('data/components_db.json');
    if (cRes.ok) componentsDb = await cRes.json();
  } catch (e) {
    console.log("Running in static/local mode, using bundled datasets.");
  }

  // Populate Dropdowns
  checkWcSchemaIntegrity();
  populateWeaponDropdowns();
  populateAmmoDropdowns();
  populateAnimationDropdown();

  // Populate Balance Matrix Modal inputs
  syncBalanceMatrixInputs();

  // Check URL Permalinks
  parseUrlParams();

  // Select Default Weapon (Avenger Turret or First)
  if (!activeWeapon && weaponsDb.length > 0) {
    const avenger = weaponsDb.find(w => w.name.includes("Avenger")) || weaponsDb[0];
    selectWeapon(avenger.id);
  }

  // Event Listeners
  setupNavigationEvents();
  setupWorkbenchInputEvents();
  setupLogisticsEvents();
  setupModalEvents();

  console.log("GVK Weapon Studio Initialized with 3 Workspaces & Full Tag Definitions.");
}

// ==========================================================================
// WORKSPACE & NAVIGATION LOGIC
// ==========================================================================
function switchWorkspace(targetWsId) {
  wsTabs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-ws') === targetWsId);
  });
  wsSections.forEach(s => {
    s.classList.toggle('active', s.id === targetWsId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchScope(targetScopeId) {
  scopeBtns.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-scope') === targetScopeId);
  });
  scopeContents.forEach(c => {
    c.classList.toggle('active', c.id === targetScopeId);
  });
}

function setupNavigationEvents() {
  wsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchWorkspace(tab.getAttribute('data-ws'));
    });
  });

  scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchScope(btn.getAttribute('data-scope'));
    });
  });



  if (btnTuneActiveAmmo) {
    btnTuneActiveAmmo.addEventListener('click', () => {
      switchScope('scope-ammo');
    });
  }

  // Target Dummy Select
  if (ttkTargetSelect) {
    ttkTargetSelect.addEventListener('change', updateTtkSimulator);
  }

  // Permalinks Share
  if (btnShareUrl) {
    btnShareUrl.addEventListener('click', () => {
      if (!activeWeapon) return;
      const url = new URL(window.location.href);
      url.searchParams.set('gun', activeWeapon.subtypeId);
      if (benchmarkWeapon) url.searchParams.set('vs', benchmarkWeapon.subtypeId);
      if (activeAmmo) url.searchParams.set('ammo', activeAmmo.ammoRound);
      navigator.clipboard.writeText(url.toString()).then(() => {
        showToast("🔗 Weapon comparison link copied to clipboard!");
      }).catch(() => {
        showToast(url.toString());
      });
    });
  }
}

function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const gunParam = params.get('gun');
  const vsParam = params.get('vs');
  const ammoParam = params.get('ammo');
  const wsParam = params.get('ws');

  if (gunParam) {
    const found = weaponsDb.find(w => w.subtypeId === gunParam || w.id === gunParam);
    if (found) selectWeapon(found.id);
  }
  if (vsParam) {
    const foundBench = weaponsDb.find(w => w.subtypeId === vsParam || w.id === vsParam);
    if (foundBench) {
      benchmarkWeapon = foundBench;
      if (compareSelect) compareSelect.value = foundBench.id;
    }
  }
  if (ammoParam && ammosDb[ammoParam]) {
    activeAmmo = ammosDb[ammoParam];
  }
  if (wsParam && document.getElementById(wsParam)) {
    switchWorkspace(wsParam);
  }
}

// ==========================================================================
// WEAPON SELECTION & BINDING
// ==========================================================================
function populateWeaponDropdowns() {
  weaponSelect.innerHTML = '';
  compareSelect.innerHTML = '<option value="">Select benchmark weapon to compare...</option>';

  const playerGuns = weaponsDb.filter(w => !w.name.includes('(NPC)') && !w.subtypeId.includes('_NPC'));
  const npcGuns = weaponsDb.filter(w => w.name.includes('(NPC)') || w.subtypeId.includes('_NPC'));

  const pGroup = document.createElement('optgroup');
  pGroup.label = "── Player Standard Armaments ──";
  playerGuns.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.id;
    const grid = w.gridSize || w.grid || 'Large';
    opt.textContent = `${w.displayName || w.name} [${grid}]`;
    pGroup.appendChild(opt);
  });
  weaponSelect.appendChild(pGroup);

  const nGroup = document.createElement('optgroup');
  nGroup.label = "── NPC / Relic / Enemy Armaments ──";
  npcGuns.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.id;
    const grid = w.gridSize || w.grid || 'Large';
    opt.textContent = `⚔️ ${w.displayName || w.name} [${grid}]`;
    nGroup.appendChild(opt);
  });
  weaponSelect.appendChild(nGroup);

  // Compare dropdown
  playerGuns.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.id;
    const grid = w.gridSize || w.grid || 'Large';
    opt.textContent = `${w.displayName || w.name} [${grid}]`;
    compareSelect.appendChild(opt);
  });

  weaponSelect.addEventListener('change', (e) => {
    selectWeapon(e.target.value);
  });

  compareSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    benchmarkWeapon = val ? weaponsDb.find(w => w.id === val) : null;
    updateComparisonRadar();
  });
}

function populateAmmoDropdowns() {
  assignAmmoDropdown.innerHTML = '<option value="">Choose ammo to assign...</option>';
  ammoSelectGlobal.innerHTML = '';
  if (fChildAmmoRound) fChildAmmoRound.innerHTML = '<option value="">None / Select child ammo...</option>';

  const ammoKeys = Object.keys(ammosDb).sort();
  ammoKeys.forEach(k => {
    const a = ammosDb[k];
    const opt = document.createElement('option');
    opt.value = k;
    opt.textContent = `${a.terminalName || k} (${a.baseDamage} dmg)`;
    assignAmmoDropdown.appendChild(opt);

    const optGlobal = document.createElement('option');
    optGlobal.value = k;
    optGlobal.textContent = `${k} [${a.terminalName || 'Ammo'}]`;
    ammoSelectGlobal.appendChild(optGlobal);

    if (fChildAmmoRound) {
      const optChild = document.createElement('option');
      optChild.value = k;
      optChild.textContent = `${k} (${a.baseDamage} dmg)`;
      fChildAmmoRound.appendChild(optChild);
    }
  });

  ammoSelectGlobal.addEventListener('change', (e) => {
    selectAmmo(e.target.value);
  });

  if (btnAssignAmmo) {
    btnAssignAmmo.addEventListener('click', () => {
      const selected = assignAmmoDropdown.value;
      if (!selected || !activeWeapon) return;
      if (!activeWeapon.assignedAmmos) activeWeapon.assignedAmmos = [];
      if (!activeWeapon.assignedAmmos.includes(selected)) {
        activeWeapon.assignedAmmos.push(selected);
        renderAssignedAmmos();
        showToast(`Assigned ${selected} to ${activeWeapon.name}!`);
      }
    });
  }
}

function populateAnimationDropdown() {
  selectAnimationDef.innerHTML = '<option value="">None / Static (No Subpart Animations)</option>';
  animationsDb.forEach(anim => {
    const opt = document.createElement('option');
    opt.value = anim;
    opt.textContent = anim;
    selectAnimationDef.appendChild(opt);
  });

  selectAnimationDef.addEventListener('change', (e) => {
    if (activeWeapon) {
      activeWeapon.assignedAnimation = e.target.value || null;
      currentAnimBadge.textContent = e.target.value || "None";
    }
  });
}

function selectWeapon(weaponId) {
  const found = weaponsDb.find(w => w.id === weaponId);
  if (!found) return;
  activeWeapon = found;
  weaponSelect.value = activeWeapon.id;

  // Set active ammo round (primary)
  const primaryAmmoKey = (activeWeapon.assignedAmmos && activeWeapon.assignedAmmos.length > 0)
    ? activeWeapon.assignedAmmos[0]
    : activeWeapon.ammoName;

  if (ammosDb[primaryAmmoKey]) {
    activeAmmo = ammosDb[primaryAmmoKey];
  } else {
    // Find closest or create fallback
    const firstKey = Object.keys(ammosDb)[0];
    activeAmmo = ammosDb[firstKey];
  }

  // Update Universal Banner
  updateUniversalBanner();

  // Populate Workbench Fields
  populateWeaponWorkbench();
  populateAmmoWorkbench();
  populateSbcWorkbench();

  // Recalculate Telemetry, Simulator & Logistics
  updateCombatTelemetry();
  updateTtkSimulator();
  updateInitialDDriftMeter();
  updateAmmoLogistics();
  updateComparisonRadar();
  runWeaponCoreLinter();
}

function selectAmmo(ammoKey) {
  if (!ammosDb[ammoKey]) return;
  activeAmmo = ammosDb[ammoKey];
  ammoSelectGlobal.value = ammoKey;
  scopeActiveAmmoLabel.textContent = ammoKey;
  populateAmmoWorkbench();
  updateCombatTelemetry();
  updateTtkSimulator();
  updateInitialDDriftMeter();
  updateAmmoLogistics();
}

// ==========================================================================
// TECH COMPONENT DERIVATION HELPERS
// ==========================================================================
function isTechComponent(compName) {
  if (!compName) return false;
  const lower = compName.toLowerCase();
  return lower.startsWith('prototech') || lower.includes('prototech');
}

function getTechSummary(components) {
  if (!components || components.length === 0) {
    return { totalQty: 0, summaryStr: 'None', techLayers: [], hasCircuitry: false };
  }
  const techLayers = components.filter(c => isTechComponent(c.name));
  const totalQty = techLayers.reduce((sum, c) => sum + (parseInt(c.count) || 0), 0);
  const hasCircuitry = techLayers.some(c => c.name === 'PrototechCircuitry' && (parseInt(c.count) || 0) > 0);
  
  let summaryStr = 'None';
  if (techLayers.length > 0) {
    summaryStr = techLayers.map(c => `${c.count}x ${c.name.replace('Prototech', '')}`).join(', ');
  }
  return { totalQty, summaryStr, techLayers, hasCircuitry };
}

function updateUniversalBanner() {
  if (!activeWeapon) return;

  // Icon
  if (activeWeapon.icon && activeWeaponIcon) {
    activeWeaponIcon.src = activeWeapon.icon;
    compActiveIcon.src = activeWeapon.icon;
  }

  // Badges
  badgeGrid.innerHTML = `Grid: <strong>${activeWeapon.gridSize || activeWeapon.grid || 'Large'}</strong>`;
  badgeType.innerHTML = `Mount: <strong>${activeWeapon.type}</strong>`;
  badgeTech.innerHTML = `Tech: <strong>${activeWeapon.upCost || activeWeapon.pcu || 6} UPs</strong>`;

  // Circuitry Rule: smart/turret with range > 2000m requires 1 PrototechCircuitry
  const needsCircuitry = (activeWeapon.type === 'Turret' || activeWeapon.guided) && (activeWeapon.maxTargetDistance > 2000);
  if (badgeCircuitry) {
    badgeCircuitry.style.display = needsCircuitry ? 'inline-flex' : 'none';
  }

  // Relic Status Badge: non-craftable ammunition from raw scratch ingots
  if (badgeRelic) {
    badgeRelic.style.display = activeWeapon.isRelic ? 'inline-flex' : 'none';
  }

  // NPC Variant
  if (badgeNpc) {
    badgeNpc.style.display = (activeWeapon.name.includes('(NPC)') || activeWeapon.subtypeId.includes('_NPC')) ? 'inline-flex' : 'none';
  }

  // Bottom Sticky HUD
  hudWeaponName.textContent = activeWeapon.name;
}

// ==========================================================================
// WORKBENCH BINDING: WEAPONDEF, AMMODEF, SBC
// ==========================================================================

// ==========================================================================
// WEAPONCORE SCHEMA GUARD & DYNAMIC EXTENDED TAG INSPECTOR
// ==========================================================================
function checkWcSchemaIntegrity() {
  if (!window.GVK_WC_SCHEMA) return;

  const schema = window.GVK_WC_SCHEMA;
  if (wcSchemaBadge) {
    wcSchemaBadge.innerHTML = `🛡️ WC v3.0 (Core ${schema.version}) | Synced`;
    wcSchemaBadge.addEventListener('click', showSchemaModal);
  }

  // Check if live Structure.cs has been updated
  fetch('data/Scripts/CoreParts/script/Structure.cs').then(res => {
    if (res.ok) return res.text();
    return fetch('CoreParts/script/Structure.cs').then(r => r.ok ? r.text() : null);
  }).then(text => {
    if (text && wcSchemaNotice && wcSchemaNoticeText) {
      // Simple length/content diff check
      if (Math.abs(text.length - schema.fileSize) > 20) {
        wcSchemaNotice.style.display = 'flex';
        wcSchemaNoticeText.innerHTML = `<strong>⚠️ WeaponCore Update Detected:</strong> CoreParts/script/Structure.cs has changed (${text.length} bytes vs ${schema.fileSize} bytes). Dynamic Extended Tags Inspector is active and ready.`;
      }
    }
  }).catch(() => {});
}

function showSchemaModal() {
  if (!window.GVK_WC_SCHEMA) return;
  const s = window.GVK_WC_SCHEMA;
  const msg = `🛡️ WEAPONCORE SCHEMA GUARD STATUS\n\n` +
    `• Target WeaponCore Version: ${s.version}\n` +
    `• Structure.cs Signature: ${s.structureHash}\n` +
    `• Total Enums Tracked: ${s.totalEnums}\n` +
    `• Total Structs Tracked: ${s.totalStructs}\n\n` +
    `Dynamic tag discovery is active. Any newly added properties in Structure.cs are automatically reflected in the Extended Tags Inspector without requiring web tool updates!`;
  alert(msg);
}

function renderExtendedWeaponTags() {
  if (!weaponExtendedTagsContainer || !activeWeapon) return;
  weaponExtendedTagsContainer.innerHTML = '';
  if (!activeWeapon.extendedTags) activeWeapon.extendedTags = {};

  const entries = Object.entries(activeWeapon.extendedTags);
  if (weaponExtendedCountBadge) {
    weaponExtendedCountBadge.textContent = `${entries.length} Custom Tag${entries.length === 1 ? '' : 's'}`;
  }

  if (entries.length === 0) {
    weaponExtendedTagsContainer.innerHTML = '<div style="grid-column: 1 / -1; font-size: 11px; color: var(--text-dim);">No extended or unmapped WeaponCore tags active on this weapon. Click "+ Add Weapon Tag" to add one.</div>';
    return;
  }

  entries.forEach(([key, val]) => {
    const item = document.createElement('div');
    item.className = 'control-item';
    const valType = typeof val;

    if (valType === 'boolean') {
      item.innerHTML = `
        <label class="control-label">${key} <span class="unit">bool</span></label>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
          <input type="checkbox" ${val ? 'checked' : ''} style="transform: scale(1.2); cursor: pointer;">
          <button class="btn-delete-row" title="Remove Tag">✕</button>
        </div>
      `;
      item.querySelector('input').addEventListener('change', (e) => {
        activeWeapon.extendedTags[key] = e.target.checked;
      });
    } else if (valType === 'number') {
      item.innerHTML = `
        <label class="control-label">${key} <span class="unit">number</span></label>
        <div style="display: flex; gap: 6px; align-items: center;">
          <input type="number" class="control-input" value="${val}" step="any" style="flex: 1;">
          <button class="btn-delete-row" title="Remove Tag">✕</button>
        </div>
      `;
      item.querySelector('input').addEventListener('input', (e) => {
        activeWeapon.extendedTags[key] = parseFloat(e.target.value) || 0;
      });
    } else {
      item.innerHTML = `
        <label class="control-label">${key} <span class="unit">text/enum</span></label>
        <div style="display: flex; gap: 6px; align-items: center;">
          <input type="text" class="control-input" value="${val}" style="flex: 1;">
          <button class="btn-delete-row" title="Remove Tag">✕</button>
        </div>
      `;
      item.querySelector('input').addEventListener('input', (e) => {
        activeWeapon.extendedTags[key] = e.target.value;
      });
    }

    item.querySelector('.btn-delete-row').addEventListener('click', () => {
      delete activeWeapon.extendedTags[key];
      renderExtendedWeaponTags();
      showToast(`Removed tag '${key}'.`);
    });

    weaponExtendedTagsContainer.appendChild(item);
  });
}

function renderExtendedAmmoTags() {
  if (!ammoExtendedTagsContainer || !activeAmmo) return;
  ammoExtendedTagsContainer.innerHTML = '';
  if (!activeAmmo.extendedTags) activeAmmo.extendedTags = {};

  const entries = Object.entries(activeAmmo.extendedTags);
  if (ammoExtendedCountBadge) {
    ammoExtendedCountBadge.textContent = `${entries.length} Custom Tag${entries.length === 1 ? '' : 's'}`;
  }

  if (entries.length === 0) {
    ammoExtendedTagsContainer.innerHTML = '<div style="grid-column: 1 / -1; font-size: 11px; color: var(--text-dim);">No extended or unmapped WeaponCore tags active on this round. Click "+ Add Ammo Tag" to add one.</div>';
    return;
  }

  entries.forEach(([key, val]) => {
    const item = document.createElement('div');
    item.className = 'control-item';
    const valType = typeof val;

    if (valType === 'boolean') {
      item.innerHTML = `
        <label class="control-label">${key} <span class="unit">bool</span></label>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
          <input type="checkbox" ${val ? 'checked' : ''} style="transform: scale(1.2); cursor: pointer;">
          <button class="btn-delete-row" title="Remove Tag">✕</button>
        </div>
      `;
      item.querySelector('input').addEventListener('change', (e) => {
        activeAmmo.extendedTags[key] = e.target.checked;
      });
    } else if (valType === 'number') {
      item.innerHTML = `
        <label class="control-label">${key} <span class="unit">number</span></label>
        <div style="display: flex; gap: 6px; align-items: center;">
          <input type="number" class="control-input" value="${val}" step="any" style="flex: 1;">
          <button class="btn-delete-row" title="Remove Tag">✕</button>
        </div>
      `;
      item.querySelector('input').addEventListener('input', (e) => {
        activeAmmo.extendedTags[key] = parseFloat(e.target.value) || 0;
      });
    } else {
      item.innerHTML = `
        <label class="control-label">${key} <span class="unit">text/enum</span></label>
        <div style="display: flex; gap: 6px; align-items: center;">
          <input type="text" class="control-input" value="${val}" style="flex: 1;">
          <button class="btn-delete-row" title="Remove Tag">✕</button>
        </div>
      `;
      item.querySelector('input').addEventListener('input', (e) => {
        activeAmmo.extendedTags[key] = e.target.value;
      });
    }

    item.querySelector('.btn-delete-row').addEventListener('click', () => {
      delete activeAmmo.extendedTags[key];
      renderExtendedAmmoTags();
      showToast(`Removed tag '${key}'.`);
    });

    ammoExtendedTagsContainer.appendChild(item);
  });
}

function populateWeaponWorkbench() {
  if (!activeWeapon) return;

  wSubtypeId.value = activeWeapon.subtypeId || '';
  wPartName.value = activeWeapon.partName || activeWeapon.name || '';
  wDurabilityMod.value = activeWeapon.durabilityMod || 0.5;
  wScope.value = activeWeapon.scope || 'scope';
  wMuzzles.value = (activeWeapon.muzzles && activeWeapon.muzzles.length > 0)
    ? activeWeapon.muzzles.join(', ')
    : 'muzzle_missile_1, muzzle_missile_2';

  wMaxTargetDistance.value = activeWeapon.maxTargetDistance || 1600;
  wMinTargetDistance.value = activeWeapon.minTargetDistance || 0;
  wTopTargets.value = activeWeapon.topTargets || 4;
  wTopBlocks.value = activeWeapon.topBlocks || 8;
  wStopTrackingSpeed.value = activeWeapon.stopTrackingSpeed || 1000;
  wClosestFirst.checked = activeWeapon.closestFirst !== false;
  wIgnoreDumb.checked = activeWeapon.ignoreDumbProjectiles !== false;
  wLockedSmartOnly.checked = activeWeapon.lockedSmartOnly === true;

  // Targeting Helper / Preset status
  if (activeWeapon.helpers && activeWeapon.helpers.targeting) {
    badgeTargetingHelper.style.display = 'inline-block';
    badgeTargetingHelper.textContent = `Shared: ${activeWeapon.helpers.targeting}`;
    btnRevertTargeting.style.display = 'inline-block';
  } else {
    badgeTargetingHelper.style.display = 'none';
    btnRevertTargeting.style.display = 'none';
  }

  wDeviateAngle.value = activeWeapon.deviateShotAngle || 0.15;
  wAimingTolerance.value = activeWeapon.aimingTolerance || 3.0;
  wAimLeading.value = activeWeapon.aimLeadingPrediction || 'Advanced';
  wDelayCeaseFire.value = activeWeapon.delayCeaseFire || 0;

  wRateOfFire.value = activeWeapon.rateOfFire || 1000;
  wBarrelsPerShot.value = activeWeapon.barrelsPerShot || 1;
  wReloadTime.value = activeWeapon.reloadTime || 0;
  wMagsToLoad.value = activeWeapon.magsToLoad || 1;
  wHeatPerShot.value = activeWeapon.heatPerShot || 0;
  wMaxHeat.value = activeWeapon.maxHeat || 0;
  wHeatSinkRate.value = activeWeapon.heatSinkRate || 0;
  wCooldown.value = activeWeapon.cooldown || 0.5;

  wRotateRate.value = activeWeapon.rotateRate || 0.015;
  wElevateRate.value = activeWeapon.elevateRate || 0.015;
  wMinAzimuth.value = activeWeapon.minAzimuth !== undefined ? activeWeapon.minAzimuth : -180;
  wMaxAzimuth.value = activeWeapon.maxAzimuth !== undefined ? activeWeapon.maxAzimuth : 180;
  wMinElevation.value = activeWeapon.minElevation !== undefined ? activeWeapon.minElevation : -15;
  wMaxElevation.value = activeWeapon.maxElevation !== undefined ? activeWeapon.maxElevation : 80;
  wInventorySize.value = activeWeapon.inventorySize || 0.9;
  wIdlePower.value = activeWeapon.idlePower || 0.01;

  wSoundFiring.value = activeWeapon.firingSound || '';
  wSoundReload.value = activeWeapon.reloadSound || '';
  wSoundRotate.value = activeWeapon.rotationSound || '';
  wSoundNoAmmo.value = activeWeapon.noAmmoSound || '';

  // Render assigned ammos
  renderAssignedAmmos();

  // AnimationDef binding
  selectAnimationDef.value = activeWeapon.assignedAnimation || '';
  currentAnimBadge.textContent = activeWeapon.assignedAnimation || 'None';
  renderExtendedWeaponTags();
}

function renderAssignedAmmos() {
  if (!activeWeapon || !assignedAmmosList) return;
  assignedAmmosList.innerHTML = '';

  const ammos = activeWeapon.assignedAmmos || [activeWeapon.ammoName];
  ammos.forEach((aKey, idx) => {
    const isPrimary = (idx === 0);
    const badge = document.createElement('div');
    badge.className = `assigned-badge ${isPrimary ? 'primary' : ''}`;
    badge.innerHTML = `
      <span>${isPrimary ? '⭐ ' : ''}${aKey}</span>
      ${ammos.length > 1 ? `<span class="badge-remove" data-idx="${idx}" title="Remove Ammo">✕</span>` : ''}
    `;
    badge.addEventListener('click', (e) => {
      if (e.target.classList.contains('badge-remove')) {
        activeWeapon.assignedAmmos.splice(idx, 1);
        renderAssignedAmmos();
        showToast(`Removed ${aKey} from weapon.`);
      } else {
        selectAmmo(aKey);
      }
    });
    assignedAmmosList.appendChild(badge);
  });

  const countBadge = document.getElementById('assignedAmmosCountBadge');
  if (countBadge) countBadge.textContent = `${ammos.length} Rounds Loaded`;
}

function populateAmmoWorkbench() {
  if (!activeAmmo) return;
  if (ammoSelectGlobal) ammoSelectGlobal.value = activeAmmo.name;
  if (scopeActiveAmmoLabel) scopeActiveAmmoLabel.textContent = activeAmmo.name;

  // Core Identification & Physics
  aAmmoRound.value = activeAmmo.ammoRound || activeAmmo.name || '';
  aAmmoMagazine.value = activeAmmo.ammoMagazine || '';
  aTerminalName.value = activeAmmo.terminalName || activeAmmo.ammoRound || activeAmmo.name || '';
  aBaseDamage.value = activeAmmo.baseDamage || 0;
  if (aBaseDamageCutoff) aBaseDamageCutoff.value = activeAmmo.baseDamageCutoff || 0;
  aMass.value = activeAmmo.mass !== undefined ? activeAmmo.mass : 1.0;
  aHealth.value = activeAmmo.health || 0;
  aBackKick.value = activeAmmo.backKickForce || 0;
  if (aDecayPerShot) aDecayPerShot.value = activeAmmo.decayPerShot || 0;
  aEnergyCost.value = activeAmmo.energyCost || 0;
  if (aEnergyMagazineSize) aEnergyMagazineSize.value = activeAmmo.energyMagazineSize || 0;
  if (aHeatModifier) aHeatModifier.value = activeAmmo.heatModifier !== undefined ? activeAmmo.heatModifier : 1.0;
  if (aHeatNeededToFire) aHeatNeededToFire.value = activeAmmo.heatNeededToFire || 0;

  aHardPointUsable.checked = activeAmmo.hardPointUsable !== false;
  if (aHybridRound) aHybridRound.checked = activeAmmo.hybridRound === true;
  aNpcSafe.checked = activeAmmo.npcSafe !== false;
  aNoGridOrArmorScaling.checked = activeAmmo.noGridOrArmorScaling === true;
  if (aIgnoreWater) aIgnoreWater.checked = activeAmmo.ignoreWater === true;
  if (aIgnoreVoxels) aIgnoreVoxels.checked = activeAmmo.ignoreVoxels === true;
  if (aIgnoreGrids) aIgnoreGrids.checked = activeAmmo.ignoreGrids === true;
  if (aAllowNegativeHeatModifier) aAllowNegativeHeatModifier.checked = activeAmmo.allowNegativeHeatModifier === true;
  if (aGridsTargetSeekersTargetingThis) aGridsTargetSeekersTargetingThis.checked = activeAmmo.gridsTargetSeekersTargetingThis === true;

  // TrajectoryDef & SmartsDef
  const traj = activeAmmo.trajectory || {};
  tDesiredSpeed.value = traj.desiredSpeed || activeAmmo.desiredSpeed || 1000;
  if (tAccelPerSec) tAccelPerSec.value = traj.accelPerSec || 0;
  tMaxTrajectory.value = traj.maxTrajectory || activeAmmo.maxTrajectory || 1500;
  tMaxLifeTime.value = traj.maxLifeTime || 3600;
  if (tSpeedVariance) tSpeedVariance.value = traj.speedVariance || 0;
  if (tRangeVariance) tRangeVariance.value = traj.rangeVariance || 0;
  if (tDeaccelTime) tDeaccelTime.value = traj.deaccelTime || 0;
  if (tFieldExponent) tFieldExponent.value = traj.fieldExponent !== undefined ? traj.fieldExponent : 1.0;
  if (tTargetLossDegree) tTargetLossDegree.value = traj.targetLossDegree || 0;
  if (tTargetLossTime) tTargetLossTime.value = traj.targetLossTime || 0;
  tGuidance.value = traj.guidance || 'None';

  const sm = traj.smarts || {};
  if (sInaccuracy) sInaccuracy.value = sm.inaccuracy || 0;
  if (sAggressiveness) sAggressiveness.value = sm.aggressiveness !== undefined ? sm.aggressiveness : 1.0;
  if (sNavAcceleration) sNavAcceleration.value = sm.navAcceleration || 0;
  if (sMaxLateralThrust) sMaxLateralThrust.value = sm.maxLateralThrust !== undefined ? sm.maxLateralThrust : 0.5;
  if (sNavAngle) sNavAngle.value = sm.navAngle || 0;
  if (sMinArmingRange) sMinArmingRange.value = sm.minimumArmingRange || 0;
  if (sScanRounds) sScanRounds.value = sm.scanRounds || 0;
  if (sSpeedLimit) sSpeedLimit.value = sm.speedLimit || 0;
  if (sVelocity) sVelocity.value = sm.velocity || 0;
  if (sSteeringLimit) sSteeringLimit.value = sm.steeringLimit || 0;
  if (sOverSteer) sOverSteer.checked = sm.overSteer === true;
  if (sStepVel) sStepVel.checked = sm.stepVel === true;
  if (sAltNavigation) sAltNavigation.checked = sm.altNavigation === true;

  // ShapeDef & ObjectsHitDef
  aShape.value = activeAmmo.shape || 'LineShape';
  aDiameter.value = activeAmmo.diameter !== undefined ? activeAmmo.diameter : -1;
  const objHit = activeAmmo.objectsHit || {};
  if (oMaxObjectsHit) oMaxObjectsHit.value = objHit.maxObjectsHit || 1;
  if (oCountBlocks) oCountBlocks.checked = objHit.countBlocks !== false;
  if (oSkipBlocksForAOE) oSkipBlocksForAOE.checked = objHit.skipBlocksForAOE === true;

  // DamageScaleDef
  const ds = activeAmmo.damageScales || {};
  if (dsMaxIntegrity) dsMaxIntegrity.value = ds.maxIntegrity || 0;
  dsShield.value = ds.damageToShields !== undefined ? ds.damageToShields : 1.0;
  if (dsCharacters) dsCharacters.value = ds.characters !== undefined ? ds.characters : 1.0;
  if (dsDamageType) dsDamageType.value = ds.damageType || 'BaseDamage';

  const arm = ds.armor || {};
  if (dsArmorArmor) dsArmorArmor.value = arm.armor !== undefined ? arm.armor : -1;
  dsLightArmor.value = arm.light !== undefined ? arm.light : -1;
  dsHeavyArmor.value = arm.heavy !== undefined ? arm.heavy : -1;
  if (dsNonArmor) dsNonArmor.value = arm.nonArmor !== undefined ? arm.nonArmor : -1;

  const fo = ds.fallOff || {};
  if (dsFalloffDistance) dsFalloffDistance.value = fo.distance || 0;
  if (dsFalloffMinMult) dsFalloffMinMult.value = fo.minMultipler || 0;

  const grd = ds.grids || {};
  if (dsGridLarge) dsGridLarge.value = grd.large !== undefined ? grd.large : -1;
  if (dsGridSmall) dsGridSmall.value = grd.small !== undefined ? grd.small : -1;

  const shld = ds.shields || {};
  if (dsShieldModifier) dsShieldModifier.value = shld.modifier !== undefined ? shld.modifier : (ds.damageToShields || 1.0);
  if (dsShieldType) dsShieldType.value = shld.type || 'Default';
  if (dsShieldBypassMod) dsShieldBypassMod.value = shld.bypassModifier || 0;

  // AreaOfDamageDef
  const aod = activeAmmo.areaOfDamage || {};
  const aodBlock = aod.byBlockHit || {};
  if (aodBlockEnable) aodBlockEnable.checked = aodBlock.enable === true;
  if (aodBlockRadius) aodBlockRadius.value = aodBlock.radius || 0;
  if (aodBlockDamage) aodBlockDamage.value = aodBlock.damage || 0;
  if (aodBlockDepth) aodBlockDepth.value = aodBlock.depth || 0;
  if (aodBlockMaxAbsorb) aodBlockMaxAbsorb.value = aodBlock.maxAbsorb || 0;
  if (aodBlockFalloff) aodBlockFalloff.value = aodBlock.falloff || 'Linear';
  if (aodBlockShape) aodBlockShape.value = aodBlock.shape || 'Sphere';

  const aodEol = aod.endOfLife || {};
  if (aodEolEnable) aodEolEnable.checked = aodEol.enable === true;
  if (aodEolRadius) aodEolRadius.value = aodEol.radius || 0;
  if (aodEolDamage) aodEolDamage.value = aodEol.damage || 0;
  if (aodEolDepth) aodEolDepth.value = aodEol.depth || 0;
  if (aodEolMaxAbsorb) aodEolMaxAbsorb.value = aodEol.maxAbsorb || 0;
  if (aodEolFalloff) aodEolFalloff.value = aodEol.falloff || 'Linear';
  if (aodEolShape) aodEolShape.value = aodEol.shape || 'Sphere';

  // FragmentDef
  const frag = activeAmmo.fragment || {};
  fEnable.checked = frag.enable === true;
  fReverse.checked = frag.reverse === true;
  fDropVelocity.checked = frag.dropVelocity === true;
  if (fIgnoreArming) fIgnoreArming.checked = frag.ignoreArming === true;
  if (fRadial) fRadial.checked = frag.radial === true;
  fFragments.value = frag.fragments || 0;
  fDegrees.value = frag.degrees || 15;
  if (fBackwardDegrees) fBackwardDegrees.value = frag.backwardDegrees || 0;
  if (fOffset) fOffset.value = frag.offset || 0;
  fChildAmmoRound.value = frag.ammoRound || '';
  fragStatusBadge.textContent = frag.enable ? `${frag.fragments} Frags Active` : 'Disabled';
  updateFragChainVisual();

  // PatternDef
  const pat = activeAmmo.pattern || {};
  if (pEnable) pEnable.checked = pat.enable === true;
  if (pPatterns) pPatterns.value = Array.isArray(pat.patterns) ? pat.patterns.join(', ') : (pat.patterns || '');
  if (pTriggerChance) pTriggerChance.value = pat.triggerChance !== undefined ? pat.triggerChance : 1.0;
  if (pRandomMin) pRandomMin.value = pat.randomMin || 0;
  if (pRandomMax) pRandomMax.value = pat.randomMax || 0;
  if (pPatternSteps) pPatternSteps.value = pat.patternSteps || 1;
  if (pMode) pMode.value = pat.mode || 'Never';
  if (pSkipParent) pSkipParent.checked = pat.skipParent === true;
  if (pRandom) pRandom.checked = pat.random === true;

  // EwarDef
  const ew = activeAmmo.ewar || {};
  if (ewEnable) ewEnable.checked = ew.enable === true;
  if (ewType) ewType.value = ew.type || 'AntiSmart';
  if (ewMode) ewMode.value = ew.mode || 'Effect';
  if (ewStrength) ewStrength.value = ew.strength || 100;
  if (ewRadius) ewRadius.value = ew.radius || 50;
  if (ewDuration) ewDuration.value = ew.duration || 600;
  if (ewMaxStacks) ewMaxStacks.value = ew.maxStacks || 1;
  if (ewStackDuration) ewStackDuration.checked = ew.stackDuration === true;
  if (ewDeplete) ewDeplete.checked = ew.deplete === true;

  // GraphicDef
  const gfx = activeAmmo.graphic || {};
  gVisualProb.value = gfx.visualProbability !== undefined ? gfx.visualProbability : 1.0;
  if (gShieldHitDraw) gShieldHitDraw.checked = gfx.shieldHitDraw !== false;

  const trc = gfx.lines ? gfx.lines.tracer : {};
  gTracerEnable.checked = trc.enable !== false;
  gTracerLength.value = trc.length !== undefined ? trc.length : 10;
  gTracerWidth.value = trc.width !== undefined ? trc.width : 0.1;
  if (gTracerColor) gTracerColor.value = trc.color || '255, 120, 20, 255';
  if (gTracerTexture) gTracerTexture.value = trc.texture || 'WeaponLaser';
  if (gTracerSegmented) gTracerSegmented.checked = trc.segmentation === true;

  const trl = gfx.lines ? gfx.lines.trail : {};
  if (gTrailEnable) gTrailEnable.checked = trl.enable === true;
  if (gTrailAlwaysDraw) gTrailAlwaysDraw.checked = trl.alwaysDraw === true;
  if (gTrailDecay) gTrailDecay.value = trl.decayTime || 60;
  if (gTrailWidth) gTrailWidth.value = trl.customWidth !== undefined ? trl.customWidth : 0.5;
  if (gTrailColor) gTrailColor.value = trl.color || '200, 200, 200, 180';
  if (gTrailTextures) gTrailTextures.value = Array.isArray(trl.textures) ? trl.textures.join(', ') : (trl.textures || 'WeaponLaser');

  // Audio
  const aud = activeAmmo.audio || {};
  if (aSoundShot) aSoundShot.value = aud.shotSound || '';
  aSoundTravel.value = aud.travelSound || '';
  aSoundHit.value = aud.hitSound || 'DOK_CannonHit';
  aSoundShieldHit.value = aud.shieldHitSound || '';
  if (aSoundVoxelHit) aSoundVoxelHit.value = aud.voxelHitSound || '';
  if (aSoundPlayerHit) aSoundPlayerHit.value = aud.playerHitSound || '';
  if (aSoundWaterHit) aSoundWaterHit.value = aud.waterHitSound || '';
  if (aHitPlayChance) aHitPlayChance.value = aud.hitPlayChance !== undefined ? aud.hitPlayChance : 1.0;
  if (aHitPlayShield) aHitPlayShield.checked = aud.hitPlayShield !== false;

  // SynchronizeDef
  const sync = activeAmmo.sync || {};
  if (syncInterval) syncInterval.value = sync.positionSyncInterval || 0;
  if (syncPatchWindow) syncPatchWindow.value = sync.positionPatchWindow || 0;
  if (syncFull) syncFull.checked = sync.full === true;
  if (syncPointDefense) syncPointDefense.checked = sync.pointDefense !== false;
  if (syncOnHitDeath) syncOnHitDeath.checked = sync.onHitDeath === true;
  if (syncUpdateOnRandomize) syncUpdateOnRandomize.checked = sync.positionUpdateOnRandomize === true;

  renderExtendedAmmoTags();
  runWeaponCoreLinter();
}

function updateFragChainVisual() {
  if (!fragChainVisual) return;
  const parentName = activeAmmo ? activeAmmo.name : 'Parent';
  const childName = fChildAmmoRound.value || 'None';
  const count = fFragments.value || 0;
  if (fEnable.checked && childName !== 'None' && childName !== '') {
    fragChainVisual.innerHTML = `<span>${parentName}</span> ──(💥 Spawns ${count} frags)──&gt; <span style="color: var(--amber-primary); font-weight: 700;">${childName}</span>`;
  } else {
    fragChainVisual.innerHTML = `<span style="color: var(--text-dim);">${parentName} (No submunitions configured)</span>`;
  }
}

function updateDirectSbcXml() {
  if (codeSbcXmlDirect) {
    codeSbcXmlDirect.textContent = generateSbcCubeBlocks();
  }
}

function populateSbcWorkbench() {
  if (!activeWeapon) return;
  sbcDisplayName.value = activeWeapon.displayName || activeWeapon.partName || activeWeapon.name || '';
  sbcCubeSize.value = activeWeapon.gridSize || activeWeapon.grid || 'Large';
  sbcUpCost.value = activeWeapon.upCost || activeWeapon.pcu || 6;
  sbcIsRelic.checked = activeWeapon.isRelic === true;

  renderSbcComponentsTable();
  updateDirectSbcXml();
}

function renderSbcComponentsTable() {
  const tbody = document.getElementById('sbcComponentsBody');
  const summary = document.getElementById('sbcIntegritySummary');
  const readout = document.getElementById('sbcFormulaReadout');
  if (!tbody || !activeWeapon) return;

  tbody.innerHTML = '';
  if (!activeWeapon.components) activeWeapon.components = [];

  let totalIntegrity = 0;
  let totalMassKg = 0;

  const compNames = Object.keys(componentsDb).sort();
  if (compNames.length === 0) {
    compNames.push("SteelPlate", "Construction", "LargeTube", "SmallTube", "Motor", "Computer", "MetalGrid", "PrototechMachinery", "PrototechFrame", "PrototechCircuitry");
  }

  activeWeapon.components.forEach((c, idx) => {
    const cMeta = componentsDb[c.name] || { mass: 20, integrity: 100 };
    const layerMass = (cMeta.mass || 0) * c.count;
    const layerHp = (cMeta.integrity || 0) * c.count;
    totalIntegrity += layerHp;
    totalMassKg += layerMass;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <select class="sbc-comp-select" data-idx="${idx}">
          ${compNames.map(cn => `<option value="${cn}" ${cn === c.name ? 'selected' : ''}>${cn}</option>`).join('')}
        </select>
      </td>
      <td>
        <input type="number" class="sbc-comp-input" data-idx="${idx}" min="1" max="50000" value="${c.count}">
      </td>
      <td style="font-family: var(--font-mono); color: var(--text-dim);">${layerMass.toFixed(1)} kg</td>
      <td style="font-family: var(--font-mono); color: var(--cyan-primary);">${layerHp.toLocaleString()}</td>
      <td style="text-align: center;">
        <button class="btn-delete-row" data-idx="${idx}" title="Delete Layer">✕</button>
      </td>
    `;

    tr.querySelector('select').addEventListener('change', (e) => {
      activeWeapon.components[idx].name = e.target.value;
      renderSbcComponentsTable();
      updateCombatTelemetry();
    });

    tr.querySelector('input').addEventListener('input', (e) => {
      const val = parseInt(e.target.value) || 1;
      activeWeapon.components[idx].count = val;
      renderSbcComponentsTable();
      updateCombatTelemetry();
    });

    tr.querySelector('.btn-delete-row').addEventListener('click', () => {
      if (activeWeapon.components.length > 1) {
        activeWeapon.components.splice(idx, 1);
        renderSbcComponentsTable();
        updateCombatTelemetry();
      } else {
        showToast("Weapon must have at least 1 component layer.");
      }
    });

    tbody.appendChild(tr);
  });

  // Calculate Build Time with user's formula: =MAX(5, Round(WeaponIntegrity / BuildTime_Mult, 0))
  const buildTimeDiv = balanceMatrix.buildTimeDividend || 750;
  const calculatedBuildTime = Math.max(5, Math.round(totalIntegrity / buildTimeDiv));
  activeWeapon.buildTime = calculatedBuildTime;
  if (sbcBuildTime) sbcBuildTime.value = calculatedBuildTime;

  if (summary) {
    summary.textContent = `Integrity: ${Math.round(totalIntegrity).toLocaleString()} HP | BuildTime: ${calculatedBuildTime}s`;
  }
  if (readout) {
    readout.innerHTML = `Formula: <code>MAX(5, Round(${Math.round(totalIntegrity).toLocaleString()} / ${buildTimeDiv})) = ${calculatedBuildTime}s</code>`;
  }

  // Update Effective Integrity
  const durMod = parseFloat(wDurabilityMod.value) || activeWeapon.durabilityMod || 0.5;
  activeWeapon.effectiveIntegrity = Math.round(totalIntegrity / durMod);

  // Auto-Derive Tech Information from Prototech components
  const techInfo = getTechSummary(activeWeapon.components);
  if (sbcTechSummary) sbcTechSummary.textContent = techInfo.summaryStr;
  if (sbcTechQtyDisplay) sbcTechQtyDisplay.textContent = `${techInfo.totalQty} Tech Items`;
  if (sbcHasCircuitry) sbcHasCircuitry.checked = techInfo.hasCircuitry;

  activeWeapon.techCount = techInfo.totalQty;
  activeWeapon.techComponent = techInfo.techLayers.length > 0 ? techInfo.techLayers[0].name : '';
  activeWeapon.hasCircuitry = techInfo.hasCircuitry;

  if (badgeTech) {
    badgeTech.innerHTML = `Tech: <strong>${techInfo.totalQty > 0 ? techInfo.summaryStr : 'None'}</strong>`;
  }
  if (badgeCircuitry) {
    badgeCircuitry.style.display = techInfo.hasCircuitry ? 'inline-flex' : 'none';
  }

  // Update Linter Check
  runWeaponCoreLinter();
}

// ==========================================================================
// TELEMETRY & COMBAT CALCULATOR
// ==========================================================================
function updateCombatTelemetry() {
  if (!activeWeapon || !activeAmmo) return;

  const rof = parseFloat(wRateOfFire.value) || 1000;
  const barrels = parseFloat(wBarrelsPerShot.value) || 1;
  const reloadTicks = parseFloat(wReloadTime.value) || 0;
  const magsToLoad = parseFloat(wMagsToLoad.value) || 1;
  const magSize = activeWeapon.magazineSize || 100;

  const baseDmg = parseFloat(aBaseDamage.value) || 0;
  const aodDmg = (aodBlockEnable && aodBlockEnable.checked ? safeFloat(aodBlockDamage.value, 0) : 0) + (aodEolEnable && aodEolEnable.checked ? safeFloat(aodEolDamage.value, 0) : 0);

  // Fragment damage
  let fragDmg = 0;
  if (fEnable.checked) {
    const frags = parseFloat(fFragments.value) || 0;
    const childAmmo = ammosDb[fChildAmmoRound.value];
    const childDmg = childAmmo ? childAmmo.baseDamage : 0;
    fragDmg = frags * childDmg * 0.75; // 75% hit probability
  }

  const damagePerShot = baseDmg + aodDmg + fragDmg;
  const alphaVolley = damagePerShot * barrels;

  // True Rate of Fire & Sustained Cycle
  const totalRounds = magSize * magsToLoad;
  const fireDurationSec = (totalRounds / rof) * 60;
  const reloadSec = reloadTicks / 60;
  const totalCycleSec = fireDurationSec + reloadSec;

  const effectiveRps = (totalCycleSec > 0) ? (totalRounds / totalCycleSec) : 0;
  const sustainedDps = Math.round(effectiveRps * damagePerShot);

  // Update Hero Metrics
  outSustainedDps.textContent = sustainedDps.toLocaleString();
  outDpsBreakdown.textContent = `Kinetic: ${Math.round(effectiveRps * baseDmg).toLocaleString()} | Blast: ${Math.round(effectiveRps * aodDmg).toLocaleString()} | Frag: ${Math.round(effectiveRps * fragDmg).toLocaleString()}`;
  outAlphaDmg.textContent = Math.round(alphaVolley).toLocaleString();
  outDamagePerShot.textContent = `Dmg / Shot: ${Math.round(damagePerShot).toLocaleString()} hp`;
  outShotsPerSec.innerHTML = `${effectiveRps.toFixed(1)} <span style="font-size: 14px; font-weight: 400;">sps</span>`;
  outCycleTime.textContent = `Cycle: ${totalCycleSec.toFixed(1)}s (${fireDurationSec.toFixed(1)}s shoot + ${reloadSec.toFixed(1)}s reload)`;

  // Traverse Speed
  const rotRad = parseFloat(wRotateRate.value) || 0.015;
  const elRad = parseFloat(wElevateRate.value) || 0.015;
  const rotDegSec = (rotRad * 60 * 180 / Math.PI).toFixed(1);
  const elDegSec = (elRad * 60 * 180 / Math.PI).toFixed(1);
  outTraverseDeg.innerHTML = `${rotDegSec}&deg;<span style="font-size: 14px; font-weight: 400;">/s</span>`;
  outTraverseAzEl.textContent = `Az: ${rotDegSec}°/s | El: ${elDegSec}°/s`;

  // Thermal Profile
  const heatShot = parseFloat(wHeatPerShot.value) || 0;
  const maxHeat = parseFloat(wMaxHeat.value) || 0;
  const sinkRate = parseFloat(wHeatSinkRate.value) || 0;
  const heatPerSec = (rof / 60) * heatShot;

  if (maxHeat > 0 && heatPerSec > sinkRate) {
    const netHeatSec = heatPerSec - sinkRate;
    const timeToOverheat = (maxHeat * 0.7) / netHeatSec;
    const cooldownSec = (maxHeat * 0.7) / sinkRate;
    const dutyCycle = Math.round((timeToOverheat / (timeToOverheat + cooldownSec)) * 100);

    outHeatDutyRatio.textContent = `${dutyCycle}% UPTIME`;
    heatProgressBar.style.width = `${dutyCycle}%`;
    outTimeToOverheat.textContent = `Continuous Fire: ${timeToOverheat.toFixed(1)}s`;
    outCooldownTime.textContent = `Cooldown Window: ${cooldownSec.toFixed(1)}s`;
    hudOverheat.textContent = `${timeToOverheat.toFixed(1)}s`;
  } else {
    outHeatDutyRatio.textContent = "100% UPTIME";
    heatProgressBar.style.width = "100%";
    outTimeToOverheat.textContent = "Continuous Fire: Unlimited";
    outCooldownTime.textContent = "Cooldown Window: 0s";
    hudOverheat.textContent = "Unlimited";
  }

  // Structural & Power
  const durMod = parseFloat(wDurabilityMod.value) || 0.5;
  const effIntegrity = activeWeapon.effectiveIntegrity || 150000;
  outEffectiveIntegrity.textContent = Math.round(effIntegrity).toLocaleString();
  outBuildTime.textContent = `Welding Time: ${Math.round(effIntegrity / balanceMatrix.buildTimeDividend)} seconds`;

  const idlePwr = parseFloat(wIdlePower.value) || 0.01;
  const energyPerShot = parseFloat(aEnergyCost.value) || 0;
  const operationalPwr = (idlePwr + (energyPerShot * (rof / 60) * 3600)).toFixed(2);
  outPowerMw.innerHTML = `${operationalPwr} <span style="font-size: 14px; font-weight: 400;">MW</span>`;
  outPowerIdle.textContent = `Idle Draw: ${idlePwr.toFixed(3)} MW`;

  // Sticky HUD updates
  hudDps.textContent = sustainedDps.toLocaleString();
  hudRange.textContent = `${tMaxTrajectory.value || 1500}m`;

  // Render BOM Table
  renderBomTable(effIntegrity, durMod);
}

// Target Dummy / TTK Simulator
function updateTtkSimulator() {
  if (!activeWeapon || !activeAmmo) return;

  const targetType = ttkTargetSelect.value;
  let targetHp = 16500;
  let targetName = "Heavy Armor Cube";

  if (targetType === 'lightArmor') {
    targetHp = 3000;
    targetName = "Light Armor Cube";
  } else if (targetType === 'battery') {
    targetHp = 11460;
    targetName = "Large Grid Battery";
  } else if (targetType === 'refinery') {
    targetHp = 37280;
    targetName = "Large Grid Refinery";
  }

  const dpsText = outSustainedDps.textContent.replace(/,/g, '');
  const sustainedDps = parseFloat(dpsText) || 1;

  const baseDmg = parseFloat(aBaseDamage.value) || 1;
  const aodDmg = (aodBlockEnable && aodBlockEnable.checked ? safeFloat(aodBlockDamage.value, 0) : 0) + (aodEolEnable && aodEolEnable.checked ? safeFloat(aodEolDamage.value, 0) : 0);
  const dmgPerShot = baseDmg + aodDmg;

  const ttkSeconds = (targetHp / sustainedDps);
  const shotsNeeded = Math.ceil(targetHp / dmgPerShot);

  if (ttkSeconds < 1.0) {
    outTtkMain.textContent = `${ttkSeconds.toFixed(2)}s to Destroy`;
  } else {
    outTtkMain.textContent = `${ttkSeconds.toFixed(1)}s to Destroy`;
  }

  outTtkRounds.textContent = `Requires ~${shotsNeeded.toLocaleString()} rounds against ${targetName}`;
  ttkProgressFill.style.width = `${Math.min(100, Math.max(5, 100 - (ttkSeconds * 10)))}%`;
}

// Initial D Dodgeability / Drift Lead Meter
function updateInitialDDriftMeter() {
  const muzzleSpeed = parseFloat(tDesiredSpeed.value) || 1000;
  const maxRange = parseFloat(tMaxTrajectory.value) || 1500;
  const driftSpeedMs = 27.78; // 100 km/h in m/s

  outFlightMuzzleSpd.textContent = `${Math.round(muzzleSpeed)} m/s`;

  // 500m
  const t500 = 500 / muzzleSpeed;
  outDelay500m.textContent = `${t500.toFixed(2)}s`;
  outLead500m.textContent = `${(t500 * driftSpeedMs).toFixed(1)}m drift`;

  // 1000m
  const t1000 = 1000 / muzzleSpeed;
  outDelay1000m.textContent = `${t1000.toFixed(2)}s`;
  outLead1000m.textContent = `${(t1000 * driftSpeedMs).toFixed(1)}m drift`;

  // Max Range
  const tMax = maxRange / muzzleSpeed;
  outMaxRangeLabel.textContent = `${Math.round(maxRange)}m (Max)`;
  outDelayMax.textContent = `${tMax.toFixed(2)}s`;
  outLeadMax.textContent = `${(tMax * driftSpeedMs).toFixed(1)}m drift`;
}

// ==========================================================================
// AMMO LOGISTICS & BLUEPRINTS ("AMMO MATHS")
// ==========================================================================
function updateAmmoLogistics() {
  if (!activeAmmo) return;

  logActiveAmmoName.textContent = activeAmmo.terminalName || activeAmmo.name;

  const targetDmgDensity = parseFloat(inputDmgDensity.value) || 5000;
  const physicalDensity = parseFloat(inputPhysicalDensity.value) || 4.0;
  const roleMult = parseFloat(selectRoleMultiplier.value) || 1.0;
  const craftTime = parseFloat(inputCraftTime.value) || 13;
  const rus = parseFloat(inputRUs.value) || 0;

  const baseDmg = parseFloat(aBaseDamage.value) || 100;
  const magCapacity = activeWeapon ? (activeWeapon.magazineSize || 100) : 100;
  const totalMagDamage = baseDmg * magCapacity;

  // Derived Volume & Mass
  const magVolumeL = totalMagDamage / targetDmgDensity;
  const magMassKg = magVolumeL * physicalDensity;

  outMagVolume.textContent = `${magVolumeL.toFixed(1)} L`;
  outMagMass.textContent = `${magMassKg.toFixed(1)} kg`;

  // Internal Buffer & Depletion
  const magsToLoad = activeWeapon ? (activeWeapon.magsToLoad || 4) : 4;
  const suggestedWeaponVolKL = (magVolumeL * magsToLoad * 2.2) / 1000;
  outSuggestedVol.textContent = `${suggestedWeaponVolKL.toFixed(2)} kL (2.2x)`;

  const rof = activeWeapon ? (activeWeapon.rateOfFire || 1000) : 1000;
  const depletionSec = ((magCapacity * magsToLoad) / rof) * 60;
  outDepletionTime.textContent = `${depletionSec.toFixed(1)} s`;

  // Cargo Packing & Fleet Endurance
  // Small Cargo: 3,375 L
  const smallMags = Math.floor(3375 / Math.max(0.1, magVolumeL));
  const smallTotalDmg = smallMags * totalMagDamage;
  const smallFireTimeSec = (smallMags * magCapacity / rof) * 60;

  outSmallCargoMags.textContent = `${smallMags.toLocaleString()} Mags`;
  outSmallCargoDmg.textContent = `Total Damage Stored: ${Math.round(smallTotalDmg).toLocaleString()} hp`;
  outSmall1GunTime.textContent = formatTime(smallFireTimeSec);
  outSmall20GunTime.textContent = formatTime(smallFireTimeSec / 20);

  // Large Cargo: 421,875 L
  const largeMags = Math.floor(421875 / Math.max(0.1, magVolumeL));
  const largeTotalDmg = largeMags * totalMagDamage;
  const largeFireTimeSec = (largeMags * magCapacity / rof) * 60;

  outLargeCargoMags.textContent = `${largeMags.toLocaleString()} Mags`;
  outLargeCargoDmg.textContent = `Total Damage Stored: ${Math.round(largeTotalDmg).toLocaleString()} hp`;
  outLarge1GunTime.textContent = formatTime(largeFireTimeSec);
  outLarge20GunTime.textContent = formatTime(largeFireTimeSec / 20);

  // XML Blueprint Prerequisites Generation
  // Economy: Base cost factor 0.50 SC / dmg * roleMult
  const totalCostCredits = totalMagDamage * 0.50 * roleMult;
  const ironKg = (magMassKg * 0.70).toFixed(1);
  const nickelKg = (magMassKg * 0.15).toFixed(1);
  const magnesiumKg = (magMassKg * 0.10).toFixed(2);
  const cobaltKg = (magMassKg * 0.05).toFixed(2);

  let xml = `  <Blueprint>\n`;
  xml += `    <Id>\n`;
  xml += `      <TypeId>BlueprintDefinition</TypeId>\n`;
  xml += `      <SubtypeId>${activeAmmo.ammoMagazine || activeAmmo.name}</SubtypeId>\n`;
  xml += `    </Id>\n`;
  xml += `    <DisplayName>${activeAmmo.terminalName || activeAmmo.name}</DisplayName>\n`;
  xml += `    <Icon>Textures\\GUI\\Icons\\ammo\\${activeAmmo.ammoMagazine || activeAmmo.name}.dds</Icon>\n`;
  xml += `    <Prerequisites>\n`;
  xml += `      <Item Amount="${ironKg}" TypeId="Ingot" SubtypeId="Iron" />\n`;
  xml += `      <Item Amount="${nickelKg}" TypeId="Ingot" SubtypeId="Nickel" />\n`;
  xml += `      <Item Amount="${magnesiumKg}" TypeId="Ingot" SubtypeId="Magnesium" />\n`;
  if (parseFloat(cobaltKg) > 0.01) {
    xml += `      <Item Amount="${cobaltKg}" TypeId="Ingot" SubtypeId="Cobalt" />\n`;
  }
  if (rus > 0) {
    xml += `      <Item Amount="${rus}" TypeId="Ingot" SubtypeId="GVK_RUs" />\n`;
  }
  xml += `    </Prerequisites>\n`;
  xml += `    <Result Amount="1" TypeId="AmmoMagazine" SubtypeId="${activeAmmo.ammoMagazine || activeAmmo.name}" />\n`;
  xml += `    <BaseProductionTimeInSeconds>${craftTime}</BaseProductionTimeInSeconds>\n`;
  xml += `  </Blueprint>`;

  codeBlueprintXml.textContent = xml;
}

function formatTime(seconds) {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)}m`;
  return `${(seconds / 3600).toFixed(1)}h`;
}

function setupLogisticsEvents() {
  if (inputDmgDensitySlider && inputDmgDensity) {
    inputDmgDensitySlider.addEventListener('input', (e) => {
      inputDmgDensity.value = e.target.value;
      updateAmmoLogistics();
    });
    inputDmgDensity.addEventListener('input', (e) => {
      inputDmgDensitySlider.value = e.target.value;
      updateAmmoLogistics();
    });
  }

  [inputPhysicalDensity, selectRoleMultiplier, inputRUs, inputCraftTime].forEach(el => {
    if (el) el.addEventListener('input', updateAmmoLogistics);
  });

  if (btnCopyBlueprintXml) {
    btnCopyBlueprintXml.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBlueprintXml.textContent).then(() => {
        showToast("📋 Blueprint <Prerequisites> XML copied to clipboard!");
      });
    });
  }
}

// ==========================================================================
// 1V1 COMBAT RADAR CHART
// ==========================================================================
function updateComparisonRadar() {
  if (!radarCanvas) return;
  const ctx = radarCanvas.getContext('2d');
  const w = radarCanvas.width;
  const h = radarCanvas.height;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(cx, cy) - 40;
  const axes = ['DPS', 'Alpha', 'Range', 'Velocity', 'Tracking', 'Thermal'];
  const totalAxes = axes.length;

  // Draw Hexagonal Web
  ctx.strokeStyle = '#263346';
  ctx.lineWidth = 1;
  for (let ring = 1; ring <= 4; ring++) {
    const r = (radius / 4) * ring;
    ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Draw Axis Lines & Labels
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < totalAxes; i++) {
    const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
    const lx = cx + (radius + 20) * Math.cos(angle);
    const ly = cy + (radius + 20) * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.stroke();
    ctx.fillText(axes[i], lx, ly);
  }

  // Calculate Normalized Stats for Active Weapon
  const activeDps = parseFloat(outSustainedDps.textContent.replace(/,/g, '')) || 0;
  const activeAlpha = parseFloat(outAlphaDmg.textContent.replace(/,/g, '')) || 0;
  const activeRange = parseFloat(tMaxTrajectory.value) || 1500;
  const activeVel = parseFloat(tDesiredSpeed.value) || 1000;
  const activeTrack = parseFloat(outTraverseDeg.textContent) || 10;
  const activeDuty = parseFloat(outHeatDutyRatio.textContent) || 100;

  const activeStats = [
    Math.min(1, activeDps / 12000),
    Math.min(1, activeAlpha / 25000),
    Math.min(1, activeRange / 6000),
    Math.min(1, activeVel / 2500),
    Math.min(1, activeTrack / 60),
    activeDuty / 100
  ];

  drawPolygon(ctx, cx, cy, radius, activeStats, 'rgba(245, 158, 11, 0.4)', '#f59e0b');

  // Benchmark Weapon
  if (benchmarkWeapon) {
    compBenchIcon.style.display = 'block';
    compBenchIcon.src = benchmarkWeapon.icon || '';
    legendBenchItem.style.display = 'flex';
    legendBenchName.textContent = benchmarkWeapon.name;

    const bAmmo = ammosDb[benchmarkWeapon.ammoName] || {};
    const bDps = benchmarkWeapon.sustainedDps || 5000;
    const bAlpha = benchmarkWeapon.alphaDamage || 10000;
    const bRange = bAmmo.trajectory ? bAmmo.trajectory.maxTrajectory : 2000;
    const bVel = bAmmo.trajectory ? bAmmo.trajectory.desiredSpeed : 1000;
    const bTrack = (benchmarkWeapon.rotateRate * 60 * 180 / Math.PI) || 10;
    const bDuty = 100;

    const benchStats = [
      Math.min(1, bDps / 12000),
      Math.min(1, bAlpha / 25000),
      Math.min(1, bRange / 6000),
      Math.min(1, bVel / 2500),
      Math.min(1, bTrack / 60),
      bDuty / 100
    ];

    drawPolygon(ctx, cx, cy, radius, benchStats, 'rgba(56, 189, 248, 0.35)', '#38bdf8');
    renderCompareTable(activeDps, activeAlpha, activeRange, activeVel, activeTrack, bDps, bAlpha, bRange, bVel, bTrack);
  } else {
    compBenchIcon.style.display = 'none';
    legendBenchItem.style.display = 'none';
    compareTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-dim);">Select a benchmark weapon above to compare</td></tr>';
  }
}

function drawPolygon(ctx, cx, cy, radius, stats, fillStyle, strokeStyle) {
  const total = stats.length;
  ctx.beginPath();
  for (let i = 0; i < total; i++) {
    const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
    const val = Math.max(0.1, stats[i]);
    const x = cx + radius * val * Math.cos(angle);
    const y = cy + radius * val * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function renderCompareTable(aDps, aAlpha, aRange, aVel, aTrack, bDps, bAlpha, bRange, bVel, bTrack) {
  const rows = [
    { name: 'Sustained DPS', a: aDps, b: bDps, unit: '' },
    { name: 'Alpha Salvo', a: aAlpha, b: bAlpha, unit: 'hp' },
    { name: 'Max Range', a: aRange, b: bRange, unit: 'm' },
    { name: 'Velocity', a: aVel, b: bVel, unit: 'm/s' },
    { name: 'Tracking Rate', a: aTrack, b: bTrack, unit: '°/s' },
  ];

  compareTableBody.innerHTML = rows.map(r => {
    const delta = ((r.a - r.b) / (r.b || 1)) * 100;
    const deltaColor = delta > 0 ? 'var(--green-accent)' : (delta < 0 ? 'var(--red-accent)' : 'var(--text-dim)');
    const deltaStr = (delta >= 0 ? '+' : '') + delta.toFixed(1) + '%';
    return `
      <tr>
        <td style="font-weight: 600;">${r.name}</td>
        <td style="font-family: var(--font-mono); color: var(--amber-primary);">${Math.round(r.a).toLocaleString()} ${r.unit}</td>
        <td style="font-family: var(--font-mono); color: var(--cyan-primary);">${Math.round(r.b).toLocaleString()} ${r.unit}</td>
        <td style="font-family: var(--font-mono); color: ${deltaColor}; font-weight: 700;">${deltaStr}</td>
      </tr>
    `;
  }).join('');
}

// ==========================================================================
// BILL OF MATERIALS (BOM) & VALUE
// ==========================================================================
function renderBomTable(effectiveIntegrity, durabilityMod) {
  if (!bomTableBody) return;
  bomTableBody.innerHTML = '';

  const comps = activeWeapon ? (activeWeapon.components || []) : [];
  let totalValueCredits = 0;

  comps.forEach(c => {
    const cMeta = componentsDb[c.name] || {};
    const mass = (cMeta.mass || 10) * c.count;
    const integ = (cMeta.integrity || 100) * c.count;
    const price = (cMeta.price || 150) * c.count;
    totalValueCredits += price;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight: 600;">${c.name}</td>
      <td style="font-family: var(--font-mono);">${c.count}</td>
      <td style="font-family: var(--font-mono); color: var(--text-dim);">${mass.toFixed(1)} kg</td>
      <td style="font-family: var(--font-mono); color: var(--cyan-primary);">${integ.toLocaleString()}</td>
    `;
    bomTableBody.appendChild(tr);
  });

  outTotalValue.textContent = `$${Math.round(totalValueCredits).toLocaleString()}`;
}

// ==========================================================================
// WEAPONCORE LINTER & CLANG HAZARD DETECTOR
// ==========================================================================
function runWeaponCoreLinter() {
  if (!activeWeapon || !linterBanner || !linterText) return;

  const criticalErrors = [];
  const warnings = [];

  // --- WEAPON CHECKS (Structure.cs / WeaponDefinition) ---
  const rof = safeInt(wRateOfFire.value, 0);
  if (rof <= 0) {
    criticalErrors.push("RateOfFire must be > 0 (Gun cannot cycle shots).");
  }

  const magsToLoad = safeInt(wMagsToLoad.value, 0);
  if (magsToLoad <= 0) {
    criticalErrors.push("MagsToLoad must be > 0 (Gun cannot reload magazines).");
  }

  const barrels = safeInt(wBarrelsPerShot.value, 0);
  if (barrels <= 0) {
    criticalErrors.push("BarrelsPerShot must be >= 1 (0 projectiles fired per cycle).");
  }

  const durMod = safeFloat(wDurabilityMod.value, 0);
  if (durMod <= 0) {
    criticalErrors.push("DurabilityMod must be > 0 (Prevents divide-by-zero in effective integrity).");
  }

  const muzzles = (wMuzzles.value || '').trim();
  if (!muzzles) {
    criticalErrors.push("Muzzle dummy list is empty (Projectiles will spawn inside the block).");
  }

  // Thermal & Overheat Safety
  const heatPerShot = safeFloat(wHeatPerShot.value, 0);
  const maxHeat = safeFloat(wMaxHeat.value, 0);
  const heatSink = safeFloat(wHeatSinkRate.value, 0);
  const cooldown = safeFloat(wCooldown.value, 0.5);

  if (heatPerShot > 0 && heatSink <= 0) {
    criticalErrors.push("HeatPerShot > 0 but HeatSinkRate is 0 (Permanent weapon overheat lock).");
  }
  if (maxHeat > 0 && (cooldown <= 0 || cooldown >= 1.0)) {
    criticalErrors.push("Cooldown threshold must be between 0.05 and 0.95 (0 or 1.0 breaks overheat reset).");
  }

  // Traversal & Aiming Bounds
  const isTurret = (activeWeapon.type === 'Turret');
  const rotRate = safeFloat(wRotateRate.value, 0);
  const elRate = safeFloat(wElevateRate.value, 0);
  const minAz = safeFloat(wMinAzimuth.value, -180);
  const maxAz = safeFloat(wMaxAzimuth.value, 180);
  const minEl = safeFloat(wMinElevation.value, -15);
  const maxEl = safeFloat(wMaxElevation.value, 80);
  const aimTol = safeFloat(wAimingTolerance.value, 0);

  if (isTurret) {
    if (rotRate <= 0) {
      warnings.push("Turret RotateRate is 0 (Turret cannot traverse in azimuth).");
    }
    if (elRate <= 0 && minEl !== maxEl && aimTol < 20) {
      warnings.push("Turret ElevateRate is 0 (Turret elevation locked without wide aiming tolerance).");
    }
    if (minAz > maxAz) {
      criticalErrors.push(`MinAzimuth (${minAz}°) cannot be greater than MaxAzimuth (${maxAz}°).`);
    }
    if (minEl > maxEl) {
      criticalErrors.push(`MinElevation (${minEl}°) cannot be greater than MaxElevation (${maxEl}°).`);
    }
    if (aimTol <= 0) {
      warnings.push("AimingTolerance is 0° (Turret will require infinite precision and rarely fire).");
    }
  }

  // Inventory Buffer
  const invSize = safeFloat(wInventorySize.value, 0);
  if (invSize <= 0) {
    criticalErrors.push("InventorySize must be > 0 (Gun inventory has 0 capacity).");
  }

  // Targeting Range Bounds
  const minRange = safeFloat(wMinTargetDistance.value, 0);
  const maxRange = safeFloat(wMaxTargetDistance.value, 0);
  if (minRange >= maxRange && maxRange > 0) {
    criticalErrors.push(`MinTargetDistance (${minRange}m) must be less than MaxTargetDistance (${maxRange}m).`);
  }

  // GVK Server Rules: Range Gate (>2km)
  const techInfo = getTechSummary(activeWeapon ? activeWeapon.components : null);
  if (maxRange > 2000 && !techInfo.hasCircuitry && !activeWeapon.isRelic) {
    warnings.push("Smart/turret range exceeds 2km: 1 PrototechCircuitry component layer is required in <Components>.");
  }

  // Component Layers Check
  if (!activeWeapon.components || activeWeapon.components.length === 0) {
    criticalErrors.push("Block has 0 construction component layers (Cube cannot be built).");
  }

  // --- AMMO CHECKS (Weapon75ammo.cs / AmmoDef) ---
  if (activeAmmo) {
    // Primary Ammo Usability
    const isAssignedPrimary = (activeWeapon.assignedAmmos && activeWeapon.assignedAmmos[0] === activeAmmo.name);
    if (isAssignedPrimary && aHardPointUsable && !aHardPointUsable.checked) {
      criticalErrors.push(`Primary ammo '${activeAmmo.name}' has HardPointUsable = false (Gun will refuse to fire).`);
    }

    // Trajectory Bounds
    const speed = safeFloat(tDesiredSpeed.value, 0);
    const maxTraj = safeFloat(tMaxTrajectory.value, 0);
    if (speed <= 0) {
      criticalErrors.push("DesiredSpeed must be > 0 (Projectile is frozen in space).");
    }
    if (maxTraj <= 0) {
      criticalErrors.push("MaxTrajectory must be > 0 (Projectile terminates at tick 0).");
    }

    // Collision Shape
    if (aShape && aShape.value === 'SphereShape') {
      const diam = safeFloat(aDiameter ? aDiameter.value : 0, 0);
      if (diam <= 0) {
        warnings.push("SphereShape Diameter must be > 0 (Collision hitbox has 0 volume).");
      }
    }

    // Fragmentation Recursion & Bounds
    if (fEnable && fEnable.checked) {
      const frags = safeInt(fFragments.value, 0);
      const childRound = fChildAmmoRound.value;
      if (frags <= 0) {
        warnings.push("FragmentDef is enabled but Fragments count is 0.");
      }
      if (childRound === activeAmmo.name || childRound === activeAmmo.ammoRound) {
        criticalErrors.push(`Infinite recursion detected: Ammo '${activeAmmo.name}' spawns itself as a fragment (Causes game crash).`);
      }
    }

    // Area of Damage Bounds
    if (aodBlockEnable && aodBlockEnable.checked) {
      const aoeRad = safeFloat(aodBlockRadius.value, 0);
      const aoeDmg = safeFloat(aodBlockDamage.value, 0);
      if (aoeRad <= 0 || aoeDmg <= 0) {
        warnings.push("ByBlockHit AOE is enabled but Radius or Damage is 0.");
      }
    }
    if (aodEolEnable && aodEolEnable.checked) {
      const aoeRad = safeFloat(aodEolRadius.value, 0);
      const aoeDmg = safeFloat(aodEolDamage.value, 0);
      if (aoeRad <= 0 || aoeDmg <= 0) {
        warnings.push("EndOfLife AOE is enabled but Radius or Damage is 0.");
      }
    }
  }

  // Render Linter Status
  if (criticalErrors.length > 0) {
    linterBanner.className = 'linter-banner danger';
    linterText.innerHTML = `<strong>🚨 CRITICAL CLANG / SYNTAX HAZARD:</strong> ${criticalErrors.join(' | ')}`;
  } else if (warnings.length > 0) {
    linterBanner.className = 'linter-banner warning';
    linterText.innerHTML = `<strong>⚠️ ENGINE / BALANCE WARNING:</strong> ${warnings.join(' | ')}`;
  } else {
    linterBanner.className = 'linter-banner clean';
    linterText.innerHTML = '<strong>🛡️ SYNTAX &amp; BALLISTICS HEALTHY:</strong> 0 Clang hazards detected. All types and numerical bounds valid.';
  }
}

// ==========================================================================
// MINIMAL WORKING DEF CREATORS
// ==========================================================================

// ==========================================================================
// UPGRADEDEFINITION CREATOR (Upgrade75aPart.cs support)
// ==========================================================================
function createMinimalUpgrade() {
  const name = prompt("Enter Upgrade SubtypeId (e.g. GVK_RadarBooster):", "GVK_UpgradeModule");
  if (!name) return;

  const newUp = {
    id: name,
    name: name.replace(/_/g, ' '),
    displayName: name.replace(/_/g, ' '),
    subtypeId: name,
    partName: name.replace(/_/g, ' '),
    gridSize: "Large",
    type: "Upgrade",
    rateOfFire: 1,
    barrelsPerShot: 1,
    reloadTime: 0,
    magsToLoad: 1,
    magazineSize: 1,
    ammoName: "None",
    assignedAmmos: ["None"],
    maxTargetDistance: 0,
    minTargetDistance: 0,
    rotateRate: 0,
    elevateRate: 0,
    idlePower: 0.25,
    inventorySize: 1.0,
    durabilityMod: 1.0,
    pcu: 4,
    upCost: 4,
    buildTime: 40,
    techCount: 2,
    techComponent: "PrototechMachinery",
    components: [
      { name: "SteelPlate", count: 80 },
      { name: "Construction", count: 40 },
      { name: "Computer", count: 20 },
      { name: "PrototechMachinery", count: 2 },
      { name: "SteelPlate", count: 20 }
    ]
  };

  weaponsDb.push(newUp);
  checkWcSchemaIntegrity();
  populateWeaponDropdowns();
  selectWeapon(newUp.id);
  showToast(`Created new UpgradeDefinition '${name}'.`);
}

function createMinimalWeapon() {
  const name = prompt("Enter new Weapon SubtypeId (e.g. GVK_FlakTurret):", "GVK_CustomTurret");
  if (!name) return;

  const newGun = {
    id: name,
    name: name.replace(/_/g, ' '),
    subtypeId: name,
    partName: name.replace(/_/g, ' '),
    gridSize: "Large",
    type: "Turret",
    rateOfFire: 600,
    barrelsPerShot: 1,
    reloadTime: 60,
    magsToLoad: 1,
    magazineSize: 30,
    ammoName: "NATO_25x184mm",
    assignedAmmos: ["NATO_25x184mm"],
    maxTargetDistance: 1500,
    minTargetDistance: 0,
    topTargets: 4,
    topBlocks: 4,
    stopTrackingSpeed: 1000,
    rotateRate: 0.02,
    elevateRate: 0.02,
    minAzimuth: -180,
    maxAzimuth: 180,
    minElevation: -10,
    maxElevation: 80,
    inventorySize: 0.6,
    idlePower: 0.01,
    durabilityMod: 0.5,
    effectiveIntegrity: 80000,
    pcu: 6,
    upCost: 6,
    techComponent: "PrototechMachinery",
    techCount: 6,
    isRelic: false,
    hasCircuitry: false,
    muzzles: ["muzzle_missile_1"],
    scope: "scope",
    components: [
      { name: "SteelPlate", count: 120 },
      { name: "Construction", count: 60 },
      { name: "LargeTube", count: 10 },
      { name: "Motor", count: 16 },
      { name: "Computer", count: 12 },
      { name: "PrototechMachinery", count: 6 }
    ]
  };

  weaponsDb.push(newGun);
  checkWcSchemaIntegrity();
  populateWeaponDropdowns();
  selectWeapon(newGun.id);
  showToast(`Created minimal turret definition: ${name}!`);
}

function createMinimalAmmo() {
  const name = prompt("Enter new AmmoRound identifier (e.g. NATO_30mm_AP):", "NATO_CustomRound");
  if (!name) return;

  const newAmmo = {
    name: name,
    ammoRound: name,
    ammoMagazine: `${name}_Mag`,
    terminalName: name.replace(/_/g, ' '),
    baseDamage: 250,
    mass: 2.0,
    health: 0,
    backKickForce: 50,
    hardPointUsable: true,
    npcSafe: false,
    noGridOrArmorScaling: false,
    shape: "LineShape",
    diameter: -1,
    fragment: { enable: false, ammoRound: "", fragments: 0, degrees: 0 },
    areaOfDamage: { enable: false, radius: 0, damage: 0, depth: 0 },
    trajectory: { desiredSpeed: 1200, maxTrajectory: 2000, maxLifeTime: 3600, guidance: "None" },
    damageScales: { shield: 1.0, lightArmor: -1.0, heavyArmor: -1.0, characters: -1.0 },
    graphics: { tracer: { enable: true, length: 12, width: 0.12 }, visualProbability: 1.0 },
    audio: { hitSound: "DOK_CannonHit" }
  };

  ammosDb[name] = newAmmo;
  populateAmmoDropdowns();
  selectAmmo(name);
  showToast(`Created minimal tracer ammo: ${name}!`);
}

// ==========================================================================
// CODE GENERATION & EXPORT
// ==========================================================================
function generateCSharpWeapon() {
  if (!activeWeapon) return "// No weapon selected";

  const pName = wPartName.value || activeWeapon.partName || activeWeapon.name;
  const sub = wSubtypeId.value || activeWeapon.subtypeId || activeWeapon.id;
  const dur = wDurabilityMod.value || 0.5;
  const scope = wScope.value || 'scope';
  const muzzles = (wMuzzles.value || 'muzzle_missile_1').split(',').map(m => `"${m.trim()}"`).join(', ');
  const spin = wSpinPartId ? wSpinPartId.value || 'None' : 'None';
  const muzPart = wMuzzlePartId ? wMuzzlePartId.value : '';
  const azPart = wAzimuthPartId ? wAzimuthPartId.value : '';
  const elPart = wElevationPartId ? wElevationPartId.value : '';
  const icon = wIconName ? wIconName.value : '';

  // Assigned ammos array
  const ammosList = (activeWeapon.assignedAmmos && activeWeapon.assignedAmmos.length > 0)
    ? activeWeapon.assignedAmmos.join(', ')
    : (activeWeapon.ammoName || 'NATO_25x184mm');

  // Animation binding
  const animRef = activeWeapon.assignedAnimation && activeWeapon.assignedAnimation !== 'None'
    ? `Animations = ${activeWeapon.assignedAnimation},`
    : `// Animations = None,`;

  let code = `        WeaponDefinition ${activeWeapon.id || sub} => new WeaponDefinition
`;
  code += `        {
`;
  code += `            Assignments = new ModelAssignmentsDef
`;
  code += `            {
`;
  code += `                MountPoints = new[]
`;
  code += `                {
`;
  code += `                    new MountPointDef
`;
  code += `                    {
`;
  code += `                        SubtypeId = "${sub}",
`;
  code += `                        SpinPartId = "${spin}",
`;
  if (muzPart) code += `                        MuzzlePartId = "${muzPart}",
`;
  if (azPart) code += `                        AzimuthPartId = "${azPart}",
`;
  if (elPart) code += `                        ElevationPartId = "${elPart}",
`;
  code += `                        DurabilityMod = ${dur}f,
`;
  code += `                        IconName = "${icon}",
`;
  code += `                    },
`;
  code += `                },
`;
  code += `                Muzzles = new[]
`;
  code += `                {
`;
  code += `                    ${muzzles},
`;
  code += `                },
`;
  code += `                Scope = "${scope}",
`;
  code += `            },
`;

  // Threats array
  const activeThreats = [];
  if (wThreatGrids && wThreatGrids.checked) activeThreats.push('Grids');
  if (wThreatProjectiles && wThreatProjectiles.checked) activeThreats.push('Projectiles');
  if (wThreatCharacters && wThreatCharacters.checked) activeThreats.push('Characters');
  if (wThreatMeteors && wThreatMeteors.checked) activeThreats.push('Meteors');
  if (wThreatNeutrals && wThreatNeutrals.checked) activeThreats.push('Neutrals');
  const threatsStr = activeThreats.length > 0 ? activeThreats.join(', ') : 'Grids';

  // Subsystems array
  const activeSubs = [];
  if (wSubOffense && wSubOffense.checked) activeSubs.push('Offense');
  if (wSubPower && wSubPower.checked) activeSubs.push('Power');
  if (wSubProduction && wSubProduction.checked) activeSubs.push('Production');
  if (wSubThrust && wSubThrust.checked) activeSubs.push('Thrust');
  if (wSubJumping && wSubJumping.checked) activeSubs.push('Jumping');
  if (wSubSteering && wSubSteering.checked) activeSubs.push('Steering');
  if (wSubAny && wSubAny.checked) activeSubs.push('Any');
  const subsStr = activeSubs.length > 0 ? activeSubs.join(', ') : 'Offense, Power, Thrust';

  if (activeWeapon.targetingPreset && !activeWeapon.targetingCustomized) {
    code += `            Targeting = ${activeWeapon.targetingPreset},
`;
  } else {
    code += `            Targeting = new TargetingDef
`;
    code += `            {
`;
    code += `                Threats = new[] { ${threatsStr} },
`;
    code += `                SubSystems = new[] { ${subsStr} },
`;
    code += `                ClosestFirst = ${wClosestFirst.checked ? 'true' : 'false'},
`;
    code += `                IgnoreDumbProjectiles = ${wIgnoreDumb.checked ? 'true' : 'false'},
`;
    code += `                LockedTarget = ${wLockedSmartOnly.checked ? 'true' : 'false'},
`;
    code += `                MaxTargetDistance = ${wMaxTargetDistance.value},
`;
    code += `                MinTargetDistance = ${wMinTargetDistance.value},
`;
    code += `                TopTargets = ${wTopTargets.value},
`;
    code += `                TopBlocks = ${wTopBlocks.value},
`;
    code += `                StopTrackingSpeed = ${wStopTrackingSpeed.value},
`;
    if (wMaxCost && parseFloat(wMaxCost.value) > 0) code += `                MaxCost = ${wMaxCost.value},
`;
    code += `            },
`;
  }

  code += `            HardPoint = new HardPointDef
`;
  code += `            {
`;
  code += `                PartName = "${pName}",
`;
  code += `                DeviateShotAngle = ${wDeviateAngle.value}f,
`;
  code += `                AimingTolerance = ${wAimingTolerance.value}f,
`;
  code += `                AimLeadingPrediction = ${wAimLeading.value},
`;
  code += `                DelayCeaseFire = ${wDelayCeaseFire.value},
`;
  if (wAddToleranceToTracking && wAddToleranceToTracking.checked) code += `                AddToleranceToTracking = true,
`;
  if (wCanShootSubmerged && wCanShootSubmerged.checked) code += `                CanShootSubmerged = true,
`;
  if (wNpcSafe) code += `                NpcSafe = ${wNpcSafe.checked ? 'true' : 'false'},
`;

  // UiDef
  code += `                Ui = new UiDef
`;
  code += `                {
`;
  code += `                    RateOfFire = ${wUiRateOfFire && wUiRateOfFire.checked ? 'true' : 'false'},
`;
  code += `                    DamageModifier = ${wUiDamageModifier && wUiDamageModifier.checked ? 'true' : 'false'},
`;
  code += `                    ToggleGuidance = ${wUiToggleGuidance && wUiToggleGuidance.checked ? 'true' : 'false'},
`;
  code += `                    EnableOverload = ${wUiEnableOverload && wUiEnableOverload.checked ? 'true' : 'false'},
`;
  code += `                },
`;

  // AiDef
  code += `                Ai = new AiDef
`;
  code += `                {
`;
  code += `                    TrackTargets = ${wAiTrackTargets && wAiTrackTargets.checked ? 'true' : 'false'},
`;
  code += `                    TurretAttached = ${wAiTurretAttached && wAiTurretAttached.checked ? 'true' : 'false'},
`;
  code += `                    TurretController = ${wAiTurretController && wAiTurretController.checked ? 'true' : 'false'},
`;
  code += `                    PrimaryTracking = ${wAiPrimaryTracking && wAiPrimaryTracking.checked ? 'true' : 'false'},
`;
  code += `                    LockOnFocus = ${wAiLockOnFocus && wAiLockOnFocus.checked ? 'true' : 'false'},
`;
  code += `                    SuppressActivityWhenTargetInfracted = ${wAiSuppressInfracted && wAiSuppressInfracted.checked ? 'true' : 'false'},
`;
  code += `                },
`;

  code += `                HardWare = new HardwareDef
`;
  code += `                {
`;
  code += `                    RotateRate = ${wRotateRate.value}f,
`;
  code += `                    ElevateRate = ${wElevateRate.value}f,
`;
  code += `                    MinAzimuth = ${wMinAzimuth.value},
`;
  code += `                    MaxAzimuth = ${wMaxAzimuth.value},
`;
  code += `                    MinElevation = ${wMinElevation.value},
`;
  code += `                    MaxElevation = ${wMaxElevation.value},
`;
  if (wHomeAzimuth && parseFloat(wHomeAzimuth.value) !== 0) code += `                    HomeAzimuth = ${wHomeAzimuth.value},
`;
  if (wHomeElevation && parseFloat(wHomeElevation.value) !== 0) code += `                    HomeElevation = ${wHomeElevation.value},
`;
  code += `                    InventorySize = ${wInventorySize.value}f,
`;
  code += `                    IdlePower = ${wIdlePower.value}f,
`;
  code += `                    Type = ${wHardwareType ? wHardwareType.value : 'BlockWeapon'},
`;
  if (wCriticalChance && parseFloat(wCriticalChance.value) > 0) code += `                    CriticalChance = ${wCriticalChance.value}f,
`;
  if (wOffsetX && (parseFloat(wOffsetX.value) !== 0 || parseFloat(wOffsetY.value) !== 0 || parseFloat(wOffsetZ.value) !== 0)) {
    code += `                    Offset = Vector(x: ${wOffsetX.value}f, y: ${wOffsetY.value}f, z: ${wOffsetZ.value}f),
`;
  }
  code += `                },
`;

  code += `                Loading = new LoadingDef
`;
  code += `                {
`;
  code += `                    RateOfFire = ${wRateOfFire.value},
`;
  code += `                    BarrelsPerShot = ${wBarrelsPerShot.value},
`;
  if (wTrajectilesPerBarrel && parseInt(wTrajectilesPerBarrel.value, 10) > 1) code += `                    TrajectilesPerBarrel = ${wTrajectilesPerBarrel.value},
`;
  if (wSkipBarrels && parseInt(wSkipBarrels.value, 10) > 0) code += `                    SkipBarrels = ${wSkipBarrels.value},
`;
  code += `                    ReloadTime = ${wReloadTime.value},
`;
  code += `                    MagsToLoad = ${wMagsToLoad.value},
`;
  if (wDelayUntilFire && parseInt(wDelayUntilFire.value, 10) > 0) code += `                    DelayUntilFire = ${wDelayUntilFire.value},
`;
  code += `                    HeatPerShot = ${wHeatPerShot.value}f,
`;
  code += `                    MaxHeat = ${wMaxHeat.value},
`;
  code += `                    HeatSinkRate = ${wHeatSinkRate.value},
`;
  code += `                    Cooldown = ${wCooldown.value}f,
`;
  if (wShotsInBurst && parseInt(wShotsInBurst.value, 10) > 0) {
    code += `                    ShotsInBurst = ${wShotsInBurst.value},
`;
    code += `                    DelayAfterBurst = ${wDelayAfterBurst.value},
`;
  }
  if (wFireFull && wFireFull.checked) code += `                    FireFull = true,
`;
  if (wGiveUpAfter && wGiveUpAfter.checked) code += `                    GiveUpAfter = true,
`;
  if (wGoHomeToReload && wGoHomeToReload.checked) code += `                    GoHomeToReload = true,
`;
  if (wDropTargetUntilLoaded && wDropTargetUntilLoaded.checked) code += `                    DropTargetUntilLoaded = true,
`;
  if (wDegradeWithHeat && wDegradeWithHeat.checked) code += `                    DegradeWithHeat = true,
`;
  if (wUseFillSound && wUseFillSound.checked) code += `                    UseFillSound = true,
`;
  code += `                },
`;

  code += `                Audio = new HardPointAudioDef
`;
  code += `                {
`;
  code += `                    FiringSound = "${wSoundFiring.value}",
`;
  if (wSoundPreFiring && wSoundPreFiring.value) code += `                    PreFiringSound = "${wSoundPreFiring.value}",
`;
  if (wSoundFiringPerShot && wSoundFiringPerShot.checked) code += `                    FiringSoundPerShot = true,
`;
  code += `                    ReloadSound = "${wSoundReload.value}",
`;
  code += `                    HardPointRotationSound = "${wSoundRotate.value}",
`;
  code += `                    NoAmmoSound = "${wSoundNoAmmo.value}",
`;
  code += `                },
`;

  // OtherDef
  code += `                Other = new OtherDef
`;
  code += `                {
`;
  if (wConstructPartCap && parseInt(wConstructPartCap.value, 10) > 0) code += `                    ConstructPartCap = ${wConstructPartCap.value},
`;
  if (wEnergyPriority && parseInt(wEnergyPriority.value, 10) > 0) code += `                    EnergyPriority = ${wEnergyPriority.value},
`;
  if (wRestrictionRadius && parseFloat(wRestrictionRadius.value) > 0) code += `                    RestrictionRadius = ${wRestrictionRadius.value}f,
`;
  if (wOtherDebug && wOtherDebug.checked) code += `                    Debug = true,
`;
  if (wCheckInflatedBox && wCheckInflatedBox.checked) code += `                    CheckInflatedBox = true,
`;
  if (wCheckForAnySupport && wCheckForAnySupport.checked) code += `                    CheckForAnySupport = true,
`;
  if (wStayCharged && wStayCharged.checked) code += `                    StayCharged = true,
`;
  if (wRotateToTarget && wRotateToTarget.checked) code += `                    RotateToTarget = true,
`;
  if (wStopTrackingAfterFiring && wStopTrackingAfterFiring.checked) code += `                    StopTrackingAfterFiring = true,
`;
  if (wNoVoxelLOSCheck && wNoVoxelLOSCheck.checked) code += `                    NoVoxelLOSCheck = true,
`;
  code += `                },
`;
  code += `            },
`;

  code += `            Ammos = new[]
`;
  code += `            {
`;
  code += `                ${ammosList},
`;
  code += `            },
`;

  if (activeWeapon.extendedTags && Object.keys(activeWeapon.extendedTags).length > 0) {
    code += `            // Extended / Auto-Discovered WeaponCore Tags
`;
    for (const [k, v] of Object.entries(activeWeapon.extendedTags)) {
      const formattedVal = (typeof v === 'boolean') ? (v ? 'true' : 'false') : (typeof v === 'number' ? `${v}f` : `"${v}"`);
      code += `            // ${k} = ${formattedVal},
`;
    }
  }

  code += `            ${animRef}
`;
  code += `        };
`;

  return code;
}

function generateCSharpAmmo() {
  if (!activeAmmo) return "// No ammo selected";

  const aRound = aAmmoRound.value || activeAmmo.name;
  const aMag = aAmmoMagazine.value || `${aRound}_Mag`;
  const aTerm = aTerminalName.value || aRound;

  let code = `        AmmoDef ${aRound} => new AmmoDef
`;
  code += `        {
`;
  code += `            AmmoMagazine = "${aMag}",
`;
  code += `            AmmoRound = "${aRound}",
`;
  code += `            TerminalName = "${aTerm}",
`;
  code += `            BaseDamage = ${aBaseDamage.value}f,
`;
  if (aBaseDamageCutoff && parseInt(aBaseDamageCutoff.value, 10) > 0) code += `            BaseDamageCutoff = ${aBaseDamageCutoff.value},
`;
  code += `            Mass = ${aMass.value}f,
`;
  code += `            Health = ${aHealth.value}f,
`;
  code += `            BackKickForce = ${aBackKick.value}f,
`;
  if (aDecayPerShot && parseFloat(aDecayPerShot.value) > 0) code += `            DecayPerShot = ${aDecayPerShot.value}f,
`;
  if (aEnergyCost && parseFloat(aEnergyCost.value) > 0) code += `            EnergyCost = ${aEnergyCost.value}f,
`;
  if (aEnergyMagazineSize && parseInt(aEnergyMagazineSize.value, 10) > 0) code += `            EnergyMagazineSize = ${aEnergyMagazineSize.value},
`;
  if (aHeatModifier && parseFloat(aHeatModifier.value) !== 1.0) code += `            HeatModifier = ${aHeatModifier.value}f,
`;
  if (aHeatNeededToFire && parseFloat(aHeatNeededToFire.value) > 0) code += `            HeatNeededToFire = ${aHeatNeededToFire.value}f,
`;
  code += `            HardPointUsable = ${aHardPointUsable.checked ? 'true' : 'false'},
`;
  if (aHybridRound && aHybridRound.checked) code += `            HybridRound = true,
`;
  code += `            NpcSafe = ${aNpcSafe.checked ? 'true' : 'false'},
`;
  code += `            NoGridOrArmorScaling = ${aNoGridOrArmorScaling.checked ? 'true' : 'false'},
`;
  if (aIgnoreWater && aIgnoreWater.checked) code += `            IgnoreWater = true,
`;
  if (aIgnoreVoxels && aIgnoreVoxels.checked) code += `            IgnoreVoxels = true,
`;
  if (aIgnoreGrids && aIgnoreGrids.checked) code += `            IgnoreGrids = true,
`;
  if (aAllowNegativeHeatModifier && aAllowNegativeHeatModifier.checked) code += `            AllowNegativeHeatModifier = true,
`;
  if (aGridsTargetSeekersTargetingThis && aGridsTargetSeekersTargetingThis.checked) code += `            GridsTargetSeekersTargetingThis = true,
`;

  // ShapeDef
  code += `            Shape = new ShapeDef
`;
  code += `            {
`;
  code += `                Shape = ${aShape.value},
`;
  code += `                Diameter = ${aDiameter.value}f,
`;
  code += `            },
`;

  // ObjectsHitDef
  if (oMaxObjectsHit && (parseInt(oMaxObjectsHit.value, 10) > 1 || !oCountBlocks.checked || oSkipBlocksForAOE.checked)) {
    code += `            ObjectsHit = new ObjectsHitDef
`;
    code += `            {
`;
    code += `                MaxObjectsHit = ${oMaxObjectsHit.value},
`;
    code += `                CountBlocks = ${oCountBlocks.checked ? 'true' : 'false'},
`;
    if (oSkipBlocksForAOE.checked) code += `                SkipBlocksForAOE = true,
`;
    code += `            },
`;
  }

  // FragmentDef
  if (fEnable.checked && fChildAmmoRound.value) {
    code += `            Fragment = new FragmentDef
`;
    code += `            {
`;
    code += `                AmmoRound = "${fChildAmmoRound.value}",
`;
    code += `                Fragments = ${fFragments.value},
`;
    code += `                Degrees = ${fDegrees.value}f,
`;
    if (fBackwardDegrees && parseFloat(fBackwardDegrees.value) > 0) code += `                BackwardDegrees = ${fBackwardDegrees.value}f,
`;
    if (fOffset && parseFloat(fOffset.value) !== 0) code += `                Offset = ${fOffset.value}f,
`;
    code += `                Reverse = ${fReverse.checked ? 'true' : 'false'},
`;
    code += `                DropVelocity = ${fDropVelocity.checked ? 'true' : 'false'},
`;
    if (fIgnoreArming && fIgnoreArming.checked) code += `                IgnoreArming = true,
`;
    if (fRadial && fRadial.checked) code += `                Radial = true,
`;
    code += `            },
`;
  }

  // AreaOfDamageDef
  const hasBlockAoe = aodBlockEnable && aodBlockEnable.checked && parseFloat(aodBlockRadius.value) > 0;
  const hasEolAoe = aodEolEnable && aodEolEnable.checked && parseFloat(aodEolRadius.value) > 0;

  if (hasBlockAoe || hasEolAoe) {
    code += `            AreaOfDamage = new AreaOfDamageDef
`;
    code += `            {
`;
    if (hasBlockAoe) {
      code += `                ByBlockHit = new ByBlockHitDef
`;
      code += `                {
`;
      code += `                    Enable = true,
`;
      code += `                    Radius = ${aodBlockRadius.value}f,
`;
      code += `                    Damage = ${aodBlockDamage.value}f,
`;
      code += `                    Depth = ${aodBlockDepth.value}f,
`;
      if (parseFloat(aodBlockMaxAbsorb.value) > 0) code += `                    MaxAbsorb = ${aodBlockMaxAbsorb.value}f,
`;
      code += `                    Falloff = ${aodBlockFalloff.value},
`;
      code += `                    Shape = ${aodBlockShape.value},
`;
      code += `                },
`;
    }
    if (hasEolAoe) {
      code += `                EndOfLife = new EndOfLifeDef
`;
      code += `                {
`;
      code += `                    Enable = true,
`;
      code += `                    Radius = ${aodEolRadius.value}f,
`;
      code += `                    Damage = ${aodEolDamage.value}f,
`;
      code += `                    Depth = ${aodEolDepth.value}f,
`;
      if (parseFloat(aodEolMaxAbsorb.value) > 0) code += `                    MaxAbsorb = ${aodEolMaxAbsorb.value}f,
`;
      code += `                    Falloff = ${aodEolFalloff.value},
`;
      code += `                    Shape = ${aodEolShape.value},
`;
      code += `                },
`;
    }
    code += `            },
`;
  }

  // TrajectoryDef
  code += `            Trajectory = new TrajectoryDef
`;
  code += `            {
`;
  code += `                DesiredSpeed = ${tDesiredSpeed.value}f,
`;
  if (tAccelPerSec && parseFloat(tAccelPerSec.value) > 0) code += `                AccelPerSec = ${tAccelPerSec.value}f,
`;
  code += `                MaxTrajectory = ${tMaxTrajectory.value}f,
`;
  code += `                MaxLifeTime = ${tMaxLifeTime.value},
`;
  if (tSpeedVariance && parseFloat(tSpeedVariance.value) > 0) code += `                SpeedVariance = ${tSpeedVariance.value}f,
`;
  if (tRangeVariance && parseFloat(tRangeVariance.value) > 0) code += `                RangeVariance = ${tRangeVariance.value}f,
`;
  if (tDeaccelTime && parseInt(tDeaccelTime.value, 10) > 0) code += `                DeaccelTime = ${tDeaccelTime.value},
`;
  if (tFieldExponent && parseFloat(tFieldExponent.value) !== 1.0) code += `                FieldExponent = ${tFieldExponent.value}f,
`;
  if (tTargetLossDegree && parseFloat(tTargetLossDegree.value) > 0) code += `                TargetLossDegree = ${tTargetLossDegree.value}f,
`;
  if (tTargetLossTime && parseInt(tTargetLossTime.value, 10) > 0) code += `                TargetLossTime = ${tTargetLossTime.value},
`;
  code += `                Guidance = ${tGuidance.value},
`;

  // Smarts
  if (tGuidance.value === 'Smart' || (sNavAcceleration && parseFloat(sNavAcceleration.value) > 0)) {
    code += `                Smarts = new SmartsDef
`;
    code += `                {
`;
    if (sInaccuracy && parseFloat(sInaccuracy.value) > 0) code += `                    Inaccuracy = ${sInaccuracy.value}f,
`;
    if (sAggressiveness) code += `                    Aggressiveness = ${sAggressiveness.value}f,
`;
    if (sNavAcceleration && parseFloat(sNavAcceleration.value) > 0) code += `                    NavAcceleration = ${sNavAcceleration.value}f,
`;
    if (sMaxLateralThrust) code += `                    MaxLateralThrust = ${sMaxLateralThrust.value}f,
`;
    if (sNavAngle && parseFloat(sNavAngle.value) > 0) code += `                    NavAngle = ${sNavAngle.value}f,
`;
    if (sMinArmingRange && parseFloat(sMinArmingRange.value) > 0) code += `                    MinimumArmingRange = ${sMinArmingRange.value}f,
`;
    if (sScanRounds && parseInt(sScanRounds.value, 10) > 0) code += `                    ScanRounds = ${sScanRounds.value},
`;
    if (sSpeedLimit && parseFloat(sSpeedLimit.value) > 0) code += `                    SpeedLimit = ${sSpeedLimit.value}f,
`;
    if (sVelocity && parseFloat(sVelocity.value) > 0) code += `                    Velocity = ${sVelocity.value}f,
`;
    if (sSteeringLimit && parseFloat(sSteeringLimit.value) > 0) code += `                    SteeringLimit = ${sSteeringLimit.value}f,
`;
    if (sOverSteer && sOverSteer.checked) code += `                    OverSteer = true,
`;
    if (sStepVel && sStepVel.checked) code += `                    StepVel = true,
`;
    if (sAltNavigation && sAltNavigation.checked) code += `                    AltNavigation = true,
`;
    code += `                },
`;
  }

  // Lossless preservation of Approaches if present
  if (activeAmmo.approachesRef) {
    if (activeAmmo.approachesRef !== 'Inline') {
      code += `                Approaches = ${activeAmmo.approachesRef},
`;
    } else {
      code += `                // Approaches preserved in C# source
`;
    }
  }
  code += `            },
`;

  // PatternDef
  if (pEnable && pEnable.checked && pPatterns.value) {
    const patList = pPatterns.value.split(',').map(p => `"${p.trim()}"`).join(', ');
    code += `            Pattern = new PatternDef
`;
    code += `            {
`;
    code += `                Enable = true,
`;
    code += `                Patterns = new[] { ${patList} },
`;
    code += `                TriggerChance = ${pTriggerChance.value}f,
`;
    code += `                SkipParent = ${pSkipParent.checked ? 'true' : 'false'},
`;
    code += `                Random = ${pRandom.checked ? 'true' : 'false'},
`;
    code += `                PatternSteps = ${pPatternSteps.value},
`;
    code += `                Mode = ${pMode.value},
`;
    code += `            },
`;
  }

  // EwarDef
  if (ewEnable && ewEnable.checked) {
    code += `            Ewar = new EwarDef
`;
    code += `            {
`;
    code += `                Enable = true,
`;
    code += `                Type = ${ewType.value},
`;
    code += `                Mode = ${ewMode.value},
`;
    code += `                Strength = ${ewStrength.value}f,
`;
    code += `                Radius = ${ewRadius.value}f,
`;
    code += `                Duration = ${ewDuration.value},
`;
    code += `                MaxStacks = ${ewMaxStacks.value},
`;
    code += `                StackDuration = ${ewStackDuration.checked ? 'true' : 'false'},
`;
    code += `                Deplete = ${ewDeplete.checked ? 'true' : 'false'},
`;
    code += `            },
`;
  }

  // DamageScaleDef
  code += `            DamageScales = new DamageScaleDef
`;
  code += `            {
`;
  if (dsMaxIntegrity && parseFloat(dsMaxIntegrity.value) > 0) code += `                MaxIntegrity = ${dsMaxIntegrity.value}f,
`;
  code += `                DamageToShields = ${dsShield.value}f,
`;
  if (dsCharacters) code += `                Characters = ${dsCharacters.value}f,
`;
  code += `                Armor = new ArmorDef
`;
  code += `                {
`;
  if (dsArmorArmor) code += `                    Armor = ${dsArmorArmor.value}f,
`;
  code += `                    Light = ${dsLightArmor.value}f,
`;
  code += `                    Heavy = ${dsHeavyArmor.value}f,
`;
  if (dsNonArmor) code += `                    NonArmor = ${dsNonArmor.value}f,
`;
  code += `                },
`;
  if (dsFalloffDistance && parseFloat(dsFalloffDistance.value) > 0) {
    code += `                FallOff = new FallOffDef
`;
    code += `                {
`;
    code += `                    Distance = ${dsFalloffDistance.value}f,
`;
    code += `                    MinMultipler = ${dsFalloffMinMult.value}f,
`;
    code += `                },
`;
  }
  if (dsGridLarge && (parseFloat(dsGridLarge.value) !== -1 || parseFloat(dsGridSmall.value) !== -1)) {
    code += `                Grids = new GridSizeDef
`;
    code += `                {
`;
    code += `                    Large = ${dsGridLarge.value}f,
`;
    code += `                    Small = ${dsGridSmall.value}f,
`;
    code += `                },
`;
  }
  code += `                DamageType = new DamageTypes
`;
  code += `                {
`;
  code += `                    BaseDamage = true,
`;
  code += `                },
`;
  code += `                Shields = new ShieldDef
`;
  code += `                {
`;
  code += `                    Modifier = ${dsShieldModifier.value}f,
`;
  code += `                    Type = ${dsShieldType.value},
`;
  if (dsShieldBypassMod && parseFloat(dsShieldBypassMod.value) > 0) code += `                    BypassModifier = ${dsShieldBypassMod.value}f,
`;
  code += `                },
`;
  code += `            },
`;

  // SynchronizeDef
  code += `            Sync = new SynchronizeDef
`;
  code += `            {
`;
  code += `                Full = ${syncFull && syncFull.checked ? 'true' : 'false'},
`;
  code += `                PointDefense = ${syncPointDefense && syncPointDefense.checked ? 'true' : 'false'},
`;
  code += `                OnHitDeath = ${syncOnHitDeath && syncOnHitDeath.checked ? 'true' : 'false'},
`;
  if (syncInterval && parseInt(syncInterval.value, 10) > 0) code += `                PositionSyncInterval = ${syncInterval.value},
`;
  if (syncPatchWindow && parseInt(syncPatchWindow.value, 10) > 0) code += `                PositionPatchWindow = ${syncPatchWindow.value},
`;
  if (syncUpdateOnRandomize && syncUpdateOnRandomize.checked) code += `                PositionUpdateOnRandomize = true,
`;
  code += `            },
`;

  // GraphicDef
  code += `            Graphic = new GraphicDef
`;
  code += `            {
`;
  code += `                VisualProbability = ${gVisualProb.value}f,
`;
  if (gShieldHitDraw) code += `                ShieldHitDraw = ${gShieldHitDraw.checked ? 'true' : 'false'},
`;
  code += `                Lines = new LineDef
`;
  code += `                {
`;
  code += `                    Tracer = new TracerBaseDef
`;
  code += `                    {
`;
  code += `                        Enable = ${gTracerEnable.checked ? 'true' : 'false'},
`;
  code += `                        Length = ${gTracerLength.value}f,
`;
  code += `                        Width = ${gTracerWidth.value}f,
`;
  if (gTracerColor) code += `                        Color = Color(${gTracerColor.value}),
`;
  if (gTracerTexture) code += `                        Textures = new[] { "${gTracerTexture.value}" },
`;
  if (gTracerSegmented && gTracerSegmented.checked) code += `                        Segmentation = true,
`;
  code += `                    },
`;
  if (gTrailEnable && gTrailEnable.checked) {
    code += `                    Trail = new TrailDef
`;
    code += `                    {
`;
    code += `                        Enable = true,
`;
    code += `                        AlwaysDraw = ${gTrailAlwaysDraw.checked ? 'true' : 'false'},
`;
    code += `                        DecayTime = ${gTrailDecay.value},
`;
    code += `                        CustomWidth = ${gTrailWidth.value}f,
`;
    if (gTrailColor) code += `                        Color = Color(${gTrailColor.value}),
`;
    if (gTrailTextures) code += `                        Textures = new[] { "${gTrailTextures.value}" },
`;
    code += `                    },
`;
  }
  code += `                },
`;
  code += `            },
`;

  // AudioDef
  code += `            Audio = new AmmoAudioDef
`;
  code += `            {
`;
  if (aSoundShot && aSoundShot.value) code += `                ShotSound = "${aSoundShot.value}",
`;
  code += `                TravelSound = "${aSoundTravel.value}",
`;
  code += `                HitSound = "${aSoundHit.value}",
`;
  code += `                ShieldHitSound = "${aSoundShieldHit.value}",
`;
  if (aSoundVoxelHit && aSoundVoxelHit.value) code += `                VoxelHitSound = "${aSoundVoxelHit.value}",
`;
  if (aSoundPlayerHit && aSoundPlayerHit.value) code += `                PlayerHitSound = "${aSoundPlayerHit.value}",
`;
  if (aSoundWaterHit && aSoundWaterHit.value) code += `                WaterHitSound = "${aSoundWaterHit.value}",
`;
  if (aHitPlayChance) code += `                HitPlayChance = ${aHitPlayChance.value}f,
`;
  if (aHitPlayShield) code += `                HitPlayShield = ${aHitPlayShield.checked ? 'true' : 'false'},
`;
  code += `            },
`;

  if (activeAmmo.extendedTags && Object.keys(activeAmmo.extendedTags).length > 0) {
    code += `            // Extended / Auto-Discovered WeaponCore Tags
`;
    for (const [k, v] of Object.entries(activeAmmo.extendedTags)) {
      const formattedVal = (typeof v === 'boolean') ? (v ? 'true' : 'false') : (typeof v === 'number' ? `${v}f` : `"${v}"`);
      code += `            ${k} = ${formattedVal},
`;
    }
  }

  code += `        };
`;

  return code;
}

function generateSbcCubeBlocks() {
  if (!activeWeapon) return "<!-- No weapon selected -->";

  const sub = sbcDisplayName.value ? activeWeapon.subtypeId : "GVK_CustomTurret";
  const name = sbcDisplayName.value || activeWeapon.name;
  const grid = sbcCubeSize.value || "Large";
  const bTime = sbcBuildTime.value || 78;
  const upCost = sbcUpCost.value || 6;
  const techComp = activeWeapon.techComponent || "PrototechMachinery";
  const techQty = activeWeapon.techCount || 6;

  let xml = `  <Definition xsi:type="MyObjectBuilder_LargeTurretBaseDefinition">\n`;
  xml += `    <Id>\n`;
  xml += `      <TypeId>LargeGatlingTurret</TypeId>\n`;
  xml += `      <SubtypeId>${sub}</SubtypeId>\n`;
  xml += `    </Id>\n`;
  xml += `    <DisplayName>${name}</DisplayName>\n`;
  xml += `    <Icon>Textures\\GUI\\Icons\\Cubes\\${sub}.dds</Icon>\n`;
  xml += `    <Description>GVK WeaponCore Specialized Armament.</Description>\n`;
  xml += `    <CubeSize>${grid}</CubeSize>\n`;
  xml += `    <BlockTopology>TriangleMesh</BlockTopology>\n`;
  xml += `    <Size x="3" y="3" z="3" />\n`;
  xml += `    <ModelOffset x="0" y="0" z="0" />\n`;
  xml += `    <Model>Models\\Cubes\\Large\\${sub}.mwm</Model>\n`;
  xml += `    <!-- MANDATORY KEEN AI SUPPRESSION FOR WEAPONCORE TURRETS -->\n`;
  xml += `    <AiEnabled>false</AiEnabled>\n`;
  xml += `    <Components>\n`;
  if (activeWeapon.components && activeWeapon.components.length > 0) {
    activeWeapon.components.forEach(c => {
      xml += `      <Component Subtype="${c.name}" Count="${c.count}" />\n`;
    });
  } else {
    xml += `      <Component Subtype="SteelPlate" Count="150" />\n`;
    xml += `      <Component Subtype="Construction" Count="80" />\n`;
    xml += `      <Component Subtype="LargeTube" Count="16" />\n`;
    xml += `      <Component Subtype="Motor" Count="20" />\n`;
    xml += `      <Component Subtype="Computer" Count="24" />\n`;
    xml += `      <Component Subtype="${techComp}" Count="${techQty}" />\n`;
  }
  xml += `    </Components>\n`;
  xml += `    <CriticalComponent Subtype="Computer" Index="0" />\n`;
  xml += `    <BuildTimeSeconds>${bTime}</BuildTimeSeconds>\n`;
  xml += `    <PCU>${upCost}</PCU>\n`;
  xml += `  </Definition>`;

  return xml;
}

// ==========================================================================
// MODAL EVENTS & FILE SAVING
// ==========================================================================
function setupModalEvents() {
  if (btnOpenCodeWorkbench) {
    btnOpenCodeWorkbench.addEventListener('click', openCodeModal);
  }
  if (btnHudExport) {
    btnHudExport.addEventListener('click', openCodeModal);
  }
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      codeModal.style.display = 'none';
    });
  }

  // Code tab switching
  const codeTabs = document.querySelectorAll('[data-codetab]');
  codeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      codeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-codetab');
      ['code-weapon-cs', 'code-ammo-cs', 'code-cubeblocks-sbc', 'code-blueprints-sbc'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === targetId) ? 'block' : 'none';
      });
    });
  });

  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', () => {
      const activeCodeBox = document.querySelector('.code-box:not([style*="display: none"])');
      if (activeCodeBox) {
        navigator.clipboard.writeText(activeCodeBox.textContent).then(() => {
          showToast("📋 Code definition copied to clipboard!");
        });
      }
    });
  }

  // Balance Matrix Modal
  if (btnBalanceMatrix) {
    btnBalanceMatrix.addEventListener('click', () => {
      balanceMatrixModal.style.display = 'flex';
    });
  }
  if (btnCloseMatrix) {
    btnCloseMatrix.addEventListener('click', () => {
      balanceMatrixModal.style.display = 'none';
    });
  }
  if (btnApplyMatrix) {
    btnApplyMatrix.addEventListener('click', () => {
      applyBalanceMatrixInputs();
      balanceMatrixModal.style.display = 'none';
      showToast("⚙️ Server Balance Matrix updated & applied!");
    });
  }
  if (btnResetMatrix) {
    btnResetMatrix.addEventListener('click', () => {
      balanceMatrix = { ...DEFAULT_BALANCE_MATRIX };
      syncBalanceMatrixInputs();
      localStorage.removeItem('GVK_BALANCE_MATRIX');
      updateCombatTelemetry();
      updateAmmoLogistics();
      showToast("↺ Reset Balance Matrix to official GVK defaults.");
    });
  }

  // Link Mod Directory
  if (btnLinkLocal) {
    btnLinkLocal.addEventListener('click', async () => {
      try {
        if ('showDirectoryPicker' in window) {
          modDirectoryHandle = await window.showDirectoryPicker();
          saveStatusHint.textContent = `Connected to local mod directory: ${modDirectoryHandle.name}`;
          btnSaveToDisk.disabled = false;
          showToast(`📁 Connected to local folder: ${modDirectoryHandle.name}!`);
        } else {
          showToast("⚠️ Directory picker not supported by this browser.");
        }
      } catch (err) {
        console.warn("Folder picker cancelled or failed:", err);
      }
    });
  }
}

function openCodeModal() {
  document.getElementById('code-weapon-cs').textContent = generateCSharpWeapon();
  document.getElementById('code-ammo-cs').textContent = generateCSharpAmmo();
  document.getElementById('code-cubeblocks-sbc').textContent = generateSbcCubeBlocks();
  document.getElementById('code-blueprints-sbc').textContent = codeBlueprintXml.textContent;
  codeModal.style.display = 'flex';
}

function syncBalanceMatrixInputs() {
  document.getElementById('matBuildTimeDividend').value = balanceMatrix.buildTimeDividend;
  document.getElementById('matScPer1U').value = balanceMatrix.scPer1U;
  document.getElementById('matScPerDamage').value = balanceMatrix.scPerDamage;
  document.getElementById('matMinIntegrity').value = balanceMatrix.minIntegrity;
  document.getElementById('matMidIntegrity').value = balanceMatrix.midIntegrity;
  document.getElementById('matMaxIntegrity').value = balanceMatrix.maxIntegrity;
  document.getElementById('matMinSize').value = balanceMatrix.minSize;
  document.getElementById('matMidSize').value = balanceMatrix.midSize;
  document.getElementById('matMaxSize').value = balanceMatrix.maxSize;
  document.getElementById('matAssemblerEff').value = balanceMatrix.assemblerEff;
  document.getElementById('matScrapYield').value = balanceMatrix.scrapYield;
}

function applyBalanceMatrixInputs() {
  balanceMatrix.buildTimeDividend = parseFloat(document.getElementById('matBuildTimeDividend').value) || 750;
  balanceMatrix.scPer1U = parseFloat(document.getElementById('matScPer1U').value) || 207284;
  balanceMatrix.scPerDamage = parseFloat(document.getElementById('matScPerDamage').value) || 3.0;
  balanceMatrix.minIntegrity = parseFloat(document.getElementById('matMinIntegrity').value) || 2500;
  balanceMatrix.midIntegrity = parseFloat(document.getElementById('matMidIntegrity').value) || 25000;
  balanceMatrix.maxIntegrity = parseFloat(document.getElementById('matMaxIntegrity').value) || 400000;
  balanceMatrix.minSize = parseFloat(document.getElementById('matMinSize').value) || 0.032;
  balanceMatrix.midSize = parseFloat(document.getElementById('matMidSize').value) || 1.0;
  balanceMatrix.maxSize = parseFloat(document.getElementById('matMaxSize').value) || 125;
  balanceMatrix.assemblerEff = parseFloat(document.getElementById('matAssemblerEff').value) || 3.0;
  balanceMatrix.scrapYield = parseFloat(document.getElementById('matScrapYield').value) || 0.25;

  localStorage.setItem('GVK_BALANCE_MATRIX', JSON.stringify(balanceMatrix));
  updateCombatTelemetry();
  updateAmmoLogistics();
}

function setupWorkbenchInputEvents() {
  if (btnCopySbcXmlDirect) {
    btnCopySbcXmlDirect.addEventListener('click', () => {
      navigator.clipboard.writeText(generateSbcCubeBlocks()).then(() => {
        showToast("📋 Copied CubeBlocks SBC XML to clipboard!");
      });
    });
  }
  if (btnDownloadSbcDirect) {
    btnDownloadSbcDirect.addEventListener('click', () => {
      const sub = activeWeapon ? (activeWeapon.subtypeId || activeWeapon.id) : 'CubeBlock';
      downloadFile(`${sub}.sbc`, generateSbcCubeBlocks(), 'application/xml');
    });
  }

  // Extended Tag Buttons
  if (btnAddWeaponExtendedTag) {
    btnAddWeaponExtendedTag.addEventListener('click', () => {
      if (!activeWeapon) return;
      const tag = prompt("Enter WeaponCore Weapon tag name (e.g. ConstructPartCap, EnergyPriority, RestrictionRadius):", "EnergyPriority");
      if (!tag) return;
      if (!activeWeapon.extendedTags) activeWeapon.extendedTags = {};
      activeWeapon.extendedTags[tag] = 0;
      renderExtendedWeaponTags();
      showToast(`Added custom tag '${tag}' to weapon.`);
    });
  }

  if (btnAddAmmoExtendedTag) {
    btnAddAmmoExtendedTag.addEventListener('click', () => {
      if (!activeAmmo) return;
      const tag = prompt("Enter WeaponCore Ammo tag name (e.g. DecayPerShot, IgnoreWater, IgnoreVoxels, IgnoreGrids, HeatNeededToFire):", "IgnoreWater");
      if (!tag) return;
      if (!activeAmmo.extendedTags) activeAmmo.extendedTags = {};
      activeAmmo.extendedTags[tag] = true;
      renderExtendedAmmoTags();
      showToast(`Added custom tag '${tag}' to ammo.`);
    });
  }

  // Live recalculation on any input change
  const liveInputs = [
    wRateOfFire, wBarrelsPerShot, wReloadTime, wMagsToLoad, wHeatPerShot, wMaxHeat, wHeatSinkRate, wCooldown,
    wRotateRate, wElevateRate, aBaseDamage, aMass, aEnergyCost, aodBlockEnable, aodBlockRadius, aodBlockDamage, aodEolEnable, aodEolRadius, aodEolDamage,
    fEnable, fFragments, fDegrees, fChildAmmoRound, tDesiredSpeed, tMaxTrajectory,
    sbcDisplayName, sbcCubeSize, sbcBuildTime, sbcUpCost, sbcIsRelic, sbcHasCircuitry
  ];

  liveInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (input === fChildAmmoRound || input === fEnable || input === fFragments) {
          updateFragChainVisual();
        }
        updateCombatTelemetry();
        updateTtkSimulator();
        updateInitialDDriftMeter();
        updateAmmoLogistics();
        updateComparisonRadar();
        runWeaponCoreLinter();
      });
    }
  });

  // Targeting fields convert shared preset to custom override
  const targetingInputs = [wMaxTargetDistance, wMinTargetDistance, wTopTargets, wTopBlocks, wStopTrackingSpeed, wClosestFirst, wIgnoreDumb];
  targetingInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (activeWeapon && activeWeapon.helpers && activeWeapon.helpers.targeting) {
          activeWeapon.targetingOverridden = true;
          badgeTargetingHelper.textContent = "Custom Override";
          badgeTargetingHelper.style.background = "rgba(245, 158, 11, 0.2)";
          badgeTargetingHelper.style.color = "var(--amber-primary)";
          btnRevertTargeting.style.display = "inline-block";
        }
      });
    }
  });

  if (btnRevertTargeting) {
    btnRevertTargeting.addEventListener('click', () => {
      if (activeWeapon && activeWeapon.helpers && activeWeapon.helpers.targeting) {
        activeWeapon.targetingOverridden = false;
        badgeTargetingHelper.textContent = `Shared: ${activeWeapon.helpers.targeting}`;
        badgeTargetingHelper.style.background = "rgba(56, 189, 248, 0.15)";
        badgeTargetingHelper.style.color = "var(--cyan-primary)";
        btnRevertTargeting.style.display = "none";
        showToast(`↺ Reverted targeting to shared ${activeWeapon.helpers.targeting}`);
      }
    });
  }

    const btnAddSbcComponent = document.getElementById('btnAddSbcComponent');
  if (btnAddSbcComponent) {
    btnAddSbcComponent.addEventListener('click', () => {
      if (!activeWeapon) return;
      if (!activeWeapon.components) activeWeapon.components = [];
      activeWeapon.components.push({ name: 'SteelPlate', count: 20 });
      renderSbcComponentsTable();
      updateCombatTelemetry();
      showToast("Added new component layer.");
    });
  }

  const btnNewMinimalUpgrade = document.getElementById('btnNewMinimalUpgrade');
  if (btnNewMinimalUpgrade) btnNewMinimalUpgrade.addEventListener('click', createMinimalUpgrade);
  if (btnNewMinimalWeapon) btnNewMinimalWeapon.addEventListener('click', createMinimalWeapon);
  if (btnNewMinimalAmmo) btnNewMinimalAmmo.addEventListener('click', createMinimalAmmo);
  if (btnNewFragAmmo) btnNewFragAmmo.addEventListener('click', createMinimalAmmo);

  if (btnResetDefaults) {
    btnResetDefaults.addEventListener('click', () => {
      if (!activeWeapon) return;
      const orig = window.GVK_DEFAULT_WEAPONS.find(w => w.id === activeWeapon.id);
      if (orig) {
        const idx = weaponsDb.findIndex(w => w.id === activeWeapon.id);
        weaponsDb[idx] = JSON.parse(JSON.stringify(orig));
        selectWeapon(activeWeapon.id);
        showToast(`↺ Reset ${activeWeapon.name} to server defaults.`);
      }
    });
  }
}

// Kickoff
window.addEventListener('DOMContentLoaded', initStudio);
