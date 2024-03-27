import { pricing } from './pricing';
import { ServiceType } from './types';

export function calculatePrice<M extends string>(
  service: ServiceType,
  tokens: number,
  model: M,
  input = true
): [number, M] {
  const servicePricing = pricing[service];
  if (!servicePricing) {
    return [NaN, model];
  }
  if (tokens < 0) {
    return [NaN, model];
  }
  if (input) {
    return [(servicePricing.input / 1000000) * tokens, model];
  } else {
    return [(servicePricing.output / 1000000) * tokens, model];
  }
}
