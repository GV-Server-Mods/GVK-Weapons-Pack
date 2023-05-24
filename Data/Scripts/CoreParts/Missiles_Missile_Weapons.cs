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
		
		private TargetingDef Missiles_Missile_Targeting_Large => new TargetingDef 
		{
			Threats = new[] {
				Grids, // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] {
				Any,
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 2300, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 2, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 5, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
			CycleTargets = 5, // Number of targets to "cycle" per acquire attempt.
			CycleBlocks = 5, // Number of blocks to "cycle" per acquire attempt.
			UniqueTargetPerWeapon = false, // only applies to multi-weapon blocks 
			MaxTrackingTime = 0, // After this time has been reached the weapon will stop tracking existing target and scan for a new one
			ShootBlanks = false, // Do not generate projectiles when shooting
			FocusOnly = false, // This weapon can only track focus targets.
			EvictUniqueTargets = false, // if this is set it will evict any weapons set to UniqueTargetPerWeapon unless they to have this set
			Communications = new CommunicationDef 
			{
				StoreTargets = false, // Pushes its current target to the grid/construct so that other slaved weapons can fire on it.
				StorageLimit = 0, // The limit at which this weapon will no longer export targets onto the channel.
				MaxConnections = 0, // 0 is unlimited, this value determines the maximum number of weapons that can link up to another weapon.
				StoreLimitPerBlock = false, // Setting this to true will switch the StorageLimit from being per Location to per block per Location.
				StorageLocation = "GVK_Radar_TargetStorage", // This location ID is used either by the master weapon (if StoreTargets = true) or the slave weapon (if its false).  This is shared across the conncted grids.
				Mode = LocalNetwork, // NoComms, BroadCast, LocalNetwork, Repeater, Relay, Jamming. Only LocalNetwork works right now
				TargetPersists = false, // Whether or not the weapon will retain its existing target even if the source of the target releases theirs.
				Security = Private, // Public, Private, Secure
				BroadCastChannel = "GVK_Radar_BroadcastChannel", // If defined you will broadcast to all other scanners on this channel.
				BroadCastRange = 2300, // This is the range that you will broadcast up too.  Note that this value applies to both the sender and receiver, both range requirements must be met. 
				JammingStrength = 0, // If Mode is set to jamming, then this value will decrease the "range" of broadcasts.  Strength falls off at sqr of the distance.
				RelayChannel = "GVK_Radar_RelayChannel", // If defined this channel will be used to relay any targets it seems on the broadcast channel.
				RelayRange = 2300, // This defines the range that any broadcasts will be relayed.  Note that this channel id is seen as the "broadcast" channel for all receivers, broadcast range requirements apply. 
			},
		};

		private TargetingDef Missiles_Missile_Targeting_Small => new TargetingDef 
		{
			Threats = new[] {
				Grids, // threats percieved automatically without changing menu settings
			},
			SubSystems = new[] {
				Thrust, Utility, Offense, Power, Production, Jumping, Steering, Any,
			},
			ClosestFirst = true, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
			IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
			LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
			MinimumDiameter = 0, // 0 = unlimited, Minimum radius of threat to engage.
			MaximumDiameter = 0, // 0 = unlimited, Maximum radius of threat to engage.
			MaxTargetDistance = 1800, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
			MinTargetDistance = 0, // 0 = unlimited, Min target distance that targets will be automatically shot at.
			TopTargets = 1, // 0 = unlimited, max number of top targets to randomize between.
			TopBlocks = 2, // 0 = unlimited, max number of blocks to randomize between
			StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
			CycleTargets = 0, // Number of targets to "cycle" per acquire attempt.
			CycleBlocks = 0, // Number of blocks to "cycle" per acquire attempt.
			UniqueTargetPerWeapon = false, // only applies to multi-weapon blocks 
			MaxTrackingTime = 0, // After this time has been reached the weapon will stop tracking existing target and scan for a new one
			ShootBlanks = false, // Do not generate projectiles when shooting
			FocusOnly = false, // This weapon can only track focus targets.
			EvictUniqueTargets = false, // if this is set it will evict any weapons set to UniqueTargetPerWeapon unless they to have this set
		};

		private OtherDef Missiles_Missile_Hardpoint_Other = new OtherDef 
		{
			ConstructPartCap = 21,
			RotateBarrelAxis = 0,
			DisableLosCheck = true, // Do not perform LOS checks at all... not advised for self tracking weapons
			NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
			MuzzleCheck = false,
			Debug = false,
			RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
			CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
			CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
		};

		private HardPointAudioDef Missiles_Missile_Hardpoint_Audio = new HardPointAudioDef 
		{
			PreFiringSound = "",
			FiringSound = "MXA_Archer_Fire", // subtype name from sbc
			FiringSoundPerShot = true,
			ReloadSound = "",
			NoAmmoSound = "ArcWepShipGatlingNoAmmo",
			HardPointRotationSound = "WepTurretGatlingRotate",
			BarrelRotationSound = "",
			FireSoundEndDelay = 0, // Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
		};

		//Weapon Definitions

        WeaponDefinition MXA_ArcherPods => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "MXA_ArcherPods",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new[] 
				{
                    "subpart_ArcherPod1_Missile_1", "subpart_ArcherPod2_Missile_1", "subpart_ArcherPod3_Missile_1", "subpart_ArcherPod4_Missile_1", "subpart_ArcherPod5_Missile_1",
                    "subpart_ArcherPod1_Missile_2", "subpart_ArcherPod2_Missile_2", "subpart_ArcherPod3_Missile_2", "subpart_ArcherPod4_Missile_2", "subpart_ArcherPod5_Missile_2",
                    "subpart_ArcherPod1_Missile_3", "subpart_ArcherPod2_Missile_3", "subpart_ArcherPod3_Missile_3", "subpart_ArcherPod4_Missile_3", "subpart_ArcherPod5_Missile_3",
                    "subpart_ArcherPod1_Missile_4", "subpart_ArcherPod2_Missile_4", "subpart_ArcherPod3_Missile_4", "subpart_ArcherPod4_Missile_4", "subpart_ArcherPod5_Missile_4",
                    "subpart_ArcherPod1_Missile_5", "subpart_ArcherPod2_Missile_5", "subpart_ArcherPod3_Missile_5", "subpart_ArcherPod4_Missile_5", "subpart_ArcherPod5_Missile_5",
                    "subpart_ArcherPod1_Missile_6", "subpart_ArcherPod2_Missile_6", "subpart_ArcherPod3_Missile_6", "subpart_ArcherPod4_Missile_6", "subpart_ArcherPod5_Missile_6",
                    "subpart_ArcherPod1_Missile_7", "subpart_ArcherPod2_Missile_7", "subpart_ArcherPod3_Missile_7", "subpart_ArcherPod4_Missile_7", "subpart_ArcherPod5_Missile_7",
                    "subpart_ArcherPod1_Missile_8", "subpart_ArcherPod2_Missile_8", "subpart_ArcherPod3_Missile_8", "subpart_ArcherPod4_Missile_8", "subpart_ArcherPod5_Missile_8",
                    "subpart_ArcherPod1_Missile_9", "subpart_ArcherPod2_Missile_9", "subpart_ArcherPod3_Missile_9", "subpart_ArcherPod4_Missile_9", "subpart_ArcherPod5_Missile_9",
                    "subpart_ArcherPod1_Missile_10", "subpart_ArcherPod2_Missile_10", "subpart_ArcherPod3_Missile_10", "subpart_ArcherPod4_Missile_10", "subpart_ArcherPod5_Missile_10",
                    "subpart_ArcherPod1_Missile_11", "subpart_ArcherPod2_Missile_11", "subpart_ArcherPod3_Missile_11", "subpart_ArcherPod4_Missile_11", "subpart_ArcherPod5_Missile_11",
                    "subpart_ArcherPod1_Missile_12", "subpart_ArcherPod2_Missile_12", "subpart_ArcherPod3_Missile_12", "subpart_ArcherPod4_Missile_12", "subpart_ArcherPod5_Missile_12",
                    "subpart_ArcherPod1_Missile_13", "subpart_ArcherPod2_Missile_13", "subpart_ArcherPod3_Missile_13", "subpart_ArcherPod4_Missile_13", "subpart_ArcherPod5_Missile_13",
                    "subpart_ArcherPod1_Missile_14", "subpart_ArcherPod2_Missile_14", "subpart_ArcherPod3_Missile_14", "subpart_ArcherPod4_Missile_14", "subpart_ArcherPod5_Missile_14",
                    "subpart_ArcherPod1_Missile_15", "subpart_ArcherPod2_Missile_15", "subpart_ArcherPod3_Missile_15", "subpart_ArcherPod4_Missile_15", "subpart_ArcherPod5_Missile_15",
                    "subpart_ArcherPod1_Missile_16", "subpart_ArcherPod2_Missile_16", "subpart_ArcherPod3_Missile_16", "subpart_ArcherPod4_Missile_16", "subpart_ArcherPod5_Missile_16",
                    "subpart_ArcherPod1_Missile_17", "subpart_ArcherPod2_Missile_17", "subpart_ArcherPod3_Missile_17", "subpart_ArcherPod4_Missile_17", "subpart_ArcherPod5_Missile_17",
                    "subpart_ArcherPod1_Missile_18", "subpart_ArcherPod2_Missile_18", "subpart_ArcherPod3_Missile_18", "subpart_ArcherPod4_Missile_18", "subpart_ArcherPod5_Missile_18",
                    "subpart_ArcherPod1_Missile_19", "subpart_ArcherPod2_Missile_19", "subpart_ArcherPod3_Missile_19", "subpart_ArcherPod4_Missile_19", "subpart_ArcherPod5_Missile_19",
                    "subpart_ArcherPod1_Missile_20", "subpart_ArcherPod2_Missile_20", "subpart_ArcherPod3_Missile_20", "subpart_ArcherPod4_Missile_20", "subpart_ArcherPod5_Missile_20",
                    "subpart_ArcherPod1_Missile_21", "subpart_ArcherPod2_Missile_21", "subpart_ArcherPod3_Missile_21", "subpart_ArcherPod4_Missile_21", "subpart_ArcherPod5_Missile_21",
                    "subpart_ArcherPod1_Missile_22", "subpart_ArcherPod2_Missile_22", "subpart_ArcherPod3_Missile_22", "subpart_ArcherPod4_Missile_22", "subpart_ArcherPod5_Missile_22",
                    "subpart_ArcherPod1_Missile_23", "subpart_ArcherPod2_Missile_23", "subpart_ArcherPod3_Missile_23", "subpart_ArcherPod4_Missile_23", "subpart_ArcherPod5_Missile_23",
                    "subpart_ArcherPod1_Missile_24", "subpart_ArcherPod2_Missile_24", "subpart_ArcherPod3_Missile_24", "subpart_ArcherPod4_Missile_24", "subpart_ArcherPod5_Missile_24",
                    "subpart_ArcherPod1_Missile_25", "subpart_ArcherPod2_Missile_25", "subpart_ArcherPod3_Missile_25", "subpart_ArcherPod4_Missile_25", "subpart_ArcherPod5_Missile_25",
                    "subpart_ArcherPod1_Missile_26", "subpart_ArcherPod2_Missile_26", "subpart_ArcherPod3_Missile_26", "subpart_ArcherPod4_Missile_26", "subpart_ArcherPod5_Missile_26",
                    "subpart_ArcherPod1_Missile_27", "subpart_ArcherPod2_Missile_27", "subpart_ArcherPod3_Missile_27", "subpart_ArcherPod4_Missile_27", "subpart_ArcherPod5_Missile_27",
                    "subpart_ArcherPod1_Missile_28", "subpart_ArcherPod2_Missile_28", "subpart_ArcherPod3_Missile_28", "subpart_ArcherPod4_Missile_28", "subpart_ArcherPod5_Missile_28",
                    "subpart_ArcherPod1_Missile_29", "subpart_ArcherPod2_Missile_29", "subpart_ArcherPod3_Missile_29", "subpart_ArcherPod4_Missile_29", "subpart_ArcherPod5_Missile_29",
                    "subpart_ArcherPod1_Missile_30", "subpart_ArcherPod2_Missile_30", "subpart_ArcherPod3_Missile_30", "subpart_ArcherPod4_Missile_30", "subpart_ArcherPod5_Missile_30",
                },
                Ejector = "",
                Scope = "subpart_ArcherPod2_Missile_16", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = Missiles_Missile_Targeting_Large,
            HardPoint = new HardPointDef
            {
                PartName = "Large Archer Missile Pod", // name of weapon in terminal
                DeviateShotAngle = 1f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
				NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                Ui = new UiDef
                {
                    RateOfFire = false, // Enables terminal slider for changing rate of fire.
                    RateOfFireMin = 0.0f, // Sets the minimum limit for the rate of fire slider, default is 0.  Range is 0-1f.
                    DamageModifier = false, // Enables terminal slider for changing damage per shot.
                    ToggleGuidance = false, // Enables terminal option to disable smart projectile guidance.
                    EnableOverload = false, // Enables terminal option to turn on Overload; this allows energy weapons to double damage per shot, at the cost of quadrupled power draw and heat gain, and 2% self damage on overheat.
                    AlternateUi = false, // This simplifies and customizes the block controls for alternative weapon purposes,   
                    DisableStatus = false, // Do not display weapon status NoTarget, Reloading, NoAmmo, etc..
                },
                Ai = new AiDef
                {
                    TrackTargets = true, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation. Turrets Need this set to True.
                    TurretAttached = false, // Whether this weapon is a turret and should have the UI and API options for such. Turrets Need this set to True.
                    TurretController = false, // Whether this weapon can physically control the turret's movement. Turrets Need this set to True.
                    PrimaryTracking = false, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
                    LockOnFocus = false, // If enabled, weapon will only fire at targets that have been HUD selected AND locked onto by pressing Numpad 0.
                    SuppressFire = true, // If enabled, weapon can only be fired manually.
                    OverrideLeads = true, // Disable target leading on fixed weapons, or allow it for turrets.
                    DefaultLeadGroup = 0, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
                    TargetGridCenter = true, // Does not target blocks, instead it targets grid center.
                },                
				HardWare = new HardwareDef
                {
                    InventorySize = 14.100f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                },
                Other = Missiles_Missile_Hardpoint_Other,
                Loading = new LoadingDef
                {
                    RateOfFire = 480, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    SkipBarrels = 0, // Number of muzzles to skip after each fire event.
                    ReloadTime = 2700, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 150, // Number of physical magazines to consume on reload.
                    ShotsInBurst = 10, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
                    DelayAfterBurst = 480, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
                    GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its magazine or burst.
                    MaxActiveProjectiles = 0, // Maximum number of drones in flight (only works for drone launchers)
                },
				Audio = Missiles_Missile_Hardpoint_Audio,
            },
            Ammos = new[] 
			{
				Missiles_Missile,
            },
            Animations = MXA_ArcherPods_Animation,
        };

        WeaponDefinition SmallRocketLauncherReload => new WeaponDefinition 
		{
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SmallRocketLauncherReload",
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
                },
                Ejector = "",
                Scope = "muzzle_missile_002", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = Missiles_Missile_Targeting_Small,
            HardPoint = new HardPointDef
            {
                PartName = "SmallRocketLauncherReload", // name of weapon in terminal
                DeviateShotAngle = 1f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
                CanShootSubmerged = false,
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = new AiDef 
				{
					TrackTargets = true, //This Weapon will know there are targets in range
					TurretAttached = false, // This enables the ability for players to manually control
					TurretController = false, //The turret in this WeaponDefinition has control over where other turrets aim.
					PrimaryTracking = false, //The turret in this WeaponDefinition selects targets for other turrets that do not have tracking capabilities.
					LockOnFocus = false, // fires this weapon when something is locked using the WC hud reticle
					SuppressFire = false, //prevent automatic firing
					OverrideLeads = false, // Override default behavior for target leads
				},
                HardWare = new HardwareDef
                {
                    InventorySize = 0.380f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					CriticalReaction = new CriticalDef
					{
						Enable = false, // Enables Warhead behaviour
						DefaultArmedTimer = 120,
						PreArmed = false,
						TerminalControls = false,
						AmmoRound = "", // name of ammo upon explosion
					},
                },
				Other = new OtherDef 
				{
					ConstructPartCap = 21,
					EnergyPriority = 0,
					MuzzleCheck = false,
					Debug = false,
					RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
					CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
					CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
				},
                Loading = new LoadingDef
                {
                    RateOfFire = 240, // 240 Pre Rebalance 
                    BarrelsPerShot = 1, 
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    ReloadTime = 480, //3600 // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 4, // Number of physical magazines to consume on reload.
                    MaxActiveProjectiles = 0, // Maximum number of drones in flight (only works for drone launchers)
                },
                Audio = Missiles_Missile_Hardpoint_Audio,
            },
			Ammos = new[] 
			{
				Missiles_Missile,
            },
        };

        WeaponDefinition MXA_ArcherPods_NPC => new WeaponDefinition {

            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "MXA_ArcherPods_NPC",
                        SpinPartId = "Boomsticks", // For weapons with a spinning barrel such as Gatling Guns
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.5f,
                        IconName = ""
                    },
                },
                Muzzles = new[] {
                    "subpart_ArcherPod1_Missile_1", "subpart_ArcherPod2_Missile_1", "subpart_ArcherPod3_Missile_1", "subpart_ArcherPod4_Missile_1", "subpart_ArcherPod5_Missile_1",
                    "subpart_ArcherPod1_Missile_2", "subpart_ArcherPod2_Missile_2", "subpart_ArcherPod3_Missile_2", "subpart_ArcherPod4_Missile_2", "subpart_ArcherPod5_Missile_2",
                    "subpart_ArcherPod1_Missile_3", "subpart_ArcherPod2_Missile_3", "subpart_ArcherPod3_Missile_3", "subpart_ArcherPod4_Missile_3", "subpart_ArcherPod5_Missile_3",
                    "subpart_ArcherPod1_Missile_4", "subpart_ArcherPod2_Missile_4", "subpart_ArcherPod3_Missile_4", "subpart_ArcherPod4_Missile_4", "subpart_ArcherPod5_Missile_4",
                    "subpart_ArcherPod1_Missile_5", "subpart_ArcherPod2_Missile_5", "subpart_ArcherPod3_Missile_5", "subpart_ArcherPod4_Missile_5", "subpart_ArcherPod5_Missile_5",
                    "subpart_ArcherPod1_Missile_6", "subpart_ArcherPod2_Missile_6", "subpart_ArcherPod3_Missile_6", "subpart_ArcherPod4_Missile_6", "subpart_ArcherPod5_Missile_6",
                    "subpart_ArcherPod1_Missile_7", "subpart_ArcherPod2_Missile_7", "subpart_ArcherPod3_Missile_7", "subpart_ArcherPod4_Missile_7", "subpart_ArcherPod5_Missile_7",
                    "subpart_ArcherPod1_Missile_8", "subpart_ArcherPod2_Missile_8", "subpart_ArcherPod3_Missile_8", "subpart_ArcherPod4_Missile_8", "subpart_ArcherPod5_Missile_8",
                    "subpart_ArcherPod1_Missile_9", "subpart_ArcherPod2_Missile_9", "subpart_ArcherPod3_Missile_9", "subpart_ArcherPod4_Missile_9", "subpart_ArcherPod5_Missile_9",
                    "subpart_ArcherPod1_Missile_10", "subpart_ArcherPod2_Missile_10", "subpart_ArcherPod3_Missile_10", "subpart_ArcherPod4_Missile_10", "subpart_ArcherPod5_Missile_10",
                    "subpart_ArcherPod1_Missile_11", "subpart_ArcherPod2_Missile_11", "subpart_ArcherPod3_Missile_11", "subpart_ArcherPod4_Missile_11", "subpart_ArcherPod5_Missile_11",
                    "subpart_ArcherPod1_Missile_12", "subpart_ArcherPod2_Missile_12", "subpart_ArcherPod3_Missile_12", "subpart_ArcherPod4_Missile_12", "subpart_ArcherPod5_Missile_12",
                    "subpart_ArcherPod1_Missile_13", "subpart_ArcherPod2_Missile_13", "subpart_ArcherPod3_Missile_13", "subpart_ArcherPod4_Missile_13", "subpart_ArcherPod5_Missile_13",
                    "subpart_ArcherPod1_Missile_14", "subpart_ArcherPod2_Missile_14", "subpart_ArcherPod3_Missile_14", "subpart_ArcherPod4_Missile_14", "subpart_ArcherPod5_Missile_14",
                    "subpart_ArcherPod1_Missile_15", "subpart_ArcherPod2_Missile_15", "subpart_ArcherPod3_Missile_15", "subpart_ArcherPod4_Missile_15", "subpart_ArcherPod5_Missile_15",
                    "subpart_ArcherPod1_Missile_16", "subpart_ArcherPod2_Missile_16", "subpart_ArcherPod3_Missile_16", "subpart_ArcherPod4_Missile_16", "subpart_ArcherPod5_Missile_16",
                    "subpart_ArcherPod1_Missile_17", "subpart_ArcherPod2_Missile_17", "subpart_ArcherPod3_Missile_17", "subpart_ArcherPod4_Missile_17", "subpart_ArcherPod5_Missile_17",
                    "subpart_ArcherPod1_Missile_18", "subpart_ArcherPod2_Missile_18", "subpart_ArcherPod3_Missile_18", "subpart_ArcherPod4_Missile_18", "subpart_ArcherPod5_Missile_18",
                    "subpart_ArcherPod1_Missile_19", "subpart_ArcherPod2_Missile_19", "subpart_ArcherPod3_Missile_19", "subpart_ArcherPod4_Missile_19", "subpart_ArcherPod5_Missile_19",
                    "subpart_ArcherPod1_Missile_20", "subpart_ArcherPod2_Missile_20", "subpart_ArcherPod3_Missile_20", "subpart_ArcherPod4_Missile_20", "subpart_ArcherPod5_Missile_20",
                    "subpart_ArcherPod1_Missile_21", "subpart_ArcherPod2_Missile_21", "subpart_ArcherPod3_Missile_21", "subpart_ArcherPod4_Missile_21", "subpart_ArcherPod5_Missile_21",
                    "subpart_ArcherPod1_Missile_22", "subpart_ArcherPod2_Missile_22", "subpart_ArcherPod3_Missile_22", "subpart_ArcherPod4_Missile_22", "subpart_ArcherPod5_Missile_22",
                    "subpart_ArcherPod1_Missile_23", "subpart_ArcherPod2_Missile_23", "subpart_ArcherPod3_Missile_23", "subpart_ArcherPod4_Missile_23", "subpart_ArcherPod5_Missile_23",
                    "subpart_ArcherPod1_Missile_24", "subpart_ArcherPod2_Missile_24", "subpart_ArcherPod3_Missile_24", "subpart_ArcherPod4_Missile_24", "subpart_ArcherPod5_Missile_24",
                    "subpart_ArcherPod1_Missile_25", "subpart_ArcherPod2_Missile_25", "subpart_ArcherPod3_Missile_25", "subpart_ArcherPod4_Missile_25", "subpart_ArcherPod5_Missile_25",
                    "subpart_ArcherPod1_Missile_26", "subpart_ArcherPod2_Missile_26", "subpart_ArcherPod3_Missile_26", "subpart_ArcherPod4_Missile_26", "subpart_ArcherPod5_Missile_26",
                    "subpart_ArcherPod1_Missile_27", "subpart_ArcherPod2_Missile_27", "subpart_ArcherPod3_Missile_27", "subpart_ArcherPod4_Missile_27", "subpart_ArcherPod5_Missile_27",
                    "subpart_ArcherPod1_Missile_28", "subpart_ArcherPod2_Missile_28", "subpart_ArcherPod3_Missile_28", "subpart_ArcherPod4_Missile_28", "subpart_ArcherPod5_Missile_28",
                    "subpart_ArcherPod1_Missile_29", "subpart_ArcherPod2_Missile_29", "subpart_ArcherPod3_Missile_29", "subpart_ArcherPod4_Missile_29", "subpart_ArcherPod5_Missile_29",
                    "subpart_ArcherPod1_Missile_30", "subpart_ArcherPod2_Missile_30", "subpart_ArcherPod3_Missile_30", "subpart_ArcherPod4_Missile_30", "subpart_ArcherPod5_Missile_30",
                },
                Ejector = "",
                Scope = "subpart_ArcherPod2_Missile_16", //Where line of sight checks are performed from must be clear of block collision
            },
			
            Targeting = Missiles_Missile_Targeting_Large,
			
            HardPoint = new HardPointDef
            {
                PartName = "Large Archer Missile Pod", // name of weapon in terminal
                DeviateShotAngle = 1f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
                CanShootSubmerged = false,

				Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = new AiDef {
					TrackTargets = true, //This Weapon will know there are targets in range
					TurretAttached = false, // This enables the ability for players to manually control
					TurretController = false, //The turret in this WeaponDefinition has control over where other turrets aim.
					PrimaryTracking = false, //The turret in this WeaponDefinition selects targets for other turrets that do not have tracking capabilities.
					LockOnFocus = false, // fires this weapon when something is locked using the WC hud reticle
					SuppressFire = false, //prevent automatic firing
					OverrideLeads = false, // Override default behavior for target leads
				},
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0f,
                    ElevateRate = 0f,
                    MinAzimuth = 0,
                    MaxAzimuth = 0,
                    MinElevation = 0,
                    MaxElevation = 0,
                    FixedOffset = false,
                    InventorySize = 14.100f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					CriticalReaction = new CriticalDef
					{
						Enable = false, // Enables Warhead behaviour
						DefaultArmedTimer = 120,
						PreArmed = false,
						TerminalControls = false,
						AmmoRound = "", // name of ammo upon explosion
					},
                },
				
                Other = Missiles_Missile_Hardpoint_Other,
				
                Loading = new LoadingDef
                {
                    RateOfFire = 480, // 240 Pre Rebalance // visual only, 0 disables and uses RateOfFire
                    BarrelsPerShot = 1,
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 2700, //1200-420 for animation reload delay // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    HeatPerShot = 0, //heat generated per shot
                    MaxHeat = 0, //max heat before weapon enters cooldown (70% of max heat)
                    Cooldown = 0, //percent of max heat to be under to start firing again after overheat accepts .2-.95
                    HeatSinkRate = 0, //amount of heat lost per second
                    DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
                    ShotsInBurst = 10,
                    DelayAfterBurst = 480, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false,
                    GiveUpAfter = false,
                    BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
					MagsToLoad = 150, // Number of physical magazines to consume on reload.
					SpinFree = true, // Spin barrel while not firing
					StayCharged = false, // Will start recharging whenever power cap is not full
                },
                
				Audio = Missiles_Missile_Hardpoint_Audio,
								
            },
            Ammos = new[] {
                //Missiles_Missile,
				Missiles_Missile_NPC,
            },
            Animations = MXA_ArcherPods_Animation,
            //Upgrades = UpgradeModules,
            // Don't edit below this line
        };

        WeaponDefinition SmallRocketLauncherReload_NPC => new WeaponDefinition {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[]
                {
                    new MountPointDef
                    {
                        SubtypeId = "SmallRocketLauncherReload_NPC",
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
                },
                Ejector = "",
                Scope = "muzzle_missile_002", //Where line of sight checks are performed from must be clear of block collision
            },
			
            Targeting = Missiles_Missile_Targeting_Small,
			
            HardPoint = new HardPointDef
            {
                PartName = "SmallRocketLauncherReload", // name of weapon in terminal
                DeviateShotAngle = 1f,
                AimingTolerance = 180f, // 0 - 180 firing angle
                AimLeadingPrediction = Off, // Off, Basic, Accurate, Advanced
                DelayCeaseFire = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AddToleranceToTracking = true,
                CanShootSubmerged = false,

                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
				
                Ai = new AiDef {
					TrackTargets = true, //This Weapon will know there are targets in range
					TurretAttached = false, // This enables the ability for players to manually control
					TurretController = false, //The turret in this WeaponDefinition has control over where other turrets aim.
					PrimaryTracking = false, //The turret in this WeaponDefinition selects targets for other turrets that do not have tracking capabilities.
					LockOnFocus = false, // fires this weapon when something is locked using the WC hud reticle
					SuppressFire = false, //prevent automatic firing
					OverrideLeads = false, // Override default behavior for target leads
				},
				
                HardWare = new HardwareDef
                {
                    RotateRate = 0f,
                    ElevateRate = 0f,
                    MinAzimuth = 0,
                    MaxAzimuth = 0,
                    MinElevation = 0,
                    MaxElevation = 0,
                    FixedOffset = false,
                    InventorySize = 0.380f,
                    Offset = Vector(x: 0, y: 0, z: 0),
					Type = BlockWeapon, // BlockWeapon, HandWeapon, Phantom 
					IdlePower = 0.001f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
					CriticalReaction = new CriticalDef
					{
						Enable = false, // Enables Warhead behaviour
						DefaultArmedTimer = 120,
						PreArmed = false,
						TerminalControls = false,
						AmmoRound = "", // name of ammo upon explosion
					},
                },
                
				Other = new OtherDef {
					ConstructPartCap = 21,
					RotateBarrelAxis = 0,
					EnergyPriority = 0,
					MuzzleCheck = false,
					Debug = false,
					RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
					CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
					CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
				},
				
                Loading = new LoadingDef
                {
                    RateOfFire = 240, // 240 Pre Rebalance 
                    BarrelsPerShot = 1, 
                    TrajectilesPerBarrel = 1, // Number of Trajectiles per barrel per fire event.
                    SkipBarrels = 0,
                    ReloadTime = 480, //3600 // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    DelayUntilFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    HeatPerShot = 0, //heat generated per shot
                    MaxHeat = 0, //max heat before weapon enters cooldown (70% of max heat)
                    Cooldown = 0, //percent of max heat to be under to start firing again after overheat accepts .2-.95
                    HeatSinkRate = 0, //amount of heat lost per second
                    DegradeRof = false, // progressively lower rate of fire after 80% heat threshold (80% of max heat)
                    ShotsInBurst = 0,
                    DelayAfterBurst = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false,
                    GiveUpAfter = false,
                    BarrelSpinRate = 0, // visual only, 0 disables and uses RateOfFire
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
					MagsToLoad = 4, // Number of physical magazines to consume on reload.
					SpinFree = false, // Spin barrel while not firing
					StayCharged = false, // Will start recharging whenever power cap is not full
                },
				
                Audio = Missiles_Missile_Hardpoint_Audio,
				
            },
			Ammos = new[] {
                //Missiles_Missile,
				Missiles_Missile_NPC,
            },
            //Animations = AdvancedAnimation,
            // Don't edit below this line
        };
    }
}