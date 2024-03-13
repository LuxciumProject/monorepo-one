import type { ExtractFL, IUnbox, Unbox } from '../core/Box/types';

export class MiniBox<U> implements IUnbox<U>, ExtractFL<U> {
  // static get =======================================-| Value |-====
  static get Value() {
    return Symbol.for('value');
  }
  // get ==============================================-| Value |-====
  get Value() {
    return MiniBox.Value;
  }
  // static ============================================-| of() |-====
  static of<UVal>(value: UVal): MiniBox<UVal> {
    return new MiniBox(value);
  }
  [key: symbol]: U;
  // static ===================================-| isUnboxable() |-====
  static isUnboxable<UVal>(
    this_value: UVal | IUnbox<UVal>
  ): this_value is IUnbox<UVal> {
    return (
      typeof this_value === 'object' &&
      this_value !== null &&
      'unbox' in this_value &&
      typeof this_value.unbox === 'function'
    );
  }
  // protected ====================================-| MiniBox() |-====
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
  public ['fantasy-land/map'] = this.map;
  // public map =======================================-| map() |-====
  map<R>(fn: (value: U) => R): MiniBox<R> {
    const result = fn(this._boxedValue);
    return MiniBox.of(result);
  }
  public ['fantasy-land/extract'] = this.unbox;
  // public unbox ===================================-| unbox() |-====
  unbox(): Unbox<U> | U {
    if (MiniBox.isUnboxable(this._boxedValue)) {
      return this._boxedValue.unbox();
    }
    return this._boxedValue;
  }
  // protected get ====================-| [Symbol.for('value')] |-====
  protected get [Symbol.for('value')](): U {
    return this._boxedValue;
  }

  // get =========================================-| boxedValue |-====
  get boxedValue(): U {
    return this._boxedValue;
  }
}
