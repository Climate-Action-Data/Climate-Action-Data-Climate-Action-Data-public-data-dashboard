import { FC } from 'react'
import { Button, Checkbox, Divider, Flex, Input, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import { SearchIcon } from '@/components/atoms/SearchIcon/SearchIcon'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'

interface AutoCompleteCheckboxProps {
  label: string
}

const AutoCompleteCheckbox: FC<AutoCompleteCheckboxProps> = (props) => {
  const { label } = props

  // const [selectedValues, setSelectedValues] = useState<string[]>([])
  const allChecked = true
  const isIndeterminate = false
  // I need a function to count from 1 to x
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
        <PopoverHeader border={0} boxShadow="xl">
          <VStack divider={<Divider />}>
            <Flex width={`100%`} alignSelf={`center`}>
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
            <Flex width={`100%`}>
              <Checkbox isIndeterminate={isIndeterminate} isChecked={allChecked} />
              <Spacer />
              <Text>Apply</Text>
            </Flex>
          </VStack>
        </PopoverHeader>
        <PopoverBody maxHeight={`200px`} width={`100%`} overflowY={`scroll`}>
          <Stack spacing={5} direction="column">
            <Checkbox borderRadius={`4px`} borderColor={`lightGray.700`} defaultChecked>
              Checkbox
            </Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Checkbox defaultChecked>Checkbox</Checkbox>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
export default AutoCompleteCheckbox
