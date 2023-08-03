import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { Link } from '@chakra-ui/next-js'
import { Stack, StackDivider, SimpleGrid, Flex, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ProjectDetailsInfoSkeleton } from '../ProjectDetailsInfoSkeleton/ProjectDetailsInfoSkeleton'
import { extractEWebGoalFromString } from '@/utils/TextConverter'
import { EWebGoalIcon } from '@/components/atoms/EWebGoalIcon/EWebGoalIcon'

interface ProjectDetailsInfoProps {
  project?: ProjectDetails
}

export const ProjectDetailsInfo = (props: ProjectDetailsInfoProps) => {
  const { project } = props

  const { t } = useTranslation(`projectDetails`)

  if (!project) {
    return <ProjectDetailsInfoSkeleton />
  }
  return (
    <Stack divider={<StackDivider />} spacing="24px">
      <SimpleGrid columns={2} gap="24px">
        <DetailWidget title={t(`detailsHeaders.standard`)}>{project.standard}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.methodology`)}>{project.methodology}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.developer`)}>{project.developer}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.link`)}>
          <Link variant={`blueLink`} target="_blank" href={project.link}>
            {project.link}
          </Link>
        </DetailWidget>
        <DetailWidget title={t(`detailsHeaders.sector`)}>{project.sector}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.type`)}>{project.type}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.status`)}>{project.type}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.statusUpdated`)}>{project.type}</DetailWidget>
      </SimpleGrid>
      <Flex flexWrap="wrap">
        <SimpleGrid columns={2} gap="24px">
          <DetailWidget title={t(`detailsHeaders.availableUnits`)}>{0}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.issuances`)}>{project.units.issued}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.creditingPeriod`)}>
            {project.units.creditingPeriodStart} - {project.units.creditingPeriodEnd}
          </DetailWidget>
        </SimpleGrid>
        <SimpleGrid columns={2} gap="24px">
          <DetailWidget title={t(`detailsHeaders.retirememts`)}>{project.units.retired}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.estimatedUnits`)}>{project.units.estimated}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.unitMetric`)}>{project.units.unitMetric}</DetailWidget>
        </SimpleGrid>
      </Flex>
      <SimpleGrid columns={2} gap="24px">
        <DetailWidget title={t(`detailsHeaders.ndcCoverage`)}>{project.coveredByNdc}</DetailWidget>
      </SimpleGrid>
      <SimpleGrid columns={2} gap="24px">
        <DetailWidget title={t(`detailsHeaders.tags`)}>{project.tags}</DetailWidget>
        <DetailWidget asBox title={t(`detailsHeaders.coBenefits`)}>
          <HStack flexWrap="wrap" gap="4px">
            {project.coBenefits.map((benefit) => {
              const eWebGoal = extractEWebGoalFromString(benefit)
              if (eWebGoal) {
                return <EWebGoalIcon key={benefit} goal={eWebGoal} />
              }
            })}
          </HStack>
        </DetailWidget>
      </SimpleGrid>
    </Stack>
  )
}
