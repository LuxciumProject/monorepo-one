import type { ImageMetadata } from "../../types";

/**
 * Validates the metadata of an image.
 * @param metadata The ImageMetadata object to validate.
 */
export async function validateMetadata(metadata: ImageMetadata): Promise<void> {
  // Ensure required fields are present
  if (!metadata.filename) {
    throw new Error("Missing required metadata fields");
  }

  // Validate image dimensions
  if (
    typeof metadata.dimensions.width !== "number" ||
    typeof metadata.dimensions.height !== "number"
  ) {
    throw new Error("Invalid dimensions in image metadata.");
  }

  // Validate fileStats
  if (
    typeof metadata.fileStats.size !== "number" ||
    !(metadata.fileStats.createdAt instanceof Date) ||
    !(metadata.fileStats.modifiedAt instanceof Date)
  ) {
    throw new Error("Invalid fileStats in image metadata.");
  }

  return;
}
