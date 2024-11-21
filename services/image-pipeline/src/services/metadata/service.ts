import { promises as fs } from "node:fs";
import type { ImageData } from "../../types";
import { analyzeFileSystem } from "./file-system-analyzer";
import { analyzeImage } from "./image-analyzer";

export function createMetadataService() {
  return {
    async processImage(imagePath: string): Promise<ImageData> {
      const buffer = await fs.readFile(imagePath);

      // Get filesystem metadata
      const fsMetadata = await analyzeFileSystem(imagePath);

      // Get image metadata
      const imageMetadata = await analyzeImage(buffer);

      // Create complete image data
      const image: ImageData = {
        buffer,
        metadata: {
          ...fsMetadata,
          ...imageMetadata,
          processing: [],
          additionalMetadata: {},
        },
      };

      return image;
    },
  };
}
