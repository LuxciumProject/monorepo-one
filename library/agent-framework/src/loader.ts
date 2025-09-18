import type { Pattern } from './patterns/base';
import type { PatternConfig } from './types/pattern-config';
import { ParallelPattern } from './patterns/parallel';
import { SequentialPattern } from './patterns/sequential';
import { RouterPattern } from './patterns/router';
import { LoopPattern } from './patterns/loop';
import { NetworkPattern } from './patterns/network';
import { HierarchicalPattern } from './patterns/hierarchical';
import { AggregatorPattern } from './patterns/aggregator';

/**
 * Creates and returns an instance of the specified agent pattern
 * @param config Configuration object specifying the pattern type and options
 * @returns A new instance of the requested pattern
 * @throws Error when an unknown pattern type is provided
 */
export function createPattern(config: PatternConfig): Pattern {
  switch (config.type) {
    case 'parallel':
      return new ParallelPattern(config);
    
    case 'sequential':
      return new SequentialPattern(config);
    
    case 'router':
      return new RouterPattern(config);
    
    case 'loop':
      return new LoopPattern(config);
    
    case 'network':
      return new NetworkPattern(config);
    
    case 'hierarchical':
      return new HierarchicalPattern(config);
    
    case 'aggregator':
      return new AggregatorPattern(config);
    
    default:
      throw new Error(`Unknown pattern type: ${(config as any).type}`);
  }
}

/**
 * Convenience function to create and execute a pattern in one call
 * @param config Configuration object specifying the pattern type and options
 * @returns Promise resolving to the pattern execution result
 */
export async function executePattern(config: PatternConfig): Promise<any> {
  const pattern = createPattern(config);
  try {
    return await pattern.execute();
  } finally {
    if (pattern.cleanup) {
      await pattern.cleanup();
    }
  }
}