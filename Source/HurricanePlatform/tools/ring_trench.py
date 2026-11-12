"""Ring trench round the slew disc (owner, 2026-11-09: "I want the trench to also surround the turret ring with the
same width as the rest of the top. The panel lines should follow it as well.").

Run after moat_notch.py and before finish.py:
    ns = {}; exec(open(path).read(), ns); report = ns["ring"]()

- The disc's skirt (r 4.6) is the trench's inner wall. Its floor is as wide as the perimeter moat's (18.2 cm), out to
  a dark wall at r 4.782 and the moat's 8 mm 45 degree bevel up to the deck at r 4.79. The outline has 64 sides, in
  step with the disc's, so the floor is the same width all round. The floor runs in under the disc to r 4.55 and
  joins both service trenches' floors; their flank bevels and walls end where they meet the ring's.
- The deck, and the service trenches' floors, flank bevels and walls, are cut along the outline and along r 4.55,
  and what lies between goes. Cut lines that ran on across a kept face are dissolved again.
- The ring's bevel and wall shade smooth.
- The Atlas4 trim line runs round the ring at the same distance from the edge as beside the moat, mitred into the
  service trenches' flank trims, which now end there.
- The deck lines that crossed the ring end on its trim line in pointed T-joins.
- The eight small vents beside the ring go (owner, 2026-11-09).
"""
import math

import bmesh
import bpy
from mathutils import Vector
from mathutils.geometry import intersect_line_line_2d, intersect_point_line

MN = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\moat_notch.py"
N = {}
exec(open(MN).read(), N)
S, C = N["S"], N["C"]
PLAT = N["PLAT"]
DECK, MOAT, BEV, BEV_LOW = N["DECK"], N["MOAT"], N["BEV"], N["BEV_LOW"]
EDGE, Y_TOP, Y_WALL = N["EDGE"], N["Y_TOP"], N["Y_WALL"]
TRIM, TRIM_Z = N["TRIM"], N["TRIM_Z"]
UV, R2 = N["UV"], N["R2"]

SIDES = 64
STEP = 2 * math.pi / SIDES
COS = math.cos(STEP / 2)
R_TOP = 4.79                      # deck edge, the bevel's top
R_WALL = R_TOP - BEV              # 4.782: 18.2 cm of floor outside the disc's skirt (4.6), as the perimeter moat
R_IN = 4.55                       # inner cut, under the disc (its skirt's flats are at 4.5945)
TRIM_IN = R_TOP + (EDGE - TRIM[1]) / COS      # the trim line's sides, as far from the edge as beside the moat
TRIM_OUT = R_TOP + (EDGE - TRIM[0]) / COS
TRIM_MID = (TRIM_IN + TRIM_OUT) / 2
TRIM_V = (0.4834, 0.5166)         # Atlas4 piece 3, the side nearer the trench first (as by the moat)
TRIM_U = 0.7075                   # U per metre along the line, as the moat's trim
E = 1e-4
UP = Vector((0, 0, 1))


def corner(R, k, z=0.0):
    a = STEP * k
    return Vector((R * math.cos(a), R * math.sin(a), z))


def ang(p):
    return math.atan2(p.y, p.x) % (2 * math.pi)


def seg(p):
    return int(ang(p) // STEP) % SIDES


def apo(k, p):
    a = STEP * (k + 0.5)
    return p.x * math.cos(a) + p.y * math.sin(a)


def inside(R, p):
    return apo(seg(p), p) < R * COS


def on_chord(R, k, p):
    t = (ang(p) - STEP * k) % (2 * math.pi)
    return abs(apo(k, p) - R * COS) < E and (t < STEP + 1e-6 or t > 2 * math.pi - 1e-6)


def hit(R, p, d):
    """Where the 2D ray p + t d first meets the polygon of vertex radius R."""
    p, d = Vector(p[:2]), Vector(d[:2]).normalized()
    best = None
    for k in range(SIDES):
        q = intersect_line_line_2d(p, p + 20 * d, corner(R, k).xy, corner(R, k + 1).xy)
        if q is not None and (best is None or (q - p).length < (best - p).length):
            best = q
    return best


def crosses(f, a, b):
    pts = [v.co.xy for v in f.verts]
    if any(intersect_line_line_2d(a, b, pts[i - 1], pts[i]) for i in range(len(pts))):
        return True
    # the chord lies wholly inside the face
    x, y, ins = a.x, a.y, False
    for i in range(len(pts)):
        p, q = pts[i - 1], pts[i]
        if (p.y > y) != (q.y > y) and x < p.x + (y - p.y) * (q.x - p.x) / (q.y - p.y):
            ins = not ins
    return ins


def bisect(bm, faces, co, no):
    geom = list({e for f in faces for e in f.edges}) + faces
    bmesh.ops.bisect_plane(bm, geom=geom, dist=1e-6, plane_co=co, plane_no=no)


def vplane(R, k):
    a = STEP * (k + 0.5)
    return corner(R, k), Vector((math.cos(a), math.sin(a), 0))


def bplane(k):
    """The ring bevel's facet k: from the deck edge's chord down to the wall's."""
    A, B, D = corner(R_TOP, k, DECK), corner(R_TOP, k + 1, DECK), corner(R_WALL, k, BEV_LOW)
    return A, (B - A).cross(D - A).normalized()


class Pool:
    def __init__(self, bm, verts):
        self.bm, self.vs = bm, list(verts)

    def get(self, p):
        for v in self.vs:
            if (v.co - p).length < E:
                return v
        v = self.bm.verts.new(p)
        self.vs.append(v)
        return v


def make(bm, vs, want, uvf, mat, cnl, uvl, nf=None):
    """uvf, nf: vertex -> uv, corner normal (default: the face's own normal)."""
    f = bm.faces.new(vs)
    f.material_index = mat
    f.normal_update()
    if f.normal.dot(want) < 0:
        f.normal_flip()
    for l in f.loops:
        l[uvl].uv = uvf(l.vert)
        l[cnl] = nf(l.vert) if nf else f.normal
    return f


def on_poly(R, p):
    s = seg(p)
    return min(abs(apo(k % SIDES, p) - R * COS) for k in (s - 1, s, s + 1)) < E


def theta(p):
    return math.atan2(p.y, p.x)      # -pi..pi: the u seam falls at -x, inside the service trench there


def kinds(mats):
    col, dark = "PaintedMetal_Colorable", "PaintedMetal_Darker"

    def kind(f):
        m = mats[f.material_index]
        if m not in (col, dark):
            return None
        zs = [v.co.z for v in f.verts]
        if min(zs) < MOAT - 1e-3 or max(zs) > DECK + 1e-3:
            return None
        f.normal_update()
        n = f.normal
        if m == col and n.z > 0.999 and all(abs(z - DECK) < E for z in zs):
            return "deck"
        if m == dark and n.z > 0.999 and all(abs(z - MOAT) < E for z in zs):
            return "floor"
        if m == col and 0.5 < n.z < 0.9 and abs(n.y) > 0.5:
            return "fbevel"              # the service trenches' flank bevels
        if m == dark and abs(n.y) > 0.99:
            return "fwall"               # and their flank walls
        return None
    return kind


def near(f):
    """Some of the face's footprint lies between r R_IN and R_TOP."""
    if max(v.co.xy.length for v in f.verts) < R_IN + 1e-3:
        return False
    best = min(v.co.xy.length for v in f.verts)
    for e in f.edges:
        a, b = e.verts[0].co.xy, e.verts[1].co.xy
        d = b - a
        if d.length_squared > 0:
            t = max(0.0, min(1.0, -a.dot(d) / d.length_squared))
            best = min(best, (a + t * d).length)
    return best < R_TOP + 0.02


def done():
    """True once the ring is in: a dark floor face at the trench's +y side."""
    me = bpy.data.objects[PLAT].data
    dark = [i for i, m in enumerate(me.materials) if m.name == "PaintedMetal_Darker"]
    return any(p.material_index in dark and abs(p.center.z - MOAT) < E and abs(p.center.x) < 0.3
               and 4.5 < p.center.y < R_WALL for p in me.polygons)


def cut(bm, kind):
    """Cut every face the outline crosses, delete what lies in the ring, dissolve cut lines across kept faces."""
    cands = {}
    for f in bm.faces:
        kd = kind(f)
        if kd and near(f):
            cands.setdefault(kd, set()).add(f)
    orig_e, orig_v = set(bm.edges), set(bm.verts)
    segs = [(e.verts[0].co.copy(), e.verts[1].co.copy()) for fs in cands.values() for f in fs for e in f.edges]
    vert = lambda R: [((R,), k, vplane(R, k)) for k in range(SIDES)]
    plans = {"deck": vert(R_TOP) + vert(R_IN), "floor": vert(R_WALL) + vert(R_IN),
             "fwall": vert(R_WALL) + vert(R_IN),
             "fbevel": [((R_TOP, R_WALL), k, bplane(k)) for k in range(SIDES)] + vert(R_IN)}
    for kd, live in cands.items():
        for Rs, k, (co, no) in plans[kd]:
            fs = [f for f in live if f.is_valid
                  and any(crosses(f, corner(R, k).xy, corner(R, k + 1).xy) for R in Rs)]
            if fs:
                res = bmesh.ops.bisect_plane(bm, geom=list({e for f in fs for e in f.edges}) + fs, dist=1e-6,
                                             plane_co=co, plane_no=no)
                live |= {g for g in res["geom"] if isinstance(g, bmesh.types.BMFace)}
        cands[kd] = {f for f in live if f.is_valid}

    def gone(kd, c):
        if inside(R_IN, c):
            return False
        if kd == "deck":
            return inside(R_TOP, c)
        if kd == "fbevel":
            return inside(R_WALL + (c.z - BEV_LOW), c)     # the ring bevel's section at that height (45 degrees)
        return inside(R_WALL, c)
    dead = [f for kd, fs in cands.items() for f in fs if gone(kd, f.calc_center_median())]
    bmesh.ops.delete(bm, geom=dead, context="FACES")
    bm.normal_update()

    def on_orig(e):
        m = (e.verts[0].co + e.verts[1].co) / 2
        for a, b in segs:
            p, t = intersect_point_line(m, a, b)
            if -1e-6 <= t <= 1 + 1e-6 and (p - m).length < 1e-5:
                return True
        return False
    live = {f for fs in cands.values() for f in fs if f.is_valid}
    extra = [e for e in {e for f in live for e in f.edges} if e not in orig_e and len(e.link_faces) == 2
             and e.link_faces[0].material_index == e.link_faces[1].material_index
             and e.link_faces[0].normal.dot(e.link_faces[1].normal) > 1 - 1e-6 and not on_orig(e)]
    bmesh.ops.dissolve_edges(bm, edges=extra, use_verts=False)

    def straight(v):
        a, b = (e.other_vert(v).co - v.co for e in v.link_edges)
        return a.length > 0 and b.length > 0 and a.normalized().dot(b.normalized()) < -1 + 1e-9
    spare = [v for v in bm.verts if v not in orig_v and len(v.link_edges) == 2 and straight(v)]
    bmesh.ops.dissolve_verts(bm, verts=spare)
    return {"cut": {kd: len(fs) for kd, fs in cands.items()}, "removed": len(dead), "dissolved": len(extra),
            "spare_verts": len(spare)}


def build(bm, kind, mi, fl, cnl, uvl):
    """The ring's bevel, wall and floor, sharing the vertices the cut left."""
    col, dark = mi["PaintedMetal_Colorable"], mi["PaintedMetal_Darker"]
    pool = Pool(bm, [v for v in bm.verts if MOAT - 1e-3 < v.co.z < DECK + 1e-3
                     and R_IN - 0.02 < v.co.xy.length < R_TOP + 0.05])
    # where the ring meets a service trench's flank: the deck edge's corner P1 and the wall top's P2
    corners = []
    for sx in (1, -1):
        for sy in (1, -1):
            p1, p2 = hit(R_TOP, (sx * 6, sy * Y_TOP), (-sx, 0)), hit(R_WALL, (sx * 6, sy * Y_WALL), (-sx, 0))
            corners.append((p1, Vector((p2.x, p2.y, BEV_LOW))))

    def low(v):
        for p1, p2 in corners:
            if (p1 - v.co.xy).length < 1e-3:
                return pool.get(p2)
        return pool.get(Vector((v.co.x * R_WALL / R_TOP, v.co.y * R_WALL / R_TOP, BEV_LOW)))

    radial = lambda v: Vector((-v.co.x, -v.co.y, 0)).normalized()
    bev_n = lambda v: (radial(v) + UP).normalized()
    bev_uv = lambda v: Vector((UV * R_TOP * theta(v.co), UV * R2 * v.co.z))
    wall_uv = lambda v: Vector((UV * R_WALL * theta(v.co), UV * v.co.z))
    rim = [e for e in bm.edges if len(e.link_faces) == 1 and kind(e.link_faces[0]) == "deck"
           and all(abs(v.co.z - DECK) < E and on_poly(R_TOP, v.co) for v in e.verts)]
    n = 0
    for e in rim:
        a, b = e.verts
        la, lb = low(a), low(b)
        m = (a.co + b.co) / 2
        want = Vector((-m.x, -m.y, 0)).normalized()
        make(bm, [a, b, lb, la], want + UP, bev_uv, col, cnl, uvl, bev_n)
        da, db = pool.get(Vector((la.co.x, la.co.y, MOAT))), pool.get(Vector((lb.co.x, lb.co.y, MOAT)))
        make(bm, [la, lb, db, da], want, wall_uv, dark, cnl, uvl, radial)
        n += 2
    for k in range(SIDES):
        t = lambda v: ((ang(v.co) - STEP * k + math.pi) % (2 * math.pi)) - math.pi
        ring = []
        for R, rev in ((R_IN, False), (R_WALL, True)):
            ends = [pool.get(corner(R, k, MOAT)), pool.get(corner(R, k + 1, MOAT))]
            on = {v for v in pool.vs if v.is_valid and abs(v.co.z - MOAT) < E and on_chord(R, k, v.co)} | set(ends)
            ring += sorted(on, key=t, reverse=rev)
        side = 1 if math.cos(STEP * (k + 0.5)) >= 0 else -1
        make(bm, ring, UP, lambda v: fl[side](v.co), dark, cnl, uvl)
        n += 1
    return n


def decals(bm, mats, mi, cnl, uvl):
    """Vents out; flank trims end on the ring's trim line, which runs round; deck lines end on it, pointed."""
    a4 = mi["Atlas4_Colorable"]
    top = lambda f: all(-1.26 < v.co.z < -1.24 for v in f.verts)
    vents = [f for f in bm.faces if mats[f.material_index] == "Atlas3_Colorable" and top(f)
             and 4.8 < f.calc_center_median().xy.length < 5.1]
    assert len(vents) == 8, len(vents)
    bmesh.ops.delete(bm, geom=vents, context="FACES")
    up = lambda v: UP
    mitre = {}
    for sx in (1, -1):
        for sy in (1, -1):
            fs = [f for f in bm.faces if f.material_index == a4 and top(f) and all(
                N["TRIM_A"] - 0.006 < sy * v.co.y < N["TRIM_B"] + 0.006 and 4.5 < sx * v.co.x < 5.75 for v in f.verts)]
            assert len(fs) == 1, (sx, sy, len(fs))
            f = fs[0]
            m = S["uv_map"](f, uvl)
            ends = sorted([v for v in f.verts if sx * v.co.x < 4.6], key=lambda v: sy * v.co.y)
            assert len(ends) == 2
            for v, R in zip(ends, (TRIM_IN, TRIM_OUT)):          # the side nearer the trench meets the ring's
                q = hit(R, (sx * 6, v.co.y), (-sx, 0))
                v.co = Vector((q.x, q.y, v.co.z))
            for l in f.loops:
                l[uvl].uv = m(l.vert.co)
            mitre[(sx, sy)] = ends
    faces = 0
    for sy in (1, -1):
        a, b = mitre[(1, sy)], mitre[(-1, sy)]
        if sy < 0:
            a, b = b, a                       # stations by rising angle: +y from +x to -x, -y from -x to +x
        a0, a1 = ang(a[0].co), ang(b[0].co)
        ks = [k for k in range(SIDES) if a0 < STEP * k < a1]
        st = [a] + [[bm.verts.new(corner(R, k, TRIM_Z)) for R in (TRIM_IN, TRIM_OUT)] for k in ks] + [b]
        u, uvs = 0.0, {}
        for i, (vi, vo) in enumerate(st):
            if i:
                u += ((vi.co + vo.co) / 2 - (st[i - 1][0].co + st[i - 1][1].co) / 2).length * TRIM_U
            uvs[vi], uvs[vo] = Vector((u, TRIM_V[0])), Vector((u, TRIM_V[1]))
        for (i0, o0), (i1, o1) in zip(st, st[1:]):
            make(bm, [i0, i1, o1, o0], UP, lambda v: uvs[v], a4, cnl, uvl, up)
            faces += 1
    stems = [f for f in bm.faces if f.material_index == a4 and top(f)
             and min(v.co.xy.length for v in f.verts) < R_TOP and max(v.co.xy.length for v in f.verts) > TRIM_OUT]
    assert len(stems) == 8, len(stems)
    for f in stems:
        m = S["uv_map"](f, uvl)
        vs = sorted(f.verts, key=lambda v: v.co.xy.length)
        assert len(vs) == 4
        inner, outer = vs[:2], vs[2:]
        d = ((outer[0].co + outer[1].co) - (inner[0].co + inner[1].co)).xy.normalized()
        perp = Vector((-d.y, d.x))
        inner.sort(key=lambda v: v.co.xy.dot(perp))
        outer.sort(key=lambda v: v.co.xy.dot(perp))
        for vi, vo in zip(inner, outer):                    # each side stops at the trim line's near edge
            q = hit(TRIM_OUT, vo.co.xy, -d)
            vi.co = Vector((q.x, q.y, TRIM_Z))
        q = hit(TRIM_MID, (outer[0].co.xy + outer[1].co.xy) / 2, -d)
        tip = bm.verts.new(Vector((q.x, q.y, TRIM_Z)))     # on the trim line's centre line
        for l in f.loops:
            l[uvl].uv = m(l.vert.co)
        make(bm, [inner[0], inner[1], tip], UP, lambda v: m(v.co), a4, cnl, uvl, up)
        faces += 1
    stray = [f for f in bm.faces if mats[f.material_index].startswith(N["C"]["DEC"]) and top(f)
             and R_IN < f.calc_center_median().xy.length < R_TOP]
    return {"vents": len(vents), "trim_faces": faces, "stems": len(stems), "stray_decals": len(stray)}


def ring():
    if done():
        return {"skipped": "ring trench already in"}
    o = bpy.data.objects[PLAT]
    assert o.matrix_world.is_identity
    me = o.data
    mats = [m.name for m in me.materials]
    mi = {m: i for i, m in enumerate(mats)}
    bm, cnl, uvl = C["open_bm"](me)
    bm.normal_update()
    kind = kinds(mats)
    fl = {}
    for f in bm.faces:                     # the service floors carry the moat floor's uv map, one per side
        c = f.calc_center_median()
        if kind(f) == "floor" and abs(c.y) < Y_WALL and 4.4 < abs(c.x) < 5.8:
            fl[1 if c.x > 0 else -1] = S["uv_map"](f, uvl)
    assert set(fl) == {1, -1}, fl
    rep = cut(bm, kind)
    rep["new_faces"] = build(bm, kind, mi, fl, cnl, uvl)
    rep.update(decals(bm, mats, mi, cnl, uvl))
    C["close_bm"](bm, me)
    rep["polys"] = len(me.polygons)
    return rep
