export interface CarbonReduction {
    activeProjects: number
    totalReduction: number
    annualEstReduction: number
    sectors: { title: string, value: number }[]
    standards: { title: string, value: number }[]
}

interface DataState {
    carbonReduction: CarbonReduction | undefined
}

export const state: DataState = {
    carbonReduction: undefined,
}