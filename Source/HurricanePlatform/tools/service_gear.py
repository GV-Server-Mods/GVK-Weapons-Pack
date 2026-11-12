"""Service gear on the top deck's trenches (owner, 2026-11-09: "shorten the supply boxes, then move the pressure gages to
the other side of their box so they face outward, and then adjust the conduits on both sides so they are not so sunk
into the moat"; the boxes lowered, the owner's pick).

Run after deck_rivets.py and before finish.py:
    ns = {}; exec(open(path).read(), ns); report = ns["gear"]()

- Both supply boxes (the pressure box, Pl_FeedBox, and the power cabinet, Pl_PowerBox) are 8.2 cm lower: 17 cm above
  the trench floor, 13.5 cm proud of the deck. The decals on their tops come down with them. Those on their sides keep
  their gap under the top and, where a face no longer has room, shrink to fit it.
- The pressure box's two gauges, with their dials, turn 180 degrees round the box onto its outer face, so they face the
  deck's edge. The warning plate that was there moves to the box's bare -Y side.
- The feed pipes, valves and wheels rise 5.3 cm, and the power conduits and their rings 3.6 cm, so their flanges and
  rings clear the trench floor. The clamp bars and the conduits' junction block keep their feet on the floor and
  grow by the same amount at the top.
Running it again does nothing once the boxes are lowered.
"""
import bmesh
import bpy
import numpy as np
from mathutils import Matrix, Vector

PLAT = "Platform"
FLOOR = -1.285              # the trench floor (the moat's depth)
DROP = 0.082                # box tops: -1.033 to -1.115
CHAMF = 0.008               # the boxes' top chamfer
RAISE = {"feed": 0.053, "power": 0.036}
FOOT = FLOOR - 0.004        # a clamp's foot, just into the floor
SIDE_GAP = 0.005            # a side decal's least gap under the box's top chamfer, and over the floor (+3 mm)
GEAR = {"feed": ("Pl_FeedPipes", "Pl_FeedWheels"), "power": ("Pl_PowerConduits", "Pl_PowerRings")}
BOXES = ("Pl_FeedBox", "Pl_PowerBox")
GAUGES = "Pl_FeedGauges"
WIDE = 0.35                 # a loose part wider than this across Y is a clamp or the junction block


def bounds(o, pad=0.0):
    bb = [o.matrix_world @ Vector(c) for c in o.bound_box]
    return (Vector([min(v[i] for v in bb) - pad for i in range(3)]), Vector([max(v[i] for v in bb) + pad for i in range(3)]))


def attached(gear):
    """Decal faces in Platform's other children that lie inside each gear object's bounds (6 mm round)."""
    plat = bpy.data.objects[PLAT]
    box = {n: bounds(bpy.data.objects[n], 0.006) for n in gear}
    out = {n: {} for n in gear}
    for o in plat.children_recursive:
        if o.type != "MESH" or o.name in gear or o.name == "Pl_DeckRivets" or not o.name.startswith("Pl_TopDec"):
            continue
        for p in o.data.polygons:
            vs = [o.data.vertices[i].co for i in p.vertices]
            for n, (lo, hi) in box.items():
                if all(all(lo[i] <= v[i] <= hi[i] for i in range(3)) for v in vs):
                    out[n].setdefault(o.name, []).append(p.index)
                    break
    return out


def uv_fits(bm, uvl, faces):
    """Each face's corners and uvs before the move, for remap()."""
    return {f: (np.array([list(lp.vert.co) for lp in f.loops]), np.array([list(lp[uvl].uv) for lp in f.loops]))
            for f in faces}


def plane_frame(P):
    """The centre and two in-plane axes of the face with corners P (Newell normal, axis along its longest edge)."""
    n = np.zeros(3)
    for a, b in zip(P, np.roll(P, -1, 0)):
        n += np.cross(a, b)
    n /= np.linalg.norm(n)
    e = max((b - a for a, b in zip(P, np.roll(P, -1, 0))), key=np.linalg.norm)
    t1 = e - n * (e @ n)
    t1 /= np.linalg.norm(t1)
    return P.mean(0), t1, np.cross(n, t1)


def remap(fits, uvl):
    """A face that only moved keeps its uvs. A stretched face gets them from an affine fit in its own plane, so its
    texel size stays. (The first version fitted u and v on x, y, z and 1 together: on small faces far from the origin
    that fit is ill-conditioned, and a 5.3 cm lift threw the handwheels' uvs out to 1e5 and slid the pipes' texture.)"""
    for f, (P, U) in fits.items():
        Q = np.array([list(lp.vert.co) for lp in f.loops])
        D = Q - P
        if np.abs(D - D[0]).max() < 1e-6:
            continue
        c, t1, t2 = plane_frame(P)
        A = np.linalg.lstsq(np.c_[(P - c) @ t1, (P - c) @ t2, np.ones(len(P))], U, rcond=None)[0]
        for lp, q in zip(f.loops, Q):
            lp[uvl].uv = tuple(np.array([(q - c) @ t1, (q - c) @ t2, 1.0]) @ A)


def keep_normals(me):
    """The mesh's corner normals, to put back after a bmesh round trip that keeps the topology."""
    return [Vector(c.vector) for c in me.corner_normals] if me.has_custom_normals else None


def put_normals(me, cn):
    if cn is not None:
        me.normals_split_custom_set(cn)


def stretch(o, move):
    """Move each vertex by move(co) -> new co, keeping the texture scale on every face."""
    me = o.data
    cn = keep_normals(me)
    bm = bmesh.new()
    bm.from_mesh(me)
    uvl = bm.loops.layers.uv.active
    fits = uv_fits(bm, uvl, bm.faces) if uvl else {}
    for v in bm.verts:
        v.co = move(v.co.copy())
    if uvl:
        remap(fits, uvl)
    bm.to_mesh(me)
    bm.free()
    put_normals(me, cn)
    me.update()


def loose_parts(bm):
    seen, parts = set(), []
    for v in bm.verts:
        if v in seen:
            continue
        stack, comp = [v], []
        seen.add(v)
        while stack:
            a = stack.pop()
            comp.append(a)
            for e in a.link_edges:
                b = e.other_vert(a)
                if b not in seen:
                    seen.add(b)
                    stack.append(b)
        parts.append(comp)
    return parts


def raise_run(o, dz):
    """Lift a pipe or conduit run; wide parts (clamps, junction block) keep a foot on the floor."""
    me = o.data
    cn = keep_normals(me)
    bm = bmesh.new()
    bm.from_mesh(me)
    uvl = bm.loops.layers.uv.active
    fits = uv_fits(bm, uvl, bm.faces) if uvl else {}
    wide = 0
    for comp in loose_parts(bm):
        ys, zs = [v.co.y for v in comp], [v.co.z for v in comp]
        if max(ys) - min(ys) > WIDE:
            wide += 1
            mid = (min(zs) + max(zs)) / 2
            for v in comp:
                v.co.z = FOOT + (v.co.z - min(zs)) if v.co.z < mid else v.co.z + dz
        else:
            for v in comp:
                v.co.z += dz
    if uvl:
        remap(fits, uvl)
    bm.to_mesh(me)
    bm.free()
    put_normals(me, cn)
    me.update()
    return wide


def edit_faces(name, ids, place):
    """Move whole decal faces: place(face centre, normal) returns a matrix for that face's vertices."""
    o = bpy.data.objects[name]
    me = o.data
    bm = bmesh.new()
    bm.from_mesh(me)
    bm.faces.ensure_lookup_table()
    faces = [bm.faces[i] for i in ids]
    for f in faces:
        assert all(all(g in faces for g in v.link_faces) for v in f.verts), (name, f.index)
        M = place(f)
        for v in f.verts:
            v.co = M @ v.co
    bm.normal_update()
    bm.to_mesh(me)
    bm.free()
    if me.has_custom_normals:   # the moved faces take their new face normal, the rest keep theirs
        cn = [Vector(c.vector) for c in me.corner_normals]
        for i in ids:
            p = me.polygons[i]
            for li in p.loop_indices:
                cn[li] = p.normal.copy()
        me.normals_split_custom_set(cn)
    me.update()


def side_fit(top_flat):
    lo, hi = FLOOR + SIDE_GAP + 0.003, top_flat - SIDE_GAP

    def place(f):
        zs = [v.co.z for v in f.verts]
        z0, z1 = min(zs) - DROP, max(zs) - DROP
        c = f.calc_center_median()
        s = min(1.0, (hi - lo) / (z1 - z0))
        zc = (z0 + z1) / 2
        h = (z1 - z0) * s
        zc = min(max(zc, lo + h / 2), hi - h / 2)
        # scale about the face centre in its plane, then set its height
        return (Matrix.Translation((0, 0, zc - c.z)) @ Matrix.Translation(c) @ scale_in_plane(f.normal, s)
                @ Matrix.Translation(-c))
    return place


def scale_in_plane(n, s):
    n = Vector(n).normalized()
    return Matrix([[s * (i == j) + (1 - s) * n[i] * n[j] for j in range(3)] for i in range(3)]).to_4x4()


def gear():
    plat = bpy.data.objects[PLAT]
    assert plat.matrix_world.is_identity
    bpy.context.view_layer.update()   # bound_box is cached until the depsgraph updates
    fb, pb = (bpy.data.objects[n] for n in BOXES)
    if bounds(fb)[1].z < -1.10:
        return dict(done=True)
    names = [GAUGES] + list(BOXES) + [n for g in GEAR.values() for n in g]   # gauges first: their dials win
    assert all(bpy.data.objects[n].matrix_world.is_identity for n in names)
    dec = attached(names)
    rep = {}

    # the gauges and their dials: half a turn round the pressure box, onto its outer face
    lo, hi = bounds(fb)
    axis = Vector(((lo.x + hi.x) / 2, (lo.y + hi.y) / 2, 0))
    turn = Matrix.Translation(axis) @ Matrix.Rotation(np.pi, 4, "Z") @ Matrix.Translation(-axis)
    down = Matrix.Translation((0, 0, -DROP))
    bpy.data.objects[GAUGES].data.transform(down @ turn)
    for name, ids in dec[GAUGES].items():
        edit_faces(name, ids, lambda f: down @ turn)
    rep["gauge_dials"] = sum(len(v) for v in dec[GAUGES].values())

    for b in (fb, pb):
        lo, hi = bounds(b)
        top_flat = hi.z - DROP - CHAMF
        stretch(b, lambda co: co - Vector((0, 0, DROP)) if co.z > hi.z - 0.05 else co)
        fit = side_fit(top_flat)
        moved = 0
        for name, ids in dec[b.name].items():
            o = bpy.data.objects[name]
            tops = [i for i in ids if o.data.polygons[i].normal.z > 0.9]
            sides = [i for i in ids if abs(o.data.polygons[i].normal.z) < 0.5]
            outer = [i for i in sides if b is fb and o.data.polygons[i].normal.x < -0.9]
            if tops:
                edit_faces(name, tops, lambda f: down)
            if outer:   # the warning plate leaves the outer face for the bare -Y side
                c = Vector(((lo.x + hi.x) / 2, (lo.y + hi.y) / 2, 0))
                q = Matrix.Translation(c) @ Matrix.Rotation(np.pi / 2, 4, "Z") @ Matrix.Translation(-c)

                def to_side(f, q=q, lo=lo):
                    p = q @ f.calc_center_median()
                    return Matrix.Translation((0, lo.y - 0.004 - p.y, 0)) @ q
                edit_faces(name, outer, to_side)
            rest = [i for i in sides if i not in outer] + outer
            if rest:
                edit_faces(name, rest, fit)
            moved += len(tops) + len(rest)
        rep[b.name] = dict(top=round(hi.z - DROP, 4), decals=moved)

    # pipe and conduit runs
    for key, objs in GEAR.items():
        for n in objs:
            rep[n] = dict(wide=raise_run(bpy.data.objects[n], RAISE[key]))
            for name, ids in dec[n].items():
                edit_faces(name, ids, lambda f, d=RAISE[key]: Matrix.Translation((0, 0, d)))
    return rep
