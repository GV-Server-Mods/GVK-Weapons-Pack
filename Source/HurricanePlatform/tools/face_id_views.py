"""Which faces of a scene ever show: face-ID renders (2026-11-10), the filter on hidden_cut.py's candidates.

Every face of the scene is drawn into one temp mesh in a flat colour that encodes its index (Workbench, flat light,
back faces culled as the game draws them), and the colours are read back from each render. Pass decals=False draws
opaque faces only, since decals and glass let the surface behind them show; decals=True adds the decals and reads
only their IDs. Anti-aliasing blends edge pixels into other faces' IDs, and opengl renders take it from the user
preference (preferences.system.viewport_aa), not the scene, so it is set off for the renders and put back. One image
is loaded and reloaded for every render: loading and removing one per render crashed Blender after about 1,400.

views(): 1,440 views on rings round the scene's bounds (4 distances from just outside them, 10 heights, 36 turns).
hug(): 260 close views a player could have, 1 m off each side and from head height over the top.
Everything is drawn from a temp scene that is removed afterwards; the .blend is not changed.

    ids, seen = run(scene, decals)      # ids[k] = (object, polygon, is_decal); seen = set of k + 1
"""
import math
import os

import bpy
import numpy as np
from mathutils import Vector

SNAP = r"C:\Users\blayl\.claude\skills\se-dev-seut\scripts\decal_snap.py"
OUT = os.path.join(bpy.app.tempdir or os.environ.get("TEMP", "."), "face_id.png")


def build(name, decals):
    S = {}
    exec(open(SNAP).read(), S)
    win = bpy.context.window
    win.scene = bpy.data.scenes[name]
    bpy.context.evaluated_depsgraph_get()
    V, F, ids, b = [], [], [], 0
    for o in sorted((o for o in win.scene.objects if o.type == "MESH"), key=lambda o: o.name):
        me, M = o.data, o.matrix_world.copy()
        k = [S["tech"](m) for m in me.materials]
        V += [tuple(M @ v.co) for v in me.vertices]
        for p in me.polygons:
            tk = k[p.material_index] if p.material_index < len(k) else ""
            if tk == "GLASS" or (tk in S["DEC"] and not decals):
                continue
            vs = [b + i for i in p.vertices]
            F.append(vs[::-1] if M.determinant() < 0 else vs)
            ids.append((o.name, p.index, tk in S["DEC"]))
        b += len(me.vertices)
    me = bpy.data.meshes.new("tmp_fid")
    me.from_pydata(V, [], F)
    att = me.color_attributes.new("fid", "FLOAT_COLOR", "CORNER")
    col = np.zeros((len(me.loops), 4))
    for p in me.polygons:
        i = p.index + 1
        col[p.loop_start:p.loop_start + p.loop_total] = (i & 255, (i >> 8) & 255, i >> 16, 255)
    s = col / 255.0
    lin = np.where(s <= 0.04045, s / 12.92, ((s + 0.055) / 1.055) ** 2.4)   # displays as s under Standard
    lin[:, 3] = 1.0
    att.data.foreach_set("color", lin.ravel())
    me.color_attributes.active_color = att
    tmp = bpy.data.scenes.new("tmp_fid")
    tmp.collection.objects.link(bpy.data.objects.new("tmp_fid", me))
    pts = np.array(V)
    return tmp, ids, pts.min(0), pts.max(0)


def views(lo, hi, n_az=36, els=(-60, -40, -20, -5, 5, 15, 30, 50, 70, 88), ds=(1.05, 1.3, 1.8, 2.8)):
    c = Vector(((lo + hi) / 2).tolist())
    r = float(np.linalg.norm(hi - lo) / 2)
    out = []
    for d in ds:
        for el in els:
            for k in range(n_az):
                e, z = math.radians(el), 2 * math.pi * (k + 0.5 * (el % 2)) / n_az
                out.append((tuple(c + Vector((math.cos(e) * math.cos(z), math.cos(e) * math.sin(z), math.sin(e))) * r * d),
                            tuple(c), 35.0))
    return out


def hug(lo, hi, off=1.0, n=5):
    out, mz = [], (lo[2] + hi[2]) / 2
    for ax in (0, 1):
        ot = 1 - ax
        for sg in (-1, 1):
            face = hi[ax] if sg > 0 else lo[ax]
            for t in np.linspace(0, 1, n):
                for z in (lo[2] - 0.5, mz, hi[2] + 1.0):
                    e = np.zeros(3)
                    e[ax], e[ot], e[2] = face + sg * off, lo[ot] + t * (hi[ot] - lo[ot]), z
                    for tt in (0.0, 0.5, 1.0):
                        g = np.zeros(3)
                        g[ax], g[ot], g[2] = face, lo[ot] + tt * (hi[ot] - lo[ot]), mz
                        if np.linalg.norm(g - e) > 0.5:
                            out.append((tuple(e), tuple(g), 24.0))
    for x in np.linspace(lo[0], hi[0], 4):
        for y in np.linspace(lo[1], hi[1], 4):
            e = np.array([x, y, hi[2] + 1.8])
            for g in ((lo[0], (lo[1] + hi[1]) / 2, hi[2]), (hi[0], (lo[1] + hi[1]) / 2, hi[2]),
                      ((lo[0] + hi[0]) / 2, lo[1], hi[2]), ((lo[0] + hi[0]) / 2, hi[1], hi[2]), (x, y, lo[2])):
                if np.linalg.norm(np.array(g) - e) > 0.5:
                    out.append((tuple(e), tuple(g), 24.0))
    return out


def seen(tmp, vlist, res=(800, 560)):
    win = bpy.context.window
    home = win.scene
    win.scene = tmp
    tmp.view_settings.view_transform, tmp.view_settings.look = "Standard", "None"
    tmp.view_settings.exposure, tmp.view_settings.gamma = 0, 1
    tmp.render.dither_intensity = 0
    tmp.display.render_aa = tmp.display.viewport_aa = "OFF"
    tmp.render.image_settings.file_format, tmp.render.image_settings.color_mode = "PNG", "RGB"
    tmp.render.image_settings.color_depth = "8"
    tmp.render.resolution_x, tmp.render.resolution_y = res
    cam = bpy.data.objects.new("tmp_fid_cam", bpy.data.cameras.new("tmp_fid_cam"))
    cam.data.clip_start = 0.05
    tmp.collection.objects.link(cam)
    tmp.camera = cam
    area = next(a for a in win.screen.areas if a.type == "VIEW_3D")
    space, region = area.spaces.active, next(r for r in area.regions if r.type == "WINDOW")
    sh, r3 = space.shading, space.region_3d
    names = ("type", "light", "color_type", "show_backface_culling", "show_xray", "show_shadows", "show_cavity",
             "show_object_outline", "show_specular_highlight", "background_type")
    keep = {k: getattr(sh, k) for k in names}
    keep_bg, keep_ov, keep_vp = tuple(sh.background_color), space.overlay.show_overlays, r3.view_perspective
    pref = bpy.context.preferences.system
    keep_aa, hit, bad, im = pref.viewport_aa, set(), 0, None
    try:
        pref.viewport_aa = "OFF"
        sh.type, sh.light, sh.color_type, sh.show_backface_culling = "SOLID", "FLAT", "VERTEX", True
        sh.show_xray = sh.show_shadows = sh.show_cavity = sh.show_object_outline = sh.show_specular_highlight = False
        sh.background_type, sh.background_color = "VIEWPORT", (0, 0, 0)
        space.overlay.show_overlays = False
        n = len(tmp.objects["tmp_fid"].data.polygons)
        for eye, tgt, lens in vlist:
            cam.data.lens = lens
            cam.location = Vector(eye)
            cam.rotation_euler = (Vector(tgt) - Vector(eye)).to_track_quat("-Z", "Y").to_euler()
            r3.view_perspective = "CAMERA"
            tmp.render.filepath = OUT
            with bpy.context.temp_override(window=win, area=area, region=region):
                bpy.ops.render.opengl(write_still=True, view_context=True)
            if im is None:
                im = bpy.data.images.load(OUT)
                im.colorspace_settings.name = "Non-Color"
            else:
                im.reload()
            px = np.empty(len(im.pixels), np.float32)
            im.pixels.foreach_get(px)
            a = np.round(px.reshape(-1, 4)[:, :3] * 255).astype(np.int64)
            u = np.unique(a[:, 0] + a[:, 1] * 256 + a[:, 2] * 65536)
            bad += int((u > n).sum())
            hit.update(int(x) for x in u if 0 < x <= n)
    finally:
        if im is not None:
            bpy.data.images.remove(im)
        pref.viewport_aa = keep_aa
        for k, v in keep.items():
            setattr(sh, k, v)
        sh.background_color, space.overlay.show_overlays, r3.view_perspective = keep_bg, keep_ov, keep_vp
        cd = cam.data
        bpy.data.objects.remove(cam)
        bpy.data.cameras.remove(cd)
        win.scene = home
    assert bad == 0, "colours did not come back exact: anti-aliasing or colour management is on"
    return hit


def drop(tmp):
    ob = tmp.objects["tmp_fid"]
    me = ob.data
    bpy.data.objects.remove(ob)
    if me.users == 0:
        bpy.data.meshes.remove(me)
    bpy.data.scenes.remove(tmp)


def run(name, decals, chunk=480):
    """All views in chunks (call once per chunk range from the MCP if a call would time out)."""
    tmp, ids, lo, hi = build(name, decals)
    vl = views(lo, hi) + hug(lo, hi)
    hit = set()
    try:
        for a in range(0, len(vl), chunk):
            hit |= seen(tmp, vl[a:a + chunk])
    finally:
        drop(tmp)
    return ids, hit
