import { FC } from 'react'
import { Square, Text } from '@chakra-ui/react'

interface FilterCountIndicatorProps {
  count: number
}

export const FilterCountIndicator: FC<FilterCountIndicatorProps> = (props) => {
  const { count } = props

  return (
    <Square size={`24px`} bg={`#364D3F`} color={`white`} borderRadius={`4px`}>
      <Text fontFamily={`aeonikFono`} fontSize={`12px`}>
        {count}
      </Text>
    </Square>
  )
}
