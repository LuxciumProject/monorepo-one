// @ts-nocheck

import { MyBox, Reconstruct, Unwrap } from './play';
import { IMap } from './types/IMap';

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

  xmap<Rx>(fn: (value: Unwrap<T>) => Rx): MyBox<Reconstruct<T, Rx>> {
    const unwrappedValue = this.unwrap();
    const transformedValue = fn(unwrappedValue);
    return MyBox.reconstruct(transformedValue, 1) as MyBox<Reconstruct<T, Rx>>;
  }
}
