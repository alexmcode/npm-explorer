import { isEqual } from "lodash"
import { isStringEmpty, isStringNotEmpty } from "./strings"

export interface ValidationIssue {
  path?: string[]
  message: string
}

export interface ValidationResult {
  isValid: boolean
  issues?: ValidationIssue[]
}

export type ValueValidator<
  ToValidate,
  Key extends keyof ToValidate,
  ExtraInfo,
> = (
  val: ToValidate[Key],
  obj: ToValidate,
  info: ExtraInfo,
  key: string,
) => ValidationResult

export type ValidatorSchema<ToValidate, ExtraInfo = void> = NonNullable<{
  [Key in keyof ToValidate]?: ValueValidator<ToValidate, Key, ExtraInfo>
}>

export interface Validator<ToValidate, ExtraInfo> {
  validate: (obj: ToValidate, extra: ExtraInfo) => ValidationResult
  validateKey: (
    key: keyof ToValidate,
    obj: ToValidate,
    extra: ExtraInfo,
  ) => ValidationResult
  validateKeys: (
    keys: (keyof ToValidate)[],
    obj: ToValidate,
    extra: ExtraInfo,
  ) => ValidationResult
}

export function createValidator<
  ToValidate extends Record<string, any>,
  ExtraInfo,
>(
  schema: ValidatorSchema<ToValidate, ExtraInfo>,
): Validator<ToValidate, ExtraInfo> {
  function validateKey(
    key: keyof ToValidate,
    obj: ToValidate,
    extra: ExtraInfo,
  ): ValidationResult {
    const f = schema[key] ?? valid
    const validationResult = f(obj[key], obj, extra, key as string)
    let issues = validationResult.issues ?? []

    issues = issues.map((issue) => ({
      ...issue,
      path: [key as string, ...(issue.path ?? [])],
    }))

    validationResult.issues = issues
    return validationResult
  }

  function validateKeys(
    keys: (keyof ToValidate)[],
    obj: ToValidate,
    extra: ExtraInfo,
  ): ValidationResult {
    const results: ValidationResult[] = []
    for (const key of keys) {
      results.push(validateKey(key, obj, extra))
    }

    return results.reduce((acc, v) => {
      if (!v.isValid) {
        acc.isValid = false
        acc.issues = [...(acc.issues ?? []), ...(v.issues ?? [])]
      }
      return acc
    }, valid())
  }

  return {
    validate(obj, extra) {
      const schemaKeys = Object.keys(schema) as (keyof ToValidate)[]
      return validateKeys(schemaKeys, obj, extra)
    },
    validateKeys,
    validateKey,
  }
}

export function and<ToValidate, Key extends keyof ToValidate, ExtraInfo>(
  ...args: ValueValidator<ToValidate, Key, ExtraInfo>[]
): ValueValidator<ToValidate, Key, ExtraInfo> {
  return (val, obj, info, key) => {
    let issues: ValidationIssue[] = []
    let isValid = true
    for (const validate of args) {
      const result = validate(val, obj, info, key)
      if (!result.isValid) {
        isValid = false
        issues = [...issues, ...(result.issues ?? [])]
      }
    }

    return {
      isValid,
      issues,
    }
  }
}

export function required<T>(msg = "Required"): (val?: T) => ValidationResult {
  return (val) => (!val ? invalid(msg) : valid())
}

export function requiredIf<TValue, TState>(
  isRequired: (val: TValue | undefined, state: TState) => boolean,
  msg = "Required",
): (val: TValue | undefined, state: TState) => ValidationResult {
  return (val, state) =>
    !val && isRequired(val, state) ? invalid(msg) : valid()
}

export function stringNotEmpty<T extends string>(
  msg = "Required",
): (val?: T | null) => ValidationResult {
  return (val) => (isStringEmpty(val) ? invalid(msg) : valid())
}

const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

export function isEmail(val: string): boolean {
  return EMAIL_REGEX.test(val)
}

export function email<T extends string>(
  msg = "Email is not valid",
): (val?: T | null) => ValidationResult {
  return (val) => {
    if (isStringNotEmpty(val)) {
      return isEmail(val) ? valid() : invalid(msg)
    }

    return valid()
  }
}

export function valid(): ValidationResult {
  return { isValid: true }
}

export function invalid(
  message: string,
  path: string[] = [],
): ValidationResult {
  return {
    isValid: false,
    issues: [{ message, path }],
  }
}

export interface MUIErrorProps {
  error?: boolean
  helperText?: string
}

export type FormValidationResult = {
  validationResult: ValidationResult
  touchedKeys: string[]
}

export function toErrorProps(
  key: string,
  { validationResult, touchedKeys }: FormValidationResult,
): MUIErrorProps {
  if (!touchedKeys.includes(key)) {
    return {}
  }

  const messages: string[] =
    validationResult?.issues?.reduce((acc, issue) => {
      if (issue.path && issue.path[0] && issue.path[0] === key) {
        return [...acc, issue.message]
      }

      return acc
    }, [] as string[]) ?? []

  return {
    error: messages.length > 0,
    ...(messages.length > 0 && { helperText: messages.join("; ") }),
  }
}

export function pathToErrorProps(
  path: string[],
  { validationResult, touchedKeys }: FormValidationResult,
): MUIErrorProps {
  if (!touchedKeys.includes(path[0])) {
    return {}
  }

  const messages: string[] =
    validationResult?.issues?.reduce((acc, issue) => {
      if (issue.path && isEqual(issue.path, path)) {
        return [...acc, issue.message]
      }

      return acc
    }, [] as string[]) ?? []

  return {
    error: messages.length > 0,
    helperText: messages.join("; "),
  }
}

export function isNumber<T extends number | undefined>(
  msg = "Must be a number",
): (val: T) => ValidationResult {
  return (val) => (isNaN(val as number) ? invalid(msg) : valid())
}

export function isRange<T extends number | undefined>(
  min: number,
  max: number,
  msg: string,
): (val: T) => ValidationResult {
  return (val) => (val < min || val > max ? invalid(msg) : valid())
}

export function isString<T extends string | undefined>(
  msg = "Must be a string",
): (val: T) => ValidationResult {
  return (val) => (typeof val !== "string" ? invalid(msg) : valid())
}

export const getFieldError =
  <T extends FormValidationResult>(props: T) =>
  (path: string[]) => {
    return pathToErrorProps(path, props)
  }
