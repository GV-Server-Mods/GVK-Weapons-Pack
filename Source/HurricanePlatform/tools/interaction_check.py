"""Mount faces and interaction points of the Hurricane turret (design.md step 8). Changes nothing.
    ns = {}; exec(open(path).read(), ns); report = ns["check"]()
- mount: how far the base mesh falls short of each mount face (bottom row of each side, the whole bottom), per face
- conveyors: each detector_conveyor_* by the game's rule (MyConveyorLine.GetBlockLinePositions): the cell that holds
  the empty's position, and the dominant axis of its offset from that cell's centre; the neighbour must lie outside
- cover: for every detector, the share of its highlight mesh inside the empty (in the empty's own axes), and whether
  the mesh shares the empty's parent (W007)
"""
import bpy
from mathutils import Vector

P = "GVK_HurricaneTurret"
CELL = 2.5
SIZE = (5, 5, 3)                                   # cells, Blender x y z
LO = Vector([-n * CELL / 2 for n in SIZE])


def world(o):
    m = o.matrix_parent_inverse @ o.matrix_basis
    return world(o.parent) @ m if o.parent else m


def pts(o):
    m = world(o)
    return [m @ v.co for v in o.data.vertices]


def cell_of(p):
    return tuple(min(SIZE[i] - 1, max(0, int((p[i] - LO[i]) // CELL))) for i in range(3))


def check():
    sc = bpy.data.scenes[P]
    objs = list(sc.objects)
    root = bpy.data.objects["Platform"]
    base = [p for o in objs if o.type == "MESH" and o.name.startswith(("Platform", "Pl_")) and o.users_collection
            and o.users_collection[0].name.startswith("Main") for p in pts(o)]
    hi = -LO
    row = LO.z + CELL
    mount = {
        "bottom": min(p.z for p in base) - LO.z,
        "front -Y": min(p.y for p in base if p.z <= row) - LO.y,
        "back +Y": hi.y - max(p.y for p in base if p.z <= row),
        "left +X": hi.x - max(p.x for p in base if p.z <= row),
        "right -X": min(p.x for p in base if p.z <= row) - LO.x,
    }
    conv = []
    for e in sorted((o for o in objs if o.name.startswith("detector_conveyor")), key=lambda o: o.name):
        p = world(e).translation
        c = cell_of(p)
        off = p - (LO + Vector([(c[i] + 0.5) * CELL for i in range(3)]))
        ax = max(range(3), key=lambda i: abs(off[i]))
        n = list(c)
        n[ax] += 1 if off[ax] > 0 else -1
        conv.append((e.name, c, "+-"[off[ax] < 0] + "XYZ"[ax], round(abs(off[ax]), 2),
                     not all(0 <= n[i] < SIZE[i] for i in range(3))))
    cover = []
    for e in sorted((o for o in objs if o.name.startswith("detector_")), key=lambda o: o.name):
        inv = world(e).inverted()
        d = e.empty_display_size
        for name in (e.get("highlight") or "").split(";"):
            m = bpy.data.objects.get(name)
            if m is None:
                cover.append((e.name, name, "missing"))
                continue
            loc = [inv @ p for p in pts(m)]
            inside = sum(all(abs(q[i]) <= d * 1.0001 for i in range(3)) for q in loc) / len(loc)
            reach = [round(max(abs(q[i]) for q in loc) / d, 2) for i in range(3)]
            cover.append((e.name, name, round(inside, 3), reach, m.parent is e.parent))
    return dict(mount={k: round(v, 3) for k, v in mount.items()}, conveyors=conv, cover=cover,
                root_children=len(root.children))
