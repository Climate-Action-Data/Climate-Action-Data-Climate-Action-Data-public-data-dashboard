import { SearchFiltersStateData } from '@/@types/State'

export const state: SearchFiltersStateData = {
  allSearchFilterValues: {
    searchFilterValues: {
      unitStatus: [],
      projectStatus: [],
      methodologies: [],
      sectors: [],
      countries: [],
    },
    get isEmpty() {
      return (
        this.searchFilterValues.projectStatus?.length === 0 &&
        this.searchFilterValues.methodologies?.length === 0 &&
        this.searchFilterValues.sectors?.length === 0 &&
        this.searchFilterValues.countries?.length === 0
      )
    },
  },
  selectedProjectSearchFilterValues: {
    searchFilterValues: {
      projectStatus: [],
      methodologies: [],
      sectors: [],
      countries: [],
    },
  },
  selectedUnitSearchFilterValues: {
    searchFilterValues: {
      unitStatus: [],
      projectStatus: [],
      sectors: [],
      countries: [],
    },
  },
  keywordSearch: ``,
}
