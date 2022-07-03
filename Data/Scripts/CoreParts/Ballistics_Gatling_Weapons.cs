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

namespace Scripts {   
    partial class Parts {

		//Common definitions
		
		private TargetingDef Ballistics_Gatlings_Targeting_T2 => new TargetingDef {
			Threats = new[] {
				Projectiles, Characters, Grids,   // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] {
				Thrust, Utility, Offense, Power, Production, Jumping, Steering, Any,
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 1400, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private TargetingDef Ballistics_Gatlings_Targeting_T1 => new TargetingDef {
			Threats = new[] {
				 Characters, Projectiles, Grids,   // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] {
				Thrust, Utility, Offense, Power, Production, Jumping, Steering, Any,
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 900, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private HardwareDef Ballistics_Gatlings_Hardpoint_HardWare_T2 = new HardwareDef {
			RotateRate = 0.05f,
			ElevateRate = 0.03f,
			MinAzimuth = -180,
			MaxAzimuth = 180,
			MinElevation = -10,
			MaxElevation = 90,
			FixedOffset = false,
			InventorySize = 0.6f,
			Offset = Vector(x: 0, y: 0, z: 0),
			Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
			IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
			
			CriticalReaction = Common_Weapons_Hardpoint_Hardware_CriticalReaction_None,
		};

		private OtherDef Ballistics_Gatlings_Hardpoint_Other = new OtherDef {
			ConstructPartCap = 21, // Maximum number of blocks with this weapon on a grid; 0 = unlimited.
			RotateBarrelAxis = 3, // For spinning barrels, which axis to spin the barrel around; 0 = none.
			EnergyPriority = 0, // Deprecated.
			MuzzleCheck = false, // Whether the weapon should check LOS from each individual muzzle in addition to the scope.
			Debug = false, // Force enables debug mode.
			RestrictionRadius = 0, // Prevents other blocks of this type from being placed within this distance of the centre of the block.
			CheckInflatedBox = false, // If true, the above distance check is performed from the edge of the block instead of the centre.
			CheckForAnyWeapon = false, // If true, the check will fail if ANY weapon is present, not just weapons of the same subtype.
		};

		private LoadingDef Ballistics_Gatlings_Hardpoint_Loading_T2 = new LoadingDef {
			RateOfFire = 2100,
			BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
			BarrelsPerShot = 1,
			TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
			SkipBarrels = 0,
			ReloadTime = 2, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			HeatPerShot = 1, //heat generated per shot
			MaxHeat = 240, //max heat before weapon enters cooldown (70% of max heat)
			Cooldown = 0.75f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
			HeatSinkRate = 25, //amount of heat lost per second
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
		};

		private LoadingDef Ballistics_Gatlings_Hardpoint_Loading_T1 = new LoadingDef {
			RateOfFire = 1800,
			BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
			BarrelsPerShot = 1,
			TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
			SkipBarrels = 0,
			ReloadTime = 2, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			HeatPerShot = 2, //heat generated per shot
			MaxHeat = 240, //max heat before weapon enters cooldown (70% of max heat)
			Cooldown = 0.75f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
			HeatSinkRate = 25, //amount of heat lost per second
			DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
			ShotsInBurst = 0,
			DelayAfterBurst = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			FireFull = false,
			GiveUpAfter = true,
			DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
			MagsToLoad = 2, // Number of physical magazines to consume on reload.
			SpinFree = true, // Spin barrel while not firing
			StayCharged = false, // Will start recharging whenever power cap is not full
			MaxActiveProjectiles = 0, // Maximum number of drones in flight (only works for drone launchers)
			MaxReloads = 0, // Maximum number of reloads in the LIFETIME of a weapon
		};

		private HardPointAudioDef Ballistics_Gatlings_Hardpoint_Audio = new HardPointAudioDef {
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

		private HardPointParticleDef Ballistics_Gatlings_Hardpoint_Graphics = new HardPointParticleDef {
			Effect1 = new ParticleDef
			{
				Name = "Muzzle_Flash_Large", // SubtypeId of muzzle particle effect.
				Color = new Vector4(1f,1f,1f,1f), //RGBA //Deprecated
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = true, // Set this to the same as in the particle sbc!
					Restart = true, // Whether to end a looping effect instantly when firing stops.
					Scale = 2f, // Scale of effect.
				},
			},
			Effect2 = new ParticleDef
			{
				Name = "Smoke_LargeGunShot_WC",
				Color = new Vector4(1f,1f,1f,1f), //RGBA //Deprecated
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = true, // Set this to the same as in the particle sbc!
					Restart = false,
					Scale = 2f,
				},
			},
		};

		//Weapon Definitions

		WeaponDefinition SentinelTurret => new WeaponDefinition {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SentinelTurret",
                        SpinPartId = "SentinelBarrel", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "SentinelBarrel",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,
                        IconName = "None",
                    },
                },
                Muzzles = new []
                {
					//"SentinelBarrel",
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

            Targeting = Ballistics_Gatlings_Targeting_T2,

            HardPoint = new HardPointDef
            {
                PartName = "Sentinel Turret", // name of weapon in terminal
                DeviateShotAngle = 0.5f,
                AimingTolerance = 30f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 20, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,
				
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
				
                HardWare = Ballistics_Gatlings_Hardpoint_HardWare_T2;
				
                Other = Ballistics_Gatlings_Hardpoint_Other,
				
                Loading = Ballistics_Gatlings_Hardpoint_Loading_T2,
                
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
				
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics,
				
            },
       
            Ammos = new [] {
                NATO_25x184mm,
            },
             //Animations= Lancer_Recoil
            // Don't edit below this line
        };

        WeaponDefinition LargeGatlingTurret => new WeaponDefinition {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef {
                        SubtypeId = "LargeGatlingTurret",
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
                    "muzzle_projectile_1",
                },
            },
			
            Targeting = Ballistics_Gatlings_Targeting_T2,
			
            HardPoint = new HardPointDef
            {
                PartName = "CIWS Large", // name of weapon in terminal
                DeviateShotAngle = 0.5f,
                AimingTolerance = 30f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 20, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,
				
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
				
                HardWare = Ballistics_Gatlings_Hardpoint_HardWare_T2;
				
                Other = Ballistics_Gatlings_Hardpoint_Other,
				
                Loading = Ballistics_Gatlings_Hardpoint_Loading_T2,
                
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
				
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics,
				
            },
       
			Ammos = new[] {
                NATO_25x184mm,
            },
            //Animations = MD_Gatling_Animations,
            // Don't edit below this line
        };

        WeaponDefinition SmallGatlingTurret => new WeaponDefinition {
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
                },
                Muzzles = new []
                {
                    "muzzle_projectile",
                },
            },

            Targeting = Ballistics_Gatlings_Targeting_T1,

            HardPoint = new HardPointDef
            {
                PartName = "CWIS Small", // name of weapon in terminal
                DeviateShotAngle = 0.7f,
                AimingTolerance = 30f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 20, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,
				
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0.05f,
                    ElevateRate = 0.03f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -10,
                    MaxElevation = 90,
                    FixedOffset = false,
                    InventorySize = 0.3f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					
					CriticalReaction = Common_Weapons_Hardpoint_Hardware_CriticalReaction_None,
                },
				
                Other = Ballistics_Gatlings_Hardpoint_Other,

                Loading = Ballistics_Gatlings_Hardpoint_Loading_T1,
                
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
				
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics,
				
            },

			Ammos = new[] {
                NATO_25x184mm,
            },
            //Animations = AdvancedAnimation,
            // Don't edit below this line
        };

        WeaponDefinition SmallGatlingGun => new WeaponDefinition {
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
                DeviateShotAngle = 0.6f,
                AimingTolerance = 0f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,
				
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicFixed_NoTracking,
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0.00f,
                    ElevateRate = 0.00f,
                    MinAzimuth = 0,
                    MaxAzimuth = 0,
                    MinElevation = 0,
                    MaxElevation = 0,
                    FixedOffset = false,
                    InventorySize = 0.15f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					
					CriticalReaction = Common_Weapons_Hardpoint_Hardware_CriticalReaction_None,
                },
				
                Other = Ballistics_Gatlings_Hardpoint_Other,

                Loading = Ballistics_Gatlings_Hardpoint_Loading_T2,
                
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
				
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics,
				
            },

			Ammos = new[] {
                NATO_25x184mm,

            },
            //Animations = AdvancedAnimation,
            // Don't edit below this line
        };

        WeaponDefinition SmallGatlingGun_Gimbal => new WeaponDefinition {
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

                },
                Muzzles = new []
                {
                    "muzzle_projectile",
                },
            },

            Targeting = Ballistics_Gatlings_Targeting_T2,

            HardPoint = new HardPointDef
            {
                PartName = "Gatling Gimbal", // name of weapon in terminal
                DeviateShotAngle = 0.4f,
                AimingTolerance = 7f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,
				
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0.01f,
                    ElevateRate = 0.01f,
                    MinAzimuth = -15,
                    MaxAzimuth = 15,
                    MinElevation = -15,
                    MaxElevation = 15,
                    FixedOffset = false,
                    InventorySize = 0.15f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.005f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					
					CriticalReaction = Common_Weapons_Hardpoint_Hardware_CriticalReaction_None,
				},
				
                Other = Ballistics_Gatlings_Hardpoint_Other,

                Loading = Ballistics_Gatlings_Hardpoint_Loading_T2,
                
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
				
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics,
				
            },

			Ammos = new[] {
                NATO_25x184mm,
            },
            //Animations = AdvancedAnimation,
            // Don't edit below this line


        };

    }
}