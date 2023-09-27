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
        private AmmoDef Ballistics_HeavyCannon => new AmmoDef
        {
            AmmoMagazine = "Ballistics_HeavyCannon", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Ballistics_HeavyCannon", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 10000f, // Direct damage; one steel plate is worth 100.
            Mass = 500f, // In kilograms; how much force the impact will apply to the target.
            BackKickForce = 500000f, // Recoil. This is applied to the Parent Grid.
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = false, // If you enable this you can remove the damagescale section entirely.
            Sync = new SynchronizeDef
            {
                Full = false, // Be careful, do not use on high fire rate weapons or ammos with many simultaneous fragments. This will send position updates twice per second per projectile/fragment and sync target (grid/block) changes.
                PointDefense = false, // Server will inform clients of what projectiles have died by PD defense and will trigger destruction.
                OnHitDeath = false, // Server will inform clients when projectiles die due to them hitting something and will trigger destruction.
            },
            DamageScales = new DamageScaleDef 
			{
                //This is additional damage done and does not directly affect the speed that the ammo's health pool depletes.
                DamageVoxels = false, // Whether to damage voxels.
                HealthHitModifier = 5, // How much Health to subtract from another projectile on hit; defaults to 1 if zero or less.
				Characters = 0.0000001f, // Character damage multiplier; defaults to 1 if zero or less.
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = 0.75f,
                },
                Armor = new ArmorDef
                {
                    Armor = -1f, // Multiplier for damage against all armor. This is multiplied with the specific armor type multiplier (light, heavy).
                    Light = -1f, // Multiplier for damage against light armor.
                    Heavy = 2f, // Multiplier for damage against heavy armor.
                    NonArmor = -1f, // Multiplier for damage against every else.
                },
                DamageType = new DamageTypes // Damage type of each element of the projectile's damage; Kinetic, Energy
                {
                    Base = Kinetic, // Base Damage uses this
                    AreaEffect = Kinetic,
                    Detonation = Kinetic,
                    Shield = Kinetic, // Damage against shields is currently all of one type per projectile. Shield Bypass Weapons, always Deal Energy regardless of this line
                },
                Custom = Common_Ammos_DamageScales_Cockpits_BigNerf,
            },
            AreaOfDamage = new AreaOfDamageDef // Note AOE is only applied to the Player/Grid it hit (and nearby projectiles) not nearby grids/players.
            {
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 5f, // Radius of AOE effect, in meters.
                    Damage = 40000f,
                    Depth = 5f, // Max depth of AOE effect, in meters. 0=disabled, and AOE effect will reach to a depth of the radius value
                    MaxAbsorb = 0f, // Soft cutoff for damage, except for pooled falloff.  If pooled falloff, limits max damage per block.
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    //.Exponential drops off exponentially.  Does not scale to max radius
                    ArmOnlyOnHit = true, // Detonation only is available, After it hits something, when this is true. IE, if shot down, it won't explode.
                    MinArmingTime = 0, // In ticks, before the Ammo is allowed to explode, detonate or similar; This affects shrapnel spawning.
                    NoVisuals = false,
                    NoSound = false,
                    ParticleScale = 1,
                    CustomParticle = "Explosion_AmmunitionLarge", // Particle SubtypeID, from your Particle SBC
                    CustomSound = "soundName", // SubtypeID from your Audio SBC, not a filename
                    Shape = Diamond, // Round or Diamond shape.  Diamond is more performance friendly.
                }, 
            },
            Trajectory = new TrajectoryDef 
			{
                MaxLifeTime = 3600, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 600f, // voxel phasing if you go above 5100
                MaxTrajectory = 3300f, // Max Distance the projectile or beam can Travel.
                SpeedVariance = Random(start: 0, end: 20), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
                RangeVariance = Random(start: 0, end: 100), // subtracts value from MaxTrajectory
            },
			AmmoGraphics = new GraphicDef 
			{
                VisualProbability = 1f,
                Particles = new AmmoParticleDef
                {
                    Ammo = new ParticleDef
                    {
                        Name = "MD_BulletGlowMedRed", //ShipWelderArc
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "Explosion_AmmunitionLarge", //Explosion_AmmunitionLarge  Collision_Sparks  Explosion_Warhead_50
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1.5f,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0.75f, end: 2f), // multiply the color by random values within range.
                    DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 20f,
                        Width = 1.25f,
                        Color = Color(red: 120, green: 20, blue: 20, alpha: 1),
                        Textures = new[] {"AryxBallisticTracer",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
                        DecayTime = 120,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        UseColorFade = true,
                    },
                },
            },
			AmmoAudio = new AmmoAudioDef 
			{
                TravelSound = "MD_Artillary_shell_fly",
                HitSound = "HWR_LargeExplosion",
                PlayerHitSound = "HWR_LargeExplosion",
                VoxelHitSound = "HWR_LargeExplosion",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            }, // Don't edit below this line
        };
    }
}