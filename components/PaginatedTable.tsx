import React, { useRef, Fragment } from "react"
import { ID } from "interfaces"
import { ApolloError } from "@apollo/client"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { PaginatedList } from "interfaces"
import { TABLE_ITEMS_PER_PAGE } from "sharedConstants"

const PREFIX = "PaginatedTable"
const classes = {
  root: `${PREFIX}-root`,
}
const Root = styled("div")(({ theme: { spacing } }) => ({
  [`& .${classes.root}`]: {
    marginBottom: spacing(2),
  },
}))

interface PaginatedTableProps<T, K> {
  data?: PaginatedList<T, K>
  isLoading: boolean
  error?: ApolloError
  rowComponent?: React.FC<{ node: T }>
  mapNodeToCols?: (node: T) => React.ReactNode[]
  mapNodeToRowProps?: (node: T) => { className?: string }
  colHeaders: React.ReactNode[]
  pageNumber: number
  rowsPerPage: number
  onPageNumberChange: (n: number) => void
  onRowsPerPageChange: (n: number) => void
}

export function PaginatedTable<T>(
  props: PaginatedTableProps<T, ID>,
): React.ReactElement<any, any> | null {
  const {
    isLoading,
    data,
    error,
    mapNodeToCols,
    mapNodeToRowProps,
    rowComponent: CustomRow,
    colHeaders,
    rowsPerPage,
    pageNumber,
    onPageNumberChange,
    onRowsPerPageChange,
  } = props

  const lastTotalCount = useRef(0)
  const cols = colHeaders.length

  let tableBody: React.ReactNode = (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={cols}>
          <Typography>No entries</Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  )

  if (isLoading) {
    tableBody = (
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={cols}>
            <CircularProgress />
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  if (!isLoading && error !== undefined) {
    tableBody = (
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={cols} color="error">
            <Typography color="error">{error.message}</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  if (!isLoading && !error && !!data && data.totalCount > 0) {
    lastTotalCount.current = data.totalCount
    tableBody = (
      <TableBody>
        {data.edges.map((edge) => (
          <Fragment key={edge.cursor}>
            {CustomRow ? (
              <CustomRow node={edge.node} />
            ) : (
              <TableRow {...mapNodeToRowProps?.(edge.node)}>
                {mapNodeToCols?.(edge.node).map((col, i) => (
                  <TableCell key={`table-col-header-${i}`}>{col}</TableCell>
                ))}
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    )
  }

  return (
    <Root>
      <Box className={classes.root}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {colHeaders.map((h, i) => (
                  <TableCell key={`table-col-${i}`}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            {tableBody}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={TABLE_ITEMS_PER_PAGE}
          component="div"
          count={data?.totalCount ?? lastTotalCount.current}
          rowsPerPage={rowsPerPage}
          page={pageNumber}
          onPageChange={(_e, v) => onPageNumberChange(v)}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange(parseInt(e.target.value, 10))
          }
        />
      </Box>
    </Root>
  )
}
