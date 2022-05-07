import { Typography, ListItem, List } from "@mui/material"
import { styled } from "@mui/material/styles"

const PREFIX = "EntityInfoGrid"
const classes = {
  item: `${PREFIX}-item`,
  label: `${PREFIX}-label`,
  value: `${PREFIX}-value`,
  header: `${PREFIX}-header`,
  section: `${PREFIX}-section`,
  container: `${PREFIX}-container`,
}
const Root = styled("div")(({ theme: { spacing } }) => ({
  [`& .${classes.item}`]: {
    display: "flex",
    flexDirection: "row",
  },
  [`& .${classes.label}`]: {
    marginTop: spacing(1),
  },
  [`& .${classes.value}`]: {
    marginTop: spacing(1),
    marginLeft: spacing(1),
  },
  [`& .${classes.header}`]: {
    marginBottom: spacing(2),
  },
  [`& .${classes.section}`]: {
    display: "flex",
    flexDirection: "column",
    marginTop: spacing(1),
  },
  [`& .${classes.container}`]: {
    display: "grid",
    gridTemplateRows: "auto",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: spacing(2),
    rowGap: spacing(1),
  },
}))

interface EntityInfoGridProps {
  children: React.ReactNode
}

interface EntityInfoGridSectionProps {
  header?: string
  children?: React.ReactNode,
}

interface EntityInfoGridItemProps {
  label: string
  value?: React.ReactNode
}

type EntityInfoGridComponent = React.FC<EntityInfoGridProps>
type EntityInfoGridSection = React.FC<EntityInfoGridSectionProps>
type EntityInfoItem = React.FC<EntityInfoGridItemProps>

type EntityInfoGrid = EntityInfoGridComponent & {
  Section: EntityInfoGridSection
} & { Item: EntityInfoItem }

export const EntityInfoGrid: EntityInfoGrid = ({ children }) => {
  return (
    <Root>
      <div className={classes.container}>{children}</div>
    </Root>
  )
}

const SectionComponent: EntityInfoGridSection = (props) => {
  return (
    <Root>
      <List className={classes.section}>
        <Typography variant="h6" className={classes.header}>
          {props.header}
        </Typography>
        {props.children}
      </List>
    </Root>
  )
}

const ItemComponent: EntityInfoItem = (props) => {
  return (
    <Root>
      <ListItem className={classes.item} aria-label={props.label}>
        <Typography
          className={classes.label}
          variant="body2"
          color="textSecondary"
        >
          {props.label}:
        </Typography>
        <Typography
          variant="body2"
          color="textPrimary"
          className={classes.value}
        >
          {props.value}
        </Typography>
      </ListItem>
    </Root>
  )
}

EntityInfoGrid.Section = SectionComponent
EntityInfoGrid.Item = ItemComponent
