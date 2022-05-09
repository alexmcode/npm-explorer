import { useEffect } from "react"
import { useMemo, useState } from "react"
import {
  ValidationResult,
  ValidatorSchema,
  createValidator,
  invalid,
} from "utils/validation"

export type FormBase<FormState> = {
  touchedKeys: (keyof FormState)[]
  validationResult: ValidationResult
  resetState(): void
  setFormState(s: FormState): void
  setFormKey<Key extends keyof FormState>(
    key: Key,
    val: FormState[Key],
    keysAffected?: Key[],
  ): void
  setFormKey<Key extends keyof FormState>(
    key: Key,
    val: FormState[Key],
    keysAffected?: string[],
  ): void
  setMultiple<K extends keyof FormState>(
    values: { key: K; val: FormState[K] }[],
  ): void
  setterFor<Key extends keyof FormState>(
    key: Key,
  ): (val: FormState[Key]) => void
  addTouchedKey(k: keyof FormState): void
  clearTouchedKeys(): void
}

type FormStateWithValidation<FormState> = {
  formState: FormState
} & FormBase<FormState>

function noop(): void {
  // do nothing
}

export function getNoopForm<FormState>(): FormBase<FormState> {
  return {
    touchedKeys: [],
    setterFor: () => noop,
    setFormKey: noop,
    addTouchedKey: noop,
    clearTouchedKeys: noop,
    setMultiple: noop,
    setFormState: noop,
    resetState: noop,
    validationResult: invalid("empty form"),
  }
}

type HookState<T> = {
  formState: T
  touchedKeys: (keyof T)[]
  validationResult: ValidationResult
}

export function useForm<FormState, Extra = void>(
  initial: NonNullable<FormState>,
  schema: ValidatorSchema<FormState, Extra>,
  extra: Extra,
): FormStateWithValidation<FormState> {
  const validator = useMemo(() => createValidator(schema), [schema])
  const [state, setState] = useState<HookState<FormState>>(() => ({
    formState: initial,
    touchedKeys: [],
    validationResult: validator.validate(initial, extra),
  }))

  useEffect(() => {
    setState((state) => ({
      ...state,
      validationResult: validator.validate(state.formState, extra),
    }))
  }, [validator])

  function addTouchedKeyToArray(
    key: keyof FormState,
    touchedKeys: (keyof FormState)[],
  ): (keyof FormState)[] {
    const newKeys = new Set([...touchedKeys, key])
    return Array.from(newKeys)
  }

  function setFormKey<K extends keyof FormState>(
    key: K,
    val: FormState[K],
    keysAffected: K[] = [],
  ): void {
    setState((state) => {
      const formState: FormState = {
        ...state.formState,
        [key]: val,
      }
      let touchedKeys = addTouchedKeyToArray(key, state.touchedKeys)
      for (const key of keysAffected) {
        touchedKeys = addTouchedKeyToArray(key, touchedKeys)
      }

      return {
        formState,
        validationResult: validator.validate(formState, extra),
        touchedKeys,
      }
    })
  }

  function setMultiple<K extends keyof FormState>(
    values: { key: K; val: FormState[K] }[],
  ): void {
    const formState: FormState = {
      ...state.formState,
    }

    for (const keyValuePair of values) {
      formState[keyValuePair.key] = keyValuePair.val
    }

    setState((state) => ({
      ...state,
      formState,
      validationResult: validator.validate(formState, extra),
    }))
  }

  function setFormState(formState: FormState): void {
    setState((state) => ({
      ...state,
      formState,
      validationResult: validator.validate(formState, extra),
    }))
  }

  function resetState(): void {
    setState({
      formState: initial,
      touchedKeys: [],
      validationResult: validator.validate(initial, extra),
    })
  }

  return {
    resetState,
    setFormState,
    setFormKey,
    setMultiple,
    setterFor(key) {
      return (val) => setFormKey(key, val)
    },
    clearTouchedKeys() {
      setState((state) => ({ ...state, touchedKeys: [] }))
    },
    addTouchedKey(key) {
      setState((state) => ({
        ...state,
        touchedKeys: addTouchedKeyToArray(key, state.touchedKeys),
      }))
    },
    ...state,
  }
}
