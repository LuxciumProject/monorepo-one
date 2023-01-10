import { Chain } from '../../../classes/chain';

describe('Class Chain', () => {
  it('Should have a static function of', async () => {
    const chain = Chain.of([{ item: 10 }]);

    expect(chain).toBeInstanceOf(Chain);
  });
  it('Should have a method `generateMapping`', async () => {
    const chain = Chain.of([{ item: 10 }]);

    const mappingChain = chain.generateMapping(
      async value => value.item * 2 // transform function
      // async value => value.item % 2 === 0, // lookup function
      // async value => value.item >= 0, // validate function
      // async value => `Invalid item: ${value.item}` // error lookup function
    );

    expect(mappingChain).toBeInstanceOf(Chain);
    // add additional assertions to check the result of the generateMapping method
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
});
