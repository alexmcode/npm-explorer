import { ApolloServer } from "apollo-server-micro"
import Cors from "micro-cors"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { typeDefs } from "server/schema"
import { resolvers } from "server/resolvers"
import { permissions } from "server/permissions"
import { context, AppContext } from "server/context"
import { applyMiddleware } from "graphql-middleware"
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core"
import { registerErrorHandlers } from "server/errors"

registerErrorHandlers()

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
