import { CreditsHistoryChartData } from '@/@types/State'
import { ResponsiveLine } from '@nivo/line'
import { ScaleSpec } from '@nivo/scales'
import { AxisProps } from '@nivo/axes'
import { Aeonik } from '@/styles/fonts'

const CreditHistoryLineChart = (props: { data: CreditsHistoryChartData[] }) => {
  let tickCount = 0
  const maxTickCount = 12

  if (props.data[1].data.length > maxTickCount) {
    tickCount = maxTickCount
    console.log(`tickCount: ` + tickCount)
  } else {
    tickCount = props.data[1].data.length
    console.log(`tickCount: ` + tickCount)
  }
  const xScale: ScaleSpec = { type: `time` }

  const yScale: ScaleSpec = {
    type: `linear`,
    max: `auto`,
    stacked: false,
    reverse: false,
  }

  const axisBottom: AxisProps<string> = {
    tickSize: 0,
    tickPadding: 10,
    tickRotation: 0,
    tickValues: tickCount,
    legend: ``,
    legendOffset: 36,
    legendPosition: `middle`,
    format: `%b %y`,
  }

  const axisLeft: AxisProps = {
    tickSize: 0,
    tickPadding: 11,
    tickRotation: 0,
    legend: ``,
    legendOffset: -40,
    legendPosition: `middle`,
    format: ` >-.1s`,
    tickValues: 5,
  }

  return (
    <ResponsiveLine
      colors={[`#24BD63`, `#125E32`]}
      data={props.data}
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      xScale={xScale}
      yScale={yScale}
      yFormat=" >-.2s"
      xFormat={`time:%Y-%m-%d`}
      axisTop={null}
      axisRight={null}
      axisBottom={axisBottom}
      axisLeft={axisLeft}
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
      theme={{
        fontFamily: Aeonik.style.fontFamily,
      }}
    />
  )
}

export default CreditHistoryLineChart
