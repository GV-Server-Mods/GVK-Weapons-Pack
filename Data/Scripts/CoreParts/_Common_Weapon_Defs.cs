using VRageMath;
using System.Collections.Generic;
using static Scripts.Structure;
using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.ModelAssignmentsDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef.Prediction;
using static Scripts.Structure.WeaponDefinition.TargetingDef.BlockTypes;
using static Scripts.Structure.WeaponDefinition.TargetingDef.Threat;
using static Scripts.Structure.WeaponDefinition.HardPointDef.HardwareDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef.HardwareDef.HardwareType;
using static Scripts.Structure.WeaponDefinition.AmmoDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef.SpawnType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.ShapeDef.Shapes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef.SkipMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.PatternDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.PatternDef.PatternModes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef.TimedSpawnDef.PointTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.GuidanceType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.ShieldDef.ShieldType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.Falloff;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.AoeShape;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.PushPullDef.Force;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.TracerBaseDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.Texture;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DamageTypes.Damage;

namespace Scripts
{
    partial class Parts
    {

		//// Weapon definitions ////
		
		private TargetingDef Common_Weapons_Targeting_Fixed_NoTargeting => new TargetingDef {
			Threats = new[] {
				Grids,
			},
			SubSystems = new[] {
				Any,
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = false, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 0, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private UiDef Common_Weapons_Hardpoint_Ui_FullDisable = new UiDef {
			RateOfFire = false, // Enables terminal slider for changing rate of fire.
			DamageModifier = false, // Enables terminal slider for changing damage per shot.
			ToggleGuidance = false, // Enables terminal option to disable smart projectile guidance.
			EnableOverload = false, // Enables terminal option to turn on Overload; this allows energy weapons to double damage per shot, at the cost of quadrupled power draw and heat gain, and 2% self damage on overheat.
		};
		
		private UiDef Common_Weapons_Hardpoint_Ui_ROFOnly = new UiDef {
			RateOfFire = true, //not recommended for beams
			DamageModifier = false, //only works on energy
			ToggleGuidance = false,
			EnableOverload =  false, //only works on energy
		};

		private UiDef Common_Weapons_Hardpoint_Ui_Damage_Overload = new UiDef {
			RateOfFire = false, //not recommended for beams
			DamageModifier = true, //only works on energy
			ToggleGuidance = false,
			EnableOverload =  true, //only works on energy
		};

		private UiDef Common_Weapons_Hardpoint_Ui_GuidanceOnly = new UiDef {
			RateOfFire = false, //not recommended for beams
			DamageModifier = false, //only works on energy
			ToggleGuidance = true,
			EnableOverload =  false, //only works on energy
		};

		private AiDef Common_Weapons_Hardpoint_Ai_BasicTurret = new AiDef {
			TrackTargets = true, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
			TurretAttached = true, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
			TurretController = true, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
			PrimaryTracking = true, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
			LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
			SuppressFire = false, // If enabled, weapon can only be fired manually.
			OverrideLeads = false, // Disable target leading on fixed weapons, or allow it for turrets.
		};

		private AiDef Common_Weapons_Hardpoint_Ai_BasicFixed_Tracking = new AiDef {
			TrackTargets = true,
			TurretAttached = false,
			TurretController = true,
			PrimaryTracking = false,
			LockOnFocus = false,
			SuppressFire = false,
			OverrideLeads = false, // Override default behavior for target leads
		};

		private AiDef Common_Weapons_Hardpoint_Ai_BasicFixed_NoTracking = new AiDef {
			TrackTargets = false,
			TurretAttached = false,
			TurretController = false,
			PrimaryTracking = false,
			LockOnFocus = false,
			SuppressFire = true,
			OverrideLeads = false, // Override default behavior for target leads
		};

		private CriticalDef Common_Weapons_Hardpoint_Hardware_CriticalReaction_None = new CriticalDef
		{
			Enable = false, // Enables Warhead behaviour.
			DefaultArmedTimer = 0, // Sets default countdown duration.
			PreArmed = false, // Whether the warhead is armed by default when placed. Best left as false.
			TerminalControls = false, // Whether the warhead should have terminal controls for arming and detonation.
			AmmoRound = "", // Optional. If specified, the warhead will always use this ammo on detonation rather than the currently selected ammo.
		};

		private OtherDef Common_Weapons_Hardpoint_Other_21CapOnly = new OtherDef {
			ConstructPartCap = 21,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private OtherDef Common_Weapons_Hardpoint_Other_11CapOnly = new OtherDef {
			ConstructPartCap = 11,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private OtherDef Common_Weapons_Hardpoint_Other_Large = new OtherDef {
			ConstructPartCap = 21,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 1.25f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private OtherDef Common_Weapons_Hardpoint_Other_Small_Turret = new OtherDef {
			ConstructPartCap = 11,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 0.5f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private OtherDef Common_Weapons_Hardpoint_Other_Small_Fixed = new OtherDef {
			ConstructPartCap = 21,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 0.25f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		//// Ammo Definitions ////
		
		private ShapeDef Common_Ammos_Shape_None = new ShapeDef {
			Shape = LineShape,
			Diameter = 0,
		};
		
		private ObjectsHitDef Common_Ammos_ObjectsHit_None = new ObjectsHitDef {
			MaxObjectsHit = 0, // 0 = disabled
			CountBlocks = false, // counts gridBlocks and not just entities hit
		};

		private FragmentDef Common_Ammos_Fragment_None = new FragmentDef {
			AmmoRound = "", // AmmoRound field of the ammo to spawn.
			Fragments = 0, // Number of projectiles to spawn.
			Degrees = 0, // Cone in which to randomize direction of spawned projectiles.
			Reverse = false, // Spawn projectiles backward instead of forward.
			DropVelocity = false, // fragments will not inherit velocity from parent.
			Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards).
			Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
			MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
			IgnoreArming = false, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
			AdvOffset = new Vector3D(0f,0f,0f), // advanced offsets the fragment by xyz coordinates relative to parent, value is read from fragment ammo type.
			TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below
			{
				Enable = false, // Enables TimedSpawns mechanism
				Interval = 0, // Time between spawning fragments, in ticks, 0 means every tick, 1 means every other
				StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
				MaxSpawns = 0, // Max number of fragment children to spawn
				Proximity = 0, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
				ParentDies = true, // Parent dies once after it spawns its last child.
				PointAtTarget = true, // Start fragment direction pointing at Target
				PointType = Lead, // Point accuracy, Direct (straight forward), Lead (always fire), Predict (only fire if it can hit)
				DirectAimCone = 0f, //Aim cone used for Direct fire, in degrees
				GroupSize = 0, // Number of spawns in each group
				GroupDelay = 0, // Delay between each group.
			},
		};
			
		private PatternDef Common_Ammos_Pattern_None = new PatternDef {
			Patterns = new[] { // If enabled, set of multiple ammos to fire in order instead of the main ammo.
				"",
			},
			Mode = Fragment, // Select when to activate this pattern, options: Never, Weapon, Fragment, Both 
			TriggerChance = 1f, // This is %
			Random = false, // This randomizes the number spawned at once, NOT the list order.
			RandomMin = 1, 
			RandomMax = 1,
			SkipParent = false, // Skip the Ammo itself, in the list
			PatternSteps = 1, // Number of Ammos activated per round, will progress in order and loop. Ignored if Random = true.
		};
		
		private CustomScalesDef Common_Ammos_DamageScales_Cockpits_BigNerf = new CustomScalesDef {
			IgnoreAllOthers = false, //pass through everything else
			Types = new[]
			{
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpit",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpitSeat",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockCockpit",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "DBSmallBlockFighterCockpit",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "CockpitOpen",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RoverCockpit",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OpenCockpitSmall",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OpenCockpitLarge",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockCockpitIndustrial",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpitIndustrial",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "BuggyCockpit",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RivalAIRemoteControlLarge",
					Modifier = 0.1f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RivalAIRemoteControlSmall",
					Modifier = 0.1f,
				},
			},
		};

		private CustomScalesDef Common_Ammos_DamageScales_Cockpits_SmallNerf = new CustomScalesDef {
			IgnoreAllOthers = false, //pass through everything else
			Types = new[]
			{
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpitSeat",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "DBSmallBlockFighterCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "CockpitOpen",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RoverCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OpenCockpitSmall",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OpenCockpitLarge",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockCockpitIndustrial",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpitIndustrial",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "BuggyCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RivalAIRemoteControlLarge",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RivalAIRemoteControlSmall",
					Modifier = 0.5f,
				},
			},
		};

		private CustomScalesDef Common_Ammos_DamageScales_WheelsandCockpits_SmallNerf = new CustomScalesDef {
			IgnoreAllOthers = false, //pass through everything else
			Types = new[]
			{
				new CustomBlocksDef
				{
					SubTypeId = "SmallRealWheel7x7",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RealWheel7x7",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallRealWheel7x7mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RealWheel7x7mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallRealWheel1x1",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallRealWheel",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallRealWheel5x5",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RealWheel1x1",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RealWheel",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RealWheel5x5",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallRealWheel1x1mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallRealWheelmirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallRealWheel5x5mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RealWheel1x1mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RealWheelmirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RealWheel5x5mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadSmallRealWheel1x1",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadSmallRealWheel",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadSmallRealWheel5x5",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadRealWheel1x1",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadRealWheel",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadRealWheel5x5",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadSmallRealWheel1x1mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadSmallRealWheelmirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadSmallRealWheel5x5mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadRealWheel1x1mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadRealWheelmirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OffroadRealWheel5x5mirrored",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpitSeat",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "DBSmallBlockFighterCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "CockpitOpen",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RoverCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OpenCockpitSmall",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "OpenCockpitLarge",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "SmallBlockCockpitIndustrial",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "LargeBlockCockpitIndustrial",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "BuggyCockpit",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RivalAIRemoteControlLarge",
					Modifier = 0.5f,
				},
				new CustomBlocksDef
				{
					SubTypeId = "RivalAIRemoteControlSmall",
					Modifier = 0.5f,
				},
			},
		};

		private AreaOfDamageDef Common_Ammos_AreaOfDamage_None = new AreaOfDamageDef {
			ByBlockHit = new ByBlockHitDef
			{
				Enable = false,
				Radius = 0f,
				Damage = 0,
				Depth = 0f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
				MaxAbsorb = 0f,
				Falloff = NoFalloff, //.NoFalloff applies the same damage to all blocks in radius
				//.Linear drops evenly by distance from center out to max radius
				//.Curve drops off damage sharply as it approaches the max radius
				//.InvCurve drops off sharply from the middle and tapers to max radius
				//.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
				//.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
			},
			EndOfLife = new EndOfLifeDef
			{
				Enable = false,
				Radius = 0,
				Damage = 0f,
				Depth = 0, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
				MaxAbsorb = 0f,
				Falloff = NoFalloff, //.NoFalloff applies the same damage to all blocks in radius
				//.Linear drops evenly by distance from center out to max radius
				//.Curve drops off damage sharply as it approaches the max radius
				//.InvCurve drops off sharply from the middle and tapers to max radius
				//.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
				//.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
				ArmOnlyOnHit = false,
				MinArmingTime = 0,
				NoVisuals = false,
				NoSound = false,
				ParticleScale = 0,
				CustomParticle = "",
				CustomSound = "",
			},
		};

		private EwarDef Common_Ammos_Ewar_None = new EwarDef {
			Enable = false,
			Type = AntiSmart, //AntiSmart, JumpNull, EnergySink, Anchor, Emp, Offense, Nav, Dot, Push, Pull, Tractor,
			Mode = Effect,
			Strength = 0f,
			Radius = 0f,
			Duration = 0,
			StackDuration = false,
			Depletable = false,
			MaxStacks = 0,
			NoHitParticle = false,
			Force = new PushPullDef
			{
				ForceFrom = ProjectileLastPosition, // ProjectileLastPosition, ProjectileOrigin, HitPosition, TargetCenter, TargetCenterOfMass
				ForceTo = HitPosition, // ProjectileLastPosition, ProjectileOrigin, HitPosition, TargetCenter, TargetCenterOfMass
				Position = TargetCenterOfMass, // ProjectileLastPosition, ProjectileOrigin, HitPosition, TargetCenter, TargetCenterOfMass
				DisableRelativeMass = false,
				TractorRange = 0,
				ShooterFeelsForce = false,
			},
			Field = new FieldDef
			{
				Interval = 0, // Time between each pulse, in game ticks (60 == 1 second).
				PulseChance = 0, // Chance from 0 - 100 that an entity in the field will be hit by any given pulse.
				GrowTime = 0, // How many ticks it should take the field to grow to full size.
				HideModel = false, // Hide the projectile model if it has one.
				ShowParticle = false, // Deprecated.
				Particle = new ParticleDef // Particle effect to generate at the field's position.
				{
					Name = "", // SubtypeId of field particle effect.
					ShrinkByDistance = false, // Deprecated.
					Extras = new ParticleOptionDef
					{
						Scale = 1, // Scale of effect.
					},
				},
			},
		};

        private BeamDef Common_Ammos_Beams_None = new BeamDef {
			Enable = false, // Enable beam behaviour. Please have 3600 RPM, when this Setting is enabled. Please do not fire Beams into Voxels.
			VirtualBeams = false, // Only one damaging beam, but with the effectiveness of the visual beams combined (better performance).
			ConvergeBeams = false, // When using virtual beams, converge the visual beams to the location of the real beam.
			RotateRealBeam = false, // The real beam is rotated between all visual beams, instead of centered between them.
			OneParticle = false, // Only spawn one particle hit per beam weapon.
		};

		private SmartsDef Common_Ammos_Trajectory_Smarts_None = new SmartsDef {
			Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
			Aggressiveness = 0f, // controls how responsive tracking is.
			MaxLateralThrust = 0, // controls how sharp the trajectile may turn
			TrackingDelay = 0, // Measured in Shape diameter units traveled.
			MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
			MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
			NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
			Roam = false, // Roam current area after target loss
			KeepAliveAfterTargetLoss = false, // Whether to stop early death of projectile on target loss
			OffsetRatio = 0f, // The ratio to offset the random direction (0 to 1) 
			OffsetTime = 0, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..)
		};

		private MinesDef Common_Ammos_Trajectory_Mines_None = new MinesDef {
			DetectRadius = 0,
			DeCloakRadius = 0,
			FieldTime = 0,
			Cloak = false,
			Persist = false,
		};

		private AmmoAudioDef Common_Ammos_AmmoAudio_None = new AmmoAudioDef {
			TravelSound = "",
			HitSound = "",
			ShieldHitSound = "",
			PlayerHitSound = "",
			VoxelHitSound = "",
			FloatingHitSound = "",
			HitPlayChance = 1f,
			HitPlayShield = true,
		};

		private EjectionDef Common_Ammos_Ejection_None = new EjectionDef {
			Type = Particle, // Particle or Item (Inventory Component)
			Speed = 100f, // Speed inventory is ejected from in dummy direction
			SpawnChance = 0.5f, // chance of triggering effect (0 - 1)
			CompDef = new ComponentDef
			{
				ItemName = "", //InventoryComponent name
				ItemLifeTime = 0, // how long item should exist in world
				Delay = 0, // delay in ticks after shot before ejected
			}
		};
	}
}