import sharp from "sharp";
import type { ImageData, ProcessingStep } from "../types";

/**
 * Creates a processing step that resizes an image to specified dimensions
 * @param options Configuration for image resizing
 * @returns ProcessingStep that handles image resizing
 */
export function createResizeStep(options: {
  width: number;
  height: number;
}): ProcessingStep {
  return {
    name: "resizeImage",
    process: async (image: ImageData): Promise<ImageData> => {
      if (!image.buffer) {
        throw new Error("Image buffer is required for resize operation");
      }

      const resizedImageBuffer = await sharp(image.buffer)
        .resize({
          width: options.width,
          height: options.height,
          fit: "contain",
        })
        .toBuffer();

      return {
        ...image,
        buffer: resizedImageBuffer,
        metadata: {
          ...image.metadata,
          dimensions: {
            width: options.width,
            height: options.height,
          },
        },
      };
    },
  };
}
