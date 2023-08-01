export interface FilterDates {
  minDate?: Date
  maxDate?: Date
}

export interface SearchFilterValues {
  projectStatuses: string[]
  standards: string[]
  methodologies: string[]
  sectors: string[]
  countries: string[]
  filterDates?: FilterDates
}
