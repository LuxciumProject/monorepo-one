import { isPromiseLike } from '../../../../helpers/assertions/isPromiseLike';

describe('The assertion function isPromiseLike', () => {
  it('Should be true when having a proper promise', done => {
    expect(isPromiseLike((async () => 'promise')())).toBe(true);
    done();
  });
  it('Should be true when having only a then method', done => {
    expect(isPromiseLike({ then() {} })).toBe(true);
    done();
  });
  it('Should be false when having no then method', done => {
    expect(isPromiseLike((() => 'promise')())).toBe(false);
    done();
  });
  it('Should be false when having only a then property', done => {
    expect(isPromiseLike({ then: {} })).toBe(false);
    done();
  });
  it("Should be false when 'then' not in element", done => {
    expect(isPromiseLike({ thus: {} })).toBe(false);
    done();
  });
  it('Should be false when element is not an object', done => {
    expect(isPromiseLike('{ thus: {} }')).toBe(false);
    done();
  });
  it('Should be false when element is null', done => {
    expect(isPromiseLike(null)).toBe(false);
    done();
  });
  it('Should be false when element is undefined', done => {
    expect(isPromiseLike(undefined)).toBe(false);
    done();
  });
});
