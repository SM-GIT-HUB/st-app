import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date)
{
  return date.toLocaleDateString('en-IN', {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
}
