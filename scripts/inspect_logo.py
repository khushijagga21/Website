from PIL import Image
import collections

path = r'C:\Users\Khushi Jagga\Desktop\Architect Webiste\src\assets\arqo-logo-cropped.png'
im = Image.open(path).convert('RGBA')
w, h = im.size
pixels = im.load()

for pos in [(0, 0), (w - 1, 0), (0, h - 1), (w // 2, h // 2), (400, 400), (800, 400), (1200, 400), (1600, 400)]:
    print(pos, pixels[pos])

bins = collections.Counter()
black = 0
trans = 0
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a < 10:
            trans += 1
        elif max(r, g, b) < 25:
            black += 1
            bins[(r // 10 * 10, g // 10 * 10, b // 10 * 10, a // 50 * 50)] += 1

print('opaque near-black', black, 'transparent', trans, 'total', w * h)
print('top', bins.most_common(8))
