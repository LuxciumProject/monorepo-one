import { crawlForImages } from '..';

describe('crawlForImages', () => {
  test('should throw an error when no URL is provided', () => {
    expect(() => crawlForImages('')).toThrow('URL is required');
  });

  test('should fail the TDD test with the same name as the file', () => {
    // TODO: Write the failing test for TDD with the same name as the file
    expect(true).toBe(false);
  });
});
