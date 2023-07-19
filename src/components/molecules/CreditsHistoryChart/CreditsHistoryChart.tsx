import { FC } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useAppState } from '@/overmind'

const CreditsHistoryChart: FC = () => {
  const format = new Intl.DateTimeFormat(`en-SG`, { month: `short` }).format
  const { filteredCreditsHistory } = useAppState().creditsHistory

  return filteredCreditsHistory ? (
    <ResponsiveLine
      colors={[`#24BD63`, `#125E32`]}
      data={filteredCreditsHistory.chartData}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      xScale={{ type: `point` }}
      yScale={{
        type: `linear`,
        max: `auto`,
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2s"
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
    />
  ) : (
    <></>
  )
}
export default CreditsHistoryChart
