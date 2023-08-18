import { VStack } from '@chakra-ui/react'
import { SortDownIcon } from '../SortDownIcon/SortDownIcon'
import { SortUpIcon } from '../SortUpIcon/SortUpIcon'
import { DatabaseQueryDirection, ProjectSearchSortBy, UnitSearchSortBy } from '@/@types/ProjectSearchFilterValues'

interface ColumnSortFilterProps {
  onClick?: (sort: ProjectSearchSortBy | UnitSearchSortBy, direction: DatabaseQueryDirection) => void
  isSelected?: boolean
  sortValue: ProjectSearchSortBy | UnitSearchSortBy
  currentValue: ProjectSearchSortBy | UnitSearchSortBy
  currentDirection: DatabaseQueryDirection
}

export const ColumnSortFilter = (props: ColumnSortFilterProps) => {
  const { onClick, sortValue, currentValue, currentDirection } = props

  const isSelected = (direction: DatabaseQueryDirection) => {
    if (direction === currentDirection && currentValue === sortValue) {
      return true
    }
    return false
  }
  return (
    <VStack alignItems={`center`} justifyContent="center" gap="2px" height="20px" minW="20px">
      <SortUpIcon
        color={isSelected(DatabaseQueryDirection.ASC) ? `gray.700` : `lightGray.500`}
        data-testid="sortAsc"
        onClick={() => (onClick ? onClick(sortValue, DatabaseQueryDirection.ASC) : undefined)}
        _hover={{ cursor: `pointer`, color: `gray.700` }}
      />
      <SortDownIcon
        color={isSelected(DatabaseQueryDirection.DESC) ? `gray.700` : `lightGray.500`}
        data-testid="sortDesc"
        onClick={() => (onClick ? onClick(sortValue, DatabaseQueryDirection.DESC) : undefined)}
        _hover={{ cursor: `pointer`, color: `gray.700` }}
      />
    </VStack>
  )
}
