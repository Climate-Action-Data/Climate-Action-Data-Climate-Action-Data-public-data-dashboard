import { Context } from '@/overmind'

export const getCreditsHistory = async (context: Context): Promise<void> => {
  const carbonCreditsHistory = await context.effects.creditsHistory.getCreditsHistory()
  if (carbonCreditsHistory.data) {
    context.state.creditsHistory.creditsHistory = carbonCreditsHistory
  }
}
