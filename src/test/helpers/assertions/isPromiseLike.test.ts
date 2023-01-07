import { isPromiseLike } from '../../../helpers/assertions';

describe('isPromiseLike', () => {
  it('Should return false for non-Promise-like values', done => {
    expect(isPromiseLike('foo')).toBe(false);
    expect(isPromiseLike((() => 'promise')())).toBe(false);
    expect(isPromiseLike({ then: 1 })).toBe(false);
    expect(isPromiseLike(1)).toBe(false);
    expect(isPromiseLike(false)).toBe(false);
    done();
  });

  it('Should return true for Promise-like objects', done => {
    expect(isPromiseLike((async () => 'promise')())).toBe(true);
    expect(isPromiseLike({ then: () => {} })).toBe(true);
    expect(isPromiseLike({ then() {} })).toBe(true);
    expect(isPromiseLike(Promise.resolve(1))).toBe(true);
    done();
  });

  it('Should handle null and undefined values correctly', done => {
    expect(isPromiseLike(null)).toBe(false);
    expect(isPromiseLike(undefined)).toBe(false);
    done();
  });
  it('Should handle empty argument despide being useless.', done => {
    expect(isPromiseLike()).toBe(false);
    done();
  });
});
