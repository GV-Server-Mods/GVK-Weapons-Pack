"""LODs for the Hurricane turret (design.md step 5; owner, 2026-11-10: LOD2 and LOD3 drop the panel lines).

Each scene's LODn collection gets one mesh, <SubtypeId>_LODn, built from its Main meshes in scene space:
- decals: kept by material and by size per level (LEVELS); panel lines only in LOD1, none in LOD3
- small parts: a piece (faces joined by position) smaller than the level's `part` size is left out
- shells: decimated (collapse) to `ratio` of their triangles, every vertex of a face under a kept decal locked,
  so the decals keep their surface; parts already under `floor` triangles stay whole
- normals: whole parts keep their custom normals; a decimated part takes the full part's shading under each
  corner (sampler), and shade_pass's rule where nothing of the full part lies under it
Run it after any change to Main:
    ns = {}; exec(open(path).read(), ns); report = ns["build_all"]()
Running it again replaces the LOD meshes.
"""
import math
from collections import defaultdict

import bpy
from mathutils import Matrix, Vector, geometry
from mathutils.bvhtree import BVHTree

HERE = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools" + "\\"
SCENES = ("GVK_HurricaneTurret", "GVK_HurricaneTurret_Az", "GVK_HurricaneTurret_El",
          "GVK_HurricaneTurret_Barrel_1", "GVK_HurricaneTurret_Barrel_2")
DEC = {"DECAL", "DECAL_NOPREMULT", "DECAL_CUTOUT"}
LINES = ("Paneling", "Atlas4")
# dist: switch distance (m); ratio: shell triangles kept; floor: parts under it stay whole;
# part: smallest piece kept (m); decal: smallest decal kept (m), None for no decals; drop: decal materials left out
LEVELS = {
    1: dict(dist=40, ratio=0.5, floor=150, part=0.04, decal=0.05, drop=()),
    2: dict(dist=120, ratio=0.2, floor=60, part=0.12, decal=0.25, drop=LINES + ("TextAtlas", "ButtonsAtlas")),
    3: dict(dist=300, ratio=0.06, floor=24, part=0.4, decal=None, drop=()),
}
# parts whose thin frames the decimation breaks at the level's own ratio: their ratio per level. The yellow port
# frame lost its crossbars at LOD2 and folded into a V at LOD3; Keen's platform sides bent their braces and showed
# pale patches below 0.5 (welding the split mesh first, or locking its UV seams, made it worse).
RATIO = {"Pl_Port_": {2: 0.6, 3: 0.3}, "Pl_PortFrame_": {2: 0.5, 3: 0.25}, "Platform": {2: 0.5, 3: 0.3},
         "Pl_Disc": {3: 0.3}}
# a part whose triangles average this much area (m2) is already coarse and stays whole unless RATIO names it:
# the gunhouse shell (454 triangles of flat panels) folded its dark roof strip into a long sliver at 0.2
COARSE = 0.09
GLOW = ("Emissive",)  # lamp faces stay in every level, however small: they show the turret's state at range
LOCK = 0.012          # a decal point this close to a shell face locks that face's vertices
INSIDE = 0.03         # a decimated corner's shading is read this far inside its face
SHADE = {}
exec(open(HERE + "shade_pass.py").read(), SHADE)


def tech(m):
    return getattr(getattr(m, "seut", None), "technique", "") if m else ""


def world(o):
    """Scene-space matrix from the parent chain (matrix_world is stale in scenes the window has not shown)."""
    m = o.matrix_basis
    if o.parent:
        m = world(o.parent) @ o.matrix_parent_inverse @ m
    return m


def main_col(sc):
    return next(c for c in sc.collection.children_recursive if c.name.startswith("Main"))


def lod_col(sc, n):
    return next(c for c in sc.collection.children_recursive if c.name.startswith("LOD%d (" % n))


def pieces(me, faces, M):
    """Faces joined by shared positions -> list of (faces, largest extent in scene space)."""
    key = [tuple(int(round(x * 1e4)) for x in v.co) for v in me.vertices]
    par = {}

    def find(a):
        while par.setdefault(a, a) != a:
            par[a] = par[par[a]]
            a = par[a]
        return a
    for fi in faces:
        ks = [key[v] for v in me.polygons[fi].vertices]
        for k in ks[1:]:
            par[find(k)] = find(ks[0])
    groups = defaultdict(list)
    for fi in faces:
        groups[find(key[me.polygons[fi].vertices[0]])].append(fi)
    out = []
    for fs in groups.values():
        pts = [M @ me.vertices[v].co for fi in fs for v in me.polygons[fi].vertices]
        ext = max(max(p[i] for p in pts) - min(p[i] for p in pts) for i in range(3))
        out.append((fs, ext))
    return out


def extract(me, faces, M, normals=None):
    """(co, polys) in scene space; polys are (vert indices, uvs, normals, material) with normals per corner."""
    uvl = me.uv_layers[0].data if me.uv_layers else None
    cn = normals or [c.vector for c in me.corner_normals]
    nm = M.to_3x3().inverted_safe().transposed()
    vmap, co, polys = {}, [], []
    for fi in faces:
        p = me.polygons[fi]
        vs, uvs, ns = [], [], []
        for li, vi in zip(p.loop_indices, p.vertices):
            if vi not in vmap:
                vmap[vi] = len(co)
                co.append(M @ me.vertices[vi].co)
            vs.append(vmap[vi])
            uvs.append(tuple(uvl[li].uv) if uvl else (0.0, 0.0))
            ns.append((nm @ Vector(cn[li])).normalized())
        polys.append((vs, uvs, ns, me.materials[p.material_index] if p.material_index < len(me.materials) else None))
    return co, polys


def make_mesh(name, parts, normals=True):
    co_all, faces, uvs, ns, mats = [], [], [], [], []
    for co, polys in parts:
        off = len(co_all)
        co_all += co
        for vs, uv, n, mat in polys:
            faces.append([v + off for v in vs])
            uvs += uv
            ns += n
            mats.append(mat)
    me = bpy.data.meshes.new(name)
    me.from_pydata([tuple(c) for c in co_all], [], faces)
    slots = []
    for m in mats:
        if m not in slots:
            slots.append(m)
    for m in slots:
        me.materials.append(m)
    me.polygons.foreach_set("material_index", [slots.index(m) for m in mats])
    me.polygons.foreach_set("use_smooth", [True] * len(faces))
    uv = me.uv_layers.new(name="UVMap")
    uv.data.foreach_set("uv", [x for t in uvs for x in t])
    if normals:
        me.normals_split_custom_set([tuple(n) for n in ns])
    me.update()
    return me


def tris(polys):
    return sum(len(p[0]) - 2 for p in polys)


def decimate(co, polys, target, locked):
    """Collapse-decimate a shell to about `target` triangles with `locked` vertices held; rule normals."""
    me = make_mesh("lod_tmp", [(co, polys)], normals=False)
    ob = bpy.data.objects.new("lod_tmp", me)
    sc = bpy.context.window.scene      # the window's depsgraph evaluates the modifier
    sc.collection.objects.link(ob)
    try:
        if locked:
            vg = ob.vertex_groups.new(name="free")
            vg.add([i for i in range(len(co)) if i not in locked], 1.0, "REPLACE")
        md = ob.modifiers.new("lod", "DECIMATE")
        md.decimate_type = "COLLAPSE"
        md.ratio = min(1.0, target / max(1, tris(polys)))
        md.use_collapse_triangulate = False
        if locked:
            md.vertex_group = "free"
            md.vertex_group_factor = 1000.0
        red = bpy.data.meshes.new_from_object(ob.evaluated_get(bpy.context.evaluated_depsgraph_get()))
    finally:
        bpy.data.objects.remove(ob)
        if me.users == 0:
            bpy.data.meshes.remove(me)
    rule, _ = SHADE["corner_normals"](red)
    take = sampler(co, polys)
    cn = list(rule)
    for p in red.polygons:
        mid = p.center
        for li, vi in zip(p.loop_indices, p.vertices):
            v = red.vertices[vi].co
            q = v + (mid - v) * min(0.25, INSIDE / max(1e-6, (mid - v).length))
            got = take(q, p.normal)
            if got is not None:
                cn[li] = got
    out = extract(red, range(len(red.polygons)), Matrix(), cn)
    if red.users == 0:
        bpy.data.meshes.remove(red)
    return out


def sampler(co, polys):
    """The full part's own shading at a point: its corner normals blended over the triangle under the point. A
    decimated face takes them just inside each corner, so a flat panel stays flat where the decimation removed the
    bevel beside it (the rule blended two big gunhouse panels across their new hard edge, diagonal wedges at LOD2)."""
    tri, tn = [], []
    for vs, uv, ns, m in polys:
        for i in range(1, len(vs) - 1):
            tri.append((vs[0], vs[i], vs[i + 1]))
            tn.append((ns[0], ns[i], ns[i + 1]))
    pts = [Vector(c) for c in co]
    bvh = BVHTree.FromPolygons([tuple(c) for c in co], tri)
    I = (Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1)))

    def take(q, n):
        hit = bvh.ray_cast(q + n * 0.05, -n, 0.1)
        if hit[2] is None or hit[1].dot(n) < 0.3:
            hit = bvh.find_nearest(q, 0.05)
            if hit[2] is None or hit[1].dot(n) < 0.3:
                return None
        a, b, c = (pts[i] for i in tri[hit[2]])
        w = geometry.barycentric_transform(hit[0], a, b, c, *I)
        s = sum((Vector(x) * max(0.0, wi) for x, wi in zip(tn[hit[2]], w)), Vector())
        return s.normalized() if s.length > 1e-9 and s.normalized().dot(n) > 0.2 else None
    return take


def build(scene, n):
    L = LEVELS[n]
    sc = bpy.data.scenes[scene]
    objs = [o for o in list(main_col(sc).all_objects) if o.type == "MESH"]
    decal_parts, shells, rep = [], [], defaultdict(int)
    for o in objs:
        me, M = o.data, world(o)
        ks = [tech(m) for m in me.materials]
        names = [m.name if m else "" for m in me.materials]
        dec = [p.index for p in me.polygons if p.material_index < len(ks) and ks[p.material_index] in DEC]
        shell = [p.index for p in me.polygons if not (p.material_index < len(ks) and ks[p.material_index] in DEC)]
        keep_dec = []
        if L["decal"] is not None:
            for fs, ext in pieces(me, dec, M):
                mat = names[me.polygons[fs[0]].material_index]
                if ext >= L["decal"] and not mat.startswith(L["drop"]):
                    keep_dec += fs
        rep["decal_dropped"] += sum(len(me.polygons[f].vertices) - 2 for f in dec) - \
            sum(len(me.polygons[f].vertices) - 2 for f in keep_dec)
        if keep_dec:
            decal_parts.append(extract(me, keep_dec, M))
        keep_shell = []
        for fs, ext in pieces(me, shell, M):
            if ext >= L["part"] or any(names[me.polygons[f].material_index].startswith(GLOW) for f in fs):
                keep_shell += fs
            else:
                rep["part_dropped"] += sum(len(me.polygons[f].vertices) - 2 for f in fs)
        if keep_shell:
            shells.append((o.name, extract(me, keep_shell, M)))
    pts = [Vector(c) for co, polys in decal_parts for c in co]
    pts += [sum((co[v] for v in vs), Vector()) / len(vs) for co, polys in decal_parts for vs, _, _, _ in polys]
    out = list(decal_parts)
    for name, (co, polys) in shells:
        t = tris(polys)
        locked = set()
        if pts:
            bvh = BVHTree.FromPolygons([tuple(c) for c in co], [p[0] for p in polys])
            for q in pts:
                hit = bvh.find_nearest(q, LOCK)
                if hit[2] is not None:
                    locked.update(polys[hit[2]][0])
        lt = sum(len(p[0]) - 2 for p in polys if locked.issuperset(p[0]))
        ratio = next((r[n] for k, r in RATIO.items() if name.startswith(k) and n in r), None)
        if ratio is None:
            area = sum(geometry.area_tri(*(co[v] for v in (vs[0], vs[i], vs[i + 1])))
                       for vs, _, _, _ in polys for i in range(1, len(vs) - 1))
            ratio = 1.0 if area / max(1, t) >= COARSE else L["ratio"]
        target = max(L["floor"], lt + (t - lt) * ratio)
        if target >= 0.95 * t:
            out.append((co, polys))
            rep["whole"] += t
            continue
        co2, polys2 = decimate(co, polys, target, locked)
        out.append((co2, polys2))
        rep["decimated_from"] += t
        rep["decimated_to"] += tris(polys2)
    sub = scene
    name = "%s_LOD%d" % (sub, n)
    me = make_mesh(name, out)
    col = lod_col(sc, n)
    ob = bpy.data.objects.get(name)
    if ob is None:
        ob = bpy.data.objects.new(name, me)
        col.objects.link(ob)
    else:
        old = ob.data
        ob.data = me
        if old.users == 0:
            bpy.data.meshes.remove(old)
        me.name = name
    col.seut.lod_distance = L["dist"]
    rep["tris"] = sum(len(p.vertices) - 2 for p in me.polygons)
    rep["main_tris"] = sum(len(p.vertices) - 2 for o in objs for p in o.data.polygons)
    return dict(rep)


def build_all(levels=(1, 2, 3), scenes=SCENES):
    return {(s, n): build(s, n) for s in scenes for n in levels}
