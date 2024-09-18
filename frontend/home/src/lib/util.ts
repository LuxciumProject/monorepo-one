import { ClassValue, clsx } from 'clsx';
import { differenceInYears } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function calculateAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
