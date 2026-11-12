"""Builder: the platform plinth of GVK_HurricanePlatform (design.md).

An alternate plinth for the Hurricane turret: the vanilla Structural_5_platformConveyor (5 x 5 x 1) with the
3x3x1 turret mount's styling (GVK_HeavyTurretMount_3x3x1). Sides and rims are vanilla's, with the mount's
reinforcements: each corner post widened into a column, and a doubler plate under each girder in the truss bays.
Both decks are the mount's top deck stretched from 3 to 5 cells (map f), the bottom one turned over.

Sources, in this .blend:
- scene KB_PlatConv: the vanilla platform imported by SEUT, objects KBC_Body and KBC_Decals
- scene KB_Mount: the mount's Body and Decals_* appended from GVK_HeavyTurretMount_3x3x1.blend, prefixed KBM_
The mount's side builder supplies the mesh helpers (bm_with_normals, split_for_wedge, fix_uvs, append_bm).

Run inside Blender (MCP):
    ns = {}; exec(open(r"<this file>").read(), ns); ns["build"]()
Output: mesh object Platform in Main (GVK_HurricanePlatform). A rerun swaps its mesh and keeps its children.
"""
import bpy, bmesh, math
from mathutils import Vector, Matrix

MOUNT_TOOLS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HeavyTurretMount\tools\build_sides_optionA.py"
SCENE = "GVK_HurricanePlatform"
OUT = "Platform"
Z0 = -2.5                 # plinth centre in block space (5 x 5 x 3 cells; the plinth is the bottom cell)
DECK_EDGE = 5.9405        # vanilla rim's inner edge
POST_IN, POST_X = 0.12, 6.16          # corner post 0.18 m wide, widened to 0.30 as on the mount
# doubler under each girder, truss bays only: from the centre bay's post (x 1.885) to the corner column
DBL = dict(z_lo=0.629, z_hi=0.772, face=6.21, wall=6.15, x0=1.885, x1=6.25 - 0.30, bevel=0.010, uv=0.40, uv0=0.37)
# Deck stretch, mount -> 5 x 5, per axis on |x| and |y|: identity to NEAR (seat, moat, tie-down rows); the
# joint clamps (centred on the mount's rim joint, 1.492) move 2.249 onto vanilla's joint (3.741); everything
# from FAR out moves 2.5. No deck vertex lies in the two linear zones between, so they only stretch faces.
NEAR, CLAMP_LO, CLAMP_HI, CLAMP_D, FAR, SHIFT = 1.22, 1.285, 1.70, 2.249, 1.85, 2.5
# vanilla's band lines by the corners move out with the mount's corner plates (5.27 -> 5.52)
CORNER_LINE = (5.24, 5.31, 0.251)
LINE_MATS = ("Atlas4", "Paneling")    # strips that may stretch along their length
REPORT = {}
H = {}


def f(c):
    a, s = abs(c), (1.0 if c >= 0 else -1.0)
    if a <= NEAR:
        r = a
    elif a < CLAMP_LO:
        r = NEAR + (a - NEAR) / (CLAMP_LO - NEAR) * (CLAMP_LO + CLAMP_D - NEAR)
    elif a <= CLAMP_HI:
        r = a + CLAMP_D
    elif a < FAR:
        lo, hi = CLAMP_HI + CLAMP_D, FAR + SHIFT
        r = lo + (a - CLAMP_HI) / (FAR - CLAMP_HI) * (hi - lo)
    else:
        r = a + SHIFT
    return s * r


def islands(bm):
    seen, out = set(), []
    for f0 in bm.faces:
        if f0 in seen:
            continue
        seen.add(f0)
        stack, isl = [f0], []
        while stack:
            fc = stack.pop()
            isl.append(fc)
            for v in fc.verts:
                for g in v.link_faces:
                    if g not in seen:
                        seen.add(g)
                        stack.append(g)
        out.append(isl)
    return out


def copy_faces(bm, faces):
    """A copy of bm holding only the given faces."""
    bm.faces.index_update()
    idx = {fc.index for fc in faces}
    b2 = bm.copy()
    b2.faces.ensure_lookup_table()
    bmesh.ops.delete(b2, geom=[fc for fc in b2.faces if fc.index not in idx], context="FACES")
    return b2


# ---------------------------------------------------------------- sides (vanilla, -Y side, then turned x4)
def in_wedge(c):
    a = math.degrees(math.atan2(c.y, c.x))
    return -135.0 <= a < -45.0


def deck_face(fc):
    return all(abs(v.co.x) <= DECK_EDGE + 1e-3 and abs(v.co.y) <= DECK_EDGE + 1e-3 and abs(v.co.z) >= 1.12
               for v in fc.verts)


def top_surface(fc, c):
    """Top or bottom face of the plinth, its rim or the rim's edge bevel."""
    return abs(c.z) > 1.12 and abs(fc.normal.z) >= 0.25


def post_face(c):
    return abs(c.x) > 6.0 and c.y < -6.12 and -0.40 < c.z < 0.73


def in_doubler_band(c):
    return DBL["x0"] < abs(c.x) < DBL["x1"] and DBL["z_lo"] <= abs(c.z) <= DBL["z_hi"]


def doubler_bm(mat):
    """Doubler plates under the top and bottom girders of the -Y side, both truss bays, closed back to the wall."""
    d = DBL
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    cnl = bm.loops.layers.float_vector.new("_cn")
    b = d["bevel"]
    for sz in (1, -1):
        prof = [(-d["face"], d["z_hi"]), (-d["face"], d["z_lo"] + b), (-d["face"] + b, d["z_lo"]), (-d["wall"], d["z_lo"])]
        prof = [(y, sz * z) for y, z in prof]
        arc = [0.0]
        for (y0, z0), (y1, z1) in zip(prof, prof[1:]):
            arc.append(arc[-1] + math.hypot(y1 - y0, z1 - z0))
        outward = [Vector((0, -1, 0)), Vector((0, -1, -sz)).normalized(), Vector((0, 0, -sz))]
        for sx in (1, -1):
            xs = (sx * d["x0"], sx * d["x1"])
            rows = [[bm.verts.new((x, y, z)) for (y, z) in prof] for x in xs]
            uv_of = {}
            for r, x in zip(rows, xs):
                for k, vert in enumerate(r):
                    uv_of[vert] = (x * d["uv"] + d["uv0"], sz * arc[k] * d["uv"] + d["uv0"])
            for k in range(len(prof) - 1):
                fc = bm.faces.new([rows[0][k], rows[1][k], rows[1][k + 1], rows[0][k + 1]])
                fc.material_index = 0
                fc.smooth = True
                fc.normal_update()
                if fc.normal.dot(outward[k]) < 0:
                    fc.normal_flip()
                for l in fc.loops:
                    l[uvl].uv = uv_of[l.vert]
                    l[cnl] = fc.normal
    return bm, [mat]


def trim_behind_doubler(bm):
    """Flat faces inside the doubler's height that reach back through it (the deep flange's underside) showed
    through the slot under the girder on the mount: cut them at the doubler face, drop the part behind."""
    d = DBL

    def inside(fc):
        c = fc.calc_center_median()
        return (abs(fc.normal.z) > 0.9 and d["z_lo"] < abs(c.z) < d["z_hi"] and d["x0"] < abs(c.x) < d["x1"]
                and c.y < -5.5)
    bm.normal_update()
    faces = [fc for fc in bm.faces if inside(fc)]
    geom = faces + list({e for fc in faces for e in fc.edges}) + list({v for fc in faces for v in fc.verts})
    bmesh.ops.bisect_plane(bm, geom=geom, dist=1e-5, plane_co=(0, -d["face"], 0), plane_no=(0, 1, 0))
    bm.normal_update()
    kill = [fc for fc in bm.faces if inside(fc) and fc.calc_center_median().y > -d["face"]]
    REPORT["trimmed behind doubler"] = len(kill)
    bmesh.ops.delete(bm, geom=kill, context="FACES")


def side_bm():
    out, out_mats = bmesh.new(), []
    darker = None
    for name in ("KBC_Body", "KBC_Decals"):
        body = name == "KBC_Body"
        bm, mats = H["bm_with_normals"](bpy.data.objects[name])
        H["split_for_wedge"](bm, body)
        bm.normal_update()
        rest, post = [], []
        for fc in bm.faces:
            c = fc.calc_center_median()
            if not in_wedge(c):
                continue
            m = mats[fc.material_index] if fc.material_index < len(mats) else None
            if m is not None and m.name == "PaintedMetal_Darker":
                darker = m
            if body:
                if deck_face(fc):
                    continue
                (post if post_face(c) else rest).append(fc)
            else:
                if top_surface(fc, c):
                    continue                    # the mount's deck and rim decals replace vanilla's
                if -6.17 < c.y < -6.1 and in_doubler_band(c):
                    continue                    # wall decals the doubler covers
                rest.append(fc)
        REPORT[name] = dict(rest=len(rest), post=len(post))
        for group, kind in ((rest, "rest"), (post, "post")):
            if not group:
                continue
            b2 = copy_faces(bm, group)
            orig = {v: v.co.copy() for v in b2.verts}
            if kind == "post":
                for v in b2.verts:
                    if abs(v.co.x) < POST_X:
                        v.co.x -= math.copysign(POST_IN, v.co.x)
                H["fix_uvs"](b2, orig)
            elif not body:
                b2.normal_update()
                lo, hi, d = CORNER_LINE
                moved = set()
                for fc in b2.faces:
                    c = fc.calc_center_median()
                    if (abs(fc.normal.y) > 0.9 and c.y < -6.24 and abs(c.z) > 1.1 and lo < abs(c.x) < hi
                            and mats[fc.material_index].name.startswith("Atlas4")):
                        moved.update(fc.verts)
                for v in moved:
                    v.co.x += math.copysign(d, v.co.x)
                REPORT["corner band line verts moved"] = len(moved)
            H["append_bm"](out, out_mats, b2, mats)
            b2.free()
        bm.free()
    trim_behind_doubler(out)
    dbm, dmats = doubler_bm(darker)
    H["append_bm"](out, out_mats, dbm, dmats)
    dbm.free()
    # four sides: turned copies of the -Y side
    cnl = out.loops.layers.float_vector.get("_cn")
    side = list(out.faces)
    for k in (1, 2, 3):
        rot = Matrix.Rotation(math.radians(90 * k), 3, "Z")
        res = bmesh.ops.duplicate(out, geom=side + list({v for fc in side for v in fc.verts}) +
                                  list({e for fc in side for e in fc.edges}))
        for g in res["geom"]:
            if isinstance(g, bmesh.types.BMVert):
                g.co = rot @ g.co
            elif isinstance(g, bmesh.types.BMFace):
                for l in g.loops:
                    l[cnl] = rot @ Vector(l[cnl])
    return out, out_mats


# ---------------------------------------------------------------- decks (the mount's top deck, stretched)
def settle(bm, orig, mats):
    """Decal pieces the stretch moved unevenly: strips (Atlas4, Paneling) stretch along their length; any other
    piece (bolts, vents, tie-downs, plates) moves whole by the map at its centre."""
    whole = 0
    for isl in islands(bm):
        verts = list({v for fc in isl for v in fc.verts})
        disp = [v.co - orig[v] for v in verts]
        if max((dv - disp[0]).length for dv in disp) < 1e-6:
            continue
        if mats[isl[0].material_index].name.startswith(LINE_MATS):
            continue
        lo = Vector([min(orig[v][i] for v in verts) for i in range(3)])
        hi = Vector([max(orig[v][i] for v in verts) for i in range(3)])
        c = (lo + hi) / 2
        dc = Vector((f(c.x) - c.x, f(c.y) - c.y, 0.0))
        for v in verts:
            v.co = orig[v] + dc
        whole += 1
    return whole


def deck_bm():
    out, out_mats = bmesh.new(), []
    srcs = [o for o in bpy.data.scenes["KB_Mount"].objects
            if o.type == 'MESH' and (o.name == "KBM_Body" or o.name.startswith("KBM_Decals_"))]
    whole = 0
    for o in srcs:
        body = o.name == "KBM_Body"
        bm, mats = H["bm_with_normals"](o)
        bm.normal_update()
        keep = []
        for fc in bm.faces:
            vs = [v.co for v in fc.verts]
            if not all(v.z >= 1.12 for v in vs):
                continue
            inside = all(abs(v.x) <= 3.4415 and abs(v.y) <= 3.4415 for v in vs)
            if body:
                if inside:
                    keep.append(fc)
            elif inside or (all(abs(v.x) <= 3.76 and abs(v.y) <= 3.76 for v in vs) and fc.normal.z >= 0.25):
                keep.append(fc)
        b2 = copy_faces(bm, keep)
        bm.free()
        orig = {v: v.co.copy() for v in b2.verts}
        for v in b2.verts:
            v.co = Vector((f(v.co.x), f(v.co.y), v.co.z))
        if body:
            H["fix_uvs"](b2, orig)
        else:
            whole += settle(b2, orig, mats)
        H["append_bm"](out, out_mats, b2, mats)
        b2.free()
    REPORT["deck decal pieces moved whole"] = whole
    # bottom deck: the top one turned over about X
    cnl = out.loops.layers.float_vector.get("_cn")
    faces = list(out.faces)
    res = bmesh.ops.duplicate(out, geom=faces + list({v for fc in faces for v in fc.verts}) +
                              list({e for fc in faces for e in fc.edges}))
    rot = Matrix.Rotation(math.pi, 3, "X")
    for g in res["geom"]:
        if isinstance(g, bmesh.types.BMVert):
            g.co = rot @ g.co
        elif isinstance(g, bmesh.types.BMFace):
            for l in g.loops:
                l[cnl] = rot @ Vector(l[cnl])
    return out, out_mats


# ---------------------------------------------------------------- build
def main_collection():
    sc = bpy.data.scenes[SCENE]
    return next(c for c in sc.collection.children_recursive if c.name.startswith("Main"))


def build():
    H.clear()
    REPORT.clear()
    exec(open(MOUNT_TOOLS).read(), H)
    out, mats = side_bm()
    dbm, dmats = deck_bm()
    H["append_bm"](out, mats, dbm, dmats)
    dbm.free()
    bmesh.ops.translate(out, vec=(0, 0, Z0), verts=out.verts)
    out.normal_update()
    flipped = 0
    me = bpy.data.meshes.new(OUT)
    out.to_mesh(me)
    out.free()
    for m in mats:
        me.materials.append(m)
    at = me.attributes["_cn"]
    vec = [0.0] * (len(me.loops) * 3)
    at.data.foreach_get("vector", vec)
    me.normals_split_custom_set([Vector(vec[i:i + 3]).normalized() for i in range(0, len(vec), 3)])
    me.attributes.remove(me.attributes["_cn"])
    ob = bpy.data.objects.get(OUT)
    if ob is None:
        ob = bpy.data.objects.new(OUT, me)
        main_collection().objects.link(ob)
    else:
        old = ob.data
        ob.data = me
        if old.users == 0:
            bpy.data.meshes.remove(old)
        me.name = OUT
    REPORT["faces"] = len(me.polygons)
    REPORT["materials"] = [m.name for m in me.materials]
    return ob, dict(REPORT)
