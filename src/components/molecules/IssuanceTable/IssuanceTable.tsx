import { DateFormats } from '@/@types/DateFormats'
import { Issuance } from '@/@types/ProjectDetails'
import { formatDate } from '@/utils/DateFormat'
import { generateRandomString } from '@/utils/GenerationHelpers'
import { Link } from '@chakra-ui/next-js'
import { Box, Heading, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface IssuanceTableProps {
  issuances: Issuance[]
  selectedIssuance?: string
  onClick: (issuanceId: string) => void
}

export const IssuanceTable = (props: IssuanceTableProps) => {
  const { issuances, selectedIssuance, onClick } = props
  const { t } = useTranslation(`projectDetails`)

  const handleClick = (issuanceId: string, event?: any) => {
    if (event?.target) {
      const target = event.target as HTMLElement
      if (!(target instanceof HTMLButtonElement)) {
        onClick(issuanceId)
      }
    }
  }

  const renderIssuanceRow = (issuances: Issuance[]) => {
    return issuances.map((issuance) => (
      <Tr
        bgColor={selectedIssuance === issuance.id ? `green.100` : `white`}
        h="76px"
        data-testid="issuance-row"
        onClick={(event) => handleClick(issuance.id, event)}
        key={`issuance-row-${generateRandomString()}`}
      >
        <Td>{issuance.vintage}</Td>
        <Td>{issuance.quantity.toLocaleString()}</Td>
        <Td>{issuance.availableUnits.toLocaleString()}</Td>
        <Td>{formatDate(issuance.date, DateFormats.YYYY_MM_DD)}</Td>
        <Td>
          <Link href={`/issuance?id=${issuance.id}`} as="button" variant="hoverOnlyNoBold">
            {t(`moreDetails`)}
          </Link>
        </Td>
      </Tr>
    ))
  }

  return (
    <Box minW="840px" maxW="840px" borderRight="1px solid" borderRightColor="lightGray.400">
      <Box borderBottom="2px solid" borderBottomColor="lightGray.700">
        <Flex padding="0 24px" alignItems="center" height="56px">
          <Heading variant={`aeonik`} color="lightGray.700" textTransform="uppercase" as="h3" size="16px">
            {t(`issuances.title`)}
          </Heading>
        </Flex>
      </Box>
      <Box overflowY="scroll" height="329px" maxH="329px">
        <Table variant="simple" className="searchTableSmall">
          <Thead zIndex="4" top="0" position="sticky">
            <Tr>
              <Th>
                <Box>{t(`issuances.vintage`)}</Box>
              </Th>
              <Th>
                <Box>{t(`issuances.quantity`)}</Box>
              </Th>
              <Th>
                <Box>{t(`issuances.unitsAvailable`)}</Box>
              </Th>
              <Th>
                <Box>{t(`issuances.verificationReportDate`)}</Box>
              </Th>
              <Th>
                <Box />
              </Th>
            </Tr>
          </Thead>
          <Tbody maxH="257px">{renderIssuanceRow(issuances)}</Tbody>
        </Table>
      </Box>
    </Box>
  )
}
