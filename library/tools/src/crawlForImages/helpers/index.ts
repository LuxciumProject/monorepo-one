/**
 * @module crawlForImages/core
 * @description This module exports functions for crawling directories
 * and filtering image files.
 */

export {
  default as crawl,
  ensureArray,
  filterImageFiles,
  getImageExtensionList,
  isDirectory,
  isImageFile,
  isImageFilePath,
  readDirectory,
} from './crawlHelpers';
/*
crawl.ensureArray;
crawl.filterImageFiles;
crawl.imageExtensions;
crawl.isDirectory;
crawl.isImageFilePath;
crawl.readDirectory;
 */
