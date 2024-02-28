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
		private TargetingDef Other_Radar_Targeting => new TargetingDef 
		{
			Threats = new[] {
				Grids, // Types of threat to engage: Grids, Projectiles, Characters, Meteors, Neutrals
			},
			SubSystems = new[] {
				Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any,
			},
			ClosestFirst = false, // Tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // Minimum radius of threat to engage.
			MaximumDiameter = 0, // Maximum radius of threat to engage; 0 = unlimited.
			MaxTargetDistance = 5000, // Maximum distance at which targets will be automatically shot at; 0 = unlimited.
			MinTargetDistance = 0, // Minimum distance at which targets will be automatically shot at.
			TopTargets = 8, // Maximum number of targets to randomize between; 0 = unlimited.
			TopBlocks = 1, // Maximum number of blocks to randomize between; 0 = unlimited.
			StopTrackingSpeed = 0, // Do not track threats traveling faster than this speed; 0 = unlimited.
			ShootBlanks = true, // Do not generate projectiles when shooting
			FocusOnly = true, // This weapon can only track focus targets.
		};

		private UiDef Other_Radar_Hardpoint_Ui = new UiDef 
		{
			RateOfFire = false, // Enables terminal slider for changing rate of fire.
			RateOfFireMin = 0.0f, // Sets the minimum limit for the rate of fire slider, default is 0.  Range is 0-1f.
			DamageModifier = false, // Enables terminal slider for changing damage per shot.
			ToggleGuidance = false, // Enables terminal option to disable smart projectile guidance.
			EnableOverload = false, // Enables terminal option to turn on Overload; this allows energy weapons to double damage per shot, at the cost of quadrupled power draw and heat gain, and 2% self damage on overheat.
			AlternateUi = false, // This simplifies and customizes the block controls for alternative weapon purposes,   
			DisableStatus = false, // Do not display weapon status NoTarget, Reloading, NoAmmo, etc..
		};

		private AiDef Other_Radar_HardPoint_Ai => new AiDef
		{
			TrackTargets = true, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
			TurretAttached = true, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
			TurretController = true, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
			PrimaryTracking = true, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
			LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
			SuppressFire = false, // If enabled, weapon can only be fired manually.
			OverrideLeads = false, // Disable target leading on fixed weapons, or allow it for turrets.
			DefaultLeadGroup = 0, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
			TargetGridCenter = false, // Does not target blocks, instead it targets grid center.
		};

		private OtherDef Other_Radar_HardPoint_Other => new OtherDef
		{
			ConstructPartCap = 0, // Maximum number of blocks with this weapon on a grid; 0 = unlimited.
			RotateBarrelAxis = 0, // For spinning barrels, which axis to spin the barrel around; 0 = none.
			EnergyPriority = 0, // Deprecated.
			DisableLosCheck = true, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution. 
			MuzzleCheck = false, // Whether the weapon should check LOS from each individual muzzle in addition to the scope.
			Debug = false, // Force enables debug mode.
			RestrictionRadius = 0, // Prevents other blocks of this type from being placed within this distance of the centre of the block.
			CheckInflatedBox = false, // If true, the above distance check is performed from the edge of the block instead of the centre.
			CheckForAnyWeapon = false, // If true, the check will fail if ANY weapon is present, not just weapons of the same subtype.
		};

		private LoadingDef Other_Radar_HardPoint_Loading = new LoadingDef
		{
			RateOfFire = 5, // Set this to 3600 for beam weapons.
			BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
			TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
			ReloadTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			MagsToLoad = 1, // Number of physical magazines to consume on reload.
		};
				
        WeaponDefinition Other_Radar_Large => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "OKIDesignator",
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns.
                        MuzzlePartId = "MissileTurretBarrels", // The subpart where your muzzle empties are located.
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                },
                Muzzles = new[] {
                    "muzzle_missile_1",
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "camera", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = Other_Radar_Targeting,
            HardPoint = new HardPointDef
            {
                PartName = "Radar", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 0, // Projectile inaccuracy in degrees.
                AimingTolerance = 180f, // How many degrees off target a turret can fire at. 0 - 180 firing angle.
                AimLeadingPrediction = Off, // Level of turret aim prediction; Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 second, etc..). Length of time the weapon continues firing after trigger is released.
                AddToleranceToTracking = false, // Allows turret to only track to the edge of the AimingTolerance cone instead of dead centre.
                CanShootSubmerged = false, // Whether the weapon can be fired underwater when using WaterMod.
                Ui = Other_Radar_Hardpoint_Ui,
                Ai = Other_Radar_HardPoint_Ai,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.02f, // Max traversal speed of azimuth subpart in radians per tick (0.1 is approximately 360 degrees per second).
                    ElevateRate = 0.02f, // Max traversal speed of elevation subpart in radians per tick.
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -15,
                    MaxElevation = 90,
                    HomeAzimuth = 0, // Default resting rotation angle
                    HomeElevation = 0, // Default resting elevation
                    InventorySize = 0f, // Inventory capacity in kL.
                    IdlePower = 0.25f, // Constant base power draw in MW.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = BlockWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                },
                Other = Other_Radar_HardPoint_Other,
                Loading = Other_Radar_HardPoint_Loading,
            },
            Ammos = new[] 
			{
                designatorBeam1, // Must list all primary, shrapnel, and pattern ammos.
            },
            //Animations = Honir_Spin,
            //Upgrades = UpgradeModules,
        };

        WeaponDefinition AryxRadar => new WeaponDefinition {

            Assignments = new ModelAssignmentsDef 
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "ARYXSmallRadar",
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                    },
                },
                Muzzles = new[]{
                    "muzzle_projectile_1",
                },
                Ejector = "",
                Scope = "muzzle_projectile_1", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = new TargetingDef
            {
                Threats = new[] {
                    Grids, // Types of threat to engage: Grids, Projectiles, Characters, Meteors, Neutrals
                },
                SubSystems = new[] {
                    Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any,
                },
                ClosestFirst = false, // Tries to pick closest targets first (blocks on grids, projectiles, etc...).
                IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
                LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
                MinimumDiameter = 0, // Minimum radius of threat to engage.
                MaximumDiameter = 0, // Maximum radius of threat to engage; 0 = unlimited.
                MaxTargetDistance = 5000, // Maximum distance at which targets will be automatically shot at; 0 = unlimited.
                MinTargetDistance = 0, // Minimum distance at which targets will be automatically shot at.
                TopTargets = 8, // Maximum number of targets to randomize between; 0 = unlimited.
                TopBlocks = 1, // Maximum number of blocks to randomize between; 0 = unlimited.
                StopTrackingSpeed = 0, // Do not track threats traveling faster than this speed; 0 = unlimited.
				ShootBlanks = true, // Do not generate projectiles when shooting
                FocusOnly = false, // This weapon can only track focus targets.
            },
            HardPoint = new HardPointDef 
            {
                PartName = "Radar", // name of weapon in terminal
                DeviateShotAngle = 0,
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Other_Radar_Hardpoint_Ui,
                Ai = Other_Radar_HardPoint_Ai,
                HardWare = new HardwareDef 
				{
                    InventorySize = 0.0f,
                    Offset = Vector(x: 0, y: 0, z: 0),
                    Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Other_Radar_HardPoint_Other,
                Loading = Other_Radar_HardPoint_Loading,
            },
            Ammos = new [] 
			{
                designatorBeam1, // Must list all primary, shrapnel, and pattern ammos.
            },
            //Animations = AdvancedAnimation,
            // Don't edit below this line
        };
    }
}