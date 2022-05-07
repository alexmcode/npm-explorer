import {
  DEFAULT_LONG_DATE_TIME_FMT,
  DEFAULT_VERY_LONG_DATE_TIME_FMT,
  DEFAULT_DATE_FMT,
  DEFAULT_TIME_OF_DAY_FMT,
  DEFAULT_DATE_WEEK_DAY,
  DEFAULT_TIME_OF_DAY_24_HOURS_FMT,
  LONG_DATE_TIME_TIMEZONE_FMT,
} from "sharedConstants"
import { utcToZonedTime } from "date-fns-tz"
import { format } from "date-fns"

export enum DateRepresentation {
  DateOnly,
  DateOnlyWithWeekDay,
  DateTime,
  DateFullTime,
  TimeOfDay,
  TimeOfDay24Hours,
  LongDateTime,
}

export interface FormatDateOptions {
  representation: DateRepresentation
  timeZone: string
}

export function getUsersTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function dateRepresentationToFormatString(
  representation: DateRepresentation,
): string {
  switch (representation) {
    case DateRepresentation.DateTime:
      return DEFAULT_LONG_DATE_TIME_FMT
    case DateRepresentation.DateFullTime:
      return DEFAULT_VERY_LONG_DATE_TIME_FMT
    case DateRepresentation.DateOnly:
      return DEFAULT_DATE_FMT
    case DateRepresentation.TimeOfDay:
      return DEFAULT_TIME_OF_DAY_FMT
    case DateRepresentation.DateOnlyWithWeekDay:
      return DEFAULT_DATE_WEEK_DAY
    case DateRepresentation.TimeOfDay24Hours:
      return DEFAULT_TIME_OF_DAY_24_HOURS_FMT
    case DateRepresentation.LongDateTime:
      return LONG_DATE_TIME_TIMEZONE_FMT
    default:
      throw new Error(`Unknown DateRepresentation ${representation}`)
  }
}

export function formatDate(
  utcTime: number | Date,
  options: FormatDateOptions,
): string {
  const formatStr = dateRepresentationToFormatString(options.representation)
  return format(utcToZonedTime(utcTime, options.timeZone), formatStr)
}