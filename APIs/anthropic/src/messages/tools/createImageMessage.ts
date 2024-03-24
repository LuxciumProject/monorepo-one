import { statSync } from 'node:fs';
import { ImageMessageParam } from '../types';
import { bufferToBase64, getMediaType, pathStringToBuffer } from '../utils';

// lets create a new function that would conver a number from MB to bytes
export function convertMBToBytes(mb: number): number {
  return mb * 1024 * 1024;
}

export function isImageFileSizeValid(
  imagePath: string,
  fileSizeLimit_MB: number = 5
): boolean {
  const fileSize = statSync(imagePath).size;
  // console.log('fileSize', { fileSize, imagePath });
  return fileSize <= convertMBToBytes(fileSizeLimit_MB);
}
export async function createImageMessage(
  imagePath: string,
  text: string,
  fileSizeLimit: number = 5
): Promise<ImageMessageParam> {
  const pathToBuffer = pathStringToBuffer(imagePath);
  const mediaType = getMediaType(imagePath);
  if (!mediaType) {
    throw new Error('Unsupported media type');
  }

  if (!isImageFileSizeValid(imagePath, fileSizeLimit)) {
    throw new Error('File size exceeds the limit');
  }

  return {
    role: 'user',
    content: [
      {
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: bufferToBase64(pathToBuffer),
        },
      },
      { type: 'text', text },
    ],
  };
}
