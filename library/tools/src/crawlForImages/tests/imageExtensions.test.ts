// imageExtensions.test.ts
import { getImageExtensionList } from '..';

describe('imageExtensions', () => {
  test('should return an array of image file extensions', () => {
    const extensions = getImageExtensionList();
    expect(extensions).toBeInstanceOf(Array);
    extensions.forEach(ext => {
      expect(typeof ext).toBe('string');
    });
  });

  test('all array elements should be strings', () => {
    const extensions = getImageExtensionList();
    expect(extensions.every(ext => 'string' === typeof ext)).toBe(true);
  });
});
