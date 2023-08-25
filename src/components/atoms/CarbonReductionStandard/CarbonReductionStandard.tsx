import { Flex, Box, Text, VStack } from '@chakra-ui/react'
import { ImportantText } from '../ImportantText/ImportantText'
import { Standard } from '@/@types/State'

interface CarbonReductionStandardProps {
  data: Standard[]
}

export const CarbonReductionStandard = (props: CarbonReductionStandardProps): React.JSX.Element => {
  const { data } = props
  const colorChart = [`green.600`, `green.700`, `green.800`]
  return (
    <Flex flexWrap="wrap" gap={[`20px`, `10px`]} alignItems={`start`} marginBottom={4}>
      {data.map((standard, idx) => (
        <VStack key={`${standard.name}`} textAlign={`center`} minW={[`80%`, `auto`]} flex={1}>
          <Box flex={1}>
            <ImportantText fontSize="30px" isNumeric color={colorChart[idx] ? colorChart[idx] : colorChart[colorChart.length - 1]}>
              {standard.average}
            </ImportantText>
            <Text as={`span`}>%</Text>
          </Box>
          <Text lineHeight="16px">{standard.name}</Text>
        </VStack>
      ))}
    </Flex>
  )
}
