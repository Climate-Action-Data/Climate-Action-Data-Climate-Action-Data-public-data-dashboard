import { Context } from '@/overmind'
import { FilteredCreditsHistoryData, RawCountryCreditsHistory } from '@/@types/State'

const generateFilteredCreditsHistory = (rawData: RawCountryCreditsHistory[]): FilteredCreditsHistoryData => {
  const result: FilteredCreditsHistoryData = {
    chartData: [
      {
        id: `issued`,
        data: [],
      },
      {
        id: `retired`,
        data: [],
      },
    ],
    issued: 0,
    retired: 0,
  }
  rawData.map((countryEntry) => {
    countryEntry.timeRanges.map((timeRangeEntry) => {
      const formattedDateTime = `${timeRangeEntry.year}-${timeRangeEntry.month}`
      const index = result.chartData[0].data.findIndex((e) => e.x === formattedDateTime)
      if (index < 0) {
        result.chartData[0].data.push({ x: formattedDateTime, y: timeRangeEntry.issued })
        result.chartData[1].data.push({ x: formattedDateTime, y: timeRangeEntry.retired })
      } else {
        result.chartData[0].data[index] = { x: formattedDateTime, y: result.chartData[0].data[index].y + timeRangeEntry.issued }
        result.chartData[1].data[index] = { x: formattedDateTime, y: result.chartData[1].data[index].y + timeRangeEntry.retired }
      }
      result.issued += timeRangeEntry.issued
      result.retired += timeRangeEntry.retired
    })
  })
  return result
}

export const getCreditsHistory = async (context: Context): Promise<void> => {
  const carbonCreditsHistory = await context.effects.creditsHistory.getCreditsHistory()
  if (carbonCreditsHistory.data) {
    context.state.creditsHistory.rawCreditsHistory = carbonCreditsHistory
    context.state.creditsHistory.filteredCreditsHistory = generateFilteredCreditsHistory(carbonCreditsHistory.data)
  }
}
