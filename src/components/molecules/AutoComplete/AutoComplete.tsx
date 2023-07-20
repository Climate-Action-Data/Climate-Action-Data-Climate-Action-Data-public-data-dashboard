/* eslint-disable prettier/prettier */
import * as React from 'react'

import {
  FormLabel,
  Stack,
  Box,
  List,
  ListItem,
  Highlight,
  Button,
  Input,
  PopoverTrigger,
  Popover,
  PopoverBody,
  PopoverContent,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { DropDownIcon } from '@/components/atoms/DropDownIcon/DropDownIcon'
import { useEffect } from 'react'
// import { IconProps, CheckCircleIcon, ArrowDownIcon } from '@chakra-ui/icons'

export interface Item {
  label: string
  value: string
}

export interface AutoCompleteProps<T extends Item> {
  items: T[]
  placeholder: string
  label?: string
  highlightItemBg?: string
  onItemClick: (item: T) => void
  onItemHover?: (item: T) => void
  onDropDownLeave?: () => void
}

export const AutoComplete = <T extends Item>(props: AutoCompleteProps<T>): React.ReactElement<AutoCompleteProps<T>> => {
  const { items, highlightItemBg = `lightGray.300`, label, placeholder, onItemClick, onItemHover, onDropDownLeave } = props

  const [inputValue, setInputValue] = React.useState(``)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputItems, setInputItems] = React.useState<T[]>([])
  const [ isOpen, setIsOpen ] = React.useState<boolean>(false)

  useEffect(()=> {
    setInputItems(items)
  }, [items])

  const toggleIsOpen = () => {
    (isOpen) ? setIsOpen(false) : setIsOpen(true)
  }
  /* Default Items Renderer */
  function defaultItemRenderer<T extends Item>(selected: T) {
    return selected.label
  }
  const inputElement = React.useRef<HTMLInputElement | null>(null)

  return (
    <Stack>
      {label && <FormLabel>{label}</FormLabel>}
      <Popover isOpen={isOpen} gutter={0} closeOnBlur={true} matchWidth initialFocusRef={inputElement}>
        <PopoverTrigger>
          <Stack>
            <InputGroup size="md">
              <Input data-testid="dropdown_input" onClick={toggleIsOpen} pr="2.5rem" placeholder={placeholder} ref={inputElement} onChange={(e) => setInputValue(e.target.value)}/>
              <InputRightElement width="2.5rem">
                <Button data-testid="dropdown-button" onClick={toggleIsOpen} variant="lightGray" aria-label="toggle menu" h="1.75rem" size="sm">
                  <DropDownIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
        </PopoverTrigger>
        <PopoverContent data-testid="dropdown-body" onMouseLeave={() => {setIsOpen(false); return (onDropDownLeave) ? onDropDownLeave(): undefined}} maxHeight={`150px`} overflowY="scroll">
          <PopoverBody>
            <List>
              {inputItems.map((item, index) => (
                item.value.toUpperCase().includes(inputValue.toUpperCase()) &&
                    (<ListItem
                      px={2}
                      py={1}
                      borderBottom="1px solid rgba(0,0,0,0.01)"
                      _hover={{ bg: `lightGray.200`, cursor: `pointer` }}
                      onMouseEnter={() => (onItemHover) ? onItemHover(item): undefined}
                      onClick={() => {setIsOpen(false);onItemClick(item)}}
                      key={`${item.value}`}
                      data-testid={`dropdown-item-${index}`}
                    >
                      <Box display="inline-flex" alignItems="center">
                        <Highlight styles={{ px:0.5,bg: highlightItemBg }} query={[inputValue || ``]}>
                          {defaultItemRenderer(item)}
                        </Highlight>
                      </Box>
                    </ListItem>)

              ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Stack>
  )
}
