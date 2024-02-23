from analysis_adapter import AnalysisAdapter
import os
from PIL import Image
import cv2
import numpy as np

OUTPUT_DIR = '/tmp/symlink_directory2'
class ImageQualityAnalyzer(AnalysisAdapter):
  def __init__(self, target_size=1024, maintain_aspect_ratio=True):
    self.target_size = target_size
    self.maintain_aspect_ratio = maintain_aspect_ratio

  def analyze(self, image_path):
    try:
      image = Image.open(image_path)
      original_size = image.size
      file_size = os.path.getsize(image_path)  # Get file size in bytes
      image, resized_size = self.resize_image(image)
      image_np = np.array(image)
      sharpness = self.calculate_sharpness(image_np)
      noise = self.calculate_noise(image_np)
      score = max(0, sharpness - noise)  # Ensure score is non-negative
      score *= 100  # Scale score to avoid negative values and allow for finer sorting
      score_str = f"{int(score):06d}"

      symlink_name = f"{score_str}_{os.path.basename(image_path)}"
      symlink_path = os.path.join(OUTPUT_DIR, symlink_name)

      if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

      if not os.path.exists(symlink_path):
        os.symlink(os.path.abspath(image_path), symlink_path)

      quality_efficiency = score / file_size if file_size else 0  # Avoid division by zero
      print(f"Created symlink for {image_path} as {symlink_path}. Original size: {original_size}, Resized: {resized_size}, Sharpness: {sharpness}, Noise: {noise}, Score: {score}, Quality/File Size: {quality_efficiency}")
      return original_size, resized_size, sharpness, noise, score, quality_efficiency
    except Exception as e:
      print(f"Error processing {image_path}: {e}")
      return (0, 0), (0, 0), 0, 0, 0, 0  # Default values including quality_efficiency


  def resize_image(self, image):
    if self.maintain_aspect_ratio:
      original_width, original_height = image.size
      ratio = min(self.target_size / original_width, self.target_size / original_height)
      new_size = (int(original_width * ratio), int(original_height * ratio))
      resized_image = image.resize(new_size, Image.Resampling.LANCZOS)  # Corrected line
      return resized_image, new_size
    else:
      resized_image = image.resize((self.target_size, self.target_size), Image.Resampling.LANCZOS)  # Corrected line
      return resized_image, (self.target_size, self.target_size)

  def calculate_sharpness(self, image_np):
    gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    return laplacian_var

  def calculate_noise(self, image_np):
    gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    high_freq = gray - blurred
    noise_level = np.std(high_freq)
    return noise_level
