import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const helpers = createMultiStyleConfigHelpers([`control`, `icon`, `container`, `label`])

export const Checkbox = helpers.defineMultiStyleConfig({
  baseStyle: {
    control: defineStyle({
      borderColor: `lightGray.700`,
      borderRadius: `4px`,
      borderWidth: `1px`,
      backgroundColor: `transparent`,
      size: `20px`,
      _hover: { borderColor: `black`, backgroundColor: `transparent` },
      _checked: { borderColor: `black`, backgroundColor: `black`, _hover: { borderColor: `black`, backgroundColor: `black` } },
      _indeterminate: { borderColor: `black`, backgroundColor: `black`, _hover: { borderColor: `black`, backgroundColor: `black` } },
    }),
    container: defineStyle({ alignItems: `center` }),
    label: defineStyle({
      color: `lightGray.700`,
      fontFamily: `aeonik`,
    }),
  },
})
