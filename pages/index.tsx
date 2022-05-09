import type { NextPage } from 'next'

import { Layout } from 'components/Layout'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Layout pageTitle='Home'>
      <Link href={"/npm/explorer"}>Click here for NPM Explorer</Link>
    </Layout>
  )
}

export default Home
