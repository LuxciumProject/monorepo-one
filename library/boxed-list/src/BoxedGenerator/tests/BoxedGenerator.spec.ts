import { BoxedList } from '../../BoxedList';
import { BoxedGenerator } from '../BoxedGenerator';

export {};
describe('TODO:', () => {
  test('asyncSpark method ', async () => {
    //
    const expected = await BoxedGenerator.of('XYZ').asyncSpark();
    expect(expected.unbox()).toStrictEqual(['XYZ']);
  });
  test('asyncUnbox method ', async () => {
    //
    const expected = BoxedGenerator.of('XYZ').asyncUnbox();
    expect(await expected).toStrictEqual(['XYZ']);
  });
  test('awaitedMap method ', async () => {
    //
    const expected = BoxedGenerator.of('XYZ')
      .awaitedMap(async i => i)
      .unbox();
    expect(await expected[0]).toStrictEqual('XYZ');
  });

  test('boxedList method ', () => {
    //
    const expected = BoxedGenerator.of('XYZ').boxedList;
    expect(expected instanceof BoxedList).toBeTruthy();
  });
  // test('catchMap method ', () => {
  //   //
  //   const expected = BoxedGenerator.of('XYZ').catchMap();
  //   expect(expected).toStrictEqual('XYZ');
  // });
  test('finallyMap method ', async () => {
    //
    const expected = BoxedGenerator.of('XYZ').finallyMap(() => void '');
    expect(await expected.boxedList.unbox()[0]).toBe('XYZ');
  });
  test('gen method ', () => {
    //
    const expected = BoxedGenerator.of('XYZ').gen();
    expect(
      !!expected.next && !!expected.return && !!expected.throw
    ).toBeTruthy();
  });
  test('keys method ', () => {
    //
    const expected = BoxedGenerator.of('XYZ').keys();
    expect(expected.next()).toStrictEqual({ done: false, value: 0 });
    expect(expected.next()).toStrictEqual({ done: true, value: undefined });
  });
  test('values method ', () => {
    //
    const expected = BoxedGenerator.of('XYZ').values();
    expect(expected.next()).toStrictEqual({ done: false, value: 'XYZ' });
    expect(expected.next()).toStrictEqual({ done: true, value: undefined });
  });
  test('list method ', () => {
    //
    const expected = BoxedGenerator.of('XYZ').list;
    expect(expected).toStrictEqual(['XYZ']);
  });
  test('map method ', () => {
    //
    const expected = BoxedGenerator.of('XYZ').map(i => i);
    expect(expected.unbox()).toStrictEqual(['XYZ']);
  });

  test('spark method ', () => {
    //
    const expected = BoxedGenerator.of('XYZ').spark();
    expect(expected.unbox()).toStrictEqual(['XYZ']);
  });
  test('thenMap method ', async () => {
    //
    const expected = BoxedGenerator.of('XYZ').thenMap(i => i);
    expect(await expected.unbox()[0]).toBe('XYZ');
  });
  test('unbox method ', () => {
    //
    const expected = BoxedGenerator.of('XYZ').unbox();
    expect(expected).toStrictEqual(['XYZ']);
  });
});

describe('Static Methods and type inference', () => {
  test('from method takes (IUnboxList<TVal> | IUnbox<TVal[]>)[]', () => {
    //
    const expected = BoxedGenerator.from(BoxedList.of('XYZ'));
    expect(expected.unbox()).toStrictEqual(['XYZ']);
  });
  test('of method ', () => {
    //
    const expected = BoxedGenerator.of('XYZ');
    expect(expected.unbox()).toStrictEqual(['XYZ']);
  });
});
// BoxedGenerator.of('XYZ').asyncSpark;
// BoxedGenerator.of('XYZ').asyncUnbox;
// BoxedGenerator.of('XYZ').awaitedMap;
// BoxedGenerator.of('XYZ').boxedList;
// BoxedGenerator.of('XYZ').catchMap;
// BoxedGenerator.of('XYZ').finallyMap;
// BoxedGenerator.of('XYZ').gen;
// BoxedGenerator.of('XYZ').keys;
// BoxedGenerator.of('XYZ').list;
// BoxedGenerator.of('XYZ').map;
// BoxedGenerator.of('XYZ').spark;
// BoxedGenerator.of('XYZ').thenMap;
// BoxedGenerator.of('XYZ').unbox;
// BoxedGenerator.of('XYZ').values;

/*

  public static of<TVal>(...values: TVal[] | [TVal[]]): BoxedGenerator<TVal> {
  public static of2<TVal>(...values: TVal[] | [TVal[]]): BoxedGenerator<TVal> {
  public static fromGen<TVal>(
  public static from<TVal>(
  public mapIndex: number = 0;
  public map<TMap>(
  public awaitedMapIndex: number = 0;
  public awaitedMap<TMap>(
  public thenMap<TMap1, TMap2 = never>(
  public catchMap<TMap2 = never>(
  public finallyMap(
  public unbox<R_unsafe = T>(): R_unsafe[] {
  public async asyncUnbox(): Promise<T[]> {
  public spark() {
  public async asyncSpark() {
  public keys(): IterableIterator<number> {
  public values(): IterableIterator<T> {
  public *[Symbol.iterator](): Generator<T, void, undefined> {
  public get boxedList(): BoxedList<T> {
  public get list() {
  public get gen(): () => Generator<T> {
  public static of<TVal>(...values: TVal[] | [TVal[]]): PseudoCode<TVal> {
  public value: T[];


  BoxedGenerator.of<TVal>(...values: TVal[] | [TVal[]]): BoxedGenerator<TVal> {
  BoxedGenerator.of2<TVal>(...values: TVal[] | [TVal[]]): BoxedGenerator<TVal> {
  BoxedGenerator.fromGen<TVal>(
  BoxedGenerator.from<TVal>(
  BoxedGenerator.mapIndex;
  BoxedGenerator.map;
  BoxedGenerator.awaitedMapIndex;
  BoxedGenerator.awaitedMap;
  BoxedGenerator.thenMap;
  BoxedGenerator.catchMap;
  BoxedGenerator.finallyMap;
  BoxedGenerator.unbox;
  BoxedGenerator.async;
  BoxedGenerator.spark;
  BoxedGenerator.async;
  BoxedGenerator.keys;
  BoxedGenerator.values;
  BoxedGenerator.*;
  BoxedGenerator.boxedList(): BoxedList<T> {
  BoxedGenerator.list() {
  BoxedGenerator.gen(): () => Generator<T> {
  BoxedGenerator.of;
  BoxedGenerator.value;

 */
