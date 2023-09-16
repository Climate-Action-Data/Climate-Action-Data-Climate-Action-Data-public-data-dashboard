import { PropsWithChildren } from 'react'
import { createOvermindMock } from 'overmind'
import { Provider } from 'overmind-react'

import { config } from '@/overmind'
import { SubRegion } from '@/@types/geojson'
import { TimeframesData } from '@/@types/Timeframe'
import { CreditsHistoryDataState, DataState, ProfileState, ProjectResultState, SearchFiltersStateData } from '@/@types/State'
import { ProjectSearchSortBy, DatabaseQueryDirection, UnitSearchSortBy } from '@/@types/ProjectSearchFilterValues'

interface TestOvermindWrapperProps extends PropsWithChildren {
  analytics?: DataState
  creditsHistory?: CreditsHistoryDataState
  searchFilters?: SearchFiltersStateData
  projectResult?: ProjectResultState
  profile?: ProfileState
}

export const TestOvermindWrapper = (props: TestOvermindWrapperProps) => {
  const actualProps = {
    ...props,
  }

  const carbonMapData = props?.analytics ?? {
    carbonReduction: {
      carbonMapHasCountryData: new Map<string, boolean>(),
      carbonMapDataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
      carbonMapHoveredRegion: ``,
      carbonMapHoveredCountry: ``,
    },
    carbonMapDataFiltered: undefined,
  }

  const creditHistoryData = props?.creditsHistory ?? {
    filteredCreditsHistory: undefined,
    dataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
  }

  const searchFilters: SearchFiltersStateData = props?.searchFilters ?? {
    selectedUnitSearchFilterValues: {
      searchFilterValues: {
        projectStatus: [],
        sectors: [],
        countries: [],
        unitStatus: [],
        sortBy: UnitSearchSortBy.RELEVANCE,
        direction: DatabaseQueryDirection.DESC,
      },
      isEmpty: true,
    },
    selectedProjectSearchFilterValues: {
      searchFilterValues: {
        projectStatus: [],
        methodologies: [],
        sectors: [],
        countries: [],
        sortBy: ProjectSearchSortBy.RELEVANCE,
        direction: DatabaseQueryDirection.DESC,
      },
      isEmpty: true,
    },
    allSearchFilterValues: {
      searchFilterValues: {
        projectStatus: [],
        methodologies: [],
        sectors: [],
        countries: [],
        unitStatus: [],
      },
      isEmpty: true,
    },
    keywordSearch: ``,
  }

  const projectResult = props?.projectResult ?? {
    projectResults: undefined,
  }

  const userProfile = props?.profile ?? {
    userProfile: undefined,
  }

  const overmind = createOvermindMock(config, (state) => {
    state.analytics = carbonMapData
    state.creditsHistory = creditHistoryData
    state.searchFilters = searchFilters
    state.projectResult = projectResult
    state.profile = userProfile
  })

  return <Provider value={overmind}>{actualProps.children}</Provider>
}
