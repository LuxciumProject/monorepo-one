import { promises as fs } from "node:fs";
import { basename } from "node:path";
import type { FileStats, ImageMetadata } from "../../types";

export async function analyzeFileSystem(
  filepath: string,
): Promise<Pick<ImageMetadata, "filename" | "filepath" | "fileStats">> {
  const stats = await fs.stat(filepath);

  const fileStats: FileStats = {
    size: stats.size,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
    accessedAt: stats.atime,
    permissions: {
      readable: Boolean(stats.mode & fs.constants.S_IRUSR),
      writable: Boolean(stats.mode & fs.constants.S_IWUSR),
    },
  };

  return {
    filename: basename(filepath),
    filepath,
    fileStats,
  };
}
