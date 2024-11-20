// src/types/ImageData.ts
import type { ImageMetadata } from "./ImageMetadata";

export type ImageData = {
  readonly buffer: Buffer;
  readonly metadata: ImageMetadata;
};

// src/types/ProcessingStep.ts

export type ProcessingStep = {
  readonly name: string;
  readonly process: (image: ImageData) => Promise<ImageData>;
};
