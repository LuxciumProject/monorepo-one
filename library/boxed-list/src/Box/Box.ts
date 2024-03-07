import type { IApply, IBox, IChain, IMap, IUnbox, IValue } from '../types';

/**
 * This is the doc comment for Box class
 *
 */
export class Box<T>
  implements IApply<T>, IChain<T>, IMap<T>, IUnbox<T>, IBox<T>, IValue<T>
{
  #value: T;
  private boxedValue: T;

  // static ============================================-| of() |-====
  public static of<TVal>(value: TVal): Box<TVal> {
    return new Box(value);
  }

  // static ==========================================-| from() |-====
  public static from<TVal>(box: IUnbox<TVal>) {
    return new Box(box.unbox());
  }

  // protected ================================-| constructor() |-====
  protected constructor(value: T) {
    this.boxedValue = value;
    this.#value = this.boxedValue;

    Object.defineProperty(this, 'fantasy-land/map', {
      value: this.map,
      writable: false,
      enumerable: false,
      configurable: false,
    });
    Object.defineProperty(this, 'fantasy-land/ap', {
      value: this.ap,
      writable: false,
      enumerable: false,
      configurable: false,
    });
    Object.defineProperty(this, 'fantasy-land/chain', {
      value: this.chain,
      writable: false,
      enumerable: false,
      configurable: false,
    });
    return this;
  }

  public 'fantasy-land/map' = this.map;
  // public IMap<T> & 'fantasy-land/map' ==============-| map() |-====
  public map<R>(fn: (value: T, index?: -1) => R): Box<R> {
    return Box.of(fn(this.#value, -1));
  }
  public 'fantasy-land/ap' = this.ap;
  // public IApply<T> ==================================-| ap() |-====
  public ap<R>(c: Box<(val: T) => R>): Box<R> {
    return this.map<R>(val => c.map(fn => fn(val)).unbox());
  }
  public 'fantasy-land/chain' = this.chain;
  // public IChain<T> ===============================-| chain() |-====
  public chain<R>(fn: (value: T) => Box<R>): Box<R> {
    return this.map<Box<R>>(fn).unbox().box;
  }
  // public IUnbox<T> ===============================-| unbox() |-====
  public unbox(): T {
    return this.#value;
  }
  // get IBox<T> ========================================-| box |-====
  public get box() {
    return Box.of(this.unbox());
  }
  // get IValue<T> ====================================-| value |-====
  public get value() {
    return this.unbox();
  }
}
export default Box;
