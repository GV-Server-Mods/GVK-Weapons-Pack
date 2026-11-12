"""Decal faces that dip into the surface they lie on (owner, 2026-11-09, "fix some seam miters on the gunhouse roof
in multiple places around the large chrome panels": the specks at the roof's front corners were the body showing
through the line).

A flat decal face laid across a rounded bevel touches the bevel at its corners and passes under it between them.
The game draws a decal only where it tests in front of the surface, so those parts go missing, and Blender shows the
body through them as specks. The snap (decal_snap.py) reports these as design faults and leaves them, so lift()
raises them first: every decal triangle whose lowest gap is under the snap's KEEP, but not deeper than DEEP, has its
corners moved out along its normal until that gap is GOAL. A corner shared by several such triangles takes the
largest move.
Deeper ones are not dips but a decal under another part; they are reported, not moved.
Run from finish.py before the snap:  ns = {}; exec(open(path).read(), ns); report = ns["lift"](col, snap_ns)
Running it again does nothing.
"""
import numpy as np
from mathutils import Vector

GOAL = 0.0009       # gap to leave over each dipping triangle
DEEP = -0.0012      # lower than this is something else, not a dip


def _dips(S, tb, o, kind):
    g = S["gaps"](tb, o, kind, False)
    dips = [(vs, gap, i) for i, (vs, gap) in g.items() if gap is not None and DEEP <= gap < S["KEEP"]]
    return dips, sum(1 for vs, gap in g.values() if gap is not None and gap < DEEP)


def lift(col, S, passes=3):
    """S: decal_snap.py's namespace. Returns {object: (dips found, dips left, deeper ones left alone)}."""
    first, cn = {}, {}
    for _ in range(passes):
        rb, tb, dec = S["surfaces"](col)
        moved = False
        for o, kind in dec:
            me = o.data
            dips, deep = _dips(S, tb, o, kind)
            first.setdefault(o.name, (len(dips), deep))
            if not dips:
                continue
            if o.name not in cn:
                cn[o.name] = [tuple(c.vector) for c in me.corner_normals]
            M = o.matrix_world
            Mi = M.inverted_safe()
            N = Mi.transposed().to_3x3()
            tris = {t.index: t for t in me.loop_triangles}
            W = np.array([M @ v.co for v in me.vertices], np.float32)
            key = [tuple(np.round(w * 1e5).astype(np.int64)) for w in W]
            where = {}
            for k, kk in enumerate(key):
                where.setdefault(kk, []).append(k)     # corners at one place (separate shells) move together
            need = {}
            for vs, gap, i in dips:
                n = (N @ tris[i].normal).normalized()
                for k in vs:
                    d, nn = need.get(key[k], (0.0, Vector()))
                    need[key[k]] = (max(d, GOAL - gap), nn + n)
            for kk, (d, nn) in need.items():
                for k in where[kk]:
                    me.vertices[k].co = Mi @ (Vector(W[k]) + nn.normalized() * d)
            me.update()
            moved = True
        if not moved:
            break
    rb, tb, dec = S["surfaces"](col)
    rep = {}
    for o, kind in dec:
        if o.name in cn:        # keep the shading the decal was built with
            me = o.data
            for p in me.polygons:
                p.use_smooth = True
            me.normals_split_custom_set(cn[o.name])
        dips, deep = _dips(S, tb, o, kind)
        if first[o.name][0] or deep:
            rep[o.name] = (first[o.name][0], len(dips), deep)
    return rep
