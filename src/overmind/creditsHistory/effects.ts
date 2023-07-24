import axios from 'axios'

import { EffectResponse } from '@/@types/EffectResponse'
import { DataFilters, FilteredCreditsHistoryData, IssuedRetiredDataCountry, IssuedRetiredGraphData } from '@/@types/State'
import { differenceInMonths, isBefore, startOfMonth } from 'date-fns'
import { SubRegion } from '@/@types/geojson'
import { generateCountryByRegion } from '@/utils/GenerateCountryByRegion'
import { TimeframesData } from '@/@types/Timeframe'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'

const SIX_MONTHS = 6
const TWELVE_MONTHS = 12

export const getCreditsHistory = async (): Promise<EffectResponse<IssuedRetiredGraphData>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<IssuedRetiredGraphData>
    axios
      .get(`${defaultDomain}/widgets/issued-retired-graph`, defaultHeaders)
      .then((body) => {
        if (body.data && body.data.lastUpdated && body.data.countriesData) {
          const mapData = body.data as IssuedRetiredGraphData

          result = { data: mapData }
        } else {
          result = { error: { code: body.status.toString(), message: body.statusText } }
        }
        resolve(result)
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not fetch data` } }
        resolve(result)
      })
  })
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
          (timeframe === TimeframesData.ONE_YEAR && differenceInMonths(today, formattedDateTime) <= TWELVE_MONTHS) ||
          (timeframe === TimeframesData.SIX_MONTHS && differenceInMonths(today, formattedDateTime) <= SIX_MONTHS) ||
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
