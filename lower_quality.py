import os
from PIL import Image

file = "Evan_Lu_Professional_Profile_Confident.webp"

directory = "D:/Programming/Github Desktop/waffles-codes.github.io/src/assets"
print(f'Current working directory = {directory}')
for filename in os.scandir(directory):
    # Process the file which matches the file name
    if filename.is_file() and (filename.name == file):  
        print(filename)
        print(filename.path)
        img = Image.open(filename.path)
        
        # Save as a webp of lower quality
        img.save(f'{os.path.splitext(filename.path)[0]}.webp', format='webp', quality=20)