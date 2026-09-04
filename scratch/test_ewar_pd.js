'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const appSource = fs.readFileSync(path.join(__dirname, '..', 'docs', 'app.js'), 'utf8');
let failures = 0;
function check(n, c) { if (c) console.log('  PASS  ' + n); else { failures++; console.error('  FAIL  ' + n); } }
function makeElement(id) {
  return { id, value: '', checked: false, textContent: '', innerHTML: '', title: '', style: {}, disabled: false, dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {}, removeEventListener() {}, setAttribute() {}, removeAttribute() {}, appendChild() {}, querySelector() { return null; }, querySelectorAll() { return [] } };
}
const elements = new Map();
const sandbox = {
  console, setTimeout, clearTimeout,
  document: { documentElement: { getAttribute() { return null; }, setAttribute() {} }, getElementById(id) { if (!elements.has(id)) elements.set(id, makeElement(id)); return elements.get(id); }, querySelector() { return null; }, querySelectorAll() { return []; }, createElement(t) { return makeElement(t); }, addEventListener() {} },
  window: { addEventListener() {}, matchMedia: null, location: { href: 'file:///t', search: '' }, scrollTo() {} },
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  navigator: { clipboard: { writeText() { return Promise.resolve(); } } }, prompt() { return null; }, alert() {},
  fetch() { return Promise.resolve({ ok: false }); }, URL, URLSearchParams
};
vm.createContext(sandbox);


const testBody = `
(() => {
  const r = {};
  ammosDb.Ballistics_Flak_Shrapnel = { name: 'Ballistics_Flak_Shrapnel', baseDamage: 400, fragment: null, areaOfDamage: { enable: false, endOfLife: { enable: false }, areaEffect: { areaEffect: false } } };
  const flak = {
    name: 'Ballistics_Flak', terminalName: 'Proximity Flak', ammoMagazine: 'MediumCalibreAmmo',
    baseDamage: 1000, damageScales: { shield: 10, lightArmor: -1, heavyArmor: -1, characters: 0.1, healthHitModifier: 10, nonArmor: -1 },
    fragment: { enable: true, ammoRound: 'Ballistics_Flak_Shrapnel', fragments: 30, degrees: 45, reverse: false, dropVelocity: false },
    areaOfDamage: { enable: true, radius: 101, damage: 1, depth: 1, endOfLife: { enable: true, damage: 1, radius: 101, depth: 1 }, areaEffect: { areaEffect: false, damage: 0, radius: 0 } },
    trajectory: { desiredSpeed: 900, maxTrajectory: 2000 }
  };
  const flare = {
    name: 'FlareWC', terminalName: 'Flare', ammoMagazine: 'FlareClip', baseDamage: 1,
    areaOfDamage: { enable: false, radius: 0, damage: 0, depth: 0, endOfLife: { enable: false, damage: 0, radius: 0, depth: 0 }, areaEffect: { areaEffect: false, damage: 0, radius: 0 } },
    ewar: { enable: true, type: 'AntiSmartv2', mode: 'Field', strength: 99, radius: 700, duration: 1000 },
    trajectory: { desiredSpeed: 100, maxTrajectory: 400 }
  };
  const shrap = { name: 'Missiles_Torpedo_Shrapnel', baseDamage: 1, fragment: null, areaOfDamage: { enable: false, endOfLife: { enable: false }, areaEffect: { areaEffect: false } }, ewar: { enable: true, type: 'Offense', mode: 'Effect', strength: 100000, radius: 100, duration: 2400 } };
  ammosDb.Missiles_Torpedo_Shrapnel = shrap;
  const torpedo = { name: 'Missiles_Torpedo', baseDamage: 100, fragment: { enable: true, ammoRound: 'Missiles_Torpedo_Shrapnel', fragments: 1, degrees: 0.1 }, areaOfDamage: { enable: false, endOfLife: { enable: true, damage: 1500000, radius: 25, depth: 25 }, areaEffect: { areaEffect: false } } };

  const dFlak = getAmmoDamageDetailed(flak);
  r.flakTotal = dFlak.total;             // 1000 base + 1 EoL + 30x400 shrapnel
  r.flakEwar = dFlak.ewar;
  const dFlare = getAmmoDamageDetailed(flare);
  r.flareTotal = dFlare.total;
  r.flareEwar = dFlare.ewar;
  const dTorp = getAmmoDamageDetailed(torpedo);
  r.torpTotal = dTorp.total;             // 100 + 1500000, EWAR shrapnel child = 0

  activeAmmo = flak;
  updateTelemetryAmmoBadge();
  r.flakBadge = document.getElementById('telemetryAmmoBadge').innerHTML;
  activeAmmo = flare;
  updateTelemetryAmmoBadge();
  r.flareBadge = document.getElementById('telemetryAmmoBadge').innerHTML;

  activeWeapon = { id: 'L__Flak_Turret', name: '(L) Flak Turret', subtypeId: 'LargeBlockMediumCalibreTurret', pdProjectiles: true, pdSmartOnly: true };
  updateUniversalBanner();
  r.pdOn = document.getElementById('badgePd').style.display;
  activeWeapon = { id: 'S__Gatling_Gun', name: '(S) Gatling Gun', subtypeId: 'SmallGatlingGun' };
  updateUniversalBanner();
  r.pdOff = document.getElementById('badgePd').style.display;

  // TTK guard against EWAR round
  activeAmmo = flare;
  document.getElementById('wBarrelsPerShot').value = '1';
  updateTtkSimulator ? updateTtkSimulator() : null;
  r.ttkText = document.getElementById('outTtkMain').textContent;
  __report(r);
})();
`;
let r = null;
sandbox.__report = (x) => { r = x; };
vm.runInContext(appSource + '\n;\n' + testBody, sandbox, { filename: 'app.js' });

check('Flak PROX total = 13001 (1000 base + 1 EoL + 30x400 shrapnel)', r.flakTotal === 13001);
check('Flak PROX not flagged ewar', r.flakEwar === false);
check('FlareWC EWAR zeroes payload (total 0)', r.flareTotal === 0 && r.flareEwar === true);
check('Torpedo EWAR shrapnel child contributes 0 (total 1500100)', r.torpTotal === 1500100);
check('Flak badge shows Anti-Missile Burst (101m)', r.flakBadge.includes('Anti-Missile Burst (101m)'));
check('Flak badge shows 13,001 Dmg/Shot', r.flakBadge.includes('13,001 Dmg/Shot'));
check('Flare badge shows EWAR Anti-Smart (700m)', r.flareBadge.includes('Anti-Smart (700m)'));
check('Flare badge shows 0 Dmg/Shot', r.flareBadge.includes('0 Dmg/Shot'));
check('PD badge visible for Flak turret', r.pdOn === 'inline-flex');
check('PD badge hidden for fixed gatling gun', r.pdOff === 'none');
check('TTK reports No Block Damage for EWAR round', r.ttkText === 'No Block Damage');

if (failures) { console.error('\n' + failures + ' failed'); process.exit(1); }
console.log('\nAll EWAR/PD functional checks passed.');

