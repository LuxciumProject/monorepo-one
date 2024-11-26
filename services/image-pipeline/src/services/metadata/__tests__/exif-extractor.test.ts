import sharp from "sharp";
import { extractExifData } from "../exif-extractor";

describe("EXIF Extractor", () => {
  const testImageBuffer = Buffer.from("fake-image-data");
  const mockExifData = {
    Make: "Canon",
    Model: "EOS R5",
    ExposureTime: 0.004,
    FNumber: 2.8,
    ISO: 100,
    FocalLength: 50,
    DateTimeOriginal: "2023:12:25 12:00:00",
    CustomTag: "test-value",
  };

  beforeEach(() => {
    jest.spyOn(sharp.prototype, "metadata").mockResolvedValue({
      exif: mockExifData as any,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should extract EXIF data correctly", async () => {
    const result = await extractExifData(testImageBuffer);

    expect(result.exif).toEqual({
      make: "Canon",
      model: "EOS R5",
      exposureTime: 0.004,
      fNumber: 2.8,
      iso: 100,
      focalLength: 50,
      dateTaken: "2023:12:25 12:00:00",
      raw: mockExifData,
    });
  });

  test("should handle missing EXIF data gracefully", async () => {
    jest.spyOn(sharp.prototype, "metadata").mockResolvedValue({});

    const result = await extractExifData(testImageBuffer);

    expect(result.exif).toEqual({
      make: "",
      model: "",
      exposureTime: 0,
      fNumber: 0,
      iso: 0,
      focalLength: 0,
      dateTaken: "",
      raw: {},
    });
  });

  test("should handle partial EXIF data", async () => {
    jest.spyOn(sharp.prototype, "metadata").mockResolvedValue({
      exif: { Make: "Canon" } as any,
    });

    const result = await extractExifData(testImageBuffer);

    expect(result.exif.make).toBe("Canon");
    expect(result.exif.model).toBe("");
  });

  test("should throw error when metadata extraction fails", async () => {
    jest
      .spyOn(sharp.prototype, "metadata")
      .mockRejectedValue(new Error("EXIF extraction failed"));

    await expect(extractExifData(testImageBuffer)).rejects.toThrow(
      "EXIF extraction failed",
    );
  });
});
