import { REJECTED } from '../../constants';
import { SettledLeft } from '../../types';

// FUNC DEF:(makeRejection) ------------------------------------------
/** @internal */
export function makeRejection({
  reason,
  currentRejection = undefined,
  transformStep = -1,
  index = -1,
  base = {},
}: {
  reason: any;
  currentRejection?: true | false | undefined;
  transformStep?: number;
  index?: number;
  base?: { reason: any; status: 'rejected' } | {};
}): SettledLeft {
  const currentReason = Object.freeze(reason);
  const currentSettlement: PromiseRejectedResult = {
    status: REJECTED,
    reason: currentReason,
  };

  // INFO: To get base properties last but also overide its values ...
  const result: SettledLeft = {
    ...currentSettlement,
    currentRejection,
    ...base,
    ...currentSettlement,
    rejected: currentReason,
    fulfilled: null,
    value: undefined,
    transformStep,
    index,
  };

  Object.defineProperty(result, 'reason', {
    value: currentReason,
    enumerable: true,
    writable: false,
  });

  Object.defineProperty(result, 'value', {
    value: undefined,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'rejected', {
    value: currentReason,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'fulfilled', {
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
