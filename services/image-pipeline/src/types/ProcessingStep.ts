export interface ProcessingStep {
  name: string;
  process: (image: ImageData) => Promise<ImageData>;
}
