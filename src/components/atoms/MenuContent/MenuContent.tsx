import { generateRandomString } from '@/utils/GenerationHelpers'
import { MenuItem, MenuList, Text } from '@chakra-ui/react'

export interface MenuItemProps {
  dataTestId?: string
  onClick?: () => void
  icon?: React.ReactNode
  text: string
}

interface MenuContentProps {
  menuItems: MenuItemProps[]
}

export const MenuContent = (props: MenuContentProps) => {
  const { menuItems } = props

  const generateMenuItems = () => {
    return menuItems.map((item) => {
      return (
        <MenuItem key={`menu-item-${generateRandomString()}`} data-testid={item.dataTestId} onClick={item.onClick} minH="48px">
          <Text flex={1} as="span">
            {item.text}
          </Text>
          {item.icon}
        </MenuItem>
      )
    })
  }
  return <MenuList>{generateMenuItems()}</MenuList>
}
