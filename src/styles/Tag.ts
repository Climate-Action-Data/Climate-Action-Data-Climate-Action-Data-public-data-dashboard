import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const helpers = createMultiStyleConfigHelpers([`container`, `label`, `closeButton`])

const selected = helpers.definePartsStyle({
  container: {
    color: `white`,
    backgroundColor: `#00242C`,
    _hover: {
      backgroundColor: `#3E4A4E`,
    },
  },
})

const notSelected = helpers.definePartsStyle({
  container: {
    color: `#4D5C62`,
    backgroundColor: `transparent`,
    _hover: {
      backgroundColor: `#DBDEE0`,
    },
  },
})

export const tagTheme = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      cursor: `pointer`,
      borderRadius: `32px`,
      padding: `6px 12p`,
    },
  },
  variants: { selected, notSelected },
})
