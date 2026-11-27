using System;
using System.Collections.Generic;
using Sandbox.Game.Entities;
using Sandbox.ModAPI;
using Sandbox.ModAPI.Interfaces.Terminal;
using VRage.Game.Components;
using VRage.Game.Entity;

namespace GVK.WeaponCoreFixes
{
    // Workaround for a WeaponCore bug (hub GVK-Settings#814): the first SmallMissileLauncherReload block of a
    // session (small-grid Flak 100mm Gun, Griffin, Hydra) hides WeaponCore's controls on every SmallMissileLauncher
    // weapon (torpedo, flare, artillery, rocket launchers) until a world reload.
    // Keen's control list for the Reload class starts as a copy of the launcher class's list, sharing the same
    // control objects, and WeaponCore's Reload setup then hides those shared WeaponCore controls on all its blocks.
    // When the first Reload block appears, this removes the shared WeaponCore controls from the Reload list only,
    // before WeaponCore's deferred setup runs. Reload blocks get WeaponCore's own set for their class as before.
    // Clients only; it stops listening after the first Reload block. Delete once WeaponCore skips its own controls
    // in Session.AlterControls.
    [MySessionComponentDescriptor(MyUpdateOrder.NoUpdate)]
    public class ReloadTerminalFix : MySessionComponentBase
    {
        Action<MyEntity> onEntityCreate;
        bool listening;

        public override void LoadData()
        {
            if (MyAPIGateway.Utilities.IsDedicated)
                return;

            onEntityCreate = OnEntityCreate;
            MyEntities.OnEntityCreate += onEntityCreate;
            listening = true;
        }

        protected override void UnloadData()
        {
            StopListening();
        }

        // Runs for every entity created, so it does one cast and returns.
        void OnEntityCreate(MyEntity entity)
        {
            if (!(entity is IMySmallMissileLauncherReload))
                return;

            StopListening();
            RemoveSharedWcControls();
        }

        void StopListening()
        {
            if (!listening)
                return;

            MyEntities.OnEntityCreate -= onEntityCreate;
            listening = false;
        }

        // Runs once per session. WeaponCore's sliders and separators have no "WC_" prefix, so a shared control is
        // treated as WeaponCore's unless it is one of Keen's: from the gun base classes, or Keen's own launcher controls.
        static void RemoveSharedWcControls()
        {
            List<IMyTerminalControl> gunBase, launcher, reload;
            MyAPIGateway.TerminalControls.GetControls<IMyUserControllableGun>(out gunBase);
            if (gunBase.Count == 0)
                return;

            MyAPIGateway.TerminalControls.GetControls<IMySmallMissileLauncher>(out launcher);
            MyAPIGateway.TerminalControls.GetControls<IMySmallMissileLauncherReload>(out reload);

            var keenControls = new HashSet<IMyTerminalControl>(gunBase);
            var launcherControls = new HashSet<IMyTerminalControl>(launcher);
            foreach (var control in reload)
            {
                if (launcherControls.Contains(control) && !keenControls.Contains(control) && !IsKeenLauncherControl(control.Id))
                    MyAPIGateway.TerminalControls.RemoveControl<IMySmallMissileLauncherReload>(control);
            }
        }

        // Keen's own MySmallMissileLauncher controls (MySmallMissileLauncher.CreateTerminalControls), which the
        // Reload class shares and needs.
        static bool IsKeenLauncherControl(string id)
        {
            return id == "UseConveyor" || id == "TargetingGroup_Selector" || id == "RequireTargetLock";
        }
    }
}
