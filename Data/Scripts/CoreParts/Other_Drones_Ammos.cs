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
        private AmmoDef Others_Drone_Offense_Launch => new AmmoDef
        {
            AmmoMagazine = "Others_Drone_Falcon",
            AmmoRound = "Offense Falcon Mode", 
            BaseDamage = 1f,
            Mass = 500f, // in kilograms
            Health = 200f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 5f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
            Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "Others_Drone_Offense_Main", // AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 0, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = true, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards), value is read from parent ammo type.
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                ArmWhenHit = false, // Setting this to true will arm the projectile when its shot by other projectiles.
                AdvOffset = Vector(x: 0, y: 0, z: 0), // advanced offsets the fragment by xyz coordinates relative to parent, value is read from fragment ammo type.
            },
            Trajectory = new TrajectoryDef
            {
                Guidance = Smart,
                MaxLifeTime = 1, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 200f,
                DesiredSpeed = 150,
                MaxTrajectory = 2500,
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed
                Smarts = new SmartsDef
                {
                    SteeringLimit = 100, // 0 means no limit, value is in degrees, good starting is 150.  This enable advanced smart "control", cost of 3 on a scale of 1-5, 0 being basic smart.
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 3f, // controls how responsive tracking is.
                    MaxLateralThrust = 0f, // controls how sharp the trajectile may turn
                    NavAcceleration = 0, // helps influence how the projectile steers. 
                    TrackingDelay = 60, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
                    CheckFutureIntersection = true, // Utilize obstacle avoidance for drones
                    FutureIntersectionRange = 0,
                    MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
                    Roam = true, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
					OffsetRatio = 0.2f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 60, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FocusOnly = false, // only target the constructs Ai's focus target
                    FocusEviction = false, // If FocusOnly and this to true will force smarts to lose target when there is no focus target
                    ScanRange = 2000, // 0 disables projectile screening, the max range that this projectile will be seen at by defending grids (adds this projectile to defenders lookup database). 
					MinTurnSpeed = 50, // set this to a reasonable value to avoid projectiles from spinning in place or being too aggressive turing at slow speeds 
                    NoTargetApproach = false, // If true approaches can begin prior to the projectile ever having had a target.
                    AltNavigation = true, // If true this will swap the default navigation algorithm from ProNav to ZeroEffort Miss.  Zero effort is more direct/precise but less cinematic 
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
                        Name = "AWE_Drone_Thruster", //ShipWelderArc
                        Color = Color(red: 25, green: 25, blue: 25, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 1.65f),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "MD_FlakExplosion", //MXA_MissileExplosion
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
                        Color = Color(red: 1f, green: 1f, blue: 1f, alpha: 0f), //Color(red: 1f, green: 10f, blue: 30f, alpha: 1f)
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
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
            }, // Don't edit below this line
        };

        private AmmoDef Others_Drone_Offense_Main => new AmmoDef
        {
            AmmoMagazine = "Energy",
            AmmoRound = "Others_Drone_Offense_Main", 
            BaseDamage = 1f,
            Mass = 500f, // in kilograms
            Health = 200f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 5f,
            HardPointUsable = false, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
			Sync = new SynchronizeDef
            {
                Full = false, // Be careful, do not use on high fire rate weapons or ammos with many simultaneous fragments. This will send position updates twice per second per projectile/fragment and sync target (grid/block) changes.
                PointDefense = false, // Server will inform clients of what projectiles have died by PD defense and will trigger destruction.
                OnHitDeath = false, // Server will inform clients when projectiles die due to them hitting something and will trigger destruction.
            },
			Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "Others_Drone_Gunship", // AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 4, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = false, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards).
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                ArmWhenHit = false, // Setting this to true will arm the projectile when its shot by other projectiles.
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below
                {
                    Enable = true, // Enables TimedSpawns mechanism
                    Interval = 3, // Time between spawning fragments, in ticks
                    StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 260, // Max number of fragment children to spawn
                    Proximity = 1000, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = false, // Parent dies once after it spawns its last child.
                    PointAtTarget = true, // Start fragment direction pointing at Target
                    PointType = Lead, // Point accuracy: Direct, Lead (always fire), Predict (only fire if it can hit)
					DirectAimCone = 180f, //Aim cone used for Direct fire, in degrees
                    GroupSize = 20, // Number of spawns in each group
                    GroupDelay = 180, // Delay between each group.
                },
            },
            AreaOfDamage = new AreaOfDamageDef
            {
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 5f,
                    Damage = 20000f,
                    Depth = 5f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    //.Exponential drops off exponentially.  Does not scale to max radius
                    ArmOnlyOnHit = false,
                    MinArmingTime = 0,
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
                MaxLifeTime = 10800, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 200f,
                DesiredSpeed = 150,
                MaxTrajectory = 30000f,
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed
                Smarts = new SmartsDef
                {
                    SteeringLimit = 100, // 0 means no limit, value is in degrees, good starting is 150.  This enable advanced smart "control", cost of 3 on a scale of 1-5, 0 being basic smart.
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 3f, // controls how responsive tracking is.
                    MaxLateralThrust = 0f, // controls how sharp the trajectile may turn
                    NavAcceleration = 0, // helps influence how the projectile steers. 
                    TrackingDelay = 60, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
                    CheckFutureIntersection = true, // Utilize obstacle avoidance for drones
                    FutureIntersectionRange = 0,
                    MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
                    Roam = true, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
					OffsetRatio = 0f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 60, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FocusOnly = false, // only target the constructs Ai's focus target
                    FocusEviction = false, // If FocusOnly and this to true will force smarts to lose target when there is no focus target
                    ScanRange = 2000, // 0 disables projectile screening, the max range that this projectile will be seen at by defending grids (adds this projectile to defenders lookup database). 
					MinTurnSpeed = 50, // set this to a reasonable value to avoid projectiles from spinning in place or being too aggressive turing at slow speeds 
                    NoTargetApproach = false, // If true approaches can begin prior to the projectile ever having had a target.
                    AltNavigation = true, // If true this will swap the default navigation algorithm from ProNav to ZeroEffort Miss.  Zero effort is more direct/precise but less cinematic 
                },
                Approaches = new [] // These approaches move forward and backward in order, once the end condition of the last one is reached it will revert to default behavior. Cost level of 4+, or 5+ if used with steering.
                {

                    //0
                    new ApproachDef // Head to target and loiter
                    {
                        // Start/End behaviors 
                        RestartCondition = ForceRestart, // Wait, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        RestartList = new[] 
                        { // This list is used if RestartCondition is set to ForceRestart and trigger requirement was met. -1 to reset to BEFORE the for approach stage was activated.  First stage is 0, second is 1, etc...
                            new WeightedIdListDef
                            {
                                ApproachId = 2,
                                MaxRuns = 0,
                                Weight = Random(0, 99),
                                End1WeightMod = 99, 
                                End2WeightMod = 0,
                                End3WeightMod = 0,
                            },
                            new WeightedIdListDef
                            {
                                ApproachId = 1,
                                MaxRuns = 0,
                                Weight = Random(0, 99f),
                                End1WeightMod = 0, 
                                End2WeightMod = 99,
                                End3WeightMod = 99,
                            },
                        },
                        Operators = StartEnd_Or, // Controls how the start and end conditions are matched:  StartEnd_And, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = false, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.

                        // Start/End conditions
                        StartCondition1 = Spawn, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // Ignore(skip this condition)*, DistanceFromPositionC[<=], DistanceToPositionC[>=], DistanceFromPositionB[<=], DistanceToPositionB[>=]
                                                    // DistanceFromTarget[<=], DistanceToTarget[>=], DistanceFromEndTrajectory[<=], DistanceToEndTrajectory[>=], Lifetime[>=], DeadTime[<=],
                                                    // MinTravelRequired[>=], MaxTravelRequired[<=], Spawn(per stage), DesiredElevation(tolerance can be set with ElevationTolerance),
                                                    // NextTimedSpawn[<=], SinceTimedSpawn[>=], RelativeLifetime[>=], RelativeDeadTime[<=], RelativeSpawns[>=], EnemyTargetLoss[>=],
                                                    // RelativeHealthLost[>=], HealthRemaining[<=],
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore, 
                        EndCondition1 = RelativeSpawns, 
                        EndCondition2 = DistanceToPositionC,  //EnemyTargetLoss
                        EndCondition3 = EnemyTargetLoss, //DistanceToTarget

                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 1,
                        Start2Value = 0,
                        End1Value = 259, 
                        End2Value = 3500, //10 seconds
                        End3Value = 600, 
                        
                        // Special triggers when the start/end conditions are met (DoNothing, EndProjectile, EndProjectileOnRestart, StoreDestination)
                        StartEvent = DoNothing,
                        EndEvent = DoNothing,  
                        
                        // Relative positions and directions
                        Forward = ForwardTargetDirection, // ForwardElevationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection   
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpDestinationDirection
                        
                        PositionB = Surface, // Origin, Shooter, Target, Surface, MidPoint, Current, Nothing, StoredStartPosition, StoredEndPosition, StoredStartLocalPosition, StoredEndLocalPosition
                        PositionC = Target, 
                        Elevation = Surface, 
                        
                        //
                        // Control if the vantagepoints update every frame or only at start.
                        //
                        AdjustForward = true, // adjust forwardDir overtime.
                        AdjustUp = true, // adjust upDir overtime
                        AdjustPositionB = true, // Updated the source position overtime.
                        AdjustPositionC = true, // Update destination overtime
                        LeadRotateElevatePositionB = false, // Add lead and rotation to Source Position
                        LeadRotateElevatePositionC = true, // Add lead and rotation to Destination Position
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = true, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 0, // Minimum travel distance before projectile begins racing to target
                        DesiredElevation = 300, // The desired elevation relative to source 
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = StoredStartLocalPosition,
                        StoredEndType = StoredEndLocalPosition,
                        // Controls the leading behavior
                        LeadDistance = 100, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 1f, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 1f, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).
						//for some reason my drones cant shoot if they are traveling too fast???

                        // Target navigation behavior 
                        Orbit = true, // Orbit the target
                        OrbitRadius = 700, // The orbit radius to extend between the projectile and the target (target volume + this value)
                        OffsetMinRadius = 0, // Min Radius to offset from target.  
                        OffsetMaxRadius = 0, // Max Radius to offset from target.  
                        OffsetTime = 0, // How often to change the offset direction.
                        
                        // Other
                        NoTimedSpawns = false, // When true timedSpawns will not be triggered while this approach is active.
                        DisableAvoidance = false, // Disable futureIntersect.
                        IgnoreAntiSmart = true, // If set to true, antismart cannot change this approaches target.
                        HeatRefund = 0, // how much heat to refund when related EndEvent/StartEvent is met.
                        ReloadRefund = false, // Refund a reload (for max reload).
                        ToggleIngoreVoxels = false, // Toggles whatever the default IgnoreVoxel value to its opposite. 
                        SelfAvoidance = true, // If this and FutureIntersect is enabled then projectiles will actively avoid the parent grids.
                        TargetAvoidance = true, // If this and FutureIntersect is enabled then projectiles will actively avoid the target.
                        SelfPhasing = false, // If enabled the projectiles can phase through the parent grids without doing damage or dying.
                        SwapNavigationType = false, // This will swap to other navigation  (i.e. the alternate of what is set in smart, ProNav vs ZeroEffort) 
                        // Audio/Visual Section
                        AlternateParticle = new ParticleDef // if blank it will use default, must be a default version for this to be useable. 
                        {
                            Name = "", 
                            Offset = Vector(x: 0, y: 0, z: 0),
                            DisableCameraCulling = true,// If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                            Extras = new ParticleOptionDef
                            {
                                Scale = 1,
                            },
                        },
                        StartParticle = new ParticleDef // Optional particle to play when this stage begins
                        {
                            Name = "",
                            Offset = Vector(x: 0, y: 0, z: 0),
                            DisableCameraCulling = true,// If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                            Extras = new ParticleOptionDef
                            {
                                Scale = 1,
                            },
                        },
                        AlternateModel = "", // Define only if you want to switch to an alternate model in this phase
                        AlternateSound = "", // if blank it will use default, must be a default version for this to be useable. 
						ModelRotateTime = 0, // If this value is greater than 0 then the projectile model will rotate to face the target, a value of 1 is instant (in ticks).
					},
                    //1
                    new ApproachDef // Die when too far from shooter
                    {
                        // Start/End behaviors 
                        RestartCondition = ForceRestart, // Wait, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        Operators = StartEnd_And, // Controls how the start and end conditions are matched:  StartEnd_And, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = true, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.

                        // Start/End conditions
                        StartCondition1 = DistanceToPositionB, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // Ignore(skip this condition)*, DistanceFromPositionC[<=], DistanceToPositionC[>=], DistanceFromPositionB[<=], DistanceToPositionB[>=]
                                                    // DistanceFromTarget[<=], DistanceToTarget[>=], DistanceFromEndTrajectory[<=], DistanceToEndTrajectory[>=], Lifetime[>=], DeadTime[<=],
                                                    // MinTravelRequired[>=], MaxTravelRequired[<=], Spawn(per stage), DesiredElevation(tolerance can be set with ElevationTolerance),
                                                    // NextTimedSpawn[<=], SinceTimedSpawn[>=], RelativeLifetime[>=], RelativeDeadTime[<=], RelativeSpawns[>=], EnemyTargetLoss[>=],
                                                    // RelativeHealthLost[>=], HealthRemaining[<=],
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore, 
                        EndCondition1 = DistanceFromPositionB, 
                        EndCondition2 = Ignore,  //EnemyTargetLoss
                        EndCondition3 = Ignore, //DistanceToTarget

                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 3001,
                        Start2Value = 0,
                        End1Value = 3000, 
                        End2Value = 0, //10 seconds
                        End3Value = 0, 
                        
                        // Special triggers when the start/end conditions are met (DoNothing, EndProjectile, EndProjectileOnRestart, StoreDestination)
                        StartEvent = EndProjectile,
                        EndEvent = EndProjectileOnRestart,  
                        
                        // Relative positions and directions
                        Forward = ForwardElevationDirection, // ForwardElevationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection   
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpDestinationDirection
                        
                        PositionB = Shooter, // Origin, Shooter, Target, Surface, MidPoint, Current, Nothing, StoredStartPosition, StoredEndPosition, StoredStartLocalPosition, StoredEndLocalPosition
                        PositionC = Target, 
                        Elevation = Surface, 
                        
                        //
                        // Control if the vantagepoints update every frame or only at start.
                        //
                        AdjustForward = false, // adjust forwardDir overtime.
                        AdjustUp = false, // adjust upDir overtime
                        AdjustPositionB = false, // Updated the source position overtime.
                        AdjustPositionC = false, // Update destination overtime
                        LeadRotateElevatePositionB = false, // Add lead and rotation to Source Position
                        LeadRotateElevatePositionC = true, // Add lead and rotation to Destination Position
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = false, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 0, // Minimum travel distance before projectile begins racing to target
                        DesiredElevation = -500, // The desired elevation relative to source 
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = StoredStartLocalPosition,
                        StoredEndType = StoredEndLocalPosition,
                        // Controls the leading behavior
                        LeadDistance = 0, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 1f, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 1f, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).
						//for some reason my drones cant shoot if they are traveling too fast???

                        // Target navigation behavior 
                        Orbit = false, // Orbit the target
                        OrbitRadius = 400, // The orbit radius to extend between the projectile and the target (target volume + this value)
                        OffsetMinRadius = -100, // Min Radius to offset from target.  
                        OffsetMaxRadius = 100, // Max Radius to offset from target.  
                        OffsetTime = 60, // How often to change the offset direction.
                        
                        // Other
                        NoTimedSpawns = false, // When true timedSpawns will not be triggered while this approach is active.
                        DisableAvoidance = false, // Disable futureIntersect.
                        IgnoreAntiSmart = true, // If set to true, antismart cannot change this approaches target.
                        HeatRefund = 0, // how much heat to refund when related EndEvent/StartEvent is met.
                        ReloadRefund = false, // Refund a reload (for max reload).
                        ToggleIngoreVoxels = false, // Toggles whatever the default IgnoreVoxel value to its opposite. 
                        SelfAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the parent grids.
                        TargetAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the target.
                        SelfPhasing = false, // If enabled the projectiles can phase through the parent grids without doing damage or dying.
                        SwapNavigationType = false, // This will swap to other navigation  (i.e. the alternate of what is set in smart, ProNav vs ZeroEffort) 
                        // Audio/Visual Section
                        AlternateParticle = new ParticleDef // if blank it will use default, must be a default version for this to be useable. 
                        {
                            Name = "MD_GunshipExplosion", 
                            Offset = Vector(x: 0, y: 0, z: 0),
                            DisableCameraCulling = true,// If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                            Extras = new ParticleOptionDef
                            {
                                Scale = 1,
                            },
                        },
                        StartParticle = new ParticleDef // Optional particle to play when this stage begins
                        {
                            Name = "MD_GunshipExplosion",
                            Offset = Vector(x: 0, y: 0, z: 0),
                            DisableCameraCulling = true,// If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                            Extras = new ParticleOptionDef
                            {
                                Scale = 1,
                            },
                        },
                        AlternateModel = "", // Define only if you want to switch to an alternate model in this phase
                        AlternateSound = "", // if blank it will use default, must be a default version for this to be useable. 
						ModelRotateTime = 0, // If this value is greater than 0 then the projectile model will rotate to face the target, a value of 1 is instant (in ticks).
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
                        Name = "AWE_Drone_Thruster", //ShipWelderArc
                        Color = Color(red: 25, green: 25, blue: 25, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 1.65f),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "MD_FlakExplosion", //MXA_MissileExplosion
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
                        Color = Color(red: 1f, green: 1f, blue: 1f, alpha: 0f), //Color(red: 1f, green: 10f, blue: 30f, alpha: 1f)
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
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
            }, // Don't edit below this line
        };

        private AmmoDef Others_Drone_Defense_Launch => new AmmoDef
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
            Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "Others_Drone_Defense_Main", // AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 0, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = true, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards), value is read from parent ammo type.
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                ArmWhenHit = false, // Setting this to true will arm the projectile when its shot by other projectiles.
                AdvOffset = Vector(x: 0, y: 0, z: 0), // advanced offsets the fragment by xyz coordinates relative to parent, value is read from fragment ammo type.
            },
            Trajectory = new TrajectoryDef
            {
                Guidance = Smart,
                MaxLifeTime = 1, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 200f,
                DesiredSpeed = 150,
                MaxTrajectory = 3000f,
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed
                Smarts = new SmartsDef
                {
                    SteeringLimit = 75, // 0 means no limit, value is in degrees, good starting is 150.  This enable advanced smart "control", cost of 3 on a scale of 1-5, 0 being basic smart.
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 3f, // controls how responsive tracking is.
                    MaxLateralThrust = 0f, // controls how sharp the trajectile may turn
                    NavAcceleration = 0, // helps influence how the projectile steers. 
                    TrackingDelay = 60, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = true, // when set to true ammo picks its own target, does not use hardpoint's.
                    CheckFutureIntersection = true, // Utilize obstacle avoidance for drones
                    FutureIntersectionRange = 0,
                    MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
                    Roam = true, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
					OffsetRatio = 0f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 0, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FocusOnly = false, // only target the constructs Ai's focus target
                    FocusEviction = false, // If FocusOnly and this to true will force smarts to lose target when there is no focus target
                    ScanRange = 2000, // 0 disables projectile screening, the max range that this projectile will be seen at by defending grids (adds this projectile to defenders lookup database). 
					MinTurnSpeed = 50, // set this to a reasonable value to avoid projectiles from spinning in place or being too aggressive turing at slow speeds 
                    NoTargetApproach = false, // If true approaches can begin prior to the projectile ever having had a target.
                    AltNavigation = true, // If true this will swap the default navigation algorithm from ProNav to ZeroEffort Miss.  Zero effort is more direct/precise but less cinematic 
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
                        Name = "AWE_Drone_Thruster", //ShipWelderArc
                        Color = Color(red: 25, green: 25, blue: 25, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 1.65f),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "MD_FlakExplosion", //MXA_MissileExplosion
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
                        Color = Color(red: 1f, green: 1f, blue: 1f, alpha: 0f), //Color(red: 1f, green: 10f, blue: 30f, alpha: 1f)
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
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
            }, // Don't edit below this line
        };

        private AmmoDef Others_Drone_Defense_Main => new AmmoDef
        {
            AmmoMagazine = "Energy",
            AmmoRound = "Others_Drone_Defense_Main", 
            BaseDamage = 1f,
            Mass = 500f, // in kilograms
            Health = 200f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 5f,
            HardPointUsable = false, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = true, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
			Sync = new SynchronizeDef
            {
                Full = false, // Be careful, do not use on high fire rate weapons or ammos with many simultaneous fragments. This will send position updates twice per second per projectile/fragment and sync target (grid/block) changes.
                PointDefense = false, // Server will inform clients of what projectiles have died by PD defense and will trigger destruction.
                OnHitDeath = false, // Server will inform clients when projectiles die due to them hitting something and will trigger destruction.
            },
			Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "Others_Drone_Gunship", // AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 4, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = false, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards).
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                ArmWhenHit = false, // Setting this to true will arm the projectile when its shot by other projectiles.
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below
                {
                    Enable = true, // Enables TimedSpawns mechanism
                    Interval = 3, // Time between spawning fragments, in ticks
                    StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 260, // Max number of fragment children to spawn
                    Proximity = 1000, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = false, // Parent dies once after it spawns its last child.
                    PointAtTarget = true, // Start fragment direction pointing at Target
                    PointType = Lead, // Point accuracy: Direct, Lead (always fire), Predict (only fire if it can hit)
					DirectAimCone = 180f, //Aim cone used for Direct fire, in degrees
                    GroupSize = 20, // Number of spawns in each group
                    GroupDelay = 180, // Delay between each group.
                },
            },
            AreaOfDamage = new AreaOfDamageDef
            {
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 5f,
                    Damage = 20000f,
                    Depth = 5f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 0f,
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    //.Exponential drops off exponentially.  Does not scale to max radius
                    ArmOnlyOnHit = false,
                    MinArmingTime = 0,
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
                MaxLifeTime = 21600, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 200f,
                DesiredSpeed = 150,
                MaxTrajectory = 30000f,
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed
                Smarts = new SmartsDef
                {
                    SteeringLimit = 75, // 0 means no limit, value is in degrees, good starting is 150.  This enable advanced smart "control", cost of 3 on a scale of 1-5, 0 being basic smart.
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 3f, // controls how responsive tracking is.
                    MaxLateralThrust = 0f, // controls how sharp the trajectile may turn
                    NavAcceleration = 0, // helps influence how the projectile steers. 
                    TrackingDelay = 60, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = true, // when set to true ammo picks its own target, does not use hardpoint's.
                    CheckFutureIntersection = true, // Utilize obstacle avoidance for drones
                    FutureIntersectionRange = 0,
                    MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
                    Roam = true, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
					OffsetRatio = 0f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 0, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FocusOnly = false, // only target the constructs Ai's focus target
                    FocusEviction = false, // If FocusOnly and this to true will force smarts to lose target when there is no focus target
                    ScanRange = 2000, // 0 disables projectile screening, the max range that this projectile will be seen at by defending grids (adds this projectile to defenders lookup database). 
					MinTurnSpeed = 50, // set this to a reasonable value to avoid projectiles from spinning in place or being too aggressive turing at slow speeds 
                    NoTargetApproach = false, // If true approaches can begin prior to the projectile ever having had a target.
                    AltNavigation = true, // If true this will swap the default navigation algorithm from ProNav to ZeroEffort Miss.  Zero effort is more direct/precise but less cinematic 
                },
                Approaches = new [] // These approaches move forward and backward in order, once the end condition of the last one is reached it will revert to default behavior. Cost level of 4+, or 5+ if used with steering.
                {

                    //0
                    new ApproachDef // * in comments means default
                    {
                        // Start/End behaviors 
                        RestartCondition = MoveToPrevious, // Wait*, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        Operators = StartEnd_And, // Controls how the start and end conditions are matched:  StartEnd_And*, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = false, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.  

                        // Start/End conditions
                        StartCondition1 = Lifetime, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // Ignore(skip this condition)*, DistanceFromPositionC[<=], DistanceToPositionC[>=], DistanceFromPositionB[<=], DistanceToPositionB[>=]
                                                    // DistanceFromTarget[<=], DistanceToTarget[>=], DistanceFromEndTrajectory[<=], DistanceToEndTrajectory[>=], Lifetime[>=], DeadTime[<=],
                                                    // MinTravelRequired[>=], MaxTravelRequired[<=], Spawn(per stage), DesiredElevation(tolerance can be set with ElevationTolerance),
                                                    // NextTimedSpawn[<=], SinceTimedSpawn[>=], RelativeLifetime[>=], RelativeDeadTime[<=], RelativeSpawns[>=], EnemyTargetLoss[>=],
                                                    // RelativeHealthLost[>=], HealthRemaining[<=],
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore,
                        EndCondition1 = DesiredElevation,
                        EndCondition2 = Ignore,
                        EndCondition3 = Ignore,
                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 2,
                        Start2Value = 0,
                        End1Value = 1200,
                        End2Value = 0,
                        End3Value = 0, 
                        // Special triggers when the start/end conditions are met (DoNothing*, EndProjectile, EndProjectileOnRestart, StorePositionA, StorePositionB, StorePositionC, Refund)
                        StartEvent = DoNothing,
                        EndEvent = DoNothing,  
                        
                        // Stored "Local" positions are always relative to the shooter and will remain true even if the shooter moves or rotates.

                        // Relative positions and directions (relative to projectile current position aka PositionA)
                        Forward = ForwardElevationDirection, // ForwardElevationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection    
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpElevationDirection
                        PositionB = Nothing, // Origin*, Shooter, Target, Surface, MidPoint, PositionA, Nothing, StoredStartPosition, StoredEndPosition, StoredStartLocalPosition, StoredEndLocalPosition
                        PositionC = Shooter,
                        Elevation = Shooter, 
                        
                        //
                        // Control if the vantagepoints update every frame or only at start.
                        //
                        AdjustForward = true, // adjust forwardDir overtime.
                        AdjustUp = true, // adjust upDir overtime
                        AdjustPositionB = false, // Updated the position overtime.
                        AdjustPositionC = true, // Update the position overtime.
                        LeadRotateElevatePositionB = false, // Add Lead, Rotation and DesiredElevation to PositionB
                        LeadRotateElevatePositionC = false, // Add Lead, Rotation and DesiredElevation to PositionC
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = true, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir and ForwardDir
                        AngleVariance = Random(0, 0), // added to AngleOffset above, values of 0,0 disables feature
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 100, // Minimum travel distance before projectile begins racing to heading
                        DesiredElevation = 150, // The desired elevation relative to reference position 
                        // Storage Values
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = ApproachDef.RelativeTo.PositionA, // Uses same values as PositionB/PositionC/Elevation
                        StoredEndType = Target,
                        // Controls the leading behavior
                        LeadDistance = 40, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 1.5, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 1, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).

                        // navigation behavior 
                        Orbit = true, // Orbit the Position
                        OrbitRadius = 200, // The orbit radius to extend between the projectile and the Position (target volume + this value)
                        OffsetMinRadius = 0, // Min Radius to offset from Position.  
                        OffsetMaxRadius = 0, // Max Radius to offset from Position.  
                        OffsetTime = 0, // How often to change the offset radius.
                        
                        // Other
                        NoTimedSpawns = false, // When true timedSpawns will not be triggered while this approach is active.
                        DisableAvoidance = false, // Disable futureIntersect.
                        IgnoreAntiSmart = false, // If set to true, antismart cannot change this approaches target.
                        HeatRefund = 0, // how much heat to refund when related EndEvent/StartEvent is met.
                        ReloadRefund = false, // Refund a reload (for max reload).
                        ToggleIngoreVoxels = false, // Toggles whatever the default IgnoreVoxel value to its opposite. 
                        SelfAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the parent grids.
                        TargetAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the target.
                        SelfPhasing = false, // If enabled the projectiles can phase through the parent grids without doing damage or dying.
                        SwapNavigationType = false, // This will swap to other navigation  (i.e. the alternate of what is set in smart, ProNav vs ZeroEffort) 
                        // Audio/Visual Section
                        AlternateParticle = new ParticleDef // if blank it will use default, must be a default version for this to be useable. 
                        {
                            Name = "",
                            Offset = Vector(x: 0, y: 0, z: 0),
                            DisableCameraCulling = true,// If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                            Extras = new ParticleOptionDef
                            {
                                Scale = 1,
                            },
                        },
                        StartParticle = new ParticleDef // Optional particle to play when this stage begins
                        {
                            Name = "",
                            Offset = Vector(x: 0, y: 0, z: 0),
                            DisableCameraCulling = true,// If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                            Extras = new ParticleOptionDef
                            {
                                Scale = 1,
                            },
                        },
                        AlternateModel = "", // Define only if you want to switch to an alternate model in this phase
                        AlternateSound = "BoosterStageSound", // if blank it will use default, must be a default version for this to be useable. 
                        ModelRotateTime = 0, // If this value is greater than 0 then the projectile model will rotate to face the target, a value of 1 is instant (in ticks).
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
                        Name = "AWE_Drone_Thruster", //ShipWelderArc
                        Color = Color(red: 25, green: 25, blue: 25, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 1.65f),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1f,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "MD_FlakExplosion", //MXA_MissileExplosion
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
                        Color = Color(red: 1f, green: 1f, blue: 1f, alpha: 0f), //Color(red: 1f, green: 10f, blue: 30f, alpha: 1f)
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
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
            }, // Don't edit below this line
        };

        private AmmoDef Others_Drone_Gunship => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "Energy", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Others_Drone_Gunship", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 1f, // Direct damage; one steel plate is worth 100.
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
				Custom = Common_Ammos_DamageScales_Cockpits_SmallNerf,
            },
            AreaOfDamage = new AreaOfDamageDef 
			{
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
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
                    CustomParticle = "MD_GunshipExplosion",
                    CustomSound = "soundName",
                    Shape = Diamond, // Round or Diamond shape.  Diamond is more performance friendly.
                },
            },
            Trajectory = new TrajectoryDef 
			{
                Guidance = None, // None, Remote, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                MaxLifeTime = 420, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 400, // voxel phasing if you go above 5100
                MaxTrajectory = 2000f, // Max Distance the projectile or beam can Travel.
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
                        Name = "",  //MaterialHit_Metal_GatlingGun
                        ApplyToShield = false,
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1,
                            HitPlayChance = 1f,
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
