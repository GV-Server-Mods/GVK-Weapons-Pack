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
		private AmmoDef NATO_25x184mm => new AmmoDef {

            AmmoMagazine = "NATO_25x184mm",
            AmmoRound = "NATO_25x184mm", 
            HybridRound = false, //AmmoMagazine based weapon with energy cost
            EnergyCost = 0f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel
            BaseDamage = 70f,
            Mass = 1f, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 100f,
            DecayPerShot = 0f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 0,
            IgnoreWater = true,

            Shape = Common_Ammos_Shape_None,
			
            ObjectsHit = Common_Ammos_ObjectsHit_None,
			
            Fragment = Common_Ammos_Fragment_None,
			
            Pattern = Common_Ammos_Pattern_None,
						
            DamageScales = new DamageScaleDef {
                MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with currently integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                SelfDamage = false, // true = allow self damage.
                HealthHitModifier = 3, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                VoxelHitModifier = -1,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Characters = 0.2f,
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
                    Light = -1f,
                    Heavy = -1f,
                    NonArmor = -1f,
                },
                Shields = new ShieldDef
                {
                    Modifier = -1f,
                    Type = Default, // Default, Heal
                    BypassModifier = -1f,
                },
				DamageType = new DamageTypes
				{
					Base = Kinetic,
					AreaEffect = Kinetic,
					Detonation = Kinetic,
					Shield = Kinetic,
                },
				
                Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
				
            },
			
			AreaOfDamage = Common_Ammos_AreaOfDamage_None,
			
			Ewar = Common_Ammos_Ewar_None,

            Beams = Common_Ammos_Beams_None,

            Trajectory = new TrajectoryDef {
                Guidance = None,
                TargetLossDegree = 0,
                TargetLossTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                MaxLifeTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 0f,
                DesiredSpeed = 1000,
                MaxTrajectory = 1700f,
                DeaccelTime = 0, // 0 is disabled, a value causes the projectile to come to rest overtime, (Measured in game ticks, 60 = 1 second)
                GravityMultiplier = 0f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable. Natural Gravity Only.                SpeedVariance = Random(start: 0, end: 50), // subtracts value from DesiredSpeed
                SpeedVariance = Random(start: 0, end: 10), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
                RangeVariance = Random(start: 0, end: 300), // subtracts value from MaxTrajectory
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
                        Name = "", //ShipWelderArc
                        Color = Color(red: 1, green: 1, blue: 0.5f, alpha: 32),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 5000,
                            MaxDuration = 1,
                            Scale = 1,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "MaterialHit_Metal_GatlingGun", //MaterialHit_Metal
                        ApplyToShield = true,
                        ShrinkByDistance = true,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 500,
                            MaxDuration = 0.5f,
                            Scale = 0.75f,
                            HitPlayChance = 0.2f,
                        },
                    },
                },
                Lines = new LineDef {
                    ColorVariance = Random(start: 0f, end: 0f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.1f, end: 0.1f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 8f,
                        Width = 0.10f,
                        Color = Color(red: 22f, green: 10f, blue: 10f, alpha: 1),
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "ProjectileTrailLine",
                        },
                        TextureMode = Normal, // Normal, Cycle, Chaos, Wave
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
                TravelSound = "",
                HitSound = "MD_BulletHit",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 0.15f,
                HitPlayShield = true,
			},
			
			Ejection = Common_Ammos_Ejection_None,
			
        };
    }
}