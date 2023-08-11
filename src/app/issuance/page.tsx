'use client'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { Unit } from '@/@types/Unit'
import { useEffects } from '@/overmind'
import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const IssuancePage: NextPage = () => {
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
    <Box padding="12px 24px">
      {t(`placeholderIssuance`)} - {unit?.warehouseUnitId}
    </Box>
  )
}

export default IssuancePage
