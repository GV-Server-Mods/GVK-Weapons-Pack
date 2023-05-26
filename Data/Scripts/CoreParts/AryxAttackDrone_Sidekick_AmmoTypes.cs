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
        private AmmoDef Others_Drone_Gatling => new AmmoDef
        {
            AmmoMagazine = "AWE_SidekickDroneMag",
            AmmoRound = "Others_Drone_Gatling", 
            BaseDamage = 1f,
            Mass = 1000f, // in kilograms
            Health = 200f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 5f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "NATO_25x184mm", // AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 2, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = true, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards).
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                //FireSound = true, // Play fire/shoot sound
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below
                {
                    Enable = true, // Enables TimedSpawns mechanism
                    Interval = 2, // Time between spawning fragments, in ticks
                    StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 300, // Max number of fragment children to spawn
                    Proximity = 500, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = false, // Parent dies once after it spawns its last child.
                    PointAtTarget = true, // Start fragment direction pointing at Target
                    PointType = Predict, // Point accuracy: Direct, Lead (always fire), Predict (only fire if it can hit)
					DirectAimCone = 5f, //Aim cone used for Direct fire, in degrees
                    GroupSize = 30, // Number of spawns in each group
                    GroupDelay = 180, // Delay between each group.
                },
            },
            DamageScales = new DamageScaleDef
            {
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                HealthHitModifier = 0.5, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                Characters = -1f,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = 0.008f, // 1/125
                },
                Armor = new ArmorDef
                {
                    Armor = -1f,
                    Light = -1f,
                    Heavy = -1f,
                    NonArmor = -1f,
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
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 5f,
                    Damage = 4000f,
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
            Trajectory = new TrajectoryDef
            {
                Guidance = Smart,
                MaxLifeTime = 7200, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 200f,
                DesiredSpeed = 100,
                MaxTrajectory = 20000f,
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed
                Smarts = new SmartsDef
                {
                    SteeringLimit = 150, // 0 means no limit, value is in degrees, good starting is 150.  This enable advanced smart "control", cost of 3 on a scale of 1-5, 0 being basic smart.
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 2f, // controls how responsive tracking is.
                    MaxLateralThrust = 0.5f, // controls how sharp the trajectile may turn
                    NavAcceleration = 0, // helps influence how the projectile steers. 
                    TrackingDelay = 60, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
                    CheckFutureIntersection = true, // Utilize obstacle avoidance for drones
                    FutureIntersectionRange = 0,
                    MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
                    Roam = false, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
					OffsetRatio = 0.05f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 30, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FocusOnly = false, // only target the constructs Ai's focus target
                    MinTurnSpeed = 20, // set this to a reasonable value to avoid projectiles from spinning in place or being too aggressive turing at slow speeds 
                    NoTargetApproach = false, // If true approaches can begin prior to the projectile ever having had a target.
                    AltNavigation = true, // If true this will swap the default navigation algorithm from ProNav to ZeroEffort Miss.  Zero effort is more direct/precise but less cinematic 
                },
                Approaches = new [] // These approaches move forward and backward in order, once the end condition of the last one is reached it will revert to default behavior. Cost level of 4+, or 5+ if used with steering.
                {

                    //0
                    new ApproachDef // Launch
                    {
                        // Start/End behaviors 
                        RestartCondition = MoveToNext, // Wait, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        OnRestartRevertTo = -1, // This applies if RestartCondition is set to ForceRestart and trigger requirement was met. -1 to reset to BEFORE the for approach stage was activated.  First stage is 0, second is 1, etc...
                        Operators = StartEnd_And, // Controls how the start and end conditions are matched:  StartEnd_And, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = false, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.

                        // Start/End conditions
                        StartCondition1 = Spawn, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // DistanceFromDestination[<=], DistanceToDestination[>=], Lifetime[>=], DeadTime[<=], MinTravelRequired[>=], MaxTravelRequired[<=],
                                                    // Ignore(skip this condition), Spawn(works per stage), DesiredElevation(tolerance can be set with ElevationTolerance),
                                                    // NextTimedSpawn[<=], SinceTimedSpawn[>=], RelativeLifetime[>=], RelativeDeadTime[<=], RelativeSpawns[>=], EnemyTargetLoss[>=]
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore,
                        EndCondition1 = MinTravelRequired,
                        EndCondition2 = Ignore,
                        EndCondition3 = Ignore,

                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 0,
                        Start2Value = 0,
                        End1Value = 50,
                        End2Value = 0,
                        End3Value = 0, 
                        
                        // Special triggers when the start/end conditions are met (DoNothing, EndProjectile, EndProjectileOnRestart, StoreDestination)
                        StartEvent = DoNothing,
                        EndEvent = StorePositionC,

                        Forward = ForwardOriginDirection, // ForwardDestinationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection    
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpDestinationDirection
                        
                        PositionB = PositionA, // Origin, Shooter, Target, Surface, MidPoint, Current, Nothing, StoredStartPosition, StoredEndPosition, StoredStartLocalPosition, StoredEndLocalPosition
                        PositionC = PositionA,
                        Elevation = Surface, 
                        
                        //
                        // Control if the vantagepoints update every frame or only at start.
                        //
                        AdjustForward = true, // adjust forwardDir overtime.
                        AdjustUp = true, // adjust upDir overtime
                        AdjustPositionB = true, // Updated the source position overtime.
                        AdjustPositionC = true, // Update destination overtime
                        LeadRotateElevatePositionB = false, // Add lead and rotation to Source Position
                        LeadRotateElevatePositionC = false, // Add lead and rotation to Destination Position
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = false, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 0, // Minimum travel distance before projectile begins racing to target
                        DesiredElevation = 0, // The desired elevation relative to source 
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = PositionA,
                        StoredEndType = StoredEndLocalPosition,
                        // Controls the leading behavior
                        LeadDistance = 0, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 0.5f, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 1f, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).

                        // Target navigation behavior 
                        Orbit = false, // Orbit the target
                        OrbitRadius = 0, // The orbit radius to extend between the projectile and the target (target volume + this value)
                        OffsetMinRadius = 0, // Min Radius to offset from target.  
                        OffsetMaxRadius = 0, // Max Radius to offset from target.  
                        OffsetTime = 0, // How often to change the offset direction.
                        
                        // Other
                        NoTimedSpawns = true, // When true timedSpawns will not be triggered while this approach is active.
                        DisableAvoidance = false, // Disable futureIntersect.
                        IgnoreAntiSmart = true, // If set to true, antismart cannot change this approaches target.
                        HeatRefund = 0, // how much heat to refund when related EndEvent/StartEvent is met.
                        ReloadRefund = false, // Refund a reload (for max reload).
                        ToggleIngoreVoxels = false, // Toggles whatever the default IgnoreVoxel value to its opposite. 
                        SelfAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the parent grids.
                        TargetAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the target.
                        SelfPhasing = true, // If enabled the projectiles can phase through the parent grids without doing damage or dying.
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
                        AlternateSound = "" // if blank it will use default, must be a default version for this to be useable. 
                    },
					//1
					new ApproachDef // Travel to Target
                    {
                        // Start/End behaviors 
                        RestartCondition = MoveToNext, // Wait, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        OnRestartRevertTo = -1, // This applies if RestartCondition is set to ForceRestart and trigger requirement was met. -1 to reset to BEFORE the for approach stage was activated.  First stage is 0, second is 1, etc...
                        Operators = StartEnd_And, // Controls how the start and end conditions are matched:  StartEnd_And, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = false, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.

                        // Start/End conditions
                        StartCondition1 = DistanceToPositionC, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // DistanceFromDestination[<=], DistanceToDestination[>=], Lifetime[>=], DeadTime[<=], MinTravelRequired[>=], MaxTravelRequired[<=],
                                                    // Ignore(skip this condition), Spawn(works per stage), DesiredElevation(tolerance can be set with ElevationTolerance),
                                                    // NextTimedSpawn[<=], SinceTimedSpawn[>=], RelativeLifetime[>=], RelativeDeadTime[<=], RelativeSpawns[>=], EnemyTargetLoss[>=]
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore, 
                        EndCondition1 = DistanceFromPositionC, 
                        EndCondition2 = Ignore, 
                        EndCondition3 = Ignore,

                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 401,
                        Start2Value = 0,
                        End1Value = 400, 
                        End2Value = 0, 
                        End3Value = 0, 
                        
                        // Special triggers when the start/end conditions are met (DoNothing, EndProjectile, EndProjectileOnRestart, StoreDestination)
                        StartEvent = DoNothing,
                        EndEvent = DoNothing,  
                        
                        // Relative positions and directions
                        Forward = ForwardTargetDirection, // ForwardDestinationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection    
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpDestinationDirection
                        
                        PositionB = PositionA, // Origin, Shooter, Target, Surface, MidPoint, Current, Nothing, StoredStartPosition, StoredEndPosition, StoredStartLocalPosition, StoredEndLocalPosition
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
                        LeadRotateElevatePositionC = false, // Add lead and rotation to Destination Position
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = false, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 0, // Minimum travel distance before projectile begins racing to target
                        DesiredElevation = 50, // The desired elevation relative to source 
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = StoredStartLocalPosition,
                        StoredEndType = StoredEndLocalPosition,
                        // Controls the leading behavior
                        LeadDistance = 40, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 1.0, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 1, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).

                        // Target navigation behavior 
                        Orbit = false, // Orbit the target
                        OrbitRadius = 0, // The orbit radius to extend between the projectile and the target (target volume + this value)
                        OffsetMinRadius = 0, // Min Radius to offset from target.  
                        OffsetMaxRadius = 0, // Max Radius to offset from target.  
                        OffsetTime = 0, // How often to change the offset direction.
                        
                        // Other
                        NoTimedSpawns = true, // When true timedSpawns will not be triggered while this approach is active.
                        DisableAvoidance = true, // Disable futureIntersect.
                        IgnoreAntiSmart = true, // If set to true, antismart cannot change this approaches target.
                        HeatRefund = 0, // how much heat to refund when related EndEvent/StartEvent is met.
                        ReloadRefund = false, // Refund a reload (for max reload).
                        ToggleIngoreVoxels = false, // Toggles whatever the default IgnoreVoxel value to its opposite. 
                        SelfAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the parent grids.
                        TargetAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the target.
                        SelfPhasing = true, // If enabled the projectiles can phase through the parent grids without doing damage or dying.
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
                        AlternateSound = "" // if blank it will use default, must be a default version for this to be useable. 
                    },
                    //2
                    new ApproachDef // Orbit New
                    {
                        // Start/End behaviors 
                        RestartCondition = MoveToNext, // Wait, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        OnRestartRevertTo = -1, // This applies if RestartCondition is set to ForceRestart and trigger requirement was met. -1 to reset to BEFORE the for approach stage was activated.  First stage is 0, second is 1, etc...
                        Operators = StartEnd_And, // Controls how the start and end conditions are matched:  StartEnd_And, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = false, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.

                        // Start/End conditions
                        StartCondition1 = DistanceFromTarget, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // DistanceFromDestination[<=], DistanceToDestination[>=], Lifetime[>=], DeadTime[<=], MinTravelRequired[>=], MaxTravelRequired[<=],
                                                    // Ignore(skip this condition), Spawn(works per stage), DesiredElevation(tolerance can be set with ElevationTolerance),
                                                    // NextTimedSpawn[<=], SinceTimedSpawn[>=], RelativeLifetime[>=], RelativeDeadTime[<=], RelativeSpawns[>=], EnemyTargetLoss[>=]
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore, 
                        EndCondition1 = RelativeSpawns, 
                        EndCondition2 = Ignore, 
                        EndCondition3 = Ignore,

                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 400,
                        Start2Value = 0,
                        End1Value = 50, 
                        End2Value = 0, 
                        End3Value = 0, 
                        
                        // Special triggers when the start/end conditions are met (DoNothing, EndProjectile, EndProjectileOnRestart, StoreDestination)
                        StartEvent = DoNothing,
                        EndEvent = DoNothing,  
                        
                        // Relative positions and directions
                        Forward = ForwardTargetDirection, // ForwardElevationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection   
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpDestinationDirection
                        
                        PositionB = PositionA, // Origin, Shooter, Target, Surface, MidPoint, Current, Nothing, StoredStartPosition, StoredEndPosition, StoredStartLocalPosition, StoredEndLocalPosition
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
                        LeadRotateElevatePositionC = false, // Add lead and rotation to Destination Position
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = false, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 0, // Minimum travel distance before projectile begins racing to target
                        DesiredElevation = 50, // The desired elevation relative to source 
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = StoredStartLocalPosition,
                        StoredEndType = StoredEndLocalPosition,
                        // Controls the leading behavior
                        LeadDistance = 40, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 1.0, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 0.5, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).

                        // Target navigation behavior 
                        Orbit = true, // Orbit the target
                        OrbitRadius = 300, // The orbit radius to extend between the projectile and the target (target volume + this value)
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
                        AlternateSound = "" // if blank it will use default, must be a default version for this to be useable. 
                    },

                    new ApproachDef // RTB
                    {
                        // Start/End behaviors 
                        RestartCondition = MoveToNext, // Wait, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        OnRestartRevertTo = -1, // This applies if RestartCondition is set to ForceRestart and trigger requirement was met. -1 to reset to BEFORE the for approach stage was activated.  First stage is 0, second is 1, etc...
                        Operators = StartEnd_And, // Controls how the start and end conditions are matched:  StartEnd_And, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = false, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.

                        // Start/End conditions
                        StartCondition1 = DistanceToPositionC, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // Ignore(skip this condition)*, DistanceFromPositionC[<=], DistanceToPositionC[>=], DistanceFromPositionB[<=], DistanceToPositionB[>=]
                                                    // DistanceFromTarget[<=], DistanceToTarget[>=], DistanceFromEndTrajectory[<=], DistanceToEndTrajectory[>=], Lifetime[>=], DeadTime[<=],
                                                    // MinTravelRequired[>=], MaxTravelRequired[<=], Spawn(per stage), DesiredElevation(tolerance can be set with ElevationTolerance),
                                                    // NextTimedSpawn[<=], SinceTimedSpawn[>=], RelativeLifetime[>=], RelativeDeadTime[<=], RelativeSpawns[>=], EnemyTargetLoss[>=],
                                                    // RelativeHealthLost[>=], HealthRemaining[<=],
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore, 
                        EndCondition1 = DistanceFromPositionC, 
                        EndCondition2 = Ignore, 
                        EndCondition3 = Ignore,

                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 101,
                        Start2Value = 0,
                        End1Value = 100, 
                        End2Value = 0, 
                        End3Value = 0, 
                        
                        // Special triggers when the start/end conditions are met (DoNothing, EndProjectile, EndProjectileOnRestart, StoreDestination)
                        StartEvent = DoNothing, 
                        EndEvent = DoNothing,  
                        
                        // Relative positions and directions
                        Forward = ForwardRelativeToBlock,  // ForwardElevationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection  
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpDestinationDirection
                        
                        PositionB = PositionA, // Origin*, Shooter, Target, Surface, MidPoint, PositionA, Nothing, StoredStartPosition, StoredEndPosition, StoredStartLocalPosition, StoredEndLocalPosition
                        PositionC = Shooter, 
                        Elevation = Surface, 
                        
                        //
                        // Control if the vantagepoints update every frame or only at start.
                        //
                        AdjustForward = true, // adjust forwardDir overtime.
                        AdjustUp = true, // adjust upDir overtime
                        AdjustPositionB = true, // Updated the source position overtime.
                        AdjustPositionC = true, // Update destination overtime
                        LeadRotateElevatePositionB = false, // Add lead and rotation to Source Position
                        LeadRotateElevatePositionC = false, // Add lead and rotation to Destination Position
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = false, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 0, // Minimum travel distance before projectile begins racing to target
                        DesiredElevation = 50, // The desired elevation relative to source 
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = PositionA,
                        StoredEndType = Target,
                        // Controls the leading behavior
                        LeadDistance = 40, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 1.0, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 1.0, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).

                        // Target navigation behavior 
                        Orbit = false, // Orbit the target
                        OrbitRadius = 0, // The orbit radius to extend between the projectile and the target (target volume + this value)
                        OffsetMinRadius = 0, // Min Radius to offset from target.  
                        OffsetMaxRadius = 0, // Max Radius to offset from target.  
                        OffsetTime = 0, // How often to change the offset direction.
                        
                        // Other
                        NoTimedSpawns = true, // When true timedSpawns will not be triggered while this approach is active.
                        DisableAvoidance = false, // Disable futureIntersect.
                        IgnoreAntiSmart = true, // If set to true, antismart cannot change this approaches target.
                        HeatRefund = 0, // how much heat to refund when related EndEvent/StartEvent is met.
                        ReloadRefund = false, // Refund a reload (for max reload).
                        ToggleIngoreVoxels = true, // Toggles whatever the default IgnoreVoxel value to its opposite. 
                        SelfAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the parent grids.
                        TargetAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the target.
                        SelfPhasing = true, // If enabled the projectiles can phase through the parent grids without doing damage or dying.
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
                        AlternateSound = "" // if blank it will use default, must be a default version for this to be useable. 
                    },
                    
                    new ApproachDef // Recover Orbit
                    {
                        // Start/End behaviors 
                        RestartCondition = MoveToNext, // Wait, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        OnRestartRevertTo = -1, // This applies if RestartCondition is set to ForceRestart and trigger requirement was met. -1 to reset to BEFORE the for approach stage was activated.  First stage is 0, second is 1, etc...
                        Operators = StartEnd_And, // Controls how the start and end conditions are matched:  StartEnd_And, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = false, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.

                        // Start/End conditions
                        StartCondition1 = DistanceFromPositionC, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // DistanceFromDestination[<=], DistanceToDestination[>=], Lifetime[>=], DeadTime[<=], MinTravelRequired[>=], MaxTravelRequired[<=],
                                                    // Ignore(skip this condition), Spawn(works per stage), DesiredElevation(tolerance can be set with ElevationTolerance)
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore, 
                        EndCondition1 = RelativeLifetime, 
                        EndCondition2 = Ignore, 
                        EndCondition3 = Ignore,

                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 200,
                        Start2Value = 0,
                        End1Value = 600, 
                        End2Value = 0, 
                        End3Value = 0, 
                        
                        // Special triggers when the start/end conditions are met (DoNothing, EndProjectile, EndProjectileOnRestart, StoreDestination)
                        StartEvent = DoNothing, 
                        EndEvent = DoNothing,  
                        
                        // Relative positions and directions
                        Forward = ForwardRelativeToBlock, // ForwardDestinationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection    
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpDestinationDirection
                        
                        PositionB = PositionA, // Origin, Shooter, Target, Surface, MidPoint, Current, Nothing, StoredStartDestination, StoredEndDestination
                        PositionC = Shooter, 
                        Elevation = Surface, 
                        
                        //
                        // Control if the vantagepoints update every frame or only at start.
                        //
                        AdjustForward = true, // adjust forwardDir overtime.
                        AdjustUp = true, // adjust upDir overtime
                        AdjustPositionB = true, // Updated the source position overtime.
                        AdjustPositionC = true, // Update destination overtime
                        LeadRotateElevatePositionB = false, // Add lead and rotation to Source Position
                        LeadRotateElevatePositionC = false, // Add lead and rotation to Destination Position
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = false, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 0, // Minimum travel distance before projectile begins racing to target
                        DesiredElevation = 50, // The desired elevation relative to source 
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = PositionA,
                        StoredEndType = Target,
                        // Controls the leading behavior
                        LeadDistance = 40, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 1.0, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 1.0, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).

                        // Target navigation behavior 
                        Orbit = true, // Orbit the target
                        OrbitRadius = 300, // The orbit radius to extend between the projectile and the target (target volume + this value)
                        OffsetMinRadius = 0, // Min Radius to offset from target.  
                        OffsetMaxRadius = 0, // Max Radius to offset from target.  
                        OffsetTime = 0, // How often to change the offset direction.
                        
                        // Other
                        NoTimedSpawns = false, // When true timedSpawns will not be triggered while this approach is active.
                        DisableAvoidance = false, // Disable futureIntersect.
                        IgnoreAntiSmart = true, // If set to true, antismart cannot change this approaches target.
                        HeatRefund = 0, // how much heat to refund when related EndEvent/StartEvent is met.
                        ReloadRefund = false, // Refund a reload (for max reload).
                        ToggleIngoreVoxels = true, // Toggles whatever the default IgnoreVoxel value to its opposite. 
                        SelfAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the parent grids.
                        TargetAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the target.
                        SelfPhasing = true, // If enabled the projectiles can phase through the parent grids without doing damage or dying.
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
                        AlternateSound = "" // if blank it will use default, must be a default version for this to be useable. 
                    },
                    
                    new ApproachDef // Recover
                    {
                        // Start/End behaviors 
                        RestartCondition = MoveToNext, // Wait, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        OnRestartRevertTo = -1, // This applies if RestartCondition is set to ForceRestart and trigger requirement was met. -1 to reset to BEFORE the for approach stage was activated.  First stage is 0, second is 1, etc...
                        Operators = StartEnd_And, // Controls how the start and end conditions are matched:  StartEnd_And, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = false, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.

                        // Start/End conditions
                        StartCondition1 = DistanceToPositionC, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // DistanceFromDestination[<=], DistanceToDestination[>=], Lifetime[>=], DeadTime[<=], MinTravelRequired[>=], MaxTravelRequired[<=],
                                                    // Ignore(skip this condition), Spawn(works per stage), DesiredElevation(tolerance can be set with ElevationTolerance)
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore, 
                        EndCondition1 = DistanceFromPositionC, 
                        EndCondition2 = Ignore, 
                        EndCondition3 = Ignore,

                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 2,
                        Start2Value = 0,
                        End1Value = 1, 
                        End2Value = 0, 
                        End3Value = 0, 
                        
                        // Special triggers when the start/end conditions are met (DoNothing, EndProjectile, EndProjectileOnRestart, StoreDestination)
                        StartEvent = DoNothing, 
                        EndEvent = Refund,  
                        
                        // Relative positions and directions
                        Forward = ForwardRelativeToBlock, // ForwardDestinationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection    
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpDestinationDirection
                        
                        PositionB = PositionA, // Origin, Shooter, Target, Surface, MidPoint, Current, Nothing, StoredStartPosition, StoredEndPosition, StoredStartLocalPosition, StoredEndLocalPosition
                        PositionC = StoredEndLocalPosition, 
                        Elevation = Surface, 
                        
                        //
                        // Control if the vantagepoints update every frame or only at start.
                        //
                        AdjustForward = true, // adjust forwardDir overtime.
                        AdjustUp = true, // adjust upDir overtime
                        AdjustPositionB = true, // Updated the source position overtime.
                        AdjustPositionC = true, // Update destination overtime
                        LeadRotateElevatePositionB = false, // Add lead and rotation to Source Position
                        LeadRotateElevatePositionC = false, // Add lead and rotation to Destination Position
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = false, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 0, // Minimum travel distance before projectile begins racing to target
                        DesiredElevation = 0, // The desired elevation relative to source 
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = PositionA,
                        StoredEndType = Target,
                        // Controls the leading behavior
                        LeadDistance = 0, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 1.0, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 1f, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).

                        // Target navigation behavior 
                        Orbit = false, // Orbit the target
                        OrbitRadius = 0, // The orbit radius to extend between the projectile and the target (target volume + this value)
                        OffsetMinRadius = 0, // Min Radius to offset from target.  
                        OffsetMaxRadius = 0, // Max Radius to offset from target.  
                        OffsetTime = 0, // How often to change the offset direction.
                        
                        // Other
                        NoTimedSpawns = true, // When true timedSpawns will not be triggered while this approach is active.
                        DisableAvoidance = false, // Disable futureIntersect.
                        IgnoreAntiSmart = true, // If set to true, antismart cannot change this approaches target.
                        HeatRefund = 0, // how much heat to refund when related EndEvent/StartEvent is met.
                        ReloadRefund = false, // Refund a reload (for max reload).
                        ToggleIngoreVoxels = false, // Toggles whatever the default IgnoreVoxel value to its opposite. 
                        SelfAvoidance = true, // If this and FutureIntersect is enabled then projectiles will actively avoid the parent grids.
                        TargetAvoidance = true, // If this and FutureIntersect is enabled then projectiles will actively avoid the target.
                        SelfPhasing = true, // If enabled the projectiles can phase through the parent grids without doing damage or dying.
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
                        AlternateSound = "" // if blank it will use default, must be a default version for this to be useable. 
                    },

                    new ApproachDef // Dock
                    {
                        // Start/End behaviors 
                        RestartCondition = MoveToNext, // Wait, MoveToPrevious, MoveToNext, ForceRestart -- A restart condition is when the end condition is reached without having met the start condition. 
                        OnRestartRevertTo = -1, // This applies if RestartCondition is set to ForceRestart and trigger requirement was met. -1 to reset to BEFORE the for approach stage was activated.  First stage is 0, second is 1, etc...
                        Operators = StartEnd_And, // Controls how the start and end conditions are matched:  StartEnd_And, StartEnd_Or, StartAnd_EndOr,StartOr_EndAnd,
                        CanExpireOnceStarted = false, // This stages values will continue to apply until the end conditions are met.
                        ForceRestart = false, // This forces the ReStartCondition when the end condition is met no matter if the start condition was met or not.

                        // Start/End conditions
                        StartCondition1 = DistanceToPositionC, // Each condition type is either >= or <= the corresponding value defined below.
                                                    // DistanceFromDestination[<=], DistanceToDestination[>=], Lifetime[>=], DeadTime[<=], MinTravelRequired[>=], MaxTravelRequired[<=],
                                                    // Ignore(skip this condition), Spawn(works per stage), DesiredElevation(tolerance can be set with ElevationTolerance)
                                                    // *NOTE* DO NOT set start1 and start2 or end1 and end2 to same condition
                        StartCondition2 = Ignore, 
                        EndCondition1 = DistanceFromPositionC, 
                        EndCondition2 = Ignore, 
                        EndCondition3 = Ignore,

                        // Start/End thresholds -- both conditions are evaluated before activation, use Ignore to skip
                        Start1Value = 2,
                        Start2Value = 0,
                        End1Value = 1, 
                        End2Value = 0, 
                        End3Value = 0, 
                        
                        // Special triggers when the start/end conditions are met (DoNothing, EndProjectile, EndProjectileOnRestart, StoreDestination)
                        StartEvent = DoNothing, 
                        EndEvent = EndProjectile,  
                        
                        // Relative positions and directions
                        Forward = ForwardRelativeToBlock, // ForwardDestinationDirection*, ForwardRelativeToBlock, ForwardRelativeToShooter, ForwardRelativeToGravity, ForwardTargetDirection, ForwardTargetVelocity, ForwardStoredStartPosition, ForwardStoredEndPosition, ForwardStoredStartLocalPosition, ForwardStoredEndLocalPosition, ForwardOriginDirection    
                        Up = UpRelativeToGravity, // UpRelativeToBlock*, UpRelativeToShooter, UpRelativeToGravity, UpTargetDirection, UpTargetVelocity, UpStoredStartPosition, UpStoredEndPosition, UpStoredStartLocalPosition, UpStoredEndLocalPosition, UpOriginDirection, UpDestinationDirection
                        
                        PositionB = PositionA, // Origin, Shooter, Target, Surface, MidPoint, Current, Nothing, StoredStartDestination, StoredEndDestination
                        PositionC = Shooter, 
                        Elevation = Nothing, 
                        
                        //
                        // Control if the vantagepoints update every frame or only at start.
                        //
                        AdjustForward = true, // adjust forwardDir overtime.
                        AdjustUp = true, // adjust upDir overtime
                        AdjustPositionB = true, // Updated the source position overtime.
                        AdjustPositionC = true, // Update destination overtime
                        LeadRotateElevatePositionB = false, // Add lead and rotation to Source Position
                        LeadRotateElevatePositionC = false, // Add lead and rotation to Destination Position
                        TrajectoryRelativeToB = false, // If true the projectiles immediate trajectory will be relative to PositionB instead of PositionC (e.g. quick response to elevation changes relative to PositionB position assuming that position is closer to PositionA)
                        ElevationRelativeToC = false, // If true the projectiles desired elevation will be relative to PositionC instead of PositionB (e.g. quick response to elevation changes relative to PositionC position assuming that position is closer to PositionA)
                        
                        // Tweaks to vantagepoint behavior
                        AngleOffset = 0, // value 0 - 1, rotates the Updir
                        ElevationTolerance = 0, // adds additional tolerance (in meters) to meet the Elevation condition requirement.  *note* collision size is also added to the tolerance
                        TrackingDistance = 0, // Minimum travel distance before projectile begins racing to target
                        DesiredElevation = 0, // The desired elevation relative to source 
                        StoredStartId = 0, // Which approach id the the start storage was saved in, if any.
                        StoredEndId = 0, // Which approach id the the end storage was saved in, if any.
                        StoredStartType = PositionA,
                        StoredEndType = Target,
                        // Controls the leading behavior
                        LeadDistance = 0, // Add additional "lead" in meters to the trajectory (project in the future), this will be applied even before TrackingDistance is met. 
                        PushLeadByTravelDistance = false, // the follow lead position will move in its point direction by an amount equal to the projectiles travel distance.

                        // Modify speed and acceleration ratios while this approach is active
                        AccelMulti = 1.0, // Modify default acceleration by this factor
                        DeAccelMulti = 0, // Modifies your default deacceleration by this factor
                        TotalAccelMulti = 0, // Modifies your default totalacceleration by this factor
                        SpeedCapMulti = 0.5f, // Limit max speed to this factor, must keep this value BELOW default maxspeed (1).

                        // Target navigation behavior 
                        Orbit = false, // Orbit the target
                        OrbitRadius = 0, // The orbit radius to extend between the projectile and the target (target volume + this value)
                        OffsetMinRadius = 0, // Min Radius to offset from target.  
                        OffsetMaxRadius = 0, // Max Radius to offset from target.  
                        OffsetTime = 0, // How often to change the offset direction.
                        
                        // Other
                        NoTimedSpawns = true, // When true timedSpawns will not be triggered while this approach is active.
                        DisableAvoidance = true, // Disable futureIntersect.
                        IgnoreAntiSmart = true, // If set to true, antismart cannot change this approaches target.
                        HeatRefund = 0, // how much heat to refund when related EndEvent/StartEvent is met.
                        ReloadRefund = true, // Refund a reload (for max reload).
                        ToggleIngoreVoxels = false, // Toggles whatever the default IgnoreVoxel value to its opposite. 
                        SelfAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the parent grids.
                        TargetAvoidance = false, // If this and FutureIntersect is enabled then projectiles will actively avoid the target.
                        SelfPhasing = true, // If enabled the projectiles can phase through the parent grids without doing damage or dying.
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
                        Name = "AWESidekickDroneThrusters", //ShipWelderArc
                        Color = Color(red: 25, green: 25, blue: 25, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
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
                    ColorVariance = Random(start: 0f, end: 5f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.2f, end: 0.2f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 15f,
                        Width = 0.5f,
                        Color = Color(red: 1f, green: 10f, blue: 30f, alpha: 1f),
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
                        DecayTime = 150,
                        Color = Color(red: 1.01f, green: 1.10f, blue: 1.3f, alpha: 1f),
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
        private AmmoDef Others_Drone_Laser => new AmmoDef
        {
            AmmoMagazine = "AWE_StormriderDroneMag",
            AmmoRound = "Others_Drone_Laser", 
            BaseDamage = 1f,
            Mass = 1000f, // in kilograms
            Health = 200f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 5f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "Lasers_Laser_Small", // AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 0, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = true, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards).
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                //FireSound = true, // Play fire/shoot sound
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below
                {
                    Enable = true, // Enables TimedSpawns mechanism
                    Interval = 0, // Time between spawning fragments, in ticks
                    StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 999999999, // Max number of fragment children to spawn
                    Proximity = 200, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = false, // Parent dies once after it spawns its last child.
                    PointAtTarget = true, // Start fragment direction pointing at Target
                    PointType = Predict, // Point accuracy: Direct, Lead (always fire), Predict (only fire if it can hit)
					DirectAimCone = 5f, //Aim cone used for Direct fire, in degrees
                    GroupSize = 120, // Number of spawns in each group
                    GroupDelay = 240, // Delay between each group.
                },
            },
            DamageScales = new DamageScaleDef
            {
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                HealthHitModifier = 0.5, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                Characters = -1f,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = 0.008f, // 1/125
                },
                Armor = new ArmorDef
                {
                    Armor = -1f,
                    Light = -1f,
                    Heavy = -1f,
                    NonArmor = -1f,
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
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 5f,
                    Damage = 4000f,
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
            Trajectory = new TrajectoryDef
            {
                Guidance = DroneAdvanced,
                TargetLossDegree = 0,
                TargetLossTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                MaxLifeTime = 7200, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 200f,
                DesiredSpeed = 100,
                MaxTrajectory = 20000f,
                GravityMultiplier = -1f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable.
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed
                RangeVariance = Random(start: 0, end: 0), // subtracts value from MaxTrajectory
                MaxTrajectoryTime = 0, // How long the weapon must fire before it reaches MaxTrajectory.
                Smarts = new SmartsDef
                {
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 2f, // controls how responsive tracking is.
                    MaxLateralThrust = 0.5f, // controls how sharp the trajectile may turn
                    TrackingDelay = 60, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 0, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
                    MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
					OffsetRatio = 0.01f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 30, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    Roam = false, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
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
                        Name = "AWESidekickDroneThrusters", //ShipWelderArc
                        Color = Color(red: 25, green: 25, blue: 25, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
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
                    ColorVariance = Random(start: 0f, end: 5f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.2f, end: 0.2f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 15f,
                        Width = 0.5f,
                        Color = Color(red: 1f, green: 10f, blue: 30f, alpha: 1f),
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
                        DecayTime = 150,
                        Color = Color(red: 1.01f, green: 1.10f, blue: 1.3f, alpha: 1f),
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
        private AmmoDef Others_Drone_Cannon => new AmmoDef
        {
            AmmoMagazine = "AWE_SidekickDroneMag",
            AmmoRound = "Others_Drone_Cannon", 
            BaseDamage = 1f,
            Mass = 1000f, // in kilograms
            Health = 200f, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
            BackKickForce = 5f,
            HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            Fragment = new FragmentDef // Formerly known as Shrapnel. Spawns specified ammo fragments on projectile death (via hit or detonation).
            {
                AmmoRound = "LargeCalibreAmmo", // AmmoRound field of the ammo to spawn.
                Fragments = 1, // Number of projectiles to spawn.
                Degrees = 0.5f, // Cone in which to randomize direction of spawned projectiles.
                Reverse = false, // Spawn projectiles backward instead of forward.
                DropVelocity = false, // fragments will not inherit velocity from parent.
                Offset = 0f, // Offsets the fragment spawn by this amount, in meters (positive forward, negative for backwards).
                Radial = 0f, // Determines starting angle for Degrees of spread above.  IE, 0 degrees and 90 radial goes perpendicular to travel path
                MaxChildren = 0, // number of maximum branches for fragments from the roots point of view, 0 is unlimited
                IgnoreArming = true, // If true, ignore ArmOnHit or MinArmingTime in EndOfLife definitions
                //FireSound = true, // Play fire/shoot sound
                TimedSpawns = new TimedSpawnDef // disables FragOnEnd in favor of info specified below
                {
                    Enable = true, // Enables TimedSpawns mechanism
                    Interval = 60, // Time between spawning fragments, in ticks
                    StartTime = 0, // Time delay to start spawning fragments, in ticks, of total projectile life
                    MaxSpawns = 30, // Max number of fragment children to spawn
                    Proximity = 400, // Starting distance from target bounding sphere to start spawning fragments, 0 disables this feature.  No spawning outside this distance
                    ParentDies = false, // Parent dies once after it spawns its last child.
                    PointAtTarget = false, // Start fragment direction pointing at Target
                    PointType = Direct, // Point accuracy: Direct, Lead (always fire), Predict (only fire if it can hit)
					DirectAimCone = 1f, //Aim cone used for Direct fire, in degrees
                    GroupSize = 1, // Number of spawns in each group
                    GroupDelay = 180, // Delay between each group.
                },
            },
            DamageScales = new DamageScaleDef
            {
                DamageVoxels = false, // true = voxels are vulnerable to this weapon
                HealthHitModifier = 0.5, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
                Characters = -1f,
                // modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01 = 1% damage, 2 = 200% damage.
                Grids = new GridSizeDef
                {
                    Large = -1f,
                    Small = 0.008f, // 1/125
                },
                Armor = new ArmorDef
                {
                    Armor = -1f,
                    Light = -1f,
                    Heavy = -1f,
                    NonArmor = -1f,
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
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 5f,
                    Damage = 4000f,
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
            Trajectory = new TrajectoryDef
            {
                Guidance = Smart,
                MaxLifeTime = 7200, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                AccelPerSec = 200f,
                DesiredSpeed = 100,
                MaxTrajectory = 20000f,
                SpeedVariance = Random(start: 0, end: 0), // subtracts value from DesiredSpeed
                Smarts = new SmartsDef
                {
                    SteeringLimit = 150, // 0 means no limit, value is in degrees, good starting is 150.  This enable advanced smart "control", cost of 3 on a scale of 1-5, 0 being basic smart.
                    Inaccuracy = 0f, // 0 is perfect, hit accuracy will be a random num of meters between 0 and this value.
                    Aggressiveness = 2f, // controls how responsive tracking is.
                    MaxLateralThrust = 0.5f, // controls how sharp the trajectile may turn
                    NavAcceleration = 0, // helps influence how the projectile steers. 
                    TrackingDelay = 0, // Measured in Shape diameter units traveled.
                    MaxChaseTime = 6000, // Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    OverideTarget = false, // when set to true ammo picks its own target, does not use hardpoint's.
                    CheckFutureIntersection = true, // Utilize obstacle avoidance for drones
                    FutureIntersectionRange = 500,
                    MaxTargets = 0, // Number of targets allowed before ending, 0 = unlimited
                    NoTargetExpire = false, // Expire without ever having a target at TargetLossTime
                    Roam = false, // Roam current area after target loss
                    KeepAliveAfterTargetLoss = true, // Whether to stop early death of projectile on target loss
					OffsetRatio = 0.01f, // The ratio to offset the random dir (0 to 1) 
					OffsetTime = 30, // how often to offset degree, measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                    FocusOnly = false, // only target the constructs Ai's focus target
                    MinTurnSpeed = 10, // set this to a reasonable value to avoid projectiles from spinning in place or being too aggressive turing at slow speeds 
                    NoTargetApproach = true, // If true approaches can begin prior to the projectile ever having had a target.
                    AltNavigation = false, // If true this will swap the default navigation algorithm from ProNav to ZeroEffort Miss.  Zero effort is more direct/precise but less cinematic 
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
                        Name = "AWESidekickDroneThrusters", //ShipWelderArc
                        Color = Color(red: 25, green: 25, blue: 25, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
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
                    ColorVariance = Random(start: 0f, end: 5f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.2f, end: 0.2f), // adds random value to default width (negatives shrinks width)
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 15f,
                        Width = 0.5f,
                        Color = Color(red: 1f, green: 10f, blue: 30f, alpha: 1f),
                        Textures = new[] {"MD_MissileThrustFlame",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
                    Trail = new TrailDef
                    {
                        Enable = true,
                        Textures = new[] {"WeaponLaser",},
                        DecayTime = 150,
                        Color = Color(red: 1.01f, green: 1.10f, blue: 1.3f, alpha: 1f),
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
    }
}
