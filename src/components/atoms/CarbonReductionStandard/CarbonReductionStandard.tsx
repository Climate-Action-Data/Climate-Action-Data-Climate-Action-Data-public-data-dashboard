import { Flex, Box, Text } from '@chakra-ui/react'
import { ImportantText } from '../ImportantText/ImportantText'
import { Standard } from '@/@types/State'

interface CarbonReductionStandardProps {
  data: Standard[]
}

export const CarbonReductionStandard = (props: CarbonReductionStandardProps): React.JSX.Element => {
  const { data } = props
  const colorChart = [`green.600`, `green.700`, `green.800`]
  return (
    <Flex alignItems={`center`} marginBottom={4}>
      {data.map((standard, idx) => (
        <Box key={`${standard.name}`} textAlign={`center`} marginX={`5px`} flex={1}>
          <ImportantText color={colorChart[idx] ? colorChart[idx] : colorChart[colorChart.length - 1]}>{standard.average}%</ImportantText>
          <Text>{standard.name}</Text>
        </Box>
      ))}
    </Flex>
  )
}
