import { gql } from "apollo-server-micro"
import { mergeTypeDefs } from "@graphql-tools/merge"
import { typeDefs as sessionsTypeDefs } from "./sessions/graphql"
import { typeDefs as npmPackagesTypeDefs } from "./npmPackages/graphql"

const commonTypeDefs = gql`
  scalar DateTime

  enum SortDirection {
    asc
    desc
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: ID
  }

  input SortKeyDirectionPair {
    key: String!
    sortDirection: SortDirection!
  }

  input PageQuery {
    first: Int!
    after: ID
    skip: Int
    sortBy: [SortKeyDirectionPair!]
  }
`

export const typeDefs = mergeTypeDefs([
  commonTypeDefs,
  sessionsTypeDefs,
  npmPackagesTypeDefs,
])
