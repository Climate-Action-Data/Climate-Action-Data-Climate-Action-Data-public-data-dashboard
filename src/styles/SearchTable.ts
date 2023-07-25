import { defineStyle } from '@chakra-ui/react'

export const searchTable = defineStyle({
  '.searchTable': {
    backgroundColor: `white`,
    overflow: `unset`,
    thead: {
      //   padding: `16px`,
      backgroundColor: `white`,
      verticalAlign: `bottom`,
      fontWeight: 500,
      h: `72px`,
      minH: `72px`,
      padding: `0px 40px 0px 8px`,
      border: `0px 0px 2px 0px`,
      borderBottom: `2px solid #4D5C62`,
      background: `linear-gradient(0deg, #FFFFFF, #FFFFFF);linear-gradient(0deg, #4D5C62, #4D5C62);`,
      th: {
        // backgroundColor: `white`,
        fontFamily: `sans-serif`,
        height: `72px`,
        fontSize: `14px`,
        lineHeight: `20px`,
        textTransform: `uppercase`,
        border: 0,
      },
    },
    td: {
      minW: `200px`,
      maxW: `200px`,
      textOverflow: `ellipsis`,
      overflow: `hidden`,
      whiteSpace: `nowrap`,
      fontSize: `14px`,
      lineHeight: `20px`,
      fontWeight: 400,
      h: `93px`,
      maxH: `93px`,
      color: `#4D5C62`,
    },
    '#table': {
      th: {
        minW: `200px`,
        maxW: `200px`,
        wordWrap: `break-word`,
        whiteSpace: `break-spaces`,
      },
    },
  },
})
