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
        private AnimationDef AryxRailgunAnims => new AnimationDef
        {

            EventParticles = new Dictionary<PartAnimationSetDef.EventTriggers, EventParticle[]>
            {
                [PreFire] = new[]{
				    new EventParticle
				    {
					    EmptyNames = Names("muzzle_projectile_1"),
					    MuzzleNames = Names("muzzle_projectile_1"),
					    StartDelay = 0, //ticks 60 = 1 second
					    LoopDelay = 0, //ticks 60 = 1 second
					    ForceStop = false,
					    Particle = new ParticleDef
					    {
						    Name = "Aryx_Railgun_windup_effect",
						    Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
						    Extras = new ParticleOptionDef
						    {
							    Loop = true,
							    Restart = false,
							    MaxDistance = 1000, //meters
							    MaxDuration = 120, //ticks 60 = 1 second
							    Scale = 1,
							}
						}
					},
				},
            },
        };

        private AnimationDef SmallRailgunAnimation => new AnimationDef
        {
            EventParticles = new Dictionary<PartAnimationSetDef.EventTriggers, EventParticle[]>
            {
                [PreFire] = new[]{ //This particle fires in the Prefire state, during the 2 second windup.
                                   //Valid options include Firing, Reloading, Overheated, Tracking, On, Off, BurstReload, OutOfAmmo, PreFire.
				   new EventParticle
				   {
					   EmptyNames = Names("barrel_001"), //If you want an effect on your own dummy
					   MuzzleNames = Names("barrel_001"), //If you want an effect on the muzzle
					   StartDelay = 0, //ticks 60 = 1 second, delay until particle starts.
					   LoopDelay = 0, //ticks 60 = 1 second
					   ForceStop = false,
					   Particle = new ParticleDef
					   {
						   Name = "Muzzle_Flash_RailgunSmall2", //Particle subtypeID
						   Color = Color(red: 25, green: 25, blue: 25, alpha: 1), //This is redundant as recolouring is no longer supported.
						   Extras = new ParticleOptionDef //do your particle colours in your particle file instead.
						   {
							   Loop = false, //Should match your particle definition.
							   Restart = false,
							   MaxDistance = 1000, //meters
							   MaxDuration = 30, //ticks 60 = 1 second
							   Scale = 1, //How chunky the particle is.
						    }
					    }
				    },
			    },
            },

        };
    }
}