import { EffectResponse } from './EffectResponse'
import { ProjectSearchResponse } from './ProjectSearchResult'
import { TimeframesData } from './Timeframe'
import { UnitSearchResponse } from './UnitSearchResult'
import { SubRegion } from './geojson'
import { AllSearchFilterValues, ProjectSearchFilterValues, UnitSearchFilterValues } from '@/@types/ProjectSearchFilterValues'

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
  projectResults?: EffectResponse<ProjectSearchResponse>
}

export interface UnitResultState {
  unitResults?: EffectResponse<UnitSearchResponse>
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
  allSearchFilterValues: { searchFilterValues: AllSearchFilterValues; readonly isEmpty: boolean }
  selectedProjectSearchFilterValues: { searchFilterValues: ProjectSearchFilterValues }
  selectedUnitSearchFilterValues: { searchFilterValues: UnitSearchFilterValues }
  keywordSearch: string
}
