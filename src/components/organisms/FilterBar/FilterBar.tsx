import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Flex, Spacer, Stack, StackDivider } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

import { useActions, useAppState, useEffects } from '@/overmind'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import CreditingPeriodFilter from '@/components/molecules/CreditingPeriodFilter/CreditingPeriodFilter'

const FilterBar: FC = () => {
  const {
    allSearchFilterValues: { searchFilterValues, isEmpty },
    selectedSearchFilterValues: { searchFilterValues: selectedSearchFilters },
  } = useAppState().searchFilters

  const { setCountriesFilter, setMethodologiesFilter, setSectorsFilter, setStandardsFilter } = useActions().searchFilters
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
    <Box
      sx={{
        color: `black`,
        boxShadow: `2px 2px 8px 0px #0000001A;`,
        minHeight: `min-content`,
        borderRadius: `12px`,
        background: `#FFFFFF`,
        padding: `16px`,
        marginX: `auto`,
        w: [`100%`, null, null, `min-content`],
      }}
    >
      <Stack direction={[`column`, null, null, `row`]}>
        <Stack direction={[`column`, null, null, `row`]} divider={<StackDivider borderColor={`#B8BEC0`} />} width={[`100%`]}>
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
          <CreditingPeriodFilter label={t(`searchBar.creditingPeriod`)} />
        </Stack>
        <Flex>
          <Spacer minWidth={`32px`} />
          <Link
            as={`button`}
            variant={`accentPrimary32`}
            padding={`8px 16px`}
            width={`min-content`}
            _hover={{ backgroundColor: `#24BD63` }}
            _active={{ backgroundColor: `#1B8E4A` }}
            href={`/search/projects`}
            fontSize={`16px`}
            fontWeight={`medium`}
          >
            <Flex alignItems={`center`}>
              {t(`search`)}
              <SearchIcon width={`16px`} height={`16px`} marginLeft={`4px`} />
            </Flex>
          </Link>
        </Flex>
      </Stack>
    </Box>
  )
}

export default FilterBar
