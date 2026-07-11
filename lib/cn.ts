import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Helper standard pour composer des classes Tailwind avec résolution des conflits. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
