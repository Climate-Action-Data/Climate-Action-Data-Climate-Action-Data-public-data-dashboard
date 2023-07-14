import { useToken } from '@chakra-ui/react'
import { ResponsivePie } from '@nivo/pie'


interface SectorPieChartProps {
    colorChart: string[],
    data: { value: number, label: string }[]
}

export const SectorPieChart = ({ colorChart, data }: SectorPieChartProps): React.JSX.Element => {

    return <ResponsivePie
        data={data.map(((val, id) => ({ id, ...val })))}
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        innerRadius={0.6}
        padAngle={0}
        colors={colorChart.map(color => useToken("colors", color))}
        isInteractive={false}
        cornerRadius={0}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels={false}
        enableArcLabels={false}
    />
}