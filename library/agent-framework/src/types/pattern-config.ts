/**
 * Configuration interface for agent patterns
 */
export interface PatternConfig {
  /** The type of pattern to instantiate */
  type: 'parallel' | 'sequential' | 'router' | 'loop' | 'network' | 'hierarchical' | 'aggregator';
  
  /** Optional configuration data specific to each pattern */
  config?: Record<string, any>;
  
  /** Optional name for the pattern instance */
  name?: string;
}