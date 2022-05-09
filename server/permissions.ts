import { ApolloError, ForbiddenError } from "apollo-server-micro"
import { NotSignedInError } from "./errors"
import { rule, shield, and } from "graphql-shield"
import { IRuleResult } from "graphql-shield/dist/types"
import { GQLUserRole } from "generated/graphqlTypes"

const EMULATOR_HOST = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST

const isAuthenticated = rule()(
  async (_parent, _args, ctx): Promise<IRuleResult> => {
    return ctx?.user === undefined ? new NotSignedInError() : true
  },
)

const isAdmin = rule()(async (_parent, _args, ctx): Promise<IRuleResult> => {
  return ctx?.user?.roles?.includes(GQLUserRole.Admin)
    ? true
    : new ForbiddenError("Must be admin")
})

const isInstructor = rule()(
  async (_parent, _args, ctx): Promise<IRuleResult> => {
    return ctx?.user?.roles?.includes(GQLUserRole.Instructor)
      ? true
      : new ForbiddenError("Must be instructor")
  },
)

const isDevelopmentEnv = rule()(
  async (_parent, _args, _ctx): Promise<IRuleResult> => {
    return !!EMULATOR_HOST
      ? true
      : new ForbiddenError("Operation not supported in this environment")
  },
)

const preventAppointingAdmins = rule()(
  async (_parent, args): Promise<IRuleResult> => {
    return args.userRoles.includes(GQLUserRole.Admin)
      ? new ForbiddenError("Cannot assign admin role")
      : true
  },
)

export const permissions = shield(
  {
    Query: {
      "*": and(isAuthenticated, isAdmin),
    },
    Mutation: {
      "*": and(isAuthenticated, isAdmin),
    },
  },
  {
    fallbackError: (originalError): Error => {
      if (originalError instanceof Error) {
        return originalError
      }

      if (typeof originalError === "string") {
        return new ApolloError(originalError)
      }

      return new ApolloError("Internal Server Error", "INTERNAL_SERVER_ERROR")
    },
  },
)
