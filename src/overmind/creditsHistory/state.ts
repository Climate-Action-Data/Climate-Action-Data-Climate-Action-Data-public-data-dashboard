import { CreditsHistoryDataState } from '@/@types/State'
import { SubRegion } from '@/@types/geojson'
import { TimeframesData } from '@/@types/Timeframe'

export const state: CreditsHistoryDataState = {
  filteredCreditsHistory: undefined,
  dataFilters: { region: SubRegion.WORLD, timeframe: TimeframesData.MAX },
}
