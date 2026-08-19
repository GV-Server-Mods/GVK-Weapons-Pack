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
            TerminalName = "155 AP", // Optional terminal name for this ammo type, used when picking ammo/cycling consumables.  Safe to have duplicates across different ammo defs.
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
                Diameter = -1, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
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
                        Name = "MD_BulletGlowMedPale", //ShipWelderArc
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
                    ColorVariance = Random(start: 0f, end: 0f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.1f, end: 0.1f), // adds random value to default width (negatives shrinks width)
					DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 16f,
                        Width = 0.45f,
                        Color = Color(red: 40, green: 40, blue: 32, alpha: 1), //Yellow-red for HE
                        Textures = new[] {"AryxBallisticTracer",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
						Textures = new[] {"WeaponTrail",},
                        DecayTime = 40,
                        Color = Color(red: 0.5f, green: 0.5f, blue: 0.5f, alpha: 0.5f),
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

		private AmmoDef LargeCalibreAmmoHE
		{
			get
			{
				var ammo = LargeCalibreAmmo;
				ammo.AmmoRound = "LargeCalibreAmmoHE";
				ammo.TerminalName = "155 HE";
				ammo.DamageScales.Armor.Light = -1f;
				ammo.DamageScales.Armor.Heavy = -1f;
				ammo.AreaOfDamage = new AreaOfDamageDef
				{
					EndOfLife = new EndOfLifeDef
					{
						Enable = true,
						Radius = 4f,
						Damage = 6000f,
						Depth = 4f,
						MaxAbsorb = 0f,
						Falloff = Pooled,
						ArmOnlyOnHit = true,
						MinArmingTime = 0,
						NoVisuals = false,
						NoSound = false,
						ParticleScale = 1,
						CustomParticle = "none",
						CustomSound = "none",
						Shape = Diamond,
					},
				};
				ammo.AmmoGraphics.Particles.Ammo.Name = "MD_BulletGlowMedRed";
				ammo.AmmoGraphics.Particles.Hit.Name = "MD_155HE_Hit";
				ammo.AmmoGraphics.Lines.Tracer.Color = Color(red: 60, green: 20, blue: 5, alpha: 1);
				ammo.AmmoGraphics.Lines.Trail.Textures = new[] { "WeaponLaser" };
				ammo.AmmoGraphics.Lines.Trail.DecayTime = 60;
				return ammo;
			}
		}

		private AmmoDef Ballistics_Cannon_NPC
		{
			get
			{
				var ammo = LargeCalibreAmmo;
				ammo.TerminalName = null;
				ammo.Shape.Diameter = 5;
				ammo.Fragment = new FragmentDef
				{
					AmmoRound = "Ballistics_Cannon_NPC_Fragment1",
					Fragments = 1,
					Degrees = .1f,
					Reverse = false,
					DropVelocity = true,
					Offset = 0f,
					Radial = 0f,
					MaxChildren = 0,
					IgnoreArming = true,
					ArmWhenHit = false,
					AdvOffset = Vector(x: 0, y: 0, z: 0),
					TimedSpawns = new TimedSpawnDef
					{
						Enable = true,
						Interval = 0,
						StartTime = 0,
						MaxSpawns = 1,
						Proximity = 2400,
						ParentDies = true,
						PointAtTarget = true,
						PointType = Direct,
						DirectAimCone = 15f,
						GroupSize = 1,
						GroupDelay = 1,
					},
				};
				ammo.Trajectory.Guidance = Smart;
				ammo.Trajectory.MaxLifeTime = 3000;
				ammo.Trajectory.SpeedVariance = Random(start: 0, end: 0);
				ammo.Trajectory.RangeVariance = Random(start: 0, end: 0);
				ammo.Trajectory.Smarts = new SmartsDef
				{
					SteeringLimit = 0,
					Inaccuracy = 0f,
					Aggressiveness = 0f,
					MaxLateralThrust = 0,
					NavAcceleration = 0,
					TrackingDelay = 0,
					AccelClearance = false,
					MaxChaseTime = 0,
					OverideTarget = false,
					CheckFutureIntersection = false,
					FutureIntersectionRange = 0,
					MaxTargets = 0,
					NoTargetExpire = false,
					Roam = false,
					KeepAliveAfterTargetLoss = true,
					OffsetRatio = 0f,
					OffsetTime = 0,
					OffsetMinRange = 0,
					FocusOnly = false,
					FocusEviction = false,
					ScanRange = 0,
					NoSteering = true,
					MinTurnSpeed = 0,
					NoTargetApproach = false,
					AltNavigation = false,
				};
				ammo.AmmoGraphics.Particles.Ammo.Name = "MD_BulletGlowMedRed";
				ammo.AmmoGraphics.Lines.Tracer.Color = Color(red: 60, green: 20, blue: 5, alpha: 10);
				ammo.AmmoGraphics.Lines.Trail.Textures = new[] { "WeaponLaser" };
				return ammo;
			}
		}

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