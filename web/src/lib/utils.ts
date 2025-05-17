import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatarFallback(name: string): string {
  if (!name) return ""

  const words = name.trim().split(/\s+/)

  const initials = words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("")

  return initials
}

export function formatLocalDate(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function errorToast(
  error: unknown,
  message: string = "An unknown error occurred."
) {
  if (error instanceof ZodError) {
    const message = error.errors.map((err) => err.message).join(", ")
    return toast.error(message)
  }

  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return toast.error(error.response.data.message)
    } else if (error.message) {
      return toast.error(error.message)
    } else {
      return toast.error("Network request failed.")
    }
  }

  if (error instanceof Error) {
    return toast.error(error.message)
  }

  toast.error(message)
}
