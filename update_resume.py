import os
from datetime import datetime #for parsing the date
import pymupdf #for processing pdfs
import shutil #for copying the pdf to the assets directory
import re #for searching text in files
from PIL import Image #for converting image to webp

directory = "D:/Important/2025 Resumes"
js_file_path = "D:\Programming\Github Desktop\waffles-codes.github.io\src\pages\Home.js"
print(f'Current working directory: {directory}')

newest_filepath = ""
newest_file = ""
max = 0
for filename in os.scandir(directory):
    # Ensure only PDF files are processed
    if filename.is_file() and filename.name.endswith('.pdf'):
        fileparts = filename.name.split("Evan_Lu_Resume_",)
        #this should return something like "['', 'Feb16_2025.pdf']"

        stringdate = fileparts[1].split(".")[0]
        #this should return something like "Feb16_2025"

        #convert to datetime object
        date = datetime.strptime(stringdate, "%b%d_%Y")
                                                # %b abbreviated month name
                                                # %d day
                                                # %Y: 4 digit year

                        #format date to yyyymmdd
        intdate = int(date.strftime("%Y%m%d"))

        if(intdate > max):
            newest_filepath = filename.path
            newest_file = filename.name.split(".")[0]
            max = intdate

if(newest_filepath != ""):
    print(f"Newest Filepath: {newest_filepath}")
    print(f"Newest File: {newest_file}")
    for filename in os.scandir("D:/Programming/Github Desktop/waffles-codes.github.io/src/assets"):
        # Ensure only PDF files are processed
        if filename.is_file() and filename.name.startswith("Evan_Lu_Resume_"):
            print(f"Removing: {filename}")
            os.remove(filename)

    doc = pymupdf.open(newest_filepath) # open a document
    page = doc[0]
    pix = page.get_pixmap(dpi=300)  # render page to an image

    # store image as .jpg in assets 
    # (pix.save only supports 'png', 'pnm', 'pgm', 'ppm', 'pbm', 'pam', 'psd', 'ps', 'jpg', 'jpeg' NOT webp)
    path = f"D:/Programming/Github Desktop/waffles-codes.github.io/src/assets/{newest_file}.jpg"

    img = Image.open(path)
        
    # Save as .webp with multiple standard sizes to the same filepath
    img.save(f"D:/Programming/Github Desktop/waffles-codes.github.io/src/assets/{newest_file}.webp", format='webp')

    # copy pdf to assets
    # DESTINATION MUST BE A FILE NOT A DIRECTORY
    shutil.copyfile(newest_filepath, 
                    f"D:/Programming/Github Desktop/waffles-codes.github.io/src/assets/{newest_file}.pdf")


    search_stmt = r"import resume_image from '../assets/Evan_Lu_Resume_.*\.webp';\nimport resume from '../assets/Evan_Lu_Resume_.*\.pdf';"
                            #read
    with open(js_file_path, 'r', encoding='utf-8') as js_file:
        js_content = js_file.read()

    if re.search(search_stmt, js_content):
        updated_js_content = re.sub(search_stmt, 
                                    f"import resume_image from '../assets/{newest_file}.webp';\nimport resume from '../assets/{newest_file}.pdf';", 
                                    js_content)
                                #write
        with open(js_file_path, 'w', encoding='utf-8') as js_file:
            js_file.write(updated_js_content)
        print(f"Updated JavaScript file: {js_file_path}")
    else:
        print("Text not found in JavaScript file.")

else:
    print("no pdfs in directory")