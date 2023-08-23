export enum CSVExportTypes {
  PROJECT = `project`,
  UNIT = `unit`,
}

export enum CSVExportFilenames {
  PROJECT_SEARCH = `project-search-export`,
  UNIT_SEARCH = `unit-search-export`,
  PROJECT_COMPARE = `project-compare-export`,
}

export type ExportFilters = {
  keywords: string
  count: number
  offset: number
  sortBy: string
  direction: string
}

export type ExportProjectFilters = {
  standards: string[]
  methodologies: string[]
  sectors: string[]
  countries: string[]
  creditingPeriodStart?: string
  creditingPeriodEnd?: string
}

export type ExportUnitFilters = {
  status: string[]
  standards: string[]
  methodologies: string[]
  sectors: string[]
  countries: string[]
  minYear?: number
  maxYear?: number
}

export type ExportCompleteFilters = ExportFilters & (ExportUnitFilters | ExportProjectFilters)
