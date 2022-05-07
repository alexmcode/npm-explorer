import { ID } from "interfaces"
import { GQLMyself } from "generated/graphqlTypes"

export interface IdToken {
  userId: ID
  idToken: string
  refreshToken: string
  expiresIn: number
}

export interface AuthResult {
  user: GQLMyself
  idToken: IdToken
}

export interface AuthCookieResult extends AuthResult {
  cookie: string
}
