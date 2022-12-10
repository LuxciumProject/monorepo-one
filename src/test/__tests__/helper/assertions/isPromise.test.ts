import { isPromise } from '../../../../helpers/assertions/isPromise';

describe('The assertion function isPromise', () => {
  it('Should be true when having a proper promise', () => {
    expect(isPromise((async () => 'promise')())).toBe(true);
  });
  it('Should be false when having only a then method', () => {
    expect(isPromise({ then() {} })).toBe(false);
  });
  it('Should be false when having no then method', () => {
    expect(isPromise((() => 'promise')())).toBe(false);
  });
  it('Should be false when having only a then property', () => {
    expect(isPromise({ then: {} })).toBe(false);
  });
  it("Should be false when 'then' not in element", () => {
    expect(isPromise({ thus: {} })).toBe(false);
  });
  it('Should be false when element is not an object', () => {
    expect(isPromise('{ thus: {} }')).toBe(false);
  });
  it('Should be false when element is null', () => {
    expect(isPromise(null)).toBe(false);
  });
  it('Should be false when element is undefined', () => {
    expect(isPromise(undefined)).toBe(false);
  });
});
