import { readFileSync } from 'node:fs';

/**
 * Converts a path string to a Buffer object.
 *
 * @param file - The path of the file to read.
 * @returns A Buffer object containing the file data.
 */

export function pathStringToBuffer(file: string): Buffer {
  return readFileSync(file);
}
