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
        
        private AnimationDef Harbinger_Emissive => new AnimationDef
        {
            EventParticles = new Dictionary<PartAnimationSetDef.EventTriggers, EventParticle[]>
            {
                [PreFire] = new[]{ //This particle fires in the Prefire state, during the 2 second windup.
                                   //Valid options include Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire.
				    new EventParticle
				    {
					    EmptyNames = Names("muzzle_missile_1"), //If you want an effect on your own dummy
					    MuzzleNames = Names("muzzle_missile_1"), //If you want an effect on the muzzle
					    StartDelay = 0, //ticks 60 = 1 second, delay until particle starts.
					    LoopDelay = 0, //ticks 60 = 1 second
					    ForceStop = false,
					    Particle = new ParticleDef
					    {
						    Name = "MD_Harbinger_Muzzle_Flash", //Particle subtypeID
						    Extras = new ParticleOptionDef //do your particle colours in your particle file instead.
						    {
							   Loop = false, //Should match your particle definition.
							   Restart = false,
							   MaxDistance = 3000, //meters
							   MaxDuration = 360, //ticks 60 = 1 second
							   Scale = 1, //How chunky the particle is.
						    }
					    }
				    },
			    },
            },

            Emissives = new[]
            {
                Emissive(
                    EmissiveName: "TurnOn",
                    Colors: new []
                    {
                        Color(red:0f, green: 0f, blue:0f, alpha: 1),//will transitions form one color to the next if more than one
                        Color(red:.035f, green: .025f, blue:.075f, alpha: 1), //(red: .3137255f, green: .2901961f, blue: 1.0f, alpha: 100)
                    },
                    IntensityFrom:0, //starting intensity, can be 0.0-1.0 or 1.0-0.0, setting both from and to, to the same value will stay at that value
                    IntensityTo:100,
                    CycleEmissiveParts: false,//whether to cycle from one part to the next, while also following the Intensity Range, or set all parts at the same time to the same value
                    LeavePreviousOn: true,//true will leave last part at the last setting until end of animation, used with cycleEmissiveParts
                    EmissivePartNames: new []
                    {
                      "Emissive3"
                    }),
                Emissive(
                    EmissiveName: "TurnOff",
                    Colors: new []
                    {
                        Color(red:.035f, green: .025f, blue:.075f, alpha: 1), //(red: .3137255f, green: .2901961f, blue: 1.0f, alpha: 100)
                        Color(red:0f, green: 0f, blue:0f, alpha: 1),//will transitions form one color to the next if more than one
                    },
                    IntensityFrom:100, //starting intensity, can be 0.0-1.0 or 1.0-0.0, setting both from and to, to the same value will stay at that value
                    IntensityTo:0,
                    CycleEmissiveParts: false,//whether to cycle from one part to the next, while also following the Intensity Range, or set all parts at the same time to the same value
                    LeavePreviousOn: true,//true will leave last part at the last setting until end of animation, used with cycleEmissiveParts
                    EmissivePartNames: new []
                    {
                        "Emissive3"
                    }),
                Emissive(
                    EmissiveName: "PreFire",
                    Colors: new []
                    {
                        Color(red:.035f, green: .025f, blue:.075f, alpha: 1),
                        Color(red:.35f, green: .35f, blue: 0f, alpha: 1),//will transitions form one color to the next if more than one
                    },
                    IntensityFrom:100, //starting intensity, can be 0.0-1.0 or 1.0-0.0, setting both from and to, to the same value will stay at that value
                    IntensityTo:1000,
                    CycleEmissiveParts: false,//whether to cycle from one part to the next, while also following the Intensity Range, or set all parts at the same time to the same value
                    LeavePreviousOn: false,//true will leave last part at the last setting until end of animation, used with cycleEmissiveParts
                    EmissivePartNames: new []
                    {
                        "Emissive3"
                    }),
                Emissive(
                    EmissiveName: "Firing",
                    Colors: new []
                    {
                        Color(red:.35f, green: .35f, blue: 0f, alpha: 1),
                        Color(red:.035f, green: 0f, blue: 0f, alpha: 1),//will transitions form one color to the next if more than one
                    },
                    IntensityFrom:1000, //starting intensity, can be 0.0-1.0 or 1.0-0.0, setting both from and to, to the same value will stay at that value
                    IntensityTo:1,
                    CycleEmissiveParts: false,//whether to cycle from one part to the next, while also following the Intensity Range, or set all parts at the same time to the same value
                    LeavePreviousOn: false,//true will leave last part at the last setting until end of animation, used with cycleEmissiveParts
                    EmissivePartNames: new []
                    {
                        "Emissive3"
                    }),
                Emissive(
                    EmissiveName: "Reloading",
                    Colors: new []
                    {
                        Color(red:.035f, green: 0f, blue: 0f, alpha: 1),
                        Color(red:.035f, green: .025f, blue:.075f, alpha: 1),//will transitions form one color to the next if more than one
                    },
                    IntensityFrom:1, //starting intensity, can be 0.0-1.0 or 1.0-0.0, setting both from and to, to the same value will stay at that value
                    IntensityTo:100,
                    CycleEmissiveParts: false,//whether to cycle from one part to the next, while also following the Intensity Range, or set all parts at the same time to the same value
                    LeavePreviousOn: true,//true will leave last part at the last setting until end of animation, used with cycleEmissiveParts
                    EmissivePartNames: new []
                    {
                        "Emissive3"
                    }),

            },
            AnimationSets = new[]
            {
				new PartAnimationSetDef()
                {
                    SubpartId = Names("harbinger_short_thin_elevation_emissive"),
                    BarrelId = "Any", //only used for firing, use "Any" for all muzzles
                    StartupFireDelay = 0,
                    AnimationDelays = Delays(FiringDelay : 0, ReloadingDelay: 0, OverheatedDelay: 0, TrackingDelay: 0, LockedDelay: 0, OnDelay: 0, OffDelay: 0, BurstReloadDelay: 0, OutOfAmmoDelay: 0, PreFireDelay: 0),//Delay before animation starts
                    Reverse = Events(),
                    TriggerOnce = Events(),
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
                                    EmissiveName = "TurnOn",//name of defined emissive
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(0, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees
                                },
                            },
                        [Firing] =
                            new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",
                                    TicksToMove = 1, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = Delay,
                                    EmissiveName = "Firing",//name of defined emissive
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(0, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees
                                },
                            },
                        [PreFire] =
                            new[] //Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire define a new[] for each
                            {
                                new RelMove
                                {
                                    CenterEmpty = "",
                                    TicksToMove = 120, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = Delay,
                                    EmissiveName = "PreFire",//name of defined emissive
                                    LinearPoints = new XYZ[0],
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
                                    EmissiveName = "TurnOff",//name of defined emissive
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
                                    TicksToMove = 360, //number of ticks to complete motion, 60 = 1 second
                                    MovementType = Delay,
                                    EmissiveName = "Reloading",//name of defined emissive
                                    LinearPoints = new XYZ[0],
                                    Rotation = Transformation(0, 0, 0), //degrees
                                    RotAroundCenter = Transformation(0, 0, 0), //degrees
                                },
                            },
                    }
                },
                
				
			}
		};
	
    }
}
