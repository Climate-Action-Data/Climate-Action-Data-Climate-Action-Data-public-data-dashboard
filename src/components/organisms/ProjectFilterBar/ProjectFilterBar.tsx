import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Stack, StackDivider } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'
import CreditingPeriodFilter from '@/components/molecules/CreditingPeriodFilter/CreditingPeriodFilter'
import { KYOTO_PROTOCOL_START_DATE } from '@/@types/CarbonStandards'
import { DatesFilter } from '@/@types/ProjectSearchFilterValues'
import FilterBarWrapper from '@/components/molecules/FilterBarWarpper/FilterBarWrapper'

interface ProjectFilterBarProps {
  isResultsPage?: boolean
}

const ProjectFilterBar: FC<ProjectFilterBarProps> = (props) => {
  const { isResultsPage } = props
  const {
    allSearchFilterValues: { searchFilterValues, isEmpty },
    selectedProjectSearchFilterValues: { searchFilterValues: selectedSearchFilters },
  } = useAppState().searchFilters

  const { setProjectCountriesFilter, setProjectMethodologiesFilter, setProjectSectorsFilter, setProjectStandardsFilter, setProjectCreditingPeriodFilter } =
    useActions().searchFilters
  const { getGovernanceData } = useEffects().searchFilters
  const { transformGovernanceDataToSearchFilterData } = useActions().searchFilters
  const { t } = useTranslation(`search`)

  useEffect(() => {
    if (isEmpty) {
      getGovernanceData().then((result) => {
        transformGovernanceDataToSearchFilterData(result)
      })
    }
  }, [])

  const handleProjectStatusFilter = (value: string[]) => {
    setProjectStandardsFilter(value)
  }

  const handleSetProjectMethodologiesFilter = (value: string[]) => {
    setProjectMethodologiesFilter(value)
  }

  const handleSetProjectSectorsFilter = (value: string[]) => {
    setProjectSectorsFilter(value)
  }

  const handleSetProjectCountriesFilter = (value: string[]) => {
    setProjectCountriesFilter(value)
  }

  const handleSetProjectCreditingPeriodFilter = (value: DatesFilter) => {
    setProjectCreditingPeriodFilter(value)
  }

  return (
    <FilterBarWrapper isResultsPage={isResultsPage}>
      <Stack direction={[`column`, null, null, `row`]}>
        <Stack direction={[`column`, null, null, `row`]} divider={<StackDivider borderColor="lightGray.400" />} width="100%">
          <AutoCompleteCheckbox
            label={t(`filterBar.standard`)}
            options={searchFilterValues.projectStatus}
            selectedFilters={selectedSearchFilters.projectStatus}
            noOfSelectedFilters={selectedSearchFilters.projectStatus.length}
            applyFilters={handleProjectStatusFilter}
            isResultsPage={isResultsPage}
          />
          <AutoCompleteCheckbox
            label={t(`filterBar.methodology`)}
            options={searchFilterValues.methodologies}
            selectedFilters={selectedSearchFilters.methodologies}
            noOfSelectedFilters={selectedSearchFilters.methodologies.length}
            applyFilters={handleSetProjectMethodologiesFilter}
            isResultsPage={isResultsPage}
          />
          <AutoCompleteCheckbox
            label={t(`filterBar.sector`)}
            options={searchFilterValues.sectors}
            selectedFilters={selectedSearchFilters.sectors}
            noOfSelectedFilters={selectedSearchFilters.sectors.length}
            applyFilters={handleSetProjectSectorsFilter}
            isResultsPage={isResultsPage}
          />
          <AutoCompleteCheckbox
            label={t(`filterBar.country`)}
            options={searchFilterValues.countries}
            selectedFilters={selectedSearchFilters.countries}
            noOfSelectedFilters={selectedSearchFilters.countries.length}
            applyFilters={handleSetProjectCountriesFilter}
            isResultsPage={isResultsPage}
          />
          <CreditingPeriodFilter
            label={t(`filterBar.creditingPeriod`)}
            dateFilter={selectedSearchFilters.creditingPeriod}
            earliestDate={KYOTO_PROTOCOL_START_DATE}
            applyFilters={handleSetProjectCreditingPeriodFilter}
            isResultsPage={isResultsPage}
          />
        </Stack>
      </Stack>
    </FilterBarWrapper>
  )
}

export default ProjectFilterBar
