import { Box, Button, Flex, Spacer, Stack, StackDivider } from '@chakra-ui/react'
import AutoCompleteCheckbox from '@/components/molecules/AutoCompleteCheckbox/AutoCompleteCheckbox'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'

const SearchBar = () => {
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
          <AutoCompleteCheckbox label={`Standard`} />
          <AutoCompleteCheckbox label={`Methodology`} />
          <AutoCompleteCheckbox label={`Energy`} />
          <AutoCompleteCheckbox label={`Country`} />
          <AutoCompleteCheckbox label={`Crediting Period`} />
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
