import { BasePattern } from './base';
import type { PatternConfig } from '../types/pattern-config';

/**
 * Sequential pattern executes tasks one after another
 */
export class SequentialPattern extends BasePattern {
  constructor(config: PatternConfig) {
    super(config);
  }

  async execute(): Promise<any> {
    // Implementation for sequential execution
    // This would contain the actual sequential execution logic
    return Promise.resolve({
      type: 'sequential',
      result: 'Sequential execution completed',
      config: this.config
    });
  }
}