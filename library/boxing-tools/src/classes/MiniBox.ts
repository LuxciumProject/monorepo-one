import { FunctorFL, IUnbox, Unbox } from './Box/types';
import { ExtractInnermost } from './ExtractInnermost';
import { ExtractableBox } from './ExtractableBox';

export class MiniBox<U> implements IUnbox<U>, FunctorFL<U> {
  static get Value() {
    return Symbol.for('value');
  } // get static ======================================| Value |=====
  get Value() {
    return MiniBox.Value;
  } // get =============================================| Value |=====

  static ['fantasy-land/of'] = MiniBox.of;
  // static =============================================| of() |=====
  static of<UVal>(value: UVal): MiniBox<UVal> {
    // No parts of the `value` parameter should be checked here.
    // No parts of return value of that function should be checked.
    return new MiniBox<UVal>(value);
  }
  public static ['isMiniBox']<U>(box: IUnbox<U> | U): box is MiniBox<U> {
    return box instanceof MiniBox ? MiniBox.isUnboxable(box) : false;
  } // static =====================================| isMiniBox() |====
  static from<UxVal>(value: UxVal | MiniBox<UxVal>) {
    // No parts of the `value` parameter should be checked here.
    const result = MiniBox.of(
      MiniBox.isMiniBox(value) ? value.boxedValue : value
    );

    // No parts of return value of that function should be checked.
    return result;
  } // static ==================================| isUnboxable() |=====

  [key: (typeof MiniBox<U>)['Value']]: U;
  // static ====================================| isUnboxable() |=====
  static isUnboxable<UVal>(val: UVal | IUnbox<UVal>): val is IUnbox<UVal> {
    return (
      typeof val === 'object' &&
      val !== null &&
      'unbox' in val &&
      typeof val.unbox === 'function'
    );
  } // constructor protected =======================| MiniBox() |=====
  protected constructor(private _boxedValue: U) {
    Symbol.for('value');
    Object.defineProperty(this, 'fantasy-land/map', {
      value: this.map,
      writable: false,
      enumerable: false,
      configurable: false,
    });
    Object.defineProperty(this, 'fantasy-land/extract', {
      value: this.unbox,
      writable: false,
      enumerable: false,
      configurable: false,
    });
    return this;
  }
  private static isExtractableBox<T>(
    value: T | ExtractableBox<T>
  ): value is ExtractableBox<T> {
    return (
      typeof value === 'object' &&
      value !== null &&
      'xmap' in value &&
      'unbox' in value
    );
  }

  // public ['fantasy-land/extract'] = this.unbox;
  // public unbox ====================================| unbox() |=====
  unbox(): Unbox<U> | U {
    return MiniBox.isUnboxable(this._boxedValue)
      ? this._boxedValue.unbox()
      : this._boxedValue;
  }
  // protected get =====================| [Symbol.for('value')] |=====
  protected get [Symbol.for('value')](): U {
    return this._boxedValue;
  }

  // get ==========================================| boxedValue |=====
  get boxedValue(): U {
    return this._boxedValue;
  }
  public ['fantasy-land/map'] = this.map;
  // public map ========================================| map() |=====
  map<R>(fn: (value: U) => R): MiniBox<R> {
    const result = fn(this._boxedValue);
    return MiniBox.of(result);
  }

  // public xmap ======================================| xmap() |=====
  public xmap<Rx>(fn: (value: U | ExtractInnermost<U>) => Rx): MiniBox<any> {
    const newValue = MiniBox.isExtractableBox(this._boxedValue)
      ? this._boxedValue.xmap(fn)
      : null;
    const result = MiniBox.isExtractableBox(this._boxedValue)
      ? this.map(fn)
      : null;

    if (MiniBox.isExtractableBox(this._boxedValue)) {
      const newValue = this._boxedValue.xmap(fn);
      return MiniBox.of(newValue);
    } else {
      return this.map(fn);
    }
  }
}
