import { pricing } from './pricing';
import { ServiceType } from './types';

export function calculatePrice(
  service: ServiceType,
  tokens: number,
  input = true
): number {
  const servicePricing = pricing[service];
  if (!servicePricing) {
    return NaN;
  }
  if (tokens < 0) {
    return NaN;
  }
  if (input) {
    return (servicePricing.input / 1000000) * tokens;
  } else {
    return (servicePricing.output / 1000000) * tokens;
  }
}
