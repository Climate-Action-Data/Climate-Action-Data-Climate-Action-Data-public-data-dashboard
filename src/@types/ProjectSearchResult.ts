export interface ProjectSearchResult {
  name: string
  id: string
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

export const ALLOWED_RENDER_TYPE = `ProjectTable`
