import { DateFormats } from '@/@types/DateFormats'
import { lightFormat } from 'date-fns'

export const formatDate = (date: string, format: DateFormats) => {
  return lightFormat(new Date(date), format)
}
