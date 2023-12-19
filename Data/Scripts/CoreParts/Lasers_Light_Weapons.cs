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
		
		private TargetingDef Lasers_Laser_Targeting_Turret_Small => new TargetingDef {
			Threats = new[]
			{
				Grids, Characters, Projectiles,  // threats percieved automatically without changing menu settings  Grids, Characters, Projectiles, Meteors,
			},
			SubSystems = new[]
			{
				Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any // subsystems the gun targets
			},
			ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true,
			LockedSmartOnly = false,
			MaxTargetDistance = 1100,
			TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
		};

		private LoadingDef Lasers_Laser_Loading_Small => new LoadingDef {
			RateOfFire = 3600,
			BarrelsPerShot = 1,
			TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
			DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			ReloadTime = 240, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			MagsToLoad = 0, // Number of physical magazines to consume on reload.
			ShotsInBurst = 0, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
			DelayAfterBurst = 0, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
			StayCharged = true, // Will start recharging whenever power cap is not full
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
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef 
				{
					InventorySize = 0f,
					Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.005f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
				},
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = Lasers_Laser_Loading_Small,
                Audio = Lasers_Laser_Audio_Small,
            },
            Ammos = new[] 
			{
                Lasers_Laser_Small,
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
                AimingTolerance = 30f, // 0 - 180 firing angle
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
                    MinElevation = -18,
                    MaxElevation = 45,
                    InventorySize = 0f,
                    Offset = Vector(x: 0, y: 0, z:0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = Lasers_Laser_Loading_Small,
                Audio = Lasers_Laser_Audio_Small,
            },
            Ammos = new[] 
			{
                Lasers_Laser_Small,
            },
        };

		WeaponDefinition MA_PDX => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "MA_PDX",
                        SpinPartId = "", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,
                        IconName = "filter_energy.dds"
                    },
                },
                Muzzles = new []
                {
					"muzzle_projectile_001",
                },
                Scope = "scope", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = Lasers_Laser_Targeting_Turret_Small,
            HardPoint = new HardPointDef
            {
                PartName = "XFEL Turret", // name of weapon in terminal
                AimingTolerance = 30f, // 0 - 180 firing angle
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
                    MinElevation = -18,
                    MaxElevation = 85,
                    InventorySize = 0f,
                    Offset = Vector(x: 0, y: 0, z:0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = Lasers_Laser_Loading_Small,
                Audio = Lasers_Laser_Audio_Small,
            },
            Ammos = new[] 
			{
                Lasers_Laser_Small,
            },
        };
    }
}