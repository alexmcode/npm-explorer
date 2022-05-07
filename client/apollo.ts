import { useMemo } from "react"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { ErrorCode } from "sharedConstants"
import { MyIdQuery } from "./commonQueries"
import { MyIdQueryResult } from "generated/documentTypes"
import { GraphQLError } from "graphql"

import { Logger } from "Logger"
const Log = Logger("client/apollo")

let apolloClient: ApolloClient<Record<string, unknown>> | undefined

function isNotSignedInError(e: GraphQLError): boolean {
  return e?.extensions?.code === ErrorCode.NotSignedIn
}

const logoutLink = onError(({ graphQLErrors }): void => {
  const L = Log.fork("logoutLink")
  const hasNotSignedInError = graphQLErrors?.some(isNotSignedInError) ?? false

  const hasUserDataInStore =
    (
      apolloClient?.cache.readQuery({
        query: MyIdQuery,
      }) as MyIdQueryResult
    )?.data?.me?.id !== undefined

  if (hasNotSignedInError && hasUserDataInStore) {
    L.debug("Got not signed in error, resetting the store")
    apolloClient
      ?.clearStore()
      .catch((e) => {
        L.warn("Error clearing the store", e)
      })
      .then(() => apolloClient?.resetStore())
      .catch((e) => {
        L.warn("Error resetting the store", e)
      })
  }
})

function createApolloClient(): ApolloClient<Record<string, unknown>> {
  const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "/api/graphql"
  return new ApolloClient({
    // ssrMode: typeof window === "undefined",
    ssrMode: false,
    link: logoutLink.concat(new HttpLink({ uri })),
    connectToDevTools: typeof window !== "undefined",
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "cache-first",
      },
      watchQuery: {
        fetchPolicy: "no-cache",
      },
    },
  })
}

export function initializeApollo(
  initialState?: Record<string, unknown>,
): ApolloClient<Record<string, unknown>> {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use
  // Apollo Client, the initial state gets hydrated here
  if (initialState !== undefined) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the
    // existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient

  // Create the Apollo Client once in the client
  if (apolloClient === undefined) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo(
  initialState?: Record<string, unknown>,
): ApolloClient<Record<string, unknown>> {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
