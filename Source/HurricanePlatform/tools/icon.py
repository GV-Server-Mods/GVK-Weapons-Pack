"""Icon for the Hurricane turret (design.md step 9): SEUT's icon render of the assembled turret, full colour
(owner, 2026-11-10: "Full colour"), 128 px PNG, written as <out>\GVK_HurricaneTurret.png.
    ns = {}; exec(open(path).read(), ns); ns["render"](r"<folder containing Textures>\Textures\GUI\Icons")
SEUT's renderer shows the main scene's Main collection only, so the subparts are instanced by hand for the shot,
with the first subpart turned a half turn (vanilla-type subpart content is turned in its scene and the game turns
it back), and undone afterwards. The .blend is saved before, never while instanced. The preview window stays open
for the owner to close (se-dev-seut bpy-recipes.md, icons).
"""
import math

import bpy
from mathutils import Matrix

P = "GVK_HurricaneTurret"
STATE = "_icon_rig"
FRAME = dict(renderZoom=35, renderDistance=1.55, renderEmptyLocation=(-0.7, -2.7, -1.3),
             renderEmptyRotation=(math.radians(-20), 0.0, math.radians(45)))


def main_col(scene):
    return next(c for c in scene.collection.children_recursive if c.name.startswith("Main"))


def links():
    out = []
    for name in [s.name for s in bpy.data.scenes if s.name.startswith(P)]:
        for o in list(bpy.data.scenes[name].objects):
            if o.type == "EMPTY" and o.seut.linkedScene is not None:
                out.append((name, o.name, o.seut.linkedScene.name))
    return out


def on():
    sc = bpy.data.scenes[P]
    saved = {}
    for scene, empty, linked in links():
        e = bpy.data.objects[empty]
        saved[empty] = [list(r) for r in e.matrix_basis]
        e.instance_type = "COLLECTION"
        e.instance_collection = main_col(bpy.data.scenes[linked])
        if scene == P:
            e.matrix_basis = e.matrix_basis @ Matrix.Rotation(math.pi, 4, "Z")
    sc[STATE] = repr(saved)
    return list(saved)


def off():
    sc = bpy.data.scenes[P]
    saved = eval(sc.get(STATE, "{}"))
    for scene, empty, linked in links():
        e = bpy.data.objects[empty]
        e.instance_type = "NONE"
        e.instance_collection = None
        if empty in saved:
            e.matrix_basis = Matrix(saved[empty])
    if STATE in sc:
        del sc[STATE]
    return list(saved)


def view3d():
    win = next(w for w in bpy.context.window_manager.windows if w.screen.name != "temp")
    area = next(a for a in win.screen.areas if a.type == "VIEW_3D")
    region = next(r for r in area.regions if r.type == "WINDOW")
    return dict(window=win, area=area, region=region, scene=bpy.data.scenes[P])


def render(out):
    sc = bpy.data.scenes[P]
    cam = sc.camera
    sc.render.filepath = out.rstrip("\\") + "\\"
    s = sc.seut
    s.render_output_type, s.renderResolution, s.renderColorOverlay = "png", 128, True
    for k, v in FRAME.items():
        setattr(s, k, v)
    bpy.ops.wm.save_mainfile()
    ov = view3d()
    on()
    try:
        with bpy.context.temp_override(**ov):
            s.renderToggle = "on"
            bpy.ops.scene.icon_render_preview()
    finally:
        with bpy.context.temp_override(**ov):
            s.renderToggle = "off"
        off()
        sc.camera = cam
    bpy.ops.wm.save_mainfile()
    return sc.render.filepath + P + ".png"
