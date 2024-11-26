import { ProcessingStage } from "./ProcessingStage";

/**
 * Represents the processing history of an image.
 */
export interface ProcessingHistory {
  readonly stage: ProcessingStage;
  readonly timestamp: Date;
  readonly duration: number;
  readonly details: string;
  readonly error?: Error;
}
