import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A type-safe utility function to combine and merge class names.
 * - Uses clsx for conditional classNames.
 * - Uses tailwind-merge to intelligently resolve Tailwind class conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
