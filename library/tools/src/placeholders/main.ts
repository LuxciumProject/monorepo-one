import { createCustomPlaceholder } from './createCustomPlaceholder';
import {
  createDefaultPlaceholder,
  createPassThroughPlaceholder,
} from './createPassThroughPlaceholder';

type ArgsTuple = [string, number, boolean];

// Correct the function type to ensure proper tuple handling
const placeholderWithTuple: (...args: ArgsTuple) => ArgsTuple | void =
  createCustomPlaceholder('Processing with tuple', true, true);

// Use the result or explicitly declare it as void
const result1: ArgsTuple | void = placeholderWithTuple('arg1', 42, true);
result1 ? console.log(result1) : result1;

// Properly match the types
const typedPlaceholder: (...args: ArgsTuple) => ArgsTuple | void =
  createCustomPlaceholder('Typed placeholder', true, true);

// Use the typed result or explicitly declare it as void
const typedResult: ArgsTuple | void = typedPlaceholder('arg1', 42, true);
typedResult ? console.log(typedResult) : typedResult;

// Example usage:
const placeholder1 = createPassThroughPlaceholder(
  'This is a returning placeholder.'
);
const result2 = placeholder1('arg1', 42, true);
console.log(result2); // ['arg1', 42, true]
const placeholder2 = createDefaultPlaceholder();

placeholder2('arg1', 42, true);
