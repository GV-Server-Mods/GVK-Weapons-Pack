"""Seat the vanilla large cargo container's port frames (`Pl_PortFrame_*`, LargeConveyorFrame) in the Platform.

Run after assemble.py (which keeps the frames and keypads where the Hurricane had them):
    ns = {}; exec(open(path).read(), ns); report = ns["fit"]()

Each frame is a 2 m box with 0.21 m chamfered corners. On each side wall and the bottom deck this
- moves the vanilla access panel's left edge and the corner vents clear of the frame,
- cuts the Platform along the frame's outline and removes what lies inside (the vanilla port surround),
- closes the cut where the wall's bands stand prouder than the frame face (notch walls down to it).
"""
import math
import bmesh
import bpy
from mathutils import Matrix, Vector

PLAT = "Platform"
Z0 = -2.5
HALF, CHAMF = 1.0, 1.79       # frame outline: |a| <= 1, |b| <= 1, |a| + |b| <= 1.79
FRONT = 6.205                 # notch walls run down to just behind the frame face (6.21)
UV = 0.40                     # UV per metre on painted faces
PANEL_SHIFT = 0.20            # access panel left edge, out from under the frame
VENT_SHIFT = 0.06             # corner vent slots, out from under the frame
DEC = ("Atlas", "Paneling", "Decals", "ButtonsAtlas", "TextAtlas")
SIDES = {"F": 0, "L": 90, "B": 180, "R": 270}


def side_frames():
    """World matrix per side whose local axes are (a, -n, b): a along the wall (keypad side +), n outward,
    b = height above the bay centre."""
    out = {}
    for s, deg in SIDES.items():
        out[s] = Matrix.Translation((0, 0, Z0)) @ Matrix.Rotation(math.radians(deg), 4, "Z")
    return out


def inside(a, b, eps=1e-4):
    return abs(a) <= HALF + eps and abs(b) <= HALF + eps and abs(a) + abs(b) <= CHAMF + eps


def on_outline(a, b, eps=2e-4):
    return inside(a, b, eps) and not inside(a, b, -eps)


def planes():
    out = [((s * HALF, 0, 0), (1, 0, 0)) for s in (1, -1)] + [((0, 0, s * HALF), (0, 0, 1)) for s in (1, -1)]
    for sa in (1, -1):
        for sb in (1, -1):
            out.append(((sa * CHAMF, 0, 0), (sa, 0, sb)))
    return out


def cut(bm, mats, M, deep):
    """Cut the opaque faces that M maps to (a, -n, b) with n beyond `deep`, along the outline; remove inside."""
    Mi = M.inverted()
    loc = lambda v: Mi @ v.co
    cand = lambda: [f for f in bm.faces if not mats[f.material_index].startswith(DEC)
                    and all(-loc(v).y > deep for v in f.verts)
                    and min(loc(v).x for v in f.verts) < HALF and max(loc(v).x for v in f.verts) > -HALF
                    and min(loc(v).z for v in f.verts) < HALF and max(loc(v).z for v in f.verts) > -HALF]
    for co, no in planes():
        faces = cand()
        geom = list({e for f in faces for e in f.edges}) + faces
        bmesh.ops.bisect_plane(bm, geom=geom, plane_co=M @ Vector(co),
                               plane_no=(M.to_3x3() @ Vector(no)).normalized())
    gone = [f for f in cand() if all(inside(loc(v).x, loc(v).z) for v in f.verts)]
    bmesh.ops.delete(bm, geom=gone, context="FACES")
    return len(gone)


def notch_walls(bm, mats, M, cnl, uvl):
    """Wall quads from each cut edge that stands proud of the frame face, down to FRONT."""
    Mi = M.inverted()
    loc = lambda v: Mi @ v.co
    low = {}
    made = 0
    for e in [e for e in bm.edges if len(e.link_faces) == 1]:
        p, q = (loc(v) for v in e.verts)
        if not (on_outline(p.x, p.z) and on_outline(q.x, q.z)):
            continue
        if max(-p.y, -q.y) < FRONT + 0.0065 or (Vector((p.x, p.z)) - Vector((q.x, q.z))).length < 1e-5:
            continue
        def drop(v):
            l = loc(v)
            key = (round(l.x, 5), round(l.z, 5))
            if key not in low:
                low[key] = bm.verts.new(M @ Vector((l.x, -FRONT, l.z)))
            return low[key]
        v1, v2 = e.verts
        f = bm.faces.new((v1, v2, drop(v2), drop(v1)))
        src = e.link_faces[0]
        f.material_index = src.material_index
        f.normal_update()
        c = Mi @ f.calc_center_median()
        if (Mi.to_3x3() @ f.normal).dot(Vector((-c.x, 0, -c.z))) < 0:   # face the frame, not the wall
            f.normal_flip()
        along = (q - p).normalized()
        for l in f.loops:
            lc = loc(l.vert)
            l[uvl].uv = (0.37 + UV * Vector((lc.x, 0, lc.z)).dot(along), 0.37 + UV * -lc.y)
            l[cnl] = f.normal
        made += 1
    return made


def shift_decals(bm, mats, M):
    """Panel left edge and corner vents out from under the frame, on both halves of the wall."""
    Mi = M.inverted()
    moved = 0
    for v in bm.verts:
        fs = v.link_faces
        if not fs or not all(mats[f.material_index].startswith(DEC) for f in fs):
            continue
        l = Mi @ v.co
        n, a, b = -l.y, l.x, l.z
        m = mats[fs[0].material_index]
        if m in ("Atlas4_Colorable", "Atlas3_Colorable") and 6.21 < n < 6.222 and abs(b) < 0.41 and 0.83 < abs(a) < 0.99:
            d = PANEL_SHIFT
        elif m == "Atlas3_Darker" and 6.2 < n < 6.235 and 0.7 < abs(b) < 0.9 and 0.95 < abs(a) < 1.35:
            d = VENT_SHIFT
        else:
            continue
        v.co = M @ Vector((a + math.copysign(d, a), l.y, b))
        moved += 1
    return moved


def trim_decals(bm, mats, M, deep):
    """Decals under a frame: cut them along the outline and drop the part inside (the bottom deck's seam
    ring round the old well goes, and the seams running out from it now end at the frame)."""
    Mi = M.inverted()
    loc = lambda v: Mi @ v.co
    hit = lambda: [f for f in bm.faces if mats[f.material_index].startswith(DEC)
                   and all(-loc(v).y > deep for v in f.verts)
                   and any(inside(loc(v).x, loc(v).z, -1e-3) for v in f.verts)]
    for co, no in planes():
        faces = [f for f in hit() if not all(inside(loc(v).x, loc(v).z) for v in f.verts)]
        if faces:
            geom = list({e for f in faces for e in f.edges}) + faces
            bmesh.ops.bisect_plane(bm, geom=geom, plane_co=M @ Vector(co),
                                   plane_no=(M.to_3x3() @ Vector(no)).normalized())
    gone = [f for f in hit() if all(inside(loc(v).x, loc(v).z) for v in f.verts)]
    bmesh.ops.delete(bm, geom=gone, context="FACES")
    return len(gone)


def decals_inside(bm, mats, M, deep):
    Mi = M.inverted()
    return sum(1 for f in bm.faces if mats[f.material_index].startswith(DEC)
               and all(-(Mi @ v.co).y > deep for v in f.verts)
               and any(inside((Mi @ v.co).x, (Mi @ v.co).z, -1e-3) for v in f.verts))


def open_bm(me):
    """bmesh of the mesh with its custom normals in the `_cn` corner layer, so cuts keep the shading."""
    if "_cn" in me.attributes:
        me.attributes.remove(me.attributes["_cn"])
    cn = [c for l in me.corner_normals for c in l.vector]
    me.attributes.new("_cn", "FLOAT_VECTOR", "CORNER").data.foreach_set("vector", cn)
    bm = bmesh.new()
    bm.from_mesh(me)
    return bm, bm.loops.layers.float_vector.get("_cn"), bm.loops.layers.uv.active


def close_bm(bm, me):
    bm.normal_update()
    bm.to_mesh(me)
    bm.free()
    at = me.attributes["_cn"]
    vec = [0.0] * (len(me.loops) * 3)
    at.data.foreach_get("vector", vec)
    me.normals_split_custom_set([Vector(vec[i:i + 3]).normalized() for i in range(0, len(vec), 3)])
    me.attributes.remove(me.attributes["_cn"])


# bottom deck: local (a, -n, b) maps to world (a, -b, Z0 - n), so n is the depth below the base's centre
BOTTOM = Matrix.Translation((0, 0, Z0)) @ Matrix.Rotation(math.radians(90), 4, "X")


def fit():
    ob = bpy.data.objects[PLAT]
    assert ob.matrix_world.is_identity
    me = ob.data
    mats = [m.name for m in me.materials]
    bm, cnl, uvl = open_bm(me)
    rep = {}
    for s, M in side_frames().items():
        rep[s] = dict(decal_verts_moved=shift_decals(bm, mats, M), faces_cut=cut(bm, mats, M, 5.85),
                      walls=notch_walls(bm, mats, M, cnl, uvl), decals_left_inside=decals_inside(bm, mats, M, 5.85))
    rep["D"] = dict(faces_cut=cut(bm, mats, BOTTOM, 0.95), decals_trimmed=trim_decals(bm, mats, BOTTOM, 0.95),
                    decals_left_inside=decals_inside(bm, mats, BOTTOM, 0.95))
    close_bm(bm, me)
    rep["faces"] = len(me.polygons)
    return rep
