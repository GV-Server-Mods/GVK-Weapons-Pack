// Quick test for Max Range card logic
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = 'c:/Users/blayl/OneDrive/Documents/Space Engineers/MDK2 Mods/GVK_Weapons';
const appSource = fs.readFileSync(path.join(root, 'docs', 'app.js'), 'utf8');

function makeElement(id, value = '') {
  return {
    id, value, checked: false, textContent: '', innerHTML: '', title: '',
    style: {}, disabled: false, dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {}, removeEventListener() {},
    setAttribute() {}, removeAttribute() {},
    appendChild() {}, querySelector() { return null; }, querySelectorAll() { return []; },
    getContext() { return { beginPath() {}, moveTo() {}, lineTo() {}, closePath() {}, fill() {}, stroke() {}, fillText() {}, measureText() { return { width: 0 }; }, clearRect() {} }; }
  };
}

const elements = new Map();
const documentStub = {
  documentElement: { getAttribute() { return null; }, setAttribute() {} },
  getElementById(id) {
    if (!elements.has(id)) {
      const defaults = {
        wMaxTargetDistance: '1600', tMaxTrajectory: '1500', tDesiredSpeed: '1000',
        wRotateRate: '0.015', wElevateRate: '0.015', wDurabilityMod: '0.5',
        wIdlePower: '0.01', aEnergyCost: '0', aBaseDamage: '0',
        wTrajectilesPerBarrel: '1', wHeatPerShot: '0', wMaxHeat: '0',
        wHeatSinkRate: '0', wCooldown: '0.5', wRateOfFire: '600',
        wBarrelsPerShot: '1', wReloadTime: '0', wMagsToLoad: '1',
        wInventorySize: '0.9'
      };
      elements.set(id, makeElement(id, defaults[id] || ''));
    }
    return elements.get(id);
  },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  createElement(tag) { return makeElement(tag); },
  addEventListener() {}
};

const sandbox = {
  console, setTimeout, clearTimeout,
  document: documentStub,
  window: { addEventListener() {}, matchMedia: null, location: { href: 'file:///test', search: '' }, scrollTo() {} },
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  navigator: { clipboard: { writeText() { return Promise.resolve(); } } },
  prompt() { return null; }, alert() {},
  fetch() { return Promise.resolve({ ok: false }); },
  URL, URLSearchParams
};
vm.createContext(sandbox);

const report = {};
sandbox.__report = (k, v) => { report[k] = v; };

const testBody = `
(() => {
  weaponsDb = [{ id: 'TurretTest', name: 'Turret Test', subtypeId: 'TurretTest', type: 'Turret', maxTargetDistance: 2000, assignedAmmos: ['AmmoA'], rotateRate: 0.015, elevateRate: 0.015, durabilityMod: 0.5, effectiveIntegrity: 150000, components: [] }];
  ammosDb = { AmmoA: { name: 'AmmoA', ammoRound: 'AmmoA', ammoMagazine: 'AmmoA', terminalName: 'Ammo A', baseDamage: 100, mass: 1, damageScales: {}, fragment: null, areaOfDamage: { enable: false, endOfLife: { enable: false }, areaEffect: { areaEffect: false } }, trajectory: { desiredSpeed: 500, maxTrajectory: 3000 } } };
  componentsDb = {};

  selectWeapon('TurretTest');
  __report('turretRange', document.getElementById('outMaxRange').innerHTML);
  __report('turretSource', document.getElementById('outMaxRangeSource').textContent);

  weaponsDb[0].type = 'Fixed';
  selectWeapon('TurretTest');
  __report('fixedRange', document.getElementById('outMaxRange').innerHTML);
  __report('fixedSource', document.getElementById('outMaxRangeSource').textContent);
})();
`;

vm.runInContext(appSource + '\n;\n' + testBody, sandbox, { filename: 'app.js' });

console.log('Turret card innerHTML:', report.turretRange);
console.log('Turret source:', report.turretSource);
console.log('Fixed card innerHTML:', report.fixedRange);
console.log('Fixed source:', report.fixedSource);

const ok = report.turretRange && report.turretRange.includes('2,000') &&
           report.turretSource === 'Targeting Range' &&
           report.fixedRange && report.fixedRange.includes('3,000') &&
           report.fixedSource === 'Trajectory Range';

if (!ok) {
  console.error('Max Range card logic test FAILED');
  process.exit(1);
}
console.log('Max Range card logic test PASSED');
