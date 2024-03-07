import { cpus } from 'os';

export function cpuCount(): number {
  return cpus().length;
}
