"""Build stages BS1 to BS3 for the Hurricane turret (design.md step 6; se-dev-seut block-scenes.md, "Designing the
stages"). One mesh per stage, <SubtypeId>_BSn in BSn (GVK_HurricaneTurret), in block space, the guns at rest.

- Base: Keen's Structural_5_platformConveyorConstruction_n (scenes KB_BS1..3, SEUT import), moved down to the plinth
  cell, its corner posts widened as build_platform.py widens the finished ones. Its top-centre port pieces (the
  separate .001 objects) are left out: the disc covers that spot.
- Head: low-poly proxies of the finished parts in Construction (box UVs, flat shading). A framed part is its proxy
  with each face inset STRIP, the face removed and the strips solidified THICK; a solid part is the proxy as it is.
  Every stage fills the whole outline; only the detail grows. Load path in every stage: deck -> disc (spokes under
  its top while framed) -> bearing ring -> floor beams under the gunhouse -> trunnion pedestals and the mid support
  pillar -> shaft -> drum -> cones (collar at each tip) -> barrels.
  - BS1: frames over the disc, gunhouse, bustle, rear hatch, drum and barrels; solid ring, beams, pedestals, pillar,
    mid support and shaft.
  - BS2: the disc turns solid; inside the still-framed gunhouse the mechanisms appear as solids: drum, cones,
    barrels, side boxes, the deck's feed and power boxes, the rear hatch and feed tube, the sensor dome's base.
  - BS3: gunhouse and bustle solid, except the roof and the front, which stay open frame so the drum shows; the
    muzzle brakes, ridges, periscope, sensor dome, deck pipes and the keypads.
Run inside HurricanePlatform.blend:
    ns = {}; exec(open(path).read(), ns); report = ns["build_all"]()
Running it again replaces the stage meshes.
"""
import math

import bmesh
import bpy
from mathutils import Matrix, Vector

HERE = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools" + "\\"
P = "GVK_HurricaneTurret"
STRIP, THICK = 0.07, 0.02
UV = 0.5                                    # box UVs per metre
PLINTH = Matrix.Translation((0, 0, -2.5))   # Keen's stages are one cell centred on 0; the plinth is the bottom cell
POST_IN, POST_X = 0.12, 6.16                # as build_platform.py: corner post 0.18 m wide, widened to 0.30
TURN = Matrix.Rotation(math.pi, 4, "Z")
# Subpart poses at rest, as the game places them: the azimuth part (linked from the main scene) turns half a turn;
# a subpart linked from a subpart scene keeps its parent's frame (se-dev-seut modeling-rules.md, "Which way a
# subpart faces"). This matches the pre-split model: cone tips at y -4.7, muzzles at -11.58.
AZ = Matrix.Translation((0, 0, 1.9)) @ TURN
EL = AZ @ Matrix.Translation((0, 2.2, 0))
AXIS_Y, AXIS_Z = -2.2, 1.9                  # elevation axis in block space
BARREL_X = 1.9
L = {}
exec(open(HERE + "lods.py").read(), L)      # extract, make_mesh


def lib(name):
    """The SEUT library's material of that name, else any of that name."""
    ms = [m for m in bpy.data.materials if m.name == name or m.name.startswith(name + ".")]
    return next((m for m in ms if m.library and m.name == name), None) or next(m for m in ms if m.name == name)


# --- shapes (bmesh) ---
def ring(n, r, rot=0.0):
    return [(r * math.cos(rot + 2 * math.pi * i / n), r * math.sin(rot + 2 * math.pi * i / n)) for i in range(n)]


def loft(rings):
    """A closed solid through (points, z) rings of one count; capped."""
    return loft3([[(x, y, z) for x, y in pts] for pts, z in rings])


def loft3(rings):
    """A closed solid through rings of 3D points of one count; capped."""
    bm = bmesh.new()
    vs = [[bm.verts.new(p) for p in pts] for pts in rings]
    n = len(vs[0])
    for a, b in zip(vs, vs[1:]):
        for i in range(n):
            bm.faces.new([a[i], a[(i + 1) % n], b[(i + 1) % n], b[i]])
    bm.faces.new(list(reversed(vs[0])))
    bm.faces.new(vs[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def box(x0, x1, y0, y1, z0, z1):
    return loft([([(x0, y0), (x1, y0), (x1, y1), (x0, y1)], z) for z in (z0, z1)])


def beam(p0, p1, w, z0, z1):
    a, b = Vector(p0), Vector(p1)
    d = (b - a).normalized()
    n = Vector((-d.y, d.x)) * w / 2
    return loft([([tuple(a - n), tuple(b - n), tuple(b + n), tuple(a + n)], z) for z in (z0, z1)])


def annulus(n, r0, r1, z0, z1):
    bm = bmesh.new()
    o0, o1, i0, i1 = [[bm.verts.new((x, y, z)) for x, y in ring(n, r)] for r, z in ((r1, z0), (r1, z1), (r0, z0), (r0, z1))]
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new([o0[i], o0[j], o1[j], o1[i]])
        bm.faces.new([i0[j], i0[i], i1[i], i1[j]])
        bm.faces.new([o1[i], o1[j], i1[j], i1[i]])
        bm.faces.new([o0[j], o0[i], i0[i], i0[j]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def cyl(axis, n, stations, c):
    """A round solid on an X or Y axis through c: stations are (position along the axis, radius)."""
    def pt(a, u, v):
        return (a, c[1] + u, c[2] + v) if axis == "X" else (c[0] + u, a, c[2] + v)
    return loft3([[pt(a, u, v) for u, v in ring(n, r, math.pi / n)] for a, r in stations])


def pose(o):
    """Block-space matrix of a finished part at rest."""
    s = o.users_scene[0].name
    if s == P + "_Az":
        return AZ @ o.matrix_world
    if s == P + "_El":
        return EL @ o.matrix_world
    if s.startswith(P + "_Barrel_"):
        x = -BARREL_X if s.endswith("_1") else BARREL_X        # the empties' x in the El scene
        return EL @ Matrix.Translation((x, 2.5, 0)) @ o.matrix_world
    return o.matrix_world


def _hull_of(pts):
    bm = bmesh.new()
    for p in pts:
        bm.verts.new(p)
    bmesh.ops.convex_hull(bm, input=bm.verts, use_existing_faces=False)
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context="VERTS")
    return bm


def hull(names, merge_dist=0.10):
    """Convex hull of the named parts, its corners closer than merge_dist merged, coplanar faces joined."""
    pts = []
    for name in names:
        o = bpy.data.objects[name]
        M = pose(o)
        pts += [M @ v.co for v in o.data.vertices]
    bm = _hull_of(pts)
    for _ in range(2):
        groups = []
        for v in sorted((v.co.copy() for v in bm.verts), key=lambda c: (c.x, c.y, c.z)):
            g = next((g for g in groups if (g[0] / len(g[1]) - v).length < merge_dist), None)
            if g:
                g[0] += v
                g[1].append(v)
            else:
                groups.append([v.copy(), [v]])
        bm.free()
        bm = _hull_of([g[0] / len(g[1]) for g in groups])
    bmesh.ops.dissolve_limit(bm, angle_limit=math.radians(1.0), verts=bm.verts[:], edges=bm.edges[:])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def panels(bm, faces, pitch):
    """Split the given faces into panels about pitch (x, y, z) apart, so a big face frames as a grid, not a rim."""
    lo = [min(v.co[i] for f in faces for v in f.verts) for i in range(3)]
    hi = [max(v.co[i] for f in faces for v in f.verts) for i in range(3)]
    for i in range(3):
        k = round((hi[i] - lo[i]) / pitch[i])
        for j in range(1, k):
            no = [0.0, 0.0, 0.0]
            no[i] = 1.0
            co = [0.0, 0.0, 0.0]
            co[i] = lo[i] + (hi[i] - lo[i]) * j / k
            geom = list({e for f in faces for e in f.edges}) + list({v for f in faces for v in f.verts}) + faces
            r = bmesh.ops.bisect_plane(bm, geom=geom, dist=1e-4, plane_co=co, plane_no=no)
            faces = [f for f in set(faces) | {g for g in r["geom"] if isinstance(g, bmesh.types.BMFace)} if f.is_valid]
    return faces


def framed(bm, cut_if=lambda f: True, strip=STRIP, thick=THICK, pitch=None):
    """Faces cut_if picks become strip frames (split into panels first if pitch is given); all made THICK.
    A face too small for two strips stays a plate (a gusset). A face with a corner under 35 degrees, where an inset
    would spike, is left open: its neighbours' strips frame it (as a plate it read as a stray solid shard)."""
    bm.normal_update()
    cut = [f for f in bm.faces if cut_if(f)]
    if pitch and cut:
        cut = panels(bm, cut, pitch)
        bm.normal_update()
    cut = [f for f in cut if 2 * f.calc_area() / f.calc_perimeter() > 2.4 * strip]
    sharp = [f for f in cut if min(l.calc_angle() for l in f.loops) <= math.radians(35)]
    if sharp:
        bmesh.ops.delete(bm, geom=sharp, context="FACES_ONLY")
        cut = [f for f in cut if f.is_valid]
    if cut:
        bmesh.ops.inset_individual(bm, faces=cut, thickness=strip, depth=0.0, use_even_offset=True)
        bmesh.ops.delete(bm, geom=cut, context="FACES_ONLY")
    bmesh.ops.solidify(bm, geom=list(bm.faces), thickness=thick)
    return bm


def drop(bm, test):
    """Remove the faces test picks (a face hidden against another part)."""
    bm.normal_update()
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if test(f)], context="FACES_ONLY")
    return bm


def merge(dst, src):
    vm = {v: dst.verts.new(v.co) for v in src.verts}
    for f in src.faces:
        try:
            dst.faces.new([vm[v] for v in f.verts])
        except ValueError:
            pass
    src.free()


def span(poly, axis, c, pad=0.03):
    """Where the line (axis 0: y = c, axis 1: x = c) crosses a convex 2D polygon, pulled in by pad."""
    hits = []
    for a, b in zip(poly, poly[1:] + poly[:1]):
        u, v = (a[1], b[1]) if axis == 0 else (a[0], b[0])
        if (u - c) * (v - c) <= 0 and u != v:
            t = (c - u) / (v - u)
            hits.append((a[0] + t * (b[0] - a[0])) if axis == 0 else (a[1] + t * (b[1] - a[1])))
    return (min(hits) + pad, max(hits) - pad) if len(hits) >= 2 else None


# --- the base: Keen's stage n ---
def side_of(c):
    """Which side a point belongs to, as k quarter turns from the -Y side."""
    x, y = c[0], c[1]
    if -y >= abs(x):
        return 0
    if x >= abs(y):
        return 1
    if y >= abs(x):
        return 2
    return 3


def widen_posts(co, polys):
    """Corner post faces (on the side wall, by the corner, between the rails) get their own corners, and those
    inside POST_X move POST_IN towards the middle, as build_platform.py widens the finished posts."""
    moved = 0
    for i, (vs, uv, ns, mat) in enumerate(polys):
        c = sum((co[v] for v in vs), Vector()) / len(vs)
        k = side_of(c)
        R = Matrix.Rotation(k * math.pi / 2, 3, "Z")
        q = R.transposed() @ c
        if not (abs(q.x) > 6.0 and q.y < -6.12 and -0.40 < q.z + 2.5 < 0.73):
            continue
        new = []
        for v in vs:
            p = R.transposed() @ co[v]
            if abs(p.x) < POST_X:
                p.x -= math.copysign(POST_IN, p.x)
            co.append(R @ p)
            new.append(len(co) - 1)
        polys[i] = (new, uv, ns, mat)
        moved += 1
    return moved


def base(n):
    o = next(o for o in bpy.data.scenes["KB_BS%d" % n].objects if o.type == "MESH" and o.parent is None)
    me = o.data
    co, polys = L["extract"](me, range(len(me.polygons)), PLINTH @ o.matrix_world)
    polys = [(vs, uv, ns, lib(m.name.split(".")[0]) if m else lib("Construction")) for vs, uv, ns, m in polys]
    return co, polys, widen_posts(co, polys)


def to_part(bm, mat):
    """(co, polys) with box UVs and flat normals."""
    bm.normal_update()
    vi = {v: i for i, v in enumerate(bm.verts)}
    co = [v.co.copy() for v in bm.verts]
    polys = []
    for f in bm.faces:
        n = f.normal
        ax = max(range(3), key=lambda i: abs(n[i]))
        u, w = [i for i in range(3) if i != ax]
        polys.append(([vi[v] for v in f.verts], [(v.co[u] * UV + 0.137, v.co[w] * UV + 0.291) for v in f.verts],
                      [n.copy() for _ in f.verts], mat))
    return co, polys


# --- the head, in block space at rest ---
GUNHOUSE = ("Gunhouse", "Chin", "GH_ChinPlate")
BACK = 4.2                                  # the gunhouse's back wall, where the bustle meets it
PANEL = (1.5, 1.5, 1.2)                     # panel pitch (x, y, z) of the framed gunhouse and bustle
CONE_R = (0.69, 0.41)                       # cone radius at the drum and at its tip (from its end faces)


def bounds(names):
    """(min, max) corners of the named finished parts in block space at rest."""
    pts = [pose(o) @ v.co for o in (bpy.data.objects[n] for n in names) for v in o.data.vertices]
    return (Vector([min(p[i] for p in pts) for i in range(3)]), Vector([max(p[i] for p in pts) for i in range(3)]))


def head(n):
    bm = bmesh.new()
    disc = loft([(ring(24, 4.6), -1.33), (ring(24, 4.6), -0.9)])
    if n == 1:
        merge(bm, framed(disc))
        for k in range(8):                  # spokes under the framed top, flush with it: the ring sits on them
            a = math.radians(45 * k)
            merge(bm, beam((0.3 * math.cos(a), 0.3 * math.sin(a)), (4.55 * math.cos(a), 4.55 * math.sin(a)), 0.12, -1.0, -0.9))
        merge(bm, loft([(ring(12, 0.45), -1.25), (ring(12, 0.45), -0.9)]))
    else:
        merge(bm, disc)
    merge(bm, annulus(24, 2.32, 2.7, -0.96, -0.59))          # bearing ring

    gh = hull(GUNHOUSE)
    floor = max((f for f in gh.faces if f.normal.z < -0.99), key=lambda f: f.calc_area())
    poly = [(v.co.x, v.co.y) for v in floor.verts]
    z0 = floor.calc_center_median().z
    if n < 3:
        merge(bm, framed(gh, pitch=PANEL))
        for y in (-2.2, 0.0, 2.2):          # floor beams: on the ring, out to the floor frame's strips
            s = span(poly, 0, y)
            if s:
                merge(bm, beam((s[0], y), (s[1], y), 0.14, z0, z0 + 0.10))
        for x in (-2.5, 0.0, 2.5):
            s = span(poly, 1, x)
            if s:
                merge(bm, beam((x, s[0]), (x, s[1]), 0.14, z0, z0 + 0.10))
    else:                                   # roof and front open, so the drum and the breeches show
        merge(bm, framed(gh, lambda f: f.normal.z > 0.7 or f.normal.y < -0.5, pitch=PANEL))

    bu = drop(hull(("Bustle",)), lambda f: f.normal.y < -0.99 and abs(f.calc_center_median().y - BACK) < 0.05)
    merge(bm, framed(bu, pitch=PANEL) if n < 3 else bu)
    hatch = hull(("RearHatch",))
    merge(bm, framed(hatch) if n == 1 else hatch)

    # pivot: pedestals on the floor carry the shaft; a pillar carries the mid support
    for s in (-1, 1):
        merge(bm, box(min(s * 3.2, s * 3.6), max(s * 3.2, s * 3.6), AXIS_Y - 0.35, AXIS_Y + 0.35, z0, AXIS_Z + 0.25))
    merge(bm, box(-0.35, 0.35, -2.6, -1.8, z0, 0.9))
    merge(bm, hull(("MidSupport",)))
    merge(bm, cyl("X", 12, [(-3.6, 0.22), (3.6, 0.22)], (0, AXIS_Y, AXIS_Z)))
    drum = cyl("X", 16, [(-3.15, 0.84), (3.15, 0.84)], (0, AXIS_Y, AXIS_Z))
    merge(bm, framed(drum) if n == 1 else drum)

    # guns, from the finished parts: the cone stands on the drum's front and carries the barrel, which starts
    # inside it; the brake on the barrel's end
    for side in ("L", "R"):
        b, k, cn = (bounds((name + side,)) for name in ("Barrel_", "Brake_", "Cone_"))
        c = ((b[0].x + b[1].x) / 2, 0, AXIS_Z)
        r = (b[1].x - b[0].x) / 2
        tip, root = cn[0].y, cn[1].y                       # cone: narrow end forward, wide end on the drum
        if n == 1:
            merge(bm, framed(cyl("Y", 8, [(root, CONE_R[0]), (tip, CONE_R[1])], c)))
            merge(bm, cyl("Y", 12, [(tip, CONE_R[1] + 0.02), (tip + 0.10, CONE_R[1] + 0.02)], c))   # collar
            merge(bm, framed(cyl("Y", 8, [(k[0].y, r), (b[1].y, r)], c)))
        else:
            merge(bm, cyl("Y", 16, [(root, CONE_R[0]), (tip, CONE_R[1])], c))
            merge(bm, cyl("Y", 12, [(k[0].y if n == 2 else b[0].y, r), (b[1].y, r)], c))
        if n == 3:                                                              # muzzle brake
            rk = (k[1].x - k[0].x) / 2
            merge(bm, cyl("Y", 12, [(k[0].y, rk), (k[1].y, rk)], c))
            for d in (0.33, 0.98):
                merge(bm, cyl("Y", 12, [(k[0].y + d, rk + 0.03), (k[0].y + d + 0.15, rk + 0.03)], c))

    if n >= 2:
        for names in (("SideBox_L",), ("SideBox_R",), ("Pl_FeedBox",), ("Pl_PowerBox",), ("RearFeedTube",)):
            merge(bm, hull(names))
        merge(bm, hull(("SensorDomeFlange",) if n == 2 else ("SensorDome", "SensorDomeFlange")))
    if n == 3:
        # not RearPipes: the hull of its hose loop filled the loop into a half-moon plate
        for names in (("Ridge_L",), ("Ridge_R",), ("Periscope",), ("Pl_FeedPipes",),
                      ("Pl_PowerConduits",), ("Pl_KeypadFrame_F",), ("Pl_KeypadFrame_B",), ("Pl_KeypadFrame_L",),
                      ("Pl_KeypadFrame_R",)):
            merge(bm, hull(names, 0.03))
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    return bm


def bs_col(n):
    return bpy.data.collections["BS%d (%s)" % (n, P)]


def build(n):
    co, polys, posts = base(n)
    hb = head(n)
    hco, hpolys = to_part(hb, lib("Construction"))
    hb.free()
    name = "%s_BS%d" % (P, n)
    me = L["make_mesh"](name + "_new", [(co, polys), (hco, hpolys)])
    ob = bpy.data.objects.get(name)
    if ob is None:
        ob = bpy.data.objects.new(name, me)
        bs_col(n).objects.link(ob)
    else:
        old = ob.data
        ob.data = me
        if old.users == 0:
            bpy.data.meshes.remove(old)
    me.name = name
    xs, ys, zs = ([v.co[i] for v in me.vertices] for i in range(3))
    return dict(base=L["tris"](polys), head=L["tris"](hpolys), posts=posts,
                bounds=[round(min(xs), 2), round(max(xs), 2), round(min(ys), 2), round(max(ys), 2),
                        round(min(zs), 2), round(max(zs), 2)])


def build_all(stages=(1, 2, 3)):
    return {n: build(n) for n in stages}
