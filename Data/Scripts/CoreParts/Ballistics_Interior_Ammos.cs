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
        private AmmoDef Ballistics_Interior => new AmmoDef 
		{
            AmmoMagazine = "NATO_5p56x45mm",
            AmmoRound = "Ballistics_Interior",
            BaseDamage = 25f,
            Mass = 1f, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 2f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
            Trajectory = new TrajectoryDef 
			{
                Guidance = None,
                DesiredSpeed = 900,
                MaxTrajectory = 900f,
                SpeedVariance = Random(start: 0, end: 20), // subtracts value from DesiredSpeed
                RangeVariance = Random(start: 0, end: 50), // subtracts value from MaxTrajectory
            },
            AmmoGraphics = new GraphicDef 
			{
                ModelName = "",
                VisualProbability = 1f,
                Decals = new DecalDef
                {
                    MaxAge = 3600,
                    Map = new[]
                    {
                        new TextureMapDef
                        {
                            HitMaterial = "Metal",
                            DecalMaterial = "RifleBullet",
                        },
                        new TextureMapDef
                        {
                            HitMaterial = "Glass",
                            DecalMaterial = "RifleBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Soil",
                            DecalMaterial = "RifleBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Wood",
                            DecalMaterial = "RifleBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "GlassOpaque",
                            DecalMaterial = "RifleBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Stone",
                            DecalMaterial = "RifleBullet",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Rock",
                            DecalMaterial = "RifleBullet",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Ice",
                            DecalMaterial = "RifleBullet",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Soil",
                            DecalMaterial = "RifleBullet",
                        },
                    },
                },
                Particles = new AmmoParticleDef
                {
                    Ammo = new ParticleDef
                    {
                        Name = "", //ShipWelderArc
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "Hit_BasicAmmoSmall",
                        ApplyToShield = true,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1f,
                            HitPlayChance = 0.75f,
                        },
                    },
                    Eject = new ParticleDef
                    {
                        Name = "Shell_Casings",
                        ApplyToShield = false,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef 
				{
                    ColorVariance = Random(start: 1f, end: 10f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.01f, end: 0.01f), // adds random value to default width (negatives shrinks width)
					DropParentVelocity = false, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 15f,
                        Width = 0.03f,
                        Color = Color(red: 4.4f, green: 2.8f, blue: 2.0f, alpha: 1),
						Textures = new[] {"ProjectileTrailLine",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef 
			{
                TravelSound = "",
                HitSound = "ArcImpMetalMetalCat0",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 0.1f,
                HitPlayShield = true,
            }, // Don't edit below this line
        };
    }
}