import { DataState } from '@/@types/State'
import { TimeframesData } from '@/@types/Timeframe'
import { SubRegion } from '@/@types/geojson'

export const state: DataState = {
  carbonReduction: {
    carbonMapHasCountryData: new Map<string, boolean>(),
    carbonMapDataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
    carbonMapHoveredRegion: ``,
    carbonMapHoveredCountry: ``,
  },
  carbonMapDataFiltered: undefined,
}
