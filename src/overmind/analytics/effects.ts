import { EffectResponse } from '@/@types/EffectResponse'
import { CarbonMapData, CarbonReduction } from './state'
import data from '@/assets/map_dashboard_data.json'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'
import countriesContinentsMap from '@/assets/geo-map/countries-continents-mapping'
const SLEEP = 500

export const getCarbonReduction = async (): Promise<EffectResponse<CarbonReduction>> => {
  try {
    await new Promise((f) => setTimeout(f, SLEEP))
    const carbonMapHasCountryData: Map<string, boolean> = generateHasCountryData(data)
    console.dir(carbonMapHasCountryData)
    return {
      data: {
        carbonMapData: data,
        carbonMapHasCountryData,
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
