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

		private TargetingDef Ballistics_Cannons_Targeting_LargeTurret => new TargetingDef {
			Threats = new[] {
				Grids,
			},
			SubSystems = new[] {
				Thrust, Utility, Offense, Power, Production, Jumping, Steering, Any,
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 2000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 20, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private TargetingDef Ballistics_Cannons_Targeting_SmallTurret => new TargetingDef {
			Threats = new[] {
				Grids,
			},
			SubSystems = new[] {
				Thrust, Utility, Offense, Power, Production, Jumping, Steering, Any,
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 1500, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 10, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private HardPointAudioDef Ballistics_Cannons_Hardpoint_Audio = new HardPointAudioDef {
			PreFiringSound = "",
			FiringSound = "MD_Cannon_Fire", // subtype name from sbc
			FiringSoundPerShot = true,
			ReloadSound = "MD_Cannon_Reload",
			NoAmmoSound = "ArcWepShipGatlingNoAmmo",
			HardPointRotationSound = "WepTurretGatlingRotate",
			BarrelRotationSound = "",
		};

		private HardPointParticleDef Ballistics_Cannons_Hardpoint_Graphics = new HardPointParticleDef {
			Effect1 = new ParticleDef
			{
				Name = "", // OKI_230mm_Muzzle_Flash   MXA_SmallCoilgunMuzzleFlash
				Color = new Vector4(1f,1f,1f,1f), //RGBA
				Offset = new Vector3D(0f,0f,1f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = false,
					Restart = false,
					MaxDistance = 800,
					MaxDuration = 0,
					Scale = 1.0f,
				}
			},
			Effect2 = new ParticleDef
			{
				Name = "MD_CannonMuzzleFlash", // OKI_230mm_Muzzle_Flash   MXA_SmallCoilgunMuzzleFlash
				Color = new Vector4(1f,1f,1f,1f), //RGBA
				Offset = new Vector3D(0f,0f,1f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = false,
					Restart = false,
					MaxDistance = 800,
					MaxDuration = 0,
					Scale = 1.0f,
				}
			},
		};

        WeaponDefinition MXA_CoilgunL => new WeaponDefinition {

            Assignments = new ModelAssignmentsDef {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "MXA_CoilgunL",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f, //this is the GeneralDamageMultiplier of the weapon
                        IconName = ""
                    },
                },
                Muzzles = new[] {
                    "muzzle_projectile_1",
                    "muzzle_projectile_2",
                },
                Ejector = "",
                Scope = "scope", //Where line of sight checks are performed from must be clear of block collision
            },

            Targeting = Ballistics_Cannons_Targeting_LargeTurret,
			
            HardPoint = new HardPointDef {
                PartName = "M66 Sentry", // name of weapon in terminal
                DeviateShotAngle = 0.6f,
                AimingTolerance = 0.8f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,

                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret_LockOn,
				
                HardWare = new HardwareDef {
                    RotateRate = 0.005f,
                    ElevateRate = 0.0025f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -5,
                    MaxElevation = 90,
                    FixedOffset = false,
                    InventorySize = 1.4f,
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
                
                Other = new OtherDef
                {
                    ConstructPartCap = 6,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
				
                Loading = new LoadingDef {
                    RateOfFire = 80, //180 // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 45, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
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
					MagsToLoad = 2, // Number of physical magazines to consume on reload.
					SpinFree = true, // Spin barrel while not firing
					StayCharged = false, // Will start recharging whenever power cap is not full
                },

                Audio = new HardPointAudioDef {
					PreFiringSound = "",
					FiringSound = "MD_Cannon_Fire_Click", // subtype name from sbc
					FiringSoundPerShot = true,
					ReloadSound = "MD_Cannon_Reload",
					NoAmmoSound = "ArcWepShipGatlingNoAmmo",
					HardPointRotationSound = "WepTurretGatlingRotate",
					BarrelRotationSound = "",
				},
				
                Graphics = Ballistics_Cannons_Hardpoint_Graphics,
				
            },
            Ammos = new[] {
                Ballistics_Cannon,
            },
            Animations = MXA_CoilgunL_Animation,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };

        WeaponDefinition Ballistics_Cannon_Turret_Dumb => new WeaponDefinition {

            Assignments = new ModelAssignmentsDef {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "Ballistics_Cannon_Turret_Dumb",
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns.
                        MuzzlePartId = "MissileTurretBarrels", // The subpart where your muzzle empties are located.
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                },
                Muzzles = new[] {
                    "muzzle_projectile_1",
                },
                Ejector = "",
                Scope = "", //Where line of sight checks are performed from must be clear of block collision
            },

            Targeting = new TargetingDef {
				Threats = new[] {
					Other,
				},
				SubSystems = new[] {
					Any,
				},
				ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
				IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
				LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
				MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
				MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
				MaxTargetDistance = 1, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
				MinTargetDistance = 1, // 0 = unlimited, Min target distance that targets will be automatically shot at.
				TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
				TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
				StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
			},
			
            HardPoint = new HardPointDef {
                PartName = "122mm Overwatch", // name of weapon in terminal
                DeviateShotAngle = 0.2f,
                AimingTolerance = 0.8f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,

                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = new AiDef {
					TrackTargets = true,
					TurretAttached = true, //seems to affect player ability to control manually.
					TurretController = false, //seems to affects manual and painter, also turrets don't return to center
					PrimaryTracking = false, //seems to make no difference
					LockOnFocus = false,
					SuppressFire = true,
					OverrideLeads = false, // Override default behavior for target leads
				},
				
                HardWare = new HardwareDef {
                    RotateRate = 0.005f,
                    ElevateRate = 0.0025f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -15,
                    MaxElevation = 90,
                    FixedOffset = false,
                    InventorySize = 1.4f,
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
                
                Other = new OtherDef
                {
                    ConstructPartCap = 6,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
				
                Loading = new LoadingDef {
                    RateOfFire = 50, //180 // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 72, // Measured in game ticks (use 3600/ROF for consistant fire rate).
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
					MagsToLoad = 1, // Number of physical magazines to consume on reload.
					SpinFree = true, // Spin barrel while not firing
					StayCharged = false, // Will start recharging whenever power cap is not full
                },

                Audio = Ballistics_Cannons_Hardpoint_Audio,
				
                Graphics = Ballistics_Cannons_Hardpoint_Graphics,
				
            },
            Ammos = new[] {
                Ballistics_Cannon,
            },
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };

        WeaponDefinition VehicleTurret122mm => new WeaponDefinition {

            Assignments = new ModelAssignmentsDef 
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "OKI122mmVT",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new [] {
                    "muzzle_projectile_1",
                },
                Ejector = "",
                Scope = "", //Where line of sight checks are performed from must be clear of block collision
            },

            Targeting = Ballistics_Cannons_Targeting_SmallTurret,
			
            HardPoint = new HardPointDef 
            {
                PartName = "Vehicle 122mm Assault Gun Turret", // name of weapon in terminal
                DeviateShotAngle = 0.4f,
                AimingTolerance = 0.5f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,

                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret_LockOn,

                HardWare = new HardwareDef {
                    RotateRate = 0.015f,
                    ElevateRate = 0.01f,
                    MinAzimuth = -120,
                    MaxAzimuth = 120,
                    MinElevation = -15,
                    MaxElevation = 45,
                    FixedOffset = false,
                    InventorySize = 1f,
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

                Other = new OtherDef
                {
                    ConstructPartCap = 5,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 0.5f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },

                Loading = new LoadingDef {
                    RateOfFire = 40,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 90, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    HeatPerShot = 0, //heat generated per shot
                    MaxHeat = 0, //max heat before weapon enters cooldown (70% of max heat)
                    Cooldown = 0f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
                    HeatSinkRate = 0, //amount of heat lost per second
                    DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
                    ShotsInBurst = 1,
                    DelayAfterBurst = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false,  // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
                    GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its magazine or burst.
                    BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
					MagsToLoad = 1, // Number of physical magazines to consume on reload.
					SpinFree = true, // Spin barrel while not firing
					StayCharged = false, // Will start recharging whenever power cap is not full
				},

                Audio = Ballistics_Cannons_Hardpoint_Audio,
				
                Graphics = Ballistics_Cannons_Hardpoint_Graphics,
				
            },
            Ammos = new[] {
                Ballistics_Cannon,
            },
            //Animations = AdvancedAnimation,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };

        WeaponDefinition SmallCannon122mm => new WeaponDefinition {

            Assignments = new ModelAssignmentsDef 
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "OKI122mmSGfixed",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },

                },
                Muzzles = new [] {
                    "muzzle_projectile_1",
                },
                Ejector = "",
                Scope = "", //Where line of sight checks are performed from must be clear of block collision
            },

            Targeting = Common_Weapons_Targeting_Fixed_NoTargeting,
			
            HardPoint = new HardPointDef 
            {
                PartName = "122mm Fixed Assault Cannon", // name of weapon in terminal
                DeviateShotAngle = 0.4f,
                AimingTolerance = 0f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,

                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicFixed_NoTracking,

                HardWare = new HardwareDef {
                    RotateRate = 0f,
                    ElevateRate = 0f,
                    MinAzimuth = 0,
                    MaxAzimuth = 0,
                    MinElevation = 0,
                    MaxElevation = 0,
                    FixedOffset = false,
                    InventorySize = 0.6f,
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

                Other = new OtherDef
                {
                    ConstructPartCap = 5,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 0.5f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },

                Loading = new LoadingDef {
                    RateOfFire = 40,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 90, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    HeatPerShot = 0, //heat generated per shot
                    MaxHeat = 0, //max heat before weapon enters cooldown (70% of max heat)
                    Cooldown = 0f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
                    HeatSinkRate = 0, //amount of heat lost per second
                    DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
                    ShotsInBurst = 1,
                    DelayAfterBurst = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false,
                    GiveUpAfter = false,
                    BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
					MagsToLoad = 1, // Number of physical magazines to consume on reload.
					SpinFree = true, // Spin barrel while not firing
					StayCharged = false, // Will start recharging whenever power cap is not full
                },

                Audio = Ballistics_Cannons_Hardpoint_Audio,
				
                Graphics = Ballistics_Cannons_Hardpoint_Graphics,
				
            },
            Ammos = new[] {
                Ballistics_Cannon,
            },
            //Animations = AdvancedAnimation,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };
    }
}