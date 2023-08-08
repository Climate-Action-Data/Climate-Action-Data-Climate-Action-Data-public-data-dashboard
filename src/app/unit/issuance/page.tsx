'use client'
import { ProjectType } from '@/@types/ProjectDetails'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { Unit } from '@/@types/Unit'
import { ProjectDetailHeader } from '@/components/atoms/ProjectDetailHeader/ProjectDetailHeader'
import { CardSection } from '@/components/molecules/CardSection/CardSection'
import { RetirementDetails } from '@/components/molecules/RetirementDetails/RetirementDetails'
import { useEffects } from '@/overmind'
import { Box, Container, Flex } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const IssuancePage: NextPage = () => {
  const [unit, setUnit] = useState<Unit | undefined>(undefined)
  const { t } = useTranslation(`unitDetails`)
  const { t: tHome } = useTranslation(`home`)
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

  const DEFAULT_COUNTRY = `France`

  return (
    <>
      <Box paddingBottom="40px">
        <ProjectDetailHeader id={unit?.project.id ?? tHome(`noData`)} location={DEFAULT_COUNTRY} title={unit?.project?.name ?? tHome(`noData`)} type={ProjectType.DEFAULT} />
      </Box>
      <Flex flexDirection="column" minW="100%" gap="40px">
        <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.retirementDetails`) }}>
          <Container padding={[`12px`, `24px`]} flex={2} variant="cardSectionNoMargin">
            <RetirementDetails unit={unit} />
          </Container>
        </CardSection>
        <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.originalIssuanceDetails`) }}>
          <Container padding={[`12px`, `24px`]} flex={2} variant="cardSectionNoMargin">
            {t(`placeholderIssuance`)} - {unit?.warehouseUnitId}
          </Container>
        </CardSection>
      </Flex>
    </>
  )
}

export default IssuancePage
