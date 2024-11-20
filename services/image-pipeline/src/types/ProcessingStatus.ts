import { ProcessingHistory } from "./ProcessingHistory";
import { ProcessingStage } from "./ProcessingStage";

export type ProcessingStatus = {
  readonly stage: ProcessingStage;
  readonly startTime: Date;
  readonly history: readonly ProcessingHistory[];
};
