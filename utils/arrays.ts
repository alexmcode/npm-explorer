export function getFirst<T>(maybeArray: T | T[] | undefined): T | undefined {
  if (Array.isArray(maybeArray)) {
    return maybeArray[0]
  }

  return maybeArray
}

export function firebaseDocToArray<T>(map: { [id: string]: T }): T[] {
  return Object.entries(map).map(([id, next]) => ({ ...next, id }))
}
