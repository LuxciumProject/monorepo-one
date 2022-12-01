import {
  awaitedMapping,
  generateMapping,
  generateMappingAsync,
  paralellMapping,
  serialMapping,
} from '../core';
import { listFulfilledResults } from '../helpers/tools';
import { TransformFn } from '../types';

describe('Sanity check Level 2', () => {
  const collection = [
    'Madelynn Hermiston',
    'Jana Yundt Sr.',
    'Clark Rippin',
    'Maurice Wintheiser',
    'Mathilde Bahringer',
  ];

  const transforMapper: TransformFn<string, string> = async (item: string) =>
    item;

  it('Should awaitedMapping on a collection', async () => {
    const mappingResult = awaitedMapping(collection, transforMapper);
    expect(listFulfilledResults(await mappingResult)).toEqual(collection);
  });

  it('Should serialMapping on a collection', async () => {
    const mappingResult = serialMapping(collection, transforMapper);
    expect(listFulfilledResults(await mappingResult)).toEqual(collection);
  });

  it('Should paralellMapping on a collection', async () => {
    const mappingResults = paralellMapping(collection, transforMapper);
    mappingResults.map(async (item, index) =>
      expect((await item).value).toEqual(collection[index])
    );
  });

  it('Should generateMapping on a collection', async () => {
    const mappingResult = generateMapping(collection, transforMapper);
    let index = 0;
    for (const item of mappingResult) {
      expect((await item).value).toBe(collection[index++]);
    }
  });

  it('Should generateMappingAsync on a collection', async () => {
    const mappingResult = generateMappingAsync(collection, transforMapper);
    let index = 0;
    for await (const item of mappingResult) {
      expect(item.value).toBe(collection[index++]);
    }
  });
});
