// src/types/processing.ts
export type ProcessingStage =
  | "queued"
  | "analyzing"
  | "optimizing"
  | "transforming"
  | "completed"
  | "failed";
