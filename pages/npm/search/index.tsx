import { Button } from "@mui/material"
import { AdvancedSearchForm } from "components/AdvancedSearchForm"
import { Layout } from "components/Layout"
import { AdvancedSearchUpdateSuccess, useAdvancedSearchForm } from "components/useAdvancedSearchForm"
import { useSnackbars } from "components/useSnackbars"
import { GQLNpmPackage } from "generated/graphqlTypes"
import { useState } from "react"

const SearchPage: React.FC<any> = () => {
  const { showSnackbar } = useSnackbars()
  const [searchResults, setSearchResults] = useState<GQLNpmPackage[]>([])
  const advancedSearchForm = useAdvancedSearchForm({
    searchState: {
      searchText: "",
    },
    onSuccess: onSuccessSearchResult,
    onError: (e) => {
      showSnackbar({
        severity: "error",
        text: `Error updating student: ${e.message}`,
      })
    },
  })

  async function onSuccessSearchResult(
    info: AdvancedSearchUpdateSuccess,
  ): Promise<void> {
    showSnackbar({
      severity: "success",
      text: `Search successful!`,
    })
    setSearchResults(info.searchResult)
  }

  return (
    <Layout pageTitle="Npm Advance Search">
      <AdvancedSearchForm {...advancedSearchForm} />
      <Button
        disabled={!advancedSearchForm.canSave}
        onClick={advancedSearchForm.onSubmit}
      >
        Save
      </Button>

      {searchResults.map((res) => (
        <div key={res.id}>{res.name}</div>
      ))}
    </Layout>
  )
}

export default SearchPage