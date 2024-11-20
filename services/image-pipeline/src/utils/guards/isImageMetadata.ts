import { ImageMetadata } from "../../types/ImageMetadata";

// Type guard

export const isImageMetadata = (value: unknown): value is ImageMetadata => {
  const metadata = value as ImageMetadata;
  return (
    typeof metadata === "object" &&
    metadata !== null &&
    typeof metadata.filename === "string" &&
    typeof metadata.filepath === "string" &&
    "fileStats" in metadata &&
    "imageStats" in metadata &&
    "processing" in metadata
  );
};
