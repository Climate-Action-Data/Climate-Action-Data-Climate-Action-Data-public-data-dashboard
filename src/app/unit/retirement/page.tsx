'use client'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { Unit } from '@/@types/Unit'
import { ProjectBreadcrumb } from '@/components/atoms/ProjectBreadcrumb/ProjectBreadcrumb'
import { ProjectDetailHeader } from '@/components/atoms/ProjectDetailHeader/ProjectDetailHeader'
import { CardSection } from '@/components/molecules/CardSection/CardSection'
import { OriginalIssuanceDetails } from '@/components/molecules/OriginalIssuanceDetails/OriginalIssuanceDetails'
import { RetirementDetails } from '@/components/molecules/RetirementDetails/RetirementDetails'
import { useEffects } from '@/overmind'
import { Flex, Container, Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectBannerType } from '@/@types/ProjectDetails'

const RetirementPage: NextPage = () => {
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
  return (
    <>
      {unit?.project?.warehouseProjectId && unit?.project?.name && <ProjectBreadcrumb id={unit?.project?.warehouseProjectId} title={unit?.project?.name} />}
      <Box padding="12px 24px">
        <Box paddingBottom="40px">
          <ProjectDetailHeader
            id={unit?.project.id ?? tHome(`noData`)}
            location={unit?.project?.country}
            title={unit?.project?.name ?? tHome(`noData`)}
            type={unit?.project?.type}
            bannerType={ProjectBannerType.ISSUANCE}
          />
        </Box>
        <Flex flexDirection="column" minW="100%" gap="40px">
          <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.retirementDetails`) }}>
            <Container padding={[`12px`, `24px`]} flex={2} variant="cardSectionNoMargin">
              <RetirementDetails unit={unit} />
            </Container>
          </CardSection>
          <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.originalIssuanceDetails`) }}>
            <Container padding={[`12px`, `24px`]} flex={2} variant="cardSectionNoMargin">
              <OriginalIssuanceDetails unit={unit} />
            </Container>
          </CardSection>
        </Flex>
      </Box>
    </>
  )
}

export default RetirementPage
