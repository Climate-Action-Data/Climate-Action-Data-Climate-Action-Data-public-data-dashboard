import { Context } from '@/overmind'
import { EffectResponse } from '@/@types/EffectResponse'
import { GovernanceResponseData } from '@/@types/State'
import { DatesFilter } from '@/@types/SearchFilterValues'

export const transformGovernanceDataToSearchFilterData = (context: Context, governanceData: EffectResponse<GovernanceResponseData>) => {
  if (governanceData.data) {
    context.state.searchFilters.allSearchFilterValues.searchFilterValues = {
      countries: governanceData.data.governanceData.countries,
      sectors: governanceData.data.governanceData.projectSector,
      standards: governanceData.data.governanceData.registries,
      methodologies: governanceData.data.governanceData.methodology,
    }
  }
}

export const setCountriesFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedSearchFilterValues.searchFilterValues.countries = selectedFilters
}

export const setSectorsFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedSearchFilterValues.searchFilterValues.sectors = selectedFilters
}

export const setStandardsFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedSearchFilterValues.searchFilterValues.standards = selectedFilters
}

export const setMethodologiesFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedSearchFilterValues.searchFilterValues.methodologies = selectedFilters
}

export const setCreditingPeriodFilter = (context: Context, filterDates: DatesFilter) => {
  context.state.searchFilters.selectedSearchFilterValues.searchFilterValues.creditingPeriod = filterDates
}

export const setKeywordSearch = (context: Context, keywordSearch: string) => {
  context.state.searchFilters.keywordSearch = keywordSearch
}

export const resetSearchFilters = (context: Context) => {
  context.state.searchFilters.selectedSearchFilterValues.searchFilterValues = {
    countries: [],
    sectors: [],
    standards: [],
    methodologies: [],
  }
}
