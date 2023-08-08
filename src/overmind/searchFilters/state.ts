import { SearchFiltersStateData } from '@/@types/State'

export const state: SearchFiltersStateData = {
  allSearchFilterValues: {
    searchFilterValues: {
      standards: [],
      methodologies: [],
      sectors: [],
      countries: [],
    },
    get isEmpty() {
      return (
        this.searchFilterValues.standards?.length === 0 &&
        this.searchFilterValues.methodologies?.length === 0 &&
        this.searchFilterValues.sectors?.length === 0 &&
        this.searchFilterValues.countries?.length === 0
      )
    },
  },
  selectedSearchFilterValues: {
    searchFilterValues: {
      standards: [],
      methodologies: [],
      sectors: [],
      countries: [],
    },
  },
  keywordSearch: ``,
}
