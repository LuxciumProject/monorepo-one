import { statSync } from 'node:fs';
import { convertMBToBytes } from './convertMBToBytes';

export function isImageFileSizeValid(
  imagePath: string,
  fileSizeLimit_MB: number = 5
): boolean {
  const fileSize = statSync(imagePath).size;
  return fileSize <= convertMBToBytes(fileSizeLimit_MB);
}
