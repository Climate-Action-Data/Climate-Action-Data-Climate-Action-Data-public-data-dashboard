import { Context } from '..'

interface SearchParams {
  region: string | null
  timeframe: string | null
}

export const getCarbonReduction = async (context: Context, searchParams: SearchParams = { region: null, timeframe: null }): Promise<void> => {
  const carbonData = await context.effects.analytics.getCarbonReduction()
  if (carbonData.data) {
    context.state.analytics.carbonReduction = carbonData
  } else {
  }
}

export const updateCarbonReduction = (context: Context) => {
  context.state.analytics.carbonReduction = {
    data: {
      activeProjects: 172,
      totalReduction: 5.96,
      annualEstReduction: 23.1,
      sectors: [
        { label: `Renewable Energy`, value: 35 },
        { label: `Waste Disposal`, value: 31 },
        { label: `Energy Efficiency`, value: 19 },
        { label: `Others`, value: 15 },
      ],
      standards: {
        vcs: 74,
        gcc: 15,
        eco: 10,
      },
    },
  }
}

export const restoreCarbonReduction = (context: Context) => {
  context.state.analytics.carbonReduction = {
    data: {
      activeProjects: 455,
      totalReduction: 7.96,
      annualEstReduction: 38.1,
      sectors: [
        { label: `Renewable Energy`, value: 40 },
        { label: `Waste Disposal`, value: 24 },
        { label: `Energy Efficiency`, value: 19 },
        { label: `Others`, value: 17 },
      ],
      standards: {
        vcs: 74,
        gcc: 15,
        eco: 10,
      },
    },
  }
}
