import { useState } from "react"

export interface ModalState<T> {
  readonly isOpen: boolean
  readonly target?: T
  openFor: (target: T) => void
  close: () => void
}

export function useModal<T>(
  defaultState: { isOpen: boolean; target?: T } = { isOpen: false },
): ModalState<T> {
  const [state, setState] = useState(defaultState)
  return {
    ...state,
    openFor(target) {
      setState({ isOpen: true, target })
    },
    close() {
      setState({ ...state, isOpen: false, target: undefined })
    },
  }
}

export function withModalTargetSafe<T>(
  modal: ModalState<T>,
  fn: (target: T) => React.ReactNode,
): React.ReactNode {
  if (modal.target === undefined) {
    return null
  }
  return fn(modal.target)
}
