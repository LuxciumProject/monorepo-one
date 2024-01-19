// isImageFilePath.test.ts
import { isImageFilePath } from '..';

describe('isImageFilePath', () => {
  test('should return true for file paths with image extensions', () => {
    const filePath = 'picture.jpg';
    expect(isImageFilePath(filePath)).toBe(true);
  });

  test('should return false for file paths without image extensions', () => {
    const filePath = 'document.pdf';
    expect(isImageFilePath(filePath)).toBe(false);
  });
});
