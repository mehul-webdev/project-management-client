import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function titleCaseWrapper(string) {
  if (!string || typeof string !== "string") return "";
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function camelToTitleCase(str) {
  if (!str || typeof str !== "string") return "";

  // Insert space before capital letters, then capitalize each word
  return str
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/^./, (s) => s.toUpperCase()) // Capitalize the first character
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return words[0][0].toUpperCase() + words[1][0].toUpperCase();
}
