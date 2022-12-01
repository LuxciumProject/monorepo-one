import { awaitedMapping_α } from '../backup/awaitedMapping_α';
import { listFulfilledResults } from '../helpers/tools';
import { Mapper } from '../types';

describe('awaitedMapping_α test', () => {
  const collection = [
    'Madelynn Hermiston',
    'Jana Yundt Sr.',
    'Clark Rippin',
    'Maurice Wintheiser',
    'Mathilde Bahringer',
  ];

  const transforMapper: Mapper<string, Promise<string>> = async (
    item: string
  ) => item;

  it('Should map on a colletion', async () => {
    expect(
      listFulfilledResults(await awaitedMapping_α(collection, transforMapper))
    ).toEqual(collection);
  });
});
