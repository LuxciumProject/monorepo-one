import os
import glob

def list_images(directory, extensions=['.jpg', '.jpeg', '.png', '.bmp']):
    images = []
    for extension in extensions:
        images.extend(glob.glob(os.path.join(directory, f'*{extension}')))
        images.extend(glob.glob(os.path.join(directory, f'*{extension.upper()}')))
    return images
