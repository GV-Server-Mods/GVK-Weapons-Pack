"""Port surround from the owner's mockup (2026-11-08): a dark frame round the port, the centre bay opens into
one paintable field, and the truss members run on to the frame. The side ports' grey shroud (the vanilla
LargeConveyorFrame) goes (owner, 2026-11-09); the frame is built into the wall instead.

Run after cargo_ports.py and before finish.py:
    ns = {}; exec(open(path).read(), ns); report = ns["surround"](); report2 = ns["raise_jambs"]()
raise_jambs() lifts the jambs 1.5 cm, so they stand 1 cm over the braces (owner, 2026-11-09: "needs to be pushed
outward a bit so it sticks out more than the 45 degree beams on its sides"; owner's pick of three heights).

On each side wall, on both halves of it (s = distance from the port's centre line, along the wall):
- Band step (kept from the first surround round): the dark band is 8 cm deeper across the centre bay, with the
  vanilla jog over each bay post (s 1.74 to 1.85).
- The bay post (s 1.71 to 1.89), its top gusset and the centre bay's raised plate go, with the access panel on
  the plate. The vanilla wall plate under them shows, so one paintable field runs from the truss diagonal to
  the jamb.
- The chord bars run on to the jamb: the strip already did; the doubler is stretched from the post to it.
- A corner piece at band height fills each corner between the band and the jamb. Its edge is the vanilla band
  end's curve (into the corner posts at the wall's ends), from the band's lower edge down to the strip's lower
  edge (s 1.0, b 0.755).
- In the old shroud's outline (s, |b| <= 1, chamfered): a lintel above the port and a sill below it at band
  height, joined to the band, their lower edge running on from the corner curves straight across, with the
  band's rounded bevel. Under them the jambs, at the strip's height, from s 1.0 in to a 4 cm 45 degree bevel down
  to the yellow port all round. The keypad stands flat on the right jamb.
- A brace runs at 45 degrees from the bottom gusset's chamfer up to the jamb: the vanilla truss diagonal beside the
  gusset, mirrored, scalloped step included (owner, 2026-11-09: "should still have their scalloped edge just like
  all of the others").
- The bottom gusset is rebuilt as one symmetric piece (the truss gusset, the post's foot and the post's bottom
  gusset were three), with the top gussets' decal layout turned over: outline, centre seam, two vents, four
  screws.
- The corner vents keep their outer slot. The plate seam above the gusset runs on to the jamb; the one
  along the gusset's top edge stops at its corner.
- The four side port frames (the shroud) are removed; the bottom port keeps its frame.
"""
import math

import bmesh
import bpy
from mathutils import Matrix, Vector

CP = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HurricanePlatform\tools\cargo_ports.py"
C = {}
exec(open(CP).read(), C)
MOUNT_TOOLS = r"C:\Users\blayl\source\repos\MDK2 Mods\GVK_Weapons\Source\HeavyTurretMount\tools\build_sides_optionA.py"

PLAT = "Platform"
FRAMES = ("Pl_PortFrame_F", "Pl_PortFrame_B", "Pl_PortFrame_L", "Pl_PortFrame_R")
NB = 6.25                 # band face
FRONT = C["FRONT"]        # notch walls run down to just behind the frame face
DEC = C["DEC"]
UV = C["UV"]
E = 2e-4
R2 = 0.70710678

# band step (first surround round)
BOUND, STEP = 1.0639, 0.08
JOG_IN, JOG_OUT = 1.74, 1.85
LINE = (1.045, 1.085)

# measured on the vanilla wall
POST = (1.70, 1.905)      # bay post, with its bevels
POST_GUSSET = 1.34        # the post's top gusset reaches s 1.35
TOP = 0.92                # post and top gusset end under the band
OUT = 1.0                 # the old shroud's side: the jambs' outer wall
BL = 0.9154              # band's lower edge
BAND_BEV = ((0.0, 0.0), (0.0057, 0.0057), (0.0097, 0.0096))   # its rounded bevel: (offset, drop)
# the band's lower edge where it curves down into the corner post at the wall's far end (s, b), from its last
# straight vertex to the post; the corner pieces take this curve, scaled to run from the band edge to the strip's
# lower edge at the shroud
BAND_END = ((4.8623, 0.9173), (4.9527, 0.9030), (5.0394, 0.8686), (5.1183, 0.8111), (5.1786, 0.7440))
STRIP_LOW = 0.755         # strip's lower edge
DOUBLER = (0.625, 0.775, 1.885)   # doubler bars' |b| span, and their end under the post
WALL_LOW = 6.17           # new walls run down into the bars and plate under them
# lintel, sill and jambs in the old shroud's outline
JAMB_N = 6.225            # jambs: the strip's height
JE = OUT - BAND_BEV[-1][0]        # jamb top's outer edge; the band's rounded bevel takes it to the wall at s 1.0
WF = STRIP_LOW - BAND_BEV[-1][0]  # foot of the lintel's wall
FOOT = JAMB_N - BAND_BEV[-1][1]   # foot of the jamb's outer bevel
JAMB_LOW = 6.14           # the jamb's outer wall runs down behind the plate (6.15)
# the yellow port's outer wall in a quarter (s, |b|): straight at 0.6804, a 45 degree chamfer, and a short bend at
# each end of the chamfer
PORT_Q = ((0.0, 0.6804), (0.5343, 0.6804), (0.5514, 0.6734), (0.6734, 0.5514), (0.6804, 0.5343), (0.6804, 0.0))
PB, PB_IN = 0.04, 0.001   # bevel down to the port, 45 degrees; its foot 1 mm inside the port's outer wall
JAMB_IN = PORT_Q[0][1] + PB   # jamb top's inner edge
KEY_TOP = 6.2499          # keypad housing's top, as before (inside the block's 6.25)
# raise_jambs(): the jambs rise to the foot of the lintel's and sill's rounded edge (6.2404), 1 cm over the braces
RAISE = NB - BAND_BEV[-1][1] - JAMB_N

# bottom gusset's top face (s, b): the vanilla truss gusset's outer half, mirrored about its centre (s 1.9812),
# as the owner's mockup draws it. OLD_GUSSET is what it replaces: the truss gusset's left part and the post
# gusset's chamfer, 5 cm longer, so the gusset was lopsided.
GUSSET = [(2.6036, -0.9005), (2.6041, -0.7116), (2.2970, -0.4055), (1.6656, -0.4055), (1.3585, -0.7116),
          (1.3585, -0.9005)]
OLD_GUSSET = [(2.6036, -0.9005), (2.6041, -0.7116), (2.2970, -0.4055), (1.7185, -0.4055), (1.3583, -0.7634),
              (1.3588, -0.9005)]
G_N, G_BEV, G_LOW = 6.2515, 0.01, 6.14
G_CLEAR = 0.0105          # old faces within this of either outline go (the bevel and wall reach 1 cm)
SEAM = 1.9812             # between the centres of its top and bottom edges (owner's mockup: s 2.0)
# brace: the vanilla truss diagonal beside the bottom gusset (s 2.3 to 3.7, centred on s - b = 3.0; top at 6.2307),
# copied and mirrored about the gusset's centre. Its middle span is 0.316 m flat with 1.5 cm bevels; near each end
# one side steps in through a curved scallop to a 5 cm chamfer, so the top there is 0.258 m.
BR_N, DIAG_C = 6.2307, 3.0
# decals, as on the vanilla top gusset
ND = 6.2578               # decal height
OL_D = (0.0252, 0.0341, 0.0458)   # outline rows' inset: outer, groove, inner (the seam's side verts)
OL_V = (0.522, 0.499, 0.476)
OL_U0, OL_K = 0.86, 0.10          # u along the loop, decreasing counter-clockwise
SEAM_HW = 0.0117
SEAM_U = (0.9749, -0.0739)        # wide end, narrow end
SEAM_V = (0.5, 0.4757)            # centre, sides
TOP_SEAM, VENT_B = 3.999, 0.0003  # vents: s' = TOP_SEAM + SEAM - s, b' = VENT_B - b
SCREW_WIDE = (0.081, 0.0825)      # in from the wide end's corners
SCREW_NARROW = (0.041, 0.0779)    # either side of the seam, in from the narrow end
VENT_KEEP = 1.23                  # corner vents: only the outer slot (s 1.24 to 1.33) stays, where it was


def lc(Mi, co):
    l = Mi @ co
    return l.x, -l.y, l.z          # a (along the wall), n (outward), b (height)


def hc(Mi, co, su):
    a, n, b = lc(Mi, co)
    return su * a, n, b            # s (from the port's centre line, this half), n, b


def loc(su, s, n, b):
    return Vector((su * s, -n, b))


def opaque(mats, f):
    return not mats[f.material_index].startswith(DEC)


def bisect(bm, faces, M, co, no):
    if faces:
        geom = list({e for f in faces for e in f.edges}) + faces
        bmesh.ops.bisect_plane(bm, geom=geom, plane_co=M @ Vector(co),
                               plane_no=(M.to_3x3() @ Vector(no)).normalized())


def uv_map(face, uvl):
    """Affine position -> uv of a flat face, from three of its corners."""
    ls = face.loops
    p0, q0 = ls[0].vert.co.copy(), ls[0][uvl].uv.copy()
    for j in range(1, len(ls) - 1):
        e1, e2 = ls[j].vert.co - p0, ls[j + 1].vert.co - p0
        if e1.cross(e2).length > 1e-6:
            break
    d1, d2 = ls[j][uvl].uv - q0, ls[j + 1][uvl].uv - q0
    g11, g12, g22 = e1.dot(e1), e1.dot(e2), e2.dot(e2)
    det = g11 * g22 - g12 * g12
    grads = []
    for c in (0, 1):
        x = (g22 * d1[c] - g12 * d2[c]) / det
        y = (g11 * d2[c] - g12 * d1[c]) / det
        grads.append(x * e1 + y * e2)
    return lambda co: Vector((q0.x + grads[0].dot(co - p0), q0.y + grads[1].dot(co - p0)))


class Pool:
    """Vertex lookup by side-local position, so new faces share the vertices already there."""

    def __init__(self, bm, M, verts):
        self.bm, self.M, self.Mi = bm, M, M.inverted()
        self.vs = list(verts)

    def get(self, su, s, n, b):
        w = loc(su, s, n, b)
        for v in self.vs:
            if (self.Mi @ v.co - w).length < E:
                return v
        v = self.bm.verts.new(self.M @ w)
        self.vs.append(v)
        return v


class Maker:
    def __init__(self, bm, M, cnl, uvl):
        self.bm, self.M, self.Mi, self.cnl, self.uvl = bm, M, M.inverted(), cnl, uvl
        self.count = 0

    def face(self, vs, want, uvf, mat):
        """want: the face's outward direction in side-local axes (a, -n, b); uvf: object-space position -> uv,
        or a list of uvs in the order of vs."""
        uvs = dict(zip(vs, uvf)) if isinstance(uvf, list) else None
        f = self.bm.faces.new(vs)
        f.material_index = mat
        f.normal_update()
        if (self.Mi.to_3x3() @ f.normal).dot(Vector(want)) < 0:
            f.normal_flip()
        for l in f.loops:
            l[self.uvl].uv = uvs[l.vert] if uvs else uvf(l.vert.co)
            l[self.cnl] = f.normal
        self.count += 1
        return f


def offset_poly(P, d):
    """Polygon P (s, b) grown by d (shrunk if d < 0), mitred."""
    area = sum(P[i][0] * P[(i + 1) % len(P)][1] - P[(i + 1) % len(P)][0] * P[i][1] for i in range(len(P)))
    sg = 1 if area > 0 else -1
    lines = []
    for i in range(len(P)):
        p, q = Vector(P[i]), Vector(P[(i + 1) % len(P)])
        e = (q - p).normalized()
        nrm = Vector((e.y, -e.x)) * sg
        lines.append((p + nrm * d, e))
    out = []
    for i in range(len(P)):
        (p1, e1), (p2, e2) = lines[i - 1], lines[i]
        den = e1.x * e2.y - e1.y * e2.x
        t = ((p2 - p1).x * e2.y - (p2 - p1).y * e2.x) / den
        out.append(p1 + e1 * t)
    return out


def edge_normals(P):
    area = sum(P[i][0] * P[(i + 1) % len(P)][1] - P[(i + 1) % len(P)][0] * P[i][1] for i in range(len(P)))
    sg = 1 if area > 0 else -1
    out = []
    for i in range(len(P)):
        e = (Vector(P[(i + 1) % len(P)]) - Vector(P[i])).normalized()
        out.append(Vector((e.y, -e.x)) * sg)
    return out


def in_poly(P, p):
    sgn = 0
    for i in range(len(P)):
        a, b = P[i], P[(i + 1) % len(P)]
        c = (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])
        if abs(c) < 1e-9:
            continue
        if sgn == 0:
            sgn = 1 if c > 0 else -1
        elif (c > 0) != (sgn > 0):
            return False
    return True


# ---- band step (first surround round, unchanged) ----

def band_map(bm, mats, Mi, uvl, sb):
    """UV map of the dark band's flat face on this side (top sb=1, bottom sb=-1)."""
    dark = mats.index("PaintedMetal_Darker")
    best = max((f for f in bm.faces if f.material_index == dark
                and all(lc(Mi, v.co)[1] > NB - 1e-4 and 0.914 < sb * lc(Mi, v.co)[2] < BOUND + 1e-3
                        for v in f.verts)), key=lambda f: f.calc_area())
    return uv_map(best, uvl)


def boundary(a):
    a = abs(a)
    if a <= JOG_IN:
        return BOUND + STEP
    if a >= JOG_OUT:
        return BOUND
    return BOUND + STEP * (JOG_OUT - a) / (JOG_OUT - JOG_IN)


def step_band(bm, mats, M, uvl):
    Mi = M.inverted()
    dark, light = mats.index("PaintedMetal_Darker"), mats.index("PaintedMetal_Colorable")
    out = dict(recoloured=0, line_verts=0)
    for sb in (1, -1):
        to_uv = band_map(bm, mats, Mi, uvl, sb)

        def band(lo=-JOG_OUT, hi=JOG_OUT):
            r = []
            for f in bm.faces:
                if mats[f.material_index].startswith(DEC):
                    continue
                p = [lc(Mi, v.co) for v in f.verts]
                if all(n > NB - 1e-4 for a, n, b in p) and min(sb * b for a, n, b in p) < BOUND + STEP + 0.01 \
                        and max(sb * b for a, n, b in p) > BOUND - 1e-3 \
                        and min(a for a, n, b in p) < hi - 1e-4 and max(a for a, n, b in p) > lo + 1e-4:
                    r.append(f)
            return r

        def lines():
            r = []
            for f in bm.faces:
                if not mats[f.material_index].startswith("Atlas4"):
                    continue
                p = [lc(Mi, v.co) for v in f.verts]
                if all(n > NB + 4e-3 and LINE[0] < sb * b < LINE[1] for a, n, b in p) \
                        and min(a for a, n, b in p) < JOG_OUT and max(a for a, n, b in p) > -JOG_OUT:
                    r.append(f)
            return r

        for su in (1, -1):
            for x in (JOG_IN, JOG_OUT):
                bisect(bm, band(), M, (su * x, 0, 0), (1, 0, 0))
                bisect(bm, lines(), M, (su * x, 0, 0), (1, 0, 0))
        for su in (1, -1):
            col = band(JOG_IN, JOG_OUT) if su > 0 else band(-JOG_OUT, -JOG_IN)
            bisect(bm, col, M, (su * JOG_IN, 0, sb * (BOUND + STEP)), (sb * STEP, 0, su * (JOG_OUT - JOG_IN)))
        bisect(bm, band(-JOG_IN, JOG_IN), M, (0, 0, sb * (BOUND + STEP)), (0, 0, 1))
        for f in band():
            if f.material_index != light:
                continue
            a, n, b = lc(Mi, f.calc_center_median())
            if BOUND < sb * b < boundary(a):
                f.material_index = dark
                for l in f.loops:
                    l[uvl].uv = to_uv(l.vert.co)
                out["recoloured"] += 1
        for v in {v for f in lines() for v in f.verts}:
            a, n, b = lc(Mi, v.co)
            if abs(a) <= JOG_IN + 1e-4:
                v.co = M @ Vector((a, -n, b + sb * STEP))
                out["line_verts"] += 1
    return out


# ---- clearing the centre bay ----

def clear_bay(bm, mats, M, su):
    """The bay post, its top gusset, the centre bay's raised plate and the decals on it or hidden under them."""
    Mi = M.inverted()
    cols = mats.index("PaintedMetal_Colorable")
    gone = set()
    for f in bm.faces:
        p = [hc(Mi, v.co, su) for v in f.verts]
        nb = (Mi.to_3x3() @ f.normal).z
        if not opaque(mats, f):
            if all(POST[0] <= s <= POST[1] and -0.40 <= b <= TOP and n < 6.2 for s, n, b in p):
                gone.add(f)      # stray marks the post hid
            elif all(OUT - 1e-3 <= s <= 1.76 and abs(b) <= 0.71 and 6.21 < n < 6.22 for s, n, b in p):
                gone.add(f)      # the access panel
            continue
        if nb < -0.3 and min(b for s, n, b in p) > 0.895:
            continue             # the band's own lower bevel and wall
        if all(-0.41 <= b <= TOP for s, n, b in p):
            if all(POST_GUSSET <= s <= POST[1] and n > 6.0 for s, n, b in p) and max(n for s, n, b in p) > 6.229:
                gone.add(f)      # post and top gusset
                continue
            if all(POST[0] <= s <= POST[1] and n > 6.05 for s, n, b in p):
                gone.add(f)      # the post's lower faces and side walls (down to n 6.08)
                continue
        if f.material_index == cols and all(OUT - 1e-3 <= s <= 1.751 and abs(b) <= 0.777
                                            and 6.205 <= n <= 6.212 for s, n, b in p):
            gone.add(f)          # the raised plate (6.2087)
    bmesh.ops.delete(bm, geom=list(gone), context="FACES")
    return len(gone)


def vents(bm, mats, M, su):
    """Corner vents: the two slots nearest the port go (the corner piece's curve covers the first and crowds the
    second); the outer slot stays, with room to the curve and to the gusset."""
    Mi = M.inverted()
    vent = [f for f in bm.faces if mats[f.material_index] == "Atlas3_Darker"
            and all(1.03 <= s <= 1.33 and 0.74 < abs(b) < 0.87 and 6.2 < n < 6.235
                    for s, n, b in (hc(Mi, v.co, su) for v in f.verts))]
    inner = [f for f in vent if max(hc(Mi, v.co, su)[0] for v in f.verts) < VENT_KEEP]
    bmesh.ops.delete(bm, geom=inner, context="FACES")
    return dict(vent_faces_dropped=len(inner), vent_faces_kept=len(vent) - len(inner))


def seams(bm, mats, M, su):
    """The plate seam above the bottom gusset ran on under the post: it now runs on to the shroud. The one
    along the gusset's top edge stops at the gusset's corner."""
    Mi = M.inverted()
    moved = 0
    for sb, end in ((1, OUT), (-1, GUSSET[3][0] - 0.004)):
        fs = [f for f in bm.faces if mats[f.material_index] == "Atlas4_Colorable"
              and all(6.155 < n < 6.162 and 0.37 <= sb * b <= 0.42 and 1.60 <= s <= 2.70
                      for s, n, b in (hc(Mi, v.co, su) for v in f.verts))]
        for v in {v for f in fs for v in f.verts}:
            s, n, b = hc(Mi, v.co, su)
            if s < 1.66:         # the seam's end by the post (s 1.641), not its far end
                v.co = M @ loc(su, end, n, b)
                moved += 1
    return moved


def stretch_doubler(bm, mats, M, su):
    """The doubler bars ended under the post; their ends move to the shroud."""
    Mi = M.inverted()
    dark = mats.index("PaintedMetal_Darker")
    fs = [f for f in bm.faces if f.material_index == dark
          and all(6.14 <= n <= 6.215 and DOUBLER[0] <= abs(b) <= DOUBLER[1]
                  for s, n, b in (hc(Mi, v.co, su) for v in f.verts))
          and any(abs(hc(Mi, v.co, su)[0] - DOUBLER[2]) < 0.006 for v in f.verts)]
    ends = {v for f in fs for v in f.verts if abs(hc(Mi, v.co, su)[0] - DOUBLER[2]) < 0.006}
    for v in ends:
        s, n, b = hc(Mi, v.co, su)
        v.co = M @ loc(su, OUT, n, b)
    return len(ends)       # no end cap: the jamb's outer wall (to n 6.2154) covers the bars' ends (6.21)


# ---- new pieces ----

def fold(to_uv, M, su, sb, out2, top=NB):
    """UVs for a face that turns down from a flat top: the point is laid back on the top's plane along out2
    (a unit (s, |b|) direction) by its drop below it, so the paint runs on over the edge."""
    Mi = M.inverted()

    def f(co):
        s, n, b = hc(Mi, co, su)
        d = top - n
        return to_uv(M @ loc(su, s + out2[0] * d, top, b + sb * out2[1] * d))
    return f


def line_x(p1, d1, p2, d2):
    """Where the 2D lines p1 + t d1 and p2 + u d2 cross."""
    den = d1.x * d2.y - d1.y * d2.x
    return p1 + d1 * (((p2 - p1).x * d2.y - (p2 - p1).y * d2.x) / den)


def band_curve():
    """The corner pieces' edge (s, |b|): the vanilla band end's curve, scaled to run from the band's lower edge
    down to the strip's lower edge at the jamb. Returns the points, and per bevel step the edge's offset row
    (mitred at the curve's vertices, met by the band's own bevel row at the start and by the lintel's at the end)."""
    e0, e1 = Vector(BAND_END[0]), Vector(BAND_END[-1])
    k = (BL - STRIP_LOW) / (e0.y - e1.y)
    pts = [Vector((OUT + (e1.x - x) * k, STRIP_LOW + (y - e1.y) * k)) for x, y in BAND_END]
    pts[0].y, pts[-1] = BL, Vector((OUT, STRIP_LOW))
    dirs = [(pts[i + 1] - pts[i]).normalized() for i in range(len(pts) - 1)]
    nrms = [Vector((-d.y, d.x)) for d in dirs]          # away from the piece
    rows = []
    for o, dn in BAND_BEV:
        r = [line_x(Vector((0.0, BL - o)), Vector((1.0, 0.0)), pts[0] + nrms[0] * o, dirs[0])]
        r += [line_x(pts[i - 1] + nrms[i - 1] * o, dirs[i - 1], pts[i] + nrms[i] * o, dirs[i])
              for i in range(1, len(pts) - 1)]
        r.append(line_x(pts[-2] + nrms[-1] * o, dirs[-1], Vector((0.0, STRIP_LOW - o)), Vector((1.0, 0.0))))
        rows.append(r)
    return pts, rows, nrms


def corner_piece(bm, mats, M, mk, su, sb, to_uv):
    """Band-height corner between the band and the jamb. Its edge curves, as the vanilla band does into the corner
    posts, from the band's lower edge down to the strip's lower edge at the jamb, with the band's rounded bevel
    carried round it. The lintel (built next) fills the outline beside it."""
    Mi = M.inverted()
    dark = mats.index("PaintedMetal_Darker")
    pts, rows, nrms = band_curve()
    js = pts[0].x                             # P0: where the curve leaves the band's lower edge
    cs, ks = C["CHAMF"] - BL, C["CHAMF"] - OUT   # Cc: band edge meets the outline's chamfer; K: chamfer meets s 1.0
    mitre = [(r[0].x, r[0].y, NB - dn) for r, (o, dn) in zip(rows, BAND_BEV)]   # (s, |b|, n) at P0
    slope = (mitre[-1][0] - js) / (BL - mitre[-1][1])

    def hb(v):
        s, n, b = hc(Mi, v.co, su)
        return s, n, sb * b

    def band_edge():
        r = []
        for f in bm.faces:
            if f.material_index != dark or sb * (Mi.to_3x3() @ f.normal).z > -0.3:
                continue
            p = [hb(v) for v in f.verts]
            if all(6.14 <= n <= NB + 1e-4 and mitre[-1][1] - 1e-3 <= b <= BL + 1e-3 and s > 0.5 for s, n, b in p) \
                    and min(s for s, n, b in p) < js + 0.01 and max(s for s, n, b in p) > cs - 0.01:
                r.append(f)
        return r

    (s1, b1, _), (s2, b2, _) = mitre[0], mitre[-1]
    da, db = su * (s2 - s1), sb * (b2 - b1)
    bisect(bm, band_edge(), M, (su * s1, 0, sb * b1), (db, 0, -da))
    gone = [f for f in band_edge()
            if all(s <= js + (BL - b) * slope + 1e-4 for s, n, b in (hb(v) for v in f.verts))]
    for f in bm.faces:           # the strip's and the band bevel's notch walls round the shroud's corner
        if opaque(mats, f) and all(C["on_outline"](a, b) and 6.19 <= n <= 6.26 and 0.73 <= sb * b <= 0.944
                                   and su * a > 0 for a, n, b in (lc(Mi, v.co) for v in f.verts)):
            gone.append(f)
    bmesh.ops.delete(bm, geom=list(set(gone)), context="FACES")

    pool = Pool(bm, M, [v for v in bm.verts if (lambda s, n, b: 0.8 < s < 1.35 and 0.70 < b < 0.95
                                                and n > 6.19)(*hb(v))])

    def g(s, b, n):
        return pool.get(su, s, n, sb * b)

    Cc, K, Pe = g(cs, BL, NB), g(OUT, ks, NB), g(OUT, BL, NB)
    P = [g(p.x, p.y, NB) for p in pts]        # P[0] on the band edge .. P[-1] = H, the strip's edge at the shroud
    edge = sorted((v for v in pool.vs if abs(hb(v)[1] - NB) < 1e-4 and abs(hb(v)[2] - BL) < 2e-4
                   and cs + 1e-3 < hb(v)[0] < js - 1e-3 and abs(hb(v)[0] - OUT) > 1e-3), key=lambda v: -hb(v)[0])
    up = (0, -1, 0)
    # top: a fan from the shroud's corner on the band edge (the curve bows toward it, so no single face)
    mk.face([P[0]] + [v for v in edge if hb(v)[0] > OUT] + [Pe, P[1]], up, to_uv, dark)
    for i in range(1, len(P) - 2):
        mk.face([Pe, P[i + 1], P[i]], up, to_uv, dark)
    mk.face([Pe, K, P[-2]], up, to_uv, dark)
    mk.face([K, P[-1], P[-2]], up, to_uv, dark)
    mk.face([Pe] + [v for v in edge if hb(v)[0] < OUT] + [Cc, K], up, to_uv, dark)
    # the band's bevel round the curve, then the wall under it
    R = [[g(p.x, p.y, NB - dn) for p in r] for r, (o, dn) in zip(rows, BAND_BEV)]
    R[0] = P
    nf = len(BAND_BEV) - 1
    for i, nr in enumerate(nrms):
        out = fold(to_uv, M, su, sb, nr)
        for k in range(nf):
            mk.face([R[k][i], R[k][i + 1], R[k + 1][i + 1], R[k + 1][i]], (su * nr.x, -1, sb * nr.y), out, dark)
        a, b = rows[nf][i], rows[nf][i + 1]
        mk.face([R[nf][i], R[nf][i + 1], g(b.x, b.y, WALL_LOW), g(a.x, a.y, WALL_LOW)],
                (su * nr.x, 0, sb * nr.y), out, dark)
    return len(gone)


def clear_outline(bm, mats, M):
    """The notch walls round the old shroud's outline, and the doubler's end faces moved onto it: the lintels and
    jambs now fill the outline, so these would sit inside them."""
    Mi = M.inverted()
    bm.normal_update()
    gone = [f for f in bm.faces if opaque(mats, f) and abs((Mi.to_3x3() @ f.normal).y) < 0.5
            and all(C["on_outline"](a, b) and 6.1 <= n <= 6.26 for a, n, b in (lc(Mi, v.co) for v in f.verts))]
    bmesh.ops.delete(bm, geom=gone, context="FACES")
    return len(gone)


def lintel(bm, mats, M, mk, su, sb, to_uv):
    """Lintel (sb 1) or sill (sb -1), one quarter: the band carried across the outline down to the corner piece's
    lower edge (b 0.755), with the band's rounded bevel along it and a wall down to the jamb."""
    Mi = M.inverted()
    dark = mats.index("PaintedMetal_Darker")
    pts, rows, nrms = band_curve()
    nf = len(BAND_BEV) - 1

    def hb(v):
        s, n, b = hc(Mi, v.co, su)
        return s, n, sb * b

    pool = Pool(bm, M, [v for v in bm.verts if (lambda s, n, b: -1e-3 < s < 1.02 and 0.70 < b < 1.01
                                                and n > 6.13)(*hb(v))])

    def g(s, b, n):
        return pool.get(su, s, n, sb * b)

    # top: from the lower edge round the outline, sharing the band's and the corner piece's vertices on it
    H = g(OUT, STRIP_LOW, NB)
    rim = {v for v in pool.vs if abs(hb(v)[1] - NB) < 1e-4 and hb(v)[2] > STRIP_LOW + 1e-3 and hb(v)[0] > -1e-4
           and C["on_outline"](*lc(Mi, v.co)[::2])} | {g(0.0, C["HALF"], NB)}
    rim = sorted(rim, key=lambda v: math.atan2(hb(v)[2] - 0.88, hb(v)[0] - 0.5))
    L = [g(0.0, STRIP_LOW - o, NB - dn) for o, dn in BAND_BEV]
    Mv = [g(r[-1].x, r[-1].y, NB - dn) for r, (o, dn) in zip(rows, BAND_BEV)]   # the corner piece's mitre
    if Mv[0] != H or rows[nf][-1].x <= OUT:
        raise RuntimeError("lintel does not meet the corner piece")
    mk.face([L[0], H] + rim, (0, -1, 0), to_uv, dark)
    out = fold(to_uv, M, su, sb, (0, -1))
    for k in range(nf):
        mk.face([L[k], Mv[k], Mv[k + 1], L[k + 1]], (0, -1, -sb), out, dark)
    # wall: down to the jamb, over the jamb's outer bevel, and past it (s 1.0 to the mitre) into the doubler
    jr = [g(JE + o, WF, JAMB_N - dn) for o, dn in BAND_BEV]
    m = Mv[nf]
    wall = (0, 0, -sb)
    mk.face([L[nf], m, jr[0], g(0.0, WF, JAMB_N)], wall, out, dark)
    for k in range(nf):
        mk.face([m, jr[k + 1], jr[k]], wall, out, dark)
    mk.face([m, g(rows[nf][-1].x, WF, WALL_LOW), g(OUT, WF, WALL_LOW), jr[nf]], wall, out, dark)
    return len(rim)


def jamb(bm, mats, M, mk, su, sb, to_uv):
    """Jamb, one quarter: flat at the strip's height from the port's bevel out to s 1.0 and up under the lintel,
    with the band's rounded bevel on its outer edge and a wall down behind the plate; and the 45 degree bevel down
    to the yellow port, round its chamfered corner."""
    Mi = M.inverted()
    dark = mats.index("PaintedMetal_Darker")
    nf = len(BAND_BEV) - 1
    pool = Pool(bm, M, [v for v in bm.verts if (lambda s, n, b: -1e-3 < s < 1.01 and -1e-3 < sb * b < 0.76
                                                and 6.13 < n < 6.23)(*hc(Mi, v.co, su))])

    def g(s, b, n):
        return pool.get(su, s, n, sb * b)

    Tp, nrm = port_offset(PB)                       # the bevel's top edge, on the jamb
    Yp = port_offset(-PB_IN)[0]                     # its foot, just inside the port's outer wall
    pn = JAMB_N - (PB + PB_IN)
    T = [g(p.x, p.y, JAMB_N) for p in Tp]
    Y = [g(p.x, p.y, pn) for p in Yp]
    k = len(T) - 1                                  # T[0] on s 0, T[k] on b 0
    e0, ec, ew = g(JE, 0.0, JAMB_N), g(JE, Tp[k - 1].y, JAMB_N), g(JE, WF, JAMB_N)
    w0, wc = g(0.0, WF, JAMB_N), g(Tp[1].x, WF, JAMB_N)
    up = (0, -1, 0)
    # the top, in convex pieces (the port's corner bends make the jamb's inner edge concave)
    mk.face([T[0], T[1], wc, w0], up, to_uv, dark)
    mk.face([T[1], T[2], ew, wc], up, to_uv, dark)
    for i in range(2, k - 2):
        mk.face([T[i], T[i + 1], ew], up, to_uv, dark)
    mk.face([T[k - 2], T[k - 1], ec, ew], up, to_uv, dark)
    mk.face([T[k - 1], T[k], e0, ec], up, to_uv, dark)
    rows = [[e0, ec, ew]] + [[g(JE + o, 0.0, JAMB_N - dn), g(JE + o, WF, JAMB_N - dn)] for o, dn in BAND_BEV[1:]]
    out = fold(to_uv, M, su, sb, (1, 0), JAMB_N)
    for k in range(nf):
        mk.face(rows[k] + rows[k + 1][::-1], (su, -1, 0), out, dark)
    f0, fw = rows[-1]
    mk.face([f0, fw, g(OUT, WF, WALL_LOW), g(OUT, WF, JAMB_LOW), g(OUT, 0.0, JAMB_LOW)], (su, 0, 0), out, dark)
    for i, o in enumerate(nrm):
        mk.face([T[i], T[i + 1], Y[i + 1], Y[i]], (-su * o.x, -1, -sb * o.y),
                fold(to_uv, M, su, sb, (-o.x, -o.y), JAMB_N), dark)


def port_offset(d):
    """The port's quarter outline moved out by d (in, if d < 0), mitred, its ends kept on the axes; and each
    segment's outward normal."""
    P = [Vector(p) for p in PORT_Q]
    segs = []
    for i in range(len(P) - 1):
        e = (P[i + 1] - P[i]).normalized()
        segs.append((P[i] + Vector((-e.y, e.x)) * d, e))
    out = [Vector((0.0, P[0].y + d))]
    out += [line_x(segs[i - 1][0], segs[i - 1][1], segs[i][0], segs[i][1]) for i in range(1, len(segs))]
    out.append(Vector((P[-1].x + d, 0.0)))
    return out, [Vector((-e.y, e.x)) for _, e in segs]


def diagonal_source(bm, mats, M, su):
    """The vanilla truss diagonal beside this half's bottom gusset, read before anything changes: per face its
    material, and per corner its side-local position, uv and custom normal. The diagonal is one piece of 64 faces
    (top, bevels, the scalloped steps and walls), joined by shared positions, not shared vertices."""
    Mi, Ri = M.inverted(), M.inverted().to_3x3()
    dark = mats.index("PaintedMetal_Darker")
    cnl, uvl = bm.loops.layers.float_vector.get("_cn"), bm.loops.layers.uv.active

    def pts(f):
        return [hc(Mi, v.co, su) for v in f.verts]

    cand = [f for f in bm.faces if f.material_index == dark
            and max(n for s, n, b in pts(f)) <= BR_N + 5e-4 and min(n for s, n, b in pts(f)) >= 6.08
            and all(abs(s - b - DIAG_C) < 0.3 and 2.1 < s < 3.9 for s, n, b in pts(f))]
    at = {}
    for f in cand:
        for v in f.verts:
            at.setdefault(tuple(round(c, 4) for c in v.co), []).append(f)
    comp = {f for f in cand if all(abs(n - BR_N) < 2e-3 for s, n, b in pts(f))
            and min(b for s, n, b in pts(f)) < 0 < max(b for s, n, b in pts(f))}
    todo = list(comp)
    while todo:
        f = todo.pop()
        for v in f.verts:
            for g in at[tuple(round(c, 4) for c in v.co)]:
                if g not in comp:
                    comp.add(g)
                    todo.append(g)
    if len(comp) != 64:
        raise RuntimeError("vanilla diagonal: %d faces, expected 64" % len(comp))
    return [(f.material_index, [(Mi @ l.vert.co, l[uvl].uv.copy(), Ri @ Vector(l[cnl])) for l in f.loops])
            for f in comp]


def brace(bm, mats, M, mk, su, src):
    """The vanilla diagonal (src) mirrored about the gusset's centre, so it runs from the gusset's port-side chamfer
    up to the jamb as the vanilla one runs from the other chamfer, scalloped step included. It is cut at the jamb's
    outer wall, and an end cap closes it there."""
    R = M.to_3x3()
    Mi = M.inverted()
    dark = mats.index("PaintedMetal_Darker")
    made, new = {}, []
    for mat, loops in src:
        corners = [(Vector((2 * su * SEAM - co.x, co.y, co.z)), uv, Vector((-cn.x, cn.y, cn.z)))
                   for co, uv, cn in reversed(loops)]      # mirrored, so the winding turns over
        vs = []
        for p, uv, cn in corners:
            key = tuple(round(c, 5) for c in p)
            if key not in made:
                made[key] = bm.verts.new(M @ p)
            vs.append(made[key])
        f = bm.faces.new(vs)
        f.material_index = mat
        for l, (p, uv, cn) in zip(f.loops, corners):
            l[mk.uvl].uv = uv
            l[mk.cnl] = R @ cn
        new.append(f)
    mine = set(made.values())
    res = bmesh.ops.bisect_plane(bm, geom=list(mine) + list({e for f in new for e in f.edges}) + new,
                                 plane_co=M @ Vector((su * OUT, 0, 0)), plane_no=R @ Vector((1, 0, 0)))
    mine |= {g for g in res["geom_cut"] if isinstance(g, bmesh.types.BMVert)}

    def s_(v):
        return su * (Mi @ v.co).x

    faces = {f for v in mine for f in v.link_faces}
    bmesh.ops.delete(bm, geom=[f for f in faces if all(s_(v) < OUT + 1e-5 for v in f.verts)], context="FACES")
    cut = list({v for v in mine if v.is_valid and v.link_faces and abs(s_(v) - OUT) < 1e-5})
    c = sum((Mi @ v.co for v in cut), Vector()) / len(cut)
    cut.sort(key=lambda v: math.atan2((Mi @ v.co).y - c.y, (Mi @ v.co).z - c.z))
    mk.face(cut, (-su, 0, 0), lambda co: Vector(((Mi @ co).z * UV, -(Mi @ co).y * UV)), dark)
    return dict(faces=len({f for v in mine if v.is_valid for f in v.link_faces}), cap=len(cut))


def gusset(bm, mats, M, mk, su):
    """The bottom gusset as one piece, with the top gusset's decals turned over."""
    Mi, uvl = M.inverted(), mk.uvl
    dark, a3, a4 = (mats.index(m) for m in ("PaintedMetal_Darker", "Atlas3_Darker", "Atlas4_Darker"))
    P = [Vector(p) for p in GUSSET]
    k = len(P)

    def pts(f):
        return [hc(Mi, v.co, su) for v in f.verts]

    big = offset_poly(OLD_GUSSET, 0.002)
    tops = [f for f in bm.faces if f.material_index == dark and (Mi.to_3x3() @ f.normal).y < -0.99
            and all(n > 6.249 and in_poly(big, (s, b)) for s, n, b in pts(f))]
    to_uv = uv_map(max(tops, key=lambda f: f.calc_area()), uvl)
    # decal sources on this half's top gusset, read before anything changes
    src_vents = [[(hc(Mi, l.vert.co, su), l[uvl].uv.copy()) for l in f.loops] for f in bm.faces
                 if f.material_index == a3 and all(l[uvl].uv.x < 0.19 for l in f.loops)
                 and all(3.7 <= s <= 4.3 and 0.64 <= b <= 0.85 and n > 6.25 for s, n, b in pts(f))]
    src_screw = [[(hc(Mi, l.vert.co, su), l[uvl].uv.copy()) for l in f.loops] for f in bm.faces
                 if f.material_index == a3
                 and all(3.93 <= s <= 3.99 and 0.455 <= b <= 0.51 and n > 6.25 for s, n, b in pts(f))]

    Rs = [offset_poly(OLD_GUSSET, G_CLEAR), offset_poly(GUSSET, G_CLEAR)]
    gone = []
    for f in bm.faces:
        p = pts(f)
        if not all(any(in_poly(R, (s, b)) for R in Rs) for s, n, b in p):
            continue
        if opaque(mats, f):
            band = (Mi.to_3x3() @ f.normal).z > 0.3 and all(b < -0.90 for s, n, b in p)
            if min(n for s, n, b in p) > 6.1 and max(n for s, n, b in p) > 6.16 and not band:
                gone.append(f)
        elif all(n > 6.255 for s, n, b in p):
            gone.append(f)
    bmesh.ops.delete(bm, geom=gone, context="FACES")

    pool = Pool(bm, M, [])

    def V(p, n=ND):
        return pool.get(su, p[0], n, p[1])

    up = (0, -1, 0)
    mk.face([V(p, G_N) for p in P], up, to_uv, dark)
    Q, N = offset_poly(GUSSET, G_BEV), edge_normals(GUSSET)
    for i in range(k):
        j, nr = (i + 1) % k, N[i]
        out = fold(to_uv, M, su, 1, nr, G_N)
        mk.face([V(P[i], G_N), V(P[j], G_N), V(Q[j], G_N - G_BEV), V(Q[i], G_N - G_BEV)],
                (su * nr.x, -1, nr.y), out, dark)
        mk.face([V(Q[i], G_N - G_BEV), V(Q[j], G_N - G_BEV), V(Q[j], G_LOW), V(Q[i], G_LOW)],
                (su * nr.x, 0, nr.y), out, dark)

    # outline: rows inset from the edge, traversed counter-clockwise in (a, b) with u falling
    rows = [offset_poly(GUSSET, -d) for d in OL_D]
    order = list(range(k)) if su > 0 else list(range(k))[::-1]
    seq = order + order[:1]
    arc = 0.0
    for m in range(k):
        i, j = seq[m], seq[m + 1]
        A, B = [r[i] for r in rows], [r[j] for r in rows]
        L = (B[1] - A[1]).length
        st = [(A, A[2], A[2])]                 # (rows, inner point before, inner point after)
        if abs(A[1].y - B[1].y) < 1e-6 and min(A[1].x, B[1].x) < SEAM < max(A[1].x, B[1].x):
            d = 1 if B[1].x > A[1].x else -1
            mid = [Vector((SEAM, a.y)) for a in A]
            st.append((mid, Vector((SEAM - d * SEAM_HW, A[2].y)), Vector((SEAM + d * SEAM_HW, A[2].y))))
        st.append((B, B[2], B[2]))

        def tu(p):
            return OL_U0 - OL_K * (arc + (p - A[1]).dot(B[1] - A[1]) / L)
        for (r0, _, in0), (r1, in1, _) in zip(st, st[1:]):
            for q, vv in (([r0[0], r1[0], r1[1], r0[1]], (OL_V[0], OL_V[0], OL_V[1], OL_V[1])),
                          ([r0[1], r1[1], in1, in0], (OL_V[1], OL_V[1], OL_V[2], OL_V[2]))):
                mk.face([V(p) for p in q], up, [Vector((tu(p), v)) for p, v in zip(q, vv)], a4)
        arc += L
    # centre seam: two half strips, pointed into the outline's groove at both ends
    nt, ntin, nw, nwin = rows[1][2].y, rows[2][2].y, rows[1][5].y, rows[2][5].y
    for d in (1, -1):
        q = [Vector((SEAM, nt)), Vector((SEAM + d * SEAM_HW, ntin)), Vector((SEAM + d * SEAM_HW, nwin)),
             Vector((SEAM, nw))]
        uvs = [(SEAM_U[1], SEAM_V[0]), (SEAM_U[1], SEAM_V[1]), (SEAM_U[0], SEAM_V[1]), (SEAM_U[0], SEAM_V[0])]
        mk.face([V(p) for p in q], up, [Vector(x) for x in uvs], a4)
    # vents: the top gusset's pair turned 180 degrees about the gusset
    for f in src_vents:
        mk.face([V((TOP_SEAM + SEAM - s, VENT_B - b)) for (s, n, b), _ in f], up, [x for _, x in f], a3)
    # screws: the top gusset's screw, at the wide end's corners and either side of the seam at the narrow end
    sp = [p for f in src_screw for p, _ in f]
    cen = Vector(((min(p[0] for p in sp) + max(p[0] for p in sp)) / 2, (min(p[2] for p in sp) + max(p[2] for p in sp)) / 2))
    targets = [(P[5].x + SCREW_WIDE[0], P[5].y + SCREW_WIDE[1]), (P[0].x - SCREW_WIDE[0], P[0].y + SCREW_WIDE[1]),
               (SEAM - SCREW_NARROW[0], P[2].y - SCREW_NARROW[1]), (SEAM + SCREW_NARROW[0], P[2].y - SCREW_NARROW[1])]
    for tg in targets:
        for f in src_screw:
            mk.face([V(Vector((s, b)) - cen + Vector(tg)) for (s, n, b), _ in f], up, [x for _, x in f], a3)
    return dict(gone=len(gone), vents=len(src_vents), screw_faces=len(src_screw))


def remove_frames():
    """The four side shrouds go; the bottom port keeps its frame."""
    gone = []
    for name in FRAMES:
        o = bpy.data.objects.get(name)
        if o is None:
            continue
        fm = o.data
        bpy.data.objects.remove(o)
        if fm is not None and fm.users == 0:
            bpy.data.meshes.remove(fm)
        gone.append(name)
    return gone


def place_keypads():
    """The vanilla keypad housing leans 15.5 degrees, to sit on the shroud's sloped inner edge. On the flat jamb it
    stands flat, centred across the jamb, its top where it was. Housing, keypad and terminal detector move together,
    so the detector still covers the keypad. Running it again changes nothing."""
    out = {}
    for side, M in C["side_frames"]().items():
        Mi = M.inverted()
        kf, kp = bpy.data.objects["Pl_KeypadFrame_" + side], bpy.data.objects["Pl_Keypad_" + side]
        det = [o for o in bpy.data.objects if o.type == "EMPTY" and o.name.startswith("detector_terminal")
               and any(h.obj == kp for h in o.seut.highlight_objects)]
        scr = max(kp.data.polygons, key=lambda p: p.area)
        nl = (Mi.to_3x3() @ kp.matrix_world.to_3x3().inverted().transposed() @ scr.normal).normalized()
        R = nl.rotation_difference(Vector((0, -1, 0))).to_matrix().to_4x4()
        objs = [kf, kp] + det
        W = {o: R @ Mi @ o.matrix_world for o in objs}
        V = [W[kf] @ v.co for v in kf.data.vertices]
        a0, a1 = min(v.x for v in V), max(v.x for v in V)
        mid = (JAMB_IN + JE) / 2 * (1 if a0 + a1 > 0 else -1)
        T = Matrix.Translation((mid - (a0 + a1) / 2, -KEY_TOP - min(v.y for v in V), 0))   # local y = -n
        for o in objs:
            o.matrix_world = M @ T @ W[o]
        bpy.context.view_layer.update()
        V = [Mi @ kf.matrix_world @ v.co for v in kf.data.vertices]
        K = [Mi @ kp.matrix_world @ v.co for v in kp.data.vertices]
        cover = all(all(abs(c) <= d.empty_display_size + 1e-4 for c in d.matrix_world.inverted() @ (M @ k))
                    for d in det for k in K)
        out[side] = dict(turn=round(math.degrees(math.atan2(nl.x, -nl.y)), 2),
                         housing_s=(round(min(v.x for v in V), 4), round(max(v.x for v in V), 4)),
                         housing_n=(round(min(-v.y for v in V), 4), round(max(-v.y for v in V), 4)),
                         keypad_n=(round(min(-v.y for v in K), 4), round(max(-v.y for v in K), 4)),
                         detector_covers=cover, detectors=[d.name for d in det])
    return out


def raise_jambs():
    """The jambs, with their bevel down to the yellow port and their outer rounded edge, move RAISE out, so they stand
    1 cm over the braces and the lintel's and sill's rounded edge comes down straight onto them. The lintel's wall
    under that edge closes to nothing: it goes, and the edge's face takes the jamb's vertices along its foot, so no
    edge ends in the middle of another. The jamb's outer wall and the lintel's wall beside it grow to meet it. The
    bevel's foot stays under the port's rim (n 6.214). The keypads and their detectors move out with the jambs, which
    puts the housing's top at the band face. A second run finds no jamb at the old height and changes nothing."""
    ob = bpy.data.objects[PLAT]
    me = ob.data
    mats = [m.name if m else "" for m in me.materials]
    dark = mats.index("PaintedMetal_Darker")
    frames = C["side_frames"]()
    bm, cnl, uvl = C["open_bm"](me)
    top = JAMB_N + RAISE
    rep = {}
    for side, M in frames.items():
        Mi = M.inverted()

        def at(v):
            return lc(Mi, v.co)

        jambs = [f for f in bm.faces if f.material_index == dark
                 and all(abs(a) <= OUT + 1e-4 and abs(b) <= WF + 1e-4 and 6.18 <= n <= JAMB_N + 1e-4
                         for a, n, b in (at(v) for v in f.verts))]
        if not jambs:
            continue
        moved = {v for f in jambs for v in f.verts}
        for v in moved:
            a, n, b = at(v)
            v.co = M @ Vector((a, -(n + RAISE), b))
        walls = [f for f in bm.faces if opaque(mats, f)
                 and all(abs(at(v)[1] - top) < 1e-5 and abs(abs(at(v)[2]) - WF) < 1e-4 for v in f.verts)]
        weld = {}
        for q in walls:
            e = next(e for e in q.edges if any(g is not q and max(at(v)[1] for v in g.verts) > top + 3e-3
                                                for g in e.link_faces))
            F = next(g for g in e.link_faces if g is not q)
            L, m = sorted(e.verts, key=lambda v: abs(at(v)[0]))
            w0 = next(v for v in q.verts if v is not L and abs(at(v)[0]) < 1e-4)
            weld[w0] = L
            p0, p1 = Vector(at(L)), Vector(at(m))
            d2 = (p1 - p0).length_squared

            def along(v):
                return (Vector(at(v)) - p0).dot(p1 - p0) / d2
            on = sorted((v for v in moved if 1e-4 < along(v) < 1 - 1e-4
                         and ((Vector(at(v)) - p0).cross(p1 - p0)).length < 2e-5), key=along)
            vs = [l.vert for l in F.loops]
            i = vs.index(L)
            seq = vs[:i + 1] + on + vs[i + 1:] if vs[(i + 1) % len(vs)] is m else vs[:i] + on[::-1] + vs[i:]
            to_uv, cn, mat = uv_map(F, uvl), Vector(F.loops[0][cnl]), F.material_index
            olds = {l.vert: (l[uvl].uv.copy(), Vector(l[cnl])) for l in F.loops}
            bmesh.ops.delete(bm, geom=[q, F], context="FACES_ONLY")
            G = bm.faces.new(seq)
            G.material_index = mat
            for l in G.loops:
                l[uvl].uv, l[cnl] = olds.get(l.vert, (to_uv(l.vert.co), cn))
            G.normal_update()
        bmesh.ops.weld_verts(bm, targetmap=weld)
        loose = [e for e in bm.edges if not e.link_faces]
        bmesh.ops.delete(bm, geom=loose, context="EDGES")
        rep[side] = dict(jamb_faces=len(jambs), verts=len(moved), walls_closed=len(walls), welded=len(weld))
    C["close_bm"](bm, me)
    if not rep:
        return dict(already_raised=True)
    for side, M in frames.items():
        kp = bpy.data.objects["Pl_Keypad_" + side]
        objs = [bpy.data.objects["Pl_KeypadFrame_" + side], kp] + [
            o for o in bpy.data.objects if o.type == "EMPTY" and o.name.startswith("detector_terminal")
            and any(h.obj == kp for h in o.seut.highlight_objects)]
        T = M @ Matrix.Translation((0, -RAISE, 0)) @ M.inverted()
        for o in objs:
            o.matrix_world = T @ o.matrix_world
        rep[side]["keypad_moved"] = [o.name for o in objs]
    bpy.context.view_layer.update()
    rep["screws"] = seat_screws()
    rep["raise"] = round(RAISE, 4)
    return rep


def seat_screws(gap=0.0015):
    """The two screw decals on each keypad housing's top plate floated 1 to 1.8 cm over it, past the snap's reach (it
    looks 1.25 cm under a decal), so it rounded them where they were; with the keypads moved out they passed the block
    face by 2 cm. They go back to 1.5 mm over the plate; finish.py's snap then sets them one stored step over it."""
    out = {}
    for side, M in C["side_frames"]().items():
        kf = bpy.data.objects["Pl_KeypadFrame_" + side]
        me, Mi = kf.data, M.inverted()
        mats = [m.name if m else "" for m in me.materials]
        R = (Mi @ kf.matrix_world).to_3x3()
        Wl = Mi @ kf.matrix_world
        Lw = kf.matrix_world.inverted() @ M

        def out_n(p):
            return -(R @ p.normal).normalized().y

        plate = max(-(Wl @ p.center).y for p in me.polygons if mats[p.material_index] != "Decals" and out_n(p) > 0.99)
        vs = {i for p in me.polygons if mats[p.material_index] == "Decals" and out_n(p) > 0.9 for i in p.vertices}
        for i in vs:
            l = Wl @ me.vertices[i].co
            me.vertices[i].co = Lw @ Vector((l.x, -(plate + gap), l.z))
        me.update()
        out[side] = dict(plate=round(plate, 4), screw_verts=len(vs))
    return out


def surround():
    ob = bpy.data.objects[PLAT]
    me = ob.data
    mats = [m.name if m else "" for m in me.materials]
    frames = C["side_frames"]()
    bm, cnl, uvl = C["open_bm"](me)
    diag = {(side, su): diagonal_source(bm, mats, M, su) for side, M in frames.items() for su in (1, -1)}
    rep = {}
    for side, M in frames.items():
        r = rep[side] = dict(band=step_band(bm, mats, M, uvl))
        for su in (1, -1):
            r["clear%+d" % su] = clear_bay(bm, mats, M, su)
            r["vents%+d" % su] = vents(bm, mats, M, su)
            r["seams%+d" % su] = seams(bm, mats, M, su)
    MT = {}
    exec(open(MOUNT_TOOLS).read(), MT)
    orig = {v: v.co.copy() for v in bm.verts}
    for side, M in frames.items():
        for su in (1, -1):
            rep[side]["doubler%+d" % su] = stretch_doubler(bm, mats, M, su)
    MT["fix_uvs"](bm, orig)
    for side, M in frames.items():
        rep[side]["outline_walls"] = clear_outline(bm, mats, M)
    for side, M in frames.items():
        Mi = M.inverted()
        maps = {sb: band_map(bm, mats, Mi, uvl, sb) for sb in (1, -1)}
        mk = Maker(bm, M, cnl, uvl)
        for su in (1, -1):
            rep[side]["gusset%+d" % su] = gusset(bm, mats, M, mk, su)
            for sb in (1, -1):
                rep[side]["corner%+d%+d" % (su, sb)] = corner_piece(bm, mats, M, mk, su, sb, maps[sb])
                rep[side]["lintel%+d%+d" % (su, sb)] = lintel(bm, mats, M, mk, su, sb, maps[sb])
                jamb(bm, mats, M, mk, su, sb, maps[1])     # one map for the whole jamb, so it runs on across b 0
            rep[side]["brace%+d" % su] = brace(bm, mats, M, mk, su, diag[side, su])
        rep[side]["new_faces"] = mk.count
    C["close_bm"](bm, me)
    rep["frames_removed"] = remove_frames()
    rep["keypads"] = place_keypads()
    rep["polys"] = len(me.polygons)
    return rep
