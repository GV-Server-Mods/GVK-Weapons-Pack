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
        WeaponDefinition AryxSmallFighterHangar => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "ARYX_Small_Sidekick_Hangar",
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located.
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 0.2f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                },
                Muzzles = new[] 
				{
                    "muzzle_projectile_1",
                    "muzzle_projectile_2",
                    "muzzle_projectile_3",
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "muzzle_projectile_1", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = new TargetingDef
            {
                Threats = new[] 
				{
                    Grids, // Types of threat to engage: Grids, Projectiles, Characters, Meteors, Neutrals
                },
				SubSystems = new[] 
				{
					Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any
				},
				ClosestFirst = false, // tries to pick closest targets first (blocks on grids, projectiles, etc...).
				IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
				LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
				MaxTargetDistance = 2500, // 0 = unlimited, Maximum target distance that targets will be automatically shot at.
				TopTargets = 2, // 0 = unlimited, max number of top targets to randomize between.
				TopBlocks = 5, // 0 = unlimited, max number of blocks to randomize between
				StopTrackingSpeed = 1000, // do not track target threats traveling faster than this speed
			},
            HardPoint = new HardPointDef
            {
                PartName = "Drone Hangar", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 1f, // Projectile inaccuracy in degrees.
                AimingTolerance = 180f, // How many degrees off target a turret can fire at. 0 - 180 firing angle.
                AimLeadingPrediction = Off, // Level of turret aim prediction; Off, Basic, Accurate, Advanced
                DelayCeaseFire = 120, // Measured in game ticks (6 = 100ms, 60 = 1 second, etc..). Length of time the weapon continues firing after trigger is released.
                AddToleranceToTracking = true, // Allows turret to only track to the edge of the AimingTolerance cone instead of dead centre.
                CanShootSubmerged = false, // Whether the weapon can be fired underwater when using WaterMod.
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
                    InventorySize = 4.800f, // Inventory capacity in kL.
                    IdlePower = 0.01f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = BlockWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                },
                Other = new OtherDef
                {
                    ConstructPartCap = 4,
					DisableLosCheck = true, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    MuzzleCheck = false,
                    Debug = false,
                    RestrictionRadius = 0f, // Meters, radius of sphere disable this gun if another is present
                    CheckInflatedBox = false, // if true, the bounding box of the gun is expanded by the RestrictionRadius
                    CheckForAnyWeapon = false, // if true, the check will fail if ANY gun is present, false only looks for this subtype
                },
                Loading = new LoadingDef
                {
                    RateOfFire = 60, // Set this to 3600 for beam weapons.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    SkipBarrels = 0, // Number of muzzles to skip after each fire event.
                    ReloadTime = 600, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 3, // Number of physical magazines to consume on reload.
                    DelayUntilFire = 30, // How long the weapon waits before shooting after being told to fire. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    ShotsInBurst = 1, // Use this if you don't want the weapon to fire an entire physical magazine before stopping to reload. Should not be more than your magazine capacity.
                    DelayAfterBurst = 0, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = true, // Whether the weapon should fire the full burst, even if the target is lost or player stops firing prematurely.
                    GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its burst.
                    MaxActiveProjectiles = 3, // Maximum number of drones in flight (only works for drone launchers)
                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "", // Audio for warmup effect.
                    FiringSound = "DOK_FalconDroneFire", // Audio for firing.
                    FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
                    ReloadSound = "",
                    NoAmmoSound = "",
                    HardPointRotationSound = "", // Audio played when turret is moving.
                    BarrelRotationSound = "",
                    FireSoundEndDelay = 120, // How long the firing audio should keep playing after firing stops. Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                },
            },
            Ammos = new[] 
			{
                Others_Drone_Offense_Launch,
				Others_Drone_Offense_Main,
				Others_Drone_Defense_Launch,
				Others_Drone_Defense_Main,
				AutocannonClip_Drone,
            },
            Animations = AryxSmallHangarAnimations,
        };
    }
}
