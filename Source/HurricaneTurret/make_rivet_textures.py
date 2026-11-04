"""Paintable rivet decal for the Hurricane: the vanilla plain dome (Decals_Atlas_A_01 piece 10, as PanelingColorable
and Decals use it) cut out to a 64 px texture set and repainted to match the plate it sits on (PaintedMetal_Colorable).
- Paint keeps a colour map's brightness, and the vanilla paintable rivets were "too bright" (owner, in game,
  2026-11-03), so the colour map is scaled in linear to the plate's average value.
- The scaled copy then read "too metal" and "too scratched" for paint (owner, in game, 2026-11-03): the plate is
  uniform (metalness 0.40 everywhere, value within 0.25-0.27, gloss mostly 0.42-0.48), while the dome's scratches ran
  from metalness 0.15, value 0.08 and gloss 0.78. So every map is averaged round the dome's centre, keeping its round
  shape, rim and edge and dropping the scratches, and metalness and gloss are set to the plate's medians.
- Fully clean felt "a little too clean ... needs a little bit of imperfection to feel lived in" (owner, 2026-11-03),
  so WEAR of the scratches comes back in colour, gloss, relief and shading; metalness stays flat (no bare-metal
  glints) and the edge stays round. WEAR 0 is the clean dome, 1 the vanilla scratches at the plate's levels.
- At the plate's metalness and gloss (0.40, 0.455) the rivets still read "too glossy/shiny/metal" for paint, with
  WEAR 0.3 liked (owner, in game, 2026-11-03): a flat plate shows its shine at one angle, a dome always faces the
  light somewhere, and metalness tints that shine with the paint colour. So the dome gets its own METAL and GLOSS,
  below the plate's.

blender -b --factory-startup --python make_rivet_textures.py -- [measure] [out <dir>] [wear <0..1>] [metal <0..1>]
    [gloss <0..1>]
Writes Textures\\Cubes\\Large\\GVK_RivetColorable_{cm,ng,add,alphamask}.tif beside this script (or in <dir>); SEUT
converts them to DDS in the mod at export. RIVET_BOX is the piece's place in the 64 px window, for the decal UVs."""
import bpy, os, sys
import numpy as np

SRC = r"C:\SE_Assets\Textures\Models\Cubes" + "\\"
ARGS = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = ARGS[ARGS.index("out") + 1] if "out" in ARGS else \
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "Textures", "Cubes", "Large")
arg = lambda k, d: float(ARGS[ARGS.index(k) + 1]) if k in ARGS else d
WEAR = arg("wear", 0.3)                     # share of the vanilla scratches (owner: 0.3)
METAL = arg("metal", 0.10)                  # the plate is 0.40
GLOSS = arg("gloss", 0.20)                  # the plate's median is 0.455; the scratches add up to about 0.1 at WEAR 0.3
                                            # (owner, in game, 2026-11-03: 0.30, then "drop gloss down to 0.2")
NAME = "GVK_RivetColorable"
X0, Y0, N = 576, 1984, 64                   # window in the 2048 px atlas (pixels from the left, from the bottom)
PIECE = (0.2842, 0.9717, 0.3096, 0.9971)    # piece 10 in the atlas (u0, v0, u1, v1)
RIVET_BOX = tuple(round((PIECE[i] * 2048 - (X0, Y0)[i % 2]) / N, 4) for i in range(4))


def load(name):
    im = bpy.data.images.load(SRC + name + ".TIF"); im.colorspace_settings.name = 'Non-Color'
    W, H = im.size
    a = np.array(im.pixels[:], dtype=np.float32).reshape(H, W, 4)          # raw stored values, rows bottom up
    bpy.data.images.remove(im)
    return a


lin = lambda c: np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
srgb = lambda c: np.where(c <= 0.0031308, c * 12.92, 1.055 * np.clip(c, 0, None) ** (1 / 2.4) - 0.055)


def save(a, suffix):
    os.makedirs(OUT, exist_ok=True)
    im = bpy.data.images.new(NAME + "_" + suffix, N, N, alpha=True)
    im.colorspace_settings.name = 'Non-Color'
    im.pixels = np.clip(a, 0, 1).astype(np.float32).ravel()
    im.filepath_raw = os.path.join(OUT, NAME + "_" + suffix + ".tif"); im.file_format = 'TIFF'
    im.save(); bpy.data.images.remove(im)


def main():
    plate_cm, plate_ng = load("PaintedMetalColorable_cm"), load("PaintedMetalColorable_ng")
    win = lambda a: a[Y0:Y0 + N, X0:X0 + N].copy()
    cm, ng, add, am = (win(load("Decals_Atlas_A_01_" + s)) for s in ("cm", "ng", "add", "alphamask"))
    ring = np.ones((N, N), bool); ring[3:-3, 3:-3] = False                 # neighbours' faint edges off the border
    am[ring, :3] = 0
    solid = am[..., 0] > 0.5
    pv = lin(plate_cm[..., :3]).max(-1).mean()
    print("RIVET_BOX", RIVET_BOX)
    print("plate: value %.3f metal %.3f gloss %.3f (medians)" % (pv, np.median(plate_cm[..., 3]),
                                                                 np.median(plate_ng[..., 3])))
    metal, gloss = METAL, GLOSS
    print("dome:  value %.3f metal %.3f gloss %.3f paint %.2f solid px %d"
          % (lin(cm[..., :3]).max(-1)[solid].mean(), cm[..., 3][solid].mean(), ng[..., 3][solid].mean(),
             add[..., 3][solid].mean(), solid.sum()))
    if "measure" in ARGS:
        return

    # the dome's centre, and each pixel's distance and direction from it (x right, y up: rows are bottom up)
    w = am[..., 0]
    yy, xx = np.mgrid[0:N, 0:N] + 0.5
    cx, cy = (xx * w).sum() / w.sum(), (yy * w).sum() / w.sum()
    r = np.maximum(np.hypot(xx - cx, yy - cy), 1e-6)
    ux, uy = (xx - cx) / r, (yy - cy) / r
    K = int(r.max() * 2) + 2
    b = (r * 2).astype(int)

    def radial(a, wt, lean=False):
        """a averaged over each half-pixel ring round the centre (weighted by wt), put back at every pixel. The
        innermost rings hold a pixel or two, so they take the value 1.5 px out (a lean shrinks to 0 at the centre)."""
        s = np.bincount(b.ravel(), (a * wt).ravel(), K); c = np.bincount(b.ravel(), wt.ravel(), K)
        prof = s / np.maximum(c, 1e-9)
        rk = (np.arange(K) + 0.5) / 2
        prof[:3] = prof[3] * (rk[:3] / rk[3] if lean else 1)
        return np.interp(r, rk, prof)

    wt = w + 1e-3                                                         # the dome counts; the rest stays sane
    # normal map: the dome's normals lean along the radius; keep that lean per radius, drop everything else
    nx, ny = ng[..., 0] * 2 - 1, ng[..., 1] * 2 - 1
    sg = min((1, -1), key=lambda s: (np.abs(-nx * uy + s * ny * ux) * w).sum())   # green up or green down
    lean = radial(nx * ux + sg * ny * uy, wt, lean=True)
    print("centre %.2f, %.2f px; green %s; scratch share of the lean %.2f"
          % (cx, cy, "up" if sg > 0 else "down",
             (np.abs(-nx * uy + sg * ny * ux) * w).sum() / (np.abs(nx * ux + sg * ny * uy) * w).sum()))
    mix = lambda clean, orig: clean + WEAR * (orig - clean)               # WEAR of the scratches back
    ng[..., 0] = (mix(lean * ux, nx) + 1) / 2
    ng[..., 1] = (mix(sg * lean * uy, ny) + 1) / 2
    ng[..., 2] = mix(radial(ng[..., 2], wt), ng[..., 2])
    g0 = np.clip(ng[..., 3] + gloss - ng[..., 3][solid].mean(), 0, 1)     # the scratches' gloss, at the plate's level
    ng[..., 3] = mix(gloss, g0)
    # colour: the averaged dome (its rim shading stays) with WEAR of the scratches, scaled to the plate's value;
    # the plate's metalness, flat
    for k in range(3):
        c = lin(cm[..., k]); cm[..., k] = mix(radial(c, wt), c)
    cm[..., :3] = srgb(cm[..., :3] * (pv / cm[..., :3].max(-1)[solid].mean()))
    cm[..., 3] = metal
    for k in range(4):
        add[..., k] = mix(radial(add[..., k], wt), add[..., k])
        am[..., k] = radial(am[..., k], np.ones_like(w)) if k < 3 else am[..., k]
    am[ring, :3] = 0
    solid = am[..., 0] > 0.5
    v = lin(cm[..., :3]).max(-1)[solid]
    print("new (wear %.2f): value %.3f (p5 %.3f p95 %.3f) metal %.3f gloss %.3f (p95 %.3f) AO %.2f solid px %d"
          % (WEAR, v.mean(), np.percentile(v, 5), np.percentile(v, 95), cm[..., 3][solid].mean(),
             ng[..., 3][solid].mean(), np.percentile(ng[..., 3][solid], 95), add[..., 0][solid].mean(), solid.sum()))
    for a, s in ((cm, "cm"), (ng, "ng"), (add, "add"), (am, "alphamask")):
        save(a, s)
    print("WROTE", OUT)


main()
