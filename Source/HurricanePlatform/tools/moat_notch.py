"""Service trenches in the top deck (owner, 2026-11-09): the moat runs in under the pressure box and the power
cabinet, 6 cm clear of each box and on to the slew disc, and the service gear drops 3.5 cm onto its floor.

Run after port_surround.py and before finish.py:
    ns = {}; exec(open(path).read(), ns); report = ns["notch"]()

On each of the two sides (u = distance out from the centre along x, towards the box):
- The deck plate is cut along the trench outline (|y| <= Y_TOP, from U_END out to the moat) and the part inside
  goes, with the moat's inner bevel and wall where the trench opens into it.
- The trench gets the moat's profile: an 8 mm 45 degree bevel, a dark wall down to the moat floor, and a dark
  floor joined to the moat's. Its inner end lies inside the slew disc's skirt (r 4.6), which hides it.
- The deck's trim line beside the moat turns at each side of the trench and runs along it into the disc.
- The boxes, gauges, pipes, valves, conduits and rings, and the decals on them, drop DROP.
"""
import bmesh
import bpy
from mathutils import Matrix, Vector

PS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\port_surround.py"
S = {}
exec(open(PS).read(), S)
C = S["C"]

PLAT = "Platform"
GEAR = ("Pl_FeedBox", "Pl_FeedGauges", "Pl_FeedPipes", "Pl_FeedWheels",
        "Pl_PowerBox", "Pl_PowerConduits", "Pl_PowerRings")
UV = C["UV"]
E = 1e-4
R2 = 2 ** 0.5

# measured on the deck and moat
DECK, MOAT = -1.25, -1.285
BEV = 0.008                       # deck edge bevel, 45 degrees
BEV_LOW = DECK - BEV
EDGE, WALL = 5.742, 5.75          # moat's inner edge: bevel top, wall
BOX_HY = 0.26                     # both boxes are 0.52 m across
GAP = 0.06
Y_WALL = BOX_HY + GAP
Y_TOP = Y_WALL + BEV
U_END = 4.50                      # inside the disc's skirt (r 4.6) at |y| <= Y_TOP
DROP = DECK - MOAT
# the deck's Atlas4 trim line beside the moat, and its offsets from the deck edge
TRIM = (5.6787, 5.6982)
TRIM_Z = -1.2488
TRIM_A = Y_TOP + (EDGE - TRIM[1])  # along the trench: the side nearer the edge
TRIM_B = Y_TOP + (EDGE - TRIM[0])
TRIM_END = 4.55
# the service gear's decals: centre in this region (u, |y|, z)
GEAR_U, GEAR_Y, GEAR_Z = (4.43, 5.70), 0.27, (DECK + 0.003, -0.99)


def done():
    """True once the trench is in: a dark floor face under the power box."""
    me = bpy.data.objects[PLAT].data
    dark = [i for i, m in enumerate(me.materials) if m.name == "PaintedMetal_Darker"]
    for p in me.polygons:
        c = p.center
        if p.material_index in dark and abs(c.z - MOAT) < E and 5.0 < c.x < 5.7 and abs(c.y) < Y_WALL:
            return True
    return False


def faces(bm, mats, sx, mat, test):
    """Faces of `mat` on the top deck passing `test`, given their corners as (u, y, z)."""
    return [f for f in bm.faces if mats[f.material_index] == mat and all(v.co.z > MOAT - 0.01 for v in f.verts)
            and test([Vector((sx * v.co.x, v.co.y, v.co.z)) for v in f.verts])]


def crossing(fs, axis, at):
    return [f for f in fs if min(v.co[axis] for v in f.verts) < at - 1e-5 < at + 1e-5 < max(v.co[axis] for v in f.verts)]


def trench(bm, mats, sx, cnl, uvl):
    mi = {m: i for i, m in enumerate(mats)}
    W = lambda u, y, z: Vector((sx * u, y, z))
    ov = lambda P, lo=-Y_TOP - 0.01, hi=Y_TOP + 0.01: min(p.y for p in P) < hi and max(p.y for p in P) > lo
    deck = lambda: faces(bm, mats, sx, "PaintedMetal_Colorable",
                         lambda P: all(abs(p.z - DECK) < E and p.x < EDGE + E for p in P)
                         and max(p.x for p in P) > U_END and ov(P))
    bevel = lambda: faces(bm, mats, sx, "PaintedMetal_Colorable",
                          lambda P: all(EDGE - E < p.x < WALL + E and BEV_LOW - E < p.z < DECK + E for p in P) and ov(P))
    wall = lambda: faces(bm, mats, sx, "PaintedMetal_Darker", lambda P: all(abs(p.x - WALL) < E for p in P) and ov(P))
    floor = lambda: faces(bm, mats, sx, "PaintedMetal_Darker",
                          lambda P: all(abs(p.z - MOAT) < E and WALL - E < p.x for p in P) and ov(P))
    trim = lambda: faces(bm, mats, sx, "Atlas4_Colorable",
                         lambda P: all(TRIM[0] - E < p.x < TRIM[1] + E for p in P) and ov(P, -0.4, 0.4))
    for name, get in (("deck", deck), ("bevel", bevel), ("wall", wall), ("floor", floor), ("trim", trim)):
        assert len(get()) == 1, (sx, name, len(get()))
    floor_uv = S["uv_map"](floor()[0], uvl)
    trim_uv = S["uv_map"](trim()[0], uvl)
    I = Matrix.Identity(4)

    for sy in (1, -1):
        S["bisect"](bm, crossing(deck() + bevel(), 1, sy * Y_TOP), I, (0, sy * Y_TOP, 0), (0, 1, 0))
        S["bisect"](bm, crossing(wall() + floor(), 1, sy * Y_WALL), I, (0, sy * Y_WALL, 0), (0, 1, 0))
        S["bisect"](bm, trim(), I, W(TRIM[1], sy * TRIM_A, 0), (sx, sy, 0))
    mid = [f for f in deck() if all(abs(v.co.y) < Y_TOP + E for v in f.verts)]
    S["bisect"](bm, mid, I, W(U_END, 0, 0), (1, 0, 0))

    inside = lambda f, ylim: all(abs(v.co.y) < ylim + E for v in f.verts)
    gone = [f for f in deck() if inside(f, Y_TOP) and all(sx * v.co.x > U_END - E for v in f.verts)]
    gone += [f for f in bevel() if inside(f, Y_TOP)]
    gone += [f for f in wall() if inside(f, Y_WALL)]
    gone += [f for f in trim() if all(sx * v.co.x + abs(v.co.y) < TRIM[1] + TRIM_A + E for v in f.verts)]
    near = {v for f in gone for v in f.verts}
    bmesh.ops.delete(bm, geom=gone, context="FACES_ONLY")
    loose_e = [e for e in {e for v in near if v.is_valid for e in v.link_edges} if not e.link_faces]
    bmesh.ops.delete(bm, geom=loose_e, context="EDGES")
    bmesh.ops.delete(bm, geom=[v for v in near if v.is_valid and not v.link_edges], context="VERTS")

    pool = S["Pool"](bm, I, [v for v in bm.verts if sx * v.co.x > U_END - 0.01 and abs(v.co.y) < 0.4
                             and MOAT - 0.01 < v.co.z < DECK + 0.01])
    V = lambda u, y, z: pool.get(1, sx * u, -y, z)    # Pool's side-local axes are (a, -n, b)
    mk = S["Maker"](bm, I, cnl, uvl)
    col, dark, line = mi["PaintedMetal_Colorable"], mi["PaintedMetal_Darker"], mi["Atlas4_Colorable"]
    flank_uv = lambda co: Vector((UV * co.x, UV * R2 * co.z))
    end_uv = lambda co: Vector((UV * co.y, UV * R2 * co.z))
    wall_x = lambda co: Vector((UV * co.x, UV * co.z))
    wall_y = lambda co: Vector((UV * co.y, UV * co.z))
    for sy in (1, -1):
        T, A, B = V(EDGE, sy * Y_TOP, DECK), V(WALL, sy * Y_TOP, BEV_LOW), V(WALL, sy * Y_WALL, BEV_LOW)
        mk.face([T, A, B], (sx, 0, 1), end_uv, col)       # the moat bevel's mitre round the trench's corner
        mk.face([V(U_END, sy * Y_TOP, DECK), T, B, V(U_END + BEV, sy * Y_WALL, BEV_LOW)], (0, -sy, 1), flank_uv, col)
        mk.face([V(U_END + BEV, sy * Y_WALL, BEV_LOW), B, V(WALL, sy * Y_WALL, MOAT),
                 V(U_END + BEV, sy * Y_WALL, MOAT)], (0, -sy, 0), wall_x, dark)
        # trim line along the trench: same across-the-line uv as beside the moat, the side nearer the edge first
        pts = [(TRIM[1], TRIM_A), (TRIM[0], TRIM_B), (TRIM_END, TRIM_B), (TRIM_END, TRIM_A)]
        vs = [V(u, sy * y, TRIM_Z) for u, y in pts]
        uvs = [trim_uv(W(TRIM[1] - (y - TRIM_A), sy * (TRIM_A - (TRIM[1] - u)), TRIM_Z)) for u, y in pts]
        mk.face(vs, (0, 0, 1), uvs, line)
    mk.face([V(U_END, -Y_TOP, DECK), V(U_END, Y_TOP, DECK), V(U_END + BEV, Y_WALL, BEV_LOW),
             V(U_END + BEV, -Y_WALL, BEV_LOW)], (sx, 0, 1), end_uv, col)
    mk.face([V(U_END + BEV, -Y_WALL, BEV_LOW), V(U_END + BEV, Y_WALL, BEV_LOW), V(U_END + BEV, Y_WALL, MOAT),
             V(U_END + BEV, -Y_WALL, MOAT)], (sx, 0, 0), wall_y, dark)
    mk.face([V(U_END + BEV, -Y_WALL, MOAT), V(WALL, -Y_WALL, MOAT), V(WALL, Y_WALL, MOAT),
             V(U_END + BEV, Y_WALL, MOAT)], (0, 0, 1), floor_uv, dark)
    return {"removed": len(gone), "new_faces": mk.count, "new_verts": len(pool.vs)}


def drop_gear():
    shift = Matrix.Translation((0, 0, -DROP))
    for n in GEAR:
        o = bpy.data.objects[n]
        assert o.matrix_world.is_identity and o.data.users == 1, n
        o.data.transform(shift)
    moved = 0
    for o in bpy.data.objects:
        if o.type != "MESH" or not o.name.startswith("Pl_TopDec"):
            continue
        assert o.matrix_world.is_identity and o.data.users == 1, o.name
        bm = bmesh.new()
        bm.from_mesh(o.data)
        fs = [f for f in bm.faces if GEAR_U[0] < abs(f.calc_center_median().x) < GEAR_U[1]
              and abs(f.calc_center_median().y) < GEAR_Y and GEAR_Z[0] < f.calc_center_median().z < GEAR_Z[1]]
        vs = {v for f in fs for v in f.verts}
        assert all(g in fs for v in vs for g in v.link_faces), o.name     # no vertex shared with a deck decal
        for v in vs:
            v.co.z -= DROP
        bm.to_mesh(o.data)
        bm.free()
        moved += len(fs)
    return moved


def notch():
    if done():
        return {"skipped": "trench already in"}
    o = bpy.data.objects[PLAT]
    assert o.matrix_world.is_identity
    me = o.data
    mats = [m.name for m in me.materials]
    bm, cnl, uvl = C["open_bm"](me)
    rep = {("+x" if sx > 0 else "-x"): trench(bm, mats, sx, cnl, uvl) for sx in (1, -1)}
    C["close_bm"](bm, me)
    rep["gear_decals"] = drop_gear()
    rep["polys"] = len(me.polygons)
    return rep
