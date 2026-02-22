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
        WeaponDefinition Torpedo_Crusader_Large => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "Missile_Torpedo_Large",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                    new MountPointDef 
					{
                        SubtypeId = "Missile_Torpedo_Large_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new [] 
				{
					"",
                },
                Ejector = "",
                Scope = "muzzle_missile_1", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = new TargetingDef
            {
                Threats = new[] 
				{
                    Grids,
                },
                SubSystems = new[] 
				{
                   Offense, Jumping, Utility, Power, Thrust, Production,
                },
                ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
                IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
                LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
                MaxTargetDistance = 3000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
                TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
                TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
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
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_GuidanceOnly,
                Ai = Common_Weapons_Hardpoint_Ai_BasicFixed_Tracking,                
                HardWare = new HardwareDef
                {
                    InventorySize = 5.500f, // in kL
                    Offset = Vector(x: 0, y: 0, z: 5),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionOrLosCheck,
                Loading = new LoadingDef
                {
                    RateOfFire = 60, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    ReloadTime = 3300, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 1, // Number of physical magazines to consume on reload.
                    MaxActiveProjectiles = 1, // Maximum number of drones in flight (only works for drone launchers)
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
            },
            Ammos = new[] 
			{
				Missiles_Torpedo,
                Missiles_Torpedo_Shrapnel,
            },
            Animations = Crusader_Fire,
        };
        
		WeaponDefinition Torpedo_Crusader_Small => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "Missile_Torpedo_Small",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                    new MountPointDef 
					{
                        SubtypeId = "Missile_Torpedo_Small_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new [] 
				{
					"",
                },
                Ejector = "",
                Scope = "muzzle_missile_1", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = new TargetingDef
            {
                Threats = new[] 
				{
                    Grids,
                },
                SubSystems = new[] 
				{
                   Offense, Jumping, Utility, Power, Thrust, Production,
                },
                ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
                IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
                LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
                MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
                MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
                MaxTargetDistance = 3000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
                MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
                TopTargets = 0, // 0 = unlimited, max number of top targets to randomize between.
                TopBlocks = 0, // 0 = unlimited, max number of blocks to randomize between
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
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_GuidanceOnly,
                Ai = Common_Weapons_Hardpoint_Ai_BasicFixed_Tracking,                
                HardWare = new HardwareDef
                {
                    InventorySize = 5.500f, // in kL
                    Offset = Vector(x: 0, y: 0, z: 1),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionOrLosCheck,
                Loading = new LoadingDef
                {
                    RateOfFire = 60, // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    ReloadTime = 3300, //5400 // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 1, // Number of physical magazines to consume on reload.
                    MaxActiveProjectiles = 1, // Maximum number of drones in flight (only works for drone launchers)
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
            },
            Ammos = new[] {
				Missiles_Torpedo,
                Missiles_Torpedo_Shrapnel,
            },
            Animations = Crusader_Fire_Small,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };
        
		/*WeaponDefinition Torpedo_Crusader_Large_NPC
        {
            get
            {
                var torp = Torpedo_Crusader_Large;
                torp.Assignments.MountPoints[0].SubtypeId = "Missile_Torpedo_Large_NPC";
                torp.Ammos = new[]
                {
                    Missiles_Torpedo_NPC,
                    Missiles_Torpedo_Shrapnel,
                };
                return torp;
            }
        }
        
		WeaponDefinition Torpedo_Crusader_Small_NPC
        {
            get
            {
                var torp = Torpedo_Crusader_Small;
                torp.Assignments.MountPoints[0].SubtypeId = "Missile_Torpedo_Small_NPC";
                torp.Ammos = new[]
                {
                    Missiles_Torpedo_NPC,
                    Missiles_Torpedo_Shrapnel,
                };
                return torp;
            }
        }*/
	}
}