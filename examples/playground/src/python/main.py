#!/usr/bin/env python

# Import necessary libraries
import argparse
import random
from PIL import Image
import argparse
import os

# Function to parse command line arguments
def parse_arguments():
  """
  Parse command line arguments.
  """
  parser = argparse.ArgumentParser(description='Image Shuffler')
  parser.add_argument('input_image', type=str, help='Input PNG image file')
  parser.add_argument('output_image', type=str, help='Output PNG image file')
  parser.add_argument('--size', type=int, default=10, help='Size of squares')
  return parser.parse_args()

# Function to shuffle the image
def shuffle_image(image, size):
  """
  Shuffle the image by moving squares of a given size in a random way.
  """
  width, height = image.size
  num_squares_x = width // size
  num_squares_y = height // size

  # Create a list of square positions
  square_positions = []
  for i in range(num_squares_x):
    for j in range(num_squares_y):
      x = i * size
      y = j * size
      square_positions.append((x, y))

  # Shuffle the square positions randomly
  random.shuffle(square_positions)

  # Create a new image to store the shuffled squares
  shuffled_image = Image.new('RGB', (width, height))

  # Copy and paste the shuffled squares onto the new image
  for i, (x, y) in enumerate(square_positions):
    square = image.crop((x, y, x + size, y + size))
    shuffled_image.paste(square, (x, y))

  return shuffled_image

# Function to save the shuffled image
def save_image(image, output_path):
  """
  Save the shuffled image to the specified output path.
  If no output path is provided, use the input as a base and change the name
  in a way indicative of the modification and look up as to not overwrite anything.
  Then increment if required and save to the same folder as the current working directory.
  """
  if not output_path:
    # Get the input file name and extension
    input_dir, input_filename = os.path.split(args.input_image)
    input_name, input_ext = os.path.splitext(input_filename)

    # Generate the output file name
    output_name = f"{input_name}_shuffled"
    output_ext = input_ext

    # Look up for existing files with the same name
    i = 1
    while os.path.exists(os.path.join(input_dir, f"{output_name}{output_ext}")):
      output_name = f"{input_name}_shuffled_{i}"
      i += 1

    # Set the output path
    output_path = os.path.join(input_dir, f"{output_name}{output_ext}")

  # Save the shuffled image
  try:
    image.save(output_path)
  except Exception as e:
    print(f"Error saving the image: {e}")

# Main function
def main():
  """
  Main function to shuffle the image and save the result.
  """
  # Parse command line arguments
  args = parse_arguments()

  # Load input image
  try:
    input_image = Image.open(args.input_image)
  except Exception as e:
    print(f"Error opening the input image: {e}")
    return

  # Shuffle the image
  shuffled_image = shuffle_image(input_image, args.size)

  # Save the shuffled image
  save_image(shuffled_image, args.output_image)

# Execute main function
if __name__ == '__main__':
  main()
