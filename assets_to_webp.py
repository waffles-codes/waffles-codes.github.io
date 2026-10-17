"""converts png, jpg, and heic to webp"""

import os
from PIL import Image
from pillow_heif import register_heif_opener

directory = "D:/Programming/Github Desktop/waffles-codes.github.io/src/assets"
print(f'Current working directory = {directory}')
for filename in os.scandir(directory):
    # Ensure only PNG, JPG, and HEIC files are processed
    if filename.is_file() and (filename.name.endswith('.png') or filename.name.endswith('.jpg') or filename.name.endswith('.HEIC')):  
        print(filename)
        print(filename.path)
        register_heif_opener()
        img = Image.open(filename.path)
        
        # Save as .webp to filepath
        img.save(f'{os.path.splitext(filename.path)[0]}.webp', format='webp')