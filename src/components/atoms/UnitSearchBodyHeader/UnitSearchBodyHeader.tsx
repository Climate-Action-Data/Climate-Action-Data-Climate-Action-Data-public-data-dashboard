import { TableContainer, Table, Thead, Tr, Th, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'

export const UnitSearchBodyHeader = () => {
  const { t } = useTranslation(`search`)
  // BEGIN-NOSCAN
  return (
    <TableContainer id="tableReference" className="hide-scrollbar" minH="72px">
      <Table variant="simple" className="searchTable">
        <Thead zIndex={4} id="table" className="">
          <Tr id="scrollableHeader">
            <Th>
              <Box>
                {t(`unitTable.status`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`unitTable.vintage`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th isNumeric>
              <Box>
                {t(`table.annualEstUnits`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`unitTable.issuanceDate`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`unitTable.retirementDate`)}
                <ColumnSortFilter />
              </Box>
            </Th>
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
                {t(`table.correspondingAdjustment`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`unitTable.marketplace`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`unitTable.serialNumber`)}
                <ColumnSortFilter />
              </Box>
            </Th>
          </Tr>
        </Thead>
      </Table>
    </TableContainer>
  )
  // END-NOSCAN
}
