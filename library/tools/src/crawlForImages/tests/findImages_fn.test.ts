import { findImages } from '../crawlForImagesTools';

const TEST_DIR_PATH = '/projects/monorepo-one/private/imgs/' as const;

describe('findImages', () => {
  it('should exist', () => {
    expect(findImages).toBeDefined();
  });

  it('should return an async generator from path string[array]', async () => {
    const generator = findImages([TEST_DIR_PATH]);
    expect(generator[Symbol.asyncIterator]).toBeDefined();
    const result = await generator.next();
    expect(result.done).toBe(true);
  });
  it('should return an async generator from a path string', async () => {
    const generator = findImages(TEST_DIR_PATH);
    expect(generator[Symbol.asyncIterator]).toBeDefined();
    const result = await generator.next();
    expect(result.done).toBe(true);
  });
});
