import { isPromise } from '../../../helpers/assertions';

describe('Assertion tool isPromise', () => {
  it('Should return true on a literal async function', () => {
    expect(isPromise((async () => 'promise')())).toBe(true);
  });

  it('Should return false on a thenable object', () => {
    expect(isPromise({ then() {} })).toBe(false);
  });
  it('Should return false on a literal function', () => {
    expect(isPromise((() => 'promise')())).toBe(false);
  });
});
