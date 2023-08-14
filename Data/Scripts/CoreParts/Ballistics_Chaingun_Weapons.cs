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

		//Common definitions
		
		private TargetingDef Ballistics_Chaingun_Targeting_Large => new TargetingDef 
		{
			Threats = new[] 
			{
				Grids,   // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] 
			{
				Any,
			},
			ClosestFirst = false, // Tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MaxTargetDistance = 1800, // Maximum distance at which targets will be automatically shot at; 0 = unlimited.
			MinTargetDistance = 0, // Minimum distance at which targets will be automatically shot at.
			TopTargets = 1, // Maximum number of targets to randomize between; 0 = unlimited.
			TopBlocks = 1, // Maximum number of blocks to randomize between; 0 = unlimited.
			StopTrackingSpeed = 1000, // Do not track threats traveling faster than this speed; 0 = unlimited.
		};
		private HardwareDef Ballistics_Chaingun_Hardpoint_Hardware = new HardwareDef 
		{
			RotateRate = 0.025f, // Max traversal speed of azimuth subpart in radians per tick (0.1 is approximately 360 degrees per second).
			ElevateRate = 0.025f, // Max traversal speed of elevation subpart in radians per tick.
			MinAzimuth = -180,
			MaxAzimuth = 180,
			MinElevation = -20,
			MaxElevation = 90,
			HomeAzimuth = 0, // Default resting rotation angle
			HomeElevation = 0, // Default resting elevation
			InventorySize = 0.320f, // Inventory capacity in kL.
			IdlePower = 0.01f, // Constant base power draw in MW.
			//Offset = new Vector3D(0f,0f,0f), // XYZ Offsets the aiming/firing line of the weapon, in metres.
			Type = BlockWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom          
		};
		
		private LoadingDef Ballistics_Chaingun_Hardpoint_Loading_T1 = new LoadingDef 
		{
			RateOfFire = 150, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
			BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
			TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
			ReloadTime = 30, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			MagsToLoad = 2, // Number of physical magazines to consume on reload.
			GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its magazine or burst.
		};

		private LoadingDef Ballistics_Chaingun_Hardpoint_Loading_T2 = new LoadingDef 
		{
			RateOfFire = 360, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
			BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
			TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
			ReloadTime = 90, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
			MagsToLoad = 1, // Number of physical magazines to consume on reload.
			GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its magazine or burst.
		};
		
		private HardPointAudioDef Ballistics_Chaingun_Hardpoint_Audio = new HardPointAudioDef 
		{
			PreFiringSound = "", // Audio for warmup effect.
			FiringSound = "AutocannonFire", // Audio for firing.  WepShipAutocannonShot
			FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
			ReloadSound = "AutocannonReload", // Sound SubtypeID, for when your Weapon is in a reloading state
			NoAmmoSound = "WepShipGatlingNoAmmo",
			HardPointRotationSound = "WepTurretGatlingRotate", // Audio played when turret is moving.
			BarrelRotationSound = "",
			FireSoundEndDelay = 0, // How long the firing audio should keep playing after firing stops. Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
			FireSoundNoBurst = false, // Don't stop firing sound from looping when delaying after burst.
		};

		private HardPointParticleDef Ballistics_Chaingun_Hardpoint_Graphics = new HardPointParticleDef 
		{
			Effect1 = new ParticleDef
			{
                Name = "Muzzle_Flash_Autocannon", // SubtypeId of muzzle particle effect.
				Color = new Vector4(1f,1f,1f,1f), //RGBA
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = true,
					Restart = false,
					MaxDistance = 1000,
					Scale = 1f,
				}
			},
			Effect2 = new ParticleDef
			{
                Name = "Smoke_Autocannon",
				Color = new Vector4(1f,1f,1f,1f), //RGBA
				Offset = new Vector3D(0f,0f,0f), //XYZ
				Extras = new ParticleOptionDef
				{
					Loop = false,
					Restart = false,
					MaxDistance = 1000,
					Scale = 1.0f,
				}
			},
		};

        WeaponDefinition LargeAutoCannonTurret => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "LargeAutoCannonTurret", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "GatlingBarrel", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "GatlingTurretBase1", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "GatlingBarrel",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                    
                 },
                Muzzles = new[] 
				{
                    "muzzle_projectile", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "muzzle_projectile", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = new TargetingDef
            {
				Threats = new[] 
				{
					Grids,   // threats percieved automatically without changing menu settings
				},
                SubSystems = new[] 
				{
                    Any,
                },
				ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
				IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
				LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
				MaxTargetDistance = 1600, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
				MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
				TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
				TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
				StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
			},
            HardPoint = new HardPointDef
            {
                PartName = "Autocannon Turret", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 0.2f, // Projectile inaccuracy in degrees.
                AimingTolerance = 2f, // How many degrees off target a turret can fire at. 0 - 180 firing angle.
                AimLeadingPrediction = Accurate, // Level of turret aim prediction; Off, Basic, Accurate, Advanced
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = Ballistics_Chaingun_Hardpoint_Hardware,
                Other = Common_Weapons_Hardpoint_Other_Large,
                Loading = Ballistics_Chaingun_Hardpoint_Loading_T1,
                Audio = Ballistics_Chaingun_Hardpoint_Audio,
                Graphics = Ballistics_Chaingun_Hardpoint_Graphics,
            },
            Ammos = new[] 
			{
                AutocannonClip, // Must list all primary, shrapnel, and pattern ammos.
            },
        };

		WeaponDefinition KhopeshTurret => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "KhopeshTurret",
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f,
                        IconName = "None",
                    },
                },
                Muzzles = new []
                {
					"muzzle_missile_1",
                },
            },
            Targeting = Ballistics_Chaingun_Targeting_Large,
            HardPoint = new HardPointDef
            {
                PartName = "Khopesh Turret", // name of weapon in terminal
                DeviateShotAngle = 0.15f, // Projectile inaccuracy in degrees.
                AimingTolerance = 2f, // How many degrees off target a turret can fire at. 0 - 180 firing angle.
                AimLeadingPrediction = Advanced, // Level of turret aim prediction; Off, Basic, Accurate, Advanced
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = Ballistics_Chaingun_Hardpoint_Hardware,
                Other = new OtherDef
                {
                    ConstructPartCap = 0,
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
                Loading = Ballistics_Chaingun_Hardpoint_Loading_T2,
                Audio = Ballistics_Chaingun_Hardpoint_Audio,
                Graphics = Ballistics_Chaingun_Hardpoint_Graphics,
            },
			Ammos = new [] 
			{
                AutocannonClip, // Must list all primary, shrapnel, and pattern ammos.
            },
            Animations = KhopeshTurret_Recoil
        };

        WeaponDefinition AutoCannonTurret => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "AutoCannonTurret", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "MissileTurretBarrels", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "MissileTurretBase1", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "MissileTurretBarrels",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                    
                 },
                Muzzles = new[] {
                    "muzzle_missile_01", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = new TargetingDef
            {
				Threats = new[] {
					Grids,   // threats percieved automatically without changing menu settings
				},
                SubSystems = new[] {
                    Thrust, Utility, Offense, Power, Production, Jumping, Steering, Any,
                },
				ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
				IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
				LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
				MaxTargetDistance = 1600, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
				TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
				TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
				StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
            },
            HardPoint = new HardPointDef
            {
                PartName = "Autocannon Turret", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 0.2f, // Projectile inaccuracy in degrees.
                AimingTolerance = 2f, // How many degrees off target a turret can fire at. 0 - 180 firing angle.
                AimLeadingPrediction = Advanced, // Level of turret aim prediction; Off, Basic, Accurate, Advanced
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = Ballistics_Chaingun_Hardpoint_Hardware,
                Other = new OtherDef
                {
                    ConstructPartCap = 11,
                    MuzzleCheck = false,
					DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    Debug = false,
                    RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = Ballistics_Chaingun_Hardpoint_Loading_T1,
                Audio = Ballistics_Chaingun_Hardpoint_Audio,
                Graphics = Ballistics_Chaingun_Hardpoint_Graphics,
            },
            Ammos = new[] 
			{
                AutocannonClip, // Must list all primary, shrapnel, and pattern ammos.
            },
        };

        WeaponDefinition SmallBlockAutocannon => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "SmallBlockAutocannon", // Block Subtypeid. Your Cubeblocks contain this information
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
                    "muzzle_projectile", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "muzzle_projectile", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = new TargetingDef
            {
				Threats = new[] 
				{
					Grids,   // threats percieved automatically without changing menu settings
				},
                SubSystems = new[] 
				{
                    Any,
                },
				ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
				IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
				LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
				TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
				TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
				StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
            },
            HardPoint = new HardPointDef
            {
                PartName = "Autocannon", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 0.1f, // Projectile inaccuracy in degrees.
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef
                {
                    InventorySize = 0.160f, // Inventory capacity in kL.
                    IdlePower = 0.001f, // Constant base power draw in MW.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = BlockWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                },
				Other = Common_Weapons_Hardpoint_Other_Small_Fixed,
                Loading = Ballistics_Chaingun_Hardpoint_Loading_T1,
                Audio = Ballistics_Chaingun_Hardpoint_Audio,
                Graphics = Ballistics_Chaingun_Hardpoint_Graphics,
            },
            Ammos = new[] 
			{
                AutocannonClip, // Must list all primary, shrapnel, and pattern ammos.
            },
        };

        WeaponDefinition ThrasherTurret => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "ARYXHeavyFlakTurret",
                        SpinPartId = "None",
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
            },
            Targeting = new TargetingDef
            {
				Threats = new[] 
				{
					Grids,   // threats percieved automatically without changing menu settings
				},
                SubSystems = new[] 
				{
                    Any,
                },
				ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
				IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
				LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
				MaxTargetDistance = 1800, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
				TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
				TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
				StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
            },
            HardPoint = new HardPointDef
            {
                PartName = "Thrasher Autocannon", // name of weapon in terminal
                DeviateShotAngle = 0.15f, // Projectile inaccuracy in degrees.
                AimingTolerance = 2f, // How many degrees off target a turret can fire at. 0 - 180 firing angle.
                AimLeadingPrediction = Advanced, // Level of turret aim prediction; Off, Basic, Accurate, Advanced
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.0125f,
                    ElevateRate = 0.0125f,
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -6,
                    MaxElevation = 80,
                    InventorySize = 0.960f,
                    Offset = Vector(x: 0, y: 0, z: 0),
                    Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
                },
                Other = new OtherDef
                {
                    ConstructPartCap = 0,
                    MuzzleCheck = false,
					DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = false, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    Debug = false,
                    RestrictionRadius = 0, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = new LoadingDef
                {
                    RateOfFire = 720,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    ReloadTime = 60, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    GiveUpAfter = false,
					MagsToLoad = 2, // Number of physical magazines to consume on reload.
                },
                Audio = Ballistics_Chaingun_Hardpoint_Audio,
                Graphics = Ballistics_Chaingun_Hardpoint_Graphics,
            },
            Ammos = new[] 
			{
                AutocannonClip, // Must list all primary, shrapnel, and pattern ammos.
            },
        };
    }
}
