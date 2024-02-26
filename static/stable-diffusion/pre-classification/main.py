import argparse
from image_loader import list_images
from analyses.face_detection import FaceDetection
from analyses.image_quality_analyzer import ImageQualityAnalyzer
# Import other analyses as needed

from multiprocessing import Pool

def analyze_image(args):
  image_path, analysis = args
  return analysis.analyze(image_path)

def run_analyses(image_paths, analyses):
  with Pool(10) as p:  # Create a pool of 10 processes
    results = p.map(analyze_image, [(image_path, analysis) for image_path in image_paths for analysis in analyses])
  return results

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Image Analysis Pipeline")
    parser.add_argument("directory", type=str, help="Directory containing images")
    args = parser.parse_args()

    image_paths = list_images(args.directory)
    # analyses = [FaceDetection()]  # Add other analysis instances as needed
    analyses = [ ImageQualityAnalyzer()]  # Add ImageQualityAnalyzer instance
    run_analyses(image_paths, analyses)
