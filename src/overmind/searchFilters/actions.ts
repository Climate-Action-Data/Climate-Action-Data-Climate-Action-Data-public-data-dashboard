import { Context } from '@/overmind'
import { EffectResponse } from '@/@types/EffectResponse'
import { GovernanceResponseData } from '@/@types/State'
import { DatabaseQueryDirection, DatesFilter, ProjectSearchSortBy, UnitSearchSortBy, YearsFilter } from '@/@types/ProjectSearchFilterValues'

export const transformGovernanceDataToSearchFilterData = (context: Context, governanceData: EffectResponse<GovernanceResponseData>) => {
  if (governanceData.data) {
    context.state.searchFilters.allSearchFilterValues.searchFilterValues = {
      countries: governanceData.data.governanceData.countries,
      sectors: governanceData.data.governanceData.projectSector,
      projectStatus: governanceData.data.governanceData.registries,
      methodologies: governanceData.data.governanceData.methodology,
      unitStatus: governanceData.data.governanceData.unitStatus,
    }
  }
}

export const setProjectCountriesFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.countries = selectedFilters
}

export const setProjectSectorsFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.sectors = selectedFilters
}

export const setProjectStandardsFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.projectStatus = selectedFilters
}

export const setProjectMethodologiesFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.methodologies = selectedFilters
}

export const setProjectCreditingPeriodFilter = (context: Context, filterDates: DatesFilter) => {
  context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.creditingPeriod = filterDates
}

export const setKeywordSearch = (context: Context, keywordSearch: string) => {
  context.state.searchFilters.keywordSearch = keywordSearch
}

export const clearKeywordSearch = (context: Context) => {
  context.state.searchFilters.keywordSearch = ``
}

export const resetSearchFilters = (context: Context) => {
  context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues = {
    countries: [],
    sectors: [],
    projectStatus: [],
    methodologies: [],
    sortBy: ProjectSearchSortBy.RELEVANCE,
    direction: DatabaseQueryDirection.DESC,
  }
  context.state.searchFilters.selectedUnitSearchFilterValues.searchFilterValues = {
    countries: [],
    sectors: [],
    projectStatus: [],
    unitStatus: [],
    vintageYear: {},
    sortBy: UnitSearchSortBy.RELEVANCE,
    direction: DatabaseQueryDirection.DESC,
  }
}

export const setUnitStatusFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedUnitSearchFilterValues.searchFilterValues.unitStatus = selectedFilters
}

export const setUnitCountriesFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedUnitSearchFilterValues.searchFilterValues.countries = selectedFilters
}

export const setUnitStandardsFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedUnitSearchFilterValues.searchFilterValues.projectStatus = selectedFilters
}

export const setUnitSectorFilter = (context: Context, selectedFilters: string[]) => {
  context.state.searchFilters.selectedUnitSearchFilterValues.searchFilterValues.sectors = selectedFilters
}

export const setUnitVintageYearFilter = (context: Context, selectedFilters: YearsFilter) => {
  context.state.searchFilters.selectedUnitSearchFilterValues.searchFilterValues.vintageYear = selectedFilters
}
export const setSortByProject = (context: Context, { sortBy, direction }: { sortBy: ProjectSearchSortBy; direction: DatabaseQueryDirection }) => {
  console.log(`setSortByProject`, sortBy, direction)
  context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.sortBy = sortBy
  context.state.searchFilters.selectedProjectSearchFilterValues.searchFilterValues.direction = direction
}

export const setSortByUnit = (context: Context, { sortBy, direction }: { sortBy: UnitSearchSortBy; direction: DatabaseQueryDirection }) => {
  context.state.searchFilters.selectedUnitSearchFilterValues.searchFilterValues.sortBy = sortBy
  context.state.searchFilters.selectedUnitSearchFilterValues.searchFilterValues.direction = direction
}
