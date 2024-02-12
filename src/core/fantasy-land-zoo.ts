export class Profunctor<Input, Output> {
  constructor(private transformation: (input: Input) => Output) {}

  ["fantasy-land/promap"]<NewInput, NewOutput>(
    inputTransformer: (newInput: NewInput) => Input,
    outputTransformer: (output: Output) => NewOutput,
  ): Profunctor<NewInput, NewOutput> {
    return new Profunctor<NewInput, NewOutput>((newInput: NewInput) =>
      outputTransformer(this.transformation(inputTransformer(newInput))),
    );
  }
}

export class MyAlt<T> {
  constructor(private value: T) {}

  static ["fantasy-land/of"]<T>(value: T): MyAlt<T> {
    return new MyAlt(value);
  }

  ["fantasy-land/map"]<U>(f: (value: T) => U): MyAlt<U> {
    return new MyAlt(f(this.value));
  }

  ["fantasy-land/alt"](other: MyAlt<T>): MyAlt<T> {
    // Here we implement a simple choice: if the original value is truthy, keep it, otherwise use the other value.
    return this.value ? this : other;
  }
}

export class MyPlus<T> {
  constructor(private value: T | null) {}

  static ["fantasy-land/zero"]<T>(): MyPlus<T | null> {
    return new MyPlus<T | null>(null);
  }

  ["fantasy-land/map"]<U>(f: (value: T) => U): MyPlus<U | null> {
    return this.value !== null
      ? new MyPlus<U>(f(this.value))
      : MyPlus["fantasy-land/zero"]();
  }

  ["fantasy-land/alt"](other: MyPlus<T>): MyPlus<T> {
    return this.value !== null ? this : other;
  }
}

export class MyAlternative<T> {
  constructor(private value: T | null) {}

  static ["fantasy-land/zero"]<T>(): MyAlternative<T | null> {
    return new MyAlternative<T | null>(null);
  }

  static ["fantasy-land/of"]<T>(value: T): MyAlternative<T> {
    return new MyAlternative<T>(value);
  }

  ["fantasy-land/map"]<U>(f: (value: T) => U): MyAlternative<U | null> {
    return this.value !== null
      ? new MyAlternative<U>(f(this.value))
      : MyAlternative["fantasy-land/zero"]();
  }

  ["fantasy-land/alt"](other: MyAlternative<T>): MyAlternative<T> {
    return this.value !== null ? this : other;
  }

  ["fantasy-land/ap"](
    other: MyAlternative<(value: T) => T>,
  ): MyAlternative<T | null> {
    return this.value !== null && other.value !== null
      ? new MyAlternative<T>(other.value(this.value))
      : MyAlternative["fantasy-land/zero"]();
  }
}
export class MyBifunctor<FirstType, SecondType> {
  constructor(
    private firstValue: FirstType,
    private secondValue: SecondType,
  ) {}

  ["fantasy-land/map"]<NewSecondType>(
    transform: (value: SecondType) => NewSecondType,
  ): MyBifunctor<FirstType, NewSecondType> {
    return new MyBifunctor<FirstType, NewSecondType>(
      this.firstValue,
      transform(this.secondValue),
    );
  }

  ["fantasy-land/bimap"]<NewFirstType, NewSecondType>(
    transformFirst: (value: FirstType) => NewFirstType,
    transformSecond: (value: SecondType) => NewSecondType,
  ): MyBifunctor<NewFirstType, NewSecondType> {
    return new MyBifunctor<NewFirstType, NewSecondType>(
      transformFirst(this.firstValue),
      transformSecond(this.secondValue),
    );
  }
}

export class Either<LeftType, RightType> {
  constructor(
    private leftValue: LeftType | null,
    private rightValue: RightType | null,
  ) {}

  ["fantasy-land/map"]<NewRightType>(
    transform: (value: RightType) => NewRightType,
  ): Either<LeftType, NewRightType> {
    if (this.rightValue === null) {
      return new Either<LeftType, NewRightType>(this.leftValue, null);
    } else {
      return new Either<LeftType, NewRightType>(
        null,
        transform(this.rightValue),
      );
    }
  }
  ["fantasy-land/bimap"]<NewLeftType, NewRightType>(
    transformLeft: (value: LeftType) => NewLeftType,
    transformRight: (value: RightType) => NewRightType,
  ): Either<NewLeftType, NewRightType> {
    if (this.rightValue === null) {
      return new Either<NewLeftType, NewRightType>(
        this.leftValue !== null ? transformLeft(this.leftValue) : null,
        null,
      );
    } else {
      return new Either<NewLeftType, NewRightType>(
        null,
        transformRight(this.rightValue),
      );
    }
  }
}

export class MyList<ItemType> {
  constructor(private items: ItemType[]) {}

  ["fantasy-land/reduce"]<AccumulatorType>(
    binaryFunction: (
      accumulator: AccumulatorType,
      item: ItemType,
    ) => AccumulatorType,
    initialAccumulator: AccumulatorType,
  ): AccumulatorType {
    return this.items.reduce(binaryFunction, initialAccumulator);
  }
}

export class MyTraversableList<ItemType> {
  constructor(private items: ItemType[]) {}

  ["fantasy-land/map"]<NewItemType>(
    transform: (item: ItemType) => NewItemType,
  ): MyTraversableList<NewItemType> {
    return new MyTraversableList<NewItemType>(this.items.map(transform));
  }

  ["fantasy-land/reduce"]<AccumulatorType>(
    binaryFunction: (
      accumulator: AccumulatorType,
      item: ItemType,
    ) => AccumulatorType,
    initialAccumulator: AccumulatorType,
  ): AccumulatorType {
    return this.items.reduce(binaryFunction, initialAccumulator);
  }

  ["fantasy-land/traverse"]<Applicative>(
    ApplicativeConstructor: { new (value: any): Applicative },
    transformFunction: (item: ItemType) => Applicative,
  ): Applicative {
    const transformedItems = this.items.map(transformFunction);
    return new ApplicativeConstructor(transformedItems);
  }
}
export class Contravariant<T> {
  constructor(private value: (input: T) => any) {}

  ["fantasy-land/contramap"]<U>(f: (input: U) => T): Contravariant<U> {
    return new Contravariant<U>((input: U) => this.value(f(input)));
  }
}

export class Semigroupoid<InputType, OutputType> {
  ["fantasy-land/compose"] = this.compose;
  constructor(private func: (input: InputType) => OutputType) {}

  public compose<NewInputType>(
    other: Semigroupoid<NewInputType, InputType>,
  ): Semigroupoid<NewInputType, OutputType> {
    return new Semigroupoid<NewInputType, OutputType>((input: NewInputType) =>
      this.func(other.func(input)),
    );
  }
}

export class Category<InputType, OutputType> {
  constructor(private func: (input: InputType) => OutputType) {}

  ["fantasy-land/compose"]<NewInputType>(
    other: Category<NewInputType, InputType>,
  ): Category<NewInputType, OutputType> {
    return new Category<NewInputType, OutputType>((input: NewInputType) =>
      this.func(other.func(input)),
    );
  }

  static ["fantasy-land/id"]<Type>(): Category<Type, Type> {
    return new Category<Type, Type>((input: Type) => input);
  }
}

export class ObjectSetoid<T extends object> {
  private _value: T;

  static ["fantasy-land/empty"]() {
    return new ObjectSetoid({});
  }

  constructor(value: T) {
    this._value = value;
  }

  ["fantasy-land/equals"]<U extends object>(other: ObjectSetoid<U>): boolean {
    return this.deepEquals(this.value, other.value);
  }

  ["fantasy-land/concat"]<U extends object>(
    other: ObjectSetoid<U>,
  ): ObjectSetoid<T & U> {
    return new ObjectSetoid({ ...this.value, ...other.value });
  }
  protected deepEquals(a: any, b: any): boolean {
    if (a === b) {
      return true;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      return (
        a.length === b.length &&
        a.every((val, index) => this.deepEquals(val, b[index]))
      );
    }

    if (
      typeof a !== "object" ||
      a === null ||
      typeof b !== "object" ||
      b === null
    ) {
      return false;
    }

    let keysA = Object.keys(a),
      keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let key of keysA) {
      if (!keysB.includes(key) || !this.deepEquals(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  get value() {
    return this._value;
  }
}

export class ObjectOrd<T extends object> extends ObjectSetoid<T> {
  ["fantasy-land/lte"]<U extends object>(other: ObjectOrd<U>): boolean {
    const keysA = Object.keys(this.value);
    const keysB = Object.keys(other.value);

    // Compare the number of keys in the objects
    if (keysA.length !== keysB.length) {
      return keysA.length < keysB.length;
    }

    // Compare the keys and values in the objects
    for (let key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(other.value, key)) {
        return true;
      }

      const valueA = this.value[key as keyof T];
      const valueB = other.value[key as keyof U];

      if (typeof valueA === "number" && typeof valueB === "number") {
        if (valueA < valueB) {
          return true;
        }

        if (valueA > valueB) {
          return false;
        }
      }
    }

    // If all keys and values are equal, the objects are equal
    return true;
  }
}
export class ArraySetoid<T> {
  private _value: T[];

  static ["fantasy-land/empty"]() {
    return new ArraySetoid([]);
  }

  constructor(value: T[]) {
    this._value = value;
  }

  ["fantasy-land/equals"]<U>(other: ArraySetoid<U>): boolean {
    return this.deepEquals(this.value, other.value);
  }

  ["fantasy-land/concat"]<U>(other: ArraySetoid<U>): ArraySetoid<T | U> {
    return new ArraySetoid([...this.value, ...other.value]);
  }
  private deepEquals(a: any, b: any): boolean {
    if (a === b) {
      return true;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      return (
        a.length === b.length &&
        a.every((val, index) => this.deepEquals(val, b[index]))
      );
    }

    if (
      typeof a !== "object" ||
      a === null ||
      typeof b !== "object" ||
      b === null
    ) {
      return false;
    }

    let keysA = Object.keys(a),
      keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (let key of keysA) {
      if (!keysB.includes(key) || !this.deepEquals(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  get value() {
    return this._value;
  }
}
export class ArrayOrd<T> extends ArraySetoid<T> {
  ["fantasy-land/lte"]<U>(other: ArrayOrd<U>): boolean {
    // Compare the length of the arrays
    if (this.value.length !== other.value.length) {
      return this.value.length < other.value.length;
    }

    // Compare the elements in the arrays
    for (let i = 0; i < this.value.length; i++) {
      const valueA = this.value[i];
      const valueB = other.value[i];

      if (typeof valueA === "number" && typeof valueB === "number") {
        if (valueA < valueB) {
          return true;
        }

        if (valueA > valueB) {
          return false;
        }
      }
    }

    // If all elements are equal, the arrays are equal
    return true;
  }
}

export class StringSemigroup<T extends string> {
  private _value: T;

  static ["fantasy-land/empty"](): StringSemigroup<string> {
    return new StringSemigroup<string>("");
  }

  constructor(value: T) {
    this._value = value;
  }

  get value(): T {
    return this._value;
  }

  ["fantasy-land/concat"]<U extends string>(
    other: StringSemigroup<U>,
  ): StringSemigroup<string> {
    return new StringSemigroup(this.value + other.value);
  }
  ["fantasy-land/invert"](): StringSemigroup<string> {
    const reversed = this.value.split("").reverse().join("");
    return new StringSemigroup<string>(reversed);
  }
}

export class List<T> {
  constructor(private values: T[]) {}

  ["fantasy-land/filter"](p: (value: T) => boolean): List<T> {
    return new List(this.values.filter(p));
  }
}
