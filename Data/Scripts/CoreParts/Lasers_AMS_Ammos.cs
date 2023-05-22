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
        private AmmoDef Lasers_AMS => new AmmoDef //purple pulse low power for PDT
        {
            AmmoMagazine = "Energy",
            AmmoRound = "Lasers_AMS",
            EnergyCost = 0.63f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel    (15 * 0.05 * 3600/60/60 = 0.75MW per tick)
            BaseDamage = 50f,
            HardPointUsable = true,
			NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            DamageScales = new DamageScaleDef 
			{
                DamageVoxels = false, // Whether to damage voxels.
				HealthHitModifier = 0.5, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                Grids = new GridSizeDef
                {
                    Large = 0f,
                    Small = 0f,
                },
                Armor = new ArmorDef
                {
                    Armor = 0f,
                    Light = 0f,
                    Heavy = 0f,
                    NonArmor = 0f,
                },
				DamageType = new DamageTypes
				{
					Base = Energy,
					AreaEffect = Energy,
					Detonation = Energy,
					Shield = Energy,
                },
            },
            Beams = new BeamDef 
			{
                Enable = true, // Enable beam behaviour. Please have 3600 RPM, when this Setting is enabled. Please do not fire Beams into Voxels.
                VirtualBeams = false, // Only one damaging beam, but with the effectiveness of the visual beams combined (better performance).
                ConvergeBeams = false, // When using virtual beams, converge the visual beams to the location of the real beam.
                RotateRealBeam = false, // The real beam is rotated between all visual beams, instead of centered between them.
                OneParticle = true, // Only spawn one particle hit per beam weapon.
				FakeVoxelHitTicks = 30, // If this beam hits/misses a voxel it assumes it will continue to do so for this many ticks at the same hit length and not extend further within this window.  This can save up to n times worth of cpu.
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
                Particles = new AmmoParticleDef
                {
                    Hit = new ParticleDef
                    {
                        Name = "LaserHitParticlesPDT",//LaserHitParticlesGimbal
                        ApplyToShield = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1f),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1,
                            HitPlayChance = 1,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0.75f, end: 1.25f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -.01f, end: 0.01f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 1f,
                        Width = .1f,
                        Color = Color(red: 10, green: 2, blue: 30, alpha: 1f),
                        Textures = new[] {"WeaponLaser",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
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