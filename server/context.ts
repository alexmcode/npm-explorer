import { GQLMyself } from "generated/graphqlTypes"
import { MicroRequest } from "apollo-server-micro/dist/types"
import { ServerResponse } from "http"
import { getAuthCookieValue, genAuthExpiredCookie } from "./cookies"
import * as sessions from "./sessions/storage"

import { Logger } from "Logger"
import { DataLoaders, getDataLoaders } from "utils/dataLoaders"

const L = Logger("server/context")

export interface BaseContext {
  req: MicroRequest
  res: ServerResponse
}
export interface AppContextAnonymous extends BaseContext {
  dataLoaders: DataLoaders
}

export interface AppContext extends AppContextAnonymous {
  user: GQLMyself
}

async function getUser(ctx: BaseContext): Promise<any> {
  const cookieStr = ctx.req.headers.cookie
  const cookie = getAuthCookieValue(cookieStr)

  if (cookie === undefined) return null

  try {
    const user = await sessions.verifySessionCookie(cookie)

    if (user === undefined) {
      ctx.res.setHeader("Set-Cookie", genAuthExpiredCookie())
      return null
    }

    return user
  } catch (error) {
    L.error(error)
    return null
  }
}

export async function context(
  ctx: BaseContext,
): Promise<AppContext | AppContextAnonymous> {
  const user = await getUser(ctx)
  const dataLoaders = getDataLoaders()

  return {
    ...ctx,
    ...(user && { user }),
    dataLoaders,
  }
}
