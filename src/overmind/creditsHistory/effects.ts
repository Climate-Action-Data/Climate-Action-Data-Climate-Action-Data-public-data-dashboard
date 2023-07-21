import { EffectResponse } from '@/@types/EffectResponse'
import { DataFilters, FilteredCreditsHistoryData, IssuedRetiredDataCountry, IssuedRetiredGraphData } from '@/@types/State'
import mockData from '../../test/mock-data/credit_history_data'
import { differenceInMonths, isBefore, startOfMonth } from 'date-fns'
import { SubRegion } from '@/@types/geojson'
import { generateCountryByRegion } from '@/utils/GenerateCountryByRegion'
import { TimeframesData } from '@/@types/Timeframe'

const SLEEP = 2000

export const getCreditsHistory = async (): Promise<EffectResponse<IssuedRetiredGraphData>> => {
  try {
    await new Promise((f) => setTimeout(f, SLEEP))
    return { data: mockData }
  } catch (error) {
    return { error: { code: `200`, message: `could not fetch data` } }
  }
}

export const appendChartDataAndStat = (result: FilteredCreditsHistoryData, formattedDateTime: Date, issued: number, retired: number) => {
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

export const generateFilteredCreditsHistory = (rawData: IssuedRetiredDataCountry[], dataFilters: DataFilters): FilteredCreditsHistoryData => {
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

  rawData.forEach((countryEntry) => {
    if (region === SubRegion.WORLD || (country == undefined && generateCountryByRegion(region).includes(countryEntry.countryCode)) || countryEntry.countryCode == country) {
      countryEntry.timeRanges.forEach((timeRangeEntry) => {
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
