using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.AmmoDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef.SpawnType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.ShapeDef.Shapes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef.SkipMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.PatternDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.PatternDef.PatternModes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef.TimedSpawnDef.PointTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.GuidanceType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.ShieldDef.ShieldType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.Falloff;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.AoeShape;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.PushPullDef.Force;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.TracerBaseDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.Texture;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DamageTypes.Damage;

namespace Scripts
{ // Don't edit above this line
    partial class Parts
    {
        private AmmoDef LargeCalibreAmmo => new AmmoDef
        {
            AmmoMagazine = "LargeCalibreAmmo",
            AmmoRound = "LargeCalibreAmmo",
            HybridRound = false, //AmmoMagazine based weapon with energy cost
            EnergyCost = 0f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel
            BaseDamage = 5500f, // breaks 1 HA or 1 LA cubes in 1 round
            Mass = 300f, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 200000f,
            DecayPerShot = 0f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 0,
            IgnoreWater = false,

            Shape = Common_Ammos_Shape_None,
			
            ObjectsHit = Common_Ammos_ObjectsHit_None,
			
            Fragment = Common_Ammos_Fragment_None,
			
            Pattern = Common_Ammos_Pattern_None,
						
            DamageScales = new DamageScaleDef {
                //This is additional damage done and does not directly affect the speed that the ammo's health pool depletes.
				MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with current integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                SelfDamage = false, // true = allow self damage.
                HealthHitModifier = 1, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                VoxelHitModifier = -1,
                Characters = 0.25f,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                FallOff = new FallOffDef
                {
                    Distance = 0f, // Distance at which max damage begins falling off.
                    MinMultipler = 1f, // value from 0.0f to 1f where 0.1f would be a min damage of 10% of max damage.
                },
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = 0.75f,
                },
                Armor = new ArmorDef
                {
                    Armor = -1f,
                    Light = 0.5f,
                    Heavy = 3f,
                    NonArmor = 1f,
                },
                Shields = new ShieldDef
                {
                    Modifier = -1f,
                    Type = Default, // Default, Heal //Bypass
                    BypassModifier = -1f,
                },
				DamageType = new DamageTypes
				{
					Base = Kinetic,
					AreaEffect = Kinetic,
					Detonation = Kinetic,
					Shield = Kinetic,
                },
				
                //Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
				
            },
			
			AreaOfDamage = Common_Ammos_AreaOfDamage_None,
			
			Ewar = Common_Ammos_Ewar_None,

            Beams = Common_Ammos_Beams_None,

            Trajectory = new TrajectoryDef {
                Guidance = None,
                TargetLossDegree = 0f,
                TargetLossTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                MaxLifeTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 0f,
                DesiredSpeed = 600f, // DO NOT SET HIGHER THAN 4100
                MaxTrajectory = 2400f,
                DeaccelTime = 0, // 0 is disabled, a value causes the projectile to come to rest overtime, (Measured in game ticks, 60 = 1 second)
                GravityMultiplier = 0f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable.
                SpeedVariance = Random(start: 0, end: 20), // subtracts value from DesiredSpeed
                RangeVariance = Random(start: 0, end: 50), // subtracts value from MaxTrajectory
                MaxTrajectoryTime = 0, // How long the weapon must fire before it reaches MaxTrajectory.
                
				Smarts = Common_Ammos_Trajectory_Smarts_None,
                
				Mines = Common_Ammos_Trajectory_Mines_None,
				
            },

            AmmoGraphics = new GraphicDef {
                ModelName = "",
                VisualProbability = 1f,
                ShieldHitDraw = true,
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
                        Name = "Explosion_AmmunitionSmall", //Explosion_AmmunitionLarge  Collision_Sparks  Explosion_Warhead_50
                        ApplyToShield = true,
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1.5f,
                            HitPlayChance = 1f,
                        },
                    },
                    Eject = new ParticleDef
                    {
                        Name = "",
                        ApplyToShield = true,
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0.75f, end: 2f), // multiply the color by random values within range.
                    WidthVariance = Random(start: 0f, end: 0f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 16f,
                        Width = 0.45f,
                        Color = Color(red: 60, green: 20, blue: 5, alpha: 10),
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "AryxBallisticTracer",
                        },
                        TextureMode = Normal, // Normal, Cycle, Chaos, Wave
                        Segmentation = new SegmentDef
                        {
                            Enable = false, // If true Tracer TextureMode is ignored
                            Textures = new[] {
								"",
                            },
                            SegmentLength = 0f, // Uses the values below.
                            SegmentGap = 0f, // Uses Tracer textures and values
                            Speed = 1f, // meters per second
                            Color = Color(red: 1, green: 2, blue: 2.5f, alpha: 1),
                            WidthMultiplier = 1f,
                            Reverse = false,
                            UseLineVariance = true,
                            WidthVariance = Random(start: 0f, end: 0f),
                            ColorVariance = Random(start: 0f, end: 0f)
                        }
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {
                            "WeaponLaser",
                        },
                        TextureMode = Normal,
                        DecayTime = 40,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Back = false,
                        CustomWidth = 0,
                        UseWidthVariance = true,
                        UseColorFade = true,
                    },
                    OffsetEffect = new OffsetEffectDef
                    {
                        MaxOffset = 0,// 0 offset value disables this effect
                        MinLength = 0.2f,
                        MaxLength = 3,
                    },
                },
            },

            AmmoAudio = new AmmoAudioDef {
                TravelSound = "MD_Artillary_shell_fly",
                HitSound = "HWR_SmallExplosion",
                ShieldHitSound = "",
                PlayerHitSound = "HWR_SmallExplosion",
                VoxelHitSound = "ArcHeavyImpactSoil",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            }, // Don't edit below this line
			
			Ejection = Common_Ammos_Ejection_None,
			
        };
    }
}