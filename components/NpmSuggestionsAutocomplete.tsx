import { gql } from "@apollo/client"
import React, { KeyboardEventHandler, useState } from "react"
import { Autocomplete, ListItem, ListItemText, TextField, TextFieldProps } from "@mui/material"
import { useListNpmSuggestionsQuery } from "generated/documentTypes"
import { ID } from "interfaces"
import { useDebouncedCallback } from "./useDebouncedCallback"
import { isStringEmpty } from "utils/strings"

gql`
  query ListNpmSuggestions($term: String!) {
    npmSuggestions(term: $term) {
      id
      name
      version
      description
    }
  }
`

interface AutocompleteOption<T> {
  value: T
  label: string
}

function getOptionSelected(
  option: AutocompleteOption<ID>,
  value: AutocompleteOption<ID>,
): boolean {
  return option.value === value.value
}

interface NpmSuggestionsAutocompleteProps {
  npmPackageId?: ID
  clearOnChange?: boolean
  onNpmPackageChange: (npmPackageId?: ID, npmPackageName?: string) => void
  textFieldProps?: TextFieldProps
}

export const NpmSuggestionsAutocomplete: React.FC<NpmSuggestionsAutocompleteProps> = (props) => {
  const { npmPackageId } = props
  const [term, setTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState<string>(term)
  const setTermDebounced = useDebouncedCallback(setDebouncedTerm, 200)

  const query = useListNpmSuggestionsQuery({
    // skip: term === "",
    variables: {
      term: debouncedTerm,
    }
  })

  let options: Array<AutocompleteOption<ID>> =
    query.data?.npmSuggestions?.map((suggestion) => ({
      value: suggestion.name,
      label: suggestion.name,
    })) ?? []

  const textFieldProps = props.textFieldProps ?? {}
  const getOptionLabel = (option: AutocompleteOption<any>): string =>
    option.label

  const value = options.find((o) => o.value === npmPackageId) ?? null
  
  const inputValue = isStringEmpty(npmPackageId)
    ? term
    : value?.label ?? "Loading..."

  function setTermAndRefetch(t: string): void {
    setTerm(t)
    setTermDebounced(t)
  }


  const selectIfBackspace: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Backspace" && !isStringEmpty(npmPackageId)) {
      const target: HTMLInputElement = e.target as HTMLInputElement
      target.select()
    }
  }

  return (
    <div>
      <Autocomplete
        loading={query.loading}
        loadingText="Loading..."
        options={options}
        getOptionLabel={getOptionLabel}
        renderOption={(props, option) => (
          <ListItem {...props} key={option.value}>
            <ListItemText>{option.label}</ListItemText>
          </ListItem>
        )}
        filterOptions={(options) => options}
        value={value}
        isOptionEqualToValue={getOptionSelected}
        openOnFocus
        onChange={(_e, v) => {
          if (props.clearOnChange) {
            setTermAndRefetch("")
          }
          props.onNpmPackageChange(v?.value ?? undefined, v?.label ?? undefined)
        }}
        inputValue={inputValue}
        onInputChange={(_e, v) => setTermAndRefetch(v)}
        renderInput={(params) => (
          <TextField
            {...textFieldProps}
            {...params}
            onKeyDown={selectIfBackspace}
          />
        )}
      />
    </div>
  )
}