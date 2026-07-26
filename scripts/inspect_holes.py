from PIL import Image

path = r'C:\Users\Khushi Jagga\Desktop\Architect Webiste\src\assets\arqo-logo-cropped.png'
im = Image.open(path).convert('RGBA')
w, h = im.size
pixels = im.load()

# Sample likely hole centers for R, Q, O (approx)
samples = [
    ('R hole', 720, 320),
    ('Q hole', 1180, 360),
    ('O hole', 1680, 360),
    ('A hole', 280, 380),
]
for name, x, y in samples:
    print(name, x, y, pixels[x, y])

# Count dark-but-colored remaining (lum < 60, chroma > 15)
n = 0
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a < 200:
            continue
        lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
        chroma = max(r, g, b) - min(r, g, b)
        if lum < 60 and chroma > 15:
            n += 1
print('dark colored opaque', n)
