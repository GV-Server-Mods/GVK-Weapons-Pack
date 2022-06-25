﻿using static Scripts.Structure.WeaponDefinition;
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
        private AmmoDef Missiles_Rocket => new AmmoDef
        {
			AmmoMagazine = "Missile200mm",
			AmmoRound = "Missiles_Rocket",
			HybridRound = false, //AmmoMagazine based weapon with energy cost
			EnergyCost = 0f, //(((EnergyCost * DefaultDamage) * ShotsPerSecond) * BarrelsPerShot) * ShotsPerBarrel
			BaseDamage = 1f,
			Mass = 200f, // in kilograms
			Health = 1, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
			BackKickForce = 100f,
            DecayPerShot = 0f,
			HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
			EnergyMagazineSize = 0,
			IgnoreWater = false,

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
				HealthHitModifier = 1, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
				VoxelHitModifier = -1,
				// modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
				Characters = -1f,
				Grids = new GridSizeDef
				{
					Large = 1f,
					Small = 0.04f,  // 1/25
				},
				Armor = new ArmorDef
				{
					Armor = -1f,
					Light = -1f,
					Heavy = 1.2f,
					NonArmor = 0.8f,
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
            AreaOfDamage = new AreaOfDamageDef
            {
                ByBlockHit = new ByBlockHitDef
                {
                    Enable = true,
                    Radius = 10f,
                    Damage = 3000f,
                    Depth = 0.4f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
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
                Type = EnergySink,
                Mode = Effect,
                Strength = 10000f,
                Radius = 100f,
                Duration = 100,
                StackDuration = true,
                Depletable = true,
                MaxStacks = 10,
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
				TargetLossDegree = 1f,
				TargetLossTime = 1, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				MaxLifeTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				AccelPerSec = 800f,
				DesiredSpeed = 1500,
				MaxTrajectory = 900f,
				SpeedVariance = Random(start: 0, end: 100), // subtracts value from DesiredSpeed
				RangeVariance = Random(start: 0, end: 50), // subtracts value from MaxTrajectory
				Smarts = new SmartsDef
				{
					Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
					Aggressiveness = 3f, // controls how responsive tracking is.
					MaxLateralThrust = 0.5f, // controls how sharp the trajectile may turn
					TrackingDelay = 250, // Measured in Shape diameter units traveled.
					MaxChaseTime = 2000, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
					OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
					OffsetRatio = 0.25f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 60, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..)
				},
				Mines = new MinesDef
				{
					DetectRadius =  0,
					DeCloakRadius = 0,
					FieldTime = 0,
					Cloak = false,
					Persist = false,
				},
			},
			AmmoGraphics = new GraphicDef
			{
				ModelName = "\\Models\\Missiles\\MXA_Archer_Missile.mwm",
				VisualProbability = 1f,
				ShieldHitDraw = true,
				Particles = new AmmoParticleDef
				{
                    Ammo = new ParticleDef
                    {
                        Name = "MD_BulletGlowMedYellow", //Archer_MissileSmokeTrail
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
                        Name = "MD_HydraRocketExplosion", //MD_HydraRocketExplosion MD_InstallationExplosion
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
                    ColorVariance = Random(start: 0f, end: 2f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.2f, end: 0.2f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 10f,
                        Width = 0.3f,
                        Color = Color(red: 30f, green: 22f, blue: 1.5f, alpha: 1f),
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
						DecayTime = 30,
						Color = Color(red: 1, green: 1, blue: 1, alpha: 1f),
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
				HitSound = "HWR_LargeExplosion",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
			}, // Don't edit below this line
        };
    }
}
