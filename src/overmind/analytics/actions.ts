import { SubRegion } from '@/@types/geojson'
import { Context } from '..'

interface SearchParams {
  region: string | null
  timeframe: string | null
}

export const getCarbonReduction = async (context: Context, searchParams: SearchParams = { region: null, timeframe: null }): Promise<void> => {
  const carbonData = await context.effects.analytics.getCarbonReduction()
  console.dir(carbonData)
  if (carbonData.data) {
    context.state.analytics.carbonReduction.carbonMapData = carbonData
    context.state.analytics.carbonReduction.carbonMapHasCountryData = context.effects.analytics.generateHasCountryData(carbonData.data)
  }
}

export const setSubRegion = (context: Context, subRegion: string) => {
  context.state.analytics.carbonReduction.carbonMapDataFilters.region = subRegion as SubRegion
}

export const setCountry = (context: Context, country: string) => {
  context.state.analytics.carbonReduction.carbonMapDataFilters.country = country
}

export const setHoverSubRegion = (context: Context, subRegion: string) => {
  context.state.analytics.carbonReduction.carbonMapHoveredRegion = subRegion
}
