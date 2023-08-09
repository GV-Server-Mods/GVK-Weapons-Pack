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
		//Common definitions
		
		private TargetingDef Missiles_Missile_Targeting_Large => new TargetingDef 
		{
			Threats = new[] {
				Grids, // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] {
				Any,
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 2300, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 2, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 5, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
			CycleTargets = 0, // Number of targets to "cycle" per acquire attempt.
			CycleBlocks = 0, // Number of blocks to "cycle" per acquire attempt.
			UniqueTargetPerWeapon = false, // only applies to multi-weapon blocks 
			MaxTrackingTime = 0, // After this time has been reached the weapon will stop tracking existing target and scan for a new one
			ShootBlanks = false, // Do not generate projectiles when shooting
			FocusOnly = false, // This weapon can only track focus targets.
			EvictUniqueTargets = false, // if this is set it will evict any weapons set to UniqueTargetPerWeapon unless they to have this set
		};

		private TargetingDef Missiles_Missile_Targeting_Small => new TargetingDef 
		{
			Threats = new[] {
				Grids, // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] {
				Any,
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 1800, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 2, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
			CycleTargets = 0, // Number of targets to "cycle" per acquire attempt.
			CycleBlocks = 0, // Number of blocks to "cycle" per acquire attempt.
			UniqueTargetPerWeapon = false, // only applies to multi-weapon blocks 
			MaxTrackingTime = 0, // After this time has been reached the weapon will stop tracking existing target and scan for a new one
			ShootBlanks = false, // Do not generate projectiles when shooting
			FocusOnly = false, // This weapon can only track focus targets.
			EvictUniqueTargets = false, // if this is set it will evict any weapons set to UniqueTargetPerWeapon unless they to have this set
		};

		private HardwareDef Missiles_Missile_Hardpoint_HardWare_Large = new HardwareDef
		{
			InventorySize = 14.100f,
			Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
			IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
		};

		private HardwareDef Missiles_Missile_Hardpoint_HardWare_Small = new HardwareDef
		{
			InventorySize = 0.380f,
			Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
			IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
		};

		private OtherDef Missiles_Missile_Hardpoint_Other => new OtherDef 
		{
			ConstructPartCap = 0,
			RotateBarrelAxis = 0,
			DisableLosCheck = true, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private LoadingDef Missiles_Missile_Hardpoint_Loading_Large = new LoadingDef
		{
			RateOfFire = 480, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
			BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
			TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
			SkipBarrels = 0, // Number of muzzles to skip after each fire event.
			ReloadTime = 2700, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			MagsToLoad = 150, // Number of physical magazines to consume on reload.
			ShotsInBurst = 10, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
			DelayAfterBurst = 480, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
			GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its magazine or burst.
			MaxActiveProjectiles = 0, // Maximum number of drones in flight (only works for drone launchers)
		};

		private LoadingDef Missiles_Missile_Hardpoint_Loading_Small = new LoadingDef
		{
			RateOfFire = 240, // 240 Pre Rebalance 
			BarrelsPerShot = 1, 
			TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
			ReloadTime = 480, //3600 // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			MagsToLoad = 4, // Number of physical magazines to consume on reload.
			MaxActiveProjectiles = 0, // Maximum number of drones in flight (only works for drone launchers)
		};

		private HardPointAudioDef Missiles_Missile_Hardpoint_Audio => new HardPointAudioDef 
		{
			PreFiringSound = "",
			FiringSound = "MXA_Archer_Fire", // subtype name from sbc
			FiringSoundPerShot = true,
			ReloadSound = "",
			NoAmmoSound = "ArcWepShipGatlingNoAmmo",
			HardPointRotationSound = "WepTurretGatlingRotate",
			BarrelRotationSound = "",
			FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
		};

		//Weapon Definitions

        WeaponDefinition MXA_ArcherPods => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "MXA_ArcherPods",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new[] 
				{
                    "subpart_ArcherPod1_Missile_1", "subpart_ArcherPod2_Missile_1", "subpart_ArcherPod3_Missile_1", "subpart_ArcherPod4_Missile_1", "subpart_ArcherPod5_Missile_1",
                    "subpart_ArcherPod1_Missile_2", "subpart_ArcherPod2_Missile_2", "subpart_ArcherPod3_Missile_2", "subpart_ArcherPod4_Missile_2", "subpart_ArcherPod5_Missile_2",
                    "subpart_ArcherPod1_Missile_3", "subpart_ArcherPod2_Missile_3", "subpart_ArcherPod3_Missile_3", "subpart_ArcherPod4_Missile_3", "subpart_ArcherPod5_Missile_3",
                    "subpart_ArcherPod1_Missile_4", "subpart_ArcherPod2_Missile_4", "subpart_ArcherPod3_Missile_4", "subpart_ArcherPod4_Missile_4", "subpart_ArcherPod5_Missile_4",
                    "subpart_ArcherPod1_Missile_5", "subpart_ArcherPod2_Missile_5", "subpart_ArcherPod3_Missile_5", "subpart_ArcherPod4_Missile_5", "subpart_ArcherPod5_Missile_5",
                    "subpart_ArcherPod1_Missile_6", "subpart_ArcherPod2_Missile_6", "subpart_ArcherPod3_Missile_6", "subpart_ArcherPod4_Missile_6", "subpart_ArcherPod5_Missile_6",
                    "subpart_ArcherPod1_Missile_7", "subpart_ArcherPod2_Missile_7", "subpart_ArcherPod3_Missile_7", "subpart_ArcherPod4_Missile_7", "subpart_ArcherPod5_Missile_7",
                    "subpart_ArcherPod1_Missile_8", "subpart_ArcherPod2_Missile_8", "subpart_ArcherPod3_Missile_8", "subpart_ArcherPod4_Missile_8", "subpart_ArcherPod5_Missile_8",
                    "subpart_ArcherPod1_Missile_9", "subpart_ArcherPod2_Missile_9", "subpart_ArcherPod3_Missile_9", "subpart_ArcherPod4_Missile_9", "subpart_ArcherPod5_Missile_9",
                    "subpart_ArcherPod1_Missile_10", "subpart_ArcherPod2_Missile_10", "subpart_ArcherPod3_Missile_10", "subpart_ArcherPod4_Missile_10", "subpart_ArcherPod5_Missile_10",
                    "subpart_ArcherPod1_Missile_11", "subpart_ArcherPod2_Missile_11", "subpart_ArcherPod3_Missile_11", "subpart_ArcherPod4_Missile_11", "subpart_ArcherPod5_Missile_11",
                    "subpart_ArcherPod1_Missile_12", "subpart_ArcherPod2_Missile_12", "subpart_ArcherPod3_Missile_12", "subpart_ArcherPod4_Missile_12", "subpart_ArcherPod5_Missile_12",
                    "subpart_ArcherPod1_Missile_13", "subpart_ArcherPod2_Missile_13", "subpart_ArcherPod3_Missile_13", "subpart_ArcherPod4_Missile_13", "subpart_ArcherPod5_Missile_13",
                    "subpart_ArcherPod1_Missile_14", "subpart_ArcherPod2_Missile_14", "subpart_ArcherPod3_Missile_14", "subpart_ArcherPod4_Missile_14", "subpart_ArcherPod5_Missile_14",
                    "subpart_ArcherPod1_Missile_15", "subpart_ArcherPod2_Missile_15", "subpart_ArcherPod3_Missile_15", "subpart_ArcherPod4_Missile_15", "subpart_ArcherPod5_Missile_15",
                    "subpart_ArcherPod1_Missile_16", "subpart_ArcherPod2_Missile_16", "subpart_ArcherPod3_Missile_16", "subpart_ArcherPod4_Missile_16", "subpart_ArcherPod5_Missile_16",
                    "subpart_ArcherPod1_Missile_17", "subpart_ArcherPod2_Missile_17", "subpart_ArcherPod3_Missile_17", "subpart_ArcherPod4_Missile_17", "subpart_ArcherPod5_Missile_17",
                    "subpart_ArcherPod1_Missile_18", "subpart_ArcherPod2_Missile_18", "subpart_ArcherPod3_Missile_18", "subpart_ArcherPod4_Missile_18", "subpart_ArcherPod5_Missile_18",
                    "subpart_ArcherPod1_Missile_19", "subpart_ArcherPod2_Missile_19", "subpart_ArcherPod3_Missile_19", "subpart_ArcherPod4_Missile_19", "subpart_ArcherPod5_Missile_19",
                    "subpart_ArcherPod1_Missile_20", "subpart_ArcherPod2_Missile_20", "subpart_ArcherPod3_Missile_20", "subpart_ArcherPod4_Missile_20", "subpart_ArcherPod5_Missile_20",
                    "subpart_ArcherPod1_Missile_21", "subpart_ArcherPod2_Missile_21", "subpart_ArcherPod3_Missile_21", "subpart_ArcherPod4_Missile_21", "subpart_ArcherPod5_Missile_21",
                    "subpart_ArcherPod1_Missile_22", "subpart_ArcherPod2_Missile_22", "subpart_ArcherPod3_Missile_22", "subpart_ArcherPod4_Missile_22", "subpart_ArcherPod5_Missile_22",
                    "subpart_ArcherPod1_Missile_23", "subpart_ArcherPod2_Missile_23", "subpart_ArcherPod3_Missile_23", "subpart_ArcherPod4_Missile_23", "subpart_ArcherPod5_Missile_23",
                    "subpart_ArcherPod1_Missile_24", "subpart_ArcherPod2_Missile_24", "subpart_ArcherPod3_Missile_24", "subpart_ArcherPod4_Missile_24", "subpart_ArcherPod5_Missile_24",
                    "subpart_ArcherPod1_Missile_25", "subpart_ArcherPod2_Missile_25", "subpart_ArcherPod3_Missile_25", "subpart_ArcherPod4_Missile_25", "subpart_ArcherPod5_Missile_25",
                    "subpart_ArcherPod1_Missile_26", "subpart_ArcherPod2_Missile_26", "subpart_ArcherPod3_Missile_26", "subpart_ArcherPod4_Missile_26", "subpart_ArcherPod5_Missile_26",
                    "subpart_ArcherPod1_Missile_27", "subpart_ArcherPod2_Missile_27", "subpart_ArcherPod3_Missile_27", "subpart_ArcherPod4_Missile_27", "subpart_ArcherPod5_Missile_27",
                    "subpart_ArcherPod1_Missile_28", "subpart_ArcherPod2_Missile_28", "subpart_ArcherPod3_Missile_28", "subpart_ArcherPod4_Missile_28", "subpart_ArcherPod5_Missile_28",
                    "subpart_ArcherPod1_Missile_29", "subpart_ArcherPod2_Missile_29", "subpart_ArcherPod3_Missile_29", "subpart_ArcherPod4_Missile_29", "subpart_ArcherPod5_Missile_29",
                    "subpart_ArcherPod1_Missile_30", "subpart_ArcherPod2_Missile_30", "subpart_ArcherPod3_Missile_30", "subpart_ArcherPod4_Missile_30", "subpart_ArcherPod5_Missile_30",
                },
                Ejector = "",
                Scope = "subpart_ArcherPod2_Missile_16", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = Missiles_Missile_Targeting_Large,
            HardPoint = new HardPointDef
            {
                PartName = "Large Archer Missile Pod", // name of weapon in terminal
                DeviateShotAngle = 1f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
                Ai = Common_Weapons_Hardpoint_Ai_BasicFixed_Tracking,                
                HardWare = Missiles_Missile_Hardpoint_HardWare_Large,
				Other = Missiles_Missile_Hardpoint_Other,
                Loading = Missiles_Missile_Hardpoint_Loading_Large,
				Audio = Missiles_Missile_Hardpoint_Audio,
            },
            Ammos = new[] 
			{
				Missiles_Missile,
            },
            Animations = MXA_ArcherPods_Animation,
        };

        WeaponDefinition SmallRocketLauncherReload => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SmallRocketLauncherReload",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        ElevationPartId = "None",
                        AzimuthPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                },
                Muzzles = new []
                {
                    "muzzle_missile_001",
					"muzzle_missile_002",
					"muzzle_missile_003",
					"muzzle_missile_004",
                },
                Ejector = "",
                Scope = "muzzle_missile_002", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = Missiles_Missile_Targeting_Small,
            HardPoint = new HardPointDef
            {
                PartName = "SmallRocketLauncherReload", // name of weapon in terminal
                DeviateShotAngle = 1f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
                Ai = Common_Weapons_Hardpoint_Ai_BasicFixed_Tracking,                
                HardWare = Missiles_Missile_Hardpoint_HardWare_Small,
				Other = Missiles_Missile_Hardpoint_Other,
                Loading = Missiles_Missile_Hardpoint_Loading_Small,
                Audio = Missiles_Missile_Hardpoint_Audio,
            },
			Ammos = new[] 
			{
				Missiles_Missile,
            },
        };
		
		WeaponDefinition MXA_ArcherPods_NPC
        {
            get
            {
                var missile = MXA_ArcherPods;
                missile.Assignments.MountPoints[0].SubtypeId = "MXA_ArcherPods_NPC";
                missile.Ammos = new[]
                {
                    Missiles_Missile_NPC,
                };
                return missile;
            }
        }

		WeaponDefinition SmallRocketLauncherReload_NPC
        {
            get
            {
                var missile = SmallRocketLauncherReload;
                missile.Assignments.MountPoints[0].SubtypeId = "SmallRocketLauncherReload_NPC";
                missile.Ammos = new[]
                {
                    Missiles_Missile_NPC,
                };
                return missile;
            }
        }
    }
}