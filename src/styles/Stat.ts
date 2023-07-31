import { defineStyle } from '@chakra-ui/react'

export const statMain = defineStyle({
  number: {
    'p:first-child': {
      fontWeight: `medium`,
      display: `inline`,
      fontSize: [`40px`, null, `64px`],
    },
    'p:last-child': {
      paddingLeft: `8px`,
      fontWeight: `normal`,
      display: `inline`,
      fontSize: [`16px`, null, `24px`],
    },
  },
  label: {
    fontSize: [`16px`, null, `20px`],
    color: `gray.800`,
  },
})
