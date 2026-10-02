# GVK Weapons

The weapon, ammo and balance language of the GV: Deserts of Kharak weapons pack, and of the Weapon Studio that models it. Each word has one meaning across the game and the studio. Server-wide concepts (zones, grid classes, factions, sieges) live in the `se-dev-kharak` skill.

## Weapons

**Class**:
A weapon's family: Ballistic, Laser, Missile or Special. Class says what a weapon is; Role says what it does.
_Avoid_: category, type, filter group

**Ballistic**:
The class of guns firing physical slugs or shells: Gatling, Autocannon, cannons, Interior, Flak, Railgun, Heavy Railgun and MAC.
_Avoid_: kinetic (as a class)

**Laser**:
The class of beam and plasma weapons: Light and Heavy Laser, Plasma and AMS.
_Avoid_: energy (as a class)

**Missile**:
The class of self-propelled munitions: Rocket, Light and Heavy Missile, SRBM and Torpedo.

**Special**:
The class of everything else: Drones, Flares, Sensors and Warheads.
_Avoid_: other, utility, defense (as a class)

**Weapon Type**:
A weapon's specific kind within its class, named by the `*TYPE*` prefix on its block: Gatling, Autocannon, L.Cannon, H.Cannon, Interior, Flak, Railgun, Heavy Railgun, MAC, L.Laser, H.Laser, Plasma, AMS, Rocket, L.Missile, H.Missile, SRBM, Torpedo, Drone, Flare or Sensor. Model names such as Longsword or Ares name individual blocks, not types.
_Avoid_: Chaingun, Siege, Coilgun (as type names)

**Turret**:
A weapon that rotates on its own to aim at targets, whatever the width of its arc. A Turret with a narrow arc is a limited-arc Turret.
_Avoid_: gimbal (for a limited-arc Turret)

**Fixed**:
A weapon that fires along its block's facing. Gimbals are Fixed weapons.
_Avoid_: rigid mount, forward mount

**Gimbal**:
A Fixed weapon that can steer its aim within a small cone.

**AMS**:
Anti-Missile System: the Laser-class point-defense turret. In-world it is a COIL (Chemical Oxygen Iodine Laser).
_Avoid_: coilgun, PD laser

**Phantom**:
A weapon with no physical block; it exists only as a WeaponCore definition that other weapons or scripts fire through. WeaponCore: `HardwareType.Phantom`.

**Role**:
The combat job a weapon fills, judged from its stats: Point Defense, Brawler, Armor Breaker, Area Denial, Beam, Homing Ordnance, Standoff Artillery or Demolition Charge.
_Avoid_: munition role, price role, Kinetic Brawler, Directed Energy, Area Denial / Flak, Guided Ordnance

**NPC weapon**:
An AI-only copy of a player weapon, tuned for encounter grids and not buildable by players. Its Weapon Type carries an `NPC-` prefix.

**Data Core**:
The `[Tech] Data Core` component every weapon with a range over 2 km must include in its build cost.
_Avoid_: circuitry, Prototech Circuitry

**Relic Weapon**:
A weapon that takes a Relic Weapon Slot in its grid's Utility Point budget.
_Avoid_: relic (for weapons classified only by their blueprint or ammo)

**UP cost**:
The Utility Points (UPs) a weapon draws from its grid class's budget. The UP system itself is defined in the `se-dev-kharak` skill.
_Avoid_: upgrade module slots, PCU

**Detonation**:
A warhead or explosive block going off once and delivering its payload. WeaponCore: `CriticalReaction`.
_Avoid_: detonation (for a round exploding)

## Ammo & Damage

**Armor Multiplier**:
The factor applied to a round's direct-hit damage against Heavy Armor, Light Armor or Systems. WeaponCore: `DamageScales.Armor`.

**Heavy Armor** / **Light Armor** / **Systems**:
The three kinds of block a round can hit, each with its own Armor Multiplier. Systems are every non-armor block, such as batteries, refineries, thrusters and gyros. WeaponCore: `Heavy`, `Light`, `NonArmor`.
_Avoid_: non-armor, modules, internals

**Overpenetration**:
A round dealing at most a fixed amount of damage to each block it hits and carrying the rest into the blocks behind. Short form: Overpen. WeaponCore: `BaseDamageCutoff`.
_Avoid_: over-penetration (for a low Armor Multiplier against Light Armor)

**Smart**:
A round with WeaponCore guidance and a target, which point defense can choose to engage.
_Avoid_: guided

**Dumb**:
A round with no guidance that flies where it was fired.
_Avoid_: unguided

**Homing**:
A Smart round that steers toward its target. An Air Burst round is Smart but not Homing.

**Hybrid Round**:
A round that uses both a magazine item and power for each shot. WeaponCore: `HybridRound`.
_Avoid_: sabot (as a category; it is flavor text in a few ammo names)

**Kinetic damage**:
Damage WeaponCore tags as Kinetic, reduced by an armor's Kinetic Resistance.

**Energetic damage**:
Damage WeaponCore tags as Energy, reduced by an armor's Energetic Resistance.
_Avoid_: energy damage

**Kinetic weapon** / **Energetic weapon**:
A weapon whose total damage (direct hit, AoE and Fragments together) is mostly Kinetic or mostly Energetic damage.

**Energy**:
Ammo that uses no magazine item, so the weapon fires it from power alone. WeaponCore: `AmmoMagazine = "Energy"`.
_Avoid_: energy (for a damage type or a class), power-fed

**End-of-Life AoE**:
An area blast a round releases when its flight ends, rather than when it hits a block. WeaponCore: `AreaOfDamage.EndOfLife`.
_Avoid_: detonation, proximity

**Air Burst**:
A round with a proximity fuse that bursts near its target into an area blast or fragments.
_Avoid_: proximity shrapnel, proximity (alone)

**Fragment**:
A round spawned by another round in flight or on impact. WeaponCore: `FragmentDef`.
_Avoid_: shrapnel, sub-round, sub-munition, child

**Alpha**:
The damage one trigger pull delivers: one shot, or one full burst for burst-fire weapons.
_Avoid_: alpha volley, volley alpha

**Burst**:
The shots a weapon fires before its burst delay. WeaponCore: `ShotsInBurst`.
_Avoid_: burst (for Fragment releases or blasts)

**Spawn Wave**:
One of several repeated Fragment releases from a round in flight. WeaponCore: `TimedSpawns`.
_Avoid_: burst, fragment burst

**Burst RPM**:
The fire rate within a single Burst.

**Sustained**:
Averaged over the whole fire-and-reload cycle, as in Sustained DPS and Sustained RPM.
_Avoid_: effective (for reload-inclusive rates)

**Effective DPS**:
Sustained DPS after the highest Armor Multiplier the round has.
_Avoid_: Effective RPM (use Sustained RPM)

**Magazine Damage**:
The total damage one full magazine delivers.
_Avoid_: alpha volley

**Relic Ammo**:
Ammo whose recipe needs RUs.
_Avoid_: non-craftable ammunition

## Point Defense

**Point Defense**:
The Role of a Turret set to engage missiles and other projectiles. Short form: PD.
_Avoid_: PD (for Fixed weapons or for an Anti-Missile Screen alone)

**Anti-Missile Screen**:
An AoE whose block damage is only a token amount and whose ammo has a HealthHitModifier, so it destroys missiles rather than blocks.
_Avoid_: anti-missile burst, anti-smart screen, flak screen

## EWAR

**Anchor**:
An EWAR effect that holds a target grid in place. WeaponCore: EWAR type `Anchor`.
_Avoid_: anchor (for the pricing reference magazine)

**Missile Scramble**:
An EWAR effect that scrambles the targeting of Smart rounds, delivered by Flares. WeaponCore: EWAR type `AntiSmart`.
_Avoid_: chaff, decoy, countermeasure

**EMP**:
An EWAR effect that shuts down every powered block on the target. WeaponCore: EWAR type `Emp`.
_Avoid_: EMP (for effects that shut down only some blocks)

**Weapon Shutdown**:
An EWAR effect that shuts down only the target's weapons. WeaponCore: EWAR type `Offense`.
_Avoid_: EMP, offense

## Balance & Configuration

**Default**:
The value WeaponCore uses for a field a definition leaves out.
_Avoid_: server default, GVK default (for any other meaning)

**Shipped**:
The values a weapon, ammo or magazine has in the mod as currently released.
_Avoid_: live, current, server defaults, Ammo Maths defaults

**Override**:
A WeaponCore server setting that changes a weapon or ammo value at load without editing the mod. WeaponCore: server overrides.
_Avoid_: using "override" for studio edits or curated studio data

**Balance Matrix**:
The GVK-wide balance settings every studio calculation reads, such as ammo baselines, ingot values and RU share.
_Avoid_: official GVK defaults

**Baseline**:
The volume, mass, craft time or price a magazine would get from the Balance Matrix curves alone, scaled by its damage relative to the Baseline Magazine, before its own multipliers.
_Avoid_: Ammo Maths defaults, MSRP, Base MSRP

**Server Price**:
What a player pays for a magazine: its price Baseline times its Price Tier, rounded.

**Recipe Budget**:
The value a magazine's ingot recipe is sized to: its Server Price inflated to cancel the server's assembler efficiency.
_Avoid_: Adjusted MSRP

**Baseline Magazine**:
The magazine every Baseline is scaled against; currently the Gatling magazine.
_Avoid_: anchor magazine, anchor, reference magazine, Anchor MSRP (for its price)

**Price Tier**:
The ammo-type multiplier on a magazine's server price: Standard, AP, Railgun, Missiles, MIRV or Custom.
_Avoid_: role, price role

## Ammo Storage

**Inventory Size**:
How much ammo a weapon block holds. WeaponCore: `HardPoint.HardWare.InventorySize`, which overrides the block's SBC inventory volume.

**Reload Buffer**:
The extra room in a weapon's Inventory Size so it can reload without running dry.

**Suggested Inventory Size**:
The Inventory Size the studio computes for a weapon from its magazine volume and the Reload Buffer.

**Mags Carried**:
How many magazines fit in a player inventory or a small cargo container.
_Avoid_: fits

## Weapon Studio

**Mod Source**:
The mod's C# and SBC files: the only source of truth for weapon, ammo and magazine values.
_Avoid_: source of truth (for anything else)

**Workspace**:
One of the studio's three areas: Telemetry, Workbench or Logistics.
_Avoid_: Combat Telemetry & Benchmarks, Definition Workbench, Ammo Logistics (in prose)

**Scope**:
What the Workbench is editing: Weapon, Ammo or Block.

**Benchmark**:
The weapon the selected weapon is compared against in Telemetry's 1v1 view.
_Avoid_: comparison weapon, rival

**Live**:
Data the studio read from the Mod Source when the page loaded.
_Avoid_: using "live" for Shipped values or for Workbench edits

**Snapshot**:
The copy of the Mod Source bundled with the studio, used when the Live read fails.
_Avoid_: bundled, fallback, bundled snapshot

**Draft**:
Edits made in the studio that are not Shipped yet.
_Avoid_: live values, overrides, form values

**Curation**:
Hand-maintained studio data the mod source does not hold: display names, icons, magazine categories and per-magazine balance multipliers.
_Avoid_: overrides, studio overrides

**Unresolved magazine**:
A magazine reference that points to no real magazine; a data error.
_Avoid_: phantom magazine
