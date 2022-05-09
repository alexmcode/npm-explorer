import { FormBase, useForm } from "./useForm"
import * as validation from "utils/validation"
import { gql } from "@apollo/client"
import { useDoSearchAndSaveHistoryMutation } from "generated/documentTypes"
import { GQLNpmPackage } from "generated/graphqlTypes"

gql`
  mutation doSearchAndSaveHistory(
    $query: AdvancedSearchQuery!
    $input: AdvancedSearchNoteInput!
  ) {
    searchResult: doSearchAndSaveHistory(
      query: $query,
      input: $input,
    ) {
      id
      name
      updatedAt
      latestVersion
      description
    } 
  }
`

export type AdvancedSearchFormState = {
  searchText?: string
}

export interface AdvancedSearchFormProps extends AdvancedSearchFormState, FormBase<AdvancedSearchFormState> {
  title: string
  isValid: boolean
  canSave: boolean
  isLoading: boolean
  onSubmit: () => void
}

export interface AdvancedSearchUpdateSuccess {
  searchResult: GQLNpmPackage[] 
}

interface useAdvancedSearchFormArgs {
  searchState?: AdvancedSearchFormState
  onSuccess: (info: AdvancedSearchUpdateSuccess) => void
  onError: (error: Error) => void
}

const validatorSchema: validation.ValidatorSchema<
AdvancedSearchFormState,
  unknown
> = {
  searchText: validation.and(
    validation.required("Please provide a search text."),
    validation.isString("Search text needs to be a valid string."),
  ),
}

export function getDefaultAdvancedSearchFromState(): AdvancedSearchFormState {
  return {
    searchText: "",
  }
}

function getAdvancedSearchFormState(
  searchState?: AdvancedSearchFormState,
): AdvancedSearchFormState {
  if (!searchState) {
    return getDefaultAdvancedSearchFromState()
  }

  return {
    ...getDefaultAdvancedSearchFromState(),
    ...searchState,
  }
}

// AdvancedSearch

export function useAdvancedSearchForm({
  searchState,
  onSuccess,
  onError,
}: useAdvancedSearchFormArgs): AdvancedSearchFormProps {
  const form = useForm(
    getAdvancedSearchFormState(searchState),
    validatorSchema,
    {},
   )

  const [doSearchAndSaveHistory, doSearchAndSaveHistoryState] =
    useDoSearchAndSaveHistoryMutation({
      onCompleted: (data) => onSuccess({
        searchResult: data.searchResult ?? [],
      }),
      onError: (error) => onError(error),
    })

  const { isValid } = form.validationResult
  const title = "Search NPM Registry"

  async function handleSubmit(): Promise<void> {
    const { isValid } = form.validationResult

    if (!isValid) {
      throw new Error("Form is not valid")
    }

    try {
      await doSearchAndSaveHistory({
        variables: {
          query: {
            searchText: form.formState.searchText ?? "",
          },
          input: {
            message: "Test note",
          }
        }
      })
    } catch (e) {
      onError(e as Error) 
    }
  }
  
  return {
    ...form,
    ...form.formState,
    title,
    isValid,
    canSave:
      isValid &&
      !doSearchAndSaveHistoryState.loading,
    isLoading: doSearchAndSaveHistoryState.loading,
    touchedKeys: [...form.touchedKeys],
    validationResult: form.validationResult,
    onSubmit: handleSubmit,
  }
}