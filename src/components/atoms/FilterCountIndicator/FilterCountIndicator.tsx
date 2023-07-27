import { FC } from 'react'
import { Circle, Text } from '@chakra-ui/react'

interface FilterCountIndicatorProps {
  count: number
}

export const FilterCountIndicator: FC<FilterCountIndicatorProps> = (props) => {
  const { count } = props

  return (
    <Circle size={`24px`} bg={`black`} color={`white`}>
      <Text fontFamily={`aeonikFono`} fontSize={`12px`}>
        {count}
      </Text>
    </Circle>
  )
}
