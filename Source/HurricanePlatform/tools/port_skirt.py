"""A wall round the bottom port's opening (owner, 2026-11-09: "I can see through the textures inside the plinth block at
some angles", round the bottom port surround).

The bottom deck is a single sheet with a 2 m opening (corners chamfered) for the vanilla port frame. The frame's outer
bottom edge is rounded 1 cm, so between that round and the opening's edge a 1 cm slot looked into the empty block.
skirt() stands a wall on the opening's edge, 2 cm up into the block, facing the port, in the deck's paint.
Run after cargo_ports.py:  ns = {}; exec(open(path).read(), ns); report = ns["skirt"]()
Running it again does nothing.
"""
import bpy
from mathutils import Vector

CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
PLAT = "Platform"
DECK_Z = -3.75
HALF = 1.0                  # the opening's straight edges
UP = 0.02
UV_PER_M = 0.4
DEC = ("Atlas", "Paneling", "Decals", "ButtonsAtlas", "TextAtlas")


def skirt():
    o = bpy.data.objects[PLAT]
    assert o.matrix_world.is_identity
    me = o.data
    mats = [m.name for m in me.materials]
    C = {}
    exec(open(CP).read(), C)
    bm, cnl, uvl = C["open_bm"](me)
    solid = lambda f: not mats[f.material_index].startswith(DEC)
    edges = []
    for e in bm.edges:
        fs = [f for f in e.link_faces if solid(f)]
        c = (e.verts[0].co + e.verts[1].co) / 2
        if len(fs) == 1 and abs(c.z - DECK_Z) < 1e-3 and max(abs(c.x), abs(c.y)) < HALF + 1e-3 \
                and max(abs(c.x), abs(c.y)) > 0.7:
            edges.append((e, fs[0]))
    if any(abs(v.co.z - (DECK_Z + UP)) < 1e-5 and 0.7 < max(abs(v.co.x), abs(v.co.y)) < HALF + 1e-3
           for v in bm.verts):
        C["close_bm"](bm, me)
        return dict(done=True)
    top = {}
    made = 0
    for e, f in edges:
        a, b = e.verts
        for v in (a, b):
            if v not in top:
                top[v] = bm.verts.new(v.co + Vector((0, 0, UP)))
        g = bm.faces.new((a, b, top[b], top[a]))
        g.normal_update()
        mid = (a.co + b.co) / 2
        if g.normal.dot(Vector((-mid.x, -mid.y, 0))) < 0:      # face the port
            g.normal_flip()
        g.material_index = f.material_index
        t = (b.co - a.co).normalized()
        for l in g.loops:
            p = l.vert.co
            l[uvl].uv = (p.dot(t) * UV_PER_M, (p.z - DECK_Z) * UV_PER_M)
            l[cnl] = g.normal
        made += 1
    used = sorted({mats[f.material_index] for _, f in edges})
    C["close_bm"](bm, me)
    me.update()
    return dict(walls=made, material=used)
