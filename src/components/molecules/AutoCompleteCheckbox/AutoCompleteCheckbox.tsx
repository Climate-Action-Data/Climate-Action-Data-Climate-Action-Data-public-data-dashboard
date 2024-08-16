import { FC, useEffect, useRef, useState } from 'react'
import { Box, Button, Checkbox, Flex, Input, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Spacer, Stack, StackDivider, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'
import { FilterCountIndicator } from '@/components/atoms/FilterCountIndicator/FilterCountIndicator'
import { generateRandomString } from '@/utils/GenerationHelpers'

interface AutoCompleteCheckboxProps {
  label: string
  noOfSelectedFilters: number
  options: string[]
  selectedFilters: string[]
  applyFilters: (values: string[]) => void
  isResultsPage?: boolean
}

const AutoCompleteCheckbox: FC<AutoCompleteCheckboxProps> = (props) => {
  const { label, options, applyFilters, noOfSelectedFilters, selectedFilters, isResultsPage } = props
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState<string>(``)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { t } = useTranslation(`search`)

  const allChecked = options.length != 0 && selectedValues.length === options.length
  const isIndeterminate = selectedValues.length !== 0 && selectedValues.length !== options.length

  const popoverContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedValues([...selectedFilters])
  }, [])

  const handleOnClose = () => {
    setIsOpen(false)
    setSearchInput(``)
    setSelectedValues([...selectedFilters])
  }

  const handleOnInputChange = (value: string) => {
    setSearchInput(value)
  }

  const handleTopCheckboxOnChange = () => {
    if (isIndeterminate || selectedValues.length === 0) {
      setSelectedValues([...options])
    } else {
      setSelectedValues([])
    }
  }

  const handleCheckboxOnChange = (checked: boolean, value: string) => {
    if (checked) {
      setSelectedValues([...selectedValues, value])
    } else {
      setSelectedValues((prevState) => prevState.filter((selectedValue) => selectedValue !== value))
    }
  }

  const handleOnOpen = () => {
    setIsOpen(true)
  }

  const handleOnApplyClick = () => {
    setIsOpen(false)
    applyFilters(selectedValues)
  }

  const generateVariant = () => {
    if (isResultsPage) {
      return noOfSelectedFilters !== 0 ? `dropdownSelectedDark` : `dropdownUnselectedDark`
    }
    return noOfSelectedFilters !== 0 ? `dropdownSelected` : `dropdownUnselected`
  }

  const isApplyEnabled = selectedFilters.length > 0 || selectedValues.length > 0

  return (
    <Popover gutter={0} placement="bottom-start" matchWidth isOpen={isOpen} onOpen={handleOnOpen} onClose={handleOnClose} closeOnBlur closeOnEsc>
      <PopoverTrigger>
        <Button variant={generateVariant()}>
          <Flex fontWeight={`normal`} fontSize={`16px`} alignItems={`center`} grow={1}>
            {label}
            <Box width={`8px`} />
            {noOfSelectedFilters !== 0 && <FilterCountIndicator count={noOfSelectedFilters} isResultsPage={isResultsPage} />}
            <Spacer />
            <DropDownIcon />
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent border={0} borderRadius={`8px`} width={[`100%`, null, null, `298px`]} backgroundColor={`white`} boxShadow={`xl`}>
        <PopoverHeader border={0} boxShadow="md" padding={0}>
          <VStack divider={<StackDivider height={`1px`} borderColor={`#B8BEC0`} />} spacing={0}>
            <Flex width={`100%`} alignItems={`center`} padding={`8px`}>
              <SearchIcon color={`lightGray.700`} paddingY={`auto`} marginRight={`8px`} />
              <Input
                placeholder={t(`search`)}
                variant={`autoCompleteCheckboxTextInput`}
                value={searchInput}
                onChange={(event) => {
                  handleOnInputChange(event.target.value)
                }}
              />
            </Flex>
            <Flex width={`100%`} marginTop={`4px`} alignItems={`center`} padding={`8px 0.75rem`}>
              <Checkbox isIndeterminate={isIndeterminate} data-testid={`AutoCompleteCheckbox-top-checkbox`} isChecked={allChecked} onChange={handleTopCheckboxOnChange} />
              <Spacer />
              <Button onClick={handleOnApplyClick} isDisabled={!isApplyEnabled} variant={`applyButton`}>
                {t(`apply`)}
              </Button>
            </Flex>
          </VStack>
        </PopoverHeader>
        <PopoverBody maxHeight={`200px`} width={`100%`} overflowY={`scroll`}>
          <Stack spacing={5} direction="column">
            {options?.map(
              (value) =>
                value.toUpperCase().includes(searchInput.toUpperCase()) && (
                  <Checkbox
                    key={`auto-complete-${generateRandomString()}`}
                    name={value}
                    isChecked={selectedValues.includes(value)}
                    onChange={(event) => {
                      handleCheckboxOnChange(event.target.checked, value)
                    }}
                    textAlign={`start`}
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
