'use client'
import { Unit } from '@/@types/Unit'
import { useEffects } from '@/overmind'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function RetirementPage({ params }: { params: { id: string } }) {
  const [unit, setUnit] = useState<Unit | undefined>(undefined)
  const { t } = useTranslation(`unitDetails`)

  const { getUnit } = useEffects().unitResult

  useEffect(() => {
    getUnit(params.id).then((result) => {
      if (result.data) {
        setUnit(result.data)
      }
    })
  }, [])

  return (
    <>
      {t(`placeholderRetirement`)} - {unit?.warehouseUnitId}
    </>
  )
}
