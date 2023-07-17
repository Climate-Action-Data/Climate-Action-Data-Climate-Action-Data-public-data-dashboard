import { extendTheme } from '@chakra-ui/react'

import { mode } from '@chakra-ui/theme-tools'
import { brandPrimary } from '@/styles/components/Button'
import { cardSection } from '@/styles/components/Section'
import { Text } from '../components/Text'

export const theme = extendTheme({
  components: {
    Text,
    Button: {
      variants: {
        brandPrimary,
      },
    },
    Link: {
      variants: {
        brandPrimary,
      },
    },
    Container: {
      variants: {
        cardSection,
      },
    },
  },
  colors: {
    gray: {
      main: `#00242C`,
      50: `#3E4A4E`,
      100: `#3E4A4E`,
      200: `#3E4A4E`,
      300: `#2E373B`,
      400: `#2E373B`,
      500: `#00242C`,
      600: `#00242C`,
      700: `#00242C`,
      800: `#00242C`,
      900: `#00242C`,
    },
    green: {
      main: `#2DEC7C`,
      50: `#EAFDF2`,
      100: `#D5FBE5`,
      200: `#2DEC7C`,
      300: `#2DEC7C`,
      400: `#2DEC7C`,
      500: `#2DEC7C`,
      600: `#24BD63`,
      700: `#1B8E4A`,
      800: `#125E32`,
      900: `#364D3F`,
    },
    charcoal: {
      100: `#F8FAFA`,
      200: `#EDEFEF`,
      300: `#DBDEE0`,
      400: `#CACED0`,
      500: `#B8BEC0`,
      600: `#949DA1`,
      700: `#717D81`,
      800: `#4D5C62`,
      900: `#3E4A4E`,
      1000: `#2E373B`,
      1100: `#1F2527`,
      1200: `#171C1D`,
      1300: `#0F1214`,
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(`#F8FAFA`, `#000`)(props),
      },
    }),
  },
  fonts: {},
})
