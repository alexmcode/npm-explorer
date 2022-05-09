
import React, {
  createContext,
  FC,
  useContext,
  useState,
  useCallback,
} from "react"
import { AlertProps, Snackbar, Alert } from "@mui/material"
import { nanoid } from "nanoid"
import { styled } from "@mui/material/styles"

const SnackbarsWrapper = styled("div")(() => ({
  position: "fixed",
  bottom: "2em",
  left: "2em",
  maxWidth: "100% !important",
  zIndex: 1400,
}))

const StyledSnackbar = styled(Snackbar)(({ theme: { spacing } }) => ({
  position: "relative",
  marginTop: spacing(0.5),
  marginBottom: spacing(0.5),
}))

export const SnackbarContext = createContext({
  showSnackbar: () => {
    // do nothing
  },
} as Snackbars)
const AUTO_DISMISS = 5 * 1000

interface SetAndShowSnackbarParams {
  id?: string
  text: string
  severity?: AlertProps["severity"]
}

export const SnackbarProvider: FC<{ children: any }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<Array<SetAndShowSnackbarParams>>(
    [],
  )

  const showSnackbar = useCallback(
    function (newSnackbar: SetAndShowSnackbarParams) {
      setSnackbars((snackbar) => [
        ...snackbar,
        { ...newSnackbar, id: nanoid() },
      ])
      setTimeout(() => setSnackbars((toasts) => toasts.slice(1)), AUTO_DISMISS)
    },
    [setSnackbars],
  )

  const handleClose = (
    e: React.SyntheticEvent | React.MouseEvent,
    idToRemove: string | undefined,
  ): void => {
    e.preventDefault()
    if (snackbars.length > 0 && idToRemove) {
      setSnackbars(snackbars.filter((snackbar) => snackbar.id !== idToRemove))
    }
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackbarsWrapper>
        {snackbars.map((snackbar) => (
          <StyledSnackbar key={snackbar.id} open={true}>
            <Alert
              onClose={(e) => handleClose(e, snackbar.id)}
              variant="filled"
              elevation={6}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.text}
            </Alert>
          </StyledSnackbar>
        ))}
      </SnackbarsWrapper>
    </SnackbarContext.Provider>
  )
}

interface Snackbars {
  showSnackbar: (opts: SetAndShowSnackbarParams) => void
}

export function useSnackbars(): Snackbars {
  return useContext(SnackbarContext)
}
