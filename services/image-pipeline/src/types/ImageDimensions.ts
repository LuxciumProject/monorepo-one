/**
 * Represents the dimensions and aspect ratio of an image.
 */
export type ImageDimensions = {
  /** Width of the image in pixels */
  readonly width: number;

  /** Height of the image in pixels */
  readonly height: number;

  /** Aspect ratio calculated as width divided by height */
  readonly aspectRatio: number;
};
