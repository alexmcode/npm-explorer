import { memoize } from "lodash"

type LogFunction = (...args: any[]) => void

interface Logger {
  info: LogFunction
  warn: LogFunction
  error: LogFunction
  debug: LogFunction
  fork: (forkName: string) => Logger
}

function consoleMethod(
  methodName: "info" | "log" | "error" | "debug" | "warn",
  loggerName: string,
): LogFunction {
  if (typeof console === "undefined" || console[methodName] === undefined) {
    throw new Error(`console.${methodName} does not exist`)
  }

  function log(...args: any[]): void {
    console[methodName](loggerName, ...args)
  }

  return log
}

const noop: LogFunction = () => {
  // do nothing
}

function consoleMethodIfProd(
  methodName: "info" | "log" | "error" | "debug" | "warn",
  loggerName: string,
): LogFunction {
  if (process.env.NODE_ENV === "production") {
    return noop
  }

  return consoleMethod(methodName, loggerName)
}

function consoleMethodResolver(method: string, logger: string): string {
  return `${logger}.${method}`
}

const consoleMethodMem = memoize(consoleMethod, consoleMethodResolver)

const consoleMethodIfProdMem = memoize(
  consoleMethodIfProd,
  consoleMethodResolver,
)

export const Logger = memoize(
  (name: string): Logger => ({
    info: consoleMethodIfProdMem("info", name),
    warn: consoleMethodIfProdMem("warn", name),
    error: consoleMethodIfProdMem("error", name),
    debug: consoleMethodMem("log", name),
    fork: (name2) => Logger(`${name}/${name2}`),
  }),
)
