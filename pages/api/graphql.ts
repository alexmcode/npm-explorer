// import * as Sentry from "@sentry/nextjs"
import { ApolloServer } from "apollo-server-micro"
import Cors from "micro-cors"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { typeDefs } from "server/schema"
import { resolvers } from "server/resolvers"
// import { permissions } from "server/permissions"
import { context, AppContext, AppContextAnonymous } from "server/context"
import { applyMiddleware } from "graphql-middleware"
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core"
import { registerErrorHandlers } from "server/errors"

registerErrorHandlers()

// For plugin definition see the docs: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
// const apolloServerSentryPlugin: ApolloServerPlugin<
//   AppContext | AppContextAnonymous
// > = {
//   async requestDidStart() {
//     return {
//       async didEncounterErrors(reqContext) {
//         if (reqContext.context.req.headers.host?.includes("localhost")) {
//           // ignore local env errors
//           return
//         }

//         const appContext: AppContext | undefined = (
//           reqContext.context as AppContext
//         ).user
//           ? (reqContext.context as AppContext)
//           : undefined

//         Sentry.withScope((scope) => {
//           scope.addEventProcessor((event) =>
//             Sentry.Handlers.parseRequest(event, reqContext.context.req),
//           )

//           if (appContext) {
//             const { user } = appContext
//             scope.setUser({
//               id: user.id,
//               email: user.email ?? undefined,
//             })
//           }

//           scope.setTags({
//             graphql: reqContext.operation?.operation ?? "parse_error",
//             graphqlName:
//               reqContext.operationName ?? reqContext.request.operationName,
//           })

//           reqContext.errors.forEach((error) => {
//             scope.setExtras({
//               path: error.path,
//             })
//             Sentry.captureException(error)
//           })
//         })
//       },
//     }
//   },
// }

const schema = applyMiddleware(
  makeExecutableSchema<AppContext>({
    typeDefs,
    resolvers,
  }),
  // permissions,
)

// experiment with these plugins
const apolloServer = new ApolloServer({
  schema,
  resolvers,
  context,
  plugins: [
    // apolloServerSentryPlugin,
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
})

export const config = {
  api: {
    bodyParser: false,
  },
}

let started = false
const serverPromise = apolloServer.start()
const cors = Cors({ origin: process.env.ALLOWED_ORIGIN })

export default cors(async (req, res) => {
  if (!started) {
    await serverPromise
    started = true
  }

  if (req.method === "OPTIONS") {
    res.end()
    return false
  }

  return apolloServer.createHandler({ path: "/api/graphql" })(req, res)
})
