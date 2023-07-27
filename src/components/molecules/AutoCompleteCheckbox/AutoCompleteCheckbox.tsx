import { FC, useState } from 'react'
import { Box, Button, Checkbox, Flex, Input, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Spacer, Stack, StackDivider, VStack } from '@chakra-ui/react'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'
import { FilterCountIndicator } from '@/components/atoms/FilterCountIndicator/FilterCountIndicator'

interface AutoCompleteCheckboxProps {
  label: string
  noOfSelectedFilters: number
  options: string[]
  selectedFilters: string[]
  applyFilters: (values: string[]) => void
}

const AutoCompleteCheckbox: FC<AutoCompleteCheckboxProps> = (props) => {
  const { label, options, applyFilters, noOfSelectedFilters, selectedFilters } = props
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState<string>(``)

  const allChecked = options.length != 0 && selectedValues.length === options.length
  const isIndeterminate = selectedValues.length !== 0 && selectedValues.length !== options.length

  return (
    <Popover
      gutter={0}
      isLazy
      placement="bottom-start"
      matchWidth
      onClose={() => {
        setSearchInput(``)
        setSelectedValues([...selectedFilters])
      }}
    >
      <PopoverTrigger>
        <Button variant={noOfSelectedFilters !== 0 ? `dropdownSelected` : `dropdownUnselected`}>
          <Flex fontFamily={`aeonik`} fontWeight={`normal`} fontSize={`16px`} alignItems={`center`} grow={1}>
            {label}
            <Box width={`8px`} />
            {noOfSelectedFilters !== 0 && <FilterCountIndicator count={noOfSelectedFilters} />}
            <Spacer />
            <DropDownIcon />
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent border={0} borderRadius={`4px`} width={[`100%`, null, null, `298px`]} backgroundColor={`white`} boxShadow={`xl`}>
        <PopoverHeader border={0} boxShadow="md" padding={0}>
          <VStack divider={<StackDivider height={`1px`} borderColor={`#B8BEC0`} />} spacing={0}>
            <Flex width={`100%`} alignItems={`center`} padding={`8px`}>
              <SearchIcon color={`lightGray.700`} paddingY={`auto`} marginRight={`8px`} />
              <Input
                placeholder={`Search`}
                variant={`autoCompleteCheckboxTextInput`}
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.target.value)
                }}
              />
            </Flex>
            <Flex width={`100%`} marginTop={`4px`} alignItems={`center`} padding={`8px 0.75rem`}>
              <Checkbox
                isIndeterminate={isIndeterminate}
                isChecked={allChecked}
                onChange={() => {
                  if (isIndeterminate || selectedValues.length === 0) {
                    setSelectedValues([...options])
                  } else {
                    setSelectedValues([])
                  }
                }}
              />
              <Spacer />
              <Button onClick={() => applyFilters(selectedValues)} variant={`textLink`}>
                Apply
              </Button>
            </Flex>
          </VStack>
        </PopoverHeader>
        <PopoverBody maxHeight={`200px`} width={`100%`} overflowY={`scroll`}>
          <Stack spacing={5} direction="column">
            {options &&
              options.map(
                (value, index) =>
                  value.toUpperCase().includes(searchInput.toUpperCase()) && (
                    <Checkbox
                      key={`${label}-${index}`}
                      isChecked={selectedValues.includes(value)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelectedValues([...selectedValues, value])
                        } else {
                          setSelectedValues((prevState) => prevState.filter((selectedValue) => selectedValue !== value))
                        }
                      }}
                    >
                      {value}
                    </Checkbox>
                  ),
              )}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
export default AutoCompleteCheckbox
