"""Original FULSTONE text monogram; local Pillow, no downloaded artwork."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root = Path(__file__).resolve().parent.parent
image = Image.new('RGB', (64, 64), '#f3efe6')
draw = ImageDraw.Draw(image)
font = ImageFont.truetype('C:/Windows/Fonts/georgiab.ttf', 48)
draw.text((15, 1), 'F', fill='#6b3418', font=font)
image.save(root / 'favicon.ico', sizes=[(16, 16), (32, 32), (64, 64)])
