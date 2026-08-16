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

        WeaponDefinition Other_Warheads_RegularWarhead_LG_Weapon => new WeaponDefinition
        {
            Assignments = new ModelAssignmentsDef
            {
                MountPoints = new[] 
				{
                    new MountPointDef 
					{
                        SubtypeId = "LargeWarhead",
                        SpinPartId = "None",
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 1f,
                        IconName = "TestIcon.dds"
                    },
                    new MountPointDef 
					{
                        SubtypeId = "LargeExplosiveBarrel",
                        SpinPartId = "None",
                        MuzzlePartId = "None",
                        AzimuthPartId = "None",
                        ElevationPartId = "None",
                        DurabilityMod = 1f,
                        IconName = "TestIcon.dds"
                    },
                },
                Muzzles = new[] 
				{
                    "",
                },
                Ejector = "",
                Scope = "", //Where line of sight checks are performed from must be clear of block collision
            },
            Targeting = Common_Weapons_Targeting_Fixed_NoTargeting,
            HardPoint = new HardPointDef
            {
                PartName = "Large Warhead", // Name of the weapon in terminal, should be unique for each weapon definition that shares a SubtypeId (i.e. multiweapons).
                AimLeadingPrediction = Off, // Level of turret aim prediction; Off, Basic, Accurate, Advanced
                NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
                ScanTrackOnly = true, // This weapon only scans and tracks entities, this disables un-needed functionality and customizes for this purpose. 
                Ui = Common_Weapons_Hardpoint_Ui_FullDisable,
                Ai = Common_Weapons_Hardpoint_Ai_FullDisable,
                HardWare = new HardwareDef
                {
                    InventorySize = 0.1f, // Inventory capacity in kL.
                    IdlePower = 0.25f, // Constant base power draw in MW.
                    Offset = Vector(x: 0, y: 0, z: 0), // Offsets the aiming/firing line of the weapon, in metres.
                    Type = BlockWeapon, // What type of weapon this is; BlockWeapon, HandWeapon, Phantom 
                    CriticalReaction = new CriticalDef
                    {
                        Enable = true, // Enables Warhead behaviour.
                        DefaultArmedTimer = 600, // Sets default countdown duration.
                        PreArmed = false, // Whether the warhead is armed by default when placed. Best left as false.
                        TerminalControls = true, // Whether the warhead should have terminal controls for arming and detonation.
                        AmmoRound = "Other_Warheads_RegularWarhead_LG_Ammo", // Optional. If specified, the warhead will always use this ammo on detonation rather than the currently selected ammo.
                    },
				},
                Other = new OtherDef
				{
					ConstructPartCap = 0, // Maximum number of blocks with this weapon on a grid; 0 = unlimited.
					MuzzleCheck = false, // Whether the weapon should check LOS from each individual muzzle in addition to the scope.
					DisableLosCheck = true, // Do not perform LOS checks at all... not advised for self tracking weapons
					NoVoxelLosCheck = true, // If set to true this ignores voxels for LOS checking.. which means weapons will fire at targets behind voxels.  However, this can save cpu in some situations, use with caution. 			MuzzleCheck = false, // Whether the weapon should check LOS from each individual muzzle in addition to the scope.
					Debug = false, // Force enables debug mode.
					RestrictionRadius = 0, // Prevents other blocks of this type from being placed within this distance of the centre of the block.
					CheckInflatedBox = false, // If true, the above distance check is performed from the edge of the block instead of the centre.
					CheckForAnyWeapon = false, // If true, the check will fail if ANY weapon is present, not just weapons of the same subtype.
				},
                Loading = new LoadingDef
				{
					RateOfFire = 60, // Set this to 3600 for beam weapons. This is how fast your Gun fires.
					BarrelsPerShot = 1, // How many muzzles will fire a projectile per fire event.
					TrajectilesPerBarrel = 1, // Number of projectiles per muzzle per fire event.
					ReloadTime = 1, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					MagsToLoad = 1, // Number of physical magazines to consume on reload.
					MaxActiveProjectiles = 1, // Maximum number of projectiles in flight
					MaxReloads = 1, // Maximum number of reloads in the LIFETIME of a weapon
				},
            },
            Ammos = new[] {
                Other_Warheads_RegularWarhead_LG_Ammo,
				Other_Warheads_RegularWarhead_LG_Ammo_Particle,
				Other_Warheads_RegularWarhead_LG_Ammo_Fragment,// Must list all primary, shrapnel, and pattern ammos.
            },
        };

 		WeaponDefinition Other_Warheads_RegularWarhead_SG_Weapon
        {
            get
            {
                var weapon = Other_Warheads_RegularWarhead_LG_Weapon;
                weapon.Assignments.MountPoints[0].SubtypeId = "SmallWarhead";
                weapon.Assignments.MountPoints[1].SubtypeId = "SmallExplosiveBarrel";
				weapon.HardPoint.PartName = "Small Warhead";
                weapon.Ammos = new[]
                {
					Other_Warheads_RegularWarhead_SG_Ammo,
					Other_Warheads_RegularWarhead_SG_Ammo_Particle,
					Other_Warheads_RegularWarhead_SG_Ammo_Fragment,// Must list all primary, shrapnel, and pattern ammos.
                };
                return weapon;
            }
        }
   }
}