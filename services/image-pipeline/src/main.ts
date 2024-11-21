import { join } from "node:path";
import { createMetadataService } from "./services/metadata";

// main.ts
// Main entry point for the image-pipeline service for manual testing
// during development.
void (async function MAIN(): Promise<void> {
  console.log(`at: MAIN from ${__filename}`);

  try {
    const metadataService = createMetadataService();
    const testImagePath = join(__dirname, "../images/sample.png");

    const processedImage = await metadataService.processImage(testImagePath);
    console.log(
      "Metadata extraction completed:",
      processedImage.metadata.filename,
    );
  } catch (error) {
    console.error("Error processing image:", error);
    process.exit(1);
  }

  return void 0;
})();
