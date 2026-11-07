"""Durability decals and deck layout A for GVK_HeavyTurretMount_3x3x1 (owner's picks, 2026-11-07), rerunnable:
- tie-downs: 8 clamp bars (Atlas3 piece 18, 280 mm, Atlas3_Colorable) on both decks, two per side halfway from
  the seat to the block's edge, square to the edges, in line with the seat's sides
- deck layout A: Gemini's scattered hatches and corner vents dropped (DROP)
The tie-downs are one object in Main, parented to Body, 1.5 mm off their faces (the decal snap runs later). A ray
check against Body reports each decal corner's gap. The riveted bands on the corner columns and rim joints were
removed (owner, 2026-11-07: stuck on, ending on no seam, and wrong for a truss block); install() deletes them.

    exec(open(r"<this file>").read()); install()
"""
import bpy, bmesh, math
from mathutils import Vector, Matrix
from mathutils.bvhtree import BVHTree

TOOLS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HeavyTurretMount\tools" + "\\"
MAIN_SCENE = "GVK_HeavyTurretMount_3x3x1"
COLLECTION = "Durability (mockup)"             # removed by install()
TIEDOWNS = "Decals_Durability_Atlas3_Colorable"
REMOVED = "Decals_Durability_PanelingDarker"   # the riveted bands, deleted by install()
# deck layout A: Gemini's pieces to drop, as (object, sorted |centre|, sorted size)
DROP = [("Decals_Atlas3_Colorable", (1.25, 2.86), (0.236, 0.359)),     # hatch panels, 2 per quadrant
        ("Decals_Atlas3_Colorable", (0.0, 1.52), (0.204, 0.32)),       # hatches on the arms
        ("Decals_Atlas3_Darker", (2.75, 2.75), (0.156, 0.156))]        # small corner vents
LIFT = 0.0015
# tie-downs: Atlas3 piece 18 (262 x 204 px), two per side, square to the block's edges (owner, 2026-11-07)
CLAMP_UV = (0.6235, 0.6982, 0.7515, 0.7979)
CLAMP_SIZE = (0.280, 0.218)                    # along the edge, across it
CLAMP_MAT = "Atlas3_Colorable"                 # the deck's paint, so they read as raised cleats, not vents
SEAT_RIM = 0.95                                # turret seat's outer edge, |x| or |y|
SEAT_U = SEAT_RIM                              # each pair in line with the seat's sides
SEAT_D = (SEAT_RIM + 3.75) / 2                 # halfway from the seat to the block's edge
DECK_Z = 1.25


def _load(name):
    ns = {"__name__": name, "__file__": TOOLS + name + ".py"}
    exec(open(TOOLS + name + ".py").read(), ns)
    return ns


def quad(centre, t, n, length, width, uv):
    """Corners and UVs of a decal quad: U along t, V across w = n x t, so (U, V, n) is right-handed and the art is
    not mirrored. uv = (u0, v0, u1, v1)."""
    t, n = t.normalized(), n.normalized()
    w = n.cross(t)
    c = centre + n * LIFT
    u0, v0, u1, v1 = uv
    pts = [c - t * length / 2 - w * width / 2, c + t * length / 2 - w * width / 2,
           c + t * length / 2 + w * width / 2, c - t * length / 2 + w * width / 2]
    return pts, [(u0, v0), (u1, v0), (u1, v1), (u0, v1)]


def seat_pieces():
    """Tie-downs on the -Y side of both decks, parallel to the edge (rotated x4 in build)."""
    out = []
    for s in (1, -1):
        for zs in (1, -1):
            out.append(quad(Vector((s * SEAT_U, -SEAT_D, zs * DECK_Z)), Vector((1, 0, 0)), Vector((0, 0, zs)),
                            CLAMP_SIZE[0], CLAMP_SIZE[1], CLAMP_UV))
    return out


def mesh_from(name, pieces, mat, rot=(0,)):
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    for k in rot:
        m = Matrix.Rotation(math.radians(90 * k), 3, "Z")
        for pts, uvs in pieces:
            f = bm.faces.new([bm.verts.new(m @ p) for p in pts])
            for l, uv in zip(f.loops, uvs):
                l[uvl].uv = uv
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    me.materials.append(mat)
    return me


def gaps(obs, body="Body"):
    """(min, max) gap in mm from each decal corner and face centre to Body along the face normal, and misses."""
    b = bpy.data.objects[body]
    dg = bpy.context.evaluated_depsgraph_get()
    tree = BVHTree.FromObject(b, dg)
    inv = b.matrix_world.inverted()
    g, miss = [], 0
    for ob in obs:
        me = ob.data
        for p in me.polygons:
            n = p.normal
            for co in [me.vertices[i].co for i in p.vertices] + [p.center]:
                o = inv @ (ob.matrix_world @ (co + n * 0.05))
                hit = tree.ray_cast(o, inv.to_3x3() @ -n, 0.1)
                if hit[0] is None:
                    miss += 1
                else:
                    g.append((hit[3] - 0.05) * 1000)
    return (round(min(g), 2), round(max(g), 2), miss) if g else (None, None, miss)


def drop_deck_clutter():
    """Deck layout A (owner, 2026-11-07): drop Gemini's scattered deck pieces, matched on both decks under the
    deck's symmetry by object, sorted |centre| and sorted size (6 mm tolerance). Returns islands removed per
    entry (0 on a rerun)."""
    out = {}
    for obname, cen, size in DROP:
        ob = bpy.data.objects[obname]
        bm = bmesh.new()
        bm.from_mesh(ob.data)
        mw = ob.matrix_world
        seen, kill = set(), []
        for f in bm.faces:
            if f.index in seen:
                continue
            isl, st = [], [f]
            seen.add(f.index)
            while st:
                g = st.pop()
                isl.append(g)
                for e in g.edges:
                    for h in e.link_faces:
                        if h.index not in seen:
                            seen.add(h.index)
                            st.append(h)
            vs = [mw @ v.co for g in isl for v in g.verts]
            if min(abs(v.z) for v in vs) < 1.2:
                continue
            lo = Vector((min(v.x for v in vs), min(v.y for v in vs)))
            hi = Vector((max(v.x for v in vs), max(v.y for v in vs)))
            c = sorted((abs(lo.x + hi.x) / 2, abs(lo.y + hi.y) / 2))
            s = sorted((hi.x - lo.x, hi.y - lo.y))
            if all(abs(a - b) < 0.006 for a, b in zip(c + s, list(cen) + list(size))):
                kill += isl
        out["%s %s" % (obname, cen)] = len(kill)
        bmesh.ops.delete(bm, geom=kill, context="FACES")
        bm.to_mesh(ob.data)    # plain decal quads: no custom normals to carry
        bm.free()
    return out


def install():
    """Drop the deck clutter, delete the removed bands, then (re)build the tie-downs as an object in Main, parented
    to Body. Run after install_sides and step_tabs."""
    st = _load("build_stages")
    report = drop_deck_clutter()
    old = bpy.data.collections.get(COLLECTION)
    if old is not None:                                    # the mockup collection
        for o in list(old.objects):
            bpy.data.objects.remove(o)
        bpy.data.collections.remove(old)
    gone = bpy.data.objects.get(REMOVED)
    if gone is not None:
        me = gone.data
        bpy.data.objects.remove(gone)
        if me.users == 0:
            bpy.data.meshes.remove(me)
        report["removed"] = REMOVED
    body = bpy.data.objects["Body"]
    sets = [(TIEDOWNS, seat_pieces(), st["linked"](CLAMP_MAT))]
    obs = []
    for name, pieces, mat in sets:
        me = mesh_from(name, pieces, mat, (0, 1, 2, 3))
        ob = bpy.data.objects.get(name)
        if ob is None:
            ob = bpy.data.objects.new(name, me)
            body.users_collection[0].objects.link(ob)
            ob.parent = body
        else:
            prev = ob.data
            ob.data = me
            bpy.data.meshes.remove(prev)
            me.name = name
        ob.matrix_parent_inverse = body.matrix_world.inverted()
        ob.matrix_world = Matrix.Identity(4)
        obs.append(ob)
        report[name] = len(me.polygons)
    report["gap mm (min, max, misses)"] = gaps(obs)
    return report
