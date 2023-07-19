import { EffectResponse } from './EffectResponse'
import { TimeframesData } from './Timeframe'
import { SubRegion } from './geojson'

export interface CarbonData {
  activeProjects: number
  totalReductions: number
  estimatedReductions: number
  unitMetric: string
  sectors: PercentDataset[]
  standards: PercentDataset[]
}

export interface CarbonMapData {
  countryCode: string
  timeRanges: Record<TimeframesData, CarbonData>
}

export interface DataFilters {
  region: SubRegion
  country?: string
  timeframe: TimeframesData
}

export interface CarbonReduction {
  carbonMapData?: EffectResponse<CarbonMapData[]>
  carbonMapHasCountryData: Map<string, boolean>
  carbonMapHoveredRegion: string
  carbonMapHoveredCountry: string
  carbonMapDataFilters: DataFilters
}

export interface DataState {
  carbonReduction: CarbonReduction
  carbonMapDataFiltered: CarbonData | undefined
}

export interface PercentDataset {
  name: string
  average: number
}
