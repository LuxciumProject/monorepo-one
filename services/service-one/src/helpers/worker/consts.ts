export const DEBUG = {
  DEBUG: true,
  VERBOSA: 0,
};

const strategies = ['roundrobin', 'random', 'leastbusy'] as const;
export type Strategy = typeof strategies[number];
export const STRATEGIES: Set<Strategy> = new Set(strategies);

export enum Strategies {
  roundrobin = 'roundrobin',
  random = 'random',
  leastbusy = 'leastbusy',
}

// console.log(STRATEGIES.has(Strategies.leastbusy));
