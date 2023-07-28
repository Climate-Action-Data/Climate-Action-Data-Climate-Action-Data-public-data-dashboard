import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const helpers = createMultiStyleConfigHelpers([`addon`, `field`, `element`])

export const Input = helpers.defineMultiStyleConfig({
  variants: {
    autoCompleteCheckboxTextInput: {
      field: {
        border: `none`,
        borderRadius: 0,
        padding: 0,
        height: `20px`,
        fontSize: `14px`,
        color: `lightGray.700`,
        focusBorderColor: `focusBorderColor`,
        _highlighted: { border: `none` },
        _selected: { border: `none` },
      },
    },
  },
})
