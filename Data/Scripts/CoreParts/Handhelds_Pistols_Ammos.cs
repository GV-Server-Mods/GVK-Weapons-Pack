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
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DeformDef.DeformTypes;
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
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.DecalDef;

using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DamageTypes.Damage;

namespace Scripts
{ // Don't edit above this line
    partial class Parts
    {
        private AmmoDef ElitePistol_Ammo => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "ElitePistolMagazine", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Pistol", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 30, // Direct damage; one steel plate is worth 100.
            Mass = 0f, // In kilograms; how much force the impact will apply to the target.
            Health = 0, // How much damage the projectile can take from other projectiles (base of 1 per hit) before dying; 0 disables this and makes the projectile untargetable.
            HardPointUsable = true, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 1, // For energy weapons, how many shots to fire before reloading.
			NpcSafe = true,
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the visual Line Length if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = .1, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
            },
            Pattern = new PatternDef
            {
                Patterns = new[] { // If enabled, set of multiple ammos to fire in order instead of the main ammo.
                    "",
                },
                Mode = Fragment, // Select when to activate this pattern, options: Never, Weapon, Fragment, Both 
                TriggerChance = 1f, // This is %
                Random = false, // This randomizes the number spawned at once, NOT the list order.
                RandomMin = 1, 
                RandomMax = 1,
                SkipParent = false, // Skip the Ammo itself, in the list
                PatternSteps = 1, // Number of Ammos activated per round, will progress in order and loop. Ignored if Random = true.
            },
            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // Blocks with integrity higher than this value will be immune to damage from this projectile; 0 = disabled.
                DamageVoxels = false, // Whether to damage voxels.
                SelfDamage = false, // Whether to damage the weapon's own grid.
                HealthHitModifier = 0, // How much Health to subtract from another projectile on hit; defaults to 1 if zero or less.
                VoxelHitModifier = 1, // Voxel damage multiplier; defaults to 1 if zero or less.
                Characters = -1f, // Character damage multiplier; defaults to 1 if zero or less.
                // For the following modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01f = 1% damage, 2 = 200% damage.
                FallOff = new FallOffDef
                {
                    Distance = 100f, // Distance at which damage begins falling off.
                    MinMultipler = 0.1f, // Value from 0.0001f to 1f where 0.1f would be a min damage of 10% of base damage.
                },
                Grids = new GridSizeDef
                {
                    Large = 0.5f, // Multiplier for damage against large grids.
                    Small = 0.5f, // Multiplier for damage against small grids.
                },
                Armor = new ArmorDef
                {
                    Armor = -1f, // Multiplier for damage against all armor. This is multiplied with the specific armor type multiplier (light, heavy).
                    Light = -1f, // Multiplier for damage against light armor.
                    Heavy = -1f, // Multiplier for damage against heavy armor.
                    NonArmor = -1f, // Multiplier for damage against every else.
                },
                Shields = new ShieldDef
                {
                    Modifier = 1f, // Multiplier for damage against shields.
                    Type = Default, // Damage vs healing against shields; Default, Heal
                    BypassModifier = -1f, // If greater than zero, the percentage of damage that will penetrate the shield.
                },
                DamageType = new DamageTypes // Damage type of each element of the projectile's damage; Kinetic, Energy
                {
                    Base = Kinetic, // Base Damage uses this
                    AreaEffect = Energy,
                    Detonation = Energy,
                    Shield = Energy, // Damage against shields is currently all of one type per projectile. Shield Bypass Weapons, always Deal Energy regardless of this line
                },
                Deform = new DeformDef
                {
                    DeformType = NoDeform,
                    DeformDelay = 30,
                },
            },

            Trajectory = new TrajectoryDef
            {
                Guidance = None, // None, Remote, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                MaxLifeTime = 60, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..)
                AccelPerSec = 0f, // Meters Per Second. This is the spawning Speed of the Projectile, and used by turning.
                DesiredSpeed = 300, // voxel phasing if you go above 5100
                MaxTrajectory = 250f, // Max Distance the projectile or beam can Travel.
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
                RangeVariance = Random(start: 0, end: 0), // subtracts value from MaxTrajectory
            },
            AmmoGraphics = new GraphicDef
            {
                ModelName = "", // Model Path goes here.  "\\Models\\Ammo\\Starcore_Arrow_Missile_Large"
                VisualProbability = 1f, // %
                ShieldHitDraw = true,
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
                        ApplyToShield = false,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 0.5f,
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
                    ColorVariance = Random(start: 0f, end: 0f), // multiply the color by random values within range.
                    WidthVariance = Random(start: 0f, end: -.001f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 10f, //
                        Width = 0.001f, //
                        Color = Color(red: 3, green: 2, blue: 1f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "ProjectileTrailLine", // Please always have this Line set, if this Section is enabled.
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
            AmmoAudio = new AmmoAudioDef
            {
                TravelSound = "", // SubtypeID for your Sound File. Travel, is sound generated around your Projectile in flight
                HitSound = "WepPlayRifleImpMetal",
                ShotSound = "",
                ShieldHitSound = "WepPlayRifleImpRock",
                PlayerHitSound = "",
                VoxelHitSound = "WepPlayRifleImpSoilDry",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },
            Ejection = new EjectionDef // Optional Component, allows generation of Particle or Item (Typically magazine), on firing, to simulate Tank shell ejection
            {
                Type = Particle, // Particle or Item (Inventory Component)
                Speed = 1f, // Speed inventory is ejected from in dummy direction
                SpawnChance = 1f, // chance of triggering effect (0 - 1)
                CompDef = new ComponentDef
                {
                    ItemName = "", //InventoryComponent name
                    ItemLifeTime = 0, // how long item should exist in world
                    Delay = 0, // delay in ticks after shot before ejected
                }
            }, // Don't edit below this line
        };

        private AmmoDef SemiAutoPistol_Ammo => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "SemiAutoPistolMagazine", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "FlareBase", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 1, // Direct damage; one steel plate is worth 100.
            Mass = 0f, // In kilograms; how much force the impact will apply to the target.
            Health = 0, // How much damage the projectile can take from other projectiles (base of 1 per hit) before dying; 0 disables this and makes the projectile untargetable.
            HardPointUsable = true, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 1, // For energy weapons, how many shots to fire before reloading.
			NpcSafe = true,
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the visual Line Length if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = .1, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
            },
			Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "FlareAmmo", // AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 1, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = false, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards), value is read from parent ammo type.
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                AdvOffset = Vector(x: 0, y: 0, z: 0), // advanced offsets the fragment by xyz coordinates relative to parent, value is read from fragment ammo type.
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below
                {
                    Enable = false, // Enables TimedSpawns mechanism
                    Interval = 0, // Time between spawning fragments, in ticks, 0 means every tick, 1 means every other
                    StartTime = 20, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 1, // Max number of fragment children to spawn
                    Proximity = 10, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = true, // Parent dies once after it spawns its last child.
                    PointAtTarget = false, // Start fragment direction pointing at Target
                    PointType = Predict, // Point accuracy, Direct (straight forward), Lead (always fire), Predict (only fire if it can hit)
                    DirectAimCone = 0f, //Aim cone used for Direct fire, in degrees
                    GroupSize = 5, // Number of spawns in each group
                    GroupDelay = 120, // Delay between each group.
                },
            },
            Pattern = new PatternDef
            {
                Patterns = new[] { // If enabled, set of multiple ammos to fire in order instead of the main ammo.
                    "",
                },
                Mode = Fragment, // Select when to activate this pattern, options: Never, Weapon, Fragment, Both 
                TriggerChance = 1f, // This is %
                Random = false, // This randomizes the number spawned at once, NOT the list order.
                RandomMin = 1, 
                RandomMax = 1,
                SkipParent = false, // Skip the Ammo itself, in the list
                PatternSteps = 1, // Number of Ammos activated per round, will progress in order and loop. Ignored if Random = true.
            },
            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // Blocks with integrity higher than this value will be immune to damage from this projectile; 0 = disabled.
                DamageVoxels = false, // Whether to damage voxels.
                SelfDamage = false, // Whether to damage the weapon's own grid.
                HealthHitModifier = 0, // How much Health to subtract from another projectile on hit; defaults to 1 if zero or less.
                VoxelHitModifier = 1, // Voxel damage multiplier; defaults to 1 if zero or less.
                Characters = -1f, // Character damage multiplier; defaults to 1 if zero or less.
                // For the following modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01f = 1% damage, 2 = 200% damage.
                FallOff = new FallOffDef
                {
                    Distance = 100f, // Distance at which damage begins falling off.
                    MinMultipler = 0.1f, // Value from 0.0001f to 1f where 0.1f would be a min damage of 10% of base damage.
                },
                Grids = new GridSizeDef
                {
                    Large = 0.5f, // Multiplier for damage against large grids.
                    Small = 0.5f, // Multiplier for damage against small grids.
                },
                Armor = new ArmorDef
                {
                    Armor = -1f, // Multiplier for damage against all armor. This is multiplied with the specific armor type multiplier (light, heavy).
                    Light = -1f, // Multiplier for damage against light armor.
                    Heavy = -1f, // Multiplier for damage against heavy armor.
                    NonArmor = -1f, // Multiplier for damage against every else.
                },
                Shields = new ShieldDef
                {
                    Modifier = 1f, // Multiplier for damage against shields.
                    Type = Default, // Damage vs healing against shields; Default, Heal
                    BypassModifier = -1f, // If greater than zero, the percentage of damage that will penetrate the shield.
                },
                DamageType = new DamageTypes // Damage type of each element of the projectile's damage; Kinetic, Energy
                {
                    Base = Kinetic, // Base Damage uses this
                    AreaEffect = Energy,
                    Detonation = Energy,
                    Shield = Energy, // Damage against shields is currently all of one type per projectile. Shield Bypass Weapons, always Deal Energy regardless of this line
                },
				Deform = new DeformDef
                {
                    DeformType = NoDeform,
                    DeformDelay = 30,
                },
            },

            Trajectory = new TrajectoryDef
            {
                Guidance = None, // None, Remote, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                MaxLifeTime = 120, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..)
                AccelPerSec = 50, // Meters Per Second. This is the spawning Speed of the Projectile, and used by turning.
                DesiredSpeed = 50, // voxel phasing if you go above 5100
                MaxTrajectory = 100f, // Max Distance the projectile or beam can Travel.
                GravityMultiplier = 0.5f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable. Natural Gravity Only.
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
                RangeVariance = Random(start: 0, end: 0), // subtracts value from MaxTrajectory
            },
            AmmoGraphics = new GraphicDef
            {
                ModelName = "", // Model Path goes here.  "\\Models\\Ammo\\Starcore_Arrow_Missile_Large"
                VisualProbability = 1f, // %
                ShieldHitDraw = true,
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
                        Name = "Smoke_Missile", //ShipWelderArc
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 0.02f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "Hit_BasicAmmoSmall",
                        ApplyToShield = false,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 0.5f,
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
                    ColorVariance = Random(start: 0f, end: 0f), // multiply the color by random values within range.
                    WidthVariance = Random(start: 0f, end: -.001f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = false,
                        Length = 0.5f, //
                        Width = 0.01f, //
                        Color = Color(red: 10, green: 10, blue: 10f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "ProjectileTrailLine", // Please always have this Line set, if this Section is enabled.
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
            AmmoAudio = new AmmoAudioDef
            {
                TravelSound = "", // SubtypeID for your Sound File. Travel, is sound generated around your Projectile in flight
                HitSound = "WepPlayRifleImpMetal",
                ShotSound = "",
                ShieldHitSound = "WepPlayRifleImpRock",
                PlayerHitSound = "",
                VoxelHitSound = "WepPlayRifleImpSoilDry",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },
            Ejection = new EjectionDef // Optional Component, allows generation of Particle or Item (Typically magazine), on firing, to simulate Tank shell ejection
            {
                Type = Particle, // Particle or Item (Inventory Component)
                Speed = 1f, // Speed inventory is ejected from in dummy direction
                SpawnChance = 1f, // chance of triggering effect (0 - 1)
                CompDef = new ComponentDef
                {
                    ItemName = "", //InventoryComponent name
                    ItemLifeTime = 0, // how long item should exist in world
                    Delay = 0, // delay in ticks after shot before ejected
                }
            }, // Don't edit below this line
        };
		private AmmoDef SemiAutoPistolFlare_Ammo => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "Energy", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "FlareAmmo", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 1, // Direct damage; one steel plate is worth 100.
            Mass = 0f, // In kilograms; how much force the impact will apply to the target.
            Health = 0, // How much damage the projectile can take from other projectiles (base of 1 per hit) before dying; 0 disables this and makes the projectile untargetable.
            HardPointUsable = false, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 1, // For energy weapons, how many shots to fire before reloading.
			NpcSafe = true,
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the visual Line Length if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = .1, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
            },
            Pattern = new PatternDef
            {
                Patterns = new[] { // If enabled, set of multiple ammos to fire in order instead of the main ammo.
                    "",
                },
                Mode = Fragment, // Select when to activate this pattern, options: Never, Weapon, Fragment, Both 
                TriggerChance = 1f, // This is %
                Random = false, // This randomizes the number spawned at once, NOT the list order.
                RandomMin = 1, 
                RandomMax = 1,
                SkipParent = false, // Skip the Ammo itself, in the list
                PatternSteps = 1, // Number of Ammos activated per round, will progress in order and loop. Ignored if Random = true.
            },
            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // Blocks with integrity higher than this value will be immune to damage from this projectile; 0 = disabled.
                DamageVoxels = false, // Whether to damage voxels.
                SelfDamage = false, // Whether to damage the weapon's own grid.
                HealthHitModifier = 0, // How much Health to subtract from another projectile on hit; defaults to 1 if zero or less.
                VoxelHitModifier = 1, // Voxel damage multiplier; defaults to 1 if zero or less.
                Characters = -1f, // Character damage multiplier; defaults to 1 if zero or less.
                // For the following modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01f = 1% damage, 2 = 200% damage.
                FallOff = new FallOffDef
                {
                    Distance = 100f, // Distance at which damage begins falling off.
                    MinMultipler = 0.1f, // Value from 0.0001f to 1f where 0.1f would be a min damage of 10% of base damage.
                },
                Grids = new GridSizeDef
                {
                    Large = 0.5f, // Multiplier for damage against large grids.
                    Small = 0.5f, // Multiplier for damage against small grids.
                },
                Armor = new ArmorDef
                {
                    Armor = -1f, // Multiplier for damage against all armor. This is multiplied with the specific armor type multiplier (light, heavy).
                    Light = -1f, // Multiplier for damage against light armor.
                    Heavy = -1f, // Multiplier for damage against heavy armor.
                    NonArmor = -1f, // Multiplier for damage against every else.
                },
                Shields = new ShieldDef
                {
                    Modifier = 1f, // Multiplier for damage against shields.
                    Type = Default, // Damage vs healing against shields; Default, Heal
                    BypassModifier = -1f, // If greater than zero, the percentage of damage that will penetrate the shield.
                },
                DamageType = new DamageTypes // Damage type of each element of the projectile's damage; Kinetic, Energy
                {
                    Base = Kinetic, // Base Damage uses this
                    AreaEffect = Energy,
                    Detonation = Energy,
                    Shield = Energy, // Damage against shields is currently all of one type per projectile. Shield Bypass Weapons, always Deal Energy regardless of this line
                },
				Deform = new DeformDef
                {
                    DeformType = NoDeform,
                    DeformDelay = 30,
                },
            },

            Trajectory = new TrajectoryDef
            {
                Guidance = None, // None, Remote, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                MaxLifeTime = 3600, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..)
                AccelPerSec = 0f, // Meters Per Second. This is the spawning Speed of the Projectile, and used by turning.
                DesiredSpeed = 5, // voxel phasing if you go above 5100
                MaxTrajectory = 20000f, // Max Distance the projectile or beam can Travel.
                GravityMultiplier = 0.5f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable. Natural Gravity Only.
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
                RangeVariance = Random(start: 0, end: 0), // subtracts value from MaxTrajectory
            },
            AmmoGraphics = new GraphicDef
            {
                ModelName = "", // Model Path goes here.  "\\Models\\Ammo\\Starcore_Arrow_Missile_Large"
                VisualProbability = 1f, // %
                ShieldHitDraw = true,
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
                        Name = "ShipWelderArc", //ShipWelderArc
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "",
                        ApplyToShield = false,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 0.5f,
                            HitPlayChance = 0.75f,
                        },
                    },
                    Eject = new ParticleDef
                    {
                        Name = "",
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
                    ColorVariance = Random(start: 0f, end: 0f), // multiply the color by random values within range.
                    WidthVariance = Random(start: 0f, end: -.001f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 10f, //
                        Width = 0.001f, //
                        Color = Color(red: 150, green: 150, blue: 150, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "ProjectileTrailLine", // Please always have this Line set, if this Section is enabled.
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
            AmmoAudio = new AmmoAudioDef
            {
                TravelSound = "", // SubtypeID for your Sound File. Travel, is sound generated around your Projectile in flight
                HitSound = "WepPlayRifleImpMetal",
                ShotSound = "",
                ShieldHitSound = "WepPlayRifleImpRock",
                PlayerHitSound = "",
                VoxelHitSound = "WepPlayRifleImpSoilDry",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },
            Ejection = new EjectionDef // Optional Component, allows generation of Particle or Item (Typically magazine), on firing, to simulate Tank shell ejection
            {
                Type = Particle, // Particle or Item (Inventory Component)
                Speed = 1f, // Speed inventory is ejected from in dummy direction
                SpawnChance = 1f, // chance of triggering effect (0 - 1)
                CompDef = new ComponentDef
                {
                    ItemName = "", //InventoryComponent name
                    ItemLifeTime = 0, // how long item should exist in world
                    Delay = 0, // delay in ticks after shot before ejected
                }
            }, // Don't edit below this line
        };

        private AmmoDef FullAutoPistol_Ammo => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "FullAutoPistolMagazine", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Pistol", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 20, // Direct damage; one steel plate is worth 100.
            Mass = 0f, // In kilograms; how much force the impact will apply to the target.
            Health = 0, // How much damage the projectile can take from other projectiles (base of 1 per hit) before dying; 0 disables this and makes the projectile untargetable.
            HardPointUsable = true, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 1, // For energy weapons, how many shots to fire before reloading.
			NpcSafe = true,
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the visual Line Length if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = .1, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
            },
            Pattern = new PatternDef
            {
                Patterns = new[] { // If enabled, set of multiple ammos to fire in order instead of the main ammo.
                    "",
                },
                Mode = Fragment, // Select when to activate this pattern, options: Never, Weapon, Fragment, Both 
                TriggerChance = 1f, // This is %
                Random = false, // This randomizes the number spawned at once, NOT the list order.
                RandomMin = 1, 
                RandomMax = 1,
                SkipParent = false, // Skip the Ammo itself, in the list
                PatternSteps = 1, // Number of Ammos activated per round, will progress in order and loop. Ignored if Random = true.
            },
            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // Blocks with integrity higher than this value will be immune to damage from this projectile; 0 = disabled.
                DamageVoxels = false, // Whether to damage voxels.
                SelfDamage = false, // Whether to damage the weapon's own grid.
                HealthHitModifier = 0, // How much Health to subtract from another projectile on hit; defaults to 1 if zero or less.
                VoxelHitModifier = 1, // Voxel damage multiplier; defaults to 1 if zero or less.
                Characters = -1f, // Character damage multiplier; defaults to 1 if zero or less.
                // For the following modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01f = 1% damage, 2 = 200% damage.
                FallOff = new FallOffDef
                {
                    Distance = 100f, // Distance at which damage begins falling off.
                    MinMultipler = 0.1f, // Value from 0.0001f to 1f where 0.1f would be a min damage of 10% of base damage.
                },
                Grids = new GridSizeDef
                {
                    Large = 0.5f, // Multiplier for damage against large grids.
                    Small = 0.5f, // Multiplier for damage against small grids.
                },
                Armor = new ArmorDef
                {
                    Armor = -1f, // Multiplier for damage against all armor. This is multiplied with the specific armor type multiplier (light, heavy).
                    Light = -1f, // Multiplier for damage against light armor.
                    Heavy = -1f, // Multiplier for damage against heavy armor.
                    NonArmor = -1f, // Multiplier for damage against every else.
                },
                Shields = new ShieldDef
                {
                    Modifier = 1f, // Multiplier for damage against shields.
                    Type = Default, // Damage vs healing against shields; Default, Heal
                    BypassModifier = -1f, // If greater than zero, the percentage of damage that will penetrate the shield.
                },
                DamageType = new DamageTypes // Damage type of each element of the projectile's damage; Kinetic, Energy
                {
                    Base = Kinetic, // Base Damage uses this
                    AreaEffect = Energy,
                    Detonation = Energy,
                    Shield = Energy, // Damage against shields is currently all of one type per projectile. Shield Bypass Weapons, always Deal Energy regardless of this line
                },
				Deform = new DeformDef
                {
                    DeformType = NoDeform,
                    DeformDelay = 30,
                },
            },

            Trajectory = new TrajectoryDef
            {
                Guidance = None, // None, Remote, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                MaxLifeTime = 60, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..)
                AccelPerSec = 0f, // Meters Per Second. This is the spawning Speed of the Projectile, and used by turning.
                DesiredSpeed = 300, // voxel phasing if you go above 5100
                MaxTrajectory = 250f, // Max Distance the projectile or beam can Travel.
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
                RangeVariance = Random(start: 0, end: 0), // subtracts value from MaxTrajectory
            },
            AmmoGraphics = new GraphicDef
            {
                ModelName = "", // Model Path goes here.  "\\Models\\Ammo\\Starcore_Arrow_Missile_Large"
                VisualProbability = 1f, // %
                ShieldHitDraw = true,
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
                        ApplyToShield = false,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 0.5f,
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
                    ColorVariance = Random(start: 0f, end: 0f), // multiply the color by random values within range.
                    WidthVariance = Random(start: 0f, end: -.001f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 10f, //
                        Width = 0.001f, //
                        Color = Color(red: 2, green: 2, blue: 1f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "ProjectileTrailLine", // Please always have this Line set, if this Section is enabled.
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
            AmmoAudio = new AmmoAudioDef
            {
                TravelSound = "", // SubtypeID for your Sound File. Travel, is sound generated around your Projectile in flight
                HitSound = "WepPlayRifleImpMetal",
                ShotSound = "",
                ShieldHitSound = "WepPlayRifleImpRock",
                PlayerHitSound = "",
                VoxelHitSound = "WepPlayRifleImpSoilDry",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },
            Ejection = new EjectionDef // Optional Component, allows generation of Particle or Item (Typically magazine), on firing, to simulate Tank shell ejection
            {
                Type = Particle, // Particle or Item (Inventory Component)
                Speed = 1f, // Speed inventory is ejected from in dummy direction
                SpawnChance = 1f, // chance of triggering effect (0 - 1)
                CompDef = new ComponentDef
                {
                    ItemName = "", //InventoryComponent name
                    ItemLifeTime = 0, // how long item should exist in world
                    Delay = 0, // delay in ticks after shot before ejected
                }
            }, // Don't edit below this line
        };

      

    }
}

