import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { Link } from '@chakra-ui/next-js'
import { Stack, StackDivider, SimpleGrid, Flex, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ProjectDetailsInfoSkeleton } from '../ProjectDetailsInfoSkeleton/ProjectDetailsInfoSkeleton'
import { extractEWebGoalFromString, extractTagItemsFromTag } from '@/utils/TextConverter'
import { EWebGoalIcon } from '@/components/atoms/EWebGoalIcon/EWebGoalIcon'
import { formatDate } from '@/utils/DateFormat'
import { DateFormats } from '@/@types/DateFormats'
import { ProjectDetails } from '@/@types/ProjectDetails'
import { ExpandableList } from '@/components/atoms/ExpandableList/ExpandableList'

interface ProjectDetailsInfoProps {
  project?: ProjectDetails
}

export const ProjectDetailsInfo = (props: ProjectDetailsInfoProps) => {
  const { project } = props

  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)

  if (!project) {
    return <ProjectDetailsInfoSkeleton />
  }

  const renderCreditingPeriod = (start: string, end: string) => {
    if (!start || !end) {
      return tHome(`noData`)
    }
    const startDate = formatDate(start, DateFormats.YYYY_MM_DD)
    const endDate = formatDate(end, DateFormats.YYYY_MM_DD)
    return `${startDate} - ${endDate}`
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
        <DetailWidget title={t(`detailsHeaders.status`)}>{project.status}</DetailWidget>
        <DetailWidget title={t(`detailsHeaders.statusUpdated`)}>{project.statusDate ? formatDate(project.statusDate, DateFormats.YYYY_MM_DD) : tHome(`noData`)}</DetailWidget>
      </SimpleGrid>
      <Flex flexWrap="wrap">
        <SimpleGrid columns={2} gap="24px">
          <DetailWidget title={t(`detailsHeaders.availableUnits`)}>{project.units.available}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.issuances`)}>{project.units.issued}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.creditingPeriod`)}>{renderCreditingPeriod(project.units.creditingPeriodStart, project.units.creditingPeriodEnd)}</DetailWidget>
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
        <DetailWidget title={t(`detailsHeaders.tags`)}>
          <ExpandableList items={extractTagItemsFromTag(project?.tags)} />
        </DetailWidget>
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
