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
{
    partial class Parts
    {
        private AmmoDef LargeCalibreAmmo => new AmmoDef
        {
            AmmoMagazine = "LargeCalibreAmmo",
            AmmoRound = "LargeCalibreAmmo",
            BaseDamage = 6000f, // breaks 1 HA or 1 LA cubes in 1 round
            Mass = 300f, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 200000f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = false, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = false, // If you enable this you can remove the damagescale section entirely.
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the Line Length of 1 if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = 5, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
            },
            DamageScales = new DamageScaleDef 
			{
                //This is additional damage done and does not directly affect the speed that the ammo's health pool depletes.
				MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with current integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                HealthHitModifier = 1, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                Characters = 0.25f,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
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
				DamageType = new DamageTypes
				{
					Base = Kinetic,
					AreaEffect = Kinetic,
					Detonation = Kinetic,
					Shield = Kinetic,
                },
                Deform = new DeformDef
                {
                    DeformType = HitBlock,
                    DeformDelay = 30,
                },
                //Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
            },
            Trajectory = new TrajectoryDef 
			{
                Guidance = None,
                MaxLifeTime = 3600, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 600f, // DO NOT SET HIGHER THAN 4100
                MaxTrajectory = 2400f,
                SpeedVariance = Random(start: 0, end: 20), // subtracts value from DesiredSpeed
                RangeVariance = Random(start: 0, end: 50), // subtracts value from MaxTrajectory
            },
            AmmoGraphics = new GraphicDef 
			{
                ModelName = "",
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
                        Name = "MD_155_Hit", //Explosion_AmmunitionLarge  Collision_Sparks  Explosion_Warhead_50
                        ApplyToShield = false,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1f,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0.75f, end: 2f), // multiply the color by random values within range.
                    WidthVariance = Random(start: 0f, end: 0f), // adds random value to default width (negatives shrinks width)
					DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 16f,
                        Width = 0.45f,
                        Color = Color(red: 60, green: 20, blue: 5, alpha: 10),
                        Textures = new[] {"AryxBallisticTracer",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
                        DecayTime = 40,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Back = false,
                        CustomWidth = 0,
                        UseWidthVariance = true,
                        UseColorFade = true,
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef 
			{
                TravelSound = "MD_Artillary_shell_fly",
                HitSound = "DOK_CannonHit",
                ShieldHitSound = "",
                PlayerHitSound = "DOK_CannonHit",
                VoxelHitSound = "ArcHeavyImpactSoil",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },		
        };

        private AmmoDef Ballistics_Cannon_NPC => new AmmoDef
        {
            AmmoMagazine = "LargeCalibreAmmo",
            AmmoRound = "LargeCalibreAmmo", //LargeCalibreAmmo the mag and round need to match (for the base ammo)
            BaseDamage = 6000f, // breaks 1 HA or 1 LA cubes in 1 round
            Mass = 300f, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 200000f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = false, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = false, // If you enable this you can remove the damagescale section entirely.
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the visual Line Length if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = 5, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
            },
            Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "Ballistics_Cannon_NPC_Fragment1", // AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = .1f, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = true, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards), value is read from parent ammo type.
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                ArmWhenHit = false, // Setting this to true will arm the projectile when its shot by other projectiles.
                AdvOffset = Vector(x: 0, y: 0, z: 0), // advanced offsets the fragment by xyz coordinates relative to parent, value is read from fragment ammo type.
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below, unless ArmWhenHit or Eol ArmOnlyOnHit is set to true then both kinds of frags are active
                {
                    Enable = true, // Enables TimedSpawns mechanism
                    Interval = 0, // Time between spawning fragments, in ticks, 0 means every tick, 1 means every other
                    StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 1, // Max number of fragment children to spawn
                    Proximity = 2400, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = true, // Parent dies once after it spawns its last child.
                    PointAtTarget = true, // Start fragment direction pointing at Target
                    PointType = Direct, // Point accuracy, Direct (straight forward), Lead (always fire), Predict (only fire if it can hit)
                    DirectAimCone = 15f, //Aim cone used for Direct fire, in degrees
                    GroupSize = 0, // Number of spawns in each group
                    GroupDelay = 0, // Delay between each group.
                },
            },
            DamageScales = new DamageScaleDef 
			{
                //This is additional damage done and does not directly affect the speed that the ammo's health pool depletes.
				MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with current integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                HealthHitModifier = 1, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                Characters = 0.25f,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
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
				DamageType = new DamageTypes
				{
					Base = Kinetic,
					AreaEffect = Kinetic,
					Detonation = Kinetic,
					Shield = Kinetic,
                },
                Deform = new DeformDef
                {
                    DeformType = HitBlock,
                    DeformDelay = 30,
                },
                //Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
            },
            Trajectory = new TrajectoryDef 
			{
				Guidance = Smart, // None, Remote, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                MaxLifeTime = 3000, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 600, // DO NOT SET HIGHER THAN 4100
                MaxTrajectory = 2400f,
                Smarts = new SmartsDef
                {
                    SteeringLimit = 0, // 0 means no limit, value is in degrees, good starting is 150.  This enable advanced smart "control", cost of 3 on a scale of 1-5, 0 being basic smart.
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 0f, // controls how responsive tracking is, recommended value 3-5.
                    MaxLateralThrust = 0, // controls how sharp the projectile may turn, this is the cheaper but less realistic version of SteeringLimit, cost of 2 on a scale of 1-5, 0 being basic smart.
                    NavAcceleration = 0, // helps influence how the projectile steers, 0 defaults to 1/2 Aggressiveness value or 0 if its 0, a value less than 0 disables this feature. 
                    TrackingDelay = 0, // Measured in Shape diameter units traveled.
                    AccelClearance = false, // Setting this to true will prevent smart acceleration until it is clear of the grid and tracking delay has been met (free fall).
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
                    CheckFutureIntersection = false, // Utilize obstacle avoidance for drones/smarts
                    FutureIntersectionRange = 0, // Range in front of the projectile at which it will detect obstacle.  If set to zero it defaults to DesiredSpeed + Shape Diameter
                    MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
                    Roam = false, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
                    OffsetRatio = 0f, // The ratio to offset the random direction (0 to 1) 
                    OffsetTime = 0, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..)
                    OffsetMinRange = 0, // The range from target at which offsets are no longer active
                    FocusOnly = false, // only target the constructs Ai's focus target
                    FocusEviction = false, // If FocusOnly and this to true will force smarts to lose target when there is no focus target
                    ScanRange = 0, // 0 disables projectile screening, the max range that this projectile will be seen at by defending grids (adds this projectile to defenders lookup database). 
                    NoSteering = true, // this disables target follow and instead travel straight ahead (but will respect offsets).
                    MinTurnSpeed = 0, // set this to a reasonable value to avoid projectiles from spinning in place or being too aggressive turing at slow speeds 
                    NoTargetApproach = false, // If true approaches can begin prior to the projectile ever having had a target.
                    AltNavigation = false, // If true this will swap the default navigation algorithm from ProNav to ZeroEffort Miss.  Zero effort is more direct/precise but less cinematic 
                },
            },
            AmmoGraphics = new GraphicDef 
			{
                ModelName = "",
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
                        Name = "MD_155_Hit", //Explosion_AmmunitionLarge  Collision_Sparks  Explosion_Warhead_50
                        ApplyToShield = false,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1f,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0.75f, end: 2f), // multiply the color by random values within range.
                    WidthVariance = Random(start: 0f, end: 0f), // adds random value to default width (negatives shrinks width)
					DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 16f,
                        Width = 0.45f,
                        Color = Color(red: 60, green: 20, blue: 5, alpha: 10),
                        Textures = new[] {"AryxBallisticTracer",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
                        DecayTime = 40,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Back = false,
                        CustomWidth = 0,
                        UseWidthVariance = true,
                        UseColorFade = true,
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef 
			{
                TravelSound = "MD_Artillary_shell_fly",
                HitSound = "DOK_CannonHit",
                ShieldHitSound = "",
                PlayerHitSound = "DOK_CannonHit",
                VoxelHitSound = "ArcHeavyImpactSoil",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },		
        };

        private AmmoDef Ballistics_Cannon_NPC_Fragment1
        {
            get
            {
                var ammo = LargeCalibreAmmo;
                ammo.AmmoRound = "Ballistics_Cannon_NPC_Fragment1";
				ammo.AmmoMagazine = "Energy";
				ammo.HardPointUsable = false;
                return ammo;
            }
        }
    }
}