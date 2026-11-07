"""Builder: Option A sides for GVK_HeavyTurretMount_3x3x1 (design.md section 3.2).

Kitbashes the vanilla Structural_5_platform side (5 cells, 12.5 m) down to 3 cells (7.5 m):
cut straight runs and move their ends, move whole brackets, braces, gussets and posts, and stretch
brackets and gussets 126.5 mm deeper so the braces keep vanilla's 45.3 degree angle at 1.75 m spacing.
Adds the doubler plate under each girder and widens the corner posts into columns.

Run inside Blender (MCP) with the vanilla platform imported by SEUT into scene KB_Platform:
    exec(open(r"<this file>").read()); build()
Output: object SideA in scene SideA_Build (replaced on every run). Vanilla coordinates use the
-Y side (y = -6.25); output is the -Y side of the mount (y = -3.75), copied to all four sides.
"""
import bpy, bmesh, math
from mathutils import Vector, Matrix

SRC_SCENE = "KB_Platform"
OUT_SCENE = "SideA_Build"
OUT_NAME = "SideA"
D = 0.1265            # bracket and gusset stretch: chamfer centres from |z| 0.5565 to 0.430
SHIFT = 2.5           # vanilla corner to mount corner
COL_W = 0.30          # corner column width per face (vanilla post 0.18)
POST_IN = COL_W - 0.18
DECK_EDGE = 5.9405    # vanilla deck edge; the kept deck ends at 3.4405
WALL = 6.145          # just in front of vanilla's backing wall (6.15)
FOLDS = []            # faces the map turned over (filled by build(); should stay empty)
DECAL_MATS = ("Atlas", "Decals", "Paneling", "TextAtlas", "ButtonsAtlas")
# Bracket and gusset decals (owner's markups, 2026-11-07): frame lines stretch with the plate, vertex by vertex;
# vents and bolts move whole, and those by the root (where the part meets its band or girder) keep vanilla's place.
LINE_MATS = ("Atlas4",)       # thin frame and panel lines
ROOT_CUT = 0.62               # brackets: vents (|z| 0.75) stay by the root, bolts by the free edge (|z| 0.48) move
GUSSET_DECAL_CUT = -0.68      # gusset frame: between its bottom line (top -0.691) and the chamfer line's foot (-0.670)
GUSSET_ROOT_CUT = -0.50       # gusset: the vent (centre -0.58) stays by the root
SHEARS = []                   # line faces the stretch would shear (filled by build(); should stay empty)

# braces: vanilla x range, vanilla end points A, B (x, z), mount end points A', B' (x, z)
STRUTS = [
    ((-5.70, -4.30), (-5.5495, -0.528), (-4.4495, 0.5565), (-3.0495, -0.528 + D), (-2.1995, 0.5565 - D)),
    ((-3.70, -2.30), (-3.5505, 0.5565), (-2.4495, -0.5565), (-1.3005, 0.5565 - D), (-0.4495, -0.5565 + D)),
    ((2.30, 3.70), (2.4495, -0.5565), (3.5505, 0.5565), (0.4495, -0.5565 + D), (1.3005, 0.5565 - D)),
    ((4.30, 5.70), (4.4495, 0.5565), (5.5495, -0.528), (2.1995, 0.5565 - D), (3.0495, -0.528 + D)),
]
# brackets: vanilla centre x, top bracket?, mount centre x
BRACKETS = [(-4.0, True, -1.75), (4.0, True, 1.75), (2.0, False, 0.0)]
DOUBLER = dict(z_lo=0.629, z_hi=0.772, y_face=-3.71, y_wall=-3.65, x_end=3.75 - COL_W, bevel=0.010, uv_per_m=0.40)


def src(name, scene=SRC_SCENE):
    """Vanilla part by name in scene; the platform body may carry a LOD suffix (Structural_5_platform_LOD1)."""
    for o in bpy.data.scenes[scene].objects:
        base = o.name.split(".")[0]
        if base == name or (name == "Structural_5_platform" and base.startswith(name + "_LOD")):
            return o
    raise KeyError(name)


def in_wedge(c):
    a = math.degrees(math.atan2(c.y, c.x))
    return -135.0 <= a < -45.0


def is_decal(mat):
    return mat is not None and mat.name.startswith(DECAL_MATS)


# ---------------------------------------------------------------- roles (vanilla coordinates)
def bracket_of(c):
    for xs, up, xd in BRACKETS:
        if abs(c.x - xs) < 0.66 and ((0.36 < c.z < 0.95) if up else (-0.95 < c.z < -0.36)):
            return (xs, up, xd)
    return None


def strut_of(c):
    for i, (xr, *_r) in enumerate(STRUTS):
        if xr[0] - 0.02 <= c.x <= xr[1] + 0.02 and abs(c.z) < 0.72:
            return i
    return None


def role_of(part, c, mat):
    """Role of a face by its centre c. None = not used."""
    if not in_wedge(c):
        return None
    if part == "Structural_5_platform":
        return "band" if c.y < -5.94 else None
    if part == "Part_03":
        return "wall" if c.y < -6.0 else None
    if c.y > -5.5:
        return None
    if part == "Part_01":
        if abs(c.z) >= 0.72:
            return "girder"
        s = strut_of(c)
        return None if s is None else f"strut{s}"
    if part == "Part_05":
        b = bracket_of(c)
        return None if b is None else f"bracket{BRACKETS.index(b)}"
    if part == "Part_04":
        return "gusset"
    if part == "Part_02":
        return "post"
    if part in ("Part_06", "Part_07", "Part_08"):
        if abs(c.z) > 1.2:
            # rim top and bottom: keep decals centred on the rim strip; the deck's own come from the deck
            return "band" if c.y < -DECK_EDGE else None
        if c.y > -6.2:
            return None                      # backing-wall decals: laid again later for the new bays
        if -6.245 < c.y < -6.228:
            s = strut_of(c)
            return None if s is None else f"strut{s}"
        if -6.228 <= c.y <= -6.2:
            return "girder"
        b = bracket_of(c)
        if b is not None:
            return f"bracket{BRACKETS.index(b)}"
        if abs(c.x) > 5.35 and -0.76 < c.z < -0.37:
            return "gusset"
        if abs(c.x) > 6.0 and -0.42 < c.z < 0.75:
            return "post"
        if abs(c.x) < 4.65 and (0.36 < abs(c.z) < 0.95):
            return None                      # decal of a vanilla bracket the mount does not use
        return "band"
    return None


# ---------------------------------------------------------------- vertex maps
BAND_CUT = 3.3   # LOD3 (no band detail between 0.8 and 3.7) uses 3.0, so the deck-edge cut's vertices at 3.29 move too


def map_band(co):
    # Top: everything from the top bracket's inner edge to past the S-curve's decal tip (vanilla |x| 5.44)
    # moves with the top bracket (2.249). The cut at 5.5 falls in straight runs only, between that tip
    # and the rim notch (5.61 to 5.83), which moves with the corner so it lines up with the bottom notch.
    # So the deep top flange between S-curve and corner is 0.25 m shorter. Bottom: corner moves as one (2.5).
    ax, s = abs(co.x), (1 if co.x >= 0 else -1)
    if co.z > 0 and BAND_CUT <= ax < 5.5:
        ax -= SHIFT - 0.251
    elif ax >= BAND_CUT:
        ax -= SHIFT
    return Vector((s * ax, co.y, co.z))


def map_ends(co):
    s = 1 if co.x >= 0 else -1
    return Vector((co.x - s * SHIFT if abs(co.x) > 3.0 else co.x, co.y, co.z))


def map_strut(co, i):
    _xr, a, b, a2, b2 = STRUTS[i]
    ab = Vector((b[0] - a[0], b[1] - a[1]))
    t = Vector((co.x - a[0], co.z - a[1])).dot(ab) / ab.length_squared
    d = (a2[0] - a[0], a2[1] - a[1]) if t < 0.5 else (b2[0] - b[0], b2[1] - b[1])
    return Vector((co.x + d[0], co.y, co.z + d[1]))


def map_bracket(co, i):
    xs, up, xd = BRACKETS[i]
    z = co.z
    if up and z < 0.80:
        z -= D
    if not up and z > -0.80:
        z += D
    return Vector((co.x + xd - xs, co.y, z))


def map_gusset(co, decal=False):
    # geometry: cut under the chamfer (-0.655), so the chamfer moves whole and stays square to the brace;
    # decal lines: cut just under the frame's chamfer line, so it moves whole too and only the short
    # vertical under it stretches (a cut through the chamfer line broke it, owner's markup 2026-11-07)
    v = map_ends(co)
    if v.z > (GUSSET_DECAL_CUT if decal else -0.695):
        v.z += D
    return v


def map_post(co):
    s = 1 if co.x >= 0 else -1
    v = Vector((co.x - s * SHIFT, co.y, co.z))
    if abs(co.x) < 6.16:
        v.x -= s * POST_IN
    # the post foot rises D with the deeper gusset; the plain run from the foot (-0.398) to the lower
    # detail (-0.176) takes the stretch, so no face (or diagonal cut) folds over
    lo, hi = -0.398, -0.176
    if co.z <= lo:
        v.z += D
    elif co.z < hi:
        v.z += D * (hi - co.z) / (hi - lo)
    return v


def map_co(co, role, decal=False):
    if role == "gusset":
        return map_gusset(co, decal)
    if role == "band":
        return map_band(co)
    if role in ("girder", "wall"):
        return map_ends(co)
    if role.startswith("strut"):
        return map_strut(co, int(role[5:]))
    if role.startswith("bracket"):
        return map_bracket(co, int(role[7:]))
    if role == "gusset":
        return map_gusset(co)
    if role == "post":
        return map_post(co)
    raise ValueError(role)


def root_move(c, role):
    """Move of a vent or bolt (centre c) on a bracket or gusset: the map's move, minus the stretch for
    pieces by the root."""
    v = map_co(c, role, True)
    if (c.z < GUSSET_ROOT_CUT) if role == "gusset" else (abs(c.z) > ROOT_CUT):
        v.z = c.z
    return v - c


def check_shear(isl, orig):
    """A stretched line may only lengthen along z: every outline edge whose ends moved differently must be
    vertical, within 1 cm sideways (vanilla's strips taper up to 8 mm, the chamfer lines run 0.3 m; inner
    diagonals of a stretched strip may turn)."""
    inside = set(isl)
    for f in isl:
        for e in f.edges:
            if sum(g in inside for g in e.link_faces) != 1:
                continue
            a, b = e.verts
            d = orig[a] - orig[b]
            if ((a.co - orig[a]) - (b.co - orig[b])).length > 1e-6 and d.xy.length > 0.01:
                SHEARS.append((tuple(round(x, 3) for x in orig[a]), tuple(round(x, 3) for x in orig[b])))
                return


def settle_decal_islands(bm, orig, role, mats):
    """Decals must not shear. Each connected decal piece that the map moved unevenly either stretches (a
    line running along the stretch, more than 3 times longer than wide) or moves whole, by the map's move
    at its centre (vents, bolts, plates, and lines across the stretch). On brackets and gussets, lines
    keep the map vertex by vertex and other pieces follow root_move."""
    stretch = role.startswith("bracket") or role == "gusset"
    seen = set()
    for f0 in bm.faces:
        if f0.index in seen:
            continue
        seen.add(f0.index)
        stack, isl = [f0], []
        while stack:
            f = stack.pop()
            isl.append(f)
            for v in f.verts:
                for g in v.link_faces:
                    if g.index not in seen:
                        seen.add(g.index)
                        stack.append(g)
        verts = list({v for f in isl for v in f.verts})
        lo = Vector([min(orig[v][i] for v in verts) for i in range(3)])
        hi = Vector([max(orig[v][i] for v in verts) for i in range(3)])
        if stretch:
            if mats[isl[0].material_index].name.startswith(LINE_MATS):
                check_shear(isl, orig)
            else:
                dc = root_move((lo + hi) / 2, role)
                for v in verts:
                    v.co = orig[v] + dc
            continue
        disp = [v.co - orig[v] for v in verts]
        if max((d - disp[0]).length for d in disp) < 1e-6:
            continue
        ext = hi - lo
        spread = [max(d[i] for d in disp) - min(d[i] for d in disp) for i in range(3)]
        ax = max(range(3), key=lambda i: spread[i])
        nrm = sum((f.normal for f in isl), Vector())
        flat = max(range(3), key=lambda i: abs(nrm[i]))
        across = max(ext[i] for i in range(3) if i not in (ax, flat))
        if ext[ax] > 3 * across:
            continue
        c = (lo + hi) / 2
        dc = map_co(c, role, True) - c
        for v in verts:
            v.co = orig[v] + dc


# ---------------------------------------------------------------- mesh helpers
def bm_with_normals(obj):
    me = obj.data.copy()
    rot = obj.matrix_world.to_3x3().inverted().transposed()
    cn = [c for l in me.corner_normals for c in (rot @ l.vector).normalized()]
    if "_cn" in me.attributes:
        me.attributes.remove(me.attributes["_cn"])
    me.attributes.new("_cn", "FLOAT_VECTOR", "CORNER").data.foreach_set("vector", cn)
    bm = bmesh.new()
    bm.from_mesh(me)
    mats = list(me.materials)
    bpy.data.meshes.remove(me)
    bm.transform(obj.matrix_world)
    bm.normal_update()
    return bm, mats


def face_uv_gradient(f, uvl, orig):
    """(gu, gv): 3D vectors in the face plane with uv(p) - uv(p0) = (gu.(p - p0), gv.(p - p0)), from the
    face's original corner positions. None for a degenerate face."""
    ls = f.loops
    p = [orig[l.vert] for l in ls]
    for j in range(1, len(ls) - 1):
        e1, e2 = p[j] - p[0], p[j + 1] - p[0]
        if e1.cross(e2).length > 1e-8:
            break
    else:
        return None
    du1, du2 = ls[j][uvl].uv - ls[0][uvl].uv, ls[j + 1][uvl].uv - ls[0][uvl].uv
    g11, g12, g22 = e1.dot(e1), e1.dot(e2), e2.dot(e2)
    det = g11 * g22 - g12 * g12
    out = []
    for c in (0, 1):
        a = (g22 * du1[c] - g12 * du2[c]) / det
        b = (g11 * du2[c] - g12 * du1[c]) / det
        out.append(a * e1 + b * e2)
    return out


def fix_uvs(bm, orig):
    """Keep texel density on stretched faces without opening UV seams.
    Faces are grouped into UV islands (neighbours whose shared corners have the same UVs). In each island,
    every vertex's UV is shifted by one amount: its movement beyond the island's common move (the most
    frequent displacement), through the UV gradient of the largest island face around it. Islands that
    only moved with their common move keep their UVs."""
    uvl = bm.loops.layers.uv.active
    bm.faces.index_update()
    bm.verts.index_update()
    bm.faces.ensure_lookup_table()
    parent = list(range(len(bm.faces)))

    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    def uv_at(v, fi):
        return next(l for l in v.link_loops if l.face.index == fi)[uvl].uv

    for e in bm.edges:
        if len(e.link_faces) != 2:
            continue
        a, b = (f.index for f in e.link_faces)
        # whole-tile jumps on a tiling texture are no seam
        if all(max(abs(c - round(c)) for c in uv_at(v, a) - uv_at(v, b)) < 1e-5 for v in e.verts):
            parent[find(a)] = find(b)
    islands = {}
    for f in bm.faces:
        islands.setdefault(find(f.index), []).append(f.index)
    for isl in islands.values():
        members = set(isl)
        verts = {v.index: v for fi in isl for v in bm.faces[fi].verts}
        tally = {}
        for v in verts.values():
            k = tuple(round(c, 4) for c in (v.co - orig[v]))
            tally[k] = tally.get(k, 0) + 1
        base = Vector(max(tally, key=tally.get))
        grads = {fi: face_uv_gradient(bm.faces[fi], uvl, orig) for fi in isl}
        shift = {}
        for vi, v in verts.items():
            d = v.co - orig[v] - base
            if d.length < 1e-6:
                continue
            # the largest face round the vertex sets its shift: an average with thin bevels shears the
            # texture across the big face's triangles
            fs = [l.face for l in v.link_loops if l.face.index in members and grads[l.face.index] is not None]
            if fs:
                gu, gv = grads[max(fs, key=lambda f: f.calc_area()).index]
                shift[vi] = Vector((gu.dot(d), gv.dot(d)))
        for fi in isl:
            for l in bm.faces[fi].loops:
                if l.vert.index in shift:
                    l[uvl].uv = l[uvl].uv + shift[l.vert.index]


def append_bm(dst, dst_mats, srcbm, src_mats):
    # New faces are found by tag, not by position: after a delete, bmesh reuses freed slots, so appended
    # faces can sit anywhere in dst.faces.
    me = bpy.data.meshes.new("_tmp")
    srcbm.to_mesh(me)
    for f in dst.faces:
        f.tag = True
    dst.from_mesh(me)
    bpy.data.meshes.remove(me)
    remap = []
    for m in src_mats:
        if m not in dst_mats:
            dst_mats.append(m)
        remap.append(dst_mats.index(m))
    for f in dst.faces:
        if not f.tag:
            f.material_index = remap[f.material_index] if f.material_index < len(remap) else 0
        f.tag = False


def doubler_bm(mat):
    """Doubler plates under the top and bottom girders of the -Y side, closed back to the wall."""
    dd = DOUBLER
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    cnl = bm.loops.layers.float_vector.new("_cn")
    x0, x1 = -dd["x_end"], dd["x_end"]
    b = dd["bevel"]
    for s in (1, -1):
        zl, zh = dd["z_lo"], dd["z_hi"]
        yf, yw = dd["y_face"], dd["y_wall"]
        # profile from the girder (hidden top edge) down the face, a 45 deg bevel, back to the wall
        prof = [(yf, zh), (yf, zl + b), (yf + b, zl), (yw, zl)]
        prof = [(y, s * z) for y, z in prof]
        # UVs unwrapped along the profile (u along x, v along the profile's length): no seam at the bevel
        arc = [0.0]
        for (y0, z0), (y1, z1) in zip(prof, prof[1:]):
            arc.append(arc[-1] + math.hypot(y1 - y0, z1 - z0))
        rows = [[bm.verts.new((x, y, z)) for (y, z) in prof] for x in (x0, x1)]
        uv_of = {}
        for r, x in zip(rows, (x0, x1)):
            for k, vert in enumerate(r):
                uv_of[vert] = (x * dd["uv_per_m"] + 0.37, s * arc[k] * dd["uv_per_m"] + 0.37)
        outward = [Vector((0, -1, 0)), Vector((0, -1, -s)).normalized(), Vector((0, 0, -s))]
        for k in range(len(prof) - 1):
            f = bm.faces.new([rows[0][k], rows[1][k], rows[1][k + 1], rows[0][k + 1]])
            f.material_index = 0
            f.normal_update()
            if f.normal.dot(outward[k]) < 0:
                f.normal_flip()
            for l in f.loops:
                l[uvl].uv = uv_of[l.vert]
                l[cnl] = f.normal
    return bm, [mat]


def split_for_wedge(bm, rim):
    """Cut faces that cross the corner diagonals, so each wedge takes exactly its half. For the platform
    body also cut every flat (horizontal) face at the deck edge (vanilla 5.9405, mount 3.4405): vanilla's
    deck and rim are one fan-triangulated face, and so are the band's ledges, whose fans reach deep inside
    the platform. Only the outer strip is used (hidden behind the wall past 6.15; the deck is kept)."""
    planes = [((0, 0, 0), (1, -1, 0)), ((0, 0, 0), (1, 1, 0))]
    if rim:
        planes += [((s * DECK_EDGE, 0, 0), (1, 0, 0)) for s in (1, -1)]
        planes += [((0, s * DECK_EDGE, 0), (0, 1, 0)) for s in (1, -1)]
    for k, (co, no) in enumerate(planes):
        if k < 2:
            geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
        else:
            faces = [f for f in bm.faces if abs(f.normal.z) > 0.9]
            geom = faces + list({e for f in faces for e in f.edges}) + list({v for f in faces for v in f.verts})
        bmesh.ops.bisect_plane(bm, geom=geom, dist=1e-5, plane_co=co, plane_no=Vector(no).normalized())
    if rim:
        # band ledges behind the backing wall are hidden; their fans span the cut lines and fold, so drop them
        def ledge(f):
            return abs(f.normal.z) > 0.9 and abs(f.calc_center_median().z) < 1.2
        bm.normal_update()
        for k, no in enumerate(((1, 0, 0), (0, 1, 0))):
            for s in (1, -1):
                faces = [f for f in bm.faces if ledge(f)]
                geom = faces + list({e for f in faces for e in f.edges}) + list({v for f in faces for v in f.verts})
                co = Vector(no) * (s * WALL)
                bmesh.ops.bisect_plane(bm, geom=geom, dist=1e-5, plane_co=co, plane_no=Vector(no))
        bm.normal_update()
        inner = [f for f in bm.faces if ledge(f) and max(abs(c) for c in f.calc_center_median().xy) < WALL]
        bmesh.ops.delete(bm, geom=inner, context="FACES")


def trim_behind_doubler(bm):
    """Flat faces inside the doubler's height (the deep top flange's underside at |z| 0.735) reach back
    through the doubler, and their hidden top side showed through the slot under the girder at grazing
    angles. Cut them at the doubler face and drop the part behind it."""
    dd = DOUBLER
    def inside(f):
        c = f.calc_center_median()
        return abs(f.normal.z) > 0.9 and dd["z_lo"] < abs(c.z) < dd["z_hi"] and abs(c.x) < dd["x_end"]
    bm.normal_update()
    faces = [f for f in bm.faces if inside(f)]
    geom = faces + list({e for f in faces for e in f.edges}) + list({v for f in faces for v in f.verts})
    bmesh.ops.bisect_plane(bm, geom=geom, dist=1e-5, plane_co=(0, dd["y_face"], 0), plane_no=(0, 1, 0))
    bm.normal_update()
    kill = [f for f in bm.faces if inside(f) and f.calc_center_median().y > dd["y_face"]]
    bmesh.ops.delete(bm, geom=kill, context="FACES")


# ---------------------------------------------------------------- build
LOD3 = dict(alias={"Part_01": "Part_02", "Part_02": "Part_01"}, band_cut=3.0)   # vanilla LOD3: posts and struts swap names


def build(src_scene=SRC_SCENE, out_name=OUT_NAME, alias=None, band_cut=3.3):
    """Build the sides from the vanilla platform in src_scene into object out_name. For the LODs, src_scene holds
    vanilla's LOD model imported by SEUT (KB_LOD1, KB_LOD2: same parts, fewer bevels and decals; KB_LOD3 with
    **LOD3: its parts carry other names, and its band has no detail near the shift cut)."""
    global BAND_CUT
    BAND_CUT = band_cut
    alias = alias or {}
    parts = ["Structural_5_platform", "Part_01", "Part_02", "Part_03", "Part_04", "Part_05",
             "Part_06", "Part_07", "Part_08"]
    out = bmesh.new()
    out_mats = []
    counts = {}
    darker = None
    FOLDS.clear()
    SHEARS.clear()
    for part in parts:
        try:
            obj = src(alias.get(part, part), src_scene)
        except KeyError:
            counts[part] = "missing"
            continue
        base, mats = bm_with_normals(obj)
        split_for_wedge(base, part == "Structural_5_platform")
        base.faces.ensure_lookup_table()
        roles = {}
        for f in base.faces:
            m = mats[f.material_index] if f.material_index < len(mats) else None
            if m is not None and m.name == "PaintedMetal_Darker":
                darker = m
            r = role_of(part, f.calc_center_median(), m)
            if r is not None:
                roles.setdefault(r, []).append(f.index)
        for r, idx in roles.items():
            bm = base.copy()
            bm.faces.ensure_lookup_table()
            keep = set(idx)
            bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.index not in keep], context="FACES")
            decal = all(is_decal(mats[f.material_index]) for f in bm.faces if f.material_index < len(mats))
            orig = {v: v.co.copy() for v in bm.verts}
            bm.faces.index_update()
            bm.normal_update()
            n_before = {f.index: f.normal.copy() for f in bm.faces}
            for v in bm.verts:
                v.co = map_co(v.co, r, decal)
            if decal:
                settle_decal_islands(bm, orig, r, mats)
            bm.normal_update()
            folded = [f for f in bm.faces if f.calc_area() > 1e-9 and f.normal.dot(n_before[f.index]) < 0.5]
            if folded:
                FOLDS.extend((part, r, tuple(round(c, 3) for c in orig[f.verts[0]]), round(f.calc_area(), 5))
                             for f in folded)
            if not decal:
                fix_uvs(bm, orig)
            for v in bm.verts:
                v.co.y += SHIFT
            append_bm(out, out_mats, bm, mats)
            counts[f"{part}:{r}"] = len(bm.faces)
            bm.free()
        base.free()
    trim_behind_doubler(out)
    dbm, dmats = doubler_bm(darker)
    append_bm(out, out_mats, dbm, dmats)
    counts["doubler"] = len(dbm.faces)
    dbm.free()

    # four sides: rotate copies of the -Y side about Z
    cnl = out.loops.layers.float_vector.get("_cn")
    side_faces = list(out.faces)
    for k in (1, 2, 3):
        rot = Matrix.Rotation(math.radians(90 * k), 3, "Z")
        res = bmesh.ops.duplicate(out, geom=side_faces + list({v for f in side_faces for v in f.verts}) +
                                  list({e for f in side_faces for e in f.edges}))
        newf = [g for g in res["geom"] if isinstance(g, bmesh.types.BMFace)]
        newv = [g for g in res["geom"] if isinstance(g, bmesh.types.BMVert)]
        for v in newv:
            v.co = rot @ v.co
        for f in newf:
            for l in f.loops:
                l[cnl] = rot @ Vector(l[cnl])

    sc = bpy.data.scenes.get(OUT_SCENE) or bpy.data.scenes.new(OUT_SCENE)
    old = bpy.data.objects.get(out_name)
    if old is not None:
        om = old.data
        bpy.data.objects.remove(old)
        if om.users == 0:
            bpy.data.meshes.remove(om)
    me = bpy.data.meshes.new(out_name)
    out.to_mesh(me)
    out.free()
    for m in out_mats:
        me.materials.append(m)
    at = me.attributes["_cn"]
    vec = [0.0] * (len(me.loops) * 3)
    at.data.foreach_get("vector", vec)
    me.normals_split_custom_set([Vector(vec[i:i + 3]).normalized() for i in range(0, len(vec), 3)])
    me.attributes.remove(me.attributes["_cn"])
    ob = bpy.data.objects.new(out_name, me)
    sc.collection.objects.link(ob)
    return ob, counts
