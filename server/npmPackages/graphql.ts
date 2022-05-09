import { gql } from "@apollo/client";
import { GQLResolvers } from "generated/graphqlTypes";
import { AppContext } from "next/app";
import { DEFAULT_QUERY_PAGE_SIZE } from "sharedConstants";
import { isStringEmpty } from "utils/strings";
import * as storage from "./storage"

export const typeDefs = gql`
  input NpmSuggestionsQuery {
    id: ID
    
  }

  type Contributor {
    id: ID!
    name: String!
    email: String!
    url: String
  }

  type NpmPackage {
    id: ID!
    name: String!
    updatedAt: DateTime!
    latestVersion: String!
    description: String!
    author: Contributor
    # versions: [NpmPackageVersion!]!
  }

  type NpmPackageVersion {
    id: ID!
    license: String!
    maintainers: [Contributor!]!
    numberOfDeps: Int!
    numberOfDevDeps: Int!
  }

  type NpmSuggestion {
    id: ID!
    name: String!
    version: String!
    description: String!
  }

  type NpmPackageVersionEdge {
    cursor: ID!
    node: NpmPackageVersion!
  }

  type NpmPackageVersionPaginatedList {
    totalCount: Int!
    pageInfo: PageInfo!
    edges: [NpmPackageVersionEdge!]!
  }

  input AdvancedSearchQuery {
    searchText: String!
  }

  input AdvancedSearchNoteInput {
    message: String!
  }

  type Query {
    npmSuggestions(term: String!): [NpmSuggestion!]!
    npmPackageDetails(packageId: ID!, shouldFetchFromRegistry: Boolean!): NpmPackage!
    npmPackageVersions(packageId: ID!, pageQuery: PageQuery): NpmPackageVersionPaginatedList!
    printNpmPackageDepsTree(packageId: ID!, packageVersion: String!): String!
  }

  type Mutation {
    doSearchAndSaveHistory(query: AdvancedSearchQuery!, input: AdvancedSearchNoteInput!): [NpmPackage!]!
  }
`

export const resolvers: GQLResolvers<AppContext> = {
  Query: {
    async npmSuggestions(_parent, { term }) {
      return await storage.listNpmPackages(term)
    },
    async npmPackageDetails(_parent, { packageId, shouldFetchFromRegistry }) {
      return await storage.getNpmPackageDetails(packageId, shouldFetchFromRegistry)
    },
    async npmPackageVersions(_parent, { packageId, pageQuery }) {
      const pageQueryNormalized = {
        first: pageQuery?.first ?? DEFAULT_QUERY_PAGE_SIZE,
      }

      return await storage.listNpmPackageVersionsPaginated(
        packageId,
        pageQueryNormalized,
      )
    },
    async printNpmPackageDepsTree(_parent, { packageId, packageVersion }) {
      return storage.printNpmPackageDepsTree(packageId, packageVersion)
    }
  },

  Mutation: {
    async doSearchAndSaveHistory(_parent, { query, input }, _ctx) {
      return storage.doSearchAndSaveHistory(query, input)
    }
  },
}
