"""Last build step: snap every decal in Main onto the game's vertex grid (se-dev-seut decal_snap.py), then
lift what the snap leaves on Platform.

Run after cargo_ports.py:  ns = {}; exec(open(path).read(), ns); report = ns["finish"]()

First decal_dips.py's lift() raises the decal faces that dip into a rounded surface (the snap leaves those alone).

What the snap leaves on Platform are long Atlas4 side-band strips whose last vertex sits on a corner post's
chamfer: the snap places that vertex for the chamfer, and after rounding the strip dips onto the wall. Each such
triangle's vertices move out along the face's main axis to the strip's own (already rounded) height.

Before that, seam_ends.py's close_crossings() joins the lines where they cross an edge: the snap had moved each
copy of a corner off its own face, which broke the line at the edge.

Then deck_seams.py's lift() and unshear() run on the snapped decks: stem tips that lie on their cross line at the
same height move one stored step out, and each deck seam face's U is set again along its strip (the snap's rounding
in the plane had turned it on the short tip faces).

Last, roof_seams.py's tips() does the same for the gunhouse roof's T-joins, with a lift under the stored step.

finish() ran on the one-scene model. Since the split (2026-11-09) each subpart model stores its positions relative to
its own origin (the slew axis at the trunnion's height, the trunnion axis, the barrel root), so the game's grid
lies elsewhere on every moving part. finish_split() lifts the dips and snaps the decals again in each subpart scene, then runs the roof's tips().
The main scene's frame did not change, so its decals keep finish()'s snap.
"""
import bpy
import numpy as np

SNAP = r"C:\Users\blayl\.claude\skills\se-dev-seut\scripts\decal_snap.py"
SEAMS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\deck_seams.py"
ENDS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\seam_ends.py"
DIPS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\decal_dips.py"
ROOF = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\roof_seams.py"
SCENE = "GVK_HurricanePlatform"
PLAT = "Platform"


def finish():
    ns = {}
    exec(open(SNAP).read(), ns)
    col = next(c for c in bpy.data.scenes[SCENE].collection.children_recursive if c.name.startswith("Main"))
    dd = {}
    exec(open(DIPS).read(), dd)
    dips = dd["lift"](col, ns, passes=6)
    rep = ns["snap"](col, passes=8)
    o = bpy.data.objects[PLAT]
    assert o.matrix_world.is_identity
    me = o.data
    cn = [tuple(c.vector) for c in me.corner_normals]
    se = {}
    exec(open(ENDS).read(), se)
    crossings = se["close_crossings"](PLAT)
    left_per_pass = []
    for _ in range(4):
        rb, tb, dec = ns["surfaces"](col)
        kind = dict(dec)[o]
        left = [(v, i) for i, (v, g) in ns["gaps"](rb, o, kind).items() if g is not None and g < ns["KEEP"]]
        left_per_pass.append(len(left))
        if not left:
            break
        me.calc_loop_triangles()
        tris = {t.index: t for t in me.loop_triangles}
        W = ns["pack"](np.array([v.co for v in me.vertices], np.float32))
        for vs, i in left:
            n = tris[i].normal
            a = int(np.argmax([abs(n.x), abs(n.y), abs(n.z)]))
            s = 1 if n[a] > 0 else -1
            ext = max(s * W[j][a] for j in vs) * s
            for j in vs:
                if s * (ext - W[j][a]) > 0:
                    co = me.vertices[j].co.copy()
                    co[a] = float(ext)
                    me.vertices[j].co = co
        me.update()
    ds = {}
    exec(open(SEAMS).read(), ds)
    seams = dict(lift=ds["lift"](me), unshear=ds["unshear"]())
    for p in me.polygons:
        p.use_smooth = True
    me.normals_split_custom_set(cn)
    rs = {}
    exec(open(ROOF).read(), rs)
    return dict(dips=dips, snap={k: v for k, v in rep.items() if v[1] or v[2]}, crossings=crossings,
                platform_left_per_pass=left_per_pass, seams=seams, roof=rs["tips"]())


SUBPARTS = ("GVK_HurricaneTurret_Az", "GVK_HurricaneTurret_El", "GVK_HurricaneTurret_Barrel_1",
            "GVK_HurricaneTurret_Barrel_2")


def finish_split():
    ns = {}
    exec(open(SNAP).read(), ns)
    dd = {}
    exec(open(DIPS).read(), dd)
    out = {}
    win = bpy.context.window
    home = win.scene
    for name in SUBPARTS:
        sc = bpy.data.scenes[name]
        # the snap reads the active scene's depsgraph: an object of another scene comes back without its modifiers
        win.scene = sc
        col = next(c for c in bpy.data.collections if c.seut.scene is sc and c.seut.col_type == 'main')
        dips = dd["lift"](col, ns, passes=6)
        rep = ns["snap"](col, passes=8)
        out[name] = dict(dips=dips, snap={k: v for k, v in rep.items() if v[1] or v[2]})
    rs = {}
    exec(open(ROOF).read(), rs)
    win.scene = bpy.data.scenes[SUBPARTS[0]]
    out["roof"] = rs["tips"]()
    win.scene = home
    return out
