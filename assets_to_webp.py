import os
from PIL import Image

directory = "D:/Programming/Github Desktop/waffles-codes.github.io/src/assets"
print(f'Current working directory = {directory}')
for filename in os.scandir(directory):
    # Ensure only PNG and JPG files are processed
    if filename.is_file() and (filename.name.endswith('.png') or filename.name.endswith('.jpg') or filename.name.endswith('.heic')):  
        print(filename)
        print(filename.path)
        img = Image.open(filename.path)
        
        # Save as .webp to filepath
        img.save(f'{os.path.splitext(filename.path)[0]}.webp', format='webp')