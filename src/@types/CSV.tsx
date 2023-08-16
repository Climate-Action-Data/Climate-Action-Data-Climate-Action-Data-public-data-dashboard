export enum CSVExportTypes {
  PROJECT = `project`,
  UNIT = `unit`,
}

export type ExportFilters = {
  keywords: string
  count: number
  offset: number
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
