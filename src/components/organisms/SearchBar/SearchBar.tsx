import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Flex, Spacer, Stack, StackDivider } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

import { useActions, useAppState, useEffects } from '@/overmind'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import CreditingPeriodFilter from '@/components/molecules/CreditingPeriodFilter/CreditingPeriodFilter'

import styles from './SearchBar.module.scss'

const SearchBar: FC = () => {
  const {
    allSearchFilterValues: { searchFilterValues, isEmpty },
    selectedSearchFilterValues: { searchFilterValues: selectedSearchFilters },
  } = useAppState().searchFilters

  const { setCountriesFilter, setMethodologiesFilter, setProjectStatusesFilter, setSectorsFilter, setStandardsFilter, setCreditingPeriodFilter } = useActions().searchFilters
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

  return (
    <Box className={styles.searchBar} width={[`100%`, null, null, `min-content`]}>
      <Stack direction={[`column`, null, null, `row`]}>
        <Stack direction={[`column`, null, null, `row`]} divider={<StackDivider borderColor={`lightGray.400`} />} width={[`100%`]}>
          <AutoCompleteCheckbox
            label={t(`searchBar.standard`)}
            options={searchFilterValues.standards}
            selectedFilters={selectedSearchFilters.standards}
            noOfSelectedFilters={selectedSearchFilters.standards.length}
            applyFilters={setStandardsFilter}
          />
          <AutoCompleteCheckbox
            label={t(`searchBar.methodology`)}
            options={searchFilterValues.methodologies}
            selectedFilters={selectedSearchFilters.methodologies}
            noOfSelectedFilters={selectedSearchFilters.methodologies.length}
            applyFilters={setMethodologiesFilter}
          />
          <AutoCompleteCheckbox
            label={t(`searchBar.status`)}
            options={searchFilterValues.projectStatuses}
            selectedFilters={selectedSearchFilters.projectStatuses}
            noOfSelectedFilters={selectedSearchFilters.projectStatuses.length}
            applyFilters={setProjectStatusesFilter}
          />
          <AutoCompleteCheckbox
            label={t(`searchBar.sector`)}
            options={searchFilterValues.sectors}
            selectedFilters={selectedSearchFilters.sectors}
            noOfSelectedFilters={selectedSearchFilters.sectors.length}
            applyFilters={setSectorsFilter}
          />
          <AutoCompleteCheckbox
            label={t(`searchBar.country`)}
            options={searchFilterValues.countries}
            selectedFilters={selectedSearchFilters.countries}
            noOfSelectedFilters={selectedSearchFilters.countries.length}
            applyFilters={setCountriesFilter}
          />
          <CreditingPeriodFilter label={t(`searchBar.creditingPeriod`)} applyFilter={setCreditingPeriodFilter} selectedFilterDates={selectedSearchFilters.filterDates} />
        </Stack>
        <Flex>
          <Spacer minWidth={`32px`} />
          <Link
            as={`button`}
            variant={`accentPrimary32`}
            padding={`8px 16px`}
            width={`min-content`}
            _hover={{ backgroundColor: `green.600` }}
            _active={{ backgroundColor: `green.700` }}
            href={`/search/projects`}
          >
            <Flex alignItems={`center`}>
              {t(`search`)}
              <SearchIcon width={6} height={6} />
            </Flex>
          </Link>
        </Flex>
      </Stack>
    </Box>
  )
}

export default SearchBar
