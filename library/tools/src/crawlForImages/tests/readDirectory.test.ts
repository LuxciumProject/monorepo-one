import { readDirectory } from '..';

test('readDirectory should return an array of file names', async () => {
  // Arrange
  const TEST_DIR_PATH = '/projects/monorepo-one/private/imgs/' as const;
  // Act
  const result = await readDirectory(TEST_DIR_PATH);

  // Assert
  expect(result).toEqual([
    'Lenna-sepia.jpg',
    'Lenna.jpg',
    'Lenna.png',
    'unsplash-Jakub Jacobsky.jpg',
    'unsplash-Ryan Johnston.jpg',
    'unsplash-Toby Wong.jpg',
    'unsplash-Tony Reid.jpg',
    'unsplash-anthony_delanoix.jpg',
  ]);
});
