/**
 * Represents the statistics of an image, including color data and analysis metrics.
 */
export interface ImageStats {
  /** Width of the image in pixels */
  width: number;

  /** Height of the image in pixels */
  height: number;

  /** Color depth (bits per pixel) */
  colorDepth: number;

  /** Array representing the color histogram */
  histogram: number[];

  /** Dominant color in the image (hex format) */
  dominantColor: string;

  /** Additional statistics keyed by property name */
  [key: string]: any;
}
