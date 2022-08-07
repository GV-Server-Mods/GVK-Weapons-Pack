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
        private AmmoDef Missiles_Missile => new AmmoDef
        {
            AmmoMagazine = "Missiles_Missile",
            AmmoRound = "Missiles_Missile",
            HybridRound = false, //AmmoMagazine based weapon with energy cost
            EnergyCost = 0f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel
            BaseDamage = 1f,
            Mass = 200f, // in kilograms
            Health = 1f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 50f,
            DecayPerShot = 0f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 0,
            IgnoreWater = false,

            Shape = Common_Ammos_Shape_None,
			
            ObjectsHit = Common_Ammos_ObjectsHit_None,
			
            Fragment = Common_Ammos_Fragment_None,
			
            Pattern = Common_Ammos_Pattern_None,
						
            DamageScales = new DamageScaleDef {
                MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with currently integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                SelfDamage = false, // true = allow self damage.
                HealthHitModifier = 0.5, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                VoxelHitModifier = -1f,
                Characters = -1f,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                FallOff = new FallOffDef
                {
                    Distance = 0f, // Distance at which max damage begins falling off.
                    MinMultipler = 0f, // value from 0.0f to 1f where 0.1f would be a min damage of 10% of max damage.
                },
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = 0.04f, // 1/125
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
					AreaEffect = Energy,
					Detonation = Energy,
					Shield = Energy,
                },
				
                Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
				
            },

            AreaOfDamage = new AreaOfDamageDef {
                ByBlockHit = new ByBlockHitDef
                {
                    Enable = false,
                    Radius = 0f,
                    Damage = 0,
                    Depth = 0f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                },
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 5f,
                    Damage = 10000f,
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
			
			Ewar = Common_Ammos_Ewar_None,

            Beams = Common_Ammos_Beams_None,

            Trajectory = new TrajectoryDef {
                Guidance = Smart,
                TargetLossDegree = 30,
                TargetLossTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                MaxLifeTime = 1200, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 300f,
                DesiredSpeed = 450,
                MaxTrajectory = 2500f,
                GravityMultiplier = 0f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable.
                SpeedVariance = Random(start: 0, end: 20), // subtracts value from DesiredSpeed
                RangeVariance = Random(start: 0, end: 100), // subtracts value from MaxTrajectory
                MaxTrajectoryTime = 0, // How long the weapon must fire before it reaches MaxTrajectory.
                Smarts = new SmartsDef
                {
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 3f, // controls how responsive tracking is.
                    MaxLateralThrust = 0.5f, // controls how sharp the trajectile may turn
                    TrackingDelay = 60, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
                    MaxTargets = 2, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
					OffsetRatio = 0.5f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 30, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    Roam = false, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = false, // Whether to stop early death of projectile on target loss
                },
                
				Mines = Common_Ammos_Trajectory_Mines_None,
				
            },

            AmmoGraphics = new GraphicDef {
                ModelName = "\\Models\\Missiles\\MXA_Archer_Missile.mwm",
                VisualProbability = 1f,
                ShieldHitDraw = true,
                Particles = new AmmoParticleDef
                {
					Ammo = new ParticleDef
                    {
                        Name = "Archer_MissileSmokeTrail", //Archer_MissileSmokeTrail MD_BulletGlowMedRed
                        ShrinkByDistance = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0f),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 2000,
                            MaxDuration = 0,
                            Scale = 0.5f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "MD_FlakExplosion", //MXA_MissileExplosion
                        ApplyToShield = true,
                        ShrinkByDistance = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 5000,
                            MaxDuration = 0,
                            Scale = 1f,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0f, end: 5f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.2f, end: 0.2f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 10f,
                        Width = 0.3f,
                        Color = Color(red: 30f, green: 6f, blue: 1.5f, alpha: 1f),
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "MD_MissileThrustFlame",
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
                        DecayTime = 150,
                        Color = Color(red: 1.1f, green: 1.01f, blue: 1, alpha: 1f),
                        Back = false,
                        CustomWidth = 1f,
                        UseWidthVariance = true,
                        UseColorFade = true,
                    },
                },
            },

            AmmoAudio = new AmmoAudioDef {
                TravelSound = "MXA_Archer_Travel",
                HitSound = "HWR_SmallExplosion",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },
			
			Ejection = Common_Ammos_Ejection_None,
			
        };

        private AmmoDef Missiles_Missile_NPC => new AmmoDef
        {
            AmmoMagazine = "Missiles_Missile",
            AmmoRound = "Missiles_Missile_NPC",
            HybridRound = false, //AmmoMagazine based weapon with energy cost
            EnergyCost = 0f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel
            BaseDamage = 1f,
            Mass = 200f, // in kilograms
            Health = 1f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 50f,
            DecayPerShot = 0f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            EnergyMagazineSize = 0,
            IgnoreWater = false,

            Shape = Common_Ammos_Shape_None,
			
            ObjectsHit = Common_Ammos_ObjectsHit_None,
			
            Fragment = Common_Ammos_Fragment_None,
			
            Pattern = Common_Ammos_Pattern_None,
						
            DamageScales = new DamageScaleDef {
                MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with currently integrity above 1000 will be immune to damage.
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                SelfDamage = false, // true = allow self damage.
                HealthHitModifier = 0.5, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                VoxelHitModifier = -1f,
                Characters = -1f,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                FallOff = new FallOffDef
                {
                    Distance = 0f, // Distance at which max damage begins falling off.
                    MinMultipler = 0f, // value from 0.0f to 1f where 0.1f would be a min damage of 10% of max damage.
                },
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = 0.04f, // 1/125
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
					AreaEffect = Energy,
					Detonation = Energy,
					Shield = Energy,
                },
				
                Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
				
            },

            AreaOfDamage = new AreaOfDamageDef {
                ByBlockHit = new ByBlockHitDef
                {
                    Enable = false,
                    Radius = 4f,
                    Damage = 6000f,
                    Depth = 4f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                },
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 5f,
                    Damage = 10000f,
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
			
			Ewar = Common_Ammos_Ewar_None,

            Beams = Common_Ammos_Beams_None,

			Trajectory = new TrajectoryDef {
                Guidance = Smart,
                TargetLossDegree = 30,
                TargetLossTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                MaxLifeTime = 1200, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 300f,
                DesiredSpeed = 450,
                MaxTrajectory = 2500f,
                GravityMultiplier = 0f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable.
                SpeedVariance = Random(start: 0, end: 20), // subtracts value from DesiredSpeed
                RangeVariance = Random(start: 0, end: 100), // subtracts value from MaxTrajectory
                MaxTrajectoryTime = 0, // How long the weapon must fire before it reaches MaxTrajectory.
                Smarts = new SmartsDef
                {
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 3f, // controls how responsive tracking is.
                    MaxLateralThrust = 0.5f, // controls how sharp the trajectile may turn
                    TrackingDelay = 60, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = true, // when set to true ammo picks its own target, does not use hardpoint's.
                    MaxTargets = 2, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
					OffsetRatio = 0.46f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 30, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    Roam = false, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = false, // Whether to stop early death of projectile on target loss
                },
                
				Mines = Common_Ammos_Trajectory_Mines_None,

            },

            AmmoGraphics = new GraphicDef {
                ModelName = "\\Models\\Missiles\\MXA_Archer_Missile.mwm",
                VisualProbability = 1f,
                ShieldHitDraw = true,
                Particles = new AmmoParticleDef
                {
					Ammo = new ParticleDef
                    {
                        Name = "Archer_MissileSmokeTrail", //Archer_MissileSmokeTrail MD_BulletGlowMedRed
                        ShrinkByDistance = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0f),
                        Extras = new ParticleOptionDef
                        {
                            Loop = true,
                            Restart = false,
                            MaxDistance = 2000,
                            MaxDuration = 0,
                            Scale = 0.5f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "MD_FlakExplosion", //MXA_MissileExplosion
                        ApplyToShield = true,
                        ShrinkByDistance = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 5000,
                            MaxDuration = 0,
                            Scale = 1f,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0f, end: 5f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.2f, end: 0.2f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 10f,
                        Width = 0.3f,
                        Color = Color(red: 30f, green: 6f, blue: 1.5f, alpha: 1f),
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "MD_MissileThrustFlame",
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
                        DecayTime = 150,
                        Color = Color(red: 1.1f, green: 1.01f, blue: 1, alpha: 1f),
                        Back = false,
                        CustomWidth = 1f,
                        UseWidthVariance = true,
                        UseColorFade = true,
                    },
                },
            },

            AmmoAudio = new AmmoAudioDef {
                TravelSound = "MXA_Archer_Travel",
                HitSound = "HWR_SmallExplosion",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },
			
			Ejection = Common_Ammos_Ejection_None,

        };
    }
}