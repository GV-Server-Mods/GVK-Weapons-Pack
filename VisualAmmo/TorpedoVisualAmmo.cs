using System;
using System.Collections.Generic;
using Sandbox.Common.ObjectBuilders;
using Sandbox.Game.Weapons;
using Sandbox.ModAPI;
using VRage.Game.Components;
using VRage.Game.Entity;
using VRage.Game.ModAPI;
using VRage.ModAPI;
using VRage.ObjectBuilders;

namespace GVK.VisualAmmo
{
    // Shows Keen's torpedo model in the Torpedo Launcher tube (hub GVK-Settings#814).
    // Keen's VisualAmmoComponent draws it from Keen's own gun, which WeaponCore never loads.
    // This copies WeaponCore's loaded state into Keen's gun as 0 or 1 round of the
    // display-only GVK_TorpedoVisual magazine (Weapons_Ship.sbc). Clients only; nothing is synced.
    // Event-driven: a launcher does no per-tick work once WeaponCore has set it up.

    [MySessionComponentDescriptor(MyUpdateOrder.NoUpdate)]
    public class TorpedoVisualSession : MySessionComponentBase
    {
        const long WcApiChannel = 67549756549;

        internal static Func<MyEntity, int, bool, bool, bool> IsWeaponReadyToFire;
        internal static Func<MyEntity, int, float> GetMaxWeaponRange;
        internal static Action<MyEntity, int, Action<int, bool>> RegisterEventMonitor;
        internal static Action<MyEntity, int, Action<int, bool>> UnregisterEventMonitor;

        bool registered;

        public override void LoadData()
        {
            if (MyAPIGateway.Utilities.IsDedicated)
                return;

            MyAPIGateway.Utilities.RegisterMessageHandler(WcApiChannel, OnWcApiMessage);
            registered = true;
            MyAPIGateway.Utilities.SendModMessage(WcApiChannel, "ApiEndpointRequest");
        }

        protected override void UnloadData()
        {
            if (registered)
                MyAPIGateway.Utilities.UnregisterMessageHandler(WcApiChannel, OnWcApiMessage);

            Assign(null);
        }

        void OnWcApiMessage(object obj)
        {
            var methods = obj as IReadOnlyDictionary<string, Delegate>;
            if (methods != null)
                Assign(methods);
        }

        static void Assign(IReadOnlyDictionary<string, Delegate> methods)
        {
            IsWeaponReadyToFire = Get<Func<MyEntity, int, bool, bool, bool>>(methods, "IsWeaponReadyToFireBase");
            GetMaxWeaponRange = Get<Func<MyEntity, int, float>>(methods, "GetMaxWeaponRangeBase");
            RegisterEventMonitor = Get<Action<MyEntity, int, Action<int, bool>>>(methods, "RegisterEventMonitor");
            UnregisterEventMonitor = Get<Action<MyEntity, int, Action<int, bool>>>(methods, "UnRegisterEventMonitor");
        }

        static T Get<T>(IReadOnlyDictionary<string, Delegate> methods, string name) where T : class
        {
            Delegate method;
            return methods != null && methods.TryGetValue(name, out method) ? method as T : null;
        }
    }

    [MyEntityComponentDescriptor(typeof(MyObjectBuilder_SmallMissileLauncher), false,
        "LargeBlockTorpedoLauncher", "SmallBlockTorpedoLauncher",
        "LargeBlockTorpedoLauncher_NPC", "SmallBlockTorpedoLauncher_NPC")]
    public class TorpedoVisualAmmo : MyGameLogicComponent
    {
        // WeaponCore EventTriggers that can change whether a torpedo sits in the tube.
        const int Reloading = 0, Firing = 1, TurnOn = 4, TurnOff = 5, NoMagsToLoad = 7,
            EmptyOnGameLoad = 9, StopFiring = 10, WcInit = 13;

        MyGunBase gun;
        IMyCubeBlock block;
        Action<int, bool> onWcEvent;
        Action<IMyCubeBlock> onWorkingChanged;
        bool hooked;

        public override void Init(MyObjectBuilder_EntityBase objectBuilder)
        {
            if (MyAPIGateway.Utilities.IsDedicated)
                return;

            block = (IMyCubeBlock)Entity;
            onWcEvent = OnWcEvent;
            onWorkingChanged = OnWorkingChanged;
            NeedsUpdate |= MyEntityUpdateEnum.BEFORE_NEXT_FRAME;
        }

        public override void UpdateOnceBeforeFrame()
        {
            if (gun == null)
            {
                var gunObject = Entity as IMyGunObject<MyGunBase>;
                gun = gunObject?.GunBase;
                if (gun == null)
                    return;
            }

            if (hooked)
                Refresh();
            else
                TryHook();
        }

        // Only runs until WeaponCore has set the weapon up (world load, or while the block is being built).
        public override void UpdateAfterSimulation100()
        {
            TryHook();
        }

        void TryHook()
        {
            var getRange = TorpedoVisualSession.GetMaxWeaponRange;
            var register = TorpedoVisualSession.RegisterEventMonitor;

            // Range reads 0 until WeaponCore's platform is ready, the same point events can be registered.
            if (getRange == null || register == null || getRange((MyEntity)Entity, 0) <= 0f)
            {
                NeedsUpdate |= MyEntityUpdateEnum.EACH_100TH_FRAME;
                return;
            }

            register((MyEntity)Entity, 0, onWcEvent);
            block.IsWorkingChanged += onWorkingChanged;
            hooked = true;
            NeedsUpdate &= ~MyEntityUpdateEnum.EACH_100TH_FRAME;
            Refresh();
        }

        // Checked one frame later: WeaponCore raises some events before it updates the state they announce.
        void OnWcEvent(int trigger, bool active)
        {
            switch (trigger)
            {
                case Reloading:
                case Firing:
                case TurnOn:
                case TurnOff:
                case NoMagsToLoad:
                case EmptyOnGameLoad:
                case StopFiring:
                case WcInit:
                    NeedsUpdate |= MyEntityUpdateEnum.BEFORE_NEXT_FRAME;
                    break;
            }
        }

        void OnWorkingChanged(IMyCubeBlock changed)
        {
            NeedsUpdate |= MyEntityUpdateEnum.BEFORE_NEXT_FRAME;
        }

        void Refresh()
        {
            var isReady = TorpedoVisualSession.IsWeaponReadyToFire;
            if (isReady == null || Entity.MarkedForClose)
                return;

            // Ready means WeaponCore has a torpedo loaded, is not reloading, and the block is working.
            var rounds = isReady((MyEntity)Entity, 0, true, false) ? 1 : 0;
            if (gun.CurrentAmmo != rounds)
                gun.SetCurrentAmmo(rounds, false);
        }

        public override void Close()
        {
            if (!hooked)
                return;

            block.IsWorkingChanged -= onWorkingChanged;
            var unregister = TorpedoVisualSession.UnregisterEventMonitor;
            if (unregister != null)
                unregister((MyEntity)Entity, 0, onWcEvent);
            hooked = false;
        }
    }
}
