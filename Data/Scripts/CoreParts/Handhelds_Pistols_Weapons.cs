using static Scripts.Structure;
using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.ModelAssignmentsDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef.Prediction;
using static Scripts.Structure.WeaponDefinition.TargetingDef.BlockTypes;
using static Scripts.Structure.WeaponDefinition.TargetingDef.Threat;
using static Scripts.Structure.WeaponDefinition.HardPointDef.HardwareDef;
using static Scripts.Structure.WeaponDefinition.HardPointDef.HardwareDef.HardwareType;

namespace Scripts {   
    partial class Parts {
        // Don't edit above this line
        WeaponDefinition ElitePistolGun => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "ElitePistolItem", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. 
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        IconName = "TestIcon.dds" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },                   
                 },
                Muzzles = new[] {
                    "muzzle_projectile", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A

                },
                Ejector = "Shell_Casings", // Optional; empty from which to eject "shells" if specified.
                Scope = "", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = new TargetingDef
            {
                Threats = new[] {
                    Grids, // Types of threat to engage: Grids, Projectiles, Characters, Meteors, Neutrals
                },
                SubSystems = new[] {
                    Thrust, Utility, Offense, Power, Production, Any, // Subsystem targeting priority: Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any
                },
            },
            HardPoint = new HardPointDef
            {
                PartName = "Elite Pistol", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 1f, // Projectile inaccuracy in degrees.
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 second, etc..). Length of time the weapon continues firing after trigger is released - while a target is available.
                AddToleranceToTracking = false, // Allows turret to track to the edge of the AimingTolerance cone instead of dead centre.
                CanShootSubmerged = false, // Whether the weapon can be fired underwater when using WaterMod.
				NpcSafe = true,
                Ai = new AiDef
                {

                    DefaultLeadGroup = 1, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
                },
                HardWare = new HardwareDef
                {
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = HandWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 

                },

                Loading = new LoadingDef
                {
                    RateOfFire = 200, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    SkipBarrels = 0, // Number of muzzles to skip after each fire event.
                    ReloadTime = 84, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 1, // Number of physical magazines to consume on reload.
                    DelayUntilFire = 0,
                    HeatPerShot = 1, // Heat generated per shot.
                    MaxHeat = 70000, // Max heat before weapon enters cooldown (70% of max heat).
                    Cooldown = .95f, // Percentage of max heat to be under to start firing again after overheat; accepts 0 - 0.95
                    HeatSinkRate = 9000000, // Amount of heat lost per second.
                    DegradeRof = false, // Progressively lower rate of fire when over 80% heat threshold (80% of max heat).
                    ShotsInBurst = 1, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
                    DelayAfterBurst = 10, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
                    GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its magazine or burst.
                    BarrelSpinRate = 0, // Visual only, 0 disables and uses RateOfFire.
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
                    SpinFree = true, // Spin barrel while not firing.
                    StayCharged = false, // Will start recharging whenever power cap is not full.

                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "", // Audio for warmup effect.
                    FiringSound = "WepPlayPistolShot", // Audio for firing.
                    FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
                    ReloadSound = "WepPistolReloadShort", // Sound SubtypeID, for when your Weapon is in a reloading state
                    NoAmmoSound = "WepPistolNoAmmo",
                    FireSoundEndDelay = 120, // How long the firing audio should keep playing after firing stops. Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                    FireSoundNoBurst = true, // Don't stop firing sound from looping when delaying after burst.
                },
                Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "Muzzle_Flash", // SubtypeId of muzzle particle effect.
                        Color = Color(red: 0, green: 0, blue: 0, alpha: 1), // Deprecated, set color in particle sbc.
                        Offset = Vector(x: 0, y: 0, z: 0), // Offsets the effect from the muzzle empty.
                        Extras = new ParticleOptionDef
                        {
                            Loop = true, // Set this to the same as in the particle sbc!
                            Restart = true, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 800,
                            MaxDuration = 0,
                            Scale = 0.5f, // Scale of effect.
                        },
                    },
                },
            },
            Ammos = new[] {
                ElitePistol_Ammo, 
            },
        };
	    WeaponDefinition SemiAutoPistolGun => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "SemiAutoPistolItem", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. 
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        IconName = "TestIcon.dds" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },                   
                 },
                Muzzles = new[] {
                    "muzzle_projectile", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A

                },
                Ejector = "Shell_Casings", // Optional; empty from which to eject "shells" if specified.
                Scope = "", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = new TargetingDef
            {
                Threats = new[] {
                    Grids, // Types of threat to engage: Grids, Projectiles, Characters, Meteors, Neutrals
                },
                SubSystems = new[] {
                    Thrust, Utility, Offense, Power, Production, Any, // Subsystem targeting priority: Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any
                },
            },
            HardPoint = new HardPointDef
            {
                PartName = "Semi Auto Pistol", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 2f, // Projectile inaccuracy in degrees.
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 second, etc..). Length of time the weapon continues firing after trigger is released - while a target is available.
                AddToleranceToTracking = false, // Allows turret to track to the edge of the AimingTolerance cone instead of dead centre.
                CanShootSubmerged = false, // Whether the weapon can be fired underwater when using WaterMod.
				NpcSafe = true,
                Ai = new AiDef
                {

                    DefaultLeadGroup = 1, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
                },
                HardWare = new HardwareDef
                {
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = HandWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 

                },

                Loading = new LoadingDef
                {
                    RateOfFire = 200, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    SkipBarrels = 0, // Number of muzzles to skip after each fire event.
                    ReloadTime = 84, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 1, // Number of physical magazines to consume on reload.
                    DelayUntilFire = 0,
                    HeatPerShot = 1, // Heat generated per shot.
                    MaxHeat = 70000, // Max heat before weapon enters cooldown (70% of max heat).
                    Cooldown = .95f, // Percentage of max heat to be under to start firing again after overheat; accepts 0 - 0.95
                    HeatSinkRate = 9000000, // Amount of heat lost per second.
                    DegradeRof = false, // Progressively lower rate of fire when over 80% heat threshold (80% of max heat).
                    ShotsInBurst = 1, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
                    DelayAfterBurst = 6, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
                    GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its magazine or burst.
                    BarrelSpinRate = 0, // Visual only, 0 disables and uses RateOfFire.
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
                    SpinFree = true, // Spin barrel while not firing.
                    StayCharged = false, // Will start recharging whenever power cap is not full.

                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "", // Audio for warmup effect.
                    FiringSound = "WepPlayPistolShot", // Audio for firing.
                    FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
                    ReloadSound = "WepPistolReloadShort", // Sound SubtypeID, for when your Weapon is in a reloading state
                    NoAmmoSound = "WepPistolNoAmmo",
                    FireSoundEndDelay = 120, // How long the firing audio should keep playing after firing stops. Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                    FireSoundNoBurst = true, // Don't stop firing sound from looping when delaying after burst.
                },
                Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "Muzzle_Flash", // SubtypeId of muzzle particle effect.
                        Color = Color(red: 0, green: 0, blue: 0, alpha: 1), // Deprecated, set color in particle sbc.
                        Offset = Vector(x: 0, y: 0, z: 0), // Offsets the effect from the muzzle empty.
                        Extras = new ParticleOptionDef
                        {
                            Loop = true, // Set this to the same as in the particle sbc!
                            Restart = true, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 800,
                            MaxDuration = 0,
                            Scale = 0.5f, // Scale of effect.
                        },
                    },
                },
            },
            Ammos = new[] {
                ElitePistol_Ammo, SemiAutoPistol_Ammo, SemiAutoPistolFlare_Ammo, 
            },
        };
        WeaponDefinition FullAutoPistolGun => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "FullAutoPistolItem", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. 
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        IconName = "TestIcon.dds" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },                   
                 },
                Muzzles = new[] {
                    "muzzle_projectile", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A

                },
                Ejector = "Shell_Casings", // Optional; empty from which to eject "shells" if specified.
                Scope = "", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = new TargetingDef
            {
                Threats = new[] {
                    Grids, // Types of threat to engage: Grids, Projectiles, Characters, Meteors, Neutrals
                },
                SubSystems = new[] {
                    Thrust, Utility, Offense, Power, Production, Any, // Subsystem targeting priority: Offense, Utility, Power, Production, Thrust, Jumping, Steering, Any
                },
            },
            HardPoint = new HardPointDef
            {
                PartName = "Full Auto Pistol", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 4f, // Projectile inaccuracy in degrees.
                DelayCeaseFire = 0, // Measured in game ticks (6 = 100ms, 60 = 1 second, etc..). Length of time the weapon continues firing after trigger is released - while a target is available.
                AddToleranceToTracking = false, // Allows turret to track to the edge of the AimingTolerance cone instead of dead centre.
                CanShootSubmerged = false, // Whether the weapon can be fired underwater when using WaterMod.
				NpcSafe = true,
                Ai = new AiDef
                {

                    DefaultLeadGroup = 1, // Default LeadGroup setting, range 0-5, 0 is disables lead group.  Only useful for fixed weapons or weapons set to OverrideLeads.
                },
                HardWare = new HardwareDef
                {
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = HandWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 

                },

                Loading = new LoadingDef
                {
                    RateOfFire = 1000, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    SkipBarrels = 0, // Number of muzzles to skip after each fire event.
                    ReloadTime = 108, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 1, // Number of physical magazines to consume on reload.
                    DelayUntilFire = 0,
                    HeatPerShot = 1, // Heat generated per shot.
                    MaxHeat = 70000, // Max heat before weapon enters cooldown (70% of max heat).
                    Cooldown = .95f, // Percentage of max heat to be under to start firing again after overheat; accepts 0 - 0.95
                    HeatSinkRate = 9000000, // Amount of heat lost per second.
                    DegradeRof = false, // Progressively lower rate of fire when over 80% heat threshold (80% of max heat).
                    ShotsInBurst = 0, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
                    DelayAfterBurst = 0, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
                    GiveUpAfter = false, // Whether the weapon should drop its current target and reacquire a new target after finishing its magazine or burst.
                    BarrelSpinRate = 0, // Visual only, 0 disables and uses RateOfFire.
                    DeterministicSpin = false, // Spin barrel position will always be relative to initial / starting positions (spin will not be as smooth).
                    SpinFree = true, // Spin barrel while not firing.
                    StayCharged = false, // Will start recharging whenever power cap is not full.

                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "", // Audio for warmup effect.
                    FiringSound = "WepPlayPistolShot", // Audio for firing.
                    FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
                    ReloadSound = "WepPistolReloadShort", // Sound SubtypeID, for when your Weapon is in a reloading state
                    NoAmmoSound = "WepPistolNoAmmo",
                    FireSoundEndDelay = 120, // How long the firing audio should keep playing after firing stops. Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                    FireSoundNoBurst = true, // Don't stop firing sound from looping when delaying after burst.
                },
                Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "Muzzle_Flash_Pistol", // SubtypeId of muzzle particle effect.
                        Color = Color(red: 0, green: 0, blue: 0, alpha: 1), // Deprecated, set color in particle sbc.
                        Offset = Vector(x: 0, y: 0, z: 0), // Offsets the effect from the muzzle empty.
                        Extras = new ParticleOptionDef
                        {
                            Loop = true, // Set this to the same as in the particle sbc!
                            Restart = true, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 800,
                            MaxDuration = 0,
                            Scale = 1f, // Scale of effect.
                        },
                    },
                },
            },
            Ammos = new[] {
                FullAutoPistol_Ammo, 
            },
        };
	
    }
}
