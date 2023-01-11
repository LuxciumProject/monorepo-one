import { hasTransformStep } from '../assertions';

/**
 * @category Helper Tools
 *
 * @public
 * */
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

// TASK LIST: [TODO] (Review Documentation) --------------------------
