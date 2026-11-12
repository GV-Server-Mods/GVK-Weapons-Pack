"""Collision for the Hurricane turret (design.md step 7; Hurricane design.md, "Collision (base model only)").

Turret subparts get no physics, so every shape is in the main scene's `Collision - Main` collection, each object at
the origin with its points in block space (the exported shapes ignore the object's location), with real UVs:
- Collision_Base: box, the plinth cell (12.5 x 12.5 x 2.5 m)
- Collision_Disc: 24-sided hull prism, 4.6 m radius, deck to the disc top
- Collision_Gunhouse: 24-sided hull prism on the azimuth axis, 4.5 m radius, disc top to the roof; the same at every
  azimuth, between the gunhouse sides (4.4 m) and its bustle (6.2 m). The roof gear and barrels get none.
- Collision_FeedBox, Collision_PowerBox: boxes over the deck's pressure box and power box, with their pipes
Hull prisms rather than Cylinder shapes: a fitted cylinder may follow a flat part's longest dimension and lie on its
side (se-dev-seut modeling-rules.md, "Collision").
    ns = {}; exec(open(path).read(), ns); ns["build"](); report = ns["check"]()
"""
import math

import bmesh
import bpy
from mathutils import Matrix, Vector

P = "GVK_HurricaneTurret"
DECK, DISC_TOP, ROOF = -1.25, -0.90, 3.10
SIDES = 24
PIVOT = Vector((0, -2.2, 1.9))              # elevation axis at rest, block space
EL_RANGE = (-10, 45)
TURN = Matrix.Rotation(math.pi, 4, "Z")
AZ = Matrix.Translation((0, 0, 1.9)) @ TURN
EL = AZ @ Matrix.Translation((0, 2.2, 0))   # a subpart of a subpart keeps its parent's frame (build_stages.py)


def world(o):
    m = o.matrix_parent_inverse @ o.matrix_basis
    return world(o.parent) @ m if o.parent else m


def part_box(names):
    """(min, max) of main-scene parts, from the deck up."""
    pts = [world(o) @ v.co for o in (bpy.data.objects[n] for n in names) for v in o.data.vertices]
    lo = Vector([min(p[i] for p in pts) for i in range(3)])
    hi = Vector([max(p[i] for p in pts) for i in range(3)])
    lo.z = DECK
    return lo, hi


def prism(r, z0, z1, n=SIDES):
    pts = [(r * math.cos(2 * math.pi * (i + 0.5) / n), r * math.sin(2 * math.pi * (i + 0.5) / n)) for i in range(n)]
    bm = bmesh.new()
    lo = [bm.verts.new((x, y, z0)) for x, y in pts]
    hi = [bm.verts.new((x, y, z1)) for x, y in pts]
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new([lo[i], lo[j], hi[j], hi[i]])
    bm.faces.new(list(reversed(lo)))
    bm.faces.new(hi)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return bm


def box(lo, hi):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0, matrix=Matrix.Translation((lo + hi) / 2) @ Matrix.Diagonal((*(hi - lo), 1)))
    return bm


def shapes():
    feed = part_box(("Pl_FeedBox", "Pl_FeedGauges", "Pl_FeedPipes", "Pl_FeedWheels"))
    power = part_box(("Pl_PowerBox", "Pl_PowerConduits", "Pl_PowerRings"))
    return [
        ("Collision_Base", box(Vector((-6.25, -6.25, -3.75)), Vector((6.25, 6.25, DECK))), "BOX"),
        ("Collision_Disc", prism(4.6, DECK, DISC_TOP), "CONVEX_HULL"),
        ("Collision_Gunhouse", prism(4.5, DISC_TOP, ROOF), "CONVEX_HULL"),
        ("Collision_FeedBox", box(*feed), "BOX"),
        ("Collision_PowerBox", box(*power), "BOX"),
    ]


def box_uv(bm, per_m=0.4, origin=0.37):
    uv = bm.loops.layers.uv.get("UVMap") or bm.loops.layers.uv.new("UVMap")
    bm.normal_update()
    for f in bm.faces:
        ax = max(range(3), key=lambda i: abs(f.normal[i]))
        a, b = [(1, 2), (0, 2), (0, 1)][ax]
        for lp in f.loops:
            lp[uv].uv = (lp.vert.co[a] * per_m + origin, lp.vert.co[b] * per_m + origin)


def walk(lc):
    yield lc
    for c in lc.children:
        yield from walk(c)


def build():
    sc = bpy.data.scenes[P]
    col = next(c for c in sc.collection.children_recursive if c.name.startswith("Collision - Main"))
    made = []
    for name, bm, shape in shapes():
        box_uv(bm)
        me = bpy.data.meshes.new(name + "_new")
        bm.to_mesh(me)
        bm.free()
        o = bpy.data.objects.get(name)
        if o is None:
            o = bpy.data.objects.new(name, me)
            col.objects.link(o)
        else:
            old = o.data
            o.data = me
            if old.users == 0:
                bpy.data.meshes.remove(old)
        me.name = name
        o.matrix_world = Matrix()
        made.append((o, shape))
    # rigid bodies need the object active and selected in the window's view layer
    win = bpy.context.window
    home = win.scene
    win.scene = sc
    vl = win.view_layer
    lc = next(lc for lc in list(walk(vl.layer_collection)) if lc.collection is col)
    lc.hide_viewport = False
    try:
        for o, shape in made:
            if o.rigid_body is None:
                for s in list(vl.objects.selected):
                    s.select_set(False)
                o.select_set(True)
                vl.objects.active = o
                with bpy.context.temp_override(scene=sc, view_layer=vl, object=o, active_object=o,
                                               selected_objects=[o], selected_editable_objects=[o]):
                    bpy.ops.rigidbody.object_add(type="ACTIVE")
                o.select_set(False)
            o.rigid_body.collision_shape = shape
    finally:
        lc.hide_viewport = True     # hidden: it sits on Main in the viewport
        win.scene = home
    return [(o.name, o.rigid_body.collision_shape, len(o.data.polygons)) for o, _ in made]


def inside(p, o):
    """True if p is inside the convex mesh of o (block space, object at the origin)."""
    me = o.data
    for f in me.polygons:
        if (p - me.vertices[f.vertices[0]].co).dot(f.normal) > 0:
            return False
    return True


def check(step=1.0):
    """The scope (muzzle_projectile_1) over the elevation range at every azimuth: any point inside a shape, and
    the closest it comes to the gunhouse prism's side or top. Plus each shape's bounds against the block's box."""
    sc = bpy.data.scenes[P]
    col = next(c for c in sc.collection.children_recursive if c.name.startswith("Collision - Main"))
    objs = list(col.objects)
    scope = EL @ world(bpy.data.objects["muzzle_projectile_1"])
    v = scope.translation - PIVOT
    hits, closest = [], 1e9
    e = EL_RANGE[0]
    while e <= EL_RANGE[1] + 1e-9:
        pe = PIVOT + Matrix.Rotation(-math.radians(e), 3, "X") @ v      # positive elevation raises the front
        for a in range(0, 360, 5):
            p = Matrix.Rotation(math.radians(a), 3, "Z") @ pe
            for o in objs:
                if inside(p, o):
                    hits.append((round(e, 1), a, o.name))
            closest = min(closest, max(math.hypot(p.x, p.y) - 4.5, p.z - ROOF))
        e += step
    half = Vector((sc.seut.bBox_X, sc.seut.bBox_Y, sc.seut.bBox_Z)) * 1.25
    out_of_box = []
    for o in objs:
        for vv in o.data.vertices:
            if any(abs(vv.co[i]) > half[i] + 1e-6 for i in range(3)):
                out_of_box.append(o.name)
                break
    uv_ok = all(o.data.uv_layers and not all(abs(d.uv.x) < 1e-6 and abs(d.uv.y) < 1e-6 for d in o.data.uv_layers[0].data)
                for o in objs)
    return dict(scope_rest=tuple(round(x, 2) for x in scope.translation), hits=hits[:10], n_hits=len(hits),
                closest_to_gunhouse=round(closest, 2), out_of_box=out_of_box, uvs=uv_ok, objects=len(objs),
                at_origin=all(o.matrix_world == Matrix() for o in objs))
