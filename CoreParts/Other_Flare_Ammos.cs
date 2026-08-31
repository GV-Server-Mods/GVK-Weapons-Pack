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
		
        private AmmoDef FireworkBaseWC => new AmmoDef
        {
			AmmoMagazine = "FireworksBoxRainbow",
			AmmoRound = "FireworkRandom",
			BaseDamage = 1f,
			Mass = 20f, // in kilograms
			Health = 1, // 0 = disabled, otherwise how much damage it can take from other trajectiles before dying.
			BackKickForce = 10f,
			HardPointUsable = true, // set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            NpcSafe = false, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
			DamageScales = new DamageScaleDef {
				MaxIntegrity = 0f, // 0 = disabled, 1000 = any blocks with currently integrity above 1000 will be immune to damage.
				DamageVoxels = false, // true = voxels are vulnerable to this weapon
				HealthHitModifier = 1, // defaults to a value of 1, this setting modifies how much Health is subtracted from a projectile per hit (1 = per hit).
				Characters = -1f,
				Grids = new GridSizeDef
				{
					Large = 1f,
                    Small = 0.75f,
				},
				Armor = new ArmorDef
				{
					Armor = -1f,
					Light = 0.75f,
					Heavy = 1.2f,
					NonArmor = 0.8f,
				},
				DamageType = new DamageTypes
				{
					Base = Kinetic,
					AreaEffect = Energy,
					Detonation = Energy,
					Shield = Energy,
                },
			},
            Pattern = new PatternDef
            {
                Patterns = new[] { // If enabled, set of multiple ammos to fire in order instead of the main ammo.
                    "FireworkYellow",
                    "FireworkBlue",
                    "FireworkGreen",
                    "FireworkRed",
                    "FireworkPink",
                    "FireworkRainbow"
                },
                Mode = Weapon, // Select when to activate this pattern, options: Never, Weapon, Fragment, Both 
                TriggerChance = 1f, // This is %
                Random = true, // This randomizes the number spawned at once, NOT the list order.
                RandomMin = 1, 
                RandomMax = 2,
                SkipParent = true, // Skip the Ammo itself, in the list
                PatternSteps = 1, // Number of Ammos activated per round, will progress in order and loop. Ignored if Random = true.
            },
            AreaOfDamage = new AreaOfDamageDef 
			{
                EndOfLife = new EndOfLifeDef
                {
                    Enable = true,
                    Radius = 1f,
                    Damage = 1f,
                    Depth = 1f, //NOT OPTIONAL, 0 or -1 breaks the manhattan distance
                    MaxAbsorb = 1f,
                    Falloff = Pooled, //.NoFalloff applies the same damage to all blocks in radius
                    //.Linear drops evenly by distance from center out to max radius
                    //.Curve drops off damage sharply as it approaches the max radius
                    //.InvCurve drops off sharply from the middle and tapers to max radius
                    //.Squeeze does little damage to the middle, but rapidly increases damage toward max radius
                    //.Pooled damage behaves in a pooled manner that once exhausted damage ceases.
                    ArmOnlyOnHit = false,
                    MinArmingTime = 1,
                    NoVisuals = false,
                    NoSound = false,
                    ParticleScale = 2,
                    CustomParticle = "None", // Particle SubtypeID, from your Particle SBC
                    CustomSound = "MD_FireworkExplosion", // SubtypeID from your Audio SBC, not a filename
                    Shape = Diamond, // Round or Diamond shape.  Diamond is more performance friendly.
                },
            },
			Trajectory = new TrajectoryDef 
			{
				Guidance = None,
				TargetLossDegree = 0f,
				TargetLossTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				MaxLifeTime = 240, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
				AccelPerSec = 0f,
				DesiredSpeed = 100,
				MaxTrajectory = 300f,
				SpeedVariance = Random(start: 0, end: 10), // subtracts value from DesiredSpeed
				RangeVariance = Random(start: 0, end: 20), // subtracts value from MaxTrajectory
			},
			AmmoGraphics = new GraphicDef 
			{
				ModelName = "",
				VisualProbability = 1f,
				Particles = new AmmoParticleDef
				{
                    Ammo = new ParticleDef
                    {
                        Name = "", //Archer_MissileSmokeTrail
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
				},
				Lines = new LineDef
				{
                    ColorVariance = Random(start: 0f, end: 2f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.1f, end: 0.1f), // adds random value to default width (negatives shrinks width)
					DropParentVelocity = true, // If set to true will not take on the parents (grid/player) initial velocity when rendering.
                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 2f,
                        Width = 0.1f,
                        Color = Color(red: 15f, green: 2f, blue: 7f, alpha: 1f),
                        Textures = new[] {"ProjectileTrailLine",},// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                    },
					Trail = new TrailDef
					{
						Enable = true,
						Textures = new[] {"WeaponLaser",},
						DecayTime = 50,
						Color = Color(red: 0.2f, green: 0.2f, blue: 0.2f, alpha: 1f),
						Back = false,
						CustomWidth = 0.2f,
						UseWidthVariance = false,
						UseColorFade = true,
					},
				},
			},
			AmmoAudio = new AmmoAudioDef 
			{
                TravelSound = "ArcFlareFlightSound", // SubtypeID for your Sound File. Travel, is sound generated around your Projectile in flight
				HitSound = "",
                ShotSound = "",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
			}, // Don't edit below this line
        };

        private AmmoDef FireworkRainbowWC
        {
            get
            {
                var ammo = FireworkBaseWC;
                ammo.AmmoRound = "FireworkRainbow";
				ammo.Pattern.Mode = Never;
                ammo.AreaOfDamage.EndOfLife.CustomParticle = "Explosion_Firework_Rainbow";
				ammo.AmmoAudio.ShotSound = "MD_FireworkLaunch";
				ammo.AmmoGraphics.Lines.Tracer.Color = Color(red: 10f, green: 10f, blue: 10f, alpha: 1f);
                return ammo;
            }
        }

        private AmmoDef FireworkGreenWC
        {
            get
            {
                var ammo = FireworkBaseWC;
                ammo.AmmoRound = "FireworkGreen";
				ammo.Pattern.Mode = Never;
                ammo.AreaOfDamage.EndOfLife.CustomParticle = "Explosion_Firework_Green";
				ammo.AmmoAudio.ShotSound = "MD_FireworkLaunch";
				ammo.AmmoGraphics.Lines.Tracer.Color = Color(red: 1f, green: 10f, blue: 2f, alpha: 1f);
                return ammo;
            }
        }

        private AmmoDef FireworkRedWC
        {
            get
            {
                var ammo = FireworkBaseWC;
                ammo.AmmoRound = "FireworkRed";
				ammo.Pattern.Mode = Never;
                ammo.AreaOfDamage.EndOfLife.CustomParticle = "Explosion_Firework_Red";
				ammo.AmmoAudio.ShotSound = "MD_FireworkLaunch";
				ammo.AmmoGraphics.Lines.Tracer.Color = Color(red: 10f, green: 1f, blue: 1f, alpha: 1f);
                return ammo;
            }
        }

        private AmmoDef FireworkPinkWC
        {
            get
            {
                var ammo = FireworkBaseWC;
                ammo.AmmoRound = "FireworkPink";
				ammo.Pattern.Mode = Never;
                ammo.AreaOfDamage.EndOfLife.CustomParticle = "Explosion_Firework_Pink";
				ammo.AmmoAudio.ShotSound = "MD_FireworkLaunch";
				ammo.AmmoGraphics.Lines.Tracer.Color = Color(red: 10f, green: 3f, blue: 7f, alpha: 1f);
                return ammo;
            }
        }

        private AmmoDef FireworkYellowWC
        {
            get
            {
                var ammo = FireworkBaseWC;
                ammo.AmmoRound = "FireworkYellow";
				ammo.Pattern.Mode = Never;
                ammo.AreaOfDamage.EndOfLife.CustomParticle = "Explosion_Firework_Yellow";
				ammo.AmmoAudio.ShotSound = "MD_FireworkLaunch";
				ammo.AmmoGraphics.Lines.Tracer.Color = Color(red: 10f, green: 9f, blue: 1f, alpha: 1f);
                return ammo;
            }
        }

        private AmmoDef FireworkBlueWC
        {
            get
            {
                var ammo = FireworkBaseWC;
                ammo.AmmoRound = "FireworkBlue";
				ammo.Pattern.Mode = Never;
                ammo.AreaOfDamage.EndOfLife.CustomParticle = "Explosion_Firework_Blue";
				ammo.AmmoAudio.ShotSound = "MD_FireworkLaunch";
				ammo.AmmoGraphics.Lines.Tracer.Color = Color(red: 1f, green: 2f, blue: 10f, alpha: 1f);
                return ammo;
            }
        }

        private AmmoDef FlareWC => new AmmoDef // Your ID, for slotting into the Weapon CS
        {
            AmmoMagazine = "FlareClip", // SubtypeId of physical ammo magazine. Use "Energy" for weapons without physical ammo.
            AmmoRound = "Flare", // Name of ammo in terminal, should be different for each ammo type used by the same weapon. Is used by Shrapnel.
            BaseDamage = 1f, // Direct damage; one steel plate is worth 100.
            Mass = 50f, // In kilograms; how much force the impact will apply to the target.
            Health = 1, // How much damage the projectile can take from other projectiles (base of 1 per hit) before dying; 0 disables this and makes the projectile untargetable.
            BackKickForce = 10f, // Recoil. This is applied to the Parent Grid.
            HardPointUsable = true, // Whether this is a primary ammo type fired directly by the turret. Set to false if this is a shrapnel ammoType and you don't want the turret to be able to select it directly.
            IgnoreVoxels = false, // Whether the projectile should be able to penetrate voxels.
            NpcSafe = false, // This is you tell npc moders that your ammo was designed with them in mind, if they tell you otherwise set this to false.
            NoGridOrArmorScaling = true, // If you enable this you can remove the damagescale section entirely.
            Shape = new ShapeDef // Defines the collision shape of the projectile, defaults to LineShape and uses the visual Line Length if set to 0.
            {
                Shape = LineShape, // LineShape or SphereShape. Do not use SphereShape for fast moving projectiles if you care about precision.
                Diameter = 1, // Diameter is minimum length of LineShape or minimum diameter of SphereShape.
            },
            DamageScales = new DamageScaleDef
            {
                MaxIntegrity = 0f, // Blocks with integrity higher than this value will be immune to damage from this projectile; 0 = disabled.
                DamageVoxels = false, // Whether to damage voxels.
                HealthHitModifier = 1, // How much Health to subtract from another projectile on hit; defaults to 1 if zero or less.
                Characters = -1f, // Character damage multiplier; defaults to 1 if zero or less.
                // For the following modifier values: -1 = disabled (higher performance), 0 = no damage, 0.01f = 1% damage, 2 = 200% damage.
                Grids = new GridSizeDef //If both of these values are -1, a 4x buff to SG weapons firing at LG and 0.25x debuff to LG weapons firing at SG will apply
                {
                    Large = -1f, // Multiplier for damage against large grids.
                    Small = -1f, // Multiplier for damage against small grids.
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
                    AreaEffect = Energy,
                    Detonation = Energy,
                    Shield = Energy, // Damage against shields is currently all of one type per projectile. Shield Bypass Weapons, always Deal Energy regardless of this line
                },
            },
            Ewar = new EwarDef
            {
                Enable = true, // Enables EWAR effects AND DISABLES BASE DAMAGE AND AOE DAMAGE!!
                Type = AntiSmartv2, // EnergySink, Emp, Offense, Nav, Dot, AntiSmart, AntiSmartV2, JumpNull, Anchor, Tractor, Pull, Push, 
                Mode = Field, // Effect , Field
                Strength = 99f,
                Radius = 700f, // Meters
                Duration = 1000, // In Ticks
                StackDuration = true, // Combined Durations
                Depletable = false,
                MaxStacks = 1, // Max Debuffs at once
                NoHitParticle = true,
                /*
                EnergySink : Targets & Shutdowns Power Supplies, such as Batteries & Reactor
                Emp : Targets & Shutdown any Block capable of being powered
                Offense : Targets & Shutdowns Weaponry
                Nav : Targets & Shutdown Gyros or Locks them down
                Dot : Deals Damage to Blocks in radius
                AntiSmart : Effects & Scrambles the Targeting List of Affected Missiles
                JumpNull : Shutdown & Stops any Active Jumps, or JumpDrive Units in radius
                Tractor : Affects target with Physics
                Pull : Affects target with Physics
                Push : Affects target with Physics
                Anchor : Targets & Shutdowns Thrusters
                
                */
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
                    Interval = 30, // Time between each pulse, in game ticks (60 == 1 second), starts at 0 (59 == tick 60).
                    PulseChance = 5, // Chance from 0 - 100 that an entity in the field will be hit by any given pulse.
                    GrowTime = 60, // How many ticks it should take the field to grow to full size.
                    HideModel = true, // Hide the default bubble, or other model if specified.
                    ShowParticle = true, // Show Block damage effect.
                    TriggerRange = 1000f, //range at which fields are triggered
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
            Trajectory = new TrajectoryDef
            {
                Guidance = None, // None, Remote, TravelTo, Smart, DetectTravelTo, DetectSmart, DetectFixed
                TargetLossDegree = 0f, // Degrees, Is pointed forward
                TargetLossTime = 0, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..).
                MaxLifeTime = 1200, // 0 is disabled, Measured in game ticks (6 = 100ms, 60 = 1 seconds, etc..). time begins at 0 and time must EXCEED this value to trigger "time > maxValue". Please have a value for this, It stops Bad things.
                DesiredSpeed = 50, // voxel phasing if you go above 5100
                MaxTrajectory = 1500f, // Max Distance the projectile or beam can Travel.
                GravityMultiplier = 0.75f, // Gravity multiplier, influences the trajectory of the projectile, value greater than 0 to enable. Natural Gravity Only.
                SpeedVariance = Random(start: 0, end: 10), // subtracts value from DesiredSpeed. Be warned, you can make your projectile go backwards.
            },
            AmmoGraphics = new GraphicDef
            {
                ModelName = "", // Model Path goes here.  "\\Models\\Ammo\\Starcore_Arrow_Missile_Large"
                VisualProbability = 1f, // %
                ShieldHitDraw = false,
                Particles = new AmmoParticleDef
                {
                    Ammo = new ParticleDef
                    {
                        Name = "", //Smoke_Flare this seemed to stop working correctly on ewar
                        Offset = Vector(x: 0, y: 0, z: 0),
                        DisableCameraCulling = false,// If not true will not cull when not in view of camera, be careful with this and only use if you know you need it
                        Extras = new ParticleOptionDef
                        {
                            Scale = 1,
                        },
                    },
                    Hit = new ParticleDef
                    {
                        Name = "Explosion_Flare", //Explosion_Flare
                        ApplyToShield = false,
                        Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                        Offset = Vector(x: 0, y: 0, z: 0),
                        Extras = new ParticleOptionDef
                        {
                            Loop = false,
                            Restart = false,
                            MaxDistance = 2000,
                            MaxDuration = 0,
                            Scale = 1f,
                            HitPlayChance = 1f,
                        },
                    },
                },
                Lines = new LineDef
                {
                    ColorVariance = Random(start: -1f, end: 1f), // multiply the color by random values within range.
                    WidthVariance = Random(start: -0.2f, end: 0.2f), // adds random value to default width (negatives shrinks width)
                    DropParentVelocity = false, // If set to true will not take on the parents (grid/player) initial velocity when rendering.

                    Tracer = new TracerBaseDef
                    {
                        Enable = true,
                        Length = 1f, //
                        Width = 0.5f, //
                        Color = Color(red: 100, green: 20, blue: 10f, alpha: 1), // RBG 255 is Neon Glowing, 100 is Quite Bright.
                        FactionColor = DontUse, // DontUse, Foreground, Background.
                        VisualFadeStart = 0, // Number of ticks the weapon has been firing before projectiles begin to fade their color
                        VisualFadeEnd = 0, // How many ticks after fade began before it will be invisible.
                        AlwaysDraw = true, // Prevents this tracer from being culled.  Only use if you have a reason too (very long tracers/trails).
                        Textures = new[] {// WeaponLaser, ProjectileTrailLine, WarpBubble, etc..
                            "ProjectileTrailLine", // Please always have this Line set, if this Section is enabled.
                        },
                        TextureMode = Normal, // Normal, Cycle, Chaos, Wave
                     },
                },
            },
            AmmoAudio = new AmmoAudioDef
            {
                TravelSound = "ArcFlareFlightSound", // SubtypeID for your Sound File. Travel, is sound generated around your Projectile in flight
                HitSound = "",
                ShotSound = "MD_FireworkLaunch",
                ShieldHitSound = "",
                PlayerHitSound = "",
                VoxelHitSound = "",
                FloatingHitSound = "",
                HitPlayChance = 1f,
                HitPlayShield = true,
            },
        };      

    }
}

