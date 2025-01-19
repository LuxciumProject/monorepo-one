/**
 * @packageDocumentation
 * The `Box` class module provides a reusable specification for creating immutable containers
 * for encapsulated values. It defines a functional programming contract for handling
 * transformations, chaining, and operations while ensuring immutability.
 *
 * ## Specifications
 * - Encapsulation: The `Box` class must encapsulate a value of type `B`.
 * - Immutability: Once a value is boxed, it cannot be altered directly.
 * - Controlled Instantiation: The `Box` class must be instantiated through controlled mechanisms
 *   like factory methods (`of` or advanced scenarios like `from`).
 * - Functional Transformations: The class must support `map`, `chain`, `ap`, and `extend`.
 * - No Validation on Release: The encapsulated value is released as-is without any validation.
 *
 * ## Usage
 * This class serves as a base for creating immutable and functional containers, commonly used
 * in scenarios where values need to be safely manipulated without side effects.
 */

/**
 * A generic container class that encapsulates a value of type `B`.
 *
 * @typeParam B - The type of the encapsulated value.
 */
export class Box<B> {
  /**
   * Encapsulated value of type `B`.
   * This field is immutable and can only be accessed through defined methods or getters.
   */
  private readonly _boxedValue: B;

  /**
   * Creates a new `Box` containing the specified value.
   *
   * @typeParam TVal - The type of the value to be encapsulated.
   * @param value - The value to be boxed.
   * @returns A new instance of `Box` wrapping the provided value.
   */
  public static of<TVal>(value: TVal): Box<TVal> {
    return new Box<TVal>(value);
  }

  /**
   * Initializes the `Box` with the given value.
   *
   * @param value - The value to encapsulate.
   * @remarks
   * The constructor is protected to enforce controlled instantiation through factory methods.
   */
  protected constructor(value: B) {
    this._boxedValue = value;
  }

  /**
   * Applies a transformation function to the encapsulated value and returns a new `Box` containing the result.
   *
   * @typeParam R - The type of the transformed value.
   * @param fn - A pure function to transform the value.
   * @returns A new `Box` containing the transformed value.
   */
  public map<R>(fn: (value: B) => R): Box<R> {
    const result = fn(this._boxedValue);
    return new Box(result);
  }

  /**
   * Applies a function that returns another `Box` to the encapsulated value and flattens the result.
   *
   * @typeParam R - The type of the value in the resulting `Box`.
   * @param fn - A function that takes the encapsulated value and returns a new `Box`.
   * @returns The resulting `Box` after applying the function.
   */
  public chain<R>(fn: (value: B) => Box<R>): Box<R> {
    return fn(this._boxedValue);
  }

  /**
   * Applies a function, encapsulated in another `Box`, to the encapsulated value of this `Box`.
   *
   * @typeParam R - The type of the result value.
   * @param boxFn - A `Box` containing a function to apply.
   * @returns A new `Box` containing the result of applying the function.
   */
  public ap<R>(boxFn: Box<(value: B) => R>): Box<R> {
    return boxFn.chain(fn => this.map(fn));
  }

  /**
   * Applies a function to this `Box` and returns a new `Box` containing the result of the function.
   *
   * @typeParam R - The type of the result value.
   * @param f - A function that takes this `Box` and produces a new value.
   * @returns A new `Box` containing the result.
   */
  public extend<R>(f: (w: Box<B>) => R): Box<R> {
    const value = f(this);
    return new Box(value);
  }

  /**
   * Releases the encapsulated value without validation.
   *
   * @returns The raw encapsulated value.
   */
  public unbox(): B {
    return this._boxedValue;
  }

  /**
   * Provides read-only access to the encapsulated value.
   *
   * @returns The encapsulated value.
   */
  public get boxedValue(): B {
    return this._boxedValue;
  }
}

// boite vocale *98 4 3
