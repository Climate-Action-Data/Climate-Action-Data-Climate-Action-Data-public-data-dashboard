import { HStack, Flex, Text } from '@chakra-ui/react'
import { SectorPieChart } from '../SectorPieChart/SectorPieChart'

interface CarbonReductionSectorProps {
  colorChart: string[]
  data: { average: number; name: string }[]
}

export const CarbonReductionSector = ({ colorChart, data }: CarbonReductionSectorProps): React.JSX.Element => {
  return (
    <HStack spacing="24px">
      <Flex height="120px" width="120px" padding={0}>
        <SectorPieChart data={data.map((d) => ({ value: d.average, label: d.name }))} />
      </Flex>
      <Flex flexDirection={`column`} justifyContent={`space-evenly`} flex={1}>
        {data.map((sector, idx) => (
          <HStack spacing="8px" paddingY={1} key={`${sector.name}-1`}>
            <Text textAlign="right" alignSelf="start" minWidth="24px" fontWeight="500" color={colorChart[idx]} fontSize="sm" as="span">
              {sector.average}%
            </Text>
            <Text flex={1} fontSize="sm" as="span" fontWeight="400" color={colorChart[idx]}>
              {sector.name}
            </Text>
          </HStack>
        ))}
      </Flex>
    </HStack>
  )
}
