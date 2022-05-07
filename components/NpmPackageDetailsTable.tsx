import { EntityPageSection } from "./EntityPageSection"
import { EntityInfoGrid } from "./EntityInfoGrid"
import { GQLPackageDetailsFragment } from "generated/documentTypes"
import { Grid, Button } from "@mui/material"
import * as dateTimes from "utils/dateTimes"

interface NpmPackageDetailsProps {
  details: GQLPackageDetailsFragment
  refetchPackageDetailsFromRegistry: () => void
  loading: boolean
}

export const NpmPackageDetailsTable: React.FC<NpmPackageDetailsProps> = ({
  details,
  refetchPackageDetailsFromRegistry,
  loading,
}) => {
  return (
    <EntityPageSection header={details.name} loading={loading}>
      <EntityInfoGrid>
        <EntityInfoGrid.Section header="Details">
          {details.author && (
            <>
              <EntityInfoGrid.Item
                label="Author name"
                value={details.author.name}
              />
              <EntityInfoGrid.Item
                label="Author email"
                value={details.author.email}
              />
            </>
          )}
          <EntityInfoGrid.Item
            label="Description"
            value={details.description}
          />
          <EntityInfoGrid.Item
            label="Latest version"
            value={details.latestVersion}
          />
          <EntityInfoGrid.Item
            label="Last updated"
            value={dateTimes.formatDate(details.updatedAt, {
              timeZone: dateTimes.getUsersTimeZone(),
              representation: dateTimes.DateRepresentation.DateFullTime,
            })}
          />
        </EntityInfoGrid.Section>
      </EntityInfoGrid>
      
      <Grid container spacing={1} justifyContent="flex-end">
        <Grid item>
          <Button
            disabled={loading}
            variant="outlined"
            color="primary"
            onClick={refetchPackageDetailsFromRegistry}
          >
            Fetch
          </Button>
        </Grid>
      </Grid>
    </EntityPageSection>
  )
}