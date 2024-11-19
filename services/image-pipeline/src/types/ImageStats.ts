import { ImageDimensions } from "./ImageDimensions";

export type ImageStats = {
  readonly dimensions: ImageDimensions;
  readonly format: string;
  readonly colorSpace: string;
  readonly bitDepth: number;
  readonly hasAlpha: boolean;
};
