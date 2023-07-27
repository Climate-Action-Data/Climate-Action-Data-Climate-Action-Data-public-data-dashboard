import { FC, useState } from 'react'
import { Button, Checkbox, Flex, Input, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Spacer, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'

interface AutoCompleteCheckboxProps {
  label: string
  values: string[]
}

const AutoCompleteCheckbox: FC<AutoCompleteCheckboxProps> = (props) => {
  const { label, values } = props
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const allChecked = selectedValues.length === values.length
  const isIndeterminate = selectedValues.length !== 0 && selectedValues.length !== values.length

  return (
    <Popover gutter={0} isLazy placement="bottom-start" matchWidth>
      <PopoverTrigger>
        <Button backgroundColor={`white`} _hover={{ backgroundColor: `#EDEFEF` }} _active={{ backgroundColor: `#DBDEE0` }}>
          <Flex fontFamily={`aeonik`} fontWeight={`normal`} fontSize={`16px`} alignItems={`center`} grow={1}>
            {label}
            <Spacer minWidth={`10px`} />
            <DropDownIcon />
          </Flex>
        </Button>
      </PopoverTrigger>
      <PopoverContent border={0} borderRadius={`4px`} width={[`100%`, null, null, `298px`]} backgroundColor={`white`} boxShadow={`xl`}>
        <PopoverHeader border={0} boxShadow="md" padding={0}>
          <VStack divider={<StackDivider height={`1px`} borderColor={`#B8BEC0`} />} spacing={0}>
            <Flex width={`100%`} alignItems={`center`} padding={`8px`}>
              <Input
                placeholder="Search"
                border={`none`}
                borderRadius={0}
                padding={0}
                height={`20px`}
                fontFamily={`aeonik`}
                fontSize={`14px`}
                color={`lightGray.700`}
                focusBorderColor={`transparent`}
                _highlighted={{ border: `none` }}
                _selected={{ border: `none` }}
              />
              <SearchIcon color={`lightGray.700`} paddingY={`auto`} />
            </Flex>
            <Flex width={`100%`} marginTop={`4px`} alignItems={`center`} padding={`8px`}>
              <Checkbox
                isIndeterminate={isIndeterminate}
                isChecked={allChecked}
                onChange={() => {
                  if (isIndeterminate || selectedValues.length === 0) {
                    setSelectedValues(values)
                  } else {
                    setSelectedValues([])
                  }
                }}
              />
              <Spacer />
              <Text>Apply</Text>
            </Flex>
          </VStack>
        </PopoverHeader>
        <PopoverBody maxHeight={`200px`} width={`100%`} overflowY={`scroll`}>
          <Stack spacing={5} direction="column">
            {values &&
              values.map((value, index) => (
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
              ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
export default AutoCompleteCheckbox
