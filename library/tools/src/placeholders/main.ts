import { createCustomPlaceholder } from './createCustomPlaceholder';

type ArgsTuple = [string, number, boolean];

// Correct the function type to ensure proper tuple handling
const placeholderWithTuple: (...args: ArgsTuple) => ArgsTuple | void =
  createCustomPlaceholder('Processing with tuple', true, true);

// Use the result or explicitly declare it as void
const result: ArgsTuple | void = placeholderWithTuple('arg1', 42, true);
result ? console.log(result) : result;

// Properly match the types
const typedPlaceholder: (...args: ArgsTuple) => ArgsTuple | void =
  createCustomPlaceholder('Typed placeholder', true, true);

// Use the typed result or explicitly declare it as void
const typedResult: ArgsTuple | void = typedPlaceholder('arg1', 42, true);
typedResult ? console.log(typedResult) : typedResult;
