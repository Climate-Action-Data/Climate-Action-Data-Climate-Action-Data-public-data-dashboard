import { EffectResponse } from './EffectResponse'
import { TimeframesData } from './Timeframe'
import { SubRegion } from './geojson'

export interface CountryPeriodData {
  activeProjects: number
  totalReductions: number
  estimatedReductions: number
  unitMetric: string
  sectors: Sector[]
  standards: Standard[]
}

export interface CountryData {
  countryCode: string
  timeRanges: Record<TimeframesData, CountryPeriodData>
}

export interface MapData {
  lastUpdated: string
  countriesData: CountryData[]
}

export interface DataFilters {
  region: SubRegion
  country?: string
  timeframe: TimeframesData
}

export interface CarbonReduction {
  carbonMapData?: EffectResponse<MapData>
  carbonMapHasCountryData: Map<string, boolean>
  carbonMapHoveredRegion: string
  carbonMapHoveredCountry: string
  carbonMapDataFilters: DataFilters
}

export interface DataState {
  carbonReduction: CarbonReduction
  carbonMapDataFiltered: CountryPeriodData | undefined
}

export interface Sector {
  name: string
  average: number
}

export interface Standard {
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
