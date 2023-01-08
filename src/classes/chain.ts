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
  TransformFn,
  ValidateFn,
} from '../types';

export class Chain<B> {
  collection: Collection<B> | PromiseLike<Collection<B>>;
  _list: Promise<BaseOrDeferred<B>[]>;

  static of<BType>(
    collection: Collection<BType> | PromiseLike<Collection<BType>>
  ): Chain<BType> {
    return new Chain<BType>(collection);
  }

  private constructor(collection: Collection<B> | PromiseLike<Collection<B>>) {
    this.collection = collection;
    this._list = (async function () {
      return [...(await collection)];
    })();
  }
  public generateMapping<R>(
    transformFn: null | TransformFn<B, R> = async value => value as any as R,
    lookupFn: null | LookupFn<B, R> = v => void v,
    validateFn: null | ValidateFn<B, R> = async v => void v,
    errLookupFn: null | ErrLookupFn = v => void v
  ) {
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
    transformFn: null | TransformFn<B, R> = async value => value as any as R,
    lookupFn: null | LookupFn<B, R> = v => void v,
    validateFn: null | ValidateFn<B, R> = async v => void v,
    errLookupFn: null | ErrLookupFn = v => void v
  ) {
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
    transformFn: null | TransformFn<B, R> = async value => value as any as R,
    lookupFn: null | LookupFn<B, R> = v => void v,
    validateFn: null | ValidateFn<B, R> = async v => void v,
    errLookupFn: null | ErrLookupFn = v => void v
  ) {
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
    transformFn: null | TransformFn<B, R> = async value => value as any as R,
    lookupFn: null | LookupFn<B, R> = v => void v,
    validateFn: null | ValidateFn<B, R> = async v => void v,
    errLookupFn: null | ErrLookupFn = v => void v
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
    transformFn: null | TransformFn<B, R> = async value => value as any as R,
    lookupFn: null | LookupFn<B, R> = v => void v,
    validateFn: null | ValidateFn<B, R> = async v => void v,
    errLookupFn: null | ErrLookupFn = v => void v
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

  public async filterRight() {
    const list = [...(await this.collection)];
    if (list.every((item): item is Settled<B> => isSettled(item))) {
      return filterRight(list);
    } else {
      return filterRight(await awaitedMapping(list));
    }
  }
  public async filterLeft() {
    const list = [...(await this.collection)];
    if (list.every((item): item is Settled<B> => isSettled(item))) {
      return filterLeft(list);
    } else {
      return filterLeft(await awaitedMapping(list));
    }
  }
  public async extractFulfilledValues() {
    extractFulfilledValues(await awaitedMapping(this._list));
  }
  public async extractSettledValues() {
    extractSettledValues(await awaitedMapping(this._list));
  }
}
