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
				Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any
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
				Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 2000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
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

        WeaponDefinition GVK_GriffinMissileTurret => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "GVK_GriffinMissileTurret",
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns.
                        MuzzlePartId = "MissileTurretBarrels", // The subpart where your muzzle empties are located.
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                    new MountPointDef 
					{
                        SubtypeId = "GVK_GriffinMissileTurret_NPC",
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns.
                        MuzzlePartId = "MissileTurretBarrels", // The subpart where your muzzle empties are located.
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                },
                Muzzles = new[] 
				{
                    "muzzle_missile_1",
                    "muzzle_missile_2",
                    "muzzle_missile_3",
                    "muzzle_missile_4",
                    "muzzle_missile_5",
                    "muzzle_missile_6",
                    "muzzle_missile_7",
                    "muzzle_missile_8",
                    "muzzle_missile_9",
                    "muzzle_missile_10",
                    "muzzle_missile_11",
                    "muzzle_missile_12",
                    "muzzle_missile_13",
                    "muzzle_missile_14",
                    "muzzle_missile_15",
                    "muzzle_missile_16",
                    "muzzle_missile_17",
                    "muzzle_missile_18",
                    "muzzle_missile_19",
                    "muzzle_missile_20",
                    "muzzle_missile_21",
                    "muzzle_missile_22",
                    "muzzle_missile_23",
                    "muzzle_missile_24",
                    "muzzle_missile_25",
                    "muzzle_missile_26",
                    "muzzle_missile_27",
                    "muzzle_missile_28",
                    "muzzle_missile_29",
                    "muzzle_missile_30",
                    "muzzle_missile_31",
                    "muzzle_missile_32",
                    "muzzle_missile_33",
                    "muzzle_missile_34",
                    "muzzle_missile_35",
                    "muzzle_missile_36",
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "scope", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = Missiles_Missile_Targeting_Large,
            HardPoint = new HardPointDef
            {
                PartName = "Griffin Turret", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 0.2f, // Projectile inaccuracy in degrees.
                AimingTolerance = 60, // How many degrees off target a turret can fire at. 0 - 180 firing angle.
                AimLeadingPrediction = Off, // Level of turret aim prediction; Off, Basic, Accurate, Advanced
                AddToleranceToTracking = false, // Allows turret to track to the edge of the AimingTolerance cone instead of dead centre.
                NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.01f, // Max traversal speed of azimuth subpart in radians per tick (0.1 is approximately 360 degrees per second).
                    ElevateRate = 0.0f, // Max traversal speed of elevation subpart in radians per tick.
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -60,
                    MaxElevation = 60,
                    HomeAzimuth = 0, // Default resting rotation angle
                    InventorySize = 2.500f, // Inventory capacity in kL.
                    HomeElevation = 0, // Default resting elevation
                    IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = BlockWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                },
				Other = Common_Weapons_Hardpoint_Other_NoRestrictionOrLosCheck,
                Loading = new LoadingDef
                {
                    RateOfFire = 300, // 240. Set this to 3600 for beam weapons.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    SkipBarrels = 0, // Number of muzzles to skip after each fire event.
					ReloadTime = 1000, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 36, // Number of physical magazines to consume on reload.
                    DelayUntilFire = 0, // How long the weapon waits before shooting after being told to fire. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    ShotsInBurst = 4, // 5. Use this if you don't want the weapon to fire an entire physical magazine before stopping to reload. Should not be more than your magazine capacity.
                    DelayAfterBurst = 180, // 160. How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
                    GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its burst.
					GoHomeToReload = true, // Tells the weapon it must be in the home position before it can reload.
					DropTargetUntilLoaded = false, // If true this weapon will drop the target when its out of ammo and until its reloaded.
                },
				Audio = Missiles_Missile_Hardpoint_Audio,
                Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "MD_GriffinLaunchSmoke", // SubtypeId of muzzle particle effect.
                        Offset = Vector(x: 0, y: 0, z: -0.5f), // Offsets the effect from the muzzle empty.
                        DisableCameraCulling = false, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Loop = false, // Set this to the same as in the particle sbc!
                            Restart = false, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 2000,
                            MaxDuration = 0,
                            Scale = 1f, // Scale of effect.
                        },
                    },
                },
            },
            Ammos = new[] 
			{
                Missiles_Missile,
            },
            Animations = Missiles_LightMissile_Animation,
        };

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
				Other = Common_Weapons_Hardpoint_Other_NoRestrictionOrLosCheck,
                Loading = Missiles_Missile_Hardpoint_Loading_Large,
				Audio = Missiles_Missile_Hardpoint_Audio,
                Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "MD_GriffinLaunchSmoke", // SubtypeId of muzzle particle effect.
                        Offset = Vector(x: 0, y: 0, z: -2.0f), // Offsets the effect from the muzzle empty.
                        DisableCameraCulling = false, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Loop = false, // Set this to the same as in the particle sbc!
                            Restart = false, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 2000,
                            MaxDuration = 0,
                            Scale = 1f, // Scale of effect.
                        },
                    },
                },
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
				Other = Common_Weapons_Hardpoint_Other_NoRestrictionOrLosCheck,
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