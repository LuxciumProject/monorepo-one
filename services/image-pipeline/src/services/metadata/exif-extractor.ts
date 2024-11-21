import sharp from "sharp";
import type { ExifData } from "../../types";

// SECTION: Type Definitions
interface ExifTags {
  Make?: string;
  Model?: string;
  ExposureTime?: number;
  FNumber?: number;
  ISO?: number;
  FocalLength?: number;
  DateTimeOriginal?: string;
  [key: string]: unknown;
}

// SECTION: EXIF Data Extraction
/**
 * Extracts EXIF metadata from an image buffer.
 *
 * @param buffer - The image buffer to extract EXIF data from
 * @returns Object containing normalized EXIF metadata
 * @throws {Error} If EXIF data cannot be extracted
 */
export async function extractExifData(
  buffer: Buffer,
): Promise<{ exif: ExifData }> {
  // INFO: Use sharp to extract EXIF metadata
  const metadata = await sharp(buffer).metadata();
  const exifTags = metadata.exif ? (metadata.exif as unknown as ExifTags) : {};

  // SIDE EFFECTS: None - pure data extraction
  const exif: ExifData = {
    make: String(exifTags.Make ?? ""),
    model: String(exifTags.Model ?? ""),
    exposureTime: Number(exifTags.ExposureTime ?? 0),
    fNumber: Number(exifTags.FNumber ?? 0),
    iso: Number(exifTags.ISO ?? 0),
    focalLength: Number(exifTags.FocalLength ?? 0),
    dateTaken: String(exifTags.DateTimeOriginal ?? ""),
    raw: { ...exifTags },
  };

  return { exif };
}

// REVIEW NEEDED: Consider adding validation for supported EXIF formats
// Currently assuming Sharp can handle the EXIF extraction
