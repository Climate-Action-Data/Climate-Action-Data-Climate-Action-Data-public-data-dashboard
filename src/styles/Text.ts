import { defineStyle } from '@chakra-ui/react'
import { Aeonik } from './fonts'

export const Text = {
  baseStyle: {
    fontSize: `14px`,
  },
  variants: {
    ellipsis: {
      overflowX: `hidden`,
      textOverflow: `ellipsis`,
      whiteSpace: `nowrap`,
    },
  },
}

export const headingAeonik = defineStyle({
  fontFamily: Aeonik.style.fontFamily,
  fontWeight: `500`,
})
