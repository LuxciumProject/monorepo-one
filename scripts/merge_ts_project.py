import os
import sys

# Define the file extensions to consider
FILE_EXTENSIONS = [
    '.ts', '.tsx', '.js', '.jsx', '.json', '.jsonc',
    '.mts', '.cts', '.mjs', '.cjs'
]

def get_all_files(directory):
    """Recursively get all files in the directory with the specified extensions."""
    files = []
    for root, _, filenames in os.walk(directory):
        for filename in filenames:
            if any(filename.endswith(ext) for ext in FILE_EXTENSIONS):
                files.append(os.path.join(root, filename))
    return files

def merge_files(directory, output_file):
    """Merge all files in the directory into a single output file."""
    files = get_all_files(directory)
    with open(output_file, 'w') as outfile:
        for file in files:
            relative_path = os.path.relpath(file, directory)
            outfile.write(f'// START {relative_path}\n')
            with open(file, 'r') as infile:
                outfile.write(infile.read())
            outfile.write(f'\n// END {relative_path}\n\n')

def main():
    # Get the directory from the first argument or use the current directory
    directory = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()

    # Check if package.json is present in the directory
    if not os.path.exists(os.path.join(directory, 'package.json')):
        print(f"No package.json found in {directory}. Exiting.")
        return

    # Define the output file
    output_file = os.path.join(directory, 'merged_output.txt')

    # Merge the files
    merge_files(directory, output_file)
    print(f"Files merged into {output_file}")

if __name__ == "__main__":
    main()
