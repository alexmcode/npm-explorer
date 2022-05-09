import { useEffect, useState } from "react"
import { Layout } from "components/Layout"
import { ID } from "interfaces"
import { GetServerSideProps } from "next"
import { getFirst } from "utils/arrays"
import {NpmSuggestionsAutocomplete} from 'components/NpmSuggestionsAutocomplete'
import { useRouter } from "next/router"
import { isStringNotEmpty } from "utils/strings"
import { Box, IconButton, Tab, Tabs } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import { truncate } from "lodash"
import { NpmPackageDetails } from "components/NpmPackageDetails"

interface ExplorerPageProps {
  npmPackageId?: string
}

interface Tab {
  id: ID
  name?: string
}

interface TabState {
  currentTabIndex?: number
  tabs: Tab[]
}

function getInitialTabState(packageId?: string): TabState {
  if (isStringNotEmpty(packageId)) {
    return {
      currentTabIndex: 0,
      tabs: [
        {
          id: packageId,
        }
      ]
    }
  }

  return {
    currentTabIndex: undefined,
    tabs: [],
  }
}

export const getServerSideProps: GetServerSideProps<ExplorerPageProps> = async ({ query }) => {
  const npmPackageId: ID | undefined = getFirst(query.npmPackageId)

  // Not set it to undefined becasue of how nextjs SSR treates SSR props:
  // `undefined` cannot be serialized as JSON
  const props: ExplorerPageProps = {}
  if (!!npmPackageId) {
    props.npmPackageId = npmPackageId
  }

  return {
    props
  }
}

const ExplorerPage: React.FC<ExplorerPageProps> = (props) => {
  const router = useRouter()
  const routerPackageId =
    getFirst(router.query.npmPackageId) ?? props.npmPackageId ?? undefined
  const [tabState, setTabState] = useState<TabState>(
    getInitialTabState(routerPackageId),
  )
  
  useEffect(() => {
    if (!routerPackageId) {
      return
    }

    setTabState({
      ...tabState,
      tabs: tabState.tabs.map((tab) => {
        if (tab.id !== routerPackageId) {
          return tab
        }

        return {
          ...tab,
          name: routerPackageId
        }
      })
    })
  }, [routerPackageId])

  function updateRouterParam(npmPackageId?: ID): void {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, npmPackageId },
    })
  }

  function changeCurrentTabIndex(v: number): void {
    setTabState({ ...tabState, currentTabIndex: v })
    // updateRouterParam(tabState.tabs[v]?.id)
  }

  function openTab(id: ID, name: string): void {
    const openedTabIndex = tabState.tabs.findIndex((t) => t.id === id)
    if (openedTabIndex > -1) {
      setTabState({
        ...tabState,
        currentTabIndex: openedTabIndex,
      })

      updateRouterParam(id)
      return
    }

    const oldIndex = tabState.currentTabIndex ?? -1
    const newTabs = [...tabState.tabs]
    newTabs.splice(oldIndex + 1, 0, { id, name })

    setTabState({
      currentTabIndex: oldIndex + 1,
      tabs: newTabs,
    })

    updateRouterParam(id)
  }

  function closeTab(id: ID): void {
    const oldIndex = tabState.tabs.findIndex((tab) => tab.id === id)
    const newTabs = tabState.tabs.filter((tab) => tab.id !== id)
    let newIndex: number | undefined = oldIndex

    if (newTabs.length === 0) {
      newIndex = undefined
    }

    if (oldIndex === tabState.currentTabIndex && oldIndex > 0) {
      newIndex = oldIndex - 1
    }

    setTabState({
      currentTabIndex: newIndex,
      tabs: newTabs,
    })
    updateRouterParam(newTabs[newIndex ?? -1]?.id)
  }

  const packageDetailsTabContent = tabState.tabs.map((t, i) => (
    <Box
      key={t.id}
      sx={{
        display: tabState.currentTabIndex === i ? "block" : "none",
      }}
    >
      <NpmPackageDetails packageId={t.id} />
    </Box>
  ))

  return (
    <Layout pageTitle="Npm Explorer">
      <NpmSuggestionsAutocomplete
        clearOnChange={true}
        onNpmPackageChange={(npmPackageId, npmPackageName) => {
          if (!npmPackageId || !npmPackageName) return
          openTab(npmPackageId, npmPackageName)
        }}
      />

      <Tabs
        value={tabState.currentTabIndex}
        onChange={(_e, v) => changeCurrentTabIndex(v)}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabState.tabs.map((t) => (
          <Tab
            key={t.id}
            component="div"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {truncate(t.name, { length: 14 })}
                <IconButton onClick={() => closeTab(t.id)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            }
          />
        ))}
      </Tabs>

      {packageDetailsTabContent}
    </Layout>
  )
}

export default ExplorerPage
