import { BaseBox } from '../BaseBox';

export type ReplaceInnerType<T, NewInner> =
  T extends BaseBox<infer Inner>
    ? Inner extends BaseBox<any>
      ? BaseBox<ReplaceInnerType<Inner, NewInner>>
      : BaseBox<NewInner>
    : never;
