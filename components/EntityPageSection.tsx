import { Paper, Typography, CircularProgress, Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const PREFIX = "EntityPageSection"
const classes = {
  header: `${PREFIX}-header`,
  section: `${PREFIX}-section`,
}
const Root = styled("div")(({ theme: { spacing } }) => ({
  [`& .${classes.header}`]: {
    marginBottom: spacing(2),
  },
  [`& .${classes.section}`]: {
    padding: spacing(2),
    marginBottom: spacing(2),
  },
}))

interface EntityPageSectionProps {
  header?: string
  children: React.ReactNode
  testId?: string
  className?: string | undefined
  loading?: boolean
}

export const EntityPageSection: React.FC<EntityPageSectionProps> = ({
  header,
  children,
  testId,
  className,
  loading,
}) => {
  return (
    <Root className={className}>
      <Paper data-cy={testId} className={classes.section}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {header && (
            <Typography variant="h5" className={classes.header} sx={{ mr: 2 }}>
              {header}
            </Typography>
          )}
          {loading && <CircularProgress />}
        </Box>
        {children}
      </Paper>
    </Root>
  )
}
