"""Deck shading fix for Body (rerunnable). Only deck faces with 45-degree slopes are touched.

Wide slopes (the conveyor port's funnel, about 150 mm across) shade flat: every corner takes the face normal.
A thin bevel strip (about 11 mm) that continues a wide slope (shares an edge with it, within 5 degrees) takes
the slope's normal at the shared corners, so the round from the deck runs into the flat funnel. All other
strips keep Gemini's Keen-style weighting (upper corners the deck's normal, lower corners the wall's).

Run inside Blender (MCP):
    exec(open(r"<this file>").read()); fix()
"""
import bpy, bmesh, math
from mathutils import Vector

DECK_EDGE = 3.4405
DECK_Z = 1.12
WIDE = 0.05          # slope width (m) from which a slope shades flat
CONT = math.radians(5)


def is_deck(f):
    return all(max(abs(v.co.x), abs(v.co.y)) <= DECK_EDGE + 1e-5 and abs(v.co.z) >= DECK_Z for v in f.verts)


def is_slope(f):
    return 0.6 < abs(f.normal.z) < 0.8


def slope_width(f):
    zs = [v.co.z for v in f.verts]
    return (max(zs) - min(zs)) / math.sqrt(max(1e-9, 1 - f.normal.z ** 2))


def fix(name="Body"):
    me = bpy.data.objects[name].data
    cn = [Vector(c.vector) for c in me.corner_normals]
    bm = bmesh.new()
    bm.from_mesh(me)
    bm.faces.ensure_lookup_table()
    li = {}
    for f, p in zip(bm.faces, me.polygons):
        for l, i in zip(f.loops, p.loop_indices):
            li[l] = i
    wide = {f for f in bm.faces if is_slope(f) and is_deck(f) and slope_width(f) > WIDE}
    changed = 0
    for f in bm.faces:
        if not (is_slope(f) and is_deck(f)):
            continue
        nb = [g for e in f.edges for g in e.link_faces if g in wide and g.normal.angle(f.normal, 0) < CONT]
        for l in f.loops:
            if f in wide:
                want = f.normal.copy()
            else:
                g = next((g for g in nb if l.vert in g.verts), None)
                if g is None:
                    continue
                want = g.normal.copy()
            if (cn[li[l]] - want).length > 2e-3:     # stored custom normals are only this precise
                cn[li[l]] = want.normalized()
                changed += 1
    # Blender keeps one custom normal per smooth fan, so split every edge whose two faces now disagree
    sharp = 0
    for e in bm.edges:
        if not e.smooth or len(e.link_faces) != 2:
            continue
        f, g = e.link_faces
        for v in e.verts:
            a = cn[li[next(k for k in v.link_loops if k.face is f)]]
            b = cn[li[next(k for k in v.link_loops if k.face is g)]]
            if (a - b).length > 1e-3:
                e.smooth = False
                sharp += 1
                break
    bm.to_mesh(me)
    bm.free()
    me.normals_split_custom_set(cn)
    me.update()
    return {"wide slopes": len(wide), "corners changed": changed, "edges split": sharp}
