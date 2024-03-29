import { Models } from '../types';

// Function to transform model names

export function transformModelName_(modelName: Models): string {
  const datePattern = /-\d{8}$/;
  const versionPattern = /\b2\.([01])\b/;

  let transformedName = modelName.replace(datePattern, '');
  transformedName = transformedName.replace(
    versionPattern,
    (_match, p1) => `2${p1}`
  );

  return transformedName;
}
