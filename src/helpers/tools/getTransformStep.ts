import { hasTransformStep } from '../assertions';

export function getTransformStep(
  item: unknown,
  initialTransformStep: number = -1
): number {
  let transformStep = initialTransformStep;
  if (hasTransformStep(item)) {
    transformStep = item.transformStep;
  }
  return transformStep;
}
