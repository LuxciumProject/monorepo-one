export type ImageMetadata = {
  filename: string;
  filepath: string;
  fileStats: {
    size: number;
    createdAt: Date;
    modifiedAt: Date;
  };
  imageStats: {
    width: number;
    height: number;
    colorDepth: number;
  };
  processing: string[];
  additionalMetadata: Record<string, unknown>;
  dimensions: {
    width: number;
    height: number;
  };
};
