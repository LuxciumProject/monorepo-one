# @luxcium/colors-tools

A TypeScript library for color manipulation and conversion utilities in the Luxcium monorepo.

## Status

**Development Phase**: Early development stage with basic TypeScript infrastructure. Full TypeScript support available.

## Features

This library is planned to provide:

- Color format conversions
- Color manipulation utilities
- TypeScript type definitions for color operations

## Installation

This package is part of the Luxcium monorepo and uses Rush for dependency management.

```bash
# Within the monorepo
cd library/colors-tools
rush update
rush build
```

## API Reference

Currently in development. The main entry point exports:

```typescript
export const emptyForNow = true;
```

## Dependencies

- `dotenv` - Environment variable loading
- `fp-ts` - Functional programming utilities
- `source-map-support` - Source map support for debugging

## Development

```bash
# Build the project
npm run build

# Run tests
npm test

# Check TypeScript compilation
npm run check

# Fix linting and formatting
npm run fix
```

## License

MIT License

### Copyright &copy; 2021-2024 Benjamin Vincent Kasapoglu (Luxcium)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

*Part of the [Luxcium Monorepo](../../README.md)*
