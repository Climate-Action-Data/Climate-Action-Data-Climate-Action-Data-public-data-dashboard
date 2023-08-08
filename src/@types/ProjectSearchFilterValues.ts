export interface AllSearchFilterValues {
  projectStatus: string[]
  methodologies: string[]
  sectors: string[]
  countries: string[]
  unitStatus: string[]
}

export interface ProjectSearchFilterValues {
  projectStatus: string[]
  methodologies: string[]
  sectors: string[]
  countries: string[]
  creditingPeriod?: DatesFilter
}

export interface UnitSearchFilterValues {
  unitStatus: string[]
  projectStatus: string[]
  sectors: string[]
  countries: string[]
  vintageYear?: YearsFilter
}

export interface DatesFilter {
  minDate?: Date
  maxDate?: Date
}

export interface YearsFilter {
  minYear?: number
  maxYear?: number
}
