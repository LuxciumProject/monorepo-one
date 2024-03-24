/**
 * Converts a Buffer to a base64 string.
 *
 * @param bitmap - The Buffer to convert.
 * @returns The base64 string representation of the bitmap Buffer.
 */

export function bufferToBase64(bitmap: Buffer): string {
  return bitmap.toString('base64');
}
