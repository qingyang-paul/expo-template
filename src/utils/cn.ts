import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with tailwind-merge to handle conflicts.
 * Useful for dynamic styling in React components.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
