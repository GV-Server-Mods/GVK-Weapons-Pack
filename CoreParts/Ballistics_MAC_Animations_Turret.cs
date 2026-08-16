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

        private AnimationDef MACTurretAnimation => new AnimationDef
        {
			
            EventParticles = new Dictionary<PartAnimationSetDef.EventTriggers, EventParticle[]>
            {
                [PreFire] = new[]{ //This particle fires in the Prefire state, during the 2 second windup.
                                   //Valid options include Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire.
				    new EventParticle
				    {
					    EmptyNames = Names(""), //If you want an effect on your own dummy
					    MuzzleNames = Names("muzzle_missile_001"), //If you want an effect on the muzzle
					    StartDelay = 0, //ticks 60 = 1 second, delay until particle starts.
					    LoopDelay = 0, //ticks 60 = 1 second
					    ForceStop = false,
					    Particle = new ParticleDef
					    {
						    Name = "MD_MAC_Muzzle_Flash", //Particle subtypeID
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
        };
    }
}
