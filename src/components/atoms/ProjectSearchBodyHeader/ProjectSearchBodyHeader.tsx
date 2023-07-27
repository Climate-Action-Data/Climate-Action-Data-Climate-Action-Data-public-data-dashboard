import { TableContainer, Table, Thead, Tr, Th, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'

export const ProjectSearchBodyHeader = () => {
  const { t } = useTranslation(`search`)

  return (
    <TableContainer id="tableReference" className="hide-scrollbar" minH="72px">
      <Table variant="simple" className="searchTable">
        <Thead zIndex={4} id="table" className="">
          <Tr id="scrollableHeader">
            <Th>
              <Box>
                {t(`table.standard`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.methodology`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.sector`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.country`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`table.projectStatus`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th minW="250px !important">
              <Box>
                {t(`table.creditingPeriod`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`table.annualEstUnits`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`table.totalIssuedUnits`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`table.totalRetiredUnits`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`table.totalAvailableUnits`)}
                <ColumnSortFilter />
              </Box>
            </Th>
          </Tr>
        </Thead>
      </Table>
    </TableContainer>
  )
}
