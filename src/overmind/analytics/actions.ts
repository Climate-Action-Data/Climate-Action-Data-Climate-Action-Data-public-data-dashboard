import { Context } from '..';

interface SearchParams {
    region: string | null
    timeframe: string | null
}

export const getCarbonReduction = async (context: Context, searchParams: SearchParams = { region: null, timeframe: null }) => {

    const carbonData = await context.effects.analytics.getCarbonReduction()
    if (carbonData.data) {
        context.state.analytics.carbonReduction = carbonData.data
    }
}
