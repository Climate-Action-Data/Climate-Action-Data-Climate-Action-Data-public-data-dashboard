import { EffectResponse } from '@/@types/EffectResponse'
import { RawCountryCreditsHistory } from '@/@types/State'
import mockData from '../../assets/credit_history_data.json'

const SLEEP = 2000

export const getCreditsHistory = async (): Promise<EffectResponse<RawCountryCreditsHistory[]>> => {
  try {
    await new Promise((f) => setTimeout(f, SLEEP))
    return {
      data: mockData,
    }
  } catch (error) {
    return { error: { code: `200`, message: `could not fetch data` } }
  }
}
