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
				Any, Offense, Utility, Power, Production, Thrust, Jumping, Steering
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true,
			LockedSmartOnly = false,
			MaxTargetDistance = 1600,
			TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private LoadingDef Lasers_Laser_Loading_Large => new LoadingDef {
			RateOfFire = 3600,
			BarrelsPerShot = 1,
			TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
			ReloadTime = 240, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			MagsToLoad = 0, // Number of physical magazines to consume on reload.
			ShotsInBurst = 0, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
			DelayAfterBurst = 0, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
			StayCharged = true, // Will start recharging whenever power cap is not full
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
                    new MountPointDef 
					{
                        SubtypeId = "MA_T2PDX_NPC",
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
                AimingTolerance = 10f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 30, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
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
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = Lasers_Laser_Loading_Large,
                Audio = Lasers_Laser_Audio_Large,
            },
			Ammos = new[] 
			{
                Lasers_Laser_Large,
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
                    new MountPointDef 
					{
                        SubtypeId = "MA_Fixed_T2_NPC",
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
                AimingTolerance = 10f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 30, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
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
					InventorySize = 0f,
					Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.005f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
				},
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = Lasers_Laser_Loading_Large,
                Audio = Lasers_Laser_Audio_Large,
            },
            Ammos = new[] 
			{
                Lasers_Laser_Large,
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
                    new MountPointDef 
					{
                        SubtypeId = "ARYXSpartanTurret_NPC",
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
                AimingTolerance = 10f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 30, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
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
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = new LoadingDef
                {
                    RateOfFire = 3600,
                    BarrelsPerShot = 2,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
					ReloadTime = 360, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 0, // Number of physical magazines to consume on reload.
					ShotsInBurst = 0, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
					DelayAfterBurst = 0, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
					StayCharged = true, // Will start recharging whenever power cap is not full
                },
                Audio = Lasers_Laser_Audio_Large,
            },
            Ammos = new[] 
			{
                Lasers_Laser_Dual,
            },
        };
    }
}