import { Logger } from "Logger"
import { GQLMyself } from "generated/graphqlTypes"
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
