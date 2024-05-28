import { Unboxable } from '../../types';

export abstract class ProtoBox<T> implements Unboxable<T> {
  private readonly _value: T;

  protected constructor(value: T) {
    this._value = value;
  }
  public ['fantasy-land/extract'] = this.unbox;
  public unbox(): T {
    return this._value;
  }
  get value(): T {
    return this._value;
  }
}

void async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);

  const valeure = <T>(value: T): T => value;
  const _valeure = (value: string) => value[2];

  // _valeure("test");

  console.log('s!');
  function test() {
    console.log('test');
  }

  test();
  return void [valeure, _valeure];
}; //();
