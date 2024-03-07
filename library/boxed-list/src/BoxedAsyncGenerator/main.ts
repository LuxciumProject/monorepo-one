import { timeoutZalgo } from '@luxcium/restraining-zalgo';
import { BoxedAsyncGenerator } from './BoxedAsyncGenerator';

void async function main2() {
  const some = BoxedAsyncGenerator.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .mapAwait(i => i * 2, 125)
    .unboxAsyncGen(); // .mapAwait(i => console.log(i))
  for await (const item of some) {
    console.log(item);
  }
  return false;
};

void async function main(): Promise<void> {
  const box = BoxedAsyncGenerator.of([1, 2, 3, 4]);
  const asyncGen1 = box
    .mapAwait<Promise<number>>(item => timeoutZalgo(2000, item * 2))
    .asyncGen();
  const asyncGen2 = box.mapAwait<number>(item => item * 2).asyncGen();

  const asyncGen = BoxedAsyncGenerator.of([1, 2, 3, 4])
    .mapAwait<Promise<number>>(item => timeoutZalgo(2000, item * 2))
    .mapAwait<number>(item => item * 2)
    // .map(item => `${item}`)
    .asyncGen();
  for await (const item of asyncGen) {
    console.log(item);
  }
  for await (const item of asyncGen1) {
    console.log(item);
  }
  for await (const item of asyncGen2) {
    console.log(item);
  }
  return void 42;
};
