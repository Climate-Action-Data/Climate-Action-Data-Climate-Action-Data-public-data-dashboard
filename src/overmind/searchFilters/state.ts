import { SearchFiltersStateData } from '@/@types/State'

export const state: SearchFiltersStateData = {
  allSearchFilterValues: {
    searchFilterValues: {
      projectStatuses: [],
      standards: [],
      methodologies: [],
      sectors: [],
      countries: [],
    },
    get isEmpty() {
      return (
        this.searchFilterValues.projectStatuses?.length === 0 &&
        this.searchFilterValues.standards?.length === 0 &&
        this.searchFilterValues.methodologies?.length === 0 &&
        this.searchFilterValues.sectors?.length === 0 &&
        this.searchFilterValues.countries?.length === 0
      )
    },
  },
  selectedSearchFilterValues: {
    searchFilterValues: {
      projectStatuses: [],
      standards: [],
      methodologies: [],
      sectors: [],
      countries: [],
    },
  },
}
