import { join } from "node:path";
import sharp from "sharp";
import { analyzeImage } from "../image-analyzer";

describe("Image Analyzer", () => {
  const testImageBuffer = Buffer.from("fake-image-data");

  beforeEach(() => {
    // Mock sharp implementation
    jest.spyOn(sharp.prototype, "metadata").mockResolvedValue({
      width: 1920,
      height: 1080,
      format: "jpeg",
      hasAlpha: false,
      isProgressive: true,
      orientation: 1,
      channels: 3,
      depth: 8,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should extract correct dimensions from image", async () => {
    const result = await analyzeImage(testImageBuffer);

    expect(result.dimensions).toEqual({
      width: 1920,
      height: 1080,
      orientation: 1,
      aspectRatio: 1.7777777777777777,
    });
  });

  test("should extract correct image stats", async () => {
    const result = await analyzeImage(testImageBuffer);

    expect(result.imageStats).toEqual({
      format: "jpeg",
      hasAlpha: false,
      isProgressive: true,
      channels: 3,
      width: 1920,
      height: 1080,
      colorDepth: 8,
      histogram: [],
      dominantColor: "",
    });
  });

  test("should handle missing metadata gracefully", async () => {
    jest.spyOn(sharp.prototype, "metadata").mockResolvedValue({});

    const result = await analyzeImage(testImageBuffer);

    expect(result.dimensions).toEqual({
      width: 0,
      height: 0,
      orientation: 0,
      aspectRatio: 0,
    });
  });

  test("should throw error when metadata extraction fails", async () => {
    jest
      .spyOn(sharp.prototype, "metadata")
      .mockRejectedValue(new Error("Metadata extraction failed"));

    await expect(analyzeImage(testImageBuffer)).rejects.toThrow(
      "Metadata extraction failed",
    );
  });
});
