
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
  restrictionRadius: 0,
  otherDebug: false,
  checkInflatedBox: false,
  checkForAnyWeapon: false,
  stayCharged: false,
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

  // Trajectory & Smarts
  accelPerSec: 0,
  speedVariance: 0,
  rangeVariance: 0,
  deaccelTime: 0,
  targetLossDegree: 0,
  targetLossTime: 0,
  guidance: "None",
  smartsInaccuracy: 0,
  smartsAggressiveness: 1.0,
  smartsNavAcceleration: 0,
  smartsMaxLateralThrust: 0.5,
  smartsSteeringLimit: 0,
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
  fragmentOffset: 0,
  fragmentReverse: false,
  fragmentDropVelocity: false,
  fragmentIgnoreArming: false,
  fragmentRadial: 0,

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
  soundVoxelHit: "",
  soundPlayerHit: "",
  soundWaterHit: "",
  hitPlayChance: 1.0,

  // SynchronizeDef
  syncFull: false,
  syncPointDefense: true,
  syncOnHitDeath: false,
  syncInterval: 0,
  syncPatchWindow: 0,
  syncUpdateOnRandomize: false
};

// ==========================================================================
// WORKBENCH FIELD HELP (Definition Workbench Scope A & B tooltips)
// Wording adapted from the canonical WeaponCore example definitions in
// docs/data/Scripts/CoreParts/ — deprecated local copy removed. Canonical WeaponCore example definitions
// now live in the mod repo's CoreParts/ folder (same files the live pipeline parses).
// Keys are DOM element ids; values are hover tooltip descriptions.
// ==========================================================================
const WORKBENCH_FIELD_HELP = {
  // --- Scope A / 1. ModelAssignmentsDef ---
  wSubtypeId: "MountPoint.SubtypeId — the block SubtypeId. Your CubeBlocks SBC contains this information.",
  wPartName: "HardPoint.PartName — name of the weapon in terminal. Should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).",
  wDurabilityMod: "MountPoint.DurabilityMod — general damage multiplier. 0.25f = 25% damage taken.",
  wScope: "ModelAssignments.Scope — the dummy where line of sight checks are performed from. Must be clear of block collision.",
  wSpinPartId: "For weapons with a spinning barrel such as gatling guns. Subpart_Boomsticks must be written as Boomsticks.",
  wMuzzlePartId: "The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_X is written as X.",
  wAzimuthPartId: "Your rotating subpart — the bit that moves sideways.",
  wElevationPartId: "Your elevating subpart — the bit that moves up.",
  wIconName: "Overlay for block inventory slots. Plain file names resolve from mod root\\Textures\\GUI\\Icons; paths starting with \\ resolve from the mod root (modded textures); other paths are used as-is (vanilla textures only).",
  wMuzzles: "Where your projectiles spawn. Use numbers not letters, i.e. muzzle_01 not muzzle_A. Comma-separated list.",

  // --- Scope A / 2. HardwareDef ---
  wRotateRate: "Max traversal speed of the azimuth subpart in radians per tick (0.1 is approximately 360 degrees per second).",
  wElevateRate: "Max traversal speed of the elevation subpart in radians per tick.",
  wMinAzimuth: "MinAzimuth — lower azimuth (left/right) traverse limit, in degrees.",
  wMaxAzimuth: "MaxAzimuth — upper azimuth (left/right) traverse limit, in degrees.",
  wMinElevation: "MinElevation — lower elevation (up/down) traverse limit, in degrees.",
  wMaxElevation: "MaxElevation — upper elevation (up/down) traverse limit, in degrees.",
  wHomeAzimuth: "HomeAzimuth — default resting rotation angle.",
  wHomeElevation: "HomeElevation — default resting elevation.",
  wInventorySize: "Inventory capacity in kL (m³).",
  wIdlePower: "Constant base power draw in MW.",
  wHardwareType: "What type of weapon this is: BlockWeapon, HandWeapon, Phantom.",
  wOffsetX: "Hardware.Offset — offsets the aiming/firing line of the weapon on the X axis, in metres.",
  wOffsetY: "Hardware.Offset — offsets the aiming/firing line of the weapon on the Y axis, in metres.",
  wOffsetZ: "Hardware.Offset — offsets the aiming/firing line of the weapon on the Z axis, in metres.",

  // --- Scope A / 3. LoadingDef ---
  wRateOfFire: "Loading.RateOfFire — how fast your gun fires per minute. Set this to 3600 for beam weapons.",
  wBarrelsPerShot: "How many muzzles will fire a projectile per fire event.",
  wTrajectilesPerBarrel: "Number of projectiles per muzzle per fire event.",
  wSkipBarrels: "Number of muzzles to skip after each fire event.",
  wReloadTime: "Measured in game ticks (6 = 100ms, 60 = 1 second).",
  wMagsToLoad: "Number of physical magazines to consume on reload.",
  wDelayUntilFire: "How long the weapon waits before shooting after being told to fire. Measured in game ticks.",
  wShotsInBurst: "Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity. 0 = continuous fire.",
  wDelayAfterBurst: "How long to spend 'reloading' after each burst. Measured in game ticks.",
  wHeatPerShot: "Heat generated per shot. BarrelsPerShot × HeatPerShot is the total heat per firing event.",
  wMaxHeat: "Max heat before the weapon enters cooldown (70% of max heat).",
  wHeatSinkRate: "Amount of heat lost per second.",
  wCooldown: "Percentage of max heat to be under to start firing again after overheat. Accepts 0 – 0.95.",
  wFireFull: "Fire the full magazine (or full burst if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.",
  wGiveUpAfter: "Whether the weapon should drop its current target and reacquire a new one after finishing its magazine or burst.",
  wGoHomeToReload: "The weapon must be in the home position before it can reload.",
  wDropTargetUntilLoaded: "The weapon drops its target when out of ammo, until it is reloaded.",
  wDegradeWithHeat: "DegradeRof — progressively lower rate of fire when over the 80% heat threshold (80% of max heat).",

  // --- Scope A / 4. HardPointDef ---
  wDeviateAngle: "DeviateShotAngle — projectile inaccuracy in degrees.",
  wAimingTolerance: "How many degrees off target a turret can fire at. 0 – 180 firing angle.",
  wAimLeading: "AimLeadingPrediction — Off (aim straight at target), Basic (doesn't account for target acceleration), Accurate, Advanced (last two are identical).",
  wDelayCeaseFire: "Length of time the weapon continues firing after the trigger is released — while a target is available. Measured in game ticks.",
  wAddToleranceToTracking: "Allows the turret to track to the edge of the AimingTolerance cone instead of dead centre.",
  wCanShootSubmerged: "Whether the weapon itself will be usable if submerged when using WaterMod.",
  wNpcSafe: "Tells NPC modders that your weapon was designed with them in mind. Unless they tell you otherwise, set this to false.",

  // --- Scope A / 5. TargetingDef ---
  wMaxTargetDistance: "Maximum distance at which targets will be automatically shot at. 0 = unlimited.",
  wMinTargetDistance: "Minimum distance at which targets will be automatically shot at.",
  wTopTargets: "Number of potential grid targets to randomize, then go in list order. 0 = no randomization, goes in order of SortedThreats.",
  wTopBlocks: "Number of potential block targets to randomize, then go in list order. 0 = no randomization.",
  wStopTrackingSpeed: "Do not track projectiles traveling faster than this speed. 0 = unlimited.",
  wThreatGrids: "Threat type: Grids (both large and small). Use ProhibitLGTargeting / ProhibitSGTargeting to further differentiate.",
  wThreatProjectiles: "Threat type: Projectiles — the point-defense role.",
  wThreatCharacters: "Threat type: Characters.",
  wThreatMeteors: "Threat type: Meteors.",
  wThreatNeutrals: "Threat type: Neutrals.",
  wSubOffense: "Subsystem priority entry — order matters! The weapon targets checked subsystems in the order listed here. Offense = weapon blocks.",
  wSubPower: "Subsystem priority entry — order matters! Power = reactors, batteries and other power sources.",
  wSubProduction: "Subsystem priority entry — order matters! Production = assemblers, refineries and other production blocks.",
  wSubThrust: "Subsystem priority entry — order matters! Thrust = thrusters (and hovers).",
  wSubJumping: "Subsystem priority entry — order matters! Jumping = jump drives.",
  wSubSteering: "Subsystem priority entry — order matters! Steering = gyros.",
  wSubAny: "Subsystem priority entry — order matters! Any = fallback to any block.",
  wClosestFirst: "Tries to pick closest targets first (blocks on grids, projectiles, etc...).",
  wIgnoreDumb: "Don't fire at non-smart projectiles. If you're using projectile tags, keep this false as it overwrites the newer system.",
  wLockedSmartOnly: "Only fire at smart projectiles that are locked on to the parent grid.",
  wCtrlAutomatic: "Targeting.ValidControlModes — allow the weapon's AI to pick and shoot targets on its own. Leaving all three checked omits the tag (all modes allowed).",
  wCtrlManual: "Targeting.ValidControlModes — allow direct player control (manual aim/fire).",
  wCtrlPainter: "Targeting.ValidControlModes — allow HUD painter targeting. Servers can still ban it via ProhibitHUDPainter.",

  // --- Scope A / 6. AiDef & UiDef ---
  wAiTrackTargets: "Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking for target designation. Turrets need this true.",
  wAiTurretAttached: "Whether this weapon is a turret and should have the UI and API options for such. Turrets need this true.",
  wAiTurretController: "Whether this weapon can physically control the turret's movement. Turrets need this true.",
  wAiPrimaryTracking: "For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.",
  wAiLockOnFocus: "If enabled, the weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.",
  wAiSuppressInfracted: "SuppressFire — if enabled, the weapon can only be fired manually.",
  wUiRateOfFire: "Enables the terminal slider for changing rate of fire.",
  wUiDamageModifier: "Enables the terminal slider for changing damage per shot.",
  wUiToggleGuidance: "Enables the terminal option to disable smart projectile guidance.",
  wUiEnableOverload: "Enables the terminal Overload toggle: doubles damage per shot at quadrupled power draw and heat gain, and 2% self damage on overheat.",

  // --- Scope A / 7. HardPointAudioDef ---
  wSoundFiring: "FiringSound — audio SubtypeID for firing.",
  wSoundPreFiring: "Audio for warmup effect.",
  wSoundReload: "Sound SubtypeID for when your weapon is in a reloading state.",
  wSoundRotate: "HardPointRotationSound — audio played when the turret is moving.",
  wSoundNoAmmo: "Sound for if the user attempts to fire the gun without ammo.",
  wSoundFiringPerShot: "Whether to replay the sound for each shot, or just loop over the entire track while firing.",

  // --- Scope A / 8. OtherDef ---
  wConstructPartCap: "Maximum number of blocks with this weapon on a grid. 0 = unlimited.",
  wRestrictionRadius: "Prevents other blocks of this type from being placed within this distance of the centre of the block.",
  wOtherDebug: "Force enables debug mode — will output damage stats to the WC log.",
  wCheckInflatedBox: "If true, the RestrictionRadius distance check is performed from the edge of the block instead of the centre.",
  wCheckForAnyWeapon: "If true, the RestrictionRadius check fails if ANY weapon is present, not just weapons of the same subtype.",
  wStayCharged: "Will start recharging whenever the power cap is not full.",
  wNoVoxelLOSCheck: "If true this ignores voxels for LOS checking — weapons will fire at targets behind voxels. Can save CPU in some situations, use with caution.",
  // --- Scope B / 1. Ammo core ---
  aAmmoRound: "AmmoRound — unique name used in server overrides and in the terminal (default). Should be different for each AmmoDef used by the same weapon. Referred to for shrapnel.",
  aAmmoMagazine: "SubtypeId of the physical ammo magazine. Use 'Energy' for weapons without physical ammo.",
  aTerminalName: "Optional terminal name for this ammo type, used when picking ammo / cycling consumables. Safe to have duplicates across different ammo defs.",
  aBaseDamage: "Direct damage; one steel plate is worth 100.",
  aBaseDamageCutoff: "Maximum amount of pen damage to apply per block hit. Penetration mechanic that damages blocks beyond the first hit without requiring destruction. 0 disables.",
  aMass: "In kilograms; how much force the impact will apply to the target, multiplied by projectile speed at time of impact. Beams only use the Mass value, no multiplier.",
  aHealth: "How much damage the projectile can take from other projectiles before dying. 0 disables this and makes the projectile untargetable.",
  aBackKick: "BackKickForce — recoil. This is applied to the parent grid.",
  aDecayPerShot: "Damage to the firing weapon itself. float.MaxValue drops the weapon to the first build state; if greater than cube integrity it removes the cube upon firing without deformation.",
  aEnergyCost: "Scaler for energy per shot: EnergyCost × BaseDamage × (RateOfFire / 3600) × BarrelsPerShot × TrajectilesPerBarrel. Uses EffectStrength instead of BaseDamage if EWAR.",
  aEnergyMagazineSize: "For energy weapons, how many shots to fire before reloading.",
  aHeatModifier: "Allows this ammo to modify the amount of heat the weapon produces per shot.",
  aHeatNeededToFire: "Makes this ammo require heat before it can be fired. Does NOT subtract the heat — use AllowNegativeHeatModifier to subtract the desired amount.",
  aHardPointUsable: "Whether this is a primary ammo type fired directly by the turret. Set false if this is a shrapnel AmmoType the turret should not select directly.",
  aHybridRound: "Use both a physical ammo magazine and energy per shot.",
  aNpcSafe: "Tells NPC modders that your ammo was designed with them in mind. If they tell you otherwise, set this to false.",
  aNoGridOrArmorScaling: "If you enable this you can remove the DamageScales section entirely.",
  aIgnoreWater: "Whether the projectile should be able to penetrate water when using WaterMod.",
  aIgnoreVoxels: "Whether the projectile should be able to penetrate voxels.",
  aIgnoreGrids: "Disables collisions with grids and defense shields. Designed for fragments that time things, or for anti-projectile weapons firing through grids.",
  aAllowNegativeHeatModifier: "Bypasses the HeatModifier > 0 check to allow ammo types to reduce heat on weapons. Useful for ammo that takes away rather than gives heat.",
  aGridsTargetSeekersTargetingThis: "If true, any smart projectiles targeting this projectile will be added to grid threat lookups (and therefore will be shot at).",

  // --- Scope B / 2. TrajectoryDef & SmartsDef ---
  tDesiredSpeed: "Desired projectile speed in m/s. Voxel phasing if you go above 5100.",
  tAccelPerSec: "Acceleration in meters per second². Projectile starts on tick 0 at its parent's (weapon/other projectile) travel velocity.",
  tMaxTrajectory: "Max distance the projectile or beam can travel.",
  tMaxLifeTime: "0 is disabled, measured in game ticks (6 = 100ms, 60 = 1s). Time must EXCEED this value to trigger expiry. Please have a value for this — it stops Bad things.",
  tSpeedVariance: "Subtracts a random value from DesiredSpeed. Be warned: you can make your projectile go backwards.",
  tRangeVariance: "Subtracts a random value from MaxTrajectory.",
  tDeaccelTime: "EWAR & mines only — time to spend slowing down to a stop at end of trajectory. 0 is instant stop.",
  tTargetLossDegree: "Degrees the target may leave the forward aim cone before the projectile loses lock.",
  tTargetLossTime: "0 is disabled, measured in game ticks — time without a valid target before the projectile gives up.",
  tGuidance: "Guidance type: None (no guidance, standard shells), TravelTo (tracks the aim point of the ammo's target when fired — flak), Smart (guided projectile based on SmartsDef), Detect* (mine behaviors).",
  sInaccuracy: "0 is perfect; hit accuracy will be a random number of meters between 0 and this value.",
  sAggressiveness: "Controls how responsive tracking is. Recommended value 3–5.",
  sNavAcceleration: "Helps influence how the projectile steers. 0 defaults to half the Aggressiveness value (or 0 if that is 0); a value less than 0 disables this feature.",
  sMaxLateralThrust: "Controls how sharp the projectile may turn — the cheaper but less realistic version of SteeringLimit (cost 2 on a 1–5 scale, 0 being basic smart).",
  sSteeringLimit: "0 means no limit, value is in degrees — good starting point is 150. Enables advanced smart control (cost 3 on a 1–5 scale, 0 being basic smart).",
  sAltNavigation: "If true, swaps the default navigation algorithm from ProNav to ZeroEffort Miss — more direct/precise but less cinematic.",

  // --- Scope B / 3. ShapeDef & ObjectsHitDef ---
  aShape: "Defines the collision shape of the projectile. LineShape or SphereShape. LineShape is deprecated — it boils down to a sphere with a diameter calculated from projectile speed.",
  aDiameter: "For SphereShape this is the collision diameter. LineShape ignores this.",
  oMaxObjectsHit: "Limits the number of grids or projectiles that damage can be applied to — useful to limit overpenetration. 0 = unlimited.",
  oCountBlocks: "Counts individual blocks, not just entities hit. Every block touched by primary damage hits counts toward MaxObjectsHit.",
  oSkipBlocksForAOE: "If CountBlocks is true, determines whether AOE hits are counted against MaxObjectsHit. Set true to skip counting for AOE.",

  // --- Scope B / 4. DamageScaleDef ---
  dsMaxIntegrity: "Blocks with integrity higher than this value will be immune to damage from this projectile. 0 = disabled.",
  dsCharacters: "Character damage multiplier; defaults to 1 if zero or less.",
  dsDamageType: "Damage type of the projectile's damage: Kinetic or Energy.",
  dsArmorArmor: "Multiplier for damage against all armor — multiplied with the specific armor type multiplier (light, heavy). -1 = disabled (higher performance), 0 = no damage, 2 = 200% damage.",
  dsLightArmor: "Multiplier for damage against light armor. -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.",
  dsHeavyArmor: "Multiplier for damage against heavy armor. -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.",
  dsNonArmor: "Multiplier for damage against everything else. -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.",
  dsGridLarge: "Multiplier for damage against large grids (-1 = unset). If both grid multipliers are unset, WeaponCore applies a 0.25x debuff to large-grid weapons firing at small grids (unless the server disables the small-vs-large buff).",
  dsGridSmall: "Multiplier for damage against small grids (-1 = unset). If both grid multipliers are unset, WeaponCore applies a 0.25x debuff to large-grid weapons firing at small grids (unless the server disables the small-vs-large buff).",
  dsCutoffArmorArmor: "ArmorForCutoff.Armor — scales BaseDamageCutoff (per-block penetration cap) against all armor. Stacks with the Light/Heavy cutoff scale. -1 = unchanged. 0 = zero cap (no damage) vs armor.",
  dsCutoffLightArmor: "ArmorForCutoff.Light — scales BaseDamageCutoff against light armor. -1 = unchanged.",
  dsCutoffHeavyArmor: "ArmorForCutoff.Heavy — scales BaseDamageCutoff against heavy armor. -1 = unchanged.",
  dsCutoffNonArmor: "ArmorForCutoff.NonArmor — scales BaseDamageCutoff against non-armor blocks. -1 = unchanged.",
  dsCutoffGridLarge: "GridSizeForCutoff.Large — scales BaseDamageCutoff against large grids. -1 or 0 = unchanged.",
  dsCutoffGridSmall: "GridSizeForCutoff.Small — scales BaseDamageCutoff against small grids. -1 or 0 = unchanged.",
  dsFalloffDistance: "FallOff.Distance — distance at which damage begins falling off.",
  dsFalloffMinMult: "FallOff.MinMultipler — value from 0.0001 to 1 where 0.1 would be a min damage of 10% of base damage.",

  // --- Scope B / 5. AreaOfDamageDef ---
  aodBlockEnable: "ByBlockHit — enable the impact explosion. Note: AOE only applies to the player/grid hit (and nearby projectiles), not nearby grids/players.",
  aodBlockRadius: "ByBlockHit explosion radius, in meters.",
  aodBlockDamage: "ByBlockHit explosion damage.",
  aodBlockDepth: "Max depth of the ByBlockHit AOE effect, in meters. 0 = disabled, and the AOE reaches to a depth of the radius value.",
  aodBlockMaxAbsorb: "Soft cutoff for damage (total, against shields or grids), except for pooled falloff. If pooled falloff, limits max damage per block.",
  aodBlockFalloff: "Falloff options: NoFalloff (same damage in radius), Linear (even drop by distance), Curve, InvCurve, Squeeze, Pooled (damage ceases once exhausted), Exponential.",
  aodBlockShape: "Round or Diamond shape. Diamond is more performance friendly.",
  aodEolEnable: "EndOfLife — enable the blast when the projectile expires (proximity / range expiry).",
  aodEolRadius: "Radius of the EndOfLife AOE effect, in meters.",
  aodEolDamage: "EndOfLife explosion damage.",
  aodEolDepth: "Max depth of the EndOfLife AOE effect, in meters. 0 = disabled, and the AOE reaches to a depth of the radius value.",
  aodEolMaxAbsorb: "Soft cutoff for damage (total, against shields or grids), except for pooled falloff. If pooled falloff, limits max damage per block.",
  aodEolFalloff: "Falloff options: NoFalloff (same damage in radius), Linear (even drop by distance), Curve, InvCurve, Squeeze, Pooled (damage ceases once exhausted), Exponential.",
  aodEolShape: "Round or Diamond shape. Diamond is more performance friendly.",
  // --- Scope B / 6. FragmentDef ---
  fEnable: "Fragment (formerly Shrapnel) — spawns the specified ammo fragments on projectile death (via hit or detonation).",
  fReverse: "Spawn fragments backward instead of forward.",
  fDropVelocity: "Fragments will not inherit velocity from the parent.",
  fIgnoreArming: "If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions.",
  fRadial: "Radial — determines the starting angle for the Degrees spread, in degrees. E.g. 0 fires straight along the cone; 90 goes perpendicular to the travel path.",
  fFragments: "Number of fragment projectiles to spawn.",
  fDegrees: "Cone in which to randomize direction of spawned fragments.",
  fOffset: "Offsets the fragment spawn by this amount, in meters — positive forward, negative backwards. Read from the parent ammo type.",
  fChildAmmoRound: "AmmoRound field of the ammo to spawn.",

  // --- Scope B / 7. PatternDef ---
  pEnable: "Pattern — set of multiple ammos to fire in order instead of the main ammo.",
  pSkipParent: "If Mode = Weapon, skip the ammo itself in the list. With SkipParent = false the initial ammo fires IN ADDITION to whatever pattern ammos are spawned per fire event.",
  pRandom: "Randomizes the number spawned at once — NOT the list order.",
  pPatterns: "Comma-separated list of AmmoRound names the pattern steps through.",
  pTriggerChance: "Chance (0–1, i.e. %) that the pattern triggers.",
  pRandomMin: "Minimum number of pattern rounds to spawn at once when Random is enabled.",
  pRandomMax: "Maximum number of pattern rounds to spawn at once when Random is enabled.",
  pPatternSteps: "Number of ammos activated per round — progresses in order and loops. Ignored if Random = true.",
  pMode: "When the pattern applies: Weapon (mixed belts), Fragment (fragment RNG), Both, or Never (off).",

  // --- Scope B / 8. EwarDef ---
  ewEnable: "Enables EWAR effects AND DISABLES BASE DAMAGE AND AOE DAMAGE!!",
  ewStackDuration: "StackDuration — combine durations of stacked applications.",
  ewDeplete: "Depletable — the effect can be depleted.",
  ewType: "EWAR type: EnergySink (shutdown power supplies), Emp (shutdown any powered block), Offense (shutdown weapons), Nav (lock down gyros), AntiSmart (scramble missile targeting), JumpNull (stop jumps), Anchor (shutdown thrusters), Tractor/Pull/Push (physics), Dot (radius damage).",
  ewMode: "Effect (applied to the target entity) or Field (area pulse field).",
  ewStrength: "EWAR strength. EWAR ammos use EffectStrength instead of BaseDamage in the energy cost formula.",
  ewRadius: "Effect radius, in meters.",
  ewDuration: "Duration, in game ticks.",
  ewMaxStacks: "MaxStacks — max debuffs at once.",

  // --- Scope B / 9. GraphicDef ---
  gVisualProb: "VisualProbability — 0–1 chance of the AV appearing. Controls all audio AND visual.",
  gTracerEnable: "Enable the tracer line. If this is false, Trail is also not used.",
  gTracerSegmented: "Segmented tracer. If true, Tracer TextureMode is ignored.",
  gTracerLength: "Length in meters to draw the tracer — goes from projectile center to projectile backwards × length.",
  gTracerWidth: "Width in arbitrary keen™ units.",
  gTracerColor: "RGBA color. RGB 255 is neon glowing, 100 is quite bright; for no glow, use 0–1.",
  gTracerTexture: "Texture SubtypeID: WeaponLaser, ProjectileTrailLine, WarpBubble, etc. Please always have WeaponLaser set if this section is enabled.",
  gTrailEnable: "Enable the persistent smoke/ribbon trail.",
  gTrailAlwaysDraw: "Prevents this trail from being culled. Only use if you have a reason to (very long tracers/trails).",
  gTrailDecay: "DecayTime in ticks. 1 = 1 additional tracer generated per motion, 33 is 33 lines drawn per projectile. Keep this number low.",
  gTrailWidth: "CustomWidth — same as Tracer Width for the trail at t=0.",
  gTrailColor: "Trail color, RGBA.",
  gTrailTextures: "Trail texture SubtypeIDs. Please always have the primary line set if this section is enabled.",

  // --- Scope B / 10. AmmoAudioDef ---
  aSoundShot: "Sound when fired. With OverrideShotSound this ammo's ShotSound is used regardless of the weapon's shot sound.",
  aSoundTravel: "Travel sound generated around your projectile in flight.",
  aSoundHit: "Default hit sound, used unless the optional hit sounds are populated. MUST HAVE A VALUE FOR ANY HIT SOUND TO WORK!",
  aSoundVoxelHit: "Voxel hit sound.",
  aSoundPlayerHit: "Player character hit sound.",
  aSoundWaterHit: "Water hit sound, if WaterMod is present.",
  aHitPlayChance: "0–1 chance for any hit sound to play.",

  // --- Scope B / 11. SynchronizeDef ---
  syncFull: "Use only on PD-killable (guided) projectiles that need to be replicated precisely on the client. Increases network traffic: clients don't locally spawn the projectile, the server sends spawn packets instead.",
  syncPointDefense: "Only if Full is enabled. Server will inform clients of what projectiles have died by PD defense and will trigger destruction.",
  syncOnHitDeath: "Only if Full is enabled. Server will inform clients when projectiles die due to hitting something and will trigger destruction.",
  syncUpdateOnRandomize: "Only if Full is enabled. When new random offsets are calculated by homing projectiles, sends an update with them to reduce overall deltas.",
  syncInterval: "PositionSyncInterval — only if Full is enabled. Interval for sending position and velocity. Use carefully: adds constant network traffic while in flight. 0 disables.",
  syncPatchWindow: "PositionPatchWindow — only if Full is enabled. When a client receives a large position difference, it reconciles over this window. Must be lower than the position sync interval. 0 disables."
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

// Scope A: HardPointDef extras
const wAddToleranceToTracking = document.getElementById('wAddToleranceToTracking');
const wCanShootSubmerged = document.getElementById('wCanShootSubmerged');
const wNpcSafe = document.getElementById('wNpcSafe');

// Scope A: TargetingDef extras
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
const wRestrictionRadius = document.getElementById('wRestrictionRadius');
const wOtherDebug = document.getElementById('wOtherDebug');
const wCheckInflatedBox = document.getElementById('wCheckInflatedBox');
const wCheckForAnyWeapon = document.getElementById('wCheckForAnyWeapon');
const wStayCharged = document.getElementById('wStayCharged');
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
const tTargetLossDegree = document.getElementById('tTargetLossDegree');
const tTargetLossTime = document.getElementById('tTargetLossTime');
const sInaccuracy = document.getElementById('sInaccuracy');
const sAggressiveness = document.getElementById('sAggressiveness');
const sNavAcceleration = document.getElementById('sNavAcceleration');
const sMaxLateralThrust = document.getElementById('sMaxLateralThrust');
const sSteeringLimit = document.getElementById('sSteeringLimit');
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
const dsCutoffArmorArmor = document.getElementById('dsCutoffArmorArmor');
const dsCutoffLightArmor = document.getElementById('dsCutoffLightArmor');
const dsCutoffHeavyArmor = document.getElementById('dsCutoffHeavyArmor');
const dsCutoffNonArmor = document.getElementById('dsCutoffNonArmor');
const dsCutoffGridLarge = document.getElementById('dsCutoffGridLarge');
const dsCutoffGridSmall = document.getElementById('dsCutoffGridSmall');
const dsFalloffDistance = document.getElementById('dsFalloffDistance');
const dsFalloffMinMult = document.getElementById('dsFalloffMinMult');

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
const fOffset = document.getElementById('fOffset');
const fIgnoreArming = document.getElementById('fIgnoreArming');

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
  scrapYield: 0.25,
  // Ammo Maths economy & logistics (ammo_maths.js)
  ammoAnchorMsrp: 1500,          // Base MSRP of the anchor magazine; every other mag scales by damage
  ammoAnchorMag: 'NATO_25x184mm',
  hybridDiscount: 0.75,          // HybridRound ammo MSRP multiplier
  ruShare: 0.75,                 // share of Adjusted MSRP converted to RUs (÷ CU value) for relic ammo
  bufferReloads: 2.2,            // weapon inventory must hold this many reloads (× MagsToLoad)
  smallCargoL: 3375,
  largeCargoL: 421875,
  playerInvL: 4500,              // GVK Character Changes (ws 2657570961): 1.5 m³ × server InventorySizeMultiplier 3
  // Ammo baselines, each an independent curve of damage: X = refX × (dmg ÷ anchor dmg)^xExp
  refVolL: 30,
  sizeExp: 0.6,
  refMassKg: 30,
  massExp: 1,
  refCraftS: 13,
  craftExp: 0.5
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
const badgeCircuitry = document.getElementById('badgeCircuitry');
const badgeRelic = document.getElementById('badgeRelic');
const badgeNpc = document.getElementById('badgeNpc');
const badgePd = document.getElementById('badgePd');
const badgeRole = document.getElementById('badgeRole');
const badgeAmmoTypeDesc = document.getElementById('badgeAmmoTypeDesc');
const badgeOverpen = document.getElementById('badgeOverpen');
const badgeArc = document.getElementById('badgeArc');
const badgeDepression = document.getElementById('badgeDepression');
const badgeMass = document.getElementById('badgeMass');
const badgeRecoil = document.getElementById('badgeRecoil');

// Shipbuilder State
let currentBatteryMultiplier = 1;
let currentFilterGrid = 'all';
let currentFilterType = 'all';
let currentFilterCategory = 'all';

// Weapon class groups for the filter bar, keyed by the *TYPE* display-name prefix.
// Unlisted prefixes (and unprefixed blocks like warheads) fall into "Other".
const WEAPON_CATEGORIES = [
  { key: 'ballistic', label: 'Ballistic', icon: '🔫', types: ['Gatling', 'Autocannon', 'L.Cannon', 'H.Cannon', 'Interior'] },
  { key: 'kinetic', label: 'Kinetic', icon: '⚡', types: ['Railgun', 'MAC'] },
  { key: 'missile', label: 'Missile', icon: '🚀', types: ['Rocket', 'L.Missile', 'H.Missile', 'SRBM', 'Torpedo'] },
  { key: 'energy', label: 'Energy', icon: '🔆', types: ['L.Laser', 'H.Laser', 'Plasma'] },
  { key: 'defense', label: 'Defense', icon: '🛡️', types: ['AMS', 'Flak', 'Flare'] },
  { key: 'utility', label: 'Utility', icon: '📡', types: ['Sensor', 'Drone'] }
];
const WEAPON_CATEGORY_OTHER = { key: 'other', label: 'Other', icon: '💣', types: [] };
// DOM Elements - Telemetry Munition Bar (Workspace 1)
const telemetryAmmoBar    = document.getElementById('telemetryAmmoBar');
const telemetryAmmoSelect = document.getElementById('telemetryAmmoSelect');
const telemetryAmmoBadge  = document.getElementById('telemetryAmmoBadge');
// Blast sub-lines (folded from removed explosive profile card into tmBlastBox)
const tmBlastTrigger  = document.getElementById('tmBlastTrigger');
const tmBlastDepth    = document.getElementById('tmBlastDepth');

// DOM Elements - Telemetry Deck
const outSustainedDps = document.getElementById('outSustainedDps');
const outDpsBreakdown = document.getElementById('outDpsBreakdown');
const outEffectiveDps = document.getElementById('outEffectiveDps');
const teleDpsType     = document.getElementById('teleDpsType');
const teleAlphaType   = document.getElementById('teleAlphaType');
const outEffectiveAlpha = document.getElementById('outEffectiveAlpha');
const outAlphaDmg = document.getElementById('outAlphaDmg');
const outDamagePerShot = document.getElementById('outDamagePerShot');
const outShotsPerSec = document.getElementById('outShotsPerSec');
const lblEffectiveRpm = document.getElementById('lblEffectiveRpm');
const outCycleTime = document.getElementById('outCycleTime');
const outTraverseDeg = document.getElementById('outTraverseDeg');
const outTraverseAzEl = document.getElementById('outTraverseAzEl');
const outMaxRange = document.getElementById('outMaxRange');
const outMaxRangeSource = document.getElementById('outMaxRangeSource');
const outCombatCycleTitle = document.getElementById('outCombatCycleTitle');
const outHeatDutyRatio = document.getElementById('outHeatDutyRatio');
const heatProgressBar = document.getElementById('heatProgressBar');
const outTimeToOverheat = document.getElementById('outTimeToOverheat');
const outCooldownTime = document.getElementById('outCooldownTime');
const outAmmoDrawSub  = document.getElementById('outAmmoDrawSub');
const outMagProfile   = document.getElementById('outMagProfile');
const outMagReload    = document.getElementById('outMagReload');
const outPowerMw = document.getElementById('outPowerMw');
const outPowerIdle = document.getElementById('outPowerIdle');
const outEffectiveIntegrity = document.getElementById('outEffectiveIntegrity');
const outBuildTime          = document.getElementById('outBuildTime');
const outTotalValue         = document.getElementById('outTotalValue');
const bomTableBody          = document.getElementById('bomTableBody');

// Hero Stat Micro-Visuals
const pillarDpsStrip        = document.getElementById('pillarDpsStrip');
const pillarAlphaSalvo      = document.getElementById('pillarAlphaSalvo');
const pillarRangeRadar      = document.getElementById('pillarRangeRadar');
const pillarPropulsionVector= document.getElementById('pillarPropulsionVector');
const pillarUpTechMeter     = document.getElementById('pillarUpTechMeter');
const pillarVoxelBlueprint  = document.getElementById('pillarVoxelBlueprint');

// DOM Elements - Target Damage & Multiplier Matrix
const tmHeavyMult = document.getElementById('tmHeavyMult');
const tmHeavyDmg  = document.getElementById('tmHeavyDmg');
const tmHeavySub  = document.getElementById('tmHeavySub');
const tmLightMult = document.getElementById('tmLightMult');
const tmLightDmg  = document.getElementById('tmLightDmg');
const tmLightSub  = document.getElementById('tmLightSub');
const tmNonArmorMult = document.getElementById('tmNonArmorMult');
const tmNonArmorDmg  = document.getElementById('tmNonArmorDmg');
const tmNonArmorSub  = document.getElementById('tmNonArmorSub');
const tmBlastTitle = document.getElementById('tmBlastTitle');
const tmBlastRadius = document.getElementById('tmBlastRadius');
const tmBlastDmg   = document.getElementById('tmBlastDmg');
const tmBlastSub   = document.getElementById('tmBlastSub');
const tmPenetrationChip = document.getElementById('tmPenetrationChip');

// DOM Elements - Pillar 2 Handling & Accuracy
const outMuzzleVelocityPreview = document.getElementById('outMuzzleVelocityPreview');
const outFlightDelay1km = document.getElementById('outFlightDelay1km');
const outMunitionDurability = document.getElementById('outMunitionDurability');
const badgeMunitionHealth = document.getElementById('badgeMunitionHealth');
const outShotDeviation = document.getElementById('outShotDeviation');
const outShotDeviationDetail = document.getElementById('outShotDeviationDetail');
const outAimingTolerance = document.getElementById('outAimingTolerance');
const outAimingToleranceDetail = document.getElementById('outAimingToleranceDetail');

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
const wCtrlAutomatic = document.getElementById('wCtrlAutomatic');
const wCtrlManual = document.getElementById('wCtrlManual');
const wCtrlPainter = document.getElementById('wCtrlPainter');
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
const fRadial = document.getElementById('fRadial');
const fChildAmmoRound = document.getElementById('fChildAmmoRound');
const fragStatusBadge = document.getElementById('fragStatusBadge');
const fragChainVisual = document.getElementById('fragChainVisual');

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

// Canonical GVK Tech Component -> Deconstruct Scrap Dictionary
const GVK_TECH_SCRAP_MAP = {
  "PrototechPropulsionUnit": { scrapSubtype: "PrototechPropulsionUnitScrap", typeId: "Ore", displayName: "[Tech] Igniter [Scrap]" },
  "PrototechCoolingUnit": { scrapSubtype: "PrototechCoolingUnitScrap", typeId: "Ore", displayName: "[Tech] Grav. Reflector [Scrap]" },
  "PrototechMachinery": { scrapSubtype: "PrototechMachineryScrap", typeId: "Ore", displayName: "[Tech] Bolt Carrier [Scrap]" },
  "PrototechFrame": { scrapSubtype: "PrototechFrameScrap", typeId: "Ore", displayName: "[Tech] Gun Cradle [Scrap]" },
  "PrototechPanel": { scrapSubtype: "PrototechPanelScrap", typeId: "Ore", displayName: "[Tech] Launch Assem. [Scrap]" },
  "PrototechCapacitor": { scrapSubtype: "PrototechCapacitorScrap", typeId: "Ore", displayName: "[Tech] Particle Emit. [Scrap]" },
  "PrototechCircuitry": { scrapSubtype: "PrototechCircuitryScrap", typeId: "Ore", displayName: "[Tech] Data Core [Scrap]" }
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

// DOM Elements - Ammo Logistics (logic lives in ammo_maths.js)
const weaponBanner = document.getElementById('weaponBanner') || document.querySelector('.weapon-banner');
const codeBlueprintXml = document.getElementById('codeBlueprintXml');

// Sticky HUD Elements
const stickyHudBar = document.getElementById('stickyHudBar');
const hudTelIcon = document.getElementById('hudTelIcon');
const hudTelName = document.getElementById('hudTelName');
const hudTelDps = document.getElementById('hudTelDps');
const hudTelDpsProfile = document.getElementById('hudTelDpsProfile');
const hudTelAlpha = document.getElementById('hudTelAlpha');
const hudTelRange = document.getElementById('hudTelRange');
const hudTelCycle = document.getElementById('hudTelCycle');
const hudTelBench = document.getElementById('hudTelBench');
const hudWbName = document.getElementById('hudWbName');
const hudWbDps = document.getElementById('hudWbDps');
const hudWbCycle = document.getElementById('hudWbCycle');
const hudWbAlpha = document.getElementById('hudWbAlpha');
const hudWbLint = document.getElementById('hudWbLint');
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
    if (typeof amRenderChart === 'function') amRenderChart(); // canvas colors are read from the theme tokens

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
  setWcDefs(null); // bundled def trees; replaced below when the live pipeline succeeds

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

  // Live-source pipeline: parse the repo's C#/SBC on the fly (hosted mirror or linked mod folder).
  // On success this REPLACES the bundled datasets; on failure we keep them and show a banner.
  try {
    if (window.GVKLiveSource) {
      const live = await window.GVKLiveSource.init({
        onReapply: (data) => {
          weaponsDb = data.weapons;
          ammosDb = data.ammos;
          magazinesBlueprintsDb = data.magazines;
          setWcDefs(data.wcDefs);
          activeWeapon = null;
          activeAmmo = null;
          refreshAfterDataLoad();
        },
      });
      if (live && live.data) {
        weaponsDb = live.data.weapons;
        ammosDb = live.data.ammos;
        magazinesBlueprintsDb = live.data.magazines;
        setWcDefs(live.data.wcDefs);
      }
    }
  } catch (e) {
    console.warn('Live source pipeline failed; using bundled datasets.', e);
    if (window.GVKLiveSource) window.GVKLiveSource.showBanner('Pipeline init failed: ' + (e && e.message || e));
  }

  refreshAfterDataLoad();

  // Check URL Permalinks
  parseUrlParams();

  // Event Listeners
  setupNavigationEvents();
  setupHudVisibility();
  setupWorkbenchInputEvents();
  applyWorkbenchFieldHelp();
  setupLogisticsEvents();
  setupModalEvents();

  console.log("GVK Weapon Studio Initialized with 3 Workspaces & Full Tag Definitions.");
}

/// <summary>
/// The studio balances ship weapons only: drop character handheld weapons, the ammos only they fire, and the
/// magazines only those ammos load. Shared rounds (e.g. launcher missiles, the interior turret round) stay.
/// </summary>
function stripHandheldData() {
  const handheld = weaponsDb.filter(isHandheldWeapon);
  if (!handheld.length) return;
  weaponsDb = weaponsDb.filter(w => !isHandheldWeapon(w));
  const shipAmmo = new Set();
  weaponsDb.forEach(w => (w.assignedAmmos || []).forEach(k => shipAmmo.add(k)));
  const dropMags = new Set();
  handheld.forEach(w => (w.assignedAmmos || []).forEach(k => {
    if (shipAmmo.has(k) || !ammosDb[k]) return;
    dropMags.add(ammosDb[k].ammoMagazine);
    delete ammosDb[k];
  }));
  const stillUsed = new Set(Object.values(ammosDb).map(a => a.ammoMagazine));
  magazinesBlueprintsDb = magazinesBlueprintsDb.filter(m => !(dropMags.has(m.subtypeId) && !stillUsed.has(m.subtypeId)));
}

function refreshAfterDataLoad() {
  stripHandheldData();
  // Populate Dropdowns
  checkWcSchemaIntegrity();
  populateWeaponDropdowns();
  refreshShipbuilderFilters(false);
  populateAmmoDropdowns();
  populateAnimationDropdown();
  populateLogisticsAmmoDropdown();

  // Populate Balance Matrix Modal inputs

  // Select Default Weapon (Avenger Turret or First non-handheld) or re-sync existing selection
  const nonHandheld = weaponsDb.filter(w => !isHandheldWeapon(w));
  if (!activeWeapon && nonHandheld.length > 0) {
    const avenger = nonHandheld.find(w => (w.name || '').includes("Avenger") || (w.displayName || '').includes("Avenger")) || nonHandheld[0];
    selectWeapon(avenger.id);
  } else if (activeWeapon) {
    const stillExists = nonHandheld.find(w => w.id === activeWeapon.id || w.subtypeId === activeWeapon.subtypeId);
    if (stillExists) {
      selectWeapon(stillExists.id);
    } else if (nonHandheld.length > 0) {
      const avenger = nonHandheld.find(w => (w.name || '').includes("Avenger") || (w.displayName || '').includes("Avenger")) || nonHandheld[0];
      selectWeapon(avenger.id);
    }
  }

  // Initialize Default Logistics Magazine
  selectLogisticsMagazine(selectedLogisticsMagSubtype, true);
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
    weaponBanner.style.display = (targetWsId === 'ws-telemetry') ? 'flex' : 'none';
  }
  // The GRID/TYPE pills filter weapons; Ammo Logistics lists magazines
  const filterBar = document.getElementById('shipbuilderFilterBar');
  if (filterBar) filterBar.style.display = (targetWsId === 'ws-logistics') ? 'none' : '';
  if (targetWsId === 'ws-logistics') {
    selectLogisticsMagazine(selectedLogisticsMagSubtype, false);
  }
  setHudWorkspace(targetWsId);
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

/// <summary>Phone header: slides away while scrolling down and comes back on any scroll up or near the top.
/// Header status chips are focusable (role=button), so Enter/Space click them.</summary>
function setupHeaderAutoHide() {
  const header = document.getElementById('appHeader');
  if (!header) return;
  header.querySelectorAll('.header-chip').forEach(chip => {
    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chip.click(); }
    });
  });
  const narrow = window.matchMedia ? window.matchMedia('(max-width: 768px)') : null;
  if (!narrow) return;
  let lastY = window.scrollY;
  let queued = false;
  // Keyboard focus inside the header keeps it visible; a tapped tab keeping focus does not
  const keyboardFocusInside = () => {
    try { return !!header.querySelector(':focus-visible'); } catch (e) { return false; }
  };
  const update = () => {
    queued = false;
    const y = window.scrollY;
    const dy = y - lastY;
    if (!narrow.matches || y < header.offsetHeight || keyboardFocusInside()) {
      header.classList.remove('header-tucked');
    } else if (dy > 6) {
      header.classList.add('header-tucked');
    } else if (dy < -6) {
      header.classList.remove('header-tucked');
    }
    if (Math.abs(dy) > 6) lastY = y;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  header.addEventListener('focusin', () => { if (keyboardFocusInside()) header.classList.remove('header-tucked'); });
  const onChange = () => header.classList.remove('header-tucked');
  if (narrow.addEventListener) narrow.addEventListener('change', onChange);
}

function setupNavigationEvents() {
  setupHeaderAutoHide();

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
    const foundBench = weaponsDb.find(w => (w.subtypeId === vsParam || w.id === vsParam) && !isNpcWeapon(w));
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
/// <summary>Checks whether a weapon is a character handheld firearm/launcher.</summary>
function isHandheldWeapon(w) {
  if (!w) return false;
  if (w.isHandheld === true || w.hardwareType === 'HandWeapon') return true;
  // SE convention: hand-held gun items (PhysicalGunObject) use an "...Item" SubtypeId
  return /Item$/i.test(w.subtypeId || '') || /Item$/i.test(w.id || '');
}

/// <summary>Resolves terminal display name for weapon munition selectors.</summary>
function getAmmoSbcDisplayName(ammoKey) {
  const a = (ammosDb && ammosDb[ammoKey]) || {};
  return a.terminalName || a.ammoRound || ammoKey;
}

function filterMatchesWeapon(w) {
  if (isHandheldWeapon(w)) return false;
  const grid = w.gridSize || w.grid || 'Large';
  if (currentFilterGrid !== 'all' && grid.toLowerCase() !== currentFilterGrid.toLowerCase()) return false;
  return matchesClassFilter(w);
}

/// <summary>Category key for a weapon from its *TYPE* prefix ("other" when unlisted or unprefixed).</summary>
function getWeaponCategory(w) {
  const t = getWeaponTypePrefix(w);
  const c = WEAPON_CATEGORIES.find(cat => cat.types.includes(t));
  return c ? c.key : WEAPON_CATEGORY_OTHER.key;
}

/// <summary>Category + type part of the filter (grid excluded), so pill counts can reuse it.</summary>
function matchesClassFilter(w) {
  if (currentFilterCategory !== 'all' && getWeaponCategory(w) !== currentFilterCategory) return false;
  if (currentFilterType !== 'all' && getWeaponTypePrefix(w) !== currentFilterType) return false;
  return true;
}

/// <summary>Extracts the *TYPE* prefix from weapon displayName (e.g. "*Gatling*" → "Gatling").</summary>
function getWeaponTypePrefix(w) {
  const name = w.displayName || w.name || '';
  const m = name.match(/^\*(?:NPC-)?([^*]+)\*/);
  return m ? m[1].trim() : '';
}

function initBatteryMultiplier() {
  const btns = document.querySelectorAll('.battery-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBatteryMultiplier = parseInt(btn.dataset.mult) || 1;
      updateUniversalBanner();
      updateCombatTelemetry();
    });
  });
}

function initTelemetryDeckTabs() {
  const tabs = document.querySelectorAll('.deck-tab-btn');
  const panels = document.querySelectorAll('.deck-tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.deckTab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

function initShipbuilderFilters() {
  const gridPills = document.querySelectorAll('.grid-filter-pill');
  gridPills.forEach(pill => {
    pill.addEventListener('click', () => {
      gridPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilterGrid = pill.dataset.grid || 'all';
      refreshShipbuilderFilters();
    });
  });
  refreshShipbuilderFilters(false);
}

/// <summary>Rebuilds the pill counts and reselects a weapon if the active one no longer matches.</summary>
function refreshShipbuilderFilters(reselect) {
  updateFilterCounts();
  buildCategoryPills();
  buildTypePills();
  if (reselect === false) return;
  populateWeaponDropdowns();
  if (activeWeapon && !filterMatchesWeapon(activeWeapon)) {
    const first = weaponsDb.find(filterMatchesWeapon);
    if (first) selectWeapon(first.id);
  }
}

/// <summary>Player, non-handheld weapons (what the filter bar counts).</summary>
function getFilterableWeapons() {
  const isNpc = (w) => (w.name && w.name.includes('(NPC)')) || (w.subtypeId && w.subtypeId.includes('_NPC')) || (w.id && w.id.includes('_NPC'));
  return weaponsDb.filter(w => !isNpc(w) && !isHandheldWeapon(w));
}

const matchesGridFilter = (w) => currentFilterGrid === 'all'
  || (w.gridSize || w.grid || 'Large').toLowerCase() === currentFilterGrid.toLowerCase();

function updateFilterCounts() {
  const weapons = getFilterableWeapons().filter(matchesClassFilter);
  document.querySelectorAll('.grid-filter-pill').forEach(pill => {
    const g = pill.dataset.grid || 'all';
    const count = g === 'all' ? weapons.length
      : weapons.filter(w => (w.gridSize || w.grid || 'Large').toLowerCase() === g.toLowerCase()).length;
    pill.textContent = `${g === 'all' ? 'All' : g} (${count})`;
  });
}

/// <summary>CLASS pills: All + each category with weapons; counts follow the grid filter.</summary>
function buildCategoryPills() {
  const container = document.getElementById('categoryFilterGroup');
  if (!container) return;
  const weapons = getFilterableWeapons().filter(matchesGridFilter);
  const counts = {};
  weapons.forEach(w => { const k = getWeaponCategory(w); counts[k] = (counts[k] || 0) + 1; });

  container.innerHTML = '<span class="filter-label">CLASS:</span>';
  const addPill = (key, label, icon, count, title) => {
    const btn = document.createElement('button');
    btn.className = `filter-pill category-filter-pill ${currentFilterCategory === key ? 'active' : ''}`;
    btn.dataset.category = key;
    btn.title = title || label;
    btn.innerHTML = `${icon ? `<span class="filter-pill-icon" aria-hidden="true">${icon}</span>` : ''}${label} <span class="filter-pill-count">${count}</span>`;
    if (count === 0 && key !== 'all') btn.disabled = true;
    btn.addEventListener('click', () => {
      currentFilterCategory = key;
      currentFilterType = 'all';
      refreshShipbuilderFilters();
    });
    container.appendChild(btn);
  };
  addPill('all', 'All', '', weapons.length);
  WEAPON_CATEGORIES.concat(counts.other ? [WEAPON_CATEGORY_OTHER] : []).forEach(cat => {
    addPill(cat.key, cat.label, cat.icon, counts[cat.key] || 0, cat.types.length ? cat.types.join(' · ') : 'Untyped blocks (warheads, explosive barrels)');
  });
}

/// <summary>Type sub-row for the selected category; hidden for "All" or single-type categories.</summary>
function buildTypePills() {
  const row = document.getElementById('typeFilterRow');
  const container = document.getElementById('typeFilterGroup');
  if (!container) return;
  container.innerHTML = '';
  const weapons = getFilterableWeapons().filter(w => matchesGridFilter(w) && getWeaponCategory(w) === currentFilterCategory);
  const typeCounts = {};
  weapons.forEach(w => { const t = getWeaponTypePrefix(w); if (t) typeCounts[t] = (typeCounts[t] || 0) + 1; });
  const cat = WEAPON_CATEGORIES.find(c => c.key === currentFilterCategory);
  const types = (cat ? cat.types : Object.keys(typeCounts).sort()).filter(t => typeCounts[t]);
  if (row) row.hidden = currentFilterCategory === 'all' || types.length < 2;
  if (currentFilterCategory === 'all' || types.length < 2) return;

  const addPill = (t, label, count) => {
    const btn = document.createElement('button');
    btn.className = `filter-pill type-filter-pill ${currentFilterType === t ? 'active' : ''}`;
    btn.dataset.wtype = t;
    btn.innerHTML = `${label} <span class="filter-pill-count">${count}</span>`;
    btn.addEventListener('click', () => {
      currentFilterType = t;
      refreshShipbuilderFilters();
    });
    container.appendChild(btn);
  };
  addPill('all', `All ${cat ? cat.label : ''}`.trim(), weapons.length);
  types.forEach(t => addPill(t, t, typeCounts[t]));
}

function populateWeaponDropdowns() {
  weaponSelect.innerHTML = '';

  const isGunNpc = (w) => (w.name && w.name.includes('(NPC)')) || (w.subtypeId && w.subtypeId.includes('_NPC')) || (w.id && w.id.includes('_NPC'));
  const playerGuns = weaponsDb.filter(w => !isGunNpc(w) && !isHandheldWeapon(w));
  const npcGuns = weaponsDb.filter(w => isGunNpc(w) && !isHandheldWeapon(w));

  const filteredPlayerGuns = playerGuns.filter(filterMatchesWeapon);
  const filteredNpcGuns = npcGuns.filter(filterMatchesWeapon);

  if (filteredPlayerGuns.length === 0 && filteredNpcGuns.length === 0) {
    const opt = document.createElement('option');
    opt.value = "";
    opt.textContent = "No weapons match active filters";
    weaponSelect.appendChild(opt);
  }

  if (filteredPlayerGuns.length > 0) {
    const pGroup = document.createElement('optgroup');
    pGroup.label = "── Player Standard Armaments ──";
    filteredPlayerGuns.forEach(w => {
      const opt = document.createElement('option');
      opt.value = w.id;
      const grid = w.gridSize || w.grid || 'Large';
      opt.textContent = `${w.displayName || w.name} [${grid}]`;
      pGroup.appendChild(opt);
    });
    weaponSelect.appendChild(pGroup);
  }

  // Combat Telemetry excludes NPC armaments entirely per requirements.

  if (activeWeapon) {
    weaponSelect.value = activeWeapon.id;
  }

  // Compare dropdown (always includes all player guns of matching grid)
  playerGuns.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.id;
    const grid = w.gridSize || w.grid || 'Large';
    opt.textContent = `${w.displayName || w.name} [${grid}]`;
    compareSelect.appendChild(opt);
  });

  if (benchmarkWeapon) {
    compareSelect.value = benchmarkWeapon.id;
  }

  if (weaponSelect && !weaponSelect._changeBound) {
    weaponSelect.addEventListener('change', (e) => {
      selectWeapon(e.target.value);
    });
    weaponSelect._changeBound = true;
  }

  const weaponSelectWorkbench = document.getElementById('weaponSelectWorkbench');
  if (weaponSelectWorkbench) {
    weaponSelectWorkbench.innerHTML = '';
    if (filteredPlayerGuns.length > 0) {
      const pGroup = document.createElement('optgroup');
      pGroup.label = "── Player Standard Armaments ──";
      filteredPlayerGuns.forEach(w => {
        const opt = document.createElement('option');
        opt.value = w.id;
        const grid = w.gridSize || w.grid || 'Large';
        opt.textContent = `${w.displayName || w.name} [${grid}]`;
        pGroup.appendChild(opt);
      });
      weaponSelectWorkbench.appendChild(pGroup);
    }
    if (filteredNpcGuns.length > 0) {
      const nGroup = document.createElement('optgroup');
      nGroup.label = "── NPC / Relic / Enemy Armaments ──";
      filteredNpcGuns.forEach(w => {
        const opt = document.createElement('option');
        opt.value = w.id;
        const grid = w.gridSize || w.grid || 'Large';
        opt.textContent = `⚔️ ${w.displayName || w.name} [${grid}]`;
        nGroup.appendChild(opt);
      });
      weaponSelectWorkbench.appendChild(nGroup);
    }
    if (activeWeapon) weaponSelectWorkbench.value = activeWeapon.id;
    if (!weaponSelectWorkbench._changeBound) {
      weaponSelectWorkbench.addEventListener('change', (e) => {
        selectWeapon(e.target.value);
      });
      weaponSelectWorkbench._changeBound = true;
    }
  }

  if (compareSelect && !compareSelect._changeBound) {
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
              const label = getAmmoSbcDisplayName(k);
              return `<option value="${k}">${label}</option>`;
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
    compareSelect._changeBound = true;
  }

  if (compareAmmoSelect && !compareAmmoSelect._changeBound) {
    compareAmmoSelect.addEventListener('change', (e) => {
      benchmarkAmmoKey = e.target.value;
      if (compBenchAmmoIcon) {
        const bAmmo = ammosDb[benchmarkAmmoKey];
        compBenchAmmoIcon.src = getAmmoIconUrl(bAmmo);
        compBenchAmmoIcon.title = bAmmo ? `Benchmark Munition: ${bAmmo.terminalName || bAmmo.ammoRound}` : 'Benchmark Ammo';
      }
      updateComparisonRadar();
    });
    compareAmmoSelect._changeBound = true;
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

  if (ammoSelectGlobal && !ammoSelectGlobal._changeBound) {
    ammoSelectGlobal.addEventListener('change', (e) => {
      selectAmmo(e.target.value);
    });
    ammoSelectGlobal._changeBound = true;
  }

  if (btnAssignAmmo && !btnAssignAmmo._clickBound) {
    btnAssignAmmo.addEventListener('click', () => {
      const selected = assignAmmoDropdown.value;
      if (!selected || !activeWeapon) return;
      if (!activeWeapon.assignedAmmos) activeWeapon.assignedAmmos = [];
      if (!activeWeapon.assignedAmmos.includes(selected)) {
        activeWeapon.assignedAmmos.push(selected);
        wcSyncWeaponAmmos();
        renderAssignedAmmos();
        showToast(`Assigned ${selected} to ${activeWeapon.name}!`);
      }
    });
    btnAssignAmmo._clickBound = true;
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

  if (selectAnimationDef && !selectAnimationDef._changeBound) {
    selectAnimationDef.addEventListener('change', (e) => {
      if (activeWeapon) {
        activeWeapon.assignedAnimation = e.target.value || null;
        currentAnimBadge.textContent = e.target.value || "None";
      }
    });
    selectAnimationDef._changeBound = true;
  }
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

// Friendly WeaponCore EwarDef.Type names for UI labels
function ewarTypeLabel(t) {
  const map = { AntiSmart: 'Anti-Smart', AntiSmartv2: 'Anti-Smart', EnergySink: 'Energy Sink', Emp: 'EMP', Offense: 'Offense', Nav: 'Nav', Dot: 'DoT', JumpNull: 'Jump-Null', Anchor: 'Anchor', Tractor: 'Tractor', Pull: 'Pull', Push: 'Push' };
  return map[t] || t || 'EWAR';
}
// Physical magazine <Capacity> from AmmoMagazines_*.sbc (0 when unknown)
function getMagCapacity(ammo) {
  if (!ammo || isEnergyAmmo(ammo)) return 0;
  const dataset = (typeof MAGAZINES_BLUEPRINTS_DATA !== 'undefined' && MAGAZINES_BLUEPRINTS_DATA.length > 0)
    ? MAGAZINES_BLUEPRINTS_DATA
    : magazinesBlueprintsDb;
  const mag = (dataset || []).find(m => m.subtypeId === ammo.ammoMagazine);
  return (mag && mag.capacity > 0) ? mag.capacity : 0;
}

// WC AmmoConstants.Energy() for a weapon + ammo pair (MustCharge, reloadable, charge size, energy magazine)
function getWcEnergy(weapon, ammo, overrides) {
  const w = Object.assign({}, weapon || {}, overrides || {});
  const a = ammo || {};
  const ewarOn = !!(a.ewar && a.ewar.enable);
  return WcMath.energy({
    energy: isEnergyAmmo(a), hybrid: !!a.hybridRound, energyCost: a.energyCost, baseDamage: a.baseDamage,
    ewar: ewarOn, ewarStrength: ewarOn ? a.ewar.strength : 0,
    rof: w.rateOfFire, barrels: w.barrelsPerShot, traj: w.trajectilesPerBarrel, reloadTicks: w.reloadTime,
    energyMagazineSize: a.energyMagazineSize, magCapacity: getMagCapacity(a),
    shotsInBurst: w.shotsInBurst, delayAfterBurst: w.delayAfterBurst
  });
}

// Shots per magazine: physical mags resolve from AmmoMagazines_Ship.sbc <Capacity> via MAGAZINES_BLUEPRINTS_DATA; energy mags use EnergyMagazineSize
function getShotsPerMag(weapon, ammo) {
  const fallback = (weapon && weapon.magazineSize) || 100;
  if (!ammo) return fallback;
  if (isEnergyAmmo(ammo)) {
    if (ammo.energyMagazineSize > 0) return ammo.energyMagazineSize;
    // WC AmmoConstants.Energy(): charged weapons with no EnergyMagazineSize derive it from power per tick x ReloadTime
    const e = getWcEnergy(weapon, ammo);
    if (e.reloadable && e.energyMagSize > 0) return e.energyMagSize;
    // Continuous (non-reloadable) energy weapons never consume a magazine: one fire event per volley
    return (weapon && weapon.barrelsPerShot) || 1;
  }
  return getMagCapacity(ammo) || fallback;
}

/// <summary>
/// Builds the WeaponCore fire-cycle inputs for a weapon + ammo pair. live = read the Workbench inputs
/// (the active weapon's edits) instead of the stored weapon values.
/// </summary>
function getFireCycleParams(weapon, ammo, live) {
  const w = weapon || {};
  const rd = (el, v) => {
    if (!live || !el) return v;
    const n = parseFloat(el.value);
    return isFinite(n) ? n : v;
  };
  const chk = (el, v) => (live && el ? !!el.checked : !!v);
  const rof = rd(wRateOfFire, w.rateOfFire || 0);
  const barrels = rd(wBarrelsPerShot, w.barrelsPerShot || 1);
  const trajPerBarrel = rd(wTrajectilesPerBarrel, w.trajectilesPerBarrel || 1);
  const reloadTicks = rd(wReloadTime, w.reloadTime || 0);
  const mags = Math.max(1, rd(wMagsToLoad, w.magsToLoad || 1));
  const shotsInBurst = rd(wShotsInBurst, w.shotsInBurst || 0);
  const delayAfterBurst = rd(wDelayAfterBurst, w.delayAfterBurst || 0);
  const a = ammo || {};
  const energy = getWcEnergy(w, a, { rateOfFire: rof, barrelsPerShot: barrels, trajectilesPerBarrel: trajPerBarrel, reloadTime: reloadTicks, shotsInBurst, delayAfterBurst });
  // AmmoConstants: HeatModifier applies when > 0 (or AllowNegativeHeatModifier)
  const heatMod = (a.heatModifier > 0 || a.allowNegativeHeatModifier) ? a.heatModifier : 1;
  const deg = w.degradeRofSettings || {};
  const magSize = !isEnergyAmmo(a) ? getShotsPerMag(w, a)
    : (a.energyMagazineSize > 0 ? a.energyMagazineSize : (energy.reloadable && energy.energyMagSize > 0 ? energy.energyMagSize : barrels));
  return {
    rof, barrels, trajPerBarrel, reloadTicks, mags, shotsInBurst, delayAfterBurst,
    magSize: Math.max(1, magSize),
    delayUntilFire: rd(wDelayUntilFire, w.delayUntilFire || 0),
    energy: isEnergyAmmo(a), hybrid: !!a.hybridRound, chargeTicks: energy.chargeTicks,
    fireFull: chk(wFireFull, w.fireFull),
    heatPerShot: rd(wHeatPerShot, w.heatPerShot || 0) * heatMod,
    maxHeat: rd(wMaxHeat, w.maxHeat || 0),
    heatSinkRate: rd(wHeatSinkRate, w.heatSinkRate || 0),
    cooldown: rd(wCooldown, w.cooldown || 0),
    degradeRof: chk(wDegradeWithHeat, w.degradeRof),
    heatThresholdStart: deg.heatThresholdStart, heatThresholdEnd: deg.heatThresholdEnd,
    rofAt0Heat: deg.rofAt0Heat, rofAt100Heat: deg.rofAt100Heat,
    allowOverheatShooting: !!w.allowOverheatShooting, heatSinkRateOverheatMult: w.heatSinkRateOverheatMult || 0
  };
}

const fireCycleCache = new Map();
/// <summary>
/// WeaponCore fire/reload/heat cycle via WcMath.simulateFire (tick replica of WeaponShoot.cs, WeaponReload.cs,
/// SessionUpdate.cs shoot gate, SessionCharging.cs and Weapon.UpdateWeaponHeat). Rates are steady-state averages.
/// Each barrel spends one magazine unit per fire event; trajectiles are free.
/// </summary>
function computeFireCycle(p) {
  const key = JSON.stringify(p);
  const hit = fireCycleCache.get(key);
  if (hit) return hit;
  const sim = WcMath.simulateFire({
    rof: p.rof, barrels: p.barrels, traj: p.trajPerBarrel, magSize: p.magSize, mags: p.mags, reloadTicks: p.reloadTicks,
    delayUntilFire: p.delayUntilFire, shotsInBurst: p.shotsInBurst, delayAfterBurst: p.delayAfterBurst,
    energy: p.energy, hybrid: p.hybrid, chargeTicks: p.chargeTicks, fireFull: p.fireFull,
    heatPerShot: p.heatPerShot, maxHeat: p.maxHeat, heatSinkRate: p.heatSinkRate, cooldown: p.cooldown,
    degradeRof: p.degradeRof, heatThresholdStart: p.heatThresholdStart, heatThresholdEnd: p.heatThresholdEnd,
    rofAt0Heat: p.rofAt0Heat, rofAt100Heat: p.rofAt100Heat,
    allowOverheatShooting: p.allowOverheatShooting, heatSinkRateOverheatMult: p.heatSinkRateOverheatMult
  });
  const traj = Math.max(1, p.trajPerBarrel || 1);
  const totalRounds = Math.max(1, p.magSize || 1) * Math.max(1, p.mags || 1);
  const shotsInBurst = p.shotsInBurst || 0;
  const roundsPerSec = sim.roundsPerSec;
  const totalCycleSec = roundsPerSec > 0 ? totalRounds / roundsPerSec : Infinity;
  const cycleTicks = totalCycleSec * 60;
  // Phases of one load: DelayUntilFire spool, firing, then everything else (reload, burst tail, heat stalls)
  const spoolTicks = sim.reloadable && sim.spoolTicks >= (p.delayUntilFire || 0) ? (p.delayUntilFire || 0) : 0;
  const fireTicks = sim.reloadable ? Math.min(sim.fireTicks, Math.max(0, cycleTicks - spoolTicks)) : cycleTicks;
  const out = {
    totalRounds,
    projectiles: totalRounds * traj,
    events: sim.events,
    bursts: shotsInBurst > 0 ? Math.ceil(sim.events / shotsInBurst) : 1,
    spoolSec: spoolTicks / 60,
    fireDurationSec: fireTicks / 60,
    reloadSec: sim.reloadable ? Math.max(0, cycleTicks - spoolTicks - fireTicks) / 60 : 0,
    totalCycleSec,
    roundsPerSec,
    effectiveRps: roundsPerSec * traj,
    heatLimited: sim.heatLimited,
    stallShare: sim.stallShare
  };
  if (fireCycleCache.size > 500) fireCycleCache.clear();
  fireCycleCache.set(key, out);
  return out;
}

/// <summary>
/// Single source of truth for a weapon's engagement range (m), used by every range readout.
/// WeaponCore only fires auto-targeting weapons (turrets) and guided munitions (Smart, drone, TravelTo…) at
/// targets inside Targeting.MaxTargetDistance, so those are gated by the block's targeting range. A manually
/// aimed fixed gun with unguided rounds is limited only by the round's reach (MaxTrajectory). Either way,
/// nothing lands beyond the round's reach. live = read the Workbench inputs (edits) for the active weapon.
/// </summary>
function getEngagementRange(weapon, ammo, live) {
  const num = (v) => { const n = parseFloat(v); return isFinite(n) && n > 0 ? n : 0; };
  const targeting = live && wMaxTargetDistance ? num(wMaxTargetDistance.value) : num(weapon && weapon.maxTargetDistance);
  const reach = live && tMaxTrajectory ? num(tMaxTrajectory.value) : num(ammo && ammo.trajectory && ammo.trajectory.maxTrajectory);
  if (isDetonationWeapon(weapon)) {
    // No projectile flight: reach is how far the fragments travel from the block
    const frag = ammo && ammo.fragment && ammo.fragment.enable ? ammo.fragment : null;
    const fragAmmo = frag ? resolveAmmoRound(frag.ammoRound, weapon) : null;
    const blast = num(fragAmmo && fragAmmo.trajectory && fragAmmo.trajectory.maxTrajectory);
    const label = frag ? `Blast reach · ${frag.fragments || 0} fragments, ${frag.degrees || 0}° spread` : 'Blast reach';
    return { range: blast, source: 'blast', gated: false, guided: false, targeting, reach: blast, label, blast: true };
  }
  const guidance = (ammo && ammo.trajectory && ammo.trajectory.guidance) || 'None';
  const guided = guidance !== 'None';
  const gated = !!weapon && (weapon.type === 'Turret' || guided);
  let range, source;
  if (gated && targeting > 0) {
    range = reach > 0 ? Math.min(targeting, reach) : targeting;
    source = reach > 0 && reach < targeting ? 'reach' : 'targeting';
  } else {
    range = reach || targeting || 1600;
    source = reach ? 'reach' : 'targeting';
  }
  let label;
  if (source === 'targeting') {
    label = reach > targeting ? `Targeting Range · Ammo Reach: ${Math.round(reach).toLocaleString()}m` : 'Targeting Range';
    if (guided && weapon.type !== 'Turret') label += ` (${guidance} guidance)`;
  } else {
    label = gated ? `Ammo Reach · Targeting: ${Math.round(targeting).toLocaleString()}m` : 'Ammo Max Trajectory (manual aim)';
  }
  return { range, source, gated, guided, targeting, reach, label };
}

function isEnergyAmmo(ammo) {
  return !ammo || !ammo.ammoMagazine || ammo.ammoMagazine === 'Energy';
}

function updateTelemetryAmmoBadge() {
  if (!activeAmmo) return;
  const dmg = getAmmoDamageDetailed(activeAmmo, 0, activeWeapon);
  const eol = (activeAmmo.areaOfDamage && activeAmmo.areaOfDamage.endOfLife && activeAmmo.areaOfDamage.endOfLife.enable)
    ? activeAmmo.areaOfDamage.endOfLife
    : null;
  const frag = (activeAmmo.fragment && activeAmmo.fragment.enable) ? activeAmmo.fragment : null;

  const ewar = (activeAmmo.ewar && activeAmmo.ewar.enable) ? activeAmmo.ewar : null;
  // Screen burst: wide EndOfLife with token damage exists only to trigger projectile-vs-projectile
  // HealthHitModifier - block damage is zeroed via DamageScales.Grids = 0 (Flak PROX anti-smart screen)
  const isScreenBurst = eol && eol.radius >= 10 && (eol.damage || 0) <= 1;
  let typeDesc = "Direct Kinetic AP";
  let typeDescTitle = "";
  if (ewar) {
    typeDesc = `🧿 EWAR ${ewarTypeLabel(ewar.type)} (${ewar.radius || 0}m)`;
  } else if (isScreenBurst) {
    typeDesc = `🎯 Anti-Missile Burst (${eol.radius || 0}m)`;
  } else if (activeAmmo.hybridRound && !activeAmmo.isBeam && (activeAmmo.mass || 0) > 0) {
    typeDesc = "High-Energy Sabot";
  } else if (frag && frag.timedSpawns && frag.timedSpawns.enable && (frag.timedSpawns.maxSpawns || 0) > 1 && dmg.frag > dmg.base + dmg.aoe) {
    // Loitering TimedSpawns carrier whose payload is the spawned sub-munitions
    typeDesc = frag.fragments === 1 ? "🤖 Autonomous Drone Deployment" : `Loitering Spawner (${frag.timedSpawns.maxSpawns} x ${frag.fragments})`;
  } else if (eol && eol.damage > 10 && eol.radius > 1) {
    typeDesc = `High Explosive Blast (${eol.radius || 0}m)`;
  } else if (frag && frag.fragments > 1) {
    typeDesc = `Proximity Shrapnel (${frag.fragments} Frags)`;
  } else if (frag && frag.fragments === 1) {
    // Classified from WC fields: loitering TimedSpawns / DroneAdvanced guidance, or a stage whose own payload is negligible
    const child = resolveAmmoRound(frag.ammoRound, activeWeapon);
    const ts = frag.timedSpawns && frag.timedSpawns.enable ? frag.timedSpawns : null;
    const childGuidance = child && child.trajectory ? child.trajectory.guidance : 'None';
    const ownPayload = dmg.base + dmg.aoe;
    if ((ts && (ts.maxSpawns || 0) > 1) || childGuidance === 'DroneAdvanced') {
      typeDesc = "🤖 Autonomous Drone Deployment";
    } else if (child && ownPayload < dmg.frag) {
      typeDesc = "🚀 Staged Kinetic Booster";
    } else {
      typeDesc = "🎯 Aim-Assist Sub-Munition";
      typeDescTitle = "Terminal round proxies target lead to compensate for barrel parallax and AI aim variance.";
    }
  } else if (activeAmmo.isBeam || activeAmmo.ammoMagazine === 'Energy') {
    typeDesc = "Direct Energy Beam";
  }

  // Populate ammo type description badge in Pillar 1 badges cluster
  if (badgeAmmoTypeDesc) {
    badgeAmmoTypeDesc.textContent = typeDesc;
    badgeAmmoTypeDesc.title = typeDescTitle;
    badgeAmmoTypeDesc.style.display = 'inline-flex';
  }




}

function selectWeapon(weaponId) {
  const found = weaponsDb.find(w => w.id === weaponId || w.subtypeId === weaponId);
  if (!found) return;
  activeWeapon = found;
  if (weaponSelect) weaponSelect.value = activeWeapon.id;
  const weaponSelectWorkbench = document.getElementById('weaponSelectWorkbench');
  if (weaponSelectWorkbench) weaponSelectWorkbench.value = activeWeapon.id;

  // Derive selectable user-terminal ammos (ensuring at least 1 valid munition)
  let selectableAmmos = getSelectableAmmos(activeWeapon);
  if (!selectableAmmos || selectableAmmos.length === 0) {
    selectableAmmos = activeWeapon.ammoName ? [activeWeapon.ammoName] : [Object.keys(ammosDb)[0]];
  }
  const primaryAmmoKey = selectableAmmos[0];

  // Active ammo dropdown (Workspace 1 Telemetry Bar - always displayed for all weapons)
  if (telemetryAmmoSelect) {
    telemetryAmmoSelect.innerHTML = selectableAmmos.map(k => {
      const label = getAmmoSbcDisplayName(k);
      return `<option value="${k}">${label}</option>`;
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

  // Auto-Select Nearest Benchmark Peer if none selected or same as active
  if (!benchmarkWeapon || benchmarkWeapon.id === activeWeapon.id) {
    const autoBench = getAutomatedPeerBenchmark(activeWeapon, weaponsDb);
    if (autoBench) {
      benchmarkWeapon = autoBench;
      if (compareSelect) compareSelect.value = autoBench.id;
      const bAmmos = getSelectableAmmos(benchmarkWeapon);
      benchmarkAmmoKey = bAmmos[0] || benchmarkWeapon.ammoName;
      if (compareAmmoSelect) {
        if (bAmmos.length > 1) {
          compareAmmoSelect.innerHTML = bAmmos.map(k => {
            const label = getAmmoSbcDisplayName(k);
            return `<option value="${k}">${label}</option>`;
          }).join('');
          compareAmmoSelect.value = benchmarkAmmoKey;
          compareAmmoSelect.style.display = 'inline-block';
        } else {
          compareAmmoSelect.style.display = 'none';
        }
      }
    }
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

/// <summary>
/// Calculates total dry mass (kg and metric tons) of a weapon block from its component recipe.
/// </summary>
function calculateWeaponDryMass(weapon) {
  if (!weapon || !weapon.components) return { massKg: 0, massTons: 0, formatted: '0t' };
  let totalKg = 0;
  for (const c of weapon.components) {
    const compMeta = componentsDb[c.name] || GVK_TECH_COMPONENTS[c.name] || { mass: 0 };
    totalKg += (compMeta.mass || 0) * (parseInt(c.count) || 0);
  }
  const massTons = totalKg / 1000;
  const formatted = massTons >= 1.0 ? `${massTons.toFixed(1)}t` : `${Math.round(totalKg).toLocaleString()} kg`;
  return { massKg: totalKg, massTons, formatted };
}

/// <summary>
/// Classifies weapon role deterministically from WeaponCore hardware/targeting/damage data.
/// 100% automated and scalable with zero external metadata.
/// </summary>
function getAutomatedWeaponRole(weapon, ammo) {
  if (!weapon) return { id: 'brawler', label: 'Kinetic Brawler', icon: '🥊', desc: 'Direct ballistic fire' };
  if (isDetonationWeapon(weapon)) {
    return { id: 'demolition', label: 'Demolition Charge', icon: '💣', desc: 'Single-use detonation; no sustained fire' };
  }
  const isFixedMount = weapon.type === 'Fixed' || (weapon.rotateRate <= 0 && weapon.elevateRate <= 0);
  if (!isFixedMount && (weapon.pdProjectiles || (weapon.helpers?.targeting && weapon.helpers.targeting.includes('PD')))) {
    return { id: 'pd', label: 'Point Defense', icon: '📡', desc: 'Anti-missile & anti-projectile interception' };
  }
  const isGuided = ammo?.trajectory?.guidance && ammo.trajectory.guidance !== 'None' && isSteeringAmmo(ammo);
  const isLoiter = ammo?.fragment?.timedSpawns?.enable && (ammo.fragment.timedSpawns.maxSpawns > 1);
  if (isGuided || isLoiter) {
    return { id: 'guided', label: 'Guided Ordnance', icon: '🚀', desc: 'Guided missiles, torpedoes & loitering drones' };
  }
  if (isAirBurstAmmo(ammo)) {
    return { id: 'flak', label: 'Area Denial / Flak', icon: '💥', desc: 'Explosive splash & proximity fragmentation' };
  }
  const ds = ammo?.damageScales || {};
  const heavyMult = (typeof ds.heavyArmor === 'number' && ds.heavyArmor >= 0) ? ds.heavyArmor : 1.0;
  const isPenetrator = (ammo?.baseDamageCutoff > 0 && (ammo?.baseDamage || 0) > 20000) || heavyMult >= 1.5;
  if (isPenetrator || ((weapon.baseDamage || 0) >= 50000 && (weapon.rateOfFire || 0) <= 120)) {
    return { id: 'breaker', label: 'Armor Breaker', icon: '🔨', desc: 'Heavy armor penetrator & anti-capital kinetic' };
  }
  const range = getEngagementRange(weapon, ammo, false).range;
  if (range >= 2200 && (weapon.rateOfFire || 0) <= 240) {
    return { id: 'artillery', label: 'Standoff Artillery', icon: '🔭', desc: 'Long-range bombardment & siege' };
  }
  const dmg = getAmmoDamageDetailed(ammo, 0, weapon);
  if (dmg.aoe > dmg.base && dmg.aoe > 0) {
    return { id: 'flak', label: 'Area Denial / Flak', icon: '💥', desc: 'Explosive splash & proximity fragmentation' };
  }
  if (ammo?.ammoMagazine === 'Energy' || (weapon.energyCost || 0) > 0) {
    return { id: 'energy', label: 'Directed Energy', icon: '⚡', desc: 'Continuous or pulsed energy projection' };
  }
  return { id: 'brawler', label: 'Kinetic Brawler', icon: '🥊', desc: 'Rapid-fire direct kinetic engagement' };
}

/// <summary>
/// Detects terrain clearance cruise altitude from Approaches (DesiredElevation).
/// Excludes SmartsDef.CheckFutureIntersection which does not detect voxels in WeaponCore.
/// </summary>
function getMunitionTerrainClearance(ammo) {
  if (!ammo?.trajectory) return null;
  const elev = ammo.trajectory.desiredElevation || 0;
  if (elev > 0) {
    return {
      hasClearance: true,
      elevation: Math.round(elev),
      text: `🏔️ Terrain Clearance: ${Math.round(elev)}m Altitude Cruise (Approaches)`
    };
  }
  return null;
}

/// <summary>
/// <summary>
/// Extracts turret elevation arc, flags restricted gimbal cones, and depression status.
/// </summary>
function getWeaponArcSummary(weapon) {
  if (!weapon || weapon.type !== 'Turret') {
    return { isTurret: false, isGimbal: false, text: 'Fixed (0°)', hasDepression: false, depressionLabel: 'Fixed Forward', note: 'Rigid forward mount' };
  }
  const minAz = weapon.minAzimuth !== undefined ? weapon.minAzimuth : -180;
  const maxAz = weapon.maxAzimuth !== undefined ? weapon.maxAzimuth : 180;
  const minEl = weapon.minElevation !== undefined ? weapon.minElevation : -15;
  const maxEl = weapon.maxElevation !== undefined ? weapon.maxElevation : 45;
  const azSpan = Math.abs(maxAz - minAz);
  const isGimbal = azSpan < 350;

  const hasGoodDepression = minEl <= -10;
  const isZeroDepression = minEl >= 0;
  const depressionLabel = hasGoodDepression
    ? `📐 Good Depression (${minEl}°)`
    : (isZeroDepression ? `Relentlessly Optimistic (0°)` : `Depression: ${minEl}°`);
  const depressionNote = hasGoodDepression
    ? `Depression: ${minEl}° · Downward clearance`
    : (isZeroDepression ? `0° Depression · Cannot aim below horizon` : `Depression: ${minEl}°`);

  const arcText = `${minEl > 0 ? '+' : ''}${minEl}° to +${maxEl}°`;

  if (isGimbal) {
    const halfAz = Math.round(azSpan / 2);
    return {
      isTurret: true,
      isGimbal: true,
      minAz, maxAz, minEl, maxEl,
      text: arcText,
      hasDepression: hasGoodDepression,
      depressionLabel,
      note: `Gimbal Cone (±${halfAz}° Azimuth)`
    };
  }
  return {
    isTurret: true,
    isGimbal: false,
    minAz, maxAz, minEl, maxEl,
    text: arcText,
    hasDepression: hasGoodDepression,
    depressionLabel,
    note: depressionNote
  };
}

/// <summary>
/// Determines if recoil kick force warrants a shipbuilder badge.
/// High Recoil only flags true chassis-shaking monsters (BackKickForce >= 1,000 kN; WC applies it per barrel fired).
/// </summary>
function getWeaponRecoilWarning(weapon, ammo) {
  if (!weapon) return { showRecoil: false, text: '', isHeavy: false, isLow: false, kickKn: 0 };
  const kick = (ammo && (ammo.backKickForce !== undefined ? ammo.backKickForce : (ammo.mass * (ammo.trajectory?.desiredSpeed || 500)))) || 0;
  const kickKn = kick / 1000;
  const isMonster = kick >= 1000000;

  if (isMonster) {
    const kickStr = kickKn >= 1000 ? `${(kickKn / 1000).toFixed(1)} MN` : `${Math.round(kickKn)} kN`;
    const label = kickKn >= 20000 ? `⚠️ Heavy Recoil: ${kickStr}` : `⚠️ Moderate Recoil: ${kickStr}`;
    const tooltip = kickKn >= 20000
      ? `Recoil: ${kickStr} (${Math.round(kickKn)} kN). Severe impulse — may summon Clang to send your rover into low Kharak orbit or permanently saturate the Havok solver.`
      : `Recoil: ${kickStr}. Significant chassis shaker — will test your rover suspension dampening and structural integrity.`;
    return { showRecoil: true, text: label, tooltip, isHeavy: true, isLow: false, kickKn };
  }
  if (kick <= 0) {
    return { showRecoil: false, text: 'Clang-Approved (0 N)', tooltip: 'Zero recoil kick — completely stabilized, Clang has no purchase here.', isHeavy: false, isLow: true, kickKn: 0 };
  }
  return { showRecoil: false, text: `${Math.round(kickKn)} kN Recoil`, isHeavy: false, isLow: false, kickKn };
}

/// <summary>
/// Finds the nearest mathematical rival weapon for auto-benchmarking (same grid & mount type).
/// </summary>
function getAutomatedPeerBenchmark(activeW, list) {
  if (!activeW || !list || list.length === 0) return null;
  const grid = activeW.gridSize || activeW.grid || 'Large';
  const type = activeW.type || 'Turret';
  const isNpc = (w) => (w.name && w.name.includes('(NPC)')) || (w.subtypeId && w.subtypeId.includes('_NPC')) || (w.id && w.id.includes('_NPC'));
  const peers = list.filter(w => w.id !== activeW.id && (w.gridSize || w.grid || 'Large') === grid && w.type === type && !isNpc(w) && !isHandheldWeapon(w));
  if (peers.length === 0) {
    const anyGrid = list.filter(w => w.id !== activeW.id && (w.gridSize || w.grid || 'Large') === grid && !isNpc(w) && !isHandheldWeapon(w));
    return anyGrid.length > 0 ? anyGrid[0] : null;
  }
  const activeUps = (activeW.upCost !== undefined) ? activeW.upCost : getTechSummary(activeW.components).upCost;
  const activeDps = calculateWeaponMetrics(activeW).sustainedDps;

  let bestPeer = null;
  let minDiff = Infinity;
  for (const p of peers) {
    const pUps = (p.upCost !== undefined) ? p.upCost : getTechSummary(p.components).upCost;
    const pDps = calculateWeaponMetrics(p).sustainedDps;
    const diff = Math.abs(pUps - activeUps) * 5000 + Math.abs(pDps - activeDps);
    if (diff < minDiff) {
      minDiff = diff;
      bestPeer = p;
    }
  }
  return bestPeer;
}

/// <summary>
/// Computes dynamic peer percentiles and efficiency metrics across the active weapon's category.
/// </summary>
function calculatePeerPercentiles(activeW, ammo, list) {
  if (!activeW || !list || list.length === 0) return null;
  const grid = activeW.gridSize || activeW.grid || 'Large';
  const type = activeW.type || 'Turret';
  const isNpc = (w) => (w.name && w.name.includes('(NPC)')) || (w.subtypeId && w.subtypeId.includes('_NPC')) || (w.id && w.id.includes('_NPC'));
  const peers = list.filter(w => (w.gridSize || w.grid || 'Large') === grid && w.type === type && !isNpc(w));
  if (peers.length <= 1) return null;

  const dpsList = peers.map(w => {
    const aKey = getSelectableAmmos(w)[0] || w.ammoName;
    return { id: w.id, dps: calculateWeaponMetrics(w, aKey).sustainedDps };
  }).sort((a, b) => b.dps - a.dps);

  const myRankIdx = dpsList.findIndex(x => x.id === activeW.id);
  const rank = myRankIdx >= 0 ? myRankIdx + 1 : 1;
  const total = dpsList.length;
  const percentile = Math.max(1, Math.round(((total - rank + 1) / total) * 100));

  const ups = Math.max(1, (activeW.upCost !== undefined) ? activeW.upCost : getTechSummary(activeW.components).upCost);
  const sustainedDps = computeSustainedDps().sustainedDps || 0;
  const dpsPerUp = Math.round(sustainedDps / ups);

  return { rank, total, percentile, dpsPerUp };
}

function updateUniversalBanner() {
  if (!activeWeapon) return;

  // Weapon Icon
  if (activeWeaponIcon) {
    const wIcon = getWeaponIconUrl(activeWeapon);
    activeWeaponIcon.onerror = () => {
      activeWeaponIcon.onerror = null;
      activeWeaponIcon.src = 'icons/L__Gatling_Avenger_Turret.png';
    };
    activeWeaponIcon.src = wIcon;
    activeWeaponIcon.alt = activeWeapon.name || 'Weapon Icon';
    activeWeaponIcon.title = `${activeWeapon.displayName || activeWeapon.name} [${activeWeapon.gridSize || activeWeapon.grid || 'Large'}]`;
    if (compActiveIcon) {
      compActiveIcon.onerror = () => {
        compActiveIcon.onerror = null;
        compActiveIcon.src = 'icons/L__Gatling_Avenger_Turret.png';
      };
      compActiveIcon.src = wIcon;
      compActiveIcon.title = activeWeapon.displayName || activeWeapon.name;
    }
    const scopeWeaponIcon = document.getElementById('scopeWeaponIcon');
    if (scopeWeaponIcon) {
      scopeWeaponIcon.onerror = () => {
        scopeWeaponIcon.onerror = null;
        scopeWeaponIcon.src = 'icons/L__Gatling_Avenger_Turret.png';
      };
      scopeWeaponIcon.src = wIcon;
      scopeWeaponIcon.title = `Tuning Weapon: ${activeWeapon.displayName || activeWeapon.name}`;
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
  const gridHtml = `Grid: <strong>${activeWeapon.gridSize || activeWeapon.grid || 'Large'}</strong>`;
  const typeHtml = `Mount: <strong>${activeWeapon.type}</strong>`;
  badgeGrid.innerHTML = gridHtml;
  badgeType.innerHTML = typeHtml;
  const scopeBadgeGrid = document.getElementById('scopeBadgeGrid');
  const scopeBadgeType = document.getElementById('scopeBadgeType');
  if (scopeBadgeGrid) scopeBadgeGrid.innerHTML = gridHtml;
  if (scopeBadgeType) scopeBadgeType.innerHTML = typeHtml;
  
  const techInfo = getTechSummary(activeWeapon.components);
  const baseUps = (activeWeapon.upCost !== undefined && activeWeapon.upCost !== null) ? activeWeapon.upCost : techInfo.upCost;
  const currentUps = baseUps * currentBatteryMultiplier;
  const upsHtml = `⚡ <strong>${currentUps} UPs</strong>${currentBatteryMultiplier > 1 ? ` (${currentBatteryMultiplier}x ${baseUps} UPs)` : ''}`;
  const techHtml = `Tech: <strong>${techInfo.summaryStr}</strong>`;
  // Tech component count and UP cost are always the same quantity, so the pillar badge merges them into one.
  const techUpsHtml = `⚡ Tech / UPs: <strong>${currentUps}</strong>${currentBatteryMultiplier > 1 ? ` (${currentBatteryMultiplier}x ${baseUps})` : ''}`;
  if (badgeUps) badgeUps.innerHTML = techUpsHtml;
  const scopeBadgeUps = document.getElementById('scopeBadgeUps');
  const scopeBadgeTech = document.getElementById('scopeBadgeTech');
  if (scopeBadgeUps) scopeBadgeUps.innerHTML = upsHtml;
  if (scopeBadgeTech) scopeBadgeTech.innerHTML = techHtml;
  const bomBadgeTech = document.getElementById('bomBadgeTech');
  if (bomBadgeTech) bomBadgeTech.innerHTML = techHtml;

  // Automated Role Badge
  const curAmmoForRole = activeAmmo || (activeWeapon.assignedAmmos && ammosDb[activeWeapon.assignedAmmos[0]]) || ammosDb[activeWeapon.ammoName];
  const autoRole = getAutomatedWeaponRole(activeWeapon, curAmmoForRole);
  if (badgeRole) {
    badgeRole.innerHTML = `${autoRole.icon} <strong>${autoRole.label}</strong>`;
    badgeRole.title = autoRole.desc;
    badgeRole.style.display = 'inline-flex';
  }

  // Firing Arc & Gimbal Badge / Good Depression Badge
  const arcInfo = getWeaponArcSummary(activeWeapon);
  const metaSubtitle = document.getElementById('weaponMetaSubtitle');
  if (metaSubtitle) {
    const grid = activeWeapon.gridSize || activeWeapon.grid || 'Large';
    metaSubtitle.textContent = `[${grid} Grid · ${activeWeapon.type}]`;
  }
  if (badgeArc) {
    badgeArc.innerHTML = arcInfo.text;
    badgeArc.className = `badge pillar-header-badge ${arcInfo.isGimbal ? 'badge-amber' : (arcInfo.hasDepression ? 'badge-green' : '')}`;
    badgeArc.style.display = activeWeapon.type === 'Turret' ? 'inline-flex' : 'none';
  }
  if (badgeDepression) {
    const minEl = activeWeapon.minElevation !== undefined ? activeWeapon.minElevation : (arcInfo.minEl !== undefined ? arcInfo.minEl : 0);
    const hasGoodDepression = activeWeapon.type === 'Turret' && minEl <= -15;
    if (hasGoodDepression) {
      badgeDepression.innerHTML = `📐 Good Depression: ${minEl}°`;
      badgeDepression.className = 'badge badge-green pillar-header-badge';
      badgeDepression.style.display = 'inline-flex';
    } else {
      badgeDepression.style.display = 'none';
    }
  }

  // Dry Mass Badge (Battery Scaled)
  const massInfo = calculateWeaponDryMass(activeWeapon);
  const totalScaledMassTons = (massInfo.massTons * currentBatteryMultiplier).toFixed(1);
  if (badgeMass) {
    badgeMass.style.display = 'none';
  }

  // Context-Aware Recoil
  const recoilInfo = getWeaponRecoilWarning(activeWeapon, curAmmoForRole);
  if (badgeRecoil) {
    if (recoilInfo.showRecoil) {
      badgeRecoil.innerHTML = recoilInfo.text;
      badgeRecoil.className = `badge pillar-header-badge ${recoilInfo.isHeavy ? 'badge-red' : (recoilInfo.isLow ? 'badge-green' : 'badge-amber')}`;
      badgeRecoil.style.display = 'inline-flex';
    } else {
      badgeRecoil.style.display = 'none';
    }
  }

  // Circuitry / Data Core Rule: smart/turret with range > 2000m requires 1 PrototechCircuitry
  const hasDataCore = techInfo.hasCircuitry || ((activeWeapon.type === 'Turret' || activeWeapon.guided) && (activeWeapon.maxTargetDistance > 2000));
  if (badgeCircuitry) {
    badgeCircuitry.innerHTML = `🔬 <strong>[Tech] Data Core</strong>`;
    badgeCircuitry.style.display = hasDataCore ? 'inline-flex' : 'none';
  }
  const scopeBadgeCircuitry = document.getElementById('scopeBadgeCircuitry');
  if (scopeBadgeCircuitry) {
    scopeBadgeCircuitry.innerHTML = `🔬 <strong>[Tech] Data Core</strong>`;
    scopeBadgeCircuitry.style.display = hasDataCore ? 'inline-flex' : 'none';
  }
  const bomBadgeCircuitry = document.getElementById('bomBadgeCircuitry');
  if (bomBadgeCircuitry) {
    bomBadgeCircuitry.innerHTML = `🔬 <strong>[Tech] Data Core</strong>`;
    bomBadgeCircuitry.style.display = hasDataCore ? 'inline-flex' : 'none';
  }

  // Relic Status Badge: non-craftable ammunition from raw scratch ingots
  if (badgeRelic) {
    badgeRelic.style.display = activeWeapon.isRelic ? 'inline-flex' : 'none';
  }
  const scopeBadgeRelic = document.getElementById('scopeBadgeRelic');
  if (scopeBadgeRelic) scopeBadgeRelic.style.display = activeWeapon.isRelic ? 'inline-flex' : 'none';

  // NPC Variant
  const isNpc = (activeWeapon.name && activeWeapon.name.includes('(NPC)')) || (activeWeapon.subtypeId && activeWeapon.subtypeId.includes('_NPC')) || (activeWeapon.id && activeWeapon.id.includes('_NPC'));
  if (badgeNpc) {
    badgeNpc.style.display = isNpc ? 'inline-flex' : 'none';
  }
  const scopeBadgeNpc = document.getElementById('scopeBadgeNpc');
  if (scopeBadgeNpc) scopeBadgeNpc.style.display = isNpc ? 'inline-flex' : 'none';

  // Point Defense capability - turreted weapons engaging projectiles in flight
  const isPd = Boolean(activeWeapon.pdProjectiles && activeWeapon.type !== 'Fixed');
  const pdTitle = isPd
    ? (activeWeapon.pdSmartOnly ? 'WeaponCore threat list includes Projectiles (smart projectiles only - dumb rounds ignored)' : 'WeaponCore threat list includes Projectiles (Anti-missile interception)')
    : '';
  const scopeBadgePd = document.getElementById('scopeBadgePd');
  if (scopeBadgePd) {
    scopeBadgePd.style.display = isPd ? 'inline-flex' : 'none';
    scopeBadgePd.title = pdTitle;
  }

  if (hudTelIcon) hudTelIcon.src = getWeaponIconUrl(activeWeapon);
}

// ==========================================================================
// STICKY FOOTER HUD (contextual per workspace tab)
// ==========================================================================
function setHudChip(el, text, tone) {
  if (!el) return;
  el.textContent = text;
  el.classList.remove('badge-green', 'badge-red', 'badge-amber', 'badge-cyan');
  if (tone) el.classList.add(tone);
}

/// <summary>Telemetry footer: identity, headline combat numbers and the per-gun verdict vs the benchmark.</summary>
let hudTelLast = null;
function updateHudTelemetry(v) {
  if (!v || !activeWeapon || !hudTelName) return;
  hudTelLast = v;
  const ammoName = activeAmmo ? (activeAmmo.terminalName || activeAmmo.ammoRound) : '';
  hudTelName.textContent = `${activeWeapon.displayName || activeWeapon.name}${ammoName ? ` · ${ammoName}` : ''}${v.bMult > 1 ? ` · ×${v.bMult}` : ''}`;
  if (hudTelDps) hudTelDps.textContent = isDetonationWeapon(activeWeapon) ? 'n/a (single use)' : v.scaledEffectiveDps.toLocaleString();
  if (hudTelDpsProfile) hudTelDpsProfile.textContent = `vs ${v.profileLabel}`;
  if (hudTelAlpha) hudTelAlpha.textContent = `${v.scaledEffectiveAlpha.toLocaleString()} hp`;
  const eng = getEngagementRange(activeWeapon, activeAmmo, true);
  if (hudTelRange) {
    hudTelRange.textContent = `${Math.round(eng.range).toLocaleString()} m`;
    hudTelRange.title = eng.label;
  }
  if (hudTelCycle) hudTelCycle.textContent = v.cycle;

  if (!hudTelBench) return;
  if (!benchmarkWeapon || benchmarkWeapon.id === activeWeapon.id) {
    hudTelBench.style.display = 'none';
    return;
  }
  if (isDetonationWeapon(activeWeapon) || isDetonationWeapon(benchmarkWeapon)) {
    hudTelBench.style.display = 'none';
    return;
  }
  const benchDps = calculateWeaponMetrics(benchmarkWeapon, benchmarkAmmoKey).effectiveDps;
  const pct = benchDps > 0 ? Math.round((v.baseEffectiveDps / benchDps - 1) * 100) : 0;
  const benchName = benchmarkWeapon.displayName || benchmarkWeapon.name;
  setHudChip(hudTelBench, `vs ${benchName}: ${pct > 0 ? '+' : ''}${pct}% DPS`, pct > 0 ? 'badge-green' : (pct < 0 ? 'badge-red' : 'badge-cyan'));
  hudTelBench.style.display = '';
}

/// <summary>Workbench footer: effect of the current edits vs the server default, plus lint status.</summary>
function updateHudWorkbench(errorCount, warningCount) {
  if (!activeWeapon || !hudWbName) return;
  hudWbName.textContent = `${activeWeapon.displayName || activeWeapon.name} (editing)`;
  const now = computeSustainedDps();
  const defaults = window.GVK_DEFAULT_WEAPONS ? window.GVK_DEFAULT_WEAPONS.find(w => w.id === activeWeapon.id) : null;
  const baseDps = defaults ? calculateWeaponMetrics(defaults, activeAmmo ? activeAmmo.name : undefined).sustainedDps : now.sustainedDps;
  const pct = baseDps > 0 ? Math.round((now.sustainedDps / baseDps - 1) * 100) : 0;
  const singleUse = isDetonationWeapon(activeWeapon);
  if (hudWbDps) {
    hudWbDps.textContent = singleUse ? 'n/a (single use)' : (defaults && now.sustainedDps !== baseDps)
      ? `${baseDps.toLocaleString()} → ${now.sustainedDps.toLocaleString()} (${pct > 0 ? '+' : ''}${pct}%)`
      : `${now.sustainedDps.toLocaleString()} (default)`;
  }
  if (hudWbCycle) {
    hudWbCycle.textContent = singleUse ? 'Detonates once' : now.reloadSec > 0
      ? `${(now.spoolSec + now.fireDurationSec).toFixed(1)}s fire / ${now.reloadSec.toFixed(1)}s reload`
      : `Continuous · ${Math.round(now.effectiveRps * 60).toLocaleString()} RPM`;
  }
  if (hudWbAlpha) hudWbAlpha.textContent = `${now.alphaVolley.toLocaleString()} hp`;
  if (errorCount > 0) setHudChip(hudWbLint, `🚨 ${errorCount} error${errorCount === 1 ? '' : 's'}`, 'badge-red');
  else if (warningCount > 0) setHudChip(hudWbLint, `⚠️ ${warningCount} warning${warningCount === 1 ? '' : 's'}`, 'badge-amber');
  else setHudChip(hudWbLint, '✅ Healthy', 'badge-green');
}

// Footer hides while the active tab's own summary (banner / hero cards) is on screen, so nothing shows twice.
// The Logistics footer is filled by amRenderHud (ammo_maths.js).
const HUD_ANCHORS = {
  'ws-telemetry': ['#weaponBanner', '#ws-telemetry .hero-pillars-grid'],
  'ws-logistics': ['#ws-logistics .logistics-ammo-bar'],
  'ws-workbench': []
};
const hudVisibleAnchors = new Set();
let hudActiveWs = 'ws-telemetry';

function refreshHudVisibility() {
  if (!stickyHudBar) return;
  const anchors = HUD_ANCHORS[hudActiveWs] || [];
  const anchorOnScreen = anchors.some(sel => hudVisibleAnchors.has(sel));
  stickyHudBar.classList.toggle('hud-hidden', anchorOnScreen);
}

function setHudWorkspace(wsId) {
  hudActiveWs = wsId;
  document.querySelectorAll('.hud-group').forEach(g => {
    g.classList.toggle('active', g.getAttribute('data-hud') === wsId);
  });
  refreshHudVisibility();
}

function setupHudVisibility() {
  if (hudTelBench) {
    hudTelBench.addEventListener('click', () => {
      if (radarCanvas && radarCanvas.scrollIntoView) radarCanvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  if (hudWbLint) {
    hudWbLint.addEventListener('click', () => {
      if (linterBanner && linterBanner.scrollIntoView) linterBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  // Without IntersectionObserver the footer simply stays visible
  if (typeof IntersectionObserver === 'undefined' || !stickyHudBar) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) hudVisibleAnchors.add(e.target._hudSel);
      else hudVisibleAnchors.delete(e.target._hudSel);
    });
    refreshHudVisibility();
  });
  Object.values(HUD_ANCHORS).flat().forEach(sel => {
    const el = document.querySelector(sel);
    if (el) {
      el._hudSel = sel;
      observer.observe(el);
    }
  });
}

// ==========================================================================
// WORKBENCH BINDING: WEAPONDEF, AMMODEF, SBC
// ==========================================================================

// ==========================================================================
// WEAPONCORE SCHEMA GUARD & DYNAMIC EXTENDED TAG INSPECTOR
// ==========================================================================
// Compares the bundled Structure.cs signature (data/wc_schema.js) against upstream WeaponCore's
// CoreDefinitions.cs on GitHub, so a WC release that adds/removes/reorders definition fields is flagged.
let wcUpstreamCheck = null;
let wcUpstreamResult = { state: 'pending', diffs: [], date: '' };

function setWcSchemaBadge(schema) {
  if (!wcSchemaBadge) return;
  const r = wcUpstreamResult;
  const dateTag = r.date ? ` · WC ${r.date}` : '';
  wcSchemaBadge.classList.remove('badge-cyan', 'badge-amber', 'badge-green');
  if (r.state === 'synced') {
    wcSchemaBadge.classList.add('badge-green');
    wcSchemaBadge.innerHTML = `🛡️ WC Core ${schema.version} | Synced${dateTag}`;
  } else if (r.state === 'drift') {
    wcSchemaBadge.classList.add('badge-amber');
    wcSchemaBadge.innerHTML = `⚠️ WC Update | ${r.diffs.length} schema change${r.diffs.length === 1 ? '' : 's'}${dateTag}`;
  } else {
    wcSchemaBadge.classList.add('badge-cyan');
    wcSchemaBadge.innerHTML = `🛡️ WC Core ${schema.version} | ${r.state === 'pending' ? 'Checking…' : 'Unverified (offline)'}`;
  }
  wcSchemaBadge.title = `${wcSchemaBadge.textContent.trim()}. Click to inspect the WeaponCore schema guard.`;
  wcSchemaBadge.onclick = showSchemaModal;
}

function checkWcSchemaIntegrity() {
  if (!window.GVK_WC_SCHEMA) return;
  const schema = window.GVK_WC_SCHEMA;
  setWcSchemaBadge(schema);
  if (wcUpstreamCheck || !schema.upstream || !window.SourcePipeline || !window.SourcePipeline.extractWcSchema) return;

  const up = schema.upstream;
  const rawUrl = `https://raw.githubusercontent.com/${up.repo}/${up.branch}/${up.path}`;
  const commitsUrl = `https://api.github.com/repos/${up.repo}/commits?sha=${up.branch}&path=${encodeURIComponent(up.path)}&per_page=1`;
  wcUpstreamCheck = Promise.all([
    fetch(rawUrl, { cache: 'no-store' }).then(res => res.ok ? res.text() : Promise.reject(new Error(res.status))),
    fetch(commitsUrl).then(res => res.ok ? res.json() : null).catch(() => null)
  ]).then(([text, commits]) => {
    const upstream = window.SourcePipeline.extractWcSchema(text);
    const diffs = window.SourcePipeline.diffWcSchema(schema, upstream);
    const iso = commits && commits[0] && commits[0].commit && commits[0].commit.committer && commits[0].commit.committer.date;
    const d = iso ? new Date(iso) : null;
    const date = d && !isNaN(d.getTime())
      ? `${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}.${d.getUTCFullYear()}` : '';
    wcUpstreamResult = { state: diffs.length ? 'drift' : 'synced', diffs, date };
    if (diffs.length && wcSchemaNotice && wcSchemaNoticeText) {
      wcSchemaNotice.style.display = 'flex';
      wcSchemaNoticeText.innerHTML = `<strong>⚠️ WeaponCore Update Detected:</strong> upstream definitions differ from CoreParts/script/Structure.cs in ${diffs.length} place${diffs.length === 1 ? '' : 's'}. Click the WC badge for the list; sync Structure.cs, then run <code>node scratch/export_snapshots.js</code>.`;
    }
  }).catch(() => {
    wcUpstreamResult = { state: 'offline', diffs: [], date: '' };
  }).then(() => setWcSchemaBadge(schema));
}

function showSchemaModal() {
  if (!window.GVK_WC_SCHEMA) return;
  const s = window.GVK_WC_SCHEMA;
  const r = wcUpstreamResult;
  const status = r.state === 'synced' ? '✓ Structure.cs matches upstream WeaponCore'
    : r.state === 'drift' ? `⚠️ ${r.diffs.length} difference(s) vs upstream WeaponCore (+ added, - removed, ~ changed):`
    : r.state === 'pending' ? 'Checking upstream WeaponCore…' : 'Upstream check failed (offline or GitHub rate limit)';
  const list = r.state === 'drift' ? '\n' + r.diffs.slice(0, 40).map(x => '  ' + x).join('\n') + (r.diffs.length > 40 ? `\n  … +${r.diffs.length - 40} more` : '') : '';
  const msg = `🛡️ WEAPONCORE SCHEMA GUARD STATUS\n\n` +
    `${status}${list}\n\n` +
    `• Upstream: ${s.upstream ? `${s.upstream.repo}@${s.upstream.branch}` : 'n/a'}${r.date ? ` (definitions last changed ${r.date})` : ''}\n` +
    `• Structure.cs Signature: ${s.structureHash}\n` +
    `• Enums / Structs Tracked: ${s.totalEnums} / ${s.totalStructs}`;
  alert(msg);
}


// ==========================================================================
// FIELD BINDING HELPERS FOR MEDIUM-GREY DEFAULT VISUALIZATION
// ==========================================================================
function bindInputVal(input, definedVal, defaultVal) {
  if (!input) return;
  if (definedVal !== undefined && definedVal !== null && definedVal !== '') {
    input.value = definedVal;
    input.classList.remove('is-wc-default');
  } else {
    input.value = (defaultVal !== undefined && defaultVal !== null) ? defaultVal : '';
    input.classList.add('is-wc-default');
  }
}

function bindCheckboxVal(input, definedVal, defaultVal) {
  if (!input) return;
  if (definedVal !== undefined && definedVal !== null) {
    input.checked = (definedVal === true);
    input.classList.remove('is-wc-default');
  } else {
    input.checked = (defaultVal === true);
    input.classList.add('is-wc-default');
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
  wLockedSmartOnly.checked = activeWeapon.lockedSmartOnly === true || activeWeapon.pdSmartOnly === true;
  const ctrlModes = (activeWeapon.validControlModes && activeWeapon.validControlModes.length)
    ? activeWeapon.validControlModes : ['Automatic', 'Manual', 'Painter'];
  if (wCtrlAutomatic) wCtrlAutomatic.checked = ctrlModes.includes('Automatic');
  if (wCtrlManual) wCtrlManual.checked = ctrlModes.includes('Manual');
  if (wCtrlPainter) wCtrlPainter.checked = ctrlModes.includes('Painter');

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
  if (wTrajectilesPerBarrel) wTrajectilesPerBarrel.value = activeWeapon.trajectilesPerBarrel || 1;
  if (wDelayUntilFire) wDelayUntilFire.value = activeWeapon.delayUntilFire || 0;
  if (wShotsInBurst) wShotsInBurst.value = activeWeapon.shotsInBurst || 0;
  if (wDelayAfterBurst) wDelayAfterBurst.value = activeWeapon.delayAfterBurst || 0;
  wHeatPerShot.value = activeWeapon.heatPerShot || 0;
  wMaxHeat.value = activeWeapon.maxHeat || 0;
  wHeatSinkRate.value = activeWeapon.heatSinkRate || 0;
  wCooldown.value = activeWeapon.cooldown !== undefined ? activeWeapon.cooldown : 0.5;

  wRotateRate.value = activeWeapon.rotateRate || 0;
  wElevateRate.value = activeWeapon.elevateRate || 0;
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
  wcSyncCurated('weapon');
  renderWcFieldEditor('weapon');
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
        wcSyncWeaponAmmos();
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
  bindInputVal(tTargetLossDegree, traj.targetLossDegree, 0);
  bindInputVal(tTargetLossTime, traj.targetLossTime, 0);
  bindInputVal(tGuidance, traj.guidance, 'None');

  const sm = traj.smarts || {};
  bindInputVal(sInaccuracy, sm.inaccuracy, 0);
  bindInputVal(sAggressiveness, sm.aggressiveness, 1.0);
  bindInputVal(sNavAcceleration, sm.navAcceleration, 0);
  bindInputVal(sMaxLateralThrust, sm.maxLateralThrust, 0.5);
  bindInputVal(sSteeringLimit, sm.steeringLimit, 0);
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
  bindInputVal(dsCharacters, ds.characters, -1);
  bindInputVal(dsDamageType, ds.damageType, 'BaseDamage');

  // Flat keys match ammos_data.js damageScales schema (no nested armor object)
  bindInputVal(dsArmorArmor, ds.armorArmor, -1);
  bindInputVal(dsLightArmor, ds.lightArmor, -1);
  bindInputVal(dsHeavyArmor, ds.heavyArmor, -1);
  bindInputVal(dsNonArmor, ds.nonArmor, -1);

  bindInputVal(dsFalloffDistance, ds.falloffDistance, 0);
  bindInputVal(dsFalloffMinMult, ds.falloffMinMult, 0);

  bindInputVal(dsGridLarge, ds.gridLarge, -1);
  bindInputVal(dsGridSmall, ds.gridSmall, -1);
  bindInputVal(dsCutoffArmorArmor, ds.cutoffArmorArmor, -1);
  bindInputVal(dsCutoffLightArmor, ds.cutoffLightArmor, -1);
  bindInputVal(dsCutoffHeavyArmor, ds.cutoffHeavyArmor, -1);
  bindInputVal(dsCutoffNonArmor, ds.cutoffNonArmor, -1);
  bindInputVal(dsCutoffGridLarge, ds.cutoffGridLarge, -1);
  bindInputVal(dsCutoffGridSmall, ds.cutoffGridSmall, -1);

  // AreaOfDamageDef
  const aod = activeAmmo.areaOfDamage || {};
  const aodBlock = aod.byBlockHit || {};
  bindCheckboxVal(aodBlockEnable, aodBlock.enable, false);
  bindInputVal(aodBlockRadius, aodBlock.radius, 0);
  bindInputVal(aodBlockDamage, aodBlock.damage, 0);
  bindInputVal(aodBlockDepth, aodBlock.depth, 0);
  bindInputVal(aodBlockMaxAbsorb, aodBlock.maxAbsorb, 0);
  bindInputVal(aodBlockFalloff, aodBlock.falloff, 'Linear');
  bindInputVal(aodBlockShape, aodBlock.shape, 'Diamond');

  const aodEol = aod.endOfLife || {};
  bindCheckboxVal(aodEolEnable, aodEol.enable, false);
  bindInputVal(aodEolRadius, aodEol.radius, 0);
  bindInputVal(aodEolDamage, aodEol.damage, 0);
  bindInputVal(aodEolDepth, aodEol.depth, 0);
  bindInputVal(aodEolMaxAbsorb, aodEol.maxAbsorb, 0);
  bindInputVal(aodEolFalloff, aodEol.falloff, 'Linear');
  bindInputVal(aodEolShape, aodEol.shape, 'Diamond');

  // FragmentDef
  const frag = activeAmmo.fragment || {};
  bindCheckboxVal(fEnable, frag.enable, false);
  bindCheckboxVal(fReverse, frag.reverse, false);
  bindCheckboxVal(fDropVelocity, frag.dropVelocity, false);
  bindCheckboxVal(fIgnoreArming, frag.ignoreArming, false);
  bindInputVal(fFragments, frag.fragments, 0);
  bindInputVal(fDegrees, frag.degrees, 0);
  bindInputVal(fRadial, frag.radial, 0);
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
  bindInputVal(aSoundVoxelHit, aud.voxelHitSound, '');
  bindInputVal(aSoundPlayerHit, aud.playerHitSound, '');
  bindInputVal(aSoundWaterHit, aud.waterHitSound, '');
  bindInputVal(aHitPlayChance, aud.hitPlayChance, 1.0);

  // SynchronizeDef
  const sync = activeAmmo.sync || {};
  bindInputVal(syncInterval, sync.positionSyncInterval, 0);
  bindInputVal(syncPatchWindow, sync.positionPatchWindow, 0);
  bindCheckboxVal(syncFull, sync.full, false);
  bindCheckboxVal(syncPointDefense, sync.pointDefense, true);
  bindCheckboxVal(syncOnHitDeath, sync.onHitDeath, false);
  bindCheckboxVal(syncUpdateOnRandomize, sync.positionUpdateOnRandomize, false);

  wcSyncCurated('ammo');
  renderWcFieldEditor('ammo');
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

  if (sbcIcon) sbcIcon.value = sbc.icon || `Textures\\GUI\\Icons\\Cubes\\${activeWeapon.subtypeId}.png`;
  if (sbcModel) sbcModel.value = sbc.model || `Models\\Cubes\\${activeWeapon.grid || 'Large'}\\${activeWeapon.subtypeId}.mwm`;

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
  if (sbcOverlayTexture) sbcOverlayTexture.value = sbc.overlayTexture || 'Textures\\GUI\\Screens\\camera_overlay.dds';
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

  const isNpc = (activeWeapon.name && activeWeapon.name.includes('(NPC)')) || (activeWeapon.subtypeId && activeWeapon.subtypeId.includes('_NPC'));
  const scrapYieldMult = balanceMatrix.scrapYield !== undefined ? balanceMatrix.scrapYield : 0.25;

  activeWeapon.components.forEach((c, idx) => {
    const cMeta = componentsDb[c.name] || (GVK_TECH_COMPONENTS && GVK_TECH_COMPONENTS[c.name]) || { mass: 20, integrity: 100 };
    const layerMass = (cMeta.mass || 0) * c.count;
    const layerHp = (cMeta.integrity || 0) * c.count;
    totalIntegrity += layerHp;
    totalMassKg += layerMass;

    // Auto-map tech scrap for NPC weapons if not explicitly configured
    if (c.deconstructSubtype === undefined && isNpc && GVK_TECH_SCRAP_MAP[c.name]) {
      c.deconstructSubtype = GVK_TECH_SCRAP_MAP[c.name].scrapSubtype;
      c.deconstructType = GVK_TECH_SCRAP_MAP[c.name].typeId || 'Ore';
    }

    const hasDeconstruct = !!c.deconstructSubtype;
    const yieldCount = Math.max(1, Math.round(c.count * scrapYieldMult));
    const yieldDetail = hasDeconstruct
      ? `<div class="sbc-yield-detail">Grinds: <strong>${c.count}</strong> received (${yieldCount} at ${Math.round(scrapYieldMult * 100)}% yield)</div>`
      : '';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <select class="sbc-comp-select control-input" data-idx="${idx}" aria-label="Component">
          <optgroup label="Standard Components">
            ${standardComps.map(sc => `<option value="${sc.subtype}" ${sc.subtype === c.name ? 'selected' : ''}>${sc.displayName}</option>`).join('')}
          </optgroup>
          <optgroup label="👑 GVK Tech & Special Components">
            ${techComps.map(tc => `<option value="${tc.subtype}" ${tc.subtype === c.name ? 'selected' : ''}>${tc.displayName}</option>`).join('')}
          </optgroup>
        </select>
      </td>
      <td>
        <input type="number" class="sbc-comp-input" data-idx="${idx}" min="1" max="50000" value="${c.count}" aria-label="Quantity">
      </td>
      <td class="col-num sbc-cell-mass">${layerMass.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kg</td>
      <td class="col-num sbc-cell-hp">${layerHp.toLocaleString()}</td>
      <td>
        <select class="sbc-decomp-select control-input" data-idx="${idx}" aria-label="Deconstructs to">
          <option value="">None (returns self)</option>
          <optgroup label="👑 Tech Scrap Items">
            ${Object.values(GVK_TECH_SCRAP_MAP).map(s => `<option value="${s.scrapSubtype}" ${c.deconstructSubtype === s.scrapSubtype ? 'selected' : ''}>${s.displayName}</option>`).join('')}
          </optgroup>
        </select>
        ${yieldDetail}
      </td>
      <td class="col-act">
        <button class="btn-delete-row" data-idx="${idx}" title="Remove this layer" aria-label="Remove layer">✕</button>
      </td>
    `;

    tr.querySelector('.sbc-comp-select').addEventListener('change', (e) => {
      activeWeapon.components[idx].name = e.target.value;
      if (isNpc && GVK_TECH_SCRAP_MAP[e.target.value]) {
        activeWeapon.components[idx].deconstructSubtype = GVK_TECH_SCRAP_MAP[e.target.value].scrapSubtype;
        activeWeapon.components[idx].deconstructType = GVK_TECH_SCRAP_MAP[e.target.value].typeId || 'Ore';
      } else if (!GVK_TECH_SCRAP_MAP[e.target.value]) {
        activeWeapon.components[idx].deconstructSubtype = null;
        activeWeapon.components[idx].deconstructType = null;
      }
      renderSbcComponentsTable();
      updateCombatTelemetry();
      updateDirectSbcXml();
    });

    tr.querySelector('.sbc-comp-input').addEventListener('input', (e) => {
      const val = parseInt(e.target.value) || 1;
      activeWeapon.components[idx].count = val;
      renderSbcComponentsTable();
      updateCombatTelemetry();
      updateDirectSbcXml();
    });

    tr.querySelector('.sbc-decomp-select').addEventListener('change', (e) => {
      const val = e.target.value;
      if (val) {
        activeWeapon.components[idx].deconstructSubtype = val;
        activeWeapon.components[idx].deconstructType = 'Ore';
      } else {
        activeWeapon.components[idx].deconstructSubtype = null;
        activeWeapon.components[idx].deconstructType = null;
      }
      renderSbcComponentsTable();
      updateDirectSbcXml();
    });

    tr.querySelector('.btn-delete-row').addEventListener('click', () => {
      if (activeWeapon.components.length > 1) {
        activeWeapon.components.splice(idx, 1);
        renderSbcComponentsTable();
        updateCombatTelemetry();
        updateDirectSbcXml();
      } else {
        showToast("Weapon must have at least 1 component layer.");
      }
    });

    tbody.appendChild(tr);
  });

  const badgeScrapYield = document.getElementById('sbcScrapYieldBadge');
  if (badgeScrapYield) {
    badgeScrapYield.textContent = `Scrap Yield: ${Math.round(scrapYieldMult * 100)}%`;
  }

  // Calculate Build Time with user's formula: =MAX(5, Round(WeaponIntegrity / BuildTime_Mult, 0))
  const buildTimeDiv = balanceMatrix.buildTimeDividend || 750;
  const calculatedBuildTime = Math.max(5, Math.round(totalIntegrity / buildTimeDiv));
  activeWeapon.buildTime = calculatedBuildTime;
  if (sbcBuildTime) sbcBuildTime.value = calculatedBuildTime;
  const sbcBuildTimeHint = document.getElementById('sbcBuildTimeHint');
  if (sbcBuildTimeHint) sbcBuildTimeHint.textContent = `Total HP ÷ ${buildTimeDiv}, min 5s`;
  if (sbcBuildTimeVal) sbcBuildTimeVal.textContent = calculatedBuildTime >= 60 ? `${calculatedBuildTime}s (${formatTime(calculatedBuildTime)})` : `${calculatedBuildTime}s`;

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
    badgeUps.innerHTML = `⚡ Tech / UPs: <strong>${techInfo.upCost}</strong>`;
  }
  if (badgeCircuitry) {
    badgeCircuitry.innerHTML = `🔬 <strong>[Tech] Data Core</strong>`;
    badgeCircuitry.style.display = techInfo.hasCircuitry ? 'inline-flex' : 'none';
  }

  // Update Linter Check
  runWeaponCoreLinter();
}

// ==========================================================================
// COMBAT TELEMETRY HERO MICRO-VISUALS
// ==========================================================================

/// <summary>
/// Renders a 3-color kinetic/blast/frag composition strip under Effective DPS.
/// </summary>
function renderDpsCompositionStrip(dmgDetails, isBeam) {
  if (!pillarDpsStrip) return;
  const base = Math.max(0, dmgDetails?.base || 0);
  const aoe = Math.max(0, dmgDetails?.aoe || 0);
  const frag = Math.max(0, dmgDetails?.frag || 0);
  const total = base + aoe + frag || 1;
  const pctKinetic = Math.round((base / total) * 100);
  const pctBlast = Math.round((aoe / total) * 100);
  const pctFrag = Math.max(0, 100 - pctKinetic - pctBlast);

  let label = '100% KINETIC';
  if (isBeam) {
    label = '100% BEAM';
  } else if (pctBlast > 0 && pctFrag > 0) {
    label = `${pctKinetic}% AP · ${pctBlast}% HE · ${pctFrag}% FRAG`;
  } else if (pctBlast > 0) {
    label = `${pctKinetic}% AP · ${pctBlast}% HE`;
  } else if (pctFrag > 0) {
    label = `${pctKinetic}% AP · ${pctFrag}% FRAG`;
  } else if (dmgDetails?.cutoff > 0) {
    label = 'AP OVERPEN';
  }

  pillarDpsStrip.innerHTML = `
    <div class="dps-comp-wrap" title="Damage: ${pctKinetic}% Kinetic AP, ${pctBlast}% Blast, ${pctFrag}% Frag">
      <div class="dps-comp-strip">
        <div class="dps-comp-segment dps-comp-kinetic" style="width: ${pctKinetic}%;"></div>
        <div class="dps-comp-segment dps-comp-blast" style="width: ${pctBlast}%;"></div>
        <div class="dps-comp-segment dps-comp-frag" style="width: ${pctFrag}%;"></div>
      </div>
      <span class="dps-comp-legend">${label}</span>
    </div>
  `;
}

/// <summary>
/// Renders the weapon's native salvo architecture cells (does not scale with battery multipliers).
/// </summary>
function renderAlphaSalvoCluster(totalRounds, isBeam, isPlasma, isDetonation) {
  if (!pillarAlphaSalvo) return;
  const rounds = Math.max(1, parseInt(totalRounds, 10) || 1);
  let mode = 'BURST';
  let cells = '';
  let labelClass = '';

  if (isDetonation) {
    mode = 'ONE-SHOT';
    cells = '<div class="salvo-cell active" title="Fires once when the block detonates"></div>';
  } else if (isBeam) {
    labelClass = 'beam';
    if (rounds === 1) {
      mode = 'CONTINUOUS BEAM';
      cells = '<div class="salvo-cell beam-cont" title="Continuous optical lance emitter"></div>';
    } else {
      mode = 'CAPACITOR BURST';
      for (let i = 0; i < 8; i++) {
        cells += `<div class="salvo-cell active beam" style="opacity: ${0.45 + (i * 0.07)};" title="Capacitor discharge energy tick"></div>`;
      }
    }
  } else if (isPlasma) {
    labelClass = 'plasma';
    if (rounds === 1) {
      mode = 'PLASMA ORB';
      cells = '<div class="salvo-cell active plasma" title="Superheated magnetic plasma charge"></div>';
    } else {
      mode = `${rounds}-RND PLASMA`;
      for (let i = 0; i < Math.min(8, rounds); i++) {
        cells += `<div class="salvo-cell active plasma" title="Superheated magnetic plasma charge"></div>`;
      }
    }
  } else if (rounds === 1) {
    mode = 'HEAVY SLUG';
    cells = '<div class="salvo-cell active slug" title="Single-shot heavy kinetic slug"></div>';
  } else if (rounds <= 6) {
    mode = `${rounds}-RND SALVO`;
    for (let i = 0; i < 6; i++) {
      cells += `<div class="salvo-cell ${i < rounds ? 'active' : ''}"></div>`;
    }
  } else if (rounds <= 24) {
    mode = 'BURST POD';
    const activeCount = Math.min(8, Math.max(3, Math.round((rounds / 24) * 8)));
    for (let i = 0; i < 8; i++) {
      cells += `<div class="salvo-cell ${i < activeCount ? 'active' : ''}"></div>`;
    }
  } else {
    mode = 'BELT-FED';
    for (let i = 0; i < 8; i++) {
      cells += `<div class="salvo-cell active" style="opacity: ${0.45 + (i * 0.07)};"></div>`;
    }
  }

  pillarAlphaSalvo.innerHTML = `
    <div class="salvo-cluster" title="Native Salvo Pattern: ${mode} (${rounds} ${isBeam ? 'energy ticks' : 'rds'}/volley)">
      ${cells}
      <span class="salvo-label ${labelClass}">${mode}</span>
    </div>
  `;
}

/// <summary>
/// Renders an artillery radar fan for tracking turrets, or a linear boresight corridor for fixed weapons.
/// </summary>
function renderRangeVisual(rangeNum, isTrackingWeapon, isBlast) {
  if (!pillarRangeRadar) return;
  const range = Math.max(0, parseFloat(rangeNum) || 0);

  if (isBlast) {
    pillarRangeRadar.innerHTML = `
      <div class="boresight-reach-wrap" title="Fragments burst ${Math.round(range).toLocaleString()}m from the block">
        <svg class="boresight-reach-svg" viewBox="0 0 84 16">
          <line class="boresight-reach-rail" x1="4" y1="8" x2="33" y2="8" />
          <line class="boresight-reach-rail" x1="51" y1="8" x2="80" y2="8" />
          <circle cx="42" cy="8" r="2.5" fill="#f59e0b" />
          <circle cx="42" cy="8" r="5" fill="none" stroke="#f59e0b" stroke-width="1.2" opacity="0.7" />
          <circle cx="42" cy="8" r="7.3" fill="none" stroke="#fbbf24" stroke-width="1" stroke-dasharray="2 2" opacity="0.5" />
        </svg>
        <span class="boresight-reach-label">BLAST</span>
      </div>
    `;
    return;
  }

  if (isTrackingWeapon) {
    const maxTargetHorizon = 4000;
    const rRatio = Math.min(1.0, range / maxTargetHorizon);
    const maxR = 64;
    const rFill = Math.max(6, Math.min(maxR, rRatio * maxR));
    const cos20 = 0.9397;
    const sin20 = 0.3420;
    const xFillEnd = (4 + rFill * cos20).toFixed(1);
    const yFillEnd = (24 - rFill * sin20).toFixed(1);
    const xBottomEnd = (4 + rFill).toFixed(1);

    const fillPath = `M 4 24 L ${xBottomEnd} 24 A ${rFill.toFixed(1)} ${rFill.toFixed(1)} 0 0 0 ${xFillEnd} ${yFillEnd} Z`;

    pillarRangeRadar.innerHTML = `
      <div class="radar-fan-wrap" title="Tracking Radar: ${Math.round(range).toLocaleString()}m against 4,000m turret horizon">
        <svg class="radar-fan-svg" viewBox="0 0 84 28">
          <!-- Radar Sweep Baseline & 20-deg Top Ray -->
          <path class="radar-fan-bg" d="M 4 24 L 68 24 M 4 24 L 64.1 2.1" />
          <!-- Concentric Range Rings: 1.0km, 2.0km, 3.0km, 4.0km -->
          <path class="radar-fan-ring" d="M 20 24 A 16 16 0 0 0 19.0 18.5" />
          <path class="radar-fan-ring" d="M 36 24 A 32 32 0 0 0 34.1 13.1" />
          <path class="radar-fan-ring" d="M 52 24 A 48 48 0 0 0 49.1 7.6" />
          <path class="radar-fan-ring" d="M 68 24 A 64 64 0 0 0 64.1 2.1" />
          <!-- Dynamic Weapon Range Arc Fill -->
          <path class="radar-fan-fill" d="${fillPath}" />
        </svg>
        <span class="radar-fan-label">RADAR</span>
      </div>
    `;
  } else {
    const fillWidth = Math.max(14, Math.min(76, Math.round((range / 5000) * 76)));
    pillarRangeRadar.innerHTML = `
      <div class="boresight-reach-wrap" title="Direct Boresight Reach: ${Math.round(range).toLocaleString()}m (Fixed mount, manual aim)">
        <svg class="boresight-reach-svg" viewBox="0 0 84 16">
          <line class="boresight-reach-rail" x1="4" y1="8" x2="80" y2="8" />
          <line class="boresight-reach-tick" x1="23" y1="5" x2="23" y2="11" />
          <line class="boresight-reach-tick" x1="42" y1="4" x2="42" y2="12" />
          <line class="boresight-reach-tick" x1="61" y1="5" x2="61" y2="11" />
          <line x1="4" y1="8" x2="${fillWidth}" y2="8" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="${fillWidth}" cy="8" r="3" fill="#38bdf8" stroke="#fff" stroke-width="0.8" />
        </svg>
        <span class="boresight-reach-label">BORESIGHT</span>
      </div>
    `;
  }
}

/// <summary>
/// Renders munition propulsion/delivery vector SVG under Muzzle Velocity.
/// </summary>
function renderPropulsionVector(activeWeapon, activeAmmo, isBeam) {
  if (!pillarPropulsionVector) return;

  // Flight profile from WC def fields only (EwarDef, damage payload, Guidance, TimedSpawns, HybridRound, AccelPerSec)
  const a = activeAmmo || {};
  const ewar = (a.ewar && a.ewar.enable) ? a.ewar : null;
  const dmg = getAmmoDamageDetailed(a, 0, activeWeapon);
  const guidance = (a.trajectory && a.trajectory.guidance) || 'None';
  const ts = a.fragment && a.fragment.enable && a.fragment.timedSpawns && a.fragment.timedSpawns.enable ? a.fragment.timedSpawns : null;
  const isChaffFlare = Boolean(ewar && /^AntiSmart/.test(ewar.type || ''));
  const isRadarSensor = !ewar && dmg.total <= 0;
  const isDrone = !isChaffFlare && (guidance === 'DroneAdvanced' || Boolean(ts && (ts.maxSpawns || 0) > 1));
  const isSabot = !isDrone && !isBeam && !isRadarSensor && !isChaffFlare && Boolean(a.hybridRound) && dmg.base >= dmg.aoe;
  const steers = guidance !== 'None' && isSteeringAmmo(a);
  const isAirBurst = !isDrone && !isBeam && !isRadarSensor && !isChaffFlare && isAirBurstAmmo(a);
  const isHoming = !isDrone && !isBeam && !isRadarSensor && !isChaffFlare && !isSabot && steers;
  const isRocket = !isDrone && !isBeam && !isRadarSensor && !isChaffFlare && !isSabot && !isHoming && ((a.trajectory && a.trajectory.accelPerSec) || 0) > 0;

  let tag = 'BALLISTIC';
  let tagClass = '';
  let svgContent = '';

  if (isDetonationWeapon(activeWeapon)) {
    tag = 'FRAG BURST';
    tagClass = 'flare';
    svgContent = `
      <circle cx="30" cy="9" r="4" fill="#f59e0b"/>
      <circle cx="30" cy="9" r="7" fill="none" stroke="#f59e0b" stroke-width="1.4" opacity="0.6"/>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(d => {
        const r = d * Math.PI / 180;
        return `<line x1="${(30 + Math.cos(r) * 9).toFixed(1)}" y1="${(9 + Math.sin(r) * 9 * 0.9).toFixed(1)}" x2="${(30 + Math.cos(r) * 16).toFixed(1)}" y2="${(9 + Math.sin(r) * 16 * 0.5).toFixed(1)}" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>`;
      }).join('')}
    `;
  } else if (isRadarSensor) {
    tag = 'RADAR PULSE';
    tagClass = 'radar';
    svgContent = `
      <path d="M 6 13 A 6 6 0 0 1 6 5" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M 6 16 A 10 10 0 0 1 6 2" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" opacity="0.6"/>
      <line x1="2" y1="9" x2="6" y2="9" stroke="#38bdf8" stroke-width="2"/>
      <line x1="8" y1="9" x2="34" y2="9" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="3 2"/>
      <path d="M 38 4 A 8 8 0 0 1 38 14" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M 44 2 A 12 12 0 0 1 44 16" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
      <path d="M 50 1 A 15 15 0 0 1 50 17" fill="none" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" opacity="0.4"/>
    `;
  } else if (isChaffFlare) {
    tag = 'CHAFF/FLARE';
    tagClass = 'flare';
    svgContent = `
      <rect x="3" y="11" width="6" height="5" rx="1" fill="#f472b6" opacity="0.85"/>
      <path d="M 9 13 Q 20 4 34 6" fill="none" stroke="#f472b6" stroke-width="1.6" stroke-dasharray="3 2"/>
      <circle cx="36" cy="6" r="2.5" fill="#fff"/>
      <line x1="36" y1="6" x2="45" y2="3" stroke="#f472b6" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="36" y1="6" x2="44" y2="10" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="36" y1="6" x2="52" y2="6" stroke="#f472b6" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="2 2"/>
      <circle cx="46" cy="3" r="1.5" fill="#f472b6"/>
      <circle cx="44" cy="10" r="1.5" fill="#fbbf24"/>
      <circle cx="53" cy="6" r="1.8" fill="#f472b6"/>
      <circle cx="50" cy="12" r="1.2" fill="#fbbf24"/>
      <circle cx="58" cy="4" r="1.2" fill="#fff"/>
    `;
  } else if (isBeam) {
    tag = 'BEAM';
    tagClass = 'beam';
    svgContent = '<line x1="3" y1="9" x2="52" y2="9" stroke="#c084fc" stroke-width="2.5"/><circle cx="56" cy="9" r="3.5" fill="#c084fc"/>';
  } else if (isDrone) {
    tag = 'DRONE';
    tagClass = 'drone';
    svgContent = `
      <polygon points="30,5 38,9 30,13 22,9" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="1.5"/>
      <circle cx="19" cy="5" r="2.5" fill="#10b981"/><circle cx="41" cy="5" r="2.5" fill="#10b981"/>
      <circle cx="19" cy="13" r="2.5" fill="#10b981"/><circle cx="41" cy="13" r="2.5" fill="#10b981"/>
      <line x1="19" y1="5" x2="41" y2="13" stroke="#10b981" stroke-width="1"/>
      <line x1="19" y1="13" x2="41" y2="5" stroke="#10b981" stroke-width="1"/>
      <circle cx="30" cy="9" r="1.5" fill="#fff"/>
      <path d="M 46 6 A 4 4 0 0 1 46 12" fill="none" stroke="#10b981" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M 50 4 A 7 7 0 0 1 50 14" fill="none" stroke="#10b981" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
    `;
  } else if (isAirBurst) {
    tag = 'AIR BURST';
    tagClass = 'rocket';
    svgContent = `
      <path d="M 3 15 Q 22 4 40 7" fill="none" stroke="#fbbf24" stroke-width="1.8" stroke-dasharray="3 2"/>
      <circle cx="44" cy="8" r="3" fill="#f59e0b"/>
      <circle cx="44" cy="8" r="6.5" fill="none" stroke="#f59e0b" stroke-width="1.2" opacity="0.55"/>
      <line x1="48" y1="4" x2="54" y2="1" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="50" y1="8" x2="57" y2="8" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
      <line x1="48" y1="12" x2="54" y2="15" stroke="#fbbf24" stroke-width="1.2" stroke-linecap="round"/>
    `;
  } else if (isHoming) {
    tag = 'HOMING';
    tagClass = 'homing';
    svgContent = `
      <path d="M 3 13 Q 22 13 34 8 T 50 4" fill="none" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="48,1 56,4 48,7" fill="#38bdf8"/>
      <path d="M 50 1 L 54 1 L 54 7 L 50 7" fill="none" stroke="#fbbf24" stroke-width="1.2"/>
    `;
  } else if (isRocket) {
    tag = 'ROCKET';
    tagClass = 'rocket';
    svgContent = `
      <path d="M 3 5 Q 8 9 3 13" fill="none" stroke="#ef4444" stroke-width="2"/>
      <line x1="10" y1="9" x2="48" y2="9" stroke="#f59e0b" stroke-width="2.5"/>
      <polygon points="48,5.5 56,9 48,12.5" fill="#f59e0b"/>
    `;
  } else if (isSabot) {
    tag = 'SABOT';
    tagClass = 'sabot';
    svgContent = `
      <polygon points="5,3 10,3 14,8 6,8" fill="#38bdf8"/>
      <polygon points="5,15 10,15 14,10 6,10" fill="#38bdf8"/>
      <rect x="5" y="8" width="41" height="2" fill="#38bdf8"/>
      <polygon points="46,7 61,9 46,11" fill="#e0f2fe"/>
      <circle cx="61" cy="9" r="1" fill="#ffffff"/>
      <path d="M 33 4 L 31 4 L 30 6 L 24 6 L 23 4 L 20 4 L 21 8 L 32 8 Z" fill="#f59e0b" stroke="#fbbf24" stroke-width="0.8"/>
      <path d="M 33 14 L 31 14 L 30 12 L 24 12 L 23 14 L 20 14 L 21 10 L 32 10 Z" fill="#f59e0b" stroke="#fbbf24" stroke-width="0.8"/>
      <rect x="20.5" y="4" width="2" height="10" fill="#fbbf24"/>
      <line x1="20" y1="9" x2="33" y2="9" stroke="#0f172a" stroke-width="1"/>
    `;
  } else {
    tag = 'BALLISTIC';
    tagClass = '';
    svgContent = '<line x1="4" y1="9" x2="48" y2="9" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 2.5"/><polygon points="48,5.5 56,9 48,12.5" fill="#38bdf8"/>';
  }

  pillarPropulsionVector.innerHTML = `
    <div class="propulsion-vector-wrap" title="Flight Profile: ${tag}">
      <svg class="propulsion-vector-svg" viewBox="0 0 64 18">${svgContent}</svg>
      <span class="propulsion-tag ${tagClass}">${tag}</span>
    </div>
  `;
}

/// <summary>
/// Renders required tech components breakdown chips for the weapon chassis.
/// </summary>
function renderTechStack(weapon, bMult) {
  if (!pillarUpTechMeter) return;
  const comps = weapon?.components || [];
  const techComps = comps.filter(c => isTechComponent(c.name));
  if (techComps.length === 0) {
    pillarUpTechMeter.innerHTML = `
      <div class="tech-stack-wrap" title="Standard Industrial Tech: Refined ingots only (zero Prototech or relic tech needed).">
        <span class="tech-chip standard">⚙️ Standard Industrial</span>
      </div>
    `;
    return;
  }

  const chipsHtml = techComps.map(c => {
    const meta = GVK_TECH_COMPONENTS[c.name] || {};
    const rawName = meta.displayName || c.name.replace('Prototech', '');
    const cleanName = rawName.replace('[Tech]', '').trim();
    const isDataCore = /Data\s*Core|Circuitry/i.test(c.name);
    const isCradle = /Cradle|Carrier/i.test(cleanName);
    const chipClass = isDataCore ? 'datacore' : (isCradle ? 'cradle' : 'exotic');
    const icon = isDataCore ? '◆' : (isCradle ? '🏗️' : '⚡');
    const qty = parseInt(c.count, 10) || 1;
    const totalQty = bMult > 1 ? qty * bMult : qty;
    const qtyLabel = bMult > 1 ? `${totalQty}× (${qty}/gun)` : `${qty}×`;
    return `<span class="tech-chip ${chipClass}" title="${qty}x ${rawName} per gun">${icon} ${qtyLabel} ${cleanName}</span>`;
  }).join('');

  const fullSummary = techComps.map(c => {
    const meta = GVK_TECH_COMPONENTS[c.name] || {};
    const name = meta.displayName || c.name;
    return `${c.count}x ${name}`;
  }).join(', ');

  pillarUpTechMeter.innerHTML = `
    <div class="tech-stack-wrap" title="Required Tech Components: ${fullSummary}. High-grade Kiith engineering salvaged from players who didn't check their radar.">
      ${chipsHtml}
    </div>
  `;
}

/// <summary>
/// Renders an isometric 3D blueprint voxel block dynamically sized against the largest turret outline for the grid.
/// </summary>
function renderVoxelBlueprint(sx, sy, sz_z, volBlocks, isSmallGrid) {
  if (!pillarVoxelBlueprint) return;
  const x = Math.max(1, parseInt(sx, 10) || 1);
  const y = Math.max(1, parseInt(sy, 10) || 1);
  const z = Math.max(1, parseInt(sz_z, 10) || 1);

  // Maximum turret envelope for reference outline (7x7x7 on Large, 7x5x7 on Small)
  const envX = 7;
  const envY = isSmallGrid ? 5 : 7; // In SE, Y is vertical height
  const envZ = 7;

  // Fixed linear unit scale per block (fits in 74x58 viewBox)
  const u = 3.0;
  const cx = 37;
  const cy = 52;

  // Reference max bounding cage vertices (deck = X & Z, vertical = Y)
  const cdx = envX * u;
  const cdz = envZ * u;
  const cdy = envY * u;

  const cp0 = [cx, cy];
  const cp1 = [cx + cdx, cy - cdx * 0.5];
  const cp2 = [cx - cdz, cy - cdz * 0.5];
  const cp3 = [cx + cdx - cdz, cy - (cdx + cdz) * 0.5];

  const ct0 = [cx, cy - cdy];
  const ct1 = [cx + cdx, cy - cdy - cdx * 0.5];
  const ct2 = [cx - cdz, cy - cdy - cdz * 0.5];
  const ct3 = [cx + cdx - cdz, cy - cdy - (cdx + cdz) * 0.5];

  const cageSvg = `
    <g class="voxel-blueprint-cage" title="Max Turret Reference Envelope: ${envY}H × ${envX}W × ${envZ}L">
      <polygon points="${cp0[0]},${cp0[1]} ${cp1[0]},${cp1[1]} ${ct1[0]},${ct1[1]} ${ct0[0]},${ct0[1]}" />
      <polygon points="${cp0[0]},${cp0[1]} ${cp2[0]},${cp2[1]} ${ct2[0]},${ct2[1]} ${ct0[0]},${ct0[1]}" />
      <polygon points="${ct0[0]},${ct0[1]} ${ct1[0]},${ct1[1]} ${ct3[0]},${ct3[1]} ${ct2[0]},${ct2[1]}" />
      <line x1="${cp3[0]}" y1="${cp3[1]}" x2="${ct3[0]}" y2="${ct3[1]}" stroke-dasharray="2 2" />
    </g>
  `;

  // Current weapon linearly scaled inside the cage (ground plane X & Z, vertical height Y)
  const dx = Math.min(cdx, x * u);
  const dz = Math.min(cdz, z * u);
  const dy = Math.min(cdy, y * u);

  const p0 = [cx, cy];
  const p1 = [cx + dx, cy - dx * 0.5];
  const p2 = [cx - dz, cy - dz * 0.5];
  const p3 = [cx + dx - dz, cy - (dx + dz) * 0.5];

  const t0 = [cx, cy - dy];
  const t1 = [cx + dx, cy - dy - dx * 0.5];
  const t2 = [cx - dz, cy - dy - dz * 0.5];
  const t3 = [cx + dx - dz, cy - dy - (dx + dz) * 0.5];

  const topFace = `${t0[0]},${t0[1]} ${t1[0]},${t1[1]} ${t3[0]},${t3[1]} ${t2[0]},${t2[1]}`;
  const leftFace = `${p0[0]},${p0[1]} ${t0[0]},${t0[1]} ${t2[0]},${t2[1]} ${p2[0]},${p2[1]}`;
  const rightFace = `${p0[0]},${p0[1]} ${t0[0]},${t0[1]} ${t1[0]},${t1[1]} ${p1[0]},${p1[1]}`;

  pillarVoxelBlueprint.innerHTML = `
    <div class="voxel-blueprint-wrap" title="Voxel Footprint: ${y}H × ${x}W × ${z}L (${volBlocks} blocks). Ensure sufficient clearance to prevent summoning Clang into your chassis.">
      <svg class="voxel-blueprint-svg" viewBox="0 0 74 58">
        ${cageSvg}
        <polygon points="${leftFace}" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" stroke-width="1.2"/>
        <polygon points="${rightFace}" fill="rgba(56, 189, 248, 0.45)" stroke="#38bdf8" stroke-width="1.2"/>
        <polygon points="${topFace}" fill="rgba(56, 189, 248, 0.65)" stroke="#38bdf8" stroke-width="1.2"/>
      </svg>
      <span class="voxel-block-tag">${volBlocks} BLK${volBlocks > 1 ? 'S' : ''}</span>
    </div>
  `;
}

// ==========================================================================
// TELEMETRY & COMBAT CALCULATOR
// ==========================================================================

/// <summary>
/// Finds the highest DamageScales.Armor multiplier (Heavy / Light / Non-Armor; WC treats any value < 0 as unset = 1.0).
/// Two-way ties join labels; all-equal reports "All Targets". Grid scales live in getEffectiveProfile.
/// </summary>
function getTopArmorProfile(ds = {}) {
  const v = (x) => (typeof x === 'number' && x >= 0) ? x : 1.0;
  const armorMult = v(ds.armorArmor);
  const heavy = v(ds.heavyArmor) * armorMult;
  const light = v(ds.lightArmor) * armorMult;
  const nonArmor = v(ds.nonArmor);
  const max = Math.max(heavy, light, nonArmor);
  const names = [];
  if (heavy === max) names.push('Heavy Armor');
  if (light === max) names.push('Light Armor');
  if (nonArmor === max) names.push('Non-Armor (Systems)');
  const allEqual = (names.length === 3);
  const label = allEqual ? 'All Blocks' : names.join(' & ');
  return { label, mult: max, allEqual, isHeavy: heavy === max, isLight: light === max, isNonArmor: nonArmor === max };
}

/// <summary>
/// Computes paper (unmultiplied) sustained DPS and cycle stats from the workbench inputs.
/// Shared by telemetry, TTK and radar so paper vs effective never double-apply the multiplier.
/// </summary>
function computeSustainedDps() {
  const fp = getFireCycleParams(activeWeapon, activeAmmo, true);
  const cyc = computeFireCycle(fp);
  const { totalRounds, projectiles, bursts, spoolSec, fireDurationSec, reloadSec, totalCycleSec, effectiveRps } = cyc;
  const dmgDetails = getAmmoDamageDetailed(activeAmmo, 0, activeWeapon);
  const alphaVolley = Math.round(dmgDetails.instantTotal * projectiles);

  const sustainedDps = isDetonationWeapon(activeWeapon) ? 0
    : computeSteadyStateDps(dmgDetails, effectiveRps, (activeWeapon && activeWeapon.maxActiveProjectiles) || 0);

  return {
    rof: fp.rof, barrels: fp.barrels, magSize: fp.magSize, magsToLoad: fp.mags, totalRounds, sustainedDps, effectiveRps,
    totalCycleSec, fireDurationSec, reloadSec, spoolSec, bursts, alphaVolley, dmgDetails,
    heatLimited: cyc.heatLimited, stallShare: cyc.stallShare, fireParams: fp
  };
}

function updateCombatTelemetry() {
  if (!activeWeapon || !activeAmmo) return;

  const { rof, barrels, magSize, magsToLoad, totalRounds, sustainedDps, effectiveRps, totalCycleSec, fireDurationSec, reloadSec, spoolSec, bursts, alphaVolley, dmgDetails, fireParams, stallShare } = computeSustainedDps();
  const muzzleSpeed = parseFloat(tDesiredSpeed?.value) || 0;
  const isDetonation = isDetonationWeapon(activeWeapon);
  const isBeam = !isDetonation && (isBeamWeapon(activeWeapon, activeAmmo) || muzzleSpeed >= 10000 || muzzleSpeed <= 0);

  // Target modifiers: WC scales the whole payload (base pool, ByBlockHit, EndOfLife) by each ammo's per-block
  // damageScale; BaseDamageCutoff only spreads the pool across more blocks, it does not change the total.
  const ds = activeAmmo.damageScales || {};
  // NoGridOrArmorScaling skips every armor multiplier (AmmoConstants.DamageScales)
  const armorOn = !activeAmmo.noGridOrArmorScaling;
  const armorMult = (armorOn && typeof ds.armorArmor === 'number' && ds.armorArmor >= 0) ? ds.armorArmor : 1.0;
  const heavyMult = ((armorOn && typeof ds.heavyArmor === 'number' && ds.heavyArmor >= 0) ? ds.heavyArmor : 1.0) * armorMult;
  const lightMult = ((armorOn && typeof ds.lightArmor === 'number' && ds.lightArmor >= 0) ? ds.lightArmor : 1.0) * armorMult;
  const nonArmorMult = (armorOn && typeof ds.nonArmor === 'number' && ds.nonArmor >= 0) ? ds.nonArmor : 1.0;
  const perHit = dmgDetails.perBlockBase;
  const capNote = dmgDetails.cutoff > 0 ? `capped ${Math.round(perHit).toLocaleString()}/hit` : '';
  const topProfile = getEffectiveProfile(dmgDetails, activeWeapon);

  const heavyDmg = topProfile.perClass.heavy;
  const heavyVolley = Math.round(heavyDmg * totalRounds);

  const lightDmg = topProfile.perClass.light;
  const lightVolley = Math.round(lightDmg * totalRounds);

  const nonArmorDmg = topProfile.perClass.nonArmor;
  const nonArmorVolley = Math.round(nonArmorDmg * totalRounds);

  // Blast stats: he = real explosive, screen = anti-projectile burst (no block damage), ewar = WC effect
  let blastKind = 'none';
  const aEwar = (activeAmmo.ewar && activeAmmo.ewar.enable) ? activeAmmo.ewar : null;
  let blastRadius = 0;
  let blastDepth = 0;
  // Raw def damage of the area effect (Pooled = total pool; other falloffs = full damage per block in radius)
  let blastDmg = 0;
  if (aEwar) {
    blastKind = 'ewar';
    blastRadius = aEwar.radius || 0;
    blastDmg = 0;
  } else if (activeAmmo.areaOfDamage) {
    const aod = activeAmmo.areaOfDamage;
    const bbh = (aod.byBlockHit && aod.byBlockHit.enable) ? aod.byBlockHit : null;
    const eol = (aod.endOfLife && aod.endOfLife.enable) ? aod.endOfLife : null;
    const ae = (aod.areaEffect && aod.areaEffect.areaEffect) ? aod.areaEffect : null;
    blastRadius = (eol ? eol.radius : 0) || (bbh ? bbh.radius : 0) || (ae ? ae.radius : 0);
    blastDepth = (eol ? eol.depth : 0) || (bbh ? bbh.depth : 0) || (ae ? ae.radius : 0);
    blastDmg = Math.max(eol ? (eol.damage || 0) : 0, bbh ? (bbh.damage || 0) : 0, ae ? (ae.damage || 0) : 0);
  }
  if (blastRadius >= 10 && isAntiProjectileArea(activeAmmo, { damage: blastDmg })) {
    // Token-damage wide burst (Flak PROX): anti-projectile screen, no real explosive payload
    blastKind = 'screen';
    blastDmg = 0;
  }

  // Update Hero Metrics (scaled by currentBatteryMultiplier)
  const bMult = currentBatteryMultiplier || 1;
  const baseEffectiveDps = Math.round(sustainedDps * topProfile.mult);
  const scaledEffectiveDps = baseEffectiveDps * bMult;
  const baseEffectiveAlpha = Math.round(alphaVolley * topProfile.mult);
  const scaledEffectiveAlpha = baseEffectiveAlpha * bMult;
  const scaledSustainedDps = Math.round(sustainedDps * bMult);
  const multTag = (topProfile.allEqual && topProfile.mult === 1.0) ? '' : ` (×${topProfile.mult})`;
  const batteryTag = bMult > 1 ? ` (${bMult}x Array · ${baseEffectiveDps.toLocaleString()}/gun)` : '';
  const batteryAlphaTag = bMult > 1 ? ` (${bMult}x Array · ${baseEffectiveAlpha.toLocaleString()} hp/gun)` : '';

  outSustainedDps.innerHTML = `${scaledEffectiveDps.toLocaleString()} <span class="unit-sub">hp/s</span>`;
  if (teleDpsType) {
    teleDpsType.textContent = `VS ${topProfile.label.toUpperCase()}${bMult > 1 ? ` (${bMult}X)` : ''}`;
  }
  if (outEffectiveDps) {
    if (scaledEffectiveDps === scaledSustainedDps) {
      outEffectiveDps.innerHTML = `<strong>Effective against ${topProfile.label}</strong>${batteryTag}`;
    } else {
      const effPrefix = `Effective against ${topProfile.label}${multTag}`;
      outEffectiveDps.innerHTML = `<strong>${effPrefix}</strong> · Base: ${scaledSustainedDps.toLocaleString()} DPS${batteryTag}`;
    }
  }
  outAlphaDmg.innerHTML = `${scaledEffectiveAlpha.toLocaleString()} <span class="unit-sub">hp</span>`;
  if (teleAlphaType) {
    teleAlphaType.textContent = `VS ${topProfile.label.toUpperCase()}${bMult > 1 ? ` (${bMult}X)` : ''}`;
  }
  const teleAlphaUnit = document.getElementById('teleAlphaUnit');
  if (teleAlphaUnit) {
    const totalMags = magsToLoad * bMult;
    teleAlphaUnit.textContent = `(${totalMags} ${totalMags === 1 ? 'MAG' : 'MAGS'})`;
  }
  if (outEffectiveAlpha) {
    const magTag = `${magsToLoad * bMult} loaded ${magsToLoad * bMult === 1 ? 'mag' : 'mags'}${totalRounds * bMult > 1 ? ` · ${totalRounds * bMult} rds` : ''}`;
    const scaledBaseVolley = Math.round(alphaVolley * bMult);
    if (scaledEffectiveAlpha === scaledBaseVolley) {
      outEffectiveAlpha.textContent = `${magTag}${batteryAlphaTag}`;
    } else {
      outEffectiveAlpha.textContent = `Base Volley: ${scaledBaseVolley.toLocaleString()} hp${batteryAlphaTag} · ${magTag}`;
    }
  }

  // Render Pillar 1 Hero Micro-Visuals
  renderDpsCompositionStrip(dmgDetails, isBeam);
  // Charged bolt: HybridRound whose area payload outweighs its kinetic core
  const isPlasma = Boolean(activeAmmo.hybridRound) && dmgDetails.aoe > dmgDetails.base;
  renderAlphaSalvoCluster(totalRounds, isBeam, isPlasma, isDetonation);

  // Damage Per Shot & Payload Breakdown
  const shotTotalDmg = Math.round(dmgDetails.total * bMult);
  if (outDamagePerShot) {
    outDamagePerShot.innerHTML = `${shotTotalDmg.toLocaleString()} <span class="unit-sub">hp</span>${bMult > 1 ? ` (${Math.round(dmgDetails.total).toLocaleString()}/gun)` : ''}`;
  }
  if (outDpsBreakdown) {
    if (dmgDetails.deliverySec > 1.0) {
      outDpsBreakdown.textContent = `Loiter: ${dmgDetails.deliverySec.toFixed(0)}s deploy window · Initial: ${Math.round(dmgDetails.instantTotal).toLocaleString()} hp`;
    } else if (dmgDetails.aoe > 0 || dmgDetails.frag > 0) {
      outDpsBreakdown.textContent = `Direct: ${Math.round(dmgDetails.base).toLocaleString()} | Blast: ${Math.round(dmgDetails.aoe).toLocaleString()} | Frag: ${Math.round(dmgDetails.frag).toLocaleString()}`;
    } else if (heavyMult !== 1.0 || lightMult !== 1.0) {
      outDpsBreakdown.textContent = `Heavy: ${Math.round(heavyDmg).toLocaleString()} (${heavyMult}×) | Light: ${Math.round(lightDmg).toLocaleString()} (${lightMult}×)`;
    } else if (dmgDetails.cutoff > 0) {
      outDpsBreakdown.textContent = `Direct: ${Math.round(dmgDetails.base).toLocaleString()} hp · Kinetic AP (Cutoff: ${dmgDetails.cutoff.toLocaleString()})`;
    } else {
      outDpsBreakdown.textContent = `Direct: ${Math.round(dmgDetails.base).toLocaleString()} hp · Single-hit kinetic`;
    }
  }
  const effectiveRpm = Math.round(effectiveRps * 60);
  if (totalRounds === 1 && reloadSec > 0) {
    if (lblEffectiveRpm) lblEffectiveRpm.textContent = "CYCLE INTERVAL";
    outShotsPerSec.innerHTML = `${totalCycleSec.toFixed(1)}s <span style="font-size: 14px; font-weight: 400;">${spoolSec > 0 ? 'SPOOL + RELOAD' : 'RELOAD'}</span>`;
    const sustainedRpmStr = `${(60 / totalCycleSec).toFixed(1)} RPM`;
    outCycleTime.textContent = `Single-shot breech · ${sustainedRpmStr} sustained`;
  } else {
    if (lblEffectiveRpm) lblEffectiveRpm.textContent = "EFFECTIVE RPM";
    outShotsPerSec.innerHTML = `${effectiveRpm.toLocaleString()} <span style="font-size: 14px; font-weight: 400;">RPM</span>`;
    outCycleTime.textContent = `Burst: ${Math.round(rof).toLocaleString()} RPM (${effectiveRps.toFixed(1)} sps sustained)`;
  }

  // Update Target Damage & Multiplier Matrix
  if (tmPenetrationChip) {
    if (dmgDetails.cutoff > 0) {
      tmPenetrationChip.textContent = `🪡 Overpen: ${dmgDetails.penBlocks} blocks @ ${Math.round(dmgDetails.perBlockBase).toLocaleString()} hp`;
      tmPenetrationChip.style.display = 'inline-flex';
    } else {
      tmPenetrationChip.style.display = 'none';
    }
  }
  const isHeavyZero = heavyDmg <= 0.001 || heavyMult <= 0.001;
  const isLightZero = lightDmg <= 0.001 || lightMult <= 0.001;
  const isNonArmorZero = nonArmorDmg <= 0.001 || nonArmorMult <= 0.001;

  if (tmHeavyMult) {
    tmHeavyMult.textContent = isHeavyZero ? (heavyMult <= 0.001 ? '0.0× (Immune)' : `${heavyMult.toFixed(1)}× (0 hp)`) : `${heavyMult.toFixed(1)}×`;
    tmHeavyMult.className = `target-multiplier-badge ${isHeavyZero ? 'zero' : (heavyMult > 1.0 ? 'buff' : (heavyMult < 1.0 ? 'nerf' : ''))}`;
  }
  if (tmHeavyDmg) {
    tmHeavyDmg.innerHTML = isHeavyZero ? `0 <span class="unit">hp / shot</span>` : `${Math.round(heavyDmg).toLocaleString()} <span class="unit">hp / shot</span>`;
  }
  if (tmHeavySub) {
    tmHeavySub.textContent = isHeavyZero ? (heavyMult <= 0.001 ? 'Immune to Direct Damage' : 'Zero Direct Damage') : `Volley: ${(heavyVolley * bMult).toLocaleString()} hp${capNote ? ' | ' + capNote : ''}`;
  }

  if (tmLightMult) {
    tmLightMult.textContent = isLightZero ? (lightMult <= 0.001 ? '0.0× (Immune)' : `${lightMult.toFixed(1)}× (0 hp)`) : `${lightMult.toFixed(1)}×`;
    tmLightMult.className = `target-multiplier-badge ${isLightZero ? 'zero' : (lightMult > 1.0 ? 'buff' : (lightMult < 1.0 ? 'nerf' : ''))}`;
  }
  if (tmLightDmg) {
    tmLightDmg.innerHTML = isLightZero ? `0 <span class="unit">hp / shot</span>` : `${Math.round(lightDmg).toLocaleString()} <span class="unit">hp / shot</span>`;
  }
  if (tmLightSub) {
    tmLightSub.textContent = isLightZero ? (lightMult <= 0.001 ? 'Immune to Direct Damage' : 'Zero Direct Damage') : `Volley: ${(lightVolley * bMult).toLocaleString()} hp${capNote ? ' | ' + capNote : ''}`;
  }

  if (tmNonArmorMult) {
    tmNonArmorMult.textContent = isNonArmorZero ? (nonArmorMult <= 0.001 ? '0.0× (Immune)' : `${nonArmorMult.toFixed(1)}× (0 hp)`) : `${nonArmorMult.toFixed(1)}×`;
    tmNonArmorMult.className = `target-multiplier-badge ${isNonArmorZero ? 'zero' : (nonArmorMult > 1.0 ? 'buff' : (nonArmorMult < 1.0 ? 'nerf' : ''))}`;
  }
  if (tmNonArmorDmg) {
    tmNonArmorDmg.innerHTML = isNonArmorZero ? `0 <span class="unit">hp / shot</span>` : `${Math.round(nonArmorDmg).toLocaleString()} <span class="unit">hp / shot</span>`;
  }
  if (tmNonArmorSub) {
    tmNonArmorSub.textContent = isNonArmorZero ? (nonArmorMult <= 0.001 ? 'Immune to Direct Damage' : 'Zero Direct Damage') : `Volley: ${(nonArmorVolley * bMult).toLocaleString()} hp${capNote ? ' | ' + capNote : ''}`;
  }

  // Highlight highest damage per shot block type (or explosive box if real AoE blast)
  const tmHeavyArmorBox = document.getElementById('tmHeavyArmorBox');
  const tmLightArmorBox = document.getElementById('tmLightArmorBox');
  const tmNonArmorBox = document.getElementById('tmNonArmorBox');
  const tmBlastBox = document.getElementById('tmBlastBox');
  if (tmHeavyArmorBox) tmHeavyArmorBox.classList.toggle('zero-damage', isHeavyZero);
  if (tmLightArmorBox) tmLightArmorBox.classList.toggle('zero-damage', isLightZero);
  if (tmNonArmorBox) tmNonArmorBox.classList.toggle('zero-damage', isNonArmorZero);

  const maxArmorMult = Math.max(heavyMult, lightMult, nonArmorMult);
  const maxTargetDmg = Math.max(heavyDmg, lightDmg, nonArmorDmg);
  const isArmorEqual = Math.abs(heavyDmg - lightDmg) < 0.1 && Math.abs(lightDmg - nonArmorDmg) < 0.1;
  const hasRealBlast = blastRadius > 0 && blastDmg > 10 && blastKind !== 'ewar' && blastKind !== 'screen';
  const isBlastPrimary = hasRealBlast && maxArmorMult <= 1.001;

  // Intercept Lethality (HealthHitModifier) & Dynamic 4th Card
  const hhm = (ds.healthHitModifier !== undefined && ds.healthHitModifier > 0)
    ? ds.healthHitModifier
    : (ds.HealthHitModifier !== undefined && ds.HealthHitModifier > 0 ? ds.HealthHitModifier : 1);
  const canTargetProjectiles = Boolean(activeWeapon.pdProjectiles || (activeWeapon.helpers?.targeting && activeWeapon.helpers.targeting.includes('PD')));
  const isDirectIntercept = !hasRealBlast && blastKind !== 'screen' && blastKind !== 'ewar' && canTargetProjectiles && hhm >= 1;
  const isCardInactive = !hasRealBlast && blastKind !== 'screen' && blastKind !== 'ewar' && !isDirectIntercept;

  if (tmBlastBox) tmBlastBox.classList.toggle('zero-damage', isCardInactive);

  if (isBlastPrimary) {
    if (tmHeavyArmorBox) tmHeavyArmorBox.classList.remove('top-damage');
    if (tmLightArmorBox) tmLightArmorBox.classList.remove('top-damage');
    if (tmNonArmorBox) tmNonArmorBox.classList.remove('top-damage');
    if (tmBlastBox) tmBlastBox.classList.add('top-damage');
  } else if (blastKind === 'screen') {
    // Flak screen: primary function is anti-munition area denial
    if (tmHeavyArmorBox) tmHeavyArmorBox.classList.remove('top-damage');
    if (tmLightArmorBox) tmLightArmorBox.classList.remove('top-damage');
    if (tmNonArmorBox) tmNonArmorBox.classList.remove('top-damage');
    if (tmBlastBox) tmBlastBox.classList.add('top-damage');
  } else {
    if (tmBlastBox) tmBlastBox.classList.remove('top-damage');
    if (tmHeavyArmorBox) tmHeavyArmorBox.classList.toggle('top-damage', !isHeavyZero && !isArmorEqual && Math.abs(heavyDmg - maxTargetDmg) < 0.1);
    if (tmLightArmorBox) tmLightArmorBox.classList.toggle('top-damage', !isLightZero && !isArmorEqual && Math.abs(lightDmg - maxTargetDmg) < 0.1);
    if (tmNonArmorBox) tmNonArmorBox.classList.toggle('top-damage', !isNonArmorZero && !isArmorEqual && Math.abs(nonArmorDmg - maxTargetDmg) < 0.1);
  }

  const tmTitleElem = tmBlastTitle || (tmBlastBox ? tmBlastBox.querySelector('.target-type-name') : null);
  if (tmTitleElem) {
    if (blastKind === 'ewar') {
      tmTitleElem.textContent = '🧿 EWAR / EMP Pulse';
    } else if (blastKind === 'screen' || isDirectIntercept) {
      tmTitleElem.textContent = '🎯 Point Defense';
    } else {
      tmTitleElem.textContent = '💥 Blast / Splash';
    }
  }

  const detFrag = isDetonation && activeAmmo.fragment && activeAmmo.fragment.enable ? activeAmmo.fragment : null;
  const detReach = isDetonation ? getEngagementRange(activeWeapon, activeAmmo, true).range : 0;
  if (tmBlastRadius) {
    if (detFrag) {
      tmBlastRadius.textContent = `${Math.round(detReach)}m Burst`;
      tmBlastRadius.className = 'target-multiplier-badge special';
    } else if (blastKind === 'ewar' && blastRadius > 0) {
      tmBlastRadius.textContent = `🧿 ${ewarTypeLabel(aEwar.type)} ${Math.round(blastRadius)}m`;
      tmBlastRadius.className = 'target-multiplier-badge special';
    } else if (blastKind === 'screen' && blastRadius > 0) {
      const radStr = blastRadius >= 100 ? `${Math.round(blastRadius)}m Radius` : `${blastRadius.toFixed(1)}m Radius`;
      tmBlastRadius.textContent = radStr;
      tmBlastRadius.className = 'target-multiplier-badge special';
    } else if (isDirectIntercept) {
      tmBlastRadius.textContent = 'Direct Hit';
      tmBlastRadius.className = 'target-multiplier-badge special';
    } else if (blastRadius > 0 && hasRealBlast) {
      tmBlastRadius.textContent = `${blastRadius.toFixed(1)}m Radius`;
      tmBlastRadius.className = 'target-multiplier-badge special';
    } else {
      tmBlastRadius.textContent = 'None';
      tmBlastRadius.className = 'target-multiplier-badge zero';
    }
  }
  if (tmBlastDmg) {
    if (detFrag) {
      tmBlastDmg.innerHTML = `${Math.round(dmgDetails.frag).toLocaleString()} <span class="unit">hp max</span>`;
    } else if (blastKind === 'screen') {
      tmBlastDmg.innerHTML = `${hhm} <span class="unit">PD hp / target</span>`;
    } else if (hasRealBlast) {
      tmBlastDmg.innerHTML = `${Math.round(blastDmg).toLocaleString()} <span class="unit">hp / shot</span>`;
    } else if (isDirectIntercept) {
      tmBlastDmg.innerHTML = `${hhm} <span class="unit">PD hp / hit</span>`;
    } else {
      tmBlastDmg.innerHTML = `0 <span class="unit">hp / shot</span>`;
    }
  }
  if (tmBlastSub) {
    if (detFrag) {
      const each = detFrag.fragments > 0 ? Math.round(dmgDetails.frag / detFrag.fragments) : 0;
      tmBlastSub.textContent = `${detFrag.fragments} fragments × ${each.toLocaleString()} hp, ${detFrag.degrees}° spread (max if all hit)`;
    } else if (blastKind === 'ewar') {
      tmBlastSub.textContent = 'EWAR effect — disables target systems (no block damage)';
    } else if (blastKind === 'screen') {
      tmBlastSub.textContent = describePdKills(activeAmmo, 'bursts') || 'Anti-projectile burst (no block damage)';
    } else if (hasRealBlast) {
      const aod = activeAmmo.areaOfDamage || {};
      const area = (aod.endOfLife && aod.endOfLife.enable) ? aod.endOfLife : ((aod.byBlockHit && aod.byBlockHit.enable) ? aod.byBlockHit : {});
      const falloff = area.falloff || 'Pooled';
      const tip = falloff === 'Pooled'
        ? 'Pooled AoE: Like misery, damage is shared equally across all blocks in the blast radius until the pool runs dry.'
        : `${falloff} AoE: every block within ${area.radius} m (depth ${area.depth} m) takes the listed damage scaled by ${falloff} falloff (≈${Math.round(WcMath.aoeDamage(area, 'Large', false)).toLocaleString()} hp total on a solid large-grid hull).`;
      tmBlastSub.innerHTML = `<span class="pooled-tooltip" title="${tip}">Area Detonation (${falloff} Damage) ℹ️</span>`;
    } else if (isDirectIntercept) {
      tmBlastSub.textContent = describePdKills(activeAmmo, 'hits') || `${hhm} PD HP subtracted per hit`;
    } else {
      tmBlastSub.textContent = dmgDetails.total <= 0 ? 'No Damage Payload (sensor / utility round)' : 'Direct Kinetic Penetration Only';
    }
  }

  // Blast trigger & depth detail lines (folded into tmBlastBox sub-rows)
  if (tmBlastTrigger) {
    if (blastKind === 'ewar' && blastRadius > 0) {
      tmBlastTrigger.textContent = `🧿 ${ewarTypeLabel(aEwar.type)} Scrambler`;
      tmBlastTrigger.style.display = '';
    } else {
      tmBlastTrigger.style.display = 'none';
    }
  }

  if (tmBlastDepth) {
    if (hasRealBlast) {
      const poolStr = blastDmg > 0
        ? `${Math.round(blastDmg * bMult).toLocaleString()} HP Pool${bMult > 1 ? ` (${bMult}×)` : ''}`
        : '';
      const depthStr = blastDepth > 0 ? `${blastDepth.toFixed(1)}m Depth` : 'Surface Blast';
      tmBlastDepth.textContent = depthStr + (poolStr ? ` (${poolStr})` : '');
      tmBlastDepth.style.display = '';
    } else {
      tmBlastDepth.style.display = 'none';
    }
  }

  // Traverse Speed & Angular Tracking (Pillar 2)
  const rotRad = parseFloat(wRotateRate.value) || 0;
  const elRad = parseFloat(wElevateRate.value) || 0;
  const rotDegSec = (rotRad * 60 * 180 / Math.PI).toFixed(1);
  const elDegSec = (elRad * 60 * 180 / Math.PI).toFixed(1);
  const isFixedMount = rotRad <= 0 && elRad <= 0;
  const arcInfo = getWeaponArcSummary(activeWeapon);

  if (outTraverseDeg) {
    if (isFixedMount) {
      outTraverseDeg.innerHTML = `Fixed Mount`;
    } else if (rotDegSec === elDegSec) {
      outTraverseDeg.innerHTML = `${rotDegSec}&deg;<span class="unit-sub">/s</span>`;
    } else {
      outTraverseDeg.innerHTML = `Az: ${rotDegSec}&deg;/s <span style="opacity:0.35;">|</span> El: ${elDegSec}&deg;/s`;
    }
  }
  if (outTraverseAzEl) {
    outTraverseAzEl.textContent = isFixedMount ? 'Rigid Forward Mount' : (arcInfo.isGimbal ? 'Gimbal Traverse Cone' : 'Dual-Axis Turret Slew');
  }

  // Header badges for Pillar 2 (Depression & Recoil)
  const badgeDepression = document.getElementById('badgeDepression');
  if (badgeDepression) {
    if (arcInfo.hasDepression) {
      badgeDepression.textContent = '📐 Good Depression';
      badgeDepression.title = `Downward clearance: ${arcInfo.minEl}° (For when life, terrain, and sim-speed go downhill)`;
      badgeDepression.style.display = 'inline-flex';
    } else {
      badgeDepression.style.display = 'none';
    }
  }
  const recoilInfo = getWeaponRecoilWarning(activeWeapon, activeAmmo);
  const badgeRecoil = document.getElementById('badgeRecoil');
  if (badgeRecoil) {
    if (recoilInfo.showRecoil) {
      badgeRecoil.textContent = recoilInfo.text;
      badgeRecoil.title = recoilInfo.tooltip || 'Chassis recoil impulse';
      badgeRecoil.className = 'badge badge-red pillar-header-badge';
      badgeRecoil.style.display = 'inline-flex';
    } else {
      badgeRecoil.style.display = 'none';
    }
  }
  const badgeTerrainCruise = document.getElementById('badgeTerrainCruise');
  const terrainNotice = getMunitionTerrainClearance(activeAmmo);
  if (badgeTerrainCruise) {
    if (terrainNotice) {
      const elev = terrainNotice.elevation;
      badgeTerrainCruise.textContent = `🏔️ ${Math.round(elev)}m Cruise`;
      badgeTerrainCruise.title = `${terrainNotice.text} — Assumes Keen's voxel collision solver doesn't phase you into the planet core today.`;
      badgeTerrainCruise.style.display = 'inline-flex';
    } else {
      badgeTerrainCruise.style.display = 'none';
    }
  }
  const ammoHealth = activeAmmo.health || 0;
  if (badgeMunitionHealth) {
    if (ammoHealth > 0) {
      if (ammoHealth >= 150) {
        badgeMunitionHealth.textContent = `🛡️ ${ammoHealth} HP Heavy Hull`;
        badgeMunitionHealth.title = `Heavy Armored Munition: Absorbs ${ammoHealth} point-defense damage${describePdSurvival(activeAmmo)} before dying.`;
        badgeMunitionHealth.className = 'badge badge-cyan pillar-header-badge';
      } else if (ammoHealth >= 100) {
        badgeMunitionHealth.textContent = `🛡️ ${ammoHealth} HP Armored Hull`;
        badgeMunitionHealth.title = `Armored Munition: Absorbs ${ammoHealth} PD damage${describePdSurvival(activeAmmo)}.`;
        badgeMunitionHealth.className = 'badge badge-cyan pillar-header-badge';
      } else if (ammoHealth >= 15) {
        badgeMunitionHealth.textContent = `🛡️ ${ammoHealth} HP Reinforced Hull`;
        badgeMunitionHealth.title = `Reinforced Munition: Absorbs ${ammoHealth} PD damage${describePdSurvival(activeAmmo)}.`;
        badgeMunitionHealth.className = 'badge badge-green pillar-header-badge';
      } else if (ammoHealth >= 5) {
        badgeMunitionHealth.textContent = `🛡️ ${ammoHealth} HP Light Munition`;
        badgeMunitionHealth.title = `Light Munition: Absorbs ${ammoHealth} PD damage${describePdSurvival(activeAmmo)} before destruction.`;
        badgeMunitionHealth.className = 'badge badge-amber pillar-header-badge';
      } else {
        badgeMunitionHealth.textContent = `🛡️ ${ammoHealth} HP Fragile Munition`;
        badgeMunitionHealth.title = `Fragile Munition: Absorbs ${ammoHealth} PD damage${describePdSurvival(activeAmmo)}.`;
        badgeMunitionHealth.className = 'badge badge-red pillar-header-badge';
      }
      badgeMunitionHealth.style.display = 'inline-flex';
    } else {
      badgeMunitionHealth.style.display = 'none';
    }
  }

  // Max Engagement Range & Velocity Preview (Pillar 2)
  const engagement = getEngagementRange(activeWeapon, activeAmmo, true);
  const isTrackingWeapon = engagement.gated;
  const maxEngagementRange = engagement.range;
  if (outMaxRange) {
    outMaxRange.innerHTML = `${Math.round(maxEngagementRange).toLocaleString()} <span class="unit-sub">m</span>`;
  }
  if (outMaxRangeSource) outMaxRangeSource.textContent = engagement.label;

  if (outMuzzleVelocityPreview) {
    outMuzzleVelocityPreview.innerHTML = isDetonation ? 'Static' : isBeam
      ? `⚡ Hitscan <span class="unit-sub">(c)</span>`
      : `${Math.round(muzzleSpeed).toLocaleString()} <span class="unit-sub">m/s</span>`;
  }
  if (outFlightDelay1km) {
    const flightDist = maxEngagementRange;
    const flightTime = muzzleSpeed > 0 ? (flightDist / muzzleSpeed).toFixed(2) : '0.00';
    outFlightDelay1km.textContent = isDetonation
      ? 'Fragments burst from the block'
      : isBeam
      ? `Flight to ${Math.round(flightDist).toLocaleString()}m: 0.00s (Instant hit)`
      : (muzzleSpeed > 0 ? `Flight to ${Math.round(flightDist).toLocaleString()}m: ${flightTime}s` : 'Instantaneous hit');
  }
  if (outMunitionDurability) {
    if (ammoHealth > 0) {
      outMunitionDurability.innerHTML = `<span title="Interception Durability: Munition absorbs ${ammoHealth} PD damage before destruction.">🛡️ Munition Durability: <strong style="color: var(--cyan-primary);">${ammoHealth} HP</strong></span>`;
    } else {
      outMunitionDurability.innerHTML = `<span title="Untargetable by Point Defense: Kinetic shells, railgun slugs, and energy beams cannot be targeted or intercepted in flight.">🛡️ Interception: <span style="color: var(--text-muted);">Untargetable (PD Immune)</span></span>`;
    }
  }

  // Render Pillar 2 Hero Micro-Visuals
  renderRangeVisual(maxEngagementRange, isTrackingWeapon, isDetonation);
  renderPropulsionVector(activeWeapon, activeAmmo, isBeam);

  const outPillarArcSummary = document.getElementById('outPillarArcSummary');
  if (outPillarArcSummary) outPillarArcSummary.textContent = arcInfo.text;
  const outPillarDepressionNote = document.getElementById('outPillarDepressionNote');
  if (outPillarDepressionNote) {
    outPillarDepressionNote.textContent = arcInfo.note;
  }

  // Accuracy & Fire Gate (Pillar 2 Handling)
  const devAngle = (activeWeapon.deviateShotAngle !== undefined && activeWeapon.deviateShotAngle !== null)
    ? activeWeapon.deviateShotAngle
    : (parseFloat(wDeviateAngle?.value) || 0);
  const aimTol = (activeWeapon.aimingTolerance !== undefined && activeWeapon.aimingTolerance !== null)
    ? activeWeapon.aimingTolerance
    : (parseFloat(wAimingTolerance?.value) || 0);
  const addTolToTrack = activeWeapon.addToleranceToTracking !== undefined
    ? activeWeapon.addToleranceToTracking
    : (wAddToleranceToTracking?.checked || false);

  if (outShotDeviation) {
    outShotDeviation.innerHTML = `${devAngle.toFixed(2)}&deg;`;
  }
  if (outShotDeviationDetail) {
    if (isBeam && devAngle === 0) {
      outShotDeviationDetail.textContent = 'Pinpoint Coherent Beam';
    } else if (devAngle === 0) {
      outShotDeviationDetail.textContent = 'True Boresight (0.0m spread)';
    } else {
      const spread1km = 1000 * Math.tan(devAngle * Math.PI / 180);
      outShotDeviationDetail.textContent = `±${spread1km.toFixed(1)}m spread @ 1km`;
    }
  }

  if (outAimingTolerance) {
    if (!isTrackingWeapon && !activeWeapon.rotateRate) {
      outAimingTolerance.innerHTML = `Fixed`;
    } else {
      outAimingTolerance.innerHTML = `${aimTol.toFixed(1)}&deg;`;
    }
  }
  if (outAimingToleranceDetail) {
    if (!isTrackingWeapon && !activeWeapon.rotateRate) {
      outAimingToleranceDetail.textContent = 'Rigid mount (Boresight only)';
    } else if (addTolToTrack) {
      outAimingToleranceDetail.textContent = `Tracks to cone edge (±${aimTol.toFixed(1)}°)`;
    } else if (aimTol <= 0.5) {
      outAimingToleranceDetail.textContent = `High-Precision Gate (±${aimTol.toFixed(1)}°)`;
    } else if (aimTol >= 30) {
      outAimingToleranceDetail.textContent = `Wide Snap-Fire (±${aimTol.toFixed(1)}°)`;
    } else {
      outAimingToleranceDetail.textContent = `Fires within ±${aimTol.toFixed(1)}° of lead pip`;
    }
  }

  // Handling Row 4: Recoil Impulse & Trigger Latency (Battery Scaled)
  const outRecoilImpulse = document.getElementById('outRecoilImpulse');
  const outRecoilImpulseDetail = document.getElementById('outRecoilImpulseDetail');
  if (outRecoilImpulse) {
    const kickKn = (recoilInfo.kickKn || 0) * bMult;
    if (kickKn <= 0) {
      outRecoilImpulse.innerHTML = `0 <span class="unit-sub">kN</span>`;
      if (outRecoilImpulseDetail) {
        outRecoilImpulseDetail.textContent = 'Zero Kick (Stabilized)';
        outRecoilImpulseDetail.title = 'Clang-Approved: Zero chassis impulse. Physics engine stays dormant.';
      }
    } else if (kickKn < 200) {
      outRecoilImpulse.innerHTML = `${Math.round(kickKn)} <span class="unit-sub">kN</span>`;
      if (outRecoilImpulseDetail) {
        outRecoilImpulseDetail.textContent = bMult > 1 ? `Light Impulse (${Math.round(kickKn / bMult)} kN/gun)` : 'Light Rover Compatible';
        outRecoilImpulseDetail.title = 'Negligible chassis recoil. Suspensions will barely notice.';
      }
    } else if (kickKn < 1000) {
      outRecoilImpulse.innerHTML = `${Math.round(kickKn)} <span class="unit-sub">kN</span>`;
      if (outRecoilImpulseDetail) {
        outRecoilImpulseDetail.textContent = bMult > 1 ? `Moderate Impulse (${Math.round(kickKn / bMult)} kN/gun)` : 'Moderate Suspension Impulse';
        outRecoilImpulseDetail.title = 'Chassis impulse: manage rover center of mass to prevent spinouts or suspension bottoming.';
      }
    } else {
      const kickStr = kickKn >= 10000 ? `${(kickKn / 1000).toFixed(1)} MN` : `${Math.round(kickKn)} kN`;
      outRecoilImpulse.innerHTML = `${kickStr}`;
      if (outRecoilImpulseDetail) {
        outRecoilImpulseDetail.textContent = kickKn >= 20000 ? 'Heavy Suspension Impulse (Roll Hazard)' : 'Moderate Suspension Impulse';
        outRecoilImpulseDetail.title = kickKn >= 20000 ? 'Warning: Broadside firing will flip light rovers or crush suspension blocks into voxels.' : 'Chassis impulse: manage rover center of mass to prevent spinouts or suspension bottoming.';
      }
    }
  }

  const outTriggerLatency = document.getElementById('outTriggerLatency');
  const outTriggerLatencyDetail = document.getElementById('outTriggerLatencyDetail');
  if (outTriggerLatency) {
    const delayTicks = activeWeapon.delayUntilFire || 0;
    if (delayTicks > 0) {
      const delaySec = (delayTicks / 60).toFixed(2);
      outTriggerLatency.innerHTML = `${delaySec} <span class="unit-sub">s</span>`;
      if (outTriggerLatencyDetail) outTriggerLatencyDetail.textContent = `Capacitor Spool (${delayTicks} ticks)`;
    } else {
      outTriggerLatency.innerHTML = `Instant <span class="unit-sub">(0s)</span>`;
      if (outTriggerLatencyDetail) outTriggerLatencyDetail.textContent = 'Zero Trigger Latency';
    }
  }

  // Structural & Power (Pillar 3 Logistics, Battery Scaled)
  const durMod = parseFloat(wDurabilityMod.value) || 0.5;
  const effIntegrity = activeWeapon.effectiveIntegrity || 150000;
  outEffectiveIntegrity.innerHTML = `${Math.round(effIntegrity).toLocaleString()} <span class="unit-sub">hp</span>`;
  outBuildTime.textContent = `Welding: ${Math.round(effIntegrity / balanceMatrix.buildTimeDividend)}s`;

  const techInfo = getTechSummary(activeWeapon.components);
  const baseUps = (activeWeapon.upCost !== undefined && activeWeapon.upCost !== null) ? activeWeapon.upCost : techInfo.upCost;
  const currentUps = baseUps * bMult;
  const massInfo = calculateWeaponDryMass(activeWeapon);
  const totalScaledMassTons = (massInfo.massTons * bMult).toFixed(1);

  const outPillarUps = document.getElementById('outPillarUps');
  if (outPillarUps) outPillarUps.innerHTML = `${currentUps} <span class="unit-sub">UPs</span>`;
  const outPillarUpsDetail = document.getElementById('outPillarUpsDetail');
  if (outPillarUpsDetail) outPillarUpsDetail.textContent = bMult > 1 ? `${bMult}x Array (${baseUps}/gun)` : 'Ship Core Allocation';

  // Cubeblock Dimensions & Volume (Pillar 3 Hero Stat)
  const sz = activeWeapon.size || { x: 1, y: 1, z: 1 };
  const sx = sz.x || 1;
  const sy = sz.y || 1;
  const sz_z = sz.z || 1;
  const volBlocks = sx * sy * sz_z;
  const isSmallGrid = (activeWeapon.gridSize === 'Small' || activeWeapon.grid === 'Small');
  const blockVolM3 = isSmallGrid ? 0.125 : 15.625;
  const totalM3 = (volBlocks * blockVolM3).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const outPillarDimensions = document.getElementById('outPillarDimensions');
  if (outPillarDimensions) {
    outPillarDimensions.innerHTML = `${sy}×${sx}×${sz_z} <span class="unit-sub">H×W×L</span>`;
    outPillarDimensions.title = `Height: ${sy} blk · Width: ${sx} blk · Length: ${sz_z} blk (${volBlocks} total blocks)`;
  }
  const outPillarVolume = document.getElementById('outPillarVolume');
  if (outPillarVolume) {
    outPillarVolume.textContent = `${activeWeapon.gridSize || activeWeapon.grid || 'Large'} Grid · ${totalM3} m³`;
    outPillarVolume.title = `Chassis Envelope: ${volBlocks} blocks (${totalM3} m³ physical displacement)`;
  }

  // Render Pillar 3 Hero Micro-Visuals
  renderTechStack(activeWeapon, bMult);
  renderVoxelBlueprint(sx, sy, sz_z, volBlocks, isSmallGrid);

  // Dry Mass (Pillar 3 Metric Row 3)
  const outPillarMass = document.getElementById('outPillarMass');
  if (outPillarMass) outPillarMass.innerHTML = `${totalScaledMassTons} <span class="unit-sub">t</span>`;
  const outPillarMassDetail = document.getElementById('outPillarMassDetail');
  if (outPillarMassDetail) outPillarMassDetail.textContent = bMult > 1 ? `${massInfo.formatted}/gun` : `Keen Recipe: ${massInfo.formatted}`;

  const idlePwr = parseFloat(wIdlePower.value) || 0.01;
  const energyPerShot = parseFloat(aEnergyCost.value) || 0;
  const trajPB = parseFloat(wTrajectilesPerBarrel.value) || 1;
  // WC SinkPower: IdlePower plus the charge draw of energy / hybrid rounds (plain physical rounds never charge)
  const liveAmmo = Object.assign({}, activeAmmo, { energyCost: energyPerShot, baseDamage: parseFloat(aBaseDamage.value) || 0 });
  const operationalPwrNum = getWeaponPowerDraw(activeWeapon, liveAmmo, { rateOfFire: rof, barrelsPerShot: barrels, trajectilesPerBarrel: trajPB, idlePower: idlePwr }).operational;
  const scaledOperationalPwrNum = operationalPwrNum * bMult;
  const scaledIdlePwr = (idlePwr * bMult).toFixed(3);
  const operationalPwr = scaledOperationalPwrNum.toFixed(2);
  outPowerMw.innerHTML = `${operationalPwr} <span class="unit-sub">MW</span>`;
  outPowerIdle.textContent = `Idle Draw: ${scaledIdlePwr} MW${bMult > 1 ? ` (${bMult}x Array)` : ''}`;

  // Combat Cycle & Sustained Consumption / Thermal Profile (Battery Scaled)
  // WC heat: HeatPerShot x ammo HeatModifier per barrel fired; HeatSinkRate per second; overheat clears at MaxHeat x Cooldown
  const heatShot = fireParams.heatPerShot;
  const maxHeat = fireParams.maxHeat;
  const sinkRate = fireParams.heatSinkRate;
  const heatK = WcMath.heatConstants(fireParams);
  const heatPerSec = (rof / 60) * barrels * heatShot;
  const hasHeat = maxHeat > 0 && heatShot > 0;

  // Consumption metrics (scaled by battery multiplier)
  const isEnergyAmmo = activeAmmo && (activeAmmo.ammoMagazine === 'Energy' || !activeAmmo.ammoMagazine || activeAmmo.ammoMagazine.includes('Energy'));
  const ammoMagCapacity = magSize;
  const roundsPerMin = effectiveRps * 60 * bMult;
  const magsPerMin = ammoMagCapacity > 0 ? (roundsPerMin / ammoMagCapacity) : 0;
  const kgUraniumPerMin = scaledOperationalPwrNum / 60;
  // The input holds the working-tree value (curated binding), so edits and "Use suggested" show up here
  const invVol = parseFloat(wInventorySize?.value) || (activeWeapon && activeWeapon.inventorySize) || 0.9;

  // Magazine physical volume for cargo consumption planning
  const magSubtype = activeAmmo ? (activeAmmo.ammoMagazine || 'Standard') : 'Standard';
  const magMeta = (typeof magazinesBlueprintsDb !== 'undefined' ? magazinesBlueprintsDb : []).find(m => m.subtypeId === magSubtype)
    || (typeof MAGAZINES_BLUEPRINTS_DATA !== 'undefined' ? MAGAZINES_BLUEPRINTS_DATA : []).find(m => m.subtypeId === magSubtype)
    || { volume: 30 };
  const magVolM3 = (magMeta.volume || 30) / 1000;
  const m3PerMin = magsPerMin * magVolM3;
  const m3PerMinStr = m3PerMin >= 0.01 ? `${m3PerMin.toFixed(2)} m³/min` : `${(m3PerMin * 1000).toFixed(1)} L/min`;
  const minOfFire = m3PerMin > 0 ? (invVol / m3PerMin).toFixed(1) : '∞';

  let consumptionHtml = '';
  if (isEnergyAmmo || (!activeAmmo.ammoMagazine && scaledOperationalPwrNum > 5)) {
    const uStr = kgUraniumPerMin >= 1.0 ? `${kgUraniumPerMin.toFixed(2)} kg` : `${(kgUraniumPerMin * 1000).toFixed(0)}g`;
    consumptionHtml = `⚡ ${uStr} Uranium / min`;
    if (outAmmoDrawSub) outAmmoDrawSub.textContent = `${operationalPwr} MW Operational Draw`;
    if (outMagProfile) outMagProfile.textContent = ammoMagCapacity > 0 ? `${ammoMagCapacity} rds / mag · ${invVol} m³ cargo` : `Continuous · ${invVol} m³ cargo`;
    if (outMagReload) outMagReload.textContent = `${magsToLoad * bMult} mag buffer`;
  } else {
    consumptionHtml = `📦 ${magsPerMin.toFixed(1)} mags/min (${m3PerMinStr})`;
    if (outAmmoDrawSub) {
      const uStr = kgUraniumPerMin >= 1.0 ? `${kgUraniumPerMin.toFixed(2)} kg` : `${(kgUraniumPerMin * 1000).toFixed(0)}g`;
      const pwrNote = scaledOperationalPwrNum > 20 ? ` + ⚡ ${uStr} U/min` : '';
      outAmmoDrawSub.textContent = `[${magSubtype}] · ${Math.round(roundsPerMin).toLocaleString()} rds/min${pwrNote}`;
    }
    if (outMagProfile) {
      outMagProfile.innerHTML = `${ammoMagCapacity} rds/mag · ${m3PerMinStr}`;
    }
    if (outMagReload) {
      outMagReload.textContent = `${invVol} m³ cargo (${minOfFire}m continuous fire)`;
    }
  }

  // Functional Integrity (Pillar 3 Logistics: Up to Critical Component)
  const comps = activeWeapon.components || [];
  const critComp = activeWeapon.criticalComponent || 'Computer';
  let funcHp = 0;
  let reachedCrit = false;
  for (const c of comps) {
    const cMeta = componentsDb[c.name] || (GVK_TECH_COMPONENTS && GVK_TECH_COMPONENTS[c.name]) || { integrity: 100 };
    const layerHp = (cMeta.integrity || 100) * (parseInt(c.count) || 0);
    funcHp += layerHp;
    if (c.name === critComp) {
      reachedCrit = true;
      break;
    }
  }
  if (!reachedCrit || funcHp <= 0) funcHp = effIntegrity * 0.7;
  const funcRatio = effIntegrity > 0 ? Math.round((funcHp / effIntegrity) * 100) : 70;

  const outFunctionalIntegrity = document.getElementById('outFunctionalIntegrity');
  if (outFunctionalIntegrity) {
    outFunctionalIntegrity.innerHTML = `${Math.round(funcHp).toLocaleString()} <span class="unit-sub">hp</span>`;
  }
  const outFunctionalThreshold = document.getElementById('outFunctionalThreshold');
  if (outFunctionalThreshold) {
    outFunctionalThreshold.innerHTML = `<span title="Flatline Point: Weapon ceases function below this threshold (Critical: ${critComp})">Flatline Point: <strong>${funcRatio}%</strong> HP (${critComp})</span>`;
  }

  const isDegradeRof = activeWeapon.degradeRof || (activeWeapon.loading && activeWeapon.loading.degradeRof);
  let hudCycle = '—';
  if (hasHeat && heatPerSec > sinkRate) {
    if (outCombatCycleTitle) outCombatCycleTitle.textContent = "🔥 THERMAL PROFILE & DUTY CYCLE";
    const netHeatSec = heatPerSec - sinkRate;
    const timeToOverheat = maxHeat / netHeatSec;
    const cooldownSec = sinkRate > 0 ? (maxHeat * (1 - heatK.coolDown)) / sinkRate : Infinity;
    // Measured by the WC tick replica: share of time the weapon is allowed to fire
    const dutyCycle = Math.max(0, Math.min(100, Math.round((1 - (stallShare || 0)) * 100)));

    if (isDegradeRof) {
      const burstSec = (maxHeat * heatK.heatThresholdStart) / netHeatSec;
      const equilRps = Math.max(0.1, sinkRate / heatShot);
      const equilRpm = Math.round(equilRps * 60);
      outHeatDutyRatio.textContent = `${dutyCycle}% UPTIME (Throttled)`;
      heatProgressBar.style.width = `${dutyCycle}%`;
      heatProgressBar.style.background = 'linear-gradient(90deg, var(--green-accent), var(--amber-primary), var(--red-accent))';
      outTimeToOverheat.innerHTML = `<span title="Thermal Choke: Fires at full ${Math.round(rof)} RPM for ${burstSec.toFixed(1)}s, then throttles to ${equilRpm} RPM to bleed heat">Burst: ${burstSec.toFixed(1)}s @ ${Math.round(rof)} RPM · Throttles to ${equilRpm} RPM</span>`;
    } else {
      outHeatDutyRatio.textContent = `${dutyCycle}% UPTIME`;
      heatProgressBar.style.width = `${dutyCycle}%`;
      heatProgressBar.style.background = 'linear-gradient(90deg, var(--green-accent), var(--amber-primary), var(--red-accent))';
      outTimeToOverheat.textContent = `Fire Limit: ${timeToOverheat.toFixed(1)}s (Cooldown: ${cooldownSec.toFixed(1)}s)`;
    }
    outCooldownTime.innerHTML = consumptionHtml;
    hudCycle = isDegradeRof
      ? `Throttles after ${((maxHeat * heatK.heatThresholdStart) / netHeatSec).toFixed(1)}s`
      : `Overheats in ${timeToOverheat.toFixed(1)}s`;
  } else if (hasHeat) {
    if (outCombatCycleTitle) outCombatCycleTitle.textContent = "🔥 THERMAL PROFILE & DUTY CYCLE";
    outHeatDutyRatio.textContent = "100% UPTIME";
    if (heatProgressBar) {
      heatProgressBar.style.width = "100%";
      heatProgressBar.style.background = 'linear-gradient(90deg, var(--green-accent), var(--cyan-primary))';
    }
    outTimeToOverheat.textContent = "Continuous Fire: Unlimited (Sink > Heat)";
    outCooldownTime.innerHTML = consumptionHtml;
    hudCycle = reloadSec > 0
      ? `${(spoolSec + fireDurationSec).toFixed(1)}s fire / ${reloadSec.toFixed(1)}s reload`
      : `Continuous · ${effectiveRpm} RPM`;
  } else if (totalRounds === 1 && reloadSec > 0) {
    if (outCombatCycleTitle) outCombatCycleTitle.textContent = "⏱️ SINGLE-SHOT BREECH CYCLE";
    outHeatDutyRatio.textContent = `1 ROUND / ${totalCycleSec.toFixed(1)}s`;
    if (heatProgressBar) {
      heatProgressBar.style.width = "100%";
      heatProgressBar.style.background = 'linear-gradient(90deg, var(--cyan-primary), #38bdf8)';
    }
    const sustainedRpmStr = `${(60 / totalCycleSec).toFixed(1)} RPM`;
    const spoolNote = spoolSec > 0 ? ` (${spoolSec.toFixed(1)}s spool + ${reloadSec.toFixed(1)}s reload)` : '';
    outTimeToOverheat.textContent = `Breech Cycle: 1 round every ${totalCycleSec.toFixed(1)}s${spoolNote} · ${sustainedRpmStr} sustained`;
    outCooldownTime.innerHTML = consumptionHtml;
    hudCycle = `1 rd / ${totalCycleSec.toFixed(1)}s`;
  } else {
    if (outCombatCycleTitle) outCombatCycleTitle.textContent = "⚡ EFFECTIVE FIRE RATE & COMBAT CYCLE";
    const fireDutyPercent = totalCycleSec > 0 ? Math.min(100, Math.round((fireDurationSec / totalCycleSec) * 100)) : 100;

    outHeatDutyRatio.textContent = `${fireDutyPercent}% UPTIME (${effectiveRpm} RPM)`;
    if (heatProgressBar) {
      heatProgressBar.style.width = `${fireDutyPercent}%`;
      heatProgressBar.style.background = 'linear-gradient(90deg, var(--cyan-primary), var(--amber-primary))';
    }

    const spoolTag = spoolSec > 0 ? `${spoolSec.toFixed(1)}s spool + ` : '';
    const burstTag = bursts > 1 ? ` in ${bursts} bursts` : '';
    outTimeToOverheat.textContent = reloadSec > 0
      ? `Cycle: ${spoolTag}${fireDurationSec.toFixed(1)}s firing${burstTag} + ${reloadSec.toFixed(1)}s reload (${effectiveRps.toFixed(1)} sps)`
      : `Continuous Fire: 100% Belt-Fed (${effectiveRps.toFixed(1)} sps)`;

    outCooldownTime.innerHTML = consumptionHtml;
    hudCycle = reloadSec > 0
      ? `${(spoolSec + fireDurationSec).toFixed(1)}s fire / ${reloadSec.toFixed(1)}s reload`
      : `Continuous · ${effectiveRpm} RPM`;
  }

  // Conditional Explosive Profile
  const deckTabExplosive = document.getElementById('deckTabExplosive');
  const hasExplosive = (blastRadius > 0 && blastDmg > 0) || blastKind === 'ewar' || blastKind === 'screen';
  if (deckTabExplosive) {
    deckTabExplosive.style.display = hasExplosive ? 'inline-block' : 'none';
    if (!hasExplosive && deckTabExplosive.classList.contains('active')) {
      const firstTab = document.querySelector('.deck-tab-btn[data-deck-tab="tab-ttk"]');
      if (firstTab) firstTab.click();
    }
  }



  if (isDetonation) {
    // Single-use block: payload once, no rate of fire
    outSustainedDps.innerHTML = 'Single use';
    if (outEffectiveDps) outEffectiveDps.innerHTML = '<strong>No sustained DPS</strong> · the payload is released once';
    const teleAlphaUnitDet = document.getElementById('teleAlphaUnit');
    if (teleAlphaUnitDet) teleAlphaUnitDet.textContent = '';
    if (outEffectiveAlpha) outEffectiveAlpha.textContent = 'Max if every fragment hits';
    if (lblEffectiveRpm) lblEffectiveRpm.textContent = 'FIRE MODE';
    outShotsPerSec.innerHTML = 'One-shot';
    outCycleTime.textContent = 'The block is destroyed when it fires';
    if (outCombatCycleTitle) outCombatCycleTitle.textContent = '💣 SINGLE-USE CHARGE';
    outHeatDutyRatio.textContent = 'ONE-SHOT';
    if (heatProgressBar) {
      heatProgressBar.style.width = '100%';
      heatProgressBar.style.background = 'linear-gradient(90deg, #94a3b8, #cbd5e1)';
    }
    outTimeToOverheat.textContent = 'No reload, heat or cooldown.';
    outCooldownTime.innerHTML = 'No ammo consumed';
    if (outAmmoDrawSub) outAmmoDrawSub.textContent = `${operationalPwr} MW idle draw`;
    if (outMagProfile) outMagProfile.textContent = 'No magazine';
    if (outMagReload) outMagReload.textContent = 'No reload';
    [[tmHeavyDmg, tmHeavySub, heavyDmg], [tmLightDmg, tmLightSub, lightDmg], [tmNonArmorDmg, tmNonArmorSub, nonArmorDmg]].forEach(([dmgEl, subEl, d]) => {
      if (dmgEl) dmgEl.innerHTML = `${Math.round(d).toLocaleString()} <span class="unit">hp max</span>`;
      if (subEl) subEl.textContent = 'If every fragment hits';
    });
    hudCycle = 'Single use';
  }

  updateHudTelemetry({ scaledEffectiveDps, baseEffectiveDps, scaledEffectiveAlpha, profileLabel: topProfile.label, bMult, cycle: hudCycle });

  // Render BOM Table
  renderBomTable(effIntegrity, durMod);
}

// Drift meter removed per user request; shot deviation & aiming tolerance now handled in updateCombatTelemetry.

// ==========================================================================
// AMMO LOGISTICS & BLUEPRINTS ("AMMO MATHS")
// ==========================================================================
/// <summary>Durations as "16s", "1m 18s", "2h 42m", "3d 4h" (a bare "m" reads as metres elsewhere in the studio).</summary>
function formatTime(seconds) {
  const s = Math.round(seconds);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${s % 60}s`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
  return `${Math.floor(s / 86400)}d ${Math.floor((s % 86400) / 3600)}h`;
}

// ==========================================================================
// 1V1 COMBAT RADAR CHART
// ==========================================================================

// ==========================================================================

// ==========================================================================
// RECURSIVE DAMAGE & ICON RESOLUTION HELPERS
// ==========================================================================
/// <summary>
/// WC ArmorForCutoff multiplier on BaseDamageCutoff vs an armor class ('heavy' | 'light' | 'nonArmor').
/// Active only when a field is > 0 and NoGridOrArmorScaling is off; fields >= 0 then apply (SessionDamageMgr.cs).
/// </summary>
function getCutoffArmorScale(ammo, kind) {
  const ds = (ammo && ammo.damageScales) || {};
  const f = (v) => (v === undefined || v === null) ? -1 : v;
  const armor = f(ds.cutoffArmorArmor), light = f(ds.cutoffLightArmor), heavy = f(ds.cutoffHeavyArmor), non = f(ds.cutoffNonArmor);
  if (ammo && ammo.noGridOrArmorScaling) return 1;
  if (!(armor > 0 || light > 0 || heavy > 0 || non > 0)) return 1;
  if (kind === 'nonArmor') return non >= 0 ? non : 1;
  let scale = armor >= 0 ? armor : 1;
  const cls = kind === 'heavy' ? heavy : light;
  if (cls >= 0) scale *= cls;
  return scale;
}

/// <summary>
/// WC TimedSpawns cadence (Projectile.cs): a spawn fires when Age - LastFragTime > Interval, and after every
/// GroupSize spawns it also waits >= GroupDelay. Spawn count is capped by MaxSpawns, MaxChildren (0 = unlimited)
/// and the parent's MaxLifeTime. Assumes a target stays inside Proximity, so this is a best-case ceiling.
/// </summary>
function getTimedSpawnSchedule(ammo) {
  const frag = ammo.fragment;
  const ts = frag.timedSpawns;
  const gap = Math.max(0, parseInt(ts.interval) || 0) + 1;
  const groupSize = parseInt(ts.groupSize) || 0;
  const hasGroup = groupSize > 0 && (parseInt(ts.groupDelay) || 0) > 0;
  const groupGap = Math.max(gap, parseInt(ts.groupDelay) || 0);
  const maxChildren = (parseInt(frag.maxChildren) || 0) > 0 ? parseInt(frag.maxChildren) : Infinity;
  const cap = Math.min(Math.max(1, parseInt(ts.maxSpawns) || 0), maxChildren);
  const life = (ammo.trajectory && ammo.trajectory.maxLifeTime) || 0;

  const firstTick = Math.max(parseInt(ts.startTime) || 0, gap);
  let tick = firstTick;
  let lastTick = firstTick;
  let spawns = 0;
  while (spawns < cap && (life <= 0 || tick <= life)) {
    spawns++;
    lastTick = tick;
    tick += (hasGroup && spawns % groupSize === 0) ? groupGap : gap;
  }
  spawns = Math.max(1, spawns);
  return {
    spawns,
    deliverySec: (lastTick - firstTick) / 60,
    firstVolley: Math.min(hasGroup ? groupSize : 1, spawns)
  };
}

/// <summary>
/// Steady-state DPS: every round eventually delivers dmg.total, so DPS = rounds/s x total. Loitering rounds
/// (drones) hold one of MaxActiveProjectiles slots for their deliverySec, which caps the launch rate.
/// </summary>
function computeSteadyStateDps(dmg, effectiveRps, maxActive) {
  let rps = effectiveRps;
  if (maxActive > 0 && dmg.deliverySec > 0) rps = Math.min(rps, maxActive / dmg.deliverySec);
  return Math.round(rps * dmg.total);
}

/// <summary>
/// Resolves an AmmoRound reference the way WC does (AmmoConstants FragmentId / ComputeAmmoPattern): by AmmoRound
/// among the weapon's full Ammos list, then among every parsed ammo. Keys double as rounds for ammos without one.
/// </summary>
function resolveAmmoRound(round, weapon) {
  if (!round || !ammosDb) return null;
  const pool = weapon ? (weapon.allAmmos || weapon.assignedAmmos || []) : [];
  for (const k of pool) {
    const a = ammosDb[k];
    if (a && (a.ammoRound || k) === round) return a;
  }
  const byKey = ammosDb[round];
  if (byKey && (byKey.ammoRound || round) === round) return byKey;
  for (const k in ammosDb) {
    const a = ammosDb[k];
    if (a && a.ammoRound === round) return a;
  }
  return null;
}

// AreaOfDamage also applies HealthHitModifier damage to projectiles in the area. On an ammo with a HealthHitModifier,
// a token blast (this many hp per block or less) is there for that anti-missile effect, not to damage blocks.
const AOE_ANTI_PROJECTILE_MAX = 1;
function isAntiProjectileArea(ammo, area) {
  const hhm = parseFloat(((ammo && ammo.damageScales) || {}).healthHitModifier) || 0;
  return hhm > 0 && (parseFloat(area && area.damage) || 0) <= AOE_ANTI_PROJECTILE_MAX;
}

function emptyDamage() {
  return { base: 0, bbh: 0, eol: 0, aoe: 0, frag: 0, fragInstant: 0, total: 0, instantTotal: 0, deliverySec: 0, cutoff: 0, perBlockBase: 0, penBlocks: 1, ewar: false, antiProjectile: false, parts: [], pattern: null };
}

/// <summary>
/// Ideal per-trajectile payload (every hit lands, pools fully spent), following WeaponCore:
/// - EWAR rounds deal no base or area damage (EwarDef.Enable)
/// - ByBlockHit / EndOfLife only when Enable, spread over an ideal solid hull by RadiantAoe + falloff (Pooled = the pool)
/// - on an ammo with a HealthHitModifier, an area of AOE_ANTI_PROJECTILE_MAX hp or less per block is an anti-projectile
///   effect (e.g. Proximity Flak's 101 m / 1 hp blast vs missiles) and is not counted as block damage
/// - fragments resolve by AmmoRound within the weapon's Ammos; TimedSpawns follow Projectile.cs cadence
/// - a Weapon-mode Pattern spawns its expected member count per trajectile (Weapon.Shoot)
/// parts = damage grouped by the ammo def that deals it, so each part takes its own DamageScales.
/// </summary>
function getAmmoDamageDetailed(ammo, depth = 0, weapon = null, opts = null) {
  if (!ammo || depth > 10) return emptyDamage();
  const resolve = (round) => resolveAmmoRound(round, weapon);

  if (!(opts && opts.noPattern)) {
    const pat = WcMath.weaponPattern(ammo, resolve);
    if (pat.active) {
      const out = emptyDamage();
      const k = pat.members.length ? pat.count / pat.members.length : 0;
      const sub = { noPattern: true, targetGrid: opts && opts.targetGrid };
      const parentD = getAmmoDamageDetailed(ammo, depth, weapon, sub);
      for (const m of pat.members) {
        if (!m) continue;
        const d = m === ammo ? parentD : getAmmoDamageDetailed(m, depth, weapon, sub);
        for (const f of ['base', 'bbh', 'eol', 'aoe', 'frag', 'fragInstant', 'total', 'instantTotal']) out[f] += d[f] * k;
        out.deliverySec = Math.max(out.deliverySec, d.deliverySec);
        for (const p of d.parts) out.parts.push({ ammo: p.ammo, total: p.total * k, instant: p.instant * k });
      }
      out.cutoff = parentD.cutoff; out.perBlockBase = parentD.perBlockBase; out.penBlocks = parentD.penBlocks; out.ewar = parentD.ewar;
      out.antiProjectile = parentD.antiProjectile;
      out.pattern = { count: pat.count, members: pat.members.map((m) => (m ? (m.terminalName || m.name) : null)) };
      out.source = { ammo, weapon, targetGrid: (opts && opts.targetGrid) || 'Large' };
      return out;
    }
  }

  const isEwar = !!(ammo.ewar && ammo.ewar.enable);
  const frag = (ammo.fragment && ammo.fragment.enable) ? ammo.fragment : null;
  const timed = (frag && frag.timedSpawns && frag.timedSpawns.enable) ? frag.timedSpawns : null;
  // Fragment pattern (Mode Fragment/Both): each fragment is drawn from the pattern list instead of Fragment.AmmoRound
  const pat = ammo.pattern || {};
  const fragPatternNames = (pat.mode === 'Fragment' || pat.mode === 'Both') && Array.isArray(pat.patterns) ? pat.patterns.filter((n) => n) : [];
  const children = frag ? (fragPatternNames.length ? fragPatternNames.map(resolve) : [resolve(frag.ammoRound)]).filter(Boolean) : [];
  // TimedSpawns with ParentDies: the carrier ends on its final spawn, so its own impact is not counted
  const isCarrier = !!(timed && timed.parentDies && children.length);
  const base = (isEwar || isCarrier) ? 0 : (parseFloat(ammo.baseDamage) || 0);
  const cutoff = (isEwar || isCarrier) ? 0 : (parseFloat(ammo.baseDamageCutoff) || 0);
  const pen = WcMath.penetration(base, cutoff);

  let bbh = 0, eol = 0, legacy = 0;
  const aod = ammo.areaOfDamage;
  // Area effects land on an ideal solid hull of the target grid size (WcMath.aoeDamage mirrors RadiantAoe + falloff)
  const targetGrid = (opts && opts.targetGrid) || 'Large';
  let antiProjectile = false;
  if (aod && !isEwar) {
    const b = aod.byBlockHit, e = aod.endOfLife, ae = aod.areaEffect;
    const blockAoe = (area, byBlockHit) => {
      if (isAntiProjectileArea(ammo, area)) { antiProjectile = true; return 0; }
      return WcMath.aoeDamage(area, targetGrid, byBlockHit);
    };
    if (b && b.enable && !isCarrier) bbh = blockAoe(b, true);
    if (e && e.enable) eol = blockAoe(e, false);
    if (ae && ae.areaEffect) legacy = parseFloat(ae.damage) || 0;
  }
  const aoe = bbh + eol + legacy;

  let fragTotal = 0, fragInstant = 0, deliverySec = 0;
  const parts = [{ ammo, total: base + aoe, instant: base + aoe }];
  if (frag && children.length) {
    const cnt = parseInt(frag.fragments) || 0;
    const share = 1 / children.length;
    let spawns = 1, firstVolley = 1;
    if (timed) {
      const sched = getTimedSpawnSchedule(ammo);
      spawns = sched.spawns;
      deliverySec = sched.deliverySec;
      // Loitering spawners: only the first group lands in the opening volley
      firstVolley = deliverySec <= 1.0 ? spawns : sched.firstVolley;
    }
    for (const child of children) {
      const cd = getAmmoDamageDetailed(child, depth + 1, weapon, { noPattern: true, targetGrid });
      const nTotal = spawns * cnt * share, nInstant = firstVolley * cnt * share;
      fragTotal += nTotal * cd.total;
      fragInstant += nInstant * cd.total;
      deliverySec = Math.max(deliverySec, cd.deliverySec);
      for (const p of cd.parts) parts.push({ ammo: p.ammo, total: p.total * nTotal, instant: p.total * nInstant });
    }
  }

  return {
    base, bbh, eol, aoe,
    frag: fragTotal,
    fragInstant,
    total: base + aoe + fragTotal,
    instantTotal: base + aoe + fragInstant,
    deliverySec,
    cutoff,
    perBlockBase: pen.perBlock,
    penBlocks: pen.blocks,
    ewar: isEwar,
    antiProjectile,
    parts,
    pattern: null,
    source: { ammo, weapon, targetGrid }
  };
}

const TARGET_ARMOR_LABELS = { heavy: 'Heavy Armor', light: 'Light Armor', nonArmor: 'Non-Armor (Systems)' };
/// <summary>
/// Best-case target for a payload: each part takes its own ammo's per-block damageScale (WC SessionDamageMgr:
/// Grids, Armor/Heavy/Light/NonArmor, NoGridOrArmorScaling, small-vs-large debuff) against large and small grids.
/// mult = best effective payload / paper payload. perClass = best effective payload per armor class.
/// </summary>
function getEffectiveProfile(dmg, weapon) {
  const shooterGrid = weapon && (weapon.grid || weapon.gridSize);
  const total = dmg && dmg.total > 0 ? dmg.total : 0;
  const parts = (dmg && dmg.parts) || [];
  // Area effects reach more blocks on a small grid, so each target grid gets its own payload
  const src = dmg && dmg.source;
  const partsFor = (grid) => {
    if (!src || !src.ammo || src.targetGrid === grid) return parts;
    return getAmmoDamageDetailed(src.ammo, 0, src.weapon, { targetGrid: grid }).parts;
  };
  const gridParts = { Large: partsFor('Large'), Small: partsFor('Small') };
  const perClass = {}, perClassGrid = {};
  for (const armor of ['heavy', 'light', 'nonArmor']) {
    perClass[armor] = 0; perClassGrid[armor] = [];
    for (const grid of ['Large', 'Small']) {
      const eff = gridParts[grid].reduce((s, p) => s + p.total * WcMath.blockDamageScale(p.ammo, { grid, armor }, shooterGrid), 0);
      if (eff > perClass[armor] + 1e-9) { perClass[armor] = eff; perClassGrid[armor] = [grid]; }
      else if (Math.abs(eff - perClass[armor]) <= 1e-9) perClassGrid[armor].push(grid);
    }
  }
  const best = Math.max(perClass.heavy, perClass.light, perClass.nonArmor);
  const winners = ['heavy', 'light', 'nonArmor'].filter((k) => Math.abs(perClass[k] - best) <= 1e-9 * Math.max(1, best));
  const allEqual = winners.length === 3;
  const grids = winners.reduce((g, k) => g.filter((x) => perClassGrid[k].includes(x)), ['Large', 'Small']);
  // Large grids are the default reference; call out payloads that only peak against small grids
  const gridTag = grids.length === 1 && grids[0] === 'Small' ? ' (Small Grid)' : '';
  const label = (allEqual ? 'All Blocks' : winners.map((k) => TARGET_ARMOR_LABELS[k]).join(' & ')) + (best > 0 ? gridTag : '');
  const mult = total > 0 ? Math.round((best / total) * 1e6) / 1e6 : 0;
  return {
    label, mult, allEqual, perClass,
    isHeavy: winners.includes('heavy'), isLight: winners.includes('light'), isNonArmor: winners.includes('nonArmor')
  };
}

/// <summary>
/// PD reference targets: the sturdiest guided munitions in the loaded data (by Health), one per terminal name.
/// </summary>
function getPdReferenceTargets(limit) {
  const seen = new Set();
  return Object.values(ammosDb || {})
    .filter((a) => a && a.hardPointUsable !== false && (a.health || 0) > 0 && a.trajectory && a.trajectory.guidance && a.trajectory.guidance !== 'None')
    .sort((x, y) => (y.health || 0) - (x.health || 0))
    .filter((a) => { const n = a.terminalName || a.name; if (seen.has(n)) return false; seen.add(n); return true; })
    .slice(0, limit || 2);
}

// "N hits per <munition>" against the reference targets (WC DamageProjectile: HealthHitModifier per hit)
function describePdKills(attacker, unit) {
  const refs = getPdReferenceTargets(2);
  if (!refs.length) return '';
  const counts = refs.map((t) => WcMath.pdHitsToKill(attacker, t));
  if (counts.every((c) => c <= 1)) return '1-shot any incoming munition';
  return refs.map((t, i) => `${counts[i]} ${unit} per ${t.terminalName || t.name}`).join(' · ');
}

// " (N hits from <PD round>, ...)" for a munition vs the mod's player PD rounds (strongest and weakest HealthHitModifier)
function describePdSurvival(target) {
  const byName = new Map();
  for (const w of weaponsDb || []) {
    if (!w.pdProjectiles || isNpcWeapon(w)) continue;
    const a = ammosDb[getSelectableAmmos(w)[0]];
    if (a && !byName.has(a.terminalName || a.name)) byName.set(a.terminalName || a.name, a);
  }
  const rounds = [...byName.values()].sort((x, y) => WcMath.pdHitsToKill(x, target) - WcMath.pdHitsToKill(y, target));
  if (!rounds.length) return '';
  const pick = rounds.length > 1 ? [rounds[0], rounds[rounds.length - 1]] : rounds;
  return ' (' + pick.map((a) => { const n = WcMath.pdHitsToKill(a, target); return `${n} ${n === 1 ? 'hit' : 'hits'} from ${a.terminalName || a.name}`; }).join(' to ') + ')';
}

function getAmmoIconUrl(ammo) {
  if (!ammo) return 'icons/ammo_Energy.png';
  const mag = ammo.ammoMagazine || 'Energy';
  return `icons/ammo_${mag}.png`;
}

function getWeaponIconUrl(weapon) {
  if (!weapon) return 'icons/L__Gatling_Avenger_Turret.png';
  if (weapon.icon) return weapon.icon;
  if (weapon.subtypeId) return `icons/${weapon.subtypeId}.png`;
  if (weapon.id) return `icons/${weapon.id}.png`;
  return 'icons/L__Gatling_Avenger_Turret.png';
}

// DYNAMIC WEAPON METRICS & MOD-WIDE SCALING
// ==========================================================================

//// <summary>
/// Hitscan munition (no flight time): WC AmmoConstants.IsBeamWeapon (Beams.Enable with Guidance None),
/// or a round fast enough (>= 10 km/s) to arrive in the tick it is fired.
/// </summary>
/// <summary>Whether guided flight actually steers: SmartsDef Aggressiveness and MaxLateralThrust above 0.
/// Unknown (no smarts data) counts as steering.</summary>
function isSteeringAmmo(ammo) {
  const t = ammo && ammo.trajectory;
  return !t || t.steers !== false;
}

/// <summary>Proximity air burst (Flak PROX): guided but non-steering, so Smart only acquires a target for the
/// TimedSpawns proximity fuse, which then bursts into an area blast or several fragments.</summary>
function isAirBurstAmmo(ammo) {
  const t = ammo && ammo.trajectory;
  if (!t || !t.guidance || t.guidance === 'None' || isSteeringAmmo(ammo)) return false;
  const f = ammo.fragment;
  const ts = f && f.enable && f.timedSpawns && f.timedSpawns.enable ? f.timedSpawns : null;
  if (!ts || !((ts.proximity || 0) > 0)) return false;
  const eol = (ammo.areaOfDamage || {}).endOfLife || {};
  return (eol.enable && (eol.radius || 0) > 0) || (f.fragments || 0) > 1;
}

function isBeamWeapon(weapon, ammo) {
  if (isDetonationWeapon(weapon)) return false;
  return WcMath.isHitscan(ammo);
}

/// <summary>WC warhead (HardwareDef.CriticalReaction.Enable): fires its ammo once when the block detonates. The def's
/// 1 m Beams.Enable round is only the trigger, so it is not a beam and has no rate of fire or sustained DPS.</summary>
function isDetonationWeapon(weapon) {
  return !!weapon && weapon.criticalReaction === true;
}

/// <summary>
/// WC power sink (CoreComponent.SinkPower): IdlePower (min 0.001 MW) always, plus AssignedPower while a MustCharge
/// (energy or hybrid) weapon charges = WeaponState.UpdateDesiredPower, ShotEnergyCost x shots per tick.
/// </summary>
function getWeaponPowerDraw(weapon, ammo, overrides) {
  const w = Object.assign({}, weapon || {}, overrides || {});
  const idle = Math.max(parseFloat(w.idlePower) || 0, 0.001);
  if (isDetonationWeapon(weapon)) return { idle, operational: idle, mustCharge: false };
  const e = getWcEnergy(w, ammo || {});
  return { idle, operational: idle + (e.mustCharge ? e.desiredPower : 0), mustCharge: e.mustCharge };
}

function calculateWeaponMetrics(weapon, ammoKeyOverride) {
  if (!weapon) return { sustainedDps: 0, effectiveDps: 0, alphaVolley: 0, effectiveAlphaVolley: 0, range: 1600, velocity: 1000, tracking: 10, integrity: 10000, power: 0, ups: 0, isBeam: false };

  const aKey = ammoKeyOverride || ((weapon.assignedAmmos && weapon.assignedAmmos.length > 0) ? weapon.assignedAmmos[0] : weapon.ammoName);
  const a = ammosDb[aKey] || {};

  const { projectiles, effectiveRps } = computeFireCycle(getFireCycleParams(weapon, a, false));
  const dmgDetails = getAmmoDamageDetailed(a, 0, weapon);
  const alphaVolley = Math.round(dmgDetails.instantTotal * projectiles);

  const sustainedDps = isDetonationWeapon(weapon) ? 0 : computeSteadyStateDps(dmgDetails, effectiveRps, weapon.maxActiveProjectiles || 0);

  const range = getEngagementRange(weapon, a, false).range;

  const rawVel = (a.trajectory && a.trajectory.desiredSpeed !== undefined) ? a.trajectory.desiredSpeed : (weapon.desiredSpeed || 1000);
  const isBeam = isBeamWeapon(weapon, a);
  const velocity = isBeam ? 0 : rawVel;
  const tracking = weapon.rotateRate ? (weapon.rotateRate * 60 * 180 / Math.PI) : 0;

  const power = getWeaponPowerDraw(weapon, a).operational;

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

  const techInfo = getTechSummary(weapon.components);
  const ups = (weapon.upCost !== undefined && weapon.upCost !== null) ? weapon.upCost : techInfo.upCost;

  const profile = getEffectiveProfile(dmgDetails, weapon);
  const effectiveDps = Math.round(sustainedDps * profile.mult);
  const effectiveAlphaVolley = Math.round(alphaVolley * profile.mult);
  return { sustainedDps, effectiveDps, alphaVolley, effectiveAlphaVolley, range, velocity, tracking, integrity, power, ups, isBeam, profile };
}

function isNpcWeapon(w) {
  return !!w && ((w.name && w.name.includes('(NPC)')) || (w.subtypeId && w.subtypeId.includes('_NPC')) || (w.id && w.id.includes('_NPC')));
}

/// <summary>
/// Radar 100% ceilings across player weapons only; NPC-only weapons (e.g. Harbinger at 125k DPS)
/// would flatten every player weapon to the center of the web.
/// </summary>
function getModMaxMetrics() {
  let maxDps = 1000;
  let maxAlpha = 1000;
  let maxRange = 1000;
  let maxVel = 500;
  let maxTrack = 10;
  let maxIntegrity = 5000;
  let maxPower = 1;
  let maxUps = 1;

  weaponsDb.forEach(w => {
    if (isNpcWeapon(w)) return;
    const m = calculateWeaponMetrics(w);
    if (m.effectiveDps > maxDps) maxDps = m.effectiveDps;
    if (m.effectiveAlphaVolley > maxAlpha) maxAlpha = m.effectiveAlphaVolley;
    if (m.range > maxRange) maxRange = m.range;
    if (!m.isBeam && m.velocity > maxVel && m.velocity < 10000) maxVel = m.velocity;
    if (m.tracking > maxTrack) maxTrack = m.tracking;
    if (m.integrity > maxIntegrity) maxIntegrity = m.integrity;
    if (m.power > maxPower) maxPower = m.power;
    if (m.ups > maxUps) maxUps = m.ups;
  });

  return { maxDps, maxAlpha, maxRange, maxVel, maxTrack, maxIntegrity, maxPower, maxUps };
}

function getWeaponSpecialtyBadge(weapon, ammo) {
  if (!ammo) return 'Standard Payload';
  if (isDetonationWeapon(weapon)) return '💥 Fragment Burst';
  if (ammo.ewar && ammo.ewar.enable) return `🧿 ${ewarTypeLabel(ammo.ewar.type)}`;
  if (ammo.baseDamageCutoff > 0) {
    const penBlocks = Math.round(ammo.baseDamageCutoff / (weapon.gridSize === 'Small' || weapon.grid === 'Small' ? 500 : 2500));
    return `🪡 Overpen (${penBlocks || 1} blk)`;
  }
  const aoe = ammo.areaOfDamage || {};
  if ((aoe.radius > 0 && aoe.damage > 0) || (aoe.endOfLife && aoe.endOfLife.radius > 0 && aoe.endOfLife.damage > 0)) {
    const r = (aoe.radius || (aoe.endOfLife && aoe.endOfLife.radius) || 0).toFixed(0);
    return `💥 Blast (${r}m)`;
  }
  const ds = ammo.damageScales || {};
  if (ds.shields > 1.2 || ds.shield > 1.2) return '⚡ Shield Stripper';
  if (ds.armor && ds.armor.heavy > 1.2) return '🛡️ Anti-Heavy';
  return 'Direct Kinetic AP';
}

/// <summary>
/// Populates the Active vs Benchmark badge quick-compare panel to the left of the radar chart.
/// Compares the topmost badges across the three pillars without duplicating the numeric attribute table.
/// </summary>
function updateRadarQuickCompare() {
  if (!activeWeapon) return;
  const setPair = (idA, idB, aHtml, bHtml) => {
    const elA = document.getElementById(idA);
    const elB = document.getElementById(idB);
    if (elA) elA.innerHTML = aHtml;
    if (elB) elB.innerHTML = benchmarkWeapon ? bHtml : '<span class="qc-empty">—</span>';
  };

  const benchAmmo = benchmarkAmmoKey ? ammosDb[benchmarkAmmoKey] : null;

  // Pillar 1: Lethality Badges
  const activeRole = getAutomatedWeaponRole(activeWeapon, activeAmmo);
  const benchRole = benchmarkWeapon ? getAutomatedWeaponRole(benchmarkWeapon, benchAmmo) : null;
  setPair('qcRoleActive', 'qcRoleBench', `${activeRole.icon} ${activeRole.label}`, benchRole ? `${benchRole.icon} ${benchRole.label}` : '');

  const aIsBeam = isBeamWeapon(activeWeapon, activeAmmo);
  const bIsBeam = benchAmmo ? isBeamWeapon(benchmarkWeapon, benchAmmo) : false;
  const activeMunition = aIsBeam ? `⚡ ${activeAmmo?.terminalName || activeAmmo?.ammoRound || 'Hitscan Beam'}` : (activeAmmo ? (activeAmmo.terminalName || activeAmmo.ammoRound || 'Standard') : 'Standard');
  const benchMunition = bIsBeam ? `⚡ ${benchAmmo?.terminalName || benchAmmo?.ammoRound || 'Hitscan Beam'}` : (benchAmmo ? (benchAmmo.terminalName || benchAmmo.ammoRound || 'Standard') : 'Standard');
  setPair('qcAmmoTypeActive', 'qcAmmoTypeBench', activeMunition, benchMunition);

  const activeSpec = getWeaponSpecialtyBadge(activeWeapon, activeAmmo);
  const benchSpec = benchmarkWeapon ? getWeaponSpecialtyBadge(benchmarkWeapon, benchAmmo) : null;
  setPair('qcSpecialtyActive', 'qcSpecialtyBench', activeSpec, benchSpec || '');

  // Pillar 2: Handling & Reach Badges
  const activeArc = getWeaponArcSummary(activeWeapon);
  const benchArc = benchmarkWeapon ? getWeaponArcSummary(benchmarkWeapon) : null;
  const mountLabel = (arc, w) => arc ? (!arc.isTurret ? 'Fixed (Steer rover)' : (arc.isGimbal ? `🎯 Gimbal (±${Math.round(Math.abs(arc.maxAz - arc.minAz)/2)}°)` : '🔄 360° Turret')) : '—';
  setPair('qcMountActive', 'qcMountBench', mountLabel(activeArc, activeWeapon), mountLabel(benchArc, benchmarkWeapon));

  const depLabel = (arc) => arc ? (!arc.isTurret ? 'Fixed Forward' : arc.hasDepression ? `📐 ${arc.minEl}° (Good Depression)` : (arc.minEl >= 0 ? `0° (Relentlessly Optimistic)` : `${arc.minEl}°`)) : '—';
  setPair('qcDepressionActive', 'qcDepressionBench', depLabel(activeArc), depLabel(benchArc));

  const activeRecoil = getWeaponRecoilWarning(activeWeapon, activeAmmo);
  const benchRecoil = benchmarkWeapon ? getWeaponRecoilWarning(benchmarkWeapon, benchAmmo) : null;
  const recoilFmt = (r) => r ? (r.showRecoil ? r.text : (r.kickKn <= 0 ? 'Clang-Approved (0 N)' : `${Math.round(r.kickKn)} kN`)) : '—';
  setPair('qcRecoilActive', 'qcRecoilBench', recoilFmt(activeRecoil), recoilFmt(benchRecoil));

  // Pillar 3: Logistics Badges
  const activeMass = calculateWeaponDryMass(activeWeapon);
  const benchMass = benchmarkWeapon ? calculateWeaponDryMass(benchmarkWeapon) : null;
  const gridMassFmt = (w, m) => w ? `${w.gridSize || w.grid || 'Large'} (${m ? m.formatted : '0t'})` : '—';
  setPair('qcGridMassActive', 'qcGridMassBench', gridMassFmt(activeWeapon, activeMass), gridMassFmt(benchmarkWeapon, benchMass));

  const activeTech = getTechSummary(activeWeapon.components);
  const benchTech = benchmarkWeapon ? getTechSummary(benchmarkWeapon.components) : null;
  const techFmt = (t) => t ? (t.techName ? `🔬 ${t.techName} (${t.upCost} UP)` : `Standard (${t.upCost} UP)`) : '—';
  setPair('qcTechActive', 'qcTechBench', techFmt(activeTech), techFmt(benchTech));

  const isPdActive = Boolean(activeWeapon.pdProjectiles && activeWeapon.type !== 'Fixed');
  const isPdBench = Boolean(benchmarkWeapon && benchmarkWeapon.pdProjectiles && benchmarkWeapon.type !== 'Fixed');
  setPair('qcPdActive', 'qcPdBench',
    isPdActive ? '📡 Active PD' : '—',
    benchmarkWeapon ? (isPdBench ? '📡 Active PD' : '—') : '');
}

function updateComparisonRadar() {
  if (!radarCanvas) return;
  updateRadarQuickCompare();
  updateHudTelemetry(hudTelLast); // benchmark changes don't re-run telemetry
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
  const axes = ['DPS', 'Alpha', 'Range', 'Velocity', 'Tracking', 'Integrity', 'Power', 'Tech/UP'];
  const totalAxes = axes.length;

  // Draw Octagonal Web
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
    readout.innerHTML = `Mod Max (100%): <strong>DPS:</strong> ${Math.round(modMax.maxDps).toLocaleString()} | <strong>Alpha:</strong> ${Math.round(modMax.maxAlpha).toLocaleString()} | <strong>Target Range:</strong> ${(modMax.maxRange / 1000).toFixed(1)}km | <strong>Vel:</strong> ${Math.round(modMax.maxVel).toLocaleString()}m/s (Ballistic) | <strong>Track:</strong> ${modMax.maxTrack.toFixed(1)}&deg;/s | <strong>HP:</strong> ${Math.round(modMax.maxIntegrity).toLocaleString()} | <strong>Pwr:</strong> ${modMax.maxPower >= 100 ? Math.round(modMax.maxPower).toLocaleString() : modMax.maxPower.toFixed(2)} MW | <strong>Tech/UP:</strong> ${modMax.maxUps} UPs`;
  }

  // Calculate Normalized Stats for Active Weapon
  const activeDps = parseFloat(outSustainedDps ? outSustainedDps.textContent.replace(/,/g, '') : 0) || 0;
  const activeAlpha = parseFloat(outAlphaDmg ? outAlphaDmg.textContent.replace(/,/g, '') : 0) || 0;
  
  const activeRange = activeWeapon ? getEngagementRange(activeWeapon, activeAmmo, true).range : 1600;
  const activeVel = (tDesiredSpeed && parseFloat(tDesiredSpeed.value)) || 1000;
  // Same basis as calculateWeaponMetrics (RotateRate); the traverse readout says "Fixed Mount" on fixed guns
  const activeTrack = ((wRotateRate && parseFloat(wRotateRate.value)) || 0) * 60 * 180 / Math.PI;
  const activePower = (outPowerMw && parseFloat(outPowerMw.textContent)) || 0;
  
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

  const activeTechInfo = getTechSummary(activeWeapon ? activeWeapon.components : []);
  const activeUps = (activeWeapon && activeWeapon.upCost !== undefined && activeWeapon.upCost !== null) ? activeWeapon.upCost : activeTechInfo.upCost;

  const activeIsBeam = isBeamWeapon(activeWeapon, activeAmmo) || activeVel >= 10000;
  const activeVelStat = activeIsBeam ? 1.0 : Math.min(1, Math.max(0, activeVel / modMax.maxVel));

  const activeStats = [
    Math.min(1, Math.max(0, activeDps / modMax.maxDps)),
    Math.min(1, Math.max(0, activeAlpha / modMax.maxAlpha)),
    Math.min(1, Math.max(0, activeRange / modMax.maxRange)),
    activeVelStat,
    Math.min(1, Math.max(0, activeTrack / modMax.maxTrack)),
    Math.min(1, Math.max(0, activeIntegrity / modMax.maxIntegrity)),
    Math.min(1, Math.max(0, activePower / modMax.maxPower)),
    Math.min(1, Math.max(0, activeUps / (modMax.maxUps || 1)))
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

    const benchAmmoObj = benchmarkAmmoKey ? ammosDb[benchmarkAmmoKey] : null;
    const benchIsBeam = bMetrics ? (bMetrics.isBeam || isBeamWeapon(benchmarkWeapon, benchAmmoObj)) : false;
    const benchVelStat = benchIsBeam ? 1.0 : Math.min(1, Math.max(0, bMetrics.velocity / modMax.maxVel));

    const bStats = [
      Math.min(1, Math.max(0, bMetrics.effectiveDps / modMax.maxDps)),
      Math.min(1, Math.max(0, bMetrics.effectiveAlphaVolley / modMax.maxAlpha)),
      Math.min(1, Math.max(0, bMetrics.range / modMax.maxRange)),
      benchVelStat,
      Math.min(1, Math.max(0, bMetrics.tracking / modMax.maxTrack)),
      Math.min(1, Math.max(0, bMetrics.integrity / modMax.maxIntegrity)),
      Math.min(1, Math.max(0, bMetrics.power / modMax.maxPower)),
      Math.min(1, Math.max(0, bMetrics.ups / (modMax.maxUps || 1)))
    ];

    drawPolygon(ctx, cx, cy, radius, bStats, 'rgba(56, 189, 248, 0.35)', '#38bdf8');
    const activeSustained = computeSustainedDps().sustainedDps;
    renderCompareTable(activeSustained, activeDps, activeAlpha, activeRange, activeVel, activeTrack, activeIntegrity,
                       bMetrics.sustainedDps, bMetrics.effectiveDps, bMetrics.effectiveAlphaVolley, bMetrics.range, bMetrics.velocity, bMetrics.tracking, bMetrics.integrity,
                       activeIsBeam, benchIsBeam);
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
    const val = Math.min(1, Math.max(0, stats[i]));
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

function renderCompareTable(aDps, aEffDps, aAlpha, aRange, aVel, aTrack, aInteg, bDps, bEffDps, bAlpha, bRange, bVel, bTrack, bInteg, aIsBeam, bIsBeam) {
  // Single-use detonations have no DPS or flight: n/a instead of a -100% delta
  const aDet = isDetonationWeapon(activeWeapon);
  const bDet = isDetonationWeapon(benchmarkWeapon);
  const rows = [
    { name: 'Sustained DPS', a: aDps, b: bDps, unit: '', aStr: `${Math.round(aDps).toLocaleString()}`, bStr: `${Math.round(bDps).toLocaleString()}` },
    { name: 'Effective DPS', a: aEffDps, b: bEffDps, unit: '', aStr: `${Math.round(aEffDps).toLocaleString()}`, bStr: `${Math.round(bEffDps).toLocaleString()}` },
    { name: 'Effective Alpha Volley', a: aAlpha, b: bAlpha, unit: 'hp', aStr: `${Math.round(aAlpha).toLocaleString()} hp`, bStr: `${Math.round(bAlpha).toLocaleString()} hp` },
    { name: 'Targeting Range', a: aRange, b: bRange, unit: 'm', aStr: `${Math.round(aRange).toLocaleString()} m`, bStr: `${Math.round(bRange).toLocaleString()} m` },
    {
      name: 'Velocity',
      a: aIsBeam ? 999999 : aVel,
      b: bIsBeam ? 999999 : bVel,
      aStr: aIsBeam ? '⚡ Hitscan (c)' : `${Math.round(aVel).toLocaleString()} m/s`,
      bStr: bIsBeam ? '⚡ Hitscan (c)' : `${Math.round(bVel).toLocaleString()} m/s`,
      customDelta: (aIsBeam && bIsBeam)
        ? { text: 'Matched (c)', color: 'var(--text-dim)' }
        : (aIsBeam && !bIsBeam)
          ? { text: '⚡ Instant', color: 'var(--green-accent)' }
          : (!aIsBeam && bIsBeam)
            ? { text: 'Sub-light', color: 'var(--red-accent)' }
            : null
    },
    { name: 'Tracking Rate', a: aTrack, b: bTrack, unit: '°/s', aStr: `${aTrack.toFixed(1)} °/s`, bStr: `${bTrack.toFixed(1)} °/s` },
    { name: 'Block Integrity', a: aInteg, b: bInteg, unit: 'hp', aStr: `${Math.round(aInteg).toLocaleString()} hp`, bStr: `${Math.round(bInteg).toLocaleString()} hp` }
  ];

  if (aDet || bDet) {
    const na = 'n/a (single use)';
    rows.forEach(r => {
      if (/DPS/.test(r.name)) {
        if (aDet) r.aStr = na;
        if (bDet) r.bStr = na;
        r.customDelta = { text: '—', color: 'var(--text-dim)' };
      } else if (r.name === 'Velocity') {
        if (aDet) r.aStr = 'Static';
        if (bDet) r.bStr = 'Static';
        r.customDelta = { text: '—', color: 'var(--text-dim)' };
      } else if (r.name === 'Targeting Range') {
        r.name = 'Range';
        if (aDet) r.aStr += ' (blast)';
        if (bDet) r.bStr += ' (blast)';
      }
    });
  }

  compareTableBody.innerHTML = rows.map(r => {
    let deltaStr = '—';
    let deltaColor = 'var(--text-dim)';
    if (r.customDelta) {
      deltaStr = r.customDelta.text;
      deltaColor = r.customDelta.color;
    } else {
      const delta = ((r.a - r.b) / (r.b || 1)) * 100;
      deltaColor = delta > 0 ? 'var(--green-accent)' : (delta < 0 ? 'var(--red-accent)' : 'var(--text-dim)');
      deltaStr = (delta >= 0 ? '+' : '') + delta.toFixed(1) + '%';
    }
    return `
      <tr>
        <td style="font-weight: 600;">${r.name}</td>
        <td style="font-family: var(--font-mono); color: var(--amber-primary);">${r.aStr}</td>
        <td style="font-family: var(--font-mono); color: var(--cyan-primary);">${r.bStr}</td>
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

  // Space Engineers In-Game Welder Stack:
  // Base mount/foundation is index 0 (welded first), top finish/armor plates are last.
  // In-game HUD displays bottom-to-top, so displaying top finishing layer at top
  // and base mount layer at bottom matches the in-game display order.
  const displayComps = comps.slice().reverse();

  // In SE, first Computer component in SBC sets OwnershipIntegrityRatio (Hacking threshold).
  // CriticalComponent specifies CriticalIntegrityRatio (Functional threshold).
  const critCompName = activeWeapon ? (activeWeapon.criticalComponent || 'Computer') : 'Computer';
  let critSbcIdx = comps.findIndex(c => c.name === critCompName);
  if (critSbcIdx === -1) critSbcIdx = comps.findIndex(c => c.name === 'Computer');
  const compSbcIdx = comps.findIndex(c => c.name === 'Computer');

  const critDisplayIdx = critSbcIdx !== -1 ? (comps.length - 1) - critSbcIdx : -1;
  const compDisplayIdx = compSbcIdx !== -1 ? (comps.length - 1) - compSbcIdx : -1;

  displayComps.forEach((c, idx) => {
    const cMeta = componentsDb[c.name] || {};
    const mass = (cMeta.mass || 10) * c.count;
    const integ = (cMeta.integrity || 100) * c.count;
    const price = (cMeta.price || 150) * c.count;
    totalValueCredits += price;

    const layerNum = displayComps.length - idx;
    const tr = document.createElement('tr');
    const isFunctional = (idx === critDisplayIdx);
    const isHacking = (idx === compDisplayIdx);

    if (isFunctional) tr.classList.add('bom-functional-row');
    if (isHacking) tr.classList.add('bom-hacking-row');

    const compDisplayName = cMeta.displayName || (GVK_TECH_COMPONENTS && GVK_TECH_COMPONENTS[c.name] && GVK_TECH_COMPONENTS[c.name].displayName) || c.name;
    let badgesHtml = '';
    if (idx === 0) {
      badgesHtml += ' <span style="font-size: 10px; color: var(--amber-primary); font-family: var(--font-mono);">[Top Finish Layer]</span>';
    } else if (idx === displayComps.length - 1) {
      badgesHtml += ' <span style="font-size: 10px; color: var(--cyan-primary); font-family: var(--font-mono);">[Base Mount Layer]</span>';
    }
    if (isFunctional) {
      badgesHtml += ' <span class="bom-thresh-tag red" title="Functional Line: Block operates above this threshold.">[⚡ Functional Threshold]</span>';
    }
    if (isHacking) {
      badgesHtml += ' <span class="bom-thresh-tag blue" title="Hacking Line: Block ownership is lost below this threshold.">[🔓 Hacking Threshold]</span>';
    }

    tr.innerHTML = `
      <td style="font-family: var(--font-mono); text-align: center; color: var(--text-muted); font-size: 11px;">Layer ${layerNum}</td>
      <td style="font-weight: 600;">${compDisplayName}${badgesHtml}</td>
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
  if (!muzzles && !isDetonationWeapon(activeWeapon)) {
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

  // Burst Consistency
  if (wShotsInBurst && wDelayAfterBurst) {
    const burstShots = safeInt(wShotsInBurst.value, 0);
    const burstDelay = safeInt(wDelayAfterBurst.value, 0);
    if (burstShots > 0 && burstDelay <= 0) {
      warnings.push("ShotsInBurst > 0 but DelayAfterBurst is 0 (Burst weapon has no delay between bursts).");
    }
  }

  // Cutoff scaling (ArmorForCutoff / GridSizeForCutoff) only matters on penetrating rounds
  const cutArmorVals = [dsCutoffArmorArmor, dsCutoffLightArmor, dsCutoffHeavyArmor, dsCutoffNonArmor].map(el => safeFloat(el ? el.value : -1, -1));
  const cutGridVals = [dsCutoffGridLarge, dsCutoffGridSmall].map(el => safeFloat(el ? el.value : -1, -1));
  const cutScalingOn = cutArmorVals.some(v => v > 0) || cutGridVals.some(v => v > 0);
  if (cutScalingOn && !(safeFloat(aBaseDamageCutoff ? aBaseDamageCutoff.value : 0, 0) > 0)) {
    warnings.push("ArmorForCutoff / GridSizeForCutoff set but BaseDamageCutoff is 0 (cutoff scaling has no effect).");
  }
  if (cutArmorVals.some(v => v > 0) && cutArmorVals.some(v => v === 0)) {
    warnings.push("ArmorForCutoff has a field set to 0: the penetration cap (and damage) becomes 0 vs that armor class. Use -1 to leave it unchanged.");
  }

  // Valid Control Modes
  if (wCtrlAutomatic && !wCtrlAutomatic.checked && !wCtrlManual.checked && !wCtrlPainter.checked) {
    warnings.push("No Valid Control Modes checked: WC treats an empty list as all modes allowed.");
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
    // Beams (lasers) are hitscan and legitimately use DesiredSpeed = 0
    if (speed <= 0 && !isBeamWeapon(activeWeapon, activeAmmo)) {
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

  // Ammo Maths: InventorySize reload buffer + stale ammo recipe (ammo_maths.js)
  if (typeof amCheckWorkbench === 'function') amCheckWorkbench(warnings);

  // Render Linter Status: one line for a single issue, a list for several
  const lintBody = (title, items) => items.length === 1
    ? `<strong class="linter-title">${title}</strong> <span>${items[0]}</span>`
    : `<strong class="linter-title">${title} (${items.length})</strong><ul class="linter-list">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  if (criticalErrors.length > 0) {
    linterBanner.className = 'linter-banner danger';
    linterText.innerHTML = lintBody(criticalErrors.length === 1 ? 'Error:' : 'Errors', criticalErrors);
  } else if (warnings.length > 0) {
    linterBanner.className = 'linter-banner warning';
    linterText.innerHTML = lintBody(warnings.length === 1 ? 'Warning:' : 'Warnings', warnings);
  } else {
    linterBanner.className = 'linter-banner clean';
    linterText.innerHTML = '<strong class="linter-title">No issues.</strong> <span>Types, bounds and balance checks all pass.</span>';
  }
  const linterIcon = linterBanner.querySelector ? linterBanner.querySelector('.linter-icon') : null;
  if (linterIcon) linterIcon.textContent = criticalErrors.length > 0 ? '🚨' : (warnings.length > 0 ? '⚠️' : '✅');
  updateHudWorkbench(criticalErrors.length, warnings.length);
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
    ammoName: "NATO_25x184mm",
    assignedAmmos: ["NATO_25x184mm"],
    maxTargetDistance: 1500,
    minTargetDistance: 0,
    topTargets: 4,
    topBlocks: 4,
    stopTrackingSpeed: 1000,
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
      restrictionRadius: 0,
      debug: false,
      checkInflatedBox: false,
      checkForAnyWeapon: false,
      stayCharged: false,
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
      offset: 0,
      reverse: false,
      dropVelocity: false,
      ignoreArming: false,
      radial: 0
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
      byBlockHit: { enable: false, radius: 0, damage: 0, depth: 0, maxAbsorb: 0, falloff: "Linear", shape: "Diamond" },
      endOfLife: { enable: false, radius: 0, damage: 0, depth: 0, maxAbsorb: 0, falloff: "Linear", shape: "Diamond" }
    },
    trajectory: {
      desiredSpeed: 1200,
      accelPerSec: 0,
      maxTrajectory: 2000,
      maxLifeTime: 3600,
      speedVariance: 0,
      rangeVariance: 0,
      deaccelTime: 0,
      targetLossDegree: 0,
      targetLossTime: 0,
      guidance: "None",
      smarts: {
        inaccuracy: 0,
        aggressiveness: 1.0,
        navAcceleration: 0,
        maxLateralThrust: 0.5,
        steeringLimit: 0,
        altNavigation: false
      }
    },
    damageScales: {
      maxIntegrity: 0,
      characters: 1.0,
      damageType: "BaseDamage",
      armorArmor: -1,
      lightArmor: -1,
      heavyArmor: -1,
      nonArmor: -1,
      falloffDistance: 0,
      falloffMinMult: 0,
      gridLarge: -1,
      gridSmall: -1
    },
    graphic: {
      visualProbability: 1.0,
      lines: {
        tracer: { enable: true, length: 12, width: 0.12, color: "255, 120, 20, 255", texture: "WeaponLaser", segmentation: false },
        trail: { enable: false, alwaysDraw: false, decayTime: 60, customWidth: 0.5, color: "200, 200, 200, 180", textures: ["WeaponLaser"] }
      }
    },
    audio: {
      shotSound: "",
      travelSound: "",
      hitSound: "DOK_CannonHit",
      voxelHitSound: "",
      playerHitSound: "",
      waterHitSound: "",
      hitPlayChance: 1.0
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
/// <summary>
/// C# export serializes the full parsed def tree (every WC field, shared helper refs kept unless edited),
/// with curated workbench and "All WeaponCore Fields" edits already applied. See wc_editor.js.
/// </summary>
function generateCSharpWeapon() {
  if (!activeWeapon) return "// No weapon selected";
  return wcExportCSharp('weapon') || `// Definition source for ${activeWeapon.defName || activeWeapon.id} is not loaded`;
}

function generateCSharpAmmo() {
  if (!activeAmmo) return "// No ammo selected";
  return wcExportCSharp('ammo') || `// Definition source for ${activeAmmo.name} is not loaded`;
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
  const icon = (sbcIcon && sbcIcon.value.trim()) || sbc.icon || `Textures\\GUI\\Icons\\Cubes\\${sub}.png`;
  const model = (sbcModel && sbcModel.value.trim()) || sbc.model || `Models\\Cubes\\${grid}\\${sub}.mwm`;
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
  const overlay = (sbcOverlayTexture && sbcOverlayTexture.value.trim()) || sbc.overlayTexture || 'Textures\\GUI\\Screens\\camera_overlay.dds';
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
  const isNpcBlock = (name && name.includes('(NPC)')) || (sub && sub.includes('_NPC'));

  function formatComponentXml(c) {
    let decompSub = c.deconstructSubtype;
    let decompType = c.deconstructType || 'Ore';
    if (!decompSub && isNpcBlock && GVK_TECH_SCRAP_MAP[c.name]) {
      decompSub = GVK_TECH_SCRAP_MAP[c.name].scrapSubtype;
      decompType = GVK_TECH_SCRAP_MAP[c.name].typeId || 'Ore';
    }

    if (decompSub) {
      return `				<Component Subtype="${c.name}" Count="${c.count}">
					<DeconstructId>
						<TypeId>${decompType}</TypeId>
						<SubtypeId>${decompSub}</SubtypeId>
					</DeconstructId>
				</Component>
`;
    }
    return `				<Component Subtype="${c.name}" Count="${c.count}"/>
`;
  }

  if (activeWeapon.components && activeWeapon.components.length > 0) {
    activeWeapon.components.forEach(c => {
      xml += formatComponentXml(c);
    });
  } else if (sbc.components && sbc.components.length > 0) {
    sbc.components.forEach(c => {
      xml += formatComponentXml(c);
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
  const btnExportSnapshots = document.getElementById('btnExportSnapshots');
  if (btnExportSnapshots && !btnExportSnapshots._clickBound) {
    btnExportSnapshots.addEventListener('click', () => {
      if (window.GVKLiveSource && typeof window.GVKLiveSource.exportSnapshots === 'function') {
        window.GVKLiveSource.exportSnapshots();
      }
    });
    btnExportSnapshots._clickBound = true;
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
      syncBalanceMatrixInputs();
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
  if (typeof amSyncMatrixInputs === 'function') amSyncMatrixInputs();
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
  if (typeof amApplyMatrixInputs === 'function') amApplyMatrixInputs();

  localStorage.setItem('GVK_BALANCE_MATRIX', JSON.stringify(balanceMatrix));
  updateCombatTelemetry();
  updateAmmoLogistics();
  renderSbcComponentsTable();
  updateDirectSbcXml();
}

// Applies WORKBENCH_FIELD_HELP tooltips to every Scope A/B Definition Workbench
// control: native title on the input plus its label, and the has-help CSS class.
function applyWorkbenchFieldHelp() {
  for (const id in WORKBENCH_FIELD_HELP) {
    const el = document.getElementById(id);
    if (!el) continue;
    const text = WORKBENCH_FIELD_HELP[id];
    const isCheckbox = el.type === 'checkbox';
    if (!isCheckbox) el.title = text;

    let label = null;
    if (isCheckbox && el.parentElement && el.parentElement.tagName === 'LABEL') {
      label = el.parentElement;
    } else {
      const item = el.closest('.control-item');
      label = item ? item.querySelector('.control-label') : null;
    }
    if (label) {
      if (!isCheckbox) label.title = text;
      label.classList.add('has-help');
      if (isCheckbox && !label.querySelector('.chk-help')) {
        const span = document.createElement('span');
        span.className = 'chk-help';
        span.textContent = text;
        label.appendChild(span);
      }
    }
  }
}

function setupWorkbenchInputEvents() {
  // Tree bindings first so the def tree (and ammo shape) update before the telemetry listeners below run
  wcSetupBindings();
  
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

  // Live recalculation on any input change
  const liveInputs = [
    wRateOfFire, wBarrelsPerShot, wReloadTime, wMagsToLoad, wHeatPerShot, wMaxHeat, wHeatSinkRate, wCooldown,
    wTrajectilesPerBarrel, wDelayUntilFire, wShotsInBurst, wDelayAfterBurst,
    wRotateRate, wElevateRate, aBaseDamage, aMass, aEnergyCost, aodBlockEnable, aodBlockRadius, aodBlockDamage, aodEolEnable, aodEolRadius, aodEolDamage,
    fEnable, fFragments, fDegrees, fChildAmmoRound, tDesiredSpeed, tMaxTrajectory,
    sbcDisplayName, sbcCubeSize, sbcBuildTime, sbcUpCost, sbcIsRelic, sbcHasCircuitry
  ];

  // Clear default styling on user input
  // Bound WC fields keep their at-default marking live (wcMarkDefault in wc_editor.js)
  const allInputs = document.querySelectorAll('.control-input');
  allInputs.forEach(input => {
    if (input.dataset && input.dataset.wcBound) return;
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
        updateAmmoLogistics();
        updateComparisonRadar();
        runWeaponCoreLinter();
      });
    }
  });

  // Targeting fields convert shared preset to custom override
  const targetingInputs = [wMaxTargetDistance, wMinTargetDistance, wTopTargets, wTopBlocks, wStopTrackingSpeed, wClosestFirst, wIgnoreDumb,
    wLockedSmartOnly, wCtrlAutomatic, wCtrlManual, wCtrlPainter];
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
        wcRevertTargeting();
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
      updateDirectSbcXml();
      showToast("Added new component layer.");
    });
  }

  const btnAutoNpcScrap = document.getElementById('btnAutoNpcScrap');
  if (btnAutoNpcScrap) {
    btnAutoNpcScrap.addEventListener('click', () => {
      if (!activeWeapon || !activeWeapon.components) return;
      let count = 0;
      activeWeapon.components.forEach(c => {
        if (GVK_TECH_SCRAP_MAP[c.name]) {
          c.deconstructSubtype = GVK_TECH_SCRAP_MAP[c.name].scrapSubtype;
          c.deconstructType = GVK_TECH_SCRAP_MAP[c.name].typeId || 'Ore';
          count++;
        }
      });
      renderSbcComponentsTable();
      updateDirectSbcXml();
      showToast(`🛡️ Assigned canonical tech scrap targets to ${count} layer(s).`);
    });
  }

  const btnApplyScrapYield = document.getElementById('btnApplyScrapYield');
  if (btnApplyScrapYield) {
    btnApplyScrapYield.addEventListener('click', () => {
      if (!activeWeapon || !activeWeapon.components) return;
      const mult = balanceMatrix.scrapYield || 0.25;
      let scaled = 0;
      activeWeapon.components.forEach(c => {
        if (GVK_TECH_SCRAP_MAP[c.name] || c.deconstructSubtype) {
          c.count = Math.max(1, Math.round(c.count * mult));
          scaled++;
        }
      });
      renderSbcComponentsTable();
      updateDirectSbcXml();
      updateCombatTelemetry();
      showToast(`⚖️ Scaled ${scaled} tech scrap layer(s) by ${Math.round(mult * 100)}% scrap yield.`);
    });
  }

  if (btnNewMinimalWeapon) btnNewMinimalWeapon.addEventListener('click', createMinimalWeapon);
  if (btnNewMinimalAmmo) btnNewMinimalAmmo.addEventListener('click', createMinimalAmmo);
  if (btnNewFragAmmo) btnNewFragAmmo.addEventListener('click', createMinimalAmmo);

  const handleResetWeapon = () => {
    if (!activeWeapon) return;
    const orig = window.GVK_DEFAULT_WEAPONS.find(w => w.id === activeWeapon.id);
    if (orig) {
      const idx = weaponsDb.findIndex(w => w.id === activeWeapon.id);
      weaponsDb[idx] = JSON.parse(JSON.stringify(orig));
      selectWeapon(activeWeapon.id);
      showToast(`↺ Reset ${activeWeapon.name} to server defaults.`);
    }
  };

  if (btnResetDefaults) {
    btnResetDefaults.addEventListener('click', handleResetWeapon);
  }
  const btnResetDefaultsWorkbench = document.getElementById('btnResetDefaultsWorkbench');
  if (btnResetDefaultsWorkbench) {
    btnResetDefaultsWorkbench.addEventListener('click', handleResetWeapon);
  }

  initShipbuilderFilters();
  initBatteryMultiplier();
  initTelemetryDeckTabs();
}

// Kickoff
window.addEventListener('DOMContentLoaded', initStudio);
