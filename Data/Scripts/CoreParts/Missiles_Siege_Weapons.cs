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
        WeaponDefinition AryxLongswordMissileBattery => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "ARYXMissileBattery",
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns.
                        MuzzlePartId = "MissileTurretBarrels", // The subpart where your muzzle empties are located.
                        AzimuthPartId = "MissileTurretBase1",
                        ElevationPartId = "MissileTurretBarrels",
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                },
                Muzzles = new[] 
				{
                    "muzzle_missile_1",
                    "muzzle_missile_2",
                    "muzzle_missile_3",
                    "muzzle_missile_4",
                    "muzzle_missile_5",
                    "muzzle_missile_6",
                    "muzzle_missile_7",
                    "muzzle_missile_8",
                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "dummy_camera", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = new TargetingDef
            {
                Threats = new[] 
				{
                    Grids, // Types of threat to engage: Grids, Projectiles, Characters, Meteors, Neutrals
                },
                SubSystems = new[] 
				{
                    Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any, // Subsystem targeting priority: Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any
                },
                ClosestFirst = false, // Tries to pick closest targets first (blocks on grids, projectiles, etc...).
                IgnoreDumbProjectiles = true, // Don't fire at non-smart projectiles.
                LockedSmartOnly = false, // Only fire at smart projectiles that are locked on to parent grid.
                MinimumDiameter = 0, // Minimum radius of threat to engage.
                MaximumDiameter = 0, // Maximum radius of threat to engage; 0 = unlimited.
                MaxTargetDistance = 4000, // Maximum distance at which targets will be automatically shot at; 0 = unlimited.
                MinTargetDistance = 500, // Minimum distance at which targets will be automatically shot at.
                TopTargets = 8, // Maximum number of targets to randomize between; 0 = unlimited.
                TopBlocks = 8, // Maximum number of blocks to randomize between; 0 = unlimited.
                StopTrackingSpeed = 1000, // Do not track threats traveling faster than this speed; 0 = unlimited.
            },
            HardPoint = new HardPointDef
            {
                PartName = "Longsword SRBM", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 0.3f, // Projectile inaccuracy in degrees.
                AimingTolerance = 5f, // How many degrees off target a turret can fire at. 0 - 180 firing angle.
                AimLeadingPrediction = Advanced, // Level of turret aim prediction; Off, Basic, Accurate, Advanced
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 second, etc..). Length of time the weapon continues firing after trigger is released.
                AddToleranceToTracking = true, // Allows turret to only track to the edge of the AimingTolerance cone instead of dead centre.
                CanShootSubmerged = false, // Whether the weapon can be fired underwater when using WaterMod.

                Ui = new UiDef
                {
                    RateOfFire = false, // Enables terminal slider for changing rate of fire.
                    DamageModifier = false, // Enables terminal slider for changing damage per shot.
                    ToggleGuidance = false, // Enables terminal option to disable smart projectile guidance.
                    EnableOverload = false, // Enables terminal option to turn on Overload; this allows energy weapons to double damage per shot, at the cost of quadrupled power draw and heat gain, and 2% self damage on overheat.
                },
                Ai = new AiDef
                {
                    TrackTargets = true, // Whether this weapon tracks its own targets, or (for multiweapons) relies on the weapon with PrimaryTracking enabled for target designation.
                    TurretAttached = true, // Whether this weapon is a turret and should have the UI and API options for such.
                    TurretController = true, // Whether this weapon can physically control the turret's movement.
                    PrimaryTracking = true, // For multiweapons: whether this weapon should designate targets for other weapons on the platform without their own tracking.
                    LockOnFocus = false, // Whether this weapon should automatically fire at a target that has been locked onto via HUD.
                    SuppressFire = false, // If enabled, weapon can only be fired manually.
                    OverrideLeads = false, // Disable target leading on fixed weapons, or allow it for turrets.
                },
                HardWare = new HardwareDef
                {
                    RotateRate = 0.01f, // Max traversal speed of azimuth subpart in radians per tick (0.1 is approximately 360 degrees per second).
                    ElevateRate = 0.01f, // Max traversal speed of elevation subpart in radians per tick.
                    MinAzimuth = -180,
                    MaxAzimuth = 180,
                    MinElevation = -20,
                    MaxElevation = 90,
                    HomeAzimuth = 0, // Default resting rotation angle
                    HomeElevation = 31, // Default resting elevation
                    InventorySize = 17.690f, // Inventory capacity in kL.
                    IdlePower = 1f, // Power draw in MW while not charging, or for non-energy weapons. Defaults to 0.001.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = BlockWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                },
                Other = new OtherDef
                {
                    ConstructPartCap = 1, // Maximum number of blocks with this weapon on a grid; 0 = unlimited.
					DisableLosCheck = false, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution.
                    MuzzleCheck = false, // Whether the weapon should check LOS from each individual muzzle in addition to the scope.
                    Debug = false, // Force enables debug mode.
                    RestrictionRadius = 0, // Prevents other blocks of this type from being placed within this distance of the centre of the block.
                    CheckInflatedBox = false, // If true, the above distance check is performed from the edge of the block instead of the centre.
                    CheckForAnyWeapon = false, // If true, the check will fail if ANY weapon is present, not just weapons of the same subtype.
                },
                Loading = new LoadingDef
                {
                    RateOfFire = 30, // Set this to 3600 for beam weapons.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    ReloadTime = 1200, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 8, // Number of physical magazines to consume on reload.
                    DelayUntilFire = 120, // How long the weapon waits before shooting after being told to fire. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its burst.
                    StayCharged = false, // Will start recharging whenever power cap is not full.
                    GoHomeToReload = true, // Tells the weapon it must be in the home position before it can reload.
                    DropTargetUntilLoaded = true, // If true this weapon will drop the target when its out of ammo and until its reloaded.
				},
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "", // Audio for warmup effect.
                    FiringSound = "DOK_SiegeMissileFire", // Audio for firing.
                    FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
                    ReloadSound = "",
                    NoAmmoSound = "",
                    HardPointRotationSound = "", // Audio played when turret is moving.
                    BarrelRotationSound = "",
                    FireSoundEndDelay = 0, // How long the firing audio should keep playing after firing stops. Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                },
            },
            Ammos = new[] 
			{
                Missiles_Siege,
				Missiles_Siege_Shrapnel,
            },
            Animations = AryxMissileBatteryAnims,
        };
    }
}
