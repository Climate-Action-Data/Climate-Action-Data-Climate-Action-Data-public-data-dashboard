import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Flex, Spacer, Stack, StackDivider } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

import { useActions, useAppState, useEffects } from '@/overmind'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import VintageYearFilter from '@/components/molecules/VintageYearFilter/VintageYearFilter'
import { KYOTO_PROTOCOL_START_YEAR } from '@/@types/CarbonStandards'
import { YearsFilter } from '@/@types/ProjectSearchFilterValues'

const UnitFilterBar: FC = () => {
  const {
    allSearchFilterValues: { searchFilterValues, isEmpty },
    selectedUnitSearchFilterValues: { searchFilterValues: selectedSearchFilters },
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

export default UnitFilterBar
