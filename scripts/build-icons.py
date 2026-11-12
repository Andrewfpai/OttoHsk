"""
Draws the app icons: the brand mark (a white 汉 on an indigo-to-teal tile,
with a small spark), as the header shows it. Run after changing the brand
colours (--brand-from / --brand-to):  python scripts/build-icons.py

- public/icon-192.png, public/icon-512.png: rounded, for "any" purpose.
- public/icon-maskable-512.png: full bleed, glyph inside the safe zone, so
  Android can crop it to any shape.
- src/app/apple-icon.png (180), src/app/icon.png (64): picked up by Next.js.
"""
import math
from PIL import Image, ImageDraw, ImageFont

FONT = "C:/Windows/Fonts/msyhbd.ttc"


def oklch_to_rgb(l, c, h):
    a, b = c * math.cos(math.radians(h)), c * math.sin(math.radians(h))
    l_, m_, s_ = l + 0.3963377774 * a + 0.2158037573 * b, l - 0.1055613458 * a - 0.0638541728 * b, l - 0.0894841775 * a - 1.2914855480 * b
    l3, m3, s3 = l_ ** 3, m_ ** 3, s_ ** 3
    lin = (
        4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
        -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
        -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3,
    )
    def gamma(x):
        x = min(max(x, 0.0), 1.0)
        return 12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055
    return tuple(round(gamma(x) * 255) for x in lin)


FROM = oklch_to_rgb(0.5, 0.17, 275)  # --brand-from in globals.css (light theme)
TO = oklch_to_rgb(0.66, 0.12, 195)  # --brand-to


def gradient(size):
    """A top-left to bottom-right blend from FROM to TO."""
    img = Image.new("RGBA", (size, size))
    px = img.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * (size - 1))
            px[x, y] = tuple(round(a + (b - a) * t) for a, b in zip(FROM, TO)) + (255,)
    return img


def sparkle(d, cx, cy, r):
    """A four-point star with curved sides, as the header's SVG draws it."""
    pts = []
    for k in range(64):
        a = 2 * math.pi * k / 64
        # Astroid-like curve: sharp points on the axes, pinched between.
        x, y = math.cos(a) ** 3, math.sin(a) ** 3
        pts.append((cx + r * x, cy + r * y))
    d.polygon(pts, fill=(255, 255, 255, 235))


def draw(size, radius_ratio, glyph_ratio, path):
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255)
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    img.paste(gradient(size), (0, 0), mask)
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT, int(size * glyph_ratio))
    box = d.textbbox((0, 0), "汉", font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text(((size - w) / 2 - box[0], (size - h) / 2 - box[1] + size * 0.02), "汉", font=font, fill="white")
    # The spark sits in the corner margin, scaled with the glyph.
    r = size * glyph_ratio * 0.18
    inset = (size - size * glyph_ratio) / 2
    sparkle(d, size - inset * 0.55 - r * 0.2, inset * 0.55 + r * 0.2, r)
    img.save(path)
    print(path, size)


draw(192, 0.22, 0.6, "public/icon-192.png")
draw(512, 0.22, 0.6, "public/icon-512.png")
draw(512, 0.0, 0.42, "public/icon-maskable-512.png")
draw(180, 0.0, 0.58, "src/app/apple-icon.png")
draw(64, 0.22, 0.62, "src/app/icon.png")
print("brand", FROM, TO)
