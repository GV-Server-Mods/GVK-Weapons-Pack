"""Second buried-face pass (owner, 2026-11-10: "Do your triangles except the cradle"). Dry by default.

sight(scene): a face goes when no line of sight leaves it. From its centre, corners and edge midpoints, nudged
0.5 mm out, every one of N rays over the hemisphere in front of it hits an opaque face of its own scene (decals and
glass do not block). Only the scene's own parts block, so it stays hidden at every pose. Run on the main scene
(highlight meshes left whole: the outline is drawn from the whole mesh) and the azimuth scene.

inside(pkl): a face whose centre and corners, nudged 0.5 mm out, lie inside one closed solid (cull.py's test). The
solids come from the pre-cull checkpoint, where they are still closed (export_solids, run in that file), except the
trimmed parts, which take their current shape. Covers the main and azimuth scenes' decals, the platform, and each
barrel's faces inside the cradle's solids at every recoil position from 0 to 2 m.

The cradle scene (El) is left as it is (owner).

sight() only proposes: its rays stop on the back of a face, but the game does not draw back faces, so a player sees
through a single-sided panel from behind. On the base, 1,244 faces passed it and 211 of them show in game-like renders
(a first cut that trusted it opened thin strips along the side frames and the deck edge). So every candidate goes
through face_id_views.py, and only faces that never show in any of its 1,700 renders are cut.

    ns = {}; exec(open(path).read(), ns); ns["export_solids"](pkl)        # in HurricanePlatform_before_cull.blend
    plan = ns["merge"](ns["sight"](P), ns["sight"](P + "_Az"), ns["inside"](pkl))
    # per scene: drop every (object, polygon) face_id_views.run() saw, decals=False and decals=True
    ns["cut"](plan, cull_py)
"""
import math
import pickle
import random

import bmesh
import bpy
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

SNAP = r"C:\Users\blayl\.claude\skills\se-dev-seut\scripts\decal_snap.py"
P = "GVK_HurricaneTurret"
SCENES = (P, P + "_Az", P + "_El", P + "_Barrel_1", P + "_Barrel_2")
HIGHLIGHT = ("Pl_Port_", "Pl_PortFrame_", "Pl_Keypad", "Pl_CargoHatch_")
TRIMMED = ("RearPipes", "RearGrilleHandles", "RearHoseFittings")
NUDGE = 0.0005
RAYS = (Vector((0.31, 0.52, 0.80)).normalized(), Vector((-0.62, 0.21, -0.75)).normalized())
RECOIL = [x * 0.05 for x in range(41)]


def _ns():
    S = {}
    exec(open(SNAP).read(), S)
    return S


def _kind(S, me):
    k = [S["tech"](m) for m in me.materials]
    return lambda i: k[i] if i < len(k) else ""


def _hemi(n, seed):
    g = math.pi * (3 - math.sqrt(5))
    d = []
    for i in range(n):
        z = 1 - (i + 0.5) / n
        r = math.sqrt(1 - z * z)
        d.append((r * math.cos(g * i), r * math.sin(g * i), z))
    random.Random(seed).shuffle(d)          # spread the first rays over the whole hemisphere
    return np.array(d)


def _frame(n, twist):
    a = np.array([1.0, 0, 0]) if abs(n[0]) < 0.9 else np.array([0, 1.0, 0])
    u = np.cross(n, a)
    u /= np.linalg.norm(u)
    v = np.cross(n, u)
    c, s = math.cos(twist), math.sin(twist)
    return np.array([c * u + s * v, -s * u + c * v, n]).T


def sight(name, N=2048):
    S = _ns()
    H = _hemi(N, 7)
    rnd = random.Random(11)
    win = bpy.context.window
    home = win.scene
    sc = bpy.data.scenes[name]
    win.scene = sc
    bpy.context.evaluated_depsgraph_get()
    V, F, faces, b = [], [], [], 0
    for o in sorted((o for o in sc.objects if o.type == "MESH"), key=lambda o: o.name):
        me = o.data
        M = np.array(o.matrix_world)
        R, t = M[:3, :3], M[:3, 3]
        kind = _kind(S, me)
        W = np.array([v.co for v in me.vertices]) @ R.T + t
        V.append(W)
        for p in me.polygons:
            tk = kind(p.material_index)
            if tk == "GLASS":
                continue
            if tk not in S["DEC"]:
                F.append([b + i for i in p.vertices])
            if o.name.startswith(HIGHLIGHT):
                continue
            n = R @ np.array(p.normal)
            n /= np.linalg.norm(n)
            C = W[list(p.vertices)]
            pts = np.vstack([C.mean(0), C, (C + np.roll(C, -1, 0)) / 2]) + n * NUDGE
            faces.append((o.name, p.index, pts, n))
        b += len(W)
    bvh = BVHTree.FromPolygons([Vector(v) for v in np.concatenate(V)], F)
    out = {}
    for o, i, pts, n in faces:
        shut = True
        for q in pts:
            q = Vector(q)
            D = H @ _frame(n, rnd.random() * 2 * math.pi).T
            if any(bvh.ray_cast(q, Vector(d))[0] is None for d in D):
                shut = False
                break
        if shut:
            out.setdefault(o, set()).add(i)
    win.scene = home
    return {name: out}


def _closed(me, M, skip):
    bm = bmesh.new()
    bm.from_mesh(me)
    bm.transform(M)
    bm.faces.ensure_lookup_table()
    seen, out = set(), []
    for f0 in bm.faces:
        if f0.index in seen or skip(f0.material_index):
            continue
        stack, faces = [f0], []
        seen.add(f0.index)
        while stack:
            f = stack.pop()
            faces.append(f)
            for e in f.edges:
                for g in e.link_faces:
                    if g.index not in seen and not skip(g.material_index):
                        seen.add(g.index)
                        stack.append(g)
        ids = {f.index for f in faces}
        if all(len([g for g in e.link_faces if g.index in ids]) == 2 for f in faces for e in f.edges):
            vs = list({v for f in faces for v in f.verts})
            ix = {v: i for i, v in enumerate(vs)}
            out.append((np.array([tuple(v.co) for v in vs]), [[ix[v] for v in f.verts] for f in faces]))
    bm.free()
    return out


def _solids(sc, S, only=None):
    win = bpy.context.window
    win.scene = sc
    dg = bpy.context.evaluated_depsgraph_get()
    lst = []
    for o in sorted((o for o in sc.objects if o.type == "MESH"), key=lambda o: o.name):
        if only is None or o.name in only:
            ev = o.evaluated_get(dg)
            me = ev.to_mesh()
            kind = _kind(S, me)
            lst += [(o.name, V, F) for V, F in _closed(me, ev.matrix_world.copy(),
                                                       lambda i: kind(i) in S["DEC"] | {"GLASS"})]
            ev.to_mesh_clear()
    return lst


def export_solids(pkl):
    """Run in the pre-cull checkpoint: every closed solid per scene, modifiers evaluated."""
    S = _ns()
    home = bpy.context.window.scene
    data = {name: _solids(bpy.data.scenes[name], S) for name in SCENES}
    bpy.context.window.scene = home
    pickle.dump(data, open(pkl, "wb"))
    return {k: len(v) for k, v in data.items()}


def _hits(bvh, p, d):
    n = 0
    for _ in range(64):
        hit = bvh.ray_cast(p, d)
        if hit[0] is None:
            return n
        n += 1
        p = hit[0] + d * 1e-6
    return n


def _pack(lst):
    return ([(o, BVHTree.FromPolygons([Vector(v) for v in V], F)) for o, V, F in lst],
            np.array([V.min(0) - 1e-4 for o, V, F in lst]), np.array([V.max(0) + 1e-4 for o, V, F in lst]))


def _in(pts, pk, excl=None):
    sols, LO, HI = pk
    mn, mx = pts.min(0), pts.max(0)
    for j in np.nonzero((LO <= mn).all(1) & (HI >= mx).all(1))[0]:
        if sols[j][0] != excl and all(_hits(sols[j][1], Vector(q), d) % 2 for q in pts for d in RAYS):
            return True
    return False


def _cands(sc, S, want):
    win = bpy.context.window
    win.scene = sc
    bpy.context.evaluated_depsgraph_get()
    out = []
    for o in sorted((o for o in sc.objects if o.type == "MESH"), key=lambda o: o.name):
        me = o.data
        M = np.array(o.matrix_world)
        R, t = M[:3, :3], M[:3, 3]
        kind = _kind(S, me)
        W = np.array([v.co for v in me.vertices]) @ R.T + t
        for p in me.polygons:
            tk = kind(p.material_index)
            if tk == "GLASS" or o.name.startswith(HIGHLIGHT) or not want(o.name, tk in S["DEC"]):
                continue
            n = R @ np.array(p.normal)
            n /= np.linalg.norm(n)
            C = W[list(p.vertices)]
            out.append((o.name, p.index, np.vstack([C, C.mean(0)]) + n * NUDGE))
    return out


def inside(pkl):
    S = _ns()
    home = bpy.context.window.scene
    data = pickle.load(open(pkl, "rb"))
    for name in SCENES:
        data[name] = [x for x in data[name] if x[0] not in TRIMMED] + _solids(bpy.data.scenes[name], S, TRIMMED)
    out = {}
    for name in (P, P + "_Az"):           # decals, and the platform the first cull left whole
        pk = _pack(data[name])
        for o, i, pts in _cands(bpy.data.scenes[name], S, lambda o, dec: dec or o == "Platform"):
            if _in(pts, pk, excl=o):
                out.setdefault(name, {}).setdefault(o, set()).add(i)
    el = _pack(data[P + "_El"])
    for e in bpy.data.scenes[P + "_El"].objects:  # barrels inside the cradle at every recoil position
        ls = getattr(e.seut, "linkedScene", None) if e.type == "EMPTY" else None
        if ls is None:
            continue
        eb = np.array(e.location)
        for o, i, pts in _cands(ls, S, lambda o, dec: True):
            if all(_in(eb + np.array([0, -s, 0]) + pts, el) for s in RECOIL):
                out.setdefault(ls.name, {}).setdefault(o, set()).add(i)
    bpy.context.window.scene = home
    return out


def merge(*plans):
    out = {}
    for pl in plans:
        for sc, objs in pl.items():
            for o, ids in objs.items():
                out.setdefault(sc, {}).setdefault(o, set()).update(ids)
    return out


def count(plan):
    return {sc[20:] or "main": {o: sum(len(bpy.data.objects[o].data.polygons[i].vertices) - 2 for i in ids)
                                for o, ids in objs.items()} for sc, objs in plan.items()}


def cut(plan, cull_path):
    cu = {}
    exec(open(cull_path).read(), cu)
    for sc, objs in plan.items():
        for o, ids in objs.items():
            cu["_delete"](bpy.data.objects[o].data, set(ids))
