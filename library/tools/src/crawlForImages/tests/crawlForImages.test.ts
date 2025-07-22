import { imageCrawler, findImages } from '..';
import { join } from 'path';

// Mock the helper functions to control test behavior
jest.mock('../helpers', () => ({
  readDirectory: jest.fn(),
  isDirectory: jest.fn(),
  isImageFile: jest.fn(),
  ensureArray: jest.fn(input => (Array.isArray(input) ? input : [input])),
}));

const { readDirectory, isDirectory, isImageFile, ensureArray } = jest.requireMock('../helpers');

describe('crawlForImages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('imageCrawler', () => {
    it('should exist', () => {
      expect(imageCrawler).toBeDefined();
    });

    it('should return an async generator', () => {
      const generator = imageCrawler('/test/path');
      expect(generator[Symbol.asyncIterator]).toBeDefined();
    });

    it('should yield image file paths when found', async () => {
      const testPath = '/test/dir';
      const testFile = 'image.jpg';
      const expectedPath = join(testPath, testFile);

      readDirectory.mockResolvedValue([testFile]);
      isDirectory.mockResolvedValue(false);
      isImageFile.mockReturnValue(true);

      const generator = imageCrawler(testPath);
      const result = await generator.next();

      expect(result.value).toBe(expectedPath);
      expect(result.done).toBe(false);
    });

    it('should handle subdirectories recursively', async () => {
      const testPath = '/test/dir';
      const subDir = 'subdir';
      const imageFile = 'image.png';

      // Adjust mock behavior for subdirectory handling
      readDirectory.mockImplementation((path: string) => {
        if (path === '/test/dir') return ['subdir'];
        if (path === '/test/dir/subdir') return ['image.png'];
        return [];
      });

      isDirectory.mockImplementation((path: string) => {
        return path === '/test/dir/subdir';
      });

      isImageFile.mockImplementation((file: string) => {
        return file.endsWith('.png');
      });

      const generator = imageCrawler(testPath);

      // Collect all results
      const results = [];
      for await (const result of generator) {
        results.push(result);
      }

      expect(results).toHaveLength(1);
      expect(results[0]).toBe(join(testPath, subDir, imageFile));
    });

    it('should handle directory read errors gracefully', async () => {
      const testPath = '/invalid/path';

      readDirectory.mockRejectedValue(new Error('Directory not found'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const generator = imageCrawler(testPath);
      const result = await generator.next();

      expect(result.done).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error reading directory'), expect.any(Error));

      consoleSpy.mockRestore();
    });

    it('should handle file processing errors gracefully', async () => {
      const testPath = '/test/dir';
      const testFile = 'problematic.jpg';

      readDirectory.mockResolvedValue([testFile]);
      isDirectory.mockRejectedValue(new Error('Access denied'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const generator = imageCrawler(testPath);
      const result = await generator.next();

      expect(result.done).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error processing'), expect.any(Error));

      consoleSpy.mockRestore();
    });

    it('should complete when no more files are found', async () => {
      const testPath = '/test/empty';

      readDirectory.mockResolvedValue([]);

      const generator = imageCrawler(testPath);
      const result = await generator.next();

      expect(result.done).toBe(true);
    });

    it('should skip non-image files', async () => {
      const testPath = '/test/dir';
      const textFile = 'document.txt';

      readDirectory.mockResolvedValue([textFile]);
      isDirectory.mockResolvedValue(false);
      isImageFile.mockReturnValue(false);

      const generator = imageCrawler(testPath);
      const result = await generator.next();

      expect(result.done).toBe(true);
    });
  });

  describe('findImages', () => {
    it('should exist', () => {
      expect(findImages).toBeDefined();
    });

    it('should handle single path string', async () => {
      const testPath = '/test/dir';
      const imageFile = 'test.jpg';

      ensureArray.mockReturnValue([testPath]);
      readDirectory.mockResolvedValue([imageFile]);
      isDirectory.mockResolvedValue(false);
      isImageFile.mockReturnValue(true);

      const generator = findImages(testPath);
      const result = await generator.next();

      expect(result.value).toBe(join(testPath, imageFile));
      expect(result.done).toBe(false);
    });

    it('should handle array of paths', async () => {
      const testPaths = ['/test/dir1', '/test/dir2'];
      const imageFile = 'test.png';

      ensureArray.mockReturnValue(testPaths);
      readDirectory.mockResolvedValue([imageFile]);
      isDirectory.mockResolvedValue(false);
      isImageFile.mockReturnValue(true);

      const generator = findImages(testPaths);
      const results = [];

      for await (const imagePath of generator) {
        results.push(imagePath);
      }

      expect(results).toHaveLength(2);
      expect(results[0]).toBe(join(testPaths[0], imageFile));
      expect(results[1]).toBe(join(testPaths[1], imageFile));
    });
  });
});
