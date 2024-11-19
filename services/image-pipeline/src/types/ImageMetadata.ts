import type { FileStats } from "./FileStats";
import type { ImageStats } from "./ImageStats";
import type { ProcessingStatus } from "./ProcessingStatus";

export interface ImageMetadata {
  readonly filename: string;
  readonly filepath: string;
  readonly fileStats: FileStats;
  readonly imageStats: ImageStats;
  readonly processing: ProcessingStatus;
  readonly additionalMetadata: Record<string, unknown>;
}
