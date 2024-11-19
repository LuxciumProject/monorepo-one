// Define interfaces for image data and processing steps.

export interface ImageData {
  buffer: Buffer;
  metadata: ImageMetadata;
}

export interface ImageMetadata {
  filename: string;
  filepath: string;
  [key: string]: any; // Additional metadata fields.
}

export interface ProcessingStep {
  name: string;
  process: (image: ImageData) => Promise<ImageData>;
}
