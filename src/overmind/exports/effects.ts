import { DEFAULT_EXPORT_MAXLINE } from '@/@types/State'
import { getProjectSearchResults } from '@/overmind/projectResult/effects'
import { getUnitResults } from '../unitResult/effects'

const DEFAUL_REQUEST_SIMULATION_TIME = 5000

export const exportProjectSearchResultToCSV = async (pattern: string, count: number = DEFAULT_EXPORT_MAXLINE) => {
  // sleep for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, DEFAUL_REQUEST_SIMULATION_TIME))
  return await getProjectSearchResults(pattern, 0, count)
    .then((response) => {
      if (response.data) {
        return true
      } else {
        return false
      }
    })
    .catch((error) => {
      return false
    })
}

export const exportUnitSearchResultToCSV = async (pattern: string, count: number = DEFAULT_EXPORT_MAXLINE) => {
  return await getUnitResults(pattern, 0, count)
    .then((response) => {
      if (response.data) {
        return true
      } else {
        return false
      }
    })
    .catch((error) => {
      return false
    })
}
