import { Overmind } from 'overmind'
import { differenceInMonths, isBefore, startOfMonth } from 'date-fns'

import { Context } from '@/overmind'
import { DataFilters, FilteredCreditsHistoryData, IssuedRetiredDataCountry, IssuedRetiredGraphData } from '@/@types/State'
import { SubRegion } from '@/@types/geojson'
import { TimeframesData } from '@/@types/Timeframe'
import { generateCountryByRegion } from '@/utils/GenerateCountryByRegion'
import { EffectResponse } from '@/@types/EffectResponse'

const appendChartDataAndStat = (result: FilteredCreditsHistoryData, formattedDateTime: Date, issued: number, retired: number) => {
  const index = result.chartData[0].data.findIndex((e) => e.x === formattedDateTime)
  if (index < 0) {
    result.chartData[0].data.push({ x: formattedDateTime, y: issued })
    result.chartData[1].data.push({ x: formattedDateTime, y: retired })
  } else {
    result.chartData[0].data[index] = { x: formattedDateTime, y: result.chartData[0].data[index].y + issued }
    result.chartData[1].data[index] = { x: formattedDateTime, y: result.chartData[1].data[index].y + retired }
  }
  result.issued += issued
  result.retired += retired
}

const generateFilteredCreditsHistory = (rawData: IssuedRetiredDataCountry[], dataFilters: DataFilters): FilteredCreditsHistoryData => {
  const today = startOfMonth(new Date())
  const { country, region, timeframe } = dataFilters

  const result: FilteredCreditsHistoryData = {
    chartData: [
      {
        id: `issued`,
        data: [],
      },
      {
        id: `retired`,
        data: [],
      },
    ],
    issued: 0,
    retired: 0,
  }
  console.log(rawData)

  rawData.forEach((countryEntry) => {
    if (region === SubRegion.WORLD || (country == undefined && generateCountryByRegion(region).includes(countryEntry.countryCode)) || countryEntry.countryCode == country) {
      countryEntry.timeRanges.map((timeRangeEntry) => {
        const { year, retired, issued, month } = timeRangeEntry
        const formattedDateTime = new Date(year, month - 1)
        if (
          timeframe === TimeframesData.MAX ||
          // eslint-disable-next-line no-magic-numbers
          (timeframe === TimeframesData.ONE_YEAR && differenceInMonths(today, formattedDateTime) <= 12) ||
          // eslint-disable-next-line no-magic-numbers
          (timeframe === TimeframesData.SIX_MONTHS && differenceInMonths(today, formattedDateTime) <= 6) ||
          (timeframe === TimeframesData.ONE_MONTH && differenceInMonths(today, formattedDateTime) <= 1)
        ) {
          appendChartDataAndStat(result, formattedDateTime, issued, retired)
        }
      })
    }
  })
  // eslint-disable-next-line no-magic-numbers
  result.chartData[0].data.sort((a, b) => (isBefore(a.x, b.x) ? -1 : 1))
  // eslint-disable-next-line no-magic-numbers
  result.chartData[1].data.sort((a, b) => (isBefore(a.x, b.x) ? -1 : 1))
  return result
}

export const getCreditsHistory = (context: Context, carbonCreditsHistory: EffectResponse<IssuedRetiredGraphData>) => {
  if (carbonCreditsHistory.data) {
    context.state.creditsHistory.rawCreditsHistory = carbonCreditsHistory
    context.state.creditsHistory.filteredCreditsHistory = generateFilteredCreditsHistory(carbonCreditsHistory.data.countriesData, {
      region: SubRegion.WORLD,
      timeframe: TimeframesData.MAX,
    })
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

export const onInitializeOvermind = async ({ state, actions }: Context, instance: Overmind<Context>) => {
  try {
    instance.addMutationListener((mutation: { path: string | string[] }) => {
      if (mutation.path.includes(`creditsHistory.dataFilters`)) {
        state.creditsHistory.filteredCreditsHistory = generateFilteredCreditsHistory(
          state.creditsHistory.rawCreditsHistory?.data?.countriesData ?? [],
          state.creditsHistory.dataFilters,
        )
      }
    })
  } catch (error: any) {
    console.log(`Could not track data`)
  }
}
