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
		private AmmoDef NATO_25x184mm => new AmmoDef 
		{
            AmmoMagazine = "NATO_25x184mm",
            AmmoRound = "NATO_25x184mm", 
            BaseDamage = 70f,
            Mass = 1f, // in kilograms
            BackKickForce = 100f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
			NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = false, // If you enable this you can remove the damagescale section entirely.
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the visual Line Length if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = 10, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
            },
            DamageScales = new DamageScaleDef 
			{
                DamageVoxels = false, // Whether to damage voxels.
                HealthHitModifier = 3, 
                Characters = 0.2f,
                // For the following modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01f = 1% damage, 2 = 200% damage.
                Grids = new GridSizeDef
                {
                    Large = 1f,
                    Small = 1f,
                },
                Armor = new ArmorDef
                {
                    Armor = -1f,
                    Light = -1f, // Multiplier for damage against light armor.
                    Heavy = -1f,
                    NonArmor = -1f,
                },
                Deform = new DeformDef
                {
                    DeformType = NoDeform, //HitBlock, AllDamagedBlocks, NoDeform
                    DeformDelay = 30,
                },
                Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
            },
            Trajectory = new TrajectoryDef 
			{
                MaxLifeTime = 3600, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 1000, // voxel phasing if you go above 5100
                MaxTrajectory = 1700f, // Max Distance the projectile or beam can Travel.
                SpeedVariance = Random(start: 0, end: 50), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
                RangeVariance = Random(start: 0, end: 300), // subtracts value from MaxTrajectory
            },
            AmmoGraphics = new GraphicDef 
			{
                VisualProbability = 0.6f,
                Decals = new DecalDef
                {
                    MaxAge = 3600,
                    Map = new[]
                    {
                        new TextureMapDef
                        {
                            HitMaterial = "Metal",
                            DecalMaterial = "GunBullet",
                        },
                        new TextureMapDef
                        {
                            HitMaterial = "Glass",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Soil",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Wood",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "GlassOpaque",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Stone",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Rock",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Ice",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Soil",
                            DecalMaterial = "GunBullet",
                        },
                    },
                },
                Particles = new AmmoParticleDef
                {
                    Hit = new ParticleDef
                    {
                        Name = "MaterialHit_Metal_GatlingGun", //MaterialHit_Metal
                        ApplyToShield = false,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        DisableCameraCulling = true, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Scale = 0.75f,
                            HitPlayChance = 0.2f,
                        },
                    },
                },
                Lines = new LineDef 
				{
                    ColorVariance = Random(start: 0f, end: 0f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.05f, end: 0.05f), // adds random value to default width (negatives shrinks width)
                    DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 25f,
                        Width = 0.10f,
                        FactionColor = DontUse, // DontUse, Foreground, Background.
                        Color = Color(red: 22f, green: 10f, blue: 10f, alpha: 1),
                        Textures = new[] {"ProjectileTrailLine",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef 
			{
                HitSound = "MD_BulletHit",
                HitPlayChance = 0.15f,
			},
        };
    }
}