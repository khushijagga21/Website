"""Use the new founder photo: remove light/white office wall, keep subject+desk,
composite onto a dark backdrop matching the site so the frame has no white."""
from pathlib import Path
from PIL import Image
from rembg import remove, new_session

ASSETS = Path(r'C:\Users\Khushi Jagga\Desktop\Architect Webiste\src\assets')
SRC = Path(
    r'C:\Users\Khushi Jagga\.cursor\projects\c-Users-Khushi-Jagga-Desktop-Architect-Webiste\assets'
    r'\c__Users_Khushi_Jagga_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images'
    r'_ChatGPT_Image_Jul_26__2026__05_34_10_PM-f098998d-b021-4d6b-8582-3582f0519c9f.png'
)

# Flat filename in assets (underscores, not nested folders)
SRC = Path(
    r'C:\Users\Khushi Jagga\.cursor\projects\c-Users-Khushi-Jagga-Desktop-Architect-Webiste\assets'
) / (
    'c__Users_Khushi_Jagga_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_'
    'ChatGPT_Image_Jul_26__2026__05_34_10_PM-f098998d-b021-4d6b-8582-3582f0519c9f.png'
)

img = Image.open(SRC).convert('RGBA')

# Upscale for retina
if img.width < 1000:
    scale = 1000 / img.width
    img = img.resize(
        (int(img.width * scale), int(img.height * scale)),
        Image.Resampling.LANCZOS,
    )

w, h = img.size

# General model keeps desk/model better than human-only seg
session = new_session('u2net')
cut = remove(
    img,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=10,
    alpha_matting_erode_size=6,
)

# Dark warm backdrop matching the site (no white)
top = (48, 46, 42)
bottom = (28, 26, 24)
bg = Image.new('RGB', (w, h))
px = bg.load()
for y in range(h):
    t = y / max(h - 1, 1)
    r = int(top[0] + (bottom[0] - top[0]) * t)
    g = int(top[1] + (bottom[1] - top[1]) * t)
    b = int(top[2] + (bottom[2] - top[2]) * t)
    for x in range(w):
        px[x, y] = (r, g, b)

canvas = bg.convert('RGBA')
canvas.alpha_composite(cut)
out = canvas.convert('RGB')

out.save(ASSETS / 'founder.jpg', 'JPEG', quality=93, optimize=True)
out.save(ASSETS / 'founder.png', 'PNG', optimize=True)
print('saved', out.size)
