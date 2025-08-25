# @luxcium/bigintstring

A TypeScript utility library for converting between binary strings and BigInt values, with support for 64-bit binary representations.

## Overview

This library provides utilities for working with BigInt values and their binary string representations. It specializes in converting 64-bit binary strings to integer strings and handling various BigInt formats.

## Features

- **Binary String Conversion**: Convert 64-bit binary strings to decimal strings
- **BigInt Support**: Direct BigInt to string conversion
- **Format Flexibility**: Handles binary strings with or without '0b' prefix
- **Type Safety**: Full TypeScript support with proper type definitions
- **Input Validation**: Strict validation for binary string format

## Installation

This package is part of the Luxcium monorepo and uses Rush for dependency management.

```bash
# Within the monorepo
cd library/bigintString
rush update
rush build
```

## API Reference

### bigString(str: string | bigint): string

Converts a 64-bit binary string or BigInt to a decimal string representation.

**Parameters:**
- `str` - A binary string (64 characters of "0" or "1") or BigInt value

**Returns:**
- `string` - The decimal representation as a string

**Supported Input Formats:**
- `"1010101010101010..."` - 64-character binary string
- `"0b1010101010101010..."` - Binary string with '0b' prefix
- `BigInt` values - Automatically converted to 64-bit binary

## Usage Examples

```typescript
import { bigString } from '@luxcium/bigintstring';

// Convert 64-bit binary string
const result1 = bigString("1010101010101010101010101010101010101010101010101010101010101010");
console.log(result1); // "12297829382473034410"

// Convert binary string with prefix
const result2 = bigString("0b1010101010101010101010101010101010101010101010101010101010101010");
console.log(result2); // "12297829382473034410"

// Convert BigInt directly
const result3 = bigString(BigInt("12297829382473034410"));
console.log(result3); // "12297829382473034410"

// Using the default export
import bigString from '@luxcium/bigintstring';
const result4 = bigString("1111111111111111111111111111111111111111111111111111111111111111");
console.log(result4); // "18446744073709551615"
```

## Error Handling

The function performs strict validation and will throw an error if:
- The binary string is not exactly 64 characters long
- The string contains characters other than "0" and "1"
- The input format is not recognized

```typescript
try {
  const result = bigString("invalid_input");
} catch (error) {
  console.error(error.message);
  // "Something bad happened! The string was not 64 bit '("0" | "1")' long"
}
```

## Development

```bash
# Build the project
npm run build

# Run tests
npm test

# Run with coverage
npm run coverage
```

## Implementation Details

The function handles several input formats:
1. **66-character strings**: Expects '0b' prefix followed by 64 binary digits
2. **64-character strings**: Pure binary strings without prefix
3. **BigInt values**: Converted to 64-bit binary representation with padding

Internal processing removes underscores and 'n' suffixes commonly used in BigInt literals.

## License

MIT License

### Copyright © 2022-2024 Luxcium (Benjamin Vincent Kasapoglu)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND**, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#### † **Scientia est lux principium✨** ™

##### Copyright © 2022-2024 · LUXCIUM · (Benjamin Vincent Kasapoglu)

---

*Part of the [Luxcium Monorepo](../../README.md)*
