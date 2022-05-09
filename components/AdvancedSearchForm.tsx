import { SyntheticEvent } from "react"

import {
  TextField,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { toErrorProps } from "utils/validation"
import { AdvancedSearchFormProps } from "./useAdvancedSearchForm"


const PREFIX = "CertificateForm"
const classes = {
  root: `${PREFIX}-root`,
}
const Root = styled("div")(({ theme: { spacing } }) => ({
  [`& .${classes.root}`]: {
    display: "flex",
    flexDirection: "column",
    marginTop: spacing(1),
  },
}))

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = (props) => {
  const { onSubmit } = props

  function submit(e: SyntheticEvent): void {
    e.preventDefault()
    onSubmit()
  }

  return (
    <Root>
      <form className={classes.root} onSubmit={submit}>

        <TextField
          id="search-text"
          margin="dense"
          label="Search Text"
          type="text"
          required
          {...toErrorProps("searchText", props)}
          value={props.searchText ?? ""}
          onChange={(e) => props.setFormKey("searchText", e.target.value)}
        />

      </form>
    </Root>
  )
}