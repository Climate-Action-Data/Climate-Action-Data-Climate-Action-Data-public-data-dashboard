'use client'
import { AnchorSection, ProjectDetails } from '@/@types/ProjectDetails'
import { ESearchParams } from '@/@types/ProjectSearchResult'
import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { GoogleMapWidget } from '@/components/atoms/GoogleMapWidget/GoogleMapWidget'
import { ProjectBreadcrumb } from '@/components/atoms/ProjectBreadcrumb/ProjectBreadcrumb'
import { ProjectDetailHeader } from '@/components/atoms/ProjectDetailHeader/ProjectDetailHeader'
import { CardSection } from '@/components/molecules/CardSection/CardSection'
import { ProjectDetailsInfo } from '@/components/molecules/ProjectDetailsInfo/ProjectDetailsInfo'
import { IssuancesRetirements } from '@/components/organisms/IssuancesRetirements/IssuancesRetirements'
import { ProjectDocuments } from '@/components/organisms/ProjectDocuments/ProjectDocuments'
import { useEffects } from '@/overmind'
import { coordinatesToString, toCoordinates } from '@/utils/UnitConverter'
import { Flex, Container, SimpleGrid, Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generateProjectPDFDocument } from './page.pdf'

const ProjectPage: NextPage = () => {
  const [project, setProject] = useState<ProjectDetails | undefined>(undefined)
  const { t } = useTranslation(`projectDetails`)
  const searchParams = useSearchParams()
  const id = searchParams.get(ESearchParams.ID) ?? ``
  const { getProject } = useEffects().projectResult

  useEffect(() => {
    getProject(id).then((result) => {
      if (result.data) {
        setProject(result.data)
      }
    })
  }, [id])

  return (
    <Box>
      {project?.warehouseProjectId && project?.name && (
        <ProjectBreadcrumb
          id={project?.warehouseProjectId}
          title={project?.name}
          displayProjectNav={true}
          onExport={() => generateProjectPDFDocument({ projectDetails: project })}
        />
      )}
      <Flex id={AnchorSection.PROJECT_DETAILS} flexDirection={`column`} gap={6} padding={`16px 24px`} scrollMarginTop={`172px`}>
        {project && (
          <ProjectDetailHeader
            topTitle={project.id}
            subTitle={project.location.country}
            mainTitle={project.name}
            description={project.description}
            type={project.type}
            isExpanded={true}
          />
        )}
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
        <CardSection id={AnchorSection.ISSUANCES_RETIREMENTS} displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.issuancesRetirements`) }} scrollMarginTop={`172px`}>
          {project && <IssuancesRetirements project={project} />}
        </CardSection>
        <CardSection id={AnchorSection.DOCUMENTS} displaySectionTitle sectionTitle={{ title: t(`sectionHeaders.documents`) }} scrollMarginTop={`172px`}>
          <ProjectDocuments />
        </CardSection>
      </Flex>
    </Box>
  )
}

export default ProjectPage
