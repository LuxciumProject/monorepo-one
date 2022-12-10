import { isPromiseLike } from '../../../../helpers/assertions/isPromiseLike';

describe('The assertion function isPromiseLike', () => {
  it('Should be true when having a proper promise', () => {
    expect(isPromiseLike((async () => 'promise')())).toBe(true);
  });
  it('Should be true when having only a then method', () => {
    expect(isPromiseLike({ then() {} })).toBe(true);
  });
  it('Should be false when having no then method', () => {
    expect(isPromiseLike((() => 'promise')())).toBe(false);
  });
  it('Should be false when having only a then property', () => {
    expect(isPromiseLike({ then: {} })).toBe(false);
  });
  it("Should be false when 'then' not in element", () => {
    expect(isPromiseLike({ thus: {} })).toBe(false);
  });
  it('Should be false when element is not an object', () => {
    expect(isPromiseLike('{ thus: {} }')).toBe(false);
  });
  it('Should be false when element is null', () => {
    expect(isPromiseLike(null)).toBe(false);
  });
  it('Should be false when element is undefined', () => {
    expect(isPromiseLike(undefined)).toBe(false);
  });
});
