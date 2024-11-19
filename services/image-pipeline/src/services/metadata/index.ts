import { promises as fs } from "node:fs";
import { dirname, join } from "node:path";
import { ImageData, ImageMetadata } from "../../types";
import { MetadataExtractor } from "../../utils/metadata-extractor";
import { validateMetadata } from "./validation";

export class MetadataService {
  private readonly _metadataExtractor: MetadataExtractor;

  constructor() {
    this._metadataExtractor = new MetadataExtractor();
  }

  public async processImage(filepath: string): Promise<ImageData> {
    console.log(`Processing metadata for: ${filepath}`);

    const buffer = await fs.readFile(filepath);
    const metadata = await this._metadataExtractor.extractFullMetadata(
      filepath,
      buffer,
    );

    // Validate extracted metadata
    const validatedMetadata = await validateMetadata(metadata);

    // Create working directory for processed files if it doesn't exist
    const workingDir = join(dirname(filepath), ".pipeline-working");
    await fs.mkdir(workingDir, { recursive: true });

    // Save metadata to JSON file for debugging and tracking
    await this.saveMetadataFile(workingDir, validatedMetadata);

    return {
      buffer,
      metadata: validatedMetadata,
    };
  }

  private async saveMetadataFile(
    workingDir: string,
    metadata: ImageMetadata,
  ): Promise<void> {
    const metadataPath = join(
      workingDir,
      `${metadata.fileInfo.filename}.metadata.json`,
    );
    await fs.writeFile(
      metadataPath,
      JSON.stringify(metadata, null, 2),
      "utf-8",
    );
    console.log(`Metadata saved to: ${metadataPath}`);
  }
}

export const createMetadataService = (): MetadataService =>
  new MetadataService();
