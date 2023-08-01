type ProjectLocation = {
  country: string
  region: string
  geoCoordinates: string
}

type Units = {
  estimated: number
  issued: number
  retired: number
  available: number
  creditingPeriodStart: string
  creditingPeriodEnd: string
  unitMetric: string
}

type Verification = {
  approach: string
  startDate: string
  endDate: string
}

type Validation = {
  body: string
  date: string
  verifications: Verification[]
}

type Issuance = {
  status: string
  vintage: number
  quantity: number
  availableUnits: number
  date: string
}

type ProjectDocument = {
  name: string
  updatedDate: string
}

type ProjectDetails = {
  warehouseProjectId: string
  id: string
  name: string
  description: string
  location: ProjectLocation
  standard: string
  methodology: string
  developer: string
  sector: string
  type: string
  link: string
  tags: string
  coveredByNdc: string
  coBenefits: string[]
  creditingPeriodStart: string
  creditingPeriodEnd: string
  validation: Validation
  units: Units
  issuances: Issuance[]
  documents: ProjectDocument[]
}

type ProjectCoordinates = {
  latitude: number
  longitude: number
}
