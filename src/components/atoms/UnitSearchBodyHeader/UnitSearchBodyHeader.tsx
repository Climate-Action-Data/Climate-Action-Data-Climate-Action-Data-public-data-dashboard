import { TableContainer, Table, Thead, Tr, Th, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'
import { useActions, useAppState } from '@/overmind'
import { DatabaseQueryDirection, ProjectSearchSortBy, UnitSearchSortBy } from '@/@types/ProjectSearchFilterValues'

interface UnitSearchBodyHeaderProps {
  refreshData?: () => void
}

export const UnitSearchBodyHeader = (props: UnitSearchBodyHeaderProps) => {
  const { refreshData } = props
  const { t } = useTranslation(`search`)
  const { setSortByUnit } = useActions().searchFilters
  const { selectedUnitSearchFilterValues } = useAppState().searchFilters

  const handleSort = (sortBy: ProjectSearchSortBy | UnitSearchSortBy, direction: DatabaseQueryDirection) => {
    setSortByUnit({ sortBy: sortBy as UnitSearchSortBy, direction })
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
                {t(`unitTable.status`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.UNIT_STATUS}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`unitTable.vintage`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.VINTAGE}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`unitTable.quantity`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.QUANTITY}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`unitTable.issuanceDate`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.VERIFICATION_REPORT_DATE}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.standard`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.STANDARD}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.methodology`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.METHODOLOGY}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.sector`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.SECTOR}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.country`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.COUNTRY}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.correspondingAdjustment`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.CORRESPONDING_ADJUSTMENT}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`unitTable.marketplace`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.MARKETPLACE}
                  onClick={handleSort}
                />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`unitTable.serialNumber`)}
                <ColumnSortFilter
                  currentDirection={selectedUnitSearchFilterValues.searchFilterValues.direction}
                  currentValue={selectedUnitSearchFilterValues.searchFilterValues.sortBy}
                  sortValue={UnitSearchSortBy.SERIAL_NUMBER}
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
