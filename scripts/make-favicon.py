from PIL import Image
import base64
import io
from pathlib import Path

root = Path(__file__).resolve().parents[1]
logo = Image.open(root / "src/assets/arqo-logo-premium.png").convert("RGBA")
pub = root / "public"


def make_square(size: int, pad_ratio=0.02) -> Image.Image:
    # Transparent canvas — ARQO mark only, no black plate
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    max_w = int(size * (1 - 2 * pad_ratio))
    max_h = int(size * (1 - 2 * pad_ratio))
    lw, lh = logo.size
    scale = min(max_w / lw, max_h / lh)
    nw, nh = max(1, int(lw * scale)), max(1, int(lh * scale))
    resized = logo.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (size - nw) // 2
    y = (size - nh) // 2
    canvas.alpha_composite(resized, (x, y))
    return canvas


make_square(16).save(pub / "favicon-16x16.png", optimize=True)
make_square(32).save(pub / "favicon-32x32.png", optimize=True)
make_square(48).save(
    pub / "favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
)
make_square(180).save(pub / "apple-touch-icon.png", optimize=True)
make_square(192).save(pub / "icon-192.png", optimize=True)
make_square(512).save(pub / "icon-512.png", optimize=True)

buf = io.BytesIO()
make_square(128).save(buf, format="PNG", optimize=True)
b64 = base64.b64encode(buf.getvalue()).decode("ascii")
(pub / "favicon.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">'
    f'<image href="data:image/png;base64,{b64}" width="128" height="128"/>'
    f"</svg>\n",
    encoding="utf-8",
)
print("favicon assets updated")
