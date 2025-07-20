import { isPromise, isPromiseLike } from './isPromise';

describe('isPromiseLike', () => {
  it('should return true for a promise-like object', () => {
    const promiseLike = { then: () => {} };
    expect(isPromiseLike(promiseLike)).toBe(true);
  });

  it('should return false for a non-promise-like object', () => {
    const notPromiseLike = { notThen: () => {} };
    expect(isPromiseLike(notPromiseLike)).toBe(false);
  });

  it('should return false for null or undefined', () => {
    expect(isPromiseLike(null)).toBe(false);
    expect(isPromiseLike(undefined)).toBe(false);
  });
});

describe('isPromise', () => {
  it('should return true for a real Promise', () => {
    const promise = new Promise(resolve => resolve(true));
    expect(isPromise(promise)).toBe(true);
  });

  it('should return false for a promise-like object that is not a real Promise', () => {
    const promiseLike = { then: () => {} };
    expect(isPromise(promiseLike)).toBe(false);
  });

  it('should return false for non-promise-like objects', () => {
    const notPromiseLike = { notThen: () => {} };
    expect(isPromise(notPromiseLike)).toBe(false);
  });

  it('should return false for null or undefined', () => {
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
  });
});
