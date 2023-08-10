import { FC } from 'react'
import { Square, Text } from '@chakra-ui/react'

interface FilterCountIndicatorProps {
  count: number
  isResultsPage?: boolean
}

export const FilterCountIndicator: FC<FilterCountIndicatorProps> = (props) => {
  const { count, isResultsPage } = props

  const generateStyle = () => {
    if (isResultsPage) {
      return { backgroundColor: `lightGray.50`, color: `green.900` }
    }
    return { backgroundColor: `green.900`, color: `lightGray.50` }
  }

  return (
    <Square size={`24px`} borderRadius={`4px`} {...generateStyle()}>
      <Text fontFamily={`heading`} fontSize={`12px`}>
        {count}
      </Text>
    </Square>
  )
}
