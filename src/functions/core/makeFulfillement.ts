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
  base?: { value: U; status: 'fulfilled'; index?: number } | {};
}): SettledRight<U> {
  const currentValue = Object.freeze(value);
  const currentSettlement: PromiseSettledResult<U> = {
    status: FULFILLED,
    value: currentValue,
  };

  const currentIndex =
    base != null &&
    typeof base === 'object' &&
    'index' in base &&
    base.index != null &&
    typeof base.index === 'number' &&
    base.index > -1 &&
    !Number.isNaN(base.index)
      ? base.index
      : typeof index === 'number' && !Number.isNaN(index)
      ? index
      : -1;

  // INFO: To get base properties last but also overide its values ...
  const result: SettledRight<U> = {
    ...currentSettlement,
    ...base,
    ...currentSettlement,
    fulfilled: currentValue,
    currentRejection: null,
    rejected: null,
    reason: undefined,
    index: currentIndex,
    transformStep: transformStep,
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
  } else {
    Object.defineProperty(result, 'transformStep', {
      value: transformStep,
      enumerable: true,
      writable: false,
    });
  }

  if (currentIndex === -1) {
    Object.defineProperty(result, 'index', {
      value: currentIndex,
      enumerable: false,
      writable: false,
    });
  }
  // else {
  //   Object.defineProperty(result, 'index', {
  //     value: currentIndex,
  //     enumerable: true,
  //     writable: false,
  //   });
  // }

  return Object.freeze(result);
}

// TASK LIST: [TODO] (Review Documentation) --------------------------
