using System.Collections.Generic;
using static Scripts.Structure.WeaponDefinition;
using static Scripts.Structure.WeaponDefinition.AnimationDef;
using static Scripts.Structure.WeaponDefinition.AnimationDef.PartAnimationSetDef.EventTriggers;
using static Scripts.Structure.WeaponDefinition.AnimationDef.RelMove.MoveType;
using static Scripts.Structure.WeaponDefinition.AnimationDef.RelMove;
namespace Scripts
{ // Don't edit above this line
    partial class Parts
    {
        private AnimationDef AryxSmallHangarAnimations => new AnimationDef
        {

            //These are the animation sets the weapon uses in various states.
            AnimationSets = new[]
            {   //Region is used for organisation as it creates a collapsible tag.
				#region Barrels Animations
                new PartAnimationSetDef()
                {
                    SubpartId = Names("drone_1","drone_2","drone_3"),
                    BarrelId = "Any", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 30, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    TriggerOnce = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
                        // Reloading, Firing, Tracking, Overheated, TurnOn, TurnOff, BurstReload, NoMagsToLoad, PreFire, EmptyOnGameLoad, StopFiring, StopTracking, LockDelay, Init, Homing, TargetAligned, WhileOn, TargetRanged100, TargetRanged75, TargetRanged50, TargetRanged25
						[EmptyOnGameLoad] =
							new[]
							{
								new RelMove
								{
									CenterEmpty = "",
									TicksToMove = 1, //number of ticks to complete motion, 60 = 1 second
									MovementType = Hide,
									LinearPoints = new XYZ[0],
									Rotation = Transformation(0, 0, 0), //degrees
									RotAroundCenter = Transformation(0, 0, 0), //degrees
								},
							},
						[Reloading] =
							new[]
							{
								new RelMove
								{
									CenterEmpty = "",
									TicksToMove = 300, //number of ticks to complete motion, 60 = 1 second
									MovementType = Delay, //Linear,ExpoDecay,ExpoGrowth,Delay,Show, //instant or fade Hide, //instant or fade
									LinearPoints = new XYZ[0],
									Rotation = Transformation(0, 0, 0), //degrees
									RotAroundCenter = Transformation(0, 0, 0), //degrees
								},
								new RelMove
								{
									CenterEmpty = "",
									TicksToMove = 1, //number of ticks to complete motion, 60 = 1 second
									MovementType = Show, //Linear,ExpoDecay,ExpoGrowth,Delay,Show, //instant or fade Hide, //instant or fade
									LinearPoints = new XYZ[0],
									Rotation = Transformation(0, 0, 0), //degrees
									RotAroundCenter = Transformation(0, 0, 0), //degrees
								},
							},
                    }
                },
                new PartAnimationSetDef()
                {
                    SubpartId = Names("hangar_upper_door"),
                    BarrelId = "muzzle_projectile_1", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 30, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    TriggerOnce = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
                        [WhileOn] =
                            new[]
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",//Specifiy an empty on the subpart to rotate around
                                    TicksToMove = 120, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = ExpoDecay, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
                        [TurnOff] =
                            new[]
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",//Specifiy an empty on the subpart to rotate around
                                    TicksToMove = 120, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = ExpoDecay, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(-90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
						[Reloading] =
							new[]
							{
								new RelMove
								{
									CenterEmpty = "",
									TicksToMove = 120, //number of ticks to complete motion, 60 = 1 second
									MovementType = ExpoDecay, //Linear,ExpoDecay,ExpoGrowth,Delay,Show, //instant or fade Hide, //instant or fade
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(-90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
								},
								new RelMove
								{
									CenterEmpty = "",
									TicksToMove = 360, //number of ticks to complete motion, 60 = 1 second
									MovementType = Delay, //Linear,ExpoDecay,ExpoGrowth,Delay,Show, //instant or fade Hide, //instant or fade
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(-90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
								},
								new RelMove
								{
									CenterEmpty = "",
									TicksToMove = 120, //number of ticks to complete motion, 60 = 1 second
									MovementType = ExpoDecay, //Linear,ExpoDecay,ExpoGrowth,Delay,Show, //instant or fade Hide, //instant or fade
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
								},
							},
                    }
                },
                new PartAnimationSetDef()
                {
                    SubpartId = Names("hangar_lower_door"),
                    BarrelId = "muzzle_projectile_1", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 30, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    TriggerOnce = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
                        [WhileOn] =
                            new[]
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",//Specifiy an empty on the subpart to rotate around
                                    TicksToMove = 120, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = ExpoDecay, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(-90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
                        [TurnOff] =
                            new[]
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",//Specifiy an empty on the subpart to rotate around
                                    TicksToMove = 120, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = ExpoDecay, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
						[Reloading] =
							new[]
							{
								new RelMove
								{
									CenterEmpty = "",
									TicksToMove = 120, //number of ticks to complete motion, 60 = 1 second
									MovementType = ExpoDecay, //Linear,ExpoDecay,ExpoGrowth,Delay,Show, //instant or fade Hide, //instant or fade
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
								},
								new RelMove
								{
									CenterEmpty = "",
									TicksToMove = 360, //number of ticks to complete motion, 60 = 1 second
									MovementType = Delay, //Linear,ExpoDecay,ExpoGrowth,Delay,Show, //instant or fade Hide, //instant or fade
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(-90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
								},
								new RelMove
								{
									CenterEmpty = "",
									TicksToMove = 120, //number of ticks to complete motion, 60 = 1 second
									MovementType = ExpoDecay, //Linear,ExpoDecay,ExpoGrowth,Delay,Show, //instant or fade Hide, //instant or fade
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(-90, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
								},
							},
                    }
                },
                new PartAnimationSetDef()
                {
                    SubpartId = Names("drone_1"),
                    BarrelId = "muzzle_projectile_1", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 30, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 30, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    TriggerOnce = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
                        [Firing] =
                            new[]
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",//Specifiy an empty on the subpart to rotate around
                                    TicksToMove = 1, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = Hide, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new[]
                                    {
                                        Transformation(0f, 0, 1f), //linear movement in XYZ axes.
                                    },
                                    Rotation = Transformation(0, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
                    }
                },
                new PartAnimationSetDef()
                {
                    SubpartId = Names("drone_2"),
                    BarrelId = "muzzle_projectile_2", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 30, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 30, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    TriggerOnce = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
                        [Firing] =
                            new[]
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",//Specifiy an empty on the subpart to rotate around
                                    TicksToMove = 1, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = Hide, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new[]
                                    {
                                        Transformation(0f, 0, 1f), //linear movement in XYZ axes.
                                    },
                                    Rotation = Transformation(0, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
                    }
                },
                new PartAnimationSetDef()
                {
                    SubpartId = Names("drone_3"),
                    BarrelId = "muzzle_projectile_3", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 30, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 30, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(Firing),
                    TriggerOnce = Events(PreFire,Firing,StopFiring),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
                        [Firing] =
                            new[]
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",//Specifiy an empty on the subpart to rotate around
                                    TicksToMove = 1, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = Hide, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new[]
                                    {
                                        Transformation(0f, 0, 1f), //linear movement in XYZ axes.
                                    },
                                    Rotation = Transformation(0, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
                    }
                },
                #endregion
            }
        };
    }
}
