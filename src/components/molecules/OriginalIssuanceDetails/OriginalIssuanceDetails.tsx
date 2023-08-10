import { SimpleGrid, Skeleton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { Unit } from '@/@types/Unit'

interface OriginalIssuanceDetailsProps {
  unit?: Unit
}

export const OriginalIssuanceDetails = (props: OriginalIssuanceDetailsProps) => {
  const { unit } = props
  const { t } = useTranslation(`unitDetails`)
  const { t: tHome } = useTranslation(`home`)
  if (!unit) {
    return <Skeleton height="100px" />
  }

  return (
    <SimpleGrid columns={3} gap="24px">
      <DetailWidget title={t(`originalIssuance.projectIssuedTo`)}>{unit?.project?.developer ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.issuanceBatchSerialNumber`)}>{unit?.issuance?.issuanceBatchSerial ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.vintage`)}>{unit?.vintage ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.quantityIssued`)}>{unit?.issuance?.quantityIssued ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.unitType`)}>{unit?.type ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.monitoringPeriod`)}>{unit?.monitoringPeriod ?? tHome(`noData`)}</DetailWidget>
    </SimpleGrid>
  )
}
