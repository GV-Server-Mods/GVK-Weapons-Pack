"""Seam ends round the base (owner, 2026-11-09: "I still see a number of panel seam decals that are not properly
mitred", in every area of the base).

- ring_lines(): the 12 radial lines on the slew disc's outer ring stopped 1.5 cm short of its edge. Each now runs on
  over the disc's chamfer and down its side to the ring trench floor (owner, 2026-11-09: "the seams on the plinth
  turret ring should go all the way and wrap down to the top surface of the plinth rather than stop at way
  arbitrarily"). The strip is split along its centre, so the four lines that cross a facet edge of the 64-sided disc
  lie on both facets.
- fill_notches(): the V left in a side band's line where a removed post's line once met it, closed (16).
- brace_ends(): each truss brace line runs straight on to the band's foot in place of its broken end triangle (16).
Run after service_gear.py and before finish.py, in this order:
    ns = {}; exec(open(path).read(), ns); ns["ring_lines"](); ns["fill_notches"](); ns["brace_ends"]()
Running them again does nothing.
- close_crossings(): where a line crosses an edge (the deck edges, the corner posts, the bands' chamfers), its strip
  is two faces in two planes whose corners sit at the same point with the same UV. The decal snap moved each copy off
  its own face, so they parted by up to 6 mm and the line showed a break at the edge (Keen's model had none). finish.py
  runs it after the snap: each such group of copies moves to the copy furthest out, which clears both faces.
"""
import math

import bmesh
import bpy
from mathutils import Matrix, Vector
from mathutils.bvhtree import BVHTree
from mathutils.kdtree import KDTree

CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
V0, V1 = 0.4834, 0.5166     # Atlas4 piece 3's box in V
VC = (V0 + V1) / 2
GAP = 0.0015                # decal offset off the surface
RING_DEC = "Pl_TopDec_Atlas4_Colorable"
DISC = "Pl_Disc"
FLOOR = -1.285              # the ring trench floor
PROFILE = ((4.5, -1.07), (4.6, -1.17), (4.6, FLOOR))   # disc rings the lines cross: chamfer top, side top, foot
SIDES = 64


def ring_hit(o, d, r):
    """Where the line o + t d (xy, t > 0) crosses the disc's 64-gon of vertex radius r."""
    best = None
    for k in range(SIDES):
        a = Vector((math.cos(2 * math.pi * k / SIDES), math.sin(2 * math.pi * k / SIDES))) * r
        b = Vector((math.cos(2 * math.pi * (k + 1) / SIDES), math.sin(2 * math.pi * (k + 1) / SIDES))) * r
        e = b - a
        den = d.x * e.y - d.y * e.x
        if abs(den) < 1e-12:
            continue
        w = a - o
        t = (w.x * e.y - w.y * e.x) / den
        s = (w.x * d.y - w.y * d.x) / den
        if t > 0 and -1e-9 <= s <= 1 + 1e-9 and (best is None or t < best):
            best = t
    return o + d * best


def offset(bvh, p):
    """p pushed GAP off every disc face it lies on (edges get the bisector, deeper by 1/cos)."""
    ns = []
    for _, n, _, _ in bvh.find_nearest_range(p, 2e-4):
        if all(n.dot(m) < 0.9999 for m in ns):
            ns.append(n)
    if not ns:
        raise ValueError(p)
    a = sum(ns, Vector()).normalized()
    return p + a * (GAP / min(a.dot(n) for n in ns))


def ring_lines():
    o = bpy.data.objects[RING_DEC]
    disc = bpy.data.objects[DISC]
    assert o.matrix_world.is_identity and disc.matrix_world.is_identity
    me = o.data
    if min(v.co.z for v in me.vertices) < -1.2:
        return dict(done=True)
    bvh = BVHTree.FromObject(disc, bpy.context.evaluated_depsgraph_get())
    bm = bmesh.new()
    bm.from_mesh(me)
    uvl = bm.loops.layers.uv.active
    quads = list(bm.faces)
    made = 0
    for f in quads:
        ls = list(f.loops)
        # corners by (outer?, v side): the outer end is the one further from the axis
        rad = lambda l: math.hypot(l.vert.co.x, l.vert.co.y)
        r_mid = sum(rad(l) for l in ls) / 4
        corner = {(rad(l) > r_mid, l[uvl].uv.y > VC): l for l in ls}
        il, ol, orr, ir = corner[(False, False)], corner[(True, False)], corner[(True, True)], corner[(False, True)]
        d = (ol.vert.co - il.vert.co).to_2d().normalized()
        k = (ol[uvl].uv.x - il[uvl].uv.x) / (ol.vert.co - il.vert.co).length     # U per metre
        u0 = (ol[uvl].uv.x + orr[uvl].uv.x) / 2
        z0 = ol.vert.co.z
        # three lines across: left (V0), centre, right (V1); the existing quad is split along its centre
        starts = {V0: ol.vert.co.copy(), VC: (ol.vert.co + orr.vert.co) / 2, V1: orr.vert.co.copy()}
        inner = {V0: il.vert.co.copy(), VC: (il.vert.co + ir.vert.co) / 2, V1: ir.vert.co.copy()}
        u_in = (il[uvl].uv.x + ir[uvl].uv.x) / 2
        rows = []                       # rows of {v: (co, u)} from the inner end outward
        rows.append({v: (inner[v], u_in) for v in inner})
        rows.append({v: (starts[v], u0) for v in starts})
        for r, z in PROFILE:
            row = {}
            for v, s in starts.items():
                p2 = ring_hit(s.to_2d(), d, r)
                p = Vector((p2.x, p2.y, z if z != FLOOR else FLOOR + GAP))
                if z != FLOOR:
                    p = offset(bvh, p)
                else:           # the foot: on the side face, GAP out, GAP over the floor
                    p = offset(bvh, Vector((p2.x, p2.y, FLOOR + 0.01)))
                    p.z = FLOOR + GAP
                row[v] = p
            prev = rows[-1]
            u = prev[VC][1] + k * (row[VC] - prev[VC][0]).length
            rows.append({v: (row[v], u) for v in row})
        mat = f.material_index
        bm.faces.remove(f)
        vs = [{v: bm.verts.new(c) for v, (c, _) in row.items()} for row in rows]
        for i in range(len(rows) - 1):
            for a, b in ((V0, VC), (VC, V1)):
                g = bm.faces.new((vs[i][a], vs[i + 1][a], vs[i + 1][b], vs[i][b]))
                g.material_index = mat
                for l, (ri, v) in zip(g.loops, ((i, a), (i + 1, a), (i + 1, b), (i, b))):
                    l[uvl].uv = (rows[ri][v][1], v)
                made += 1
        assert abs(z0 - rows[1][VC][0].z) < 1e-6
    bm.normal_update()
    up = sum(1 for g in bm.faces if g.calc_center_median().z > -1.08 and g.normal.z > 0.9)
    bm.to_mesh(me)
    bm.free()
    me.update()
    return dict(lines=len(quads), faces=made, top_faces_up=up)


def close_crossings(name="Platform", reach=0.0095, uv_tol=0.002, bend=20.0):
    """Join the copies of a line's corner on the two sides of an edge it crosses (see the module notes)."""
    o = bpy.data.objects[name]
    me = o.data
    mats = [m.name if m else "" for m in me.materials]
    uv = me.uv_layers.active.data
    info = {}                                   # vertex -> [(face normal, uv)]
    for p in me.polygons:
        if mats[p.material_index].startswith("Atlas4"):
            for li, vi in zip(p.loop_indices, p.vertices):
                info.setdefault(vi, []).append((p.normal.copy(), uv[li].uv.copy(), p.index))
    kd = KDTree(len(info))
    for vi in info:
        kd.insert(me.vertices[vi].co, vi)
    kd.balance()
    cos = math.cos(math.radians(bend))
    par = {vi: vi for vi in info}

    def find(a):
        while par[a] != a:
            par[a] = par[par[a]]
            a = par[a]
        return a
    for a, fa in info.items():
        for _, b, dist in kd.find_range(me.vertices[a].co, reach):
            if b <= a or dist < 1e-7:
                continue
            fb = info[b]
            if {f for _, _, f in fa} & {f for _, _, f in fb}:
                continue
            if all(na.dot(nb) > cos for na, _, _ in fa for nb, _, _ in fb):
                continue                        # same plane: a tip beside its cross line, not a crossing
            if any((ua - ub).length < uv_tol for _, ua, _ in fa for _, ub, _ in fb):
                par[find(a)] = find(b)
    groups = {}
    for vi in info:
        groups.setdefault(find(vi), []).append(vi)
    moved, worst = 0, 0.0
    for vs in groups.values():
        if len(vs) < 2:
            continue
        n = sum((nv for vi in vs for nv, _, _ in info[vi]), Vector()).normalized()
        best = max(vs, key=lambda vi: me.vertices[vi].co.dot(n))
        to = me.vertices[best].co.copy()
        for vi in vs:
            if vi != best:
                worst = max(worst, (me.vertices[vi].co - to).length)
                me.vertices[vi].co = to
                moved += 1
    me.update()
    return dict(groups=sum(len(v) > 1 for v in groups.values()), moved=moved, worst_mm=round(worst * 1000, 1))


def seam_bvh(me, mats):
    idx = [p.index for p in me.polygons if mats[p.material_index].startswith("Atlas4")]
    return BVHTree.FromPolygons([v.co for v in me.vertices], [me.polygons[i].vertices for i in idx]), idx


def fill_notches(name="Platform"):
    """Keen lays the side bands' lines as two half strips (centre line to an outer V past the box). Where a post's line
    once met a band line, its outer edge dips to the centre in a V; the posts are gone (Keen's side frames, and the
    port surround's bays), so the V showed as a small tooth in the line. Each open V gets the triangle that closes it."""
    o = bpy.data.objects[name]
    me = o.data
    mats = [m.name if m else "" for m in me.materials]
    uv = me.uv_layers.active.data
    bvh, _ = seam_bvh(me, mats)
    corner = {}                                 # vertex -> (uv, face normal)
    for p in me.polygons:
        if mats[p.material_index].startswith("Atlas4"):
            for li, vi in zip(p.loop_indices, p.vertices):
                corner.setdefault(vi, (uv[li].uv.copy(), p.normal.copy(), p.material_index))
    kd = KDTree(len(corner))
    for vi in corner:
        kd.insert(me.vertices[vi].co, vi)
    kd.balance()
    found = {}
    for c, (uc, nc, mc) in corner.items():
        if abs(uc.y - 0.4995) > 0.001:
            continue
        pc = me.vertices[c].co
        outer = [b for _, b, _ in kd.find_range(pc, 0.025) if abs(corner[b][0].y - 0.5) > 0.02
                 and corner[b][1].dot(nc) > 0.99 and corner[b][2] == mc]
        for i, a in enumerate(outer):
            for b in outer[i + 1:]:
                pa, pb = me.vertices[a].co, me.vertices[b].co
                if (pa - pb).length < 0.01 or (corner[a][0].y - 0.5) * (corner[b][0].y - 0.5) < 0:
                    continue
                if (pa - pc).dot(pb - pc) > 0:  # a V: a and b on both sides of c along the line
                    continue
                cen = (pa + pb + pc) / 3
                hit = bvh.find_nearest(cen, 0.0008)
                if hit[0] is None:
                    key = tuple(round(x, 3) for x in cen)
                    found[key] = (a, c, b)
    C = {}
    exec(open(CP).read(), C)
    bm, cnl, uvl = C["open_bm"](me)
    bm.verts.ensure_lookup_table()
    made = 0
    for a, c, b in found.values():
        vs = [bm.verts[i] for i in (a, c, b)]
        if bm.faces.get(vs):
            continue
        f = bm.faces.new(vs)
        f.normal_update()
        if f.normal.dot(corner[c][1]) < 0:
            f.normal_flip()
        f.material_index = corner[c][2]
        for l in f.loops:
            l[uvl].uv = corner[l.vert.index][0]
            l[cnl] = f.normal
        made += 1
    C["close_bm"](bm, me)
    me.update()
    return dict(notches=made)


BRACE_ENDS = [(a, z) for a in (-2.95, 2.95) for z in (-1.87, -3.13)]   # side-local (along, height), the -Y side
FIELD = -6.158              # the side walls' recessed field


def brace_ends(name="Platform"):
    """The 45 degree brace lines of the side trusses ended under the bands in a short triangle whose U jumps by a
    third of a metre of texture, so each end showed as two light splinters (Keen's model has them too). The end
    triangle goes, and the line's two sides run straight on to the band's foot, cut flush along it, with U carried on
    at the line's own scale."""
    o = bpy.data.objects[name]
    me = o.data
    mats = [m.name if m else "" for m in me.materials]
    solid = [p.index for p in me.polygons if not mats[p.material_index].startswith(("Atlas", "Paneling", "Decals"))]
    bvh = BVHTree.FromPolygons([v.co for v in me.vertices], [me.polygons[i].vertices for i in solid])
    C = {}
    exec(open(CP).read(), C)
    bm, cnl, uvl = C["open_bm"](me)
    seam = [f for f in bm.faces if mats[f.material_index].startswith("Atlas4")]
    done, removed = 0, 0
    for k in range(4):
        R = Matrix.Rotation(k * math.pi / 2, 3, "Z")         # side-local -Y frame -> world
        for a, z in BRACE_ENDS:
            end = R @ Vector((a, FIELD, z))
            near = [f for f in seam if f.is_valid and any((v.co - end).length < 0.04 for v in f.verts)
                    and abs(f.normal.dot(R @ Vector((0, -1, 0)))) > 0.99]
            tips = [f for f in near if all((v.co - end).length < 0.04 for v in f.verts)]
            body = [f for f in near if f not in tips]
            if not tips:
                continue
            up = 1 if z > -2.5 else -1
            moves = {}
            for f in body:
                lo = {l.vert: l for l in f.loops}
                for l in f.loops:
                    if (l.vert.co - end).length >= 0.04:
                        continue
                    # its far partner: the body corner on the same side line (same V)
                    far = min((m for m in f.loops if (m.vert.co - end).length >= 0.04),
                              key=lambda m: abs(m[uvl].uv.y - l[uvl].uv.y))
                    if abs(far[uvl].uv.y - l[uvl].uv.y) > 0.002:
                        continue
                    d = (l.vert.co - far.vert.co)
                    ku = (l[uvl].uv.x - far[uvl].uv.x) / d.length
                    d.normalize()
                    probe = l.vert.co + (R @ Vector((0, -0.001, 0)))
                    hit = bvh.ray_cast(probe - Vector((0, 0, up * 0.05)), Vector((0, 0, up)), 0.2)
                    zf = hit[0].z
                    t = (zf - far.vert.co.z) / d.z
                    moves[l.vert] = (far.vert.co + d * t, far[uvl].uv.x + ku * t)
            for f in tips:
                bm.faces.remove(f)
                removed += 1
            for v, (co, u) in moves.items():
                v.co = co
                for l in v.link_loops:
                    l[uvl].uv.x = u
            done += 1
    for v in [v for v in bm.verts if not v.link_faces]:
        bm.verts.remove(v)
    C["close_bm"](bm, me)
    me.update()
    return dict(ends=done, end_faces_removed=removed)
