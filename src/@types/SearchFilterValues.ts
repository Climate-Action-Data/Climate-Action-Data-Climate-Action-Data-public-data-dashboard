export interface SearchFilterValues {
  standards: string[]
  methodologies: string[]
  sectors: string[]
  countries: string[]
  creditingPeriod?: DatesFilter
}

export interface DatesFilter {
  minDate?: Date
  maxDate?: Date
}
