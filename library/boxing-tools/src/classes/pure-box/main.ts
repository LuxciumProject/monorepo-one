import { Box } from './Box';
// src/classes/pure-box/main.ts

/** Playground demonstrating the `Box` class functionality. */

// Example 1: Encapsulate a simple value
const chocolatesBox = Box.of(42);
console.log('Number of chocolates:', chocolatesBox.unbox());

// Example 2: Transform the value using `map`
const doubleChocolates = chocolatesBox.map((num: number) => num * 2);
console.log('Doubled chocolates:', doubleChocolates.unbox());

// Example 3: Chain transformations using `chain`
const addChocolatesBox = chocolatesBox.chain((num: number) => Box.of(num + 10));
console.log('Added chocolates:', addChocolatesBox.unbox());

// Example 4: Apply a function using `ap`
const addTenFnBox = Box.of((num: number) => num + 10);
const resultAfterAp = chocolatesBox.ap(addTenFnBox);
console.log('Chocolates after `ap`:', resultAfterAp.unbox());

// Example 5: Extend functionality using `extend`
const wrappedChocolates = chocolatesBox.extend((box: Box<number>) => `Chocolates: ${box.unbox()}`);
console.log(wrappedChocolates.unbox());

// Cultural Example 1: Encapsulate a phrase
const phraseBox = Box.of('The Answer to the Ultimate Question of Life');
const extendedPhrase = phraseBox.extend((box: Box<string>) => `${box.unbox()} is ${chocolatesBox.unbox()}`);
console.log(extendedPhrase.unbox());

// Cultural Example 2: Famous movie quote manipulation
const movieQuoteBox = Box.of('May the Force be with you.');
const uppercaseQuote = movieQuoteBox.map((quote: string) => quote.toUpperCase());
console.log('Uppercase Quote:', uppercaseQuote.unbox());

// Example: Combining values using `chain` and `map`
const combinedBox = chocolatesBox.chain((num: number) =>
  phraseBox.map((phrase: string) => `${phrase}: ${num} chocolates`)
);
console.log(combinedBox.unbox());
