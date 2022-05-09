import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client"
import { useApollo } from "client/apollo"
import { SnackbarProvider } from "components/useSnackbars"

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  
  return (
    <ApolloProvider client={apolloClient}>
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </ApolloProvider>
  )
}

export default MyApp
