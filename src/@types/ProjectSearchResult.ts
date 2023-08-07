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

export interface ProjectSearchResponse {
  projects: ProjectSearchResult[]
  totalCount: number
}

export enum ALLOWED_RENDER_TYPE {
  PROJECT = `ProjectTable`,
  UNIT = `UnitTable`,
}
