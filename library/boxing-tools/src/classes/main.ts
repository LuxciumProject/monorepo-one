import { BaseBox } from './BaseBox';
import { IUnbox } from './types/IUnbox';
import { Unbox } from './types/Unbox';

type Nonbox<U> = U extends IUnbox<any> ? never : U;
type NonUnbox<U> = U extends IUnbox<infer Y> ? Y : U;

export type Unboxed<U> = NonUnbox<Unbox<U>>;

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);

  const value: number = 42;
  const fn = (value: number) => value * 2;
  const box: BaseBox<number> = BaseBox.of(value);
  const mappedBox: BaseBox<number> = box.map(fn);
  console.log('value: →', value);
  console.log('fn over value: →', fn(value));
  console.log('box: →', box);
  console.log('mappedBox: →', mappedBox);

  const unboxedMappedBoxValue = mappedBox.unbox();
  console.log('unboxed mappedBox value: →', unboxedMappedBoxValue);
  const boxedValueMappedBoxValue = mappedBox.boxedValue;
  console.log('boxedValue mappedBox value: →', boxedValueMappedBoxValue);

  // again with a nested box
  console.log('AGAIN WITH A NESTED BOX:\n');
  const boxedBox: BaseBox<BaseBox<number>> = BaseBox.of(mappedBox.map(fn));
  console.log('boxedBox: →', boxedBox);
  const boxedBoxValue = boxedBox.boxedValue;
  console.log('boxedBoxValue: →', boxedBoxValue);
  const unboxedBoxValue = boxedBox.unbox();
  console.log('unboxedBoxValue: →', unboxedBoxValue);

  return void 0;
})();

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);

  const value: string = '42';
  const fn1 = (value: string) => value.length * 2;
  const fn2 = (value: number) => value * 2;
  const box = BaseBox.of(value);
  const mappedBox = box.map(fn1);
  const nestedBox = BaseBox.of(mappedBox.map(fn2));
  const xMappedBox = nestedBox.xmap(fn2);

  console.log('value: →', `'${value}'`);
  console.log('fn1 over value: →', fn1(value));
  console.log('box: →', box);
  console.log(
    'xMappedBox_0: →',
    box.xmap(value => value.length)
  );
  console.log('mappedBox: →', mappedBox);
  console.log('nestedBox: →', nestedBox);
  console.log('xMappedBox: →', xMappedBox);

  return void 0;
})();
