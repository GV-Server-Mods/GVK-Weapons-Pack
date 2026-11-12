"""Gunhouse roof seam joins (owner, 2026-11-09: "you need to fix some seam miters on the gunhouse roof in multiple
places around the large chrome panels").

The roof's lines meet in T-joins: the dark strip's edges on the dark line in front of the rear panel (y 0.8) and on
the front edge line, and the rear panel's outline (paint colour) on the same y 0.8 line. Each stem ends in a point on
its cross line, at the same stored height, so Blender drew the two in turn (z-fighting). In game a stem draws over
its cross line when it comes later in the same mesh, which every roof stem does; across the two meshes the order is
the engine's, and either way reads as a join.

corner_stems(): at the roof's two front corners the glacis edge line (paint colour) stopped 3 to 15 mm short of the
dark front edge line. It now carries on up the rounded corner and ends on the dark line's edge, cut along that edge,
laid 1.5 mm off the body so the new faces follow the curve. It meets the dark line at about 20 degrees, so a point
on the dark line's middle came out as a 38 mm sliver across the curved corner, which the game's 2.9 mm position
grid out here broke into shards.
Run once after overlaps.py, before finish.py:  ns = {}; exec(open(path).read(), ns); report = ns["corner_stems"]()
Running it again does nothing.

tips() runs from finish.py after the snap:  ns = {}; exec(open(path).read(), ns); report = ns["tips"]()
Since the split (2026-11-09) the roof decals live in the Az subpart scene, whose origin is on the slew axis at the
trunnion's height and which is turned 180 degrees about Z, so the roof is 1.9 m lower there; finish.py's
finish_split() runs tips().
- The two front stems ran from the flat roof over the edge bevel as one face: the face was not flat, so Blender cut
  it into triangles that passed under the line. Each such stem is split where it enters its cross line.
- Every stem's corners on its cross line move SUB up from the cross line's plane, so Blender draws the stem on top.
  In the one-scene model SUB was under half the game's stored step there (2.9 mm), so the game rounded them back
  where the snap put them. In the Az scene the step is 0.6 to 0.7 mm, and a lift may land one step up in game (at
  most MAX_UP), which also draws the stem on top. A corner whose lift would move it further stays (not_lifted).
- Each roof seam face's U is set again along its strip in its own plane (deck_seams.py's unshear(), for faces that
  are not flat): the snap's rounding had turned it on the small faces round the front corners.
"""
import math

import bmesh
import bpy
import numpy as np
from mathutils import Vector

CP =r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
SEAMS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\deck_seams.py"
SNAP = r"C:\Users\blayl\.claude\skills\se-dev-seut\scripts\decal_snap.py"
OBJS = ("GH_Dec_Atlas4_Darker_Az", "GH_Dec_Atlas4_Colorable_Az")
PAINT = "GH_Dec_Atlas4_Colorable"
ROOF = 1.05             # roof seam faces lie above this height, in the Az scene (2.95 in the block before the split)
UPISH = 0.5             # and face up at least this much (the edge bevels included)
SUB = 0.0004
MAX_UP = 0.001          # a lift may move the corner this far up where the game stores it
NEAR_Z = 0.002          # a stem and its cross line meet within this height
MARGIN = 0.001
FLAT = 0.0002
MIN_FACE = 2e-6     # faces the snap squashed smaller than this have no strip direction left
SCENE = "GVK_HurricaneTurret_Az"
V0 = 0.4834                             # Atlas4 piece 3: the dark line's edge on the glacis side, in V
CORNER = (3.375, -1.415, 3.04)          # the glacis edge line's top end, +x side, in the block before the split
                                        # (corner_stems() ran there once and is flagged done)
CORNER_N = (0.42, -0.5, 0.75)           # the rounded corner's mean normal there
ROW = 0.025         # new rows at most this far apart: enough to follow the curve, and well over the 2.9 mm the game
                    # stores positions on out here, which scrambled rows a few mm apart
LIFT = 0.0015
BACK = 0.004
CORNER_DONE = "corner_stems_done"


def _faces(D, me):
    uv = me.uv_layers.active.data
    mats = [m.name for m in me.materials]
    out = []
    for p in me.polygons:
        if mats[p.material_index].startswith("Atlas4") and p.center.z > ROOF and p.normal.z > UPISH:
            vis = D["visible"](me, uv, p)
            if len(vis) >= 3:
                xs, ys = [q[0] for q in vis], [q[1] for q in vis]
                out.append((me, p.index, vis, (min(xs), min(ys), max(xs), max(ys))))
    return out


def _pairs(D, faces):
    """(upper, lower, upper's corners inside lower) for every stem on its cross line."""
    out, odd = [], []
    for i, (ma, ia, va, ba) in enumerate(faces):
        for mb, ib, vb, bb in faces[i + 1:]:
            if bb[0] > ba[2] or bb[2] < ba[0] or bb[1] > ba[3] or bb[3] < ba[1]:
                continue
            I = D["clip_convex"](va, vb)
            if len(I) < 3 or D["area"](I) < D["MIN_AREA"]:
                continue
            pa, pb = ma.polygons[ia], mb.polygons[ib]
            cx, cy = sum(q[0] for q in I) / len(I), sum(q[1] for q in I) / len(I)
            za, zb = D["plane_z"](ma, pa), D["plane_z"](mb, pb)
            if abs((za[0] - zb[0]) * cx + (za[1] - zb[1]) * cy + za[2] - zb[2]) > NEAR_Z:
                continue
            def poly(me, p):            # corners the snap put on one place count once
                pts = [(me.vertices[k].co.x, me.vertices[k].co.y) for k in p.vertices]
                return [q for i, q in enumerate(pts) if math.dist(q, pts[i - 1]) > 1e-7]
            ins = lambda me, p, other: [k for k in p.vertices if len(other) >= 3 and
                                        D["inside"]((me.vertices[k].co.x, me.vertices[k].co.y), other, MARGIN)]
            in_a, in_b = ins(ma, pa, poly(mb, pb)), ins(mb, pb, poly(ma, pa))
            if ma is mb:                      # the later face draws on top in game
                up = (ma, ia, in_a, mb, ib) if ia > ib else (mb, ib, in_b, ma, ia)
            else:                             # every roof stem across the two is a paint-colour line on a dark one
                up = (ma, ia, in_a, mb, ib) if ma.name.startswith(PAINT) else (mb, ib, in_b, ma, ia)
            if not up[2]:
                odd.append(((up[0].name, up[1]), (up[3].name, up[4])))
                continue
            out.append(up)
    return out, odd


def _split(me, pairs):
    """Cut each stem that is not flat where it enters its cross line; returns how many."""
    todo = []
    for mu, iu, ins, ml, il in pairs:
        if mu is not me:
            continue
        p = me.polygons[iu]
        P = np.array([tuple(me.vertices[k].co) for k in p.vertices])
        c = P.mean(0)
        n = np.array(p.normal)
        if np.abs((P - c) @ n).max() < FLAT:
            continue
        vs = list(p.vertices)
        inside = [k in ins for k in vs]
        if all(inside) or not any(inside):
            continue
        # the inside corners run on round the face; join the two ends of that run
        start = next(i for i in range(len(vs)) if inside[i] and not inside[i - 1])
        run = []
        i = start
        while inside[i % len(vs)]:
            run.append(vs[i % len(vs)])
            i += 1
        if len(run) >= 3:
            todo.append((run[0], run[-1]))
    if not todo:
        return 0
    C = {}
    exec(open(CP).read(), C)
    bm, cnl, uvl = C["open_bm"](me)
    bm.verts.ensure_lookup_table()
    for a, b in todo:
        bmesh.ops.connect_verts(bm, verts=[bm.verts[a], bm.verts[b]])
    C["close_bm"](bm, me)
    me.update()
    return len(todo)


def _segments(me, c, v, r=0.08):
    """The Darker line's edges near c whose both ends lie at V v (its lower edge or its middle)."""
    uv = me.uv_layers.active.data
    out = []
    for p in me.polygons:
        if (p.center - c).length > r:
            continue
        L = list(p.loop_indices)
        for i in range(len(L)):
            a, b = L[i], L[(i + 1) % len(L)]
            if abs(uv[a].uv.y - v) < 2e-4 and abs(uv[b].uv.y - v) < 2e-4:
                out.append((me.vertices[me.loops[a].vertex_index].co.copy(),
                            me.vertices[me.loops[b].vertex_index].co.copy()))
    return out


def _reach(p, d, segs, n):
    """Where p, moving along d, crosses one of segs, seen along n (the corner's mean normal): a point on the segment.
    A corner already a little past the edge (up to BACK) is brought back to it."""
    flat = lambda v: v - n * v.dot(n)
    p2, d2 = flat(p), flat(d).normalized()
    best = None
    for a, b in segs:
        e = flat(b) - flat(a)
        M = np.array([[d2.x, -e.x], [d2.y, -e.y], [d2.z, -e.z]])
        (s, t), *_ = np.linalg.lstsq(M, np.array(flat(a) - p2), rcond=None)
        if -1e-6 <= t <= 1 + 1e-6 and s > -BACK and (best is None or abs(s) < abs(best[0])):
            best = (s, a + (b - a) * t)
    return best


def corner_stems():
    """The glacis edge lines' top ends at the roof's front corners, carried on to a point on the dark front line."""
    col, dk = (bpy.data.objects[n] for n in reversed(OBJS))
    me = col.data
    if me.get(CORNER_DONE):
        return dict(done=True)
    S = {}
    exec(open(SNAP).read(), S)
    sc = next(c for c in bpy.data.scenes[SCENE].collection.children_recursive if c.name.startswith("Main"))
    tb = S["surfaces"](sc)[1]
    C = {}
    exec(open(CP).read(), C)
    bm, cnl, uvl = C["open_bm"](me)
    rep = {}
    for sx in (1, -1):
        c0 = Vector((sx * CORNER[0], CORNER[1], CORNER[2]))
        # the line's end: its boundary edges near the corner that run across it (V changes along them)
        top = {}
        for e in bm.edges:
            if e.is_boundary and (e.verts[0].co - c0).length < 0.04:
                for l in e.link_faces[0].loops:
                    if l.vert in e.verts:
                        top[l.vert] = (l[uvl].uv.x, l[uvl].uv.y, l.face.material_index)
        ends = [e for e in bm.edges if e.is_boundary and all(v in top for v in e.verts)
                and abs(top[e.verts[0]][1] - top[e.verts[1]][1]) > 1e-4]
        T = sorted({v for e in ends for v in e.verts}, key=lambda v: top[v][1])
        assert len(T) == 5, (sx, len(T))
        ds, ks = [], []
        for t in T:
            for l in t.link_loops:
                for nb in (l.link_loop_next, l.link_loop_prev):
                    if nb.vert not in T and abs(nb[uvl].uv.y - top[t][1]) < 1e-4:
                        dd = t.co - nb.vert.co
                        ds.append(dd.normalized())
                        ks.append((l[uvl].uv.x - nb[uvl].uv.x) / dd.length)
        d = sum(ds, Vector()).normalized()
        k = float(np.mean(ks))
        n = Vector((sx * CORNER_N[0], CORNER_N[1], CORNER_N[2])).normalized()
        cen = sum((t.co for t in T), Vector()) / len(T)
        lo = _segments(dk.data, cen, V0)

        def on_body(p):
            h = tb.ray_cast(p + n * 0.01, -n, 0.03)
            assert h[0] is not None, tuple(p)
            hn = h[1] if h[1].dot(n) > 0 else -h[1]
            return h[0] + hn * LIFT
        edge, back = [], 0
        for t in T:
            h = _reach(t.co, d, lo, n)
            if h and h[0] < 0:          # already past the edge: back onto it
                t.co = on_body(h[1])
                back += 1
            edge.append(h[1] if h and h[0] > 0 else t.co.copy())
        u0, ref = top[T[2]][0], T[2].co.copy()
        mi = top[T[2]][2]
        # rows from the line's end to the dark line's edge, each laid on the body
        reach = max((q - t.co).length for q, t in zip(edge, T))
        nr = max(1, math.ceil(reach / ROW))
        rows = [[(t.co.lerp(q, i / nr), top[t][1]) for t, q in zip(T, edge)] for i in range(1, nr + 1)]
        U = lambda co: u0 + k * (co - ref).dot(d)      # U runs on along the line; V is the row's
        prev = [(t, top[t][1]) for t in T]
        made = 0
        for r, row in enumerate(rows):
            # a corner already on the dark line's edge stays where it is
            cur = [prev[j] if (q - p).length < 1e-4 else (bm.verts.new(on_body(q)), v)
                   for j, ((q, v), p) in enumerate(zip(row, [pv.co for pv, _ in prev]))]
            for j in range(len(row) - 1):
                ring = [prev[j], prev[j + 1], cur[j + 1], cur[j]]
                quad = []
                for vt, v in ring:
                    if all(vt is not w for w, _ in quad):
                        quad.append((vt, v))
                if len(quad) < 3:
                    continue
                f = bm.faces.new([vt for vt, _ in quad])
                f.material_index = mi
                f.normal_update()
                if f.normal.dot(n) < 0:
                    f.normal_flip()
                vv = {vt: v for vt, v in quad}
                for l in f.loops:
                    l[uvl].uv = (U(l.vert.co), vv[l.vert])
                    l[cnl] = f.normal
                made += 1
            prev = cur
        rep[sx] = dict(rows=len(rows), faces=made, reach_mm=round(reach * 1000, 1), brought_back=back)
    C["close_bm"](bm, me)
    me[CORNER_DONE] = True
    me.update()
    return rep


def tips():
    D = {}
    exec(open(SEAMS).read(), D)
    S = {}
    exec(open(SNAP).read(), S)
    mes = [bpy.data.objects[n].data for n in OBJS]
    assert all(bpy.data.objects[n].matrix_world.is_identity for n in OBJS)
    pairs, odd = _pairs(D, [f for me in mes for f in _faces(D, me)])
    split = sum(_split(me, pairs) for me in mes)
    if split:
        pairs, odd = _pairs(D, [f for me in mes for f in _faces(D, me)])
    moved, kept = set(), set()
    for _ in range(4):                  # a stem on a stem (the diagonal on the centre line) needs a second pass
        again = False
        for mu, iu, ins, ml, il in pairs:
            a, b, c = D["plane_z"](ml, ml.polygons[il])
            for k in ins:
                co = mu.vertices[k].co
                z = a * co.x + b * co.y + c + SUB
                if co.z < z - 1e-7:
                    # where the game stores it no more than MAX_UP higher: on the Az scene's finer grid a lift
                    # often lands one stored step up, which in game only puts the stem on top by depth as well
                    up = (S["pack"](np.array([[co.x, co.y, z]], np.float32)) -
                          S["pack"](np.array([tuple(co)], np.float32)))[0]
                    if abs(up[0]) < 1e-7 and abs(up[1]) < 1e-7 and -1e-7 < up[2] <= MAX_UP:
                        co.z = z
                        moved.add((mu.name, k))
                        again = True
                    else:
                        kept.add((mu.name, k))
        if not again:
            break
    for me in mes:
        me.update()
    sheared = [unshear(me) for me in mes]
    later = all(iu > il for mu, iu, ins, ml, il in pairs if mu is ml)
    return dict(stems=len(pairs), split=split, verts=len(moved), not_lifted=len(kept - moved), stem_after_cross=later,
                unclear=odd, unshear=sheared)


def unshear(me):
    """U along the strip again, in each roof seam face's own plane; V stays."""
    uv = me.uv_layers.active.data
    mats = [m.name for m in me.materials]
    n, worst = 0, 0.0
    for p in me.polygons:
        if not mats[p.material_index].startswith("Atlas4") or p.center.z < ROOF or p.area < MIN_FACE:
            continue
        nrm = p.normal
        e1 = me.vertices[p.vertices[1]].co - me.vertices[p.vertices[0]].co
        e1 = (e1 - nrm * e1.dot(nrm)).normalized()
        e2 = nrm.cross(e1)
        P = np.array([[(me.vertices[k].co - p.center).dot(e1), (me.vertices[k].co - p.center).dot(e2)]
                      for k in p.vertices])
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
