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

		//Common Definitions
		
		private TargetingDef Lasers_Laser_Targeting_Turret_Large => new TargetingDef {
			Threats = new[]
			{
				Grids, Characters,  // threats percieved automatically without changing menu settings  Grids, Characters, Projectiles, Meteors,
			},
			SubSystems = new[]
			{
				Any, // subsystems the gun targets
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true,
			LockedSmartOnly = false,
			MaxTargetDistance = 1600,
			TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private TargetingDef Lasers_Laser_Targeting_Turret_Small => new TargetingDef {
			Threats = new[]
			{
				Grids, Characters, Projectiles,  // threats percieved automatically without changing menu settings  Grids, Characters, Projectiles, Meteors,
			},
			SubSystems = new[]
			{
				Any, // subsystems the gun targets
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true,
			LockedSmartOnly = false,
			MaxTargetDistance = 1100,
			TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private LoadingDef Lasers_Laser_Loading_Large => new LoadingDef {
			RateOfFire = 3600,
			BarrelsPerShot = 1,
			TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
			DelayUntilFire = 15, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			HeatPerShot = 2, //heat generated per shot
			MaxHeat = 600, //max heat before weapon enters cooldown (70% of max heat)
			Cooldown = .5f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
			HeatSinkRate = 30, //amount of heat lost per second
			MagsToLoad = 1, // Number of physical magazines to consume on reload.
			StayCharged = false, // Will start recharging whenever power cap is not full
		};
			
		private HardPointAudioDef Lasers_Laser_Audio_Large => new HardPointAudioDef {
			PreFiringSound = "", //MediumLaserPreFiring
			FiringSound = "HWR_MediumLaserLoop", // subtype name from sbc
			FiringSoundPerShot = false,
			ReloadSound = "",
			NoAmmoSound = "",
			HardPointRotationSound = "WepTurretGatlingRotate",
			BarrelRotationSound = "",
		};

		private HardPointAudioDef Lasers_Laser_Audio_Small => new HardPointAudioDef {
			PreFiringSound = "",
			FiringSound = "MD_SmallLaserFire", // WepShipGatlingShot
			FiringSoundPerShot = false,
			ReloadSound = "",
			NoAmmoSound = "ArcWepShipGatlingNoAmmo",
			HardPointRotationSound = "WepTurretGatlingRotate",
			BarrelRotationSound = "WepShipGatlingRotation",
			FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
		};

		//Weapon Definitions

        WeaponDefinition MA_PDX_T2 => new WeaponDefinition 
		{	
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef 
					{
                        SubtypeId = "MA_T2PDX",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
						DurabilityMod = .5f,
                        IconName = "filter_energy.dds"
                    },
                },				
                Muzzles = new []
                {
                    "muzzle_projectile_001",
                },
				Scope = "T2scope", //Where line of sight checks are performed from must be clear of block collision				
            },
            Targeting = Lasers_Laser_Targeting_Turret_Large,
            HardPoint = new HardPointDef
            {
                PartName = "XFEL Laser", // name of weapon in terminal
                AimingTolerance = 1f, // 0 - 180 firing angle
                DelayCeaseFire = 30, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_Damage_Overload,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.015f,
                    ElevateRate = 0.015f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -20,
                    MaxElevation = 90,
                    InventorySize = 0f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = new OtherDef
                {
                    ConstructPartCap = 21,
                    MuzzleCheck = false,
					DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    Debug = false,
                    RestrictionRadius = 1.25f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = Lasers_Laser_Loading_Large,
                Audio = Lasers_Laser_Audio_Large,
            },
			Ammos = new[] 
			{
                Lasers_Laser_Large,
				Lasers_Laser_Large_Shrapnel
            },
        };

        WeaponDefinition MA_Fixed_T2 => new WeaponDefinition 
		{

            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef 
					{
                        SubtypeId = "MA_Fixed_T2",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "T2_EL",
                        AzimuthPartId = "T2_AZ1",
                        ElevationPartId = "T2_EL",
						DurabilityMod = 0.5f,
                        IconName = "filter_energy.dds"
                    },
                },				
                Muzzles = new []
                {
                    "T2_muzzle",
                },
				Scope = "T2scope", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = Lasers_Laser_Targeting_Turret_Large,
            HardPoint = new HardPointDef
            {
                PartName = "XFEL Laser", // name of weapon in terminal
                DeviateShotAngle = 0.00f,
                AimingTolerance = 1f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 30, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_Damage_Overload,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef 
				{
					RotateRate = 0.01f,
					ElevateRate = 0.01f,
					MinAzimuth = -15,
					MaxAzimuth = 15,
					MinElevation = -15,
					MaxElevation = 15,
					InventorySize = 0f,
					Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.005f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
				},
                Other = new OtherDef
                {
                    ConstructPartCap = 21,
                    MuzzleCheck = false,
					DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    Debug = false,
                    RestrictionRadius = 1.25f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = true, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = Lasers_Laser_Loading_Large,
                Audio = Lasers_Laser_Audio_Large,
            },
            Ammos = new[] 
			{
                Lasers_Laser_Large,
				Lasers_Laser_Large_Shrapnel
            },
        };

		WeaponDefinition ReceptorCoilGun => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef 
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "ReceptorCoilGun",
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = "filter_energy.dds"
                    },
                },
                Muzzles = new [] 
				{
					"muzzle_1",
                },
                Ejector = "",
                Scope = "", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = Common_Weapons_Targeting_Fixed_NoTargeting,
            HardPoint = new HardPointDef 
            {
                PartName = "XFEL Laser", // name of weapon in terminal
                DelayCeaseFire = 30, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_Damage_Overload,
                Ai = Common_Weapons_Hardpoint_Ai_BasicFixed_NoTracking,
                HardWare = new HardwareDef 
				{
					InventorySize = 0f,
					Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.005f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
				},
                Other = new OtherDef
                {
                    ConstructPartCap = 21,
                    MuzzleCheck = false,
					DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    Debug = false,
                    RestrictionRadius = 0.5f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = Lasers_Laser_Loading_Large,
                Audio = Lasers_Laser_Audio_Small,
            },
            Ammos = new[] 
			{
                Lasers_Laser_Small,
				Lasers_Laser_Small_Shrapnel
            },
        };

		WeaponDefinition ReceptorTurret => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "ReceptorTurret",
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
            Targeting = Lasers_Laser_Targeting_Turret_Small,
            HardPoint = new HardPointDef
            {
                PartName = "XFEL Turret", // name of weapon in terminal
                DeviateShotAngle = 0f,
                AimingTolerance = 30f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 30, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_Damage_Overload,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef 
				{
                    RotateRate = 0.015f,
                    ElevateRate = 0.015f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -18,
                    MaxElevation = 45,
                    InventorySize = 0f,
                    Offset = Vector(x: 0, y: 0, z:0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = new OtherDef
                {
                    ConstructPartCap = 21,
                    MuzzleCheck = false,
					DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    Debug = false,
                    RestrictionRadius = 0.5f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = true, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = Lasers_Laser_Loading_Large,
                Audio = Lasers_Laser_Audio_Small,
            },
            Ammos = new[] 
			{
                Lasers_Laser_Small,
				Lasers_Laser_Small_Shrapnel
            },
        };

        WeaponDefinition AryxSpartanTurret => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "ARYXSpartanTurret",
                        SpinPartId = "",
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,
                    },
                },
                Muzzles = new[] 
				{
                    "muzzle_projectile_1",
                    "muzzle_projectile_2",
                },
                Ejector = "",
                Scope = "scope", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = Lasers_Laser_Targeting_Turret_Large,
            HardPoint = new HardPointDef
            {
                PartName = "Spartan Laser Cannon", // name of weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons)
                DeviateShotAngle = 0f,
                AimingTolerance = 30f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 30, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_Damage_Overload,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.0075f,
                    ElevateRate = 0.0075f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -10,
                    MaxElevation = 80,
                    InventorySize = 0f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = new OtherDef
                {
                    ConstructPartCap = 21,
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
                    RateOfFire = 3600,
                    BarrelsPerShot = 2,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
					DelayUntilFire = 15, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					HeatPerShot = 2, //heat generated per shot
					MaxHeat = 1200, //max heat before weapon enters cooldown (70% of max heat)
					Cooldown = .5f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
					HeatSinkRate = 60, //amount of heat lost per second
                },
                Audio = Lasers_Laser_Audio_Large,
            },
            Ammos = new[] 
			{
                Lasers_Laser_Large,
				Lasers_Laser_Large_Shrapnel
            },
        };
    }
}