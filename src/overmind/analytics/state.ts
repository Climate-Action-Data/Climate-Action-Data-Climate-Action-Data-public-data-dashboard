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

const defaultCarbonReduction: CarbonReduction = {
    activeProjects: 0,
    totalReduction: 0,
    annualEstReduction: 0,
    sectors: [],
    standards: []
}

export const state: DataState = {
    carbonReduction: defaultCarbonReduction,
}