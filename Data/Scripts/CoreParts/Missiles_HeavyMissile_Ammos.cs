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
        private AmmoDef Missiles_HeavyMissile => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "Missiles_HeavyMissile", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Missiles_HeavyMissile", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 1f, // Direct damage; one steel plate is worth 100.
            Mass = 400f, // In kilograms; how much force the impact will apply to the target.
            Health = 15, // How much damage the projectile can take from other projectiles (base of 1 per hit) before dying; 0 disables this and makes the projectile untargetable.
            HardPointUsable = true, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = false, // If you enable this you can remove the damagescale section entirely.
            Sync = new SynchronizeDef
            {
                Full = false, // Be careful, do not use on high fire rate weapons or ammos with many simultaneous fragments. This will send position updates twice per second per projectile/fragment and sync target (grid/block) changes.
                PointDefense = true, // Server will inform clients of what projectiles have died by PD defense and will trigger destruction.
                OnHitDeath = true, // Server will inform clients when projectiles die due to them hitting something and will trigger destruction.
            },
            DamageScales = new DamageScaleDef 
			{
                DamageVoxels = false, // Whether to damage voxels.
                HealthHitModifier = 1, // How much Health to subtract from another projectile on hit; defaults to 1 if zero or less.
                Characters = -1f, // Character damage multiplier; defaults to 1 if zero or less.
                // For the following modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01f = 1% damage, 2 = 200% damage.
                Grids = new GridSizeDef
                {
                    Large = -1f, // Multiplier for damage against large grids.
                    Small = 0.04f, // 1/125
                },
                Armor = new ArmorDef
                {
                    Armor = -1f, // Multiplier for damage against all armor. This is multiplied with the specific armor type multiplier (light, heavy).
                    Light = -1f, // Multiplier for damage against light armor.
                    Heavy = -1f, // Multiplier for damage against heavy armor.
                    NonArmor = -1f, // Multiplier for damage against every else.
                },
                DamageType = new DamageTypes // Damage type of each element of the projectile's damage; Kinetic, Energy
                {
                    Base = Kinetic, // Base Damage uses this
                    AreaEffect = Energy,
                    Detonation = Energy,
                    Shield = Energy, // Damage against shields is currently all of one type per projectile. Shield Bypass Weapons, always Deal Energy regardless of this line
                },
				Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
            },
            AreaOfDamage = new AreaOfDamageDef 
			{
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 6f, // Radius of AOE effect, in meters.
                    Damage = 16000f,
                    Depth = 6f, // Max depth of AOE effect, in meters. 0=disabled, and AOE effect will reach to a depth of the radius value
                    MaxAbsorb = 0f, // Soft cutoff for damage, except for pooled falloff.  If pooled falloff, limits max damage per block.
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    //.Exponential drops off exponentially.  Does not scale to max radius
                    ArmOnlyOnHit = false, // Detonation only is available, After it hits something, when this is true. IE, if shot down, it won't explode.
                    MinArmingTime = 60, // In ticks, before the Ammo is allowed to explode, detonate or similar; This affects shrapnel spawning.
                    NoVisuals = false,
                    NoSound = false,
                    ParticleScale = 1,
                    CustomParticle = "Explosion_AmmunitionMedium", // Particle SubtypeID, from your Particle SBC
                    CustomSound = "HWR_LargeExplosion", // SubtypeID from your Audio SBC, not a filename
                    Shape = Diamond, // Round or Diamond shape.  Diamond is more performance friendly.
                }, 
            },
            Trajectory = new TrajectoryDef 
			{
                Guidance = TravelTo, // None, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                MaxLifeTime = 1500, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 200, // voxel phasing if you go above 5100
                MaxTrajectory = 3000f, // Max Distance the projectile or beam can Travel.
                GravityMultiplier = 1.1f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable. Natural Gravity Only.
                Smarts = new SmartsDef
                {
                    ScanRange = 1500, // 0 disables projectile screening, the max range that this projectile will be seen at by defending grids (adds this projectile to defenders lookup database). 
                    NoSteering = true, // this disables target follow and instead travel straight ahead (but will respect offsets).
				},
			},
            AmmoGraphics = new GraphicDef 
			{
                ModelName = "\\Models\\Cubes\\Large\\missileBattery01\\mediumMissile01_model.mwm", // Model Path goes here.  "\\Models\\Ammo\\Starcore_Arrow_Missile_Large"
                VisualProbability = 1f, // %
                Particles = new AmmoParticleDef
                {
                    Ammo = new ParticleDef
                    {
                        Name = "MD_BulletGlowMedRed", //ShipWelderArc
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 0.5f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0.5f, end: 2f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.05f, end: 0.05f), // adds random value to default width (negatives shrinks width)
					DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 15f, //
                        Width = 0.4f, //
                        Color = Color(red: 50, green: 20, blue: 5f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
                        DecayTime = 180, // In Ticks. 1 = 1 Additional Tracer generated per motion, 33 is 33 lines drawn per projectile. Keep this number low.
                        Color = Color(red: 1.5f, green: 1.5f, blue: 1.5f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        Back = false,
                        CustomWidth = 0.5f,
                        UseWidthVariance = false,
                        UseColorFade = true,
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef 
			{
                TravelSound = "MXA_Archer_Travel", // SubtypeID for your Sound File. Travel, is sound generated around your Projectile in flight
                HitSound = "DOK_MissileExplosion",
                ShotSound = "",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },	
        };
        private AmmoDef Missiles_HeavyMissile_Old => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "Missiles_HeavyMissile", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Missiles_HeavyMissile", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 1f, // Direct damage; one steel plate is worth 100.
            Mass = 400f, // In kilograms; how much force the impact will apply to the target.
            Health = 10, // How much damage the projectile can take from other projectiles (base of 1 per hit) before dying; 0 disables this and makes the projectile untargetable.
            HardPointUsable = true, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = false, // If you enable this you can remove the damagescale section entirely.
            Sync = new SynchronizeDef
            {
                Full = false, // Be careful, do not use on high fire rate weapons or ammos with many simultaneous fragments. This will send position updates twice per second per projectile/fragment and sync target (grid/block) changes.
                PointDefense = true, // Server will inform clients of what projectiles have died by PD defense and will trigger destruction.
                OnHitDeath = true, // Server will inform clients when projectiles die due to them hitting something and will trigger destruction.
            },
            DamageScales = new DamageScaleDef 
			{
                DamageVoxels = false, // Whether to damage voxels.
                HealthHitModifier = 1, // How much Health to subtract from another projectile on hit; defaults to 1 if zero or less.
                Characters = -1f, // Character damage multiplier; defaults to 1 if zero or less.
                // For the following modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01f = 1% damage, 2 = 200% damage.
                Grids = new GridSizeDef
                {
                    Large = -1f, // Multiplier for damage against large grids.
                    Small = 0.04f, // 1/125
                },
                Armor = new ArmorDef
                {
                    Armor = -1f, // Multiplier for damage against all armor. This is multiplied with the specific armor type multiplier (light, heavy).
                    Light = -1f, // Multiplier for damage against light armor.
                    Heavy = -1f, // Multiplier for damage against heavy armor.
                    NonArmor = -1f, // Multiplier for damage against every else.
                },
                DamageType = new DamageTypes // Damage type of each element of the projectile's damage; Kinetic, Energy
                {
                    Base = Kinetic, // Base Damage uses this
                    AreaEffect = Energy,
                    Detonation = Energy,
                    Shield = Energy, // Damage against shields is currently all of one type per projectile. Shield Bypass Weapons, always Deal Energy regardless of this line
                },
				Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
            },
            AreaOfDamage = new AreaOfDamageDef 
			{
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 6f, // Radius of AOE effect, in meters.
                    Damage = 20000f,
                    Depth = 6f, // Max depth of AOE effect, in meters. 0=disabled, and AOE effect will reach to a depth of the radius value
                    MaxAbsorb = 0f, // Soft cutoff for damage, except for pooled falloff.  If pooled falloff, limits max damage per block.
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    //.Exponential drops off exponentially.  Does not scale to max radius
                    ArmOnlyOnHit = true, // Detonation only is available, After it hits something, when this is true. IE, if shot down, it won't explode.
                    MinArmingTime = 60, // In ticks, before the Ammo is allowed to explode, detonate or similar; This affects shrapnel spawning.
                    NoVisuals = false,
                    NoSound = false,
                    ParticleScale = 1,
                    CustomParticle = "Explosion_AmmunitionSmall", // Particle SubtypeID, from your Particle SBC
                    CustomSound = "HWR_LargeExplosion", // SubtypeID from your Audio SBC, not a filename
                    Shape = Diamond, // Round or Diamond shape.  Diamond is more performance friendly.
                }, 
            },
            Trajectory = new TrajectoryDef 
			{
                Guidance = Smart, // None, Remote, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                TargetLossDegree = 30, // Degrees, Is pointed forward
                TargetLossTime = 1, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                MaxLifeTime = 1500, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                AccelPerSec = 100f, // Meters Per Second. This is the spawning Speed of the Projectile, and used by turning.
                DesiredSpeed = 350, // voxel phasing if you go above 5100
                MaxTrajectory = 3000f, // Max Distance the projectile or beam can Travel.
                SpeedVariance = Random(start: 0, end: 20), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
                RangeVariance = Random(start: 0, end: 100), // subtracts value from MaxTrajectory
                Smarts = new SmartsDef
                {
                    Inaccuracy = 10f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 3f, // controls how responsive tracking is.
                    MaxLateralThrust = 0.2f, // controls how sharp the trajectile may turn
                    TrackingDelay = 0, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
                    CheckFutureIntersection = false, // Utilize obstacle avoidance for drones
                    MaxTargets = 2, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
                    Roam = false, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
                    OffsetRatio = 0f, // The ratio to offset the random direction (0 to 1) 
                    OffsetTime = 0, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..)
                },
            },
            AmmoGraphics = new GraphicDef 
			{
                ModelName = "\\Models\\Cubes\\Large\\missileBattery01\\mediumMissile01_model.mwm", // Model Path goes here.  "\\Models\\Ammo\\Starcore_Arrow_Missile_Large"
                VisualProbability = 1f, // %
                Particles = new AmmoParticleDef
                {
                    Ammo = new ParticleDef
                    {
                        Name = "MD_BulletGlowMedRed", //ShipWelderArc
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 0.5f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0.5f, end: 2f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.05f, end: 0.05f), // adds random value to default width (negatives shrinks width)
					DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 15f, //
                        Width = 0.4f, //
                        Color = Color(red: 50, green: 20, blue: 5f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
                        DecayTime = 180, // In Ticks. 1 = 1 Additional Tracer generated per motion, 33 is 33 lines drawn per projectile. Keep this number low.
                        Color = Color(red: 1.5f, green: 1.5f, blue: 1.5f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        Back = false,
                        CustomWidth = 0.5f,
                        UseWidthVariance = false,
                        UseColorFade = true,
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef 
			{
                TravelSound = "MXA_Archer_Travel", // SubtypeID for your Sound File. Travel, is sound generated around your Projectile in flight
                HitSound = "DOK_MissileExplosion",
                ShotSound = "",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },	
        };
    }
}