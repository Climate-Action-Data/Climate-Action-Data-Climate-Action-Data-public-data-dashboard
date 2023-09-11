import { TableContainer, Table, Thead, Tr, Th, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'
import { DatabaseQueryDirection, ProjectSearchSortBy, UnitSearchSortBy } from '@/@types/ProjectSearchFilterValues'
import { useActions, useAppState } from '@/overmind'

interface ProjectSearchBodyHeaderProps {
  refreshData?: () => void
}

export const ProjectSearchBodyHeader = (props: ProjectSearchBodyHeaderProps) => {
  const { refreshData } = props
  const { t } = useTranslation(`search`)
  const { setSortByProject } = useActions().searchFilters
  const { selectedProjectSearchFilterValues } = useAppState().searchFilters

  const handleSort = (sortBy: ProjectSearchSortBy | UnitSearchSortBy, direction: DatabaseQueryDirection) => {
    setSortByProject({ sortBy: sortBy as ProjectSearchSortBy, direction })
    if (refreshData) {
      refreshData()
    }
  }

  return (
    <TableContainer id="tableReference" className="hide-scrollbar" minH="72px">
      <Table variant="simple" className="searchTable">
        <Thead zIndex={4} id="table" className="">
          <Tr id="scrollableHeader">
            <Th>
              <Box>
                {t(`table.registry`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.STANDARD}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.methodology`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.MEHODOLOGY}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.sector`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.SECTOR}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.country`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.COUNTRY}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.projectStatus`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.STATUS}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th minW="250px !important">
              <Box>
                {t(`table.creditingPeriod`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.CREDITING_PERIOD}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`table.annualEstUnits`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.ANNUAL_ESTIMATION}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`table.totalIssuedUnits`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.ISSUED_UNITS}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`table.totalRetiredUnits`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.RETIRED_UNITS}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`table.totalAvailableUnits`)}
                <ColumnSortFilter
                  currentDirection={selectedProjectSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedProjectSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={ProjectSearchSortBy.AVAILABLE_UNITS}
                  onClick={handleSort}
                />
              </Box>
            </Th>
          </Tr>
        </Thead>
      </Table>
    </TableContainer>
  )
}
