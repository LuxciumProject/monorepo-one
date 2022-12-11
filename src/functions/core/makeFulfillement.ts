import { FULFILLED } from '../../constants';
import { SettledRight } from '../../types';

// FUNC DEF:(makeFulfillement<U>) ------------------------------------
/** @internal */
export function makeFulfillement<U>({
  value,
  transformStep = -1,
  index = -1,
  base = {},
}: {
  value: U;
  index?: number;
  transformStep?: number;
  base?: { value: U; status: 'fulfilled' } | {};
}): SettledRight<U> {
  const currentValue = Object.freeze(value);
  const currentSettlement: PromiseSettledResult<U> = {
    status: FULFILLED,
    value: currentValue,
  };

  // INFO: To get base properties last but also overide its values ...
  const result: SettledRight<U> = {
    ...currentSettlement,
    ...base,
    ...currentSettlement,
    fulfilled: currentValue,
    currentRejection: null,
    rejected: null,
    reason: undefined,
    transformStep,
    index,
  };

  Object.defineProperty(result, 'reason', {
    value: undefined,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'value', {
    value: currentValue,
    enumerable: true,
    writable: false,
  });

  Object.defineProperty(result, 'fulfilled', {
    value: currentValue,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'rejected', {
    value: null,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'currentRejection', {
    value: null,
    enumerable: false,
    writable: false,
  });

  if (transformStep === -1) {
    Object.defineProperty(result, 'transformStep', {
      value: transformStep,
      enumerable: false,
      writable: false,
    });
  }

  if (index === -1) {
    Object.defineProperty(result, 'index', {
      value: index,
      enumerable: false,
      writable: false,
    });
  }

  return Object.freeze(result);
}
