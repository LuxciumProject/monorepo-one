/**
 * Represents normalized EXIF metadata extracted from an image.
 */
export interface ExifData extends Record<string, unknown> {
  /** Camera manufacturer */
  make: string;

  /** Camera model */
  model: string;

  /** Exposure time in seconds */
  exposureTime: number;

  /** F-number (aperture) */
  fNumber: number;

  /** ISO speed */
  iso: number;

  /** Focal length in millimeters */
  focalLength: number;

  /** Original date/time when photo was taken */
  dateTaken: string;

  /** Raw EXIF data object for additional metadata */
  raw: Record<string, unknown>;
}
