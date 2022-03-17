using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.AmmoDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef.SpawnType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.ShapeDef.Shapes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.GuidanceType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.ShieldDef.ShieldType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.TracerBaseDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.Texture;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DamageTypes.Damage;

using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaDamageDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaDamageDef.AreaEffectType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaDamageDef.EwarFieldsDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaDamageDef.EwarFieldsDef.PushPullDef.Force;


namespace Scripts
{ // Don't edit above this line
    partial class Parts
    {
        private AmmoDef Lasers_AMS => new AmmoDef //purple pulse low power for PDT
        {
            AmmoMagazine = "Energy",
            AmmoRound = "Lasers_AMS",
            EnergyCost = 0.1f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel    (15 * 0.05 * 3600/60/60 = 0.75MW per tick)
            BaseDamage = 50f,
            HardPointUsable = true,
            DamageScales = new DamageScaleDef
            {
                HealthHitModifier = 0.5, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                FallOff = new FallOffDef
                {
                    Distance = 500f, // Distance at which max damage begins falling off.
                    MinMultipler = 0.75f, // value from 0.0f to 1f where 0.1f would be a min damage of 10% of max damage.
                },
				DamageType = new DamageTypes
				{
					Base = Energy,
					AreaEffect = Energy,
					Detonation = Energy,
					Shield = Energy,
                },
				
                Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
				
            },
            Beams = new BeamDef
            {
                Enable = true,
                OneParticle = true, // Only spawn one particle hit per beam weapon.
            },
            Trajectory = new TrajectoryDef
            {
                MaxLifeTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                DesiredSpeed = 0,
                Guidance = None,
                MaxTrajectory = 1200f,
                RangeVariance = Random(start: 0, end: 100), // subtracts value from MaxTrajectory
            },
            AmmoGraphics = new GraphicDef
            {
                ModelName = "",
                VisualProbability = 1f,
                ShieldHitDraw = true,
                Particles = new AmmoParticleDef
                {
                    Hit = new ParticleDef
                    {
                        Name = "LaserHitParticlesPDT",//LaserHitParticlesGimbal
                        ApplyToShield = true,
                        ShrinkByDistance = true,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1f),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 500,
                            MaxDuration = 0,
                            Scale = 1,
                            HitPlayChance = 1,
                        },
                    },
                },
                Lines = new LineDef
                {
                    TracerMaterial = "WeaponLaser", // WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    ColorVariance = Random(start: 0.75f, end: 1.25f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -.01f, end: 0.01f), // adds random value to default width (negatives shrinks width)

                   Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 1f,
                        Width = .1f,
                        Color = Color(red: 10, green: 2, blue: 30, alpha: 1f),
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "WeaponLaser",
                        },
                        TextureMode = Normal, // Normal, Cycle, Chaos, Wave
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Material = "WeaponLaser",
                        DecayTime = 10,
						Color = Color(red: 10, green: 2, blue: 30, alpha: 1f),
                        Back = false,
                        CustomWidth = 0.05f,
                        UseWidthVariance = true,
                        UseColorFade = true,
                    },
                },
            },
        }; 
    }
}
