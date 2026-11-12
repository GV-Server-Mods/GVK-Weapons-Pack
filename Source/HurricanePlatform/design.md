# Hurricane on the platform base (`GVK_HurricanePlatform`): design

An alternate base for the Hurricane turret, built so the owner can compare it with the Hurricane's own plinth
(owner, 2026-11-08). The turret, disc, ports, keypads and service gear are the Hurricane's. Only the plinth is
new: the vanilla 5x5x1 Structural Platform Conveyor (`Structural_5_platformConveyor`), dressed in the
3x3x1 Heavy Turret Mount's style (`Source/HeavyTurretMount`).

## Block

| | |
|---|---|
| Scene | `GVK_HurricaneTurret` and its four subpart scenes (Subparts, below) in `HurricanePlatform.blend` (a copy of `HurricaneTurret.blend`); `GVK_HurricanePlatform` until the split |
| Size | 5 x 5 x 3 large cells, the same as the Hurricane. The base is the bottom cell (z -3.75 to -1.25). |
| Preview block | `CargoContainer/GVK_HurricanePlatformPreview` in the local `GVK_HurricanePreview` mod, look only, with the one-scene model from before the split |
| Model | `Models\GVK_HurricaneTurret\GVK_HurricaneTurret.mwm` and its subparts, exported 2026-11-10 with LODs (40 / 120 / 300 m), build stages, collision and icon; both Hurricane blocks use it; tested on the server 2026-11-11 (owner) |

## Base (`Platform`)

- **Sides**: the vanilla platform's side walls, trusses and ports. The corner posts are widened by 12 cm
  so they match the mount's heavier corners, and a darker doubler plate (top and bottom strip) runs along each
  truss bay and on across the centre bay to the port's frame. Each post ends under the side band in vanilla's
  rounded bevel and a cap, rebuilt on the widened outline (owner, 2026-11-09: "broken surfaces at the top of the
  side edges on all 4 corners").
- **Port surround** (owner's mockup, 2026-11-08: a dark border round the port, the centre bay one paintable
  field, and the truss members run on to the border):
  - The four side ports have no grey shroud (owner, 2026-11-09). The dark border is built into the wall in the
    shroud's old outline (2 m square, chamfered corners):
    - A lintel above the port and a sill below it, at band height (6.25) and joined to the bands. Their lower
      edge carries on the corner pieces' curved line straight across the port, with the band's rounded bevel.
    - Jambs 1 cm lower (n 6.2404), from the port out to the old shroud's side, with the same rounded outer edge
      and a wall down behind the plate. The lintel's and sill's rounded edge comes down straight onto them. They
      also run across under the lintel and over the sill, so the port's top and bottom corners show real steps.
      They were at the strip's height, 2.5 cm lower, which left them under the braces (n 6.2307). The owner
      asked for the surround "pushed outward a bit so it sticks out more than the 45 degree beams on its sides"
      and picked this height of three (owner, 2026-11-09). In game they stand 1.2 cm over the braces.
    - A 4 cm 45 degree bevel from the jambs down to the yellow port, all round its chamfered outline.
  - The bottom port keeps its frame, paintable.
  - The bay posts beside the port, their top gussets and the centre bay's raised plate (with its access panel)
    are gone. The vanilla wall plate behind them is one paintable field from the truss diagonal to the jamb.
  - The chords' dark strips and doubler bars run on to the jamb. A corner piece at band height fills each
    corner between the band and the jamb. Its edge curves down from the band's lower edge to the strip's
    lower edge at the jamb, as the vanilla band curves into the corner posts at the wall's ends, with the
    band's rounded bevel carried round it.
  - A brace runs at 45 degrees from the bottom gusset's port-side chamfer up to the jamb. It is the vanilla truss
    diagonal beside the gusset, mirrored, so it has the same scalloped edge as all the others (owner,
    2026-11-09): a 0.316 m face with 1.5 cm bevels, and by the gusset one side steps in through a curved scallop
    to a 5 cm chamfer.
  - The bottom gusset is one piece (the vanilla truss gusset, the post's foot and the post gusset were three),
    symmetric like the vanilla gussets, with the vanilla top gusset's decals turned over: outline groove,
    centre seam, two vents, four screws.
  - The plate seam above the bottom gusset runs on to the frame. The one along the gusset's top edge stops at
    the gusset's corner.
  - Across the centre bay the dark band is 8 cm deeper at top and bottom (kept from the first round). It is as
    deep there as in the vanilla outer bays, with the vanilla jog where the post stood.
- **Top deck** (owner's pick, 2026-11-08: "Keep the service gear"): the mount's deck pattern stretched from 3x3 to
  5x5. The clamps and corner plates move outward by 2.249 m so they meet the vanilla side bands, and the vanilla
  corner band lines move 25 cm to meet them. The Hurricane's slew disc sits in the middle, and its service
  gear (pressure box and valves on one side, power cabinet and conduits on the other, power socket in one corner)
  stands on the deck plates.
- **Service trenches** (owner, 2026-11-09): under the pressure box and the power cabinet the moat runs in to the
  slew disc, 6 cm clear of each box, with the moat's bevel, dark wall and floor. The gear stands on the trench floor,
  3.5 cm lower, at the moat's level. The deck's trim line beside the moat turns and runs along each trench into the
  disc.
- **Service gear** (owner, 2026-11-09: "shorten the supply boxes, then move the pressure gages to the other side of
  their box so they face outward, and then adjust the conduits on both sides so they are not so sunk into the
  moat"): both boxes are 8.2 cm lower, 17 cm above the trench floor (the owner's pick of two heights). The pressure
  box's two gauges sit on its outer face, looking at the deck's edge, and its warning plate is on its bare -Y side.
  The feed pipes, valves and wheels stand 5.3 cm higher and the power conduits and rings 3.6 cm, so their flanges
  and rings clear the floor. The clamp bars and the junction block keep their feet on the floor. A face that only
  moved keeps its UVs; a stretched one keeps its texel size. The handwheels stay in `ClangCola`'s plain red patch.
- **Ring trench** (owner, 2026-11-09: "the trench to also surround the turret ring with the same width as the rest
  of the top. The panel lines should follow it as well"): a trench as wide as the moat's floor (18.2 cm) runs round
  the slew disc, out to r 4.79 at the deck, in 64 sides like the disc. It has the moat's profile and joins both
  service trenches. The deck's trim line runs round it, mitred into the service trenches' trim lines, and the deck
  lines that crossed it end on it in pointed T-joins. The eight small vents beside the disc are gone. The disc
  ring's 12 radial lines run on over its chamfer and down its side to the trench floor (owner, 2026-11-09: "the seams
  on the plinth turret ring should go all the way and wrap down to the top surface of the plinth").
- **Ordnance placard** (owner, 2026-11-09, in place of the TYPE A label): a raised plate 0.91 x 0.49 m, 22 mm proud,
  in the +X -Y field just below the cargo hatch, on its handle side, 13 cm from the pocket. It reads from the deck's
  -Y edge. It has a 3 cm darker-paint bezel with chamfered edges and a bolt on each corner, round a `BlackMetal`
  field (the owner's pick of two colour schemes). On the field, side by side: yellow and black hazard bands top and
  bottom, and between them the shell icon, the AMMUNITION label and the explosive diamond (Atlas2). No panel line
  runs round it (owner, 2026-11-09: "remove the panel seam line from around the placard").
- **Cargo hatch** (owner, 2026-11-09: a pocket "for one larger door/hatch style decal for an asymmetric look", then
  "make the hatch larger so the width matches the placard width"): a pocket in the +X -Y field, as wide as the
  placard, 0.91 x 1.36 m at the deck, with the moat's profile. On its dark floor lies the paintable hinged lid
  (Atlas3 31, the owner's pick of four), 0.85 x 1.29 m with 2.5 cm of floor round it. The pocket's walls and floor
  are their own mesh, the cargo access highlight (Interaction points). Keen's panel line runs round the pocket on
  the deck. When the gun is turned to that corner, the gunhouse's overhang passes over the hatch.
- **Deck paint** (owner, 2026-11-09: "All of those cuts make the textures rotate at different directions and it
  looks bad"): one planar paint map per deck, so the paint's wear and skins run one way across every plate, band,
  trench floor and bevel. The cuts between flat faces of one material on one plane are dissolved.
- **Deck rivets** (owner, 2026-11-09: "in more corners and more evenly", option A, corners only): a round sunken
  head (Atlas3 14, 44 mm) in every corner of every deck plate, top and bottom, 5.5 cm from both panel lines, each
  turned to a random angle. Only plate corners get one (owner, 2026-11-09: "you have a lot that of old ones that are
  not actually at any corners, and you have extra new ones that are also not at any corners"; the owner's yes to
  the mock-up): the band plates have theirs where the clamp and corner lines meet the deck edge and where each
  clamp line meets the frame line, and none on the clamp bridges or by the moat's outer edge. 104 on the top deck,
  96 on the bottom.
- **Deck seam joins** (owner, 2026-11-09: "do another look at the seam decal mitres", then "Yes, fix those"):
  corners are mitred and stems end in a point on the line they meet. Where a stem's tip lay on that line at the
  same height (the ring trim's 8 T-joins, the bottom deck's clamp and cross-arm T-joins), the tip sits one stored
  step further out. Each deck seam face's U runs along its strip after the decal snap. The bottom cross arms end in
  a point at the port surround.
- **Panel lines** (owner, 2026-11-09: "the same decal that keen uses on their blocks (other than the weld lines)"):
  every panel line is Keen's Atlas4 piece 3 in the variant of the paint under it (`Atlas4_Colorable` on paint,
  `Atlas4_Darker` on the darker paint and the silver). The weld beads stay Paneling piece 55.
- **Shading** (owner, 2026-11-09: "a full shade smoothing pass on the base"): the base shades as Keen's platform
  does. Edges up to 65 degrees are smooth and the 90 degree corners hard. Each corner's normal leans to the
  largest flat region round it, so large flat faces stay flat and the bevels between them shade round. Keen's own
  shaded corners on the platform keep his normals, and the new pieces join them without a seam. The kitbashed
  vanilla ports, the bottom port's frame and the keypads keep Keen's normals; the turret is not part of the pass.
- **Bottom deck**: the same deck, turned over about X, around the bottom port. A 2 cm wall stands on the edge of the
  deck's opening round the port frame, so no slot looks into the block (owner, 2026-11-09: "I can see through the
  textures inside the plinth block at some angles").
- **Turret**: as the Hurricane's, with its embrasure behind the trunnion drums in `BlackMetal` (owner,
  2026-11-09). Each cheek's seam runs on below the embrasure, down the corner with the chin to the glacis' bottom
  seam (owner, 2026-11-09). Its rivets are Keen's sunken head (Atlas3 14) at 65 mm, in place of the 90 mm domes
  (owner, 2026-11-09: "sunken head at 65mm"). The gunhouse uses only Keen's atlases; the GVK rivet atlas is gone
  (owner, 2026-11-09).
- **Roof seam joins** (owner, 2026-11-09: "fix some seam miters on the gunhouse roof in multiple places around the
  large chrome panels"): every T-join on the roof ends in a point on the line it meets and draws over it, in
  Blender as in game. At the two front corners the glacis edge line runs on up the rounded corner to the dark
  front edge line and ends along that line's edge: it meets it at about 20 degrees, where a point would be a
  sliver that the game's 2.9 mm position grid out there breaks up.
- **No decal under its surface** (same request: the specks at the roof's front corners): a flat decal face laid
  across a rounded edge passes under it between its corners, and the game then drops that part. Every such face
  stands at least 0.9 mm off the surface before the decal snap.
- **No coplanar faces** (owner, 2026-11-09: z-fighting on the bottom of the sensor dome): no two solid faces lie in
  one plane facing the same way, as modelled or as the game stores them, except Keen's own at the platform's
  corners.
- Build order: `tools/build_platform.py` (the base), `tools/post_tops.py` (the corner post tops),
  `tools/assemble.py` (the kept Hurricane parts),
  `tools/cargo_ports.py` (seats the port frames), `tools/port_skirt.py` (the bottom port's wall),
  `tools/port_surround.py` `surround()` (the centre bay round each port;
  it removes the side frames and stands the keypads on the jambs) and `raise_jambs()` (the jambs and keypads 1.5 cm
  out), `tools/moat_notch.py` (the service trenches),
  `tools/ring_trench.py` (the ring trench), `tools/deck_placard.py` (the ordnance placard), `tools/hatch_pocket.py`
  (the cargo hatch), `tools/deck_cleanup.py` (the deck paint), `tools/deck_rivets.py` (the deck rivets),
  `tools/service_gear.py` (the service gear), `tools/seam_ends.py` (the disc ring's lines, the band notches and
  the brace ends), `tools/deck_seams.py` `caps()` (the port ends), `tools/cheek_seam.py` (the cheek seams),
  `tools/rivet_heads.py` (the gunhouse rivets), `tools/overlaps.py` (the coplanar faces), `tools/roof_seams.py`
  `corner_stems()` (the glacis edge lines' tops), `tools/finish.py` (`decal_dips.py`'s lift, the decal snap,
  `seam_ends.py`'s edge crossings, `deck_seams.py`'s tip lift and U fix, then `roof_seams.py`'s `tips()`),
  `tools/shade_pass.py` (the shading). The turret parts and their decals come from the Hurricane's build scripts
  (`Source/HurricaneTurret`), which still make the coplanar faces that `overlaps.py` removes. Since the freeze and
  the split (2026-11-09) none of these runs again on the model; `finish.py` `finish_split()` snapped the subpart
  scenes' decals after the split.

## Interaction points

- **Ports** (owner, 2026-11-08: the standard cargo container port and terminal): the vanilla large cargo
  container's yellow port with crossbars and grey shutter, as on the Hurricane. The Platform is cut along the
  outline of the vanilla `LargeConveyorFrame` (a 2 m box with chamfered corners), and the vanilla platform's
  own port surround inside it is removed. On the sides the lintel, sill and jambs fill that outline (Port
  surround, above). The bottom port keeps the grey frame, and the deck round it is notched with short walls.
  Detectors as on the Hurricane.
- **Keypads**: the vanilla keypad housing on each side's right jamb (seen from outside), centred across the
  jamb. The vanilla housing leans 15.5 degrees to sit on the frame's sloped inner edge; on the flat jamb it
  stands flat. It moved out 1.5 cm with the raised jamb, so its top plate is at the band face and its two screw
  decals stand one stored step (6 mm) over it. The terminal detector moved with it. The
  platform's own access panel beside each port is gone with the raised plate it sat on. The corner vents keep
  one of their three slots, the outer one, on each chord's strip beside the jamb.
- **Cargo hatch** (owner, 2026-11-09): `detector_inventory_1` on the hatch pocket, highlighting
  `Pl_CargoHatch_section_1` (the pocket's bevel, walls and floor; the lid is a decal on the floor), so the hatch
  opens the block's inventory. The empty is 0.93 x 1.38 m and 9 cm deep, covering the whole pocket.

## Subparts (split 2026-11-09)

| Scene | Holds | Origin (in the block before the split) | Child empties |
|---|---|---|---|
| `GVK_HurricaneTurret` | base, deck, service gear, ports, keypads, hatch, all detectors | block centre | `subpart_MissileTurretBase1` at (0, 0, 1.9) |
| `GVK_HurricaneTurret_Az` | bearing ring, gunhouse, bustle, roof gear, side boxes; root `Gunhouse` | slew axis at the trunnion's height (0, 0, 1.9) | `subpart_MissileTurretBarrels` at (0, 2.2, 0) |
| `GVK_HurricaneTurret_El` | drum, cones, collars, ridges, lamps; root `Drum` | trunnion axis (0, -2.2, 1.9) | `subpart_salvo_barrel_1` (-1.9, 2.5, 0), `_2` (1.9, 2.5, 0), `muzzle_projectile_1` (-1.9, 9.38, 0), `_2` (1.9, 9.38, 0), `camera` (0, 1.3, 0.9) |
| `GVK_HurricaneTurret_Barrel_1` | left barrel, brake and sleeve stencils; root `Barrel_L` | cone tip (1.9, -4.7, 1.9) | none |
| `GVK_HurricaneTurret_Barrel_2` | right barrel, brake and sleeve stencils; root `Barrel_R` | cone tip (-1.9, -4.7, 1.9) | none |

- Each subpart scene's content is turned 180 degrees about Z, so the guns point +Y there, and every empty is
  unrotated (se-dev-seut `weapons-turrets.md`, "Splitting a turret"). The transforms are baked into the meshes, so
  every object sits at the origin of its scene, parented to the scene's root.
- Two barrel scenes, not one: each barrel's sleeve stencils sit on its outboard side, and one shared scene would put
  one set inboard.
- The azimuth origin sits 2.8 m above the slew disc, on the slew axis. Any point on that axis turns the gunhouse the
  same way, and there the game stores the roof gear's heights on a 1 mm grid instead of the 3.9 mm one it would use
  with the origin on the disc, where 24 of the sensor dome's seam triangles could not be snapped clear.
- Each subpart model stores its positions relative to its own origin, so its decals were snapped again in its own
  scene (`tools/finish.py` `finish_split()`), then the roof's T-join tips. Left: 42 decal triangles on the gunhouse
  that lie under their surface as modelled (design faults the snap leaves alone, 24 of them 1.2 to 2.5 mm under), and
  one weld-bead triangle that rounds under it. No coplanar solid faces in any subpart scene, as modelled or as
  stored.

## Remaining steps (plan, 2026-11-09)

**This base is the Hurricane's model going forward** (owner, 2026-11-09: "I'm extremely happy with the new plinth
design, I've decided I want to use this model going forward"). The Hurricane's own plinth is superseded. What is left
to turn this look-only preview into the real `ARYXHurricaneCannon` and `ARYXHurricaneCannon_NPC`, in order. The
Hurricane's `design.md` already settles the names WeaponCore reads, the subpart chain, the collision shapes, the LOD
distances, the build stage rules and the SBC changes; these steps apply them to this file. The owner signs off steps
1, 5, 6 and 9 from renders, and step 11 in game.

1. **Detail sign-off, then freeze.** Done (owner, 2026-11-09: "Freeze and split"). The build scripts are retired:
   every change is now an edit of the .blend, and an edit that moves a surface lays its decals again in the same step.
   The glacis window frame curl stays as it is.
2. **Real block name.** Done: SubtypeId `GVK_HurricaneTurret`, so the model is
   `Models\GVK_HurricaneTurret\GVK_HurricaneTurret.mwm`. `HurricaneTurret.blend` stays as history and is not exported
   again.
3. **Split into subpart scenes.** Done, see Subparts below. The turret rebuilt from the four subpart scenes matches
   the one-scene model to 2 micrometres, so the sweep, recoil, superfire and sweep radius numbers carry over.
4. **Buried-face cull and triangle trim, in each scene.** Done (owner's pick, 2026-11-09: cull, then fewer segments
   only on parts with no decals; decals untouched). Modifiers applied, then `tools/cull.py` cut 6,651 buried triangles
   and `tools/trim.py` 7,408 more from the rear pipes, grille handles and hose fittings, so 99,900 became **85,830**
   (main 24,179, Az 44,440, El 8,931, each barrel 4,140), not the 75,000 planned: the cull cuts a face only when its
   centre and every corner are inside another closed part, which cut less than the 15,800 estimated on 2026-11-03, and
   the feed tube has only four rings along its length and its 24 sides were not halved, and the vents are slatted
   plates with nothing round to halve. Shading, decal gaps
   and renders checked (build log, 2026-11-09 cull and trim). Second pass (owner, 2026-11-10: "Do your triangles
   except the cradle"): 2,975 triangles that never show in 1,700 face-ID renders cut from the base, the gunhouse and
   the barrel ends (`tools/hidden_cut.py`, `tools/face_id_views.py`), so **82,855**; the cradle is left whole.
5. **LODs** in every scene at 40, 120 and 300 m. Done 2026-11-10 (`tools/lods.py`, build log): **62,244 / 18,718 /
   7,827** triangles. LOD1 keeps every panel line; LOD2 and LOD3 drop them (owner, 2026-11-10: "Drop them in LOD2"),
   and LOD2 keeps the hazard stripes and big signs; LOD3 has no decals. Lamp faces stay in every level. The only
   materials lost are dropped decals and tiny parts at LOD3. The empties stay in Main. Each switch, rendered at
   the game's pixel size, changes at most 1.9% of the model's pixels. The feed tube stays at 24 sides (owner: "Skip tube").
6. **Build stages** BS1 to BS3 at 0.33, 0.66 and 1.00 in the main scene, each the whole outline with the guns at
   rest. The base from Keen's own `Structural_5_platformConveyorConstruction_1..3` (SEUT import, as the base came
   from his platform), with the posts widened as in `build_platform.py`. The head from frame proxies of the disc,
   bearing ring, gunhouse, bustle, drum, cones and barrels, with the load path from deck to gunhouse so nothing
   floats (se-dev-seut `block-scenes.md`, "Designing the stages"). Built 2026-11-10 (`tools/build_stages.py`,
   build log), waiting for the owner's sign-off: **29,720 / 23,816 / 14,324** triangles, most of them Keen's base
   stages. BS1 is frames with a solid load path; BS2 turns the disc and the mechanisms solid; BS3 the gunhouse and
   bustle, with the roof and front left open. No stage LODs.
7. **Collision** in the main scene, convex shapes with their points in block space, just inside the bounding box:
   the base box (12.5 x 12.5 x 2.5 m), the disc cylinder (9.2 m, deck to 2.85 m), the gunhouse cylinder (r 4.5 m,
   2.85 to 6.8 m), and a box each for the pressure box and the power cabinet so players cannot walk through them.
   Check: the scope (`muzzle_projectile_1`) stays outside every shape from -10 to +45 degrees. Built 2026-11-10
   (`tools/collision.py`, build log), waiting for the owner's sign-off: 5 shapes, the disc and gunhouse as 24-sided
   Convex Hull prisms (block z -1.25 to -0.9, and -0.9 to the roof at 3.1), the boxes cover the pipes beside them.
   The scope stays at least 4.97 m clear at every elevation and azimuth.
8. **Mount points and interaction points.** Mount points unchanged (whole bottom face and the bottom row of each
   side), in the hand-written SBC; no mirroring. The 5 conveyor detectors sit in their cells facing out; the 4
   terminal detectors and `detector_inventory_1` cover their meshes. All stay in Main, on fixed parts. Checked
   2026-11-10 (`tools/interaction_check.py`, build log): the base fills every mount face, all 5 conveyors connect
   outward, every detector covers its mesh; the conveyor detectors were widened 1 to 3 cm to do so.
9. **Icon**: SEUT's icon render, with the subpart collections instanced by hand and the preview window left open,
   saved as `Textures\GUI\Icons\GVK_HurricaneTurret.png`. Done 2026-11-10 (`tools/icon.py`, build log), in full
   colour (owner, 2026-11-10: "Full colour").
10. **SBC and WeaponCore** (Hurricane design, "SBC and WeaponCore changes"): model, build stages, icon,
    `EmissiveColorPreset` `Default`, elevation -10 to +45 in both, azimuth -180 to 180, `AiEnabled` false, and the
    description without "Manufactured by AWE.". Export with `export_sbc_type = 'none'`. Remove the AWE Hurricane
    models and icon, and regenerate the studio snapshot and icons. Done 2026-11-10 (build log): 23 models exported to
    `Content\Models\GVK_HurricaneTurret`, both SBC entries and WeaponCore changed, the AWE files removed, the Studio
    icons and snapshots regenerated, built and deployed.
11. **In-game test** (owner, offline singleplayer, full restart; `dotnet build -c Release` deploys the mod, and the
    deployed copy is checked for the new `.mwm` first): subparts face forward, `_1` is the left barrel, recoil moves
    both barrels back and their ends stay hidden, the muzzle flash sits on the tips, the manual-control view, tracking
    and firing with no self-hit pauses, superfire over a twin one block up behind it, the lamps follow the block's
    state, all 5 conveyors connect, every keypad and the hatch highlight to the rim and open, collision on the deck,
    the boxes and the gunhouse, LOD switches, the build stages while welding and grinding, the icon, and the NPC
    variant. Then the preview block and the `GVK_HurricanePreview` mod go. Done 2026-11-11 on the server (owner:
    "hurricane is tested in server and is amazing"), no faults reported.
12. **Commit** GVK_Weapons on the owner's word after the test: the .blend, `design.md`, `build-log.md` and `tools/`;
    the `_before_*` checkpoints stay out of git. Done 2026-11-11 (commit cb7c387); `.gitignore` now skips
    `*_before_*.blend`.
