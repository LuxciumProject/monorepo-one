import { TransformFn } from '../types';

/**
 * This class can be used to chain together multiple functions
 * @template InputType The input type of the first function
 * @template U The output type of the last function
 * @remarks
 * It has a private constructor that initializes the properties with the values passed in.
It has a static method addFunction that creates a new instance of the class and sets the first function.
It has a method addFunction that allows to add subsequent functions to the chain and returns a new instance of the class with the new output type and the current last function updated.
It has a method invert that invert the order of the functions in the chain and returns a new instance of the class with the _inverted property set to true.
It has a method `getFun`
 * @beta
 * @experimental
 * @internal
 *
 * This is the constructor for {@link ChainTranformFunctions}
 * @param firstFunction: the initial function passed to the class on creation.
 * @param functions: an array that stores all the functions added to the chain.
 * @param lastFunction: the last function added to the chain.
 *
 *  @example
 * ```ts
 * const addFirstFunction = ChainTranformFunctions.addFirstFunction
 * const chain1 = addFirstFunction<number, number>((x) => x + 2);
 * const chain2 = chain1.addFunction<number, number>((x) => x * 2);
 * const chain3 = chain2.addFunction<number, number>((x) => x + 3);
 * const transformFnTuple = chain3.addLastFunction<number, number>((x) => x * 5);
 * ```
 *
 */
export class ChainTranformFunctions<InputType, U = InputType> {
  private _functions: TransformFnTuple<InputType, U>;

  public static addFirstFunction<TVal, RVal = TVal>(
    fn: TransformFn<TVal, RVal>
  ) {
    return new ChainTranformFunctions<TVal, RVal>(fn, []);
  }
  private constructor(
    private readonly _firstFunction: TransformFn<InputType, any>,
    functions: TransformFnTuple<any, any> | TransformFn<any, any>[],
    private readonly _lastFunction: TransformFn<any, U> = _firstFunction
  ) {
    functions.push(_lastFunction);
    this._functions = functions as TransformFnTuple<any, any>;
  }

  public addFunction<U, RVal>(fn: TransformFn<U, RVal>) {
    return new ChainTranformFunctions<InputType, RVal>(
      this._firstFunction,
      this._functions,
      fn
    );
  }
  public addLastFunction<U, OutputType>(fn: TransformFn<U, OutputType>) {
    return new ChainTranformFunctions<InputType, OutputType>(
      this._firstFunction,
      this._functions,
      fn
    ).functions;
  }
  get functions() {
    return this._functions;
  }
  get firstFunction() {
    return this._firstFunction;
  }
  get lastFunction() {
    return this._lastFunction;
  }
}

export type TransformFnTuple<InputType, OutputType> =
  | [TransformFn<InputType, OutputType>]
  | [TransformFn<InputType, unknown>, TransformFn<unknown, OutputType>]
  | [
      TransformFn<InputType, unknown>,
      ...TransformFn<unknown, unknown>[],
      TransformFn<unknown, OutputType>
    ];

export const addFirstFunction = ChainTranformFunctions.addFirstFunction;
export default ChainTranformFunctions;
