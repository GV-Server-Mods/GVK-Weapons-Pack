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
		
		private TargetingDef Ballistics_Gatlings_Targeting => new TargetingDef 
		{
			Threats = new[] 
			{
				Projectiles, Characters, Grids,   // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] 
			{
				Any, Offense, Utility, Power, Production, Thrust, Jumping, Steering
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MaxTargetDistance = 1500, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 4, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};
		private TargetingDef Ballistics_Gatlings_Targeting_Long => new TargetingDef 
		{
			Threats = new[] 
			{
				Projectiles, Characters, Grids,   // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] 
			{
				Any, Offense, Utility, Power, Production, Thrust, Jumping, Steering
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MaxTargetDistance = 1600, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 4, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 4, // 0 = unlimited, max number of blocks to randomize between
			CycleBlocks = 4,
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};
		private HardwareDef Ballistics_Gatlings_Hardpoint_HardWare = new HardwareDef 
		{
			RotateRate = 0.03f,
			ElevateRate = 0.03f,
			MinAzimuth = -180,
			MaxAzimuth = 180,
			MinElevation = -20,
			MaxElevation = 90,
			HomeAzimuth = 0, // Default resting rotation angle
			HomeElevation = 0, // Default resting elevation
			InventorySize = 0.6f,
			Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
			IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
		};
		private OtherDef Ballistics_Gatlings_Hardpoint_Other = new OtherDef 
		{
			ConstructPartCap = 0, // Maximum number of blocks with this weapon on a grid; 0 = unlimited.
			RotateBarrelAxis = 3, // For spinning barrels, which axis to spin the barrel around; 0 = none.
			MuzzleCheck = false, // Whether the weapon should check LOS from each individual muzzle in addition to the scope.
			DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
 			Debug = false, // Force enables debug mode.
			RestrictionRadius = 0, // Prevents other blocks of this type from being placed within this distance of the centre of the block.
			CheckInflatedBox = false, // If true, the above distance check is performed from the edge of the block instead of the centre.
			CheckForAnyWeapon = false, // If true, the check will fail if ANY weapon is present, not just weapons of the same subtype.
		};
		private LoadingDef Ballistics_Gatlings_Hardpoint_Loading = new LoadingDef 
		{
			RateOfFire = 1500,
			BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
			BarrelsPerShot = 1,
			TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
			SkipBarrels = 0,
			ReloadTime = 192, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			HeatPerShot = 0, //heat generated per shot
			MaxHeat = 0, //max heat before weapon enters cooldown (70% of max heat)
			Cooldown = 0f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
			HeatSinkRate = 0, //amount of heat lost per second
			DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
			ShotsInBurst = 0, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
			DelayAfterBurst = 0, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
			GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its magazine or burst.
			DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
			MagsToLoad = 4, // Number of physical magazines to consume on reload.
			SpinFree = true, // Spin barrel while not firing
			StayCharged = false, // Will start recharging whenever power cap is not full
			MaxActiveProjectiles = 0, // Maximum number of drones in flight (only works for drone launchers)
			MaxReloads = 0, // Maximum number of reloads in the LIFETIME of a weapon
			GoHomeToReload = false, // Tells the weapon it must be in the home position before it can reload.
			DropTargetUntilLoaded = false, // If true this weapon will drop the target when its out of ammo and until its reloaded.
		};
		private HardPointAudioDef Ballistics_Gatlings_Hardpoint_Audio = new HardPointAudioDef 
		{
			PreFiringSound = "", 
			FiringSound = "MD_GatlingLoopFire", // MD_GatlingBlisterFire, WepTurretInteriorFire, ArcWepShipGatlingShot, MD_GatlingLoop
			FiringSoundPerShot = false,
			ReloadSound = "",
			NoAmmoSound = "WepShipGatlingNoAmmo", 
			HardPointRotationSound = "WepTurretGatlingRotate", 
			BarrelRotationSound = "MD_GatlingBarrelLoop",
			FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
			FireSoundNoBurst = true, // Don't stop firing sound from looping when delaying after burst.
		};
		private HardPointParticleDef Ballistics_Gatlings_Hardpoint_Graphics = new HardPointParticleDef 
		{
			Effect1 = new ParticleDef
			{
				Name = "MD_Muzzle_Flash_Vulcan", // SubtypeId of muzzle particle effect.
				Offset = new Vector3D(0f,0f,-1.75f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = true, // Set this to the same as in the particle sbc!
					Restart = false, // Whether to end a looping effect instantly when firing stops.
					MaxDistance = 1000,
					MaxDuration = 0,
					Scale = 1f, // Scale of effect.
				},
			},
			Effect2 = new ParticleDef
			{
				Name = "", //Smoke_LargeGunShot_WC
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = false, // Set this to the same as in the particle sbc!
					Restart = false, // Whether to end a looping effect instantly when firing stops.
					MaxDistance = 800,
					MaxDuration = 0,
					Scale = 1f, // Scale of effect.
				},
			},
		};
		private HardPointParticleDef Ballistics_Gatlings_Hardpoint_Graphics_Small = new HardPointParticleDef 
		{
			Effect1 = new ParticleDef
			{
				Name = "MD_Muzzle_Flash_Vulcan", // SubtypeId of muzzle particle effect.
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = true, // Set this to the same as in the particle sbc!
					Restart = false, // Whether to end a looping effect instantly when firing stops.
					MaxDistance = 1000,
					MaxDuration = 0,
					Scale = 1f, // Scale of effect.
				},
			},
			Effect2 = new ParticleDef
			{
				Name = "", //Smoke_LargeGunShot_WC
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = false, // Set this to the same as in the particle sbc!
					Restart = false, // Whether to end a looping effect instantly when firing stops.
					MaxDistance = 800,
					MaxDuration = 0,
					Scale = 1f, // Scale of effect.
				},
			},
		};
		private HardPointParticleDef Ballistics_Gatlings_Hardpoint_Graphics_Vulcan = new HardPointParticleDef 
		{
			Effect1 = new ParticleDef
			{
				Name = "MD_Muzzle_Flash_Vulcan", // SubtypeId of muzzle particle effect.
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = true, // Set this to the same as in the particle sbc!
					Restart = false, // Whether to end a looping effect instantly when firing stops.
					MaxDistance = 1000,
					MaxDuration = 0,
					Scale = 1f, // Scale of effect.
				},
			},
			Effect2 = new ParticleDef
			{
				Name = "", //Smoke_LargeGunShot_WC
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = false, // Set this to the same as in the particle sbc!
					Restart = false, // Whether to end a looping effect instantly when firing stops.
					MaxDistance = 800,
					MaxDuration = 0,
					Scale = 1f, // Scale of effect.
				},
			},
		};

		//Weapon Definitions

		WeaponDefinition SentinelTurret => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SentinelTurret",
                        SpinPartId = "SentinelBarrel", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,
                        IconName = "None",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SentinelTurret_NPC",
                        SpinPartId = "SentinelBarrel", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,
                        IconName = "None",
                    },
                },
                Muzzles = new []
                {
					//"MissileTurretBarrels",
					"Sentinelmuzzle_1",
					"Sentinelmuzzle_2",
					"Sentinelmuzzle_3",
					"Sentinelmuzzle_4",
					"Sentinelmuzzle_5",
					"Sentinelmuzzle_6",
					"Sentinelmuzzle_7",
					"Sentinelmuzzle_8",
                },
				Ejector = "ejector",
				Scope = "camera", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = Ballistics_Gatlings_Targeting,
            HardPoint = new HardPointDef
            {
                PartName = "Sentinel Gatling", // name of weapon in terminal
                DeviateShotAngle = 0.15f,
                AimingTolerance = 30f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 20, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = Ballistics_Gatlings_Hardpoint_HardWare,
				Other = Ballistics_Gatlings_Hardpoint_Other,
                Loading = Ballistics_Gatlings_Hardpoint_Loading,
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
                Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "MD_Muzzle_Flash_Vulcan", // SubtypeId of muzzle particle effect. Muzzle_Flash_Large
                        Offset = Vector(x: 0, y: 0, z: -5), // Offsets the effect from the muzzle empty.
                        DisableCameraCulling = false, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Loop = true, // Set this to the same as in the particle sbc!
                            Restart = false, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 1000,
                            MaxDuration = 0,
                            Scale = 1f, // Scale of effect.
						},
                    },
                    Effect2 = new ParticleDef
                    {
						Name = "", // Smoke_LargeGunShot_WC
                        Offset = Vector(x: 0, y: 0, z: -5),
                        DisableCameraCulling = false, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Loop = false, // Set this to the same as in the particle sbc!
                            Restart = false, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 800,
                            MaxDuration = 0,
                            Scale = 1f, // Scale of effect.
						},
                    },
                },
			},
            Ammos = new [] {
                NATO_25x184mm,
            },
        };

		WeaponDefinition LargeGatlingTurret
        {
            get
            {
                var weapon = SentinelTurret;
                weapon.Assignments = new ModelAssignmentsDef
				{
					MountPoints = new[]
					{
						new MountPointDef 
						{
							SubtypeId = "LargeGatlingTurret",
							SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
							MuzzlePartId = "GatlingBarrel",
							AzimuthPartId = "GatlingTurretBase1",
							ElevationPartId = "GatlingTurretBase2",
							DurabilityMod = 0.5f,
							IconName = "TestIcon.dds",
						},
						new MountPointDef 
						{
							SubtypeId = "LargeGatlingTurret_NPC",
							SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
							MuzzlePartId = "GatlingBarrel",
							AzimuthPartId = "GatlingTurretBase1",
							ElevationPartId = "GatlingTurretBase2",
							DurabilityMod = 0.5f,
							IconName = "TestIcon.dds",
						},
						new MountPointDef 
						{
							SubtypeId = "LargeGatlingTurretReskin",
							SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
							MuzzlePartId = "GatlingTurretReskinBarrel",
							AzimuthPartId = "GatlingTurretBase1",
							ElevationPartId = "GatlingTurretBase2",
							DurabilityMod = 0.5f,
							IconName = "TestIcon.dds",
						},
						new MountPointDef 
						{
							SubtypeId = "LargeGatlingTurretReskin_NPC",
							SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
							MuzzlePartId = "GatlingTurretReskinBarrel",
							AzimuthPartId = "GatlingTurretBase1",
							ElevationPartId = "GatlingTurretBase2",
							DurabilityMod = 0.5f,
							IconName = "TestIcon.dds",
						},
					},
					Muzzles = new []
					{
						"muzzle_projectile_1",
					},
				};
				weapon.HardPoint.PartName = "CIWS Large";
				weapon.HardPoint.Graphics = Ballistics_Gatlings_Hardpoint_Graphics;
                return weapon;
            }
        }

        WeaponDefinition SmallGatlingTurret => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingTurret",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "GatlingBarrel",
                        AzimuthPartId = "GatlingTurretBase1",
                        ElevationPartId = "GatlingTurretBase2",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingTurret_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "GatlingBarrel",
                        AzimuthPartId = "GatlingTurretBase1",
                        ElevationPartId = "GatlingTurretBase2",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingTurretReskin",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "GatlingTurretBarrel",
                        AzimuthPartId = "GatlingTurretBase1",
                        ElevationPartId = "GatlingTurretBase2",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingTurretReskin_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "GatlingTurretBarrel",
                        AzimuthPartId = "GatlingTurretBase1",
                        ElevationPartId = "GatlingTurretBase2",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                },
                Muzzles = new []
                {
                    "muzzle_projectile",
                },
            },
            Targeting = Ballistics_Gatlings_Targeting,
            HardPoint = new HardPointDef
            {
                PartName = "CWIS Small", // name of weapon in terminal
                DeviateShotAngle = 0.15f,
                AimingTolerance = 30f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 20, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.03f,
                    ElevateRate = 0.03f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -10,
                    MaxElevation = 90,
                    InventorySize = 0.3f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Ballistics_Gatlings_Hardpoint_Other,
                Loading = Ballistics_Gatlings_Hardpoint_Loading,
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics_Small,
            },
			Ammos = new[] {
                NATO_25x184mm,
            },
        };

        WeaponDefinition SmallGatlingGun => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingGun",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "Barrel",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingGunWarfare2",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "Barrel",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingGun_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "Barrel",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingGunWarfare2_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "Barrel",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                },
                Muzzles = new []
                {
                    "muzzle_projectile",
                },
            },
            Targeting = Common_Weapons_Targeting_Fixed_NoTargeting,
            HardPoint = new HardPointDef
            {
                PartName = "Gatling Fixed", // name of weapon in terminal
                DeviateShotAngle = 0.15f,
                AimingTolerance = 60f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef
                {
                    InventorySize = 0.3f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Ballistics_Gatlings_Hardpoint_Other,
                Loading = Ballistics_Gatlings_Hardpoint_Loading,
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics_Small,
            },
			Ammos = new[] {
                NATO_25x184mm,
            },
        };

        WeaponDefinition SmallGatlingGun_Gimbal => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingGun_Gimbal",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "GatlingBarrel",
                        AzimuthPartId = "GatlingTurretBase1",
                        ElevationPartId = "GatlingTurretBase2",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SmallGatlingGun_Gimbal_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "GatlingBarrel",
                        AzimuthPartId = "GatlingTurretBase1",
                        ElevationPartId = "GatlingTurretBase2",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                },
                Muzzles = new []
                {
                    "muzzle_projectile",
                },
            },
            Targeting = Ballistics_Gatlings_Targeting_Long,
            HardPoint = new HardPointDef
            {
                PartName = "Gatling Gimbal", // name of weapon in terminal
                DeviateShotAngle = 0.15f,
                AimingTolerance = 7f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.01f,
                    ElevateRate = 0.01f,
                    MinAzimuth = -15,
                    MaxAzimuth = 15,
                    MinElevation = -15,
                    MaxElevation = 15,
                    InventorySize = 0.3f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.005f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
				},
                Other = Ballistics_Gatlings_Hardpoint_Other,
                Loading = Ballistics_Gatlings_Hardpoint_Loading,
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics_Small,
            },

			Ammos = new[] 
			{
                NATO_25x184mm,
            },
        };
		
        WeaponDefinition GVK_AvengerGatlingTurret => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "GVK_AvengerGatlingTurret",
                        SpinPartId = "", //For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,	 
					},
                    new MountPointDef 
					{
                        SubtypeId = "GVK_AvengerGatlingTurret_NPC",
                        SpinPartId = "", //For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,	 
					},
                },
                Muzzles = new[] {
                    "muzzle_missile_1",
                    "muzzle_missile_2",
                },
                Ejector = "",
				Scope = "scope",
				//Camera = "dummy_camera",
            },
            Targeting = Ballistics_Gatlings_Targeting_Long,
            HardPoint = new HardPointDef
            {
                PartName = "Avenger Gatling", // name of weapon in terminal
                DeviateShotAngle = 0.15f, // Inaccuracy in degrees
                AimingTolerance = 3f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.015f,
                    ElevateRate = 0.015f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -15,
                    MaxElevation = 80,
                    HomeAzimuth = 0, // Default resting rotation angle
                    HomeElevation = 0, // Default resting elevation
                    InventorySize = 0.9f,
                    //Offset = Vector(x: 0, y: 0, z: 0),
                    Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = new LoadingDef
                {
                    RateOfFire = 1000,
                    BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 2,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
					FireFull = false,
                    ReloadTime = 4, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 14, // Number of physical magazines to consume on reload.
					DelayUntilFire = 0,
                    SpinFree = false, // Spin while not firing
                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "",
                    FiringSound = "MD_LargeGatlingLoopFire", // WepShipGatlingShot
                    FiringSoundPerShot = false,
                    ReloadSound = "",
                    NoAmmoSound = "WepShipGatlingNoAmmo",
                    HardPointRotationSound = "WepTurretGatlingRotate",
                    BarrelRotationSound = "MD_GatlingBarrelLoop",
                    FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                    FireSoundNoBurst = false,
                },
                
				Graphics = Ballistics_Gatlings_Hardpoint_Graphics_Vulcan,
            },
            Ammos = new[] 
			{
                NATO_25x184mm_Dual,
				NATO_25x184mm_Dual_Fragment,
            },
            Animations = GVK_AvengerGatlingTurretAnimations,
            // Don't edit below this line
        };
    }
}