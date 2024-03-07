from analysis_adapter import AnalysisAdapter
import os
from PIL import Image
import cv2
import numpy as np

OUTPUT_DIR = '/tmp/symlink_directory3'
class ImageQualityAnalyzer(AnalysisAdapter):
  def __init__(self, target_size=1024, maintain_aspect_ratio=False):
    self.target_size = target_size
    self.maintain_aspect_ratio = maintain_aspect_ratio
    self.sharpness_ponderation = 100 * 1
    self.noise_ponderation = 10 *1
    self.quality_ponderation = 10 *1
  def analyze(self, image_path):
    try:
      image = Image.open(image_path)
      original_size = image.size
      file_size = os.path.getsize(image_path)  # Get file size in bytes
      image, resized_size = self.resize_image(image)
      image_np = np.array(image)

      # Upload the image to the GPU
      image_gpu = cv2.cuda_GpuMat()
      image_gpu.upload(image_np)

      # Convert the image to grayscale on the GPU
      gray_gpu = cv2.cuda.cvtColor(image_gpu, cv2.COLOR_BGR2GRAY)

      # Download the grayscale image back to the CPU
      gray = gray_gpu.download()

      quality = 0
      if self.quality_ponderation != 0:
        quality = self.calculate_quality(gray)

      sharpness= 0
      if self.sharpness_ponderation != 0:
        sharpness = self.calculate_sharpness(gray)

      noise = 0
      if self.noise_ponderation != 0:
        noise = self.calculate_noise(gray)

      pondered_sharpness = self.sharpness_ponderation * sharpness
      pondered_noise =   self.noise_ponderation * noise
      pondered_quality = self.quality_ponderation * quality

      # Ensure score is non-negative
      score =  (pondered_sharpness + pondered_noise + pondered_quality)
      score *= 1000  # Scale score to avoid negative values and allow for finer sorting
      score_str = f"{int(score):010d}"

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
    cv2.cuda.setDevice(0)
    if self.maintain_aspect_ratio:
      original_width, original_height = image.size
      ratio = min(self.target_size / original_width, self.target_size / original_height)
      new_size = (int(original_width * ratio), int(original_height * ratio))
      resized_image = image.resize(new_size, Image.Resampling.LANCZOS)  # Corrected line
      return resized_image, new_size
    else:
      resized_image = image.resize((self.target_size, self.target_size), Image.Resampling.LANCZOS)  # Corrected line
      return resized_image, (self.target_size, self.target_size)

  def calculate_sharpness(self, image_np_gray):
    cv2.cuda.setDevice(0)
    # Upload the grayscale image to the GPU
    gray_gpu = cv2.cuda_GpuMat()
    gray_gpu.upload(image_np_gray)

    # Calculate the Laplacian variance on the GPU
    laplacian_gpu = cv2.cuda.createLaplacianFilter(cv2.CV_64F, ksize=1).apply(gray_gpu)
    laplacian_var = cv2.cuda.createGpuMat().setTo(laplacian_gpu.var())

    # Download the result back to the CPU
    laplacian_var = laplacian_var.download()

    return laplacian_var

  def calculate_quality(self, image_np_gray):
    cv2.cuda.setDevice(0)
    # Upload the grayscale image to the GPU
    gray_gpu = cv2.cuda_GpuMat()
    gray_gpu.upload(image_np_gray)

    # Calculate the image gradient on the GPU
    gradient_x_gpu = cv2.cuda.Sobel(gray_gpu, cv2.CV_64F, 1, 0, ksize=3)
    gradient_y_gpu = cv2.cuda.Sobel(gray_gpu, cv2.CV_64F, 0, 1, ksize=3)

    # Calculate the gradient magnitude on the GPU
    gradient_magnitude_gpu = cv2.cuda.magnitude(gradient_x_gpu, gradient_y_gpu)

    # Download the result back to the CPU
    gradient_magnitude = gradient_magnitude_gpu.download()

    quality = np.mean(gradient_magnitude)

    return quality

  def calculate_noise(self, image_np_gray):
    cv2.cuda.setDevice(0)
    # Upload the grayscale image to the GPU
    gray_gpu = cv2.cuda_GpuMat()
    gray_gpu.upload(image_np_gray)

    # Apply Gaussian blur on the GPU
    blurred_gpu = cv2.cuda.createGaussianFilter(cv2.CV_64F, (5, 5), 0).apply(gray_gpu)

    # Calculate the high-frequency component on the GPU
    high_freq_gpu = cv2.cuda.subtract(gray_gpu, blurred_gpu)

    # Download the result back to the CPU
    high_freq = high_freq_gpu.download()

    noise_level = np.std(high_freq)

    return noise_level
