"""Make near-black letter-hole fills transparent in ARQO logo PNGs."""
from PIL import Image
from pathlib import Path

ASSETS = Path(r'C:\Users\Khushi Jagga\Desktop\Architect Webiste\src\assets')
FILES = [
    'arqo-logo-cropped.png',
    'arqo-logo-transparent.png',
    'arqo-logo.png',
]


def process(im: Image.Image) -> Image.Image:
    im = im.convert('RGBA')
    pixels = im.load()
    w, h = im.size
    cleared = 0

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue

            mx = max(r, g, b)
            mn = min(r, g, b)
            chroma = mx - mn
            lum = 0.2126 * r + 0.7152 * g + 0.0722 * b

            # Hard black / charcoal fills inside letter counters
            if lum <= 28 and chroma <= 30:
                pixels[x, y] = (0, 0, 0, 0)
                cleared += 1
                continue

            # Soft fringe around holes (anti-aliased black → soft alpha)
            if lum <= 55 and chroma <= 22:
                # Fade: darker = more transparent
                fade = max(0.0, (lum - 10) / 45.0)
                na = int(a * fade)
                if na < 8:
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    pixels[x, y] = (r, g, b, na)
                cleared += 1

    print(f'  cleared/softened ~{cleared} pixels')
    return im


def main():
    for name in FILES:
        path = ASSETS / name
        if not path.exists():
            print('skip missing', name)
            continue
        print('processing', name)
        out = process(Image.open(path))
        # Keep a backup once
        bak = path.with_suffix(path.suffix + '.bak')
        if not bak.exists():
            path.replace(bak)
            out.save(path, 'PNG', optimize=True)
            print('  saved (backup ->', bak.name, ')')
        else:
            out.save(path, 'PNG', optimize=True)
            print('  saved')


if __name__ == '__main__':
    main()
