import { isPromise } from '../../../helpers/assertions';

describe('Assertion tool isPromise', () => {
  it('Should return true on a literal async function', done => {
    expect(isPromise(1)).toBe(false);
    expect(isPromise((async () => 'promise')())).toBe(true);
    done();
  });

  it('Should return false on a thenable object', done => {
    expect(isPromise({ then() {} })).toBe(false);
    done();
  });
  it('Should return false on a literal function', done => {
    expect(isPromise((() => 'promise')())).toBe(false);
    done();
  });
});

describe('Assertion tool isPromise', () => {
  it('Should return true for Promise-like objects', done => {
    expect(isPromise((async () => 'promise')())).toBe(true);
    expect(isPromise({ then: () => {} })).toBe(false);
    expect(isPromise({ then() {} })).toBe(false);
    expect(isPromise(Promise.resolve(1))).toBe(true);
    done();
  });

  it('Should handle null and undefined values correctly', done => {
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
    done();
  });
  it('Should handle empty argument despide being useless.', done => {
    expect(isPromise()).toBe(false);
    done();
  });
});

//  * isPromise(1) // false
//  * isPromise({ then: () => {} }) // false
//  * isPromise({ then: 1 }) // false
