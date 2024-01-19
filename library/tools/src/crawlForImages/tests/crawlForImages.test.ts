import { crawlForImages } from '..';

const TEST_DIR_PATH = '/projects/monorepo-one/private/imgs/' as const;

describe('crawlForImages', () => {
  it('should exist', () => {
    expect(crawlForImages).toBeDefined();
  });

  it('should return an async generator from a path string', async () => {
    const generator = crawlForImages(TEST_DIR_PATH);
    expect(generator[Symbol.asyncIterator]).toBeDefined();
    const result = await generator.next();
    expect(result.done).toBe(true);
  });

  it('should yield each image file path', async () => {
    const generator = crawlForImages(TEST_DIR_PATH);
    const result = await generator.next();
    expect(result.value).toBe(
      '/projects/monorepo-one/private/imgs/Lenna-sepia.jpg'
    );
    expect(result.done).toBe(false);
  });
});
