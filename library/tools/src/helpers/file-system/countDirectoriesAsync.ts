import { readdir, stat } from 'fs/promises';

export async function countDirectoriesAsync(
  path: string
): Promise<number | null | undefined> {
  try {
    const stats = await stat(path);
    if (!stats.isDirectory()) {
      return null; // It's a file, not a directory
    }
    const files = await readdir(path);
    const dirCount = (
      await Promise.all(
        files.map(async file => {
          const filePath = `${path}/${file}`;
          return ((await stat(filePath)).isDirectory() ? 1 : 0) as number;
        })
      )
    ).reduce((a, b) => a + b, 0);

    return dirCount;
  } catch {
    return undefined; // Error or path does not exist
  }
}
