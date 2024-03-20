import { MyBox } from '../MyBox';

export type ReplaceInnerType<T, NewInner> =
  T extends MyBox<infer Inner>
    ? Inner extends MyBox<any>
      ? MyBox<ReplaceInnerType<Inner, NewInner>>
      : MyBox<NewInner>
    : never;
