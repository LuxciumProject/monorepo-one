import { FULFILLED, REJECTED } from '../../constants';
import {
  isSettled,
  isSettledLeft,
  isSettledRight,
} from '../../helpers/assertions';
import { SettledRight } from '../../types';

// export type SettledRight<T> = PromiseFulfilledResult<T> & {
/*
  status: 'fulfilled';
  value: T;
  reason?: undefined;
  fulfilled: T;
  rejected: null;
  recipeSteps: number;
  currentRejection: null;
  index: number;
*/

/*
  {
    status: 'fulfilled',
    value: 'T',
    reason?: undefined,
    fulfilled: 'T',
    rejected: null,
    recipeSteps: NaN,
    currentRejection: null,
    index: -1
  }

    {
    status: 'fulfilled',
    }
    {
    value: 'T',
    }
    {
    reason?: undefined,
    }
    {
    fulfilled: 'T',
    }
    {
    rejected: null,
    }
    {
    recipeSteps: NaN,
    }
    {
    currentRejection: null,
    }
    {
    index: -1
    }
 */
// };
export function isSettledRight_<T>(
  contender: any
): contender is SettledRight<T> {
  return (
    contender?.status === FULFILLED &&
    'value' in contender &&
    FULFILLED in contender &&
    contender.value === contender[FULFILLED] &&
    REJECTED in contender &&
    contender.rejected === null &&
    'currentRejection' in contender &&
    contender.currentRejection === null &&
    'recipeSteps' in contender &&
    typeof contender.recipeSteps === 'number' &&
    'index' in contender &&
    typeof contender.index === 'number'
  );
}

describe('SettledRight<T_type> syntetic testing', () => {
  it("status: 'fulfilled', because status: 'fulfilled';", () => {
    const contender: any = { status: 'fulfilled' };
    expect(contender.status === FULFILLED).toBeTruthy();
  });
  it("value: 'T', because value: T;", () => {
    const contender: any = { value: 'T' };
    expect('value' in contender).toBeTruthy();
  });
  it.each([{ reason: undefined } as any, {} as any])(
    'reason?: undefined, because reason?: undefined;',
    contender => {
      expect(
        ('reason' in contender && typeof contender.reason === 'undefined') ||
          !('reason' in contender)
      ).toBeTruthy();
    }
  );
  it.each([{ val: 'T', main: [1, 2, 3] } as any, 'T' as any])(
    "fulfilled: 'T', because fulfilled: T;",
    value => {
      const contender: any = { value, fulfilled: value };
      expect(contender.value === contender[FULFILLED]).toBeTruthy();
    }
  );
  it('rejected: null, because rejected: null;', () => {
    const contender: any = { rejected: null };
    expect(REJECTED in contender && contender.rejected === null).toBeTruthy();
  });
  it('recipeSteps: NaN, because recipeSteps: number;', () => {
    const contender: any = { recipeSteps: NaN };
    expect(typeof contender.recipeSteps === 'number').toBeTruthy();
  });
  it('currentRejection: null, because currentRejection: null;', () => {
    const contender: any = { currentRejection: null };
    expect(contender.currentRejection === null).toBeTruthy();
  });
  it('index: -1, because index: number;', () => {
    const contender: any = { index: -1 };
    expect(
      'index' in contender && typeof contender.index === 'number'
    ).toBeTruthy();
  });
});

export async function isSettled_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    isSettledRight({
      status: FULFILLED,
      value: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: null,
      recipeSteps: 0,
      index: 0,
    })
  );
  isSettledRight({
    status: 'fulfilled',
    value: 10,
    // reason: undefined,
    fulfilled: 10,
    rejected: null,
    currentRejection: null,
    recipeSteps: -1,
  }) &&
    // HACK: -------------------------------------------------------
    process.exit(51);
  // BUG: --------------------------------------------------------

  console.log(
    isSettledLeft({
      status: REJECTED,
      reason: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: true,
      recipeSteps: 0,
      index: 0,
    })
  );

  console.log(
    isSettled({
      status: FULFILLED,
      value: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: null,
      recipeSteps: 0,
      index: 0,
    })
  );
  console.log(
    isSettled({
      status: REJECTED,
      reason: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: true,
      recipeSteps: 0,
      index: 0,
    })
  );
  return void 0;
}
// isSettled_TEST_();
