import os
import sys

def list_compatible_images(directory, extensions=['.jpg', '.jpeg', '.png', '.bmp', '.gif']):
    """
    List all image files in the given directory with case-insensitive extension matching.
    """
    compatible_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if any(file.lower().endswith(ext.lower()) for ext in extensions):
                compatible_files.append(os.path.join(root, file))
    return compatible_files

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python list_images.py <directory>")
        sys.exit(1)

    directory_path = sys.argv[1]
    images = list_compatible_images(directory_path)
    print(f"Found {len(images)} compatible images:")
    for img in images:
        print(img)
