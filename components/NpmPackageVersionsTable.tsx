import { useState } from "react"
import { GQLNpmPackageVersion } from "generated/graphqlTypes"
import { DEFAULT_TABLE_ITEMS_PER_PAGE } from "sharedConstants"
import { EntityPageSection } from "./EntityPageSection"
import { PaginatedTable } from "./PaginatedTable"
import { GQLPackageVersionForTableFragment, usePackageVersionsQuery } from "generated/documentTypes"
import { gql } from "@apollo/client"
import { ID, PaginatedList } from "interfaces"

gql`
  fragment PackageVersionForTable on NpmPackageVersion {
    id
    license
    maintainers {
      id
      name
      email
      url
    }
    numberOfDeps
    numberOfDevDeps
  }

  query PackageVersions($packageId: ID!, $first: Int!, $skip: Int,) {
    npmPackageVersions(
      packageId: $packageId,
      pageQuery: { first: $first, skip: $skip }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...PackageVersionForTable
        }
      }
    }
  }
`

interface NpmPackageVersionsTableProps {
  packageId: string
}

export const NpmPackageVersionsTable: React.FC<NpmPackageVersionsTableProps> = ({
  packageId,
}) => {
  const [tablePageNum, setTablePageNum] = useState(0)
  const [packageVersionsPerPage, setPackageVersionsPerPage] = useState(DEFAULT_TABLE_ITEMS_PER_PAGE)

  const query = usePackageVersionsQuery({
    variables: {
      packageId,
      first: packageVersionsPerPage,
      skip: tablePageNum * packageVersionsPerPage,
    }
  })

  const colHeaders = [
    "Version",
    "License",
    "Maintainers",
    "Dependencies",
    "Dev Dependencies",
  ]

  const mapPackageVersion = (packageVersion: GQLNpmPackageVersion): React.ReactNode[] => {
    return [
      packageVersion.id,
      packageVersion.license,
      packageVersion.maintainers.map((m) => m.name).join(", "),
      packageVersion.numberOfDeps,
      packageVersion.numberOfDevDeps,
    ]
  }

  return (
    <EntityPageSection header="Version">
      <PaginatedTable<GQLPackageVersionForTableFragment>
        data={query.data?.npmPackageVersions as PaginatedList<GQLPackageVersionForTableFragment, ID> | undefined}
        error={query.error}
        isLoading={query.loading}
        colHeaders={colHeaders}
        mapNodeToCols={mapPackageVersion}
        pageNumber={tablePageNum}
        rowsPerPage={packageVersionsPerPage}
        onPageNumberChange={setTablePageNum}
        onRowsPerPageChange={setPackageVersionsPerPage}
      />
    </EntityPageSection>
  )
}