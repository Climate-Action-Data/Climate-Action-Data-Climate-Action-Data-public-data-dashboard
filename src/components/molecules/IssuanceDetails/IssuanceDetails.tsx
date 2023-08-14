import { SimpleGrid, Skeleton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { Issuance } from '@/@types/Issuance'
import { extractTagItemsFromTag } from '@/utils/TextConverter'
import { ExpandableList } from '@/components/atoms/ExpandableList/ExpandableList'

interface IssuanceDetailsProps {
  issuance?: Issuance
}

export const IssuanceDetails = (props: IssuanceDetailsProps) => {
  const { issuance } = props
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)
  if (!issuance) {
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
    <SimpleGrid columns={4} gap="24px">
      <DetailWidget title={t(`issuanceDetails.issuedTo`)}>{issuance.issuedTo}</DetailWidget>
      <DetailWidget title={t(`issuanceDetails.vintage`)}>{issuance.vintage}</DetailWidget>
      <DetailWidget title={t(`issuanceDetails.quantity`)}>{issuance.quantity.toLocaleString()}</DetailWidget>
      <DetailWidget title={t(`issuanceDetails.unitType`)}>{issuance.unitType}</DetailWidget>
      <DetailWidget title={t(`issuanceDetails.monitoringPeriod`)}>{renderMonitoringDate(issuance?.monitoringPeriodStart, issuance?.monitoringPeriodEnd)}</DetailWidget>
      <DetailWidget title={t(`issuanceDetails.correspodinglyAdjusted`)}>{issuance.correspondingAdjustment ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`issuanceDetails.issuanceTags`)}>
        {issuance.issuanceTags.length > 0 ? <ExpandableList items={extractTagItemsFromTag(issuance.issuanceTags)} /> : tHome(`noData`)}
      </DetailWidget>
    </SimpleGrid>
  )
}
