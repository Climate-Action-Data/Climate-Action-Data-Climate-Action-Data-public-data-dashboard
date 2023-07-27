import { defineStyle } from '@chakra-ui/react'

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
          lineHeight: `20px`,
          textTransform: `uppercase`,
          border: 0,
          div: {
            lineHeight: `20px`,
            gap: `4px`,
            display: `flex`,
            alignItems: `end`,
          },
        },
      },
    },
    '.hoverGreen': {
      backgroundColor: `green.50`,
      cursor: `pointer`,
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
