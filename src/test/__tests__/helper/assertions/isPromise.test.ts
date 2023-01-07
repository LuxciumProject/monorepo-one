import { isPromise } from '../../../../helpers/assertions/isPromise';

describe('The assertion function isPromise', () => {
  it('Should be true when having a proper promise', done => {
    expect(isPromise((async () => 'promise')())).toBe(true);
    done();
  });
  it('Should be false when having only a then method', done => {
    expect(isPromise({ then() {} })).toBe(false);
    done();
  });
  it('Should be false when having no then method', done => {
    expect(isPromise((() => 'promise')())).toBe(false);
    done();
  });
  it('Should be false when having only a then property', done => {
    expect(isPromise({ then: {} })).toBe(false);
    done();
  });
  it("Should be false when 'then' not in element", done => {
    expect(isPromise({ thus: {} })).toBe(false);
    done();
  });
  it('Should be false when element is not an object', done => {
    expect(isPromise('{ thus: {} }')).toBe(false);
    done();
  });
  it('Should be false when element is null', done => {
    expect(isPromise(null)).toBe(false);
    done();
  });
  it('Should be false when element is undefined', done => {
    expect(isPromise(undefined)).toBe(false);
    done();
  });
});
