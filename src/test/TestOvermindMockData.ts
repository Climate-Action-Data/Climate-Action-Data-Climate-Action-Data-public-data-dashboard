import { CountryPeriodData, CreditsHistoryDataState, DataState, MapData, ProjectResultState } from '@/@types/State'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'
import MAP_DASHBOARD_MOCK_DATA from '@/test/mock-data/map_dashboard_data'
import CREDIT_HISTORY_MOCK_DATA from '@/test/mock-data/credit_history_data'
import { projectData } from '@/test/mock-data/projects_data'
import { lightFormat } from 'date-fns'

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
    carbonMapDataFilters: { region: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN, timeframe: TimeframesData.MAX, country: `COL` },
    carbonMapHoveredRegion: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN,
    carbonMapHoveredCountry: `FRA`,
  },
  carbonMapDataFiltered: CARBON_MAP_DATA_FILTERED,
}

const STATE_CARBON_FULL_REGION_COUNTRY_NO_HOVER: DataState = {
  carbonReduction: {
    carbonMapData: { data: MAP_DATA },
    carbonMapHasCountryData: new Map<string, boolean>(),
    carbonMapDataFilters: { region: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN, timeframe: TimeframesData.MAX, country: `COL` },
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

export const MockData = {
  CARBON_MAP_DATA_FILTERED,
  STATE_CARBON_FILTERED_UNDEFINED_MAP_DATA_UNDEFINED,
  STATE_CARBON_FILTERED_UNDEFINED,
  STATE_CARBON_FULL,
  STATE_CARBON_FULL_REGION_COUNTRY,
  STATE_CARBON_FULL_REGION_COUNTRY_NO_HOVER,
  CREDIT_HISTORY_CHART_DATA,
  CREDIT_HISTORY_DATA,
  CREDIT_HISTORY_DATA_EMPTY_CHART,
}
const formatDate = (date: string) => {
  return lightFormat(new Date(date), `yyyy/MM/dd`)
}

export const PROJECT_SEARCH_RESULT_EMPTY: ProjectResultState = {}

export const PROJECT_TEST_SAMPLE = 21
export const PROJECT_SEARCH_RESULT: ProjectResultState = {
  projectResults: {
    data: projectData
      .map((project) => ({
        name: project.projectName,
        id: project.projectId,
        company: project.projectDeveloper,
        standard: project.currentRegistry,
        methodology: project.methodology,
        sector: project.sector,
        country: project.country ?? undefined,
        status: project.projectStatus,
        creditingPeriod:
          project.creditingPeriodStart && project.creditingPeriodEnd ? `${formatDate(project.creditingPeriodStart)} - ${formatDate(project.creditingPeriodEnd)}` : undefined,
        annualEst: project.annualEst ?? undefined,
        annualIssued: project.annualIssued ?? undefined,
        annualRetired: project.annualRetired ?? undefined,
        annualAvailable: project.annualIssued && project.annualRetired ? project.annualIssued - project.annualRetired : undefined,
      }))
      .slice(0, PROJECT_TEST_SAMPLE),
  },
}
