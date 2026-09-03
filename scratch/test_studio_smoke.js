// Headless smoke test: loads docs/app.js with a stubbed DOM and asserts the
// WC C# exporters run clean with zero shield output (GVK is a shieldless server).
// Run: node scratch/test_studio_smoke.js
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const appSource = fs.readFileSync(path.join(root, 'docs', 'app.js'), 'utf8');
const htmlSource = fs.readFileSync(path.join(root, 'docs', 'index.html'), 'utf8');

let failures = 0;
function check(name, cond) {
  if (cond) console.log('  PASS  ' + name);
  else { failures++; console.error('  FAIL  ' + name); }
}

function makeElement(id) {
  return {
    id, value: '', checked: false, textContent: '', innerHTML: '', title: '',
    style: {}, disabled: false, dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {}, removeEventListener() {},
    setAttribute() {}, removeAttribute() {},
    appendChild() {}, querySelector() { return null; }, querySelectorAll() { return []; }
  };
}

const elements = new Map();
const documentStub = {
  documentElement: { getAttribute() { return null; }, setAttribute() {} },
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  createElement(tag) { return makeElement(tag); },
  addEventListener() {}
};

const windowStub = {
  addEventListener() {},
  matchMedia: null,
  location: { href: 'file:///smoke-test', search: '' },
  scrollTo() {}
};

const sandbox = {
  console, setTimeout, clearTimeout,
  document: documentStub,
  window: windowStub,
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  navigator: { clipboard: { writeText() { return Promise.resolve(); } } },
  prompt() { return null; },
  alert() {},
  fetch() { return Promise.resolve({ ok: false }); },
  URL, URLSearchParams
};
vm.createContext(sandbox);

// Static checks on tool sources (bundled data intentionally keeps WC shield fields)
check('docs/app.js has no shield code paths',
  !/dsShield|ShieldHitDraw|ShieldHitSound|HitPlayShield|DamageToShields|damageToShields|shieldHitDraw|shieldHitSound|hitPlayShield/.test(appSource));
check('docs/index.html has no shield UI', !/shield/i.test(htmlSource));

// Dynamic checks: exercise the exporters inside app.js's shared script scope
const testBody = `
(() => {
  activeAmmo = {
    name: 'LargeCalibreAmmo', ammoRound: 'LargeCalibreAmmo',
    ammoMagazine: 'LargeCalibreAmmo', terminalName: '155 AP',
    baseDamage: 6000, mass: 300,
    damageScales: { lightArmor: 0.5, heavyArmor: 3.0, characters: 0.25, nonArmor: 1.0 },
    fragment: null,
    areaOfDamage: { enable: false, endOfLife: { enable: false }, areaEffect: { areaEffect: false } },
    trajectory: { desiredSpeed: 600, maxTrajectory: 2400 }
  };
  activeWeapon = {
    id: 'SmokeTest', name: 'Smoke Test', subtypeId: 'SmokeTest', partName: 'Smoke Test',
    type: 'Fixed', gridSize: 'Large', assignedAmmos: ['LargeCalibreAmmo'],
    extendedTags: {}, components: []
  };
  document.getElementById('aAmmoRound').value = 'LargeCalibreAmmo';
  document.getElementById('aAmmoMagazine').value = 'LargeCalibreAmmo';
  document.getElementById('aTerminalName').value = '155 AP';
  document.getElementById('aBaseDamage').value = '6000';
  document.getElementById('aShape').value = 'LineShape';
  document.getElementById('tGuidance').value = 'None';
  document.getElementById('dsLightArmor').value = '0.5';
  document.getElementById('dsHeavyArmor').value = '3.0';
  document.getElementById('dsNonArmor').value = '1.0';
  document.getElementById('dsDamageType').value = 'BaseDamage';
  document.getElementById('wSubtypeId').value = 'SmokeTest';
  document.getElementById('wPartName').value = 'Smoke Test';
  document.getElementById('wMuzzles').value = 'muzzle_1';

  const ammoCs = generateCSharpAmmo();
  const weaponCs = generateCSharpWeapon();
  const sbcXml = generateSbcCubeBlocks();
  const dmg = getAmmoDamageDetailed(activeAmmo);
  const blend155 = getBlendMultiplier(activeAmmo.damageScales);

  // Overmatch scenario: Heavy Railgun (1M base, 20k/block cap)
  activeAmmo = {
    name: 'HeavyRailgunAmmo', ammoRound: 'HeavyRailgunAmmo',
    ammoMagazine: 'Energy', terminalName: 'Heavy Railgun',
    baseDamage: 1000000, baseDamageCutoff: 20000, mass: 4000,
    damageScales: { lightArmor: 0.5, heavyArmor: 3.0, characters: 0.25, nonArmor: 1.0 },
    fragment: null,
    areaOfDamage: { enable: false, endOfLife: { enable: false }, areaEffect: { areaEffect: false } },
    trajectory: { desiredSpeed: 400, maxTrajectory: 1000 }
  };
  const rgDmg = getAmmoDamageDetailed(activeAmmo);
  const rgAmmoCs = generateCSharpAmmo();

  __report({
    ammoCsLength: ammoCs.length,
    ammoCsShieldFree: !/shield/i.test(ammoCs),
    ammoCsHasDamageScales: ammoCs.includes('DamageScales'),
    ammoCsHeavy: ammoCs.includes('Heavy = 3'),
    weaponCsShieldFree: !/shield/i.test(weaponCs),
    sbcXmlShieldFree: !/shield/i.test(sbcXml),
    dmgTotal: dmg.total,
    dmgBase: dmg.base,
    blend155: blend155,
    rgPerBlock: rgDmg.perBlockBase,
    rgPenBlocks: rgDmg.penBlocks,
    rgShieldFree: !/shield/i.test(rgAmmoCs)
  });
})();
`;

let report = null;
sandbox.__report = (r) => { report = r; };

vm.runInContext(appSource + '\n;\n' + testBody, sandbox, { filename: 'app.js' });

check('WC AmmoDef exporter runs without throwing (no phantom dsShield reference)', report !== null && report.ammoCsLength > 100);
check('AmmoDef export contains DamageScales block', report.ammoCsHasDamageScales);
check('AmmoDef export emits Heavy armor scale', report.ammoCsHeavy);
check('AmmoDef export emits zero shield tags', report.ammoCsShieldFree);
check('WeaponDef export emits zero shield tags', report.weaponCsShieldFree);
check('SBC export emits zero shield tags', report.sbcXmlShieldFree);
check('recursive damage total resolves (6000 base)', report.dmgTotal === 6000);
check('blend multiplier for 155 AP mix (3.0/0.5/1.0) = 1.5', report.blend155 === 1.5);
check('Heavy Railgun per-block cap = 20000 hp', report.rgPerBlock === 20000);
check('Heavy Railgun penetration capacity = 50 blocks', report.rgPenBlocks === 50);
check('Railgun export emits zero shield tags', report.rgShieldFree);

if (failures > 0) {
  console.error('\n' + failures + ' check(s) failed.');
  process.exit(1);
}
console.log('\nAll smoke checks passed. Studio is shieldless and exporters are healthy.');