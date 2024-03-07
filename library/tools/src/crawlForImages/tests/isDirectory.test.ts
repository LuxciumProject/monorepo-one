import { expect } from 'chai'; // Add the missing import statement

import { isDirectory } from '..';

test('isDirectory should return true for a directory', async () => {
  const TEST_DIR_PATH = '/projects/monorepo-one/private/imgs/' as const;

  const result = await isDirectory(TEST_DIR_PATH);

  // Use the imported 'expect' instead of 'toBe'
  expect(result).to.be.true;
});
test('isDirectory should return false for an inexisting directory', async () => {
  const TEST_DIR_PATH =
    '/projects/monorepo-one/private/not-a-directory/' as const;

  const result = await isDirectory(TEST_DIR_PATH);

  // Use the imported 'expect' instead of 'toBe'
  expect(result).to.be.false;
});
