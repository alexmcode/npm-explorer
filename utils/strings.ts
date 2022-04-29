export function isStringEmpty(s: string | undefined | null): boolean {
  return (s ?? "").trim().length === 0
}

export function isStringNotEmpty(s: string | undefined | null): s is string {
  return !isStringEmpty(s)
}