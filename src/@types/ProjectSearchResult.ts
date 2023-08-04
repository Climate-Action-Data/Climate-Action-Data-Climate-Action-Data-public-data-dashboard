export interface ProjectSearchResult {
  name: string
  id: string
  warehouseProjectId: string
  standard: string
  methodology: string
  sector: string
  country?: string
  status: string
  creditingPeriodStart?: string
  creditingPeriodEnd?: string
  annualEst?: number
  annualIssued?: number
  annualRetired?: number
  annualAvailable?: number
  developer: string
  coveredByNdc: string
}

export enum ALLOWED_RENDER_TYPE {
  PROJECT = `ProjectTable`,
  UNIT = `UnitTable`,
}
