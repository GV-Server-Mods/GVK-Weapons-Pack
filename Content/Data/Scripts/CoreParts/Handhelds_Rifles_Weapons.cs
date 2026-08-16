using VRageMath;
using System.Collections.Generic;
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
	    WeaponDefinition RapidFireAutomaticRifleGun => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "RapidFireAutomaticRifleItem", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. 
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        IconName = "TestIcon.dds" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },                   
                 },
                Muzzles = new[] 
				{
                    "muzzle_projectile", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A

                },
                Ejector = "Shell_Casings", // Optional; empty from which to eject "shells" if specified.
                Scope = "", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = Common_Weapons_Targeting_Fixed_NoTargeting,
            HardPoint = new HardPointDef
            {
                PartName = "Basic Rifle", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 3f, // Projectile inaccuracy in degrees.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef
                {
                    InventorySize = 1f, // Inventory capacity in kL.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = HandWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                },
                Other = Common_Weapons_Hardpoint_Other_Handhelds,
                Loading = new LoadingDef
                {
                    RateOfFire = 650, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    ReloadTime = 216, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 1, // Number of physical magazines to consume on reload.
                    DelayAfterBurst = 0, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "", // Audio for warmup effect.
                    FiringSound = "WepRifleShot", // Audio for firing.
                    FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
                    ReloadSound = "WepRifleReload", // Sound SubtypeID, for when your Weapon is in a reloading state
                    NoAmmoSound = "WepPlayRifleNoAmmo",
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
                            MaxDistance = 1800,
                            MaxDuration = 0,
                            Scale = 1.5f, // Scale of effect.
                        },
                    },
                },
            },
            Ammos = new[] 
			{
                Ballistics_Interior,
            },
        };
	   	WeaponDefinition UltimateAutomaticRifleGun => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "UltimateAutomaticRifleItem", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. 
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        IconName = "TestIcon.dds" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },                   
                 },
                Muzzles = new[] 
				{
                    "muzzle_projectile", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A

                },
                Ejector = "Shell_Casings", // Optional; empty from which to eject "shells" if specified.
                Scope = "", // Where line of sight checks are performed from. Must be clear of block collision.
            },
            Targeting = Common_Weapons_Targeting_Fixed_NoTargeting,
            HardPoint = new HardPointDef
            {
                PartName = "Basic Rifle", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 1.5f, // Projectile inaccuracy in degrees.
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef
                {
                    InventorySize = 1f, // Inventory capacity in kL.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = HandWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                },
                Other = Common_Weapons_Hardpoint_Other_Handhelds,
                Loading = new LoadingDef
                {
                    RateOfFire = 500, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    ReloadTime = 144, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 1, // Number of physical magazines to consume on reload.
                    DelayAfterBurst = 20, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    ShotsInBurst = 3, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
                    FireFull = true, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "", // Audio for warmup effect.
                    FiringSound = "WepRifleShot", // Audio for firing.
                    FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
                    ReloadSound = "WepRifleReload", // Sound SubtypeID, for when your Weapon is in a reloading state
                    NoAmmoSound = "WepPlayRifleNoAmmo",
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
                            MaxDistance = 1800,
                            MaxDuration = 0,
                            Scale = 1.5f, // Scale of effect.
                        },
                    },
                },
            },
            Ammos = new[] 
			{
                UltimateAutomaticRifleGun_Ammo,
            },
        };
	   
    }
}
