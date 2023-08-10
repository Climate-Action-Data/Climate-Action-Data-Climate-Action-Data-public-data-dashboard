import { IssuanceUnit } from '@/@types/ProjectDetails'
import { ColumnSortFilter } from '@/components/atoms/ColumnSortFilter/ColumnSortFilter'
import { NoDataScreen } from '@/components/atoms/NoDataScreen/NoDataScreen'
import { generateRandomString } from '@/utils/GenerationHelpers'
import { Box, Heading, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface RetirementTableProps {
  retirements?: IssuanceUnit[]
}

export const RetirementTable = (props: RetirementTableProps) => {
  const { retirements } = props
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)

  const renderRetirementRow = (retirements: IssuanceUnit[]) => {
    return retirements.map((retirement) => (
      <Tr className="noClick" h="76px" key={generateRandomString()}>
        <Td>{retirement.quantity.toLocaleString()}</Td>
        <Td>{retirement?.retirementsNotes ?? tHome(`noData`)}</Td>
      </Tr>
    ))
  }

  const renderTableBody = (retirements: IssuanceUnit[]) => {
    if (retirements.length > 0) {
      return (
        <Box overflowY="scroll" height="329px" maxH="329px">
          <Table variant="simple" className="searchTableSmall">
            <Thead outline="2px solid" outlineColor="lightGray.700" zIndex="4" top="0" position="sticky">
              <Tr>
                <Th>
                  <Box>
                    {t(`issuances.quantity`)}
                    <ColumnSortFilter />
                  </Box>
                </Th>
                <Th>
                  <Box>
                    {t(`issuances.retirementNotes`)}
                    <ColumnSortFilter />
                  </Box>
                </Th>
              </Tr>
            </Thead>
            <Tbody>{renderRetirementRow(retirements)}</Tbody>
          </Table>
        </Box>
      )
    } else {
      return <NoDataScreen message={t(`issuances.noRetirementData`)} />
    }
  }

  return (
    <Flex direction="column" w="100%">
      <Box borderBottom="2px solid" borderBottomColor="lightGray.700">
        <Flex padding="0 24px" alignItems="center" height="56px">
          <Heading variant={`aeonik`} color="lightGray.700" textTransform="uppercase" as="h3" size="16px">
            {t(`issuances.retirememts`)}
          </Heading>
        </Flex>
      </Box>
      {!retirements ? <NoDataScreen message={t(`issuances.noIssuanceSelected`)} /> : renderTableBody(retirements)}
    </Flex>
  )
}
