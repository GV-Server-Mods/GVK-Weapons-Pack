"""Triangle trim of parts that carry no decals (owner's pick, 2026-11-09: cull, then fewer segments only on parts
with no decals, decals untouched).

rings(name): a tube built as a quad grid (the rear hoses, the grille handles) loses every second ring along its
length. Each tube's first and last ring stay, and so does any ring with a sharp edge, a vertex that is not a plain
grid vertex, or a crease across it (corners on its two sides with different normals). The kept rings do not move,
so the tube's path and its 16 (or 12) sides stay; only the bend between kept rings becomes one segment of twice the
length.

meridians(name, n): a turned part (the hose fittings) whose islands have n sides loses every second meridian, so
32 sides become 16 (se-dev-seut bpy-recipes.md, "Triangle budget": halving a finished revolved part).

Both keep each kept corner's normal: a new corner takes the old corner of its vertex whose face pointed most
the same way.

    ns = {}; exec(open(path).read(), ns); report = ns["trim"](dry=True)
"""
import math

import bmesh
import bpy
import numpy as np

RINGS = ("RearPipes", "RearGrilleHandles")
MERIDIANS = (("RearHoseFittings", 32),)
TOL = 1e-3


def _loop(e, v, cap=64):
    """Edges of the straight edge loop through e, and whether it closes."""
    start, out = e, [e]
    while True:
        v2 = e.other_vert(v)
        if len(v2.link_edges) != 4:
            return out, False
        fs = set(e.link_faces)
        nxt = [g for g in v2.link_edges if g is not e and not (set(g.link_faces) & fs)]
        if len(nxt) != 1:
            return out, False
        e, v = nxt[0], v2
        if e is start:
            return out, True
        out.append(e)
        if len(out) > cap:
            return out, False


def _smooth(me):
    """Vertices whose corners all share one normal."""
    by = {}
    for p in me.polygons:
        for li, vi in zip(p.loop_indices, p.vertices):
            by.setdefault(vi, []).append(me.corner_normals[li].vector.copy())
    return {vi for vi, ns in by.items() if all((n - ns[0]).length < TOL for n in ns)}


def _old_corners(me):
    out = {}
    for p in me.polygons:
        for li, vi in zip(p.loop_indices, p.vertices):
            out.setdefault(vi, []).append((p.normal.copy(), me.corner_normals[li].vector.copy()))
    return out


def _write(o, bm, old):
    me = o.data
    bm.to_mesh(me)
    bm.free()
    oid = me.attributes["trim_oid"].data
    cn = []
    for p in me.polygons:
        for vi in p.vertices:
            cands = old[oid[vi].value]
            cn.append(max(cands, key=lambda c: c[0].dot(p.normal))[1])
    me.attributes.remove(me.attributes["trim_oid"])
    me.normals_split_custom_set([tuple(n) for n in cn])
    me.update()


def _begin(me):
    bm = bmesh.new()
    bm.from_mesh(me)
    lay = bm.verts.layers.int.new("trim_oid")
    for v in bm.verts:
        v[lay] = v.index
    return bm


def rings(name, dry=True):
    o = bpy.data.objects[name]
    me = o.data
    cn = {(vi, p.index): me.corner_normals[li].vector.copy()
          for p in me.polygons for li, vi in zip(p.loop_indices, p.vertices)}
    old = _old_corners(me)
    bm = _begin(me)
    bm.verts.ensure_lookup_table()

    def across(x):
        """No crease across the ring at edge x: each end's corners on both sides share one normal."""
        f, g = x.link_faces
        return all((cn[(w.index, f.index)] - cn[(w.index, g.index)]).length < TOL for w in x.verts)
    loops = {}
    for v in bm.verts:
        if len(v.link_edges) != 4:
            continue
        for e in v.link_edges:
            es, closed = _loop(e, v)
            if closed:
                loops.setdefault(frozenset(x.index for x in es), es)
    ring_of = {}
    for key, es in loops.items():
        for x in es:
            for w in x.verts:
                ring_of.setdefault(w.index, set()).add(key)
    # a vertex in two closed loops lies on a closed grid both ways: leave those alone
    ok = {key for key, es in loops.items()
          if all(len(ring_of[w.index]) == 1 for x in es for w in x.verts)
          and all(x.smooth and len(x.link_faces) == 2 and across(x) for x in es)}
    nb = {k: set() for k in ok}
    for k in ok:
        for x in loops[k]:
            for w in x.verts:
                for g in w.link_edges:
                    u = g.other_vert(w)
                    for k2 in ring_of.get(u.index, ()):
                        if k2 != k and k2 in ok:
                            nb[k].add(k2)
    drop, seen = [], set()
    for k0 in ok:
        if k0 in seen or len(nb[k0]) > 1:
            continue
        chain, prev, k = [], None, k0
        while k is not None and k not in seen:
            seen.add(k)
            chain.append(k)
            nxt = [k2 for k2 in nb[k] if k2 != prev]
            prev, k = k, (nxt[0] if len(nxt) == 1 else None)
        drop += chain[1:-1:2]
    edges = list(dict.fromkeys(x for k in drop for x in loops[k]))
    before = sum(len(f.verts) - 2 for f in bm.faces)
    if dry or not edges:
        bm.free()
        return dict(rings=len(drop), tris_before=before)
    bmesh.ops.dissolve_edges(bm, edges=edges, use_verts=True, use_face_split=False)
    after = sum(len(f.verts) - 2 for f in bm.faces)
    _write(o, bm, old)
    return dict(rings=len(drop), tris_before=before, tris_after=after)


def meridians(name, n, dry=True):
    o = bpy.data.objects[name]
    me = o.data
    old = _old_corners(me)
    bm = _begin(me)
    bm.faces.ensure_lookup_table()
    seen, edges, islands = set(), [], 0
    for f0 in bm.faces:
        if f0.index in seen:
            continue
        stack, faces = [f0], []
        seen.add(f0.index)
        while stack:
            f = stack.pop()
            faces.append(f)
            for e in f.edges:
                for g in e.link_faces:
                    if g.index not in seen:
                        seen.add(g.index)
                        stack.append(g)
        vs = list({v for f in faces for v in f.verts})
        ring = None
        for v in vs:
            if len(v.link_edges) == 4:
                for e in v.link_edges:
                    es, closed = _loop(e, v)
                    if closed and len(es) == n:
                        ring = es
                        break
            if ring:
                break
        if not ring:
            continue
        P = np.array([x.verts[0].co for x in ring])
        c = P.mean(0)
        ax = np.linalg.svd(P - c)[2][2]
        b1 = P[0] - c - ax * ((P[0] - c) @ ax)
        b1 /= np.linalg.norm(b1)
        b2 = np.cross(ax, b1)
        ang = lambda p: math.atan2((p - c) @ b2, (p - c) @ b1)
        step = 2 * math.pi / n
        a0 = ang(P[0])

        def slot(v):
            q = np.array(v.co) - c
            if np.linalg.norm(q - ax * (q @ ax)) < 1e-4:
                return None                  # on the axis
            k = (ang(np.array(v.co)) - a0) / step
            r = round(k)
            return r % n if abs(k - r) < 0.02 else None
        sl = {v: slot(v) for v in vs}
        if any(s is None for v, s in sl.items() if (np.linalg.norm((np.array(v.co) - c) - ax * ((np.array(v.co) - c) @ ax)) > 1e-4)):
            continue                         # not a clean turned part
        islands += 1
        for f in faces:
            for e in f.edges:
                a, b = (sl[w] for w in e.verts)
                if a is not None and a == b and a % 2 == 1:
                    edges.append(e)
    edges = list(dict.fromkeys(edges))
    before = sum(len(f.verts) - 2 for f in bm.faces)
    if dry or not edges:
        bm.free()
        return dict(islands=islands, edges=len(edges), tris_before=before)
    bmesh.ops.dissolve_edges(bm, edges=edges, use_verts=True, use_face_split=False)
    after = sum(len(f.verts) - 2 for f in bm.faces)
    _write(o, bm, old)
    return dict(islands=islands, edges=len(edges), tris_before=before, tris_after=after)


def trim(dry=True):
    out = {n: rings(n, dry) for n in RINGS}
    out.update({n: meridians(n, k, dry) for n, k in MERIDIANS})
    return out
