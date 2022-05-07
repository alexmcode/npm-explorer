export enum ErrorCode {
  NotSignedIn = "NOT_SIGNED_IN",
  WrongCredentials = "WRONG_CREDENTIALS",
  InvalidEmail = "INVALID_EMAIL",
  NotFound = "NOT_FOUND",
  BadRequest = "BAD_REQUEST",
  Conflict = "CONFLICT",
}

export const DEFAULT_QUERY_PAGE_SIZE = 40
export const DEFAULT_TABLE_ITEMS_PER_PAGE = 20
export const TABLE_ITEMS_PER_PAGE = [10, 20, 40]

export const DEFAULT_LONG_DATE_TIME_FMT = "MMM d, yyyy, h:mm aaaa"
export const DEFAULT_VERY_LONG_DATE_TIME_FMT = "MMM d, yyyy, h:mm:ss aaaa"
export const LONG_DATE_TIME_TIMEZONE_FMT = "MMMM d, yyyy, h:mm aaaa z"
export const DEFAULT_DATE_FMT = "MMM d, yyyy"
export const DEFAULT_DATE_WEEK_DAY = "eeee, MMM d"
export const DEFAULT_TIME_OF_DAY_24_HOURS_FMT = "HH:mm"
export const DEFAULT_TIME_OF_DAY_FMT = "p"
