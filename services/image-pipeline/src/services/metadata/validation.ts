import { ImageMetadata } from "../../types";

export async function validateMetadata(
  metadata: ImageMetadata,
): Promise<ImageMetadata> {
  // Ensure required fields are present
  if (!metadata.fileInfo || !metadata.imageProperties) {
    throw new Error("Missing required metadata fields");
  }

  // Validate image dimensions
  if (
    metadata.imageProperties.width <= 0 ||
    metadata.imageProperties.height <= 0
  ) {
    throw new Error("Invalid image dimensions");
  }

  // Validate file information
  if (!metadata.fileInfo.filename || !metadata.fileInfo.path) {
    throw new Error("Missing file information");
  }

  return metadata;
}
