import { promises as fs } from "node:fs";
import { basename } from "node:path";
import type { FileStats, ImageMetadata } from "../../types";

// SECTION: File System Analysis
/**
 * Analyzes file system metadata for an image file.
 *
 * @param filepath - Path to the image file to analyze
 * @returns File system metadata including stats and permissions
 */
export async function analyzeFileSystem(
  filepath: string,
): Promise<Pick<ImageMetadata, "filename" | "filepath" | "fileStats">> {
  // FIXME: Add existence check before stat
  // BUG #123: Can throw if file is deleted between check and stat
  const stats = await fs.stat(filepath);

  // INFO: Convert raw stats to our FileStats interface
  const fileStats: FileStats = {
    size: stats.size,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
    accessedAt: stats.atime,
    permissions: {
      // HINT: Use bitwise operations to check file permissions
      readable: Boolean(stats.mode & fs.constants.S_IRUSR),
      writable: Boolean(stats.mode & fs.constants.S_IWUSR),
    },
  };

  // ERROR: Handle cases where file becomes inaccessible
  // Implement proper error handling with custom error types
  return {
    filename: basename(filepath),
    filepath,
    fileStats,
  };
}

// TODO: Implement file type validation
// - Add MIME type detection
// - Validate file extensions
// - Check file integrity
