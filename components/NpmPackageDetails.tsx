import { gql } from "@apollo/client"
import { Box, CircularProgress } from "@mui/material"
import { usePackageDetailsQuery } from "generated/documentTypes"
import { ID } from "interfaces"
import { NpmPackageDetailsTable } from "./NpmPackageDetailsTable"
import { NpmPackageVersionsTable } from "./NpmPackageVersionsTable"

interface NpmPackageDetailsProps {
  packageId: ID
}

gql`
  fragment PackageDetails on NpmPackage {
    id
    name
    latestVersion
    description
    updatedAt
    author {
      name
      email
    }
  }

  query PackageDetails($packageId: ID!, $shouldFetchFromRegistry: Boolean!) {
    npmPackageDetails(packageId: $packageId, shouldFetchFromRegistry: $shouldFetchFromRegistry) {
      ...PackageDetails
    }
  }

  query PrintNpmPackageDepsTree($packageId: ID!, $packageVersion: String!) {
    printNpmPackageDepsTree(packageId: $packageId, packageVersion: $packageVersion)
  }
`

export const NpmPackageDetails: React.FC<NpmPackageDetailsProps> = ({
  packageId,
}) => {
  const detailsQuery = usePackageDetailsQuery({
    variables: {
      packageId,
      shouldFetchFromRegistry: false,
    },
    notifyOnNetworkStatusChange: true,
  })

  const details = detailsQuery.data?.npmPackageDetails

  if (!details && detailsQuery.loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }

  if (!details) {
    return (
      <Box>
        {`Npm package ${packageId} does not have data.`}
      </Box>
    )
  }

  return (
    <>
      <NpmPackageDetailsTable
        details={details}
        loading={detailsQuery.loading}
        refetchPackageDetailsFromRegistry={() => detailsQuery.refetch({
          packageId,
          shouldFetchFromRegistry: true,
        })}
      />
      <NpmPackageVersionsTable packageId={packageId} />
    </>
  )
}