"""Build stages for GVK_HeavyTurretMount_3x3x1 (rerunnable), the vanilla way.
- BS1, BS2: vanilla's platform stages (Structural_5_platformConstruction_1/2, imported by SEUT into scenes KB_BS1,
  KB_BS2), cut from 5 x 5 cells to 3 x 3: the centre cell and the edge and corner cells stay, the two cells between
  them on each axis go, and the outer cells move 2.5 m in. Vanilla's scaffold repeats per cell, so its beams meet
  across the cut. (Not the conveyor platform's stages: they carry port frames on the sides, which this block lacks.)
- BS3: Main itself, as vanilla's Construction_3 is its finished model: opaque faces in Construction, the Atlas4
  line decals in Atlas4_Chrome, the other decals dropped.
Each stage is one mesh in BSn (...), shaped to the block's full outline. The decal snap runs on each stage last.

    exec(open(r"<this file>").read()); build_all()
"""
import bpy, bmesh

TOOLS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HeavyTurretMount\tools" + "\\"
SNAP = r"C:\Users\blayl\.claude\skills\se-dev-seut\scripts\decal_snap.py"
LIB = r"C:\SE_Assets\Materials\Materials.blend"
SUB = "GVK_HeavyTurretMount_3x3x1"
CUT_IN, CUT_OUT, SHIFT = 1.25, 3.75, 2.5
BS3_MAP = {"Atlas4_Colorable": "Atlas4_Chrome", "Atlas4_Darker": "Atlas4_Chrome"}   # other decals dropped


def _load(name):
    ns = {"__name__": name, "__file__": TOOLS + name + ".py"}
    exec(open(TOOLS + name + ".py").read(), ns)
    return ns


def linked(name):
    """The SEUT library's material (never a local placeholder of the same name), linked if missing."""
    m = next((m for m in bpy.data.materials if m.name == name and m.library), None)
    if m is None:
        with bpy.data.libraries.load(LIB, link=True) as (src, dst):
            dst.materials = [name]
        m = next(m for m in bpy.data.materials if m.name == name and m.library)
    return m


def compress(bm):
    """Cut a 5 x 5 cell vanilla bmesh (world space) down to 3 x 3 cells in place."""
    for a in (0, 1):
        for s in (1, -1):
            for c in (CUT_IN, CUT_OUT):
                co, no = [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]
                co[a], no[a] = s * c, 1.0
                bmesh.ops.bisect_plane(bm, geom=bm.verts[:] + bm.edges[:] + bm.faces[:], dist=1e-5,
                                       plane_co=co, plane_no=no)
    gone = lambda p: any(CUT_IN + 1e-4 < abs(p[a]) < CUT_OUT - 1e-4 for a in (0, 1))
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if gone(f.calc_center_median())], context="FACES")
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context="VERTS")
    for v in bm.verts:
        for a in (0, 1):
            if abs(v.co[a]) >= CUT_OUT - 1e-4:
                v.co[a] -= SHIFT if v.co[a] > 0 else -SHIFT


def _swap_mats(mats):
    """Local placeholder materials (no library) replaced by the linked library ones."""
    return [m if m.library else linked(m.name) for m in mats]


def build_vanilla(n, L, ins):
    dst, mats = L["_new_bm"](), []
    for o in list(bpy.data.scenes["KB_BS%d" % n].objects):
        if o.type == "MESH":
            bm = ins["bm_with_cn"](o)
            L["_add"](dst, mats, bm, _swap_mats(list(o.data.materials)))
            bm.free()
    compress(dst)
    return dst, mats


def build_bs3(L, ins):
    dst, mats = L["_new_bm"](), []
    con = linked("Construction")
    for o in list(bpy.data.collections["Main (%s)" % SUB].objects):
        if o.type != "MESH":
            continue
        names = [m.name for m in o.data.materials]
        bm = ins["bm_with_cn"](o)
        decal = [n.startswith(ins["DECAL_PREFIXES"]) for n in names]     # Paneling* too, not only Atlas*
        bmesh.ops.delete(bm, geom=[f for f in bm.faces if decal[f.material_index]
                                   and names[f.material_index] not in BS3_MAP], context="FACES")
        new = [linked(BS3_MAP[n]) if n in BS3_MAP else con for n in names]   # dropped decals: deleted above
        if bm.faces:
            L["_add"](dst, mats, bm, new)
        bm.free()
    return dst, mats


def build_all(snap=True):
    L = _load("build_lods")
    ins = _load("install_sides")
    out = {}
    for n in (1, 2, 3):
        bm, mats = build_bs3(L, ins) if n == 3 else build_vanilla(n, L, ins)
        ob = bpy.data.objects["%s_BS%d" % (SUB, n)]
        ins["write_back"](ob, bm, mats)
        bm.free()
        out["BS%d" % n] = len(ob.data.polygons)
    if snap:
        ds = {"__name__": "decal_snap"}
        exec(open(SNAP).read(), ds)
        for n in (1, 2, 3):
            out["snap BS%d" % n] = ds["snap"](bpy.data.collections["BS%d (%s)" % (n, SUB)])
    return out
