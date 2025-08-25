# @luxcium/boxed-list

A comprehensive TypeScript library providing functional programming utilities with Box, BoxedList, and Generator patterns for elegant data manipulation and asynchronous operations.

## Overview

This library implements functional programming patterns in TypeScript, offering three main utilities for data manipulation:

- **Box<T>**: A monad-like container for individual values
- **BoxedList**: Enhanced array operations with boxing capabilities  
- **BoxedGenerator**: Generator-based data streaming and transformation

## Features

- **Functional Programming Patterns**: Implements Functor, Applicative, and Monad interfaces
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Async Support**: Built-in support for asynchronous operations
- **Generator Utilities**: Stream processing with generators and async generators
- **Method Chaining**: Elegant fluent API for data transformations

## Installation

This package is part of the Luxcium monorepo and uses Rush for dependency management.

```bash
# Within the monorepo
cd library/boxed-list
rush update
rush build
```

## Quick Start

```typescript
import { Box, BoxedList, BoxedGenerator } from '@luxcium/boxed-list';

// Basic Box usage
const box = Box.of('chocolates')
  .map(str => str.length)
  .map(len => len * 2);

console.log(box.value); // 20

// BoxedList operations
const list = BoxedList.of([1, 2, 3, 4, 5])
  .map(x => x * 2)
  .filter(x => x > 5);

console.log(list.unbox()); // [6, 8, 10]
```

## API Reference

### Box<T>

**Implements**: `IApply<T>`, `IChain<T>`, `IMap<T>`, `IUnbox<T>`, `IBox<T>`, `IValue<T>`

A monad-like container that wraps a value and provides functional programming operations.

#### Static Methods

```typescript
// Create a box with a value
Box.of<T>(value: T): Box<T>

// Create a box from another boxed value
Box.from<T>(boxedValue: IUnbox<T>): Box<T>
```

#### Instance Methods

```typescript
// Transform the contained value
map<R>(fn: (value: T) => R): Box<R>

// Apply a boxed function to the contained value
ap<R>(boxedFn: Box<(value: T) => R>): Box<R>

// Chain operations that return boxes
chain<R>(fn: (value: T) => Box<R>): Box<R>

// Extract the contained value
unbox(): T

// Property accessor for the contained value
get value(): T
```

#### Example Usage

```typescript
import { Box } from '@luxcium/boxed-list';

// Basic operations
const result = Box.of('hello')
  .map(str => str.toUpperCase())
  .map(str => str + ' WORLD')
  .chain(str => Box.of(str.split(' ')))
  .value;

console.log(result); // ['HELLO', 'WORLD']

// Applicative pattern
const addBoxed = Box.of((a: number) => (b: number) => a + b);
const result2 = Box.of(5)
  .ap(Box.of(3).ap(addBoxed))
  .value;

console.log(result2); // 8
```

### BoxedList

Enhanced array operations with functional programming patterns.

```typescript
import { BoxedList } from '@luxcium/boxed-list';

// Create from array
const list = BoxedList.of([1, 2, 3, 4, 5]);

// Chain operations
const result = list
  .map(x => x * 2)
  .filter(x => x > 5)
  .unbox();

console.log(result); // [6, 8, 10]
```

### BoxedGenerator

Generator-based utilities for stream processing and data transformation.

```typescript
import { BoxedGenerator } from '@luxcium/boxed-list';

// Create from generator function
function* numbers() {
  for (let i = 1; i <= 5; i++) {
    yield i;
  }
}

const gen = BoxedGenerator.from(numbers())
  .map(x => x * 2);

for (const value of gen) {
  console.log(value); // 2, 4, 6, 8, 10
}
```

### BoxedAsyncGenerator

Asynchronous generator utilities for handling async data streams.

```typescript
import { BoxedAsyncGenerator } from '@luxcium/boxed-list';

async function* asyncNumbers() {
  for (let i = 1; i <= 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

const asyncGen = BoxedAsyncGenerator.from(asyncNumbers())
  .map(x => x * 2);

for await (const value of asyncGen) {
  console.log(value); // 2, 4, 6 (with delays)
}
```

## Core Interfaces

The library is built on several key interfaces:

```typescript
interface IValue<T> {
  readonly value: T;
}

interface IUnbox<T> {
  unbox(): T;
}

interface IBox<T> extends IValue<T>, IUnbox<T> {}

interface IMap<T> {
  map<R>(fn: (value: T) => R): IMap<R>;
}

interface IChain<T> {
  chain<R>(fn: (value: T) => IChain<R>): IChain<R>;
}

interface IApply<T> {
  ap<R>(boxedFn: IApply<(value: T) => R>): IApply<R>;
}
```

## Development

```bash
# Build the project
npm run build

# Run tests
npm test

# Install dependencies and build
npm run install
```

## Use Cases

### Data Transformation Pipelines

```typescript
const processData = (data: string) =>
  Box.of(data)
    .map(str => str.trim())
    .map(str => str.toLowerCase())
    .chain(str => str.length > 0 ? Box.of(str) : Box.of('default'))
    .value;
```

### Async Operations with Generators

```typescript
async function* fetchData() {
  const urls = ['url1', 'url2', 'url3'];
  for (const url of urls) {
    yield await fetch(url).then(r => r.json());
  }
}

const processedData = BoxedAsyncGenerator.from(fetchData())
  .map(data => processApiResponse(data));
```

## License

MIT License

### Copyright &copy; 2022-2024 Benjamin Vincent Kasapoglu (Luxcium)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#### † Scientia est lux principium✨ ™

---

*Part of the [Luxcium Monorepo](../../README.md)*