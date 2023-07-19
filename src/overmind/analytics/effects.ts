import { EffectResponse } from '@/@types/EffectResponse'
import data from '@/assets/map_dashboard_data.json'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'
import countriesContinentsMap from '@/assets/geo-map/countries-continents-mapping'
import { CarbonData, CarbonMapData, PercentDataset } from '@/@types/State'
const SLEEP = 500

export const getCarbonReduction = async (): Promise<EffectResponse<CarbonMapData[]>> => {
  try {
    await new Promise((f) => setTimeout(f, SLEEP))
    return {
      data,
      error: undefined,
    }
  } catch (error) {
    console.log(error)
    return { error: { code: `200`, message: `could not fetch data` } }
  }
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

export const generateHasCountryData = (countryData: CarbonMapData[], timeframe: TimeframesData = TimeframesData.MAX) => {
  const hasCountryData = new Map<string, boolean>()
  countryData.map((country) => {
    if (country.timeRanges[timeframe] && country.timeRanges[timeframe].activeProjects > 0) {
      hasCountryData.set(country.countryCode, true)
    } else {
      hasCountryData.set(country.countryCode, false)
    }
  })
  return hasCountryData
}

export const combineCountryData = (countryData: CarbonMapData[], timeframe: TimeframesData = TimeframesData.MAX): CarbonData => {
  const combinedData: CarbonData = {
    activeProjects: 0,
    totalReductions: 0,
    estimatedReductions: 0,
    unitMetric: ``,
    sectors: [],
    standards: [],
  }
  const sectorsToCombine: PercentDataset[][] = []
  const standardsToCombine: PercentDataset[][] = []
  countryData.map((country) => {
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
  combinedData.standards = combinePercentages(standardsToCombine)
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

export const combinePercentages = (percentageSeries: PercentDataset[][]) => {
  const mergedDatasets: PercentDataset[] = []

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
  const combinedDataset: PercentDataset[] = mergedDatasets.map((dataset) => {
    // This is not a magic number as it is creating a percentage
    // eslint-disable-next-line no-magic-numbers
    const percentage = Number(((dataset.average / totalAverage) * 100).toFixed(2))
    return { name: dataset.name, average: percentage }
  })

  return combinedDataset
}
