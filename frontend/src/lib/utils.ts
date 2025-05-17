import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates a Solana address for display
 * @param address The full address to truncate
 * @returns Truncated address (e.g., "8xyt9M...qHqP3r")
 */
export function truncateAddress(address: string): string {
  if (!address) return ""
  if (address.length <= 12) return address

  return `${address.slice(0, 6)}...${address.slice(-6)}`
}
