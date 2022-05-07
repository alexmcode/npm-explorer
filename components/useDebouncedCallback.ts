import { useRef, useCallback } from "react"
import { debounce } from "lodash"

export function useDebouncedCallback(
  fn: (...args: any[]) => any,
  delay: number,
): (...args: any[]) => void {
  const callbackRef = useRef<(...args: any[]) => any>()
  callbackRef.current = fn
  return useCallback(
    debounce((...args) => {
      if (callbackRef.current === undefined) {
        return
      }

      callbackRef.current(...args)
    }, delay),
    [],
  )
}
