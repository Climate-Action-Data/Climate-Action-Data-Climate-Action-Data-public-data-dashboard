export interface ProjectSearchResult {
  name: string
  id: string
  warehouseProjectId: string
  projectDeveloper: string
  standard: string
  methodology: string
  sector: string
  country?: string
  status: string
  creditingPeriod?: string
  annualEst?: number
  annualIssued?: number
  annualRetired?: number
  annualAvailable?: number
}

export enum ALLOWED_RENDER_TYPE {
  PROJECT = `ProjectTable`,
  UNIT = `UnitTable`,
}
