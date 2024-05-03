import { Unbox } from './../template/documented-plain-box.2';
import { PlainBox } from './PlainBox';
import { IUnbox } from './types';

export class XBox<T> extends PlainBox<T> implements IUnbox<T> {
  [key: string]: any;

  private _xmap(fn: (value: Unbox<T>) => any): any;
  private _xmap(fn: (value: T) => any): any;
  private _xmap(fn: (value: any) => any): any {
    if (XBox.isExtractableBox(this.boxedValue)) {
      return this.boxedValue.xmap(fn);
    } else {
      return fn(this.boxedValue);
    }
  }
  constructor(boxedValue: T) {
    super(boxedValue);
  }

  private static isExtractableBox<T>(
    value: T | ExtractableBox<T>
  ): value is ExtractableBox<T> {
    const result =
      typeof value === 'object' &&
      value !== null &&
      'xmap' in value &&
      'unbox' in value;
    if (result) {
      console.log('xmap:', value.xmap);
      console.log('unbox:', value.unbox);
      console.log('result:', result);
    }
    return result;
  }
  public static override of<TVal>(value: TVal): XBox<TVal> {
    return new XBox<TVal>(value);
  }

  // public override map<U>(f: (value: T) => U): XBox<U> {
  //   return new XBox(f(this._boxedValue));
  // }

  public xmap<Rx>(fn: (value: Unbox<T>) => Rx): XBox<ReplaceInnerType<T, Rx>>;
  public xmap<Rx>(fn: (value: T) => Rx): XBox<ReplaceInnerType<T, Rx>>;
  public xmap<Rx>(fn: (value: any) => Rx): XBox<ReplaceInnerType<T, Rx>> {
    const result = XBox.of(this._xmap(fn));
    return result;
    // throw new Error('Method not implemented.');
  }

  override get boxedValue(): T {
    return super.boxedValue;
  }

  // public get override boxedValue(): T {
  //   return super.boxedValue;
  // }

  // public static override unbox(): Unbox<T> {
  //   return this.boxedValue;
  // }
}

// import { ExtractableBox } from '../classes/ExtractableBox';
export type ExtractableBox<T> = {
  xmap<Rx>(fn: (value: Unbox<T>) => Rx): PlainBox<ReplaceInnerType<T, Rx>>;
  unbox(): Unbox<T>;
  boxedValue: T;
};

// import { ReplaceInnerType } from '../classes/types';
export type ReplaceInnerType<T, NewInner> =
  T extends PlainBox<infer Inner>
    ? Inner extends PlainBox<any>
      ? PlainBox<ReplaceInnerType<Inner, NewInner>>
      : PlainBox<NewInner>
    : never;
