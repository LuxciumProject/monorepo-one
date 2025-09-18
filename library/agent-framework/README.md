# Agent Framework

A TypeScript framework for managing different agent patterns including parallel, sequential, router, loop, network, hierarchical, and aggregator patterns.

## Features

- **Multiple Pattern Support**: Supports 7 different agent patterns
- **Type Safety**: Full TypeScript support with strict typing
- **Extensible**: Easy to add new patterns
- **Clean API**: Simple loader function for pattern instantiation
- **Comprehensive Testing**: 100% test coverage

## Supported Patterns

- `parallel` - Execute multiple tasks concurrently
- `sequential` - Execute tasks one after another  
- `router` - Route tasks to different handlers
- `loop` - Execute tasks in a loop
- `network` - Manage agent communication over a network
- `hierarchical` - Manage agents in a tree-like structure
- `aggregator` - Collect and combine results from multiple agents

## Usage

### Basic Usage

```typescript
import { createPattern, executePattern } from '@luxcium/agent-framework';

// Create a pattern instance
const config = { 
  type: 'network',
  name: 'my-network',
  config: { timeout: 5000 }
};

const pattern = createPattern(config);

// Execute the pattern
const result = await pattern.execute();

// Or use the convenience function
const result = await executePattern(config);
```

### Configuration

Each pattern accepts a `PatternConfig` object:

```typescript
interface PatternConfig {
  type: 'parallel' | 'sequential' | 'router' | 'loop' | 'network' | 'hierarchical' | 'aggregator';
  config?: Record<string, any>;  // Pattern-specific configuration
  name?: string;                 // Optional name for the pattern
}
```

### Error Handling

The loader will throw an error if an unknown pattern type is provided:

```typescript
try {
  const pattern = createPattern({ type: 'unknown' });
} catch (error) {
  console.error(error.message); // "Unknown pattern type: unknown"
}
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## License

MIT