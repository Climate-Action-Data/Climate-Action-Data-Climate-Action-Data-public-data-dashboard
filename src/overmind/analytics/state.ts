import { EffectResponse } from '@/@types/EffectResponse'

export interface CarbonReduction {
  activeProjects: number
  totalReduction: number
  annualEstReduction: number
  sectors: { title: string; value: number }[]
  standards: { title: string; value: number }[]
}

interface DataState {
  carbonReduction?: EffectResponse<CarbonReduction>
}

export const state: DataState = {
  carbonReduction: undefined,
}
