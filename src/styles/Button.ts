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
  minH: `26px`,
  maxH: `26px`,
  minW: `26px`,
  maxW: `26px`,
  borderRadius: `50%`,
  _hover: {
    background: `lightGray.100`,
  },
  _active: {
    background: `lightGray.200`,
  },
})

export const lightGrayRound32 = defineStyle({
  background: `transparent`,
  color: `black`,
  minH: [`24px`, `32px`],
  maxH: [`24px`, `32px`],
  minW: [`24px`, `32px`],
  fontWeight: 500,
  maxW: [`24px`, `32px`],
  borderRadius: `50%`,
  fontSize: [`md`, `md`],
  padding: [`0`, `2px`],
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
export const hoverOnly = defineStyle({
  background: `transparent`,
  color: `gray.800`,
  weight: `500`,
  padding: `8px`,
  display: `inline`,
  lineHeight: `20px`,
  borderRadius: `40px`,
  _hover: {
    background: `lightGray.100`,
  },
  _active: {
    background: `lightGray.200`,
  },
})
