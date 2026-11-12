"""Buried-face cull, per scene after the split (owner asked for it, 2026-11-03; done after the split, 2026-11-09).

A face goes when its centre and every corner, nudged 0.5 mm out along its normal, lie inside one closed solid of
the same scene (se-dev-seut bpy-recipes.md, "Buried faces"). Each scene holds one moving group, so no turn can
show a face cut here. Closed solid: a connected island whose every edge has two faces. Inside: an odd number of
hits along two rays. Decal and glass faces are never cut and never count as solid. Vanilla parts and highlight
meshes are never cut (they still hide faces of other parts).

    ns = {}; exec(open(path).read(), ns); report = ns["cull"](dry=True)

dry=False deletes the faces (plus the loose edges and vertices left) and sets each kept corner's normal back.
"""
import bmesh
import bpy
import numpy as np
from mathutils import Vector
from mathutils.bvhtree import BVHTree

SNAP = r"C:\Users\blayl\.claude\skills\se-dev-seut\scripts\decal_snap.py"
SCENES = ("GVK_HurricaneTurret", "GVK_HurricaneTurret_Az", "GVK_HurricaneTurret_El", "GVK_HurricaneTurret_Barrel_1",
          "GVK_HurricaneTurret_Barrel_2")
KEEP = ("Platform", "Pl_Port_", "Pl_PortFrame_", "Pl_Keypad", "Pl_CargoHatch_")   # vanilla parts, highlight meshes
NUDGE = 0.0005
RAYS = (Vector((0.31, 0.52, 0.80)).normalized(), Vector((-0.62, 0.21, -0.75)).normalized())


def _hits(bvh, p, d):
    n = 0
    for _ in range(64):
        hit = bvh.ray_cast(p, d)
        if hit[0] is None:
            return n
        n += 1
        p = hit[0] + d * 1e-6
    return n


def _islands(o, skip):
    """Closed islands of o's solid faces: [(bvh, lo, hi)], and each solid face's island id."""
    bm = bmesh.new()
    bm.from_mesh(o.data)
    bm.transform(o.matrix_world)
    bm.faces.ensure_lookup_table()
    solid = [f for f in bm.faces if not skip(f.material_index)]
    seen, out, owner = set(), [], {}
    for f0 in solid:
        if f0.index in seen:
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
        closed = all(len([g for g in e.link_faces if g.index in ids]) == 2 for f in faces for e in f.edges)
        k = len(out) if closed else None
        for f in faces:
            owner[f.index] = k
        if closed:
            vs = list({v for f in faces for v in f.verts})
            ix = {v: i for i, v in enumerate(vs)}
            co = [v.co.copy() for v in vs]
            bvh = BVHTree.FromPolygons(co, [[ix[v] for v in f.verts] for f in faces])
            a = np.array(co)
            out.append((bvh, a.min(0) - 1e-4, a.max(0) + 1e-4))
    bm.free()
    return out, owner


def cull(dry=True, scenes=SCENES):
    S = {}
    exec(open(SNAP).read(), S)
    win = bpy.context.window
    home = win.scene
    report = {}
    for name in scenes:
        sc = bpy.data.scenes[name]
        win.scene = sc
        objs = sorted((o for o in sc.objects if o.type == "MESH"), key=lambda o: o.name)
        skips, solids, owners = {}, [], {}
        for o in objs:
            k = [S["tech"](m) for m in o.data.materials]
            skips[o.name] = lambda i, k=k: (k[i] if i < len(k) else "") in S["DEC"] | {"GLASS"}
            isl, own = _islands(o, skips[o.name])
            owners[o.name] = (len(solids), own)
            solids += isl
        per = {}
        for o in objs:
            if o.name.startswith(KEEP):
                continue
            base, own = owners[o.name]
            me = o.data
            M = o.matrix_world
            R = M.to_3x3()
            cut = []
            for p in me.polygons:
                if skips[o.name](p.material_index):
                    continue
                mine = None if own.get(p.index) is None else base + own[p.index]
                n = (R @ p.normal).normalized()
                pts = [M @ me.vertices[v].co + n * NUDGE for v in p.vertices] + [M @ p.center + n * NUDGE]
                a = np.array(pts)
                lo, hi = a.min(0), a.max(0)
                for j, (bvh, blo, bhi) in enumerate(solids):
                    if j == mine or (lo < blo).any() or (hi > bhi).any():
                        continue
                    if all(_hits(bvh, q, d) % 2 for q in pts for d in RAYS):
                        cut.append(p.index)
                        break
            if not cut:
                continue
            tris = sum(len(me.polygons[i].vertices) - 2 for i in cut)
            per[o.name] = (len(cut), tris)
            if not dry:
                _delete(me, set(cut))
        report[name[20:] or "main"] = per
    win.scene = home
    return report


def _delete(me, cut):
    cn = [tuple(c.vector) for c in me.corner_normals]
    keep = [tuple(cn[li] for li in p.loop_indices) for p in me.polygons if p.index not in cut]
    custom = me.has_custom_normals
    bm = bmesh.new()
    bm.from_mesh(me)
    bm.faces.ensure_lookup_table()
    bmesh.ops.delete(bm, geom=[bm.faces[i] for i in sorted(cut)], context="FACES_ONLY")
    bmesh.ops.delete(bm, geom=[e for e in bm.edges if not e.link_faces], context="EDGES")
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_edges], context="VERTS")
    bm.to_mesh(me)
    bm.free()
    if custom:
        me.normals_split_custom_set([n for f in keep for n in f])
    me.update()
