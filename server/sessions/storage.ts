import { Logger } from "Logger"
import { GQLMyself, GQLTestResult } from "generated/graphqlTypes"
export { createSessionCookie } from "server/firebaseWrapper"
import * as firebaseWrapper from "server/firebaseWrapper"
import * as mappers from "./mappers"

const Log = Logger("server/lessons/storage")

export async function verifySessionCookie(
  cookie: string,
): Promise<GQLMyself | undefined> {
  const L = Log.fork("verifySessionCookie")
  try {
    const firebaseSession = await firebaseWrapper.verifySessionCookie(cookie)

    return mappers.tokenToUserWithRoles(firebaseSession)
  } catch (e) {
    L.error(e)
    return undefined
  }
}

export async function testQ(param1: string): Promise<GQLTestResult> {
  console.log({param1})
  const dbResult =
    await firebaseWrapper.getDocByPath<any>(
      "react",
      "dependencyTrees",
    )

  console.log({dbResult})

  return {
    package: dbResult?.dbVal || "not-found"
  }
}