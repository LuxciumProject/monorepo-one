// src/types/ProcessingStep.ts
import { ImageData } from "./ImageData";

export interface ProcessingStep {
  name: string;
  process: (image: ImageData) => Promise<ImageData>;
}
