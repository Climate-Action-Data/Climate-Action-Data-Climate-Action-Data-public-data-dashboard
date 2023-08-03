import { format, setDay, setMonth } from 'date-fns'

export const MONTHS_IN_YEAR = 12
export const DAYS_IN_WEEK = 7

export const getMonthNames = () => {
  const monthNames = []
  for (let i = 0; i < MONTHS_IN_YEAR; i++) {
    monthNames.push(format(setMonth(new Date(), i), `MMM`))
  }
  return monthNames
}

export const getWeekdayNames = () => {
  const weekdayNames = []
  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    weekdayNames.push(format(setDay(new Date(), i), `EEEEEE`))
  }
  return weekdayNames
}
