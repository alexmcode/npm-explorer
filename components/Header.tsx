import React, { useState } from "react"
import { useRouter } from "next/router"

import { styled } from "@mui/material/styles"
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material"
import { Menu as MenuIcon, ChevronLeft } from "@mui/icons-material"
import { Navigation } from "./Navigation"
import clsx from "clsx"

const DRAWER_WIDTH = 300

const PREFIX = "AdminHeader"
const classes = {
  root: `${PREFIX}-root`,
  formRow: `${PREFIX}-formRow`,
  appBar: `${PREFIX}-appBar`,
  appBarShift: `${PREFIX}-appBarShift`,
  menuButton: `${PREFIX}-menuButton`,
  hide: `${PREFIX}-hide`,
  drawer: `${PREFIX}-drawer`,
  drawerOpen: `${PREFIX}-drawerOpen`,
  drawerClose: `${PREFIX}-drawerClose`,
  toolbar: `${PREFIX}-toolbar`,
  content: `${PREFIX}-content`,
  pageTitle: `${PREFIX}-pageTitle`,
  actionButton: `${PREFIX}-actionButton`,
}

const Root = styled("div")(({ theme }) => ({
  [`& .${classes.appBar}`]: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.primary.light,
  },
  [`& .${classes.appBarShift}`]: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
  },
  [`& .${classes.hide}`]: {
    display: "none",
  },
  [`& .${classes.drawer}`]: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  },
  [`& .${classes.drawerOpen}`]: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  [`& .${classes.drawerClose}`]: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  },
  [`& .${classes.toolbar}`]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  [`& .${classes.content}`]: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  [`& .${classes.pageTitle}`]: {
    paddingLeft: theme.spacing(2),
    flexGrow: 1,
  },
  [`& .${classes.actionButton}`]: {
    marginRight: theme.spacing(2),
  },
}))

export const Header: React.FC<{ pageTitle: string }> = ({ pageTitle }) => {
  const router = useRouter()

  const [open, setOpen] = useState(true)

  function handleDrawerOpen(): void {
    setOpen(true)
  }

  function handleDrawerClose(): void {
    setOpen(false)
  }

  return (
    <Root>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.pageTitle}
            component="div"
          >
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <Navigation />
      </Drawer>
    </Root>
  )
}