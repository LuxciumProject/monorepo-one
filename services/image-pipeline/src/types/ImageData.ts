import { ImageMetadata } from "./ImageMetadata";

// Define interfaces for image data and processing steps.

export interface ImageData {
  buffer: Buffer;
  metadata: ImageMetadata;
}
