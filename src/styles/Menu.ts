import { defineStyle } from '@chakra-ui/react'
// define the base component styles
export const menuWhite = defineStyle({
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: `gray.200`,
    _hover: {
      bg: `lightGray.200`,
    },
    _focus: {
      bg: `lightGray.300`,
    },
    _active: {
      bg: `lightGray.300`,
    },
  },
})
