import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatarInitials(name?: string, email?: string): string {
  if (name && name.trim()) {
    const nameParts = name.trim().split(" ")
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
    }
    return nameParts[0][0].toUpperCase()
  }

  if (email && email.trim()) {
    return email.trim()[0].toUpperCase()
  }

  return "U"
}
