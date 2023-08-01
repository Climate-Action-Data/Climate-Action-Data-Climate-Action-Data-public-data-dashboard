'use client'
import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { ProjectDetailHeader } from '@/components/atoms/ProjectDetailHeader/ProjectDetailHeader'
import { CardSection } from '@/components/molecules/CardSection/CardSection'
import { ProjectDetailsInfo } from '@/components/molecules/ProjectDetailsInfo/ProjectDetailsInfo'
import { useEffects } from '@/overmind'
import { coordinatesToString, toCoordinates } from '@/utils/UnitConverter'
import { Flex, Container, Image, SimpleGrid } from '@chakra-ui/react'
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
        console.log(result.data)
      }
    })
  }, [])

  return (
    <Flex flexDirection={`column`} gap={6} paddingX={6} paddingY={3}>
      {project && <ProjectDetailHeader id={project.id} location={project.location.country} title={project.name} description={project.description} />}
      <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.projectDetails`) }}>
        <Container flex={2} variant="cardSectionNoMargin">
          <ProjectDetailsInfo project={project} />
        </Container>
        <Container minW="448px" maxW="448px" variant="cardSectionNoMarginNoPadding">
          <Image borderTopLeftRadius="8px" borderTopRightRadius="8px" alt="PLACEHOLDER" src={`http://placekitten.com/448/448`} h="448px" w="448px" objectFit={`contain`} />
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
          <>Lorem ispum</>
        </Container>
      </CardSection>
      <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.issuancesRetirements`) }}>
        <Container flex={2} variant="cardSectionNoMargin">
          <>Lorem ispum</>
        </Container>
      </CardSection>
      <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.documents`) }}>
        <Container flex={2} variant="cardSectionNoMargin">
          <>Lorem ispum</>
        </Container>
      </CardSection>
    </Flex>
  )
}
