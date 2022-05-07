import { gql } from "apollo-server-micro"
import { GQLResolvers } from "generated/graphqlTypes"
import { AppContext } from "server/context"
import {
  expiresIn,
  genAuthCookieHeaderString,
  genAuthExpiredCookie,
} from "server/cookies"
import * as storage from "./storage"

export const typeDefs = gql`
  enum UserRole {
    Admin
    Instructor
    Support
    Manager
    Fulfillment
    Fleet
    Student
  }

  type IdToken {
    userId: ID!
    idToken: String!
    refreshToken: String!
    expiresIn: Int!
  }

  input SignInWithEmailInput {
    email: String!
    password: String!
  }

  input CreateSessionCookieInput {
    idToken: String!
  }

  type Myself {
    id: ID!
    name: String!
    email: String
    signInEmail: String
    roles: [String!]!
  }

  type TestResult {
    package: String!
  }

  type Query {
    me: Myself!
    testQ(param: String!): TestResult!
  }

  type Mutation {
    signOut: Boolean!
    createSessionCookie(session: CreateSessionCookieInput!): String!
  }
`
export const resolvers: GQLResolvers<AppContext> = {
  Query: {
    async testQ(parent, data, context) {
      return await storage.testQ(data.param)
    }
  },

  Mutation: {
    async createSessionCookie(_parent, { session }, { res }): Promise<string> {
      const cookie = await storage.createSessionCookie(session.idToken)

      res.setHeader(
        "Set-Cookie",
        genAuthCookieHeaderString(cookie, {
          maxAge: expiresIn / 1000,
          expiresAt: new Date(Date.now() + expiresIn),
        }),
      )

      return cookie
    },

    async signOut(_parent, _args, ctx): Promise<boolean> {
      if (ctx?.user === undefined) {
        return false
      }
      ctx.res.setHeader("Set-Cookie", genAuthExpiredCookie())
      return true
    },
  },
}
