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
  display: `inline-flex`,
  lineHeight: `20px`,
  borderRadius: `40px`,
  _hover: {
    background: `lightGray.100`,
  },
  _active: {
    background: `lightGray.200`,
  },
})

export const hoverOnlyNoBold = defineStyle({
  ...hoverOnly,
  fontWeight: `normal`,
  padding: `6px 12px`,
  _hover: {
    background: `gray.50`,
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
    color: `white`,
  },
  _active: {
    background: `gray.200`,
  },
})

export const green = defineStyle({
  background: `green.300`,
  color: `black`,
  padding: `6px 12px`,
  borderRadius: `32px`,
  height: `32px`,
  gap: `4px`,
  fontSize: `14px`,
  fontWeight: 500,
  _hover: {
    background: `green.600`,
    color: `white`,
  },
  _active: {
    background: `green.700`,
    color: `white`,
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

export const underlinedLink = defineStyle({
  background: `transparent`,
  color: `gray.100`,
  fontWeight: `400`,
  textDecoration: `underline`,
  height: `auto`,
  padding: `0`,
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
  fontWeight: `500`,
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
})

export const dropdownSelected = defineStyle({
  width: [`100%`, null, null, `140px`, `176px`],
  backgroundColor: `#EAFDF2`,
  _hover: { backgroundColor: `#D5FBE5` },
})

export const dropdownUnselectedDark = defineStyle({
  width: [`100%`, null, null, `calc((100vw - 32px)/7)`],
  backgroundColor: `transparent`,
  margin: 0,
  color: `lightGray.50`,
  _hover: { backgroundColor: `lightGray.800` },
})

export const dropdownSelectedDark = defineStyle({
  width: [`100%`, null, null, `calc((100vw - 32px)/7)`],
  backgroundColor: `green.900`,
  _hover: { backgroundColor: `lightGray.800` },
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

export const blueOutline = defineStyle({
  height: `32px`,
  padding: `4px 12px 4px 12px`,
  borderRadius: `32px`,
  border: `1px solid`,
  borderColor: `gray.900`,
  color: `gray.900`,
  fontSize: `14px`,
  lineHeight: `20px`,
  fontWeight: 500,
  _hover: {
    backgroundColor: `gray.50`,
    textDecoration: `none`,
  },
  _active: {
    backgroundColor: `lightGray.200`,
  },
})

export const blueFilled = defineStyle({
  ...blueOutline,
  background: `gray.900`,
  color: `white`,
  _hover: {
    background: `gray.200`,
  },
  _active: {
    background: `lightGray.700`,
  },
})

export const redOutline = defineStyle({
  ...blueOutline,
  borderColor: `red.400`,
  color: `red.400`,
  fontSize: `14px`,
  lineHeight: `20px`,
  fontWeight: 500,
  _hover: {
    backgroundColor: `gray.50`,
    textDecoration: `none`,
  },
  _active: {
    backgroundColor: `lightGray.200`,
  },
})

export const redFilled = defineStyle({
  ...blueOutline,
  borderColor: `red.400`,
  background: `red.400`,
  color: `white`,
  _hover: {
    background: `red.700`,
  },
  _active: {
    background: `red.800`,
  },
})

export const modalClose = defineStyle({
  backgroundColor: `transparent`,
  color: `lightGray.700`,
  textTransform: `uppercase`,
  height: `32px`,
  lineHeight: `20px`,
  fontWeight: 500,
  borderRadius: `32px`,
  _active: {
    background: `gray.50`,
  },
})

export const toastButton = defineStyle({
  background: `transparent`,
  weight: `500`,
  padding: `8px`,
  display: `inline`,
  lineHeight: `20px`,
  _hover: {
    background: `transparent`,
  },
  _active: {
    background: `transparent`,
  },
})

export const dropdown = defineStyle({
  minWidth: `200px`,
  backgroundColor: `white`,
  boxShadow: `2px 2px 8px 0px #0000001A`,
  padding: `8px, 4px, 8px, 8px`,
  borderRadius: `4px`,
  minHeight: `40px`,
  fontWeight: `400`,
})
