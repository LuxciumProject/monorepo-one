import { readdirSync, statSync } from 'fs';

export function countDirectoriesSync(path: string): number | null | undefined {
  try {
    const stat = statSync(path);
    if (!stat.isDirectory()) {
      return null; // It's a file, not a directory
    }
    const files = readdirSync(path);
    const dirCount = files.reduce((count, file) => {
      const filePath = `${path}/${file}`;
      return statSync(filePath).isDirectory() ? count + 1 : count;
    }, 0);

    return dirCount;
  } catch {
    return undefined; // Error or path does not exist
  }
  // test neverness by uncommenting the following line:
  // return; // Unreachable code detected.ts
}

export function countDirectories(path: string): number | null | undefined;
export function countDirectories(
  path: Promise<string>
): Promise<number | null | undefined>;
export function countDirectories(): Promise<undefined>;
export function countDirectories(path?: undefined): Promise<undefined>;
export function countDirectories(
  path?: Promise<string> | string
): Promise<number | null | undefined> | (number | null | undefined) {
  if ('string' === typeof path) {
    return countDirectoriesSync(path);
  } else if (path) {
    return path.then(countDirectoriesSync).catch(() => undefined);
  }
  return Promise.resolve(undefined);
}

export function dirCountSync(path: string): number {
  const returnValue = countDirectories(path);
  return returnValue || 0;
}
export async function dirCountAsync(path: string): Promise<number> {
  const returnValue = countDirectories(Promise.resolve(path));
  return returnValue.then(value => value || 0).catch(() => 0);
}

/* eslint-disable @typescript-eslint/promise-function-async */
export function dirCount(path: string, promise: true): Promise<number>;
export function dirCount(path: string, promise: false): number;
export function dirCount(
  path: string,
  promise = false
): Promise<number> | number {
  if (promise) {
    return dirCountAsync(path);
  }
  return dirCountSync(path);
}
