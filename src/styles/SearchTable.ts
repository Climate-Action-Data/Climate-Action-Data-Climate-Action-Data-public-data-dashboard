import { defineStyle } from '@chakra-ui/react'
import { Aeonik } from './fonts'

export const searchTable = defineStyle({
  '.searchTable': {
    backgroundColor: `white`,
    overflow: `unset`,
    thead: {
      backgroundColor: `white`,
      verticalAlign: `bottom`,
      fontWeight: 500,
      h: `72px`,
      minH: `72px`,
      padding: `0px 40px 0px 8px`,
      border: `0px 0px 2px 0px`,
      borderBottom: `2px solid #4D5C62`,
      background: `linear-gradient(0deg, #FFFFFF, #FFFFFF);linear-gradient(0deg, #4D5C62, #4D5C62);`,
      tr: {
        th: {
          h: `70px`,
          maxH: `70px`,
          fontSize: [`12px`, `14px`],
          fontWeight: 500,
          lineHeight: `20px`,
          color: `lightGray.700`,
          fontFamily: Aeonik.style.fontFamily,
          textTransform: `uppercase`,
          border: 0,
          '>div': {
            lineHeight: `20px`,
            gap: `4px`,
            display: `flex`,
            alignItems: `end`,
            whiteSpace: `pre-wrap`,
          },
        },
      },
    },
    '.hoverGreen': {
      backgroundColor: `green.50`,
      cursor: `pointer`,
    },
    tr: {
      border: `none`,
    },
    td: {
      minW: [`184px`, `200px`],
      maxW: [`184px`, `200px`],
      textOverflow: `ellipsis`,
      overflow: `hidden`,
      whiteSpace: `nowrap`,
      fontSize: `14px`,
      lineHeight: `20px`,
      fontWeight: 400,
      h: `93px`,
      maxH: `93px`,
      color: `#4D5C62`,
      padding: [`8px 12px`, `16px 24px`],
      p: {
        textOverflow: `ellipsis`,
        overflow: `hidden`,
      },
      borderColor: `lightGray.400`,
    },

    'td[data-is-numeric="true"]': {
      paddingRight: `48px`,
    },
    '#table': {
      th: {
        minW: [`184px`, `200px`],
        maxW: [`184px`, `200px`],
        wordWrap: `break-word`,
        whiteSpace: `break-spaces`,
      },
    },
  },
})

export const searchTableSmall = defineStyle({
  '.searchTableSmall': {
    ...searchTable[`.searchTable`],
    td: {
      minW: [`100px`, `120px`],
      maxW: [`100px`, `120px`],
    },
    th: {
      minW: [`100px`, `120px`],
      maxW: [`100px`, `120px`],
    },
  },
})
