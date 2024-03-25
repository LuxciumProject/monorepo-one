import { Model, ModelShortNames } from './types';

// Overloads for transformModelName
export function transformModelName(
  model: 'claude-3-opus-20240229'
): 'claude-3-opus';
export function transformModelName(
  model: 'claude-3-sonnet-20240229'
): 'claude-3-sonnet';
export function transformModelName(
  model: 'claude-3-haiku-20240307'
): 'claude-3-haiku';
export function transformModelName(model: 'claude-2.1'): 'claude-21';
export function transformModelName(model: 'claude-2.0'): 'claude-20';
export function transformModelName(model: 'claude-instant'): 'claude-instant';
export function transformModelName(model: Model): ModelShortNames;
export function transformModelName(model: string): ModelShortNames | null;
export function transformModelName(model: string): ModelShortNames | null {
  const datePattern = /-\d{8}$/;
  const versionPattern = /\b2\.([01])\b/;

  let transformedName: string = model.replace(datePattern, '');
  transformedName = transformedName.replace(versionPattern, '2$1');

  // The transformed name should now match one of the literals in ModelShortNames
  // TypeScript's type narrowing will infer the return type as ModelShortNames or ''
  if (
    transformedName === 'claude-3-opus' ||
    transformedName === 'claude-3-sonnet' ||
    transformedName === 'claude-3-haiku' ||
    transformedName === 'claude-21' ||
    transformedName === 'claude-20' ||
    transformedName === 'claude-instant'
  ) {
    return transformedName as ModelShortNames;
  }

  return null;
}
