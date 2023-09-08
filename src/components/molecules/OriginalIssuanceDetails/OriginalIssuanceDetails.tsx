import { Link, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { Unit } from '@/@types/Unit'
import { generateProjectUrl } from '@/utils/RequestHelpers'
import { SearchFlow } from '@/@types/Search'

interface OriginalIssuanceDetailsProps {
  unit?: Unit
}

const DEFAULT_COLUMN_MOBILE = 2
const DEFAULT_COLUMN_WEB = 3

export const OriginalIssuanceDetails = (props: OriginalIssuanceDetailsProps) => {
  const { unit } = props
  const { t } = useTranslation(`unitDetails`)
  const { t: tHome } = useTranslation(`home`)
  if (!unit) {
    return <Skeleton height="100px" />
  }

  return (
    <SimpleGrid columns={[DEFAULT_COLUMN_MOBILE, DEFAULT_COLUMN_WEB]} gap="24px">
      <DetailWidget title={t(`originalIssuance.projectIssuedTo`)}>
        <Link href={`${generateProjectUrl(unit.project?.warehouseProjectId, SearchFlow.UNIT)}`} textDecoration="underline">
          {unit?.project?.name ?? tHome(`noData`)}
        </Link>
      </DetailWidget>
      <DetailWidget title={t(`originalIssuance.issuanceBatchSerialNumber`)}>{unit?.issuance?.issuanceBatchSerial ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.vintage`)}>{unit?.vintage ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.quantityIssued`)}>{unit?.issuance?.quantityIssued ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.unitType`)}>{unit?.type ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.monitoringPeriod`)}>{unit?.monitoringPeriod ?? tHome(`noData`)}</DetailWidget>
    </SimpleGrid>
  )
}
