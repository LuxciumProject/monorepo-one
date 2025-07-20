import { isA_CurrentPath } from './isA_CurrentPath';
import { CurrentPath, FileType } from '../types/main';

describe('isA_CurrentPath', () => {
  it('should return true for a valid CurrentPath object', () => {
    const validPath: CurrentPath = {
      type: FileType.File,
      fileName: 'example.txt',
      baseName: 'example',
      dir: '/home/user',
      fullPath: '/home/user/example.txt',
      ext: '.txt', // Added the missing property
      extname: '.txt', // Added the missing property
      exclude: false,
    };

    expect(isA_CurrentPath(validPath)).toBe(true);
  });

  it('should return false for an object missing required properties', () => {
    const invalidPath = {
      type: FileType.File,
      fileName: 'example.txt',
      baseName: 'example',
      dir: '/home/user',
      exclude: false,
    };

    expect(isA_CurrentPath(invalidPath as any)).toBe(false); // Cast to `any` to simulate invalid input
  });

  it('should return false for an object with incorrect property types', () => {
    const invalidPath = {
      type: 123,
      fileName: 'example.txt',
      dir: '/home/user',
      fullPath: '/home/user/example.txt',
    };

    expect(isA_CurrentPath(invalidPath)).toBe(false);
  });

  it('should return false for a completely unrelated object', () => {
    const unrelatedObject = {
      randomKey: 'randomValue',
    };

    expect(isA_CurrentPath(unrelatedObject)).toBe(false);
  });

  it('should return false for null or undefined', () => {
    expect(isA_CurrentPath(null)).toBe(false);
    expect(isA_CurrentPath(undefined)).toBe(false);
  });
});
