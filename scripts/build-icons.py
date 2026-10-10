"""
Draws the app icons: the seal mark (a white 汉 on seal red), as the header
shows it. Run after changing the brand colour:  python scripts/build-icons.py

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


SEAL = oklch_to_rgb(0.55, 0.2, 27)  # --seal in globals.css (light theme)


def draw(size, radius_ratio, glyph_ratio, path):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=SEAL)
    font = ImageFont.truetype(FONT, int(size * glyph_ratio))
    box = d.textbbox((0, 0), "汉", font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text(((size - w) / 2 - box[0], (size - h) / 2 - box[1]), "汉", font=font, fill="white")
    img.save(path)
    print(path, size)


draw(192, 0.22, 0.6, "public/icon-192.png")
draw(512, 0.22, 0.6, "public/icon-512.png")
draw(512, 0.0, 0.42, "public/icon-maskable-512.png")
draw(180, 0.0, 0.58, "src/app/apple-icon.png")
draw(64, 0.22, 0.62, "src/app/icon.png")
print("seal", SEAL)
