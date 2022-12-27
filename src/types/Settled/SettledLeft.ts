/**
 * The type SettledLeft extends PromiseRejectedResult adding
 * isometric parameters with PromiseRejectedResult and adding
 * Cardinal and Ordinal indexes.
 * @public
 */

export type SettledLeft = PromiseRejectedResult & {
  status: 'rejected';
  reason: any;
  value?: undefined;
  rejected: any;
  fulfilled: null;
  transformStep: number;
  currentRejection: true | false | undefined;
  index: number;
};

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
