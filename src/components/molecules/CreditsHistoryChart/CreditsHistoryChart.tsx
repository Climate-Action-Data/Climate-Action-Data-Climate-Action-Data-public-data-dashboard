import { FC } from 'react'
import { useAppState } from '@/overmind'
import { ResponsiveLine } from '@nivo/line'

const CreditsHistoryChart: FC = () => {
  const format = new Intl.DateTimeFormat(`en-SG`, { month: `short`, year: `2-digit` }).format
  const { filteredCreditsHistory } = useAppState().creditsHistory

  const chartDataPoints = filteredCreditsHistory?.chartData
  if (chartDataPoints) {
    if (chartDataPoints[0].data.length > 0 || chartDataPoints[1].data.length > 0) {
      return (
        <ResponsiveLine
          colors={[`#24BD63`, `#125E32`]}
          data={chartDataPoints}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          xScale={{ type: `point` }}
          yScale={{
            type: `linear`,
            max: `auto`,
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2s"
          xFormat={(value) => format(new Date(value)).toLocaleUpperCase()}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            legend: ``,
            legendOffset: 36,
            legendPosition: `middle`,
            format: (value) => format(new Date(value)).toLocaleUpperCase(),
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 11,
            tickRotation: 0,
            legend: ``,
            legendOffset: -40,
            legendPosition: `middle`,
            format: ` >-.1s`,
            tickValues: 5,
          }}
          enableGridX={true}
          gridXValues={[0]}
          enableGridY={true}
          gridYValues={[0]}
          pointColor={{ from: `color`, modifiers: [] }}
          pointBorderColor={{ from: `serieColor` }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[]}
          animate={false}
        />
      )
    } else {
      return <>empty</>
    }
  }
  return <>Notloaded</>
}
export default CreditsHistoryChart
