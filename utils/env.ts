export function getEnvString(key: string, defaultValue = ""): string {
  if (key.indexOf("NEXT_PUBLIC_") === 0) {
    throw new Error(
      "The '[]' syntax does not work for client-side environment " +
        `variables, please use 'process.env.${key} instead`,
    )
  }
  const value = process.env[key]
  if (value === undefined || value === "") {
    return defaultValue
  }
  return value
}
