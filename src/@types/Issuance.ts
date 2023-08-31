import { Validation } from './ProjectDetails'
import { UnitProject } from './UnitSearchResult'

export type Issuance = {
  id: string
  project: UnitProject
  issuedTo: string
  vintage: number
  quantity: number
  unitType: string
  monitoringPeriodStart: string
  monitoringPeriodEnd: string
  correspondingAdjustment?: string
  issuanceTags?: string
  validation: Validation
}
