import { defineStyle } from '@chakra-ui/react'

export const brandPrimary = defineStyle({
  background: `gray.300`,
  color: `white`,
  height: `56px`,
  width: `56px`,
  borderRadius: `8px`,
  _hover: {
    background: `gray.200`,
  },
  _active: {
    background: `gray.200`,
  },
})

export const whiteSecondary = defineStyle({
  background: `transparent`,
  color: `white`,
  fontSize: `14px`,
  padding: `6px 12px`,
  textDecoration: `none`,
  width: `max-content`,
  borderColor: `white`,
  borderWidth: `1px`,
  borderRadius: `32px`,
  _hover: {
    background: `gray.50`,
    textDecoration: `none`,
  },
  _active: {
    background: `#4D5C62`,
    textDecoration: `none`,
  },
})

export const lightGrayRound = defineStyle({
  background: `transparent`,
  color: `black`,
  minHeight: `26px`,
  minWidth: `26px`,
  borderRadius: `50%`,
  _hover: {
    background: `lightGray.100`,
  },
  _active: {
    background: `lightGray.200`,
  },
})

export const lightGray = defineStyle({
  background: `transparent`,
  color: `black`,
  _hover: {
    background: `lightGray.100`,
  },
  _active: {
    background: `lightGray.200`,
  },
})
