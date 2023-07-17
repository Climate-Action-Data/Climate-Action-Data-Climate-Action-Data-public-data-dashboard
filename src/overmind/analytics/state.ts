import { EffectResponse } from '@/@types/EffectResponse'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'

interface CarbonData {
  activeProjects: number
  totalReductions: number
  estimatedReductions: number
  unitMetric: string
  sectors: { name: string; average: number }[]
  standards: { name: string; average: number }[]
}

export interface CarbonMapData {
  countryCode: string
  timeRanges: Record<TimeframesData, CarbonData>
}

export interface CarbonReduction {
  carbonMapData: CarbonMapData[]
  carbonMapHasCountryData: Map<string, boolean>
  carbonMapSelectedRegion?: SubRegion
  carbonMapHoveredRegion?: string
  activeProjects: number
  totalReduction: number
  annualEstReduction: number
  sectors: { title: string; value: number }[]
  standards: { title: string; value: number }[]
}

interface DataState {
  carbonReduction?: EffectResponse<CarbonReduction>
}

export const state: DataState = {
  carbonReduction: undefined,
}
