import { awaitedMapping, serialMapping } from '../../../functions';
import { Chain } from '../../../index';

describe('Class Chain', () => {
  it('Should have a static function of', async () => {
    const chain = Chain.of([{ item: 10 }]);

    expect(chain).toBeInstanceOf(Chain);
  });
  it('Should have a method `generateMapping`', async () => {
    const chain = Chain.of([{ item: 10 }]);

    const mappingChain = chain.generateMapping(
      async value => ({ item: value.item * 2 }), // transform function
      value => void (value.item % 2 === 0), // lookup function
      async value => void (value.item >= 0), // validate function
      value => void `Invalid item: ${value.item}` // error lookup function
    );

    const fulfilledValues = await mappingChain.extractFulfilledValues();

    expect(mappingChain).toBeInstanceOf(Chain);
    expect(fulfilledValues).toStrictEqual([{ item: 20 }]);
  });
  it('Should have a method `awaitedMapping`', async () => {
    const chain = Chain.of([{ item: 10 }]);

    const mappingChain = chain.awaitedMapping(
      async value => ({ item: value.item * 2 }), // transform function
      value => void (value.item % 2 === 0), // lookup function
      async value => void (value.item >= 0), // validate function
      value => void `Invalid item: ${value.item}` // error lookup function
    );

    expect(mappingChain).toBeInstanceOf(Chain);

    const fulfilledValues = await mappingChain.extractFulfilledValues();

    expect(fulfilledValues).toStrictEqual([{ item: 20 }]);
  });
  it('Should have a method `generateMappingAsync`', async () => {
    const chain = Chain.of([{ item: 10 }]);

    const mappingChain = chain.generateMappingAsync(
      async value => ({ item: value.item * 2 }), // transform function
      value => void (value.item % 2 === 0), // lookup function
      async value => void (value.item >= 0), // validate function
      value => void `Invalid item: ${value.item}` // error lookup function
    );

    expect(mappingChain).toBeInstanceOf(Chain);

    const fulfilledValues = await mappingChain.extractFulfilledValues();

    expect(fulfilledValues).toStrictEqual([{ item: 20 }]);
  });
  it('Should have a method `serialMapping`', async () => {
    const chain = Chain.of([{ item: 10 }]);

    const mappingChain = chain.serialMapping(
      async value => ({ item: value.item * 2 }), // transform function
      value => void (value.item % 2 === 0), // lookup function
      async value => void (value.item >= 0), // validate function
      value => void `Invalid item: ${value.item}` // error lookup function
    );

    expect(mappingChain).toBeInstanceOf(Chain);

    const fulfilledValues = await mappingChain.extractFulfilledValues();

    expect(fulfilledValues).toStrictEqual([{ item: 20 }]);
  });
  it('Should have a method `parallelMapping`', async () => {
    const chain = Chain.of([{ item: 10 }]);

    const mappingChain = chain.parallelMapping(
      async value => ({ item: value.item * 2 }), // transform function
      value => void (value.item % 2 === 0), // lookup function
      async value => void (value.item >= 0), // validate function
      value => void `Invalid item: ${value.item}` // error lookup function
    );

    expect(mappingChain).toBeInstanceOf(Chain);

    const fulfilledValues = await mappingChain.extractFulfilledValues();

    expect(fulfilledValues).toStrictEqual([{ item: 20 }]);
  });
  it('Should have a method `extractFulfilledValues`', async () => {
    const chain = Chain.of([
      { item: 10 },
      { item: 20 },
      { item: 30 },
      { item: 40 },
    ]);

    const fulfilledValues = await chain.extractFulfilledValues();

    expect(fulfilledValues).toStrictEqual([
      { item: 10 },
      { item: 20 },
      { item: 30 },
      { item: 40 },
    ]);
  });
  it('Should have a method `extractSettledValues`', async () => {
    const chain = Chain.of([
      { item: 10 },
      { item: 20 },
      { item: 30 },
      { item: 40 },
    ]);

    const fulfilledValues = await chain.extractSettledValues();

    expect(fulfilledValues).toStrictEqual([
      { item: 10 },
      { item: 20 },
      { item: 30 },
      { item: 40 },
    ]);
  });
  it('Should have a method `filterRight`', async () => {
    const chain = Chain.of([
      Promise.resolve({ item: 10 }),
      Promise.resolve({ item: 20 }),
      // Promise.reject(new Error('Invalid item: 30'))
    ]);

    const filteredRightChain = await chain.filterRight();

    expect(filteredRightChain).toEqual([
      {
        status: 'fulfilled',
        value: {
          item: 10,
        },
        index: 0,
        transformStep: 1,
      },
      {
        status: 'fulfilled',
        value: {
          item: 20,
        },
        index: 1,
        transformStep: 1,
      },
    ]);
  });
  it('Should have a method `filterRight`', async () => {
    const awaitedMappingResut = awaitedMapping([
      Promise.resolve({ item: 10 }),
      Promise.resolve({ item: 20 }),
    ]);

    const chain = Chain.of(awaitedMappingResut);

    const filteredRightChain = await chain.filterRight();

    expect(filteredRightChain).toEqual([
      {
        status: 'fulfilled',
        value: {
          item: 10,
        },
        index: 0,
        transformStep: 1,
      },
      {
        status: 'fulfilled',
        value: {
          item: 20,
        },
        index: 1,
        transformStep: 1,
      },
    ]);
  });

  it('Should have a getter method `list`', async () => {
    const collection = [{ item: 10 }, { item: 20 }];
    const chain = Chain.of(collection);

    const list = await chain.list;
    expect(list).toStrictEqual(collection);
  });
  it('Should have a method `filterLeft`', async () => {
    const chain = Chain.of([
      Promise.resolve({ item: 10 }),
      Promise.resolve({ item: 20 }),
      Promise.resolve({ item: 30 }),
    ]);

    const filteredLeftChain = await chain
      .serialMapping(
        v => v,
        null,
        async value => {
          if (value.item % 20 === 0) {
            throw new Error('Test error');
          }
        }
      )
      .filterLeft();

    expect(filteredLeftChain).toEqual([
      {
        currentRejection: true,
        index: 1,
        reason: new Error('Test error'),
        status: 'rejected',
        transformStep: 0,
      },
    ]);
  });
  it('Should `filterLeft` to an empty array from a Settled<any> with no rejections', async () => {
    const chain = Chain.of([1, 2, 3, 4]);

    const filteredLeftChain = await chain.filterLeft();

    expect(filteredLeftChain).toEqual([]);
  });

  it('Should `filterLeft` to an array from a Settled<any> with the rejections', async () => {
    const collection = [1, 2, 3, 4];
    const series = serialMapping(
      collection,
      async v => v,
      null,
      async value => {
        if (value % 2 === 0) {
          throw new Error('Test error');
        }
      }
    );
    const chain = Chain.of(series);

    const filteredLeftChain = await chain.filterLeft();

    expect(filteredLeftChain).toEqual([
      {
        currentRejection: true,
        index: 1,
        reason: new Error('Test error'),
        status: 'rejected',
        transformStep: 0,
      },
      {
        currentRejection: true,
        index: 3,
        reason: new Error('Test error'),
        status: 'rejected',
        transformStep: 0,
      },
    ]);
  });
});
