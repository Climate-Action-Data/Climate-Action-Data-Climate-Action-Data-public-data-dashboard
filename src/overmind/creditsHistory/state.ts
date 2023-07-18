import { EffectResponse } from '@/@types/EffectResponse'
import { Serie } from '@nivo/line'

export interface CreditsHistory {
  chartData: Serie[]
  issued: number
  retired: number
}

interface CreditsHistoryState {
  creditsHistory?: EffectResponse<CreditsHistory>
}

export const state: CreditsHistoryState = {
  creditsHistory: undefined,
}
