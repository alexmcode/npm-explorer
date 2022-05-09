import { GQLNpmPackage, GQLNpmPackageVersion, GQLNpmSuggestion } from "generated/graphqlTypes";
import { DBMap, DBResult } from "server/firebaseWrapper";
import { NpmAuthor, NpmPackage, NpmPackageVersion, NpmSuggestion } from "./interfaces";
import * as arrays from "utils/arrays"

export function toStorageOutSuggestion(suggestion: NpmSuggestion): GQLNpmSuggestion {
  return {
    id: suggestion.name,
    description: suggestion.description || "",
    name: suggestion.name,
    version: suggestion.version,
  }
}

export function encodeDot(keyWithDot: string): string {
  const regex = /\./gi;
  return encodeURIComponent(keyWithDot).replace(regex, '%2E')
}

export function decodeDot(key: string): string {
  return decodeURIComponent(key).replace('%2E', '.')
}

function toFirebaseDep(deps: DBMap<string>): DBMap<string> {
  const newDeps: DBMap<string> = {}
  for (const key in deps) {
    const encodedKey = encodeDot(key)
    newDeps[encodedKey] = encodeDot(deps[key])
  }

  return newDeps
}

function toFirebaseNpmPackageVersion(rawNpmPackageVersion: NpmPackageVersion): NpmPackageVersion {
  return {
    _id: rawNpmPackageVersion._id,
    name: rawNpmPackageVersion.name || "",
    version: rawNpmPackageVersion.version,
    homepage: encodeDot(rawNpmPackageVersion.homepage),
    repositoryUrl: encodeDot(rawNpmPackageVersion.repositoryUrl),
    dependencies: toFirebaseDep(rawNpmPackageVersion.dependencies || {}),
    devDependencies: toFirebaseDep(rawNpmPackageVersion.devDependencies || {}),
    ...(rawNpmPackageVersion.author ? {
      author: {
        name: rawNpmPackageVersion.author.name || "",
        email: encodeDot(rawNpmPackageVersion.author.email),
        url: encodeDot(rawNpmPackageVersion.author.url || ""),
      },
    } : {
      author: getEmptyAuthor(),
    }),
    license: encodeDot(rawNpmPackageVersion.license),
    description: rawNpmPackageVersion.description,
    maintainers: rawNpmPackageVersion.maintainers || [],
  }
}

export function versionsToFirebaseKeys(versions: Record<string, any>): Record<string, any> {
  const newVersion: Record<string, any> = {}
  for (const versionKey in versions) {
    const versionWithoutDot = encodeDot(versionKey)
    newVersion[versionWithoutDot] = toFirebaseNpmPackageVersion(versions[versionKey])
  }

  return newVersion
}

function getEmptyAuthor(): NpmAuthor {
  return {
    name: "n/a",
    email: "n/a",
  }
}

export function encodeNpmPackage(npmPackage: NpmPackage): NpmPackage {
  return {
    _id: npmPackage._id,
    name: npmPackage.name,
    description: npmPackage.description,
    "dist-tags": npmPackage["dist-tags"],
    author: npmPackage.author || getEmptyAuthor(),
    repositoryUrl: npmPackage.repositoryUrl,
    readme: npmPackage.readme,
    versions: versionsToFirebaseKeys(npmPackage.versions),
    updatedAt: npmPackage.updatedAt,
  }
}

export function toStorageOutPackage({id, dbVal}: DBResult<NpmPackage>): GQLNpmPackage {
  return {
    id,
    ...dbVal,
    latestVersion: dbVal["dist-tags"]["latest"],
    ...(dbVal.author && {
      author: {
        id: dbVal.author.email,
        name: dbVal.author.name,
        email: dbVal.author.email,
        url: dbVal.author.url,
      }
    }),
  }
}

export function fromNpmPackageVersionDbVal({ id, dbVal }: DBResult<NpmPackageVersion>): GQLNpmPackageVersion {
  return {
    id: dbVal._id,
    license: dbVal.license,
    maintainers: dbVal.maintainers ? dbVal.maintainers.map((c) => {
      return {
        id: c.email || c.username || "",
        name: c.username || "",
        email: c.email || "n/a",
      }
    }) : [],
    numberOfDeps: Object.keys(dbVal.dependencies || {}).length,
    numberOfDevDeps: Object.keys(dbVal.devDependencies || {}).length,
  }
}
