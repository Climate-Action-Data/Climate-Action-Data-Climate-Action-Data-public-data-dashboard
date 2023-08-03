export interface SearchFilterValues {
  projectStatuses: string[]
  standards: string[]
  methodologies: string[]
  sectors: string[]
  countries: string[]
  creditingPeriod?: FilterDates
}

export interface FilterDates {
  minDate?: Date
  maxDate?: Date
}
