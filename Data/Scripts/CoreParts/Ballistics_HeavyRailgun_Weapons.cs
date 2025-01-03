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

namespace Scripts {   
    partial class Parts {
        // Don't edit above this line
        WeaponDefinition HarbingerTurret => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef 
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "HarbingerTurret_NPC",
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.25f,
                        IconName = "None"
                    },

                },
                Muzzles = new []
                {
					"muzzle_missile_1",
                },
                Ejector = "",
                Scope = "muzzle_missile_1", // Where line of sight checks are performed from. Must be clear of block collision.
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
                MaxTargetDistance = 4000, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
                MinTargetDistance = 50, // 0 = unlimited, Min target distance that targets will be automatically shot at.
                TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
                TopBlocks = 1, // 0 = unlimited, max number of blocks to randomize between
                StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
            },
            HardPoint = new HardPointDef 
            {
                PartName = "Harbinger", // name of weapon in terminal
                DeviateShotAngle = 0.01f,
                AimingTolerance = 1f, // 0 - 180 firing angle
                AimLeadingPrediction = Advanced, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = false,
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,				
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef 
				{
                    RotateRate = 0.01f,
                    ElevateRate = 0.01f,
                    MinAzimuth = -180,
                    MaxAzimuth =180,
                    MinElevation = -20,
                    MaxElevation = 60,
                    InventorySize = 2.7f,
                    Offset = Vector(x: 0, y: 3f, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
				},
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = new LoadingDef 
				{
                    RateOfFire = 60,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    ReloadTime = 360, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    DelayUntilFire = 120, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    GiveUpAfter = false,
					MagsToLoad = 1, // Number of physical magazines to consume on reload.
					StayCharged = true, // Will start recharging whenever power cap is not full
                },
                Audio = new HardPointAudioDef 
				{
                    PreFiringSound = "PlasmaLauncher_Windup",
                    FiringSound = "HWR_SmallRailgunFire", // WepShipGatlingShot
                    FiringSoundPerShot = true,
                    ReloadSound = "",
                    NoAmmoSound = "",
                    HardPointRotationSound = "",
                    BarrelRotationSound = "",
                    FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                },
				Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "MD_Heavy_Railgun_Shoot", // SubtypeId of muzzle particle effect.
                        Offset = Vector(x: 0, y: 0, z: 0), // Offsets the effect from the muzzle empty.
                        DisableCameraCulling = false, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Loop = false, // Set this to the same as in the particle sbc!
                            Restart = false, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 3000,
                            MaxDuration = 0,
                            Scale = 1f, // Scale of effect.
                        },
                    },
                    Effect2 = new ParticleDef
                    {
                        Name = "",
                        Color = Color(red: 0, green: 0, blue: 0, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        DisableCameraCulling = false, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Loop = false, // Set this to the same as in the particle sbc!
                            Restart = false,
                            MaxDistance = 800,
                            MaxDuration = 0,
                            Scale = 1f,
                        },
                    },
                },
            },
            Ammos = new[] 
			{
                HeavyRailgunAmmo,
            },
            Animations = Harbinger_Emissive,// AryxRailgunAnims
        };
    }
}