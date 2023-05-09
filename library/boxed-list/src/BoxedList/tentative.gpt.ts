class Box<T> {
  #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  public static of<TVal>(value: TVal): Box<TVal> {
    return new Box(value);
  }

  public map<R>(fn: (value: T, index: number) => R): Box<R> {
    return Box.of(fn(this.#value, -1));
  }

  public unbox(): T {
    return this.#value;
  }
}

class BoxedList<$> extends Box<$[]> {
  constructor(value: $[]) {
    super(value);
  }

  public static override of<XVal>(...values: XVal[]): BoxedList<XVal> {
    return new BoxedList(values);
  }

  public override map<R>(fn: (value: $, index: number) => R): BoxedList<R> {
    const newValue: R[] = this.unbox().map(fn);
    return BoxedList.of(...newValue);
  }
}

const box = Box.of(42);
const mappedBox = box.map(x => x * 2);

const boxedList = BoxedList.of(1, 2, 3);
const mappedBoxedList = boxedList.map(x => x * 2);

console.log(mappedBox.unbox());
console.log(mappedBoxedList.unbox());
