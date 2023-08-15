// import { getProjectSearchResults } from '@/overmind/projectResult/effects'
// import { getUnitsSearchResults } from '../unitResult/effects'

const DEFAUL_REQUEST_SIMULATION_TIME = 5000

export const exportProjectSearchResultToCSV = async (pattern: string): Promise<boolean> => {
  // sleep for 5 seconds
  //   await new Promise((resolve) => setTimeout(resolve, DEFAUL_REQUEST_SIMULATION_TIME))
  //   return await getProjectSearchResults(pattern)
  //     .then((response) => {
  //       if (response.data) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //     .catch((error) => {
  //       return false
  //     })
  return await new Promise((resolve) => setTimeout(() => true, DEFAUL_REQUEST_SIMULATION_TIME))
}

export const exportUnitSearchResultToCSV = async (pattern: string): Promise<boolean> => {
  //   return await getUnitsSearchResults(pattern)
  //     .then((response) => {
  //       if (response.data) {
  //         return true
  //       } else {
  //         return false
  //       }
  //     })
  //     .catch((error) => {
  //       return false
  //     })
  return await new Promise((resolve) => setTimeout(() => true, DEFAUL_REQUEST_SIMULATION_TIME))
}
