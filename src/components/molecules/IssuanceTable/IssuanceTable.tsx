import { DateFormats } from '@/@types/DateFormats'
import { Issuance } from '@/@types/ProjectDetails'
import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'
import { formatDate } from '@/utils/DateFormat'
import { Box, Heading, Flex, Table, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface IssuanceTableProps {
  issuances: Issuance[]
}

export const IssuanceTable = (props: IssuanceTableProps) => {
  const { issuances } = props
  const { t } = useTranslation(`projectDetails`)

  const renderIssuanceRow = (issuances: Issuance[]) => {
    return issuances.map((issuance, index) => (
      <Tr key={index}>
        <Td>{issuance.vintage}</Td>
        <Td>{issuance.quantity.toLocaleString()}</Td>
        <Td>{issuance.availableUnits.toLocaleString()}</Td>
        <Td>{formatDate(issuance.date, DateFormats.YYYY_MM_DD)}</Td>
        <Td>
          <Button variant="hoverOnlyNoBold">{t(`moreDetails`)}</Button>
        </Td>
      </Tr>
    ))
  }

  return (
    <Box minW={`840px`} maxW={`840px`} borderRight="1px solid #B8BEC0">
      <Box borderBottom="2px solid" borderBottomColor="lightGray.700">
        <Flex padding="0 24px" alignItems="center" height="56px">
          <Heading variant={`aeonik`} color="lightGray.700" textTransform="uppercase" as="h3" size="16px">
            {t(`issuances.title`)}
          </Heading>
        </Flex>
      </Box>
      <Table variant="simple" className="searchTableSmall">
        <Thead>
          <Tr>
            <Th>
              <Box>
                {t(`issuances.vintage`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`issuances.quantity`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`issuances.unitsAvailable`)}
                <ColumnSortFilter />
              </Box>
            </Th>
            <Th>
              <Box>
                {t(`issuances.verificationReportDate`)}
                <ColumnSortFilter />
              </Box>
            </Th>
          </Tr>
        </Thead>
        <Tbody>{renderIssuanceRow(issuances)}</Tbody>
      </Table>
    </Box>
  )
}
