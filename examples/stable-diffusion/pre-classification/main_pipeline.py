from list_images import list_compatible_images
from analysis_adapter import FaceDetectionAdapter, QualityAssessmentAdapter
import sys

def main(directory_path):
    images = list_compatible_images(directory_path)
    analyses = [FaceDetectionAdapter(), QualityAssessmentAdapter()]  # Add or remove adapters here

    for img in images:
        for analysis in analyses:
            analysis.analyze(img)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python main_pipeline.py <directory>")
        sys.exit(1)

    main(sys.argv[1])
