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
using static Scripts.Structure.WeaponDefinition.AmmoDef.TrajectoryDef.ApproachDef.ModelRelativeTo;
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

		private AmmoDef Others_Drone_Offense_Advanced => new AmmoDef
		{
			AmmoMagazine = "Others_Drone_Falcon",
			AmmoRound = "Offense Falcon V2",
			BaseDamage = 1f,
			Mass = 500f,
			Health = 200f,
			BackKickForce = 5f,
			HardPointUsable = true,
			NpcSafe = true,
			NoGridOrArmorScaling = true,
			Sync = Common_Ammos_Synchronize_Full,
			Fragment = new FragmentDef
			{
				AmmoRound = "Others_Drone_Gunship",
				Fragments = 1,
				Degrees = 4,
				Reverse = false,
				DropVelocity = false,
				Offset = 0f,
				Radial = 0f,
				MaxChildren = 0,
				IgnoreArming = true,
				ArmWhenHit = false,
				TimedSpawns = new TimedSpawnDef
				{
					Enable = true,
					Interval = 6, // 100ms
					StartTime = 0,
					MaxSpawns = 260,
					Proximity = 1000,
					ParentDies = false,
					PointAtTarget = true,
					PointType = Lead,
					DirectAimCone = 180f,
					GroupSize = 10,
					GroupDelay = 180, // 3 seconds between bursts
				},
			},
			AreaOfDamage = new AreaOfDamageDef
			{
				EndOfLife = new EndOfLifeDef
				{
					Enable = true,
					Radius = 5f,
					Damage = 20000f,
					Depth = 5f,
					MaxAbsorb = 0f,
					Falloff = Pooled,
					ArmOnlyOnHit = false,
					MinArmingTime = 0,
					NoVisuals = false,
					NoSound = false,
					ParticleScale = 1.5f,
					CustomParticle = "MD_FlakExplosion",
					CustomSound = "HWR_SmallExplosion",
					Shape = Diamond,
				},
			},
			Trajectory = new TrajectoryDef
			{
				Guidance = Smart,
				MaxLifeTime = 10800, // 3 minutes at 60 TPS (supports full pursuit, gun run, and dive)
				AccelPerSec = 200f,
				DesiredSpeed = 150,
				MaxTrajectory = 30000f, // 30km cumulative pursuit ceiling for high-speed (90 m/s) rover chases
				SpeedVariance = Random(start: 0, end: 0),
				Smarts = new SmartsDef
				{
					SteeringLimit = 150, // Enforces aerodynamic turn rate, smooth banking arcs
					Inaccuracy = 0f,
					Aggressiveness = 2.5f, // Smooth tracking response
					MaxLateralThrust = 0.8f, // Softens lateral jerks while retaining terrain climbing authority
					NavAcceleration = -1f, // <0 truly disables twitchy proportional snap (0 defaulted to 1/2 aggressiveness)
					TrackingDelay = 60, // Allows drone to launch upward out of the hangar before smarts engage
					AccelClearance = false,
					MaxChaseTime = 0, // Retains primary target until dead
					OverideTarget = true, // Autonomously acquires nearest hostile if launched without a target
					CheckFutureIntersection = true, // Obstacle and terrain avoidance
					FutureIntersectionRange = 0, // Default to DesiredSpeed + Shape Diameter
					MaxTargets = 0,
					NoTargetExpire = true, // Safely self-destructs if no hostile is found within range
					Roam = true, // Patrols current area after target loss
					KeepAliveAfterTargetLoss = false,
					OffsetRatio = 0.05f, // Subtle organic drift during flight and roaming
					OffsetTime = 90,
					OffsetMinRange = 0,
					FocusOnly = false,
					FocusEviction = false,
					ScanRange = 2500, // Matches hangar 2500m targeting range
					NoSteering = false,
					MinTurnSpeed = 50,
					NoTargetApproach = false, // Skips approach until target is acquired (prevents Frame-1 zero-target leash trips)
					AltNavigation = false, // ProNav guidance for natural, cinematic flight curves instead of rigid ZeroEffort
					IgnoreAntiSmarts = false,
				},
				Approaches = new[]
				{
					// Stage 0: Combat Orbit - Orbit target at 500m, dynamically contour 200m above terrain surface
					new ApproachDef
					{
						RestartCondition = MoveToNext,
						Operators = StartAnd_EndOr,
						CanExpireOnceStarted = true,
						ForceRestart = false,

						StartCondition1 = Spawn,
						StartCondition2 = Ignore,
						EndCondition1 = RelativeSpawns,  // Expended all 250 fragment rounds
						EndCondition2 = DistanceToTarget, // Leash: if target pulls >3500m away from drone, breaks orbit to dive
						EndCondition3 = EnemyTargetLoss,  // Target destroyed/lost
						EndCondition4 = Ignore,
						EndCondition5 = Ignore,

						Start1Value = 1,
						Start2Value = 0,
						End1Value = 250, // 25 bursts (250 rounds) exhausted -> proceed to Stage 1 (Kamikaze)
						End2Value = 3500, // 3.5km pursuit leash buffer
						End3Value = 720, // 12 seconds patrol roaming before self-destructing
						End4Value = 0,
						End5Value = 0,

						StartEvent = DoNothing,
						EndEvent = DoNothing,

						Forward = ForwardTargetDirection,
						Up = UpRelativeToGravity,
						PositionB = Surface, // Dynamically tracks terrain surface directly under drone
						PositionC = Target,  // Horizontal center for combat orbit
						Elevation = Target,  // Activates WC PlaneD.DistanceToPoint projection to translate local terrain height into orbit plane

						AdjustForward = true,
						AdjustUp = true,
						AdjustPositionB = true, // Frame-by-frame terrain height updates as drone flies
						AdjustPositionC = true,
						LeadRotateElevatePositionB = false, // Must be false; Forward points radially inward, not tangential
						LeadRotateElevatePositionC = false,
						TrajectoryRelativeToB = false, // Orbits Target (PositionC); true causes self-orbit figure-8s
						ElevationRelativeToC = false, // Projects elevation delta from Target plane to PositionB (local terrain)

						AngleOffset = 0,
						ElevationTolerance = 0,
						TrackingDistance = 0,
						DesiredElevation = 200, // Vertical clearance maintained above local terrain under drone

						LeadDistance = 0, // Must be 0; radial lead pulls orbit center down into valleys/basins
						PushLeadByTravelDistance = false,

						AccelMulti = 1.0f,
						DeAccelMulti = 0,
						TotalAccelMulti = 0,
						SpeedCapMulti = 1f,

						Orbit = true,
						OrbitRadius = 600, // 600m combat orbit radius
						OffsetMinRadius = 50,
						OffsetMaxRadius = 50,
						OffsetTime = 60,

						NoTimedSpawns = false, // TimedSpawns active (fires within Proximity = 1000)
						DisableAvoidance = false, // Active obstacle avoidance
						IgnoreAntiSmart = true,
						HeatRefund = 0,
						ReloadRefund = false,
						ToggleIngoreVoxels = false,
						SelfAvoidance = true,
						TargetAvoidance = true,
						SelfPhasing = false,
						SwapNavigationType = false,
						DockOnEnd = false,
					},
				},
			},
			AmmoGraphics = new GraphicDef
			{
				ModelName = "\\Models\\AWE_Drones\\ARYX_SidekickDrone.mwm",
				VisualProbability = 1f,
				ShieldHitDraw = true,
				Particles = new AmmoParticleDef
				{
					Ammo = new ParticleDef
					{
						Name = "MDB_Drone_Thruster",
						Color = Color(red: 25, green: 25, blue: 25, alpha: 1),
						Offset = Vector(x: 0, y: 0, z: 1.65f),
						Extras = new ParticleOptionDef
						{
							Scale = 1f,
						},
					},
					Hit = new ParticleDef
					{
						Name = "MD_FlakExplosion",
						Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
						Offset = Vector(x: 0, y: 0, z: 0),
						Extras = new ParticleOptionDef
						{
							Scale = 1f,
							HitPlayChance = 1f,
						},
					},
				},
				Lines = new LineDef
				{
					Tracer = new TracerBaseDef
					{
						Enable = true,
						Length = 15f,
						Width = 0.5f,
						Color = Color(red: 1f, green: 1f, blue: 1f, alpha: 0f),
						Textures = new[] { "MD_MissileThrustFlame" },
					},
					Trail = new TrailDef
					{
						Enable = true,
						Textures = new[] { "WeaponLaser" },
						DecayTime = 150,
						Color = Color(red: 1.01f, green: 1.10f, blue: 1.3f, alpha: 1f),
						Back = false,
						CustomWidth = 1.5f,
						UseColorFade = true,
					},
				},
			},
			AmmoAudio = new AmmoAudioDef
			{
				TravelSound = "MXA_Archer_Travel",
				HitSound = "HWR_SmallExplosion",
				ShotSound = "",
				ShieldHitSound = "",
				PlayerHitSound = "",
				VoxelHitSound = "",
				FloatingHitSound = "",
				HitPlayChance = 1f,
				HitPlayShield = true,
			},
		};

		private AmmoDef Others_Drone_Defense_Main => new AmmoDef
		{
			AmmoMagazine = "Others_Drone_Falcon",
			AmmoRound = "Defense Falcon Mode", 
			BaseDamage = 1f,
			Mass = 500f, // in kilograms
			Health = 200f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
			BackKickForce = 5f,
			HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
			NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
			NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
			Sync = Common_Ammos_Synchronize_Full,
			Fragment = new FragmentDef
			{
				AmmoRound = "Others_Drone_Gunship",
				Fragments = 1,
				Degrees = 4,
				Reverse = false,
				DropVelocity = false,
				Offset = 0f,
				Radial = 0f,
				MaxChildren = 0,
				IgnoreArming = true,
				ArmWhenHit = false,
				TimedSpawns = new TimedSpawnDef
				{
					Enable = true,
					Interval = 6, // 100ms
					StartTime = 0,
					MaxSpawns = 5000, // Ample ammunition for 6-minute continuous CAP patrol
					Proximity = 2500, // Engages enemies anywhere within 2500m scan bubble
					ParentDies = false, // Stays alive on CAP patrol even if all ammo is expended
					PointAtTarget = true, // Aims gunship turret at enemy
					PointType = Lead, // Full lead intercept prediction matching Offense mode accuracy
					DirectAimCone = 180f,
					GroupSize = 10,
					GroupDelay = 120, // 2 seconds between bursts
				},
			},
			AreaOfDamage = new AreaOfDamageDef
			{
				EndOfLife = new EndOfLifeDef
				{
					Enable = true,
					Radius = 5f,
					Damage = 20000f,
					Depth = 5f,
					MaxAbsorb = 0f,
					Falloff = Pooled,
					ArmOnlyOnHit = false,
					MinArmingTime = 0,
					NoVisuals = false,
					NoSound = false,
					ParticleScale = 1.5f,
					CustomParticle = "MD_FlakExplosion",
					CustomSound = "HWR_SmallExplosion",
					Shape = Diamond,
				},
			},
			Trajectory = new TrajectoryDef
			{
				Guidance = Smart,
				MaxLifeTime = 21600, // 6 minutes at 60 TPS
				AccelPerSec = 200f,
				DesiredSpeed = 150,
				MaxTrajectory = 30000f,
				SpeedVariance = Random(start: 0, end: 0),
				Smarts = new SmartsDef
				{
					SteeringLimit = 150, // Enforces aerodynamic turn rate, smooth banking arcs
					Inaccuracy = 0f,
					Aggressiveness = 2.5f, // Smooth tracking response
					MaxLateralThrust = 0.8f, // Softens lateral jerks while retaining terrain climbing authority
					NavAcceleration = -1f, // <0 truly disables twitchy proportional snap
					TrackingDelay = 60, // Allows drone to launch upward out of the hangar before smarts engage
					AccelClearance = false,
					MaxChaseTime = 180, // Re-evaluates threat priorities every 3 seconds to switch to closer hostiles
					OverideTarget = true, // Autonomously acquires closest hostile targets within range
					CheckFutureIntersection = true, // Obstacle and terrain avoidance
					FutureIntersectionRange = 0,
					MaxTargets = 0,
					NoTargetExpire = false,
					Roam = true,
					KeepAliveAfterTargetLoss = true,
					OffsetRatio = 0.05f, // Subtle organic drift during flight and roaming
					OffsetTime = 90,
					OffsetMinRange = 0,
					FocusOnly = false,
					FocusEviction = false, // Fire-and-forget: continues engaging closest hostiles when HUD target is deselected
					ScanRange = 2500, // 2500m hostile detection bubble
					NoSteering = false,
					MinTurnSpeed = 50,
					NoTargetApproach = true, // Launches and begins CAP orbit without requiring target lock
					AltNavigation = false, // ProNav guidance for natural, cinematic flight curves
					IgnoreAntiSmarts = false,
				},
				Approaches = new[]
				{
					// Defensive CAP Orbit - Orbits launcher grid at 300m, dynamically contouring 150m above terrain
					new ApproachDef
					{
						RestartCondition = MoveToNext,
						Operators = StartAnd_EndOr,
						CanExpireOnceStarted = true,
						ForceRestart = false,

						StartCondition1 = Spawn,
						StartCondition2 = Ignore,
						EndCondition1 = Lifetime,
						EndCondition2 = Ignore,
						EndCondition3 = Ignore,
						EndCondition4 = Ignore,
						EndCondition5 = Ignore,

						Start1Value = 1,
						Start2Value = 0,
						End1Value = 21600, // Orbits until MaxLifeTime expires
						End2Value = 0,
						End3Value = 0,
						End4Value = 0,
						End5Value = 0,

						StartEvent = DoNothing,
						EndEvent = EndProjectile, // Self-destructs when lifetime ends

						Forward = ForwardRelativeToShooter,
						Up = UpRelativeToGravity,
						PositionB = Surface, // Dynamically tracks terrain surface directly under drone
						PositionC = Shooter, // Orbits the launcher grid
						Elevation = Target,  // Uses PlaneD.DistanceToPoint projection to calculate terrain clearance relative to Shooter plane

						AdjustForward = true,
						AdjustUp = true,
						AdjustPositionB = true, // Frame-by-frame terrain updates
						AdjustPositionC = true, // Frame-by-frame tracking of launcher grid
						LeadRotateElevatePositionB = false,
						LeadRotateElevatePositionC = false,
						TrajectoryRelativeToB = false, // Orbits Shooter (PositionC)
						ElevationRelativeToC = false, // Calculates elevation delta from Shooter plane to PositionB (local terrain)

						AngleOffset = 0,
						ElevationTolerance = 0,
						TrackingDistance = 0,
						DesiredElevation = 150, // 150m clearance above local terrain around launcher grid

						LeadDistance = 0, // No radial lead distortion
						PushLeadByTravelDistance = false,

						AccelMulti = 1.0f,
						DeAccelMulti = 0,
						TotalAccelMulti = 0,
						SpeedCapMulti = 1f,

						Orbit = true,
						OrbitRadius = 300, // 300m defensive CAP perimeter around launcher
						OffsetMinRadius = 50,
						OffsetMaxRadius = 50,
						OffsetTime = 60,

						NoTimedSpawns = false, // Timed spawns active (fires when enemy in 1000m range)
						DisableAvoidance = false, // Active obstacle avoidance
						IgnoreAntiSmart = true,
						HeatRefund = 0,
						ReloadRefund = false,
						ToggleIngoreVoxels = false,
						SelfAvoidance = true, // Avoids crashing into launcher grid
						TargetAvoidance = true,
						SelfPhasing = false,
						SwapNavigationType = false,
						DockOnEnd = false,
					},
				},
			},
			AmmoGraphics = new GraphicDef
			{
				ModelName = "\\Models\\AWE_Drones\\ARYX_SidekickDrone.mwm",
				VisualProbability = 1f,
				ShieldHitDraw = true,
				Particles = new AmmoParticleDef
				{
					Ammo = new ParticleDef
					{
						Name = "MDB_Drone_Thruster",
						Color = Color(red: 25, green: 25, blue: 25, alpha: 1),
						Offset = Vector(x: 0, y: 0, z: 1.65f),
						Extras = new ParticleOptionDef
						{
							Scale = 1f,
						},
					},
					Hit = new ParticleDef
					{
						Name = "MD_FlakExplosion",
						Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
						Offset = Vector(x: 0, y: 0, z: 0),
						Extras = new ParticleOptionDef
						{
							Scale = 1f,
							HitPlayChance = 1f,
						},
					},
				},
				Lines = new LineDef
				{
					Tracer = new TracerBaseDef
					{
						Enable = true,
						Length = 15f,
						Width = 0.5f,
						Color = Color(red: 1f, green: 1f, blue: 1f, alpha: 0f),
						Textures = new[] { "MD_MissileThrustFlame" },
					},
					Trail = new TrailDef
					{
						Enable = true,
						Textures = new[] { "WeaponLaser" },
						DecayTime = 150,
						Color = Color(red: 1.01f, green: 1.10f, blue: 1.3f, alpha: 1f),
						Back = false,
						CustomWidth = 1.5f,
						UseColorFade = true,
					},
				},
			},
			AmmoAudio = new AmmoAudioDef
			{
				TravelSound = "MXA_Archer_Travel",
				HitSound = "HWR_SmallExplosion",
				ShotSound = "",
				ShieldHitSound = "",
				PlayerHitSound = "",
				VoxelHitSound = "",
				FloatingHitSound = "",
				HitPlayChance = 1f,
				HitPlayShield = true,
			},
		};

        private AmmoDef Others_Drone_Gunship => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "Energy", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Others_Drone_Gunship", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 2500f, // Direct damage; one steel plate is worth 100.
            Mass = 20f, // In kilograms; how much force the impact will apply to the target.
            Health = 0, // How much damage the projectile can take from other projectiles (base of 1 per hit) before dying; 0 disables this and makes the projectile untargetable.
            BackKickForce = 0f, // Recoil. This is applied to the Parent Grid.
            HardPointUsable = false, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            DamageScales = new DamageScaleDef 
			{
                MaxIntegrity = 0f, // Blocks with integrity higher than this value will be immune to damage from this projectile; 0 = disabled.
                DamageVoxels = false, // Whether to damage voxels.
                HealthHitModifier = 2, // How much Health to subtract from another projectile on hit; defaults to 1 if zero or less.
                Characters = 0.1f, // Character damage multiplier; defaults to 1 if zero or less.
                // For the following modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01f = 1% damage, 2 = 200% damage.
                Grids = new GridSizeDef
                {
                    Large = -1f, // Multiplier for damage against large grids.
                    Small = 0.75f, // Multiplier for damage against small grids.
                },
                Armor = new ArmorDef
                {
                    Armor = -1f, // Multiplier for damage against all armor. This is multiplied with the specific armor type multiplier (light, heavy).
                    Light = -1f, // Multiplier for damage against light armor.
                    Heavy = -1f, // Multiplier for damage against heavy armor.
                    NonArmor = -1f, // Multiplier for damage against every else.
                },
                DamageType = new DamageTypes // Damage type of each element of the projectile's damage; Kinetic, Energy
                {
                    Base = Kinetic, // Base Damage uses this
                    AreaEffect = Kinetic,
                    Detonation = Kinetic,
                    Shield = Kinetic, // Damage against shields is currently all of one type per projectile. Shield Bypass Weapons, always Deal Energy regardless of this line
                },
            },
            AreaOfDamage = new AreaOfDamageDef 
			{
                EndOfLife = new EndOfLifeDef
                {
                    Enable = false,
                    Radius = 4f,
                    Damage = 2500f,
                    Depth = 4f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    ArmOnlyOnHit = true,
                    MinArmingTime = 0,
                    NoVisuals = false,
                    NoSound = false,
                    ParticleScale = 1,
                    CustomParticle = "none",
                    CustomSound = "soundName",
                    Shape = Diamond, // Round or Diamond shape.  Diamond is more performance friendly.
                },
            },
            Trajectory = new TrajectoryDef 
			{
                Guidance = None, // None, Remote, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                MaxLifeTime = 420, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 500, // voxel phasing if you go above 5100
                MaxTrajectory = 1500f, // Max Distance the projectile or beam can Travel.
                SpeedVariance = Random(start: 0, end: 50), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
                RangeVariance = Random(start: 0, end: 50), // subtracts value from MaxTrajectory
            },
            AmmoGraphics = new GraphicDef 
			{
                ModelName = "", // Model Path goes here.  "\\Models\\Ammo\\Starcore_Arrow_Missile_Large"
                VisualProbability = 1f, // %
                Decals = new DecalDef
                {
                    MaxAge = 3600,
                    Map = new[]
                    {
                        new TextureMapDef
                        {
                            HitMaterial = "Metal",
                            DecalMaterial = "GunBullet",
                        },
                        new TextureMapDef
                        {
                            HitMaterial = "Glass",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Soil",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Wood",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "GlassOpaque",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
                        {
                            HitMaterial = "Stone",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Rock",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Ice",
                            DecalMaterial = "GunBullet",
                        },
						new TextureMapDef
						{
                            HitMaterial = "Soil",
                            DecalMaterial = "GunBullet",
                        },
                    },
                },
                Particles = new AmmoParticleDef
                {
                    Hit = new ParticleDef
                    {
                        Name = "MD_GunshipExplosion",  //MaterialHit_Metal_GatlingGun
                        ApplyToShield = false,
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1,
                            HitPlayChance = 0.5f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: 0f, end: 10f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.05f, end: 0.05f), // adds random value to default width (negatives shrinks width)
                    DropParentVelocity = false, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 10f, //
                        Width = 0.5f, //
                        Color = Color(red: 30f, green: 20, blue: 10f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        Textures = new[] {"ProjectileTrailLine",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                },
            },
            AmmoAudio = new AmmoAudioDef 
			{
                TravelSound = "", // SubtypeID for your Sound File. Travel, is sound generated around your Projectile in flight
                HitSound = "DOK_GunshipExplosion", // AutocannonExplosion
                ShotSound = "MD_GatlingBlisterFire",
                ShieldHitSound = "",
                PlayerHitSound = "DOK_GunshipExplosion",
                VoxelHitSound = "DOK_GunshipExplosion",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },
        };

    }
}
