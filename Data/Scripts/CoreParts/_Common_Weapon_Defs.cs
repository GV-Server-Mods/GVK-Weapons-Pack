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

namespace Scripts
{
    partial class Parts
    {
		
		private TargetingDef Common_Weapons_Targeting_Fixed_NoTargeting => new TargetingDef 
		{
			Threats = new[] 
			{
				Grids,
			},
			SubSystems = new[] 
			{
				Offense, Thrust, Utility, Jumping, Power, Production, Steering, Any, 
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 0, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
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
			DisableSupportingPD = true, // If true, the supporting point defense terminal option will be removed and this weapon will only target projectiles targeting the construct it's placed on
			ProhibitShotDelay = true, // If true, removes shot delay options for players.  This may be desirable for weapons that use heat or bursts as a balance mechanic and deliberately do not offer the ROF slider.
			ProhibitBurstCount = true, // If true, removes burst shot count options for players.
		};
		
		private UiDef Common_Weapons_Hardpoint_Ui_ROFOnly = new UiDef 
		{
			RateOfFire = true, //not recommended for beams
			RateOfFireMin = 0.25f, // Sets the minimum limit for the rate of fire slider, default is 0.  Range is 0-1f.
			DamageModifier = false, // Enables terminal slider for changing damage per shot.
			ToggleGuidance = false, // Enables terminal option to disable smart projectile guidance.
			EnableOverload = false, // Enables terminal option to turn on Overload; this allows energy weapons to double damage per shot, at the cost of quadrupled power draw and heat gain, and 2% self damage on overheat.
			AlternateUi = false, // This simplifies and customizes the block controls for alternative weapon purposes,   
			DisableStatus = false, // Do not display weapon status NoTarget, Reloading, NoAmmo, etc..
			DisableSupportingPD = true, // If true, the supporting point defense terminal option will be removed and this weapon will only target projectiles targeting the construct it's placed on
			ProhibitShotDelay = true, // If true, removes shot delay options for players.  This may be desirable for weapons that use heat or bursts as a balance mechanic and deliberately do not offer the ROF slider.
			ProhibitBurstCount = true, // If true, removes burst shot count options for players.
		};

		private UiDef Common_Weapons_Hardpoint_Ui_GuidanceOnly = new UiDef 
		{
			RateOfFire = false, // Enables terminal slider for changing rate of fire.
			RateOfFireMin = 0.0f, // Sets the minimum limit for the rate of fire slider, default is 0.  Range is 0-1f.
			DamageModifier = false, // Enables terminal slider for changing damage per shot.
			ToggleGuidance = true, // Enables terminal option to disable smart projectile guidance.
			EnableOverload = false, // Enables terminal option to turn on Overload; this allows energy weapons to double damage per shot, at the cost of quadrupled power draw and heat gain, and 2% self damage on overheat.
			AlternateUi = false, // This simplifies and customizes the block controls for alternative weapon purposes,   
			DisableStatus = false, // Do not display weapon status NoTarget, Reloading, NoAmmo, etc..
			DisableSupportingPD = true, // If true, the supporting point defense terminal option will be removed and this weapon will only target projectiles targeting the construct it's placed on
			ProhibitShotDelay = true, // If true, removes shot delay options for players.  This may be desirable for weapons that use heat or bursts as a balance mechanic and deliberately do not offer the ROF slider.
			ProhibitBurstCount = true, // If true, removes burst shot count options for players.
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
			PainterUseMaxTargeting = true, //If enabled, painter will utilize the lesser of the weapons targeting max dist or projectile trajectory.  By default painter can be used out to the projectiles max trajectory.
		};

		private AiDef Common_Weapons_Hardpoint_Ai_BasicFixed_Tracking = new AiDef 
		{
			TrackTargets = true, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
			TurretAttached = false, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
			TurretController = false, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
			PrimaryTracking = false, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
			LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
			SuppressFire = false, // If enabled, weapon can only be fired manually.
			OverrideLeads = true, // Disable target leading on fixed weapons, or allow it for turrets.
			DefaultLeadGroup = 0, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
			TargetGridCenter = false, // Does not target blocks, instead it targets grid center.
			PainterUseMaxTargeting = true, //If enabled, painter will utilize the lesser of the weapons targeting max dist or projectile trajectory.  By default painter can be used out to the projectiles max trajectory.
		};

		private AiDef Common_Weapons_Hardpoint_Ai_FullDisable = new AiDef 
		{
			TrackTargets = false, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
			TurretAttached = false, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
			TurretController = false, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
			PrimaryTracking = false, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
			LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
			SuppressFire = false, // If enabled, weapon can only be fired manually.
			OverrideLeads = false, // Disable target leading on fixed weapons, or allow it for turrets.
			DefaultLeadGroup = 2, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
			TargetGridCenter = false, // Does not target blocks, instead it targets grid center.
			PainterUseMaxTargeting = true, //If enabled, painter will utilize the lesser of the weapons targeting max dist or projectile trajectory.  By default painter can be used out to the projectiles max trajectory.
		};

		private OtherDef Common_Weapons_Hardpoint_Other_NoRestrictionRadius = new OtherDef 
		{
			ConstructPartCap = 0, // Maximum number of blocks with this weapon on a grid; 0 = unlimited.
			RotateBarrelAxis = 0, // For spinning barrels, which axis to spin the barrel around; 0 = none.
			MuzzleCheck = false, // Whether the weapon should check LOS from each individual muzzle in addition to the scope.
			AllowScopeOutsideObb = false, // If true, the actual scope position will be used regardless if it is outside the bounds of the weapon block.  If false (default) the ray origin will be adjusted to be inside the bounds.
			DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution. 
			Debug = false, // Force enables debug mode - will output damage stats to WC log.
			RestrictionRadius = 0, // Prevents other blocks of this type from being placed within this distance of the centre of the block.
			CheckInflatedBox = false, // If true, the above distance check is performed from the edge of the block instead of the centre.
			CheckForAnyWeapon = false, // If true, the check will fail if ANY weapon is present, not just weapons of the same subtype.
			ProhibitLGTargeting = false, // If true, prohibits block from targeting Large Grids (best used in server-specific weapon packs)
			ProhibitSGTargeting = false, // If true, prohibits block from targeting Small Grids (best used in server-specific weapon packs)
			ProhibitSubsystemChanges = false, // If true, disables subsystem selection by player.  Should only target subsystem list in order as specified in Targeting
		};

		private OtherDef Common_Weapons_Hardpoint_Other_NoRestrictionOrLosCheck = new OtherDef 
		{
			ConstructPartCap = 0, // Maximum number of blocks with this weapon on a grid; 0 = unlimited.
			RotateBarrelAxis = 0, // For spinning barrels, which axis to spin the barrel around; 0 = none.
			MuzzleCheck = false, // Whether the weapon should check LOS from each individual muzzle in addition to the scope.
			AllowScopeOutsideObb = false, // If true, the actual scope position will be used regardless if it is outside the bounds of the weapon block.  If false (default) the ray origin will be adjusted to be inside the bounds.
			DisableLosCheck = true, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution. 
			Debug = false, // Force enables debug mode - will output damage stats to WC log.
			RestrictionRadius = 0, // Prevents other blocks of this type from being placed within this distance of the centre of the block.
			CheckInflatedBox = false, // If true, the above distance check is performed from the edge of the block instead of the centre.
			CheckForAnyWeapon = false, // If true, the check will fail if ANY weapon is present, not just weapons of the same subtype.
			ProhibitLGTargeting = false, // If true, prohibits block from targeting Large Grids (best used in server-specific weapon packs)
			ProhibitSGTargeting = false, // If true, prohibits block from targeting Small Grids (best used in server-specific weapon packs)
			ProhibitSubsystemChanges = false, // If true, disables subsystem selection by player.  Should only target subsystem list in order as specified in Targeting
		};

		private OtherDef Common_Weapons_Hardpoint_Other_Handhelds = new OtherDef 
		{
			ConstructPartCap = 0, // Maximum number of blocks with this weapon on a grid; 0 = unlimited.
			RotateBarrelAxis = 0, // For spinning barrels, which axis to spin the barrel around; 0 = none.
			MuzzleCheck = false, // Whether the weapon should check LOS from each individual muzzle in addition to the scope.
			AllowScopeOutsideObb = true, // If true, the actual scope position will be used regardless if it is outside the bounds of the weapon block.  If false (default) the ray origin will be adjusted to be inside the bounds.
			DisableLosCheck = true, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution. 
			Debug = false, // Force enables debug mode - will output damage stats to WC log.
			RestrictionRadius = 0, // Prevents other blocks of this type from being placed within this distance of the centre of the block.
			CheckInflatedBox = false, // If true, the above distance check is performed from the edge of the block instead of the centre.
			CheckForAnyWeapon = false, // If true, the check will fail if ANY weapon is present, not just weapons of the same subtype.
			ProhibitLGTargeting = false, // If true, prohibits block from targeting Large Grids (best used in server-specific weapon packs)
			ProhibitSGTargeting = false, // If true, prohibits block from targeting Small Grids (best used in server-specific weapon packs)
			ProhibitSubsystemChanges = false, // If true, disables subsystem selection by player.  Should only target subsystem list in order as specified in Targeting
		};

	}
}