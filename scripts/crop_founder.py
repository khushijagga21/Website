from PIL import Image

src = r'C:\Users\Khushi Jagga\.cursor\projects\c-Users-Khushi-Jagga-Desktop-Architect-Webiste\assets\c__Users_Khushi_Jagga_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-be80a910-b401-4776-8755-d1505a903ad7.png'
dst = r'C:\Users\Khushi Jagga\Desktop\Architect Webiste\src\assets\founder.jpg'

im = Image.open(src).convert('RGB')
w, h = im.size

# WhatsApp viewer: top chrome ~28px, bottom thumbnail strip ~95px
top = 28
bottom = h - 95
# Portrait photo is centered; crop a tall portrait frame around the subject
mid_x = w // 2
box_h = bottom - top
box_w = int(box_h * 0.78)
left = max(0, mid_x - box_w // 2)
right = min(w, left + box_w)
left = max(0, right - box_w)

crop = im.crop((left, top, right, bottom))
crop = crop.resize((crop.width * 2, crop.height * 2), Image.Resampling.LANCZOS)
crop.save(dst, 'JPEG', quality=94, optimize=True)
print('saved', dst, crop.size)
