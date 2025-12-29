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

		private HardwareDef Ballistics_MAC_Hardware => new HardwareDef 
		{
			RotateRate = 0.005f,
			ElevateRate = 0.005f,
			MinAzimuth = -180,
			MaxAzimuth = 180,
			MinElevation = -15,
			MaxElevation = 75,
			FixedOffset = false,
			InventorySize = 6.754f, // Inventory capacity in kL.
			Offset = Vector(x: 0, y: 0, z: 0),
			Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
			IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
		};

		private LoadingDef Ballistics_MAC_Loading => new LoadingDef 
		{
			RateOfFire = 60, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
			BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
			TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
			ReloadTime = 4200, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			MagsToLoad = 1, // Number of physical magazines to consume on reload.
			DelayUntilFire = 120, // How long the weapon waits before shooting after being told to fire. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
		};

		private LoadingDef Ballistics_MAC_Loading_Turret => new LoadingDef 
		{
			RateOfFire = 10, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
			BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
			TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
			ReloadTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			MagsToLoad = 10, // Number of physical magazines to consume on reload.
			DelayUntilFire = 120, // How long the weapon waits before shooting after being told to fire. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
		};

		
		private HardPointAudioDef Ballistics_MAC_HardPointAudio => new HardPointAudioDef 
		{
			PreFiringSound = "WepRailgunLargeCharge", // Audio for warmup effect.
			FiringSound = "WepRailgunLargeShot", // Audio for firing.
			FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
			ReloadSound = "", // Sound SubtypeID, for when your Weapon is in a reloading state
			NoAmmoSound = "WepShipGatlingNoAmmo",
			HardPointRotationSound = "", // Audio played when turret is moving.
			BarrelRotationSound = "",
			FireSoundEndDelay = 0, // How long the firing audio should keep playing after firing stops. Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
			FireSoundNoBurst = true, // Don't stop firing sound from looping when delaying after burst.
		};

        WeaponDefinition LargeBlockRailgun => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "LargeRailgun", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                    /*new MountPointDef 
					{
                        SubtypeId = "LargeRailgun_NPC", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },*/
                 },
                Muzzles = new[] 
				{
                    "barrel_001", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "barrel_001", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = Common_Weapons_Targeting_Fixed_NoTargeting,
            HardPoint = new HardPointDef
            {
                PartName = "MAC", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                AimingTolerance = 30f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = Ballistics_MAC_Hardware,
				Other = Common_Weapons_Hardpoint_Other_NoRestrictionOrLosCheck,
                Loading = Ballistics_MAC_Loading,
                Audio = Ballistics_MAC_HardPointAudio,
            },
            Ammos = new[] 
			{
                LargeRailgunSabot,
            },
            Animations = LargeRailgunAnimation,
        };

		//NPC Weapons with auto-aim

        WeaponDefinition LargeBlockRailgun_NPC => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "LargeRailgun_NPC", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                 },
                Muzzles = new[] 
				{
                    "barrel_001", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "barrel_001", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = Common_Weapons_Targeting_Fixed_NoTargeting,
            HardPoint = new HardPointDef 
            {
                PartName = "MAC NPC", // name of weapon in terminal
                DeviateShotAngle = 0.0f,
                AimingTolerance = 30f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                //DelayCeaseFire = 120, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = Ballistics_MAC_Hardware,
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = Ballistics_MAC_Loading,
                Audio = Ballistics_MAC_HardPointAudio,
            },
            Ammos = new[] 
			{
                LargeRailgunSabot_NPC,
				LargeRailgunSabot_NPC_Fragment,
            },
            Animations = LargeRailgunAnimation,
        };

        /*WeaponDefinition Ballistics_MAC_Turret => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "Ballistics_MAC_Turret_NPC", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "MissileTurretBarrels", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "MissileTurretBase1", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "MissileTurretBarrels",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                 },
                Muzzles = new[] 
				{
                    "muzzle_missile_001", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "muzzle_missile_001", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = new TargetingDef
            {
                Threats = new[] 
				{
                    Grids, // Types of threat to engage: Grids, Projectiles, Characters, Meteors, Neutrals, ScanRoid, ScanPlanet, ScanFriendlyCharacter, ScanFriendlyGrid, ScanEnemyCharacter, ScanEnemyGrid, ScanNeutralCharacter, ScanNeutralGrid, ScanUnOwnedGrid, ScanOwnersGrid
                },
                SubSystems = new[] 
				{
                    Any, Offense, Utility, Power, Production, Thrust, Jumping, Steering
                },
                IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
                MaxTargetDistance = 4000, // Maximum distance at which targets will be automatically shot at; 0 = unlimited.
                MinTargetDistance = 0, // Minimum distance at which targets will be automatically shot at.
                TopTargets = 4, // Maximum number of targets to randomize between; 0 = unlimited.
                TopBlocks = 1, // Maximum number of blocks to randomize between; 0 = unlimited.
                StopTrackingSpeed = 1000, // Do not track threats traveling faster than this speed; 0 = unlimited.
            },
            HardPoint = new HardPointDef
            {
                PartName = "MAC", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = Ballistics_MAC_Hardware,
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = Ballistics_MAC_Loading_Turret,
			},
            Ammos = new[] 
			{
                LargeRailgunSabot_turret,
            },
            //Animations = MACTurretAnimation,
        };*/
    }
}