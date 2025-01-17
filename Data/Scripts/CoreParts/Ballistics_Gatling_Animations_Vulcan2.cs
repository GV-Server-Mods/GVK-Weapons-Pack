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
        private AnimationDef GVK_AvengerGatlingTurretAnimations => new AnimationDef
        {

            //These are the animation sets the weapon uses in various states.
            AnimationSets = new[]
            {   //Region is used for organisation as it creates a collapsible tag.
				#region Barrels Animations
                new PartAnimationSetDef()
                {
                    SubpartId = Names("Barrels_R"),
                    BarrelId = "muzzle_missile_2", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
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
                                    TicksToMove = 60, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = Linear, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(0, 0, -1500), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
                        [StopFiring] =
                            new[]
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",//Specifiy an empty on the subpart to rotate around
                                    TicksToMove = 240, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = ExpoDecay, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(0, 0, -800f), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
                    }
                },
                new PartAnimationSetDef()
                {
                    SubpartId = Names("Barrels_L"),
                    BarrelId = "muzzle_missile_1", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
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
                                    TicksToMove = 4, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = Linear, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(0, 0, 120), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees, rotates around CenterEmpty
                                },
                            },
                        [StopFiring] =
                            new[]
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",//Specifiy an empty on the subpart to rotate around
                                    TicksToMove = 240, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = ExpoDecay, // ExpoGrowth (speedsup),  ExpoDecay (slows down), Linear, Delay, Show, Hide
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(0, 0, 800f), //degrees
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
