/**
 * Converts a base64 encoded bitmap string to a Buffer object.
 *
 * @param bitmap - The base64 encoded bitmap string.
 * @returns A Buffer object representing the bitmap.
 */

export function bitmapToBuffer(bitmap: string): Buffer {
  return Buffer.from(bitmap, 'base64');
}
