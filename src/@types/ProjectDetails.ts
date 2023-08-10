export type ProjectLocation = {
  country: string
  region: string
  geoCoordinates: string
}

export type Units = {
  estimated: number
  issued: number
  retired: number
  available: number
  creditingPeriodStart: string
  creditingPeriodEnd: string
  unitMetric: string
}

export type Verification = {
  approach: string
  startDate: string
  endDate: string
}

export type Validation = {
  body: string
  date: string
  verifications: Verification[]
}

export type IssuanceUnit = {
  id: string
  status: string
  quantity: number
  date: string
  retirementsNotes?: string
}

export type Issuance = {
  id: string
  status: string
  vintage: number
  quantity: number
  availableUnits: number
  date: string
  units: IssuanceUnit[]
}

export type ProjectDocument = {
  name: string
  updatedDate: string
}

export type ProjectDetails = {
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
  status: string
  statusDate: string
  link: string
  tags: string
  coveredByNdc: string
  coBenefits: string[]
  creditingPeriodStart: string
  creditingPeriodEnd: string
  availableVintages?: string
  validation: Validation
  units: Units
  issuances: Issuance[]
  documents: ProjectDocument[]
}

export type ProjectCoordinates = {
  latitude: number
  longitude: number
}

export enum ProjectType {
  AFFORESTATION_REFORESTATION = `afforestationteforestation`,
  AGRICULTURE_FORESTRY_AND_OTHER_LAND_USE = `agricultureforestryandotherlanduse`,
  AVOIDED_CONVERSION = `avoidedconversion`,
  CHANGE_OF_FUEL_OR_RAW_MATERIALS = `changeoffuelorrawmaterials`,
  ELECTRICITY_GENERATION_FROM_SOLAR_PV = `electricitygenerationfromsolarpv`,
  ENERGY_DEMAND = `energydemand`,
  ENERGY_GENERATION = `energygeneration`,
  ENERGY_INDUSTRIES_RENEWABLE = `energyindustriesrenewable`,
  GHG_MANAGEMENT = `ghgmanagement`,
  HYDRO_POWER = `hydropower`,
  IMPROVED_FOREST_MANAGEMENT = `improvedforestmanagement`,
  LANDFILL_GAS_CAPTURE_COMBUSTION = `landfillgascapturecombustion`,
  REDD_REDUCED_EMISSIONS_FROM_DEFORESTATION_AND_DEGRADATION = `reddreducedemissionsfromdeforestationanddegradation`,
  REDUCED_EMISSIONS_FROM_DEFORESTATION_DEGRADATION = `reducedemissionsfromdeforestationdegradation`,
  REFORESTATION = `reforestation`,
  REFORESTATION_AND_REVEGETATION = `reforestationandrevegetation`,
  RENEWABLE_ELECTRICITY_FROM_WIND = `renewableelectricityfromwind`,
  SOLAR_POWER = `solarpower`,
  SOLAR_ELECTRICITY_SYSTEMS = `solarelectricitysystems`,
  WIND_POWER = `windpower`,
  ENERGY_EFFICIENCY_IMPROVEMENT = `energyefficiencyimprovement`,
  DEFAULT = `default`,
}
