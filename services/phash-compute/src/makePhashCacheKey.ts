export function makePhashCacheKey(imgFileAbsPath: string) {
  return `'pHash:${imgFileAbsPath}'`;
}
