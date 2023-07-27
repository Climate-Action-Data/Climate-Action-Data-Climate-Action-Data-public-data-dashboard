import { defineStyle } from '@chakra-ui/react'

export const paginationBar = defineStyle({
  boxShadow: `-2px -2px 8px 0px #0000001A;`,
  minW: `100%`,
  height: `48px`,
  margin: 0,
  position: `fixed`,
  bottom: 0,
  left: 0,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
  backgroundColor: `white`,
  padding: [0, `4px`],
})
