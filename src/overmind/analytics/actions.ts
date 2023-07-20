import { SubRegion } from '@/@types/geojson'
import { Context } from '..'
import { TimeframesData } from '@/@types/Timeframe'
import { CarbonData, CarbonMapData } from '@/@types/State'
import { Overmind } from 'overmind'
import { EffectResponse } from '@/@types/EffectResponse'

export const getCarbonReduction = async (context: Context, carbonData: EffectResponse<CarbonMapData[]>): Promise<void> => {
  if (carbonData.data) {
    context.state.analytics.carbonReduction.carbonMapData = carbonData
    context.state.analytics.carbonReduction.carbonMapHasCountryData = context.effects.analytics.generateHasCountryData(carbonData.data)
    context.actions.analytics.getCarbonMapDataFiltered()
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

export const setTimeframe = (context: Context, timeframe: TimeframesData) => {
  context.state.analytics.carbonReduction.carbonMapDataFilters.timeframe = timeframe
}

export const setTestingCarbonMapDataFiltered = (context: Context, carbonMapDataFiltered: CarbonData | undefined) => {
  context.state.analytics.carbonMapDataFiltered = carbonMapDataFiltered
}

export const getCarbonMapDataFiltered = ({ state, effects }: Context) => {
  let result: CarbonData | undefined = undefined
  const currentData = state.analytics.carbonReduction
  if (currentData.carbonMapData?.data) {
    if (currentData.carbonMapDataFilters.country && currentData.carbonMapData?.data) {
      const mapData = currentData.carbonMapData.data.find((country) => country.countryCode === currentData.carbonMapDataFilters.country)
      if (mapData?.timeRanges[currentData.carbonMapDataFilters.timeframe]) {
        result = mapData.timeRanges[currentData.carbonMapDataFilters.timeframe]
      }
    } else if (currentData.carbonMapDataFilters.region !== SubRegion.WORLD) {
      const countryList = effects.analytics.generateCountryByRegion(currentData.carbonMapDataFilters.region)
      result = effects.analytics.combineCountryData(
        currentData.carbonMapData.data.filter((countryData) => countryList.includes(countryData.countryCode)),
        currentData.carbonMapDataFilters.timeframe,
      )
    } else {
      result = effects.analytics.combineCountryData(currentData.carbonMapData.data, currentData.carbonMapDataFilters.timeframe)
    }
  }
  state.analytics.carbonMapDataFiltered = result ? { ...result } : result
}

export const clearLocationFilters = (context: Context) => {
  context.state.analytics.carbonReduction.carbonMapDataFilters = {
    region: SubRegion.WORLD,
    timeframe: TimeframesData.MAX,
  }
  context.state.analytics.carbonReduction.carbonMapHoveredCountry = ``
  context.state.analytics.carbonReduction.carbonMapHoveredRegion = ``
}

export const onInitializeOvermind = async ({ state, actions }: Context, instance: Overmind<Context>) => {
  try {
    instance.addMutationListener((mutation: { path: string | string[] }) => {
      if (mutation.path.includes(`analytics.carbonReduction.carbonMapDataFilters`)) {
        actions.analytics.getCarbonMapDataFiltered()
      }
    })
  } catch (error: any) {
    console.log(`Could not track data`)
  }
}
