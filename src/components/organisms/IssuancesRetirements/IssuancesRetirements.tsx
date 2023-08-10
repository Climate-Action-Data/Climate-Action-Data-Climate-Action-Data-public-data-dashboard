import { IssuanceUnit, ProjectDetails } from '@/@types/ProjectDetails'
import { UnitStatus } from '@/@types/Unit'
import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { IssuanceTable } from '@/components/molecules/IssuanceTable/IssuanceTable'
import { RetirementTable } from '@/components/molecules/RetirementTable/RetirementTable'
import { Container, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IssuancesRetirementsProps {
  project: ProjectDetails
}

export const IssuancesRetirements = (props: IssuancesRetirementsProps) => {
  const { project } = props
  const [selectedRetirements, setSelectedRetirements] = useState<IssuanceUnit[] | undefined>(undefined)
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)

  const handleClick = (issuanceId: string) => {
    const issuance = project.issuances.find((issuance) => issuance.id === issuanceId)
    if (issuance) {
      setSelectedRetirements(issuance.units.filter((unit) => unit.status === UnitStatus.RETIRED))
    }
  }

  return (
    <>
      <Container padding={[`12px`, `24px`]} w={`100%`} variant="cardSectionNoMargin">
        <SimpleGrid columns={2} gap="24px">
          <DetailWidget title={t(`detailsHeaders.availableUnits`)}>{project.units.available ?? tHome(`noData`)}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.availableVintages`)}>{project?.availableVintages ?? tHome(`noData`)}</DetailWidget>
        </SimpleGrid>
      </Container>
      <Container padding={0} display="flex" variant="cardSectionNoMargin">
        <IssuanceTable onClick={handleClick} issuances={project.issuances} />
        <RetirementTable retirements={selectedRetirements} />
      </Container>
    </>
  )
}
