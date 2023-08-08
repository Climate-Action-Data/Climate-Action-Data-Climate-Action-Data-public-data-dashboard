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
      <DetailWidget title={t(`retirement.status`)}>{unit.status ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`retirement.quantityRetired`)}>{unit.credits ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`retirement.retirementNotes`)}>{unit.retirementNote ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`retirement.usingEntity`)}>{unit.project.name ?? tHome(`noData`)}</DetailWidget>
      <DetailWidget title={t(`retirement.correspondingAdjustment`)}>{unit.project.name ?? tHome(`noData`)}</DetailWidget>
    </SimpleGrid>
  )
}
