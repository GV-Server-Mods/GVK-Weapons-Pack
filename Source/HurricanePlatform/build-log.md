# Hurricane platform base: build log

## 2026-11-08: first build

- **Source scenes** in `HurricanePlatform.blend`: `KB_PlatConv` (vanilla Structural_5_platformConveyor, SEUT
  import, `KBC_` prefix) and `KB_Mount` (the 3x3x1 mount's body, decals and ports, `KBM_` prefix).
- **`tools/build_platform.py`** builds `Platform` (11,440 faces): the vanilla body's -Y side kept as a wedge,
  deck faces dropped, corner posts widened 12 cm, top-surface and doubler-band wall decals dropped, the
  Atlas4 corner band lines moved +0.251 m, then 4 doubler plates per side and copies turned 90/180/270 degrees.
  The deck comes from the mount's top (faces within 3.4415 m), mapped per axis: unchanged to 1.22, clamp zone
  +2.249, past 1.85 +2.5. The bottom deck is the top turned 180 degrees about X. Custom normals kept.
- **`tools/assemble.py`** (checkpoint `HurricanePlatform_before_assemble.blend`, not for git):
  - Gear raised 5.2 cm onto the new deck (old deck top -1.300, new -1.248). The boxes move 16 cm inward so
    they sit on the deck plate (its edge is at |x| 5.69). Only straight pipe and conduit runs get shorter.
  - Old deck decals: disc 305 islands and gear 37 kept; 98 kept marks (power socket, data plate, CAUTION
    sign); old deck seams, screws and stencils dropped. The socket moved -0.15 m in x and the data plate
    +0.20 m, off the new deck's Atlas4 corner lines (decals must not stack).
  - Reparented 39 objects to `Platform`; removed the old plinth (63 objects, 63 meshes).
- **Keypads**: housing, keypad and terminal detector moved 0.50 m along each wall, into the centre of the vanilla
  access panel (the old spot covered the panel's hinge strip at x 0.85-0.91).
- **Checks**: all five ports seal the vanilla openings; every detector keeps its highlight link. Nothing of the
  base reaches past the vanilla model's own 6.2526 m (decals 6.2574). The turret head overhangs as on the Hurricane.
- **Decal snap** (`decal_snap.py`): Platform 1,888 triangles broken by rounding, then 136 left. Those were the
  Atlas4 side-band strips whose corner vertex sits on the corner post's chamfer. They were fixed by moving those
  vertices out to the strip's height, so 0 are left. Still left are 4 tilted gauge-decal triangles on the feed
  box and 2 design faults there, all inherited from the Hurricane gear.
- **Export**: SEUT 1.2.1, `export_sbc_type = 'none'`. The preview SBC entry was added by hand.
  - W002 on `Pl_TopDec_Atlas2`: 65 faces with one corner on the atlas origin, as in the Hurricane. They are
    real decals, not missing UVs.
  - W006 on the `mk_` markers: inherited from the Hurricane.
  - The `.mwm` holds the moved keypad detectors (checked with `mwm_dummies.py`).
- **Not tested in game yet.**

## 2026-11-08: cargo container ports and keypads (owner review)

The owner liked the base but asked for the standard cargo container port and terminal instead of the
vanilla platform's port opening and the keypads in the access panels.
- **Frames back**: `Pl_PortFrame_F/B/L/R/D` (vanilla `LargeConveyorFrame`) copied back from the
  `_before_assemble` checkpoint, and `assemble.py` now keeps them. The keypads, housings and terminal detectors
  are back at the Hurricane's spot on each frame's right edge. The checkpoint for this round is
  `HurricanePlatform_before_cargoport.blend` (not for git).
- **`tools/cargo_ports.py`**, per side wall and the bottom deck:
  - The access panel's left-edge decals (outline, corner arcs, hinge strip) moved 20 cm out and the corner
    vent slots 6 cm out: 288 decal vertices per side.
  - The Platform was cut along the frame outline (|a|, |b| <= 1.0, chamfer |a| + |b| <= 1.79), and the
    faces inside it removed: 134 per side, 32 on the bottom.
  - 47 notch walls per side close the cut bands down to just behind the frame face (6.205).
  - On the bottom, the seam ring round the old well is removed and the 8 seams running out from it are
    trimmed at the frame: 24 decal faces.
  - Platform now has 11,600 faces.
- **Checks**: 800 rays per frame round each outline (just inside and just outside it) found no hole. No decal
  is left under a frame.
- **`tools/finish.py`** (the decal snap plus the chamfer-strip fix as a script): no Platform triangles left
  broken. The inherited leftovers are unchanged: `Pl_TopDec_Decals` 4, the turret head's `GH_Dec_PanelingDarker_Az` 4.
- **Export**: same warnings as before. The `.mwm` has the keypad detectors back at u 0.827.
- **Not tested in game yet.**

## 2026-11-08: port surround (owner review)

In game the owner asked for the port border to tie in better: a dark frame tight round the shroud, like the
old plinth's frame box (their markup: an H of the two bands and an upright each side), and the dark band
stepped up round the port so it does not look thin. The checkpoint is `HurricanePlatform_before_surround.blend`
(not for git).
- **`tools/port_surround.py`**, per side wall:
  - **Uprights**: from the frame outline to a 1.30, at the band face (6.25), PaintedMetal_Darker, with a 1 cm
    bevel on the outer edge (the posts' bevel is 1 cm too). The outer wall runs down to 6.17, under the plate.
    They are laid over the wall, as vanilla stacks its plates, so the plate and strip stay hidden under them.
    The 36 notch walls per side in their span go, and the uprights' inner walls (6.205 to 6.25) replace them.
  - **Textures**: the upright faces use the band face's UV map, so band and upright read as one piece. The
    outer bevel and wall, and every wall round the frame outline, take that map folded over their edge.
  - **Band step**: across the centre bay the dark band / light strip boundary moved from |b| 1.0639 to 1.1439,
    top and bottom, with a slanted jog from a 1.74 to 1.85 (the vanilla outer jog's run). It is a material change
    on the flat face; the Atlas4 lines over the boundary moved with it.
  - **Decals**: the access panel's port-side edge moved another 30 cm out, to 4 cm off the upright. The corner
    vents' two inner slots moved onto the upright's face, centred across it, at 6.2578. The outer slot was
    dropped: past the upright the post's gusset covers the strip, and a first try that moved all three slots
    out hid them under it.
  - **Gussets**: the post gussets' port-side ends (|a| 1.3497 to 1.3588, over the strip) moved 5 cm out to
    butt the uprights, 33 vertices per corner. Widening the uprights had left a 5 cm stub of strip between
    them. `fix_uvs` from `HeavyTurretMount/tools/build_sides_optionA.py` keeps their texture density.
  - Platform now has 11,876 faces.
- **Checks**: 7,500 rays per side round the uprights, straight and at 31 degrees, found no hole. No decal is
  under an upright. The 32 Atlas4 faces under the truss diagonals at a 2.66 are inherited from the vanilla
  platform. `finish.py`: no Platform triangle left broken; the inherited leftovers are unchanged.
- **Critic review, round 1**:
  - Taken: uprights 0.25 to 0.30 m (the owner's markup), the panel edge, and the vents centred.
  - Settled by measurement: the band under the port is as deep as the band above it (14.4 cm dark, 10.6 cm light
    at both). The posts' bevel is 1 cm, the same as the uprights'. The tint on the uprights' outward edge comes
    from the lighting, and the posts show it too.
- **Critic review, round 2**: every change landed and nothing got worse. The gusset stub (above) was fixed.
  Its verdict: ready for the owner's in-game look. One point left for the owner: at the port the dark band is
  15 cm against 30 cm uprights. If it still looks thin in game, narrowing the light edge strip there (10 cm) to
  about 6 cm would give about 19 cm of dark band.
- **Export**: same warnings as before (W002 on `Pl_TopDec_Atlas2`, W006 on the `mk_` markers).
- **Not tested in game yet.**

## 2026-11-08: port surround from the owner's mockup

Before seeing the H-frame in game the owner drew a better idea over a screenshot: the port's frame becomes the
dark border, the centre bay one paintable field, and the truss members run on to the frame. The H-frame round is
in `HurricanePlatform_before_mockup.blend`; this round starts again from `HurricanePlatform_before_surround.blend`
(neither for git). `tools/port_surround.py` was rewritten; per side wall and half:
- **Kept**: the band step from the first round.
- **Removed**: the bay post (a 1.70 to 1.905) with its side walls down to 6.08, its top gusset, and the raised
  plate (6.2087) over the centre bay with the access panel on it. The vanilla wall plate (6.15) behind them shows.
- **Chords**: the doubler bars' ends move from a 1.885 to the frame (`fix_uvs` keeps the texture density). The
  frame's side walls reach n 6.214, so they cover the bars' ends (6.21) and no end cap is needed.
- **Corner pieces**: at band height (6.25) in each band/frame corner. The edge is the vanilla band's curve
  into the corner post at the wall's far end (a 4.86 to 5.18, four segments at 9, 21.6, 36 and 48 degrees),
  scaled by 0.926 so it runs from the band's lower edge at a 1.2928 to the strip's lower edge (0.755) at the
  frame. The band's rounded bevel (0.57 and 0.97 cm) runs round it, mitred at each vertex; the top is a fan of
  faces because the curve bows toward the frame's corner. The band's bevel and wall are cut along the mitre at
  the curve's start, and the strip's and the bevel's notch walls round the frame's corner are replaced by the
  piece's own (to 6.205, behind the frame face).
- **Brace**: the vanilla diagonal's section: top 0.258 m at 6.2307 (measured between the gussets at a 3.3 and
  3.45, and as the top face's end along the gusset chamfer), 1.5 cm 45 degree bevels, walls to 6.14. It starts
  2 cm inside the bottom gusset's chamfer, at its middle, and ends on the frame's side with a cap from 6.205 up.
- **Bottom gusset**: one piece, top 6.2515 with a 1 cm bevel and walls to 6.14: the vanilla truss gusset's
  outer half mirrored about a 1.9812, so it is symmetric like the vanilla gussets. The faces it replaces (within
  1.05 cm of the old or the new outline) go. The top keeps the truss gusset's UV map. Decals as on the vanilla
  top gusset, turned over: an outline groove in three rows (insets 2.52, 3.41 and 4.58 cm), a centre seam with
  pointed ends in the groove, the top gusset's two vents turned 180 degrees, and its screw at the wide end's
  corners and either side of the seam.
- **Vents**: the corner vents keep their outer slot (a 1.24 to 1.33) where it was; the curve covers the
  inner slot and would crowd the middle one.
- **Seams**: the plate seam at b 0.38 to 0.41 runs on from a 1.641 to the frame; the one at -0.38 to -0.41 now
  ends at the gusset's corner (a 1.662).
- The four side frames' paintable slot is now PaintedMetal_Darker; the bottom frame stays paintable.
- Platform now has 9,277 faces.
- **Checks**: 15,000 rays per side over a 0.95 to 2.75, straight and at 31 degrees: no hole and no back face (a
  first run found the post's side walls, which went below the delete's n 6.1 limit). The only decals under
  geometry are the vanilla seam strips at b -0.4, under the gusset's bevel as before. `finish.py`: no Platform
  triangle left broken. The four sides differ only in vanilla triangulation.
- **Critic review, round 1** (against the mockup, overlaid at its own scale, and the vanilla bays):
  - Taken: the gusset was lopsided (its centre-side chamfer was the post gusset's, 5 cm longer than the
    vanilla one) and is now symmetric, which matches the mockup within 1.5 cm. The 45 degree corner edges
    became the vanilla curve, which the mockup also draws. The corner vents went from two slots to one.
  - Not taken: widen the brace to 0.318 m. That figure came from a slice through the notch where the vanilla
    diagonal meets the plate seam; between the gussets its face is 0.258 m, so the brace was narrowed to that.
    Also not taken: bringing the frame's rim forward to the bands. The bands already ended that way at the
    frame in the version the owner saw in game.
- **Critic review, round 2**: the gusset, the curves (within 3 to 5 px of the mockup) and the vents landed, and
  nothing broke. The brace was wrong: read from the mesh, the vanilla diagonal's middle span (between the plate
  seams) has a 0.316 m flat top with 1.5 cm bevels; 0.258 m is only its end pieces past the seams. Fixed in the
  next round.

## 2026-11-09: side shrouds removed (owner review)

The owner did not want the grey shroud (the vanilla `LargeConveyorFrame`) round the yellow port on the sides at
all; darkening it did not match the mockup. Of the layouts offered the owner picked "Lintel/sill + lower jambs".
The checkpoint is `HurricanePlatform_before_shroudremoval.blend` (not for git). `tools/port_surround.py`, per
side:
- **Shrouds**: `Pl_PortFrame_F/B/L/R` and their meshes are removed. `Pl_PortFrame_D` (the bottom port) stays.
  No detector highlights a frame (the conveyor detectors highlight the ports).
- **Outline**: the 47 notch walls round the old outline (and the doubler's end faces moved onto it) go; the new
  pieces fill the outline, so those walls would sit inside them.
- **Lintel and sill**: at band height (6.25), from the corner pieces' lower edge (b 0.755) to the outline,
  sharing the band's and the corner pieces' vertices on it, with the band's UV map. The band's rounded bevel
  runs along the lower edge, mitred with the corner piece's at its end (s 1.004), and a wall runs down to the jamb.
  The corner pieces' notch walls at the old shroud's side are gone.
- **Jambs**: at the strip's height (6.225), from s 1.0 in to the port's bevel, and across under the lintel and
  over the sill (a 2.5 cm ledge), so the port's top and bottom corners are real steps. The outer edge has the
  band's rounded bevel and a wall down to 6.14, behind the plate. One UV map (the top band's) for the whole jamb,
  so the paint runs on across b 0.
- **Port bevel**: 4 cm at 45 degrees from the jamb's inner edge down to 1 mm inside the port's outer wall, at
  n 6.184. It follows the yellow port's outer wall exactly (`PORT_Q`: straight at 0.6804, a 45 degree chamfer,
  and a short bend at each end of it), moved out 4 cm for the jamb's edge. A first build used a sharp chamfer
  and left a see-through triangle (about 7 x 4 mm) at each bend, 32 in all (critic, round 3).
- **Brace** (owner, 2026-11-09: "The angled braces should still have their scalloped edge just like all of the
  others"): it is now the vanilla truss diagonal beside the bottom gusset (64 faces, s 2.31 to 3.69), read before
  anything changes and mirrored about the gusset's centre (s 1.9812). It is cut at the jamb's outer wall and
  closed with an end cap. Its middle span is 0.316 m flat with 1.5 cm bevels. By the gusset its port-side edge
  steps in through the vanilla curved scallop to a 5 cm chamfer (top 0.258 m); vanilla does the same at both ends
  of each diagonal, at b +-0.36. It keeps the vanilla UVs. It sits on the gusset where the vanilla diagonal sits
  on its own gusset: 3.8 cm of chamfer shows above it.
- **Keypads**: the vanilla housing leans 15.5 degrees to sit on the shroud's sloped inner edge. On the flat jamb
  it now stands flat, centred across the jamb (s 0.745 to 0.965), its top where it was (6.2499, inside the
  block). Housing, keypad and terminal detector moved together; the detector still covers the whole keypad. The
  first pass left the housing's top at 6.252 (critic, round 3); a second pass, which the build now ends at,
  changes nothing more.
- Platform now has 9,793 faces.
- **Checks**:
  - 15,000 rays per side over s 0 to 2.75, straight and at 31 degrees: no hole and no back face.
  - 36,000 rays per side round the port's corner bends: no hole.
  - The only decals under geometry are the vanilla seam strips at b -0.4 under the gusset's bevel, as before.
  - `finish.py`: no Platform triangle left broken.
- **Critic review, round 3** (against the mockup at its own scale, and the vanilla wall):
  - Fine: the heights and rounded bevels match the band and strip. The corner curves, the lintel's edge and the
    steps at the port's corners meet cleanly. The keypad sits deliberately, there is no z-fighting, and all four
    sides are alike.
  - Taken: the corner pinholes and the keypad height (above).
  - Brace 4.4 cm low against the mockup: settled by the vanilla copy instead (above). The owner drew the mockup
    by eye (owner, 2026-11-09).
  - Not taken: the brace's top (6.2307) stands 5.7 mm above the jamb (6.225), so a 1.5 cm end face shows toward
    the port. Every vanilla diagonal ends against a taller member; it shows only at an angle.
  - Seams: none needed. Vanilla puts Atlas4 lines on band faces (the line at |b| 1.13 to 1.15 already crosses the
    lintel and sill), gussets and the wall plate, never along strips, posts or diagonals.
- **Export**: same warnings as before (W002 on `Pl_TopDec_Atlas2`, W006 on the `mk_` markers). The `.mwm` has the
  terminal detectors at the jamb's centre (u 0.854), facing straight out.
- **Not tested in game yet.**

## 2026-11-09: service trenches, black embrasure (owner review)

Owner: "add a notch into the moat on the top of the plinth to incorporate the electrical and hydraulic supply boxes
at the ring ... lowered down to the level of the darker grey moat", then, on the overlay: "the width around the box
is fine, but it should go all the way to the ring". Checkpoint `HurricanePlatform_before_moatnotch.blend`.

- **`tools/moat_notch.py`** (new; runs after `port_surround.py`, before `finish.py`). On each side:
  - The deck is cut 6 cm clear of the box (|y| 0.328 at the deck, 0.32 at the wall), from the moat in to u 4.50,
    inside the slew disc's skirt (r 4.6), which hides the inner end.
  - The trench has the moat's profile: the 8 mm 45 degree bevel, a dark wall down to -1.285, and a dark floor
    joined to the moat's, with the moat floor's UVs.
  - The moat's inner bevel mitres round each corner of the trench.
  - The deck's Atlas4 trim line beside the moat turns at each side of the trench (mitred) and runs along it to
    u 4.55, under the disc, with the same across-the-line UVs.
- **Service gear**: the boxes, gauges, pipes, valves, conduits, rings and their decals drop 3.5 cm onto the trench
  floor.
- **Screw decals**: 6 screw faces on the conduit clamps and pipe manifold had stayed where the gear stood before
  `assemble.py` moved it inward. `assemble.py` now moves each gear decal with the part under it (the conduits'
  steps on the power side, the pipes' on the pressure side); the saved file got the same correction once.
- **Embrasure** (owner: "a very dark or maybe even black metal texture", picked `BlackMetal`): the 7 embrasure
  faces of `Gunhouse` behind the trunnion drums are `BlackMetal`, as on the Hurricane (its build-log, round 38);
  the roof's dark patch stays `PaintedMetal_Darker`. Same geometry as the Hurricane's Gunhouse. Checkpoint
  `HurricanePlatform_before_cradle.blend`.
- Platform 9,793 to 9,829 faces.
- **Checks**:
  - No open edges or duplicate vertices in the trench.
  - After `finish.py`, the trim strips clear the deck by at least 0.98 mm after the game's rounding. The only
    triangles left broken are the 4 tilted gauge-decal triangles, inherited from the Hurricane gear (first build).
  - Renders: both trenches from above and at an angle, the gear on the trench floor, the black embrasure.
- **Export**: same warnings as before. Dummies unchanged.
- **Not tested in game yet.**

## 2026-11-09: ring trench, ordnance placard, hatch pocket, Keen's panel line (owner review)

Owner: "I want the trench to also surround the turret ring with the same width as the rest of the top. The panel lines
should follow it as well. Ensure the main panel lines we are using is the same decal that keen uses on their blocks
(other than the weld lines)". On the overlay: "Build as drawn, drop the vents", with access-panel decals elsewhere on
the top plates. The first decal options looked "slapped on", so: "a recessed pocket for one larger door/hatch style
decal for an asymmetric look. Also get rid of the TYPE A decal and change that to something else". Midway the owner
chose this base for the Hurricane: "I'm extremely happy with the new plinth design, I've decided I want to use this
model going forward" (design.md, Open).

- **`tools/ring_trench.py`** (new; after `moat_notch.py`). Checkpoint `HurricanePlatform_before_ring.blend`.
  - The ring trench runs round the slew disc, in 64 sides like the disc, its floor as wide as the moat's (18.2 cm,
    out to r 4.782). It has the moat's 8 mm bevel up to the deck at r 4.79 and a dark wall.
  - The deck, and the service trenches' floors, flank bevels and walls, are cut along the outline and along r 4.55
    under the disc, and the part between goes. Cut lines left across a kept face are dissolved again.
  - The trim line (Atlas4 piece 3) runs round the ring as far from the edge as by the moat, mitred into the service
    trenches' flank trims, which now end there. The 8 deck lines that crossed the ring end on it in pointed T-joins.
  - The 8 small vents (`Atlas3_Colorable`) beside the disc are gone.
- **`tools/deck_placard.py`** (new). It replaces the TYPE A data plate in `Pl_TopDec_Atlas2`. The owner picked the
  ordnance label from four mock-ups, then asked for "its own background and trim border", then colour scheme 2 of
  two. Checkpoint `HurricanePlatform_before_placard.blend`.
  - The plate, `Pl_Placard` under `Platform`, sits at (-3.9, 5.22). It is 0.91 x 0.49 m and stands 22 mm proud,
    with chamfered corners. Its 3 cm `PaintedMetal_Darker` bezel has 6 mm chamfers and a darker bolt (Decals 7) on
    each corner, round a `BlackMetal` field 6 mm lower.
  - The Atlas2 pieces lie side by side on the field: hazard bands (66) top and bottom, then the shell icon (53), the
    AMMUNITION label (52) and the explosive diamond (19). The text reads from the +Y edge.
  - Keen's panel line runs round the plate's foot on the deck, 44 to 63 mm out, mitred.
- **`tools/hatch_pocket.py`** (new). Checkpoint `HurricanePlatform_before_pocket.blend`.
  - The pocket sits at (4.85, -3.30), diagonally across from the placard. Its deck edge is 0.69 x 1.02 m with 3.5 cm
    chamfered corners. It has the moat's profile: the 8 mm bevel, a dark wall and a dark floor at -1.285.
  - The hatch, the hinged lid (`Atlas3_Colorable` 31, the owner's pick of four), is 0.625 x 0.95 m on the floor,
    with 2.5 cm of floor all round.
  - Keen's panel line runs round the pocket on the deck, as by the moat.
  - Running the script again only swaps the hatch decal.
- **Panel lines**: Keen's Atlas4 piece 3 in the paint's variant replaces Paneling 51 everywhere. Weld beads (55)
  stay.
  - The turret's seams come from the Hurricane's scripts (its build-log, round 39). `GH_Dec_Atlas4_Colorable_Az`,
    `GH_Dec_Atlas4_Darker_Az`, `SensorDomeDec_Atlas4_Darker` and the rebuilt `GH_Dec_PanelingColorable_Az` and
    `GH_Dec_PanelingDarker_Az` (welds only) are copied in; `SensorDomeDec_PanelingDarker` is gone.
  - The kept deck decals take the same change in place: the disc's 12 seam faces move to
    `Pl_TopDec_Atlas4_Colorable`, which empties `Pl_TopDec_PanelingColorable`. The 16 lid and door seam faces on
    the gear boxes move to `Pl_TopDec_Atlas4_Darker`.
  - The UVs move as the Hurricane's do: V onto piece 3's box, U 2.441 times. Checked against its rebuilt deck
    decals.
- Platform 9,829 to 10,186 faces.
- **Checks**:
  - No new open edges or duplicate vertices at the ring or the pocket. The only open edges near the pocket are
    vanilla edges under the deck, unchanged from the checkpoint.
  - After `finish.py`, every decal clears its surface by at least 0.5 mm after the game's rounding: the placard
    0.98 mm, the hatch 1.46 mm, the deck's moved seams 1.22 mm. Still broken: the 4 gauge triangles (first build) and
    3 weld-bead triangles on `GH_Dec_PanelingDarker_Az`; that object had 4 before this round.
  - Renders: the ring from above, the placard, the four hatch options, two three-quarter views of the whole block.
- **Export**: the same warnings as before (W002 `Pl_TopDec_Atlas2`, W006 `mk_` markers). Dummies unchanged.
- **Not tested in game yet.**

## 2026-11-09: cargo hatch, deck paint, deck rivets, service gear (owner review)

- **Placard and hatch** (owner: option A, "make the hatch larger so the width matches the placard width, then remove
  the panel seam line from around the placard, and move them a little closer together"). Checkpoint
  `HurricanePlatform_before_cargohatch.blend`.
  - `tools/hatch_pocket.py`: the pocket is 0.914 x 1.356 m at the deck, at (4.85, -3.178); the lid 0.848 x 1.29 m.
  - `tools/deck_placard.py`: the placard moves to (4.85, -4.233), below the pocket on the lid's handle side, 13 cm
    from it, and reads from -Y. Its panel line is gone: 5 trim faces by height, and 3 more by index (10161-10163)
    that `finish.py` had snapped off the 0.2 mm tolerance.
  - The owner saw the lid already lay on its own darker metal. So the pocket's bevel, walls and floor (19 faces,
    with their UVs) leave `Platform` for `Pl_CargoHatch_section_1`, and `detector_inventory_1` highlights it:
    0.934 x 0.090 x 1.376 m, centred on the pocket at the deck. The lid decal stays in
    `Pl_TopDec_Atlas3_Colorable`. All 45 of the pocket's edges have two faces, so the cut is sealed.
- **`tools/deck_cleanup.py`** (new; owner: "All of those cuts make the textures rotate at different directions").
  Checkpoint `HurricanePlatform_before_deckclean.blend`.
  - The decks were built as one quarter turned four times, so their paint UVs were turned per quarter. 1,027 paint
    faces that look up from the top deck or down from the bottom one (bevels included) get one planar map,
    u = 0.4 x + 0.37, v = ±0.4 y + 0.37. The hatch's 10 floor and bevel faces get the same. Checked with a grid
    texture.
  - 401 edges between flat faces of one material on one plane are dissolved (limited dissolve at 1.5e-3; at 1e-4
    it took only 10 faces), then 100 straight-run vertices. Platform 10,158 to 9,804 faces. About 12 sub-mm²
    slivers remain along the ring's curve; they are flat and on one material.
- **`tools/deck_rivets.py`** (new; owner: "more corners and more evenly", option A, corners only, from a mock-up
  of corners and corners plus rows). Checkpoint `HurricanePlatform_before_rivets.blend`.
  - `Pl_DeckRivets` (`Atlas3_Colorable` 14, 44 mm) holds every deck rivet: 128 top, 120 bottom. The vanilla ones
    leave `Platform` for it. Each corner gets one, 5.5 cm from both lines' centres, on the bisector at 135 degree
    corners; band rows stay 3.6 cm in from the edge.
  - A ray from above (below, on the bottom deck) must find plain deck paint at the centre and 26 mm round it.
    None was dropped. Each is turned to a random angle, seeded by its position.
- **`tools/service_gear.py`** (new; owner: "shorten the supply boxes, then move the pressure gages ... and then
  adjust the conduits"; boxes lowered to 17 cm, the owner's pick). Checkpoint `HurricanePlatform_before_gear.blend`.
  - Both boxes drop 8.2 cm: tops at -1.115. Their top decals come down; side decals keep their gap under the top
    chamfer, and the e-stop and the power box's outer-face plate shrink a little to fit.
  - The gauges and their dials turn 180 degrees about the pressure box's axis and drop with it: x -5.704 to -5.676,
    z -1.246 to -1.134. The warning plate on that face turns onto the box's bare -Y side.
  - The pipes rise 5.3 cm (-1.289 to -1.038, wheels to -1.028) and the conduits 3.6 cm (-1.289 to -1.147, rings
    -1.283 to -1.207). The two clamp bars and the junction block, the parts wider than 35 cm, keep their feet at
    -1.289 and grow at the top. UVs refitted per face, so the stretched faces keep their texel size.
  - The first run stopped on an error partway, after it had changed meshes; the file was reverted to its save
    and the fixed script run again.
- Platform 10,186 to 9,636 faces.
- **Checks**: after `finish.py`, the same 4 gauge-dial triangles are still broken (first build). The export has
  the same warnings; `mwm_dummies.py` shows `detector_inventory_1` with `highlight=Pl_CargoHatch_section_1`.
  Renders: placard and hatch moves, rivet options, seams top and bottom, the gear from both sides.
- **Not tested in game yet.**

## 2026-11-09: rivets at plate corners only, seam joins (owner review)

- **Rivets** (owner: "you have a lot that of old ones that are not actually at any corners, and you have extra new
  ones that are also not at any corners"). Checkpoint `HurricanePlatform_before_rivetfix.blend`.
  - Checked against the seams' real centre lines (the earlier plan used assumed ones): 40 rivets a deck sat by one
    line only. 16 were the vanilla clamp-bridge rivets, between the moat's ends; 24 were new, on the band's inner
    row, where the moat does not reach (at the clamps it is bridged, at the corners it turns diagonally).
  - The owner approved a mock-up. `tools/deck_rivets.py` now places only corner rivets: the band plates get theirs
    at the deck edge by each clamp and corner line and where each clamp line meets the frame line (16 new a deck).
    The clamp line's centre is measured at 3.741, so its deck-edge pair moves to 5.5 cm from it (was 5.1 and 6.6).
    The corner plates' vanilla rivets are rebuilt in place.
  - 248 to 200 rivets (top 104, bottom 96). None dropped by the paint check. A check against the seams finds every
    rivet near two lines, or a line and the deck edge, 5.3 to 5.6 cm from each line.
- **Seam joins** (owner: "do another look at the seam decal mitres"). Close-ups of every join type on both decks
  showed mitred corners and pointed T-tips, with three flaws; the owner said "Yes, fix those".
  - The ring trim's 8 T-tips showed a light sliver. The decal snap rounds each vertex in the face's plane too (the
    game stores positions that way), so on the short tip faces U no longer ran along the strip and the groove's
    shading turned. A check found 69 deck seam faces off by more than 3 degrees (up to 30).
  - The tips also lay on the ring trim at the same stored height (z-fighting in Blender), as did the bottom deck's
    clamp T-tips (16 half strips) and cross-arm T-tips (8). Each stem already comes after its cross line in the
    mesh, so it draws on top in game.
  - The bottom cross arms stopped square at the port surround.
  - `tools/deck_seams.py` (new): `caps()` ends the 8 cross-arm lines in a point on the surround's edge. `lift()`,
    run by `finish.py` after the snap, moves 64 stem vertices on their cross lines one stored step out (32 stems).
    `unshear()`, run after that, sets U along the strip on 147 Platform deck seam faces and 18 on the gear boxes'
    lids and the disc. V is unchanged.
  - The first `finish.py` run stopped in `lift()` on a mitre overlap (no stem vertex on the other line) after the
    snap had run, so the file was reverted to its save and the three steps run again with such pairs skipped.
- **Checks**: no deck seam face is off by more than 0.5 degrees, and no two deck seam faces overlap at the same
  height. Close-ups before and after at the same joins, 7 cm and 25 cm across. `finish.py` leaves 3 broken
  triangles, all weld beads on `GH_Dec_PanelingDarker_Az` (the gauge-dial ones are gone). The export has the same
  warnings; `detector_inventory_1` is unchanged, and the new port cap vertices are in the `.mwm`.
- The block's side faces keep the vanilla platform's seams, which use their own UVs (some with one U on all
  corners); they are not changed.
- **Not tested in game yet.**

## 2026-11-09: jambs raised over the braces (owner review)

- **Owner, from an in-game screenshot:** the port surround "needs to be pushed outward a bit so it sticks out more
  than the 45 degree beams on its sides". The jambs (6.225) were under the braces (6.2307); in game, where
  positions here are stored on a 5.9 mm grid, the braces stood one step (5.9 mm) over them. The jambs can rise
  1.5 cm before they meet the foot of the lintel's and sill's rounded edge. The owner picked that height, over one
  step up or flush with the lintel. Checkpoint `HurricanePlatform_before_jambraise.blend`.
- `tools/port_surround.py` `raise_jambs()` (new, run after `surround()`):
  - It moves 48 jamb faces a side out 1.54 cm: the top, the outer rounded edge and the bevel to the yellow port.
    The bevel's foot stays under the port's rim.
  - The lintel's wall under its rounded edge closed to nothing, so it goes. The edge's face takes the jamb's
    vertices along its foot, so no edge ends in the middle of another.
  - The keypads and terminal detectors move out with the jambs.
  - The first run also took the other half's vertices on the same line into that face (faces on three-way edges).
    The file was reverted to its save, and the run repeated with an along-the-edge test.
- **Keypad screws:** the two screw decals on each housing's top plate floated 1 to 1.8 cm over it, past the snap's
  reach, so the snap had rounded them where they were. After the move they passed the block face by 2 cm.
  `seat_screws()` sets them 1.5 mm over the plate, and the snap puts them one stored step over it.
- **Checks:** no three-way edges, 12 fewer open edges a side, and a second `raise_jambs()` run changes nothing. A
  second `finish.py` run moved only the keypad screws; the lift and the U fix found nothing to do. In game the
  jamb is at 6.2402, the braces at 6.2285 and the housing plate at the band face (6.252). The export's bounds are
  6.258 across the sides (the screws); it has the same warnings and 17 dummies, with the terminal detectors 1.5 cm
  further out.
- **Not tested in game yet.**

## 2026-11-09: handwheel texture, shading pass (owner review)

- **Handwheels** (owner: "the textures on the red hydraulic handles are messed up"). `service_gear.py` refitted
  every face's UVs on x, y, z and 1 together after its move. On small faces 4 to 5 m from the origin that fit is
  ill-conditioned, so the 5.3 cm lift threw the wheels' UVs out to 1e5 (they were in `ClangCola`'s red patch, 0.28
  to 0.41). It also slid the pipes' texture by up to 4.7 UV, the conduits' by 2.5 and the box tops' by 0.5.
  - `remap()` now leaves a face that only moved as it was, and fits a stretched face's UVs in its own plane.
  - Repaired in place from `HurricanePlatform_before_gear.blend` with the new rule: the six gear meshes have the same
    topology there. 8 box faces, 8 clamp faces and 16 conduit faces are stretched; the rest keep their old UVs.
    Checkpoint `HurricanePlatform_before_gearuvfix.blend`.
- **Shading pass** (owner: "a full shade smoothing pass on the base"). Checkpoint
  `HurricanePlatform_before_shadepass.blend`.
  - Keen's platform, measured before any GVK change: smooth up to 60 degrees, mostly up to 70, hard at 90. Large
    faces dominate the shared normal. Many of his normals are blends that equal no face's.
  - Rules tried against his 25,816 corners: area weighted 36% within 2 degrees; area cubed 78%; largest face only
    83% within 2 but 83% within 6; flat-region area cubed 81% and 86%, keeping 95% of his flat corners. Paint
    boundaries made no difference.
  - `tools/shade_pass.py` (new, after `finish.py`): smooth under 65 degrees, each face weighted by its flat region's
    area cubed, corners joined by position. On Platform, Keen's shaded corners stay, and a new corner whose fan meets
    one takes his normal. That first left 674 seams where the two met; now 64 over 15 degrees remain, at tiny faces.
    Before that, the jamb tops' 2.5 cm strip above each port took the larger port bevel's normal and shaded dark;
    weighting by the flat region, not the face, fixed it.
  - Changed corners: Platform 1749, disc 1024, gear 1352, hatch pocket 52, placard 88. A second run changes nothing.
    The vanilla ports, port frame and keypads, and the turret, are not touched.
- **Checks:** renders of the wheels, the gear, the port surround, the lintel corner, the deck corner and the ring
  trench. The export has the same warnings and 17 dummies, with 105,681 vertices (106,363 before): smoother shading
  merges vertices.
- **Not tested in game yet.**

## 2026-11-09: seam ends, bottom port wall (owner review)

- **Seam ends** (owner: "I still see a number of panel seam decals that are not properly mitred", on the top deck,
  bottom deck, side walls and slew disc ring). Checkpoint `HurricanePlatform_before_seamends.blend`.
  `tools/seam_ends.py` (new, after `service_gear.py`):
  - `ring_lines()`: the disc ring's 12 radial lines stopped 1.5 cm short of its edge. They now run on over the
    chamfer and down the disc's side to the ring trench floor (owner: "the seams on the plinth turret ring should go
    all the way and wrap down to the top surface of the plinth"). The four that cross a facet edge of the 64-sided
    disc are split along their centre, half on each facet.
  - `fill_notches()` closes the 16 V notches left in the side bands' lines where a removed post's line met them.
  - `brace_ends()` runs the 16 truss brace lines straight on to the band's foot, in place of their broken end
    triangles.
  - `close_crossings()`, run by `finish.py` after the snap: where a line crosses an edge, its two faces share corners,
    and the snap moved each copy off its own face, up to 6 mm apart, so the line broke at the edge. Each group of
    copies now moves to the copy furthest out.
- **Bottom port** (owner: "I can see through the textures inside the plinth block at some angles"): the port frame's
  outer bottom edge is rounded 1 cm, which left a 1 cm slot between it and the deck opening's edge into the empty
  block. `tools/port_skirt.py` `skirt()` (new, after `cargo_ports.py`) stands a 2 cm wall on the opening's edge,
  facing the port, in the deck's paint.
- **Not tested in game yet.**

## 2026-11-09: cheek seams, gunhouse rivets (owner review)

- **Cheek seams** (owner, with a marked screenshot: "there is a seam on the gunhouse cheeks that I'd like to continue
  all the way down"). Checkpoint `HurricanePlatform_before_cheek.blend`. `tools/cheek_seam.py` `cheek_lines()` (new):
  below the embrasure (z 0.68) each cheek's seam runs 0.99 m on down the corner with the chin to the glacis' bottom
  seam, as the half of the groove that shows on the cheek, joined to the old end and with its U carried on. It ends
  in a mitre 1 mm over the bottom seam. 12 faces a side; after the snap they stand 1.5 to 3.6 mm off the hull.
- **Rivets** (owner: "replacing the really large rivets with something more toned down and keen-styled"; picked
  "sunken head at 65mm" of four mock-ups). Checkpoint `HurricanePlatform_before_rivets.blend`.
  `tools/rivet_heads.py` `heads()` (new): the gunhouse's 331 dome heads, all 90 mm (260 GVK paintable rivets and 71
  of the Decals sheet's plain dome), are Atlas3 piece 14 at 65 mm, at the same centres and turns, in
  `GH_Dec_Atlas3_Colorable_Az`. The GVK rivet object is gone. The Decals object keeps its two plates.
- **Not tested in game yet.**

## 2026-11-09: z-fighting (owner review)

- **Owner, from an in-game screenshot:** "you have some bad z-fighting to fix, at least on the bottom of the bustle
  dome". Checkpoints `HurricanePlatform_before_overlaps.blend`, `HurricanePlatform_before_overlaps2.blend`.
- Every solid triangle in Main was checked for another in the same plane facing the same way, as modelled and again
  with the game's vertex rounding (3 mm steps at the gunhouse, 5.9 mm at the side walls). It found:
  - the sensor dome's bottom disc on its flange's bottom disc (the owner's screenshot), and the rear feed tube's end
    cap on its flange;
  - each side box sensor's lens on its bezel disc, and the periscope's lens on its window disc;
  - on each side box a corner split into two vertices 5.9 mm apart, with tiny folded faces the bevel laid over each
    other; SideBox_R was split differently from SideBox_L;
  - on each side wall, Keen's two foot triangles kept under each 45 degree brace's new quad, joined to nothing (16);
  - in each keypad frame, the recess floor and the round of its edge 1.4 to 2.3 mm behind the jamb face that covers
    them, which the rounding lays into the jamb's plane (20 faces a frame).
- `tools/overlaps.py` `fix()` (new, before `finish.py`): the dome's disc and the tube's cap go, each bezel and window
  disc becomes a ring round its lens through the lens rim's own points, SideBox_L's pairs weld and SideBox_R is
  rebuilt as its mirror, and the foot triangles and the hidden keypad frame faces go (with their normals kept). A
  second run changes nothing.
- **Left:** Platform's own 43 (Keen's original mesh has the same ones, 37 at its corners at z -2.9), and 5 tiny faces:
  two of the feed pipes' inside the handwheels (34 mm²), one on each side box's bevel (5 mm²) and a sliver of the
  rear recess back 0.4 mm wide.
- **Checks:** `finish.py` and `shade_pass.py` find nothing more to do (the snap still leaves the 3 weld-bead
  triangles). Renders of the keypad and both side boxes. The export has the same warnings and 17 dummies, 106,127
  vertices.
- The Hurricane's own build scripts (`Source/HurricaneTurret`) still make these turret faults.
- **Not tested in game yet.**

## 2026-11-09: custom atlas dropped, corner post tops, roof seam joins (owner review)

- **Owner:** "looks good, we can get of the custom atlas since we won't use that any more. also you need to fix some
  seam miters on the gunhouse roof in multiple places around the large chrome panels", and on the old turret
  preview, "Drop the old preview".
- **Custom atlas:** the GVK rivet textures and their script are gone from `Source/HurricaneTurret` (its build log
  has the detail) and the material from this file. The preview mod holds only the platform preview now.
- **Corner post tops** (owner, from an in-game screenshot: "you have some broken surfaces at the top of the side
  edges on all 4 corners"): `build_platform.py` widened the posts by moving their vertices along the wall, but
  each post top's bevel ring shared vertices that moved with ones that did not, so some triangles stretched over
  others and some gaps looked into the block. `tools/post_tops.py` `tops()` (new, after `build_platform.py`)
  removes each ring and cap (42 faces a corner) and builds them again on the widened outline (24 faces). Checkpoint
  `HurricanePlatform_before_posttops.blend`. A back-face ray test from four eyes a corner and renders are clean.
- **Roof seam joins** (checkpoint `HurricanePlatform_before_roofseams.blend`). Found:
  - 13 T-joins whose stem tip lay on its cross line at the same height, so Blender drew the two in turn: the dark
    strip's edges on the y 0.8 and front lines, the rear outline's ends on the y 0.8 line, and the outline's own.
    The two front stems were one face from the flat roof over the edge bevel, not flat, so their triangles cut
    under the line.
  - At both front corners the glacis edge line (paint colour) stopped 3 to 17 mm short of the dark front line,
    and its outer corner reached 1 mm past that line's edge.
  - The specks at the front corners were the body showing through: the dark line's flat faces across the rounded
    corner passed up to 0.45 mm under it between their corners. The decal snap reports such faces and leaves them.
    The same fault was on 220 more triangles over the gunhouse (cheek panels, paint lines, rear paneling, sensor
    dome).
- **Fixes:**
  - `tools/decal_dips.py` `lift()` (new, first step of `finish.py`): every decal triangle less than 0.3 mm off its
    surface, and not more than 1.2 mm under it, moves out along its normal to 0.9 mm. The deeper ones (about 40,
    1.2 to 2.5 mm under, low on the glacis and on the rear paneling and deck decals) lie under another part and are
    left for a look.
  - `tools/roof_seams.py` `corner_stems()` (new, before `finish.py`): the glacis edge line carries on up the corner
    to the dark line's edge (4 faces a side, up to 21 mm) and its outer corner comes back onto it. A point on the
    dark line's middle was tried first: the two meet at about 20 degrees, so it was a 38 mm sliver across the curve,
    and rows 4 mm apart came out scrambled by the 2.9 mm position grid at that distance from the origin.
  - `roof_seams.py` `tips()` (new, last step of `finish.py`): the two front stems are split where they enter the
    line, and every stem's corners on its cross line move 0.4 mm up (under half the stored step there, so the game
    rounds them back where the snap put them; 2 corners the snap left lower stay). Each roof seam face's U runs
    along its strip again, in its own plane (the snap had turned it up to 30 degrees on the front corners' small
    faces).
- **Checks:** the seam audit finds one roof face 3.4 degrees off, and overlaps only where the stem tips lie over
  their lines. Renders of the eight joins and both front corners from three sides. The export has the same warnings
  and 17 dummies.
- **Left:** the window frame lines on the glacis end in a curl where they run under the window's top bevel.
- **Not tested in game yet.**
- **Next:** `design.md`, "Remaining steps" (planned 2026-11-09): freeze, real block name, split, then the cull and
  the trim of parts without decals in each scene (owner's pick, about 75,000 triangles), LODs, build stages,
  collision, icon, SBC, in-game test.

## 2026-11-09: freeze, real block name, split into subpart scenes (owner: "Freeze and split")

- **Freeze:** checkpoint `HurricanePlatform_before_split.blend`. The build scripts are retired; from here on every
  change is an edit of the .blend.
- **Name:** SubtypeId `GVK_HurricaneTurret` (SEUT renamed the scene and its collections). The 10 untagged objects got
  their `part` tag from their parent (`Platform`, the `Pl_*` parts and `detector_inventory_1` fixed; the roof's and
  dome's Atlas4 decals az).
- **Split** (design, "Subparts"): four subpart scenes, `large`, bounding box 5 x 5 x 3, `linkSubpartInstances` off in
  every scene. Each object's new matrix (180 degrees about Z, then the move to its pivot) is baked into its mesh, so
  every object sits at its scene's origin under one root. `Mesh.transform` kept the custom normals except on 46
  corners of `GH_Dec_PanelingDarker_Az`, at vertices the snap had put on one spot; those meshes had their normals set
  again from the turned originals (6 corners on zero-area faces stay degenerate). The 7 `mk_*` markers became the
  real empties and were deleted. Each `linkedScene` was set with the crash-safe recipe, one per call, saved between.
- **Azimuth origin moved up:** first on the slew disc (block z -0.9). The re-snap there left 24 of the sensor dome's
  seam triangles broken: over 4 m up, the game stores heights on a 3.9 mm grid. The Az content moved 2.8 m down, so the
  origin sits on the slew axis at the trunnion's height; there the dome's heights are on a 1 mm grid and all its seams
  snap clear. Any point on the slew axis gives the same turn (the game keeps only the empty's position on vanilla
  turret types); not yet seen in game.
- **Re-snap** (`finish.py` `finish_split()`, checkpoint `HurricanePlatform_before_resnap.blend`): dips lift and decal
  snap in each subpart scene, then `roof_seams.py` `tips()` (its `ROOF` is now in the Az frame, and a lift may land one
  stored step up, at most 1 mm, since the step there is 0.6 to 0.7 mm). The first run read the main scene's depsgraph,
  so the subpart scenes' bevels were missing and decals moved against unbevelled surfaces; it was restored from the
  checkpoint and rerun with each scene active. Result: El and both barrels clean; Az has 42 design faults (under the
  surface as modelled, left alone as before) and one weld-bead triangle that rounds under its surface. Roof: 21 stems,
  2 corners not lifted, every stem after its cross line.
- **Checks:** every mesh rebuilt in the block from the subpart chain matches its pre-split world position to 2
  micrometres, and the muzzles, camera and barrel empties to 2 micrometres, so the sweep, recoil, superfire and sweep
  radius numbers carry over. No coplanar solid faces in any subpart scene, as modelled or as stored. Renders of the
  turret rebuilt from the subpart scenes at rest and at +30 degrees with the left barrel 2 m back.
- **Pitfall:** after the file was reopened, the empties in subpart scenes that had not been the active scene read
  `matrix_world` as identity; their `location` was right. One script set an empty from that stale matrix and was
  corrected.
- **Not exported, not tested in game.** Next: the cull and trim in each scene (design, "Remaining steps" 4).

## 2026-11-09: buried-face cull and triangle trim (owner: "Cull + plain parts", then "Ok")

- **Modifiers applied** in every subpart scene, each with its scene active (checkpoint
  `HurricanePlatform_before_cull.blend`, which still has them).
- **Cull** (`tools/cull.py`): a face goes when its centre and every corner, nudged 0.5 mm out, are inside another
  closed part of the same scene (two rays, odd hit count). Decal and glass faces are never cut, and vanilla parts and
  highlight meshes are never cut. Cut: main 210, Az 4,600, El 1,841, barrels 0 triangles; a second dry run finds none.
- **Trim** (`tools/trim.py`, checkpoint `HurricanePlatform_before_trim.blend`): every second ring of the tube grids
  dropped, keeping each tube's end rings and any ring with a crease across it; every second meridian of the 32-sided
  hose fittings. `RearPipes` 11,632 to 6,256 (168 rings), `RearGrilleHandles` 2,544 to 1,344 (50 rings),
  `RearHoseFittings` 2,118 to 1,286. The grille handles are 12-sided and faceted, so a "smooth vertex" test found
  no rings on them; the test is a crease across the ring instead. The feed tube (0.2 m radius, 24 sides) has only four
  rings along its length, so one could go, and its sides were not halved; the vents are slatted plates with nothing
  round to halve. Both stay as they were.
- **Total:** 99,900 to 85,830 triangles (main 24,179, Az 44,440, El 8,931, each barrel 4,140).
- **Checks:** every kept corner keeps its normal (against the checkpoints with their modifiers evaluated: all parts
  match except 4 corners on the periscope, under 0.25, and 68 on flat rear lamp faces, which now face straight out
  where the checkpoint's evaluated normals pointed into the part). Decal gaps after the game's rounding are unchanged
  in every scene. 360 decal triangles on the gunhouse lost the face under them: 359 lie inside the closed gunhouse
  and chin, where the cut `MidSupport` faces were, so neither was ever seen; the last sits on a zero-area chin face.
  Before and after renders of each scene show no holes or shading change.
- **Not exported, not tested in game.** Next: LODs (design, "Remaining steps" 5).

## 2026-11-10: second hidden-face cut (owner: "Do your triangles except the cradle")

- **Candidates** (`tools/hidden_cut.py`, checkpoint `HurricanePlatform_before_hiddencut.blend`): faces with no line
  of sight out of their own scene (2,048 rays from the centre, corners and edge midpoints), in the base (not the
  highlight meshes) and the gunhouse; decals and platform faces inside a closed part (solids from the pre-cull
  checkpoint); each barrel's faces inside the cradle at every recoil position from 0 to 2 m. The cradle is left whole.
- **First cut undone:** it trusted the ray test and opened thin strips along the base's side frames and deck edge.
  The rays stopped on the back of faces, which the game does not draw. The file was restored from the checkpoint.
- **Filter** (`tools/face_id_views.py`): every face drawn in a colour that encodes its index, back faces culled,
  anti-aliasing off (it blended edge pixels into other faces' IDs and inflated the result), from 1,440 ring views and
  260 close views. Of the candidates, 211 base faces and 5 gunhouse faces show at least once and stay; the close
  views added only 12, so the count has settled.
- **Cut:** base 1,614 triangles (the platform 1,458, among them its 48 m2 top face that lay level with the deck faces
  on it, and 11 side faces doubled by others), gunhouse 1,301 (the rear vents, blades, pipes and hose fittings, the
  dome flange, side boxes, and 574 decal triangles sealed inside the gunhouse), each barrel 30 (the rear cap).
  85,830 to **82,855** (main 22,565, Az 43,139, El 8,931, each barrel 4,110).
- **Checks:** every kept corner keeps its position and normal. Decal gaps after rounding are unchanged in every scene.
  Before and after renders (124 views): gunhouse identical; on the base the only changes are thin triangles on the
  deck where the removed duplicate face had been fighting the deck faces for the same pixels (the game would show it
  as flicker), and no pixel shows a removed face in front of what shows now.
- **Pitfalls:** loading and removing one image per render crashed Blender after about 1,400 renders (reuse one image
  and reload it). Renders made right after opening a file differ from later ones while Blender compiles its shaders,
  so compare only renders made after a warm-up set.
- **Not exported, not tested in game.**

## 2026-11-10: top deck shading (owner: "the top right is kinda brighter and the bottom left is darker")

- **Cause:** the platform's two big top deck faces (55.7 m2) kept Keen's blended corner normals through the shading
  pass (its rule: Platform corners with Keen's shading stay). They leaned up to 45 degrees off straight up, 35 on
  average, so the flat deck shaded as if it sloped, in one gradient across 12.5 m. The cuts did not cause it: the
  renders from before them show it too.
- **Fix** (checkpoint `HurricanePlatform_before_deckshade.blend`): those two faces' corners, and the corners of the
  79 bevel faces that share a smooth fan with them, take the shading pass's own rule (`shade_pass.corner_normals`,
  flat regions weighted by area cubed), so the deck is flat and its edge bevels roll from it. Every other corner
  moved under 0.03 degrees. Renders: the deck is evenly lit (`deck_shading_fix.png`, before left, after right).
- **Still flagged by the shading check, not changed:** the slew disc's side band (320 faces, 15 m2, up to 45
  degrees) and 157 side faces of the platform (6 m2, up to 90 degrees).

## 2026-11-10: the other flagged shading (owner: "Yes, check them")

- **Slew disc:** every corner already matches the shading pass's rule (0 off by more than 5 degrees). The lean is
  its two rounded lips, a 45 degree chamfer and the side bands rolling into it; close renders show clean rounded
  edges and no gradient across a flat face. Nothing changed.
- **Platform sides:** 217 corners on 193 faces (2 m2, the largest face 0.07 m2) lie more than 60 degrees off their
  face. All were set by the shading pass of 2026-11-09 (Keen's mesh had them at 0 or 30), none by the deck fix.
  Test: those corners set flat, 70 views rendered (the 62 ring views of the base and 8 close-ups), then the file
  reverted. The only pixels that changed are thin lines along the side rails' 30 degree top and bottom chamfers,
  where flat corners turn the rounded edge into a hard line, so those corners are rounded edges working as meant.
  The few corners a full 90 degrees off (the port jambs' n-gons, 16 strips at z -3.31) changed no pixel in any view:
  they sit behind the port frames. Nothing changed; the file is as saved after the deck fix.

## 2026-11-10: LODs (owner: "Skip tube, start LODs", then "Drop them in LOD2")

- **Method** (`tools/lods.py`, checkpoint `HurricanePlatform_before_lods.blend`): each scene's `LOD1..3` collection
  gets one mesh, `<scene>_LODn`, built from its Main meshes. Per level: decals kept by size and material, pieces
  smaller than a size left out (lamp faces always kept), the rest decimated (collapse) with every vertex under a kept
  decal locked, so decals keep their surface. Distances 40, 120 and 300 m on every LOD collection (SEUT
  `lod_distance`). Rerun the script after any change to Main; it replaces the LOD meshes.
- **Levels:** LOD1 keeps half the shell triangles, decals from 5 cm and every panel line; LOD2 a fifth, decals from
  25 cm, no panel lines, text or buttons (owner's pick: "Drop them in LOD2"), hazard stripes and big signs kept; LOD3
  6 percent, no decals.
- **Triangles** (Main, LOD1, LOD2, LOD3): main 22,565 / 18,611 / 9,034 / 4,256; Az 43,139 / 32,494 / 6,024 / 2,252;
  El 8,931 / 7,018 / 2,007 / 832; each barrel 4,110 / about 2,060 / about 826 / about 243. Total **82,855 / 62,244 /
  18,718 / 7,827**.
- **Faults found and fixed on the way:**
  - The yellow port frames lost their crossbars at LOD2 and folded into a V at LOD3: they keep more (port 0.6 / 0.3,
    frame 0.5 / 0.25).
  - Keen's platform mesh is split at every UV seam (12,119 vertices for 8,674 triangles). Below half its sides bent
    their braces and showed pale patches. Welding it first gave dark bands; welding plus locking the seams gave holes.
    It keeps 0.5 at LOD2 and 0.3 at LOD3.
  - Diagonal wedges on the gunhouse: its shell is already coarse (454 triangles of flat panels) and its dark roof
    strip folded into a sliver. Parts whose triangles average 0.09 m2 or more stay whole.
  - Shading across new long edges: decimated corners take the full part's shading read 3 cm inside each corner.
  - The lamps (Emissive) vanished at LOD3 with the small parts: lamp faces are kept at every level.
- **Checks:** renders of each switch at the game's size (its 70 degree view is vertical,
  `MatrixD.CreatePerspectiveFieldOfView`, so 1080p draws 19, 6.4 and 2.6 px per metre at 40, 120 and 300 m),
  8 azimuths x 2 elevations, share of model pixels that change by more than 0.1: worst view 0.1% at 40 m, 1.8% at
  120 m, 1.9% at 300 m. A first round scored 2.6% at most, but at 1.8 times the game's size and with the guns turned
  round (see the build stages entry, "Render assembly"); it was redone. `lod_levels.png` (full, LOD1, LOD2, LOD3 at
  30 m) and `lod_switches.png` (each switch, before and after). Materials lost are only dropped decals
  and tiny parts (Terminal, CameraLens, ClangCola at LOD3). Every face has real UVs; one degenerate-UV face in Az, the
  same in Main. LOD1's decal gaps match Main's. Each LOD collection holds one object; the empties stay in Main.
- **Not changed:** the feed tube stays at 24 sides (owner: "Skip tube"). Vanilla's own platform LODs
  (`Structural_5_platformConveyor_LOD1..3`, 10 / 45 / 90 m) were not used: they lack this base's ports and decals.
- The LOD collections are hidden in the viewport (they sat on Main). **Not exported, not tested in game.**

## 2026-11-10: build stages (owner: "Start build stages")

- **Method** (`tools/build_stages.py`, checkpoint `HurricanePlatform_before_stages.blend`): one mesh per stage,
  `GVK_HurricaneTurret_BS1..3` in `BS1..3 (GVK_HurricaneTurret)`, block space, the guns at rest. Rerun the script after
  a change to Main; it replaces the stage meshes.
  - **Base:** Keen's `Structural_5_platformConveyorConstruction_1..3`, SEUT import into scenes `KB_BS1..3`, moved down
    to the plinth cell. Their corner posts are widened 12 cm as `build_platform.py` widens the finished ones (48, 536
    and 628 faces). Keen's separate top-centre port pieces are left out, since the disc covers that spot. Keen's own
    UVs and shading kept.
  - **Head:** proxies of the finished parts in `Construction`, box UVs, flat shading: convex hulls of the gunhouse
    with its chin, the bustle and the small parts, corners closer than 10 cm merged. A framed part has its faces split
    into about 1.5 m panels, then each panel inset to 7 cm strips, 2 cm thick.
- **Stages:**
  - BS1: frames over the disc, gunhouse, bustle, rear hatch, drum and barrels. Solid bearing ring, and the load path:
    spokes under the disc top, floor beams under the gunhouse, trunnion pedestals, shaft, a pillar under the mid
    support, and collars where the barrels meet the drum.
  - BS2: the disc solid. Inside the framed gunhouse: drum, cones and barrels solid, the side boxes, the deck's feed and
    power boxes, rear hatch and feed tube, and the sensor dome's flange.
  - BS3: gunhouse and bustle solid, apart from the roof and the front, which stay open frame so the drum shows. Muzzle
    brakes, ridges, periscope, sensor dome, deck pipes and keypads added.
- **Triangles** (base + head): BS1 20,960 + 8,760 = **29,720**; BS2 17,604 + 6,212 = **23,816**; BS3 10,906 + 3,418 =
  **14,324**. Keen's platform stages are most of each; the head stays under 8,800.
- **Faults found and fixed on the way:**
  - The gunhouse frame had strips only round its 8 m faces and looked flimsy beside Keen's dense base frame. Big
    faces are now split into panels first.
  - Panels with a corner under 35 degrees were kept as solid plates and showed as stray shards on the cheek fronts.
    They are now left open, framed by their neighbours' strips.
  - The hull of the rear hose loop filled the loop into a half-moon plate in BS3. The hoses are left out.
- **Checks:** renders of each stage beside the finished turret from three angles (`build_stages.png`: BS1, BS2, BS3,
  finished), close-ups of the front and rear (`build_stages_close.png`) and of a corner post. Every stage fills the
  outline (y -11.58 to 6.67, muzzles to rear hatch). Each BS collection holds one object. No face has zero UVs.
  4 tiny faces in BS2 and BS3 have flat UVs: they are in Keen's own stage meshes, in `Construction`.
- **Not done:** no LODs for the stages (`BS1_LOD1` stays empty). The `BuildProgressModels` bounds (0.33 / 0.66 /
  1.00) go in the SBC at step 10. The stage collections are hidden in the viewport. **Not exported, not tested in
  game.**
- **Blender crash:** a render helper changed collection visibility, then looped over a live object list setting
  `hide_render`, and Blender crashed (`pyrna_prop_collection_iter_next`). The stage build was unsaved and was rebuilt.
  The helper now copies every list first, and the file is saved before each render.
- **Render assembly:** the helper that assembles the subpart scenes for renders turned `_El` and the barrels a half
  turn each, as if each were linked from the main scene, so the guns pointed back over the bustle in the first stage
  and LOD renders, and the first stage proxies copied that. Only the first link (`_Az`, from the main scene) turns:
  a subpart linked from a subpart scene keeps its parent's frame. Checked against `HurricanePlatform_before_split.blend`
  (muzzles at y -11.58, the drum's centre at (0, -2.2, 1.9)). The model was never wrong. The stages were rebuilt and
  the LOD renders and scores redone.

## 2026-11-10: collision (owner: "Start collision")

- **Method** (`tools/collision.py`): five convex shapes in `Collision - Main (GVK_HurricaneTurret)`, each object at
  the origin with its points in block space, box UVs, rigid body added in the main scene and set to its shape.
  Rerun `build()` after a change; it replaces the meshes.
  - `Collision_Base`: Box, the plinth cell, x and y -6.25 to 6.25, z -3.75 to -1.25.
  - `Collision_Disc`: Convex Hull, 24-sided prism, r 4.6 (4.56 at the flats), deck -1.25 to disc top -0.9.
  - `Collision_Gunhouse`: Convex Hull, 24-sided prism on the azimuth axis, r 4.5, -0.9 to the roof at 3.1 (the
    measured roof, not design's 3.05). The same at every azimuth.
  - `Collision_FeedBox`: Box over the pressure box, gauges, pipes and wheels, x -5.70 to -4.55, y +-0.26, z -1.25 to
    -1.03.
  - `Collision_PowerBox`: Box over the power box, conduits and rings, x 4.59 to 5.68, y +-0.26, z -1.25 to -1.12.
- **Left out:** the bustle beyond 4.5 m (to y 6.18), the rear hatch, the sensor dome and roof gear, the cone tips
  and the barrels. The gunhouse turns, so its collision has to be round on the base: shots and players pass through
  those parts.
- **Checks:** 5 shapes (limit 10), all inside the bounding box, all at the origin, real UVs. The scope
  (`muzzle_projectile_1`, at rest (1.9, -11.58, 1.9)) swept over -10 to +45 degrees elevation in 1 degree steps and
  every 5 degrees of azimuth: inside no shape, at least 4.97 m clear of the gunhouse prism. `collision.png`: the shapes
  in see-through red over the finished turret from four angles. The collection is hidden in the viewport.
  **Not exported, not tested in game.**

## 2026-11-10: mount points and interaction points (owner: "Start mount points")

- **Mount points:** the SBC's set stays as it is: the whole bottom face and the bottom row of each side (`Size`
  5 x 3 x 5). The base fills that row to every face: Keen's platform mesh reaches 7.4 mm past each face, as his own
  `Structural_5_platformConveyor` does, and the keypad frames sit flush with it. The SBC's `MirroringY` `Z` and
  `MirroringZ` `Y` are vanilla's turret values and still fit; no mirror models. SEUT's mountpoint areas stay empty,
  since SEUT writes no SBC here (`export_sbc_type = 'none'`).
- **Conveyors:** by the game's rule (the cell that holds the empty, the main axis of its offset from that cell's
  centre), all 5 detectors connect from the bottom row outward: front, back, both sides and the bottom, 1.05 to 1.13 m
  from their cell centres, each into a cell outside the block.
- **Highlights:** every detector names its own mesh, shares its parent, and covers it across the face the player
  aims at. The 4 terminal detectors cover their keypads with 16 to 29% to spare, `detector_inventory_1` the cargo
  hatch. The 5 conveyor detectors fell 4 to 7 mm short of their port frames' outer edge and were widened to 0.69 m
  half-width (1 cm past the frame). They still miss the back of each port's tunnel, which no aim ray reaches first.
- **Checks:** `tools/interaction_check.py` (changes nothing). `mount_points.png`: the mount faces in green, then the
  detectors (conveyor yellow, terminal blue, inventory orange) from front-left, rear-right and below.
  **Not exported, not tested in game.**

## 2026-11-10: icon (owner: "Start the icon", then "Full colour")

- **Result:** `Content\Textures\GUI\Icons\GVK_HurricaneTurret.png`, 128 x 128 PNG, SEUT's icon render in full colour
  (`renderColorOverlay` on). The owner picked full colour over SEUT's blue filter, which the Gatling icon uses, from
  a side-by-side render. The SBC's `Icon` changes to it at step 10.
- **Method** (`tools/icon.py`): SEUT renders the main scene's Main collection only, so the four subpart empties
  were instanced with their scenes' Main collections for the shot. The first one (`subpart_MissileTurretBase1`)
  was turned a half turn, as the game turns the Az content back, or the guns would point over the bustle. All of
  it was undone and checked before saving: no instances, every subpart empty back unrotated at its place.
- **Framing**, all through SEUT's Icon Render settings: Zoom 35, Distance 1.55, Location (-0.7, -2.7, -1.3),
  Rotation (-20, 0, 45) degrees, a view from the front right. The turret spans x 10 to 122 and y 32 to 100 of the
  128 px; the muzzles reach furthest. SEUT's own lights, as it sets them.
- The render ran through SEUT's operator in the live Blender; the preview window is still open. `tools/icon.py`
  holds the same calls as that run, not yet run as one call. **Not tested in game.**

## 2026-11-10: export, SBC and WeaponCore (owner: "Yes", to starting step 10)

- **Export:** SEUT's export of each of the 5 scenes (`export_sbc_type = 'none'`, loose files deleted), mod folder
  `Content`, models in `Content\Models\GVK_HurricaneTurret`: 23 `.mwm` (main, 3 stages, LOD1..3 for the main, Az, El
  and both barrels). The collision collection was shown for the export and hidden again. One warning, W002 on
  `Pl_TopDec_Atlas2`: 65 of its 70 faces map the hazard stripe in Atlas2's bottom-left corner, so a quarter of its UV
  corners sit at (0, 0); every face has real UV area, none is collapsed.
- **Dummies in the `.mwm`** (`mwm_dummies.py`): the main model holds the 5 conveyor, 4 terminal and inventory
  detectors with their `highlight` meshes and `subpart_MissileTurretBase1` (file `GVK_HurricaneTurret_Az`); Az holds
  `subpart_MissileTurretBarrels` (El); El holds both `subpart_salvo_barrel_*` (Barrel_1 at x -1.9, the left),
  `muzzle_projectile_1/2` 9.38 m ahead and `camera`. Every subpart dummy faces -Z, as the Gatling's.
- **SBC** (`CubeBlocks_Ballistics_HeavyCannons.sbc`, `ARYXHurricaneCannon` and `_NPC`): `Model` and the three
  `BuildProgressModels` (0.33 / 0.66 / 1.00) in `Models\GVK_HurricaneTurret`, `Icon` `GVK_HurricaneTurret.png`,
  `MinElevationDegrees` -10, `MaxElevationDegrees` 45, `MinAzimuthDegrees` -180, `MaxAzimuthDegrees` 180,
  `EmissiveColorPreset` `Default`, `AiEnabled` false, and "Manufactured by AWE." gone from both descriptions. Size,
  mount points, mirroring, components and `BlockPairName` unchanged.
- **WeaponCore:** `MinElevation` -5 to -10 in `AryxHurricaneTurret` (`CoreParts/Ballistics_HeavyCannon_Weapons.cs`).
  Names, muzzles, `Scope`, the recoil animation and the muzzle flash are unchanged.
- **Removed:** the 10 `ARYX_HurricaneCannon*.mwm` in `Content/Models/AWE_HeavyCannon` and
  `Textures\GUI\Icons\AryxHurricaneCannon.dds`; nothing else used them. `XL_HalfBlock_BS1/2` stay for the MAC.
- **Weapon Studio:** the new icon copied over the four Hurricane icons it shows (`ARYXHurricaneCannon*.png` and
  `L__Heavy_Cannon_Hurricane_Turret*.png`; the Studio shows the `L__` ones, set in `curation.js`), snapshots
  regenerated (min elevation and descriptions changed). Data gate, all Studio test suites and the snapshot check pass.
- **Build:** `dotnet build -c Release`, 0 errors, 0 warnings. The deployed `%APPDATA%\SpaceEngineers\Mods\GVK_Weapons`
  holds the 23 new models (main model identical to the repo's), the new icon, the new SBC and the -10 limit, and
  none of the removed files. **Not tested in game.**

## 2026-11-11: in-game test (owner)

- The owner tested the new Hurricane on the server: "hurricane is tested in server and is amazing" (owner,
  2026-11-11). No faults reported. The preview block and the local `GVK_HurricanePreview` mod can go (step 11).
- On the owner's yes the `GVK_HurricanePreview` folder went to the Recycle Bin (2026-11-11), and its entry left
  the `GV Kharak S11 NPC Dev` world's mod list (`Sandbox_config.sbc` and `Sandbox.sbc`; no preview blocks were
  placed in that world).
