# @luxcium/restraining-zalgo

A TypeScript library for preventing "Zalgo" behavior in asynchronous operations, ensuring consistent execution patterns.

## Overview

This library provides utilities to "restrain Zalgo" - a concept from Node.js development referring to the unpredictable behavior that occurs when functions are sometimes synchronous and sometimes asynchronous. The library ensures consistent asynchronous behavior by providing controlled execution patterns.

**Reference**: [Designing APIs for Asynchrony](https://blog.izs.me/2013/08/designing-apis-for-asynchrony) by Isaac Z. Schlueter

## Features

- **Consistent Asynchronous Execution**: Prevent mixed sync/async behavior
- **Multiple Execution Strategies**: Support for different async patterns
- **TypeScript Support**: Full type definitions included
- **Zero Dependencies**: Lightweight implementation

## Installation

This package is part of the Luxcium monorepo and uses Rush for dependency management.

```bash
# Within the monorepo
cd library/restraining-zalgo
rush update
rush build
```

## API Reference

### Main Exports

```typescript
import {
  zalgo,
  zalgo1,
  zalgo2,
  zalgo3,
  immediateZalgo,
  nextTickZalgo,
  restrainingZalgo,
  timeoutZalgo
} from '@luxcium/restraining-zalgo';
```

### restrainingZalgo

The main utility object providing different async execution strategies:

```typescript
const restrainingZalgo = {
  immediate: async () => immediateZalgo(void 15),
  timeout: async () => timeoutZalgo(0, void 15),
  nextTick: async () => nextTickZalgo(),
};
```

### Individual Functions

- **`immediateZalgo`**: Execute using `setImmediate`
- **`nextTickZalgo`**: Execute using `process.nextTick`
- **`timeoutZalgo`**: Execute using `setTimeout`
- **`zalgo`, `zalgo1`, `zalgo2`, `zalgo3`**: Different Zalgo implementation variants

## Usage Examples

```typescript
import { restrainingZalgo } from '@luxcium/restraining-zalgo';

// Ensure async execution with different strategies
await restrainingZalgo.immediate();
await restrainingZalgo.timeout();
await restrainingZalgo.nextTick();
```

## Development

```bash
# Build the project
npm run build

# Run tests
npm test

# Install and build
npm run install
```

## The Problem: Zalgo

"Zalgo" refers to functions that are sometimes synchronous and sometimes asynchronous, leading to:

- Unpredictable execution order
- Race conditions
- Difficult-to-debug behavior
- Inconsistent API behavior

This library helps ensure your async operations are always truly asynchronous.

## License

MIT License

### Copyright (c) 2021-2024 Benjamin Vincent Kasapoglu (Luxcium)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

*Part of the [Luxcium Monorepo](../../README.md)*
