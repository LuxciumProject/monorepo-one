// src/types/ImageData.ts
import type { ImageMetadata } from "./ImageMetadata";

/**
 * Represents the image data along with its metadata.
 */
export type ImageData = {
  /** The binary buffer of the image */
  readonly buffer: Buffer;

  /** Metadata associated with the image */
  readonly metadata: ImageMetadata;
};

// src/types/ProcessingStep.ts

export type ProcessingStep = {
  readonly name: string;
  readonly process: (image: ImageData) => Promise<ImageData>;
};
