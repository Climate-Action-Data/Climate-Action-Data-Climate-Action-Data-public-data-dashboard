import { CountryPeriodData, CreditsHistoryDataState, DataState, MapData, ProjectResultState, SearchFiltersStateData, UnitResultState } from '@/@types/State'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'
import MAP_DASHBOARD_MOCK_DATA from '@/test/mock-data/map_dashboard_data'
import CREDIT_HISTORY_MOCK_DATA from '@/test/mock-data/credit_history_data'
import { projectData } from '@/test/mock-data/projects_data'
import { projectDetail } from './mock-data/project_detail'
import { ProjectDetails } from '@/@types/ProjectDetails'
import { unitsData } from './mock-data/units_data'
import { Unit } from '@/@types/Unit'
import { unitDetail } from './mock-data/unit_detail'
import { DatabaseQueryDirection, UnitSearchSortBy, ProjectSearchSortBy } from '@/@types/ProjectSearchFilterValues'

const CARBON_MAP_DATA_FILTERED: CountryPeriodData = {
  activeProjects: 200,
  totalReductions: 201203,
  estimatedReductions: 201203,
  unitMetric: `tCO2`,
  sectors: [
    { name: `Renewable Energy`, average: 40 },
    { name: `Waste Disposal`, average: 24 },
    { name: `Energy Efficiency`, average: 19 },
    { name: `Others`, average: 17 },
  ],
  standards: [
    { name: `ECO`, average: 50 },
    { name: `GCC`, average: 50 },
  ],
}

const MAP_DATA: MapData = {
  lastUpdated: `2023-07-21T05:55:20.621Z`,
  countriesData: MAP_DASHBOARD_MOCK_DATA,
}
const STATE_CARBON_FULL: DataState = {
  carbonReduction: {
    carbonMapData: { data: MAP_DATA },
    carbonMapHasCountryData: new Map<string, boolean>(),
    carbonMapDataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
    carbonMapHoveredRegion: ``,
    carbonMapHoveredCountry: ``,
  },
  carbonMapDataFiltered: CARBON_MAP_DATA_FILTERED,
}

const STATE_CARBON_FILTERED_UNDEFINED_MAP_DATA_UNDEFINED: DataState = {
  carbonReduction: {
    carbonMapHasCountryData: new Map<string, boolean>(),
    carbonMapDataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
    carbonMapHoveredRegion: ``,
    carbonMapHoveredCountry: ``,
  },
  carbonMapDataFiltered: undefined,
}

const STATE_CARBON_FILTERED_UNDEFINED: DataState = {
  carbonReduction: {
    carbonMapData: { data: MAP_DATA },
    carbonMapHasCountryData: new Map<string, boolean>(),
    carbonMapDataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
    carbonMapHoveredRegion: ``,
    carbonMapHoveredCountry: ``,
  },
  carbonMapDataFiltered: undefined,
}

const STATE_CARBON_FULL_REGION_COUNTRY: DataState = {
  carbonReduction: {
    carbonMapData: { data: MAP_DATA },
    carbonMapHasCountryData: new Map<string, boolean>(),
    carbonMapDataFilters: {
      region: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN,
      timeframe: TimeframesData.MAX,
      country: `COL`,
    },
    carbonMapHoveredRegion: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN,
    carbonMapHoveredCountry: `FRA`,
  },
  carbonMapDataFiltered: CARBON_MAP_DATA_FILTERED,
}

const STATE_CARBON_FULL_REGION_COUNTRY_NO_HOVER: DataState = {
  carbonReduction: {
    carbonMapData: { data: MAP_DATA },
    carbonMapHasCountryData: new Map<string, boolean>(),
    carbonMapDataFilters: {
      region: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN,
      timeframe: TimeframesData.MAX,
      country: `COL`,
    },
    carbonMapHoveredRegion: ``,
    carbonMapHoveredCountry: ``,
  },
  carbonMapDataFiltered: CARBON_MAP_DATA_FILTERED,
}

const CREDIT_HISTORY_CHART_DATA = [
  /* eslint-disable no-magic-numbers */
  {
    id: `issued`,
    data: [
      { x: new Date(2023, 3), y: 211306 },
      { x: new Date(2023, 4), y: 30115653 },
      { x: new Date(2023, 5), y: 110387057 },
    ],
  },
  {
    id: `retired`,
    data: [
      { x: new Date(2023, 3), y: 118885 },
      { x: new Date(2023, 4), y: 26355689 },
      { x: new Date(2023, 5), y: 25333735 },
    ],
  },
  /* eslint-enable no-magic-numbers */
]

const CREDIT_HISTORY_DATA: CreditsHistoryDataState = {
  dataFilters: { region: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN, timeframe: TimeframesData.MAX, country: `COL` },
  rawCreditsHistory: { data: CREDIT_HISTORY_MOCK_DATA },
  filteredCreditsHistory: {
    chartData: CREDIT_HISTORY_CHART_DATA,
    issued: 140714016,
    retired: 51808309,
  },
}

const CREDIT_HISTORY_DATA_EMPTY_CHART: CreditsHistoryDataState = {
  dataFilters: { region: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN, timeframe: TimeframesData.MAX, country: `COL` },
  rawCreditsHistory: { data: CREDIT_HISTORY_MOCK_DATA },
  filteredCreditsHistory: {
    chartData: [
      {
        id: `issued`,
        data: [],
      },
      {
        id: `retired`,
        data: [],
      },
    ],
    issued: 0,
    retired: 0,
  },
}

const SearchOptions = [`option 1`, `option 2`, `option 2`]
const SEARCH_FILTER_VALUES: SearchFiltersStateData = {
  selectedProjectSearchFilterValues: {
    searchFilterValues: {
      sectors: SearchOptions,
      methodologies: SearchOptions,
      projectStatus: SearchOptions,
      countries: SearchOptions,
      sortBy: ProjectSearchSortBy.RELEVANCE,
      direction: DatabaseQueryDirection.DESC,
    },
    isEmpty: false,
  },
  selectedUnitSearchFilterValues: {
    searchFilterValues: {
      sectors: SearchOptions,
      unitStatus: SearchOptions,
      projectStatus: SearchOptions,
      countries: SearchOptions,
      sortBy: UnitSearchSortBy.RELEVANCE,
      direction: DatabaseQueryDirection.DESC,
    },
    isEmpty: false,
  },
  allSearchFilterValues: {
    searchFilterValues: {
      unitStatus: SearchOptions,
      sectors: SearchOptions,
      methodologies: SearchOptions,
      projectStatus: SearchOptions,
      countries: SearchOptions,
    },
    isEmpty: false,
  },
  keywordSearch: ``,
}

export const MockData = {
  CARBON_MAP_DATA_FILTERED,
  SEARCH_FILTER_VALUES,
  STATE_CARBON_FILTERED_UNDEFINED_MAP_DATA_UNDEFINED,
  STATE_CARBON_FILTERED_UNDEFINED,
  STATE_CARBON_FULL,
  STATE_CARBON_FULL_REGION_COUNTRY,
  STATE_CARBON_FULL_REGION_COUNTRY_NO_HOVER,
  CREDIT_HISTORY_CHART_DATA,
  CREDIT_HISTORY_DATA,
  CREDIT_HISTORY_DATA_EMPTY_CHART,
}
export const PROJECT_SEARCH_RESULT_EMPTY: ProjectResultState = {}

export const PROJECT_TEST_SAMPLE = 21
export const PROJECT_SEARCH_RESULT: ProjectResultState = {
  projectResults: {
    data: { projects: projectData.slice(0, PROJECT_TEST_SAMPLE), totalCount: 99 },
  },
}
export const PROJECT_DETAIL: ProjectDetails = projectDetail
export const UNIT_DETAIL: Unit = unitDetail

export const UNIT_SEARCH_RESULT: UnitResultState = {
  unitResults: {
    data: { units: unitsData, totalCount: 99 },
  },
}
