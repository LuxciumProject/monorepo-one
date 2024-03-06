export function timeStamp(timeElapsed: number) {
  return Math.round(timeElapsed * 1_000_000) / 1_000_000;
}
