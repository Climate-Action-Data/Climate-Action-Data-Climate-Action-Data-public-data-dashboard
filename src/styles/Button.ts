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

export const accentPrimary32 = defineStyle({
  background: `#2DEC7C`,
  color: `black`,
  padding: `6px 14px`,
  borderRadius: `32px`,
  fontSize: `16px`,
  fontWeight: `medium`,
  _hover: {
    background: `gray.200`,
  },
  _active: {
    background: `gray.200`,
  },
})

export const textLink = defineStyle({
  color: `black`,
  padding: 0,
  borderRadius: 0,
  fontSize: `14px`,
  fontWeight: `normal`,
  height: `min-content`,
  _hover: {
    color: `#005ECC`,
  },
  _active: {
    color: `#002F66`,
  },
})

export const blueLink = defineStyle({
  color: `blue.500`,
  _hover: {
    color: `blue.600`,
  },
  _active: {
    color: `blue.700`,
  },
})

export const blackLink = defineStyle({
  background: `transparent`,
  color: `gray.800`,
  padding: `6px, 12px, 6px, 12px`,
  borderRadius: `32px`,
  weight: `500`,
  textDecoration: `underline`,
  _hover: {
    background: `gray.50`,
  },
  _active: {
    background: `lightGray.200`,
  },
})

export const dropdownUnselected = defineStyle({
  width: [`100%`, null, null, `140px`, `176px`],
  backgroundColor: `white`,
  color: `lightGray.700`,
  _hover: { backgroundColor: `gray.50` },
  _active: { backgroundColor: `#DBDEE0` },
})

export const dropdownSelected = defineStyle({
  width: [`100%`, null, null, `140px`, `176px`],
  backgroundColor: `#EAFDF2`,
  _hover: { backgroundColor: `#D5FBE5` },
  _active: { backgroundColor: `#EAFDF2` },
})

export const calendarNavigation = defineStyle({
  borderRadius: `50%`,
  backgroundColor: `transparent`,
  boxSize: `48px`,
})

export const calendarAction = defineStyle({
  color: `#00242C`,
  padding: `10px 12px`,
  borderRadius: 0,
  fontSize: `14px`,
  fontWeight: `normal`,
  height: `min-content`,
  _hover: {
    color: `#005ECC`,
  },
  _active: {
    color: `#002F66`,
  },
})

export const calendarDate = defineStyle({
  _hover: { color: `white`, backgroundColor: `lightGray.800` },
  boxSize: `40px`,
  fontSize: `16px`,
  fontFamily: `body`,
  fontWeight: `normal`,
  borderRadius: `50%`,
})
