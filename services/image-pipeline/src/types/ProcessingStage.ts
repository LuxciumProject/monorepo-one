// src/types/processing.ts

import { ProcessingStatus } from "./ProcessingStatus";

/**
 * Represents a processing stage in the image pipeline.
 */
export interface ProcessingStage {
  name: string;
  status: ProcessingStatus;
  timestamp: Date;
}
