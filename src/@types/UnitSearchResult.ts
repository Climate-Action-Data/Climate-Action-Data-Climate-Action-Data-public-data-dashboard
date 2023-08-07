export interface UnitSearchResult {
  id: string
  warehouseProjectId: string
  projectDeveloper: string
  projectId: string
  projectName: string
  projectStandard: string
  projectMethodology: string
  projectSector: string
  projectCountry?: string
  status: string
  issuanceDate?: string
  retirementDate?: string
  annualEst?: number
  correspondingAdjustment?: string
  marketplace?: string
  serialNumber?: string
}
