class MetadataExtractor {
  extractFullMetadata(image: string, buffer: Buffer): any {
    // ...implementation to extract metadata from the image.
    image;
    buffer;
    return {
      metadata: {
        width: 800,
        height: 600,
        format: "JPEG",
        size: buffer.length,
      },
    };
  }
}

export { MetadataExtractor };
// buffer: Buffer<ArrayBufferLike>
