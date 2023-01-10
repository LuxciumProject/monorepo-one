import {
  awaitedMapping,
  generateMapping,
  generateMappingAsync,
  parallelMapping,
  serialMapping,
} from '../functions';
import { isSettled } from '../helpers/assertions';
import {
  extractFulfilledValues,
  extractSettledValues,
  filterLeft,
  filterRight,
} from '../helpers/tools';
import {
  BaseOrDeferred,
  Collection,
  ErrLookupFn,
  LookupFn,
  Settled,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '../types';

/**
 * UNSAFE: Name of the class will change in future release
 * @alpha
 */
export class Chain<B> {
  private collection: Collection<B> | PromiseLike<Collection<B>>;
  private _list: Promise<BaseOrDeferred<B>[]>;

  get list(): Promise<BaseOrDeferred<B>[]> {
    return this._list;
  }
  static of<BType>(
    collection: Collection<BType> | PromiseLike<Collection<BType>>
  ): Chain<BType> {
    return new Chain<BType>(collection);
  }

  private constructor(collection: Collection<B> | PromiseLike<Collection<B>>) {
    this.collection = collection;
    const _list = (async function () {
      return [...(await collection)];
    })();
    this._list = _list;

    Object.defineProperty(this, '_list', {
      value: _list,
      enumerable: false,
      writable: false,
    });

    return this;
  }
  public generateMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<Promise<Settled<R>>> {
    const result = (async () =>
      generateMapping(
        await this.collection,
        transformFn,
        lookupFn,
        validateFn,
        errLookupFn
      ))();

    return new Chain(result);
  }

  generateMappingAsync<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R> {
    const result = (async () => {
      const asyncGenerator = generateMappingAsync(
        await this.collection,
        transformFn,
        lookupFn,
        validateFn,
        errLookupFn
      );
      const arr = [];
      for await (const entry of asyncGenerator) {
        arr.push(entry);
      }
      return arr;
    })();

    return new Chain(result);
  }

  public serialMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R> {
    const result = serialMapping(
      this.collection,
      transformFn,
      lookupFn,
      validateFn,
      errLookupFn
    );
    return new Chain(result);
  }
  public awaitedMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R> {
    const result = awaitedMapping(
      this.collection,
      transformFn,
      lookupFn,
      validateFn,
      errLookupFn
    );
    return new Chain<R>(result);
  }
  public parallelMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<Promise<Settled<R>>> {
    const result = (async (): Promise<Promise<Settled<R>>[]> =>
      parallelMapping(
        await this.collection,
        transformFn,
        lookupFn,
        validateFn,
        errLookupFn
      ))();

    return new Chain<Promise<Settled<R>>>(result);
  }

  public async filterRight(): Promise<SettledRight<B>[]> {
    const list = [...(await this.collection)];
    if (list.every((item): item is Settled<B> => isSettled(item))) {
      return filterRight<B>(list);
    } else {
      return filterRight<B>(await awaitedMapping(list));
    }
  }
  public async filterLeft(): Promise<SettledLeft[]> {
    const list = [...(await this.collection)];
    if (list.every((item): item is Settled<B> => isSettled(item))) {
      return filterLeft(list);
    } else {
      return filterLeft(await awaitedMapping(list));
    }
  }
  public async extractFulfilledValues(): Promise<B[]> {
    return extractFulfilledValues<B>(await awaitedMapping(this._list));
  }
  public async extractSettledValues() {
    return extractSettledValues<B>(await awaitedMapping(this._list));
  }
}
