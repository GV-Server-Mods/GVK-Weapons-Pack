using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.AmmoDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef.SpawnType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.ShapeDef.Shapes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef.SkipMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef;
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
        private AmmoDef Lasers_Laser_Small => new AmmoDef //Blue Receptor laser
        {
            AmmoMagazine = "Energy",
            AmmoRound = "Lasers_Laser_Small",
            HybridRound = false, //AmmoMagazine based weapon with energy cost
            EnergyCost = 0.1f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel    (15 * 0.05 * 3600/60/60 = 0.75MW per tick)
            BaseDamage = 75f,
            Mass = 0f, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 0f,
			DecayPerShot = 0f,            
            HardPointUsable = true,
            EnergyMagazineSize = 0,
            IgnoreWater = false,

            Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "", // Lasers_Laser_Shrapnel_OffenseField AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 0, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = false, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards).
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                FireSound = false, // Play fire/shoot sound
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below
                {
                    Enable = false, // Enables TimedSpawns mechanism
                    Interval = 0, // Time between spawning fragments, in ticks
                    StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 1, // Max number of fragment children to spawn
                    Proximity = 1000, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = true, // Parent dies once after it spawns its last child.
                    PointAtTarget = true, // Start fragment direction pointing at Target
                    PointType = Predict, // Point accuracy, Direct, Lead (always fire), Predict (only fire if it can hit)
                    GroupSize = 5, // Number of spawns in each group
                    GroupDelay = 120, // Delay between each group.
                },
            },
            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with currently integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                SelfDamage = false, // true = allow self damage.
				HealthHitModifier = 0.1f,
				VoxelHitModifier = -1,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Characters = 0.25f,
                FallOff = new FallOffDef
                {
                    Distance = 250f, // Distance at which max damage begins falling off.
                    MinMultipler = 0.5f, // value from 0.0f to 1f where 0.1f would be a min damage of 10% of max damage.
                },
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = 0.75f,
                },
                Armor = new ArmorDef
                {
                    Armor = -1f,
                    Light = .8f,
                    Heavy = .6f,
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
                Guidance = None,
				MaxTrajectory = 1100f,
                RangeVariance = Random(start: 0, end: 50), // subtracts value from MaxTrajectory
				MaxTrajectoryTime = 10, // How long the weapon must fire before it reaches MaxTrajectory.
            },
            AmmoGraphics = new GraphicDef
            {
                ModelName = "",
                VisualProbability = 1f,
                ShieldHitDraw = true,
                Particles = new AmmoParticleDef
                {
                    Ammo = new ParticleDef
                    {
                        Name = "MD_BulletGlowBigBlue", //Archer_MissileSmokeTrail
                        ShrinkByDistance = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0f),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 2000,
                            MaxDuration = 0,
                            Scale = 1f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "Lasers_Laser_BlueHit",//MD_BulletGlowBigBlue
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
                    ColorVariance = Random(start: -50f, end: 50f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -.1f, end: 0.1f), // adds random value to default width (negatives shrinks width)

                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 5f,
                        Width = .15f,
                        Color = Color(red: 2, green: 5, blue: 20, alpha: .9f),
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "WeaponLaser",
                        },
                        TextureMode = Normal, // Normal, Cycle, Chaos, Wave
                    },
                },
            },
        };

        private AmmoDef Lasers_Laser_Large => new AmmoDef //T2 orange pulse for turrets
        {
            AmmoMagazine = "Energy",
            AmmoRound = "Lasers_Laser_Large",
            HybridRound = false, //AmmoMagazine based weapon with energy cost
            EnergyCost = 0.2f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel    (15 * 0.05 * 3600/60/60 = 0.75MW per tick)
            BaseDamage = 150f,
            Mass = 0f, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 0f,
			DecayPerShot = 0f,            
            HardPointUsable = true,
            EnergyMagazineSize = 0,
            IgnoreWater = false,

            Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "", // Lasers_Laser_Shrapnel_OffenseField AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 0, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = false, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards).
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                FireSound = false, // Play fire/shoot sound
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below
                {
                    Enable = false, // Enables TimedSpawns mechanism
                    Interval = 0, // Time between spawning fragments, in ticks
                    StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 1, // Max number of fragment children to spawn
                    Proximity = 1000, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = true, // Parent dies once after it spawns its last child.
                    PointAtTarget = true, // Start fragment direction pointing at Target
                    PointType = Predict, // Point accuracy, Direct, Lead (always fire), Predict (only fire if it can hit)
                    GroupSize = 5, // Number of spawns in each group
                    GroupDelay = 120, // Delay between each group.
                },
            },
            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with currently integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                SelfDamage = false, // true = allow self damage.
				HealthHitModifier = -1,
				VoxelHitModifier = -1,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Characters = 0.25f,
                FallOff = new FallOffDef
                {
                    Distance = 1000f, // Distance at which max damage begins falling off.
                    MinMultipler = 0.5f, // value from 0.0f to 1f where 0.1f would be a min damage of 10% of max damage.
                },
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = 0.75f,
                },
                Armor = new ArmorDef
                {
                    Armor = -1f,
                    Light = .8f,
                    Heavy = .6f,
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
                MaxTrajectory = 1800f,
                RangeVariance = Random(start: 0, end: 200), // subtracts value from MaxTrajectory
				MaxTrajectoryTime = 10, // How long the weapon must fire before it reaches MaxTrajectory.
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
                        Name = "Lasers_Laser_RedHit",//Big_melting_laser_hit
                        ApplyToShield = true,
                        ShrinkByDistance = true,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1f),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 2000,
                            MaxDuration = 0,
                            Scale = 1,
                            HitPlayChance = 1,
                        },
                    },
                },
                Lines = new LineDef
                {
                    TracerMaterial = "WeaponLaser", // WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    ColorVariance = Random(start: 0.5f, end: 1f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.1f, end: 0.1f), // adds random value to default width (negatives shrinks width)

                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 5f,
                        Width = .4f,
                        Color = Color(red: 10, green: 1, blue: 0, alpha: .9f),
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "WeaponLaser",
                        },
                        TextureMode = Normal, // Normal, Cycle, Chaos, Wave
                    },
                },
            },
        };

        private AmmoDef Lasers_Laser_Shrapnel_OffenseField => new AmmoDef //Blue Receptor laser
        {
            AmmoMagazine = "Energy",
            AmmoRound = "Lasers_Laser_Shrapnel_OffenseField",
            HybridRound = false, //AmmoMagazine based weapon with energy cost
            EnergyCost = 0.000000001f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel    (15 * 0.05 * 3600/60/60 = 0.75MW per tick)
            BaseDamage = 1f,
            Mass = 0f, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 0f,
			DecayPerShot = 0f,            
            HardPointUsable = false,
            EnergyMagazineSize = 0,
            IgnoreWater = false,

            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with currently integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                SelfDamage = false, // true = allow self damage.
				HealthHitModifier = -1f,
				VoxelHitModifier = -1,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Characters = -1f,
                FallOff = new FallOffDef
                {
                    Distance = 0f, // Distance at which max damage begins falling off.
                    MinMultipler = 1f, // value from 0.0f to 1f where 0.1f would be a min damage of 10% of max damage.
                },
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = -1f,
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
					Base = Energy,
					AreaEffect = Energy,
					Detonation = Energy,
					Shield = Energy,
                },
				
                Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
				
            },
            Ewar = new EwarDef
            {
                Enable = true, // Enables EWAR effects AND DISABLES BASE DAMAGE AND AOE DAMAGE!!
                Type = Offense, // EnergySink, Emp, Offense, Nav, Dot, AntiSmart, JumpNull, Anchor, Tractor, Pull, Push, 
                Mode = Effect, // Effect , Field
                Strength = 10000000f,
                Radius = 15f, // Meters
                Duration = 300, // In Ticks
                StackDuration = false, // Combined Durations
                Depletable = false,
                MaxStacks = 1, // Max Debuffs at once
                NoHitParticle = false,
				
                //EnergySink : Targets & Shutdowns Power Supplies, such as Batteries & Reactor
                //Emp : Targets & Shutdown any Block capable of being powered
                //Offense : Targets & Shutdowns Weaponry
                //Nav : Targets & Shutdown Gyros, Thrusters, or Locks them down
                //Dot : Deals Damage to Blocks in radius
                //AntiSmart : Effects & Scrambles the Targeting List of Affected Missiles
                //JumpNull : Shutdown & Stops any Active Jumps, or JumpDrive Units in radius
                //Tractor : Affects target with Physics
                //Pull : Affects target with Physics
                //Push : Affects target with Physics
                //Anchor : Affects target with Physics
                
                Force = new PushPullDef
                {
                    ForceFrom = ProjectileLastPosition, // ProjectileLastPosition, ProjectileOrigin, HitPosition, TargetCenter, TargetCenterOfMass
                    ForceTo = HitPosition, // ProjectileLastPosition, ProjectileOrigin, HitPosition, TargetCenter, TargetCenterOfMass
                    Position = TargetCenterOfMass, // ProjectileLastPosition, ProjectileOrigin, HitPosition, TargetCenter, TargetCenterOfMass
                    DisableRelativeMass = false,
                    TractorRange = 0,
                    ShooterFeelsForce = false,
                },
                Field = new FieldDef
                {
                    Interval = 0, // Time between each pulse, in game ticks (60 == 1 second).
                    PulseChance = 0, // Chance from 0 - 100 that an entity in the field will be hit by any given pulse.
                    GrowTime = 0, // How many ticks it should take the field to grow to full size.
                    HideModel = false, // Hide the projectile model if it has one.
                    ShowParticle = true, // Show Block damage effect.
                    TriggerRange = 250f, //range at which fields are triggered
                    Particle = new ParticleDef // Particle effect to generate at the field's position.
                    {
                        Name = "", // SubtypeId of field particle effect.
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1, // Scale of effect.
                        },
                    },
                },
            },
            Beams = new BeamDef
            {
                Enable = true,
                OneParticle = true, // Only spawn one particle hit per beam weapon.
            },
            Trajectory = new TrajectoryDef
            {
                Guidance = None,
				MaxTrajectory = 1f,
                RangeVariance = Random(start: 0, end: 50), // subtracts value from MaxTrajectory
				MaxTrajectoryTime = 10, // How long the weapon must fire before it reaches MaxTrajectory.
            },
            AmmoGraphics = new GraphicDef
            {
                ModelName = "",
                VisualProbability = 1f,
                ShieldHitDraw = true,
                Particles = new AmmoParticleDef
                {
                    Ammo = new ParticleDef
                    {
                        Name = "MD_BulletGlowBigBlue", //Archer_MissileSmokeTrail
                        ShrinkByDistance = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0f),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 2000,
                            MaxDuration = 0,
                            Scale = 1f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "Lasers_Laser_BlueHit",//MD_BulletGlowBigBlue
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
                    ColorVariance = Random(start: -50f, end: 50f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -.1f, end: 0.1f), // adds random value to default width (negatives shrinks width)

                    Tracer = new TracerBaseDef
                    {
                        Enable = false,
                        Length = 5f,
                        Width = .15f,
                        Color = Color(red: 2, green: 5, blue: 20, alpha: .9f),
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "WeaponLaser",
                        },
                        TextureMode = Normal, // Normal, Cycle, Chaos, Wave
                    },
                },
            },
        };
    }
}
