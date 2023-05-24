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
{   // Don't edit above this line
    partial class Parts
    {
        WeaponDefinition LargeInteriorTurret => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "LargeInteriorTurret",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "InteriorTurretBase2",
                        AzimuthPartId = "InteriorTurretBase1",
                        ElevationPartId = "InteriorTurretBase2",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SmallInteriorTurret",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "InteriorTurretBase2",
                        AzimuthPartId = "InteriorTurretBase1",
                        ElevationPartId = "InteriorTurretBase2",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                },
                Muzzles = new []
                {
                    "muzzle_projectile",
                },
            },
            Targeting = new TargetingDef
            {
                Threats = new[]
                {
                    Characters,
                },
                SubSystems = new[] 
				{
                    Any,
                },
                ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
                IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
                LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
                MaxTargetDistance = 700, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
                MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
                TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
                TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
                StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
            },
            HardPoint = new HardPointDef
            {
                PartName = "Interior Turret", // name of weapon in terminal
                DeviateShotAngle = 0.3f,
                AimingTolerance = 4f, // 0 - 180 firing angle
                AimLeadingPrediction = Accurate, // Off, Basic, Accurate, Advanced
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.03f,
                    ElevateRate = 0.03f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -76,
                    MaxElevation = 90,
                    InventorySize = 0.6f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = new OtherDef
                {
                    ConstructPartCap = 21,
                    RotateBarrelAxis = 0,
                    EnergyPriority = 0,
                    MuzzleCheck = false,
					DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    Debug = false,
                    RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = new LoadingDef
                {
                    RateOfFire = 600,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    ReloadTime = 180, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 1, // Number of physical magazines to consume on reload.
					GiveUpAfter = true,
					GoHomeToReload = true, // Tells the weapon it must be in the home position before it can reload.
                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "",
                    FiringSound = "WepTurretInteriorFire", // subtype name from sbc
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
                        Name = "Smoke_LargeGunShot", // Smoke_LargeGunShot
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 100,
                            MaxDuration = 1,
                            Scale = 1.0f,
                        },
                    },
                    Effect2 = new ParticleDef
                    {
                        Name = "Muzzle_Flash_Large_Core",//Muzzle_Flash_Large
                        Color = Color(red: 1, green: 0.7f, blue: 0.5f, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 100,
                            MaxDuration = 1,
                            Scale = 1f,
                        },
                    },
                },
            },
            Ammos = new[] 
			{
                Ballistics_Interior
            },
        };
    }
}