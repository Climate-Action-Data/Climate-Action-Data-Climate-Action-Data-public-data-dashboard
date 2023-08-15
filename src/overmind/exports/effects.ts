import { getProjectSearchResults } from '@/overmind/projectResult/effects'
import { getUnitResults } from '../unitResult/effects'

const DEFAUL_REQUEST_SIMULATION_TIME = 5000

export const exportProjectSearchResultToCSV = async (pattern: string) => {
  // sleep for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, DEFAUL_REQUEST_SIMULATION_TIME))
  return await getProjectSearchResults(pattern, 0)
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

export const exportUnitSearchResultToCSV = async (pattern: string) => {
  return await getUnitResults(pattern, 0)
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
