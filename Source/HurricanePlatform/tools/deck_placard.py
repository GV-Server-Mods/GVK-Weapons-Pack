"""Ordnance placard on the top deck, in place of the TYPE A data plate (owner, 2026-11-09: "Ordnance placard is cool
but it needs its own background and trim border"; colour scheme 2, black field).

Run after ring_trench.py and before finish.py:
    ns = {}; exec(open(path).read(), ns); report = ns["placard"]()

- A raised plate (Pl_Placard, a child of Platform) 22 mm proud of the deck: a 3 cm bezel in the darker paint with a
  6 mm 45 degree chamfer on each edge, round a black metal field 6 mm lower. The plate's corners are chamfered, as the
  deck's own fields are.
- On the field, laid side by side (decals must not stack): yellow and black hazard bands top and bottom, and between
  them the shell icon, the AMMUNITION label and the explosive diamond (Atlas2 53, 52, 19; bands 66).
- A bolt (Decals 7, darker sheet) on each of the bezel's corner chamfers.
- It sits below the cargo hatch, on its handle side, and the text reads from the deck's -Y (front) edge (owner,
  2026-11-09: option A, "move them a little closer together"). It has no panel line round it (owner, 2026-11-09:
  "remove the panel seam line from around the placard").
The old data plate (the TYPE A label) leaves Pl_TopDec_Atlas2. Running it again rebuilds the placard.
"""
import json

import bmesh
import bpy
from mathutils import Vector

REGIONS = r"C:\Users\blayl\.claude\skills\se-dev-seut\references\atlas-regions.json"
PLAT = "Platform"
A2 = "Pl_TopDec_Atlas2"
NAME = "Pl_Placard"

CENTRE = Vector((4.85, -4.233))     # under the hatch pocket (hatch_pocket.py), 13 cm from its edge
DECK = -1.25
Z_TOP, Z_FIELD = DECK + 0.022, DECK + 0.016
FA, FB, FC = 0.415, 0.205, 0.025    # field half width, half height, corner chamfer
BEZEL, CHAMFER = 0.030, 0.006       # so the plate is 0.914 x 0.494 m at its foot
OFF = 0.0015                        # decal gap (finish.py snaps it to the game's grid)
PAINT_UV = 0.4
MATS = ("PaintedMetal_Darker", "BlackMetal", "Atlas2", "PanelingDarker")
BEZ, FIELD, STICK, BOLT = range(4)
OLD_PLATE = (-4.6, -3.6, 5.3, 5.5)  # x0, x1, y0, y1 of the TYPE A label's centre


def world(a, b, z):
    """Placard (a right, b up the text) to world: read from -Y, so right is +X and up is +Y."""
    return Vector((CENTRE.x + a, CENTRE.y + b, z))


def octagon(A, B, c):
    return [(-A + c, -B), (A - c, -B), (A, -B + c), (A, B - c), (A - c, B), (-A + c, B), (-A, B - c), (-A, -B + c)]


def offset(poly, d):
    """Convex anticlockwise polygon, each edge moved out by d."""
    lines = []
    for i, p in enumerate(poly):
        p, q = Vector(p), Vector(poly[(i + 1) % len(poly)])
        t = (q - p).normalized()
        lines.append((p + Vector((t.y, -t.x)) * d, t))
    out = []
    for i in range(len(poly)):
        (p1, t1), (p2, t2) = lines[i - 1], lines[i]
        s = ((p2 - p1).x * t2.y - (p2 - p1).y * t2.x) / (t1.x * t2.y - t1.y * t2.x)
        out.append(tuple(p1 + t1 * s))
    return out


def drop_old_plate():
    o = bpy.data.objects[A2]
    bm = bmesh.new()
    bm.from_mesh(o.data)
    x0, x1, y0, y1 = OLD_PLATE
    gone = [f for f in bm.faces if x0 < f.calc_center_median().x < x1 and y0 < f.calc_center_median().y < y1]
    bmesh.ops.delete(bm, geom=gone, context="FACES")
    bm.to_mesh(o.data)
    bm.free()
    return len(gone)


def remove_old():
    o = bpy.data.objects.get(NAME)
    if o is None:
        return
    me = o.data
    bpy.data.objects.remove(o, do_unlink=True)
    if me.users == 0:
        bpy.data.meshes.remove(me)


def build(bm, uv, regions):
    pool = {}

    def vert(p):
        k = tuple(round(c, 6) for c in p)
        if k not in pool:
            pool[k] = bm.verts.new(p)
        return pool[k]

    def face(pts, mi, uvs=None, share=True):
        f = bm.faces.new([vert(p) if share else bm.verts.new(p) for p in pts])
        f.material_index = mi
        f.normal_update()
        for k, lp in enumerate(f.loops):
            if uvs:
                lp[uv].uv = uvs[k]
            else:   # box map at the paint's scale
                ax = max(range(3), key=lambda i: abs(f.normal[i]))
                u, v = [lp.vert.co[i] for i in range(3) if i != ax]
                lp[uv].uv = (u * PAINT_UV, v * PAINT_UV)

    # plate: field, inner chamfer, bezel top, outer chamfer, wall (its foot just under the deck)
    p0 = octagon(FA, FB, FC)
    rings = [(p0, Z_FIELD), (offset(p0, CHAMFER), Z_TOP), (offset(p0, CHAMFER + BEZEL), Z_TOP),
             (offset(p0, 2 * CHAMFER + BEZEL), Z_FIELD), (offset(p0, 2 * CHAMFER + BEZEL), DECK - 0.002)]
    face([world(a, b, Z_FIELD) for a, b in p0], FIELD)
    for k in range(len(rings) - 1):
        (pa, za), (pb, zb) = rings[k], rings[k + 1]
        for i in range(8):
            j = (i + 1) % 8
            face([world(*pa[i], za), world(*pb[i], zb), world(*pb[j], zb), world(*pa[j], za)], BEZ)

    a2 ={r["id"]: r for r in regions["Atlas2"]["regions"]}
    dec = {r["id"]: r for r in regions["Decals_Atlas_A_01"]["regions"]}

    def sticker(r, a0, b0, a1, b1, z, mi, u_cut=1.0):
        u0, v0, u1, v1 = r["u0"], r["v0"], r["u0"] + (r["u1"] - r["u0"]) * u_cut, r["v1"]
        shape = [tuple(p) for p in r["outline"]] if r.get("outline") else [(u0, v0), (u1, v0), (u1, v1), (u0, v1)]
        pos = [(a0 + (a1 - a0) * (u - u0) / (u1 - u0), b0 + (b1 - b0) * (v - v0) / (v1 - v0)) for u, v in shape]
        face([world(a, b, z) for a, b in pos], mi, shape, share=False)

    # stickers (sizes in m, from the owner's pick on the label sheet): band, 20 mm, row 210 mm, 20 mm, band
    w, h, band = 0.760, 0.340, 0.045
    tile = band * a2[66]["w_px"] / a2[66]["h_px"]
    for b0 in (h / 2 - band, -h / 2):
        a = -w / 2
        while a < w / 2 - 1e-6:
            ln = min(tile, w / 2 - a)
            sticker(a2[66], a, b0, a + ln, b0 + band, Z_FIELD + OFF, STICK, ln / tile)
            a += ln
    a = -w / 2
    for pid, pw in ((53, 0.060), (52, 0.441), (19, 0.209)):
        sticker(a2[pid], a, -0.105, a + pw, 0.105, Z_FIELD + OFF, STICK)
        a += pw + 0.025

    # a bolt on each corner chamfer of the bezel
    mid = offset(p0, CHAMFER + BEZEL / 2)
    for i in (1, 3, 5, 7):
        c = (Vector(mid[i]) + Vector(mid[(i + 1) % 8])) / 2
        s = 0.011
        sticker(dec[7], c.x - s, c.y - s, c.x + s, c.y + s, Z_TOP + OFF, BOLT)


def placard():
    plat = bpy.data.objects[PLAT]
    assert plat.matrix_world.is_identity
    old = drop_old_plate()
    remove_old()
    regions = json.load(open(REGIONS))
    me = bpy.data.meshes.new(NAME)
    for m in MATS:
        me.materials.append(bpy.data.materials[m])
    bm = bmesh.new()
    uv = bm.loops.layers.uv.new("UVMap")
    build(bm, uv, regions)
    down = sum(1 for f in bm.faces if f.normal.z < -0.5)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(NAME, me)
    for col in plat.users_collection:
        col.objects.link(o)
    o.parent = plat
    return dict(old_plate_faces=old, faces=len(me.polygons), facing_down=down)
