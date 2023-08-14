import { SimpleGrid, Skeleton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { Unit } from '@/@types/Unit'

interface RetirementDetailsProps {
  unit?: Unit
}

export const RetirementDetails = (props: RetirementDetailsProps) => {
  const { unit } = props
  const { t } = useTranslation(`unitDetails`)
  const { t: tHome } = useTranslation(`home`)
  if (!unit) {
    return <Skeleton height="100px" />
  }

  return (
    <SimpleGrid columns={3} gap="24px">
      <DetailWidget title={t(`retirement.status`)}>{unit.status}</DetailWidget>
      <DetailWidget title={t(`retirement.quantityRetired`)}>{unit.credits.toLocaleString()}</DetailWidget>
      <DetailWidget title={t(`retirement.retirementNotes`)}>{unit.retirementNote ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`retirement.usingEntity`)}>{tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`retirement.correspondingAdjustment`)}>{tHome(`noData`)}</DetailWidget>
    </SimpleGrid>
  )
}
