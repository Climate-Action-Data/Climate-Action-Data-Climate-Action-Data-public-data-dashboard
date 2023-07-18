import { EffectResponse } from '@/@types/EffectResponse'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'
import { derived } from 'overmind'

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

interface DataFilters {
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

interface DataState {
  carbonReduction: CarbonReduction
  carbonMapDataFiltered: CarbonData | undefined
}

export const state: DataState = {
  carbonReduction: {
    carbonMapHasCountryData: new Map<string, boolean>(),
    carbonMapDataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
    carbonMapHoveredRegion: ``,
    carbonMapHoveredCountry: ``,
  },
  carbonMapDataFiltered: derived((state: DataState) => {
    const result: CarbonData | undefined = {
      activeProjects: 172,
      totalReductions: 5.96,
      estimatedReductions: 23.1,
      unitMetric: `tn`,
      sectors: [
        { name: `Renewable Energy`, average: 35 },
        { name: `Waste Disposal`, average: 31 },
        { name: `Energy Efficiency`, average: 19 },
        { name: `Others`, average: 15 },
      ],
      standards: [
        { name: `vcs`, average: 74 },
        { name: `gcc`, average: 15 },
        { name: `eco`, average: 10 },
      ],
    }
    if (state.carbonReduction.carbonMapData?.data) {
      if (state.carbonReduction.carbonMapDataFilters.country) {
        const mapData = state.carbonReduction.carbonMapData.data.find((country) => country.countryCode === state.carbonReduction.carbonMapDataFilters.country)
        if (mapData?.timeRanges[state.carbonReduction.carbonMapDataFilters.timeframe]) {
          return mapData?.timeRanges[state.carbonReduction.carbonMapDataFilters.timeframe]
        }
      } else {
      }
    }
    return result
  }),
}
