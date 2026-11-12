"""Deck rivets in every plate corner, top and bottom (owner, 2026-11-09: "apply the top and bottom plate rivets in more
corners and more evenly"; option A, corners only).

Run after deck_cleanup.py and before finish.py:
    ns = {}; exec(open(path).read(), ns); report = ns["rivets"]()

- One rivet (Atlas3 piece 14, a round sunken head, 44 mm) in every corner of every deck plate: the four field plates,
  the mid plates and service strips (top), the cross arms (bottom), the corner plates, and the band plates between
  them, where a clamp or corner line meets the deck edge and where a clamp line meets the frame line. Each sits 5.5
  cm from both panel lines' centres, as the vanilla corner plates' rivets do; on a 135 degree chamfer corner it sits
  on the corner's bisector. Rows by the deck edge stay 3.6 cm in from it, as the vanilla ones.
- Only plate corners get one (owner, 2026-11-09: "you have a lot that of old ones that are not actually at any
  corners, and you have extra new ones that are also not at any corners"). The vanilla rivets on the clamp bridges
  and the band rivets by the moat's outer edge are gone; the vanilla ones at corners are rebuilt in place.
- Every rivet is turned to a random angle (owner, 2026-11-04: "all simple round bolt head decals should be randomly
  rotated"), seeded by its position so a rebuild repeats it.
- A candidate is kept only where a ray finds plain deck paint under its centre and 26 mm round it.
All rivets live in Pl_DeckRivets (Atlas3_Colorable, a child of Platform). Running it again rebuilds that object.
"""
import json
import math
import random

import bmesh
import bpy
from mathutils import Vector
from mathutils.bvhtree import BVHTree

REGIONS = r"C:\Users\blayl\.claude\skills\se-dev-seut\references\atlas-regions.json"
PLAT = "Platform"
NAME = "Pl_DeckRivets"
MAT = "Atlas3_Colorable"
PIECE = 14
SIZE = 0.044
OFF = 0.0015                 # decal gap (finish.py snaps it)
TOP, BOT = -1.25, -3.75
D = 0.055                    # rivet centre from a panel line's centre
EDGE = 6.214                 # outer band row, 3.6 cm in from the deck edge
RING = 4.843 + D             # ring trench panel line radius, plus D
CH = 0.0228                  # along-line offset of a 135 degree corner's rivet (D off both lines)
FRAME = 5.689                # the moat's panel line, round the field plates
MID = 0.68                   # the mid plates' and cross arms' panel lines
PORT = 1.0                   # where the bottom cross arms' lines stop at the bottom port's frame
SERVICE = 0.382              # the service trenches' panel lines (top, +-X sides)
CLAMP = 3.741                # the clamp's line across each band (two half strips, measured)
CORNER = 5.519               # the corner plate's line
CHAMFER = 5.576              # the corner plate's chamfered inner corner (the vanilla rivet's place)


def quadrant(top):
    """Corner rivets in the +X -Y quadrant; the deck's layout is mirrored about X and Y."""
    c = [(MID + D, -FRAME + D), (4.36 - CH, -FRAME + D), (FRAME - D, -4.36 + CH), (FRAME - D, -MID - D)]
    if top:
        c += [(math.sqrt(RING ** 2 - (MID + D) ** 2), -MID - D), (MID + D, -math.sqrt(RING ** 2 - (MID + D) ** 2)),
              (MID - D, -FRAME + D), (MID - D, -math.sqrt(RING ** 2 - (MID - D) ** 2))]
        for y in (-MID + D, -SERVICE - D):
            c += [(FRAME - D, y), (math.sqrt(RING ** 2 - y ** 2), y)]
    else:
        c += [(MID + D, -PORT - D), (PORT + D, -MID - D), (MID - D, -FRAME + D), (MID - D, -PORT - D),
              (FRAME - D, -MID + D), (PORT + D, -MID + D)]
    # band plates: where the clamp and corner lines meet the deck edge, and the clamp meets the frame
    for x, y in ((CLAMP - D, -EDGE), (CLAMP + D, -EDGE), (CORNER - D, -EDGE), (CORNER + D, -EDGE),
                 (CLAMP - D, -FRAME - D), (CLAMP + D, -FRAME - D)):
        c += [(x, y), (-y, -x)]
    c += [(EDGE, -EDGE), (CHAMFER, -CHAMFER)]   # the corner plate's outer and inner corners
    return c


def candidates(top):
    return sorted({(round(sx * x, 3), round(sy * y, 3)) for x, y in quadrant(top) for sx in (1, -1) for sy in (1, -1)})


def trees():
    plat = bpy.data.objects[PLAT]
    out = []
    for o in [plat] + [o for o in plat.children_recursive if o.type == "MESH" and o.name != NAME]:
        bm = bmesh.new()
        bm.from_mesh(o.data)
        bm.transform(o.matrix_world)
        mats = [m.name if m else "" for m in o.data.materials]
        out.append((o.name, BVHTree.FromBMesh(bm), [mats[f.material_index] for f in bm.faces]))
        bm.free()
    return out


def plain(T, x, y, top):
    z0, dz, plane = (TOP + 0.5, -1, TOP) if top else (BOT - 0.5, 1, BOT)
    for ox, oy in ((0, 0), (0.026, 0), (-0.026, 0), (0, 0.026), (0, -0.026)):
        best = None
        for name, t, mats in T:
            h = t.ray_cast(Vector((x + ox, y + oy, z0)), Vector((0, 0, dz)), 2.0)
            if h[0] is not None and (best is None or h[3] < best[3]):
                best = (name, mats[h[2]], h[1], h[3], h[0])
        if best is None or best[0] != PLAT or best[1] != "PaintedMetal_Colorable" or abs(best[2].z) < 0.99 \
                or abs(best[4].z - plane) > 0.003:
            return False
    return True


def vanilla(r):
    """Take the vanilla rivets out of Platform; their centres join the plan."""
    me = bpy.data.objects[PLAT].data
    mats = [m.name for m in me.materials]
    bm, cnl, uvl = C["open_bm"](me)
    faces =[f for f in bm.faces if mats[f.material_index].startswith("Atlas3") and f.calc_area() < 0.0015
             and (f.calc_center_median().z > TOP - 0.05 or f.calc_center_median().z < BOT + 0.05)
             and all(r["u0"] - 0.005 <= lp[uvl].uv.x <= r["u1"] + 0.005 and r["v0"] - 0.005 <= lp[uvl].uv.y
                     <= r["v1"] + 0.005 for lp in f.loops)]
    seen = {}
    for f in faces:
        vs = [v.co for v in f.verts]
        c = (sum(v.x for v in vs) / len(vs), sum(v.y for v in vs) / len(vs), f.calc_center_median().z > -2.5)
        k = next((s for s in seen if s[2] == c[2] and math.hypot(s[0] - c[0], s[1] - c[1]) < 0.03), c)
        seen.setdefault(k, []).extend(vs)
    out = [((min(v.x for v in vs) + max(v.x for v in vs)) / 2, (min(v.y for v in vs) + max(v.y for v in vs)) / 2, top)
           for (_, _, top), vs in seen.items()]
    bmesh.ops.delete(bm, geom=faces, context="FACES")
    C["close_bm"](bm, me)
    return out


def kept():
    """Rivets already in Pl_DeckRivets (a rebuild): their centres, then the object goes."""
    o = bpy.data.objects.get(NAME)
    if o is None:
        return []
    me = o.data
    out = [(p.center.x, p.center.y, p.center.z > -2.5) for p in me.polygons]
    bpy.data.objects.remove(o, do_unlink=True)
    if me.users == 0:
        bpy.data.meshes.remove(me)
    return out


def rivets():
    plat = bpy.data.objects[PLAT]
    assert plat.matrix_world.is_identity
    r = {g["id"]: g for g in json.load(open(REGIONS))["Atlas3"]["regions"]}[PIECE]
    old = vanilla(r) + kept()
    T = trees()
    pts = {True: [], False: []}
    dropped = []
    for top in (True, False):
        for x, y in candidates(top):
            (pts[top] if plain(T, x, y, top) else dropped).append((x, y))
    # rivets there before that are not at a plate corner (more than 1.5 cm from every new one)
    gone = sum(1 for x, y, top in old if not any(math.hypot(x - a, y - b) < 0.015 for a, b in pts[top]))
    me = bpy.data.meshes.new(NAME)
    me.materials.append(bpy.data.materials[MAT])
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    quad = [(r["u0"], r["v0"]), (r["u1"], r["v0"]), (r["u1"], r["v1"]), (r["u0"], r["v1"])]
    corners = [(-1, -1), (1, -1), (1, 1), (-1, 1)]
    for top, z in ((True, TOP + OFF), (False, BOT - OFF)):
        for x, y in pts[top]:
            a = random.Random("%.3f,%.3f,%d" % (x, y, top)).uniform(0, 2 * math.pi)
            ca, sa = math.cos(a), math.sin(a)
            h = SIZE / 2
            vs = [bm.verts.new((x + h * (cx * ca - cy * sa), y + h * (cx * sa + cy * ca), z)) for cx, cy in corners]
            f = bm.faces.new(vs if top else vs[::-1])
            for lp, uv in zip(f.loops, quad if top else quad[::-1]):
                lp[uvl].uv = uv
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(NAME, me)
    for col in plat.users_collection:
        col.objects.link(o)
    o.parent = plat
    return dict(before=len(old), not_at_a_corner=gone, total={"top": len(pts[True]), "bottom": len(pts[False])},
                dropped=dropped)


CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
C = {}
exec(open(CP).read(), C)
