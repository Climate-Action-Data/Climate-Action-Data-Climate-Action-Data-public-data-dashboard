import { IssuanceUnit } from '@/@types/ProjectDetails'
import { SimpleGrid, Box } from '@chakra-ui/react'
import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { useTranslation } from 'react-i18next'

interface RetirementMobileTableProps {
  retirements: IssuanceUnit[]
}

export const RetirementMobileTable = (props: RetirementMobileTableProps) => {
  const { retirements } = props
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)
  const renderRetirements = () => {
    return retirements.map((retirement) => (
      <Box key={`modal-retirement-${retirement.id}`} borderRadius="8px" border="none" outline="none" boxShadow="2px 2px 8px 0px #0000001A">
        <SimpleGrid p={4} justifyItems="start" textAlign="left" flex={1} width="auto" columns={2} gap="24px">
          <DetailWidget title={t(`issuances.quantity`)}>{retirement.quantity.toLocaleString()}</DetailWidget>
          <DetailWidget title={t(`issuances.retirementNotes`)}>{retirement.retirementsNotes ?? tHome(`noData`)}</DetailWidget>
        </SimpleGrid>
      </Box>
    ))
  }

  return <>{renderRetirements()}</>
}
