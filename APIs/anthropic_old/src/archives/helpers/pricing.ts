import { ServicePricing, ServiceType } from './types';

export const pricing: Record<ServiceType, ServicePricing> = {
  haiku: { input: 0.25, output: 1.25 },
  sonnet: { input: 3, output: 15 },
  opus: { input: 15, output: 75 },
};
