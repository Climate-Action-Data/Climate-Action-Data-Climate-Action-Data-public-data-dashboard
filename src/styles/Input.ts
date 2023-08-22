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
    soloDropdown: {
      field: {
        border: `1px solid`,
        borderColor: `lightGray.200`,
        color: `lightGray.700`,
      },
      element: {
        fill: `lightGray.700`,
      },
    },
    searchInput: {
      field: {
        fontFamily: `body`,
        fontSize: `16px`,
        border: `none`,
        textOverflow: `ellipsis`,
        _focusVisible: { border: `none`, boxShadow: `none!`, outline: `none!` },
        _placeholder: { color: `lightGray.600` },
      },
      element: {
        color: `lightGray.600`,
        cursor: `pointer`,
      },
    },
    yearInput: {
      field: {
        height: `28px`,
        padding: 0,
        _active: { boxShadow: `none` },
        border: `none`,
        borderRadius: 0,
        borderBottom: `solid`,
        borderBottomWidth: `1px`,
        _placeholder: { color: `lightGray.600` },
      },
    },
    white: {
      field: {
        borderRadius: `8px`,
        boxShadow: `2px 2px 8px 0px #0000001A`,
        _active: {
          border: `none`,
        },
        _focusVisible: {
          border: `none !important`,
          boxShadow: `2px 2px 8px 0px #0000001A !important`,
        },
      },
    },
    underlined: {
      field: {
        border: `none`,
        borderRadius: 0,
        borderBottomWidth: `1px`,
        borderBottomStyle: `solid`,
        borderBottomColor: `lightGray.400`,

        _focusVisible: {
          outline: `none !important`,
          boxShadow: `none !important`,
          borderRadius: 0,
          borderBottomWidth: `1px`,
          borderBottomStyle: `solid`,
          borderBottomColor: `lightGray.700`,
        },
      },
    },
  },
})
