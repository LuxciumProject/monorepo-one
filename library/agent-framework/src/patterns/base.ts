import type { PatternConfig } from '../types/pattern-config';

/**
 * Base interface for all agent patterns
 */
export interface Pattern {
  /** The configuration used to create this pattern */
  readonly config: PatternConfig;
  
  /** Execute the pattern logic */
  execute(): Promise<any>;
  
  /** Clean up resources used by the pattern */
  cleanup?(): Promise<void>;
}

/**
 * Abstract base class for all agent patterns
 */
export abstract class BasePattern implements Pattern {
  public readonly config: PatternConfig;

  constructor(config: PatternConfig) {
    this.config = config;
  }

  abstract execute(): Promise<any>;

  async cleanup(): Promise<void> {
    // Default cleanup implementation - can be overridden
  }
}