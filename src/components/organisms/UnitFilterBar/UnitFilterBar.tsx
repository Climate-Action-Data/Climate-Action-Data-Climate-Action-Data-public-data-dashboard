import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Spacer, Stack, StackDivider } from '@chakra-ui/react'

import { useActions, useAppState, useEffects } from '@/overmind'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'
import VintageYearFilter from '@/components/molecules/VintageYearFilter/VintageYearFilter'
import { KYOTO_PROTOCOL_START_YEAR } from '@/@types/CarbonStandards'
import { YearsFilter } from '@/@types/ProjectSearchFilterValues'
import FilterBarWrapper from '@/components/molecules/FilterBarWarpper/FilterBarWrapper'
import SearchButton from '@/components/atoms/SearchButton/SearchButton'

const UnitFilterBar: FC = () => {
  const {
    selectedUnitSearchFilterValues: { searchFilterValues: selectedSearchFilters },
    allSearchFilterValues: { searchFilterValues, isEmpty },
  } = useAppState().searchFilters

  const { setUnitCountriesFilter, setUnitStandardsFilter, setUnitSectorFilter, setUnitStatusFilter, setUnitVintageYearFilter } = useActions().searchFilters
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

  const handleSetUnitStatusFilter = (value: string[]) => {
    setUnitStatusFilter(value)
  }

  const handleSetUnitsStandardsFilter = (value: string[]) => {
    setUnitStandardsFilter(value)
  }

  const handleSetUnitSectorFilter = (value: string[]) => {
    setUnitSectorFilter(value)
  }

  const handleSetUnitCountriesFilter = (value: string[]) => {
    setUnitCountriesFilter(value)
  }

  const handleSetUnitVintageYearFilter = (value: YearsFilter) => {
    setUnitVintageYearFilter(value)
  }

  return (
    <FilterBarWrapper>
      <Stack direction={[`column`, null, null, `row`]}>
        <Stack direction={[`column`, null, null, `row`]} divider={<StackDivider borderColor="lightGray.400" />} width="100%">
          <AutoCompleteCheckbox
            label={t(`filterBar.unitStatus`)}
            options={searchFilterValues.unitStatus}
            selectedFilters={selectedSearchFilters.unitStatus}
            noOfSelectedFilters={selectedSearchFilters.unitStatus.length}
            applyFilters={handleSetUnitStatusFilter}
          />
          <AutoCompleteCheckbox
            label={t(`filterBar.standard`)}
            options={searchFilterValues.projectStatus}
            selectedFilters={selectedSearchFilters.projectStatus}
            noOfSelectedFilters={selectedSearchFilters.projectStatus.length}
            applyFilters={handleSetUnitsStandardsFilter}
          />

          <AutoCompleteCheckbox
            label={t(`filterBar.sector`)}
            options={searchFilterValues.sectors}
            selectedFilters={selectedSearchFilters.sectors}
            noOfSelectedFilters={selectedSearchFilters.sectors.length}
            applyFilters={handleSetUnitSectorFilter}
          />
          <AutoCompleteCheckbox
            label={t(`filterBar.country`)}
            options={searchFilterValues.countries}
            selectedFilters={selectedSearchFilters.countries}
            noOfSelectedFilters={selectedSearchFilters.countries.length}
            applyFilters={handleSetUnitCountriesFilter}
          />
          <VintageYearFilter
            label={t(`filterBar.vintageYear`)}
            yearFilter={selectedSearchFilters.vintageYear}
            earliestYear={KYOTO_PROTOCOL_START_YEAR}
            onYearChange={handleSetUnitVintageYearFilter}
          />
        </Stack>
        <Flex>
          <Spacer minWidth={`32px`} />
          <SearchButton href={`/search/units`} />
        </Flex>
      </Stack>
    </FilterBarWrapper>
  )
}

export default UnitFilterBar
