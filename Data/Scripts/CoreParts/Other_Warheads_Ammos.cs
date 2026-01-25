using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.AmmoDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef.SpawnType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.ShapeDef.Shapes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef.SkipMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.PatternDef.PatternModes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef.TimedSpawnDef.PointTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.Conditions;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.UpRelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.FwdRelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ReInitCondition;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.RelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ConditionOperators;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.StageEvents;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.GuidanceType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.ShieldDef.ShieldType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DeformDef.DeformTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.Falloff;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.AoeShape;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.PushPullDef.Force;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.FactionColor;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.TracerBaseDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.Texture;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.DecalDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DamageTypes.Damage;

namespace Scripts
{ // Don't edit above this line
    partial class Parts
    {

        private AmmoDef Other_Warheads_RegularWarhead_LG_Ammo => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "Energy", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Large HE", // Unique name used in server overrides and in the terminal (default).  Should be different for each ammoDef used by the same weapon.  Referred to for Shrapnel.
            TerminalName = "", // Optional terminal name for this ammo type, used when picking ammo/cycling consumables.  Safe to have duplicates across different ammo defs.
            EnergyCost = 1f, // Scaler for energy per shot (EnergyCost * BaseDamage * (RateOfFire / 3600) * BarrelsPerShot * TrajectilesPerBarrel). Uses EffectStrength instead of BaseDamage if EWAR.  If patterning ammos, only the main ammo (first fired) will count toward energy.
            BaseDamage = 1, // Direct damage; one steel plate is worth 100.
            HardPointUsable = true, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 1, // For energy weapons, how many shots to fire before reloading.
            IgnoreVoxels = false, // Whether the projectile should be able to penetrate voxels.
            IgnoreGrids = false, // Disables collisions with grid and defense shields. Designed for fragments designed to time things (where a grid could disrupt) or for anti projectile weapons being able to fire through grids.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
            Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "Large HE Fragment", // AmmoRound field of the ammo to spawn.
                Fragments = 50, // Number of projectiles to spawn.
                Degrees = 360, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = true, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards), value is read from parent ammo type.
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 1, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                ArmWhenHit = false, // Setting this to true will arm the projectile when its shot by other projectiles.
                AdvOffset = Vector(x: 0, y: 0, z: 0), // advanced offsets the fragment by xyz coordinates relative to parent, value is read from fragment ammo type.
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below, unless ArmWhenHit or Eol ArmOnlyOnHit is set to true then both kinds of frags are active
                {
                    Enable = false, // Enables TimedSpawns mechanism
                    Interval = 0, // Time between spawning fragments, in ticks, 0 means every tick, 1 means every other
                    StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 1, // Max number of fragment children to spawn
                    Proximity = 1000, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = true, // Parent dies once after it spawns its last child.
                    PointAtTarget = true, // Start fragment direction pointing at Target
                    PointType = Predict, // Point accuracy, Direct (straight forward), Lead (always fire), Predict (only fire if it can hit)
                    DirectAimCone = 0f, //Aim cone used for Direct fire, in degrees
                    GroupSize = 1, // Number of spawns in each group
                    GroupDelay = 0, // Delay between each group.
                },
            },
            Pattern = new PatternDef
            {
                Patterns = new[] { // If enabled, set of multiple ammos to fire in order instead of the main ammo.
                    "Large HE Particle",
                },
                Mode = Weapon, // Select when to activate this pattern, options: Never, Weapon, Fragment, Both 
                TriggerChance = 1f, // This is %
                Random = false, // This randomizes the number spawned at once, NOT the list order.
                RandomMin = 1, 
                RandomMax = 1,
                SkipParent = false, // Skip the Ammo itself, in the list
                PatternSteps = 2, // Number of Ammos activated per round, will progress in order and loop. Ignored if Random = true.
            },
            Beams = new BeamDef
            {
                Enable = true, // Enable beam behaviour. Please have 3600 RPM, when this Setting is enabled. Please do not fire Beams into Voxels.
                VirtualBeams = false, // Only one damaging beam, but with the effectiveness of the visual beams combined (better performance).  If you are patterning a damage beam, ensure this is off for the non-AV beam
                ConvergeBeams = false, // When using virtual beams, converge the visual beams to the location of the real beam.
                RotateRealBeam = false, // The real beam is rotated between all visual beams, instead of centered between them.
                OneParticle = false, // Only spawn one particle hit per beam weapon.
                FakeVoxelHitTicks = 0, // If this beam hits/misses a voxel it assumes it will continue to do so for this many ticks at the same hit length and not extend further within this window.  This can save up to n times worth of cpu.
            },
            Trajectory = new TrajectoryDef
            {
                MaxLifeTime = 1, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 1, // voxel phasing if you go above 5100
                MaxTrajectory = 1, // Max Distance the projectile or beam can Travel.
            },
        };

        private AmmoDef Other_Warheads_RegularWarhead_LG_Ammo_Particle => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "Energy", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Large HE Particle", // Unique name used in server overrides and in the terminal (default).  Should be different for each ammoDef used by the same weapon.  Referred to for Shrapnel.
            TerminalName = "", // Optional terminal name for this ammo type, used when picking ammo/cycling consumables.  Safe to have duplicates across different ammo defs.
            EnergyCost = 1f, // Scaler for energy per shot (EnergyCost * BaseDamage * (RateOfFire / 3600) * BarrelsPerShot * TrajectilesPerBarrel). Uses EffectStrength instead of BaseDamage if EWAR.  If patterning ammos, only the main ammo (first fired) will count toward energy.
            BaseDamage = 1, // Direct damage; one steel plate is worth 100.
            HardPointUsable = false, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 1, // For energy weapons, how many shots to fire before reloading.
            IgnoreVoxels = true, // Whether the projectile should be able to penetrate voxels.
            IgnoreGrids = true, // Disables collisions with grid and defense shields. Designed for fragments designed to time things (where a grid could disrupt) or for anti projectile weapons being able to fire through grids.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
            Trajectory = new TrajectoryDef
            {
                MaxLifeTime = 30, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 1, // voxel phasing if you go above 5100
                MaxTrajectory = 1, // Max Distance the projectile or beam can Travel.
            },
            AmmoGraphics = new GraphicDef
            {
                ModelName = "", // Model Path goes here.  "\\Models\\Ammo\\Starcore_Arrow_Missile_Large"
                VisualProbability = 1f, // 0-1 % chance of AV appearing (controls all audio AND visual)
                Particles = new AmmoParticleDef
                {
                    Ammo = new ParticleDef
                    {
                        Name = "Explosion_Warhead_15", //ShipWelderArc
                        Offset = Vector(x: 0, y: 0, z: 0),
                        DisableCameraCulling = false,// If true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1.5f,
                        },
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef
            {
                TravelSound = "HWR_LargeExplosion", // SubtypeID for your Sound File. Travel is sound generated around your projectile in flight
                HitPlayChance = 1f, //0-1% chance for any hit sound to play
            },
        };

        private AmmoDef Other_Warheads_RegularWarhead_LG_Ammo_Fragment => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "Energy", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Large HE Fragment", // Unique name used in server overrides and in the terminal (default).  Should be different for each ammoDef used by the same weapon.  Referred to for Shrapnel.
            TerminalName = "", // Optional terminal name for this ammo type, used when picking ammo/cycling consumables.  Safe to have duplicates across different ammo defs.
            HybridRound = false, // Use both a physical ammo magazine and energy per shot.
            EnergyCost = 1f, // Scaler for energy per shot (EnergyCost * BaseDamage * (RateOfFire / 3600) * BarrelsPerShot * TrajectilesPerBarrel). Uses EffectStrength instead of BaseDamage if EWAR.  If patterning ammos, only the main ammo (first fired) will count toward energy.
            BaseDamage = 4000, // Direct damage; one steel plate is worth 100.
            BaseDamageCutoff = 0,  // Maximum amount of pen damage to apply per block hit.  Deducts from BaseDamage and uses DamageScales modifiers
                                    // Optional penetration mechanic to apply damage to blocks beyond the first hit, without requiring the block to be destroyed.  
                                    // Overwrites normal damage behavior of requiring a block to be destroyed before damage can continue.  0 disables. 
                                    // To limit max # of blocks hit, set MaxObjectsHit to desired # and ensure CountBlocks = true in ObjectsHit, otherwise it will continue until BaseDamage depletes
            HardPointUsable = false, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 1, // For energy weapons, how many shots to fire before reloading.
            IgnoreWater = false, // Whether the projectile should be able to penetrate water when using WaterMod.
            IgnoreVoxels = false, // Whether the projectile should be able to penetrate voxels.
            IgnoreGrids = false, // Disables collisions with grid and defense shields. Designed for fragments designed to time things (where a grid could disrupt) or for anti projectile weapons being able to fire through grids.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
            Sync = new SynchronizeDef
            {
                Full = false, // Do not use - still in progress
                PointDefense = false, // Server will inform clients of what projectiles have died by PD defense and will trigger destruction.
                OnHitDeath = false, // Server will inform clients when projectiles die due to them hitting something and will trigger destruction.
            },
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the visual Line Length if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = 3, // For SphereShape this is diameter.
                              // For LineShape it is total length (double this value when setting up MaximumDiameter for weapon targeting).
                              // Defaults to 1 if left zero or deleted.
            },
            ObjectsHit = new ObjectsHitDef
            {
                MaxObjectsHit = 0, // Limits the number of grids or projectiles that damage can be applied to, useful to limit overpenetration; 0 = unlimited.
                CountBlocks = false, // Counts individual blocks, not just entities hit.  Note that every block touched by primary damage hits will count toward MaxObjectsHit
                SkipBlocksForAOE = false, //If CountBlocks = true this will determine if AOE hits are counted against MaxObjectsHit.  Set true to skip counting for AOE
            },
            Beams = new BeamDef
            {
                Enable = true, // Enable beam behaviour. Please have 3600 RPM, when this Setting is enabled. Please do not fire Beams into Voxels.
                VirtualBeams = false, // Only one damaging beam, but with the effectiveness of the visual beams combined (better performance).  If you are patterning a damage beam, ensure this is off for the non-AV beam
                ConvergeBeams = false, // When using virtual beams, converge the visual beams to the location of the real beam.
                RotateRealBeam = false, // The real beam is rotated between all visual beams, instead of centered between them.
                OneParticle = false, // Only spawn one particle hit per beam weapon.
                FakeVoxelHitTicks = 0, // If this beam hits/misses a voxel it assumes it will continue to do so for this many ticks at the same hit length and not extend further within this window.  This can save up to n times worth of cpu.
            },
            Trajectory = new TrajectoryDef
            {
                MaxLifeTime = 5, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 1, // voxel phasing if you go above 5100
                MaxTrajectory = 20f, // Max Distance the projectile or beam can Travel.
            },
			// Just for debugging damage
            AmmoGraphics = new GraphicDef
            {
                VisualProbability = 0f, // 0-1 % chance of AV appearing (controls all audio AND visual)
                Lines = new LineDef
                {
                    DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 5f, //
                        Width = 0.2f, //
                        Color = Color(red: 30, green: 2, blue: 1f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        FactionColor = DontUse, // DontUse, Foreground, Background.
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        AlwaysDraw = false, // Prevents this tracer from being culled.  Only use if you have a reason too (very long tracers/trails).
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "WeaponLaser", // Please always have this Line set, if this Section is enabled.
                        },
                        TextureMode = Normal, // Normal, Cycle, Chaos, Wave
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        AlwaysDraw = false, // Prevents this tracer from being culled.  Only use if you have a reason too (very long tracers/trails).
                        Textures = new[] {
                            "WeaponLaser", // Please always have this Line set, if this Section is enabled.
                        },
                        TextureMode = Normal,
                        DecayTime = 60, // In Ticks. 1 = 1 Additional Tracer generated per motion, 33 is 33 lines drawn per projectile. Keep this number low.
                        Color = Color(red: 30, green: 10, blue: 10, alpha: 1),
                        FactionColor = DontUse, // DontUse, Foreground, Background.
                        Back = false,
                        CustomWidth = 0,
                        UseWidthVariance = false,
                        UseColorFade = true,
                    },
                },
            },
        };

        private AmmoDef Other_Warheads_RegularWarhead_SG_Ammo
        {
            get
            {
                var ammo = Other_Warheads_RegularWarhead_LG_Ammo;
                ammo.AmmoRound = "Small HE";
				ammo.Fragment.AmmoRound = "Small HE Fragment";
				ammo.Fragment.Fragments = 25;
				ammo.Pattern.Patterns[0] = "Small HE Particle";
                return ammo;
            }
        }


        private AmmoDef Other_Warheads_RegularWarhead_SG_Ammo_Particle
        {
            get
            {
                var ammo = Other_Warheads_RegularWarhead_LG_Ammo_Particle;
                ammo.AmmoRound = "Small HE Particle";
				ammo.AmmoGraphics.Particles.Ammo.Name = "Explosion_Warhead_02";
				ammo.AmmoAudio.TravelSound = "HWR_LargeExplosion";
                return ammo;
            }
        }
		
        private AmmoDef Other_Warheads_RegularWarhead_SG_Ammo_Fragment
        {
            get
            {
                var ammo = Other_Warheads_RegularWarhead_LG_Ammo_Fragment;
                ammo.AmmoRound = "Small HE Fragment";
				ammo.BaseDamage = 2000f;
				ammo.Trajectory.MaxTrajectory = 7.5f;
                return ammo;
            }
        }
    }
}
