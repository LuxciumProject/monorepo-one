// Define interfaces for image data and processing steps.

export interface ImageData {
  buffer: Buffer;
  metadata: ImageMetadata;
}

export interface ImageMetadata {
  filename: string;
  filepath: string;
  [key: string]: any; // Additional metadata fields.
  processing: {
    stage: string;
    startTime: Date;
    history: ProcessingHistory[];
  };
}

export interface ProcessingStep {
  name: string;
  process: (image: ImageData) => Promise<ImageData>;
}

export interface ProcessingHistory {
  step: string;
  timestamp: Date;
  duration: number;
  status: "success" | "error";
  error?: string;
}
