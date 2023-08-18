export enum ProjectSearchSortBy {
  RELEVANCE = `relevance`,
  NAME = `name`,
  STANDARD = `standard`,
  MEHODOLOGY = `methodology`,
  SECTOR = `sector`,
  COUNTRY = `country`,
  STATUS = `status`,
  CREDITING_PERIOD = `crediting_period`,
  ANNUAL_ESTIMATION = `annual_estimation`,
  ISSUED_UNITS = `issued_units`,
  RETIRED_UNITS = `retired_units`,
  AVAILABLE_UNITS = `available_units`,
  ADJUSTMENT = `adjustment`,
}

export enum UnitSearchSortBy {
  RELEVANCE = `relevance`,
  PROJECT_NAME = `project_name`,
  UNIT_STATUS = `unit_status`,
  VINTAGE = `vintage`,
  QUANTITY = `quantity`,
  VERIFICATION_REPORT_DATE = `verification_report_date`,
  STANDARD = `standard`,
  SECTOR = `sector`,
  COUNTRY = `country`,
  MARKETPLACE = `marketplace`,
  METHODOLOGY = `methodology`,
  CORRESPONDING_ADJUSTMENT = `corresponding_adjustment`,
  SERIAL_NUMBER = `serial_number`,
}

export enum DatabaseQueryDirection {
  ASC = `asc`,
  DESC = `desc`,
}

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
  sortBy: ProjectSearchSortBy
  direction: DatabaseQueryDirection
}

export interface UnitSearchFilterValues {
  unitStatus: string[]
  projectStatus: string[]
  sectors: string[]
  countries: string[]
  vintageYear?: YearsFilter
  sortBy: UnitSearchSortBy
  direction: DatabaseQueryDirection
}

export interface DatesFilter {
  minDate?: Date
  maxDate?: Date
}

export interface YearsFilter {
  minYear?: number
  maxYear?: number
}
