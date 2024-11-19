// Processing tools/modules for image processing steps.

import { ImageData, ProcessingStep } from "../types";

// Example processing step: Resize image.
export const resizeImageStep: ProcessingStep = {
  name: "resizeImage",
  process: async (image: ImageData): Promise<ImageData> => {
    // ...implementation to resize the image.
    return image;
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
