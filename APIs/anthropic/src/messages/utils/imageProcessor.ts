// imageProcessor.ts

import fs from 'fs/promises';
import sharp from 'sharp';

interface ImageDetails {
  width: number;
  height: number;
  aspectRatio: number;
  initialFileSize: number;
  mimeType: string;
  base64: string;
  finalFileSize: number;
}

async function processImage(filePath: string): Promise<ImageDetails> {
  const metadata = await sharp(filePath).metadata();
  console.log('metadata', metadata);
  const initialFileSize = (await fs.stat(filePath)).size;
  console.log('initialFileSize', initialFileSize);
  const { width, height, format } = metadata;
  console.log('width', width);
  const aspectRatio = width! / height!;
  console.log('aspectRatio', aspectRatio);
  const mimeType = `image/${format}`;
  console.log('mimeType', mimeType);
  const imageBuffer = await sharp(filePath).toBuffer();
  console.log('imageBuffer', imageBuffer);
  const base64 = imageBuffer.toString('base64');
  console.log('base64', base64);

  const finalFileSize = Buffer.byteLength(base64, 'utf-8');
  console.log('finalFileSize', finalFileSize);

  return {
    width: width!,
    height: height!,
    aspectRatio,
    initialFileSize,
    mimeType,
    base64,
    finalFileSize,
  };
}

export { processImage };
