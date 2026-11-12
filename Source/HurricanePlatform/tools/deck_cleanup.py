"""Top and bottom deck clean-up (owner, 2026-11-09: "clean up the top and bottom plate meshes, as I see a lot of
lines and cuts ... All of those cuts make the textures rotate at different directions and it looks bad and cow
texture makes it the most obvious").

Run after hatch_pocket.py and before finish.py:
    ns = {}; exec(open(path).read(), ns); report = ns["cleanup"]()

- The decks were built as one quarter turned four times, so each quarter's paint UVs were turned too (316 different
  texture directions on 1,037 faces before this step). Every paint face that looks up from the top deck, or down
  from the bottom deck, now gets one planar map at the paint's scale, so paint wear and skins run one way across
  every plate, band, trench floor and bevel. The cargo hatch's pocket gets the same map.
- Cuts between flat faces of one material on one plane are then dissolved, and the straight-run vertices they leave.
"""
import bmesh
import bpy

CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
PLAT = "Platform"
HATCH = "Pl_CargoHatch_section_1"
PAINT = ("PaintedMetal_Colorable", "PaintedMetal_Darker")
UV, U0 = 0.4, 0.37            # the deck's paint scale and offset (u = 0.4 x + 0.37)
TOP, BOTTOM = -1.40, -3.60    # faces above / below these heights belong to the top / bottom deck
FLAT = 0.5                    # |normal z| from which a face looks up or down (the 45 degree bevels count)
E = 1e-5


def side(f, mats):
    """1 for a top deck paint face, -1 for a bottom deck one, else 0."""
    if mats[f.material_index] not in PAINT:
        return 0
    c = f.calc_center_median()
    if c.z > TOP and f.normal.z > FLAT:
        return 1
    if c.z < BOTTOM and f.normal.z < -FLAT:
        return -1
    return 0


def planar(bm, mats, uvl):
    """Seen from above (top) or below (bottom), u runs along +X and v along the view's up, unmirrored."""
    n = 0
    for f in bm.faces:
        s = side(f, mats)
        if s:
            for lp in f.loops:
                lp[uvl].uv = (UV * lp.vert.co.x + U0, s * UV * lp.vert.co.y + U0)
            n += 1
    return n


def dissolve(bm, mats):
    def same_plane(a, b):
        return (a.material_index == b.material_index and a.normal.dot(b.normal) > 1 - 1e-6
                and abs(a.normal.dot(b.calc_center_median() - a.calc_center_median())) < E)
    edges = [e for e in bm.edges if len(e.link_faces) == 2 and all(side(f, mats) for f in e.link_faces)
             and same_plane(*e.link_faces)]
    faces = len(bm.faces)
    # limited dissolve: it keeps one edge where joining would close a ring into a face with a hole
    bmesh.ops.dissolve_limit(bm, angle_limit=1.5e-3, use_dissolve_boundaries=False, verts=[], edges=edges,
                             delimit={"MATERIAL"})

    def straight(v):
        if len(v.link_edges) != 2 or not v.link_faces or not all(side(f, mats) for f in v.link_faces):
            return False
        a, b = (e.other_vert(v).co - v.co for e in v.link_edges)
        return a.length > 0 and b.length > 0 and a.normalized().dot(b.normalized()) < -1 + 1e-9
    spare = [v for v in bm.verts if straight(v)]
    bmesh.ops.dissolve_verts(bm, verts=spare)
    return dict(edges=len(edges), faces_before=faces, faces_after=len(bm.faces), spare_verts=len(spare))


def cleanup():
    o = bpy.data.objects[PLAT]
    assert o.matrix_world.is_identity
    me = o.data
    mats = [m.name for m in me.materials]
    bm, cnl, uvl = C["open_bm"](me)
    bm.normal_update()
    rep = dict(mapped=planar(bm, mats, uvl))
    rep.update(dissolve(bm, mats))
    C["close_bm"](bm, me)
    h = bpy.data.objects.get(HATCH)
    if h:
        hm = h.data
        bm = bmesh.new()
        bm.from_mesh(hm)
        bm.normal_update()
        rep["hatch_mapped"] = planar(bm, [m.name for m in hm.materials], bm.loops.layers.uv.active)
        bm.to_mesh(hm)
        bm.free()
    return rep


C = {}
exec(open(CP).read(), C)
