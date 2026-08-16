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
        /// Possible Events ///
        
        //Reloading,
        //Firing,
        //Tracking,
        //Overheated,
        //TurnOn,
        //TurnOff,
        //BurstReload,
        //OutOfAmmo,
        //PreFire,
        //EmptyOnGameLoad,
        //StopFiring,
        //StopTracking

        private AnimationDef MXA_ArcherPods_Animation => new AnimationDef
        {
            AnimationSets = new[]
            {
                /*
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Piston", "ArcherPod2_Piston", "ArcherPod3_Piston", "ArcherPod4_Piston", "ArcherPod5_Piston", "ArcherPod1_Door", "ArcherPod2_Door", "ArcherPod3_Door", "ArcherPod4_Door", "ArcherPod5_Door"),
                    BarrelId = "Any", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						
					}
				},
				*/
				#region EmptyOnGameLoad
				new PartAnimationSetDef()
                {
                    SubpartId = Names
					(
					//Pod 1
					"ArcherPod1_Missile_1", "ArcherPod1_Missile_2", "ArcherPod1_Missile_3", "ArcherPod1_Missile_4", "ArcherPod1_Missile_5", "ArcherPod1_Missile_6", "ArcherPod1_Missile_7", "ArcherPod1_Missile_8", "ArcherPod1_Missile_9", "ArcherPod1_Missile_10", 
					"ArcherPod1_Missile_11", "ArcherPod1_Missile_12", "ArcherPod1_Missile_13", "ArcherPod1_Missile_14", "ArcherPod1_Missile_15", "ArcherPod1_Missile_16", "ArcherPod1_Missile_17", "ArcherPod1_Missile_18", "ArcherPod1_Missile_19", "ArcherPod1_Missile_20", 
					"ArcherPod1_Missile_21", "ArcherPod1_Missile_22", "ArcherPod1_Missile_23", "ArcherPod1_Missile_24", "ArcherPod1_Missile_25", "ArcherPod1_Missile_26", "ArcherPod1_Missile_27", "ArcherPod1_Missile_28", "ArcherPod1_Missile_29", "ArcherPod1_Missile_30", 
					//Pod 2
					"ArcherPod2_Missile_1", "ArcherPod2_Missile_2", "ArcherPod2_Missile_3", "ArcherPod2_Missile_4", "ArcherPod2_Missile_5", "ArcherPod2_Missile_6", "ArcherPod2_Missile_7", "ArcherPod2_Missile_8", "ArcherPod2_Missile_9", "ArcherPod2_Missile_10", 
					"ArcherPod2_Missile_11", "ArcherPod2_Missile_12", "ArcherPod2_Missile_13", "ArcherPod2_Missile_14", "ArcherPod2_Missile_15", "ArcherPod2_Missile_16", "ArcherPod2_Missile_17", "ArcherPod2_Missile_18", "ArcherPod2_Missile_19", "ArcherPod2_Missile_20", 
					"ArcherPod2_Missile_21", "ArcherPod2_Missile_22", "ArcherPod2_Missile_23", "ArcherPod2_Missile_24", "ArcherPod2_Missile_25", "ArcherPod2_Missile_26", "ArcherPod2_Missile_27", "ArcherPod2_Missile_28", "ArcherPod2_Missile_29", "ArcherPod2_Missile_30", 
					//Pod 3
					"ArcherPod3_Missile_1", "ArcherPod3_Missile_2", "ArcherPod3_Missile_3", "ArcherPod3_Missile_4", "ArcherPod3_Missile_5", "ArcherPod3_Missile_6", "ArcherPod3_Missile_7", "ArcherPod3_Missile_8", "ArcherPod3_Missile_9", "ArcherPod3_Missile_10", 
					"ArcherPod3_Missile_11", "ArcherPod3_Missile_12", "ArcherPod3_Missile_13", "ArcherPod3_Missile_14", "ArcherPod3_Missile_15", "ArcherPod3_Missile_16", "ArcherPod3_Missile_17", "ArcherPod3_Missile_18", "ArcherPod3_Missile_19", "ArcherPod3_Missile_20", 
					"ArcherPod3_Missile_21", "ArcherPod3_Missile_22", "ArcherPod3_Missile_23", "ArcherPod3_Missile_24", "ArcherPod3_Missile_25", "ArcherPod3_Missile_26", "ArcherPod3_Missile_27", "ArcherPod3_Missile_28", "ArcherPod3_Missile_29", "ArcherPod3_Missile_30", 
					//Pod 4
					"ArcherPod4_Missile_1", "ArcherPod4_Missile_2", "ArcherPod4_Missile_3", "ArcherPod4_Missile_4", "ArcherPod4_Missile_5", "ArcherPod4_Missile_6", "ArcherPod4_Missile_7", "ArcherPod4_Missile_8", "ArcherPod4_Missile_9", "ArcherPod4_Missile_10", 
					"ArcherPod4_Missile_11", "ArcherPod4_Missile_12", "ArcherPod4_Missile_13", "ArcherPod4_Missile_14", "ArcherPod4_Missile_15", "ArcherPod4_Missile_16", "ArcherPod4_Missile_17", "ArcherPod4_Missile_18", "ArcherPod4_Missile_19", "ArcherPod4_Missile_20", 
					"ArcherPod4_Missile_21", "ArcherPod4_Missile_22", "ArcherPod4_Missile_23", "ArcherPod4_Missile_24", "ArcherPod4_Missile_25", "ArcherPod4_Missile_26", "ArcherPod4_Missile_27", "ArcherPod4_Missile_28", "ArcherPod4_Missile_29", "ArcherPod4_Missile_30", 
					//Pod 5
					"ArcherPod5_Missile_1", "ArcherPod5_Missile_2", "ArcherPod5_Missile_3", "ArcherPod5_Missile_4", "ArcherPod5_Missile_5", "ArcherPod5_Missile_6", "ArcherPod5_Missile_7", "ArcherPod5_Missile_8", "ArcherPod5_Missile_9", "ArcherPod5_Missile_10", 
					"ArcherPod5_Missile_11", "ArcherPod5_Missile_12", "ArcherPod5_Missile_13", "ArcherPod5_Missile_14", "ArcherPod5_Missile_15", "ArcherPod5_Missile_16", "ArcherPod5_Missile_17", "ArcherPod5_Missile_18", "ArcherPod5_Missile_19", "ArcherPod5_Missile_20", 
					"ArcherPod5_Missile_21", "ArcherPod5_Missile_22", "ArcherPod5_Missile_23", "ArcherPod5_Missile_24", "ArcherPod5_Missile_25", "ArcherPod5_Missile_26", "ArcherPod5_Missile_27", "ArcherPod5_Missile_28", "ArcherPod5_Missile_29", "ArcherPod5_Missile_30"
					),
                    BarrelId = "Any", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[EmptyOnGameLoad] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 2280, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 1, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Show,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
                        },
					}
				},
				#endregion
				
				#region Hide Missile
				
				#region Pod 1
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_1"),
                    BarrelId = "subpart_ArcherPod1_Missile_1", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_2"),
                    BarrelId = "subpart_ArcherPod1_Missile_2", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_3"),
                    BarrelId = "subpart_ArcherPod1_Missile_3", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_4"),
                    BarrelId = "subpart_ArcherPod1_Missile_4", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_5"),
                    BarrelId = "subpart_ArcherPod1_Missile_5", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_6"),
                    BarrelId = "subpart_ArcherPod1_Missile_6", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_7"),
                    BarrelId = "subpart_ArcherPod1_Missile_7", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_8"),
                    BarrelId = "subpart_ArcherPod1_Missile_8", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_9"),
                    BarrelId = "subpart_ArcherPod1_Missile_9", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_10"),
                    BarrelId = "subpart_ArcherPod1_Missile_10", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_11"),
                    BarrelId = "subpart_ArcherPod1_Missile_11", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_12"),
                    BarrelId = "subpart_ArcherPod1_Missile_12", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_13"),
                    BarrelId = "subpart_ArcherPod1_Missile_13", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_14"),
                    BarrelId = "subpart_ArcherPod1_Missile_14", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_15"),
                    BarrelId = "subpart_ArcherPod1_Missile_15", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_16"),
                    BarrelId = "subpart_ArcherPod1_Missile_16", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_17"),
                    BarrelId = "subpart_ArcherPod1_Missile_17", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_18"),
                    BarrelId = "subpart_ArcherPod1_Missile_18", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_19"),
                    BarrelId = "subpart_ArcherPod1_Missile_19", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_20"),
                    BarrelId = "subpart_ArcherPod1_Missile_20", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_21"),
                    BarrelId = "subpart_ArcherPod1_Missile_21", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_22"),
                    BarrelId = "subpart_ArcherPod1_Missile_22", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_23"),
                    BarrelId = "subpart_ArcherPod1_Missile_23", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_24"),
                    BarrelId = "subpart_ArcherPod1_Missile_24", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_25"),
                    BarrelId = "subpart_ArcherPod1_Missile_25", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_26"),
                    BarrelId = "subpart_ArcherPod1_Missile_26", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_27"),
                    BarrelId = "subpart_ArcherPod1_Missile_27", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_28"),
                    BarrelId = "subpart_ArcherPod1_Missile_28", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_29"),
                    BarrelId = "subpart_ArcherPod1_Missile_29", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Missile_30"),
                    BarrelId = "subpart_ArcherPod1_Missile_30", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				#endregion
				
				#region Pod 2
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_1"),
                    BarrelId = "subpart_ArcherPod2_Missile_1", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_2"),
                    BarrelId = "subpart_ArcherPod2_Missile_2", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_3"),
                    BarrelId = "subpart_ArcherPod2_Missile_3", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_4"),
                    BarrelId = "subpart_ArcherPod2_Missile_4", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_5"),
                    BarrelId = "subpart_ArcherPod2_Missile_5", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_6"),
                    BarrelId = "subpart_ArcherPod2_Missile_6", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_7"),
                    BarrelId = "subpart_ArcherPod2_Missile_7", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_8"),
                    BarrelId = "subpart_ArcherPod2_Missile_8", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_9"),
                    BarrelId = "subpart_ArcherPod2_Missile_9", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_10"),
                    BarrelId = "subpart_ArcherPod2_Missile_10", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_11"),
                    BarrelId = "subpart_ArcherPod2_Missile_11", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_12"),
                    BarrelId = "subpart_ArcherPod2_Missile_12", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_13"),
                    BarrelId = "subpart_ArcherPod2_Missile_13", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_14"),
                    BarrelId = "subpart_ArcherPod2_Missile_14", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_15"),
                    BarrelId = "subpart_ArcherPod2_Missile_15", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_16"),
                    BarrelId = "subpart_ArcherPod2_Missile_16", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_17"),
                    BarrelId = "subpart_ArcherPod2_Missile_17", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_18"),
                    BarrelId = "subpart_ArcherPod2_Missile_18", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_19"),
                    BarrelId = "subpart_ArcherPod2_Missile_19", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_20"),
                    BarrelId = "subpart_ArcherPod2_Missile_20", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_21"),
                    BarrelId = "subpart_ArcherPod2_Missile_21", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_22"),
                    BarrelId = "subpart_ArcherPod2_Missile_22", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_23"),
                    BarrelId = "subpart_ArcherPod2_Missile_23", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_24"),
                    BarrelId = "subpart_ArcherPod2_Missile_24", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_25"),
                    BarrelId = "subpart_ArcherPod2_Missile_25", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_26"),
                    BarrelId = "subpart_ArcherPod2_Missile_26", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_27"),
                    BarrelId = "subpart_ArcherPod2_Missile_27", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_28"),
                    BarrelId = "subpart_ArcherPod2_Missile_28", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_29"),
                    BarrelId = "subpart_ArcherPod2_Missile_29", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Missile_30"),
                    BarrelId = "subpart_ArcherPod2_Missile_30", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				#endregion
				
				#region Pod 3
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_1"),
                    BarrelId = "subpart_ArcherPod3_Missile_1", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_2"),
                    BarrelId = "subpart_ArcherPod3_Missile_2", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_3"),
                    BarrelId = "subpart_ArcherPod3_Missile_3", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_4"),
                    BarrelId = "subpart_ArcherPod3_Missile_4", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_5"),
                    BarrelId = "subpart_ArcherPod3_Missile_5", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_6"),
                    BarrelId = "subpart_ArcherPod3_Missile_6", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_7"),
                    BarrelId = "subpart_ArcherPod3_Missile_7", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_8"),
                    BarrelId = "subpart_ArcherPod3_Missile_8", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_9"),
                    BarrelId = "subpart_ArcherPod3_Missile_9", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_10"),
                    BarrelId = "subpart_ArcherPod3_Missile_10", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_11"),
                    BarrelId = "subpart_ArcherPod3_Missile_11", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_12"),
                    BarrelId = "subpart_ArcherPod3_Missile_12", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_13"),
                    BarrelId = "subpart_ArcherPod3_Missile_13", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_14"),
                    BarrelId = "subpart_ArcherPod3_Missile_14", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_15"),
                    BarrelId = "subpart_ArcherPod3_Missile_15", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_16"),
                    BarrelId = "subpart_ArcherPod3_Missile_16", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_17"),
                    BarrelId = "subpart_ArcherPod3_Missile_17", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_18"),
                    BarrelId = "subpart_ArcherPod3_Missile_18", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_19"),
                    BarrelId = "subpart_ArcherPod3_Missile_19", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_20"),
                    BarrelId = "subpart_ArcherPod3_Missile_20", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_21"),
                    BarrelId = "subpart_ArcherPod3_Missile_21", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_22"),
                    BarrelId = "subpart_ArcherPod3_Missile_22", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_23"),
                    BarrelId = "subpart_ArcherPod3_Missile_23", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_24"),
                    BarrelId = "subpart_ArcherPod3_Missile_24", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_25"),
                    BarrelId = "subpart_ArcherPod3_Missile_25", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_26"),
                    BarrelId = "subpart_ArcherPod3_Missile_26", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_27"),
                    BarrelId = "subpart_ArcherPod3_Missile_27", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_28"),
                    BarrelId = "subpart_ArcherPod3_Missile_28", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_29"),
                    BarrelId = "subpart_ArcherPod3_Missile_29", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod3_Missile_30"),
                    BarrelId = "subpart_ArcherPod3_Missile_30", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				#endregion

				#region Pod 4
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_1"),
                    BarrelId = "subpart_ArcherPod4_Missile_1", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_2"),
                    BarrelId = "subpart_ArcherPod4_Missile_2", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_3"),
                    BarrelId = "subpart_ArcherPod4_Missile_3", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_4"),
                    BarrelId = "subpart_ArcherPod4_Missile_4", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_5"),
                    BarrelId = "subpart_ArcherPod4_Missile_5", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_6"),
                    BarrelId = "subpart_ArcherPod4_Missile_6", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_7"),
                    BarrelId = "subpart_ArcherPod4_Missile_7", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_8"),
                    BarrelId = "subpart_ArcherPod4_Missile_8", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_9"),
                    BarrelId = "subpart_ArcherPod4_Missile_9", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_10"),
                    BarrelId = "subpart_ArcherPod4_Missile_10", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_11"),
                    BarrelId = "subpart_ArcherPod4_Missile_11", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_12"),
                    BarrelId = "subpart_ArcherPod4_Missile_12", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_13"),
                    BarrelId = "subpart_ArcherPod4_Missile_13", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_14"),
                    BarrelId = "subpart_ArcherPod4_Missile_14", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_15"),
                    BarrelId = "subpart_ArcherPod4_Missile_15", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_16"),
                    BarrelId = "subpart_ArcherPod4_Missile_16", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_17"),
                    BarrelId = "subpart_ArcherPod4_Missile_17", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_18"),
                    BarrelId = "subpart_ArcherPod4_Missile_18", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_19"),
                    BarrelId = "subpart_ArcherPod4_Missile_19", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_20"),
                    BarrelId = "subpart_ArcherPod4_Missile_20", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_21"),
                    BarrelId = "subpart_ArcherPod4_Missile_21", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_22"),
                    BarrelId = "subpart_ArcherPod4_Missile_22", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_23"),
                    BarrelId = "subpart_ArcherPod4_Missile_23", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_24"),
                    BarrelId = "subpart_ArcherPod4_Missile_24", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_25"),
                    BarrelId = "subpart_ArcherPod4_Missile_25", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_26"),
                    BarrelId = "subpart_ArcherPod4_Missile_26", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_27"),
                    BarrelId = "subpart_ArcherPod4_Missile_27", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_28"),
                    BarrelId = "subpart_ArcherPod4_Missile_28", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_29"),
                    BarrelId = "subpart_ArcherPod4_Missile_29", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod4_Missile_30"),
                    BarrelId = "subpart_ArcherPod4_Missile_30", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				#endregion
				
				#region Pod 5
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_1"),
                    BarrelId = "subpart_ArcherPod5_Missile_1", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_2"),
                    BarrelId = "subpart_ArcherPod5_Missile_2", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_3"),
                    BarrelId = "subpart_ArcherPod5_Missile_3", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_4"),
                    BarrelId = "subpart_ArcherPod5_Missile_4", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_5"),
                    BarrelId = "subpart_ArcherPod5_Missile_5", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_6"),
                    BarrelId = "subpart_ArcherPod5_Missile_6", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_7"),
                    BarrelId = "subpart_ArcherPod5_Missile_7", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_8"),
                    BarrelId = "subpart_ArcherPod5_Missile_8", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_9"),
                    BarrelId = "subpart_ArcherPod5_Missile_9", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_10"),
                    BarrelId = "subpart_ArcherPod5_Missile_10", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_11"),
                    BarrelId = "subpart_ArcherPod5_Missile_11", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_12"),
                    BarrelId = "subpart_ArcherPod5_Missile_12", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_13"),
                    BarrelId = "subpart_ArcherPod5_Missile_13", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_14"),
                    BarrelId = "subpart_ArcherPod5_Missile_14", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_15"),
                    BarrelId = "subpart_ArcherPod5_Missile_15", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_16"),
                    BarrelId = "subpart_ArcherPod5_Missile_16", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_17"),
                    BarrelId = "subpart_ArcherPod5_Missile_17", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_18"),
                    BarrelId = "subpart_ArcherPod5_Missile_18", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_19"),
                    BarrelId = "subpart_ArcherPod5_Missile_19", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_20"),
                    BarrelId = "subpart_ArcherPod5_Missile_20", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_21"),
                    BarrelId = "subpart_ArcherPod5_Missile_21", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_22"),
                    BarrelId = "subpart_ArcherPod5_Missile_22", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_23"),
                    BarrelId = "subpart_ArcherPod5_Missile_23", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_24"),
                    BarrelId = "subpart_ArcherPod5_Missile_24", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_25"),
                    BarrelId = "subpart_ArcherPod5_Missile_25", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_26"),
                    BarrelId = "subpart_ArcherPod5_Missile_26", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_27"),
                    BarrelId = "subpart_ArcherPod5_Missile_27", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_28"),
                    BarrelId = "subpart_ArcherPod5_Missile_28", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_29"),
                    BarrelId = "subpart_ArcherPod5_Missile_29", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod5_Missile_30"),
                    BarrelId = "subpart_ArcherPod5_Missile_30", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
						[Firing] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
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
					}
				},
				#endregion
				
				#endregion
				
				#region Moving Parts
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Piston", "ArcherPod2_Piston", "ArcherPod3_Piston", "ArcherPod4_Piston", "ArcherPod5_Piston", "ArcherPod1_Door", "ArcherPod2_Door", "ArcherPod3_Door", "ArcherPod4_Door", "ArcherPod5_Door"),
                    BarrelId = "Any", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
                        


                        [TurnOn] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new[]
                                {
                                     Transformation(0, 0, -.2), //linear movement
                                },
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
                        },
						[TurnOff] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new[]
                                {
                                     Transformation(0, 0, .2), //linear movement
                                },
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
                        },	
						[Reloading] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 180, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new[]
                                {
                                     Transformation(0, 0, .2), //linear movement
                                },
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 2280, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new[]
                                {
                                     Transformation(0, 0, -.2), //linear movement
                                },
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
						},
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod1_Door", "ArcherPod3_Door", "ArcherPod5_Door"),
                    BarrelId = "Any", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
                        


                        [TurnOn] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
                            new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(-90, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
                        },
						
						[TurnOff] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(90, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
                        },	
						[Reloading] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 180, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(90, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 2280, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(-90, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
                        },
					}
				},
				new PartAnimationSetDef()
                {
                    SubpartId = Names("ArcherPod2_Door", "ArcherPod4_Door"),
                    BarrelId = "Any", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    Loop = Events(),
                    ResetEmissives = Events(),
                    EventMoveSets = new Dictionary<PartAnimationSetDef.EventTriggers, RelMove[]>
                    {
                        


                        [TurnOn] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
                            new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(90, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
                        },
						
						[TurnOff] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(-90, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
                        },
						[Reloading] =
                        new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                        {
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 180, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(-90, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 2280, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Delay,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(0, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
							new RelMove
                            {
                                CenterEmpty = "",
                                TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                MovementType = Linear,
                                LinearPoints = new XYZ[0],
                                Rotation = Transformation(90, 0, 0), //degrees
                                RotAroundCenter = Transformation(0, 0, 0), //degrees
                            },
                        },
					}
				},
				
				#endregion
            }
            
        };
    }
}
