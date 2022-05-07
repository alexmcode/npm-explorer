import { GQLUserRole } from "generated/documentTypes"

export function roleToClaim(role: GQLUserRole): string {
  return "is" + role.toString()
}

export function claimToRole(claim: string): GQLUserRole {
  return claim.replace("is", "") as GQLUserRole
}
