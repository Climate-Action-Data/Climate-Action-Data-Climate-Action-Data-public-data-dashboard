import { Overmind } from 'overmind'

import { Context } from '@/overmind'
import { IssuedRetiredGraphData } from '@/@types/State'
import { SubRegion } from '@/@types/geojson'
import { TimeframesData } from '@/@types/Timeframe'
import { EffectResponse } from '@/@types/EffectResponse'

export const getCreditsHistoryFiltered = ({ state, effects }: Context) => {
  if (state.creditsHistory.rawCreditsHistory?.data) {
    state.creditsHistory.filteredCreditsHistory = effects.creditsHistory.generateFilteredCreditsHistory(state.creditsHistory.rawCreditsHistory?.data.countriesData, {
      region: state.creditsHistory.dataFilters.region,
      country: state.creditsHistory.dataFilters.country,
      timeframe: state.creditsHistory.dataFilters.timeframe,
    })
  }
}
export const getCreditsHistory = (context: Context, carbonCreditsHistory: EffectResponse<IssuedRetiredGraphData>) => {
  if (carbonCreditsHistory.data) {
    context.state.creditsHistory.rawCreditsHistory = carbonCreditsHistory
    context.actions.creditsHistory.getCreditsHistoryFiltered()
  }
}

export const setSubRegion = (context: Context, subRegion: string) => {
  context.state.creditsHistory.dataFilters.region = subRegion as SubRegion
  context.state.creditsHistory.dataFilters.country = undefined
}

export const setCountry = (context: Context, country: string) => {
  context.state.creditsHistory.dataFilters.country = country
}
export const setTimeframe = (context: Context, timeframe: TimeframesData) => {
  context.state.creditsHistory.dataFilters.timeframe = timeframe
}

export const onInitializeOvermind = async (context: Context, instance: Overmind<Context>) => {
  try {
    instance.addMutationListener((mutation: { path: string | string[] }) => {
      if (mutation.path.includes(`creditsHistory.dataFilters`)) {
        context.actions.creditsHistory.getCreditsHistoryFiltered()
      }
    })
  } catch (error: any) {
    console.log(`Could not track data`)
  }
}
