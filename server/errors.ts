import { ApolloError } from "apollo-server-micro"
import { ErrorCode } from "sharedConstants"

export class NotSignedInError extends ApolloError {
  constructor() {
    super("User not signed in", ErrorCode.NotSignedIn)
  }
}

export class WrongCredentialsError extends ApolloError {
  constructor(msg: string) {
    super(msg, ErrorCode.WrongCredentials)
  }
}

export class NotFoundError extends ApolloError {
  constructor(msg: string) {
    super(msg, ErrorCode.NotFound)
  }
}

export class ConflictError extends ApolloError {
  constructor(msg: string) {
    super(msg, ErrorCode.Conflict)
  }
}

export class BadRequestError extends ApolloError {
  constructor(msg: string) {
    super(msg, ErrorCode.BadRequest)
  }
}

export const registerErrorHandlers = (): void => {
  process
    .on("unhandledRejection", (reason) => {
      console.error("unhandledRejection", reason)
    })
    .on("uncaughtException", (error) => {
      console.error("uncaughtException", error)
      process.exit(1)
    })
}
