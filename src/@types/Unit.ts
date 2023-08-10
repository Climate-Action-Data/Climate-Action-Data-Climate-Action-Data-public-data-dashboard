import { Validation } from './ProjectDetails'
import { UnitProject } from './UnitSearchResult'

export enum UnitStatus {
  RETIRED = `Retired`,
  HELD = `Held`,
  BUFFER = `Buffer`,
}

export type UnitIssuance = {
  issuedTo: string
  issuanceBatchSerial: string
  quantityIssued: number
}

export type Unit = {
  warehouseUnitId: string
  project: UnitProject
  status: string
  type: string
  credits: number
  monitoringPeriodStart: string
  monitoringPeriodEnd: string
  issuanceDate: string
  vintage: number
  tags: string
  retirementNote?: string
  usingEntity?: string
  correspondingAdjustment?: string
  monitoringPeriod: string
  validation: Validation
  issuance: UnitIssuance
}
