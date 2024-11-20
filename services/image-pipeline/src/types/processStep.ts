import { ImageData, ProcessingStep } from "./ImageData";

// src/index.ts

export const processStep: ProcessingStep = {
  name: "processImage",
  process: async (image: ImageData): Promise<ImageData> => {
    // Implementation here
    return image;
  },
};
