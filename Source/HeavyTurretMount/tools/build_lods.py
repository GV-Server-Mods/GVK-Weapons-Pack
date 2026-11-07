"""LODs for GVK_HeavyTurretMount_3x3x1 (rerunnable after the Main pipeline). Each LODn is one mesh in LODn (...):
- deck: Body's deck faces (install_sides.is_deck, clamps included) and the deck decals kept at that level
- sides: SideA_LODn, from build_sides_optionA.build() run on vanilla's own LODn (scenes KB_LOD1..3), plus the
  bay-wall decals kept at that level
- ports: Main's ports at LOD1; Gemini's reduced LOD2 ports (scene LOD_Parts, PortLOD2) further out
What each level keeps follows vanilla's platform LODs: LOD1 all decals, LOD2 lines and dark panels, LOD3 none.
Distances as vanilla's platform (10 / 45 / 90 m). The decal snap runs on each LOD collection last.

    exec(open(r"<this file>").read()); keep_gemini_ports(); build_sides(); build_all()
"""
import bpy, bmesh
from mathutils import Vector

TOOLS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HeavyTurretMount\tools" + "\\"
SNAP = r"C:\Users\blayl\.claude\skills\se-dev-seut\scripts\decal_snap.py"
SUB = "GVK_HeavyTurretMount_3x3x1"
PORT_MATS = ("PaintedMetal_Yellow", "Metal_Dull", "Conveyor_Yellow")
PORTS_MAIN = ("PortTop_section_1", "PortBottom_section_2")
DECK_DECALS = {1: None, 2: ("Atlas4_Colorable", "Atlas3_Darker"), 3: ()}     # None: all of them
BAY = {1: ("panel_line", "tabs"), 2: ("panel_line",), 3: ()}
DIST = {1: 10, 2: 45, 3: 90}


def _load(name):
    ns = {"__name__": name, "__file__": TOOLS + name + ".py"}
    exec(open(TOOLS + name + ".py").read(), ns)
    return ns


def keep_gemini_ports():
    """Once: copy the port faces of Gemini's LOD2 mesh into scene LOD_Parts before it is rebuilt."""
    sc = bpy.data.scenes.get("LOD_Parts") or bpy.data.scenes.new("LOD_Parts")
    ins = _load("install_sides")
    made = {}
    for n in (2,):
        name = "PortLOD%d" % n
        if bpy.data.objects.get(name):
            made[name] = "kept"
            continue
        src = bpy.data.objects["%s_LOD%d" % (SUB, n)]
        bm = ins["bm_with_cn"](src)
        names = [m.name for m in src.data.materials]
        bmesh.ops.delete(bm, geom=[f for f in bm.faces if names[f.material_index] not in PORT_MATS], context="FACES")
        ob = bpy.data.objects.new(name, bpy.data.meshes.new(name))
        sc.collection.objects.link(ob)
        ins["write_back"](ob, bm, list(src.data.materials))
        bm.free()
        made[name] = len(ob.data.polygons)
    return made


def build_sides():
    b = _load("build_sides_optionA")
    out = {}
    for n in (1, 2, 3):
        ob, _ = b["build"]("KB_LOD%d" % n, "SideA_LOD%d" % n, **(b["LOD3"] if n == 3 else {}))
        out[ob.name] = (len(ob.data.polygons), len(b["FOLDS"]), len(b["SHEARS"]))   # faces, folds, sheared lines
    return out


def _new_bm():
    bm = bmesh.new()
    bm.loops.layers.uv.new("UVMap")
    bm.loops.layers.float_vector.new("_cn")
    return bm


def _add(dst, mats, src, src_mats):
    """Append world-space bmesh src (with '_cn') into dst, remapping materials by name onto mats."""
    names = [m.name for m in mats]
    remap = []
    for m in src_mats:
        if m.name not in names:
            mats.append(m)
            names.append(m.name)
        remap.append(names.index(m.name))
    for f in src.faces:
        f.material_index = remap[f.material_index]
    tmp = bpy.data.meshes.new("_tmp_lod")
    src.to_mesh(tmp)
    if tmp.uv_layers:
        tmp.uv_layers[0].name = "UVMap"
    dst.from_mesh(tmp)
    bpy.data.meshes.remove(tmp)
    return len(src.faces)


def _part(ins, ob, keep):
    bm = ins["bm_with_cn"](ob)
    names = [m.name for m in ob.data.materials]
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if not keep(f, names[f.material_index])], context="FACES")
    return bm


def build_lod(n, ins, bay):
    is_deck = ins["is_deck"]
    deck = lambda f, m: is_deck([v.co for v in f.verts])
    dst, mats, rep = _new_bm(), [], {}
    srcs = [("deck", bpy.data.objects["Body"], deck)]
    keep = DECK_DECALS[n]
    for o in bpy.data.collections["Main (%s)" % SUB].objects:
        if o.type == "MESH" and o.name.startswith("Decals_"):
            srcs.append((o.name, o, lambda f, m: deck(f, m) and (keep is None or m in keep)))
    srcs.append(("sides", bpy.data.objects["SideA_LOD%d" % n], lambda f, m: True))
    ports = PORTS_MAIN if n == 1 else ("PortLOD2",)      # Gemini's LOD3 port is 2 cm short of the deck opening
    srcs += [(p, bpy.data.objects[p], lambda f, m: True) for p in ports]
    for label, ob, test in srcs:
        bm = _part(ins, ob, test)
        if bm.faces:
            rep[label] = _add(dst, mats, bm, list(ob.data.materials))
        bm.free()
    for piece in BAY[n]:
        pbm, mat = bay["piece_bm"](piece, "UVMap")
        cnl = pbm.loops.layers.float_vector.new("_cn")
        pbm.normal_update()
        for f in pbm.faces:
            f.material_index = 0
            for l in f.loops:
                l[cnl] = f.normal
        rep["bay " + piece] = _add(dst, mats, pbm, [mat])
        pbm.free()
    ob = bpy.data.objects["%s_LOD%d" % (SUB, n)]
    ins["write_back"](ob, dst, mats)
    dst.free()
    bpy.data.collections["LOD%d (%s)" % (n, SUB)].seut.lod_distance = DIST[n]
    return len(ob.data.polygons), rep


def build_all(snap=True):
    ins = _load("install_sides")
    bay = _load("build_bay_decals")
    out = {n: build_lod(n, ins, bay) for n in (1, 2, 3)}
    if snap:
        ds = {"__name__": "decal_snap"}
        exec(open(SNAP).read(), ds)
        for n in (1, 2, 3):
            out["snap LOD%d" % n] = ds["snap"](bpy.data.collections["LOD%d (%s)" % (n, SUB)])
    return out
