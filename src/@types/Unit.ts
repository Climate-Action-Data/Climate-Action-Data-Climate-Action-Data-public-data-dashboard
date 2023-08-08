export type UnitProject = {
  warehouseProjectId: string
  id: string
  originProjectId: string
  name: string
}

export enum UnitStatus {
  RETIRED = `Retired`,
  HELD = `Held`,
  BUFFER = `Buffer`,
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
}
