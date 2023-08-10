import { Context } from '@/overmind'
import { EffectResponse } from '@/@types/EffectResponse'
import { UnitSearchResponse } from '@/@types/UnitSearchResult'

export const setUnitResults = (context: Context, units: EffectResponse<UnitSearchResponse>) => {
  context.state.unitResult.unitResults = units
}
