import { filterLines, lineFilter, linesFilter } from '../../helpers';
import { list1, list2, list3 } from './test-data.json';

describe('A function to filterLines.', () => {
  it('Should have be a function to filter lines in an array or list.', () => {
    expect(filterLines('Alice')(list1).flat()).toStrictEqual(list2);
  });

  it('should have a function to linesFilter', () => {
    expect(linesFilter('Eve')(list2)).toStrictEqual(list3);
  });
});

describe('A function to lineFilter.', () => {
  it('Should have a truthy result.', () => {
    expect(lineFilter('Bob')('Bob your uncle')).toBeTruthy();
  });

  it('Should have a falsy result.', () => {
    expect(lineFilter('Bob')('Alice your aunt')).toBeFalsy();
  });
});
