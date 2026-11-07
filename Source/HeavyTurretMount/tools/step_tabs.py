"""Step-tabs in the deck's perimeter channel (Gemini's, 8 per deck at |u| 1.45-1.85, floating with 13 mm slots).
Rebuilds them centred on vanilla's rim joint (|u| = 1.492) in one of two styles:
- "clamp": spans the channel from deck plate to rim, top flush with the deck, 8 mm chamfered ends, a bolt
  each side of the joint line (the line already runs across it).
- "tongue": a tongue of the deck plate at deck height reaching to |v| = 3.33 (Gemini's design reach), 8 mm
  chamfers on its three open edges; the joint line is cut over the open channel.
u runs along a side, v outward from the centre; both decks, all four sides. Rerunnable after install_sides.

    exec(open(r"<this file>").read()); apply("clamp", "Body", "Decals_Atlas3_Colorable", "Decals_Atlas4_Colorable")
"""
import bpy, bmesh, math
from mathutils import Matrix, Vector

JOINT, HALF, CH = 1.492, 0.20, 0.008
V_IN, V_OUT, W_IN, W_OUT, TIP = 3.242, 3.4405, 3.25, 3.432, 3.33   # V_OUT: the rim's inner edge
RIM_IN = 3.4405
RING_V, RING_HALF = 3.189, 0.01025              # the deck plate's outline seam: centre line, half width
V_BOX = (0.4834, 0.5166)                        # Atlas4 piece 3's box across the strip
STEM_LIFT = 0.001
Z_TOP, Z_BEV, Z_FLOOR = 1.25, 1.242, 1.215
UV_PER_M = 0.40
BOLT_DU, BOLT_GAP = 0.11, 0.0015
TOOLS = __file__ if "__file__" in globals() else r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HeavyTurretMount\tools\step_tabs.py"


_FRAMES = [(Matrix.Rotation(k * math.pi / 2, 4, "Z") @ Matrix.Diagonal((1, 1, s, 1)), s)
           for k in range(4) for s in (1, -1)]
_INV = {id(m): m.inverted() for m, _ in _FRAMES}


def frames():
    """(matrix, deck sign) taking local (u, v, z) of the -Y side, top deck, written as (u, -v, z), to each tab."""
    return _FRAMES


def local(m, p):
    """World point -> local (u, v, z) for frame matrix m."""
    q = _INV[id(m)] @ p
    return q.x, -q.y, q.z


def in_zone(p, z_hi=1.2505):
    """True if world point p lies in a tab zone (any side, either deck); decals use z_hi = 1.26."""
    for m, _ in frames():
        u, v, z = local(m, p)
        if 1.25 <= abs(u) <= 1.90 and 3.236 <= v <= 3.446 and 1.214 <= z <= z_hi:
            return True
    return False


def piece_faces(mode, c):
    """Faces of one tab at joint u = c: list of (points (u, v, z), expected normal (u, v, z), kind)."""
    a, b = c - HALF, c + HALF
    a2, b2 = a + CH, b - CH
    if mode == "clamp":
        return [
            ([(a2, V_IN, Z_TOP), (b2, V_IN, Z_TOP), (b2, V_OUT, Z_TOP), (a2, V_OUT, Z_TOP)], (0, 0, 1), "top"),
            ([(a, W_IN, Z_BEV), (a, W_OUT, Z_BEV), (a2, V_OUT, Z_TOP), (a2, V_IN, Z_TOP)], (-1, 0, 1), "ch_a"),
            ([(b, W_IN, Z_BEV), (b, W_OUT, Z_BEV), (b2, V_OUT, Z_TOP), (b2, V_IN, Z_TOP)], (1, 0, 1), "ch_b"),
            ([(a, W_IN, Z_FLOOR), (a, W_OUT, Z_FLOOR), (a, W_OUT, Z_BEV), (a, W_IN, Z_BEV)], (-1, 0, 0), "wall_a"),
            ([(b, W_IN, Z_FLOOR), (b, W_OUT, Z_FLOOR), (b, W_OUT, Z_BEV), (b, W_IN, Z_BEV)], (1, 0, 0), "wall_b"),
        ]
    t2 = TIP - CH
    return [
        ([(a2, V_IN, Z_TOP), (b2, V_IN, Z_TOP), (b2, t2, Z_TOP), (a2, t2, Z_TOP)], (0, 0, 1), "top"),
        ([(a2, t2, Z_TOP), (b2, t2, Z_TOP), (b, TIP, Z_BEV), (a, TIP, Z_BEV)], (0, 1, 1), "ch_t"),
        ([(a2, V_IN, Z_TOP), (a2, t2, Z_TOP), (a, TIP, Z_BEV), (a, W_IN, Z_BEV)], (-1, 0, 1), "ch_a"),
        ([(b2, V_IN, Z_TOP), (b2, t2, Z_TOP), (b, TIP, Z_BEV), (b, W_IN, Z_BEV)], (1, 0, 1), "ch_b"),
        ([(a, TIP, Z_BEV), (b, TIP, Z_BEV), (b, TIP, Z_FLOOR), (a, TIP, Z_FLOOR)], (0, 1, 0), "wall_t"),
        ([(a, W_IN, Z_FLOOR), (a, TIP, Z_FLOOR), (a, TIP, Z_BEV), (a, W_IN, Z_BEV)], (-1, 0, 0), "wall_a"),
        ([(b, W_IN, Z_FLOOR), (b, TIP, Z_FLOOR), (b, TIP, Z_BEV), (b, W_IN, Z_BEV)], (1, 0, 0), "wall_b"),
    ]


def to_world(m, p):
    return m @ Vector((p[0], -p[1], p[2]))


def dir_world(m, d):
    return (m.to_3x3() @ Vector((d[0], -d[1], d[2]))).normalized()


def tabs_bm(mode, uv_name):
    """bmesh (world space) of all tabs, with '_cn' corner normals (Keen weighting) and sharp mitres."""
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new(uv_name)
    cnl = bm.loops.layers.float_vector.new("_cn")
    for m, s in frames():
        for c in (JOINT, -JOINT):
            verts, faces = {}, []
            for pts, nrm, kind in piece_faces(mode, c):
                vs = []
                for p in pts:
                    key = tuple(round(x, 6) for x in p)
                    if key not in verts:
                        verts[key] = bm.verts.new(to_world(m, p))
                    vs.append(verts[key])
                f = bm.faces.new(vs)
                f.normal_update()
                want = dir_world(m, nrm)
                if f.normal.dot(want) < 0:
                    f.normal_flip()
                f.smooth = True
                faces.append((f, kind, want))
            walls = {k: w for f, k, w in faces if k.startswith("wall") or k == "top"}
            for f, kind, want in faces:
                n = f.normal
                ax = max(range(3), key=lambda i: abs(n[i]))
                for l in f.loops:
                    p = l.vert.co
                    q = [p[i] for i in range(3) if i != ax]
                    l[uvl].uv = (q[0] * UV_PER_M, q[1] * UV_PER_M)
                    if kind.startswith("ch"):
                        top = abs(abs(local(m, p)[2]) - Z_TOP) < 1e-5
                        l[cnl] = walls["top"] if top else walls["wall" + kind[2:]]
                    else:
                        l[cnl] = want
    for e in bm.edges:
        if len(e.link_faces) == 2:
            f, g = e.link_faces
            for v in e.verts:
                la = next(l for l in v.link_loops if l.face is f)
                lb = next(l for l in v.link_loops if l.face is g)
                if (Vector(la[cnl]) - Vector(lb[cnl])).length > 1e-4:
                    e.smooth = False
    return bm


def bolt_island(dec):
    """World faces of the vanilla rim bolt next to the joint, -Y side top, as point and UV lists."""
    me = dec.data
    out = []
    for p in me.polygons:
        c = dec.matrix_world @ p.center
        if c.z > 1.24 and -3.74 < c.y < -3.68 and 1.40 < c.x < 1.48:
            out.append(([dec.matrix_world @ me.vertices[i].co for i in p.vertices],
                         [tuple(me.uv_layers.active.data[li].uv) for li in p.loop_indices]))
    return out


def merge(dst, src):
    """Append bmesh src into dst (same layer names), returning the new faces."""
    tmp = bpy.data.meshes.new("_tmp_tabs")
    src.to_mesh(tmp)
    for f in dst.faces:
        f.tag = True
    dst.from_mesh(tmp)
    bpy.data.meshes.remove(tmp)
    new = [f for f in dst.faces if not f.tag]
    for f in dst.faces:
        f.tag = False
    return new


def side_v(vc, vo):
    """|v| of a joint half strip's side corner. Vanilla's half strips run past the piece's box (V 0.4834-0.5166)
    into transparent atlas, so the visible groove edge lies part way across. The cut runs from the tip (centre line,
    RING_V) through the point where the visible edge meets the outline seam's near edge, and on to the strip's side:
    a 45-degree point as seen. Stopping the strip's own side on the near edge left a dark notch (rendered)."""
    frac = (V_BOX[1] - vc) / (vo - vc) if vo > vc else (vc - V_BOX[0]) / (vc - vo)
    return RING_V + RING_HALF / frac


def point_joint_line(bm, m, c, line):
    """Clamp style: vanilla's joint line is two half-groove wedges that taper from the rim edge to nothing at
    |v| 3.04, so on this deck they faded out past the deck's outline seam (owner, 2026-11-07). Each wedge becomes a
    full-width half strip whose end is a pointed T-join: the groove's centre line ends on the outline seam's centre
    line (RING_V), its side on the seam's near edge. The strip's atlas art is uniform along U, so U keeps vanilla's
    rate. Returns how many strips it rebuilt or corrected (0 on a rerun)."""
    uvl = bm.loops.layers.uv.active
    cnl = bm.loops.layers.float_vector["_cn"]
    n = 0
    for f in line:
        loc = [(l, local(m, l.vert.co)) for l in f.loops]
        vv = [p[1] for _, p in loc]
        if len(loc) == 4 and abs(min(vv) - RING_V) < 1e-4:
            # rebuilt on an earlier run: move the side corner onto the 45-degree cut (side_v)
            v_end = max(vv)
            tip = min(loc, key=lambda t: t[1][1])
            end = next(t for t in loc if abs(t[1][1] - v_end) < 1e-4 and abs(t[1][0] - tip[1][0]) < 1e-4)
            side = min((t for t in loc if t[1][1] < v_end - 0.1 and t is not tip), key=lambda t: t[1][1])
            nv = side_v(tip[0][uvl].uv.y, side[0][uvl].uv.y)
            zl = end[1][2] + STEM_LIFT
            if abs(side[1][1] - nv) > 1e-5 or abs(tip[1][2] - zl) > 1e-5:
                u0, ut = end[0][uvl].uv.x, tip[0][uvl].uv.x
                side[0].vert.co = to_world(m, (side[1][0], nv, zl))
                tip[0].vert.co = to_world(m, (tip[1][0], tip[1][1], zl))
                side[0][uvl].uv = (u0 + (ut - u0) * (v_end - nv) / (v_end - RING_V), side[0][uvl].uv.y)
                n += 1
            continue
        if len(loc) != 3 or max(vv) - min(vv) < 0.5:
            continue
        tip = min(loc, key=lambda t: t[1][1])
        ends = [t for t in loc if t is not tip]
        cen = min(ends, key=lambda t: abs(t[1][0] - c))
        out = max(ends, key=lambda t: abs(t[1][0] - c))
        v_end, v_tip = cen[1][1], tip[1][1]
        u0, u1 = cen[0][uvl].uv.x, tip[0][uvl].uv.x
        vc, vo = cen[0][uvl].uv.y, out[0][uvl].uv.y
        w, z = abs(out[1][0] - cen[1][0]), cen[1][2]

        def u_at(v):
            return u0 + (u1 - u0) * (v_end - v) / (v_end - v_tip)
        pts = [(cen[1][0], v_end, vc), (out[1][0], v_end, vo), (out[1][0], side_v(vc, vo), vo),
               (cen[1][0], RING_V, vc)]
        # the end over the outline seam sits 1 mm higher, so the point draws over it (skill rule)
        vs = [bm.verts.new(to_world(m, (pu, pv, z + (STEM_LIFT if pv < v_end - 0.1 else 0)))) for pu, pv, _ in pts]
        g = bm.faces.new(vs)
        g.material_index = f.material_index
        g.normal_update()
        if g.normal.dot(f.normal) < 0:
            g.normal_flip()
        for l in g.loops:
            pu, pv, pz = local(m, l.vert.co)
            l[uvl].uv = (u_at(pv), vc if abs(pu - cen[1][0]) < 1e-4 else vo)
            l[cnl] = f.normal
        bmesh.ops.delete(bm, geom=[f], context="FACES")
        n += 1
    return n


def apply(mode, body, dec3, dec4):
    ins = {"__name__": "installer"}
    exec(open(TOOLS.replace("step_tabs.py", "install_sides.py")).read(), ins)
    report = {}
    # body: drop old tabs, add new
    ob = bpy.data.objects[body]
    mats = list(ob.data.materials)
    bm = ins["bm_with_cn"](ob)
    old = [f for f in bm.faces if all(in_zone(v.co) for v in f.verts)]
    bmesh.ops.delete(bm, geom=old, context="FACES")
    tb = tabs_bm(mode, ob.data.uv_layers.active.name)
    new = merge(bm, tb)
    tb.free()
    col = [m.name for m in mats].index("PaintedMetal_Colorable")
    for f in new:
        f.material_index = col
    ins["write_back"](ob, bm, mats)
    bm.free()
    report["body"] = (len(old), len(new))
    # bolts (clamp only): two per tab beside the joint line
    ob3 = bpy.data.objects[dec3]
    isl = bolt_island(ob3)
    bm3 = ins["bm_with_cn"](ob3)
    old3 = [f for f in bm3.faces if in_zone(f.calc_center_median(), 1.26)]
    bmesh.ops.delete(bm3, geom=old3, context="FACES")
    n3 = 0
    if mode == "clamp" and isl:
        uvl = bm3.loops.layers.uv.active
        cnl = bm3.loops.layers.float_vector["_cn"]
        cen = sum((p for pts, _ in isl for p in pts), Vector()) / sum(len(pts) for pts, _ in isl)
        for m, s in frames():
            for c in (JOINT, -JOINT):
                for du in (-BOLT_DU, BOLT_DU):
                    tgt = to_world(m, (c + du, (V_IN + V_OUT) / 2, Z_TOP + BOLT_GAP))
                    for pts, uvs in isl:
                        vs = [bm3.verts.new(tgt + m.to_3x3() @ (p - cen)) for p in pts]
                        f = bm3.faces.new(vs if s > 0 else vs[::-1])
                        f.normal_update()
                        for l, uv in zip(f.loops, uvs if s > 0 else uvs[::-1]):
                            l[uvl].uv = uv
                            l[cnl] = f.normal
                        n3 += 1
    ins["write_back"](ob3, bm3, list(ob3.data.materials))
    bm3.free()
    report["bolts"] = (len(old3), n3)
    # joint line (tongue only): cut it over the open channel; drop cut pieces left from an earlier run
    # A whole line (from install_sides) crosses RIM_IN; pieces cut from it earlier lie inside RIM_IN.
    ob4 = bpy.data.objects[dec4]
    bm4 = ins["bm_with_cn"](ob4)
    stale_n = cut = pointed = 0
    already_cut = []
    for m, s in frames():
        for c in (JOINT, -JOINT):
            def vs(f):
                return [local(m, v.co)[1] for v in f.verts]
            line = [f for f in bm4.faces if all(abs(p[0] - c) < 0.03 and 3.0 <= p[1] <= 3.75 and p[2] > 1.24
                                                for p in (local(m, v.co) for v in f.verts))]
            if not line:
                continue
            if not any(min(vs(f)) < RIM_IN - 1e-4 < max(vs(f)) for f in line):
                already_cut.append((s, c))
                continue
            stale = [f for f in line if max(vs(f)) <= RIM_IN + 1e-4]
            bmesh.ops.delete(bm4, geom=stale, context="FACES")
            stale_n += len(stale)
            if mode != "tongue":
                pointed += point_joint_line(bm4, m, c, [f for f in line if f.is_valid])
                continue
            line = [f for f in line if f.is_valid]
            for vcut in (TIP - CH, RIM_IN):
                geom = list({x for f in line for x in list(f.verts) + list(f.edges)}) + line
                res = bmesh.ops.bisect_plane(bm4, geom=geom, plane_co=to_world(m, (c, vcut, Z_TOP)),
                                             plane_no=dir_world(m, (0, 1, 0)))
                line = [f for f in bm4.faces if all(abs(p[0] - c) < 0.03 and 3.0 <= p[1] <= 3.75 and p[2] > 1.24
                                                    for p in (local(m, v.co) for v in f.verts))]
            gap = [f for f in line if TIP - CH + 1e-4 < local(m, f.calc_center_median())[1] < RIM_IN - 1e-4]
            bmesh.ops.delete(bm4, geom=gap, context="FACES")
            cut += len(gap)
    ins["write_back"](ob4, bm4, list(ob4.data.materials))
    bm4.free()
    report["line"] = {"stale removed": stale_n, "gap pieces cut": cut, "pointed": pointed,
                      "already cut (rerun install_sides to switch)": len(already_cut)}
    return report
