import { bufferFromBitmap } from './bufferFromBitmap';
import { bufferToBase64 } from './bufferToBase64';
import { pathStringToBuffer } from './pathStringToBuffer';

/**
 * Converts a file to a base64 encoded string.
 *
 * @param file - The file to be converted.
 * @returns The base64 encoded string representation of the file.
 */

export function toBase64(file: string): string {
  const bitmap = pathStringToBuffer(file);
  const convertedBuffer = bufferFromBitmap(bitmap);
  const base64EncodedBuffer = bufferToBase64(convertedBuffer);
  return base64EncodedBuffer;
}
