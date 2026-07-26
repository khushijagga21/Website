"""Remove the office background from the founder photo -> transparent PNG."""
from pathlib import Path
from PIL import Image
from rembg import remove, new_session

ASSETS = Path(r'C:\Users\Khushi Jagga\Desktop\Architect Webiste\src\assets')
src = ASSETS / 'founder.jpg'
dst = ASSETS / 'founder.png'

img = Image.open(src).convert('RGBA')

# Portrait/human matting model gives cleaner edges around a person.
session = new_session('u2net_human_seg')
out = remove(
    img,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=15,
    alpha_matting_erode_size=8,
)

out.save(dst, 'PNG', optimize=True)
print('saved', dst, out.size)
