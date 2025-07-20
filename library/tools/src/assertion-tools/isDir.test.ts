import { isDir, isDirSync } from './isDir';
import * as fs from 'node:fs/promises';
import * as fsSync from 'node:fs';

jest.mock('node:fs/promises', () => ({
  stat: jest.fn(),
}));

jest.mock('node:fs', () => ({
  statSync: jest.fn(),
}));

describe('isDir', () => {
  it('should return true for a valid directory', async () => {
    (fs.stat as jest.Mock).mockResolvedValueOnce({ isDirectory: () => true });
    await expect(isDir('/valid/directory')).resolves.toBe(true);
  });

  it('should return false for a file path', async () => {
    (fs.stat as jest.Mock).mockResolvedValueOnce({ isDirectory: () => false });
    await expect(isDir('/valid/file')).resolves.toBe(false);
  });

  it('should return null for an invalid path', async () => {
    (fs.stat as jest.Mock).mockRejectedValueOnce(new Error('Invalid path'));
    await expect(isDir('/invalid/path')).resolves.toBe(null);
  });
});

describe('isDirSync', () => {
  it('should return true for a valid directory', () => {
    (fsSync.statSync as jest.Mock).mockReturnValueOnce({ isDirectory: () => true });
    expect(isDirSync('/valid/directory')).toBe(true);
  });

  it('should return false for a file path', () => {
    (fsSync.statSync as jest.Mock).mockReturnValueOnce({ isDirectory: () => false });
    expect(isDirSync('/valid/file')).toBe(false);
  });

  it('should return null for an invalid path', () => {
    (fsSync.statSync as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Invalid path');
    });
    expect(isDirSync('/invalid/path')).toBe(null);
  });
});
