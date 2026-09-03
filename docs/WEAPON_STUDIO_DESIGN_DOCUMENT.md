# GVK Weapon Studio — Architecture & Technical Design Document

> **Status**: Active Reference Document  
> **Repository**: `GV-Server-Mods/GVK-Weapons-Pack`  
> **Directory**: `docs/`  
> **Primary Maintainer**: GVK Modding & Systems Engineering Pair Programming  
> **Live Tool**: Open [`docs/index.html`](file:///C:/Users/blayl/OneDrive/Documents/Space%20Engineers/MDK2%20Mods/GVK_Weapons/docs/index.html) or run `run_studio.bat`

---

## 1. Mission & Architectural Philosophy

The **GVK Weapon Studio** is an offline-capable, zero-dependency browser-based engineering station and combat telemetry suite for the *GV: Deserts of Kharak* Space Engineers server. It bridges the gap between raw WeaponCore C# scripts (`CoreParts/`), Keen XML definitions (`CubeBlocks_*.sbc`, `Blueprints.sbc`), and live gameplay balance.

### Core Architectural Tenets
1. **Zero External Framework Bloat**:
   - Built entirely in native modern HTML5, CSS3 (using CSS custom properties / design tokens), and vanilla ES6+ JavaScript.
   - Zero `npm`, Node.js, or webpack build pipelines required. Runs identically whether launched via a local `file:///` URI or hosted via GitHub Pages / HTTP static server.
2. **Dual Audience UX**:
   - **Combat Telemetry (Workspace 1)**: Player-facing tactical station. Instant readouts, 1v1 radar comparisons, time-to-kill against armor/modules, and drifting rover lead calculations.
   - **Definition Workbench (Workspace 2)**: Deep modder station. Form-based editing of all WeaponCore C# struct tags, SBC component layers, dynamic schema inspector, and anti-bloat C# exporter.
   - **Ammo Logistics (Workspace 3)**: Fleet logistics and economy station. Automated damage/physical densities, cargo container fleet endurance, and authentic multi-metal blueprint generation.
3. **Engine-Accurate Ground Truth**:
   - Weapon, ammo, animation, and blueprint datasets are extracted directly from the mod's official source files (`CoreParts/`, `CubeBlocks_Weapons.sbc`, `Blueprints.sbc`, `AmmoMagazines_Ship.sbc`).
   - Calculations rigorously match Space Engineers / WeaponCore engine mechanics (60-tick combat cycles, recursive fragment/AoE damage, burst/reload cycles, and conveyor volume constraints).

---

## 2. Directory & Data Structure

```
GVK_Weapons/
├── docs/
│   ├── index.html                           # Single-page application shell & layout
│   ├── style.css                            # Complete styling, design tokens & light/dark theme engine
│   ├── app.js                               # Core controller, calculation engine & event handlers
│   ├── WEAPON_STUDIO_DESIGN_DOCUMENT.md     # This design document
│   ├── data/
│   │   ├── wc_schema.js                     # WeaponCore v0.75 structure & enum fingerprint
│   │   ├── weapons_data.js                  # 96 mod weapons bundled dataset
│   │   ├── ammos_data.js                    # 63 WeaponCore ammo rounds bundled dataset
│   │   ├── magazines_blueprints_data.js     # 19 official ammo magazines & authentic ingot blueprints
│   │   ├── animations_data.js               # 18 subpart animation definitions
│   │   ├── components_data.js               # Valid SE component definitions (ores filtered out)
│   │   ├── weapons_db.json                  # Standalone JSON database mirror
│   │   ├── ammos_db.json                    # Standalone JSON database mirror
│   │   └── components_db.json               # Standalone JSON database mirror
│   └── icons/                               # High-res weapon & ammo DDS-converted PNG icons
└── run_studio.bat                           # 1-click launcher for Windows pair programming
```

---

## 3. The Three Workspaces

### Workspace 1: ⚔️ Combat Telemetry & Benchmarks (`#ws-telemetry`)
*Default landing view for all users.*

```mermaid
graph TD
    WS1[Combat Telemetry] --> Banner[Universal Weapon Banner]
    WS1 --> MunitionBar[Loaded Munition Selector Bar]
    WS1 --> HeroStats[Combat Cycle, DPS, Alpha & Trajectory Lead]
    WS1 --> Radar[1v1 Tactical Spider Radar]
    WS1 --> TTK[Realistic Target Dummy TTK]
    WS1 --> DriftMeter[Initial D Flight Delay & Lead Meter]
```

#### 1. Universal Weapon Banner & Badges
- **Active Weapon Icon & Dropdown**: Large weapon icon with orange border (`#d97706`). Dropdown separated into *Player Standard Armaments* and *⚔️ NPC / Relic / Enemy Armaments*.
- **Dynamic GVK Status Badges**:
  - `[ ⚡ X UPs ]`: Utility Points dynamically calculated from total Prototech component count (excluding Data Cores). Matches server Spec Core balancing.
  - `[ 👑 Relic Weapon ]` vs `[ ⚙️ Standard Production ]`: Automatically derived from blueprint ingredients (`GVK_RUs` or non-craftable scavenged items).
  - `[ 🔬 Circuitry: 1 (>2km) ]`: GVK rule gate ensuring any weapon engaging beyond $2\text{km}$ mandates `PrototechCircuitry`.
  - `[ 🛡️ Large Grid ]` / `[ 🏎️ Small Grid ]`.
  - `[ ⚔️ NPC Variant ]`: Flags non-player enemy armaments (e.g. Harbinger Cruiser, Gaalsien Raiders).

#### 2. Loaded Munition Selector Bar (`.telemetry-ammo-bar`)
- Positioned directly beneath the active weapon banner and **permanently visible across all weapons** (single-ammo and multi-ammo alike).
- Features matching orange border (`#d97706`), ammo magazine icon, and munition selector for dual-load weapons (e.g. High Explosive vs Armor Piercing).
- Live badges displaying active ammo SubtypeId, Base Damage, Muzzle Speed, and Max Range.

#### 3. Recursive Damage Engine
Calculates true damage potential through multi-stage fragment trees:
$$\text{Total Damage} = \text{BaseDamage} + \text{AreaOfDamage} + \sum_{\text{frags}} (\text{Count} \times \text{Damage}_{\text{child}})$$
- **Area of Damage (AoE)**: Evaluates both `ByBlockHit` (impact explosion) and `EndOfLife` (flak proximity burst). Excludes non-damaging EWAR effects.
- **Fragment Spawns**: Recursively resolves nested rounds up to depth 3, accounting for timed spawns (`maxSpawns \times groupSize`) and radial spreads (e.g. Flak shrapnel, MIRV torpedo submunitions).
- **Alpha Volley**:
  $$\text{Alpha} = \text{Total Single-Round Damage} \times \text{BarrelsPerShot}$$
- **True Sustained DPS & RPS**:
  $$\text{FireTime} = \frac{\text{TotalRounds}}{\text{RateOfFire}} \times 60, \quad \text{CycleSec} = \text{FireTime} + \frac{\text{ReloadTimeTicks}}{60}$$
  $$\text{RPS} = \frac{\text{TotalRounds}}{\text{CycleSec}}, \quad \text{Sustained DPS} = \text{RPS} \times \text{Total Single-Round Damage}$$

#### 4. Effective Fire Rate & Combat Cycle
Replaces static heat bars with operational sustainability metrics:
- **Duty Cycle Percentage**: Real-time ratio of firing uptime vs reload downtime.
- **Consumption Rate**:
  - **Physical Munitions**: Computes exact magazine burn rate ($\text{mags/min}$).
  - **Energy Weapons**: For energy-draining systems, derives Uranium consumption ($\text{kg/min}$ based on $1\text{ MWh} = 1\text{ kg Uranium}$).

#### 5. Hexagonal Tactical Radar (`#radarCanvas`)
- Plots 6 normalized tactical axes dynamically scaled across the dataset:
  1. **DPS** (Sustained Damage Per Second)
  2. **Volley Alpha** (Single-shot burst payload)
  3. **Targeting Range** (Weapon's actual engagement range from `MaxTargetDistance`, **not** raw ammo flight trajectory)
  4. **Muzzle Velocity** (Projectile flight speed)
  5. **Tracking Rate** (Azimuth & Elevation traverse agility in deg/s)
  6. **Block Integrity** (Cube block durability)
- **1v1 Benchmark Comparison**:
  - Active weapon in **Amber/Orange** (`#f59e0b`).
  - Benchmark weapon in **Cyan/Blue** (`#38bdf8`).
  - Outliers (such as the 200mm MAC and SRBM) scale naturally without clipping or special case filtering.
  - Side-by-side comparison card displaying active weapon name & description above benchmark weapon name & description.

#### 6. Tactical Tools
- **Initial D Flight Delay & Drift Lead**: Projects target intercept flight time at $500\text{m}$, $1000\text{m}$, and $\text{Max Range}$, and calculates dune drift lead at $100\text{ km/h}$ ($27.8\text{ m/s}$).
- **Target Dummy Time-to-Kill (TTK)**: Real-time simulation against Light Armor ($3\text{k HP}$), Heavy Armor ($16.5\text{k HP}$), Battery ($11.4\text{k HP}$), and Refinery ($37.3\text{k HP}$).
- **🔗 Share Permalinks**: Encodes configuration state (`?gun=...&ammo=...&vs=...`) for instant Discord sharing.

---

### Workspace 2: 🔧 Definition Workbench (`#ws-workbench`)
*Deep modder configuration mirroring WeaponCore C# structures and Keen SBCs.*

```mermaid
graph TD
    WS2[Definition Workbench] --> ScopeA[Scope A: WeaponDefinition]
    WS2 --> ScopeB[Scope B: AmmoDef]
    WS2 --> ScopeC[Scope C: CubeBlocks SBC]
    WS2 --> SchemaGuard[WC Schema Guard & Dynamic Tags]
    WS2 --> Linter[Live Clang Hazard Linter]
    WS2 --> Exporter[Anti-Bloat Exporter]
```

#### 1. Scope A: `WeaponDefinition` Editor
Form controls categorized strictly matching the C# struct layout:
- `ModelAssignmentsDef` (Subtypes, dummy muzzles, elevation/azimuth subparts)
- `HardwareDef` (Elevation/Azimuth traverse rates, limits, idle power, offset)
- `LoadingDef` (RoF, barrels, reload ticks, burst delays, magazines to load)
- `HardPointDef` (Accuracy deviation, aiming tolerance, prediction, water fire)
- `TargetingDef` (Min/Max ranges, top targets/blocks, threat flags, subsystem targeting)
- `AiDef` & `UiDef` (Slave control, terminal sliders, guide toggles)
- `HardPointAudioDef` (Firing, reload, rotation, travel SFX)
- `OtherDef` (Part caps, energy priority, LOS checks)
- Multi-ammo assignments and 18 subpart animation controllers.

#### 2. Scope B: `AmmoDef` Editor
Full canonical WeaponCore round engineering:
- Header & Core (Base damage, cutoff, mass, health, kick force)
- `TrajectoryDef` & `SmartsDef` (Speed, acceleration, lifetime, pro-nav guidance, scan rates)
- `DamageScaleDef` (Armor multipliers, shield damage, grid scaling)
- `AreaOfDamageDef` (Impact `ByBlockHit` & Proximity `EndOfLife` explosive radii)
- `FragmentDef` (Child ammo round triggers, spawn counts, radial dispersion)
- `PatternDef`, `EwarDef`, `GraphicDef` (Tracers & ribbon trails), and `AmmoAudioDef`.

#### 3. Scope C: `CubeBlocks SBC` Editor & Standardizer
- **Enforced Vanilla AI Targeting Suppression**: Automatically enforces `<AiEnabled>false</AiEnabled>` to eliminate vanilla Keen turret lag loops.
- **Component Layers Recipe Editor**:
  - Filtered strictly to valid construction components (all raw ores and ingots suppressed except `GVK_CUs`).
  - Allows adjusting quantities, reordering layers, adding components, and deleting layers.
  - **Dynamic Build Time Calculation**:
    $$\text{BuildTime} = \max\left(5, \operatorname{round}\left(\frac{\text{WeaponIntegrity}}{\text{BuildTime\_Dividend}}\right)\right) \quad (\text{Default Dividend} = 750)$$
  - **Auto-Derived Prototech Tech Requirements**:
    Scans layers for Prototech items (`Machinery`, `Frame`, `Circuitry`, `Capacitor`, `Propulsion`), derives total UPs, and automatically verifies $>2\text{km}$ Circuitry rules.
- **Embedded Real-Time SBC Exporter**:
  - Displays formatted `<Definition xsi:type="MyObjectBuilder_WeaponBlockDefinition">` XML with syntax highlighting.
  - `📋 Copy SBC XML` and `💾 Download .sbc` buttons for immediate in-game testing.

#### 4. WeaponCore Schema Guard & Dynamic Tag Inspector
- Tracks `CoreParts/script/Structure.cs` fingerprint. If WeaponCore updates and introduces new structs or tags, the dynamic tag inspector auto-renders typed UI controls and losslessly serializes them into C#.
- **Lean Anti-Bloat Exporter**: Suppresses all default, zeroed, or inactive tags (e.g. disabled fragment blocks, zeroed offsets, unused audio), emitting clean C# code compliant with GVK anti-bloat rules.

---

### Workspace 3: 📦 Ammo Logistics & Blueprints (`#ws-logistics`)
*Automated magazine mathematics, fleet logistics, and authentic manufacturing recipes.*

```mermaid
graph TD
    WS3[Ammo Logistics] --> IsolatedView[Universal Weapon Banner Hidden]
    WS3 --> MagSelector[Dedicated Logistics Magazine Selector]
    WS3 --> Levers[Rebalancing Levers: Densities & Role Mults]
    WS3 --> DerivedFootprint[Derived Physical Footprint & Buffer]
    WS3 --> FleetEndurance[Cargo Packing & Fleet Endurance]
    WS3 --> VisualChips[Visual Material Breakdown Chips]
    WS3 --> BlueprintXml[Authentic Multi-Metal Blueprints.sbc Generator]
```

#### 1. Workspace Isolation
- When switching to `#ws-logistics`, the universal weapon banner is automatically hidden to eliminate clutter and allow standalone magazine analysis.
- Returning to Combat Telemetry or the Workbench immediately restores the banner.

#### 2. Dedicated Magazine Selector Bar (`.logistics-ammo-bar`)
- Positioned at the top of Workspace 3 with an ammo icon, quick reset button, and live badges:
  - SubtypeId, Round Capacity, Volume (L), Mass (kg), and Base Craft Time (s).
- Categorized dropdown organizing all 19 official GVK magazines:
  - **Ship Standard Kinetics** (25mm NATO, Dual 25mm, 35mm Bushmaster, 40mm Bofors, 75mm Heavy Autocannon)
  - **Heavy Caliber & Flak** (155mm Flak, 480mm Heavy Cannon)
  - **High-Tech & Strategic** (50mm Railgun, 200mm MAC, Plasma)
  - **Missiles, Rockets & Torpedoes** (Griffin, Hydra, Tuukka, Crusader Torpedo, Longsword SRBM, Falcon Drone)
  - **Countermeasures & Anti-Missile** (Flare Chaff Decoy)
  - **Small Arms / Handheld** (NATO 5.56, Automatic Rifle, Precision Rifle)

#### 3. Rebalancing Levers (Ammo Maths)
- **Target Damage Density**: Row 16 formula ($\text{dmg/L}$).
- **Physical Density**: Row 6 formula ($\text{kg/L}$).
- **Ammo Role Multiplier**: $1.0\times$ Kinetic, $1.1\times$ AP, $1.25\times$ Missile, $1.5\times$ Strategic/MIRV.
- **Research Units (RUs)** & **Assembler Craft Time**.

#### 4. Derived Footprint & Fleet Endurance
- Computes magazine volume and mass.
- Derives **Suggested Weapon Volume** using the minimum $2.2\times$ internal conveyor reload buffer standard.
- **Cargo Packing**:
  - Small Cargo Container ($3,375\text{ L}$) capacity, damage stored, and 1-gun / 20-gun battery endurance.
  - Large Cargo Container ($421,875\text{ L}$) capacity, damage stored, and 1-gun / 20-gun battery endurance.

#### 5. Authentic Multi-Metal `Blueprints.sbc` Generator
- Replaces generic placeholder recipes with authentic ingots parsed directly from `Blueprints.sbc`:
  - **Railguns**: `GVK_RUs`, `Magnesium`, `Iron`, `Uranium`, `Cobalt`, `Silver`
  - **Strategic (Torpedo / SRBM / Drone)**: `GVK_RUs`, `Magnesium`, `Iron`, `Platinum`, `Silicon`, `Gold`
  - **Plasma**: `GVK_RUs`, `Magnesium`, `Iron`, `Uranium`, `Cobalt`, `Gold`
  - **Heavy Cannon**: `GVK_RUs`, `Magnesium`, `Iron`, `Cobalt`, `Silver`
  - **Flak & Autocannon**: `Magnesium`, `Iron`, `Nickel`, `Cobalt`
  - **Kinetics**: `Magnesium`, `Iron`, `Nickel`
- **Visual Material Breakdown Chips** (`#blueprintVisualMaterials`): Responsive card chips showing material name and formatted amount (`kg` or `RUs`).
- **Dynamic Proportional Scaling**: Levers scale constituent metals proportionally to mass and cost multipliers while preserving exact SBC baselines upon reset.
- **1-Click XML Export**: Outputs valid `<Blueprint>` XML ready for `Content/Data/Blueprints.sbc`.

---

## 4. Design Tokens & Theme Engine

### Tri-State Theme Switcher
The studio supports **Dark**, **Light**, and **System** modes persisted in `localStorage` under `GVK_THEME_PREF`.

### Design Tokens
```css
:root {
  --bg-main: #0b0f19;
  --bg-panel: #111827;
  --bg-card: #1f2937;
  --bg-input: #0f172a;
  --border-color: #374151;
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --text-dim: #6b7280;
  --amber-primary: #d97706;
  --amber-glow: rgba(217, 119, 6, 0.3);
  --cyan-primary: #0284c7;
  --cyan-glow: rgba(2, 132, 199, 0.3);
  --green-accent: #10b981;
  --red-accent: #ef4444;
}
```

### Contrast-Safe Light Mode Scrub
To guarantee zero unreadable white-on-white text, `[data-theme="light"]` explicitly maps:
- Headers (`h1`–`h5`, `.logo-title`, `.panel-header`, `.modal-panel`, `.wc-title`, `.hud-title`): `#0f172a`
- Numbers and Stat Values (`.stat-value`): `#0f172a`, units: `#64748b`
- Titles and Labels (`.stat-title`, `.control-label`, `.selector-label`): `#334155` / `#475569`
- Cargo containers, Blueprint material chips, and Bill of Materials: `#ffffff` cards with `#0f172a` body and `#cbd5e1` borders
- Hover states on tabs and buttons maintain dark foreground contrast.

---

## 5. Global Server Balance Matrix (`⚙️ Balance Matrix`)

All balancing equations reference the persistent drawer modal:
1. `BuildTime Dividend`: `750`
2. `Space Credits per 1U`: `207,284`
3. `SC per Damage Unit`: `3.00`
4. `Min Integrity`: `2,500 HP`
5. `Mid Integrity (1x1x1)`: `25,000 HP`
6. `Max Integrity`: `400,000 HP`
7. `Min Block Size`: `0.032 cubes`
8. `Mid Block Size`: `1.0 cube`
9. `Max Block Size`: `125.0 cubes`
10. `Assembler Efficiency`: `3.0x`
11. `Scrap Yield`: `0.25`

Stored in `localStorage` under `GVK_BALANCE_MATRIX` with single-click reset capability.

---

## 6. Pair Programming & Contributor Guidelines

When modifying or extending the GVK Weapon Studio:
1. **Preserve Offline Capability**: Do not import external CDN scripts or remote styles. All datasets must have bundled JS fallbacks in `docs/data/`.
2. **Adhere to the Comment Budget**: Explain *why* for non-obvious algorithms; avoid narrating *what* adjacent code does.
3. **Keep SBC & ModAdjuster Conventions Intact**:
   - `CubeBlocks_*.sbc` for pure vanilla tweaks.
   - `GVK_*.sbc` for custom mod content.
   - `Blueprints.sbc` for production recipes.
4. **Theme Rigor**: Whenever adding new text or cards, ensure both dark mode and `[data-theme="light"]` selectors are verified for contrast.
5. **Run Verification Script**: Always validate changes using:
   ```cmd
   node scratch/test_ammo_logistics_and_theme.js
   ```
