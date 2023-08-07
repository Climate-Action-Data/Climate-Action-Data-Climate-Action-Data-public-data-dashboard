import { Context } from '@/overmind'
import { EffectResponse } from '@/@types/EffectResponse'
import { UnitSearchResult } from '@/@types/UnitSearchResult'

export const setUnitResults = (context: Context, units: EffectResponse<UnitSearchResult[]>) => {
  context.state.unitResult.unitResults = units
}
