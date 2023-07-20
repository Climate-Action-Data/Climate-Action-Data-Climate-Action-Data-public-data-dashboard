import { CountryPeriodData, CreditsHistoryDataState, DataState, MapData } from '@/@types/State'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'

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

const CARBON_MAP_DATA = [
  {
    countryCode: `CHL`,
    timeRanges: {
      max: {
        activeProjects: 0,
        totalReductions: 0,
        estimatedReductions: 0,
        unitMetric: `tCO2e`,
        sectors: [
          {
            name: `Agriculture; forestry and fishing`,
            average: 46,
          },
          {
            name: `Agriculture, forestry and other land uses (AFOLU)`,
            average: 36,
          },
          {
            name: `Electricity; gas, steam and air conditioning supply`,
            average: 13,
          },
          {
            name: `Others`,
            average: 5,
          },
        ],
        standards: [],
      },
      twelveMonths: {
        activeProjects: 0,
        totalReductions: 0,
        estimatedReductions: 0,
        unitMetric: `tCO2e`,
        sectors: [],
        standards: [],
      },
      sixMonths: {
        activeProjects: 0,
        totalReductions: 0,
        estimatedReductions: 0,
        unitMetric: `tCO2e`,
        sectors: [],
        standards: [],
      },
      oneMonth: {
        activeProjects: 0,
        totalReductions: 0,
        estimatedReductions: 0,
        unitMetric: `tCO2e`,
        sectors: [],
        standards: [],
      },
    },
  },
  {
    countryCode: `COL`,
    timeRanges: {
      max: {
        activeProjects: 78,
        totalReductions: 140714016,
        estimatedReductions: 238757705,
        unitMetric: `tCO2e`,
        sectors: [
          {
            name: `Agriculture; forestry and fishing`,
            average: 56,
          },
          {
            name: `Agriculture, forestry and other land uses (AFOLU)`,
            average: 26,
          },
          {
            name: `Electricity; gas, steam and air conditioning supply`,
            average: 13,
          },
          {
            name: `Others`,
            average: 5,
          },
        ],
        standards: [
          {
            name: `EcoRegistry`,
            average: 74,
          },
          {
            name: `Biocarbon Registry S.A.S`,
            average: 26,
          },
        ],
      },
      twelveMonths: {
        activeProjects: 78,
        totalReductions: 140714016,
        estimatedReductions: 238757705,
        unitMetric: `tCO2e`,
        sectors: [
          {
            name: `Agriculture; forestry and fishing`,
            average: 56,
          },
          {
            name: `Agriculture, forestry and other land uses (AFOLU)`,
            average: 26,
          },
          {
            name: `Electricity; gas, steam and air conditioning supply`,
            average: 13,
          },
          {
            name: `Others`,
            average: 5,
          },
        ],
        standards: [
          {
            name: `EcoRegistry`,
            average: 74,
          },
          {
            name: `Biocarbon Registry S.A.S`,
            average: 26,
          },
        ],
      },
      sixMonths: {
        activeProjects: 78,
        totalReductions: 140714016,
        estimatedReductions: 238757705,
        unitMetric: `tCO2e`,
        sectors: [
          {
            name: `Agriculture; forestry and fishing`,
            average: 56,
          },
          {
            name: `Agriculture, forestry and other land uses (AFOLU)`,
            average: 26,
          },
          {
            name: `Electricity; gas, steam and air conditioning supply`,
            average: 13,
          },
          {
            name: `Others`,
            average: 5,
          },
        ],
        standards: [
          {
            name: `EcoRegistry`,
            average: 74,
          },
          {
            name: `Biocarbon Registry S.A.S`,
            average: 26,
          },
        ],
      },
      oneMonth: {
        activeProjects: 28,
        totalReductions: 14071016,
        estimatedReductions: 23857705,
        unitMetric: `tCO2e`,
        sectors: [
          {
            name: `Agriculture; forestry and fishing`,
            average: 46,
          },
          {
            name: `Agriculture, forestry and other land uses (AFOLU)`,
            average: 36,
          },
          {
            name: `Electricity; gas, steam and air conditioning supply`,
            average: 13,
          },
          {
            name: `Others`,
            average: 5,
          },
        ],
        standards: [
          {
            name: `EcoRegistry`,
            average: 74,
          },
          {
            name: `Biocarbon Registry S.A.S`,
            average: 26,
          },
        ],
      },
    },
  },
]

const MAP_DATA: MapData = {
  lastUpdated: `2023-07-21T05:55:20.621Z`,
  countriesData: CARBON_MAP_DATA,
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

const CREDIT_HISTORY_DATA: CreditsHistoryDataState = {
  dataFilters: { region: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN, timeframe: TimeframesData.MAX, country: `COL` },
  rawCreditsHistory: { data: CREDIT_HISTORY_CHART_DATA },
  filteredCreditsHistory: {
    /* eslint-disable no-magic-numbers */
    chartData: [
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
    ],
    /* eslint-enable no-magic-numbers */
    issued: 140714016,
    retired: 51808309,
  },
}

const CREDIT_HISTORY_DATA_EMPTY_CHART: CreditsHistoryDataState = {
  dataFilters: { region: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN, timeframe: TimeframesData.MAX, country: `COL` },
  rawCreditsHistory: { data: CREDIT_HISTORY_CHART_DATA },
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
  CARBON_MAP_DATA,
  STATE_CARBON_FILTERED_UNDEFINED_MAP_DATA_UNDEFINED,
  STATE_CARBON_FILTERED_UNDEFINED,
  STATE_CARBON_FULL,
  STATE_CARBON_FULL_REGION_COUNTRY,
  STATE_CARBON_FULL_REGION_COUNTRY_NO_HOVER,
  CREDIT_HISTORY_DATA,
  CREDIT_HISTORY_DATA_EMPTY_CHART,
}
