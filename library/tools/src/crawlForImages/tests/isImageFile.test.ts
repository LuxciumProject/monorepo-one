import { isImageFile } from '..';

test('isImageFile should return true for image files', () => {
  const filePath = '/path/to/image.jpg';
  const result = isImageFile(filePath);
  expect(result).toBe(true);
});
