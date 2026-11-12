"""The gunhouse cheek seams carried down to the bottom edge (owner, 2026-11-09: "there is a seam on the gunhouse
cheeks that I'd like to continue all the way down").

Each cheek's inner edge has a seam round the embrasure's rounded edge from the roof down to the embrasure's
bottom (z 0.68). Below that the cheek meets the chin's side in an inside corner, and the seam stopped. cheek_lines()
lays it on down that corner to the seam along the glacis' bottom edge: the half of the groove that shows on the
cheek (V 0.4834 to 0.5, the same rows at the same x as the line above, V rising towards the corner), joined to the
old end's corners, U carried on at the line's scale. It ends in a mitre into the bottom seam (outer side on its near
edge, the groove's centre on its centre line), 1 mm above it and drawn after it.
Run after assemble.py, before finish.py (which snaps it):
    ns = {}; exec(open(path).read(), ns); report = ns["cheek_lines"]()
Running it again does nothing.
"""
import bpy
from mathutils import Vector
from mathutils.bvhtree import BVHTree

CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
DEC = "GH_Dec_Atlas4_Colorable_Az"
HULL = "Gunhouse"
GLACIS = 9                   # the hull face whose parts outside the embrasure are the cheeks
ROWS = ((3.2197, 0.4834), (3.2109, 0.4917), (3.1992, 0.5))     # |x| and V across the strip, as the line above
TOP_Z = 0.68                 # the old end: the embrasure's bottom
LIFT = 0.0015
OVER = 0.001                 # the mitre lies this much above the bottom seam
U_PER_M = 0.7378             # the line's own U scale
STEPS = (0.01, 0.02, 0.03, 0.04)   # short quads over the embrasure corner's bevel, then one long one


def cheek_lines():
    d = bpy.data.objects[DEC]
    assert d.matrix_world.is_identity
    me = d.data
    g = bpy.data.objects[HULL]
    G, Gi, Gr = g.matrix_world, g.matrix_world.inverted(), g.matrix_world.to_3x3()
    bvh = BVHTree.FromObject(g, bpy.context.evaluated_depsgraph_get())

    def hull(p):
        loc, n, _, _ = bvh.find_nearest(Gi @ p)
        return G @ loc, (Gr @ n).normalized()

    def lifted(p, lift):
        q, n = hull(p)
        return q + n * lift

    gp = g.data.polygons[GLACIS]
    n9 = (Gr @ gp.normal).normalized()
    d9 = n9.dot(G @ g.data.vertices[gp.vertices[0]].co)
    down = Vector((0, n9.z, -n9.y))
    if down.z > 0:
        down = -down
    C = {}
    exec(open(CP).read(), C)
    bm, cnl, uvl = C["open_bm"](me)
    if any(3.19 < abs(c.x) < 3.23 and -0.12 < c.z < 0.6 for c in (f.calc_center_median() for f in bm.faces)):
        C["close_bm"](bm, me)
        return dict(done=True)
    made = {}
    for s in (1, -1):
        def corner(xa, va, zlo, zhi, ylo, yhi):
            for f in bm.faces:
                for l in f.loops:
                    co = l.vert.co
                    if abs(co.x - s * xa) < 6e-4 and abs(l[uvl].uv.y - va) < 3e-4 and zlo < co.z < zhi \
                            and ylo < co.y < yhi:
                        return l.vert, l[uvl].uv.x
            raise LookupError((s, xa, va, zlo, zhi))
        top = [corner(x, v, TOP_Z - 0.006, TOP_Z + 0.003, -3.06, -3.04) for x, v in ROWS]
        u0 = top[0][1]
        # U runs down the line away from the old end's next corner up the strip
        sign = 1 if corner(*ROWS[0], TOP_Z + 0.003, TOP_Z + 0.02, -3.06, -3.03)[1] < u0 else -1
        ends = [corner(x, v, -0.17, -0.125, -3.63, -3.6)[0].co.copy() for x, v in ROWS]
        p_top = top[0][0].co.copy()
        span = (ends[0].z - p_top.z) / down.z      # down to where the outer side meets the bottom seam's near edge
        grid = [[(v, u0) for v, _ in top]]
        for t in [t for t in STEPS if t < span - 0.05] + [span]:
            row = []
            for x, _ in ROWS:
                p = p_top + down * t
                p.x = s * x
                p += n9 * (d9 - n9.dot(p))            # onto the glacis plane, then onto the bevelled hull
                row.append((bm.verts.new(lifted(p, LIFT)), u0 + sign * t * U_PER_M))
            grid.append(row)
        last = grid[-1]
        bm.verts.remove(last[0][0])
        last[0] = (bm.verts.new(lifted(ends[0], LIFT + OVER)), last[0][1])   # the outer side stops on the near edge
        tip = []
        for co, (lv, lu) in zip(ends[1:], last[1:]):
            p = lifted(co, LIFT + OVER)
            tip.append((bm.verts.new(p), lu + sign * (p - lv.co).length * U_PER_M))
        V = [v for _, v in ROWS]
        new = []

        def face(pts):
            f = bm.faces.new([v for v, _, _ in pts])
            f.material_index = 0
            f.normal_update()
            if f.normal.dot(hull(f.calc_center_median())[1]) < 0:
                f.normal_flip()
            uvs = {v: (u, vv) for v, u, vv in pts}
            for l in f.loops:
                l[uvl].uv = uvs[l.vert]
                l[cnl] = f.normal
            new.append(f)
        for a, b in zip(grid, grid[1:]):
            for j in range(2):
                face([(a[j][0], a[j][1], V[j]), (b[j][0], b[j][1], V[j]),
                      (b[j + 1][0], b[j + 1][1], V[j + 1]), (a[j + 1][0], a[j + 1][1], V[j + 1])])
        face([(last[0][0], last[0][1], V[0]), (tip[0][0], tip[0][1], V[1]), (last[1][0], last[1][1], V[1])])
        face([(last[1][0], last[1][1], V[1]), (tip[0][0], tip[0][1], V[1]), (tip[1][0], tip[1][1], V[2]),
              (last[2][0], last[2][1], V[2])])
        made["+x" if s > 0 else "-x"] = dict(faces=len(new), length=round(span, 3), u0=round(u0, 4), sign=sign)
    C["close_bm"](bm, me)
    me.update()
    return made
