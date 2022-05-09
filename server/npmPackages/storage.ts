import { GQLNpmPackage, GQLNpmPackageVersion } from "generated/graphqlTypes";
import { ID, PageQuery, PaginatedList } from "interfaces";
import * as paginatedLists from "utils/paginatedLists"
import { NpmPackage, NpmPackageVersion, StorageOutNpmSuggestion } from "./interfaces";
import * as firebaseWrapper from "server/firebaseWrapper"
import * as npmRegistryWrapper from "server/npmRegistryWrapper"
import * as mappers from "./mappers"
import { NotFoundError } from "server/errors";

const NPM_PACKAGES_COLLECTION = "npmPackages"

export async function listNpmPackages(term: string): Promise<StorageOutNpmSuggestion[]> {
  if (term === "") {
    return []
  }
  const list = await npmRegistryWrapper.getSuggestionsByTerm(term)

  return list.map((suggestion) => {
    return mappers.toStorageOutSuggestion(suggestion)
  })
} 

export async function getNpmPackageDetails(packageName: ID, shouldFetchFromRegistry: boolean): Promise<GQLNpmPackage> {
  if (packageName === "") {
    throw new NotFoundError("Package name is empty.")
  }

  if (!shouldFetchFromRegistry) {
    const npmPackageResult = await firebaseWrapper.getDocByPath<NpmPackage>(packageName, NPM_PACKAGES_COLLECTION)
    if (npmPackageResult) {
      return mappers.toStorageOutPackage(npmPackageResult)
    }
  }

  const npmPackage = await npmRegistryWrapper.fetchNpmPackage<NpmPackage>(packageName)
  
  const updateInfo = await firebaseWrapper.putObject<NpmPackage>({
    input: {
      ...mappers.encodeNpmPackage(npmPackage),
      updatedAt: Date.now(),
    },
    path: NPM_PACKAGES_COLLECTION,
    id: packageName
  })

  return mappers.toStorageOutPackage(updateInfo)
}

export async function listNpmPackageVersionsPaginated(
  packageId: ID,
  pageQuery: PageQuery<ID> = paginatedLists.getDefaultPageQuery(),  
): Promise<PaginatedList<GQLNpmPackageVersion, ID>> {
  const firebaseResult = await firebaseWrapper.listCollectionPaginated<NpmPackageVersion>(
    `${NPM_PACKAGES_COLLECTION}/${packageId}/versions`,
    pageQuery,
  )

return paginatedLists.map(firebaseResult, mappers.fromNpmPackageVersionDbVal)
}

export async function printNpmPackageDepsTree(packageId: ID, version: string): Promise<string> {
  const tree = await npmRegistryWrapper.calculateDepsTree(packageId, version)
  console.log({tree})
  return "test"
}