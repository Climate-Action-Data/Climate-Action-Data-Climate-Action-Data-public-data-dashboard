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

export interface IssuedRetiredGraphData {
  lastUpdate: string
  countriesData: IssuedRetiredDataCountry[]
}

export interface IssuedRetiredDataCountry {
  countryCode: string
  timeRanges: {
    year: number
    month: number
    issued: number
    retired: number
  }[]
}

export interface CreditsHistoryChartData {
  id: string
  data: { x: Date; y: number }[]
}

export interface FilteredCreditsHistoryData {
  chartData: CreditsHistoryChartData[]
  issued: number
  retired: number
}

export interface CreditsHistoryDataState {
  rawCreditsHistory?: EffectResponse<IssuedRetiredGraphData>
  filteredCreditsHistory: FilteredCreditsHistoryData | undefined
  dataFilters: DataFilters
}
