import { PropsWithChildren } from 'react'
import { createOvermindMock } from 'overmind'
import { Provider } from 'overmind-react'

import { config } from '@/overmind'
import { SubRegion } from '@/@types/geojson'
import { TimeframesData } from '@/@types/Timeframe'
import { CreditsHistoryDataState, DataState, ProjectResultState, SearchFiltersStateData } from '@/@types/State'

interface TestOvermindWrapperProps extends PropsWithChildren {
  analytics?: DataState
  creditsHistory?: CreditsHistoryDataState
  searchFilters?: SearchFiltersStateData
  projectResult?: ProjectResultState
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
      },
      isEmpty: true,
    },
    selectedProjectSearchFilterValues: {
      searchFilterValues: {
        projectStatus: [],
        methodologies: [],
        sectors: [],
        countries: [],
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

  const overmind = createOvermindMock(config, (state) => {
    state.analytics = carbonMapData
    state.creditsHistory = creditHistoryData
    state.searchFilters = searchFilters
    state.projectResult = projectResult
  })

  return <Provider value={overmind}>{actualProps.children}</Provider>
}
