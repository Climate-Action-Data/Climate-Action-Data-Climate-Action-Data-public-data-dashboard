import { Issuance, IssuanceUnit, ProjectDetails } from '@/@types/ProjectDetails'
import { UnitStatus } from '@/@types/Unit'
import { DetailWidget } from '@/components/atoms/DetailWidget/DetailWidget'
import { IssuanceTable } from '@/components/molecules/IssuanceTable/IssuanceTable'
import { IssuanceTableMobile } from '@/components/molecules/IssuanceTableMobile/IssuanceTableMobile'
import { RetirementTable } from '@/components/molecules/RetirementTable/RetirementTable'
import { Container, Hide, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IssuancesRetirementsProps {
  project: ProjectDetails
}

const getRetiredUnits = (issuances: Issuance[], issuanceId: string) => {
  const issuance = issuances.find((issuance) => issuance.id === issuanceId)
  if (issuance?.units) {
    const units = issuance.units.filter((unit) => unit.status === UnitStatus.RETIRED)
    return units
  } else {
    return []
  }
}

export const IssuancesRetirements = (props: IssuancesRetirementsProps) => {
  const { project } = props
  const [selectedIssuance, setSelectedIssuance] = useState<string | undefined>(undefined)
  const [selectedRetirements, setSelectedRetirements] = useState<IssuanceUnit[] | undefined>(undefined)
  const { t } = useTranslation(`projectDetails`)
  const { t: tHome } = useTranslation(`home`)

  project.issuances.sort((a, b) => Number(b.vintage) - Number(a.vintage))
  const vintages = project.issuances.map((issuance) => issuance.vintage)

  const handleClick = (issuanceId: string) => {
    setSelectedIssuance(issuanceId)
    setSelectedRetirements(getRetiredUnits(project.issuances, issuanceId))
  }

  const renderVintages = () => {
    if (vintages.length === 0) {
      return tHome(`noData`)
    } else if (vintages.length === 1) {
      return vintages[0]
    } else {
      return `${vintages[vintages.length - 1]} - ${vintages[0]}`
    }
  }

  return (
    <>
      <Container padding={[`12px`, `24px`]} w={`100%`} variant="cardSectionNoMargin">
        <SimpleGrid columns={2} gap="24px">
          <DetailWidget title={t(`detailsHeaders.availableUnits`)}>{project.units.available.toLocaleString() ?? tHome(`noData`)}</DetailWidget>
          <DetailWidget title={t(`detailsHeaders.availableVintages`)}>{renderVintages()}</DetailWidget>
        </SimpleGrid>
      </Container>
      <Container padding={0} display="flex" variant="cardSectionNoMargin">
        <Hide above="sm">
          <IssuanceTableMobile issuances={project.issuances} />
        </Hide>
        <Hide below="sm">
          <IssuanceTable onClick={handleClick} issuances={project.issuances} selectedIssuance={selectedIssuance} />
          <RetirementTable retirements={selectedRetirements} />
        </Hide>
      </Container>
    </>
  )
}
