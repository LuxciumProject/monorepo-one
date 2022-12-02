/**
 * @depracated
 * @beta
 */
export type SettledIso<T = any> = {
  fulfilled: null | T;
  rejected: any;
  value?: undefined | T;
  reason?: any;
  index: number;
} & (
  | {
      status: 'fulfilled';
      value: T;
    }
  | {
      status: 'rejected';
      reason: any;
    }
);
