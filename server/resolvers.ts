import { mergeResolvers } from "@graphql-tools/merge"
import { GQLResolvers } from "generated/graphqlTypes"
import { AppContext } from "./context"

import { resolvers as sessionsResolvers } from "./sessions/graphql"
import { resolvers as npmPackagesResolvers } from "./npmPackages/graphql"

const commonResolvers: GQLResolvers<AppContext> = {}

export const resolvers = mergeResolvers([
  commonResolvers,
  sessionsResolvers,
  npmPackagesResolvers
])
