import { styled } from "@mui/material/styles"
import { Box, Container } from "@mui/material"
import { Header } from "./Header"

const PREFIX = "Layout"
const classes = {
  container: `${PREFIX}-container`,
  box: `${PREFIX}-box`,
}
const Root = styled("div")(({ theme: { spacing } }) => ({
  [`& .${classes.container}`]: {
    flexGrow: 1,
    padding: spacing(3),
    marginTop: spacing(8),
    overflow: "auto",
  },
  [`& .${classes.box}`]: {
    display: "flex",
  },
}))

export interface LayoutProps {
  children?: React.ReactNode
  pageTitle: string
}

export const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  return (
    <Root>
      <Box className={classes.box}>
        <Header pageTitle={pageTitle} />
        <Container className={classes.container}>{children}</Container>
      </Box>
    </Root>
  )
}
