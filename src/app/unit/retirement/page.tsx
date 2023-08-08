'use client'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { Unit } from '@/@types/Unit'
import { useEffects } from '@/overmind'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const RetirementPage: NextPage = () => {
  const [unit, setUnit] = useState<Unit | undefined>(undefined)
  const { t } = useTranslation(`unitDetails`)
  const searchParams = useSearchParams()
  const id = searchParams.get(ESearchParams.ID) ?? ``
  const { getUnit } = useEffects().unitResult

  useEffect(() => {
    getUnit(id).then((result) => {
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

export default RetirementPage
