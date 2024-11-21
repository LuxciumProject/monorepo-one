import sharp from "sharp";
import type { ImageMetadata } from "../../types";

// SECTION: Image Analysis
/**
 * Analyzes image buffer to extract metadata such as dimensions and format.
 *
 * @param buffer - The image buffer to analyze.
 * @returns An object containing the extracted image metadata.
 *
 * @throws {Error} If the image metadata cannot be extracted.
 *
 * @example
 * const imageMetadata = await analyzeImage(imageBuffer);
 * console.log(imageMetadata);
 */
export async function analyzeImage(
  buffer: Buffer,
): Promise<Pick<ImageMetadata, "dimensions" | "imageStats">> {
  // INFO: Use sharp to get metadata from the image buffer
  const metadata = await sharp(buffer).metadata();

  const dimensions = {
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    orientation: metadata.orientation ?? 0,
    aspectRatio:
      metadata.width && metadata.height ? metadata.width / metadata.height : 0,
  };

  const imageStats = {
    format: metadata.format ?? "unknown",
    hasAlpha: metadata.hasAlpha ?? false,
    isProgressive: metadata.isProgressive ?? false,
    channels: metadata.channels ?? 0,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    colorDepth: typeof metadata.depth === "number" ? metadata.depth : 0,
  };

  return { dimensions, imageStats };
}

// UNIMPLEMENTED: Advanced image analysis features
/**
 * @future Planned features:
 * - Color histogram generation
 * - Dominant color extraction
 * - Image quality assessment
 * - Format conversion recommendations
 */

// REVIEW NEEDED: Consider adding validation for supported image formats
// Currently assuming Sharp can handle the input format
