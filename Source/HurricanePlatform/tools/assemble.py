"""Fit the kept Hurricane parts onto the new Platform base and remove the old plinth.

Run once, after build_platform.py, on a saved checkpoint:
    ns = {}; exec(open(path).read(), ns); report = ns["assemble"]()
It refuses to run when the old plinth object is already gone.

Kept: the turret (mk_Az tree), the slew disc, the five cargo ports with their vanilla port frames
(seated by cargo_ports.py), the keypads, the detectors, the service gear (fitted onto the new deck), and
the disc, gear and sign decals from the old deck.
Dropped: every other old plinth part (walls, braces, rim lips, signs, deck plates, deck seams).
"""
import bpy
import bmesh
from collections import Counter
from mathutils import Vector

SCENE = "GVK_HurricanePlatform"
PLAT = "Platform"
OLD = "Plinth"
DZ = 0.052          # old deck top -1.300 to new deck top -1.248
BOX_IN = 0.16       # gear boxes move inward so they sit on the deck plate (edge at |x| 5.69)

# Inward shift of each gear part by original |x|: the sum of every step whose threshold it passes.
# Each threshold lies in a plain pipe run, so only straight runs get shorter.
STEPS = {
    "Pl_FeedBox": ((0.0, BOX_IN),),
    "Pl_FeedGauges": ((0.0, BOX_IN),),
    "Pl_FeedPipes": ((4.70, 0.08), (5.00, 0.04), (5.30, 0.04)),
    "Pl_FeedWheels": ((4.70, 0.08), (5.00, 0.04), (5.30, 0.04)),
    "Pl_PowerBox": ((0.0, BOX_IN),),
    "Pl_PowerConduits": ((5.00, BOX_IN),),
    "Pl_PowerRings": ((4.90, 0.08), (5.10, 0.08)),
}

# Old deck markings that stay: material, island centre box (x0, x1, y0, y1), xy move.
# The socket and data plate move off the new deck's Atlas4 corner lines (decals must not stack).
MARKS = (
    ("ButtonsAtlas_Colorable", (5.2, 5.65, 4.05, 4.55), (-0.15, 0.0)),  # power socket ring
    ("Atlas3_Darker", (5.2, 5.65, 4.05, 4.55), (-0.15, 0.0)),           # socket plate
    ("Atlas2", (-4.6, -4.0, 5.3, 5.5), (0.20, 0.0)),                    # data plate
    ("Atlas2", (1.5, 1.9, -5.4, -5.2), (0.0, 0.0)),                     # CAUTION sign
)

KEEP = (["mk_Az", "Pl_Disc"]
        + ["Pl_Port_" + s for s in "FBLRD"]
        + ["Pl_PortFrame_" + s for s in "FBLRD"]
        + ["Pl_Keypad_" + s for s in "FBLR"]
        + ["Pl_KeypadFrame_" + s for s in "FBLR"]
        + ["detector_conveyor_%d" % i for i in range(1, 6)]
        + ["detector_terminal_%d" % i for i in range(1, 5)]
        + list(STEPS))


def inward(ax, steps):
    return sum(d for t, d in steps if ax >= t)


def islands(bm):
    seen, out = set(), []
    for f in bm.faces:
        if f in seen:
            continue
        seen.add(f)
        stack, comp = [f], []
        while stack:
            g = stack.pop()
            comp.append(g)
            for e in g.edges:
                for h in e.link_faces:
                    if h not in seen:
                        seen.add(h)
                        stack.append(h)
        out.append(comp)
    return out


def fit_gear():
    for name, steps in STEPS.items():
        o = bpy.data.objects[name]
        assert o.matrix_world.is_identity, name
        for v in o.data.vertices:
            x = v.co.x
            v.co.x = x - (1 if x > 0 else -1) * inward(abs(x), steps)
            v.co.z += DZ
        o.data.update()


def fit_decals():
    kept = Counter()
    for o in [c for c in bpy.data.objects[OLD].children if c.name.startswith("Pl_DeckDec_")]:
        assert o.matrix_world.is_identity, o.name
        mat = o.name[len("Pl_DeckDec_"):]
        bm = bmesh.new()
        bm.from_mesh(o.data)
        drop = []
        for comp in islands(bm):
            vs = {v for f in comp for v in f.verts}
            c = sum((v.co for v in vs), Vector()) / len(vs)
            raised = max(v.co.z for v in vs) > -1.29   # on the disc or a gear box, not the old deck
            move = None
            if c.xy.length <= 4.62:
                if raised:
                    move, kind = Vector(), "disc"
            elif abs(c.y) < 0.4 and 4.5 < abs(c.x) < 5.95:
                if raised:
                    # with the part under it: the conduits' steps cover the power box and the conduit clamps
                    # (screws), the pipes' steps the pressure box, its gauges and the pipe manifold (screws)
                    sx = 1 if c.x > 0 else -1
                    steps = STEPS["Pl_PowerConduits" if c.x > 0 else "Pl_FeedPipes"]
                    move, kind = Vector((-sx * inward(abs(c.x), steps), 0, DZ)), "gear"
            else:
                for m, (x0, x1, y0, y1), (dx, dy) in MARKS:
                    if m == mat and x0 < c.x < x1 and y0 < c.y < y1:
                        move, kind = Vector((dx, dy, DZ)), "mark"
                        break
            if move is None:
                drop.extend(comp)
                continue
            for v in vs:
                v.co += move
            kept[kind] += 1
        bmesh.ops.delete(bm, geom=drop, context="FACES")
        if bm.faces:
            bm.to_mesh(o.data)
            o.name = o.data.name = "Pl_TopDec_" + mat
        else:
            kept["emptied " + mat] += 1
        bm.free()
    return kept


def reparent():
    plat = bpy.data.objects[PLAT]
    names = KEEP + [o.name for o in bpy.data.objects if o.name.startswith("Pl_TopDec_")]
    for n in names:
        o = bpy.data.objects[n]
        mw = o.matrix_world.copy()
        o.parent = plat
        o.matrix_world = mw
    return len(names)


def delete_old():
    old = bpy.data.objects[OLD]
    victims = [old] + list(old.children_recursive)
    meshes = {o.data for o in victims if o.type == "MESH"}
    for o in victims:
        bpy.data.objects.remove(o, do_unlink=True)
    gone = 0
    for m in meshes:
        if m.users == 0:
            bpy.data.meshes.remove(m)
            gone += 1
    for n in ("tmp_look_A", "tmp_look_B"):
        if n in bpy.data.objects:
            bpy.data.objects.remove(bpy.data.objects[n], do_unlink=True)
    return len(victims), gone


def assemble():
    if OLD not in bpy.data.objects:
        raise RuntimeError("old plinth already removed; reopen the checkpoint to run again")
    fit_gear()
    kept = fit_decals()
    n = reparent()
    removed, meshes = delete_old()
    plat = bpy.data.objects[PLAT]
    vl = bpy.data.scenes[SCENE].view_layers[0]
    for o in [plat] + list(plat.children_recursive):
        o.hide_set(False, view_layer=vl)
    return dict(decal_islands=dict(kept), reparented=n, removed_objects=removed, removed_meshes=meshes)
