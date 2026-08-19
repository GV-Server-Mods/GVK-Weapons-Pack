using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.AmmoDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.AoeShape;
using static Scripts.Structure.WeaponDefinition.AmmoDef.AreaOfDamageDef.Falloff;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.CustomScalesDef.SkipMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DamageTypes.Damage;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.DeformDef.DeformTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.DamageScaleDef.ShieldDef.ShieldType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EjectionDef.SpawnType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarMode;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.EwarType;
using static Scripts.Structure.WeaponDefinition.AmmoDef.EwarDef.PushPullDef.Force;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.FragmentDef.TimedSpawnDef.PointTypes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.AdvBillboardsDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.DecalDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.FactionColor;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.Texture;
using static Scripts.Structure.WeaponDefinition.AmmoDef.GraphicDef.LineDef.TracerBaseDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.PatternDef.PatternModes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.ShapeDef.Shapes;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ConditionOperators;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.Conditions;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.FwdRelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ReInitCondition;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.RelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.StageEvents;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.UpRelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ModelRelativeTo;
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.GuidanceType;
using static VRageRender.MyBillboard.BlendTypeEnum; // 41 lines of usings... lmao

namespace Scripts
{ // Don't edit above this line
    partial class Parts
    {
		private AmmoDef NATO_25x184mm => new AmmoDef 
		{
            AmmoMagazine = "NATO_25x184mm",
            AmmoRound = "NATO_25x184mm",
			TerminalName = "NATO 25mm", // Optional terminal name for this ammo type, used when picking ammo/cycling consumables.  Safe to have duplicates across different ammo defs.
            BaseDamage = 100f,
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
                VisualProbability = 0.7f,
				Decals = Common_Ammos_Decals_GunBullet,
                Particles = new AmmoParticleDef
                {
                    Hit = new ParticleDef
                    {
                        Name = "MD_25_Hit", //MaterialHit_Metal_GatlingGun
                        ApplyToShield = false,
                        Offset = Vector(x: double.MaxValue, y: double.MaxValue, z: double.MaxValue),
                        DisableCameraCulling = false, // If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1f,
                            HitPlayChance = 0.4f,
                        },
                    },
                },
                
                Lines = new LineDef 
				{
                    DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 30f,
                        Width = 0.07f,
                        FactionColor = DontUse, // DontUse, Foreground, Background.
                        Color = Color(red: 10f, green: 4f, blue: 3f, alpha: 1),
                        Textures = new[] { "WeaponLaser", },// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    OffsetEffect = new OffsetEffectDef
                    {
                        //This allows for lightning-like effects on the base tracer only, NOT trail.

                        MaxOffset = 0.25f,// 0 offset value disables this effect, determines how far the offset is from the projectile.
                        MinLength = 8f,
                        MaxLength = 25f, // MinLength and MaxLength determine the minimum and maximum length between segments.
                                        // Note that smaller values on large tracers mean that many more billboards are used per projectile, see above.
                                        // Divide Tracer Length by MinLength to get the maximum amount of billboards seen per tick.

                        // Note: The segmentation starts at the back of the projectile (or start of the beam) and so long as there is some distance left of the tracer to cover with
                        // OffsetEffect then it will fill it without regard to how much distance is left. In other words, this effect can overshoot the front of the projectile (or end of the beam).
                    },
                },

            },
            AmmoAudio = new AmmoAudioDef 
			{
                HitSound = "MD_BulletHit",
                HitPlayChance = 0.15f,
			},
        };

		private AmmoDef NATO_25x184mm_Dual
		{
			get
			{
				var ammo = NATO_25x184mm;
				ammo.AmmoRound = "NATO_25x184mm_Dual";
				ammo.Fragment = new FragmentDef
				{
					AmmoRound = "NATO_25x184mm_Dual_Fragment",
					Fragments = 1,
					Degrees = .15f,
					Reverse = false,
					DropVelocity = true,
					Offset = 0f,
					Radial = 0f,
					MaxChildren = 1,
					IgnoreArming = true,
					ArmWhenHit = false,
					AdvOffset = Vector(x: 0, y: 0, z: 0),
					TimedSpawns = new TimedSpawnDef
					{
						Enable = true,
						Interval = 0,
						StartTime = 0,
						MaxSpawns = 1,
						Proximity = 1700,
						ParentDies = true,
						PointAtTarget = true,
						PointType = Lead,
						DirectAimCone = 5f,
						GroupSize = 1,
						GroupDelay = 1,
					},
				};
				ammo.Trajectory.Guidance = Smart;
				ammo.Trajectory.TargetLossDegree = 0f;
				ammo.Trajectory.TargetLossTime = 0;
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
				ammo.AmmoGraphics.VisualProbability = 0.6f;
				ammo.AmmoGraphics.Particles.Hit.Name = "MaterialHit_Metal_GatlingGun";
				ammo.AmmoGraphics.Particles.Hit.DisableCameraCulling = true;
				ammo.AmmoGraphics.Particles.Hit.Extras.Scale = 0.75f;
				ammo.AmmoGraphics.Particles.Hit.Extras.HitPlayChance = 0.2f;
				ammo.AmmoGraphics.Lines.ColorVariance = Random(start: 0f, end: 0f);
				ammo.AmmoGraphics.Lines.WidthVariance = Random(start: -0.05f, end: 0.05f);
				ammo.AmmoGraphics.Lines.Tracer.Length = 25f;
				ammo.AmmoGraphics.Lines.Tracer.Width = 0.10f;
				ammo.AmmoGraphics.Lines.Tracer.Color = Color(red: 22f, green: 10f, blue: 10f, alpha: 1);
				ammo.AmmoGraphics.Lines.Tracer.Textures = new[] { "ProjectileTrailLine" };
				ammo.AmmoGraphics.Lines.OffsetEffect = new OffsetEffectDef();
				return ammo;
			}
		}

		private AmmoDef NATO_25x184mm_Dual_Fragment
        {
            get
            {
                var ammo = NATO_25x184mm;
                ammo.AmmoRound = "NATO_25x184mm_Dual_Fragment";
				ammo.AmmoMagazine = "Energy";
				ammo.HardPointUsable = false;
                return ammo;
            }
        }
    }
}