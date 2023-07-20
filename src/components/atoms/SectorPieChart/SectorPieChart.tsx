import { ResponsivePie } from '@nivo/pie'
interface SectorPieChartProps {
  data: { value: number; label: string }[]
}

const colorChartDefault = [`green.600`, `green.700`, `green.800`, `lightGray.500`]
export const SectorPieChart = ({ data }: SectorPieChartProps): React.JSX.Element => {
  return (
    <ResponsivePie
      data={data.map((val, id) => ({ id, ...val }))}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      innerRadius={0.6}
      padAngle={0}
      colors={colorChartDefault}
      isInteractive={false}
      cornerRadius={0}
      activeOuterRadiusOffset={8}
      borderWidth={0}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      tooltip={(data) => {
        return <Tooltip>{data.datum.label}</Tooltip>
      }}
    />
  )
}
