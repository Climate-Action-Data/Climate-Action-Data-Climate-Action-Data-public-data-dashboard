import { ErrorResponse } from '@/@types/EffectResponse';
import { Context } from '..';

interface SearchParams {
    region: string | null
    timeframe: string | null
}

/**
 * Retrieve the carbon reduction data
 * @param context Prisma context allowing access to state, actions, effects
 * @param searchParams Search params to filter data
 * @returns Promise<boolean | ErrorResponse>
 */
export const getCarbonReduction = async (context: Context, searchParams: SearchParams = { region: null, timeframe: null }): Promise<boolean | ErrorResponse> => {
    // Retrieve data from the API
    const carbonData = await context.effects.analytics.getCarbonReduction()
    // Check if we have data
    if (carbonData.data) {
        // Set our state
        context.state.analytics.carbonReduction = carbonData.data
        return true
    } else {
        // Return our error
        return carbonData.error
    }
}
