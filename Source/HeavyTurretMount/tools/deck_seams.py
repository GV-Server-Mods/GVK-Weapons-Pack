"""Deck seams for GVK_HeavyTurretMount_3x3x1, rebuilt with mitred corners and pointed T-joins (owner, 2026-11-07:
"ensure all seam decal junctions are mitered properly"). Rerunnable; run after install_sides and step_tabs.
- Gemini's seam network (both decks) was 32 single quads per deck with square ends that overlapped at every join.
  It becomes: the seat ring (octagon round the moat), the deck plate's outline (octagon with 45-degree corners), and
  8 radial seams from the ring's corners to the outline, each end a pointed T-join (skill: atlas-regions.md,
  "Joins and ends"). Closed outlines mitre at every corner.
- Corner plates (top deck): vanilla's rim lines at |u| = 3.02 stopped in the middle of Gemini's corner pads. Each
  pair now closes into one outline round the corner plate with a 45-degree chamfer, joined to vanilla's bevel wraps
  at the deck edge, and the plate gets a fourth bolt at its inner corner like the other three.
Groove direction: Atlas4 piece 3 is lopsided, so V1 lies towards the inside of each closed outline (the deck centre
for the ring and outline, the block corner for the corner plates, as vanilla's) and towards +X or +Y on the radials.
The bottom deck is the top's mirror image (no corner plates or joint lines there, as vanilla's).

    exec(open(r"<this file>").read()); apply()
"""
import bpy, bmesh, math
from mathutils import Vector

DEC4, DEC3 = "Decals_Atlas4_Colorable", "Decals_Atlas3_Colorable"
W, V0, V1, U_PER_M = 0.0205, 0.4834, 0.5166, 1.66     # Gemini's seam: Atlas4 piece 3, 20.5 mm
Z, STEM_LIFT = 1.251, 0.001                            # stems 1 mm over the seams they join (skill)
RING_V, RING_U = 0.9402, 0.68                          # seat ring: flats at |v|, corners at |u|
OUT_V, OUT_U = 3.189, 1.8604                           # deck plate outline
INNER_MAX = 3.21                                       # old network: every vertex within this, |x| and |y|
# corner plates: vanilla's line (two half strips 3.0059-3.0352, V 0.4751-0.5243) from the flat edge inwards
CP_U, CP_EDGE, CP_W, CP_V, CP_CH = 3.0205, 3.7441, 0.0293, (0.4751, 0.5243), 0.06
BOLT_SRC, BOLT_AT = (3.715, 3.715), 3.075              # vanilla corner bolt (|x|, |y|); new one at (3.075, 3.075)


def _rot(p, k):
    """p rotated by k quarter turns about Z (2D or 3D vector)."""
    x, y = p[0], p[1]
    for _ in range(k % 4):
        x, y = -y, x
    return Vector((x, y))


def octagon(fv, cu):
    """Closed octagon, counter-clockwise from above: flats at |v| = fv, corners at |u| = cu."""
    pts = []
    for k in range(4):
        pts += [_rot((cu, -fv), k), _rot((fv, -cu), k)]
    return pts


def left(d):
    return Vector((-d.y, d.x))


def polyline(pts, closed, w, v0, v1):
    """Faces (2D points, uvs) of a strip of width w along pts, V0 on the right and V1 on the left of the travel
    direction (so (U, V, +Z) is right-handed), mitred at every inner vertex."""
    n = len(pts)
    segs = n if closed else n - 1
    dirs = [(pts[(i + 1) % n] - pts[i]).normalized() for i in range(segs)]
    side = []
    for i in range(n):
        a = dirs[(i - 1) % segs] if (closed or i > 0) else None
        b = dirs[i] if (closed or i < segs) else None
        if a is None or b is None:
            m, k = left(b if a is None else a), 1.0
        else:
            m = (left(a) + left(b)).normalized()
            k = 1.0 / m.dot(left(b))
        side.append(m * (w / 2 * k))
    faces, u = [], 0.0
    for i in range(segs):
        j = (i + 1) % n
        l = (pts[j] - pts[i]).length
        p = [pts[i] - side[i], pts[j] - side[j], pts[j] + side[j], pts[i] + side[i]]
        faces.append((p, [(u, v0), (u + l * U_PER_M, v0), (u + l * U_PER_M, v1), (u, v1)]))
        u += l * U_PER_M
    return faces


def _hit(o, d, a, nrm):
    """Distance along d from o to the line through a with normal nrm."""
    return (a - o).dot(nrm) / d.dot(nrm)


def stem(p0, p1, edges0, edges1, v1_dir):
    """Faces of a seam from junction p0 to junction p1 with a pointed T-join at each end (skill, "Joins and ends").
    edgesN: the near edges of the seams met at that end, as (point, normal); each side stops on the one it reaches
    last, the tip sits on pN. v1_dir: world direction V1 must face."""
    d = (p1 - p0).normalized()
    if left(d).dot(v1_dir) < 0:
        p0, p1, edges0, edges1, d = p1, p0, edges1, edges0, -d
    L = left(d) * (W / 2)
    sides = []
    for s in (-1, 1):                                       # right side (V0), then left side (V1)
        # each side stops on the near edge it reaches last on its way into the junction: nearest the junction
        o = p0 + L * s
        t0 = min(_hit(o, d, a, nm) for a, nm in edges0)     # edges ahead of p0 (t > 0)
        o1 = p1 + L * s
        t1 = max(_hit(o1, d, a, nm) for a, nm in edges1)    # edges short of p1 (t < 0)
        sides.append((o + d * t0, o1 + d * t1))
    ln = (p1 - p0).length
    ua = lambda q: (q - p0).dot(d) * U_PER_M
    (r0, r1), (l0, l1) = sides
    vm = (V0 + V1) / 2
    faces = [([r0, r1, l1, l0], [(ua(r0), V0), (ua(r1), V0), (ua(l1), V1), (ua(l0), V1)]),
             ([r1, p1, l1], [(ua(r1), V0), (ua(p1), vm), (ua(l1), V1)]),
             ([p0, r0, l0], [(ua(p0), vm), (ua(r0), V0), (ua(l0), V1)])]
    return faces


def _edge(a, b, toward):
    """Near edge of the seam along a-b on the side of point toward: (point, unit normal)."""
    d = (b - a).normalized()
    nm = left(d)
    if (toward - a).dot(nm) < 0:
        nm = -nm
    return a + nm * (W / 2), nm


def network():
    """Top-deck seam network as 2D faces: (outlines, stems)."""
    ring, out = octagon(RING_V, RING_U), octagon(OUT_V, OUT_U)
    outlines = polyline(ring, True, W, V0, V1) + polyline(out, True, W, V0, V1)  # V1 inside: CCW, inside on the left
    faces = []
    # stems: from ring corner (RING_U, -RING_V) down to the outline flat, and the other 7 by symmetry
    for k in range(4):
        for mirror in (False, True):
            a = Vector((RING_U, -RING_V)) if not mirror else Vector((-RING_U, -RING_V))
            b = Vector((a.x, -OUT_V))
            fl = (Vector((-1, -RING_V)), Vector((1, -RING_V)))                   # ring flat
            ch = (Vector((math.copysign(RING_U, a.x), -RING_V)), Vector((math.copysign(RING_V, a.x), -RING_U)))
            of = (Vector((-1, -OUT_V)), Vector((1, -OUT_V)))                     # outline flat
            mid = (a + b) / 2
            e0 = [_edge(*fl, mid), _edge(*ch, mid)]
            e1 = [_edge(*of, mid)]
            R = lambda p: _rot(p, k)
            e0 = [(R(p), R(nm)) for p, nm in e0]
            e1 = [(R(p), R(nm)) for p, nm in e1]
            v1_dir = R(Vector((1, 0)))
            v1_dir = Vector((abs(v1_dir.x), abs(v1_dir.y)))                       # +X on N-S stems, +Y on E-W
            faces += stem(R(a), R(b), e0, e1, v1_dir)
    return outlines, faces


def corner_plates():
    """Top deck: one outline per corner plate (2D faces), from the flat edge along |u| = CP_U, a 45-degree chamfer,
    and back out to the edge; V1 towards the block corner."""
    faces = []
    for k in range(4):
        c = CP_U
        pts = [Vector((CP_EDGE, -c)), Vector((c + CP_CH, -c)), Vector((c, -(c + CP_CH))), Vector((c, -CP_EDGE))]
        # travel from the +X edge to the -Y edge: the corner (+x, -y) lies on the left, V1 there (as vanilla's)
        f = polyline(pts, False, CP_W, CP_V[0], CP_V[1])
        faces += [([_rot(p, k) for p in ps], uvs) for ps, uvs in f]
    return faces


TOOLS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HeavyTurretMount\tools" + "\\"


def _ins():
    ns = {"__name__": "installer"}
    exec(open(TOOLS + "install_sides.py").read(), ns)
    return ns


def _write(bm, faces2d, z):
    """Add 2D faces at world height z (winding reversed below the deck so normals face out), corner normals flat."""
    uvl = bm.loops.layers.uv.active
    cnl = bm.loops.layers.float_vector["_cn"]
    out = []
    for pts, uvs in faces2d:
        vs = [bm.verts.new(Vector((p.x, p.y, z))) for p in pts]
        order = list(range(len(vs))) if z > 0 else list(range(len(vs)))[::-1]
        f = bm.faces.new([vs[i] for i in order])
        f.normal_update()
        for l, i in zip(f.loops, order):
            l[uvl].uv = uvs[i]
            l[cnl] = f.normal
        out.append(f)
    return out


def apply():
    ins = _ins()
    ob = bpy.data.objects[DEC4]
    bm = ins["bm_with_cn"](ob)                              # world space
    inner = lambda vs: all(abs(v.z) > 1.2 for v in vs) and all(max(abs(v.x), abs(v.y)) <= INNER_MAX for v in vs)
    corner = lambda vs: all(v.z > 1.245 for v in vs) and all(min(abs(v.x), abs(v.y)) >= 2.99 for v in vs)
    old = [f for f in bm.faces if inner([v.co for v in f.verts]) or corner([v.co for v in f.verts])]
    bmesh.ops.delete(bm, geom=old, context="FACES")
    (outl, stems), cp = network(), corner_plates()
    for f in bm.faces:
        f.tag = False
    first = _write(bm, outl, Z) + _write(bm, outl, -Z)
    for f in first:
        f.tag = True
    rest = _write(bm, stems, Z + STEM_LIFT) + _write(bm, stems, -Z - STEM_LIFT) + _write(bm, cp, Z)
    # Decals draw with no depth write, so overlaps go by draw order: outlines first, so every stem (and step_tabs'
    # joint lines) draws over the seam it joins. The sort is stable, so everything else keeps its order.
    bm.faces.sort(key=lambda f: 0 if f.tag else 1)
    for f in bm.faces:
        f.tag = False
    added = len(first) + len(rest)
    ins["write_back"](ob, bm, list(ob.data.materials))
    bm.free()
    return {"seams (old, new)": (len(old), added), "bolts (old, new)": corner_bolts(ins)}


def corner_bolts(ins):
    """Copy vanilla's corner-plate bolt (top deck) to each plate's inner corner; replaces an earlier copy."""
    ob = bpy.data.objects[DEC3]
    bm = ins["bm_with_cn"](ob)                              # world space
    uvl = bm.loops.layers.uv.active
    cnl = bm.loops.layers.float_vector["_cn"]
    # vanilla's bolt is two loose triangles (no shared vertices), so pick faces by centre, within 25 mm
    near = lambda f, x, y: f.calc_center_median().z > 1.2 and (f.calc_center_median().xy - Vector((x, y))).length < 0.025
    src = [f for f in bm.faces if near(f, BOLT_SRC[0], -BOLT_SRC[1])]
    kill = [f for f in bm.faces if any(near(f, *_rot(Vector((BOLT_AT, -BOLT_AT)), k)) for k in range(4))]
    isl_src = None
    if src:
        vs = [v.co.copy() for g in src for v in g.verts]
        lo = Vector((min(v.x for v in vs), min(v.y for v in vs), 0))
        hi = Vector((max(v.x for v in vs), max(v.y for v in vs), 0))
        isl_src = ([[v.co.copy() for v in g.verts] for g in src], [[tuple(l[uvl].uv) for l in g.loops] for g in src],
                   (lo + hi) / 2)
    bmesh.ops.delete(bm, geom=kill, context="FACES")
    n = 0
    if isl_src:
        polys, uvs, c = isl_src
        for k in range(4):
            tgt = _rot(Vector((BOLT_AT, -BOLT_AT)), k)
            for ps, us in zip(polys, uvs):
                vs = [bm.verts.new(Vector((*(_rot(p - c, k) + tgt), p.z))) for p in ps]
                f = bm.faces.new(vs)
                f.normal_update()
                for l, uv in zip(f.loops, us):
                    l[uvl].uv = uv
                    l[cnl] = f.normal
                n += 1
    ins["write_back"](ob, bm, list(ob.data.materials))
    bm.free()
    return (len(kill), n)
