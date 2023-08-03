'use client'
import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { GoogleMapWidget } from '@/components/atoms/GoogleMapWidget/GoogleMapWidget'
import { ProjectDetailHeader } from '@/components/atoms/ProjectDetailHeader/ProjectDetailHeader'
import { CardSection } from '@/components/molecules/CardSection/CardSection'
import { ProjectDetailsInfo } from '@/components/molecules/ProjectDetailsInfo/ProjectDetailsInfo'
import { ProjectDetailsVerification } from '@/components/molecules/ProjectDetailsVerification/ProjectDetailsVerification'
import { useEffects } from '@/overmind'
import { coordinatesToString, toCoordinates } from '@/utils/UnitConverter'
import { Flex, Container, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Project({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<ProjectDetails | undefined>(undefined)
  const { t } = useTranslation(`projectDetails`)

  const { getProject } = useEffects().projectResult

  useEffect(() => {
    getProject(params.id).then((result) => {
      if (result.data) {
        setProject(result.data)
      }
    })
  }, [])

  return (
    <Flex flexDirection={`column`} gap={6} paddingX={6} paddingY={3}>
      {project && <ProjectDetailHeader id={project.id} location={project.location.country} title={project.name} description={project.description} />}
      <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.projectDetails`) }}>
        <Container padding={[`12px`, `24px`]} flex={2} variant="cardSectionNoMargin">
          <ProjectDetailsInfo project={project} />
        </Container>
        <Container minW="448px" maxW="448px" variant="cardSectionNoMarginNoPadding">
          <GoogleMapWidget isLoading={project === undefined} coordinates={toCoordinates(project?.location.geoCoordinates) ?? project?.location.country} />
          <Container paddingX={6} paddingY={3}>
            <SimpleGrid columns={2} gap="24px">
              <DetailWidget title={t(`country`)}>{project?.location.country}</DetailWidget>
              <DetailWidget title={t(`inRegion`)}>{project?.location.region}</DetailWidget>
              <DetailWidget title={t(`geographicIdentifier`)}>{coordinatesToString(toCoordinates(project?.location.geoCoordinates))}</DetailWidget>
            </SimpleGrid>
          </Container>
        </Container>
      </CardSection>
      <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.verificationValidation`) }}>
        <Container flex={2} variant="cardSectionNoMargin">
          <ProjectDetailsVerification validation={project?.validation} />
        </Container>
      </CardSection>
      <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.issuancesRetirements`) }}>
        <Container flex={2} variant="cardSectionNoMargin">
          <>{t(`lorem`)}</>
        </Container>
      </CardSection>
      <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.documents`) }}>
        <Container flex={2} variant="cardSectionNoMargin">
          <>{t(`lorem`)}</>
        </Container>
      </CardSection>
    </Flex>
  )
}
