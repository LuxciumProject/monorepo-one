import { isA_DirentWithFileType } from './isA_DirentWithFileType';
import type { DirentWithFileType } from '../types/main';

describe('isA_DirentWithFileType', () => {
  it('should return true for a valid DirentWithFileType object', () => {
    const validDirent: DirentWithFileType = {
      fileName: 'example.txt',
      isBlockDevice: false,
      isCharacterDevice: false,
      isDirectory: false,
      isFIFO: false,
      isFile: true,
      isSocket: false,
      isSymbolicLink: false,
    };

    expect(isA_DirentWithFileType(validDirent)).toBe(true);
  });

  it('should return false for an object missing required properties', () => {
    const invalidDirent = {
      fileName: 'example.txt',
      isBlockDevice: false,
      isCharacterDevice: false,
      isDirectory: false,
      isFIFO: false,
      isFile: true,
    };

    expect(isA_DirentWithFileType(invalidDirent)).toBe(false);
  });

  it('should return false for an object with incorrect property types', () => {
    const invalidDirent = {
      fileName: 'example.txt',
      isBlockDevice: 'false',
      isCharacterDevice: false,
      isDirectory: false,
      isFIFO: false,
      isFile: true,
      isSocket: false,
      isSymbolicLink: false,
    };

    expect(isA_DirentWithFileType(invalidDirent)).toBe(false);
  });

  it('should return false for a completely unrelated object', () => {
    const unrelatedObject = {
      randomKey: 'randomValue',
    };

    expect(isA_DirentWithFileType(unrelatedObject)).toBe(false);
  });

  it('should return false for null or undefined', () => {
    expect(isA_DirentWithFileType(null)).toBe(false);
    expect(isA_DirentWithFileType(undefined)).toBe(false);
  });
});
