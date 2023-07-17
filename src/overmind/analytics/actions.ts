import { SubRegion } from '@/@types/geojson'
import { Context } from '..'

interface SearchParams {
  region: string | null
  timeframe: string | null
}

export const getCarbonReduction = async (context: Context, searchParams: SearchParams = { region: null, timeframe: null }): Promise<void> => {
  const carbonData = await context.effects.analytics.getCarbonReduction()
  if (carbonData.data) {
    context.state.analytics.carbonReduction = carbonData
  }
}

export const setSubRegion = (context: Context, subRegion: string) => {
  if (context.state.analytics?.carbonReduction?.data) {
    context.state.analytics.carbonReduction.data.carbonMapSelectedRegion = subRegion as SubRegion
  }
}

export const setHoverSubRegion = (context: Context, subRegion: string) => {
  if (context.state.analytics?.carbonReduction?.data) {
    context.state.analytics.carbonReduction.data.carbonMapHoveredRegion = subRegion
  }
}

export const updateCarbonReduction = (context: Context) => {
  context.state.analytics.carbonReduction = {
    data: {
      carbonMapData: [],
      carbonMapHasCountryData: new Map<string, boolean>(),
      activeProjects: 172,
      totalReduction: 5.96,
      annualEstReduction: 23.1,
      sectors: [
        { label: `Renewable Energy`, value: 35 },
        { label: `Waste Disposal`, value: 31 },
        { label: `Energy Efficiency`, value: 19 },
        { label: `Others`, value: 15 },
      ],
      standards: {
        vcs: 74,
        gcc: 15,
        eco: 10,
      },
    },
  }
}

export const restoreCarbonReduction = (context: Context) => {
  context.state.analytics.carbonReduction = {
    data: {
      carbonMapHasCountryData: new Map<string, boolean>(),
      carbonMapData: [],
      activeProjects: 455,
      totalReduction: 7.96,
      annualEstReduction: 38.1,
      sectors: [
        { label: `Renewable Energy`, value: 40 },
        { label: `Waste Disposal`, value: 24 },
        { label: `Energy Efficiency`, value: 19 },
        { label: `Others`, value: 17 },
      ],
      standards: {
        vcs: 74,
        gcc: 15,
        eco: 10,
      },
    },
  }
}
