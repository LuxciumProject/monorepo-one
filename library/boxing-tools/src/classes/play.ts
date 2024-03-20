import { IMap } from './types/IMap';

type AnyBox<T> = {
  wrap: <U>(value: U) => AnyBox<U>;
  value: T;
};

// Hypothetical TransformAndRewrap utility
type TransformAndRewrap<T, OldValue, NewValue> = T extends {
  wrap: infer WrapFn;
  value: infer U;
}
  ? { wrap: WrapFn; value: TransformAndRewrap<U, OldValue, NewValue> }
  : T extends OldValue
    ? NewValue
    : T;

// Usage example (assuming the existence of wrap function implementations)
type NestedBox = AnyBox<AnyBox<AnyBox<number>>>;

// Applying a transformation (hypothetically from number to string)
type TransformedNestedBox = TransformAndRewrap<NestedBox, number, string>;
// Expected result: A nested structure similar to NestedBox but with the innermost value transformed to string

// type ReplaceInnerType<T, NewInner> = T extends infer Outer
//   ? Outer extends Wrapper<infer Inner>
//     ? Wrapper<ReplaceInnerType<Inner, NewInner>>
//     : NewInner
//   : never;

// type ReplaceInnerType<T, NewInner> =
//   T extends Wrapper<infer Inner>
//     ? Inner extends Wrapper<any>
//       ? Wrapper<ReplaceInnerType<Inner, NewInner>>
//       : Wrapper<NewInner>
//     : never;

type ReplaceInnerType<T, NewInner> =
  T extends Wrapper<infer Inner>
    ? Inner extends Wrapper<any>
      ? Wrapper<ReplaceInnerType<Inner, NewInner>>
      : NewInner
    : never;
type Unwrap<T> = T extends MyBox<infer U> ? Unwrap<U> : T;
interface Wrapper<T> {
  // Wrapper structure
}

// the expected vs the actual result are off by one level of nesting (type NestedString = Wrapper<Wrapper<Wrapper<string>>>) has one more than expected (type NestedString = Wrapper<Wrapper<string>>)

// Unwrap a nested structure to its innermost type

// Recursively reconstruct a nested structure around a new innermost type
type Reconstruct<T, NewInner> =
  T extends MyBox<infer U> ? MyBox<Reconstruct<U, NewInner>> : NewInner;

// Original nested structure: Wrapper<Wrapper<number>>
type NestedNumber_0 = number;
type NestedString_0 = ReplaceInnerType<NestedNumber_0, string>; // should be string
type NestedNumber_1 = Wrapper<NestedNumber_0>;

type NestedString_1 = ReplaceInnerType<NestedNumber_1, string>; // should be Wrapper<string>
type NestedNumber_2 = Wrapper<NestedNumber_1>;

type NestedString_2 = ReplaceInnerType<NestedNumber_2, string>; // should be Wrapper<Wrapper<string>>
type NestedNumber_3 = Wrapper<NestedNumber_2>;

type NestedString_3 = ReplaceInnerType<NestedNumber_3, string>; // should be Wrapper<Wrapper<Wrapper<string>>>

// Example class implementing the concept
class MyBox<T> implements IMap<T> {
  constructor(public value: T) {}
  // Simplified unwrap for demonstration
  unwrap(): T {
    let result: any = this;
    while (result instanceof MyBox) {
      result = result.value;
    }
    return result;
  }

  // Simplified reconstruct for demonstration
  static reconstruct<T>(value: T, depth: number): MyBox<T> {
    let result: any = value;
    for (let i = 0; i < depth; i++) {
      result = new MyBox(result);
    }
    return result;
  }
  map<R>(fn: (value: T) => R): MyBox<R> {
    return new MyBox(fn(this.value));
  }

  xmap<Rx>(fn: (value: Unwrap<T> | T) => Rx): MyBox<Reconstruct<T, Rx>> {
    const unwrappedValue = this.unwrap();
    const transformedValue = fn(unwrappedValue);
    return MyBox.reconstruct(transformedValue, 1) as MyBox<Reconstruct<T, Rx>>;
  }

  // Methods to unwrap and reconstruct would be defined to utilize the type utilities
}
