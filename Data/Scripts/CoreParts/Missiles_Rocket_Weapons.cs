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
		
		private TargetingDef Missiles_Rocket_Targeting => new TargetingDef 
		{
			Threats = new[] 
			{
				Grids,
			},
			SubSystems = new[] 
			{
				Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MaxTargetDistance = 700, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 4, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private HardPointAudioDef Missiles_Rocket_Hardpoint_Audio = new HardPointAudioDef 
		{
			PreFiringSound = "",
			FiringSound = "WepShipSmallMissileShot", // subtype name from sbc
			FiringSoundPerShot = true,
			ReloadSound = "",
			NoAmmoSound = "ArcWepShipGatlingNoAmmo",
			HardPointRotationSound = "WepTurretGatlingRotate",
			BarrelRotationSound = "",
		};

		//Weapon Definitions

        WeaponDefinition LargeMissileTurret => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "LargeMissileTurret",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
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
					"muzzle_missile_005",
					"muzzle_missile_006",
                },
            },
			Targeting = Missiles_Rocket_Targeting, //shared targeting def
            HardPoint = new HardPointDef
            {
                PartName = "LargeMissileTurret", // name of weapon in terminal
                DeviateShotAngle = 0.75f,
                AimingTolerance = 1f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.03f,
                    ElevateRate = 0.02f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -5,
                    MaxElevation = 90,
                    InventorySize = 1.040f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = new LoadingDef
                {
                    RateOfFire = 480,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    ReloadTime = 480, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 6, // Number of physical magazines to consume on reload.
                },
                Audio = Missiles_Rocket_Hardpoint_Audio,
            },
			Ammos = new[] 
			{
                Missiles_Rocket,
            },
        };

        WeaponDefinition SmallMissileTurret => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SmallMissileTurret",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                },
                Muzzles = new []
                {
                    "muzzle_missile_001",
					"muzzle_missile_002",
                },
            },
			Targeting = new TargetingDef 
			{
				Threats = new[] 
				{
					Grids,
				},
                SubSystems = new[] 
				{
                    Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any,
                },
				ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
				IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
				LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
				MaxTargetDistance = 600, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
				TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
				TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
				StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
			},
            HardPoint = new HardPointDef
            {
                PartName = "SmallMissileTurret", // name of weapon in terminal
                DeviateShotAngle = 0.75f,
                AimingTolerance = 1f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.03f,
                    ElevateRate = 0.02f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -8,
                    MaxElevation = 90,
                    InventorySize = 0.520f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = new LoadingDef
                {
                    RateOfFire = 320,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    ReloadTime = 260, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 2, // Number of physical magazines to consume on reload.
                },
                Audio = Missiles_Rocket_Hardpoint_Audio,
            },
			Ammos = new[] 
			{
                Missiles_Rocket,
            },
        };

        WeaponDefinition LargeMissileLauncher => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "LargeMissileLauncher",
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
					"muzzle_missile_005",
					"muzzle_missile_006",
					"muzzle_missile_007",					
                    "muzzle_missile_008",
					"muzzle_missile_009",
					"muzzle_missile_010",
					"muzzle_missile_011",
					"muzzle_missile_012",
					"muzzle_missile_013",
					"muzzle_missile_014",
					"muzzle_missile_015",
					"muzzle_missile_016",
					"muzzle_missile_017",
					"muzzle_missile_018",
					"muzzle_missile_019",
                },
            },
			Targeting = Common_Weapons_Targeting_Fixed_NoTargeting, //shared targeting def
			HardPoint = new HardPointDef
            {
                PartName = "LargeMissileLauncher", // name of weapon in terminal
                DeviateShotAngle = 4f,
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef
                {
                    InventorySize = 2.470f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = new LoadingDef
                {
                    RateOfFire = 320,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    ReloadTime = 960, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 19, // Number of physical magazines to consume on reload.
                },
                Audio = Missiles_Rocket_Hardpoint_Audio,
            },
			Ammos = new[] 
			{
                Missiles_Rocket,
            },
        };

        WeaponDefinition SmallMissileLauncher => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SmallMissileLauncher", //SmallMissileLauncherWarfare2
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = "TestIcon.dds",
                    },
                    new MountPointDef
                    {
                        SubtypeId = "SmallMissileLauncherWarfare2",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
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
            },
			Targeting = Common_Weapons_Targeting_Fixed_NoTargeting,
            HardPoint = new HardPointDef
            {
                PartName = "SmallMissileLauncher", // name of weapon in terminal
                DeviateShotAngle = 2f,
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef
                {
                    InventorySize = 0.520f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },				
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,				
                Loading = new LoadingDef
                {
                    RateOfFire = 480,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    ReloadTime = 120, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 4, // Number of physical magazines to consume on reload.
                },
                Audio = Missiles_Rocket_Hardpoint_Audio,
            },
			Ammos = new[] 
			{
                Missiles_Rocket,
            },
        };
    }
}