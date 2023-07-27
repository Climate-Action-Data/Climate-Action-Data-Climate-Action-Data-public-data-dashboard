export interface Project {
  name: string
  id: string
  company: string
  standard: string
  methodology: string
  sector: string
  country: string | undefined
  status: string
  creditingPeriod: string | undefined
  annualEst: number | undefined
  annualIssued: number | undefined
  annualRetired: number | undefined
  annualAvailable: number | undefined
}
