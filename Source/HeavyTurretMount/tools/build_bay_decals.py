"""Bay-wall decals for the mount's sides, taken from the vanilla Structural Platform (scene KB_Platform, vanilla
parts with a .001 suffix, -Y face at y = -6.25). Rerunnable: build(names) rebuilds the named pieces.

Vanilla's bay wall (100 mm behind the side face) carries three things, mirrored top and bottom:
- girder_line: a line just under each girder (z 0.701-0.725). On the mount the doubler plate covers that band,
  so the line goes onto the doubler's face at the same height, column to column, in Atlas4_Darker to match the
  doubler's Darker paint.
- panel_line: a second line that dips to z 0.45-0.475 across the middle and rises at |x| 2.75-2.95. Kept at
  vanilla's x and z on the mount's wall; its ends rise into the doubler's shadow.
- tabs: small plates at bay midpoints, hanging from the girder line. On the mount they hang from the doubler:
  top at x = 0 (over the bottom bracket), bottom at x = +-1.75 (under the top brackets).
Each piece is copied to all four sides by rotation about Z.

The owner picked panel_line and tabs, without the girder line (2026-11-07); girder_line stays for previews.

Pipeline (each step rerunnable): build_sides_optionA.build(), then add_to_side() here, then
install_sides.install(). Previews of any pieces: build(names) into scene Decal_Options.
    exec(open(r"<this file>").read()); add_to_side()
"""
import bpy, bmesh, math
from mathutils import Matrix, Vector

SRC = ("Part_06.001", "Part_07.001")
SHIFT_Y = 2.5            # vanilla face y -6.25 -> mount -3.75
DOUBLER_FACE = -3.71
GAP = 0.0015             # decal offset off its surface
LINE_END = 3.40          # girder line ends short of the column face (3.45)
TAB_DZ = 0.072           # vanilla tab top 0.710 -> 0.638, 9 mm up into the doubler's shadow (bottom 0.629)
PIECES = ("girder_line", "panel_line", "tabs")
PICKED = ("panel_line", "tabs")
ON_DOUBLER = "Atlas4_Darker"   # the doubler is PaintedMetal_Darker; same atlas layout as Atlas4_Colorable


def wall_islands(ob):
    """Decal islands on vanilla's -Y bay wall, as (material name, faces, bounds) in a world-space bmesh."""
    bm = bmesh.new()
    bm.from_mesh(ob.data)
    bm.transform(ob.matrix_world)
    mats = list(ob.data.materials)   # the part's own (linked) datablocks; a name lookup can return a local copy
    sel = {f for f in bm.faces if -6.2 < f.calc_center_median().y < -6.1
           and abs(f.calc_center_median().z) < 1.2 and abs(f.calc_center_median().x) < 6.2}
    out, seen = [], set()
    for f in sel:
        if f in seen:
            continue
        isl, st = [], [f]
        seen.add(f)
        while st:
            g = st.pop()
            isl.append(g)
            for v in g.verts:
                for h in v.link_faces:
                    if h in sel and h not in seen:
                        seen.add(h)
                        st.append(h)
        co = [v.co for g in isl for v in g.verts]
        lo = Vector([min(c[i] for c in co) for i in range(3)])
        hi = Vector([max(c[i] for c in co) for i in range(3)])
        out.append((mats[isl[0].material_index], isl, lo, hi))
    return bm, out


def placements(piece, mat, lo, hi):
    """List of functions co -> new co for one island, or [] to skip it."""
    zc = (lo.z + hi.z) / 2
    s = 1 if zc > 0 else -1
    span = hi.x - lo.x
    if piece == "girder_line":
        if mat == "Atlas4_Colorable" and span > 12 and 0.70 <= abs(zc) <= 0.73:
            k = LINE_END / max(abs(lo.x), abs(hi.x))
            return [lambda c, k=k: Vector((c.x * k, DOUBLER_FACE - GAP, c.z))]
    elif piece == "panel_line":
        if mat == "Atlas4_Colorable" and max(abs(lo.x), abs(hi.x)) < 2.98 and 0.44 <= abs(zc) <= 0.65:
            return [lambda c: Vector((c.x, c.y + SHIFT_Y, c.z))]
    elif piece == "tabs":
        if mat == "Atlas3_Colorable" and span < 0.6:
            xc = (lo.x + hi.x) / 2
            if s > 0 and xc > 1.0:                       # top tab at vanilla x = +2 -> mount x = 0
                return [lambda c, xc=xc: Vector((c.x - xc, c.y + SHIFT_Y, c.z - TAB_DZ))]
            if s < 0 and abs(xc) < 0.5:                  # bottom tab at vanilla x = 0 -> mount x = +-1.75
                return [lambda c, d=d: Vector((c.x + d, c.y + SHIFT_Y, c.z + TAB_DZ)) for d in (-1.75, 1.75)]
    return []


def piece_bm(piece, uv_name="UVMap"):
    """bmesh of one piece on all four sides, with its material."""
    dst = bmesh.new()
    uv_dst = dst.loops.layers.uv.new(uv_name)
    mat = None
    for n in SRC:
        bm, isls = wall_islands(bpy.data.objects[n])
        uv = bm.loops.layers.uv.active
        darker = next((x for x in bpy.data.objects[n].data.materials if x and x.name == ON_DOUBLER), None)
        for m, faces, lo, hi in isls:
            for fn in placements(piece, m.name, lo, hi):
                mat = darker if piece == "girder_line" and darker else m
                for k in range(4):
                    rot = Matrix.Rotation(k * math.pi / 2, 3, "Z")
                    vmap = {}
                    for f in faces:
                        vs = []
                        for v in f.verts:
                            if v not in vmap:
                                vmap[v] = dst.verts.new(rot @ fn(v.co))
                            vs.append(vmap[v])
                        nf = dst.faces.new(vs)
                        for l_new, l_old in zip(nf.loops, f.loops):
                            l_new[uv_dst].uv = l_old[uv].uv
        bm.free()
    return dst, mat


def build(names=PIECES, scene="Decal_Options", parent=None):
    sc = bpy.data.scenes[scene]
    made = {}
    for piece in names:
        bm, mat = piece_bm(piece)
        name = "opt_" + piece
        ob = bpy.data.objects.get(name)
        me = bpy.data.meshes.new(name)
        bm.normal_update()
        bm.to_mesh(me)
        bm.free()
        me.materials.append(mat)
        if ob is None:
            ob = bpy.data.objects.new(name, me)
            sc.collection.objects.link(ob)
        else:
            old = ob.data
            ob.data = me
            bpy.data.meshes.remove(old)
            me.name = name
        if parent:
            ob.parent = bpy.data.objects[parent]
        made[name] = len(me.polygons)
    return made

def add_to_side(side_name="SideA", names=PICKED):
    """Append the picked pieces to the built sides (object side_name), keeping its custom normals.
    Run once per build_sides_optionA.build(); a second run is refused."""
    ob = bpy.data.objects[side_name]
    if ob.get("bay_decals"):
        raise RuntimeError(side_name + " already has bay decals " + str(ob["bay_decals"]) + "; rebuild the sides first")
    me = ob.data
    cn = [Vector(c.vector) for c in me.corner_normals]
    uv_name = me.uv_layers.active.name
    bm = bmesh.new()
    bm.from_mesh(me)
    added = {}
    for piece in names:
        pbm, mat = piece_bm(piece, uv_name)
        if mat.name not in [m.name for m in me.materials]:
            me.materials.append(mat)
        idx = [m.name for m in me.materials].index(mat.name)
        tmp = bpy.data.meshes.new("_tmp_bay")
        pbm.to_mesh(tmp)
        pbm.free()
        for f in bm.faces:
            f.tag = True
        bm.from_mesh(tmp)
        bpy.data.meshes.remove(tmp)
        n = 0
        for f in bm.faces:
            if not f.tag:
                f.material_index = idx
                n += 1
            f.tag = False
        added[piece] = n
    bm.normal_update()
    bm.faces.ensure_lookup_table()
    extra = [f.normal.copy() for f in bm.faces[len(me.polygons):] for _ in f.loops]
    bm.to_mesh(me)
    bm.free()
    me.normals_split_custom_set(cn + extra)
    me.update()
    ob["bay_decals"] = list(names)
    return added
