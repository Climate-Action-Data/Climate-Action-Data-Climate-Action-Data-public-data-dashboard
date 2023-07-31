import { EffectResponse } from './EffectResponse'
import { ProjectSearchResult } from './ProjectSearchResult'
import { TimeframesData } from './Timeframe'
import { SubRegion } from './geojson'
import { SearchFilterValues } from '@/@types/SearchFilterValues'

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
  lastUpdated: string
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

interface NivoLineDataPoint {
  x: Date
  y: number
}

export interface CreditsHistoryChartData {
  id: string
  data: NivoLineDataPoint[]
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
export interface ProjectResultState {
  projectResults?: EffectResponse<ProjectSearchResult[]>
}

export interface GovernanceResponseData {
  lastUpdated: string
  governanceData: GovernanceData
}

export interface GovernanceData {
  registries: string[]
  projectSector: string[]
  projectType: string[]
  coveredByNDC: string[]
  projectStatusValues: string[]
  unitMetric: string[]
  methodology: string[]
  validationBody: string[]
  countries: string[]
  ratingType: string[]
  unitType: string[]
  unitStatus: string[]
  correspondingAdjustmentDeclaration: string[]
  correspondingAdjustmentStatus: string[]
  labelType: string[]
  verificationBody: string[]
  projectTags: string[]
  unitTags: string[]
  coBenefits: string[]
}

export interface SearchFiltersStateData {
  allSearchFilterValues: { searchFilterValues: SearchFilterValues; readonly isEmpty: boolean }
  selectedSearchFilterValues: { searchFilterValues: SearchFilterValues }
}
