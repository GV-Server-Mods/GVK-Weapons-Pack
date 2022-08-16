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
        // Don't edit above this line
        WeaponDefinition Torpedo_Crusader_Large => new WeaponDefinition
        {

            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "Missile_Torpedo_Large",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new [] {
					"",
                },
                Ejector = "",
                Scope = "muzzle_missile_1", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = new TargetingDef
            {
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
                MaxTargetDistance = 3000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
                MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
                TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
                TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
                StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
            },
            HardPoint = new HardPointDef
            {
                PartName = "Crusader Torpedo", // name of weapon in terminal
                DeviateShotAngle = 0.1f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
                CanShootSubmerged = false,

				Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = new AiDef
                {
                    TrackTargets = true, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
                    TurretAttached = false, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
                    TurretController = false, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
                    PrimaryTracking = false, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
                    LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
                    SuppressFire = false, // If enabled, weapon can only be fired manually.
                    OverrideLeads = false, // Disable target leading on fixed weapons, or allow it for turrets.
                },
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0f,
                    ElevateRate = 0f,
                    MinAzimuth = 0,
                    MaxAzimuth = 0,
                    MinElevation = 0,
                    MaxElevation = 0,
                    FixedOffset = false, //deprecated
                    InventorySize = 7.330f,
                    Offset = Vector(x: 0, y: 0, z: 5),
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
                    ConstructPartCap = 4,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 1.25f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = new LoadingDef
                {
                    RateOfFire = 60,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 3300, //5400 // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
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
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "",
                    FiringSound = "Torpedo_launch", // WepShipGatlingShot
                    FiringSoundPerShot = true,
                    ReloadSound = "Torpedo_reload",
                    NoAmmoSound = "",
                    HardPointRotationSound = "", //WepTurretGatlingRotate
                    BarrelRotationSound = "", //WepShipGatlingRotation
                    FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                },
                Graphics = new HardPointParticleDef
                {

                    Effect1 = new ParticleDef
                    {
                        Name = "", // Smoke_LargeGunShot
                        Color = Color(red: .05f, green: .05f, blue: .05f, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            Scale = .75f,
                        },
                    },
                    Effect2 = new ParticleDef
                    {
                        Name = "",//Muzzle_Flash_Large
                        Color = Color(red: 20, green: 20, blue: 20, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            Scale = 10f,
                        },
                    },
                },
            },
            Ammos = new[] {
				Missiles_Torpedo,
                Missiles_Torpedo_Shrapnel,
            },
            Animations = Crusader_Fire,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };
        WeaponDefinition Torpedo_Crusader_Small => new WeaponDefinition
        {

            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "Missile_Torpedo_Small",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new [] {
					"",
                },
                Ejector = "",
                Scope = "muzzle_missile_1", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = new TargetingDef
            {
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
                MaxTargetDistance = 3000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
                MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
                TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
                TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
                StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
            },
            HardPoint = new HardPointDef
            {
                PartName = "Crusader Torpedo", // name of weapon in terminal
                DeviateShotAngle = 0f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
                CanShootSubmerged = false,

				Ui = Common_Weapons_Hardpoint_Ui_GuidanceOnly,
				
                Ai = new AiDef 
				{
					TrackTargets = true,
					TurretAttached = false,
					TurretController = false,
					PrimaryTracking = false,
					LockOnFocus = false,
					SuppressFire = false,
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
                    FixedOffset = false,
                    InventorySize = 3.330f,
                    Offset = Vector(x: 0, y: 0, z: 1),
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
                    ConstructPartCap = 4,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 0.5f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = new LoadingDef
                {
                    RateOfFire = 60, // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 3300, //5400 // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
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
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "",
                    FiringSound = "Torpedo_launch", // WepShipGatlingShot
                    FiringSoundPerShot = true,
                    ReloadSound = "Torpedo_reload",
                    NoAmmoSound = "",
                    HardPointRotationSound = "", //WepTurretGatlingRotate
                    BarrelRotationSound = "", //WepShipGatlingRotation
                    FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                },
                Graphics = new HardPointParticleDef
                {

                    Effect1 = new ParticleDef
                    {
                        Name = "", // Smoke_LargeGunShot
                        Color = Color(red: .05f, green: .05f, blue: .05f, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),

                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 300,
                            MaxDuration = 0,
                            Scale = .75f,
                        },
                    },
                    Effect2 = new ParticleDef
                    {
                        Name = "",//Muzzle_Flash_Large
                        Color = Color(red: 20, green: 20, blue: 20, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),

                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 300,
                            MaxDuration = 0,
                            Scale = 10f,
                        },
                    },
                },
            },
            Ammos = new[] {
				Missiles_Torpedo,
                Missiles_Torpedo_Shrapnel,
            },
            Animations = Crusader_Fire_Small,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };
        WeaponDefinition Torpedo_Crusader_Large_NPC => new WeaponDefinition
        {

            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "Missile_Torpedo_Large_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new [] {
					"",
                },
                Ejector = "",
                Scope = "muzzle_missile_1", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = new TargetingDef
            {
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
                MaxTargetDistance = 3000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
                MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
                TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
                TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
                StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
            },
            HardPoint = new HardPointDef
            {
                PartName = "Crusader Torpedo", // name of weapon in terminal
                DeviateShotAngle = 0f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
                CanShootSubmerged = false,

				Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = new AiDef
                {
                    TrackTargets = false, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
                    TurretAttached = false, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
                    TurretController = false, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
                    PrimaryTracking = false, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
                    LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
                    SuppressFire = false, // If enabled, weapon can only be fired manually.
                    OverrideLeads = false, // Disable target leading on fixed weapons, or allow it for turrets.
                },
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0f,
                    ElevateRate = 0f,
                    MinAzimuth = 0,
                    MaxAzimuth = 0,
                    MinElevation = 0,
                    MaxElevation = 0,
                    FixedOffset = false, //deprecated
                    InventorySize = 7.330f,
                    Offset = Vector(x: 0, y: 0, z: 5),
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
                    ConstructPartCap = 4,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 1.25f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = new LoadingDef
                {
                    RateOfFire = 60, // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 2700, //5400 // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
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
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "",
                    FiringSound = "Torpedo_launch", // WepShipGatlingShot
                    FiringSoundPerShot = true,
                    ReloadSound = "Torpedo_reload",
                    NoAmmoSound = "",
                    HardPointRotationSound = "", //WepTurretGatlingRotate
                    BarrelRotationSound = "", //WepShipGatlingRotation
                    FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                },
                Graphics = new HardPointParticleDef
                {

                    Effect1 = new ParticleDef
                    {
                        Name = "", // Smoke_LargeGunShot
                        Color = Color(red: .05f, green: .05f, blue: .05f, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            Scale = .75f,
                        },
                    },
                    Effect2 = new ParticleDef
                    {
                        Name = "",//Muzzle_Flash_Large
                        Color = Color(red: 20, green: 20, blue: 20, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            Scale = 10f,
                        },
                    },
                },
            },
            Ammos = new[] {
				Missiles_Torpedo_NPC,
                Missiles_Torpedo_Shrapnel,
            },
            Animations = Crusader_Fire,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };
        WeaponDefinition Torpedo_Crusader_Small_NPC => new WeaponDefinition
        {

            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "Missile_Torpedo_Small_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new [] {
					"",
                },
                Ejector = "",
                Scope = "muzzle_missile_1", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = new TargetingDef
            {
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
                MaxTargetDistance = 3000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
                MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
                TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
                TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
                StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
            },
            HardPoint = new HardPointDef
            {
                PartName = "Crusader Torpedo", // name of weapon in terminal
                DeviateShotAngle = 0f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
                CanShootSubmerged = false,

				Ui = Common_Weapons_Hardpoint_Ui_GuidanceOnly,
				
                Ai = new AiDef 
				{
					TrackTargets = false,
					TurretAttached = false,
					TurretController = false,
					PrimaryTracking = false,
					LockOnFocus = false,
					SuppressFire = false,
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
                    FixedOffset = false,
                    InventorySize = 3.330f,
                    Offset = Vector(x: 0, y: 0, z: 1),
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
                    ConstructPartCap = 4,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 0.5f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = new LoadingDef
                {
                    RateOfFire = 60, // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 2700, //5400 // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
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
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "",
                    FiringSound = "Torpedo_launch", // WepShipGatlingShot
                    FiringSoundPerShot = true,
                    ReloadSound = "Torpedo_reload",
                    NoAmmoSound = "",
                    HardPointRotationSound = "", //WepTurretGatlingRotate
                    BarrelRotationSound = "", //WepShipGatlingRotation
                    FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                },
                Graphics = new HardPointParticleDef
                {

                    Effect1 = new ParticleDef
                    {
                        Name = "", // Smoke_LargeGunShot
                        Color = Color(red: .05f, green: .05f, blue: .05f, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),

                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 300,
                            MaxDuration = 0,
                            Scale = .75f,
                        },
                    },
                    Effect2 = new ParticleDef
                    {
                        Name = "",//Muzzle_Flash_Large
                        Color = Color(red: 20, green: 20, blue: 20, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),

                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 300,
                            MaxDuration = 0,
                            Scale = 10f,
                        },
                    },
                },
            },
            Ammos = new[] {
				Missiles_Torpedo_NPC,
                Missiles_Torpedo_Shrapnel,
            },
            Animations = Crusader_Fire_Small,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };
    }
}