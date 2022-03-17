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
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.ShieldDef.ShieldType;

namespace Scripts
{
    partial class Parts
    {

		//Common definitions
		
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

    }
}