import { Context } from '@/overmind'

export const getCreditsHistory = async (context: Context): Promise<void> => {
  const carbonCreditsHistory = await context.effects.creditsHistory.getCreditsHistory()
  if (carbonCreditsHistory.data) {
    context.state.creditsHistory.rawCreditsHistory = carbonCreditsHistory.data
    context.state.creditsHistory.filteredCreditsHistory = {
      chartData: [
        {
          id: `issued`,
          data: [
            { x: `2023-01`, y: 2508940 },
            { x: `2023-02`, y: 3001230 },
            { x: `2023-03`, y: 4200000 },
            { x: `2023-04`, y: 7500000 },
            { x: `2023-05`, y: 6002300 },
            { x: `2023-06`, y: 8002131 },
            { x: `2023-07`, y: 8400000 },
          ],
        },
        {
          id: `retired`,
          data: [
            { x: `2023-01`, y: 4900000 },
            { x: `2023-02`, y: 2800000 },
            { x: `2023-03`, y: 2700000 },
            { x: `2023-04`, y: 4500000 },
            { x: `2023-05`, y: 4000000 },
            { x: `2023-06`, y: 3000000 },
            { x: `2023-07`, y: 5000000 },
          ],
        },
      ],
      issued: 7960000,
      retired: 4650000,
    }
  }
}
