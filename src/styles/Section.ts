import { defineStyle } from '@chakra-ui/react'

export const cardSection = defineStyle({
  color: `black`,
  boxShadow: `2px 2px 8px 0px #0000001A;`,
  minHeight: `680px`,
  borderRadius: `12px`,
  background: `#FFFFFF`,
  margin: `0 24px`,
  maxW: `unset`,
  padding: [0, `1rem`],
})

export const cardSectionNoMargin = defineStyle({
  ...cardSection,
  minHeight: `min-content`,
  margin: `0`,
})

export const cardSectionNoMarginNoPadding = defineStyle({
  ...cardSectionNoMargin,
  padding: `0`,
})

export const filterCardSection = defineStyle({
  color: `black`,
  boxShadow: `2px 2px 8px 0px #0000001A;`,
  minHeight: `min-content`,
  borderRadius: `12px`,
  background: `#FFFFFF`,
  margin: `0 24px`,
  maxW: `unset`,
  padding: [0, `1rem`],
})
