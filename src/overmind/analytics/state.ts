import { EffectResponse } from '@/@types/EffectResponse'

export interface CarbonReduction {
  activeProjects: number
  totalReduction: number
  annualEstReduction: number
  sectors: { label: string; value: number }[]
  standards: Record<string, number>
}

interface DataState {
  carbonReduction?: EffectResponse<CarbonReduction>
}

export const state: DataState = {
  carbonReduction: undefined,
}
