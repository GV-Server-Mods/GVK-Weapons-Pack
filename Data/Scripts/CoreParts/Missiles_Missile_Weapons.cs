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

namespace Scripts
{
    partial class Parts
    {

		//Common definitions
		
		private TargetingDef Missiles_Missile_Targeting_Large => new TargetingDef {
			Threats = new[] {
				Grids, // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] {
				Any, // subsystems the gun targets
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 2300, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private TargetingDef Missiles_Missile_Targeting_Small => new TargetingDef {
			Threats = new[] {
				Grids, // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] {
				Any, // subsystems the gun targets
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 1800, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private OtherDef Missiles_Missile_Hardpoint_Other = new OtherDef {
			ConstructPartCap = 21,
			RotateBarrelAxis = 0,
			EnergyPriority = 0,
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private HardPointAudioDef Missiles_Missile_Hardpoint_Audio = new HardPointAudioDef {
			PreFiringSound = "",
			FiringSound = "MXA_Archer_Fire", // subtype name from sbc
			FiringSoundPerShot = true,
			ReloadSound = "",
			NoAmmoSound = "ArcWepShipGatlingNoAmmo",
			HardPointRotationSound = "WepTurretGatlingRotate",
			BarrelRotationSound = "",
			FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
		};

		private HardPointParticleDef Missiles_Missile_Hardpoint_Graphics = new HardPointParticleDef {
			Effect1 = new ParticleDef
			{
				Name = "", // OKI_230mm_Muzzle_Flash 
				Color = new Vector4(1f,1f,1f,1f), //RGBA
				Offset = new Vector3D(0f,-1f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = false,
					Restart = false,
					MaxDistance = 800,
					MaxDuration = 1,
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

        WeaponDefinition MXA_ArcherPods => new WeaponDefinition {

            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "MXA_ArcherPods",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new[] {
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
                AimingTolerance = 179f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
                CanShootSubmerged = false,

				Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret_LockOn, //Common_Weapons_Hardpoint_Ai_BasicTurret_LockOn, Common_Weapons_Hardpoint_Ai_BasicFixed_Tracking
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0f,
                    ElevateRate = 0f,
                    MinAzimuth = 0,
                    MaxAzimuth = 0,
                    MinElevation = 0,
                    MaxElevation = 0,
                    FixedOffset = true,
                    InventorySize = 7.5f,
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
				
                Other = Missiles_Missile_Hardpoint_Other,
				
                Loading = new LoadingDef
                {
                    RateOfFire = 480, // 240 Pre Rebalance // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 2700, //1200-420 for animation reload delay // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    HeatPerShot = 0, //heat generated per shot
                    MaxHeat = 0, //max heat before weapon enters cooldown (70% of max heat)
                    Cooldown = 0, //percent of max heat to be under to start firing again after overheat accepts .2-.95
                    HeatSinkRate = 0, //amount of heat lost per second
                    DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
                    ShotsInBurst = 10,
                    DelayAfterBurst = 480, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false,
                    GiveUpAfter = false,
                    BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
					MagsToLoad = 150, // Number of physical magazines to consume on reload.
					SpinFree = true, // Spin barrel while not firing
					StayCharged = false, // Will start recharging whenever power cap is not full
                },
                
				Audio = Missiles_Missile_Hardpoint_Audio,
				
                Graphics = Missiles_Missile_Hardpoint_Graphics,
				
            },
            Ammos = new[] {
                Missiles_Missile,
				Missiles_Missile_HomingPhase
            },
            Animations = MXA_ArcherPods_Animation,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };

        WeaponDefinition SmallRocketLauncherReload => new WeaponDefinition {
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
                CanShootSubmerged = false,

                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = new AiDef {
					TrackTargets = true, //This Weapon will know there are targets in range
					TurretAttached = false, // This enables the ability for players to manually control
					TurretController = false, //The turret in this WeaponDefinition has control over where other turrets aim.
					PrimaryTracking = false, //The turret in this WeaponDefinition selects targets for other turrets that do not have tracking capabilities.
					LockOnFocus = true, // fires this weapon when something is locked using the WC hud reticle
					SuppressFire = true, //prevent automatic firing
					OverrideLeads = false, // Override default behavior for target leads
				},
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0f,
                    ElevateRate = 0f,
                    MinAzimuth = 0,
                    MaxAzimuth = 0,
                    MinElevation = 0,
                    MaxElevation = 0,
                    FixedOffset = true,
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
					ConstructPartCap = 21,
					RotateBarrelAxis = 0,
					EnergyPriority = 0,
					MuzzleCheck = false,
					Debug = false,
					RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
					CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
					CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
				},
				
                Loading = new LoadingDef
                {
                    RateOfFire = 240, // 240 Pre Rebalance // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 480, //3600 // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    HeatPerShot = 0, //heat generated per shot
                    MaxHeat = 0, //max heat before weapon enters cooldown (70% of max heat)
                    Cooldown = 0, //percent of max heat to be under to start firing again after overheat accepts .2-.95
                    HeatSinkRate = 0, //amount of heat lost per second
                    DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
                    ShotsInBurst = 0,
                    DelayAfterBurst = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false,
                    GiveUpAfter = false,
                    BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
					MagsToLoad = 4, // Number of physical magazines to consume on reload.
					SpinFree = true, // Spin barrel while not firing
					StayCharged = false, // Will start recharging whenever power cap is not full
                },
				
                Audio = Missiles_Missile_Hardpoint_Audio,
				
                Graphics = Missiles_Missile_Hardpoint_Graphics,
				
            },
			Ammos = new[] {
                Missiles_Missile,
				Missiles_Missile_HomingPhase
            },
            //Animations = AdvancedAnimation,
            // Don't edit below this line
        };

    }
}