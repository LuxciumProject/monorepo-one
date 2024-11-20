// src/index.ts
// Processing tools/modules for image processing steps.

import sharp from "sharp";
import type { ImageData, ProcessingStep } from "../types";

// Example processing step: Resize image.
export const resizeImageStep: ProcessingStep = {
  name: "resizeImage",
  process: async (image: ImageData): Promise<ImageData> => {
    // ...implementation to resize the image.
    const resizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 600 })
      .toBuffer(); // Buffer<ArrayBufferLike>

    // image.buffer = resizedImageBuffer;
    // const image:{buffer : resizedImageBuffer}}
    return { ...image, buffer: resizedImageBuffer };
  },
};

// Example processing step: Apply filter using Python script.
export const pythonFilterStep: ProcessingStep = {
  name: "pythonFilter",
  process: async (image: ImageData): Promise<ImageData> => {
    // ...implementation to call Python script and process image.
    return image;
  },
};

// ...additional processing steps.
