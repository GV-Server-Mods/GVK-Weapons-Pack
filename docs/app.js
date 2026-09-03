
// ==========================================================================
// WEAPONCORE CANONICAL DEFAULTS CONSTANTS (from Structure.cs & Weapon75ammo.cs)
// ==========================================================================
// ==========================================================================
// WEAPONCORE PURE CORE DEFAULTS (Directly from Structure.cs & WC Framework)
// ==========================================================================
const WC_CORE_DEFAULTS = {
  // ModelAssignmentsDef
  spinPartId: "None",
  muzzlePartId: "",
  azimuthPartId: "",
  elevationPartId: "",
  iconName: "",
  scope: "",
  durabilityMod: 1.0,

  // HardwareDef
  rotateRate: 0,
  elevateRate: 0,
  minAzimuth: -180,
  maxAzimuth: 180,
  minElevation: -90,
  maxElevation: 90,
  homeAzimuth: 0,
  homeElevation: 0,
  inventorySize: 0,
  idlePower: 0,
  hardwareType: "BlockWeapon",
  criticalChance: 0,
  offsetX: 0, offsetY: 0, offsetZ: 0,

  // LoadingDef
  rateOfFire: 0,
  barrelsPerShot: 1,
  trajectilesPerBarrel: 1,
  skipBarrels: 0,
  reloadTime: 0,
  magsToLoad: 1,
  delayUntilFire: 0,
  shotsInBurst: 0,
  delayAfterBurst: 0,
  heatPerShot: 0,
  maxHeat: 0,
  heatSinkRate: 0,
  cooldown: 0.5,
  fireFull: false,
  giveUpAfter: false,
  goHomeToReload: false,
  dropTargetUntilLoaded: false,
  degradeWithHeat: false,
  useFillSound: false,

  // HardPointDef
  deviateShotAngle: 0,
  aimingTolerance: 0,
  aimLeadingPrediction: "Advanced",
  delayCeaseFire: 0,
  addToleranceToTracking: false,
  canShootSubmerged: false,
  npcSafe: true,

  // TargetingDef
  maxTargetDistance: 0,
  minTargetDistance: 0,
  topTargets: 1,
  topBlocks: 1,
  stopTrackingSpeed: 0,
  maxCost: 0,
  closestFirst: true,
  ignoreDumbProjectiles: true,
  lockedSmartOnly: false,

  // HardPointAudioDef
  firingSound: "",
  preFiringSound: "",
  firingSoundPerShot: false,
  reloadSound: "",
  hardPointRotationSound: "",
  noAmmoSound: "",

  // OtherDef
  constructPartCap: 0,
  energyPriority: 0,
  restrictionRadius: 0,
  otherDebug: false,
  checkInflatedBox: false,
  checkForAnySupport: false,
  stayCharged: false,
  rotateToTarget: false,
  stopTrackingAfterFiring: false,
  noVoxelLOSCheck: false,

  // AmmoDef Core
  baseDamageCutoff: 0,
  mass: 0,
  health: 0,
  backKickForce: 0,
  decayPerShot: 0,
  energyCost: 0,
  energyMagazineSize: 0,
  heatModifier: 1.0,
  heatNeededToFire: 0,
  hybridRound: false,
  hardPointUsable: true,
  npcSafe: true,
  noGridOrArmorScaling: false,
  ignoreWater: false,
  ignoreVoxels: false,
  ignoreGrids: false,
  allowNegativeHeatModifier: false,
  gridsTargetSeekersTargetingThis: false,

  // ShapeDef & ObjectsHitDef
  shape: "LineShape",
  diameter: -1,
  maxObjectsHit: 1,
  countBlocks: true,
  skipBlocksForAOE: false,

  // DamageScaleDef
  maxIntegrity: 0,
  damageToShields: 1.0,
  characters: -1,
  damageType: "BaseDamage",
  armorArmor: -1,
  lightArmor: -1,
  heavyArmor: -1,
  nonArmor: -1,
  falloffDistance: 0,
  falloffMinMult: 0,
  gridLarge: -1,
  gridSmall: -1,
  shieldModifier: 1.0,
  shieldType: "Default",
  shieldBypassMod: 0,

  // Trajectory & Smarts
  accelPerSec: 0,
  speedVariance: 0,
  rangeVariance: 0,
  deaccelTime: 0,
  fieldExponent: 1.0,
  targetLossDegree: 0,
  targetLossTime: 0,
  guidance: "None",
  smartsInaccuracy: 0,
  smartsAggressiveness: 1.0,
  smartsNavAcceleration: 0,
  smartsMaxLateralThrust: 0.5,
  smartsNavAngle: 0,
  smartsMinArmingRange: 0,
  smartsScanRounds: 0,
  smartsSpeedLimit: 0,
  smartsVelocity: 0,
  smartsSteeringLimit: 0,
  smartsOverSteer: false,
  smartsStepVel: false,
  smartsAltNavigation: false,

  // AreaOfDamageDef
  aodBlockEnable: false,
  aodBlockRadius: 0,
  aodBlockDamage: 0,
  aodBlockDepth: 0,
  aodBlockMaxAbsorb: 0,
  aodBlockFalloff: "Linear",
  aodBlockShape: "Sphere",
  aodEolEnable: false,
  aodEolRadius: 0,
  aodEolDamage: 0,
  aodEolDepth: 0,
  aodEolMaxAbsorb: 0,
  aodEolFalloff: "Linear",
  aodEolShape: "Sphere",

  // FragmentDef
  fragmentEnable: false,
  fragmentAmmoRound: "",
  fragmentCount: 0,
  fragmentDegrees: 0,
  fragmentBackwardDegrees: 0,
  fragmentOffset: 0,
  fragmentReverse: false,
  fragmentDropVelocity: false,
  fragmentIgnoreArming: false,
  fragmentRadial: false,

  // PatternDef & EwarDef
  patternEnable: false,
  patternPatterns: "",
  patternTriggerChance: 1.0,
  patternRandomMin: 0,
  patternRandomMax: 0,
  patternSteps: 1,
  patternMode: "Never",
  ewarEnable: false,
  ewarType: "AntiSmart",
  ewarMode: "Effect",
  ewarStrength: 0,
  ewarRadius: 0,
  ewarDuration: 0,
  ewarMaxStacks: 1,
  ewarStackDuration: false,
  ewarDeplete: false,

  // GraphicDef
  visualProbability: 1.0,
  shieldHitDraw: true,
  tracerEnable: true,
  tracerLength: 10,
  tracerWidth: 0.1,
  tracerColor: "255, 120, 20, 255",
  tracerTexture: "WeaponLaser",
  tracerSegmented: false,
  trailEnable: false,
  trailAlwaysDraw: false,
  trailDecay: 0,
  trailWidth: 0,
  trailColor: "200, 200, 200, 180",
  trailTextures: "WeaponLaser",

  // AudioDef
  soundShot: "",
  soundTravel: "",
  soundHit: "",
  soundShieldHit: "",
  soundVoxelHit: "",
  soundPlayerHit: "",
  soundWaterHit: "",
  hitPlayChance: 1.0,
  hitPlayShield: true,

  // SynchronizeDef
  syncFull: false,
  syncPointDefense: true,
  syncOnHitDeath: false,
  syncInterval: 0,
  syncPatchWindow: 0,
  syncUpdateOnRandomize: false
};

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
let magazinesBlueprintsDb = [];
let activeWeapon = null;
let activeAmmo = null;
let benchmarkWeapon = null;
let benchmarkAmmoKey = null;
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

// DOM Elements - Shell Navigation
const wsTabs = document.querySelectorAll('.ws-tab');
const navTabs = document.querySelectorAll('.nav-tab');
const wsSections = document.querySelectorAll('.workspace-section');
const scopeBtns = document.querySelectorAll('.scope-btn');
const scopeContents = document.querySelectorAll('.scope-content');

// DOM Elements - Universal Weapon Banner
const weaponSelect       = document.getElementById('weaponSelect');
const activeWeaponIcon   = document.getElementById('activeWeaponIcon');
const activeAmmoIcon     = document.getElementById('activeAmmoIcon');
const activeAmmoIconWrap = document.getElementById('activeAmmoIconWrap');
const compActiveAmmoIcon = document.getElementById('compActiveAmmoIcon');
const compBenchAmmoIcon  = document.getElementById('compBenchAmmoIcon');
const scopeAmmoIcon      = document.getElementById('scopeAmmoIcon');
const btnResetDefaults   = document.getElementById('btnResetDefaults');
const badgeGrid = document.getElementById('badgeGrid');
const badgeType = document.getElementById('badgeType');
const badgeTech = document.getElementById('badgeTech');
const badgeCircuitry = document.getElementById('badgeCircuitry');
const badgeRelic = document.getElementById('badgeRelic');
const badgeNpc = document.getElementById('badgeNpc');

// DOM Elements - Telemetry Munition Bar (Workspace 1)
const telemetryAmmoBar    = document.getElementById('telemetryAmmoBar');
const telemetryAmmoSelect = document.getElementById('telemetryAmmoSelect');
const telemetryAmmoBadge  = document.getElementById('telemetryAmmoBadge');

// DOM Elements - Telemetry Deck
const outSustainedDps = document.getElementById('outSustainedDps');
const outDpsBreakdown = document.getElementById('outDpsBreakdown');
const outAlphaDmg = document.getElementById('outAlphaDmg');
const outDamagePerShot = document.getElementById('outDamagePerShot');
const outShotsPerSec = document.getElementById('outShotsPerSec');
const outCycleTime = document.getElementById('outCycleTime');
const outTraverseDeg = document.getElementById('outTraverseDeg');
const outTraverseAzEl = document.getElementById('outTraverseAzEl');
const outCombatCycleTitle = document.getElementById('outCombatCycleTitle');
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
const compareAmmoSelect = document.getElementById('compareAmmoSelect');
const compActiveIcon = document.getElementById('compActiveIcon');
const compBenchIcon = document.getElementById('compBenchIcon');
const legendActiveName = document.getElementById('legendActiveName');
const legendActiveDesc = document.getElementById('legendActiveDesc');
const legendBenchCard = document.getElementById('legendBenchCard');
const legendBenchName = document.getElementById('legendBenchName');
const legendBenchDesc = document.getElementById('legendBenchDesc');
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

// GVK Canonical Tech Component Dictionary
const GVK_TECH_COMPONENTS = {
  "PrototechPropulsionUnit": { displayName: "[Tech] Igniter", mass: 240, integrity: 20 },
  "PrototechCoolingUnit": { displayName: "[Tech] Grav. Reflector", mass: 250, integrity: 20 },
  "PrototechMachinery": { displayName: "[Tech] Bolt Carrier", mass: 80, integrity: 20 },
  "PrototechFrame": { displayName: "[Tech] Gun Cradle", mass: 100, integrity: 20 },
  "PrototechPanel": { displayName: "[Tech] Launch Assem.", mass: 30, integrity: 20 },
  "PrototechCapacitor": { displayName: "[Tech] Particle Emit.", mass: 20, integrity: 20 },
  "PrototechCircuitry": { displayName: "[Tech] Data Core", mass: 60, integrity: 50 },
  "GVK_TurboEncabulator": { displayName: "Turbo Encabulator", mass: 50, integrity: 200 }
};

// DOM Elements - Definition Workbench (Scope C: CubeBlocks SBC)
const sbcSubtypeId = document.getElementById('sbcSubtypeId');
const sbcTypeId = document.getElementById('sbcTypeId');
const sbcDisplayName = document.getElementById('sbcDisplayName');
const sbcBlockPairName = document.getElementById('sbcBlockPairName');
const sbcCubeSize = document.getElementById('sbcCubeSize');
const sbcEdgeType = document.getElementById('sbcEdgeType');
const sbcDescription = document.getElementById('sbcDescription');

const sbcBuildTime = document.getElementById('sbcBuildTime');
const sbcBuildTimeVal = document.getElementById('sbcBuildTimeVal');
const sbcUpCost = document.getElementById('sbcUpCost');
const sbcUpCostVal = document.getElementById('sbcUpCostVal');
const sbcTechSummary = document.getElementById('sbcTechSummary');
const sbcIsRelic = document.getElementById('sbcIsRelic');
const sbcHasCircuitry = document.getElementById('sbcHasCircuitry');

const sbcModel = document.getElementById('sbcModel');
const sbcIcon = document.getElementById('sbcIcon');
const sbcSizeX = document.getElementById('sbcSizeX');
const sbcSizeY = document.getElementById('sbcSizeY');
const sbcSizeZ = document.getElementById('sbcSizeZ');
const sbcModelOffsetX = document.getElementById('sbcModelOffsetX');
const sbcModelOffsetY = document.getElementById('sbcModelOffsetY');
const sbcModelOffsetZ = document.getElementById('sbcModelOffsetZ');
const sbcMirroringX = document.getElementById('sbcMirroringX');
const sbcMirroringY = document.getElementById('sbcMirroringY');
const sbcMirroringZ = document.getElementById('sbcMirroringZ');

const sbcResourceSinkGroup = document.getElementById('sbcResourceSinkGroup');
const sbcOverlayTexture = document.getElementById('sbcOverlayTexture');
const sbcInventoryMaxVolume = document.getElementById('sbcInventoryMaxVolume');
const sbcMinFov = document.getElementById('sbcMinFov');
const sbcMaxFov = document.getElementById('sbcMaxFov');
const sbcDamageEffectName = document.getElementById('sbcDamageEffectName');
const sbcDamagedSound = document.getElementById('sbcDamagedSound');
const sbcDestroyEffect = document.getElementById('sbcDestroyEffect');
const sbcDestroySound = document.getElementById('sbcDestroySound');
const sbcBlockTypeTag = document.getElementById('sbcBlockTypeTag');
const badgeUps = document.getElementById('badgeUps');

// DOM Elements - Ammo Logistics ("Ammo Maths")
const weaponBanner = document.querySelector('.weapon-banner');
const logisticsAmmoSelect = document.getElementById('logisticsAmmoSelect');
const logisticsAmmoIcon = document.getElementById('logisticsAmmoIcon');
const btnResetAmmoLogistics = document.getElementById('btnResetAmmoLogistics');
const badgeLogMagSubtype = document.getElementById('badgeLogMagSubtype');
const badgeLogMagCap = document.getElementById('badgeLogMagCap');
const badgeLogMagVol = document.getElementById('badgeLogMagVol');
const badgeLogMagMass = document.getElementById('badgeLogMagMass');
const badgeLogBlueprint = document.getElementById('badgeLogBlueprint');
const blueprintVisualMaterials = document.getElementById('blueprintVisualMaterials');
let selectedLogisticsMagSubtype = 'NATO_25x184mm';

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

// ==========================================================================
// THEME SWITCHER (Dark / Light / System)
// ==========================================================================
let currentThemeMode = (typeof localStorage !== 'undefined') ? (localStorage.getItem('GVK_THEME_MODE') || 'dark') : 'dark';

function applyTheme(mode) {
  currentThemeMode = mode;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('GVK_THEME_MODE', mode);
  }

  let effectiveTheme = mode;
  if (mode === 'system') {
    const prefersDark = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    effectiveTheme = prefersDark ? 'dark' : 'light';
  }

  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('data-theme', effectiveTheme);

    // Update button active state
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-mode') === mode);
    });
  }

  // Re-render radar chart to reflect theme colors
  if (typeof updateComparisonRadar === 'function') {
    updateComparisonRadar();
  }
}

// Listen to system OS theme changes
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (currentThemeMode === 'system') {
      applyTheme('system');
    }
  });
}

async function initStudio() {
  // Load databases
  if (typeof BUNDLED_WEAPONS_DATA !== 'undefined') weaponsDb = JSON.parse(JSON.stringify(BUNDLED_WEAPONS_DATA));
  else if (typeof WEAPONS_DATA !== 'undefined') weaponsDb = JSON.parse(JSON.stringify(WEAPONS_DATA));
  else if (typeof weaponsData !== 'undefined') weaponsDb = JSON.parse(JSON.stringify(weaponsData));
  else if (window.GVK_DEFAULT_WEAPONS) weaponsDb = JSON.parse(JSON.stringify(window.GVK_DEFAULT_WEAPONS));

  if (typeof BUNDLED_AMMOS_DATA !== 'undefined') ammosDb = JSON.parse(JSON.stringify(BUNDLED_AMMOS_DATA));
  else if (typeof AMMOS_DATA !== 'undefined') ammosDb = JSON.parse(JSON.stringify(AMMOS_DATA));
  else if (typeof ammosData !== 'undefined') ammosDb = JSON.parse(JSON.stringify(ammosData));
  else if (window.GVK_DEFAULT_AMMOS) ammosDb = JSON.parse(JSON.stringify(window.GVK_DEFAULT_AMMOS));

  if (typeof BUNDLED_ANIMATIONS_DATA !== 'undefined') animationsDb = [...BUNDLED_ANIMATIONS_DATA];
  else if (typeof ANIMATIONS_DATA !== 'undefined') animationsDb = [...ANIMATIONS_DATA];
  else if (window.GVK_ANIMATION_DEFS) animationsDb = [...window.GVK_ANIMATION_DEFS];

  if (typeof BUNDLED_COMPONENTS_DATA !== 'undefined') componentsDb = { ...BUNDLED_COMPONENTS_DATA };
  else if (typeof COMPONENTS_DATA !== 'undefined') componentsDb = { ...COMPONENTS_DATA };
  else if (window.GVK_DEFAULT_COMPONENTS) componentsDb = { ...window.GVK_DEFAULT_COMPONENTS };

  if (typeof MAGAZINES_BLUEPRINTS_DATA !== 'undefined') magazinesBlueprintsDb = JSON.parse(JSON.stringify(MAGAZINES_BLUEPRINTS_DATA));

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
  populateLogisticsAmmoDropdown();

  // Populate Balance Matrix Modal inputs
  syncBalanceMatrixInputs();

  // Check URL Permalinks
  parseUrlParams();

  // Select Default Weapon (Avenger Turret or First)
  if (!activeWeapon && weaponsDb.length > 0) {
    const avenger = weaponsDb.find(w => w.name.includes("Avenger")) || weaponsDb[0];
    selectWeapon(avenger.id);
  }

  // Initialize Default Logistics Magazine
  selectLogisticsMagazine(selectedLogisticsMagSubtype, true);

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
  if (weaponBanner) {
    weaponBanner.style.display = (targetWsId === 'ws-logistics') ? 'none' : 'flex';
  }
  if (targetWsId === 'ws-logistics') {
    selectLogisticsMagazine(selectedLogisticsMagSubtype, false);
  }
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
  // Theme switcher buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-theme-mode');
      applyTheme(mode);
    });
  });
  applyTheme(currentThemeMode);

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

  // Active Munition Selector (Workspace 1 Telemetry Bar)
  if (telemetryAmmoSelect) {
    telemetryAmmoSelect.addEventListener('change', (e) => {
      selectAmmo(e.target.value);
    });
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
    if (benchmarkWeapon) {
      if (compBenchIcon) {
        compBenchIcon.src = getWeaponIconUrl(benchmarkWeapon);
        compBenchIcon.style.display = 'inline-block';
        compBenchIcon.title = benchmarkWeapon.displayName || benchmarkWeapon.name;
      }
      
      const bAmmos = getSelectableAmmos(benchmarkWeapon);
      benchmarkAmmoKey = bAmmos[0] || benchmarkWeapon.ammoName;

      if (compareAmmoSelect) {
        if (bAmmos.length > 1) {
          compareAmmoSelect.innerHTML = bAmmos.map(k => {
            const a = ammosDb[k] || {};
            const label = a.terminalName || a.ammoRound || k;
            const mag = a.ammoMagazine || 'Energy';
            return `<option value="${k}">${label} [${mag}]</option>`;
          }).join('');
          compareAmmoSelect.value = benchmarkAmmoKey;
          compareAmmoSelect.style.display = 'inline-block';
        } else {
          compareAmmoSelect.style.display = 'none';
        }
      }

      if (compBenchAmmoIcon) {
        const bAmmo = ammosDb[benchmarkAmmoKey];
        compBenchAmmoIcon.src = getAmmoIconUrl(bAmmo);
        compBenchAmmoIcon.style.display = 'inline-block';
        compBenchAmmoIcon.title = bAmmo ? `Benchmark Munition: ${bAmmo.terminalName || bAmmo.ammoRound}` : 'Benchmark Ammo';
      }
    } else {
      benchmarkAmmoKey = null;
      if (compBenchIcon) compBenchIcon.style.display = 'none';
      if (compBenchAmmoIcon) compBenchAmmoIcon.style.display = 'none';
      if (compareAmmoSelect) compareAmmoSelect.style.display = 'none';
    }
    updateComparisonRadar();
  });

  if (compareAmmoSelect) {
    compareAmmoSelect.addEventListener('change', (e) => {
      benchmarkAmmoKey = e.target.value;
      if (compBenchAmmoIcon) {
        const bAmmo = ammosDb[benchmarkAmmoKey];
        compBenchAmmoIcon.src = getAmmoIconUrl(bAmmo);
        compBenchAmmoIcon.title = bAmmo ? `Benchmark Munition: ${bAmmo.terminalName || bAmmo.ammoRound}` : 'Benchmark Ammo';
      }
      updateComparisonRadar();
    });
  }
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

function populateLogisticsAmmoDropdown() {
  if (!logisticsAmmoSelect) return;

  const dataset = (typeof MAGAZINES_BLUEPRINTS_DATA !== 'undefined' && MAGAZINES_BLUEPRINTS_DATA.length > 0)
    ? MAGAZINES_BLUEPRINTS_DATA
    : magazinesBlueprintsDb;

  if (!dataset || dataset.length === 0) return;

  const categories = {};
  dataset.forEach(m => {
    const cat = m.category || 'Ship Standard Munitions';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(m);
  });

  logisticsAmmoSelect.innerHTML = Object.entries(categories).map(([catName, mags]) => {
    const opts = mags.map(m => `<option value="${m.subtypeId}">${m.displayName} [${m.subtypeId}]</option>`).join('');
    return `<optgroup label="── ${catName} ──">${opts}</optgroup>`;
  }).join('');

  if (selectedLogisticsMagSubtype) {
    logisticsAmmoSelect.value = selectedLogisticsMagSubtype;
  }
}

function selectLogisticsMagazine(magSubtype, resetLevers = false) {
  const dataset = (typeof MAGAZINES_BLUEPRINTS_DATA !== 'undefined' && MAGAZINES_BLUEPRINTS_DATA.length > 0)
    ? MAGAZINES_BLUEPRINTS_DATA
    : magazinesBlueprintsDb;

  const mag = dataset.find(m => m.subtypeId === magSubtype) || dataset[0];
  if (!mag) return;

  selectedLogisticsMagSubtype = mag.subtypeId;
  if (logisticsAmmoSelect) logisticsAmmoSelect.value = mag.subtypeId;

  if (logisticsAmmoIcon) {
    logisticsAmmoIcon.src = mag.localIcon || `icons/ammo_${mag.subtypeId}.png`;
    logisticsAmmoIcon.onerror = () => { logisticsAmmoIcon.src = 'icons/ammo_NATO_25x184mm.png'; };
  }

  if (badgeLogMagSubtype) badgeLogMagSubtype.innerHTML = `Subtype: <strong>${mag.subtypeId}</strong>`;
  if (badgeLogMagCap) badgeLogMagCap.innerHTML = `Capacity: <strong>${mag.capacity} rds</strong>`;
  if (badgeLogMagVol) badgeLogMagVol.innerHTML = `Volume: <strong>${mag.volume} L</strong>`;
  if (badgeLogMagMass) badgeLogMagMass.innerHTML = `Mass: <strong>${mag.mass} kg</strong>`;
  if (badgeLogBlueprint) badgeLogBlueprint.innerHTML = `⏱️ <strong>${mag.productionTime}s Craft</strong>`;
  if (logActiveAmmoName) logActiveAmmoName.textContent = mag.displayName;

  if (resetLevers) {
    if (inputCraftTime) inputCraftTime.value = mag.productionTime;
    if (inputRUs) inputRUs.value = mag.defaultRUs;
    if (selectRoleMultiplier) selectRoleMultiplier.value = mag.roleMultiplier.toString();
    const physDens = mag.volume > 0 ? (mag.mass / mag.volume).toFixed(1) : 4.0;
    if (inputPhysicalDensity) inputPhysicalDensity.value = physDens;

    let magDmg = 0;
    const ammoObj = ammosDb[mag.subtypeId] || Object.values(ammosDb).find(a => a.ammoMagazine === mag.subtypeId);
    if (ammoObj) {
      const dmgDet = getAmmoDamageDetailed(ammoObj);
      magDmg = dmgDet.total * mag.capacity;
    }
    if (magDmg > 0 && mag.volume > 0) {
      const derivedDmgDens = Math.round(magDmg / mag.volume);
      if (inputDmgDensity) inputDmgDensity.value = derivedDmgDens;
      if (inputDmgDensitySlider) inputDmgDensitySlider.value = Math.min(30000, Math.max(500, derivedDmgDens));
    }
  }

  updateAmmoLogistics();
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

// Helper to get terminal-usable ammos for a weapon (filtering out internal submunitions)
function getSelectableAmmos(weapon) {
  if (!weapon) return [];
  const assigned = (weapon.assignedAmmos && weapon.assignedAmmos.length > 0)
    ? weapon.assignedAmmos
    : (weapon.ammoName ? [weapon.ammoName] : []);
  
  const usable = assigned.filter(k => {
    const a = ammosDb[k];
    return a && a.hardPointUsable !== false;
  });

  return usable.length > 0 ? usable : (assigned.length > 0 ? [assigned[0]] : []);
}

function updateTelemetryAmmoBadge() {
  if (!telemetryAmmoBadge || !activeAmmo) return;
  const dmg = getAmmoDamageDetailed(activeAmmo);
  const spd = activeAmmo.trajectory ? (activeAmmo.trajectory.desiredSpeed || 0) : 0;
  const rng = activeAmmo.trajectory ? (activeAmmo.trajectory.maxTrajectory || 0) : 0;
  const eol = (activeAmmo.areaOfDamage && activeAmmo.areaOfDamage.endOfLife && activeAmmo.areaOfDamage.endOfLife.enable)
    ? activeAmmo.areaOfDamage.endOfLife
    : null;
  const frag = (activeAmmo.fragment && activeAmmo.fragment.enable) ? activeAmmo.fragment : null;

  let typeDesc = "Direct Kinetic AP";
  if (eol && eol.damage > 0) {
    typeDesc = `High Explosive Blast (${eol.radius || 0}m)`;
  } else if (frag && frag.fragments > 0) {
    typeDesc = `Proximity Shrapnel (${frag.fragments} Frags)`;
  } else if (activeAmmo.ammoMagazine === 'Energy') {
    typeDesc = "High-Energy Sabot";
  }

  telemetryAmmoBadge.innerHTML = `
    <span style="color: var(--cyan-primary); font-weight: 700;">${typeDesc}</span> &bull; 
    <span>${Math.round(dmg.total).toLocaleString()} Dmg/Shot</span> &bull; 
    <span>${Math.round(spd)} m/s</span> &bull; 
    <span>${Math.round(rng)}m Range</span>
  `;
}

function selectWeapon(weaponId) {
  const found = weaponsDb.find(w => w.id === weaponId || w.subtypeId === weaponId);
  if (!found) return;
  activeWeapon = found;
  weaponSelect.value = activeWeapon.id;

  // Derive selectable user-terminal ammos (ensuring at least 1 valid munition)
  let selectableAmmos = getSelectableAmmos(activeWeapon);
  if (!selectableAmmos || selectableAmmos.length === 0) {
    selectableAmmos = activeWeapon.ammoName ? [activeWeapon.ammoName] : [Object.keys(ammosDb)[0]];
  }
  const primaryAmmoKey = selectableAmmos[0];

  // Active ammo dropdown (Workspace 1 Telemetry Bar - always displayed for all weapons)
  if (telemetryAmmoSelect) {
    telemetryAmmoSelect.innerHTML = selectableAmmos.map(k => {
      const a = ammosDb[k] || {};
      const label = a.terminalName || a.ammoRound || k;
      const mag = a.ammoMagazine || 'Energy';
      return `<option value="${k}">${label} [${mag}]</option>`;
    }).join('');
    telemetryAmmoSelect.value = primaryAmmoKey;
    telemetryAmmoSelect.disabled = false;
  }
  if (telemetryAmmoBar) {
    telemetryAmmoBar.style.display = 'flex';
  }

  if (ammosDb[primaryAmmoKey]) {
    activeAmmo = ammosDb[primaryAmmoKey];
  } else {
    const firstKey = Object.keys(ammosDb)[0];
    activeAmmo = ammosDb[firstKey];
  }

  // Update Universal Banner & Telemetry Munition Badge
  updateUniversalBanner();
  updateTelemetryAmmoBadge();

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
  if (ammoSelectGlobal) ammoSelectGlobal.value = ammoKey;
  if (telemetryAmmoSelect) telemetryAmmoSelect.value = ammoKey;
  if (scopeActiveAmmoLabel) scopeActiveAmmoLabel.textContent = ammoKey;
  if (scopeAmmoIcon) {
    scopeAmmoIcon.src = getAmmoIconUrl(activeAmmo);
    scopeAmmoIcon.title = `Tuning Ammo: ${activeAmmo.terminalName || activeAmmo.ammoRound} (${activeAmmo.ammoMagazine || 'Energy'})`;
  }
  updateUniversalBanner();
  updateTelemetryAmmoBadge();
  populateAmmoWorkbench();
  updateCombatTelemetry();
  updateTtkSimulator();
  updateInitialDDriftMeter();
  updateAmmoLogistics();
  updateComparisonRadar();
}

// ==========================================================================
// TECH COMPONENT DERIVATION HELPERS & WEAPON DESCRIPTIONS
// ==========================================================================
function getWeaponDescription(weapon) {
  if (!weapon) return 'No weapon loaded.';
  const sbcDesc = weapon.sbcData?.description;
  const desc = sbcDesc || weapon.description;
  if (!desc) {
    const grid = weapon.gridSize || weapon.grid || 'Large';
    const type = weapon.type || 'Weapon';
    return `${grid} Grid ${type}. Official GVK WeaponCore Armament.`;
  }
  return desc.replace(/\\n/g, '\n').replace(/\t+/g, ' ').replace(/[ ]{2,}/g, ' ').trim();
}

function isTechComponent(compName) {
  if (!compName) return false;
  return !!GVK_TECH_COMPONENTS[compName] || compName.startsWith('Prototech') || compName.includes('Prototech');
}

function getTechSummary(components) {
  if (!components || components.length === 0) {
    return { totalQty: 0, techQtyExcludingDataCore: 0, upCost: 0, summaryStr: 'None', techLayers: [], hasCircuitry: false };
  }
  const techLayers = components.filter(c => isTechComponent(c.name));
  const totalQty = techLayers.reduce((sum, c) => sum + (parseInt(c.count) || 0), 0);
  const hasCircuitry = techLayers.some(c => (c.name === 'PrototechCircuitry' || c.name.includes('Circuitry')) && (parseInt(c.count) || 0) > 0);
  const techQtyExcludingDataCore = techLayers
    .filter(c => c.name !== 'PrototechCircuitry' && !c.name.includes('Circuitry'))
    .reduce((sum, c) => sum + (parseInt(c.count) || 0), 0);
  const upCost = techQtyExcludingDataCore;
  
  // Tech box lists only non-Data Core tech components (Data Core is displayed separately in its own badge)
  const nonDataCoreTech = techLayers.filter(c => c.name !== 'PrototechCircuitry' && !c.name.includes('Circuitry'));
  let summaryStr = 'None';
  if (nonDataCoreTech.length > 0) {
    summaryStr = nonDataCoreTech.map(c => {
      const friendly = GVK_TECH_COMPONENTS[c.name]?.displayName || c.name.replace('Prototech', '');
      return `${c.count}x ${friendly}`;
    }).join(', ');
  }
  return { totalQty, techQtyExcludingDataCore, upCost, summaryStr, techLayers, hasCircuitry };
}

function updateUniversalBanner() {
  if (!activeWeapon) return;

  // Weapon Icon
  if (activeWeaponIcon) {
    const wIcon = getWeaponIconUrl(activeWeapon);
    activeWeaponIcon.src = wIcon;
    activeWeaponIcon.alt = activeWeapon.name || 'Weapon Icon';
    activeWeaponIcon.title = `${activeWeapon.displayName || activeWeapon.name} [${activeWeapon.gridSize || activeWeapon.grid || 'Large'}]`;
    if (compActiveIcon) {
      compActiveIcon.src = wIcon;
      compActiveIcon.title = activeWeapon.displayName || activeWeapon.name;
    }
  }

  // Ammo Icon (prefer current activeAmmo, fallback to primary assigned)
  const curAmmo = activeAmmo || (activeWeapon.assignedAmmos && ammosDb[activeWeapon.assignedAmmos[0]]) || ammosDb[activeWeapon.ammoName];
  if (curAmmo) {
    const ammoIconUrl = getAmmoIconUrl(curAmmo);
    if (activeAmmoIcon) {
      activeAmmoIcon.src = ammoIconUrl;
      activeAmmoIcon.alt = curAmmo.terminalName || curAmmo.ammoRound || 'Ammo';
    }
    if (activeAmmoIconWrap) {
      activeAmmoIconWrap.title = `Loaded Munition: ${curAmmo.terminalName || curAmmo.ammoRound || 'Standard'}\nMagazine Subtype: ${curAmmo.ammoMagazine || 'Energy'}`;
    }
    if (compActiveAmmoIcon) {
      compActiveAmmoIcon.src = ammoIconUrl;
      compActiveAmmoIcon.title = `Munition: ${curAmmo.terminalName || curAmmo.ammoRound || 'Standard'}`;
    }
    if (scopeAmmoIcon) {
      scopeAmmoIcon.src = ammoIconUrl;
      scopeAmmoIcon.title = `Tuning Ammo: ${curAmmo.terminalName || curAmmo.ammoRound}`;
    }
  }

  // Badges
  badgeGrid.innerHTML = `Grid: <strong>${activeWeapon.gridSize || activeWeapon.grid || 'Large'}</strong>`;
  badgeType.innerHTML = `Mount: <strong>${activeWeapon.type}</strong>`;
  
  const techInfo = getTechSummary(activeWeapon.components);
  const currentUps = (activeWeapon.upCost !== undefined && activeWeapon.upCost !== null) ? activeWeapon.upCost : techInfo.upCost;
  if (badgeUps) {
    badgeUps.innerHTML = `⚡ <strong>${currentUps} UPs</strong>`;
  }
  if (badgeTech) {
    badgeTech.innerHTML = `Tech: <strong>${techInfo.summaryStr}</strong>`;
  }

  // Circuitry / Data Core Rule: smart/turret with range > 2000m requires 1 PrototechCircuitry
  const hasDataCore = techInfo.hasCircuitry || ((activeWeapon.type === 'Turret' || activeWeapon.guided) && (activeWeapon.maxTargetDistance > 2000));
  if (badgeCircuitry) {
    badgeCircuitry.innerHTML = `🔬 <strong>[Tech] Data Core</strong>`;
    badgeCircuitry.style.display = hasDataCore ? 'inline-flex' : 'none';
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


// ==========================================================================
// FIELD BINDING HELPERS FOR MEDIUM-GREY DEFAULT VISUALIZATION
// ==========================================================================
function bindInputVal(input, definedVal, defaultVal) {
  if (!input) return;
  if (definedVal !== undefined && definedVal !== null && definedVal !== '') {
    input.value = definedVal;
    input.classList.remove('is-wc-default');
    if (input.removeAttribute) input.removeAttribute('title');
  } else {
    input.value = (defaultVal !== undefined && defaultVal !== null) ? defaultVal : '';
    input.classList.add('is-wc-default');
    if (input.setAttribute) input.setAttribute('title', 'WeaponCore Engine Default (Not defined in mod file)');
  }
}

function bindCheckboxVal(input, definedVal, defaultVal) {
  if (!input) return;
  if (definedVal !== undefined && definedVal !== null) {
    input.checked = (definedVal === true);
    input.classList.remove('is-wc-default');
    if (input.removeAttribute) input.removeAttribute('title');
  } else {
    input.checked = (defaultVal === true);
    input.classList.add('is-wc-default');
    if (input.setAttribute) input.setAttribute('title', 'WeaponCore Engine Default (Not defined in mod file)');
  }
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
  bindInputVal(aAmmoRound, activeAmmo.ammoRound || activeAmmo.name, '');
  bindInputVal(aAmmoMagazine, activeAmmo.ammoMagazine, '');
  bindInputVal(aTerminalName, activeAmmo.terminalName || activeAmmo.ammoRound || activeAmmo.name, '');
  bindInputVal(aBaseDamage, activeAmmo.baseDamage, 0);
  bindInputVal(aBaseDamageCutoff, activeAmmo.baseDamageCutoff, 0);
  bindInputVal(aMass, activeAmmo.mass, 0);
  bindInputVal(aHealth, activeAmmo.health, 0);
  bindInputVal(aBackKick, activeAmmo.backKickForce, 0);
  bindInputVal(aDecayPerShot, activeAmmo.decayPerShot, 0);
  bindInputVal(aEnergyCost, activeAmmo.energyCost, 0);
  bindInputVal(aEnergyMagazineSize, activeAmmo.energyMagazineSize, 0);
  bindInputVal(aHeatModifier, activeAmmo.heatModifier, 1.0);
  bindInputVal(aHeatNeededToFire, activeAmmo.heatNeededToFire, 0);

  bindCheckboxVal(aHardPointUsable, activeAmmo.hardPointUsable, true);
  bindCheckboxVal(aHybridRound, activeAmmo.hybridRound, false);
  bindCheckboxVal(aNpcSafe, activeAmmo.npcSafe, true);
  bindCheckboxVal(aNoGridOrArmorScaling, activeAmmo.noGridOrArmorScaling, false);
  bindCheckboxVal(aIgnoreWater, activeAmmo.ignoreWater, false);
  bindCheckboxVal(aIgnoreVoxels, activeAmmo.ignoreVoxels, false);
  bindCheckboxVal(aIgnoreGrids, activeAmmo.ignoreGrids, false);
  bindCheckboxVal(aAllowNegativeHeatModifier, activeAmmo.allowNegativeHeatModifier, false);
  bindCheckboxVal(aGridsTargetSeekersTargetingThis, activeAmmo.gridsTargetSeekersTargetingThis, false);

  // TrajectoryDef & SmartsDef
  const traj = activeAmmo.trajectory || {};
  bindInputVal(tDesiredSpeed, traj.desiredSpeed !== undefined ? traj.desiredSpeed : activeAmmo.desiredSpeed, 0);
  bindInputVal(tAccelPerSec, traj.accelPerSec, 0);
  bindInputVal(tMaxTrajectory, traj.maxTrajectory !== undefined ? traj.maxTrajectory : activeAmmo.maxTrajectory, 0);
  bindInputVal(tMaxLifeTime, traj.maxLifeTime, 3600);
  bindInputVal(tSpeedVariance, traj.speedVariance, 0);
  bindInputVal(tRangeVariance, traj.rangeVariance, 0);
  bindInputVal(tDeaccelTime, traj.deaccelTime, 0);
  bindInputVal(tFieldExponent, traj.fieldExponent, 1.0);
  bindInputVal(tTargetLossDegree, traj.targetLossDegree, 0);
  bindInputVal(tTargetLossTime, traj.targetLossTime, 0);
  bindInputVal(tGuidance, traj.guidance, 'None');

  const sm = traj.smarts || {};
  bindInputVal(sInaccuracy, sm.inaccuracy, 0);
  bindInputVal(sAggressiveness, sm.aggressiveness, 1.0);
  bindInputVal(sNavAcceleration, sm.navAcceleration, 0);
  bindInputVal(sMaxLateralThrust, sm.maxLateralThrust, 0.5);
  bindInputVal(sNavAngle, sm.navAngle, 0);
  bindInputVal(sMinArmingRange, sm.minimumArmingRange, 0);
  bindInputVal(sScanRounds, sm.scanRounds, 0);
  bindInputVal(sSpeedLimit, sm.speedLimit, 0);
  bindInputVal(sVelocity, sm.velocity, 0);
  bindInputVal(sSteeringLimit, sm.steeringLimit, 0);
  bindCheckboxVal(sOverSteer, sm.overSteer, false);
  bindCheckboxVal(sStepVel, sm.stepVel, false);
  bindCheckboxVal(sAltNavigation, sm.altNavigation, false);

  // ShapeDef & ObjectsHitDef
  bindInputVal(aShape, activeAmmo.shape, 'LineShape');
  bindInputVal(aDiameter, activeAmmo.diameter, -1);
  const objHit = activeAmmo.objectsHit || {};
  bindInputVal(oMaxObjectsHit, objHit.maxObjectsHit, 1);
  bindCheckboxVal(oCountBlocks, objHit.countBlocks, true);
  bindCheckboxVal(oSkipBlocksForAOE, objHit.skipBlocksForAOE, false);

  // DamageScaleDef
  const ds = activeAmmo.damageScales || {};
  bindInputVal(dsMaxIntegrity, ds.maxIntegrity, 0);
  bindInputVal(dsShield, ds.damageToShields, 1.0);
  bindInputVal(dsCharacters, ds.characters, -1);
  bindInputVal(dsDamageType, ds.damageType, 'BaseDamage');

  const arm = ds.armor || {};
  bindInputVal(dsArmorArmor, arm.armor, -1);
  bindInputVal(dsLightArmor, arm.light, -1);
  bindInputVal(dsHeavyArmor, arm.heavy, -1);
  bindInputVal(dsNonArmor, arm.nonArmor, -1);

  const fo = ds.fallOff || {};
  bindInputVal(dsFalloffDistance, fo.distance, 0);
  bindInputVal(dsFalloffMinMult, fo.minMultipler, 0);

  const grd = ds.grids || {};
  bindInputVal(dsGridLarge, grd.large, -1);
  bindInputVal(dsGridSmall, grd.small, -1);

  const shld = ds.shields || {};
  bindInputVal(dsShieldModifier, shld.modifier, 1.0);
  bindInputVal(dsShieldType, shld.type, 'Default');
  bindInputVal(dsShieldBypassMod, shld.bypassModifier, 0);

  // AreaOfDamageDef
  const aod = activeAmmo.areaOfDamage || {};
  const aodBlock = aod.byBlockHit || {};
  bindCheckboxVal(aodBlockEnable, aodBlock.enable, false);
  bindInputVal(aodBlockRadius, aodBlock.radius, 0);
  bindInputVal(aodBlockDamage, aodBlock.damage, 0);
  bindInputVal(aodBlockDepth, aodBlock.depth, 0);
  bindInputVal(aodBlockMaxAbsorb, aodBlock.maxAbsorb, 0);
  bindInputVal(aodBlockFalloff, aodBlock.falloff, 'Linear');
  bindInputVal(aodBlockShape, aodBlock.shape, 'Sphere');

  const aodEol = aod.endOfLife || {};
  bindCheckboxVal(aodEolEnable, aodEol.enable, false);
  bindInputVal(aodEolRadius, aodEol.radius, 0);
  bindInputVal(aodEolDamage, aodEol.damage, 0);
  bindInputVal(aodEolDepth, aodEol.depth, 0);
  bindInputVal(aodEolMaxAbsorb, aodEol.maxAbsorb, 0);
  bindInputVal(aodEolFalloff, aodEol.falloff, 'Linear');
  bindInputVal(aodEolShape, aodEol.shape, 'Sphere');

  // FragmentDef
  const frag = activeAmmo.fragment || {};
  bindCheckboxVal(fEnable, frag.enable, false);
  bindCheckboxVal(fReverse, frag.reverse, false);
  bindCheckboxVal(fDropVelocity, frag.dropVelocity, false);
  bindCheckboxVal(fIgnoreArming, frag.ignoreArming, false);
  bindCheckboxVal(fRadial, frag.radial, false);
  bindInputVal(fFragments, frag.fragments, 0);
  bindInputVal(fDegrees, frag.degrees, 0);
  bindInputVal(fBackwardDegrees, frag.backwardDegrees, 0);
  bindInputVal(fOffset, frag.offset, 0);
  bindInputVal(fChildAmmoRound, frag.ammoRound, '');
  fragStatusBadge.textContent = frag.enable ? `${frag.fragments} Frags Active` : 'Disabled';
  updateFragChainVisual();

  // PatternDef
  const pat = activeAmmo.pattern || {};
  bindCheckboxVal(pEnable, pat.enable, false);
  const patStr = Array.isArray(pat.patterns) ? pat.patterns.join(', ') : pat.patterns;
  bindInputVal(pPatterns, patStr, '');
  bindInputVal(pTriggerChance, pat.triggerChance, 1.0);
  bindInputVal(pRandomMin, pat.randomMin, 0);
  bindInputVal(pRandomMax, pat.randomMax, 0);
  bindInputVal(pPatternSteps, pat.patternSteps, 1);
  bindInputVal(pMode, pat.mode, 'Never');
  bindCheckboxVal(pSkipParent, pat.skipParent, false);
  bindCheckboxVal(pRandom, pat.random, false);

  // EwarDef
  const ew = activeAmmo.ewar || {};
  bindCheckboxVal(ewEnable, ew.enable, false);
  bindInputVal(ewType, ew.type, 'AntiSmart');
  bindInputVal(ewMode, ew.mode, 'Effect');
  bindInputVal(ewStrength, ew.strength, 0);
  bindInputVal(ewRadius, ew.radius, 0);
  bindInputVal(ewDuration, ew.duration, 0);
  bindInputVal(ewMaxStacks, ew.maxStacks, 1);
  bindCheckboxVal(ewStackDuration, ew.stackDuration, false);
  bindCheckboxVal(ewDeplete, ew.deplete, false);

  // GraphicDef
  const gfx = activeAmmo.graphic || {};
  bindInputVal(gVisualProb, gfx.visualProbability, 1.0);
  bindCheckboxVal(gShieldHitDraw, gfx.shieldHitDraw, true);

  const trc = gfx.lines ? gfx.lines.tracer : {};
  bindCheckboxVal(gTracerEnable, trc ? trc.enable : undefined, true);
  bindInputVal(gTracerLength, trc ? trc.length : undefined, 10);
  bindInputVal(gTracerWidth, trc ? trc.width : undefined, 0.1);
  bindInputVal(gTracerColor, trc ? trc.color : undefined, '255, 120, 20, 255');
  bindInputVal(gTracerTexture, trc ? trc.texture : undefined, 'WeaponLaser');
  bindCheckboxVal(gTracerSegmented, trc ? trc.segmentation : undefined, false);

  const trl = gfx.lines ? gfx.lines.trail : {};
  bindCheckboxVal(gTrailEnable, trl ? trl.enable : undefined, false);
  bindCheckboxVal(gTrailAlwaysDraw, trl ? trl.alwaysDraw : undefined, false);
  bindInputVal(gTrailDecay, trl ? trl.decayTime : undefined, 0);
  bindInputVal(gTrailWidth, trl ? trl.customWidth : undefined, 0);
  bindInputVal(gTrailColor, trl ? trl.color : undefined, '200, 200, 200, 180');
  const trlTexStr = (trl && Array.isArray(trl.textures)) ? trl.textures.join(', ') : (trl ? trl.textures : '');
  bindInputVal(gTrailTextures, trlTexStr, 'WeaponLaser');

  // AudioDef (empty string default)
  const aud = activeAmmo.audio || {};
  bindInputVal(aSoundShot, aud.shotSound, '');
  bindInputVal(aSoundTravel, aud.travelSound, '');
  bindInputVal(aSoundHit, aud.hitSound, '');
  bindInputVal(aSoundShieldHit, aud.shieldHitSound, '');
  bindInputVal(aSoundVoxelHit, aud.voxelHitSound, '');
  bindInputVal(aSoundPlayerHit, aud.playerHitSound, '');
  bindInputVal(aSoundWaterHit, aud.waterHitSound, '');
  bindInputVal(aHitPlayChance, aud.hitPlayChance, 1.0);
  bindCheckboxVal(aHitPlayShield, aud.hitPlayShield, true);

  // SynchronizeDef
  const sync = activeAmmo.sync || {};
  bindInputVal(syncInterval, sync.positionSyncInterval, 0);
  bindInputVal(syncPatchWindow, sync.positionPatchWindow, 0);
  bindCheckboxVal(syncFull, sync.full, false);
  bindCheckboxVal(syncPointDefense, sync.pointDefense, true);
  bindCheckboxVal(syncOnHitDeath, sync.onHitDeath, false);
  bindCheckboxVal(syncUpdateOnRandomize, sync.positionUpdateOnRandomize, false);

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

  const sbc = activeWeapon.sbcData || {};

  if (sbcSubtypeId) sbcSubtypeId.value = activeWeapon.subtypeId || activeWeapon.id || '';
  if (sbcTypeId) {
    sbcTypeId.value = sbc.typeId || (activeWeapon.type === 'Turret' ? 'LargeMissileTurret' : 'ConveyorSorter');
  }
  if (sbcDisplayName) sbcDisplayName.value = activeWeapon.displayName || activeWeapon.name || sbc.displayName || '';
  if (sbcBlockPairName) sbcBlockPairName.value = sbc.blockPairName || activeWeapon.subtypeId || '';
  if (sbcCubeSize) sbcCubeSize.value = activeWeapon.gridSize || activeWeapon.grid || sbc.cubeSize || 'Large';
  if (sbcEdgeType) sbcEdgeType.value = sbc.edgeType || 'Light';

  if (sbcDescription) {
    sbcDescription.value = sbc.description || `${activeWeapon.name}.
[Uses ${activeWeapon.ammoName || 'Ammunition'}]`;
  }
  if (sbcIsRelic) sbcIsRelic.checked = activeWeapon.isRelic === true;

  if (sbcIcon) sbcIcon.value = sbc.icon || `Textures\GUI\Icons\Cubes\${activeWeapon.subtypeId}.png`;
  if (sbcModel) sbcModel.value = sbc.model || `Models\Cubes\${activeWeapon.grid || 'Large'}\${activeWeapon.subtypeId}.mwm`;

  const sz = sbc.size || { x: 1, y: 1, z: 1 };
  if (sbcSizeX) sbcSizeX.value = sz.x !== undefined ? sz.x : 1;
  if (sbcSizeY) sbcSizeY.value = sz.y !== undefined ? sz.y : 1;
  if (sbcSizeZ) sbcSizeZ.value = sz.z !== undefined ? sz.z : 1;

  const mo = sbc.modelOffset || { x: 0, y: 0, z: 0 };
  if (sbcModelOffsetX) sbcModelOffsetX.value = mo.x !== undefined ? mo.x : 0;
  if (sbcModelOffsetY) sbcModelOffsetY.value = mo.y !== undefined ? mo.y : 0;
  if (sbcModelOffsetZ) sbcModelOffsetZ.value = mo.z !== undefined ? mo.z : 0;

  if (sbcMirroringX) sbcMirroringX.value = sbc.mirroringX || '';
  if (sbcMirroringY) sbcMirroringY.value = sbc.mirroringY || 'Z';
  if (sbcMirroringZ) sbcMirroringZ.value = sbc.mirroringZ || 'Y';

  if (sbcResourceSinkGroup) sbcResourceSinkGroup.value = sbc.resourceSinkGroup || 'Defense';
  if (sbcOverlayTexture) sbcOverlayTexture.value = sbc.overlayTexture || 'Textures\GUI\Screens\camera_overlay.dds';
  if (sbcInventoryMaxVolume) sbcInventoryMaxVolume.value = sbc.inventoryMaxVolume || 0.384;

  if (sbcMinFov) sbcMinFov.value = sbc.minFov || '0.1';
  if (sbcMaxFov) sbcMaxFov.value = sbc.maxFov || '1.04719755';

  const isSorter = (sbc.typeId === 'ConveyorSorter');
  if (sbcDamageEffectName) sbcDamageEffectName.value = sbc.damageEffectName || (isSorter ? 'Damage_Electrical_Damaged_Blue' : 'Damage_WeapExpl_Damaged');
  if (sbcDamagedSound) sbcDamagedSound.value = sbc.damagedSound || (isSorter ? 'ParticleElectrical' : 'ParticleWeapExpl');
  if (sbcDestroyEffect) sbcDestroyEffect.value = sbc.destroyEffect || 'BlockDestroyedExplosion_Small';
  if (sbcDestroySound) sbcDestroySound.value = sbc.destroySound || 'WepSmallWarheadExpl';

  if (sbcBlockTypeTag) {
    sbcBlockTypeTag.textContent = isSorter ? 'ConveyorSorter Definition' : 'LargeTurretBase Definition';
  }

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

  // Group available components into Standard and Tech
  const standardComps = [];
  const techComps = [];

  Object.keys(componentsDb).forEach(k => {
    const item = componentsDb[k];
    const sub = item.subtype || k;
    const name = item.displayName || sub;
    const isTech = item.isTech || (GVK_TECH_COMPONENTS && GVK_TECH_COMPONENTS[sub]);
    if (isTech) {
      techComps.push({ subtype: sub, displayName: name });
    } else {
      standardComps.push({ subtype: sub, displayName: name });
    }
  });

  standardComps.sort((a, b) => a.displayName.localeCompare(b.displayName));
  techComps.sort((a, b) => a.displayName.localeCompare(b.displayName));

  activeWeapon.components.forEach((c, idx) => {
    const cMeta = componentsDb[c.name] || (GVK_TECH_COMPONENTS && GVK_TECH_COMPONENTS[c.name]) || { mass: 20, integrity: 100 };
    const layerMass = (cMeta.mass || 0) * c.count;
    const layerHp = (cMeta.integrity || 0) * c.count;
    totalIntegrity += layerHp;
    totalMassKg += layerMass;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <select class="sbc-comp-select control-input" data-idx="${idx}" style="width: 100%; padding: 4px 8px;">
          <optgroup label="Standard Components">
            ${standardComps.map(sc => `<option value="${sc.subtype}" ${sc.subtype === c.name ? 'selected' : ''}>${sc.displayName}</option>`).join('')}
          </optgroup>
          <optgroup label="👑 GVK Tech & Special Components">
            ${techComps.map(tc => `<option value="${tc.subtype}" ${tc.subtype === c.name ? 'selected' : ''}>${tc.displayName}</option>`).join('')}
          </optgroup>
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

  // Auto-Derive Tech Information from Prototech components (excluding Data Cores from UPs)
  const techInfo = getTechSummary(activeWeapon.components);
  if (sbcTechSummary) sbcTechSummary.textContent = techInfo.summaryStr;
  if (sbcHasCircuitry) sbcHasCircuitry.checked = techInfo.hasCircuitry;
  if (sbcUpCostVal) sbcUpCostVal.textContent = `${techInfo.upCost} UPs`;
  if (sbcUpCost) sbcUpCost.value = techInfo.upCost;

  activeWeapon.techCount = techInfo.totalQty;
  activeWeapon.upCost = techInfo.upCost;
  activeWeapon.pcu = techInfo.upCost;
  activeWeapon.techComponent = techInfo.techLayers.length > 0 ? techInfo.techLayers[0].name : '';
  activeWeapon.hasCircuitry = techInfo.hasCircuitry;

  if (badgeUps) {
    badgeUps.innerHTML = `⚡ <strong>${techInfo.upCost} UPs</strong>`;
  }
  if (badgeTech) {
    badgeTech.innerHTML = `Tech: <strong>${techInfo.summaryStr}</strong>`;
  }
  if (badgeCircuitry) {
    badgeCircuitry.innerHTML = `🔬 <strong>[Tech] Data Core</strong>`;
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

  // Fragment damage (including recursive child fragment & area damage)
  let fragDmg = 0;
  if (fEnable && fEnable.checked) {
    const frags = parseFloat(fFragments.value) || 0;
    const childKey = fChildAmmoRound ? fChildAmmoRound.value : '';
    const childAmmo = ammosDb[childKey];
    if (childAmmo) {
      const childD = getAmmoDamageDetailed(childAmmo);
      fragDmg = frags * childD.total;
    }
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
  outDpsBreakdown.textContent = `Direct: ${Math.round(effectiveRps * baseDmg).toLocaleString()} | Blast: ${Math.round(effectiveRps * aodDmg).toLocaleString()} | Frag: ${Math.round(effectiveRps * fragDmg).toLocaleString()}`;
  outAlphaDmg.textContent = Math.round(alphaVolley).toLocaleString();
  outDamagePerShot.textContent = `Dmg / Shot: ${Math.round(damagePerShot).toLocaleString()} hp (Direct:${Math.round(baseDmg).toLocaleString()} + Blast:${Math.round(aodDmg).toLocaleString()} + Frag:${Math.round(fragDmg).toLocaleString()})`;
  outShotsPerSec.innerHTML = `${effectiveRps.toFixed(1)} <span style="font-size: 14px; font-weight: 400;">sps</span>`;
  outCycleTime.textContent = `Cycle: ${totalCycleSec.toFixed(1)}s (${fireDurationSec.toFixed(1)}s shoot + ${reloadSec.toFixed(1)}s reload)`;

  // Traverse Speed
  const rotRad = parseFloat(wRotateRate.value) || 0.015;
  const elRad = parseFloat(wElevateRate.value) || 0.015;
  const rotDegSec = (rotRad * 60 * 180 / Math.PI).toFixed(1);
  const elDegSec = (elRad * 60 * 180 / Math.PI).toFixed(1);
  outTraverseDeg.innerHTML = `${rotDegSec}&deg;<span style="font-size: 14px; font-weight: 400;">/s</span>`;
  outTraverseAzEl.textContent = `Az: ${rotDegSec}°/s | El: ${elDegSec}°/s`;

  // Structural & Power
  const durMod = parseFloat(wDurabilityMod.value) || 0.5;
  const effIntegrity = activeWeapon.effectiveIntegrity || 150000;
  outEffectiveIntegrity.textContent = Math.round(effIntegrity).toLocaleString();
  outBuildTime.textContent = `Welding Time: ${Math.round(effIntegrity / balanceMatrix.buildTimeDividend)} seconds`;

  const idlePwr = parseFloat(wIdlePower.value) || 0.01;
  const energyPerShot = parseFloat(aEnergyCost.value) || 0;
  const operationalPwrNum = (idlePwr + (energyPerShot * (rof / 60) * 3600));
  const operationalPwr = operationalPwrNum.toFixed(2);
  outPowerMw.innerHTML = `${operationalPwr} <span style="font-size: 14px; font-weight: 400;">MW</span>`;
  outPowerIdle.textContent = `Idle Draw: ${idlePwr.toFixed(3)} MW`;

  // Combat Cycle & Sustained Consumption / Thermal Profile
  const heatShot = parseFloat(wHeatPerShot.value) || 0;
  const maxHeat = parseFloat(wMaxHeat.value) || 0;
  const sinkRate = parseFloat(wHeatSinkRate.value) || 0;
  const heatPerSec = (rof / 60) * heatShot;
  const hasHeat = maxHeat > 0 && heatShot > 0;

  // Consumption metrics (magazines / min or Uranium kg/min)
  const isEnergyAmmo = activeAmmo && (activeAmmo.ammoMagazine === 'Energy' || !activeAmmo.ammoMagazine || activeAmmo.ammoMagazine.includes('Energy'));
  const ammoMagCapacity = magSize || (activeAmmo && activeAmmo.magazineSize) || 100;
  const roundsPerMin = effectiveRps * 60;
  const magsPerMin = ammoMagCapacity > 0 ? (roundsPerMin / ammoMagCapacity) : 0;
  const kgUraniumPerMin = operationalPwrNum / 60;

  // Format Consumption String
  let consumptionHtml = '';
  if (isEnergyAmmo || (!activeAmmo.ammoMagazine && operationalPwrNum > 5)) {
    const uStr = kgUraniumPerMin >= 1.0 ? `${kgUraniumPerMin.toFixed(2)} kg` : `${(kgUraniumPerMin * 1000).toFixed(0)}g`;
    consumptionHtml = `⚡ Uranium Draw: <strong>${uStr}</strong> / min (${operationalPwr} MW)`;
  } else {
    const magSubtype = activeAmmo ? (activeAmmo.ammoMagazine || 'Standard') : 'Standard';
    if (operationalPwrNum > 20) {
      // High-energy kinetic hybrid (e.g. heavy railguns drawing large reactor power)
      const uStr = kgUraniumPerMin >= 1.0 ? `${kgUraniumPerMin.toFixed(2)} kg` : `${(kgUraniumPerMin * 1000).toFixed(0)}g`;
      consumptionHtml = `📦 <strong>${magsPerMin.toFixed(1)}</strong> mags/min [${magSubtype}] &bull; ⚡ <strong>${uStr}</strong> Uranium/min`;
    } else {
      consumptionHtml = `📦 Ammo Draw: <strong>${magsPerMin.toFixed(1)}</strong> mags/min (${Math.round(roundsPerMin).toLocaleString()} rds/min) [${magSubtype}]`;
    }
  }

  if (hasHeat && heatPerSec > sinkRate) {
    if (outCombatCycleTitle) outCombatCycleTitle.textContent = "🔥 THERMAL PROFILE & DUTY CYCLE";
    const netHeatSec = heatPerSec - sinkRate;
    const timeToOverheat = (maxHeat * 0.7) / netHeatSec;
    const cooldownSec = (maxHeat * 0.7) / sinkRate;
    const dutyCycle = Math.round((timeToOverheat / (timeToOverheat + cooldownSec)) * 100);

    outHeatDutyRatio.textContent = `${dutyCycle}% UPTIME`;
    heatProgressBar.style.width = `${dutyCycle}%`;
    heatProgressBar.style.background = 'linear-gradient(90deg, var(--green-accent), var(--amber-primary), var(--red-accent))';
    outTimeToOverheat.textContent = `Fire Limit: ${timeToOverheat.toFixed(1)}s (Cooldown: ${cooldownSec.toFixed(1)}s)`;
    outCooldownTime.innerHTML = consumptionHtml;
    if (hudOverheat) hudOverheat.textContent = `${timeToOverheat.toFixed(1)}s`;
  } else if (hasHeat) {
    if (outCombatCycleTitle) outCombatCycleTitle.textContent = "🔥 THERMAL PROFILE & DUTY CYCLE";
    outHeatDutyRatio.textContent = "100% UPTIME";
    heatProgressBar.style.width = "100%";
    heatProgressBar.style.background = 'linear-gradient(90deg, var(--green-accent), var(--cyan-primary))';
    outTimeToOverheat.textContent = "Continuous Fire: Unlimited (Sink > Heat)";
    outCooldownTime.innerHTML = consumptionHtml;
    if (hudOverheat) hudOverheat.textContent = "Unlimited";
  } else {
    // Effective Fire Rate Metric including reload cycles
    if (outCombatCycleTitle) outCombatCycleTitle.textContent = "⚡ EFFECTIVE FIRE RATE & COMBAT CYCLE";
    const effectiveRpm = Math.round(effectiveRps * 60);
    const fireDutyPercent = totalCycleSec > 0 ? Math.min(100, Math.round((fireDurationSec / totalCycleSec) * 100)) : 100;

    outHeatDutyRatio.textContent = `${fireDutyPercent}% SUSTAINED (${effectiveRpm} RPM)`;
    heatProgressBar.style.width = `${fireDutyPercent}%`;
    heatProgressBar.style.background = 'linear-gradient(90deg, var(--cyan-primary), var(--amber-primary))';

    outTimeToOverheat.textContent = reloadSec > 0
      ? `Cycle: ${fireDurationSec.toFixed(1)}s burst + ${reloadSec.toFixed(1)}s reload (${effectiveRps.toFixed(1)} sps)`
      : `Continuous Fire: 100% Belt-Fed (${effectiveRps.toFixed(1)} sps)`;

    outCooldownTime.innerHTML = consumptionHtml;

    if (hudOverheat) hudOverheat.textContent = `${effectiveRpm} RPM`;
  }

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
  const dataset = (typeof MAGAZINES_BLUEPRINTS_DATA !== 'undefined' && MAGAZINES_BLUEPRINTS_DATA.length > 0)
    ? MAGAZINES_BLUEPRINTS_DATA
    : magazinesBlueprintsDb;

  const mag = dataset.find(m => m.subtypeId === selectedLogisticsMagSubtype) || dataset[0];
  if (!mag) return;

  if (logActiveAmmoName) logActiveAmmoName.textContent = mag.displayName;

  const targetDmgDensity = parseFloat(inputDmgDensity.value) || 5000;
  const physicalDensity = parseFloat(inputPhysicalDensity.value) || 4.0;
  const roleMult = parseFloat(selectRoleMultiplier.value) || 1.0;
  const craftTime = parseFloat(inputCraftTime.value) || mag.productionTime;
  const rus = parseFloat(inputRUs.value) || 0;

  // Single-shot damage from ammosDb if available
  const ammoObj = ammosDb[mag.subtypeId] || Object.values(ammosDb).find(a => a.ammoMagazine === mag.subtypeId);
  const singleShotDmg = ammoObj ? getAmmoDamageDetailed(ammoObj).total : 100;
  const totalMagDamage = singleShotDmg * mag.capacity;

  // Derived Volume & Mass
  const magVolumeL = totalMagDamage / targetDmgDensity;
  const magMassKg = magVolumeL * physicalDensity;

  if (outMagVolume) outMagVolume.textContent = `${magVolumeL.toFixed(1)} L`;
  if (outMagMass) outMagMass.textContent = `${magMassKg.toFixed(1)} kg`;

  // Internal Buffer & Depletion
  const weaponUsingAmmo = weaponsDb.find(w => {
    const ammos = w.assignedAmmos || [w.ammoName];
    return ammos.some(aKey => {
      const a = ammosDb[aKey];
      return a && (a.ammoMagazine === mag.subtypeId || aKey === mag.subtypeId);
    });
  });

  const magsToLoad = weaponUsingAmmo ? (weaponUsingAmmo.magsToLoad || 4) : 4;
  const rof = weaponUsingAmmo ? (weaponUsingAmmo.rateOfFire || 600) : 600;

  const suggestedWeaponVolKL = (magVolumeL * magsToLoad * 2.2) / 1000;
  if (outSuggestedVol) outSuggestedVol.textContent = `${suggestedWeaponVolKL.toFixed(2)} kL (2.2x)`;

  const depletionSec = ((mag.capacity * magsToLoad) / rof) * 60;
  if (outDepletionTime) outDepletionTime.textContent = `${depletionSec.toFixed(1)} s`;

  // Cargo Packing & Fleet Endurance
  const smallMags = Math.floor(3375 / Math.max(0.1, magVolumeL));
  const smallTotalDmg = smallMags * totalMagDamage;
  const smallFireTimeSec = (smallMags * mag.capacity / rof) * 60;

  if (outSmallCargoMags) outSmallCargoMags.textContent = `${smallMags.toLocaleString()} Mags`;
  if (outSmallCargoDmg) outSmallCargoDmg.textContent = `Total Damage Stored: ${Math.round(smallTotalDmg).toLocaleString()} hp`;
  if (outSmall1GunTime) outSmall1GunTime.textContent = formatTime(smallFireTimeSec);
  if (outSmall20GunTime) outSmall20GunTime.textContent = formatTime(smallFireTimeSec / 20);

  const largeMags = Math.floor(421875 / Math.max(0.1, magVolumeL));
  const largeTotalDmg = largeMags * totalMagDamage;
  const largeFireTimeSec = (largeMags * mag.capacity / rof) * 60;

  if (outLargeCargoMags) outLargeCargoMags.textContent = `${largeMags.toLocaleString()} Mags`;
  if (outLargeCargoDmg) outLargeCargoDmg.textContent = `Total Damage Stored: ${Math.round(largeTotalDmg).toLocaleString()} hp`;
  if (outLarge1GunTime) outLarge1GunTime.textContent = formatTime(largeFireTimeSec);
  if (outLarge20GunTime) outLarge20GunTime.textContent = formatTime(largeFireTimeSec / 20);

  // XML Blueprint Prerequisites Generation & Visual Breakdown
  const baseSbcMass = Math.max(0.1, mag.mass);
  const massRatio = magMassKg / baseSbcMass;
  const roleScale = roleMult / Math.max(0.1, mag.roleMultiplier);
  const scale = massRatio * roleScale;

  let calculatedPrereqs = [];
  if (mag.prerequisites && mag.prerequisites.length > 0) {
    calculatedPrereqs = mag.prerequisites.map(p => {
      let amt = p.amount;
      if (p.subtypeId === 'GVK_RUs') {
        amt = rus > 0 ? rus : p.amount;
      } else {
        amt = (scale > 0.98 && scale < 1.02) ? p.amount : Math.round((p.amount * scale) * 10) / 10;
      }
      return {
        typeId: p.typeId || 'Ingot',
        subtypeId: p.subtypeId,
        amount: Math.max(0.01, amt)
      };
    });

    if (rus > 0 && !calculatedPrereqs.some(p => p.subtypeId === 'GVK_RUs')) {
      calculatedPrereqs.unshift({ typeId: 'Ingot', subtypeId: 'GVK_RUs', amount: rus });
    }
  } else {
    calculatedPrereqs = [
      { typeId: 'Ingot', subtypeId: 'Iron', amount: Math.round(magMassKg * 0.70 * 10) / 10 },
      { typeId: 'Ingot', subtypeId: 'Nickel', amount: Math.round(magMassKg * 0.15 * 10) / 10 },
      { typeId: 'Ingot', subtypeId: 'Magnesium', amount: Math.round(magMassKg * 0.10 * 100) / 100 }
    ];
    if (rus > 0) {
      calculatedPrereqs.unshift({ typeId: 'Ingot', subtypeId: 'GVK_RUs', amount: rus });
    }
  }

  // Render Visual Materials Breakdown Chips
  if (blueprintVisualMaterials) {
    blueprintVisualMaterials.innerHTML = calculatedPrereqs.map(p => {
      const unit = p.subtypeId === 'GVK_RUs' ? 'RUs' : 'kg';
      const formattedAmt = p.amount >= 100 ? Math.round(p.amount).toLocaleString() : p.amount.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 });
      return `
        <div class="blueprint-mat-chip">
          <span class="blueprint-mat-name">${p.subtypeId}</span>
          <span class="blueprint-mat-amount">${formattedAmt} <span style="font-size: 10px; font-weight: normal; color: var(--text-muted);">${unit}</span></span>
        </div>
      `;
    }).join('');
  }

  // Generate XML
  let xml = `  <Blueprint>\n`;
  xml += `    <Id>\n`;
  xml += `      <TypeId>BlueprintDefinition</TypeId>\n`;
  xml += `      <SubtypeId>${mag.blueprintSubtype || ('00_' + mag.subtypeId)}</SubtypeId>\n`;
  xml += `    </Id>\n`;
  xml += `    <DisplayName>${mag.displayName}</DisplayName>\n`;
  xml += `    <Icon>${mag.icon || ('Textures\\GUI\\Icons\\ammo\\' + mag.subtypeId + '.dds')}</Icon>\n`;
  xml += `    <Prerequisites>\n`;
  calculatedPrereqs.forEach(p => {
    xml += `      <Item Amount="${p.amount}" TypeId="${p.typeId}" SubtypeId="${p.subtypeId}" />\n`;
  });
  xml += `    </Prerequisites>\n`;
  xml += `    <Result Amount="1" TypeId="AmmoMagazine" SubtypeId="${mag.subtypeId}" />\n`;
  xml += `    <BaseProductionTimeInSeconds>${craftTime}</BaseProductionTimeInSeconds>\n`;
  xml += `  </Blueprint>`;

  if (codeBlueprintXml) {
    codeBlueprintXml.textContent = xml;
  }
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

  if (logisticsAmmoSelect) {
    logisticsAmmoSelect.addEventListener('change', (e) => {
      selectLogisticsMagazine(e.target.value, true);
    });
  }

  if (btnResetAmmoLogistics) {
    btnResetAmmoLogistics.addEventListener('click', () => {
      selectLogisticsMagazine(selectedLogisticsMagSubtype, true);
      showToast("↺ Ammo Logistics levers reset to official SBC defaults!");
    });
  }

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

// ==========================================================================

// ==========================================================================
// RECURSIVE DAMAGE & ICON RESOLUTION HELPERS
// ==========================================================================
function getAmmoDamageDetailed(ammo, depth = 0) {
  if (!ammo || depth > 3) return { base: 0, aoe: 0, frag: 0, total: 0 };
  const base = parseFloat(ammo.baseDamage) || 0;

  let aoe = 0;
  if (ammo.areaOfDamage) {
    if (ammo.areaOfDamage.enable) {
      aoe = parseFloat(ammo.areaOfDamage.damage) || 0;
    } else {
      const eolDmg = (ammo.areaOfDamage.endOfLife && ammo.areaOfDamage.endOfLife.enable && parseFloat(ammo.areaOfDamage.endOfLife.damage)) || 0;
      const aeDmg = (ammo.areaOfDamage.areaEffect && ammo.areaOfDamage.areaEffect.areaEffect && parseFloat(ammo.areaOfDamage.areaEffect.damage)) || 0;
      aoe = eolDmg + aeDmg;
    }
  }

  let frag = 0;
  if (ammo.fragment && ammo.fragment.enable) {
    const rnd = ammo.fragment.ammoRound;
    let cnt = parseInt(ammo.fragment.fragments) || 0;
    if (ammo.fragment.timedSpawns && ammo.fragment.timedSpawns.enable) {
      const ms = parseInt(ammo.fragment.timedSpawns.maxSpawns) || 1;
      const gs = parseInt(ammo.fragment.timedSpawns.groupSize) || 1;
      cnt = Math.max(cnt, ms * gs);
    }
    if (rnd && ammosDb[rnd] && cnt > 0) {
      const child = ammosDb[rnd];
      const childD = getAmmoDamageDetailed(child, depth + 1);
      frag = cnt * childD.total;
    }
  }

  return {
    base: base,
    aoe: aoe,
    frag: frag,
    total: base + aoe + frag
  };
}

function getAmmoIconUrl(ammo) {
  if (!ammo) return 'icons/ammo_Energy.png';
  const mag = ammo.ammoMagazine || 'Energy';
  return `icons/ammo_${mag}.png`;
}

function getWeaponIconUrl(weapon) {
  if (!weapon || !weapon.icon) return 'icons/L__Gatling_Avenger_Turret.png';
  return weapon.icon;
}

// DYNAMIC WEAPON METRICS & MOD-WIDE SCALING
// ==========================================================================
function calculateWeaponMetrics(weapon, ammoKeyOverride) {
  if (!weapon) return { sustainedDps: 0, alphaVolley: 0, range: 1600, velocity: 1000, tracking: 10, integrity: 10000 };

  const aKey = ammoKeyOverride || ((weapon.assignedAmmos && weapon.assignedAmmos.length > 0) ? weapon.assignedAmmos[0] : weapon.ammoName);
  const a = ammosDb[aKey] || {};

  const rof = weapon.rateOfFire || 600;
  const barrels = weapon.barrelsPerShot || 1;
  const reloadTicks = weapon.reloadTime || 0;
  const mags = weapon.magsToLoad || 1;
  const magSize = weapon.magazineSize || 100;

  const dmgDetails = getAmmoDamageDetailed(a);
  const damagePerShot = dmgDetails.total;
  const alphaVolley = Math.round(damagePerShot * barrels);

  const totalRounds = magSize * mags;
  const fireDurationSec = (totalRounds / rof) * 60;
  const reloadSec = reloadTicks / 60;
  const totalCycleSec = fireDurationSec + reloadSec;

  const effectiveRps = (totalCycleSec > 0) ? (totalRounds / totalCycleSec) : (rof / 60);
  const sustainedDps = Math.round(effectiveRps * damagePerShot);

  // Use Weapon's targeting range; fallback to trajectory if 0 or fixed weapon
  let range = weapon.maxTargetDistance || 0;
  if (range <= 0) {
    range = (a.trajectory && a.trajectory.maxTrajectory) ? Math.min(4000, a.trajectory.maxTrajectory) : 1600;
  }

  const velocity = (a.trajectory && a.trajectory.desiredSpeed) ? a.trajectory.desiredSpeed : 1000;
  const tracking = weapon.rotateRate ? (weapon.rotateRate * 60 * 180 / Math.PI) : 0;

  let integrity = 0;
  if (weapon.components && weapon.components.length > 0) {
    integrity = weapon.components.reduce((sum, c) => {
      const cMeta = componentsDb[c.name] || GVK_TECH_COMPONENTS[c.name] || { integrity: 100 };
      return sum + (cMeta.integrity || 0) * (c.count || 0);
    }, 0);
  }
  if (!integrity && weapon.effectiveIntegrity) {
    integrity = weapon.effectiveIntegrity;
  }

  return { sustainedDps, alphaVolley, range, velocity, tracking, integrity };
}

function getModMaxMetrics() {
  let maxDps = 1000;
  let maxAlpha = 1000;
  let maxRange = 1000;
  let maxVel = 500;
  let maxTrack = 10;
  let maxIntegrity = 5000;

  weaponsDb.forEach(w => {
    const m = calculateWeaponMetrics(w);
    if (m.sustainedDps > maxDps) maxDps = m.sustainedDps;
    if (m.alphaVolley > maxAlpha) maxAlpha = m.alphaVolley;
    if (m.range > maxRange) maxRange = m.range;
    if (m.velocity > maxVel) maxVel = m.velocity;
    if (m.tracking > maxTrack) maxTrack = m.tracking;
    if (m.integrity > maxIntegrity) maxIntegrity = m.integrity;
  });

  return { maxDps, maxAlpha, maxRange, maxVel, maxTrack, maxIntegrity };
}

function updateComparisonRadar() {
  if (!radarCanvas) return;
  const ctx = radarCanvas.getContext('2d');
  const w = radarCanvas.width;
  const h = radarCanvas.height;
  ctx.clearRect(0, 0, w, h);

  const isLight = (typeof document !== 'undefined' && document.documentElement && typeof document.documentElement.getAttribute === 'function')
    ? (document.documentElement.getAttribute('data-theme') === 'light')
    : false;

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(cx, cy) - 40;
  const axes = ['DPS', 'Alpha', 'Range', 'Velocity', 'Tracking', 'Integrity'];
  const totalAxes = axes.length;

  // Draw Hexagonal Web
  ctx.strokeStyle = isLight ? '#cbd5e1' : '#263346';
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
  ctx.fillStyle = isLight ? '#475569' : '#94a3b8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < totalAxes; i++) {
    const angle = (Math.PI * 2 / totalAxes) * i - Math.PI / 2;
    const lx = cx + (radius + 22) * Math.cos(angle);
    const ly = cy + (radius + 22) * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.stroke();
    ctx.fillText(axes[i], lx, ly);
  }

  // Mod-wide dynamic max ceilings across all weapons
  const modMax = getModMaxMetrics();
  const bMetrics = benchmarkWeapon ? calculateWeaponMetrics(benchmarkWeapon, benchmarkAmmoKey) : null;

  // Update Max Metrics Readout in Legend
  const readout = document.getElementById('radarMaxMetrics');
  if (readout) {
    readout.innerHTML = `Mod Max (100%): <strong>DPS:</strong> ${Math.round(modMax.maxDps).toLocaleString()} | <strong>Alpha:</strong> ${Math.round(modMax.maxAlpha).toLocaleString()} | <strong>Target Range:</strong> ${(modMax.maxRange / 1000).toFixed(1)}km | <strong>Vel:</strong> ${Math.round(modMax.maxVel).toLocaleString()}m/s | <strong>Track:</strong> ${modMax.maxTrack.toFixed(1)}&deg;/s | <strong>HP:</strong> ${Math.round(modMax.maxIntegrity).toLocaleString()}`;
  }

  // Calculate Normalized Stats for Active Weapon
  const activeDps = parseFloat(outSustainedDps ? outSustainedDps.textContent.replace(/,/g, '') : 0) || 0;
  const activeAlpha = parseFloat(outAlphaDmg ? outAlphaDmg.textContent.replace(/,/g, '') : 0) || 0;
  
  // Use weapon's targeting range, falling back to trajectory if 0 or fixed
  let activeRange = (wMaxTargetDistance && parseFloat(wMaxTargetDistance.value)) || 0;
  if (activeRange <= 0) {
    activeRange = (tMaxTrajectory && parseFloat(tMaxTrajectory.value)) ? Math.min(4000, parseFloat(tMaxTrajectory.value)) : 1600;
  }
  const activeVel = (tDesiredSpeed && parseFloat(tDesiredSpeed.value)) || 1000;
  const activeTrack = (outTraverseDeg && parseFloat(outTraverseDeg.textContent)) || 10;
  
  let activeIntegrity = 0;
  if (activeWeapon && activeWeapon.components && activeWeapon.components.length > 0) {
    activeIntegrity = activeWeapon.components.reduce((sum, c) => {
      const cMeta = componentsDb[c.name] || GVK_TECH_COMPONENTS[c.name] || { integrity: 100 };
      return sum + (cMeta.integrity || 0) * (c.count || 0);
    }, 0);
  }
  if (!activeIntegrity && activeWeapon && activeWeapon.effectiveIntegrity) {
    activeIntegrity = activeWeapon.effectiveIntegrity;
  }

  const activeStats = [
    Math.min(1, Math.max(0, activeDps / modMax.maxDps)),
    Math.min(1, Math.max(0, activeAlpha / modMax.maxAlpha)),
    Math.min(1, Math.max(0, activeRange / modMax.maxRange)),
    Math.min(1, Math.max(0, activeVel / modMax.maxVel)),
    Math.min(1, Math.max(0, activeTrack / modMax.maxTrack)),
    Math.min(1, Math.max(0, activeIntegrity / modMax.maxIntegrity))
  ];

  drawPolygon(ctx, cx, cy, radius, activeStats, 'rgba(245, 158, 11, 0.4)', '#f59e0b');

  // Active Weapon Name in Orange & Description below it
  if (legendActiveName && activeWeapon) {
    const aAmmoObj = activeAmmo;
    const ammoSuffix = aAmmoObj ? ` [${aAmmoObj.terminalName || aAmmoObj.ammoRound}]` : '';
    legendActiveName.textContent = `${activeWeapon.displayName || activeWeapon.name}${ammoSuffix}`;
  }
  if (legendActiveDesc && activeWeapon) {
    legendActiveDesc.textContent = getWeaponDescription(activeWeapon);
  }

  // Benchmark Weapon
  if (benchmarkWeapon) {
    if (compBenchIcon) {
      compBenchIcon.style.display = 'inline-block';
      compBenchIcon.src = getWeaponIconUrl(benchmarkWeapon);
      compBenchIcon.title = benchmarkWeapon.displayName || benchmarkWeapon.name;
    }
    if (compBenchAmmoIcon && benchmarkAmmoKey) {
      const bAmmo = ammosDb[benchmarkAmmoKey];
      compBenchAmmoIcon.src = getAmmoIconUrl(bAmmo);
      compBenchAmmoIcon.style.display = 'inline-block';
      compBenchAmmoIcon.title = bAmmo ? `Benchmark Munition: ${bAmmo.terminalName || bAmmo.ammoRound}` : 'Benchmark Ammo';
    }
    
    if (legendBenchName) {
      const bAmmoObj = benchmarkAmmoKey ? ammosDb[benchmarkAmmoKey] : null;
      const bAmmoSuffix = bAmmoObj ? ` [${bAmmoObj.terminalName || bAmmoObj.ammoRound}]` : '';
      legendBenchName.textContent = `${benchmarkWeapon.displayName || benchmarkWeapon.name}${bAmmoSuffix}`;
    }
    if (legendBenchDesc) {
      legendBenchDesc.textContent = getWeaponDescription(benchmarkWeapon);
    }

    const bStats = [
      Math.min(1, Math.max(0, bMetrics.sustainedDps / modMax.maxDps)),
      Math.min(1, Math.max(0, bMetrics.alphaVolley / modMax.maxAlpha)),
      Math.min(1, Math.max(0, bMetrics.range / modMax.maxRange)),
      Math.min(1, Math.max(0, bMetrics.velocity / modMax.maxVel)),
      Math.min(1, Math.max(0, bMetrics.tracking / modMax.maxTrack)),
      Math.min(1, Math.max(0, bMetrics.integrity / modMax.maxIntegrity))
    ];

    drawPolygon(ctx, cx, cy, radius, bStats, 'rgba(56, 189, 248, 0.35)', '#38bdf8');
    renderCompareTable(activeDps, activeAlpha, activeRange, activeVel, activeTrack, activeIntegrity,
                       bMetrics.sustainedDps, bMetrics.alphaVolley, bMetrics.range, bMetrics.velocity, bMetrics.tracking, bMetrics.integrity);
  } else {
    if (compBenchIcon) compBenchIcon.style.display = 'none';
    if (compBenchAmmoIcon) compBenchAmmoIcon.style.display = 'none';
    if (legendBenchName) legendBenchName.textContent = 'No Benchmark Selected';
    if (legendBenchDesc) legendBenchDesc.textContent = 'Select a benchmark weapon above to compare attributes and radar profile.';
    if (compareTableBody) compareTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-dim);">Select a benchmark weapon above to compare</td></tr>';
  }
}

function drawPolygon(ctx, cx, cy, radius, stats, fillStyle, strokeStyle) {
  const total = stats.length;
  ctx.beginPath();
  for (let i = 0; i < total; i++) {
    const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
    const val = Math.max(0.08, stats[i]);
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

function renderCompareTable(aDps, aAlpha, aRange, aVel, aTrack, aInteg, bDps, bAlpha, bRange, bVel, bTrack, bInteg) {
  const rows = [
    { name: 'Sustained DPS', a: aDps, b: bDps, unit: '' },
    { name: 'Alpha Salvo', a: aAlpha, b: bAlpha, unit: 'hp' },
    { name: 'Targeting Range', a: aRange, b: bRange, unit: 'm' },
    { name: 'Velocity', a: aVel, b: bVel, unit: 'm/s' },
    { name: 'Tracking Rate', a: aTrack, b: bTrack, unit: '°/s' },
    { name: 'Block Integrity', a: aInteg, b: bInteg, unit: 'hp' }
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
    const compDisplayName = cMeta.displayName || (GVK_TECH_COMPONENTS && GVK_TECH_COMPONENTS[c.name] && GVK_TECH_COMPONENTS[c.name].displayName) || c.name;
    tr.innerHTML = `
      <td style="font-weight: 600;">${compDisplayName}</td>
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

  // Critical Chance Bounds
  if (wCriticalChance) {
    const crit = safeFloat(wCriticalChance.value, 0);
    if (crit < 0 || crit > 1.0) {
      criticalErrors.push(`CriticalChance must be between 0.0 and 1.0 (${crit}).`);
    }
  }

  // Burst Consistency
  if (wShotsInBurst && wDelayAfterBurst) {
    const burstShots = safeInt(wShotsInBurst.value, 0);
    const burstDelay = safeInt(wDelayAfterBurst.value, 0);
    if (burstShots > 0 && burstDelay <= 0) {
      warnings.push("ShotsInBurst > 0 but DelayAfterBurst is 0 (Burst weapon has no delay between bursts).");
    }
  }

  // Trajectiles Per Barrel
  if (wTrajectilesPerBarrel) {
    const trajPB = safeInt(wTrajectilesPerBarrel.value, 1);
    if (trajPB < 1) {
      criticalErrors.push("TrajectilesPerBarrel must be >= 1.");
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

    // Probability & Variance Bounds
    if (gVisualProb) {
      const vp = safeFloat(gVisualProb.value, 1.0);
      if (vp < 0 || vp > 1.0) {
        criticalErrors.push(`VisualProbability must be between 0.0 and 1.0 (${vp}).`);
      }
    }
    if (aHitPlayChance) {
      const hpc = safeFloat(aHitPlayChance.value, 1.0);
      if (hpc < 0 || hpc > 1.0) {
        criticalErrors.push(`HitPlayChance must be between 0.0 and 1.0 (${hpc}).`);
      }
    }
    if (sMaxLateralThrust) {
      const mlt = safeFloat(sMaxLateralThrust.value, 0.5);
      if (mlt < 0 || mlt > 1.0) {
        criticalErrors.push(`Smarts MaxLateralThrust must be between 0.0 and 1.0 (${mlt}).`);
      }
    }
    if (pTriggerChance && pEnable && pEnable.checked) {
      const ptc = safeFloat(pTriggerChance.value, 1.0);
      if (ptc < 0 || ptc > 1.0) {
        criticalErrors.push(`Pattern TriggerChance must be between 0.0 and 1.0 (${ptc}).`);
      }
    }

    // Ewar Validation
    if (ewEnable && ewEnable.checked) {
      const ewStr = safeFloat(ewStrength.value, 0);
      const ewRad = safeFloat(ewRadius.value, 0);
      if (ewStr <= 0 || ewRad <= 0) {
        warnings.push("Ewar is enabled but Strength or Radius is 0.");
      }
    }

    // Network Sync Validation
    if (syncFull && syncFull.checked && syncInterval && syncPatchWindow) {
      const sInt = safeInt(syncInterval.value, 0);
      const sPatch = safeInt(syncPatchWindow.value, 0);
      if (sInt > 0 && sPatch >= sInt) {
        warnings.push(`PositionPatchWindow (${sPatch} ticks) must be less than PositionSyncInterval (${sInt} ticks) to prevent network interpolation tearing.`);
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
    trajectilesPerBarrel: 1,
    skipBarrels: 0,
    reloadTime: 60,
    magsToLoad: 1,
    magazineSize: 30,
    delayUntilFire: 0,
    shotsInBurst: 0,
    delayAfterBurst: 0,
    heatPerShot: 0,
    maxHeat: 0,
    heatSinkRate: 0,
    cooldown: 0.5,
    fireFull: false,
    giveUpAfter: false,
    goHomeToReload: false,
    dropTargetUntilLoaded: false,
    degradeWithHeat: false,
    useFillSound: false,
    ammoName: "NATO_25x184mm",
    assignedAmmos: ["NATO_25x184mm"],
    maxTargetDistance: 1500,
    minTargetDistance: 0,
    topTargets: 4,
    topBlocks: 4,
    stopTrackingSpeed: 1000,
    maxCost: 0,
    closestFirst: true,
    ignoreDumbProjectiles: true,
    lockedSmartOnly: false,
    threats: ["Grids", "Projectiles", "Characters", "Meteors"],
    subsystems: ["Offense", "Power", "Thrust", "Any"],
    deviateShotAngle: 0.15,
    aimingTolerance: 3.0,
    aimLeadingPrediction: "Advanced",
    delayCeaseFire: 0,
    addToleranceToTracking: false,
    canShootSubmerged: false,
    npcSafe: true,
    rotateRate: 0.02,
    elevateRate: 0.02,
    minAzimuth: -180,
    maxAzimuth: 180,
    minElevation: -10,
    maxElevation: 80,
    homeAzimuth: 0,
    homeElevation: 0,
    inventorySize: 0.6,
    idlePower: 0.01,
    hardwareType: "BlockWeapon",
    criticalChance: 0,
    offset: { x: 0, y: 0, z: 0 },
    ai: {
      trackTargets: true,
      turretAttached: true,
      turretController: true,
      primaryTracking: true,
      lockOnFocus: false,
      suppressActivityWhenTargetInfracted: false
    },
    ui: {
      rateOfFire: true,
      damageModifier: false,
      toggleGuidance: false,
      enableOverload: false
    },
    audio: {
      firingSound: "MD_LargeGatlingLoopFire",
      preFiringSound: "",
      firingSoundPerShot: false,
      reloadSound: "",
      hardPointRotationSound: "WepTurretGatlingRotate",
      noAmmoSound: "WepShipGatlingNoAmmo"
    },
    other: {
      constructPartCap: 0,
      energyPriority: 0,
      restrictionRadius: 0,
      debug: false,
      checkInflatedBox: false,
      checkForAnySupport: false,
      stayCharged: false,
      rotateToTarget: false,
      stopTrackingAfterFiring: false,
      noVoxelLOSCheck: false
    },
    durabilityMod: 0.5,
    effectiveIntegrity: 80000,
    pcu: 6,
    upCost: 6,
    techComponent: "PrototechMachinery",
    techCount: 6,
    isRelic: false,
    hasCircuitry: false,
    spinPartId: "None",
    muzzlePartId: "",
    azimuthPartId: "",
    elevationPartId: "",
    iconName: "",
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
    baseDamageCutoff: 0,
    mass: 2.0,
    health: 0,
    backKickForce: 50,
    decayPerShot: 0,
    energyCost: 0,
    energyMagazineSize: 0,
    heatModifier: 1.0,
    heatNeededToFire: 0,
    hardPointUsable: true,
    hybridRound: false,
    npcSafe: true,
    noGridOrArmorScaling: false,
    ignoreWater: false,
    ignoreVoxels: false,
    ignoreGrids: false,
    allowNegativeHeatModifier: false,
    gridsTargetSeekersTargetingThis: false,
    shape: "LineShape",
    diameter: -1,
    objectsHit: { maxObjectsHit: 1, countBlocks: true, skipBlocksForAOE: false },
    fragment: {
      enable: false,
      ammoRound: "",
      fragments: 0,
      degrees: 15,
      backwardDegrees: 0,
      offset: 0,
      reverse: false,
      dropVelocity: false,
      ignoreArming: false,
      radial: false
    },
    pattern: {
      enable: false,
      patterns: [],
      triggerChance: 1.0,
      randomMin: 0,
      randomMax: 0,
      patternSteps: 1,
      mode: "Never",
      skipParent: false,
      random: false
    },
    ewar: {
      enable: false,
      type: "AntiSmart",
      mode: "Effect",
      strength: 100,
      radius: 50,
      duration: 600,
      maxStacks: 1,
      stackDuration: false,
      deplete: false
    },
    areaOfDamage: {
      byBlockHit: { enable: false, radius: 0, damage: 0, depth: 0, maxAbsorb: 0, falloff: "Linear", shape: "Sphere" },
      endOfLife: { enable: false, radius: 0, damage: 0, depth: 0, maxAbsorb: 0, falloff: "Linear", shape: "Sphere" }
    },
    trajectory: {
      desiredSpeed: 1200,
      accelPerSec: 0,
      maxTrajectory: 2000,
      maxLifeTime: 3600,
      speedVariance: 0,
      rangeVariance: 0,
      deaccelTime: 0,
      fieldExponent: 1.0,
      targetLossDegree: 0,
      targetLossTime: 0,
      guidance: "None",
      smarts: {
        inaccuracy: 0,
        aggressiveness: 1.0,
        navAcceleration: 0,
        maxLateralThrust: 0.5,
        navAngle: 0,
        minimumArmingRange: 0,
        scanRounds: 0,
        speedLimit: 0,
        velocity: 0,
        steeringLimit: 0,
        overSteer: false,
        stepVel: false,
        altNavigation: false
      }
    },
    damageScales: {
      maxIntegrity: 0,
      damageToShields: 1.0,
      characters: 1.0,
      damageType: "BaseDamage",
      armor: { armor: -1, light: -1, heavy: -1, nonArmor: -1 },
      fallOff: { distance: 0, minMultipler: 0 },
      grids: { large: -1, small: -1 },
      shields: { modifier: 1.0, type: "Default", bypassModifier: 0 }
    },
    graphic: {
      visualProbability: 1.0,
      shieldHitDraw: true,
      lines: {
        tracer: { enable: true, length: 12, width: 0.12, color: "255, 120, 20, 255", texture: "WeaponLaser", segmentation: false },
        trail: { enable: false, alwaysDraw: false, decayTime: 60, customWidth: 0.5, color: "200, 200, 200, 180", textures: ["WeaponLaser"] }
      }
    },
    audio: {
      shotSound: "",
      travelSound: "",
      hitSound: "DOK_CannonHit",
      shieldHitSound: "",
      voxelHitSound: "",
      playerHitSound: "",
      waterHitSound: "",
      hitPlayChance: 1.0,
      hitPlayShield: true
    },
    sync: {
      full: false,
      pointDefense: true,
      onHitDeath: false,
      positionSyncInterval: 0,
      positionPatchWindow: 0,
      positionUpdateOnRandomize: false
    }
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

  // Optional mount subparts (only output if defined)
  const spin = wSpinPartId ? wSpinPartId.value.trim() : '';
  const muzPart = wMuzzlePartId ? wMuzzlePartId.value.trim() : '';
  const azPart = wAzimuthPartId ? wAzimuthPartId.value.trim() : '';
  const elPart = wElevationPartId ? wElevationPartId.value.trim() : '';
  const icon = wIconName ? wIconName.value.trim() : '';

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
  if (spin && spin !== 'None') code += `                        SpinPartId = "${spin}",
`;
  if (muzPart) code += `                        MuzzlePartId = "${muzPart}",
`;
  if (azPart) code += `                        AzimuthPartId = "${azPart}",
`;
  if (elPart) code += `                        ElevationPartId = "${elPart}",
`;
  code += `                        DurabilityMod = ${dur}f,
`;
  if (icon) code += `                        IconName = "${icon}",
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
  if (scope && scope !== 'scope') code += `                Scope = "${scope}",
`;
  code += `            },
`;

  // Targeting: Helper or Inline
  if (activeWeapon.targetingPreset && !activeWeapon.targetingCustomized) {
    code += `            Targeting = ${activeWeapon.targetingPreset},
`;
  } else {
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
    if (wLockedSmartOnly && wLockedSmartOnly.checked) code += `                LockedTarget = true,
`;
    code += `                MaxTargetDistance = ${wMaxTargetDistance.value},
`;
    if (parseFloat(wMinTargetDistance.value) > 0) code += `                MinTargetDistance = ${wMinTargetDistance.value},
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

  // HardPoint
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
  if (parseInt(wDelayCeaseFire.value, 10) > 0) code += `                DelayCeaseFire = ${wDelayCeaseFire.value},
`;
  if (wAddToleranceToTracking && wAddToleranceToTracking.checked) code += `                AddToleranceToTracking = true,
`;
  if (wCanShootSubmerged && wCanShootSubmerged.checked) code += `                CanShootSubmerged = true,
`;
  if (wNpcSafe && !wNpcSafe.checked) code += `                NpcSafe = false,
`;

  // HardwareDef
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
  const homeAz = safeFloat(wHomeAzimuth ? wHomeAzimuth.value : 0, 0);
  const homeEl = safeFloat(wHomeElevation ? wHomeElevation.value : 0, 0);
  if (homeAz !== 0) code += `                    HomeAzimuth = ${homeAz},\n`;
  if (homeEl !== 0) code += `                    HomeElevation = ${homeEl},\n`;
  code += `                    InventorySize = ${safeFloat(wInventorySize.value, 0.9)}f,\n`;
  code += `                    IdlePower = ${safeFloat(wIdlePower.value, 0.01)}f,\n`;
  if (wHardwareType && wHardwareType.value && wHardwareType.value !== 'BlockWeapon') code += `                    Type = ${wHardwareType.value},\n`;
  const critChance = safeFloat(wCriticalChance ? wCriticalChance.value : 0, 0);
  if (critChance > 0) code += `                    CriticalChance = ${critChance}f,\n`;
  const offX = safeFloat(wOffsetX ? wOffsetX.value : 0, 0);
  const offY = safeFloat(wOffsetY ? wOffsetY.value : 0, 0);
  const offZ = safeFloat(wOffsetZ ? wOffsetZ.value : 0, 0);
  if (offX !== 0 || offY !== 0 || offZ !== 0) {
    code += `                    Offset = Vector(x: ${offX}f, y: ${offY}f, z: ${offZ}f),\n`;
  }
  code += `                },\n`;

  // LoadingDef
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
  if (parseFloat(wHeatPerShot.value) > 0 || parseFloat(wMaxHeat.value) > 0) {
    code += `                    HeatPerShot = ${wHeatPerShot.value}f,
`;
    code += `                    MaxHeat = ${wMaxHeat.value},
`;
    code += `                    HeatSinkRate = ${wHeatSinkRate.value},
`;
    if (parseFloat(wCooldown.value) !== 0.5) code += `                    Cooldown = ${wCooldown.value}f,
`;
  }
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

  // HardPointAudioDef
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
  if (wSoundReload && wSoundReload.value) code += `                    ReloadSound = "${wSoundReload.value}",
`;
  if (wSoundRotate && wSoundRotate.value) code += `                    HardPointRotationSound = "${wSoundRotate.value}",
`;
  if (wSoundNoAmmo && wSoundNoAmmo.value) code += `                    NoAmmoSound = "${wSoundNoAmmo.value}",
`;
  code += `                },
`;

  // UiDef (only write if customized)
  const uiCustom = (wUiDamageModifier && wUiDamageModifier.checked) || (wUiToggleGuidance && wUiToggleGuidance.checked) || (wUiEnableOverload && wUiEnableOverload.checked) || (wUiRateOfFire && !wUiRateOfFire.checked);
  if (uiCustom) {
    code += `                Ui = new UiDef
`;
    code += `                {
`;
    code += `                    RateOfFire = ${wUiRateOfFire && wUiRateOfFire.checked ? 'true' : 'false'},
`;
    if (wUiDamageModifier && wUiDamageModifier.checked) code += `                    DamageModifier = true,
`;
    if (wUiToggleGuidance && wUiToggleGuidance.checked) code += `                    ToggleGuidance = true,
`;
    if (wUiEnableOverload && wUiEnableOverload.checked) code += `                    EnableOverload = true,
`;
    code += `                },
`;
  }

  // OtherDef (only write if non-default)
  const hasOtherNonDefault = (wConstructPartCap && parseInt(wConstructPartCap.value, 10) > 0) ||
    (wEnergyPriority && parseInt(wEnergyPriority.value, 10) > 0) ||
    (wRestrictionRadius && parseFloat(wRestrictionRadius.value) > 0) ||
    (wOtherDebug && wOtherDebug.checked) ||
    (wCheckInflatedBox && wCheckInflatedBox.checked) ||
    (wCheckForAnySupport && wCheckForAnySupport.checked) ||
    (wStayCharged && wStayCharged.checked) ||
    (wRotateToTarget && wRotateToTarget.checked) ||
    (wStopTrackingAfterFiring && wStopTrackingAfterFiring.checked) ||
    (wNoVoxelLOSCheck && wNoVoxelLOSCheck.checked);

  if (hasOtherNonDefault) {
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
  }

  code += `            },
`;

  // Ammos Array
  code += `            Ammos = new[]
`;
  code += `            {
`;
  code += `                ${ammosList},
`;
  code += `            },
`;

  // Extended / Auto-Discovered Tags
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
  if (parseFloat(aHealth.value) > 0) code += `            Health = ${aHealth.value}f,
`;
  if (parseFloat(aBackKick.value) > 0) code += `            BackKickForce = ${aBackKick.value}f,
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
  if (aNpcSafe && !aNpcSafe.checked) code += `            NpcSafe = false,
`;
  if (aNoGridOrArmorScaling && aNoGridOrArmorScaling.checked) code += `            NoGridOrArmorScaling = true,
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

  // ShapeDef (only output diameter if non-default)
  code += `            Shape = new ShapeDef
`;
  code += `            {
`;
  code += `                Shape = ${aShape.value},
`;
  if (parseFloat(aDiameter.value) > 0 || aShape.value === 'SphereShape') {
    code += `                Diameter = ${aDiameter.value}f,
`;
  }
  code += `            },
`;

  // ObjectsHitDef (only output if non-default)
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

  // FragmentDef (ONLY if enabled and populated)
  if (fEnable.checked && fChildAmmoRound.value && parseInt(fFragments.value, 10) > 0) {
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
    if (fReverse && fReverse.checked) code += `                Reverse = true,
`;
    if (fDropVelocity && fDropVelocity.checked) code += `                DropVelocity = true,
`;
    if (fIgnoreArming && fIgnoreArming.checked) code += `                IgnoreArming = true,
`;
    if (fRadial && fRadial.checked) code += `                Radial = true,
`;
    code += `            },
`;
  }

  // AreaOfDamageDef (ONLY if enabled and radius > 0)
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

  // Smarts (ONLY if smart guidance or non-default navigation)
  if (tGuidance.value === 'Smart' || (sNavAcceleration && parseFloat(sNavAcceleration.value) > 0)) {
    code += `                Smarts = new SmartsDef
`;
    code += `                {
`;
    if (sInaccuracy && parseFloat(sInaccuracy.value) > 0) code += `                    Inaccuracy = ${sInaccuracy.value}f,
`;
    if (sAggressiveness && parseFloat(sAggressiveness.value) !== 1.0) code += `                    Aggressiveness = ${sAggressiveness.value}f,
`;
    if (sNavAcceleration && parseFloat(sNavAcceleration.value) > 0) code += `                    NavAcceleration = ${sNavAcceleration.value}f,
`;
    code += `                    MaxLateralThrust = ${sMaxLateralThrust.value}f,
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

  // PatternDef (ONLY if enabled)
  if (pEnable && pEnable.checked && pPatterns.value.trim()) {
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
    if (pSkipParent && pSkipParent.checked) code += `                SkipParent = true,
`;
    if (pRandom && pRandom.checked) code += `                Random = true,
`;
    if (parseInt(pPatternSteps.value, 10) > 1) code += `                PatternSteps = ${pPatternSteps.value},
`;
    if (pMode && pMode.value !== 'Never') code += `                Mode = ${pMode.value},
`;
    code += `            },
`;
  }

  // EwarDef (ONLY if enabled)
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
    if (ewStackDuration && ewStackDuration.checked) code += `                StackDuration = true,
`;
    if (ewDeplete && ewDeplete.checked) code += `                Deplete = true,
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
  if (dsCharacters && parseFloat(dsCharacters.value) !== 1.0) code += `                Characters = ${dsCharacters.value}f,
`;
  code += `                Armor = new ArmorDef
`;
  code += `                {
`;
  if (dsArmorArmor && parseFloat(dsArmorArmor.value) !== -1) code += `                    Armor = ${dsArmorArmor.value}f,
`;
  code += `                    Light = ${dsLightArmor.value}f,
`;
  code += `                    Heavy = ${dsHeavyArmor.value}f,
`;
  if (dsNonArmor && parseFloat(dsNonArmor.value) !== -1) code += `                    NonArmor = ${dsNonArmor.value}f,
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
  if (dsDamageType && dsDamageType.value !== 'BaseDamage') {
    code += `                DamageType = new DamageTypes
`;
    code += `                {
`;
    code += `                    ${dsDamageType.value} = true,
`;
    code += `                },
`;
  }
  if (dsShieldType && (dsShieldType.value !== 'Default' || parseFloat(dsShieldBypassMod.value) > 0)) {
    code += `                Shields = new ShieldDef
`;
    code += `                {
`;
    code += `                    Modifier = ${dsShieldModifier.value}f,
`;
    code += `                    Type = ${dsShieldType.value},
`;
    if (parseFloat(dsShieldBypassMod.value) > 0) code += `                    BypassModifier = ${dsShieldBypassMod.value}f,
`;
    code += `                },
`;
  }
  code += `            },
`;

  // SynchronizeDef (ONLY if non-default)
  const isSyncCustom = (syncFull && syncFull.checked) ||
    (syncPointDefense && !syncPointDefense.checked) ||
    (syncOnHitDeath && syncOnHitDeath.checked) ||
    (syncInterval && parseInt(syncInterval.value, 10) > 0);

  if (isSyncCustom) {
    code += `            Sync = new SynchronizeDef
`;
    code += `            {
`;
    if (syncFull && syncFull.checked) code += `                Full = true,
`;
    if (syncPointDefense && !syncPointDefense.checked) code += `                PointDefense = false,
`;
    if (syncOnHitDeath && syncOnHitDeath.checked) code += `                OnHitDeath = true,
`;
    if (syncInterval && parseInt(syncInterval.value, 10) > 0) code += `                PositionSyncInterval = ${syncInterval.value},
`;
    if (syncPatchWindow && parseInt(syncPatchWindow.value, 10) > 0) code += `                PositionPatchWindow = ${syncPatchWindow.value},
`;
    if (syncUpdateOnRandomize && syncUpdateOnRandomize.checked) code += `                PositionUpdateOnRandomize = true,
`;
    code += `            },
`;
  }

  // GraphicDef
  code += `            Graphic = new GraphicDef
`;
  code += `            {
`;
  if (parseFloat(gVisualProb.value) !== 1.0) code += `                VisualProbability = ${gVisualProb.value}f,
`;
  if (gShieldHitDraw && !gShieldHitDraw.checked) code += `                ShieldHitDraw = false,
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
  if (gTracerColor && gTracerColor.value.trim()) code += `                        Color = Color(${gTracerColor.value}),
`;
  if (gTracerTexture && gTracerTexture.value.trim() && gTracerTexture.value !== 'WeaponLaser') {
    code += `                        Textures = new[] { "${gTracerTexture.value}" },
`;
  }
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
    if (gTrailAlwaysDraw && gTrailAlwaysDraw.checked) code += `                        AlwaysDraw = true,
`;
    code += `                        DecayTime = ${gTrailDecay.value},
`;
    code += `                        CustomWidth = ${gTrailWidth.value}f,
`;
    if (gTrailColor && gTrailColor.value.trim()) code += `                        Color = Color(${gTrailColor.value}),
`;
    if (gTrailTextures && gTrailTextures.value.trim()) code += `                        Textures = new[] { "${gTrailTextures.value}" },
`;
    code += `                    },
`;
  }
  code += `                },
`;
  code += `            },
`;

  // AudioDef (only write sounds that are defined)
  const hasAudio = (aSoundShot && aSoundShot.value.trim()) ||
    (aSoundTravel && aSoundTravel.value.trim()) ||
    (aSoundHit && aSoundHit.value.trim()) ||
    (aSoundShieldHit && aSoundShieldHit.value.trim()) ||
    (aSoundVoxelHit && aSoundVoxelHit.value.trim()) ||
    (aSoundPlayerHit && aSoundPlayerHit.value.trim()) ||
    (aSoundWaterHit && aSoundWaterHit.value.trim());

  if (hasAudio) {
    code += `            Audio = new AmmoAudioDef
`;
    code += `            {
`;
    if (aSoundShot && aSoundShot.value.trim()) code += `                ShotSound = "${aSoundShot.value}",
`;
    if (aSoundTravel && aSoundTravel.value.trim()) code += `                TravelSound = "${aSoundTravel.value}",
`;
    if (aSoundHit && aSoundHit.value.trim()) code += `                HitSound = "${aSoundHit.value}",
`;
    if (aSoundShieldHit && aSoundShieldHit.value.trim()) code += `                ShieldHitSound = "${aSoundShieldHit.value}",
`;
    if (aSoundVoxelHit && aSoundVoxelHit.value.trim()) code += `                VoxelHitSound = "${aSoundVoxelHit.value}",
`;
    if (aSoundPlayerHit && aSoundPlayerHit.value.trim()) code += `                PlayerHitSound = "${aSoundPlayerHit.value}",
`;
    if (aSoundWaterHit && aSoundWaterHit.value.trim()) code += `                WaterHitSound = "${aSoundWaterHit.value}",
`;
    if (aHitPlayChance && parseFloat(aHitPlayChance.value) !== 1.0) code += `                HitPlayChance = ${aHitPlayChance.value}f,
`;
    if (aHitPlayShield && !aHitPlayShield.checked) code += `                HitPlayShield = false,
`;
    code += `            },
`;
  }

  // Extended / Auto-Discovered Tags
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

  const sbc = activeWeapon.sbcData || {};
  const sub = (sbcSubtypeId && sbcSubtypeId.value.trim()) || activeWeapon.subtypeId || activeWeapon.id || 'GVK_CustomWeapon';
  const name = (sbcDisplayName && sbcDisplayName.value.trim()) || sbc.displayName || activeWeapon.displayName || activeWeapon.name || sub;
  const typeId = (sbcTypeId && sbcTypeId.value.trim()) || sbc.typeId || (activeWeapon.type === 'Turret' ? 'LargeMissileTurret' : 'ConveyorSorter');

  // Decide xsi:type
  let xsiType = sbc.xsiType;
  if (!xsiType || (sbcTypeId && sbcTypeId.value !== sbc.typeId)) {
    if (typeId === 'ConveyorSorter') xsiType = 'MyObjectBuilder_ConveyorSorterDefinition';
    else if (typeId === 'InteriorTurret') xsiType = 'MyObjectBuilder_InteriorTurretDefinition';
    else if (typeId.includes('Turret')) xsiType = 'MyObjectBuilder_LargeTurretBaseDefinition';
    else if (typeId === 'SmallGatlingGun' || typeId === 'SmallMissileLauncher') xsiType = 'MyObjectBuilder_WeaponBlockDefinition';
    else xsiType = 'MyObjectBuilder_LargeTurretBaseDefinition';
  }

  const grid = (sbcCubeSize && sbcCubeSize.value) || sbc.cubeSize || activeWeapon.grid || 'Large';
  const desc = (sbcDescription && sbcDescription.value.trim()) || sbc.description || `${name}.
[Uses ${activeWeapon.ammoName || 'Ammunition'}]`;
  const icon = (sbcIcon && sbcIcon.value.trim()) || sbc.icon || `Textures\GUI\Icons\Cubes\${sub}.png`;
  const model = (sbcModel && sbcModel.value.trim()) || sbc.model || `Models\Cubes\${grid}\${sub}.mwm`;
  const pairName = (sbcBlockPairName && sbcBlockPairName.value.trim()) || sbc.blockPairName || sub;
  const edgeType = (sbcEdgeType && sbcEdgeType.value) || sbc.edgeType || 'Light';

  const sizeX = sbcSizeX ? sbcSizeX.value : (sbc.size ? sbc.size.x : 1);
  const sizeY = sbcSizeY ? sbcSizeY.value : (sbc.size ? sbc.size.y : 1);
  const sizeZ = sbcSizeZ ? sbcSizeZ.value : (sbc.size ? sbc.size.z : 1);

  const moX = sbcModelOffsetX ? sbcModelOffsetX.value : (sbc.modelOffset ? sbc.modelOffset.x : 0);
  const moY = sbcModelOffsetY ? sbcModelOffsetY.value : (sbc.modelOffset ? sbc.modelOffset.y : 0);
  const moZ = sbcModelOffsetZ ? sbcModelOffsetZ.value : (sbc.modelOffset ? sbc.modelOffset.z : 0);

  const mirrorX = (sbcMirroringX && sbcMirroringX.value.trim()) || sbc.mirroringX || '';
  const mirrorY = (sbcMirroringY && sbcMirroringY.value.trim()) || sbc.mirroringY || 'Z';
  const mirrorZ = (sbcMirroringZ && sbcMirroringZ.value.trim()) || sbc.mirroringZ || 'Y';

  const bTime = activeWeapon.buildTimeSeconds || (sbcBuildTime && sbcBuildTime.value) || sbc.buildTimeSeconds || 60;
  const pcu = (activeWeapon.upCost !== undefined ? activeWeapon.upCost : (sbcUpCost && sbcUpCost.value)) || sbc.pcu || 0;

  const resGroup = (sbcResourceSinkGroup && sbcResourceSinkGroup.value.trim()) || sbc.resourceSinkGroup || 'Defense';
  const overlay = (sbcOverlayTexture && sbcOverlayTexture.value.trim()) || sbc.overlayTexture || 'Textures\GUI\Screens\camera_overlay.dds';
  const invVol = (sbcInventoryMaxVolume && sbcInventoryMaxVolume.value) || sbc.inventoryMaxVolume || 0.384;

  const isSorter = (typeId === 'ConveyorSorter');

  function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  }

  // Strictly canonical Keen CubeBlock tag ordering:
  let xml = `		<Definition xsi:type="${xsiType}">
`;
  xml += `			<Id>
`;
  xml += `				<TypeId>${typeId}</TypeId>
`;
  xml += `				<SubtypeId>${sub}</SubtypeId>
`;
  xml += `			</Id>
`;
  xml += `			<DisplayName>${escapeXml(name)}</DisplayName>
`;
  xml += `			<Description>${escapeXml(desc)}
			</Description>
`;
  xml += `			<Icon>${icon}</Icon>
`;
  xml += `			<CubeSize>${grid}</CubeSize>
`;
  xml += `			<BlockTopology>${sbc.blockTopology || 'TriangleMesh'}</BlockTopology>
`;
  xml += `			<Size x="${sizeX}" y="${sizeY}" z="${sizeZ}"/>
`;
  xml += `			<ModelOffset x="${moX}" y="${moY}" z="${moZ}"/>
`;
  xml += `			<Model>${model}</Model>
`;
  if (sbc.useModelIntersection) xml += `			<UseModelIntersection>true</UseModelIntersection>
`;
  if (sbc.showEdges !== undefined) xml += `			<ShowEdges>${sbc.showEdges}</ShowEdges>
`;

  // Components block
  xml += `			<Components>
`;
  if (activeWeapon.components && activeWeapon.components.length > 0) {
    activeWeapon.components.forEach(c => {
      xml += `				<Component Subtype="${c.name}" Count="${c.count}"/>
`;
    });
  } else if (sbc.components && sbc.components.length > 0) {
    sbc.components.forEach(c => {
      xml += `				<Component Subtype="${c.name}" Count="${c.count}"/>
`;
    });
  } else {
    xml += `				<Component Subtype="SteelPlate" Count="150"/>
`;
    xml += `				<Component Subtype="Computer" Count="20"/>
`;
    xml += `				<Component Subtype="SteelPlate" Count="50"/>
`;
  }
  xml += `			</Components>
`;

  const critSub = (sbc.criticalComponent && sbc.criticalComponent.subtype) || 'Computer';
  const critIdx = (sbc.criticalComponent && sbc.criticalComponent.index !== undefined) ? sbc.criticalComponent.index : 0;
  xml += `			<CriticalComponent Subtype="${critSub}" Index="${critIdx}"/>
`;

  // MountPoints
  if (sbc.mountPoints && sbc.mountPoints.length > 0) {
    xml += `			<MountPoints>
`;
    sbc.mountPoints.forEach(mp => {
      let attrs = Object.entries(mp).map(([k, v]) => `${k}="${v}"`).join(' ');
      xml += `				<MountPoint ${attrs}/>
`;
    });
    xml += `			</MountPoints>
`;
  } else {
    xml += `			<MountPoints>
`;
    xml += `				<MountPoint Side="Bottom" StartX="0.0" StartY="0.0" EndX="${sizeX}.0" EndY="${sizeZ}.0" Default="true"/>
`;
    xml += `			</MountPoints>
`;
  }

  // BuildProgressModels
  if (sbc.buildProgressModels && sbc.buildProgressModels.length > 0) {
    xml += `			<BuildProgressModels>
`;
    sbc.buildProgressModels.forEach(bpm => {
      let pct = bpm.percent || bpm.BuildPercentUpperBound || '1.0';
      let file = bpm.file || bpm.File || '';
      xml += `				<Model BuildPercentUpperBound="${pct}" File="${file}"/>
`;
    });
    xml += `			</BuildProgressModels>
`;
  }

  xml += `			<BlockPairName>${pairName}</BlockPairName>
`;
  if (mirrorX) xml += `			<MirroringX>${mirrorX}</MirroringX>
`;
  if (mirrorY) xml += `			<MirroringY>${mirrorY}</MirroringY>
`;
  if (mirrorZ) xml += `			<MirroringZ>${mirrorZ}</MirroringZ>
`;

  xml += `			<BuildTimeSeconds>${bTime}</BuildTimeSeconds>
`;
  xml += `			<EdgeType>${edgeType}</EdgeType>
`;
  if (resGroup) xml += `			<ResourceSinkGroup>${resGroup}</ResourceSinkGroup>
`;
  if (overlay) xml += `			<OverlayTexture>${overlay}</OverlayTexture>
`;

  // Turret camera FOV
  if (!isSorter) {
    const minFov = (sbcMinFov && sbcMinFov.value) || sbc.minFov || '0.1';
    const maxFov = (sbcMaxFov && sbcMaxFov.value) || sbc.maxFov || '1.04719755';
    xml += `			<MinFov>${minFov}</MinFov>
`;
    xml += `			<MaxFov>${maxFov}</MaxFov>
`;
  }

  if (invVol) xml += `			<InventoryMaxVolume>${invVol}</InventoryMaxVolume>
`;

  const dmgEff = (sbcDamageEffectName && sbcDamageEffectName.value) || sbc.damageEffectName || (isSorter ? 'Damage_Electrical_Damaged_Blue' : 'Damage_WeapExpl_Damaged');
  const dmgSnd = (sbcDamagedSound && sbcDamagedSound.value) || sbc.damagedSound || (isSorter ? 'ParticleElectrical' : 'ParticleWeapExpl');
  const dstEff = (sbcDestroyEffect && sbcDestroyEffect.value) || sbc.destroyEffect || 'BlockDestroyedExplosion_Small';
  const dstSnd = (sbcDestroySound && sbcDestroySound.value) || sbc.destroySound || 'WepSmallWarheadExpl';

  if (dmgEff) xml += `			<DamageEffectName>${dmgEff}</DamageEffectName>
`;
  if (dmgSnd) xml += `			<DamagedSound>${dmgSnd}</DamagedSound>
`;
  if (dstEff) xml += `			<DestroyEffect>${dstEff}</DestroyEffect>
`;
  if (dstSnd) xml += `			<DestroySound>${dstSnd}</DestroySound>
`;
  xml += `			<PCU>${pcu}</PCU>
`;
  xml += `			<EmissiveColorPreset>${sbc.emissiveColorPreset || 'Default'}</EmissiveColorPreset>
`;
  xml += `			<IsAirTight>${sbc.isAirTight === true}</IsAirTight>
`;

  // AiEnabled suppression for WeaponCore turrets
  if (!isSorter) {
    xml += `			<!-- MANDATORY KEEN AI SUPPRESSION FOR WEAPONCORE TURRETS -->
`;
    xml += `			<AiEnabled>false</AiEnabled>
`;
  }

  // Targeting groups
  xml += `			<TargetingGroups>
`;
  const tgList = sbc.targetingGroups && sbc.targetingGroups.length > 0 ? sbc.targetingGroups : ['Weapons'];
  tgList.forEach(tg => {
    xml += `				<string>${tg}</string>
`;
  });
  xml += `			</TargetingGroups>
`;

  // VoxelPlacement
  if (sbc.voxelPlacement && (sbc.voxelPlacement.staticMode || sbc.voxelPlacement.dynamicMode)) {
    xml += `			<VoxelPlacement>
`;
    if (sbc.voxelPlacement.staticMode) {
      const sm = sbc.voxelPlacement.staticMode;
      xml += `				<StaticMode>
`;
      xml += `					<PlacementMode>${sm.placementMode || 'OutsideVoxel'}</PlacementMode>
`;
      xml += `					<MaxAllowed>${sm.maxAllowed || 0.2}</MaxAllowed>
`;
      xml += `					<MinAllowed>${sm.minAllowed || 0}</MinAllowed>
`;
      xml += `				</StaticMode>
`;
    }
    if (sbc.voxelPlacement.dynamicMode) {
      const dm = sbc.voxelPlacement.dynamicMode;
      xml += `				<DynamicMode>
`;
      xml += `					<PlacementMode>${dm.placementMode || 'OutsideVoxel'}</PlacementMode>
`;
      xml += `					<MaxAllowed>${dm.maxAllowed || 0.2}</MaxAllowed>
`;
      xml += `					<MinAllowed>${dm.minAllowed || 0.01}</MinAllowed>
`;
      xml += `				</DynamicMode>
`;
    }
    xml += `			</VoxelPlacement>
`;
  }

  xml += `			<GuiVisible>false</GuiVisible>
`;
  xml += `			<Public>true</Public>
`;
  xml += `		</Definition>`;

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
  
  // Live binding for Scope C SBC fields
  const sbcInputs = [
    sbcSubtypeId, sbcTypeId, sbcDisplayName, sbcBlockPairName, sbcCubeSize,
    sbcResourceSinkGroup, sbcBuildTime, sbcUpCost, sbcDescription,
    sbcIcon, sbcModel, sbcOverlayTexture, sbcInventoryMaxVolume,
    sbcSizeX, sbcSizeY, sbcSizeZ, sbcModelOffsetX, sbcModelOffsetY, sbcModelOffsetZ,
    sbcEdgeType, sbcMirroringX, sbcMirroringY, sbcMirroringZ,
    sbcMinFov, sbcMaxFov, sbcDamageEffectName, sbcDamagedSound, sbcDestroyEffect, sbcDestroySound
  ];
  sbcInputs.forEach(inp => {
    if (!inp) return;
    inp.addEventListener('input', () => {
      updateDirectSbcXml();
      const codeBox = document.getElementById('code-cubeblocks-sbc');
      if (codeBox) codeBox.textContent = generateSbcCubeBlocks();
    });
    inp.addEventListener('change', () => {
      updateDirectSbcXml();
      const codeBox = document.getElementById('code-cubeblocks-sbc');
      if (codeBox) codeBox.textContent = generateSbcCubeBlocks();
    });
  });

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

  // Clear default styling on user input
  const allInputs = document.querySelectorAll('.control-input');
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-wc-default');
      if (input.removeAttribute) input.removeAttribute('title');
    });
    input.addEventListener('change', () => {
      input.classList.remove('is-wc-default');
      if (input.removeAttribute) input.removeAttribute('title');
    });
  });

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
