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
			RateOfFire = false,
			DamageModifier = false,
			ToggleGuidance = false,
			EnableOverload =  false,
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

		private AiDef Common_Weapons_Hardpoint_Ai_BasicTurret_LockOn = new AiDef {
			TrackTargets = true, //This Weapon will know there are targets in range
			TurretAttached = true, // This enables the ability for players to manually control
			TurretController = true, //The turret in this WeaponDefinition has control over where other turrets aim.
			PrimaryTracking = true, //The turret in this WeaponDefinition selects targets for other turrets that do not have tracking capabilities.
			LockOnFocus = true, // fires this weapon when something is locked using the WC hud reticle
			SuppressFire = false, //prevent automatic firing
			OverrideLeads = false, // Override default behavior for target leads
		};

		private AiDef Common_Weapons_Hardpoint_Ai_RequiresRadar_LockOn = new AiDef {
			TrackTargets = false, //This Weapon will know there are targets in range
			TurretAttached = true, // This enables the ability for players to manually control
			TurretController = true, //The turret in this WeaponDefinition has control over where other turrets aim.
			PrimaryTracking = false, //The turret in this WeaponDefinition selects targets for other turrets that do not have tracking capabilities.
			LockOnFocus = false, // fires this weapon when something is locked using the WC hud reticle
			SuppressFire = false, //prevent automatic firing
			OverrideLeads = false, // Override default behavior for target leads
		};

		private AiDef Common_Weapons_Hardpoint_Ai_BasicTurret_NoLockOn = new AiDef {
			TrackTargets = true, //This Weapon will know there are targets in range
			TurretAttached = true, // This enables the ability for players to manually control
			TurretController = true, //The turret in this WeaponDefinition has control over where other turrets aim.
			PrimaryTracking = false, //The turret in this WeaponDefinition selects targets for other turrets that do not have tracking capabilities.
			LockOnFocus = false, // fires this weapon when something is locked using the WC hud reticle
			SuppressFire = false, //prevent automatic firing
			OverrideLeads = false, // Override default behavior for target leads
		};

		private AiDef Common_Weapons_Hardpoint_Ai_BasicFixed_Tracking = new AiDef {
			TrackTargets = true,
			TurretAttached = false,
			TurretController = true,
			PrimaryTracking = false,
			LockOnFocus = true,
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

		private OtherDef Common_Weapons_Hardpoint_Other_Small = new OtherDef {
			ConstructPartCap = 21,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 0.5f, // Meters, radius of sphere disable this gun if another is present
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