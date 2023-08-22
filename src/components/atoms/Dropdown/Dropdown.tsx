import { Button, List, ListItem, Popover, PopoverBody, PopoverContent, PopoverTrigger, Box, Text } from '@chakra-ui/react'
import { DropDownIcon } from '../DropDownIcon/DropDownIcon'
import { generateRandomString } from '@/utils/GenerationHelpers'
import { useState } from 'react'

export interface Item {
  label: string
  value: string
}

export interface DropdownProps<T extends Item> {
  items: T[]
  placeholder: string
  label?: string
  highlightItemBg?: string
  onItemClick: (item: T) => void
}

export const Dropdown = <T extends Item>(props: DropdownProps<T>) => {
  const { items, onItemClick, placeholder } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<T | undefined>(items[0] ?? undefined)

  const handleItemClick = (item: T) => {
    setIsOpen(false)
    setSelectedItem(item)
    onItemClick?.(item)
  }

  const renderItems = () => {
    return items.map((item) => {
      return (
        <Box
          data-testid="dropdown-item"
          onClick={() => handleItemClick(item)}
          key={`dropdown-item-${generateRandomString()}`}
          _hover={{ cursor: `pointer`, backgroundColor: `lightGray.300` }}
        >
          <ListItem color="lightGray.700" fontSize="14px" padding="8px 16px 8px 16px">
            {item.label}
          </ListItem>
        </Box>
      )
    })
  }

  const handleTogglePopover = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseLeavePopover = () => {
    setIsOpen(false)
  }

  return (
    <Popover isOpen={isOpen} gutter={0} closeOnBlur={true} matchWidth>
      <PopoverTrigger>
        <Button textAlign={`left`} onClick={handleTogglePopover} data-testid="dropdown-button" variant="dropdown">
          <Box flex={1}>
            {placeholder}&nbsp;
            <Text as={`span`} fontWeight="500">
              {selectedItem?.label}
            </Text>
          </Box>
          <DropDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onMouseLeave={handleMouseLeavePopover}
        boxShadow="2px 2px 8px 0px #0000001A"
        border="none"
        padding="0px"
        data-testid="dropdown-body"
        maxHeight={`150px`}
        overflowY="scroll"
      >
        <PopoverBody padding={0}>
          <List>{renderItems()}</List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
