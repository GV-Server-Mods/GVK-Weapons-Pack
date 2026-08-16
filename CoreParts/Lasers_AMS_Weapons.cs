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
        WeaponDefinition MA_PDT => new WeaponDefinition 
		{	
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef 
					{
                        SubtypeId = "MA_PDT",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
						DurabilityMod = 0.5f,
                        IconName = "filter_energy.dds" 
					},
				    new MountPointDef 
					{
                        SubtypeId = "MA_PDT_sm",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
						DurabilityMod = 0.5f,
                        IconName = "filter_energy.dds"
                    },
                    new MountPointDef 
					{
                        SubtypeId = "MA_PDT_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "MissileTurretBarrels",
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
						DurabilityMod = 0.5f,
                        IconName = "filter_energy.dds" 
					},
				    new MountPointDef 
					{
                        SubtypeId = "MA_PDT_sm_NPC",
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
			Targeting = new TargetingDef
			{
				Threats = new[]
				{
					Projectiles, // threats percieved automatically without changing menu settings
				},
				SubSystems = new BlockTypes[] { },
				ClosestFirst = true, // Tries to pick closest targets first (blocks on grids, projectiles, etc...).
				IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles. If you're using projectile tags, ensure this is set to false as this overwrites the newer system
                LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
				MinimumDiameter = 0, // Minimum diameter of threat to engage.
				MaximumDiameter = 0, // Maximum diameter of threat to engage; 0 = unlimited.
				MaxTargetDistance = 2000, // Maximum distance at which targets will be automatically shot at; 0 = unlimited.
				MinTargetDistance = 0, // Minimum distance at which targets will be automatically shot at.
				TopTargets = 0, // Number of potential grid targets to randomize, then go in list order ; 0 = no randomization, goes in order of SortedThreats list
				CycleTargets = 0, // Number of targets to check per acquire attempt before giving up for the remainder of the tick and re-rolling any RNG; 0 = unlimited
				TopBlocks = 0, // Number of potential block targets to randomize, then go in list order; 0 = no randomization, goes in order of internal lists for block subtypes found
				CycleBlocks = 0, // Number of blocks to check per acquire attempt before giving up for the remainder of the tick and re-rolling any RNG; 0 = unlimited
				StopTrackingSpeed = 2000, // do not track target threats traveling faster than this speed
				AllowSwitchTargetPriority = true, // If true, the weapon's GUI will have a toggle allowing the player to switch between targeting closest or random (or the equivalent modes for Fire Distribution).
				AllowFireDistribution = true, // Only for point-defense cannons. If true, the weapon's GUI will have a toggle (and additional sliders) allowing the player to enable the Fire Distribution System for point defense. Server admins: fire distribution is significantly more costly than the previous RNG-based targeting. It is also recommended to set CycleTargets to 0 since the system isn't culling targets aggressively and may fail to acquire targets otherwise.
				AdvancedFireDistribution = false, // Only for point defense cannons and if AllowFireDistribution is true. If true, the weapon's GUI will have an Angle Cost slider, which will allow players to tweak how certain PDCs retarget, based on their turn rate and other such factors. Server admins: advanced fire distribution is significantly more costly than the normal fire distribution.
			},
            HardPoint = new HardPointDef
            {
                PartName = "Laser Anti-Missile", // name of weapon in terminal
                DeviateShotAngle = 0f,
                AimingTolerance = 2f, // 0 - 180 firing angle
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_BasicTurret,
                HardWare = new HardwareDef
                {
                    RotateRate = 0.06f,
                    ElevateRate = 0.06f,
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
                    ConstructPartCap = 0,
                    MuzzleCheck = false,
					DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    Debug = false,
                    RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = new LoadingDef 
				{
                    RateOfFire = 1200,
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    HeatPerShot = 2, //heat generated per shot
                    MaxHeat = 200, //max heat before weapon enters cooldown (70% of max heat)
                    Cooldown = .95f, //percent of max heat to be under to start firing again after overheat accepts .2-.95
                    HeatSinkRate = 4, //amount of heat lost per second
                    DegradeRof = true, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "",
                    FiringSound = "PDTFiringSound", // subtype name from sbc
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
                        Name = "PDTFlash",//Muzzle_Flash_Large
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: -0.25),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 600,
                            MaxDuration = 0,
                            Scale = 1f,
                        },
                    },
                },
            },
			Ammos = new[] 
			{
                Lasers_AMS,
            },
        };		
    }
}
