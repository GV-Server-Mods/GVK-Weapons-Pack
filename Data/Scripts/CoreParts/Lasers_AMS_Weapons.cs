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
		// Don't edit above this line
        WeaponDefinition MA_PDT => new WeaponDefinition {	
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef {
                        SubtypeId = "MA_PDT",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
						DurabilityMod = 0.5f,
                        IconName = "filter_energy.dds" 
					},
				    new MountPointDef {
                        SubtypeId = "MA_PDT_sm",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
						DurabilityMod = 0.5f,
                        IconName = "filter_energy.dds"
                    },

                },
                Muzzles = new []
                {
                    "muzzle_missile_001",
                },
            },
            Targeting = new TargetingDef
            {
                Threats = new[]
                {
                    Projectiles,// threats percieved automatically without changing menu settings  Grids, Characters, Projectiles, Meteors,
                },
                SubSystems = new[] {
                    Thrust, Utility, Offense, Power, Production, Jumping, Steering, Any,
                },
                ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
                IgnoreDumbProjectiles = false, // Don't fire at non-smart projectiles.
                LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
                MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
                MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
                MaxTargetDistance = 1000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
                MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
                TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
                TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
                StopTrackingSpeed = 2000, // do not track target threats traveling faster than this speed
			},
            HardPoint = new HardPointDef
            {
                PartName = "Laser Anti-Missile", // name of weapon in terminal
                DeviateShotAngle = 0f,
                AimingTolerance = 2f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
                CanShootSubmerged = false,
				
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,

                HardWare = new HardwareDef
                {
                    RotateRate = 0.06f,
                    ElevateRate = 0.06f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -20,
                    MaxElevation = 90,
                    FixedOffset = false,
                    InventorySize = 0f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
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
                    ConstructPartCap = 21,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 1.25f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
				
                Loading = new LoadingDef {
                    RateOfFire = 1200,
                    BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    HeatPerShot = 2, //heat generated per shot
                    MaxHeat = 200, //max heat before weapon enters cooldown (70% of max heat)
                    Cooldown = .95f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
                    HeatSinkRate = 4, //amount of heat lost per second
                    DegradeRof = true, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
                    ShotsInBurst = 0,
                    DelayAfterBurst = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
					MagsToLoad = 0, // Number of physical magazines to consume on reload.
					SpinFree = true, // Spin barrel while not firing
					StayCharged = false, // Will start recharging whenever power cap is not full
                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "",
                    FiringSound = "PDTFiringSound", // subtype name from sbc
                    FiringSoundPerShot = true,
                    ReloadSound = "",
                    NoAmmoSound = "",
                    HardPointRotationSound = "WepTurretGatlingRotate",
                    BarrelRotationSound = "",
                },
                Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "", // Smoke_LargeGunShot
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 600,
                            MaxDuration = 0,
                            Scale = 1.0f,
                        },
                    },
                    Effect2 = new ParticleDef
                    {
                        Name = "PDTFlash",//Muzzle_Flash_Large
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: -0.25),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 600,
                            MaxDuration = 0,
                            Scale = 1f,
                        },
                    },
                },
            },
       
			Ammos = new[] {
                Lasers_AMS,
            },
            //Animations = AdvancedAnimation,
            // Don't edit below this line
        };		
    }
}
