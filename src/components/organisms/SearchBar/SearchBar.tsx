import { Box, Button, Flex, Spacer, Stack, StackDivider } from '@chakra-ui/react'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { FC, useEffect } from 'react'
import { useActions, useAppState, useEffects } from '@/overmind'

const SearchBar: FC = () => {
  const { isEmpty, countries, methodologies, projectStatuses, sectors, standards } = useAppState().searchFilters
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
          <AutoCompleteCheckbox label={`Standard`} values={standards} />
          <AutoCompleteCheckbox label={`Methodology`} values={methodologies} />
          <AutoCompleteCheckbox label={`Status`} values={projectStatuses} />
          <AutoCompleteCheckbox label={`Sector`} values={sectors} />
          <AutoCompleteCheckbox label={`Country`} values={countries} />
          <AutoCompleteCheckbox label={`Crediting Period`} values={[]} />
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
