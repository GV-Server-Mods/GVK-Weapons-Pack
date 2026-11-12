"""A recessed pocket with one large hatch decal in the top deck's +X -Y field (owner, 2026-11-09: "Lets do a recessed
pocket for one larger door/hatch style decal for an asymmetric look").

Run after deck_placard.py and before finish.py:
    ns = {}; exec(open(path).read(), ns); report = ns["pocket"]()
Running it again keeps the pocket and only swaps the hatch decal: ns["pocket"](piece=(sheet, id, material)).

- The pocket has the moat's profile: an 8 mm 45 degree bevel in the deck paint, a dark wall down to the moat's depth
  and a dark floor. Its outline is a rectangle with chamfered corners, as the deck's fields are.
- It is as wide as the ordnance placard below it (owner, 2026-11-09: "make the hatch larger so the width matches
  the placard width"), and as long as the hatch decal's shape needs.
- The hatch decal lies on the floor, a margin clear of the wall all round.
- Keen's panel line (Atlas4 piece 3) runs round the pocket on the deck, as far from its edge as the moat's trim
  line from the moat, mitred at each corner.
- Cargo access (owner, 2026-11-09): the pocket (bevel, wall and floor) is its own mesh, Pl_CargoHatch_section_1,
  outlined from detector_inventory_1, so aiming at the hatch opens the block's inventory.
"""
import json

import bmesh
import bpy
from mathutils import Matrix, Vector

REGIONS = r"C:\Users\blayl\.claude\skills\se-dev-seut\references\atlas-regions.json"
CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
PLAT = "Platform"
HATCH = "Pl_CargoHatch"
DET = "detector_inventory_1"

CENTRE = Vector((4.85, -3.178))    # the group of pocket and placard, centred between the ring trench and the corner
HA, HB, CH = 0.457, 0.678, 0.035   # deck edge outline: half width (x, the placard's), half length (y), corner
#                                     chamfer; the lid (0.848 x 1.29 m, Atlas3 31's shape) has the same margin all round
DECK, MOAT = -1.25, -1.285
BEV = 0.008
BEV_LOW = DECK - BEV
MARGIN = 0.025                    # floor round the decal
OFF = 0.0015                      # decal gap (finish.py snaps it)
TRIM = (0.0438, 0.0633)           # panel line, out from the edge (as the moat's)
TRIM_Z = -1.2488
TRIM_U = 0.7075
TRIM_V = (0.4834, 0.5166)         # Atlas4 piece 3, the side nearer the pocket first
UV = 0.4
E = 1e-4
UP = Vector((0, 0, 1))
PIECE = ("Atlas3", 31, "Atlas3_Colorable")   # hinged lid


def octagon(A, B, c):
    return [Vector(p) for p in ((-A + c, -B), (A - c, -B), (A, -B + c), (A, B - c), (A - c, B), (-A + c, B),
                                (-A, B - c), (-A, -B + c))]


def offset(poly, d):
    """Convex anticlockwise polygon, each edge moved out by d (in by -d)."""
    lines = []
    for i, p in enumerate(poly):
        t = (poly[(i + 1) % len(poly)] - p).normalized()
        lines.append((p + Vector((t.y, -t.x)) * d, t))
    out = []
    for i in range(len(poly)):
        (p1, t1), (p2, t2) = lines[i - 1], lines[i]
        s = ((p2 - p1).x * t2.y - (p2 - p1).y * t2.x) / (t1.x * t2.y - t1.y * t2.x)
        out.append(p1 + t1 * s)
    return out


EDGE_P = [CENTRE + p for p in octagon(HA, HB, CH)]
FLOOR_P = offset(EDGE_P, -BEV)


def inside(poly, p, e=0.0):
    p = Vector(p[:2])
    for i, a in enumerate(poly):
        t = poly[(i + 1) % len(poly)] - a
        if t.x * (p - a).y - t.y * (p - a).x < e:
            return False
    return True


def on_seg(poly, p):
    """Indices of the outline edges the point lies on."""
    p = Vector(p[:2])
    out = []
    for i, a in enumerate(poly):
        b = poly[(i + 1) % len(poly)]
        t = b - a
        s = (p - a).dot(t) / t.length_squared
        if -1e-6 <= s <= 1 + 1e-6 and (a + t * s - p).length < E:
            out.append(i)
    return out


def crosses(f, a, b):
    from mathutils.geometry import intersect_line_line_2d
    pts = [v.co.xy for v in f.verts]
    if any(intersect_line_line_2d(a, b, pts[i - 1], pts[i]) for i in range(len(pts))):
        return True
    x, y, ins = a.x, a.y, False
    for i in range(len(pts)):
        p, q = pts[i - 1], pts[i]
        if (p.y > y) != (q.y > y) and x < p.x + (y - p.y) * (q.x - p.x) / (q.y - p.y):
            ins = not ins
    return ins


def box_uv(f, l):
    ax = max(range(3), key=lambda i: abs(f.normal[i]))
    u, v = [l.vert.co[i] for i in range(3) if i != ax]
    return (u * UV, v * UV)


def make(bm, vs, want, mat, cnl, uvl, uvf=None):
    f = bm.faces.new(vs)
    f.material_index = mat
    f.normal_update()
    if f.normal.dot(want) < 0:
        f.normal_flip()
    for l in f.loops:
        l[uvl].uv = uvf(l.vert) if uvf else box_uv(f, l)
        l[cnl] = f.normal
    return f


def done(me):
    if bpy.data.objects.get(HATCH + "_section_1"):
        return True
    dark = [i for i, m in enumerate(me.materials) if m.name == "PaintedMetal_Darker"]
    return any(p.material_index in dark and abs(p.center.z - MOAT) < E and (p.center.xy - CENTRE).length < 0.1
               for p in me.polygons)


def cut(bm, mats):
    deck = lambda f: (mats[f.material_index] == "PaintedMetal_Colorable" and f.normal.z > 0.999
                      and all(abs(v.co.z - DECK) < E for v in f.verts))
    lo, hi = CENTRE - Vector((HA, HB)) - Vector((0.01, 0.01)), CENTRE + Vector((HA, HB)) + Vector((0.01, 0.01))
    live = {f for f in bm.faces if deck(f) and any(
        lo.x < v.co.x < hi.x and lo.y < v.co.y < hi.y for v in f.verts) or (deck(f) and crosses(f, lo, hi))}
    orig_e, orig_v = set(bm.edges), set(bm.verts)
    for i, a in enumerate(EDGE_P):
        b = EDGE_P[(i + 1) % 8]
        fs = [f for f in live if f.is_valid and crosses(f, a, b)]
        if fs:
            t = (b - a).normalized()
            res = bmesh.ops.bisect_plane(bm, geom=list({e for f in fs for e in f.edges}) + fs, dist=1e-6,
                                         plane_co=(a.x, a.y, DECK), plane_no=(t.y, -t.x, 0))
            live |= {g for g in res["geom"] if isinstance(g, bmesh.types.BMFace)}
    live = {f for f in live if f.is_valid}
    dead = [f for f in live if inside(EDGE_P, f.calc_center_median(), 1e-6)]
    bmesh.ops.delete(bm, geom=dead, context="FACES")
    bm.normal_update()
    live = {f for f in live if f.is_valid}
    extra = [e for e in {e for f in live for e in f.edges} if e not in orig_e and len(e.link_faces) == 2
             and e.link_faces[0].material_index == e.link_faces[1].material_index
             and e.link_faces[0].normal.dot(e.link_faces[1].normal) > 1 - 1e-6
             and not all(on_seg(EDGE_P, v.co) for v in e.verts)]
    bmesh.ops.dissolve_edges(bm, edges=extra, use_verts=False)

    def straight(v):
        a, b = (e.other_vert(v).co - v.co for e in v.link_edges)
        return a.length > 0 and b.length > 0 and a.normalized().dot(b.normalized()) < -1 + 1e-9
    spare = [v for v in bm.verts if v not in orig_v and len(v.link_edges) == 2 and straight(v)]
    bmesh.ops.dissolve_verts(bm, verts=spare)
    return dict(removed=len(dead), dissolved=len(extra), spare_verts=len(spare))


def build(bm, mi, cnl, uvl):
    col, dark = mi["PaintedMetal_Colorable"], mi["PaintedMetal_Darker"]
    pool = {}

    def get(p):
        k = (round(p.x, 5), round(p.y, 5), round(p.z, 5))
        if k not in pool:
            pool[k] = bm.verts.new(p)
        return pool[k]

    def low(v):
        segs = on_seg(EDGE_P, v.co)
        if len(segs) == 2:                       # an outline corner: the floor outline's corner
            i = segs[1] if (segs[0] + 1) % 8 == segs[1] else segs[0]
            p = FLOOR_P[i]
        else:
            t = (EDGE_P[(segs[0] + 1) % 8] - EDGE_P[segs[0]]).normalized()
            p = v.co.xy + Vector((-t.y, t.x)) * BEV
        return get(Vector((p.x, p.y, BEV_LOW)))

    rim = [e for e in bm.edges if len(e.link_faces) == 1 and all(
        abs(v.co.z - DECK) < E and on_seg(EDGE_P, v.co) for v in e.verts)]
    n = 0
    for e in rim:
        a, b = e.verts
        la, lb = low(a), low(b)
        m = (a.co + b.co).xy / 2
        want = Vector(((CENTRE - m).x, (CENTRE - m).y, 0)).normalized()
        make(bm, [a, b, lb, la], want + UP, col, cnl, uvl)
        da, db = get(Vector((la.co.x, la.co.y, MOAT))), get(Vector((lb.co.x, lb.co.y, MOAT)))
        make(bm, [la, lb, db, da], want, dark, cnl, uvl)
        n += 2
    import math
    floor = sorted({v for v in pool.values() if abs(v.co.z - MOAT) < E},
                   key=lambda v: math.atan2(v.co.y - CENTRE.y, v.co.x - CENTRE.x))
    make(bm, floor, UP, dark, cnl, uvl)
    return dict(rim_edges=len(rim), new_faces=n + 1)


def trim(bm, mi, cnl, uvl):
    a4 = mi["Atlas4_Colorable"]
    inner, outer = offset(EDGE_P, TRIM[0]), offset(EDGE_P, TRIM[1])
    run = 0.0
    for i in range(8):
        j = (i + 1) % 8
        t = (inner[j] - inner[i]).normalized()
        vs = [bm.verts.new((p.x, p.y, TRIM_Z)) for p in (inner[i], outer[i], outer[j], inner[j])]
        uvs = {v: (TRIM_U * (run + (v.co.xy - inner[i]).dot(t)), TRIM_V[k in (1, 2)]) for k, v in enumerate(vs)}
        make(bm, vs, UP, a4, cnl, uvl, lambda v: uvs[v])
        run += (inner[j] - inner[i]).length
    return 8


def strays(bm, mats):
    """Other decals at deck height near the pocket and its trim line."""
    reach = offset(EDGE_P, TRIM[1] + 0.02)
    a4 = "Atlas4_Colorable"
    return sum(1 for f in bm.faces if mats[f.material_index] not in ("PaintedMetal_Colorable", "PaintedMetal_Darker")
               and all(TRIM_Z - 0.002 < v.co.z < DECK + 0.004 for v in f.verts)
               and any(inside(reach, v.co) for v in f.verts)
               and not (mats[f.material_index] == a4 and abs(f.calc_center_median().z - TRIM_Z) < E
                        and not inside(offset(EDGE_P, TRIM[0] - 0.001), f.calc_center_median())
                        and inside(offset(EDGE_P, TRIM[1] + 0.001), f.calc_center_median())))


def hatch(piece):
    sheet, pid, mat = piece
    r = {g["id"]: g for g in json.load(open(REGIONS))[sheet]["regions"]}[pid]
    plat = bpy.data.objects[PLAT]
    # the old hatch decal, in whichever deck decal object it is
    for o in [c for c in plat.children if c.name.startswith("Pl_TopDec_")]:
        bm = bmesh.new()
        bm.from_mesh(o.data)
        old = [f for f in bm.faces if abs(f.calc_center_median().z - MOAT) < 0.01
               and inside(FLOOR_P, f.calc_center_median())]
        if old:
            bmesh.ops.delete(bm, geom=old, context="FACES")
            bm.to_mesh(o.data)
        bm.free()
    name = "Pl_TopDec_" + mat
    o = bpy.data.objects.get(name)
    if o is None:
        o = bpy.data.objects.new(name, bpy.data.meshes.new(name))
        for col in plat.users_collection:
            col.objects.link(o)
        o.parent = plat
    me = o.data
    if mat not in [m.name for m in me.materials]:
        me.materials.append(bpy.data.materials[mat])
    k = [m.name for m in me.materials].index(mat)
    wf, hf = 2 * (HA - BEV - MARGIN), 2 * (HB - BEV - MARGIN)
    s = min(wf / r["w_px"], hf / r["h_px"])
    w, h = r["w_px"] * s, r["h_px"] * s
    x0, y0 = CENTRE.x - w / 2, CENTRE.y - h / 2
    bm = bmesh.new()
    bm.from_mesh(me)
    uvl = bm.loops.layers.uv.active or bm.loops.layers.uv.new("UVMap")
    quad = [(r["u0"], r["v0"]), (r["u1"], r["v0"]), (r["u1"], r["v1"]), (r["u0"], r["v1"])]
    f = bm.faces.new([bm.verts.new((x0 + w * (u - r["u0"]) / (r["u1"] - r["u0"]),
                                    y0 + h * (v - r["v0"]) / (r["v1"] - r["v0"]), MOAT + OFF)) for u, v in quad])
    f.material_index = k
    for l, uv in zip(f.loops, quad):
        l[uvl].uv = uv
    bm.to_mesh(me)
    bm.free()
    return dict(decal=name, size=(round(w, 3), round(h, 3)))


def access():
    """Split the pocket off Platform as its own flat-shaded mesh and outline it from an inventory detector."""
    name = HATCH + "_section_1"
    if bpy.data.objects.get(name):
        return dict(hatch=name, faces=len(bpy.data.objects[name].data.polygons))
    plat = bpy.data.objects[PLAT]
    me = plat.data
    reach = offset(EDGE_P, 1e-4)
    bm, cnl, uvl = C["open_bm"](me)
    faces = [f for f in bm.faces if f.calc_center_median().z < DECK - 1e-5
             and all(inside(reach, v.co) for v in f.verts)]
    names = sorted({me.materials[f.material_index].name for f in faces})
    nm = bpy.data.meshes.new(HATCH)
    for m in names:
        nm.materials.append(bpy.data.materials[m])
    dst = bmesh.new()
    uvd = dst.loops.layers.uv.new("UVMap")
    pool = {}
    for f in faces:
        vs = [pool.setdefault(v.index, dst.verts.new(v.co)) for v in f.verts]
        g = dst.faces.new(vs)
        g.material_index = names.index(me.materials[f.material_index].name)
        g.smooth = False
        for la, lb in zip(f.loops, g.loops):
            lb[uvd].uv = la[uvl].uv
    dst.to_mesh(nm)
    dst.free()
    bmesh.ops.delete(bm, geom=faces, context="FACES")
    C["close_bm"](bm, me)
    o = bpy.data.objects.new(HATCH, nm)
    for col in plat.users_collection:
        col.objects.link(o)
    o.parent = plat
    # SEUT's operator renames the mesh object to <name>_section_1 and sets the empty's highlight to it
    for x in bpy.context.view_layer.objects.selected:
        x.select_set(False)
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.add_highlight_empty(detector_type="detector_inventory_", index=1)
    e = bpy.data.objects[DET]
    half = (HA + 0.01, HB + 0.01, 0.045)       # the whole pocket, from under its floor to above the deck
    e.matrix_world = Matrix.Translation((CENTRE.x, CENTRE.y, DECK)) @ Matrix.Diagonal(
        [h / e.empty_display_size for h in half] + [1])
    return dict(hatch=o.name, faces=len(nm.polygons), materials=names, highlight=e.get("highlight"))


def pocket(piece=PIECE):
    o = bpy.data.objects[PLAT]
    assert o.matrix_world.is_identity
    me = o.data
    rep = {}
    if not done(me):
        mats = [m.name for m in me.materials]
        mi = {m: i for i, m in enumerate(mats)}
        bm, cnl, uvl = C["open_bm"](me)
        bm.normal_update()
        rep.update(cut(bm, mats))
        rep.update(build(bm, mi, cnl, uvl))
        rep["trim_faces"] = trim(bm, mi, cnl, uvl)
        rep["stray_decals"] = strays(bm, mats)
        C["close_bm"](bm, me)
    rep["hatch"] = hatch(piece)
    rep["access"] = access()
    return rep


C = {}
exec(open(CP).read(), C)
