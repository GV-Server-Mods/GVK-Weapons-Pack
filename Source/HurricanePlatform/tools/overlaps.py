"""Coplanar faces (owner, 2026-11-09: "you have some bad z-fighting to fix, at least on the bottom of the bustle
dome"). Two faces in one plane, facing the same way, draw in turn and flicker in game. The game also stores each
vertex on a grid, about 1 mm per whole metre from the origin (3 mm at the gunhouse, 5.9 mm at the side walls), so
faces closer than that land in one plane too. A triangle-by-triangle check of every solid face in Main, with and
without that rounding, found these (Platform's own overlaps at its corners, z -2.895, are in Keen's original mesh
and stay):
- the sensor dome's bottom disc lay on its flange's bottom disc: the dome's disc goes (the flange closes it);
- the rear feed tube's end cap lay on its flange's end face: the cap goes;
- each side box sensor's lens lay on its bezel disc, and the periscope's lens on its window disc: the disc
  becomes a ring round the lens, through the lens rim's own points (a lens lifted off it would round back on);
- each side box had a corner split into two vertices 5 mm apart, with tiny inside-out faces between that the
  bevel laid over each other, and SideBox_R was split differently from SideBox_L: SideBox_L's pairs weld and the
  degenerate faces go, then SideBox_R is rebuilt as SideBox_L mirrored;
- on each side wall, both 45 degree braces kept Keen's two foot triangles under the quad that replaced them,
  joined to nothing else: they go;
- each keypad frame's recess floor lay 2.3 mm behind the jamb face that covers it, and the two round into one
  plane: the floor goes and the jamb face (the same paint) shows in the recess.
Run after the kitbash and deck steps, before finish.py:
    ns = {}; exec(open(path).read(), ns); report = ns["fix"]()
Running it again does nothing.
"""
import math

import bmesh
import bpy
from mathutils import Matrix, Vector
from mathutils.bvhtree import BVHTree
from mathutils.kdtree import KDTree

CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
DEC = ("Atlas", "Paneling", "Decals", "ButtonsAtlas", "TextAtlas")
KEYPADS = ("Pl_KeypadFrame_F", "Pl_KeypadFrame_B", "Pl_KeypadFrame_L", "Pl_KeypadFrame_R")


def _faces(o, test):
    """test(normal, centre, material name), in world space."""
    M, R = o.matrix_world, o.matrix_world.to_3x3()
    mats = [m.name if m else "" for m in o.data.materials]
    return lambda bm: [f for f in bm.faces
                       if test((R @ f.normal).normalized(), M @ f.calc_center_median(), mats[f.material_index])]


def _edit(o, fn, keep_normals=False):
    """Run fn on a bmesh of o; keep_normals carries custom normals through (cargo_ports' _cn layer)."""
    if keep_normals:
        C = {}
        exec(open(CP).read(), C)
        bm, _, _ = C["open_bm"](o.data)
        n = fn(bm)
        if n:
            C["close_bm"](bm, o.data)
            o.data.update()
        else:
            bm.free()
            o.data.attributes.remove(o.data.attributes["_cn"])
        return n
    bm = bmesh.new()
    bm.from_mesh(o.data)
    n = fn(bm)
    if n:
        bm.to_mesh(o.data)
        o.data.update()
    bm.free()
    return n


def _drop(name, test, keep_largest=False):
    """Remove the faces matching test (all but the largest with keep_largest)."""
    o = bpy.data.objects[name]

    def fn(bm):
        fs = sorted(_faces(o, test)(bm), key=lambda f: f.calc_area())
        if keep_largest:
            fs = fs[:-1]
        bmesh.ops.delete(bm, geom=fs, context="FACES_ONLY")
        return len(fs)
    return _edit(o, fn)


def _ring(outer_name, outer_test, lens_name, lens_test):
    """Replace the outer disc by a ring whose inner edge runs through the lens rim's points."""
    oo, lo = bpy.data.objects[outer_name], bpy.data.objects[lens_name]
    lb = bmesh.new()
    lb.from_mesh(lo.data)
    lf = _faces(lo, lens_test)(lb)
    if len(lf) != 1:
        lb.free()
        return 0
    rim = [lo.matrix_world @ v.co for v in lf[0].verts]
    lb.free()
    Oi = oo.matrix_world.inverted()
    rim = [Oi @ p for p in rim]

    def fn(bm):
        fs = [f for f in _faces(oo, outer_test)(bm) if f.calc_area() > 1e-6]
        if len(fs) != 1 or len(fs[0].verts) != len(rim):
            return 0
        f = fs[0]
        uvl = bm.loops.layers.uv.active
        c = f.calc_center_median()
        n = f.normal.copy()
        a = (f.verts[0].co - c).normalized()
        b = n.cross(a)
        ang = lambda p: math.atan2((p - c).dot(b), (p - c).dot(a)) % (2 * math.pi)
        outer = sorted(((ang(l.vert.co), l.vert, l[uvl].uv.copy()) for l in f.loops), key=lambda t: t[0])
        inner = sorted(((ang(p), p) for p in rim), key=lambda t: t[0])
        cuv = sum((t[2] for t in outer), Vector((0, 0))) / len(outer)
        k = sum(((p - c).length for _, p in inner)) / sum(((v.co - c).length for _, v, _ in outer))
        mat, smooth = f.material_index, f.smooth
        bm.faces.remove(f)
        w = [bm.verts.new(p) for _, p in inner]
        N = len(outer)
        for i in range(N):
            j = (i + 1) % N
            g = bm.faces.new((outer[i][1], outer[j][1], w[j], w[i]))
            g.material_index, g.smooth = mat, smooth
            g.normal_update()
            if g.normal.dot(n) < 0:
                g.normal_flip()
            uv = {outer[i][1]: outer[i][2], outer[j][1]: outer[j][2],
                  w[i]: cuv + (outer[i][2] - cuv) * k, w[j]: cuv + (outer[j][2] - cuv) * k}
            for l in g.loops:
                l[uvl].uv = uv[l.vert]
        return N
    return _edit(oo, fn)


def _weld_folds(name, dist=0.008):
    """Weld vertex pairs closer than dist onto the one the larger face uses, then drop the faces that collapse."""
    o = bpy.data.objects[name]
    M = o.matrix_world

    def fn(bm):
        big = lambda v: max((f.calc_area() for f in v.link_faces), default=0)
        vs = list(bm.verts)
        pairs = [(a, b) for i, a in enumerate(vs) for b in vs[i + 1:] if ((M @ a.co) - (M @ b.co)).length < dist]
        for a, b in pairs:
            keep = a if big(a) >= big(b) else b
            bmesh.ops.pointmerge(bm, verts=[a, b], merge_co=keep.co.copy())
        if pairs:
            bmesh.ops.dissolve_degenerate(bm, dist=1e-6, edges=list(bm.edges))
            bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.calc_area() < 1e-10], context="FACES")
        return len(pairs)
    return _edit(o, fn)


def _faceset(o, flip_x):
    M = o.matrix_world
    s = Vector((-1 if flip_x else 1, 1, 1))
    return {frozenset(tuple(round(x, 3) for x in (M @ o.data.vertices[i].co) * s) for i in p.vertices)
            for p in o.data.polygons}


def _mirror_of(name, twin):
    """Rebuild name as twin mirrored across x = 0 (faces, materials, UVs and sharp edges), unless it already is."""
    o, t = bpy.data.objects[name], bpy.data.objects[twin]
    if _faceset(o, False) == _faceset(t, True):
        return 0
    assert [m.name for m in o.data.materials] == [m.name for m in t.data.materials]
    S = o.matrix_world.inverted() @ Matrix.Scale(-1, 4, Vector((1, 0, 0))) @ t.matrix_world
    bm = bmesh.new()
    bm.from_mesh(t.data)
    for v in bm.verts:
        v.co = S @ v.co
    for f in bm.faces:
        f.normal_flip()           # the mirror turns every face inside out; reversing the loops turns it back
    bm.to_mesh(o.data)
    bm.free()
    o.data.update()
    return len(o.data.polygons)


def _platform_orphans(name="Platform", tol=0.0015):
    """Drop solid faces with two or more open edges lying in the plane of, and inside, a better joined solid face."""
    o = bpy.data.objects[name]
    mats = [m.name for m in o.data.materials]
    solid = lambda f: not mats[f.material_index].startswith(DEC)

    def fn(bm):
        bm.faces.ensure_lookup_table()
        bnd = {f.index: sum(1 for e in f.edges if sum(1 for g in e.link_faces if solid(g)) == 1)
               for f in bm.faces if solid(f)}
        kd = KDTree(len(bm.faces))
        for f in bm.faces:
            kd.insert(f.calc_center_median(), f.index)
        kd.balance()
        gone = []
        for i, nb in bnd.items():
            if nb < 2:
                continue
            f = bm.faces[i]
            c = f.calc_center_median()
            r = max((v.co - c).length for v in f.verts)
            pts = [c.lerp(v.co, 0.8) for v in f.verts] + [c]      # corners pulled 20% in, and the centre
            for _, j, _ in kd.find_range(c, r + 0.5):
                if j == i or j not in bnd or bnd[j] >= nb:
                    continue
                g = bm.faces[j]
                if f.normal.dot(g.normal) < 0.9995 or any(abs(g.normal.dot(p - g.verts[0].co)) > tol for p in pts):
                    continue
                bv = BVHTree.FromPolygons([v.co for v in g.verts], [list(range(len(g.verts)))])
                if all((bv.find_nearest(p)[0] - p).length < tol for p in pts):
                    gone.append(f)
                    break
        bmesh.ops.delete(bm, geom=gone, context="FACES")
        return len(gone)
    return _edit(o, fn, keep_normals=True)


def _keypad_floors(cover="Platform", gap=0.006):
    """Drop each keypad frame's outward faces that lie wholly behind a cover face facing the same way, less than gap
    behind it: the recess floor and the round of its edge, which the rounding lays into the cover's plane."""
    P = bpy.data.objects[cover]
    assert P.matrix_world.is_identity
    bp = BVHTree.FromObject(P, bpy.context.evaluated_depsgraph_get())
    rep = {}
    for name in KEYPADS:
        o = bpy.data.objects[name]
        M, R = o.matrix_world, o.matrix_world.to_3x3()
        c0 = sum((M @ v.co for v in o.data.vertices), Vector()) / len(o.data.vertices)
        ax = max(range(3), key=lambda k: abs(c0[k]))
        out = Vector()
        out[ax] = 1 if c0[ax] > 0 else -1

        def covered(p):
            _, hn, _, d = bp.ray_cast(p, out, gap)
            return d is not None and hn.dot(out) > 0.999

        def fn(bm):
            gone = []
            for f in bm.faces:
                if (R @ f.normal).normalized().dot(out) < 0.5:
                    continue
                c = M @ f.calc_center_median()
                if all(covered(p + out * 1e-5) for p in [c.lerp(M @ v.co, 0.9) for v in f.verts] + [c]):
                    gone.append(f)
            bmesh.ops.delete(bm, geom=gone, context="FACES")
            return len(gone)
        rep[name] = _edit(o, fn, keep_normals=True)
    return rep


def fix():
    rep = {}
    rep["dome_cap"] = _drop("SensorDome", lambda n, c, m: n.z < -0.99 and abs(c.z - 2.93) < 0.01)
    rep["feed_tube_cap"] = _drop("RearFeedTube", lambda n, c, m: n.x > 0.99 and abs(c.x - 1.22) < 0.01, True)
    for s, side in ((1, "L"), (-1, "R")):
        at = lambda n, c, s=s: n.y > 0.99 and abs(c.y + 2.127) < 0.01 and abs(c.x - s * 3.861) < 0.02
        rep["sensor_" + side] = _ring("SideBoxSensor_" + side, lambda n, c, m, at=at: at(n, c) and m != "CameraLens",
                                      "SideBoxSensor_" + side, lambda n, c, m, at=at: at(n, c) and m == "CameraLens")
    at = lambda n, c: n.y > 0.95 and abs(c.z - 3.24) < 0.05 and abs(c.x + 2.56) < 0.02
    rep["periscope"] = _ring("Periscope", lambda n, c, m: at(n, c), "PeriscopeLens", lambda n, c, m: at(n, c))
    rep["sidebox_L_welds"] = _weld_folds("SideBox_L")
    rep["sidebox_R"] = _mirror_of("SideBox_R", "SideBox_L")
    rep["brace_feet"] = _platform_orphans()
    rep["keypad_floors"] = _keypad_floors()
    return rep
