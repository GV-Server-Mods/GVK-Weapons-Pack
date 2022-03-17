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
        private AmmoDef SmallRailgunAmmo => new AmmoDef
        {
            AmmoMagazine = "SmallRailgunAmmo",
            AmmoRound = "SmallRailgunAmmo",
            HybridRound = true, //AmmoMagazine based weapon with energy cost
            EnergyCost = 0.05f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel
            BaseDamage = 66500f, //slightly more than 4 heavy armor cubes
            Mass = 2000, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 400000f,
            DecayPerShot = 0,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.

            Shape = new ShapeDef //defines the collision shape of projectile, defaults line and visual Line Length if set to 0
            {
                Shape = LineShape,
                Diameter = 0,
            },
            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with currently integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                SelfDamage = false, // true = allow self damage.

                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Characters = -1f,
                FallOff = new FallOffDef
                {
                    Distance = 2000f, // Distance at which max damage begins falling off.
                    MinMultipler = 0.75f, // value from 0.0f to 1f where 0.1f would be a min damage of 10% of max damage.
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

                Custom = Common_Ammos_DamageScales_Cockpits_BigNerf,

            },
            /*AreaEffect = new AreaDamageDef
            {
                AreaEffect = Radiant, // Disabled = do not use area effect at all, Explosive, Radiant, AntiSmart, JumpNullField, JumpNullField, EnergySinkField, AnchorField, EmpField, OffenseField, NavField, DotField.
                Base = new AreaInfluence
                {
                    Radius = 0.5f, // the sphere of influence of area effects
                    EffectStrength = 0f, // For ewar it applies this amount per pulse/hit, non-ewar applies this as damage per tick per entity in area of influence. For radiant 0 == use spillover from BaseDamage, otherwise use this value.
                },
                Explosions = new ExplosionDef
                {
                    NoVisuals = false,
                    NoSound = false,
                    NoShrapnel = false,
                    NoDeformation = false,
                    Scale = 1,
                    CustomParticle = "",
                    CustomSound = "",
                },
            },*/
            AreaOfDamage = new AreaOfDamageDef
            {
                ByBlockHit = new ByBlockHitDef
                {
                    Enable = true,
                    Radius = 0.5f,
                    Damage = 66500f,
                    //Depth = 4f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Linear, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                },
                EndOfLife = new EndOfLifeDef
                {
                    Enable = false,
                    Radius = 5f,
                    Damage = 600f,
                    Depth = 5f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Linear, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    ArmOnlyOnHit = true,
                    MinArmingTime = 00,
                    NoVisuals = false,
                    NoSound = false,
                    ParticleScale = 1,
                    CustomParticle = "particleName",
                    CustomSound = "soundName",
                },
            },
            Ewar = new EwarDef
            {
                Enable = false,
                Type = Emp,
                Mode = Effect,
                Strength = 500000f,
                Radius = 100f,
                Duration = 1800,
                StackDuration = true,
                Depletable = true,
                MaxStacks = 4,
                NoHitParticle = false,
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
                    ShowParticle = false, // Deprecated.
                    Particle = new ParticleDef // Particle effect to generate at the field's position.
                    {
                        Name = "", // SubtypeId of field particle effect.
                        ShrinkByDistance = false, // Deprecated.
                        Color = Color(red: 0, green: 0, blue: 0, alpha: 0), // Deprecated, set color in particle sbc.
                        Extras = new ParticleOptionDef
                        {
                            Loop = false, // Deprecated, set this in particle sbc.
                            Restart = false, // Not used.
                            MaxDistance = 5000, // Not used.
                            MaxDuration = 1, // Not used.
                            Scale = 1, // Scale of effect.
                        },
                    },
                },
            },
            Trajectory = new TrajectoryDef
            {
                Guidance = None,
                TargetLossDegree = 0f,
                TargetLossTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                MaxLifeTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 0f,
                DesiredSpeed = 1500, //1500
                MaxTrajectory = 2700,
                GravityMultiplier = 0f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable.
                SpeedVariance = Random(start: 0, end: 100), // subtracts value from DesiredSpeed
                RangeVariance = Random(start: 0, end: 200), // subtracts value from MaxTrajectory
                MaxTrajectoryTime = 0, // How long the weapon must fire before it reaches MaxTrajectory.
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
                        Name = "MD_BulletGlowBigBlue", //ShipWelderArc
                        ShrinkByDistance = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 2000,
                            MaxDuration = 1,
                            Scale = 1,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "RailgunHitBlue",
                        ApplyToShield = true,
                        ShrinkByDistance = false,
                        Color = Color(red: 1f, green: 1f, blue: 1f, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 3000,
                            MaxDuration = 0,
                            Scale = 1,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0f, end: 0f), // multiply the color by random values within range.
                    WidthVariance = Random(start: 0f, end: 0f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 50f,
                        Width = 0.01f,
                        Color = Color(red: 11, green: 16, blue: 25, alpha: 1),
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
                        Textures = new[] {
                            "WeaponLaser",
                        },
                        TextureMode = Normal,
                        DecayTime = 50,
                        Color = Color(red: 11, green: 16, blue: 25, alpha: 1),
                        Back = false,
                        CustomWidth = 0.25f,
                        UseWidthVariance = true,
                        UseColorFade = true,
                    },
                    OffsetEffect = new OffsetEffectDef
                    {
                        MaxOffset = 3,// 0 offset value disables this effect
                        MinLength = 0.2f,
                        MaxLength = 10,
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef
            {
                TravelSound = "",
                HitSound = "HWR_LargeExplosion",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1,
                HitPlayShield = true,
            }, // Don't edit below this line
        };
        private AmmoDef SmallRailgunAmmo_Ares => new AmmoDef
        {
            AmmoMagazine = "SmallRailgunAmmo",
            AmmoRound = "SmallRailgunAmmo",
            HybridRound = true, //AmmoMagazine based weapon with energy cost
            EnergyCost = 0.05f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel
            BaseDamage = 33250f, //slightly more than 4 heavy armor cubes
            Mass = 2000, // in kilograms
            Health = 0, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 200000f,
            DecayPerShot = 0,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.

            Shape = new ShapeDef //defines the collision shape of projectile, defaults line and visual Line Length if set to 0
            {
                Shape = LineShape,
                Diameter = 0,
            },
            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with currently integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                SelfDamage = false, // true = allow self damage.

                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Characters = -1f,
                FallOff = new FallOffDef
                {
                    Distance = 2000f, // Distance at which max damage begins falling off.
                    MinMultipler = 0.75f, // value from 0.0f to 1f where 0.1f would be a min damage of 10% of max damage.
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

                Custom = Common_Ammos_DamageScales_Cockpits_BigNerf,

            },
            /*AreaEffect = new AreaDamageDef
            {
                AreaEffect = Radiant, // Disabled = do not use area effect at all, Explosive, Radiant, AntiSmart, JumpNullField, JumpNullField, EnergySinkField, AnchorField, EmpField, OffenseField, NavField, DotField.
                Base = new AreaInfluence
                {
                    Radius = 0.5f, // the sphere of influence of area effects
                    EffectStrength = 0f, // For ewar it applies this amount per pulse/hit, non-ewar applies this as damage per tick per entity in area of influence. For radiant 0 == use spillover from BaseDamage, otherwise use this value.
                },
                Explosions = new ExplosionDef
                {
                    NoVisuals = false,
                    NoSound = false,
                    NoShrapnel = false,
                    NoDeformation = false,
                    Scale = 1,
                    CustomParticle = "",
                    CustomSound = "",
                },
            },*/
            AreaOfDamage = new AreaOfDamageDef
            {
                ByBlockHit = new ByBlockHitDef
                {
                    Enable = true,
                    Radius = 0.5f,
                    Damage = 33250f,
                    //Depth = 4f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Linear, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                },
                EndOfLife = new EndOfLifeDef
                {
                    Enable = false,
                    Radius = 5f,
                    Damage = 600f,
                    Depth = 5f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Linear, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    ArmOnlyOnHit = true,
                    MinArmingTime = 00,
                    NoVisuals = false,
                    NoSound = false,
                    ParticleScale = 1,
                    CustomParticle = "particleName",
                    CustomSound = "soundName",
                },
            },
            Ewar = new EwarDef
            {
                Enable = false,
                Type = Emp,
                Mode = Effect,
                Strength = 500000f,
                Radius = 100f,
                Duration = 1800,
                StackDuration = true,
                Depletable = true,
                MaxStacks = 4,
                NoHitParticle = false,
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
                    ShowParticle = false, // Deprecated.
                    Particle = new ParticleDef // Particle effect to generate at the field's position.
                    {
                        Name = "", // SubtypeId of field particle effect.
                        ShrinkByDistance = false, // Deprecated.
                        Color = Color(red: 0, green: 0, blue: 0, alpha: 0), // Deprecated, set color in particle sbc.
                        Extras = new ParticleOptionDef
                        {
                            Loop = false, // Deprecated, set this in particle sbc.
                            Restart = false, // Not used.
                            MaxDistance = 5000, // Not used.
                            MaxDuration = 1, // Not used.
                            Scale = 1, // Scale of effect.
                        },
                    },
                },
            },
            Trajectory = new TrajectoryDef
            {
                Guidance = None,
                TargetLossDegree = 0f,
                TargetLossTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                MaxLifeTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 0f,
                DesiredSpeed = 1500, //1500
                MaxTrajectory = 2300,
                GravityMultiplier = 0f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable.
                SpeedVariance = Random(start: 0, end: 100), // subtracts value from DesiredSpeed
                RangeVariance = Random(start: 0, end: 200), // subtracts value from MaxTrajectory
                MaxTrajectoryTime = 0, // How long the weapon must fire before it reaches MaxTrajectory.
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
                        Name = "MD_BulletGlowBigBlue", //ShipWelderArc
                        ShrinkByDistance = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 2000,
                            MaxDuration = 1,
                            Scale = 1,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "RailgunHitBlue",
                        ApplyToShield = true,
                        ShrinkByDistance = false,
                        Color = Color(red: 1f, green: 1f, blue: 1f, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 3000,
                            MaxDuration = 0,
                            Scale = 1,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0f, end: 0f), // multiply the color by random values within range.
                    WidthVariance = Random(start: 0f, end: 0f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 50f,
                        Width = 0.01f,
                        Color = Color(red: 11, green: 16, blue: 25, alpha: 1),
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
                        Textures = new[] {
                            "WeaponLaser",
                        },
                        TextureMode = Normal,
                        DecayTime = 50,
                        Color = Color(red: 11, green: 16, blue: 25, alpha: 1),
                        Back = false,
                        CustomWidth = 0.25f,
                        UseWidthVariance = true,
                        UseColorFade = true,
                    },
                    OffsetEffect = new OffsetEffectDef
                    {
                        MaxOffset = 3,// 0 offset value disables this effect
                        MinLength = 0.2f,
                        MaxLength = 10,
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef
            {
                TravelSound = "",
                HitSound = "HWR_LargeExplosion",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1,
                HitPlayShield = true,
            }, // Don't edit below this line
        };
    }
}
