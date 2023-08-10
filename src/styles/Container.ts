import { defineStyle } from '@chakra-ui/react'

export const homeFilterAndSearchWrapper = defineStyle({
  color: `lightGray.700`,
  boxShadow: `2px 2px 8px 0px #0000001A;`,
  minHeight: `min-content`,
  borderRadius: `12px`,
  background: `#FFFFFF`,
  padding: `16px`,
  marginX: `auto`,
  width: [`100%`, null, null, `min-content`],
  maxWidth: `unset`,
})

export const resultsPageFilterAndSearchWrapper = defineStyle({
  height: `40px`,
  borderRadius: `4px`,
  background: `lightGray.900`,
  padding: 0,
  width: `100%`,
  maxWidth: `unset`,
})
