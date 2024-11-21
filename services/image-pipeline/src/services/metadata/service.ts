import { promises as fs } from "node:fs";
import type { ImageData } from "../../types";
import { extractExifData } from "./exif-extractor";
import { analyzeFileSystem } from "./file-system-analyzer";
import { analyzeImage } from "./image-analyzer";

// SECTION: Metadata Service Creation
/**
 * Creates an instance of the metadata service responsible for processing images.
 *
 * @returns An object with the `processImage` method.
 */
export function createMetadataService() {
  return {
    /**
     * Processes an image file to extract metadata and return image data.
     *
     * @param imagePath - The path to the image file to process.
     * @returns The processed ImageData object containing metadata and buffer.
     *
     * @throws {Error} If the image cannot be processed.
     */
    async processImage(imagePath: string): Promise<ImageData> {
      const buffer = await fs.readFile(imagePath);

      // Get filesystem metadata
      const fsMetadata = await analyzeFileSystem(imagePath);

      // Get image metadata
      const imageMetadata = await analyzeImage(buffer);

      // Get EXIF metadata
      const exifData = await extractExifData(buffer);

      // Create complete image data
      const image: ImageData = {
        buffer,
        metadata: {
          ...fsMetadata,
          ...imageMetadata,
          exif: exifData,
          processing: [],
          additionalMetadata: {},
        },
      };

      return image;
    },
  };
}
