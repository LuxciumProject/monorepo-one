import { ProcessingStage } from "./ProcessingStage";

export interface ProcessingHistory {
  readonly stage: ProcessingStage;
  readonly timestamp: Date;
  readonly duration: number;
  readonly details: string;
  readonly error?: Error;
}
