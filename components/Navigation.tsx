import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import Link from "next/link"
import ExploreIcon from '@mui/icons-material/Explore';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import HistoryIcon from '@mui/icons-material/History';

interface AdminNavItem {
  label: string
  path: string
  icon: React.ReactNode
}

const NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Npm Explorer",
    path: "/npm/explorer",
    icon: <ExploreIcon />
  },
  {
    label: "Npm Advanced Search",
    path: "/npm/search",
    icon: <ScreenSearchDesktopIcon />
  },
  {
    label: "Npm Search History",
    path: "/npm/history",
    icon: <HistoryIcon />
  },
]

export const Navigation: React.FC = () => {
  return (
    <List>
      {NAV_ITEMS.map((item) => (
        <Link href={item.path} passHref key={item.path}>
          <ListItem button component="a">
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        </Link>
      ))}
    </List>
  )
}