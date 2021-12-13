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
				Any, // subsystems the gun targets
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 1200, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
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
				Any, // subsystems the gun targets
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 700, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private OtherDef Ballistics_Gatlings_Hardpoint_Other = new OtherDef {
			ConstructPartCap = 20,
			RotateBarrelAxis = 3,
			EnergyPriority = 0,
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private LoadingDef Ballistics_Gatlings_Hardpoint_Loading = new LoadingDef {
			RateOfFire = 1200,
			BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
			BarrelsPerShot = 1,
			TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
			SkipBarrels = 0,
			ReloadTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			HeatPerShot = 3, //heat generated per shot
			MaxHeat = 240, //max heat before weapon enters cooldown (70% of max heat)
			Cooldown = 0.75f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
			HeatSinkRate = 25, //amount of heat lost per second
			DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
			ShotsInBurst = 0,
			DelayAfterBurst = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			FireFull = false,
			GiveUpAfter = false,
			DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
			MagsToLoad = 1, // Number of physical magazines to consume on reload.
			SpinFree = true, // Spin barrel while not firing
			StayCharged = false, // Will start recharging whenever power cap is not full
		};

		private LoadingDef Ballistics_Gatlings_Hardpoint_Loading_Techless = new LoadingDef {
			RateOfFire = 800,
			BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
			BarrelsPerShot = 1,
			TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
			SkipBarrels = 0,
			ReloadTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			HeatPerShot = 4, //heat generated per shot
			MaxHeat = 240, //max heat before weapon enters cooldown (70% of max heat)
			Cooldown = 0.75f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
			HeatSinkRate = 25, //amount of heat lost per second
			DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
			ShotsInBurst = 0,
			DelayAfterBurst = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			FireFull = false,
			GiveUpAfter = false,
			DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
			MagsToLoad = 1, // Number of physical magazines to consume on reload.
			SpinFree = true, // Spin barrel while not firing
			StayCharged = false, // Will start recharging whenever power cap is not full
		};

		private HardPointAudioDef Ballistics_Gatlings_Hardpoint_Audio = new HardPointAudioDef {
			PreFiringSound = "",
			FiringSound = "MD_GatlingBlisterFire", // WM_Lightning, WepTurretInteriorFire, ArcWepShipGatlingShot, MD_GatlingLoop
			FiringSoundPerShot = true,
			ReloadSound = "",
			NoAmmoSound = "WepShipGatlingNoAmmo", 
			HardPointRotationSound = "WepTurretGatlingRotate", 
			BarrelRotationSound = "MD_GatlingBarrelLoop",
			FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
		};

		private HardPointParticleDef Ballistics_Gatlings_Hardpoint_Graphics = new HardPointParticleDef {
			Effect1 = new ParticleDef
			{
				Name = "", // OKI_230mm_Muzzle_Flash 
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = true,
					Restart = false,
					MaxDistance = 1000,
					Scale = 1f,
				}
			},
			Effect2 = new ParticleDef
			{
				Name = "", // OKI_230mm_Muzzle_Flash 
				Color = new Vector4(1f,1f,1f,1f), //RGBA
				Offset = new Vector3D(0f,0f,0.25f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = false,
					Restart = false,
					MaxDistance = 1000,
					MaxDuration = 0,
					Scale = 1.0f,
				}
			},
		};

		//Weapon Definitions

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
                PartName = "LargeGatlingTurret", // name of weapon in terminal
                DeviateShotAngle = 0.4f,
                AimingTolerance = 4f, // 0 - 180 firing angle
                AimLeadingPrediction = Basic, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 10, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,
				
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret_LockOn,
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0.03f,
                    ElevateRate = 0.02f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -10,
                    MaxElevation = 90,
                    FixedOffset = false,
                    InventorySize = 0.8f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					CriticalReaction = new CriticalDef
					{
						Enable = false, // Enables Warhead behaviour
						DefaultArmedTimer = 120,
						PreArmed = false,
						TerminalControls = true,
						AmmoRound = "", // name of ammo upon explosion
					},
                },
				
                Other = new OtherDef {
					ConstructPartCap = 20,
					RotateBarrelAxis = 3,
					EnergyPriority = 0,
					MuzzleCheck = false,
					Debug = false,
					RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
					CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
					CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
				},
				
                Loading = Ballistics_Gatlings_Hardpoint_Loading,
                
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
				
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics,
				
            },
       
			Ammos = new[] {
                Ballistics_Gatling,
            },
            Animations = MD_Gatling_Animations,
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
                    new MountPointDef
                    {
                        SubtypeId = "LargeGatlingTurretBasic",
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
                PartName = "SmallGatlingTurret", // name of weapon in terminal
                DeviateShotAngle = 0.7f,
                AimingTolerance = 4f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,
				
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret_LockOn,
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0.04f,
                    ElevateRate = 0.03f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -10,
                    MaxElevation = 90,
                    FixedOffset = false,
                    InventorySize = 0.4f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					CriticalReaction = new CriticalDef
					{
						Enable = false, // Enables Warhead behaviour
						DefaultArmedTimer = 120,
						PreArmed = false,
						TerminalControls = true,
						AmmoRound = "", // name of ammo upon explosion
					},
                },
				
                Other = new OtherDef {
					ConstructPartCap = 10,
					RotateBarrelAxis = 3,
					EnergyPriority = 0,
					MuzzleCheck = false,
					Debug = false,
					RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
					CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
					CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
				},
				
                Loading = Ballistics_Gatlings_Hardpoint_Loading_Techless,
                
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
				
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics,
				
            },

			Ammos = new[] {
                Ballistics_Gatling_Basic,
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
                        ElevationPartId = "None",
                        AzimuthPartId = "None",
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
                PartName = "SmallGatlingGun", // name of weapon in terminal
                DeviateShotAngle = 0.6f,
                AimingTolerance = 4f, // 0 - 180 firing angle
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
                    FixedOffset = true,
                    InventorySize = 0.2f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					CriticalReaction = new CriticalDef
					{
						Enable = false, // Enables Warhead behaviour
						DefaultArmedTimer = 120,
						PreArmed = false,
						TerminalControls = true,
						AmmoRound = "", // name of ammo upon explosion
					},
                },
				
                Other = new OtherDef {
					ConstructPartCap = 10,
					RotateBarrelAxis = 3,
					EnergyPriority = 0,
					MuzzleCheck = false,
					Debug = false,
					RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
					CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
					CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
				},
				
                Loading = Ballistics_Gatlings_Hardpoint_Loading_Techless,
                
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
				
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics,
				
            },

			Ammos = new[] {
                Ballistics_Gatling,

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

            Targeting = Ballistics_Gatlings_Targeting_T1,

            HardPoint = new HardPointDef
            {
                PartName = "SmallGatling Gimballed", // name of weapon in terminal
                DeviateShotAngle = 0.4f,
                AimingTolerance = 7f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,
				
                Ui = Common_Weapons_Hardpoint_Ui_ROFOnly,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret_LockOn,
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0.01f,
                    ElevateRate = 0.01f,
                    MinAzimuth = -15,
                    MaxAzimuth = 15,
                    MinElevation = -15,
                    MaxElevation = 15,
                    FixedOffset = false,
                    InventorySize = 0.2f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					CriticalReaction = new CriticalDef
					{
						Enable = false, // Enables Warhead behaviour
						DefaultArmedTimer = 120,
						PreArmed = false,
						TerminalControls = true,
						AmmoRound = "", // name of ammo upon explosion
					},
                },
				
                Other = new OtherDef {
					ConstructPartCap = 10,
					RotateBarrelAxis = 3,
					EnergyPriority = 0,
					MuzzleCheck = false,
					Debug = false,
					RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
					CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
					CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
				},
				
                Loading = Ballistics_Gatlings_Hardpoint_Loading_Techless,
                
				Audio = Ballistics_Gatlings_Hardpoint_Audio,
				
                Graphics = Ballistics_Gatlings_Hardpoint_Graphics,
				
            },

			Ammos = new[] {
                Ballistics_Gatling,
            },
            //Animations = AdvancedAnimation,
            // Don't edit below this line
        };
    }
}