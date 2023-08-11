import { FC, PropsWithChildren } from 'react'
import { Circle, Tab, TabProps, useTab } from '@chakra-ui/react'

const HeaderTab: FC<PropsWithChildren<TabProps>> = (props) => {
  const tabProps = { ...useTab(props), ariaDisabled: false }
  const isSelected = tabProps[`aria-selected`]
  const textColor = isSelected ? `gray.500` : `lightGray.700`
  return (
    <Tab
      {...tabProps}
      color={textColor}
      backgroundColor={`transparent`}
      _hover={{ color: `lightGray.800` }}
      _pressed={{ color: `lightGray.700` }}
      fontWeight={isSelected ? `medium` : `normal`}
      borderBottomWidth="0"
      padding="0.5rem 1rem"
      fontSize="1rem"
    >
      <Circle size="0.375rem" bg={isSelected ? textColor : `transparent`} marginRight={`8px`} />
      {props.children}
    </Tab>
  )
}
export default HeaderTab
