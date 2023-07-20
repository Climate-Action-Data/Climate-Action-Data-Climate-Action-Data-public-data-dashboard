import { SubRegion } from '@/@types/geojson'
import countriesContinentsMap from '@/assets/geo-map/countries-continents-mapping'

export const generateCountryByRegion = (region: Exclude<SubRegion, SubRegion.WORLD>) => {
  const countryList: string[] = []
  countriesContinentsMap.forEach((value, key) => {
    if (value === region) {
      countryList.push(key)
    }
  })
  return countryList
}
