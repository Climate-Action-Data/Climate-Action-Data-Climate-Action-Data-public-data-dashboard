import { defineStyle } from '@chakra-ui/react'

export const watchlist = defineStyle({
  container: {
    _before: {
      content: `""`,
      display: `block`,
      position: `absolute`,
      borderLeftRadius: `12px`,
      left: 0,
      top: 0,
      height: `100%`,
      width: `10px`,
      backgroundColor: `green.600`,
    },
    minH: `120px`,
    padding: `32px 40px 32px 40px`,
    boxShadow: `2px 2px 8px 0px #0000001A`,
    borderRadius: `12px`,
  },
  body: {
    display: `flex`,
    alignContent: `center`,
  },
})
