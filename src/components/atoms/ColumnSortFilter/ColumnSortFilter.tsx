import { VStack } from '@chakra-ui/react'
import { SortDownIcon } from '../SortDownIcon/SortDownIcon'
import { SortUpIcon } from '../SortUpIcon/SortUpIcon'

interface ColumnSortFilterProps {
  onSortAsc?: () => void
  onSortDesc?: () => void
}

export const ColumnSortFilter = (props: ColumnSortFilterProps) => {
  const { onSortAsc, onSortDesc } = props

  return (
    <VStack justifyContent="center" gap="2px" height="20px">
      <SortUpIcon data-testid="sortAsc" onClick={() => (onSortAsc ? onSortAsc() : undefined)} _hover={{ cursor: `pointer` }} />
      <SortDownIcon data-testid="sortDesc" onClick={() => (onSortDesc ? onSortDesc() : undefined)} _hover={{ cursor: `pointer` }} />
    </VStack>
  )
}
