import { GQLMyself, GQLUserRole } from "generated/graphqlTypes"
import * as firebaseSdk from "firebase-admin"
import { roleToClaim } from "utils/auth"

export function tokenToUserWithRoles(
  token: firebaseSdk.auth.DecodedIdToken,
): GQLMyself {
  const roles = new Set<GQLUserRole>()
  for (const role of Object.values(GQLUserRole)) {
    if (token[roleToClaim(role)] === true) {
      roles.add(role)
    }
  }

  return {
    id: token.uid,
    name: token.name,
    email: token.email,
    roles: Array.from(roles),
  }
}
