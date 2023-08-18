import { VStack } from '@chakra-ui/react'
import { SortDownIcon } from '../SortDownIcon/SortDownIcon'
import { SortUpIcon } from '../SortUpIcon/SortUpIcon'
import { DatabaseQueryDirection, ProjectSearchSortBy, UnitSearchSortBy } from '@/@types/ProjectSearchFilterValues'

interface ColumnSortFilterProps {
  onClick: (sort: ProjectSearchSortBy | UnitSearchSortBy, direction: DatabaseQueryDirection) => void
  isSelected?: boolean
  sortValue: ProjectSearchSortBy | UnitSearchSortBy
  currentValue: ProjectSearchSortBy | UnitSearchSortBy
  currentDirection: DatabaseQueryDirection
}

export const ColumnSortFilter = (props: ColumnSortFilterProps) => {
  const { onClick, sortValue, currentValue, currentDirection } = props

  const isSelected = (direction: DatabaseQueryDirection) => {
    if (direction === currentDirection && currentValue === sortValue) {
      return `gray.700`
    }
    return `lightGray.500`
  }

  const handleOnSortAscClick = () => {
    onClick(sortValue, DatabaseQueryDirection.ASC)
  }

  const handleOnSortDescClick = () => {
    onClick(sortValue, DatabaseQueryDirection.DESC)
  }

  return (
    <VStack alignItems={`center`} justifyContent="center" gap="2px" height="20px" minW="20px">
      <SortUpIcon color={isSelected(DatabaseQueryDirection.ASC)} data-testid="sortAsc" onClick={handleOnSortAscClick} _hover={{ cursor: `pointer`, color: `gray.700` }} />
      <SortDownIcon color={isSelected(DatabaseQueryDirection.DESC)} data-testid="sortDesc" onClick={handleOnSortDescClick} _hover={{ cursor: `pointer`, color: `gray.700` }} />
    </VStack>
  )
}
