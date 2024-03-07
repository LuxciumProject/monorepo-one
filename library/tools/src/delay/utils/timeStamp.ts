/**
 * Rounds the given time elapsed value to six decimal places.
 *
 * @param timeElapsed The time elapsed value to round.
 * @returns The rounded time elapsed value.
 */
export function timeStamp(timeElapsed: number) {
  return Math.round(timeElapsed * 1_000_000) / 1_000_000;
}
