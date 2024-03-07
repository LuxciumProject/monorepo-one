// filterImageFiles.test.ts
import { filterImageFiles } from '..';

describe('filterImageFiles', () => {
  test('should return only image file names from a list of files', () => {
    const files = ['image.jpg', 'document.txt', 'photo.png'];
    const result = filterImageFiles(files);
    expect(result).toEqual(['image.jpg', 'photo.png']);
  });

  test('should return an empty array if no image files are present', () => {
    const files = ['document.txt', 'data.csv'];
    const result = filterImageFiles(files);
    expect(result).toEqual([]);
  });
});
