'use client'
import { AnchorSection, ProjectDetails } from '@/@types/ProjectDetails'
import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { GoogleMapWidget } from '@/components/atoms/GoogleMapWidget/GoogleMapWidget'
import { ProjectDetailHeader } from '@/components/atoms/ProjectDetailHeader/ProjectDetailHeader'
import { CardSection } from '@/components/molecules/CardSection/CardSection'
import { ProjectDetailsInfo } from '@/components/molecules/ProjectDetailsInfo/ProjectDetailsInfo'
import { ProjectDetailsVerification } from '@/components/molecules/ProjectDetailsVerification/ProjectDetailsVerification'
import { useEffects } from '@/overmind'
import { coordinatesToString, toCoordinates } from '@/utils/UnitConverter'
import { Flex, Container, SimpleGrid, Box, Heading, VStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectTypeBanner } from '@/components/atoms/ProjectTypeBanner/ProjectTypeBanner'
import { LargeTextWithScroll } from '@/components/atoms/LargeTextWithScroll/LargeTextWithScroll'
import { extractProjectTypeFromString } from '@/utils/TextConverter'

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
    <>
      {project && (
        <>
          <ProjectDetailHeader id={project.warehouseProjectId} title={project.name} />
        </>
      )}
      <Flex id={AnchorSection.PROJECT_DETAILS} flexWrap="wrap" gap={6} padding={`16px 24px`} scrollMarginTop={`172px`}>
        <Box position="relative" h="336px" flex={1}>
          <ProjectTypeBanner projectType={extractProjectTypeFromString(project?.type)} projectTypeText={project?.type ?? ``} />
          <VStack
            background="linear-gradient(0deg, rgba(0, 0, 0, 0.8) 33.85%, rgba(17, 17, 17, 0) 100%)"
            borderRadius="8px"
            width="100%"
            color="white"
            alignItems="flex-start"
            gap="8px"
            padding={6}
            bottom={0}
            position="absolute"
          >
            <Text fontSize="lg">{project?.id}</Text>
            <Heading textTransform="uppercase" fontSize={[`16px`, `32px`]}>
              {project?.name}
            </Heading>
            <Text>{project?.location.country}</Text>
          </VStack>
        </Box>
        <Box maxW="448px">
          <Text fontSize="lg" marginBottom="8px" fontWeight="medium">
            {t(`description`)}
          </Text>
          <LargeTextWithScroll text={`${project?.description}`} />
        </Box>
      </Flex>
      <Flex flexDirection={`column`} gap={6} paddingX={6} paddingY={3}>
        <CardSection displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.projectDetails`) }}>
          <Container padding={[`12px`, `24px`]} flex={2} variant="cardSectionNoMargin">
            <ProjectDetailsInfo project={project} />
          </Container>
          <Container minW={[`unset`, `448px`]} maxW="448px" variant="cardSectionNoMarginNoPadding">
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
        <CardSection id={AnchorSection.VERIFICATION_VALIDATION} displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.verificationValidation`) }}>
          <Container padding={[`12px`, `24px`]} flex={2} variant="cardSectionNoMargin">
            <ProjectDetailsVerification validation={project?.validation} />
          </Container>
        </CardSection>
        <CardSection id={AnchorSection.ISSUANCES_RETIREMENTS} displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.issuancesRetirements`) }}>
          <Container flex={2} variant="cardSectionNoMargin">
            <>{t(`lorem`)}</>
          </Container>
        </CardSection>
        <CardSection id={AnchorSection.DOCUMENTS} displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.documents`) }}>
          <Container flex={2} variant="cardSectionNoMargin">
            <>{t(`lorem`)}</>
          </Container>
        </CardSection>
      </Flex>
    </>
  )
}
