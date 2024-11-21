import sharp from "sharp";
import type { ImageMetadata } from "../../types";

export async function analyzeImage(
  buffer: Buffer,
): Promise<Pick<ImageMetadata, "imageStats" | "dimensions">> {
  const metadata = await sharp(buffer).metadata();

  return {
    imageStats: {
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
      colorDepth: metadata.channels ?? 0,
    },
    dimensions: {
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
      aspectRatio: (metadata.width ?? 0) / (metadata.height ?? 1),
    },
  };
}
