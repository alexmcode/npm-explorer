import { GQLNpmSuggestion } from "generated/graphqlTypes";
import { ID } from "interfaces";
import { DBMap } from "server/firebaseWrapper";

export type StorageOutNpmSuggestion= Omit<
  GQLNpmSuggestion,
  | "__typename"
>

export interface FirebaseNpmPackage {
  name: string
  version: string
  description: string
}

interface NpmLink {
  npm: string
  repository: string
  homepage?: string
  bugs?: string
}

export interface NpmAuthor {
  name: string
  email: string
  url?: string
}

interface NpmContributor {
  username: string
  email?: string
}

export interface NpmSuggestion {
  name: string
  scope: string
  version: string
  description?: string
  keywords?: string[]
  date: number
  links: NpmLink
  author: NpmAuthor
  publisher: NpmContributor
  maintainers: NpmContributor[]
}

export interface NpmPackageVersion {
  _id: ID
  name: string
  version: string
  homepage: string
  repositoryUrl: string
  dependencies?: DBMap<string>
  devDependencies?: DBMap<string>
  author: NpmAuthor
  license: string
  description?: string
  maintainers: NpmContributor[]
}

export interface NpmPackage {
  _id: ID
  name: string
  description: string
  "dist-tags": Record<string, string>
  versions: Record<string, NpmPackageVersion>
  author: NpmAuthor
  repositoryUrl: string
  readme?: string
  updatedAt: number
  // time: Record<string, string>
}

export interface NpmAdvancedSearchPackage {
  id: ID
  name: string
  scope: string
  version: string
  description: string
  keywords: string[]
  date: string
  links: string[]
  maintainers: NpmContributor[]
}
