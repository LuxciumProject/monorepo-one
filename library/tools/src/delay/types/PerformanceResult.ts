export interface PerformanceResult<N = number> {
  value: N;
  timeElapsed: number;
  totalTimeElapsed: number;
  initialTime: number;
}

export type PerformanceResultTupple<N = number> = [
  value: N,
  timeElapsed: number,
  totalTimeElapsed: number,
  initialTime: number,
];
