import { Link, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { Unit } from '@/@types/Unit'
import { generateProjectUrl } from '@/utils/RequestHelpers'
import { SearchFlow } from '@/@types/Search'

import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'

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

  const renderMonitoringDate = (monitoringPeriodStart: string, monitoringPeriodEnd: string) => {
    if (monitoringPeriodStart && monitoringPeriodEnd) {
      return `${formatDate(monitoringPeriodStart, DateFormats.YYYY_MM_DD)} - ${formatDate(monitoringPeriodEnd, DateFormats.YYYY_MM_DD)}`
    } else {
      return tHome(`noData`)
    }
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
      <DetailWidget title={t(`originalIssuance.quantityIssued`)}>{unit?.credits ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.unitType`)}>{unit?.type ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`originalIssuance.monitoringPeriod`)}>{renderMonitoringDate(unit?.monitoringPeriodStart, unit?.monitoringPeriodEnd)}</DetailWidget>
    </SimpleGrid>
  )
}
