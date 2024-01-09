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
        private AmmoDef Missiles_Missile => new AmmoDef
        {
            AmmoMagazine = "Missiles_Missile",
            AmmoRound = "Missiles_Missile",
            BaseDamage = 1f,
            Mass = 200f, // in kilograms
            Health = 1f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 50f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = false, // If you enable this you can remove the damagescale section entirely.
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the visual Line Length if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = 5, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
            },
			DamageScales = new DamageScaleDef 
			{
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                HealthHitModifier = 0.5, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                Characters = -1f,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
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
				DamageType = new DamageTypes
				{
					Base = Kinetic,
					AreaEffect = Energy,
					Detonation = Energy,
					Shield = Energy,
                },
                Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
            },
            AreaOfDamage = new AreaOfDamageDef 
			{
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 5f,
                    Damage = 12000f,
                    Depth = 5f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    ArmOnlyOnHit = true,
                    MinArmingTime = 30,
                    NoVisuals = false,
                    NoSound = false,
                    ParticleScale = 1,
                    CustomParticle = "particleName",
                    CustomSound = "soundName",
                    Shape = Diamond, // Round or Diamond shape.  Diamond is more performance friendly.
                },
            },
            Trajectory = new TrajectoryDef 
			{
                Guidance = Smart,
                MaxLifeTime = 1200, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 300f,
                DesiredSpeed = 450,
                MaxTrajectory = 2800f,
                SpeedVariance = Random(start: 0, end: 20), // subtracts value from DesiredSpeed
                RangeVariance = Random(start: 0, end: 100), // subtracts value from MaxTrajectory
				TotalAcceleration = 0, // 0 means no limit, something to do due with a thing called delta and something called v.
				Smarts = new SmartsDef
                {
                    SteeringLimit = 0, // 0 means no limit, value is in degrees, good starting is 150.  This enable advanced smart "control", cost of 3 on a scale of 1-5, 0 being basic smart.
                    Inaccuracy = 5f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 3f, // controls how responsive tracking is, recommended value 3-5.
                    MaxLateralThrust = 0.5, // controls how sharp the projectile may turn, this is the cheaper but less realistic version of SteeringLimit, cost of 2 on a scale of 1-5, 0 being basic smart.
                    NavAcceleration = 0, // helps influence how the projectile steers, 0 defaults to 1/2 Aggressiveness value or 0 if its 0, a value less than 0 disables this feature. 
                    TrackingDelay = 10, // Measured in Shape diameter units traveled.
                    AccelClearance = false, // Setting this to true will prevent smart acceleration until it is clear of the grid and tracking delay has been met (free fall).
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
                    CheckFutureIntersection = false, // Utilize obstacle avoidance for drones/smarts
                    FutureIntersectionRange = 0, // Range in front of the projectile at which it will detect obstacle.  If set to zero it defaults to DesiredSpeed + Shape Diameter
                    MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
                    Roam = false, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
                    OffsetRatio = 0.5f, // The ratio to offset the random direction (0 to 1) 
                    OffsetTime = 30, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..)
                    OffsetMinRange = 700, // The range from target at which offsets are no longer active
                    FocusOnly = false, // only target the constructs Ai's focus target. Don't use with OverideTarget.
                    FocusEviction = false, // If FocusOnly and this to true will force smarts to lose target when there is no focus target
                    ScanRange = 2000, // 0 disables projectile screening, the max range that this projectile will be seen at by defending grids (adds this projectile to defenders lookup database). 
                    NoSteering = false, // this disables target follow and instead travel straight ahead (but will respect offsets).
                    MinTurnSpeed = 100, // set this to a reasonable value to avoid projectiles from spinning in place or being too aggressive turing at slow speeds 
                    NoTargetApproach = false, // If true approaches can begin prior to the projectile ever having had a target.
                    AltNavigation = true, // If true this will swap the default navigation algorithm from ProNav to ZeroEffort Miss.  Zero effort is more direct/precise but less cinematic 
                },
            },
            AmmoGraphics = new GraphicDef 
			{
                ModelName = "\\Models\\Missiles\\MXA_Archer_Missile.mwm",
                VisualProbability = 1f,
                Decals = new DecalDef
                {
                    MaxAge = 3600,
                    Map = new[]
                    {
                        new TextureMapDef
                        {
                            HitMaterial = "Metal",
                            DecalMaterial = "Missile",
                        },
                        new TextureMapDef
                        {
                            HitMaterial = "Glass",
                            DecalMaterial = "Missile",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Soil",
                            DecalMaterial = "Missile",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Wood",
                            DecalMaterial = "Missile",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "GlassOpaque",
                            DecalMaterial = "Missile",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Stone",
                            DecalMaterial = "Missile",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Rock",
                            DecalMaterial = "Missile",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Ice",
                            DecalMaterial = "Missile",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Soil",
                            DecalMaterial = "Missile",
                        },
                    },
                },
                Particles = new AmmoParticleDef
                {
					Ammo = new ParticleDef
                    {
                        Name = "MD_ArcherTrailSmoke", //Archer_MissileSmokeTrail MD_BulletGlowMedRed
                        Offset = Vector(x: 0, y: 0, z: 0f),
						DisableCameraCulling = false,// If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Scale = 0.5f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "MD_ArcherExplosion", //MXA_MissileExplosion
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
						DisableCameraCulling = false,// If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1f,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0f, end: 5f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.1f, end: 0.1f), // adds random value to default width (negatives shrinks width)
					DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 10f,
                        Width = 0.3f,
                        Color = Color(red: 30f, green: 6f, blue: 1.5f, alpha: 1f),
						AlwaysDraw = false, // Prevents this tracer from being culled.  Only use if you have a reason too (very long tracers/trails).
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = false,
						AlwaysDraw = true, // Prevents this tracer from being culled.  Only use if you have a reason too (very long tracers/trails).
                        Textures = new[] {
                            "WeaponLaser",
                        },
                        TextureMode = Normal,
                        DecayTime = 150,
                        Color = Color(red: 1.1f, green: 1.01f, blue: 1, alpha: 1f),
                        Back = false,
                        CustomWidth = 1f,
                        UseWidthVariance = true,
                        UseColorFade = true,
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef 
			{
                TravelSound = "MXA_Archer_Travel",
                HitSound = "HWR_SmallExplosion",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },			
        };

        private AmmoDef Missiles_Missile_NPC
        {
            get
            {
                var missile = Missiles_Missile;
                missile.AmmoRound = "Missiles_Missile_NPC";
                missile.Trajectory.Smarts.OverideTarget = true;
                return missile;
            }
        }
    }
}