// UPs and Relic status come from GVK_ShipCoreFramework's ShipCoreConfig_Groups.xml (studio/data/shipcore_groups.js),
// matched on the exact block TypeId/SubtypeId.
// Run: node tests/test_shipcore_groups.js
'use strict';
const { parseShipCoreGroups, buildData } = require('../tools/export_shipcore_groups.js');
const SC = require('../studio/data/shipcore_groups.js');
const { loadStudio, makeChecker } = require('./studio_harness.js');
const { check, done } = makeChecker();

// Unit: parser keeps an empty SubtypeId empty and strips MyObjectBuilder_
const xml = `<ArrayOfBlockGroup><BlockGroup><Name>UP Weapons</Name>
  <BlockTypes><TypeId>MyObjectBuilder_LargeGatlingTurret</TypeId><SubtypeId></SubtypeId><CountWeight>3</CountWeight></BlockTypes>
  <BlockTypes><TypeId>ConveyorSorter</TypeId><SubtypeId>X</SubtypeId><CountWeight>8</CountWeight></BlockTypes>
  <!-- <BlockTypes><TypeId>ConveyorSorter</TypeId><SubtypeId>Gone</SubtypeId><CountWeight>9</CountWeight></BlockTypes> -->
</BlockGroup><BlockGroup><Name>H Relic Weapons</Name>
  <BlockTypes><TypeId>ConveyorSorter</TypeId><SubtypeId>X</SubtypeId><CountWeight>1</CountWeight></BlockTypes>
</BlockGroup></ArrayOfBlockGroup>`;
const unit = buildData(parseShipCoreGroups(xml));
check('Parser: empty SubtypeId stays empty, MyObjectBuilder_ stripped, comments skipped',
  JSON.stringify(unit) === JSON.stringify({ upWeapons: { 'LargeGatlingTurret/': 3, 'ConveyorSorter/X': 8 }, relicWeapons: ['ConveyorSorter/X'] }), unit);

check('Data: 56 UP Weapons entries, 13 relic entries (11 unique blocks plus 2 vanilla railgun ids)',
  Object.keys(SC.upWeapons).length === 56 && SC.relicWeapons.length === 13, [Object.keys(SC.upWeapons).length, SC.relicWeapons.length]);
check('Data: source names the ShipCore repo and a commit', SC.source.repo === 'GV-Server-Mods/GVK-ShipCoreFramework' && /^[0-9a-f]{40}$/.test(SC.source.commit), SC.source);

const studio = loadStudio();
const r = studio.run(`(() => {
  const Wp = (sub) => weaponsDb.find((x) => x.subtypeId === sub);
  const pick = (sub) => { const w = Wp(sub); return w ? { ups: w.upCost, listed: w.upListed, relic: w.isRelic, key: shipCoreKey(w) } : null; };
  const out = {};
  for (const s of ['GVK_CycloneCannonTurret', 'odin', 'LargeGatlingTurret', 'ARYXRailgunTurret', 'ARYXMissileBattery', 'LargeRailgun',
    'LargeRailgun_NPC', 'LargeInteriorTurret', 'SmallGatlingGun', 'Missile_Torpedo_Large']) out[s] = pick(s);
  out.relics = weaponsDb.filter((w) => w.isRelic).map((w) => w.subtypeId).sort();
  out.unlisted = weaponsDb.filter((w) => !w.upListed && !isNpcWeapon(w) && !isDetonationWeapon(w) && w.blockTypeId).map((w) => w.subtypeId).sort();
  out.matched = Object.keys(SHIPCORE_GROUPS.upWeapons).filter((k) => weaponsDb.some((w) => shipCoreKey(w) === k)).length;
  // Prototech without UPs: only the two weapons the owner exempted
  out.exempt = [...GVK_UP_EXEMPT].sort();
  out.techNoUps = weaponsDb.filter((w) => !isNpcWeapon(w) && !w.upListed && getTechSummary(w.components).upCost > 0).map((w) => w.subtypeId).sort();
  selectWeapon(Wp('odin').id);
  out.badge = document.getElementById('badgeUps').textContent;
  out.pillar = [document.getElementById('outPillarUps').textContent, document.getElementById('outPillarUpsDetail').textContent];
  out.relicShown = document.getElementById('badgeRelic').style.display;
  selectWeapon(Wp('LargeInteriorTurret').id);
  out.badgeUnlisted = document.getElementById('badgeUps').textContent;
  return out;
})()`);

const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
check('Cyclone 155 8 UPs; Odin 14 UPs and Relic', eq(r.GVK_CycloneCannonTurret, { ups: 8, listed: true, relic: false, key: 'LargeMissileTurret/GVK_CycloneCannonTurret' })
  && r.odin.ups === 14 && r.odin.relic, [r.GVK_CycloneCannonTurret, r.odin]);
check('Empty-SubtypeId vanilla blocks match: Gatling Turret 3, Gatling Gun 1',
  eq(r.LargeGatlingTurret, { ups: 3, listed: true, relic: false, key: 'LargeGatlingTurret/' }) && r.SmallGatlingGun.ups === 1, [r.LargeGatlingTurret, r.SmallGatlingGun]);
check('ARYX Railgun 10, SRBM 14, MAC 12, Torpedo 10: all Relic',
  [r.ARYXRailgunTurret, r.ARYXMissileBattery, r.LargeRailgun, r.Missile_Torpedo_Large].map((x) => x.ups + (x.relic ? 'R' : '')).join() === '10R,14R,12R,10R',
  [r.ARYXRailgunTurret, r.ARYXMissileBattery, r.LargeRailgun, r.Missile_Torpedo_Large]);
check('NPC copies are not listed: NPC MAC 0 UPs, not Relic', eq(r.LargeRailgun_NPC, { ups: 0, listed: false, relic: false, key: 'ConveyorSorter/LargeRailgun_NPC' }), r.LargeRailgun_NPC);
check('All 56 UP Weapons entries match a Studio weapon', r.matched === 56, r.matched);
check('The 11 player Relic Weapons', eq(r.relics, ['ARYXHurricaneCannon', 'ARYXMissileBattery', 'ARYXRailgun', 'ARYXRailgunTurret', 'ARYX_Small_Sidekick_Hangar',
  'LargeRailgun', 'Missile_Torpedo_Large', 'Missile_Torpedo_Small', 'SmallRailgun', 'lokiCannon1', 'odin']), r.relics);
check('Player weapons missing from UP Weapons: Interior Turret, SG reloadable rocket launcher, and the sensors',
  eq(r.unlisted, ['ARYXSmallRadar', 'LargeInteriorTurret', 'Missiles_Rockets_SGReloadableLauncher', 'OKIDesignator',
    'SmallBlockCompactRadioAntennaReskin_WCRadar', 'SmallBlockRadioAntenna_WCRadar']), r.unlisted);
check('Prototech without UPs only on the exempt Interior Turret and SG reloadable launcher', eq(r.techNoUps, r.exempt), [r.techNoUps, r.exempt]);
check('Telemetry badge shows ShipCore UPs and the Relic badge', /UPs: 14/.test(r.badge) && r.relicShown !== 'none', [r.badge, r.relicShown]);
check('UP pillar: Odin 14 UPs, Relic Weapon Slot', /^14/.test(r.pillar[0].trim()) && r.pillar[1] === 'ShipCore · Relic Weapon Slot', r.pillar);
check('Unlisted weapon badge says 0 UPs, not in ShipCore', /UPs: 0/.test(r.badgeUnlisted) && /not in ShipCore/.test(r.badgeUnlisted), r.badgeUnlisted);

done('ShipCore UPs / Relic');
