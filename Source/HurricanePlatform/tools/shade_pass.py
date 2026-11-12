"""Shading pass over the base (owner, 2026-11-09: "you need to do a full shade smoothing pass on the base").

Keen's own platform, measured before any GVK change: every edge up to 60 degrees shades smooth, most up to 70, and
the 90 degree corners stay hard. Large faces dominate the shared normal (a large flat face stays flat and the small
bevel beside it shades round), and similar faces on a curve blend. Many of Keen's normals are blends no rule
rebuilds exactly; weighting each face by the area of its flat region, cubed, comes closest (81% of corners within
2 degrees, 86% within 6, and 95% of his flat corners kept). The pieces the GVK scripts built carried flat normals,
so their rounded edges and curves showed facets beside the vanilla ones.

The rule for a corner: the faces round its position that it reaches across edges under ANGLE degrees, each weighted
by the area of its flat region (faces joined edge to edge within half a degree), cubed, a region counting once.
Corners join by position, not by vertex, so parts split along seams shade as one.
Decal faces keep their normals and take no part.
- Platform: corners with Keen's shaded normals (or a copy of them, as on the braces) keep them; every flat corner
  gets the rule, or, where its fan runs into one of Keen's shaded corners, that corner's normal (the nearest, if
  there are several), so the new pieces join his without a seam.
- The parts the scripts built (disc, service gear, hatch pocket, placard): every corner gets the rule.
- The kitbashed vanilla parts (ports, the bottom port's frame, keypads and their housings) keep Keen's normals.
Run it after finish.py, which restores Platform's normals from before its snap:
    ns = {}; exec(open(path).read(), ns); report = ns["shade"]()
Running it again changes nothing.
"""
import math
from collections import defaultdict

import bpy
from mathutils import Vector

ANGLE = 65.0
POWER = 3.0
FLAT = math.radians(0.5)     # a corner whose normal is its face's own is flat
PLAT = "Platform"
TURRET = "mk_Az"
VANILLA = ("Pl_Port_", "Pl_PortFrame_", "Pl_Keypad_", "Pl_KeypadFrame_")
DEC = {"DECAL", "DECAL_NOPREMULT", "DECAL_CUTOUT"}


def tech(m):
    return getattr(getattr(m, "seut", None), "technique", "") if m else ""


def base_objects():
    """Platform and the parts the scripts built; not the turret (under mk_Az) and not the vanilla parts."""
    plat = bpy.data.objects[PLAT]
    tur = bpy.data.objects[TURRET]
    skip = set(tur.children_recursive) | {tur}
    parts = [o for o in plat.children_recursive if o.type == "MESH" and o not in skip
             and not o.name.startswith(VANILLA)]
    return [plat] + sorted(parts, key=lambda o: o.name)


def corner_normals(me, angle=ANGLE, power=POWER):
    """The rule's normal for every corner of me (None for decal corners), and per corner the other corners of its
    smooth fan (the same position on the faces it reaches)."""
    ks = [tech(m) for m in me.materials]
    cos = math.cos(math.radians(angle))
    key = [tuple(int(round(x * 1e4)) for x in v.co) for v in me.vertices]
    faces = [p for p in me.polygons if not (p.material_index < len(ks) and ks[p.material_index] in DEC)]
    nrm = {p.index: p.normal.copy() for p in faces}
    edge = defaultdict(list)                    # position pair -> faces along it
    for p in faces:
        vs = [key[i] for i in p.vertices]
        for i, a in enumerate(vs):
            b = vs[(i + 1) % len(vs)]
            edge[(a, b) if a < b else (b, a)].append(p.index)
    # flat regions: faces joined edge to edge within half a degree. A face weighs as its whole region, so a narrow
    # strip of a large flat top stays flat beside a larger bevel (the jamb tops above the ports showed it).
    par = {f: f for f in nrm}

    def find(f):
        while par[f] != f:
            par[f] = par[par[f]]
            f = par[f]
        return f
    flat_cos = math.cos(FLAT)
    for fs in edge.values():
        for i in range(len(fs)):
            for j in range(i + 1, len(fs)):
                if nrm[fs[i]].dot(nrm[fs[j]]) >= flat_cos:
                    par[find(fs[i])] = find(fs[j])
    region = {f: find(f) for f in nrm}
    size = defaultdict(float)
    for p in faces:
        size[region[p.index]] += p.area
    w = {f: size[region[f]] ** power for f in nrm}
    links = defaultdict(set)                    # (face, position) -> faces joined to it there by a smooth edge
    for (a, b), fs in edge.items():
        for i in range(len(fs)):
            for j in range(i + 1, len(fs)):
                f, g = fs[i], fs[j]
                if f != g and nrm[f].dot(nrm[g]) >= cos:
                    for k in (a, b):
                        links[(f, k)].add(g)
                        links[(g, k)].add(f)
    loop_at = {(p.index, key[vi]): li for p in faces for li, vi in zip(p.loop_indices, p.vertices)}
    out, fans = [None] * len(me.loops), [()] * len(me.loops)
    for p in faces:
        for li, vi in zip(p.loop_indices, p.vertices):
            k = key[vi]
            fan, todo = {p.index}, [p.index]
            while todo:
                f = todo.pop()
                for g in links.get((f, k), ()):
                    if g not in fan:
                        fan.add(g)
                        todo.append(g)
            one = {region[f]: f for f in fan}    # a region counts once, however many of its faces meet here
            n = sum((nrm[f] * w[f] for f in one.values()), Vector())
            out[li] = n.normalized() if n.length > 1e-30 else nrm[p.index].copy()
            fans[li] = tuple(loop_at[(f, k)] for f in fan if f != p.index)
    return out, fans


def shade(names=None):
    objs = [bpy.data.objects[n] for n in names] if names else base_objects()
    rep = {}
    for o in objs:
        me = o.data
        old = [c.vector.copy() for c in me.corner_normals]
        face_of = [0] * len(me.loops)
        for p in me.polygons:
            for li in p.loop_indices:
                face_of[li] = p.index
        new, fans = corner_normals(me)
        keep_keen = o.name == PLAT
        kept = [n is None or (keep_keen and c.angle(me.polygons[face_of[li]].normal, 0) > FLAT)
                for li, (n, c) in enumerate(zip(new, old))]
        cn, changed = [], 0
        for li, (n, c) in enumerate(zip(new, old)):
            if kept[li]:
                cn.append(c)
                continue
            keen = [old[j] for j in fans[li] if kept[j] and new[j] is not None]
            if keen:     # the fan runs into Keen's shading: take his normal there, so the two join without a seam
                n = max(keen, key=lambda k: k.dot(n))
            cn.append(n)
            changed += n.angle(c, 0) > math.radians(1)
        for p in me.polygons:
            p.use_smooth = True
        me.normals_split_custom_set(cn)
        me.update()
        rep[o.name] = changed
    return rep
