import { GQLSortDirection } from "generated/graphqlTypes"

export type ID = string

export interface SortKeyDirectionPair<K> {
  key: K
  sortDirection: GQLSortDirection
}
export interface PageQuery<I, K = string> {
  first: number
  skip?: number
  after?: I
  sortBy?: SortKeyDirectionPair<K>[]
}

export interface PageInfo<I> {
  endCursor?: I
  hasNextPage: boolean
}

export interface PageNode<O, I> {
  node: O
  cursor: I
}

export interface PaginatedList<O, I> {
  totalCount: number
  pageInfo: PageInfo<I>
  edges: Array<PageNode<O, I>>
}

export interface Entity {
  id: ID
  name: string
}

export interface CoastlineDocType {
  id: ID
}

export type WithId<T> = T & CoastlineDocType
