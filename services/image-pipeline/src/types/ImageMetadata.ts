import type { FileStats } from "./FileStats";
import type { ImageDimensions } from "./ImageDimensions";
import type { ImageStats } from "./ImageStats";
import type { ProcessingHistory } from "./ProcessingHistory";

export interface ImageMetadata {
  filename: string;
  filepath: string;
  fileStats: FileStats;
  imageStats: ImageStats;
  dimensions: ImageDimensions;
  exif: Record<string, unknown>; // Updated to be non-optional
  processing: ProcessingHistory[];
  additionalMetadata: Record<string, unknown>;
}
