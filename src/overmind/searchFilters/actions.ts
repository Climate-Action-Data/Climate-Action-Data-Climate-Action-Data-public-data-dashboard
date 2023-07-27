import { Context } from '@/overmind'
import { EffectResponse } from '@/@types/EffectResponse'
import { GovernanceResponseData } from '@/@types/State'

export const transformGovernanceDataToSearchFilterData = (context: Context, governanceData: EffectResponse<GovernanceResponseData>) => {
  console.log(governanceData.data)
  if (governanceData.data) {
    context.state.searchFilters.countries = governanceData.data.governanceData.countries
    context.state.searchFilters.sectors = governanceData.data.governanceData.projectSector
    context.state.searchFilters.standards = governanceData.data.governanceData.registries
    context.state.searchFilters.methodologies = governanceData.data.governanceData.methodology
    context.state.searchFilters.projectStatuses = governanceData.data.governanceData.projectStatusValues
  }
}
