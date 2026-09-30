// wc_editor.js — full WeaponCore definition trees for the Studio: working copies, curated-input bindings,
// the schema-driven "All WeaponCore Fields" editor, and lossless C# export. Loaded after app.js and shares
// its script scope (activeAmmo, activeWeapon, helpers). The parsed def tree is the single source of truth.
'use strict';

const WcSP = window.SourcePipeline;
let wcDefs = null; // { ammos, weapons, helpers } from BUNDLED_WC_DEFS or the live pipeline
const wcWorking = { ammo: {}, weapon: {} };
const wcFragmentStash = {}; // ammo key -> Fragment subtree removed by unchecking "Enable Fragment Spawning"

function wcTypes() { return window.GVK_WC_SCHEMA && window.GVK_WC_SCHEMA.types; }
function wcHelp() { return (window.GVK_WC_SCHEMA && window.GVK_WC_SCHEMA.help) || {}; }
function wcHelpers() { return (wcDefs && wcDefs.helpers) || {}; }

function setWcDefs(defs) {
  wcDefs = defs || (typeof BUNDLED_WC_DEFS !== 'undefined' ? BUNDLED_WC_DEFS : null);
  wcWorking.ammo = {};
  wcWorking.weapon = {};
}

function wcKey(kind) {
  if (kind === 'ammo') return activeAmmo ? activeAmmo.name : null;
  return activeWeapon ? activeWeapon.defName : null;
}

function wcSource(kind, key) {
  const map = wcDefs && (kind === 'ammo' ? wcDefs.ammos : wcDefs.weapons);
  return (map && key && map[key]) || null;
}

// Working copy for the active (or given) def; created lazily so edits survive switching selections.
function wcTree(kind, key) {
  key = key || wcKey(kind);
  if (!key) return null;
  if (!wcWorking[kind][key]) {
    const src = wcSource(kind, key);
    if (!src) return null;
    wcWorking[kind][key] = JSON.parse(JSON.stringify(src.tree));
  }
  return wcWorking[kind][key];
}

function wcSourceTree(kind) { const s = wcSource(kind, wcKey(kind)); return s ? s.tree : null; }

// Raw value at path (sees through helper refs on the way, but returns a ref itself unexpanded).
function wcRawGet(tree, path) {
  if (!tree) return undefined;
  if (!path.length) return tree;
  const parent = WcSP.treeGet(tree, path.slice(0, -1), wcHelpers());
  return (parent && typeof parent === 'object') ? parent[path[path.length - 1]] : undefined;
}

function wcGet(tree, path) { return tree ? WcSP.treeGet(tree, path, wcHelpers()) : undefined; }

function wcTypeAt(kind, path) {
  const types = wcTypes();
  if (!types) return null;
  let t = WcSP.wcRootType(types, kind);
  for (const k of path) {
    if (!t) return null;
    t = typeof k === 'number' ? WcSP.wcElemType(t) : WcSP.wcFieldType(types, t, k);
  }
  return t;
}

// Rebuild the active ammo's studio shape from its tree so DPS/telemetry follow every edit.
function wcRefreshAmmoShape() {
  if (!activeAmmo) return;
  const tree = wcTree('ammo');
  if (!tree) return;
  const src = wcSource('ammo', activeAmmo.name);
  const resolved = WcSP.resolveTree(WcSP.inlineHelpers(tree, wcHelpers()), {}, new Set());
  Object.assign(activeAmmo, WcSP.ammoShape(activeAmmo.name, resolved, src && src.file));
}

function wcSet(kind, path, value) {
  const tree = wcTree(kind);
  if (!tree) return;
  WcSP.treeSet(tree, path, value, wcHelpers());
  if (kind === 'ammo') wcRefreshAmmoShape();
}

function wcAfterEdit(kind, fromCurated) {
  if (!fromCurated) wcSyncCurated(kind);
  if (typeof updateCombatTelemetry === 'function') updateCombatTelemetry();
  if (typeof updateComparisonRadar === 'function') updateComparisonRadar();
  if (typeof runWeaponCoreLinter === 'function') runWeaponCoreLinter();
  if (fromCurated) wcScheduleRender(kind);
}

// ==========================================================================
// CURATED INPUT BINDINGS (workbench panels <-> def tree paths)
// ==========================================================================
// [kind, elementId, path ('#' = active mount point index), mode, value shown when the field is unset]
// Unset displays keep the studio's long-standing fallbacks (telemetry reads these inputs); export is unaffected.
const WC_BINDINGS = [
  ['weapon', 'wSubtypeId', 'Assignments.MountPoints.#.SubtypeId', 'str', ''],
  ['weapon', 'wSpinPartId', 'Assignments.MountPoints.#.SpinPartId', 'str', ''],
  ['weapon', 'wMuzzlePartId', 'Assignments.MountPoints.#.MuzzlePartId', 'str', ''],
  ['weapon', 'wAzimuthPartId', 'Assignments.MountPoints.#.AzimuthPartId', 'str', ''],
  ['weapon', 'wElevationPartId', 'Assignments.MountPoints.#.ElevationPartId', 'str', ''],
  ['weapon', 'wDurabilityMod', 'Assignments.MountPoints.#.DurabilityMod', 'num', 0.5],
  ['weapon', 'wIconName', 'Assignments.MountPoints.#.IconName', 'str', ''],
  ['weapon', 'wScope', 'Assignments.Scope', 'str', 'scope'],
  ['weapon', 'wMuzzles', 'Assignments.Muzzles', 'csv', ''],
  ['weapon', 'wMaxTargetDistance', 'Targeting.MaxTargetDistance', 'num', 1600],
  ['weapon', 'wMinTargetDistance', 'Targeting.MinTargetDistance', 'num', 0],
  ['weapon', 'wTopTargets', 'Targeting.TopTargets', 'num', 4],
  ['weapon', 'wTopBlocks', 'Targeting.TopBlocks', 'num', 8],
  ['weapon', 'wStopTrackingSpeed', 'Targeting.StopTrackingSpeed', 'num', 1000],
  ['weapon', 'wClosestFirst', 'Targeting.ClosestFirst', 'bool', true],
  ['weapon', 'wIgnoreDumb', 'Targeting.IgnoreDumbProjectiles', 'bool', true],
  ['weapon', 'wLockedSmartOnly', 'Targeting.LockedSmartOnly', 'bool', false],
  ['weapon', 'wThreatGrids', 'Targeting.Threats', 'member:Grids'],
  ['weapon', 'wThreatProjectiles', 'Targeting.Threats', 'member:Projectiles'],
  ['weapon', 'wThreatCharacters', 'Targeting.Threats', 'member:Characters'],
  ['weapon', 'wThreatMeteors', 'Targeting.Threats', 'member:Meteors'],
  ['weapon', 'wThreatNeutrals', 'Targeting.Threats', 'member:Neutrals'],
  ['weapon', 'wSubOffense', 'Targeting.SubSystems', 'member:Offense'],
  ['weapon', 'wSubPower', 'Targeting.SubSystems', 'member:Power'],
  ['weapon', 'wSubProduction', 'Targeting.SubSystems', 'member:Production'],
  ['weapon', 'wSubThrust', 'Targeting.SubSystems', 'member:Thrust'],
  ['weapon', 'wSubJumping', 'Targeting.SubSystems', 'member:Jumping'],
  ['weapon', 'wSubSteering', 'Targeting.SubSystems', 'member:Steering'],
  ['weapon', 'wSubAny', 'Targeting.SubSystems', 'member:Any'],
  ['weapon', 'wCtrlAutomatic', 'Targeting.ValidControlModes', 'ctrl:Automatic'],
  ['weapon', 'wCtrlManual', 'Targeting.ValidControlModes', 'ctrl:Manual'],
  ['weapon', 'wCtrlPainter', 'Targeting.ValidControlModes', 'ctrl:Painter'],
  ['weapon', 'wPartName', 'HardPoint.PartName', 'str', ''],
  ['weapon', 'wDeviateAngle', 'HardPoint.DeviateShotAngle', 'num', 0.15],
  ['weapon', 'wAimingTolerance', 'HardPoint.AimingTolerance', 'num', 3],
  ['weapon', 'wAimLeading', 'HardPoint.AimLeadingPrediction', 'enum', 'Advanced'],
  ['weapon', 'wDelayCeaseFire', 'HardPoint.DelayCeaseFire', 'num', 0],
  ['weapon', 'wAddToleranceToTracking', 'HardPoint.AddToleranceToTracking', 'bool', false],
  ['weapon', 'wCanShootSubmerged', 'HardPoint.CanShootSubmerged', 'bool', false],
  ['weapon', 'wNpcSafe', 'HardPoint.NpcSafe', 'bool', false],
  ['weapon', 'wRotateRate', 'HardPoint.HardWare.RotateRate', 'num', 0.015],
  ['weapon', 'wElevateRate', 'HardPoint.HardWare.ElevateRate', 'num', 0.015],
  ['weapon', 'wMinAzimuth', 'HardPoint.HardWare.MinAzimuth', 'num', -180],
  ['weapon', 'wMaxAzimuth', 'HardPoint.HardWare.MaxAzimuth', 'num', 180],
  ['weapon', 'wMinElevation', 'HardPoint.HardWare.MinElevation', 'num', -15],
  ['weapon', 'wMaxElevation', 'HardPoint.HardWare.MaxElevation', 'num', 80],
  ['weapon', 'wHomeAzimuth', 'HardPoint.HardWare.HomeAzimuth', 'num', 0],
  ['weapon', 'wHomeElevation', 'HardPoint.HardWare.HomeElevation', 'num', 0],
  ['weapon', 'wInventorySize', 'HardPoint.HardWare.InventorySize', 'num', 0.9],
  ['weapon', 'wIdlePower', 'HardPoint.HardWare.IdlePower', 'num', 0.01],
  ['weapon', 'wHardwareType', 'HardPoint.HardWare.Type', 'enum', 'BlockWeapon'],
  ['weapon', 'wOffsetX', 'HardPoint.HardWare.Offset', 'vec:x'],
  ['weapon', 'wOffsetY', 'HardPoint.HardWare.Offset', 'vec:y'],
  ['weapon', 'wOffsetZ', 'HardPoint.HardWare.Offset', 'vec:z'],
  ['weapon', 'wRateOfFire', 'HardPoint.Loading.RateOfFire', 'num', 1000],
  ['weapon', 'wBarrelsPerShot', 'HardPoint.Loading.BarrelsPerShot', 'num', 1],
  ['weapon', 'wTrajectilesPerBarrel', 'HardPoint.Loading.TrajectilesPerBarrel', 'num', 1],
  ['weapon', 'wSkipBarrels', 'HardPoint.Loading.SkipBarrels', 'num', 0],
  ['weapon', 'wReloadTime', 'HardPoint.Loading.ReloadTime', 'num', 0],
  ['weapon', 'wMagsToLoad', 'HardPoint.Loading.MagsToLoad', 'num', 1],
  ['weapon', 'wDelayUntilFire', 'HardPoint.Loading.DelayUntilFire', 'num', 0],
  ['weapon', 'wHeatPerShot', 'HardPoint.Loading.HeatPerShot', 'num', 0],
  ['weapon', 'wMaxHeat', 'HardPoint.Loading.MaxHeat', 'num', 0],
  ['weapon', 'wHeatSinkRate', 'HardPoint.Loading.HeatSinkRate', 'num', 0],
  ['weapon', 'wCooldown', 'HardPoint.Loading.Cooldown', 'num', 0.5],
  ['weapon', 'wShotsInBurst', 'HardPoint.Loading.ShotsInBurst', 'num', 0],
  ['weapon', 'wDelayAfterBurst', 'HardPoint.Loading.DelayAfterBurst', 'num', 0],
  ['weapon', 'wFireFull', 'HardPoint.Loading.FireFull', 'bool', false],
  ['weapon', 'wGiveUpAfter', 'HardPoint.Loading.GiveUpAfter', 'bool', false],
  ['weapon', 'wGoHomeToReload', 'HardPoint.Loading.GoHomeToReload', 'bool', false],
  ['weapon', 'wDropTargetUntilLoaded', 'HardPoint.Loading.DropTargetUntilLoaded', 'bool', false],
  ['weapon', 'wDegradeWithHeat', 'HardPoint.Loading.DegradeRof', 'bool', false],
  ['weapon', 'wStayCharged', 'HardPoint.Loading.StayCharged', 'bool', false],
  ['weapon', 'wSoundFiring', 'HardPoint.Audio.FiringSound', 'str', ''],
  ['weapon', 'wSoundPreFiring', 'HardPoint.Audio.PreFiringSound', 'str', ''],
  ['weapon', 'wSoundFiringPerShot', 'HardPoint.Audio.FiringSoundPerShot', 'bool', false],
  ['weapon', 'wSoundReload', 'HardPoint.Audio.ReloadSound', 'str', ''],
  ['weapon', 'wSoundRotate', 'HardPoint.Audio.HardPointRotationSound', 'str', ''],
  ['weapon', 'wSoundNoAmmo', 'HardPoint.Audio.NoAmmoSound', 'str', ''],
  ['weapon', 'wUiRateOfFire', 'HardPoint.Ui.RateOfFire', 'bool', false],
  ['weapon', 'wUiDamageModifier', 'HardPoint.Ui.DamageModifier', 'bool', false],
  ['weapon', 'wUiToggleGuidance', 'HardPoint.Ui.ToggleGuidance', 'bool', false],
  ['weapon', 'wUiEnableOverload', 'HardPoint.Ui.EnableOverload', 'bool', false],
  ['weapon', 'wConstructPartCap', 'HardPoint.Other.ConstructPartCap', 'num', 0],
  ['weapon', 'wRestrictionRadius', 'HardPoint.Other.RestrictionRadius', 'num', 0],
  ['weapon', 'wOtherDebug', 'HardPoint.Other.Debug', 'bool', false],
  ['weapon', 'wCheckInflatedBox', 'HardPoint.Other.CheckInflatedBox', 'bool', false],
  ['weapon', 'wCheckForAnyWeapon', 'HardPoint.Other.CheckForAnyWeapon', 'bool', false],
  ['weapon', 'wNoVoxelLOSCheck', 'HardPoint.Other.NoVoxelLosCheck', 'bool', false],
  ['weapon', 'selectAnimationDef', 'Animations', 'ref'],

  ['ammo', 'aAmmoRound', 'AmmoRound', 'str', ''],
  ['ammo', 'aAmmoMagazine', 'AmmoMagazine', 'str', ''],
  ['ammo', 'aTerminalName', 'TerminalName', 'str', ''],
  ['ammo', 'aBaseDamage', 'BaseDamage', 'num', 0],
  ['ammo', 'aBaseDamageCutoff', 'BaseDamageCutoff', 'num', 0],
  ['ammo', 'aMass', 'Mass', 'num', 0],
  ['ammo', 'aHealth', 'Health', 'num', 0],
  ['ammo', 'aBackKick', 'BackKickForce', 'num', 0],
  ['ammo', 'aDecayPerShot', 'DecayPerShot', 'num', 0],
  ['ammo', 'aEnergyCost', 'EnergyCost', 'num', 0],
  ['ammo', 'aEnergyMagazineSize', 'EnergyMagazineSize', 'num', 0],
  ['ammo', 'aHeatModifier', 'HeatModifier', 'num', 1],
  ['ammo', 'aHeatNeededToFire', 'HeatNeededToFire', 'num', 0],
  ['ammo', 'aHardPointUsable', 'HardPointUsable', 'bool', true],
  ['ammo', 'aHybridRound', 'HybridRound', 'bool', false],
  ['ammo', 'aNpcSafe', 'NpcSafe', 'bool', true],
  ['ammo', 'aNoGridOrArmorScaling', 'NoGridOrArmorScaling', 'bool', false],
  ['ammo', 'aIgnoreWater', 'IgnoreWater', 'bool', false],
  ['ammo', 'aIgnoreVoxels', 'IgnoreVoxels', 'bool', false],
  ['ammo', 'aIgnoreGrids', 'IgnoreGrids', 'bool', false],
  ['ammo', 'aAllowNegativeHeatModifier', 'AllowNegativeHeatModifier', 'bool', false],
  ['ammo', 'aGridsTargetSeekersTargetingThis', 'GridsTargetSeekersTargetingThis', 'bool', false],
  ['ammo', 'tDesiredSpeed', 'Trajectory.DesiredSpeed', 'num', 0],
  ['ammo', 'tAccelPerSec', 'Trajectory.AccelPerSec', 'num', 0],
  ['ammo', 'tMaxTrajectory', 'Trajectory.MaxTrajectory', 'num', 0],
  ['ammo', 'tMaxLifeTime', 'Trajectory.MaxLifeTime', 'num', 3600],
  ['ammo', 'tSpeedVariance', 'Trajectory.SpeedVariance', 'rand'],
  ['ammo', 'tRangeVariance', 'Trajectory.RangeVariance', 'rand'],
  ['ammo', 'tDeaccelTime', 'Trajectory.DeaccelTime', 'num', 0],
  ['ammo', 'tTargetLossDegree', 'Trajectory.TargetLossDegree', 'num', 0],
  ['ammo', 'tTargetLossTime', 'Trajectory.TargetLossTime', 'num', 0],
  ['ammo', 'tGuidance', 'Trajectory.Guidance', 'enum', 'None'],
  ['ammo', 'sInaccuracy', 'Trajectory.Smarts.Inaccuracy', 'num', 0],
  ['ammo', 'sAggressiveness', 'Trajectory.Smarts.Aggressiveness', 'num', 1],
  ['ammo', 'sNavAcceleration', 'Trajectory.Smarts.NavAcceleration', 'num', 0],
  ['ammo', 'sMaxLateralThrust', 'Trajectory.Smarts.MaxLateralThrust', 'num', 0.5],
  ['ammo', 'sSteeringLimit', 'Trajectory.Smarts.SteeringLimit', 'num', 0],
  ['ammo', 'sAltNavigation', 'Trajectory.Smarts.AltNavigation', 'bool', false],
  ['ammo', 'aShape', 'Shape.Shape', 'enum', 'LineShape'],
  ['ammo', 'aDiameter', 'Shape.Diameter', 'num', -1],
  ['ammo', 'oMaxObjectsHit', 'ObjectsHit.MaxObjectsHit', 'num', 1],
  ['ammo', 'oCountBlocks', 'ObjectsHit.CountBlocks', 'bool', true],
  ['ammo', 'oSkipBlocksForAOE', 'ObjectsHit.SkipBlocksForAOE', 'bool', false],
  ['ammo', 'dsMaxIntegrity', 'DamageScales.MaxIntegrity', 'num', 0],
  ['ammo', 'dsCharacters', 'DamageScales.Characters', 'num', -1],
  ['ammo', 'dsDamageType', 'DamageScales.DamageType.Base', 'enum', 'Energy'],
  ['ammo', 'dsArmorArmor', 'DamageScales.Armor.Armor', 'num', -1],
  ['ammo', 'dsLightArmor', 'DamageScales.Armor.Light', 'num', -1],
  ['ammo', 'dsHeavyArmor', 'DamageScales.Armor.Heavy', 'num', -1],
  ['ammo', 'dsNonArmor', 'DamageScales.Armor.NonArmor', 'num', -1],
  ['ammo', 'dsFalloffDistance', 'DamageScales.FallOff.Distance', 'num', 0],
  ['ammo', 'dsFalloffMinMult', 'DamageScales.FallOff.MinMultipler', 'num', 0],
  ['ammo', 'dsGridLarge', 'DamageScales.Grids.Large', 'num', -1],
  ['ammo', 'dsGridSmall', 'DamageScales.Grids.Small', 'num', -1],
  ['ammo', 'dsCutoffArmorArmor', 'DamageScales.ArmorForCutoff.Armor', 'num', -1],
  ['ammo', 'dsCutoffLightArmor', 'DamageScales.ArmorForCutoff.Light', 'num', -1],
  ['ammo', 'dsCutoffHeavyArmor', 'DamageScales.ArmorForCutoff.Heavy', 'num', -1],
  ['ammo', 'dsCutoffNonArmor', 'DamageScales.ArmorForCutoff.NonArmor', 'num', -1],
  ['ammo', 'dsCutoffGridLarge', 'DamageScales.GridSizeForCutoff.Large', 'num', -1],
  ['ammo', 'dsCutoffGridSmall', 'DamageScales.GridSizeForCutoff.Small', 'num', -1],
  ['ammo', 'aodBlockEnable', 'AreaOfDamage.ByBlockHit.Enable', 'bool', false],
  ['ammo', 'aodBlockRadius', 'AreaOfDamage.ByBlockHit.Radius', 'num', 0],
  ['ammo', 'aodBlockDamage', 'AreaOfDamage.ByBlockHit.Damage', 'num', 0],
  ['ammo', 'aodBlockDepth', 'AreaOfDamage.ByBlockHit.Depth', 'num', 0],
  ['ammo', 'aodBlockMaxAbsorb', 'AreaOfDamage.ByBlockHit.MaxAbsorb', 'num', 0],
  ['ammo', 'aodBlockFalloff', 'AreaOfDamage.ByBlockHit.Falloff', 'enum', 'Legacy'],
  ['ammo', 'aodBlockShape', 'AreaOfDamage.ByBlockHit.Shape', 'enum', 'Round'],
  ['ammo', 'aodEolEnable', 'AreaOfDamage.EndOfLife.Enable', 'bool', false],
  ['ammo', 'aodEolRadius', 'AreaOfDamage.EndOfLife.Radius', 'num', 0],
  ['ammo', 'aodEolDamage', 'AreaOfDamage.EndOfLife.Damage', 'num', 0],
  ['ammo', 'aodEolDepth', 'AreaOfDamage.EndOfLife.Depth', 'num', 0],
  ['ammo', 'aodEolMaxAbsorb', 'AreaOfDamage.EndOfLife.MaxAbsorb', 'num', 0],
  ['ammo', 'aodEolFalloff', 'AreaOfDamage.EndOfLife.Falloff', 'enum', 'Legacy'],
  ['ammo', 'aodEolShape', 'AreaOfDamage.EndOfLife.Shape', 'enum', 'Round'],
  ['ammo', 'fEnable', 'Fragment', 'fragEnable'],
  ['ammo', 'fReverse', 'Fragment.Reverse', 'bool', false],
  ['ammo', 'fDropVelocity', 'Fragment.DropVelocity', 'bool', false],
  ['ammo', 'fIgnoreArming', 'Fragment.IgnoreArming', 'bool', false],
  ['ammo', 'fFragments', 'Fragment.Fragments', 'num', 0],
  ['ammo', 'fDegrees', 'Fragment.Degrees', 'num', 0],
  ['ammo', 'fRadial', 'Fragment.Radial', 'num', 0],
  ['ammo', 'fOffset', 'Fragment.Offset', 'num', 0],
  ['ammo', 'fChildAmmoRound', 'Fragment.AmmoRound', 'str', ''],
  ['ammo', 'pEnable', 'Pattern.Enable', 'bool', false],
  ['ammo', 'pPatterns', 'Pattern.Patterns', 'csv', ''],
  ['ammo', 'pTriggerChance', 'Pattern.TriggerChance', 'num', 1],
  ['ammo', 'pRandomMin', 'Pattern.RandomMin', 'num', 0],
  ['ammo', 'pRandomMax', 'Pattern.RandomMax', 'num', 0],
  ['ammo', 'pPatternSteps', 'Pattern.PatternSteps', 'num', 1],
  ['ammo', 'pMode', 'Pattern.Mode', 'enum', 'Never'],
  ['ammo', 'pSkipParent', 'Pattern.SkipParent', 'bool', false],
  ['ammo', 'pRandom', 'Pattern.Random', 'bool', false],
  ['ammo', 'ewEnable', 'Ewar.Enable', 'bool', false],
  ['ammo', 'ewType', 'Ewar.Type', 'enum', 'AntiSmart'],
  ['ammo', 'ewMode', 'Ewar.Mode', 'enum', 'Effect'],
  ['ammo', 'ewStrength', 'Ewar.Strength', 'num', 0],
  ['ammo', 'ewRadius', 'Ewar.Radius', 'num', 0],
  ['ammo', 'ewDuration', 'Ewar.Duration', 'num', 0],
  ['ammo', 'ewMaxStacks', 'Ewar.MaxStacks', 'num', 1],
  ['ammo', 'ewStackDuration', 'Ewar.StackDuration', 'bool', false],
  ['ammo', 'ewDeplete', 'Ewar.Depletable', 'bool', false],
  ['ammo', 'gVisualProb', 'AmmoGraphics.VisualProbability', 'num', 1],
  ['ammo', 'gTracerEnable', 'AmmoGraphics.Lines.Tracer.Enable', 'bool', true],
  ['ammo', 'gTracerLength', 'AmmoGraphics.Lines.Tracer.Length', 'num', 10],
  ['ammo', 'gTracerWidth', 'AmmoGraphics.Lines.Tracer.Width', 'num', 0.1],
  ['ammo', 'gTracerColor', 'AmmoGraphics.Lines.Tracer.Color', 'color', ''],
  ['ammo', 'gTracerTexture', 'AmmoGraphics.Lines.Tracer.Textures', 'first', ''],
  ['ammo', 'gTracerSegmented', 'AmmoGraphics.Lines.Tracer.Segmentation.Enable', 'bool', false],
  ['ammo', 'gTrailEnable', 'AmmoGraphics.Lines.Trail.Enable', 'bool', false],
  ['ammo', 'gTrailAlwaysDraw', 'AmmoGraphics.Lines.Trail.AlwaysDraw', 'bool', false],
  ['ammo', 'gTrailDecay', 'AmmoGraphics.Lines.Trail.DecayTime', 'num', 0],
  ['ammo', 'gTrailWidth', 'AmmoGraphics.Lines.Trail.CustomWidth', 'num', 0],
  ['ammo', 'gTrailColor', 'AmmoGraphics.Lines.Trail.Color', 'color', ''],
  ['ammo', 'gTrailTextures', 'AmmoGraphics.Lines.Trail.Textures', 'csv', ''],
  ['ammo', 'aSoundShot', 'AmmoAudio.ShotSound', 'str', ''],
  ['ammo', 'aSoundTravel', 'AmmoAudio.TravelSound', 'str', ''],
  ['ammo', 'aSoundHit', 'AmmoAudio.HitSound', 'str', ''],
  ['ammo', 'aSoundVoxelHit', 'AmmoAudio.VoxelHitSound', 'str', ''],
  ['ammo', 'aSoundPlayerHit', 'AmmoAudio.PlayerHitSound', 'str', ''],
  ['ammo', 'aSoundWaterHit', 'AmmoAudio.WaterHitSound', 'str', ''],
  ['ammo', 'aHitPlayChance', 'AmmoAudio.HitPlayChance', 'num', 1],
  ['ammo', 'syncInterval', 'Sync.PositionSyncInterval', 'num', 0],
  ['ammo', 'syncPatchWindow', 'Sync.PositionPatchWindow', 'num', 0],
  ['ammo', 'syncFull', 'Sync.Full', 'bool', false],
  ['ammo', 'syncPointDefense', 'Sync.PointDefense', 'bool', true],
  ['ammo', 'syncOnHitDeath', 'Sync.OnHitDeath', 'bool', false],
  ['ammo', 'syncUpdateOnRandomize', 'Sync.PositionUpdateOnRandomize', 'bool', false],
].map(([kind, id, path, mode, def]) => ({ kind, id, path, mode, def }));

function wcBindingPath(b) {
  const mount = (activeWeapon && activeWeapon.mountIndex) || 0;
  return b.path.split('.').map((k) => (k === '#' ? mount : k));
}

function wcIdName(v) { return (v && typeof v === 'object' && v.__id !== undefined) ? String(v.__id).split('.').pop() : v; }
function wcCallArg(v, key, idx) {
  if (!v || typeof v !== 'object' || v.__call === undefined) return undefined;
  if (v.args && v.args[key] !== undefined) return v.args[key];
  return v.pos ? v.pos[idx] : undefined;
}

// Read a binding from the tree: { set: bool, value: DOM value (string or bool) }
function wcReadBinding(b, tree) {
  const path = wcBindingPath(b);
  const v = wcGet(tree, path);
  const [mode, arg] = b.mode.split(':');
  switch (mode) {
    case 'bool': return { set: v !== undefined, value: v === true };
    case 'num': return { set: typeof v === 'number', value: typeof v === 'number' ? v : b.def };
    case 'str': return { set: typeof v === 'string', value: typeof v === 'string' ? v : b.def };
    case 'enum': return { set: v !== undefined, value: v !== undefined ? wcIdName(v) : b.def };
    case 'ref': return { set: v !== undefined, value: v !== undefined ? wcIdName(wcRawGet(tree, path)) : '' };
    case 'csv': return { set: Array.isArray(v), value: Array.isArray(v) ? v.join(', ') : b.def };
    case 'first': return { set: Array.isArray(v) && v.length > 0, value: Array.isArray(v) && v.length ? v[0] : b.def };
    case 'rand': { const end = wcCallArg(v, 'end', 1); return { set: end !== undefined, value: end !== undefined ? end : 0 }; }
    case 'color': {
      if (!v || v.__call === undefined) return { set: false, value: b.def };
      const parts = [['red', 0], ['green', 1], ['blue', 2], ['alpha', 3]].map(([k, i]) => wcCallArg(v, k, i));
      return { set: true, value: parts.map((x) => (x === undefined ? 0 : x)).join(', ') };
    }
    case 'vec': { const n = wcCallArg(v, arg, 'xyz'.indexOf(arg)); return { set: n !== undefined, value: n !== undefined ? n : 0 }; }
    case 'member': return { set: Array.isArray(v), value: Array.isArray(v) && v.some((x) => wcIdName(x) === arg) };
    case 'ctrl': return { set: Array.isArray(v), value: !Array.isArray(v) || !v.length || v.some((x) => wcIdName(x) === arg) };
    case 'fragEnable': return { set: true, value: !!(v && v.AmmoRound && v.Fragments > 0) };
    default: return { set: false, value: b.def };
  }
}

// Write a curated DOM element's value into the working tree.
function wcWriteBinding(b, el) {
  const tree = wcTree(b.kind);
  if (!tree) return;
  const path = wcBindingPath(b);
  const [mode, arg] = b.mode.split(':');
  const text = typeof el.value === 'string' ? el.value.trim() : '';
  const t = wcTypeAt(b.kind, path);
  const cur = wcGet(tree, path);
  let v;
  switch (mode) {
    case 'bool': v = !!el.checked; break;
    case 'num': {
      const n = parseFloat(text);
      if (isNaN(n)) v = undefined;
      else v = (t && t.kind === 'prim' && /int|uint|long|short|byte/.test(t.name)) ? Math.round(n) : n;
      break;
    }
    case 'str': v = text ? el.value : undefined; break;
    case 'enum': v = text ? { __id: text } : undefined; break;
    case 'ref': v = (text && text !== 'None') ? { __id: text } : undefined; break;
    case 'csv': { const arr = text.split(',').map((x) => x.trim()).filter(Boolean); v = arr.length ? arr : undefined; break; }
    case 'first': {
      const arr = Array.isArray(cur) ? cur.slice() : [];
      if (text) arr[0] = text; else arr.shift();
      v = arr.length ? arr : undefined;
      break;
    }
    case 'rand': {
      const n = parseFloat(text);
      const start = wcCallArg(cur, 'start', 0);
      v = { __call: 'Random', args: { start: start !== undefined ? start : 0, end: isNaN(n) ? 0 : n } };
      break;
    }
    case 'color': {
      const n = text.split(',').map((x) => parseFloat(x));
      if (!text) { v = undefined; break; }
      v = { __call: 'Color', args: { red: n[0] || 0, green: n[1] || 0, blue: n[2] || 0, alpha: n[3] === undefined || isNaN(n[3]) ? 1 : n[3] } };
      break;
    }
    case 'vec': {
      const args = {};
      'xyz'.split('').forEach((k, i) => { const c = wcCallArg(cur, k, i); args[k] = c !== undefined ? c : 0; });
      const n = parseFloat(text);
      args[arg] = isNaN(n) ? 0 : n;
      v = { __call: 'Vector', args };
      break;
    }
    case 'member': case 'ctrl': {
      const prefix = mode === 'ctrl' ? 'ControlModes.' : '';
      let arr = Array.isArray(cur) ? cur.slice() : [];
      if (mode === 'ctrl' && !arr.length) arr = ['Automatic', 'Manual', 'Painter'].map((m) => ({ __id: prefix + m }));
      arr = arr.filter((x) => wcIdName(x) !== arg);
      if (el.checked) arr.push({ __id: prefix + arg });
      // ValidControlModes: all three allowed == field omitted (WC default)
      v = (mode === 'ctrl' && arr.length >= 3) ? undefined : arr;
      break;
    }
    case 'fragEnable': {
      const key = wcKey('ammo');
      if (el.checked) v = wcFragmentStash[key] || cur || { AmmoRound: '', Fragments: 1 };
      else { if (cur) wcFragmentStash[key] = JSON.parse(JSON.stringify(cur)); v = undefined; }
      break;
    }
    default: return;
  }
  wcSet(b.kind, path, v);
}

// Push tree values into the curated workbench inputs (runs after the legacy shape-based populate).
function wcSyncCurated(kind) {
  const tree = wcTree(kind);
  if (!tree) return;
  for (const b of WC_BINDINGS) {
    if (b.kind !== kind) continue;
    const el = document.getElementById(b.id);
    if (!el) continue;
    const r = wcReadBinding(b, tree);
    if (el.type === 'checkbox') {
      if (typeof bindCheckboxVal === 'function') bindCheckboxVal(el, r.set ? r.value : undefined, r.value);
      else el.checked = !!r.value;
    } else if (typeof bindInputVal === 'function') {
      bindInputVal(el, r.set ? r.value : undefined, r.value);
    } else {
      el.value = r.value;
    }
  }
  if (kind === 'ammo' && typeof updateFragChainVisual === 'function') updateFragChainVisual();
}

function wcSetupBindings() {
  for (const b of WC_BINDINGS) {
    const el = document.getElementById(b.id);
    if (!el) continue;
    const handler = () => { wcWriteBinding(b, el); wcAfterEdit(b.kind, true); };
    el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', handler);
  }
}

// Weapon ammo list (assigned-ammo badges) -> Ammos = new[] { ... }
function wcSyncWeaponAmmos() {
  if (!activeWeapon || !wcTree('weapon')) return;
  const ids = (activeWeapon.assignedAmmos || []).filter(Boolean).map((a) => ({ __id: a }));
  wcSet('weapon', ['Ammos'], ids);
  wcScheduleRender('weapon');
}

// Restore the Targeting block to what the source file had (usually a shared helper ref).
function wcRevertTargeting() {
  const src = wcSourceTree('weapon');
  if (!src) return;
  wcSet('weapon', ['Targeting'], src.Targeting === undefined ? undefined : JSON.parse(JSON.stringify(src.Targeting)));
  wcSyncCurated('weapon');
  wcAfterEdit('weapon', false);
  wcScheduleRender('weapon');
}

// ==========================================================================
// C# EXPORT
// ==========================================================================
function wcExportCSharp(kind) {
  const types = wcTypes();
  const tree = wcTree(kind);
  const name = wcKey(kind);
  if (!types || !tree || !name) return null;
  return WcSP.serializeWcDef(kind, name, tree, types);
}

// ==========================================================================
// ALL WEAPONCORE FIELDS EDITOR (schema-driven, every Structure.cs field)
// ==========================================================================
const wcPanel = {
  ammo: { filter: '', onlySet: true, open: new Set(), timer: null },
  weapon: { filter: '', onlySet: true, open: new Set(), timer: null },
};
const WC_MAX_FLAT_ROWS = 300;

function wcEl(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function wcSame(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
function wcIsRandomize(t) { return !!(t && t.kind === 'struct' && /\.Randomize$/.test(t.q)); }
function wcIsIntType(t) { return !!(t && t.kind === 'prim' && /^(int|uint|long|short|byte)$/.test(t.name)); }
function wcIsNumType(t) { return !!(t && t.kind === 'prim' && t.name !== 'bool' && t.name !== 'string'); }

// Leaf = anything edited inline (prims, enums, vectors, Randomize, arrays of those, or odd raw values).
function wcIsBranch(t, v) {
  if (!t || t.kind !== 'struct' || wcIsRandomize(t)) return false;
  if (v && typeof v === 'object' && v.__call !== undefined) return false;
  if (v !== undefined && (typeof v !== 'object' || v === null)) return false;
  return true;
}

function wcCountSet(v) {
  if (v === undefined) return 0;
  if (Array.isArray(v)) return v.reduce((n, x) => n + (x && typeof x === 'object' && x.__id === undefined && x.__call === undefined ? wcCountSet(x) : 1), 0);
  if (v && typeof v === 'object' && v.__id === undefined && v.__call === undefined) {
    return Object.keys(v).reduce((n, k) => n + wcCountSet(v[k]), 0);
  }
  return 1;
}

function wcSchemaLeafCount(types, t, depth) {
  if (!t || t.kind !== 'struct' || wcIsRandomize(t) || depth > 10) return 1;
  let n = 0;
  for (const f of Object.keys(types.structs[t.q] || {})) n += wcSchemaLeafCount(types, WcSP.wcFieldType(types, t, f), depth + 1);
  return n;
}

function wcHelpFor(t, field) {
  const help = wcHelp();
  const owner = t && t.q ? t.q.split('.').pop() : '';
  return help[owner + '.' + field] || '';
}

function wcScheduleRender(kind) {
  const st = wcPanel[kind];
  clearTimeout(st.timer);
  st.timer = setTimeout(() => renderWcFieldEditor(kind), 150);
}

function renderWcFieldEditor(kind) {
  const host = document.getElementById(kind === 'ammo' ? 'ammoWcFieldsPanel' : 'weaponWcFieldsPanel');
  if (!host) return;
  const st = wcPanel[kind];
  const types = wcTypes();
  const tree = wcTree(kind);
  host.innerHTML = '';
  const badge = document.getElementById(kind === 'ammo' ? 'ammoWcFieldsBadge' : 'weaponWcFieldsBadge');
  if (!types || !tree) {
    host.appendChild(wcEl('div', 'wcf-empty', 'Definition source not loaded for this selection.'));
    if (badge) badge.textContent = 'Unavailable';
    return;
  }
  const root = WcSP.wcRootType(types, kind);
  if (badge) badge.textContent = `${wcCountSet(tree)} set · ${wcSchemaLeafCount(types, root, 0)} WC fields`;

  // Toolbar
  const bar = wcEl('div', 'wcf-toolbar');
  const filter = wcEl('input', 'control-input wcf-filter');
  filter.type = 'search';
  filter.placeholder = 'Filter fields (e.g. Smarts, Heat, Sound, Proximity)…';
  filter.value = st.filter;
  filter.addEventListener('input', () => { st.filter = filter.value; renderWcFieldBody(kind, body); });
  const onlyLbl = wcEl('label', 'chk-label');
  const only = wcEl('input');
  only.type = 'checkbox';
  only.checked = st.onlySet;
  only.addEventListener('change', () => { st.onlySet = only.checked; renderWcFieldBody(kind, body); });
  onlyLbl.append(only, document.createTextNode(' Set fields only'));
  const revert = wcEl('button', 'btn btn-sm', '↺ Revert all to source');
  revert.title = 'Discard every edit to this definition in this session';
  revert.addEventListener('click', () => {
    delete wcWorking[kind][wcKey(kind)];
    if (kind === 'ammo') wcRefreshAmmoShape();
    wcAfterEdit(kind, false);
    renderWcFieldEditor(kind);
    if (typeof showToast === 'function') showToast('↺ Definition reverted to source.');
  });
  bar.append(filter, onlyLbl, revert);
  const body = wcEl('div', 'wcf-tree');
  host.append(bar, body);
  renderWcFieldBody(kind, body);
}

function renderWcFieldBody(kind, body) {
  const st = wcPanel[kind];
  const types = wcTypes();
  const root = WcSP.wcRootType(types, kind);
  body.innerHTML = '';
  if (st.filter.trim()) renderWcFlat(kind, body, root, st.filter.trim().toLowerCase());
  else renderWcStruct(kind, body, root, []);
  if (!body.childNodes.length) body.appendChild(wcEl('div', 'wcf-empty', st.onlySet ? 'No set fields match. Untick "Set fields only" to browse every WC field.' : 'No fields match.'));
}

// Tree view: one <details> per struct, rendered lazily on first open.
function renderWcStruct(kind, parent, t, path) {
  const types = wcTypes();
  const tree = wcTree(kind);
  const st = wcPanel[kind];
  for (const field of Object.keys(types.structs[t.q] || {})) {
    const ft = WcSP.wcFieldType(types, t, field);
    const p = path.concat(field);
    const v = wcGet(tree, p);
    if (st.onlySet && v === undefined) continue;
    if (ft && ft.arr && ft.kind === 'struct') parent.appendChild(wcArrayNode(kind, t, field, ft, p, v));
    else if (wcIsBranch(ft, v)) parent.appendChild(wcStructNode(kind, t, field, ft, p, v));
    else parent.appendChild(wcLeafRow(kind, t, field, ft, p, false));
  }
}

function wcNodeSummary(kind, owner, label, ft, p, v, extra) {
  const tree = wcTree(kind);
  const src = wcSourceTree(kind);
  const sum = wcEl('summary', 'wcf-summary');
  const name = wcEl('span', 'wcf-name', label);
  const help = owner ? wcHelpFor(owner, p[p.length - 1]) : '';
  if (help) name.title = help;
  sum.append(name, wcEl('span', 'wcf-type', ft ? ft.decl : ''));
  const raw = wcRawGet(tree, p);
  const srcRaw = wcRawGet(src, p);
  if (WcSP.isHelperRef(raw, wcHelpers())) sum.appendChild(wcEl('span', 'wcf-badge wcf-shared', '🔗 ' + raw.__id));
  else if (WcSP.isHelperRef(srcRaw, wcHelpers())) sum.appendChild(wcEl('span', 'wcf-badge wcf-local', '✂ local copy of ' + srcRaw.__id));
  const n = wcCountSet(v);
  sum.appendChild(wcEl('span', 'wcf-count', v === undefined ? 'not set' : `${n} set`));
  if (extra) sum.appendChild(extra);
  if (!wcSame(raw, srcRaw)) sum.appendChild(wcActionBtn('↺', 'Revert this block to the source file', () => {
    wcSet(kind, p, srcRaw === undefined ? undefined : JSON.parse(JSON.stringify(srcRaw)));
    wcAfterEdit(kind, false);
    renderWcFieldEditor(kind);
  }));
  if (v !== undefined) sum.appendChild(wcActionBtn('✕', 'Remove this block (WC defaults apply)', () => {
    wcSet(kind, p, undefined);
    wcAfterEdit(kind, false);
    renderWcFieldEditor(kind);
  }));
  return sum;
}

function wcActionBtn(label, title, fn) {
  const b = wcEl('button', 'wcf-btn', label);
  b.type = 'button';
  b.title = title;
  b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); fn(); });
  return b;
}

function wcLazyDetails(kind, p, summary, fill) {
  const st = wcPanel[kind];
  const key = p.join('.');
  const d = wcEl('details', 'wcf-node');
  d.appendChild(summary);
  const inner = wcEl('div', 'wcf-children');
  d.appendChild(inner);
  let filled = false;
  const ensure = () => { if (!filled) { filled = true; fill(inner); } };
  if (st.open.has(key)) { d.open = true; ensure(); }
  d.addEventListener('toggle', () => {
    if (d.open) { st.open.add(key); ensure(); } else st.open.delete(key);
  });
  return d;
}

function wcStructNode(kind, owner, field, ft, p, v) {
  return wcLazyDetails(kind, p, wcNodeSummary(kind, owner, field, ft, p, v), (inner) => {
    if (!ft || ft.kind !== 'struct') return;
    renderWcStruct(kind, inner, ft, p);
    if (!inner.childNodes.length) inner.appendChild(wcEl('div', 'wcf-empty', 'No set fields. Untick "Set fields only" to add some.'));
  });
}

function wcArrayNode(kind, owner, field, ft, p, v) {
  const et = WcSP.wcElemType(ft);
  const add = wcActionBtn('+', 'Add a new ' + et.decl, () => {
    const cur = wcGet(wcTree(kind), p);
    const arr = Array.isArray(cur) ? cur.slice() : [];
    arr.push({});
    wcSet(kind, p, arr);
    wcPanel[kind].open.add(p.join('.'));
    wcPanel[kind].open.add(p.concat(arr.length - 1).join('.'));
    wcAfterEdit(kind, false);
    renderWcFieldEditor(kind);
  });
  return wcLazyDetails(kind, p, wcNodeSummary(kind, owner, field + (Array.isArray(v) ? ` [${v.length}]` : ''), ft, p, v, add), (inner) => {
    (Array.isArray(v) ? v : []).forEach((item, i) => {
      const ip = p.concat(i);
      const rm = wcActionBtn('🗑', 'Remove element ' + i, () => {
        const cur = wcGet(wcTree(kind), p).slice();
        cur.splice(i, 1);
        wcSet(kind, p, cur);
        wcAfterEdit(kind, false);
        renderWcFieldEditor(kind);
      });
      const label = `[${i}]` + (item && item.SubtypeId ? ' ' + item.SubtypeId : '');
      const node = wcLazyDetails(kind, ip, wcNodeSummary(kind, null, label, et, ip, wcGet(wcTree(kind), ip), rm), (sub) => {
        renderWcStruct(kind, sub, et, ip);
        if (!sub.childNodes.length) sub.appendChild(wcEl('div', 'wcf-empty', 'Empty element. Untick "Set fields only" to fill it in.'));
      });
      inner.appendChild(node);
    });
    if (!inner.childNodes.length) inner.appendChild(wcEl('div', 'wcf-empty', 'No elements. Use + to add one.'));
  });
}

// Flat filtered view: every matching leaf path, with a breadcrumb label.
function renderWcFlat(kind, body, root, q) {
  const types = wcTypes();
  const tree = wcTree(kind);
  const st = wcPanel[kind];
  let rows = 0;
  const walk = (t, path, depth) => {
    if (rows >= WC_MAX_FLAT_ROWS || depth > 10) return;
    for (const field of Object.keys(types.structs[t.q] || {})) {
      const ft = WcSP.wcFieldType(types, t, field);
      const p = path.concat(field);
      const v = wcGet(tree, p);
      if (st.onlySet && v === undefined) continue;
      if (ft && ft.arr && ft.kind === 'struct') {
        (Array.isArray(v) ? v : []).forEach((_, i) => walk(WcSP.wcElemType(ft), p.concat(i), depth + 1));
        continue;
      }
      if (wcIsBranch(ft, v)) { walk(ft, p, depth + 1); continue; }
      const hay = (p.join('.') + ' ' + wcHelpFor(t, field)).toLowerCase();
      if (!hay.includes(q)) continue;
      body.appendChild(wcLeafRow(kind, t, field, ft, p, true));
      if (++rows >= WC_MAX_FLAT_ROWS) break;
    }
  };
  walk(root, [], 0);
  if (rows >= WC_MAX_FLAT_ROWS) body.appendChild(wcEl('div', 'wcf-empty', `Showing the first ${WC_MAX_FLAT_ROWS} matches; refine the filter.`));
}

function wcLeafRow(kind, owner, field, ft, p, breadcrumb) {
  const row = wcEl('div', 'wcf-row');
  const label = wcEl('label', 'wcf-label');
  const name = breadcrumb ? p.filter((k) => typeof k !== 'number').join(' › ') : field;
  label.append(wcEl('span', 'wcf-name', name), wcEl('span', 'wcf-type', ft ? ft.decl + (ft.arr ? '[]' : '') : '?'));
  const help = wcHelpFor(owner, field);
  if (help) label.title = help;
  const inputBox = wcEl('div', 'wcf-input');
  const revert = wcActionBtn('↺', 'Revert to the source file value', () => {
    const srcRaw = wcRawGet(wcSourceTree(kind), p);
    commit(srcRaw === undefined ? undefined : JSON.parse(JSON.stringify(srcRaw)), true);
  });
  const unset = wcActionBtn('✕', 'Unset (WeaponCore default applies)', () => commit(undefined, true));
  row.append(label, inputBox, revert, unset);

  const refresh = () => {
    const v = wcGet(wcTree(kind), p);
    row.classList.toggle('is-unset', v === undefined);
    row.classList.toggle('is-modified', !wcSame(v, wcGet(wcSourceTree(kind), p)));
    unset.style.visibility = v === undefined ? 'hidden' : 'visible';
    revert.style.visibility = row.classList.contains('is-modified') ? 'visible' : 'hidden';
  };
  function commit(value, rebuild) {
    wcSet(kind, p, value);
    wcAfterEdit(kind, false);
    if (rebuild) { inputBox.innerHTML = ''; wcBuildEditor(kind, ft, p, inputBox, commit); }
    refresh();
  }
  wcBuildEditor(kind, ft, p, inputBox, commit);
  refresh();
  return row;
}

function wcVectorSpec(ft) {
  if (!ft) return null;
  if (ft.name === 'Vector4') return { call: 'Color', keys: ['red', 'green', 'blue', 'alpha'] };
  if (ft.name === 'Vector2D') return { call: 'Vector2', keys: ['x', 'y'] };
  if (ft.kind === 'vector') return { call: 'Vector', keys: ['x', 'y', 'z'] };
  if (wcIsRandomize(ft)) return { call: 'Random', keys: ['start', 'end'] };
  return null;
}

// Builds the inline editor for one leaf; |commit(value, rebuild)| writes to the tree.
function wcBuildEditor(kind, ft, p, box, commit) {
  const v = wcGet(wcTree(kind), p);
  const numIn = (val, onVal) => {
    const i = wcEl('input', 'control-input');
    i.type = 'number';
    i.step = 'any';
    i.value = val === undefined ? '' : val;
    i.placeholder = '0';
    i.addEventListener('input', () => { const n = parseFloat(i.value); if (!isNaN(n)) onVal(wcIsIntType(ft) ? Math.round(n) : n); });
    return i;
  };
  const rawIn = () => {
    const i = wcEl('input', 'control-input wcf-raw');
    i.type = 'text';
    i.value = v === undefined ? '' : (WcSP.csInline(v) || JSON.stringify(v));
    i.title = 'C# expression (e.g. float.MaxValue, Vector(x: 0, y: 0, z: 1))';
    i.addEventListener('change', () => {
      if (!i.value.trim()) { commit(undefined, false); return; }
      try { commit(WcSP.exprParser(i.value.trim()).val(), false); i.classList.remove('is-invalid'); }
      catch (e) { i.classList.add('is-invalid'); }
    });
    return i;
  };
  const vec = wcVectorSpec(ft);
  const isCall = v && typeof v === 'object' && v.__call !== undefined;
  const isId = v && typeof v === 'object' && v.__id !== undefined;

  if (vec && !ft.arr && (v === undefined || isCall)) {
    vec.keys.forEach((k, idx) => {
      const cur = wcCallArg(v, k, idx);
      const i = numIn(cur, (n) => {
        const base = wcGet(wcTree(kind), p);
        if (base && base.__call !== undefined && base.pos && !base.args) {
          const pos = base.pos.slice(); pos[idx] = n; commit(Object.assign({}, base, { pos }), false); return;
        }
        const args = {};
        vec.keys.forEach((kk, j) => { const c = wcCallArg(base, kk, j); args[kk] = c !== undefined ? c : (kk === 'alpha' ? 1 : 0); });
        args[k] = n;
        commit({ __call: vec.call, args }, false);
      });
      i.title = k;
      i.classList.add('wcf-vec');
      box.appendChild(i);
    });
    return;
  }
  if (!ft || ft.kind === 'unknown' || (isCall && !vec) || (isId && ft.kind !== 'enum')) { box.appendChild(rawIn()); return; }

  if (ft.arr) {
    if (ft.kind === 'enum') {
      const cur = Array.isArray(v) ? v.map(wcIdName) : [];
      const wrap = wcEl('div', 'wcf-chips');
      ft.members.forEach((m) => {
        const l = wcEl('label', 'chk-label');
        const c = wcEl('input');
        c.type = 'checkbox';
        c.checked = cur.includes(m);
        c.addEventListener('change', () => {
          const now = (wcGet(wcTree(kind), p) || []).filter((x) => wcIdName(x) !== m);
          if (c.checked) now.push({ __id: m });
          commit(now, false);
        });
        l.append(c, document.createTextNode(' ' + m));
        wrap.appendChild(l);
      });
      box.appendChild(wrap);
      return;
    }
    if (ft.kind === 'prim' && (v === undefined || (Array.isArray(v) && v.every((x) => typeof x !== 'object')))) {
      const i = wcEl('input', 'control-input');
      i.type = 'text';
      i.value = Array.isArray(v) ? v.join(', ') : '';
      i.placeholder = 'comma-separated';
      i.addEventListener('change', () => {
        const parts = i.value.split(',').map((x) => x.trim()).filter(Boolean);
        commit(parts.length ? parts.map((x) => (wcIsNumType(ft) ? parseFloat(x) || 0 : x)) : undefined, false);
      });
      box.appendChild(i);
      return;
    }
    box.appendChild(rawIn());
    return;
  }

  if (ft.kind === 'enum') {
    const s = wcEl('select', 'control-input');
    s.appendChild(new Option('(unset)', ''));
    ft.members.forEach((m) => s.appendChild(new Option(m, m)));
    s.value = v === undefined ? '' : wcIdName(v);
    s.addEventListener('change', () => commit(s.value ? { __id: s.value } : undefined, false));
    box.appendChild(s);
    return;
  }
  if (ft.kind === 'prim' && ft.name === 'bool') {
    if (v !== undefined && typeof v !== 'boolean') { box.appendChild(rawIn()); return; }
    const c = wcEl('input');
    c.type = 'checkbox';
    c.checked = v === true;
    c.addEventListener('change', () => commit(c.checked, false));
    box.appendChild(c);
    return;
  }
  if (ft.kind === 'prim' && ft.name === 'string') {
    if (v !== undefined && typeof v !== 'string') { box.appendChild(rawIn()); return; }
    const i = wcEl('input', 'control-input');
    i.type = 'text';
    i.value = v === undefined ? '' : v;
    i.addEventListener('input', () => commit(i.value, false));
    box.appendChild(i);
    return;
  }
  if (wcIsNumType(ft)) {
    if (v !== undefined && typeof v !== 'number') { box.appendChild(rawIn()); return; }
    box.appendChild(numIn(v, (n) => commit(n, false)));
    return;
  }
  box.appendChild(rawIn());
}
