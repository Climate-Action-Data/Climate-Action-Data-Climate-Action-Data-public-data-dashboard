import { Box, Button, Flex, Spacer, Stack, StackDivider } from '@chakra-ui/react'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { FC, useEffect } from 'react'
import { useActions, useAppState, useEffects } from '@/overmind'

const SearchBar: FC = () => {
  const {
    allSearchFilterValues: { searchFilterValues, isEmpty },
    selectedSearchFilterValues: { searchFilterValues: selectedSearchFilters },
  } = useAppState().searchFilters

  const { setCountriesFilter, setMethodologiesFilter, setProjectStatusesFilter, setSectorsFilter, setStandardsFilter } = useActions().searchFilters
  const { getGovernanceData } = useEffects().searchFilters
  const { transformGovernanceDataToSearchFilterData } = useActions().searchFilters

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
            label={`Standard`}
            options={searchFilterValues.standards}
            selectedFilters={selectedSearchFilters.standards}
            noOfSelectedFilters={selectedSearchFilters.standards.length}
            applyFilters={setStandardsFilter}
          />
          <AutoCompleteCheckbox
            label={`Methodology`}
            options={searchFilterValues.methodologies}
            selectedFilters={selectedSearchFilters.methodologies}
            noOfSelectedFilters={selectedSearchFilters.methodologies.length}
            applyFilters={setMethodologiesFilter}
          />
          <AutoCompleteCheckbox
            label={`Status`}
            options={searchFilterValues.projectStatuses}
            selectedFilters={selectedSearchFilters.projectStatuses}
            noOfSelectedFilters={selectedSearchFilters.projectStatuses.length}
            applyFilters={setProjectStatusesFilter}
          />
          <AutoCompleteCheckbox
            label={`Sector`}
            options={searchFilterValues.sectors}
            selectedFilters={selectedSearchFilters.sectors}
            noOfSelectedFilters={selectedSearchFilters.sectors.length}
            applyFilters={setSectorsFilter}
          />
          <AutoCompleteCheckbox
            label={`Country`}
            options={searchFilterValues.countries}
            selectedFilters={selectedSearchFilters.countries}
            noOfSelectedFilters={selectedSearchFilters.countries.length}
            applyFilters={setCountriesFilter}
          />
          {/*<AutoCompleteCheckbox label={`Crediting Period`} values={[]} />*/}
        </Stack>
        <Flex>
          <Spacer minWidth={`32px`} />
          <Button
            variant={`accentPrimary32`}
            width={`min-content`}
            rightIcon={<SearchIcon width={6} height={6} />}
            _hover={{ backgroundColor: `#24BD63` }}
            _active={{ backgroundColor: `#1B8E4A` }}
          >
            Search
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}

export default SearchBar
