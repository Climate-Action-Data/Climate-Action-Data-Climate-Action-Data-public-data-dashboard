import axios from 'axios'

import { EffectResponse } from '@/@types/EffectResponse'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'
import countriesContinentsMap from '@/assets/geo-map/countries-continents-mapping'
import { CountryData, CountryPeriodData, MapData, Sector, Standard } from '@/@types/State'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'

export const getCarbonReduction = async (): Promise<EffectResponse<MapData>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<MapData>
    axios
      .get(`${defaultDomain}/v1/widgets/map`, defaultHeaders)
      .then((body) => {
        if (body.data && body.data.lastUpdated && body.data.countriesData) {
          const mapData = body.data as MapData
          result = { data: mapData }
        } else {
          result = { error: { code: body.status.toString(), message: body.statusText } }
        }
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not fetch data` } }
      })
      .finally(() => {
        resolve(result)
      })
  })
}

export const generateCountryByRegion = (region: Exclude<SubRegion, SubRegion.WORLD>) => {
  const countryList: string[] = []
  countriesContinentsMap.forEach((value, key) => {
    if (value === region) {
      countryList.push(key)
    }
  })
  return countryList
}

export const generateHasCountryData = (countryData: CountryData[], timeframe: TimeframesData = TimeframesData.MAX) => {
  const hasCountryData = new Map<string, boolean>()
  countryData.forEach((country) => {
    if (country.timeRanges[timeframe] && country.timeRanges[timeframe].activeProjects > 0) {
      hasCountryData.set(country.countryCode, true)
    } else {
      hasCountryData.set(country.countryCode, false)
    }
  })
  return hasCountryData
}

const TOP_THREE_STANDARDS = 3

export const combineCountryData = (countryData: CountryData[], timeframe: TimeframesData = TimeframesData.MAX): CountryPeriodData => {
  const combinedData: CountryPeriodData = {
    activeProjects: 0,
    totalReductions: 0,
    estimatedReductions: 0,
    unitMetric: ``,
    sectors: [],
    standards: [],
  }
  const sectorsToCombine: Sector[][] = []
  const standardsToCombine: Standard[][] = []
  countryData.forEach((country) => {
    if (country.timeRanges[timeframe]) {
      const currentData = country.timeRanges[timeframe]
      combinedData.activeProjects += currentData.activeProjects
      combinedData.totalReductions += currentData.totalReductions
      combinedData.estimatedReductions += currentData.estimatedReductions
      sectorsToCombine.push(currentData.sectors)
      standardsToCombine.push(currentData.standards)
    }
  })
  combinedData.sectors = combinePercentages(sectorsToCombine)
  combinedData.standards = combinePercentages(standardsToCombine).splice(0, TOP_THREE_STANDARDS)
  return combinedData
}

export const combineAverage = (averageSeries: number[]) => {
  let sum = 0
  averageSeries.forEach((num) => {
    sum += num
  })
  return sum
}

const DEFAULT_NO_INDEX = -1

export const combinePercentages = (percentageSeries: Sector[][] | Standard[][]) => {
  const mergedDatasets: Sector[] | Standard[] = []

  for (const dataset of percentageSeries) {
    for (const entry of dataset) {
      const index = mergedDatasets.findIndex((item) => item.name === entry.name)
      if (index !== DEFAULT_NO_INDEX) {
        mergedDatasets[index].average += entry.average
      } else {
        mergedDatasets.push({ name: entry.name, average: entry.average })
      }
    }
  }
  const totalAverage = mergedDatasets.reduce((sum, dataset) => sum + dataset.average, 0)
  const combinedDataset: Sector[] | Standard[] = mergedDatasets.map((dataset) => {
    // This is not a magic number as it is creating a percentage
    // eslint-disable-next-line no-magic-numbers
    const percentage = Number(((dataset.average / totalAverage) * 100).toFixed(2))
    return { name: dataset.name, average: percentage }
  })

  combinedDataset.sort((a, b) => b.average - a.average)

  return combinedDataset
}
