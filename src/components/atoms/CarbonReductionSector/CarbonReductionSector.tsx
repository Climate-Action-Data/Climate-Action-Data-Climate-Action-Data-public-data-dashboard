import { Box, ColorProps, Flex, Text } from "@chakra-ui/react"
import { SectorPieChart } from "../SectorPieChart/SectorPieChart"

interface CarbonReductionSectorProps {
    colorChart: string[],
    data: { value: number, label: string }[]
}


export const CarbonReductionSector = ({ colorChart, data }: CarbonReductionSectorProps): React.JSX.Element => {
    return <Flex>
        <Flex height="150px" width="200px" padding={2}><SectorPieChart data={data} colorChart={colorChart} /></Flex>
        <Flex flexDirection={"column"} justifyContent={"space-evenly"} flex={1}>
            {data.map((sector, idx) => (
                <Box><Text fontWeight="500" color={colorChart[idx]}>{sector.value}% {sector.label}</Text></Box>
            ))}
        </Flex>
    </Flex>
}