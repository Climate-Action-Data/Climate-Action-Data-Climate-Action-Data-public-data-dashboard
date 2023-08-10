import { ProjectDetails } from '@/@types/ProjectDetails'
import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { IssuanceTable } from '@/components/molecules/IssuanceTable/IssuanceTable'
import { Container, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface IssuancesRetirementsProps {
  project: ProjectDetails
}

export const IssuancesRetirements = (props: IssuancesRetirementsProps) => {
  const { project } = props
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)

  return (
    <>
      <Container padding={[`12px`, `24px`]} w={`100%`} variant="cardSectionNoMargin">
        <SimpleGrid columns={2} gap="24px">
          <DetailWidget title={t(`detailsHeaders.availableUnits`)}>{project.units.available ?? tHome(`noData`)}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.availableVintages`)}>{project?.availableVintages ?? tHome(`noData`)}</DetailWidget>
        </SimpleGrid>
      </Container>
      <Container padding={0} flex={2} variant="cardSectionNoMargin">
        <IssuanceTable issuances={project.issuances} />
      </Container>
    </>
  )
}
