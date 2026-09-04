# GVK Weapon Studio — Live Source Pipeline: HANDOFF / PROGRESS

Pick-up instructions for any model: read this file fully, then continue at the first unchecked
milestone. This file is the complete working contract; rationale detail lives in chat history.

## Mission
Studio (`docs/` web app, hosted `https://gv-server-mods.github.io/GVK-Weapons-Pack/`) must parse
the mod source LIVE (C# + SBC, in-browser) instead of using hand-typed `docs/data/*` datasets.
Deploy = GitHub Actions workflow staging `docs/` + verbatim source mirror into `data/source/`,
stamping `_manifest.json` (commit SHA), running a zero-dep Node validation gate, deploying via
upload-pages-artifact/deploy-pages. URL stays the same. Local file:// mode = File System Access
"Link Mod Folder" button. Fallback = frozen snapshots (regenerated once via an in-app Export button).

## USER-SIDE PREREQS (user does)
1. Settings → Pages → Source: "GitHub Actions" (replaces branch deploy).
2. Confirm deploy branch = main.

## KEY FACTS (verified)
- Game code is CORRECT. Bug is stale Studio data. Never modify CoreParts/*.cs or Content/Data for this task.
- Hurricane `Ammos=[Ballistics_HeavyCannon]` (480mm); Odin `Ammos=[Ballistics_HeavyCannon_Odin]`
  (getter-clone of base 480mm round; only AmmoRound + MaxTrajectory=4300 differ; magazine stays Ballistics_HeavyCannon).
- app.js prefers `assignedAmmos[0]` over `ammoName` (getSelectableAmmos ~1525, calculateWeaponMetrics ~3185).
- app.js initStudio (~1109): BUNDLED_* globals then fetch data/*_db.json. Replace the load block only.
- CoreParts root: 71 .cs files (largest are *_Animations.cs — SKIP parsing those; only need names as strings).
- Content/Data/CubeBlocks: 22 .sbc. AmmoMagazines_Ship.sbc 16KB, Blueprints.sbc 27KB, PhysicalItems.sbc 9KB.
- docs/ root: app.js (245KB), index.html (120KB), style.css, WEAPON_STUDIO_DESIGN_DOCUMENT.md. No .nojekyll (fine under Actions).
- Repo has no .github/ yet. Node available locally. Branch gvk-weapon-studio, deploys from main.
- Ammo file naming varies: *_Ammos.cs AND *_Ammo.cs (Railgun, LightMissile). Don't glob by exact suffix.

## BUG INVENTORY (auto-fixed by snapshot regen; do NOT hand-patch data files)
- weapons: L__Heavy_Cannon_Hurricane_Turret(+_NPC), L__Heavy_Cannon_Odin_Turret(+_NPC) wrong assignedAmmos
  (155mm pair / Ballistics_Cannon_NPC). Also L__Cannon_Turret_NPC and L__Railgun_Gun_NPC wrong.
- ammos: 17 rounds with phantom ammoMagazine (clone-flatten bug): LargeCalibreAmmoHE, Ballistics_Cannon_NPC,
  AutocannonClip_Drone, NATO_25x184mm_Dual, Ballistics_HeavyCannon_Odin, Lasers_Laser_Light_SG,
  Missiles_Missile_NPC, Missiles_Torpedo_NPC, Firework{Rainbow,Green,Red,Pink,Yellow,Blue}WC,
  Other_Warheads_RegularWarhead_SG_Ammo(+_Particle,+_Fragment).
- Odin ammo wrong fields: mass 1→2000, backKickForce 0→1500000, npcSafe false→true, maxTrajectory 1500→4300.
- NOT bugs: *_Shrapnel/*_Fragment omitted from Flak/Torpedo/SRBM lists (HardPointUsable=false).

## APP CONTRACT (shapes app.js consumes — do not change app.js beyond the load block)
- weaponsDb: array. ammosDb: object keyed by ammo ROUND name. magazinesBlueprintsDb: array.
- weapon: {id,name,grid:"Large"/"Small",type:"Turret"/"Fixed",subtypeId,ammoName,assignedAmmos[](round names!),
  rateOfFire(RPM),barrelsPerShot,reloadTime(ticks),magsToLoad,magazineSize,icon,displayName,description,
  buildTimeSeconds,components,criticalComponent,helpers}
- ammo: {name,ammoMagazine(subtypeId or "Energy"),ammoRound,terminalName,baseDamage,baseDamageCutoff,mass,
  backKickForce,health,hardPointUsable,npcSafe,hybridRound,energyCost,energyMagazineSize,shape,objectsHit,
  fragment,areaOfDamage,trajectory{desiredSpeed,maxTrajectory,maxLifeTime,guidance},damageScales,audio,graphics}
- magazine: {subtypeId,blueprintSubtype,displayName,category,icon,localIcon,capacity,volume,mass,
  productionTime,roleMultiplier,defaultRUs,prerequisites[{amount,typeId:"Ingot",subtypeId}]}
- icons: icons/ammo_<magazineSubtype>.png; getShotsPerMag matches ammoMagazine→magazine.subtypeId.
## C# PATTERNS PARSER MUST HANDLE (verified against source)
1. `private AmmoDef X => new AmmoDef { ... };` — top-level defs always declare ownerType == defType (use as filter).
2. GETTER-CLONE: `private AmmoDef X { get { var m = Base; m.AmmoRound="X"; m.Trajectory.MaxTrajectory=4300f; return m; } }`
   → deep-copy base def + apply dotted/indexed path assignments. Weapons use the same pattern.
3. Helper refs are BARE identifiers: Ui/Ai/Other/Custom/Customs/Animations/Upgrades (Common_* defs),
   Ammos arrays (ammo def names), Fragment.Ammo arrays. Resolve rule: if defs[name] exists → helper/ref;
   else it's an enum literal — keep as plain string (this is why skipping *_Animations.cs is safe).
4. Common defs: `private CustomScalesDef Common_X = new CustomScalesDef {...};` (assignment form).
5. Random(start:0,end:20), Vector(x:..,y:..,z:..), Color(red:..) → {__call,args} — map in M2.
6. Weapon shape: Assignments.MountPoints[] (SubtypeId = block subtype; player+NPC are 2 MountPointDefs in ONE
   WeaponDefinition — app wants separate entries per subtypeId, expand in M2), HardPoint.PartName = terminal name,
   HardPoint.Loading {RateOfFire(RPM), BarrelsPerShot, ReloadTime(ticks), MagsToLoad}, Ammos = new[]{ ref }.
7. Parse *_Weapons.cs, *_Ammo(s).cs, _Common_*.cs, _MasterConfig.cs, Armor_Blocks.cs; SKIP *_Animations*.cs.

## DELIVERABLES
D1 docs/source_pipeline.js (parser, zero deps, isomorphic browser+Node). D2 app.js/index.html wiring:
load chain + status chip (🟢 LIVE @ <sha> / 🔴 SNAPSHOT) + red error banner + "⬇ Export snapshots" dev
button (the regen mechanism — browser has DOMParser so regen needs no Node tooling). D3 one-time snapshot
regen via Export → commit (lands the Hurricane/Odin + phantom-magazine fixes). D4 docs/data/studio_overrides.js
(category labels, localIcon mappings, roleMultiplier, defaultRUs only). D5 .github/workflows/deploy-studio.yml +
tools/validate_studio_data.mjs (Node gate reusing D1's C# parser). D6 cleanup: delete docs/data/Scripts/
(15 stale symlink-copy files), delete orphan docs/data SBCs (Cubeblocks, Particles, TransparentMaterials,
BlockCategories, BlueprintClasses, Weapons .sbc), fix stale app.js:224 comment (Weapon75 refs), update
WEAPON_STUDIO_DESIGN_DOCUMENT.md. D7 scratch/test_source_pipeline.js harness; keep scratch/test_studio_smoke.js green.

## WORKFLOW YAML (D5) — UPDATED for manifest file lists + handheld mags
on: push branches [main] + workflow_dispatch. permissions: contents:read, pages:write, id-token:write.
concurrency: group pages, cancel-in-progress. Steps:
1. checkout@v4; setup-node@v4 (node 20); gate: node tools/validate_studio_data.mjs (reuses source_pipeline.js;
   asserts zero errors, zero phantom magazines, zero unresolved Ammos refs; exit 1 on any).
2. Stage _site: cp -r docs/. _site/; mkdir -p _site/data/source/{CoreParts,Data/CubeBlocks};
   cp CoreParts/*.cs → _site/data/source/CoreParts/; CoreParts/script/Structure.cs → _site/data/source/CoreParts_script/;
   cp Content/Data/AmmoMagazines_Ship.sbc + AmmoMagazines_Handheld.sbc + Blueprints.sbc + PhysicalItems.sbc
   → _site/data/source/Data/; cp Content/Data/CubeBlocks/*.sbc → _site/data/source/Data/CubeBlocks/.
3. Manifest (source_live.js REQUIRES coreParts + cubeBlocks arrays):
   CS=$(cd CoreParts && ls *.cs | sed 's/^/"/;s/$/"/' | paste -sd, -)
   CB=$(cd Content/Data/CubeBlocks && ls *.sbc | sed 's/^/"/;s/$/"/' | paste -sd, -)
   printf '{"commit":"%s","ref":"%s","coreParts":[%s],"cubeBlocks":[%s]}\n' "$GITHUB_SHA" "$GITHUB_REF_NAME" "$CS" "$CB" \
     > _site/data/source/_manifest.json
4. upload-pages-artifact@v3 (path _site); deploy-pages@v4. Artifact ~6MB. First deploy auto-runs on main.
Note: studio_overrides.js is a <script> in docs/data/ — it ships with the app, no staging needed.
PhysicalItems.sbc staged for future use (ingot masses); pipeline ignores it today.

## MILESTONES — ALL COMPLETE

- [x] M1: Parser core (docs/source_pipeline.js C# extractor w/ clone-getter eval).
      node scratch/test_source_pipeline.js ALL PASS: 55 files, 192 defs, 61 ammo, 67 weapons.
- [x] M2: SBC parsers + full data build. Built: 132 weapons, 61 ammos, 31 mags, 123 blocks; zero errors.
- [x] M3: app.js wiring + Export button (docs/source_live.js). initStudio → GVKLiveSource.init() → refreshAfterDataLoad().
- [x] M4: Snapshots regenerated + committed (scratch/export_snapshots.js). Fixes Hurricane/Odin + 17 phantom magazines.
      The Studio's in-browser Export button can also regenerate them post-deploy.
- [x] M5: Workflow (.github/workflows/deploy-studio.yml) + gate (tools/validate_studio_data.mjs).
      Pages source flipped to GitHub Actions by user. Site confirmed LIVE with green chip.
- [x] M6 cleanup: deleted docs/data/Scripts/ + 6 orphan SBCs; fixed stale app.js:224 comment.
- [x] M6b: WEAPON_STUDIO_DESIGN_DOCUMENT.md Data Pipeline section added (section 7).
- [x] M6c: severity-aware chip (green/yellow/red) + auto-dismiss error banner (10s timer + close button).

## BUGS FOUND + FIXED DURING BUILD
1. **IIFE export missing browser path**: window.SourcePipeline was undefined in browser (only module.exports for Node).
   Fix: `else root.SourcePipeline = SourcePipeline;` in source_pipeline.js. Manifested as silent fallback to
   Bundled Snapshot on the live site. Node tests passed because they used module.exports — browser path was untested.
2. **Animation files**: *_Animations.cs use C# generics/#region the parser can't handle. Fix: skip them in parseAll.
3. **git push origin main silently dropped**: reported "Everything up-to-date" when local was ahead. Workaround:
   `git push origin <sha>:main` or `git push origin HEAD:main`.
4. **onReapply never called in hosted mode (ec4a735)**: initHosted() parsed live data but never called opts.onReapply(),
   so the app kept using JSON-fetched bundled data → green chip but DPS=0 and missing icons. User spotted that
   the data was a hybrid (some live, some bundled) which is a credibility trap.
   Fix: added validateLiveData() — checks all four legs (weapons/ammos/magazines/blocks) and that every
   assignedAmmos resolves in ammosDb BEFORE pushing any data to the app. On failure, fall back to bundled
   with a red banner. validateLiveData lives in source_pipeline.js and is exported for CI reuse.
   Added 7 atomic-swap tests (rejects null/empty/unresolved).

## M2 DECISIONS (locked — do not regress)
- ammosDb keyed by C# DEF NAME (unique). AmmoRound is a terminal display name and is NOT unique
  (e.g. def Missiles_Missile has AmmoRound "Griffin HE"); assignedAmmos entries = def names.
- sbc.magazines accepts an ARRAY of SBC texts: ship + handheld (handheld needed for pistol/rifle mags —
  workflow staging MUST include AmmoMagazines_Handheld.sbc).
- parseXml strips comments — commented-out defs are correctly excluded. Dead defs Missiles_Missile_NPC /
  Missiles_Torpedo_NPC exist ONLY as /* */ blocks (Missiles_LightMissile_Ammo.cs:219, Missiles_Torpedo_Ammos.cs:352);
  old bundled data wrongly catalogued them. Test has a documented `deadInSource` exception list.
- The 36 "mismatches vs bundled" are ALL corrected bugs: phantom magazines → real inherited magazine;
  clone-flattened mass/recoil/npcSafe/range → true inherited values; built is correct, bundled was corrupt.
- USER ALREADY FLIPPED Pages source to GitHub Actions (prereq 1 done).

## M3 NOTES
- app.js initStudio (~line 1109) load block: after bundled globals + db fetches, insert pipeline attempt:
  hosted → fetch 'data/source/_manifest.json' + needed source files (fetch list = same files the workflow
  stages) → buildStudioData → replace weaponsDb/ammosDb/MAGAZINES_BLUEPRINTS_DATA + status chip LIVE @ sha.
  file:// → File System Access folder link → same build from disk. Failure → keep bundled + red banner.
- Export button: serialize built data to weapons_data.js/weapons_db.json/ammos_data.js/ammos_db.json/
  magazines_blueprints_data.js shapes (GENERATED headers) and trigger downloads — this is the M4 regen tool.
- IndexDB caching of fetched sources keyed by commit SHA; refetch only when manifest SHA changes.

## ACCEPTANCE
1. Push→main deploys; 2. chip shows LIVE @ sha; 3. Hurricane/Odin resolve 480mm (cap 1, mass 2000kg, Odin 4300m);
4. zero phantom magazines live+snapshot; 5. gate blocks bad refs; 6. balance change→push→live, zero tool edits;
7. smoke test green; file:// mode works.
