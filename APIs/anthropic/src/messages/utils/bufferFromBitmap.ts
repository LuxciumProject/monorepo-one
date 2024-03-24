/**
 * Converts a bitmap buffer to a new buffer.
 *
 * @param bitmap - The bitmap buffer to convert.
 * @returns A new buffer containing the converted bitmap.
 */

export function bufferFromBitmap(bitmap: Buffer): Buffer {
  return Buffer.from(bitmap);
}
