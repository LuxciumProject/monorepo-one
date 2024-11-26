import { join } from "node:path";
import { createMetadataService } from "../metadata-service";
import * as analyzer from "../image-analyzer";
import * as exifExtractor from "../exif-extractor";

describe("Metadata Service", () => {
  const testImagePath = join(__dirname, "../../../../images/sample.png");
  const mockDimensions = {
    width: 1920,
    height: 1080,
    orientation: 1,
    aspectRatio: 1.7777777777777777,
  };

  const mockImageStats = {
    format: "png",
    hasAlpha: true,
    isProgressive: false,
    channels: 4,
    width: 1920,
    height: 1080,
    colorDepth: 8,
    histogram: [],
    dominantColor: "",
  };

  const mockExifData = {
    make: "Canon",
    model: "EOS R5",
    exposureTime: 0.004,
    fNumber: 2.8,
    iso: 100,
    focalLength: 50,
    dateTaken: "2023:12:25 12:00:00",
    raw: {},
  };

  beforeEach(() => {
    jest.spyOn(analyzer, "analyzeImage").mockResolvedValue({
      dimensions: mockDimensions,
      imageStats: mockImageStats,
    });

    jest.spyOn(exifExtractor, "extractExifData").mockResolvedValue({
      exif: mockExifData,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should process image and return complete metadata", async () => {
    const service = createMetadataService();
    const result = await service.processImage(testImagePath);

    expect(result.metadata).toEqual({
      filename: expect.any(String),
      filepath: testImagePath,
      dimensions: mockDimensions,
      imageStats: mockImageStats,
      exif: mockExifData,
    });
  });

  test("should handle missing EXIF data gracefully", async () => {
    jest
      .spyOn(exifExtractor, "extractExifData")
      .mockRejectedValue(new Error("No EXIF data"));

    const service = createMetadataService();
    const result = await service.processImage(testImagePath);

    expect(result.metadata.exif).toBeUndefined();
    expect(result.metadata.dimensions).toEqual(mockDimensions);
  });

  test("should throw error for invalid image path", async () => {
    const service = createMetadataService();
    await expect(service.processImage("invalid/path")).rejects.toThrow();
  });
});
