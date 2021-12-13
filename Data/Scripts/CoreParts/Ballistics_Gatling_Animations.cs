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
        //NoMagsToLoad,
        //PreFire,
        //EmptyOnGameLoad,
        //StopFiring,
        //StopTracking

        private AnimationDef MD_Gatling_Animations => new AnimationDef
        {

            EventParticles = new Dictionary<PartAnimationSetDef.EventTriggers, EventParticle[]>
            {
                [Firing] = new[]{
                       new EventParticle
                       {
                           EmptyNames = Names("muzzle_projectile_1"),
                           MuzzleNames = Names("muzzle_projectile_1"),
                           StartDelay = 0, //ticks 60 = 1 second
                           LoopDelay = 0, //ticks 60 = 1 second
                           ForceStop = true,
                           Particle = new ParticleDef
                           {
                               Name = "Muzzle_Flash_Large_GV",
                               Color = Color(red: 1, green: 1, blue: 1, alpha: 1),
                               Extras = new ParticleOptionDef
                               {
                                   Loop = true,
                                   Restart = false,
                                   MaxDistance = 1500, //meters
                                   MaxDuration = 0, //ticks 60 = 1 second
                                   Scale = 1,
                               }
                           }
                       },
                   },
            },

        };
    }
}
