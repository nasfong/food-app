import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatMoney = (number: number) => {
  return Number(number).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

export function truncateDescription(description: string, maxLength: number) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  } else {
    return description;
  }
}

export function replaceImage(image: string) {
  return image?.replace("http://maomkhmercuisine.online", import.meta.env.VITE_API_URL)
}
