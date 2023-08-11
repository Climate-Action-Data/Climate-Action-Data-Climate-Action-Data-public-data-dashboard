export interface UnitProject {
  developer: string
  name: string
  warehouseProjectId: string
  id: string
  standard: string
  methodology: string
  sector: string
  country?: string
  type: string
}

export interface UnitSearchResponse {
  units: UnitSearchResult[]
  totalCount: number
}

export interface UnitSearchResult {
  id: string
  warehouseUnitId: string
  project: UnitProject
  status: string
  issuanceDate?: string
  issuanceId?: string
  retirementDate?: string
  annualEst?: number
  correspondingAdjustment?: string
  marketplace?: string
  serialNumber?: string
  vintage?: number
}
