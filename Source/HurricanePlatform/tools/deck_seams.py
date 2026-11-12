"""Deck seam joins (owner, 2026-11-09: "you need to do another look at the seam decal mitres"; from close-ups of
every join type, the owner's "Yes, fix those").

- caps(): the bottom deck's 8 cross-arm lines stopped square at the port surround. Each now ends in a pointed cap
  with its tip on the surround's edge: the strip stops half a width short and a triangle closes it.
  Run after service_gear.py and before finish.py:  ns = {}; exec(open(path).read(), ns); report = ns["caps"]()
- finish.py runs lift() and unshear() after the decal snap:
  - lift(): where a stem's tip lies on its cross line at the same stored height (the 8 T-joins on the ring trim, and
    the clamp and cross-arm T-joins on the bottom deck), Blender drew the two in turn (z-fighting). The stem's
    vertices on the cross line move one stored step further out, so the stem draws on top in Blender as it does in
    game, where it already comes later in the mesh.
  - unshear(): the snap rounds each vertex in the face's plane too (up to 1.5 mm at 6 m out), so on short faces
    (the tips) U stopped running along the strip and the groove's shading turned with it (the light sliver at the
    ring trim's T-joins). Each deck seam face gets its U again from its corners' distance along the strip, at the
    face's own scale; V stays. The strip tiles along U, so the small steps in U between faces do not show.
"""
import math

import bmesh
import bpy
import numpy as np
from mathutils import Vector

CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
PLAT = "Platform"
DECALS = ("Pl_TopDec_Atlas4_Colorable", "Pl_TopDec_Atlas4_Darker")
V0, V1 = 0.4834, 0.5166      # Atlas4 piece 3's box in V
PORT, PORT_HALF = 1.0, 0.76  # the bottom port surround's straight edges: |x| or |y| = 1.0, the other under 0.76
TOP, BOT = -1.33, -3.67      # deck seam faces lie above / below these heights
SAME_Z, MIN_AREA = 0.0003, 2e-6


def deck_face(p, mats):
    if not mats[p.material_index].startswith("Atlas4"):
        return 0
    if p.center.z > TOP and p.normal.z > 0.9:
        return 1
    if p.center.z < BOT and p.normal.z < -0.9:
        return -1
    return 0


def caps():
    """Pointed ends where the bottom cross arms meet the port surround."""
    C = {}
    exec(open(CP).read(), C)
    me = bpy.data.objects[PLAT].data
    mats = [m.name for m in me.materials]
    bm, cnl, uvl = C["open_bm"](me)

    def on_port(v):
        x, y = abs(v.co.x), abs(v.co.y)
        return (abs(y - PORT) < 0.002 and x < PORT_HALF) or (abs(x - PORT) < 0.002 and y < PORT_HALF)
    ends = []
    for f in bm.faces:
        if not mats[f.material_index].startswith("Atlas4") or f.calc_center_median().z > BOT or f.normal.z > -0.9:
            continue
        lp = [l for l in f.loops if on_port(l.vert)]
        if len(lp) == 2 and len(f.verts) == 4:
            ends.append((f, lp))
    for f, (la, lb) in ends:
        assert all(len(l.vert.link_faces) == 1 for l in (la, lb)), f.index
        mid = (la.vert.co + lb.vert.co) / 2
        t = f.calc_center_median() - mid
        t.z = 0
        t.normalize()
        h = (la.vert.co - lb.vert.co).length / 2
        cols = [l for l in f.loops if l not in (la, lb)]
        k = (cols[0][uvl].uv.x - la[uvl].uv.x) / max((cols[0].vert.co - la.vert.co).dot(t), 1e-9)
        u_end = (la[uvl].uv.x + lb[uvl].uv.x) / 2
        for l in (la, lb):
            l.vert.co += t * h
            l[uvl].uv.x += k * h
        tip = bm.verts.new(mid)
        g = bm.faces.new((lb.vert, la.vert, tip))
        g.normal_update()
        if g.normal.z > 0:                              # the bottom deck's decals face down
            g.normal_flip()
        g.material_index = f.material_index
        for l in g.loops:
            src = la if l.vert is la.vert else lb if l.vert is lb.vert else None
            l[uvl].uv = src[uvl].uv.copy() if src else (u_end, (V0 + V1) / 2)
            l[cnl] = Vector((0, 0, -1))
    n = len(ends)
    C["close_bm"](bm, me)
    return dict(port_caps=n)


def plane_z(me, p):
    """z = a x + b y + c over the face's corners."""
    P = np.array([[me.vertices[i].co.x, me.vertices[i].co.y, 1.0] for i in p.vertices])
    z = np.array([me.vertices[i].co.z for i in p.vertices])
    return np.linalg.lstsq(P, z, rcond=None)[0]


def visible(me, uv, p):
    """The face's visible part (V inside piece 3's box), as xy points."""
    poly = [(*uv[li].uv, me.vertices[vi].co.x, me.vertices[vi].co.y) for li, vi in zip(p.loop_indices, p.vertices)]
    for v, keep in ((V0, lambda q: q[1] >= V0), (V1, lambda q: q[1] <= V1)):
        out = []
        for i in range(len(poly)):
            a, b = poly[i - 1], poly[i]
            if keep(b):
                if not keep(a):
                    out.append(tuple(a[k] + (b[k] - a[k]) * (v - a[1]) / (b[1] - a[1]) for k in range(4)))
                out.append(b)
            elif keep(a):
                out.append(tuple(a[k] + (b[k] - a[k]) * (v - a[1]) / (b[1] - a[1]) for k in range(4)))
        poly = out
        if not poly:
            return []
    return [(q[2], q[3]) for q in poly]


def ccw(pts):
    s = sum(pts[i - 1][0] * pts[i][1] - pts[i][0] * pts[i - 1][1] for i in range(len(pts)))
    return pts if s > 0 else pts[::-1]


def clip_convex(a, b):
    out = ccw(a)
    b = ccw(b)
    for i in range(len(b)):
        c, d = b[i - 1], b[i]
        side = lambda p: (d[0] - c[0]) * (p[1] - c[1]) - (d[1] - c[1]) * (p[0] - c[0])
        inp, out = out, []
        for j in range(len(inp)):
            p, q = inp[j - 1], inp[j]
            sp, sq = side(p), side(q)
            if sq >= 0:
                if sp < 0:
                    out.append(tuple(p[k] + (q[k] - p[k]) * sp / (sp - sq) for k in range(2)))
                out.append(q)
            elif sp >= 0:
                out.append(tuple(p[k] + (q[k] - p[k]) * sp / (sp - sq) for k in range(2)))
        if not out:
            return []
    return out


def area(pts):
    return abs(sum(pts[i - 1][0] * pts[i][1] - pts[i][0] * pts[i - 1][1] for i in range(len(pts)))) / 2


def inside(pt, poly, margin=0.0005):
    poly = ccw(poly)
    for i in range(len(poly)):
        c, d = poly[i - 1], poly[i]
        L = math.hypot(d[0] - c[0], d[1] - c[1])
        if ((d[0] - c[0]) * (pt[1] - c[1]) - (d[1] - c[1]) * (pt[0] - c[0])) / L < -margin:
            return False
    return True


def step_out(co, sign):
    """The next stored height one step further from the deck (sign +1 up, -1 down)."""
    s = np.float32(max(min(math.floor(max(abs(co.x), abs(co.y), abs(co.z))), 2048), 1))
    h = np.float16(np.float32(co.z) / s)
    return float(np.float32(np.nextafter(h, np.float16(np.inf * sign))) * s)


def lift(me=None):
    me = me or bpy.data.objects[PLAT].data
    mats = [m.name for m in me.materials]
    uv = me.uv_layers.active.data
    faces = []
    for p in me.polygons:
        s = deck_face(p, mats)
        if s:
            vis = visible(me, uv, p)
            if len(vis) >= 3:
                xs, ys = [q[0] for q in vis], [q[1] for q in vis]
                faces.append((p, s, vis, (min(xs), min(ys), max(xs), max(ys)), plane_z(me, p)))
    moved, pairs, mitres = set(), [], 0
    for i, (a, sa, va, ba, za) in enumerate(faces):
        for b, sb, vb, bb, zb in faces[i + 1:]:
            if sa != sb or bb[0] > ba[2] or bb[2] < ba[0] or bb[1] > ba[3] or bb[3] < ba[1]:
                continue
            I = clip_convex(va, vb)
            if len(I) < 3 or area(I) < MIN_AREA:
                continue
            cx, cy = sum(q[0] for q in I) / len(I), sum(q[1] for q in I) / len(I)
            if abs((za[0] - zb[0]) * cx + (za[1] - zb[1]) * cy + za[2] - zb[2]) > SAME_Z:
                continue
            # the stem is the face whose middle is nearer the overlap; the cross line is the other
            stem, cross = (a, b) if math.hypot(a.center.x - cx, a.center.y - cy) < math.hypot(
                b.center.x - cx, b.center.y - cy) else (b, a)
            poly = [(me.vertices[k].co.x, me.vertices[k].co.y) for k in cross.vertices]
            vs = [k for k in stem.vertices if inside((me.vertices[k].co.x, me.vertices[k].co.y), poly)]
            if not vs:      # two lines' mitred ends, overlapping by the snap's rounding: not a stem on a line
                mitres += 1
                continue
            pairs.append((stem.index, cross.index, stem.index > cross.index))
            for k in vs:
                if k not in moved:
                    co = me.vertices[k].co
                    co.z = step_out(co, sa)
                    moved.add(k)
    me.update()
    return dict(stems=len(pairs), verts=len(moved), stem_after_cross=all(p[2] for p in pairs), mitre_overlaps=mitres)


def unshear_mesh(me, pick):
    uv = me.uv_layers.active.data
    n, worst = 0, 0.0
    for p in me.polygons:
        if not pick(p):
            continue
        P = np.array([[me.vertices[k].co.x, me.vertices[k].co.y] for k in p.vertices])
        U = np.array([uv[li].uv.x for li in p.loop_indices])
        V = np.array([uv[li].uv.y for li in p.loop_indices])
        A = np.c_[P, np.ones(len(P))]
        gu = np.linalg.lstsq(A, U, rcond=None)[0][:2]
        gv = np.linalg.lstsq(A, V, rcond=None)[0][:2]
        if np.linalg.norm(gv) < 1e-6 or np.linalg.norm(gu) < 1e-9:
            continue
        ang = math.degrees(math.acos(np.clip(gu @ gv / np.linalg.norm(gu) / np.linalg.norm(gv), -1, 1)))
        if abs(ang - 90) < 0.5:
            continue
        worst = max(worst, abs(ang - 90))
        t = np.array([-gv[1], gv[0]]) / np.linalg.norm(gv)
        k = gu @ t
        c = P.mean(0)
        for li, q in zip(p.loop_indices, P):
            uv[li].uv.x = float(U.mean() + k * ((q - c) @ t))
        n += 1
    me.update()
    return n, round(worst, 1)


def unshear():
    me = bpy.data.objects[PLAT].data
    mats = [m.name for m in me.materials]
    rep = {PLAT: unshear_mesh(me, lambda p: deck_face(p, mats) != 0)}
    for name in DECALS:
        o = bpy.data.objects.get(name)
        if o:
            rep[name] = unshear_mesh(o.data, lambda p: abs(p.normal.z) > 0.9)
    return rep
