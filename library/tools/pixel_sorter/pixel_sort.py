import sys

import numpy as np
from PIL import Image


def sort_pixels_by_color(image_path, output_path):
    image = Image.open(image_path)
    image = image.convert("RGB")
    data = np.array(image)
    pixels = data.reshape(-1, 3)
    sorted_pixels = sorted(pixels, key=lambda pixel: (pixel[0], pixel[1], pixel[2]))
    sorted_data = np.array(sorted_pixels).reshape(data.shape)
    sorted_image = Image.fromarray(sorted_data.astype("uint8"), "RGB")
    sorted_image.save(output_path)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python pixel_sort.py <input_image> <output_image>")
    else:
        sort_pixels_by_color(sys.argv[1], sys.argv[2])
