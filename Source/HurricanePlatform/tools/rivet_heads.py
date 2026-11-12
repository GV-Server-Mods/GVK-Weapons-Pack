"""Keen's sunken bolt head in place of the gunhouse's large dome rivets (owner, 2026-11-09: "replacing the really
large rivets with something more toned down and keen-styled"; picked "sunken head at 65mm" from four mock-ups).

The gunhouse carried 331 dome heads, all 90 mm: 260 of the GVK paintable rivet (GH_Dec_GVK_RivetColorable_Az) and
71 of the Decals sheet's plain dome (piece 10, in GH_Dec_Decals_Az). heads() moves every one into
GH_Dec_Atlas3_Colorable_Az as Atlas3 piece 14 (a dome in a recessed ring, the head the deck's plate corners use),
65 mm, at the same centre and turn, and removes the GVK rivet object. The Decals object keeps its two plates.
Run after assemble.py, before finish.py (which snaps it):
    ns = {}; exec(open(path).read(), ns); report = ns["heads"]()
Running it again does nothing.
"""
import bpy
from mathutils import Vector

CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
GVK = "GH_Dec_GVK_RivetColorable_Az"
DECALS = "GH_Dec_Decals_Az"
DEST = "GH_Dec_Atlas3_Colorable_Az"
MAT = "Atlas3_Colorable"
DOME = (0.2842, 0.9717)          # Decals piece 10's box corner, to pick its heads out
HEAD = (0.9399, 0.752, 0.999, 0.8105)   # Atlas3 piece 14
SIZE = 0.065


def heads():
    if GVK not in bpy.data.objects:
        return dict(done=True)
    C = {}
    exec(open(CP).read(), C)
    quads = []

    def take(o, pick):
        bm, cnl, uvl = C["open_bm"](o.data)
        M = o.matrix_world
        gone = []
        for f in bm.faces:
            if pick(f, uvl):
                quads.append([M @ l.vert.co for l in f.loops])
                gone.append(f)
        for f in gone:
            bm.faces.remove(f)
        for v in [v for v in bm.verts if not v.link_faces]:
            bm.verts.remove(v)
        C["close_bm"](bm, o.data)
        return len(gone)

    gvk = bpy.data.objects[GVK]
    n_gvk = take(gvk, lambda f, uvl: True)
    n_dome = take(bpy.data.objects[DECALS], lambda f, uvl: abs(min(l[uvl].uv.x for l in f.loops) - DOME[0]) < 2e-3
                  and abs(min(l[uvl].uv.y for l in f.loops) - DOME[1]) < 2e-3)
    dest = bpy.data.objects[DEST]
    me = dest.data
    if MAT not in [m.name for m in me.materials]:
        me.materials.append(bpy.data.materials[MAT])
    mi = [m.name for m in me.materials].index(MAT)
    Mi = dest.matrix_world.inverted()
    bm, cnl, uvl = C["open_bm"](me)
    u0, v0, u1, v1 = HEAD
    for q in quads:
        c = sum(q, Vector()) / len(q)
        side = ((q[1] - q[0]).length + (q[2] - q[1]).length) / 2
        f = bm.faces.new([bm.verts.new(Mi @ (c + (p - c) * (SIZE / side))) for p in q])
        f.material_index = mi
        f.normal_update()
        for l, uv in zip(f.loops, [(u0, v0), (u1, v0), (u1, v1), (u0, v1)]):
            l[uvl].uv = uv
            l[cnl] = f.normal
    C["close_bm"](bm, me)
    me.update()
    old = gvk.data
    bpy.data.objects.remove(gvk)
    if old.users == 0:
        bpy.data.meshes.remove(old)
    return dict(gvk_heads=n_gvk, dome_heads=n_dome, now=len(quads), size_mm=SIZE * 1000)
