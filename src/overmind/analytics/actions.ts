import { SubRegion } from '@/@types/geojson'
import { Context } from '..'
import { TimeframesData } from '@/@types/Timeframe'

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

export const setHoverCountry = (context: Context, country: string) => {
  context.state.analytics.carbonReduction.carbonMapHoveredCountry = country
}

export const clearLocationFilters = (context: Context) => {
  context.state.analytics.carbonReduction.carbonMapDataFilters = {
    region: SubRegion.WORLD,
    timeframe: TimeframesData.MAX,
  }
  context.state.analytics.carbonReduction.carbonMapHoveredCountry = ``
  context.state.analytics.carbonReduction.carbonMapHoveredRegion = ``
}
