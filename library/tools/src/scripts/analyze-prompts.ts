// src/scripts/analyze-prompts.ts

import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

interface FileNode {
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  category?: string;
  size?: number;
}

interface AnalysisResult {
  structure: FileNode;
  categories: Map<string, string[]>;
  duplicates: Map<string, string[]>;
}

export async function analyzeDirectory(
  rootPath: string,
  relativePath: string = ''
): Promise<FileNode> {
  const fullPath = join(rootPath, relativePath);
  const entries = await readdir(fullPath);
  const children: FileNode[] = [];

  for (const entry of entries) {
    const entryPath = join(relativePath, entry);
    const stats = await stat(join(rootPath, entryPath));

    if (stats.isDirectory()) {
      children.push(await analyzeDirectory(rootPath, entryPath));
    } else {
      children.push({
        path: entryPath,
        type: 'file',
        size: stats.size,
      });
    }
  }

  return {
    path: relativePath || '.',
    type: 'directory',
    children,
  };
}

export function categorizeContent(node: FileNode): Map<string, string[]> {
  const categories = new Map<string, string[]>();

  function categorize(path: string): string {
    if (path.includes('chatgpt') || path.includes('gpt-')) return 'ai/chatgpt';
    if (path.includes('claude')) return 'ai/claude';
    if (path.includes('midjourney')) return 'image-gen/midjourney';
    if (path.includes('typescript') || path.includes('.ts'))
      return 'development/typescript';
    if (path.includes('python') || path.includes('.py'))
      return 'development/python';
    return 'uncategorized';
  }

  function traverse(node: FileNode, currentPath: string = '') {
    const fullPath = join(currentPath, node.path);
    const category = categorize(fullPath);

    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)?.push(fullPath);

    node.children?.forEach(child => traverse(child, fullPath));
  }

  traverse(node);
  return categories;
}

interface DirectoryPattern {
  depth: number;
  childCount: number;
  fileTypes: Set<string>;
  subfolderNames: Set<string>;
}

export async function findDuplicateStructures(
  analysis: AnalysisResult
): Promise<Map<string, string[]>> {
  const duplicates = new Map<string, string[]>();
  // Removed unused patterns Map

  function getFileExtension(path: string): string {
    const match = path.match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : '';
  }

  function generatePatternKey(pattern: DirectoryPattern): string {
    return `d${pattern.depth}-c${pattern.childCount}-f${[...pattern.fileTypes].sort().join('')}-s${[...pattern.subfolderNames].sort().join('')}`;
  }

  function analyzeNodePattern(
    node: FileNode,
    depth: number = 0
  ): DirectoryPattern {
    const pattern: DirectoryPattern = {
      depth,
      childCount: node.children?.length || 0,
      fileTypes: new Set<string>(),
      subfolderNames: new Set<string>(),
    };

    node.children?.forEach(child => {
      if (child.type === 'file') {
        const ext = getFileExtension(child.path);
        if (ext) pattern.fileTypes.add(ext);
      } else {
        pattern.subfolderNames.add(child.path.split('/').pop() || '');
      }
    });

    return pattern;
  }

  function findSimilarStructures(node: FileNode, currentPath: string = '') {
    if (node.type === 'directory') {
      const pattern = analyzeNodePattern(node);
      const patternKey = generatePatternKey(pattern);

      if (!duplicates.has(patternKey)) {
        duplicates.set(patternKey, []);
      }
      duplicates.get(patternKey)?.push(join(currentPath, node.path));

      node.children?.forEach(child => {
        if (child.type === 'directory') {
          findSimilarStructures(child, join(currentPath, node.path));
        }
      });
    }
  }

  findSimilarStructures(analysis.structure);

  // Filter out non-duplicate patterns
  for (const [key, paths] of duplicates.entries()) {
    if (paths.length < 2) {
      duplicates.delete(key);
    }
  }

  return duplicates;
}
