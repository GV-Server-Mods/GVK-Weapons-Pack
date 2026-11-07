"""Install the built sides (object SideA, from build_sides_optionA.py) into the mount's Main collection.

Rerunnable. In Body and every Decals_<material> object it deletes all faces that are not deck faces (deck:
every vertex within the deck edge, max(|x|,|y|) <= 3.4405, and |z| >= 1.12), then appends SideA's faces of
that object's materials: painted metal into Body, each decal material into its Decals_ object (made and
parented to Body if missing). Corner normals of kept and added faces are carried over as custom normals.

Run inside Blender (MCP):
    exec(open(r"<this file>").read()); install()
"""
import bpy, bmesh
from mathutils import Vector

MAIN_SCENE = "GVK_HeavyTurretMount_3x3x1"
BODY = "Body"
DECK_EDGE = 3.4405
LIP = 3.44               # Gemini's deck lip, moved onto DECK_EDGE by close_rim_slit()
DECK_Z = 1.12
DECAL_PREFIXES = ("Atlas", "Decals", "Paneling", "TextAtlas", "ButtonsAtlas")


def is_deck(vs):
    return all(max(abs(v.x), abs(v.y)) <= DECK_EDGE + 1e-5 and abs(v.z) >= DECK_Z for v in vs)


def bm_with_cn(ob, world=True):
    """bmesh of ob with corner normals stored in loop layer '_cn' (world space if world)."""
    me = ob.data
    bm = bmesh.new()
    bm.from_mesh(me)
    cnl = bm.loops.layers.float_vector.new("_cn")
    rot = ob.matrix_world.to_3x3().inverted().transposed()
    cn = me.corner_normals
    bm.faces.ensure_lookup_table()
    for f, p in zip(bm.faces, me.polygons):
        for l, li in zip(f.loops, p.loop_indices):
            n = cn[li].vector
            l[cnl] = (rot @ n).normalized() if world else n
    if world:
        bm.transform(ob.matrix_world)
    return bm


def write_back(ob, bm, mats):
    """Write bm (world space, with '_cn') into ob.data with the given material list."""
    inv = ob.matrix_world.inverted()
    rot = ob.matrix_world.to_3x3().transposed()      # inverse-transpose of the inverse
    cnl = bm.loops.layers.float_vector["_cn"]
    for f in bm.faces:
        for l in f.loops:
            l[cnl] = (rot @ Vector(l[cnl])).normalized()
    bm.transform(inv)
    me = ob.data
    me.materials.clear()
    for m in mats:
        me.materials.append(m)
    bm.to_mesh(me)
    at = me.attributes["_cn"]
    vec = [0.0] * (len(me.loops) * 3)
    at.data.foreach_get("vector", vec)
    me.normals_split_custom_set([Vector(vec[i:i + 3]).normalized() for i in range(0, len(vec), 3)])
    me.attributes.remove(me.attributes["_cn"])
    me.update()


def install(side_name="SideA"):
    sc = bpy.data.scenes[MAIN_SCENE]
    objs = list(sc.objects)
    body = bpy.data.objects[BODY]
    side = bpy.data.objects[side_name]
    side_mats = [m.name for m in side.data.materials]
    decal_mats = [n for n in side_mats if n.startswith(DECAL_PREFIXES)]
    targets = {BODY: [n for n in side_mats if n not in decal_mats]}
    for n in decal_mats:
        targets["Decals_" + n] = [n]
    for o in objs:
        if o.type == "MESH" and o.name.startswith("Decals_") and o.name not in targets:
            targets[o.name] = []                     # decal objects the sides don't feed: only lose side faces
    report = {}
    for tname, feed in targets.items():
        ob = bpy.data.objects.get(tname)
        if ob is None:
            me = bpy.data.meshes.new(tname)
            ob = bpy.data.objects.new(tname, me)
            body.users_collection[0].objects.link(ob)
            ob.parent = body
            ob.matrix_parent_inverse = body.matrix_world.inverted()
        if len(ob.data.uv_layers) == 1:
            ob.data.uv_layers[0].name = "UVMap"
        mats = list(ob.data.materials)
        bm = bm_with_cn(ob)
        kill = [f for f in bm.faces if not is_deck([v.co for v in f.verts])]
        kept = len(bm.faces) - len(kill)
        bmesh.ops.delete(bm, geom=kill, context="FACES")
        added = 0
        if feed:
            sbm = bm_with_cn(side)
            drop = [f for f in sbm.faces if side.data.materials[f.material_index].name not in feed]
            bmesh.ops.delete(sbm, geom=drop, context="FACES")
            side_by_name = {m.name: m for m in side.data.materials}   # never bpy.data.materials[n]: a local
            for n in feed:                                            # placeholder can shadow the linked one
                if n not in [m.name for m in mats]:
                    mats.append(side_by_name[n])
            names = [m.name for m in mats]
            remap = [names.index(m.name) if m.name in names else 0 for m in side.data.materials]
            for f in sbm.faces:
                f.material_index = remap[f.material_index]
            tmp = bpy.data.meshes.new("_tmp_side")
            sbm.to_mesh(tmp)
            sbm.free()
            if tmp.uv_layers:
                tmp.uv_layers[0].name = "UVMap"
            for f in bm.faces:
                f.tag = True
            bm.from_mesh(tmp)
            bpy.data.meshes.remove(tmp)
            added = sum(1 for f in bm.faces if not f.tag)
            for f in bm.faces:
                f.tag = False
        write_back(ob, bm, mats)
        bm.free()
        report[tname] = (kept, len(kill), added)
    report["slit verts moved"] = close_rim_slit()
    return report


def close_rim_slit(name=BODY):
    """Gemini's deck lip stops at 3.44, 0.5 mm short of the vanilla rim's inner edge (DECK_EDGE): a see-through
    slit round both decks. Move the lip's top vertices out onto the rim edge. Rerunnable (a second run moves none)."""
    ob = bpy.data.objects[name]
    bm = bm_with_cn(ob)
    moved = 0
    for v in bm.verts:
        p = v.co
        if abs(abs(p.z) - 1.25) > 1e-3 or abs(max(abs(p.x), abs(p.y)) - LIP) > 2e-4:
            continue
        for i in (0, 1):
            if abs(abs(p[i]) - LIP) < 2e-4:
                p[i] = DECK_EDGE if p[i] > 0 else -DECK_EDGE
        moved += 1
    write_back(ob, bm, list(ob.data.materials))
    bm.free()
    return moved
