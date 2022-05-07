import { PageQuery, PaginatedList } from "interfaces";
import { DEFAULT_QUERY_PAGE_SIZE } from "sharedConstants";

export function getDefaultPageQuery(): PageQuery<any, any> {
  return {
    first: DEFAULT_QUERY_PAGE_SIZE,
  }
}

export function empty<O, I>(): PaginatedList<O, I> {
  return {
    totalCount: 0,
    pageInfo: {
      hasNextPage: false,
    },
    edges: [],
  }
}


export function emptyWithTotalCount<O, I>(
  totalCount: number,
): PaginatedList<O, I> {
  return {
    totalCount,
    pageInfo: {
      hasNextPage: false,
    },
    edges: [],
  }
}

export function map<O, I, R>(
  list: PaginatedList<O, I>,
  mapFn: (o: O, i: number) => R,
): PaginatedList<R, I> {
  return {
    ...list,
    edges: list.edges.map(({ cursor, node }, i) => ({
      cursor,
      node: mapFn(node, i),
    })),
  }
}
