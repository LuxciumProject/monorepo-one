/**
 * Represents the EXIF data extracted from an image.
 */
export interface ExifData {
  /** Camera manufacturer */
  make?: string;

  /** Camera model */
  model?: string;

  /** Orientation of the image */
  orientation?: number;

  /** X resolution of the image */
  xResolution?: number;

  /** Y resolution of the image */
  yResolution?: number;

  /** Resolution unit of the image */
  resolutionUnit?: number;

  /** Software used to process the image */
  software?: string;

  /** Date and time when the image was created */
  dateTime?: string;

  /** Artist who created the image */
  artist?: string;

  /** Copyright information of the image */
  copyright?: string;
}
