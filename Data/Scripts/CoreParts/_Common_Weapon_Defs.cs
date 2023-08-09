using VRageMath;
using System.Collections.Generic;
using static Scripts.Structure;
using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.ModelAssignmentsDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef.Prediction;
using static Scripts.Structure.WeaponDefinition.TargetingDef.BlockTypes;
using static Scripts.Structure.WeaponDefinition.TargetingDef.Threat;
using static Scripts.Structure.WeaponDefinition.TargetingDef;
using static Scripts.Structure.WeaponDefinition.TargetingDef.CommunicationDef.Comms;
using static Scripts.Structure.WeaponDefinition.TargetingDef.CommunicationDef.SecurityMode;
using static Scripts.Structure.WeaponDefinition.HardPointDef.HardwareDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef.HardwareDef.HardwareType;
using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.AmmoDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef.SpawnType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.ShapeDef.Shapes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef.SkipMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.PatternDef.PatternModes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef.TimedSpawnDef.PointTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.Conditions;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.UpRelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.FwdRelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ReInitCondition;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.RelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ConditionOperators;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.StageEvents;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.GuidanceType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.ShieldDef.ShieldType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DeformDef.DeformTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.Falloff;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.AoeShape;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.PushPullDef.Force;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.FactionColor;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.TracerBaseDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.Texture;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.DecalDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DamageTypes.Damage;

namespace Scripts
{
    partial class Parts
    {

		//// Weapon definitions ////
		
		private TargetingDef Common_Weapons_Targeting_Fixed_NoTargeting => new TargetingDef 
		{
			Threats = new[] 
			{
				Grids,
			},
			SubSystems = new[] 
			{
				Any,
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = false, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 0, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private UiDef Common_Weapons_Hardpoint_Ui_FullDisable = new UiDef 
		{
			RateOfFire = false, // Enables terminal slider for changing rate of fire.
			RateOfFireMin = 0.0f, // Sets the minimum limit for the rate of fire slider, default is 0.  Range is 0-1f.
			DamageModifier = false, // Enables terminal slider for changing damage per shot.
			ToggleGuidance = false, // Enables terminal option to disable smart projectile guidance.
			EnableOverload = false, // Enables terminal option to turn on Overload; this allows energy weapons to double damage per shot, at the cost of quadrupled power draw and heat gain, and 2% self damage on overheat.
			AlternateUi = false, // This simplifies and customizes the block controls for alternative weapon purposes,   
			DisableStatus = false, // Do not display weapon status NoTarget, Reloading, NoAmmo, etc..
		};
		
		private UiDef Common_Weapons_Hardpoint_Ui_ROFOnly = new UiDef 
		{
			RateOfFire = true, //not recommended for beams
			RateOfFireMin = 0.0f, // Sets the minimum limit for the rate of fire slider, default is 0.  Range is 0-1f.
			DamageModifier = false, //only works on energy
			ToggleGuidance = false,
			EnableOverload = false, //only works on energy
			AlternateUi = false, // This simplifies and customizes the block controls for alternative weapon purposes,   
			DisableStatus = false, // Do not display weapon status NoTarget, Reloading, NoAmmo, etc..
		};

		private UiDef Common_Weapons_Hardpoint_Ui_Damage_Overload = new UiDef 
		{
			RateOfFire = false, //not recommended for beams
			RateOfFireMin = 0.0f, // Sets the minimum limit for the rate of fire slider, default is 0.  Range is 0-1f.
			DamageModifier = true, //only works on energy
			ToggleGuidance = false,
			EnableOverload = true, //only works on energy
			AlternateUi = false, // This simplifies and customizes the block controls for alternative weapon purposes,   
			DisableStatus = false, // Do not display weapon status NoTarget, Reloading, NoAmmo, etc..
		};

		private UiDef Common_Weapons_Hardpoint_Ui_GuidanceOnly = new UiDef 
		{
			RateOfFire = false, //not recommended for beams
			RateOfFireMin = 0.0f, // Sets the minimum limit for the rate of fire slider, default is 0.  Range is 0-1f.
			DamageModifier = false, //only works on energy
			ToggleGuidance = true,
			EnableOverload = false, //only works on energy
			AlternateUi = false, // This simplifies and customizes the block controls for alternative weapon purposes,   
			DisableStatus = false, // Do not display weapon status NoTarget, Reloading, NoAmmo, etc..		
		};

		private AiDef Common_Weapons_Hardpoint_Ai_BasicTurret = new AiDef 
		{
			TrackTargets = true, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
			TurretAttached = true, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
			TurretController = true, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
			PrimaryTracking = true, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
			LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
			SuppressFire = false, // If enabled, weapon can only be fired manually.
			OverrideLeads = false, // Disable target leading on fixed weapons, or allow it for turrets.
			DefaultLeadGroup = 1, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
			TargetGridCenter = false, // Does not target blocks, instead it targets grid center.
		};

		private AiDef Common_Weapons_Hardpoint_Ai_BasicFixed_Tracking = new AiDef 
		{
			TrackTargets = true, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
			TurretAttached = false, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
			TurretController = false, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
			PrimaryTracking = false, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
			LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
			SuppressFire = true, // If enabled, weapon can only be fired manually.
			OverrideLeads = true, // Disable target leading on fixed weapons, or allow it for turrets.
			DefaultLeadGroup = 0, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
			TargetGridCenter = false, // Does not target blocks, instead it targets grid center.
		};

		private AiDef Common_Weapons_Hardpoint_Ai_FullDisable = new AiDef 
		{
			TrackTargets = false, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
			TurretAttached = false, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
			TurretController = false, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
			PrimaryTracking = false, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
			LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
			SuppressFire = true, // If enabled, weapon can only be fired manually.
			OverrideLeads = false, // Disable target leading on fixed weapons, or allow it for turrets.
			DefaultLeadGroup = 2, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
			TargetGridCenter = false, // Does not target blocks, instead it targets grid center.
		};

		private OtherDef Common_Weapons_Hardpoint_Other_NoRestrictionRadius = new OtherDef 
		{
			ConstructPartCap = 0,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
			Debug = false,
			RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private OtherDef Common_Weapons_Hardpoint_Other_Large = new OtherDef 
		{
			ConstructPartCap = 0,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
 			Debug = false,
			RestrictionRadius = 1.25f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private OtherDef Common_Weapons_Hardpoint_Other_Small_Fixed = new OtherDef 
		{
			ConstructPartCap = 0,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			DisableLosCheck = true, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
			Debug = false,
			RestrictionRadius = 0.25f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private OtherDef Common_Weapons_Hardpoint_Other_Handhelds = new OtherDef 
		{
			ConstructPartCap = 0,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			DisableLosCheck = true, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
			Debug = false,
			RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		//// Ammo Definitions ////
				
		private FragmentDef Common_Ammos_Fragment_None = new FragmentDef 
		{
			AmmoRound = "",
		};
		
		private GraphicDef Common_Ammos_AmmoGraphics_None = new GraphicDef
		{
			ModelName = "",
		};

		private CustomScalesDef Common_Ammos_DamageScales_Cockpits_BigNerf = new CustomScalesDef 
		{
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

		private CustomScalesDef Common_Ammos_DamageScales_Cockpits_SmallNerf = new CustomScalesDef 
		{
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

		private CustomScalesDef Common_Ammos_DamageScales_WheelsandCockpits_SmallNerf = new CustomScalesDef 
		{
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
	}
}