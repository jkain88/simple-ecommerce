import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const extractPageFromUrl = (url: string | null | undefined) => {
  if (!url) return null

  const urlObj = new URL(url)
  const page = urlObj.searchParams.get('page')
  return page ? parseInt(page) : null
}