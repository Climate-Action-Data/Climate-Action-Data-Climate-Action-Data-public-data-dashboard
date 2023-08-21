import { defineStyle } from '@chakra-ui/react'
// define the base component styles
export const menuWhite = defineStyle({
  list: {
    border: 0,
    boxShadow: `2px 2px 8px 0px #0000001A`,
  },
  item: {
    height: `40px`,
    padding: `8px 16px 8px 16px`,
    gap: `8px`,
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

export const menuDark = defineStyle({
  list: {
    border: 0,
    boxShadow: `2px 2px 8px 0px #0000001A`,
    backgroundColor: `#1F2527`,
  },
  divider: {
    borderColor: `lightGray.100`,
  },
  item: {
    backgroundColor: `#1F2527`,
    height: `40px`,
    padding: `8px 16px 8px 16px`,
    gap: `8px`,
    color: `lightGray.200`,
    _hover: {
      bg: `gray.200`,
    },
    _focus: {
      bg: `gray.300`,
    },
    _active: {
      bg: `gray.300`,
    },
  },
})
