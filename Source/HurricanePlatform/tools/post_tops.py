"""The corner posts' tops closed (owner, 2026-11-09, with an in-game screenshot: "you have some broken surfaces at the
top of the side edges on all 4 corners").

Each corner post ends 1 cm under the side band in a rounded bevel ring and a cap under the band. build_platform.py
widened the posts by 12 cm by moving their vertices along the wall, but the ring's triangles shared vertices that
moved with ones that did not, so some came out stretched over others and some gaps opened, which looked into the
block. tops() removes each post's ring and cap and builds them again on the widened post's outline: the ring runs
from the side faces' top edge 9.7 mm in and 10.4 mm up (vanilla's bevel), and the cap closes it under the band.
The ring's texture carries on from the side face below it.
Run after build_platform.py, before finish.py and shade_pass.py:
    ns = {}; exec(open(path).read(), ns); report = ns["tops"]()
Running it again does nothing.
"""
import bmesh
import bpy
import numpy as np
from mathutils import Vector

CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
PLAT = "Platform"
DEC = ("Atlas", "Paneling", "Decals", "ButtonsAtlas", "TextAtlas")
FOOT = -1.7768              # the side faces' top edge, where the ring starts
TOP = -1.7664               # the ring's top and the cap
INSET = 0.0097
NEAR = 5.9                  # a corner's region: |x| and |y| past this
INNER = 6.09                # vanilla's own inner post corner lies inside both arms, under the cap
DONE = "post_tops_done"


def _uv_map(f, uvl):
    """The face's UV as an affine map of (along, z) in its own plane: returns (e1, A, c)."""
    e1 = f.normal.cross(Vector((0, 0, 1))).normalized()
    P = np.array([[l.vert.co.dot(e1), l.vert.co.z, 1.0] for l in f.loops])
    U = np.array([tuple(l[uvl].uv) for l in f.loops])
    sol, *_ = np.linalg.lstsq(P, U, rcond=None)
    return e1, sol


def tops():
    o = bpy.data.objects[PLAT]
    assert o.matrix_world.is_identity
    me = o.data
    if me.get(DONE):
        return dict(done=True)
    mats = [m.name for m in me.materials]
    solid = lambda f: not mats[f.material_index].startswith(DEC)
    C = {}
    exec(open(CP).read(), C)
    bm, cnl, uvl = C["open_bm"](me)
    rep = {}
    for sx in (1, -1):
        for sy in (1, -1):
            S = lambda co: Vector((sx * co.x, sy * co.y, co.z))
            W = lambda x, y, z: Vector((sx * x, sy * y, z))
            here = lambda f: all(S(v.co).x > NEAR and S(v.co).y > NEAR for v in f.verts)
            old = [f for f in bm.faces if solid(f) and here(f) and f.normal.z > 0.3
                   and all(FOOT - 4e-4 < v.co.z < TOP + 4e-4 for v in f.verts)]
            sides = [f for f in bm.faces if solid(f) and here(f) and abs(f.normal.z) < 0.05
                     and abs(max(v.co.z for v in f.verts) - FOOT) < 6e-4 and min(v.co.z for v in f.verts) < FOOT - 0.01
                     and not all(S(v.co).x < INNER and S(v.co).y < INNER for v in f.verts)]
            # the outline: the side faces' top edges, walked from the +x arm's inner end round to the +y arm's. The
            # faces are separate shells, so their corners are joined by position.
            K = lambda v: (round(v.co.x, 4), round(v.co.y, 4))
            nbr, seg = {}, {}
            for f in sides:
                top = [v for v in f.verts if abs(v.co.z - FOOT) < 6e-4]
                for e in f.edges:
                    if all(v in top for v in e.verts):
                        a, b = e.verts
                        ka, kb = K(a), K(b)
                        if ka == kb:
                            continue
                        nbr.setdefault(ka, set()).add(kb)
                        nbr.setdefault(kb, set()).add(ka)
                        if frozenset((ka, kb)) not in seg or f.calc_area() > seg[frozenset((ka, kb))][0].calc_area():
                            seg[frozenset((ka, kb))] = (f, {ka: a, kb: b})
            ends = [k for k, n in nbr.items() if len(n) == 1]
            assert len(ends) == 2 and all(len(n) <= 2 for n in nbr.values()), (sx, sy, len(ends))
            chain = [min(ends, key=lambda k: sy * k[1])]
            while len(chain) < len(nbr):
                chain.append(next(k for k in nbr[chain[-1]] if k not in chain))
            P2 = [S(Vector((k[0], k[1], 0))).to_2d() for k in chain]
            left = lambda a, b: Vector((-(b - a).y, (b - a).x)).normalized()
            inset = []
            for i, p in enumerate(P2):
                ns = []
                if i > 0 and (p - P2[i - 1]).length > 1e-6:
                    ns.append(left(P2[i - 1], p))
                if i + 1 < len(P2) and (P2[i + 1] - p).length > 1e-6:
                    ns.append(left(p, P2[i + 1]))
                n = sum(ns, Vector((0, 0))).normalized()
                k = min(1.0 / max(n.dot(ns[0]), 0.5), 2.0)
                inset.append(p + n * INSET * k)
            big = max((s[0] for s in seg.values()), key=lambda f: f.calc_area())
            mi = big.material_index
            per_m = float(np.linalg.norm(_uv_map(big, uvl)[1][1]))
            # each ring quad stands on one side face's top edge and carries on that face's texture
            quads = []
            for i in range(len(chain) - 1):
                f, vm = seg[frozenset((chain[i], chain[i + 1]))]
                a0, a1 = vm[chain[i]], vm[chain[i + 1]]
                e1, A = _uv_map(f, uvl)
                uva = {l.vert: l[uvl].uv.copy() for l in f.loops}
                uvb = [Vector(tuple(np.array([W(q.x, q.y, TOP).dot(e1), TOP, 1.0]) @ A)) for q in (inset[i], inset[i + 1])]
                quads.append((a0, a1, uva[a0], uva[a1], uvb))
            bmesh.ops.delete(bm, geom=old, context="FACES_ONLY")
            new = []
            bv = [bm.verts.new(W(q.x, q.y, TOP)) for q in inset]

            def face(vs, uvs, up):
                f = bm.faces.new(vs)
                f.material_index = mi
                f.normal_update()
                if f.normal.dot(up) < 0:
                    f.normal_flip()
                for l in f.loops:
                    l[uvl].uv = uvs[l.vert]
                    l[cnl] = f.normal
                new.append(f)
            for i, (a0, a1, u0, u1, (w0, w1)) in enumerate(quads):
                b0, b1 = bv[i], bv[i + 1]
                t = P2[i + 1] - P2[i]
                out = W(t.y, -t.x, 0).normalized() + Vector((0, 0, 1))
                face([a0, a1, b1, b0], {a0: u0, a1: u1, b0: w0, b1: w1}, out)
            # the cap, closed through the two arms' inner corner
            corner = bm.verts.new(W(inset[0].x, inset[-1].y, TOP))
            ring = bv + [corner]
            pairs = [(ring[i], ring[(i + 1) % len(ring)]) for i in range(len(ring))]
            edges = [bm.edges.get(p) or bm.edges.new(p) for p in pairs]
            tri = bmesh.ops.triangle_fill(bm, use_beauty=True, use_dissolve=False, edges=edges)
            for f in [g for g in tri["geom"] if isinstance(g, bmesh.types.BMFace)]:
                f.material_index = mi
                f.normal_update()
                if f.normal.z < 0:
                    f.normal_flip()
                for l in f.loops:
                    l[uvl].uv = (l.vert.co.x * per_m, l.vert.co.y * per_m)
                    l[cnl] = f.normal
                new.append(f)
            for e in [e for e in bm.edges if not e.link_faces and all(S(v.co).x > NEAR and S(v.co).y > NEAR
                                                                        for v in e.verts)]:
                bm.edges.remove(e)
            for v in [v for v in bm.verts if not v.link_faces and S(v.co).x > NEAR and S(v.co).y > NEAR]:
                bm.verts.remove(v)
            rep[(sx, sy)] = dict(removed=len(old), outline=len(chain), made=len(new))
    C["close_bm"](bm, me)
    me[DONE] = True
    me.update()
    return rep
