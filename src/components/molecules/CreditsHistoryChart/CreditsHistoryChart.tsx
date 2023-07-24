import { FC } from 'react'

import { useAppState } from '@/overmind'
import CreditHistoryLineChart from '@/components/molecules/CreditsHistoryChart/CreditsHistoryLineChart'

const CreditsHistoryChart: FC = () => {
  const { filteredCreditsHistory } = useAppState().creditsHistory

  const chartDataPoints = filteredCreditsHistory?.chartData

  if (chartDataPoints) {
    return <CreditHistoryLineChart data={chartDataPoints} />
  }
  return <></>
}
export default CreditsHistoryChart
