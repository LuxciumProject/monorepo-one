import type { FileStats } from "./FileStats";
import type { ImageDimensions } from "./ImageDimensions";
import type { ImageStats } from "./ImageStats";
import type { ProcessingHistory } from "./ProcessingHistory";

/**
 * Represents the metadata of an image.
 */
export interface ImageMetadata {
  /** Name of the image file */
  filename: string;

  /** Full file path of the image */
  filepath: string;

  /** File system statistics */
  fileStats: FileStats;

  /** Statistical data of the image */
  imageStats: ImageStats;

  /** Dimensions and aspect ratio of the image */
  dimensions: ImageDimensions;

  /** EXIF data extracted from the image */
  exif: Record<string, unknown>;

  /** Processing history of the image */
  processing: ProcessingHistory[];

  /** Any additional metadata */
  additionalMetadata: Record<string, unknown>;
}
