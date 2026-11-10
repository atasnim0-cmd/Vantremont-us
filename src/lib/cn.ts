/** Joins class names, skipping falsy values. Small stand-in for clsx. */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
