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

		private UiDef Other_Flare_Hardpoint_Ui = new UiDef 
		{
			RateOfFire = true, // Enables terminal slider for changing rate of fire.
			RateOfFireMin = 0.0f, // Sets the minimum limit for the rate of fire slider, default is 0.  Range is 0-1f.
			DamageModifier = false, // Enables terminal slider for changing damage per shot.
			ToggleGuidance = false, // Enables terminal option to disable smart projectile guidance.
			EnableOverload = false, // Enables terminal option to turn on Overload; this allows energy weapons to double damage per shot, at the cost of quadrupled power draw and heat gain, and 2% self damage on overheat.
			AlternateUi = false, // This simplifies and customizes the block controls for alternative weapon purposes,   
			DisableStatus = false, // Do not display weapon status NoTarget, Reloading, NoAmmo, etc..
		};

        WeaponDefinition LargeFlareWC => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "LargeFlareLauncher", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "TestIcon.dds" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                    new MountPointDef {
                        SubtypeId = "LargeFlareLauncher_NPC", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "TestIcon.dds" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                 },
                Muzzles = new[] {
                    "muzzle_missile_033", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A
					"muzzle_missile_034",
					"muzzle_missile_035",
					"muzzle_missile_036",
					"muzzle_missile_037",
					"muzzle_missile_038",
					"muzzle_missile_039",
					"muzzle_missile_040",
					"muzzle_missile_041",
					"muzzle_missile_042",
					"muzzle_missile_043",
					"muzzle_missile_044",
					"muzzle_missile_045",
					"muzzle_missile_046",
					"muzzle_missile_047",
					"muzzle_missile_048",
					"muzzle_missile_049",
					"muzzle_missile_050",
					"muzzle_missile_051",
					"muzzle_missile_052",
					"muzzle_missile_053",
					"muzzle_missile_054",
					"muzzle_missile_055",
					"muzzle_missile_056",
					"muzzle_missile_057",
					"muzzle_missile_058",
					"muzzle_missile_059",
					"muzzle_missile_060",
					"muzzle_missile_061",
					"muzzle_missile_062",
					"muzzle_missile_063",
					"muzzle_missile_064",
                },
                Scope = "muzzle_missile_052", // Where line of sight checks are performed from. Must be clear of block collision.
            },
			Targeting = Common_Weapons_Targeting_Fixed_NoTargeting, //shared targeting def
            HardPoint = new HardPointDef
            {
                PartName = "WCLargeFlare", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 10f, // Projectile inaccuracy in degrees.
                NpcSafe = false, // This is how you tell npc modders that your wep was designed with them in mind, unless they tell you otherwise set this to false.
                ScanTrackOnly = false, // This weapon only scans and tracks entities, this disables un-needed functionality and customizes for this purpose. 
                Ui = Other_Flare_Hardpoint_Ui,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef
                {
                    InventorySize = 0.396f, // Inventory capacity in kL.
                    IdlePower = 0.32f, // Constant base power draw in MW.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = BlockWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = new LoadingDef
                {
                    RateOfFire = 240, // Set this to 3600 for beam weapons. This is how fast your gun fires per minute.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    ReloadTime = 1200, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 4, // Number of physical magazines to consume on reload.
                    ShotsInBurst = 0, // Use this if you don't want the weapon to fire an entire physical magazine in one go. Should not be more than your magazine capacity.
                    DelayAfterBurst = 0, // How long to spend "reloading" after each burst. Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FireFull = false, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "", // Audio for warmup effect.
                    FiringSound = "", // Audio for firing.
                    FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
                    ReloadSound = "", // Sound SubtypeID, for when your Weapon is in a reloading state
                    NoAmmoSound = "",
                    HardPointRotationSound = "", // Audio played when turret is moving.
                    BarrelRotationSound = "",
                    FireSoundEndDelay = 0, // How long the firing audio should keep playing after firing stops. Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                    FireSoundNoBurst = false, // Don't stop firing sound from looping when delaying after burst.
                },
                Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "MD_FlareSparks", // SubtypeId of muzzle particle effect.
                        Offset = Vector(x: 0, y: 0, z: 0), // Offsets the effect from the muzzle empty.
                        DisableCameraCulling = false, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Loop = false, // Set this to the same as in the particle sbc!
                            Restart = false, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 1000,
                            MaxDuration = 0,
                            Scale = 1f, // Scale of effect.
                        },
                    },
                },
            },
            Ammos = new[] {
                FlareWC, FireworkBaseWC, FireworkRainbowWC, FireworkBlueWC, FireworkGreenWC, FireworkRedWC, FireworkPinkWC, FireworkYellowWC, 
            },
        };
        WeaponDefinition SmallFlareWC => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] {
                    new MountPointDef {
                        SubtypeId = "SmallFlareLauncher", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "TestIcon.dds" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                    new MountPointDef {
                        SubtypeId = "SmallFlareLauncher_NPC", // Block Subtypeid. Your Cubeblocks contain this information
                        SpinPartId = "None", // For weapons with a spinning barrel such as Gatling Guns. Subpart_Boomsticks must be written as Boomsticks.
                        MuzzlePartId = "None", // The subpart where your muzzle empties are located. This is often the elevation subpart. Subpart_Boomsticks must be written as Boomsticks.
                        AzimuthPartId = "None", // Your Rotating Subpart, the bit that moves sideways.
                        ElevationPartId = "None",// Your Elevating Subpart, that bit that moves up.
                        DurabilityMod = 0.5f, // GeneralDamageMultiplier, 0.25f = 25% damage taken.
                        IconName = "TestIcon.dds" // Overlay for block inventory slots, like reactors, refineries, etc.
                    },
                 },
                Muzzles = new[] {
                    "muzzle_missile_033", // Where your Projectiles spawn. Use numbers not Letters. IE Muzzle_01 not Muzzle_A
					"muzzle_missile_034",
					"muzzle_missile_035",
					"muzzle_missile_036",
					"muzzle_missile_037",
					"muzzle_missile_038",
					"muzzle_missile_039",
					"muzzle_missile_040",
					"muzzle_missile_041",

                },
                Ejector = "", // Optional; empty from which to eject "shells" if specified.
                Scope = "muzzle_missile_037", // Where line of sight checks are performed from. Must be clear of block collision.
            },
			Targeting = Common_Weapons_Targeting_Fixed_NoTargeting, //shared targeting def
            HardPoint = new HardPointDef
            {
                PartName = "WCSmallFlare", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                DeviateShotAngle = 5f, // Projectile inaccuracy in degrees.
                NpcSafe = false, // This is how you tell npc modders that your wep was designed with them in mind, unless they tell you otherwise set this to false.
                ScanTrackOnly = false, // This weapon only scans and tracks entities, this disables un-needed functionality and customizes for this purpose. 
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef
                {
                    InventorySize = 0.132f, // Inventory capacity in kL.
                    IdlePower = 0.25f, // Constant base power draw in MW.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = BlockWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                },
                Other = Common_Weapons_Hardpoint_Other_NoRestrictionRadius,
                Loading = new LoadingDef
                {
                    RateOfFire = 140, // Set this to 3600 for beam weapons. This is how fast your gun fires per minute.
                    BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
                    TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
                    ReloadTime = 600, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    MagsToLoad = 2, // Number of physical magazines to consume on reload.
                    FireFull = true, // Whether the weapon should fire the full magazine (or the full burst instead if ShotsInBurst > 0), even if the target is lost or the player stops firing prematurely.
                },
                Audio = new HardPointAudioDef
                {
                    PreFiringSound = "", // Audio for warmup effect.
                    FiringSound = "", // Audio for firing.
                    FiringSoundPerShot = true, // Whether to replay the sound for each shot, or just loop over the entire track while firing.
                    ReloadSound = "", // Sound SubtypeID, for when your Weapon is in a reloading state
                    NoAmmoSound = "",
                    HardPointRotationSound = "", // Audio played when turret is moving.
                    BarrelRotationSound = "",
                    FireSoundEndDelay = 0, // How long the firing audio should keep playing after firing stops. Measured in game ticks(6 = 100ms, 60 = 1 seconds, etc..).
                    FireSoundNoBurst = false, // Don't stop firing sound from looping when delaying after burst.
                },
                Graphics = new HardPointParticleDef
                {
                    Effect1 = new ParticleDef
                    {
                        Name = "MD_FlareSparks", // SubtypeId of muzzle particle effect.
                        Offset = Vector(x: 0, y: 0, z: 0), // Offsets the effect from the muzzle empty.
                        DisableCameraCulling = false, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Loop = false, // Set this to the same as in the particle sbc!
                            Restart = false, // Whether to end a looping effect instantly when firing stops.
                            MaxDistance = 1000,
                            MaxDuration = 0,
                            Scale = 1f, // Scale of effect.
                        },
                    },
                },
            },
            Ammos = new[] {
                FlareWC, FireworkBaseWC, FireworkRainbowWC, FireworkBlueWC, FireworkGreenWC, FireworkRedWC, FireworkPinkWC, FireworkYellowWC, 
            },
        };
    }
}
