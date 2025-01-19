import { Box } from './Box';

/** Test suite for the `Box` class. */

describe('Box class', () => {
  it('should encapsulate a value using `of`', () => {
    const box = Box.of(42);
    expect(box.unbox()).toBe(42);
  });

  it('should transform the value using `map`', () => {
    const box = Box.of(42);
    const result = box.map(num => num * 2);
    expect(result.unbox()).toBe(84);
  });

  it('should chain transformations using `chain`', () => {
    const box = Box.of(42);
    const result = box.chain(num => Box.of(num + 10));
    expect(result.unbox()).toBe(52);
  });

  it('should apply a function using `ap`', () => {
    const box = Box.of(42);
    const functionBox = Box.of((num: number) => num + 10);
    const result = box.ap(functionBox);
    expect(result.unbox()).toBe(52);
  });

  it('should extend functionality using `extend`', () => {
    const box = Box.of(42);
    const result = box.extend(b => `Chocolates: ${b.unbox()}`);
    expect(result.unbox()).toBe('Chocolates: 42');
  });

  it('should allow chaining with string values', () => {
    const phraseBox = Box.of('The Answer to the Ultimate Question of Life');
    const chocolatesBox = Box.of(42);
    const result = phraseBox.extend(box => `${box.unbox()} is ${chocolatesBox.unbox()}`);
    expect(result.unbox()).toBe('The Answer to the Ultimate Question of Life is 42');
  });

  it('should transform a string to uppercase using `map`', () => {
    const quoteBox = Box.of('May the Force be with you.');
    const result = quoteBox.map(quote => quote.toUpperCase());
    expect(result.unbox()).toBe('MAY THE FORCE BE WITH YOU.');
  });

  it('should combine values using `chain` and `map`', () => {
    const chocolatesBox = Box.of(42);
    const phraseBox = Box.of('The Answer to the Ultimate Question of Life');
    const result = chocolatesBox.chain(num => phraseBox.map(phrase => `${phrase}: ${num} chocolates`));
    expect(result.unbox()).toBe('The Answer to the Ultimate Question of Life: 42 chocolates');
  });
});
