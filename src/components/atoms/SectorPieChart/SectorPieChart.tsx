import { ResponsivePie } from '@nivo/pie'
import { Tooltip } from '../Tooltip/Tooltip'

interface SectorPieChartProps {
  data: { value: number; label: string }[]
}

export const SectorPieChart = ({ data }: SectorPieChartProps): React.JSX.Element => {
  return (
    <ResponsivePie
      data={data.map((val, id) => ({ id, ...val }))}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      innerRadius={0.6}
      padAngle={0}
      colors={[`#125E32`, `#1B8E4A`, `#24BD63`, `#949DA1`]}
      cornerRadius={0}
      activeOuterRadiusOffset={2}
      borderWidth={0}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      tooltip={(data) => {
        return <Tooltip>{data.datum.label}</Tooltip>
      }}
    />
  )
}
