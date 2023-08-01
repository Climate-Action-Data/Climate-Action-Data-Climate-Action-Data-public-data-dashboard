import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

import {
  accentPrimary32,
  brandPrimary,
  dropdownSelected,
  dropdownUnselected,
  hoverOnly,
  lightGray,
  lightGrayRound,
  lightGrayRound32,
  textLink,
  whiteSecondary,
} from '@/styles/Button'
import { Aeonik, AeonikFono } from '@/styles/fonts'
import { Checkbox } from '@/styles/Checkbox'
import { cardSection, filterCardSection } from '@/styles/Section'
import fontSizes from './FontSizes'
import { Text } from './Text'
import { Input } from '@/styles/Input'
import { paginationBar } from './PaginationBar'
import { searchTable } from './SearchTable'
import { menuWhite } from './Menu'
import { statMain } from './Stat'

const theme = extendTheme({
  fontSizes: fontSizes,
  fonts: {
    body: Aeonik.style.fontFamily,
    heading: AeonikFono.style.fontFamily,
    table: Aeonik.style.fontFamily,
  },
  components: {
    Skeleton: {
      baseStyle: {
        _light: {
          '--skeleton-start-color': `#717D81`,
          '--skeleton-end-color': `#949DA1`,
        },
        _dark: {
          '--skeleton-start-color': `#717D81`,
          '--skeleton-end-color': `#949DA1`,
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: `lightGray.400`,
      },
    },
    Button: {
      variants: {
        brandPrimary,
        whiteSecondary,
        lightGrayRound,
        lightGray,
        lightGrayRound32,
        hoverOnly,
        accentPrimary32,
        textLink,
        dropdownUnselected,
        dropdownSelected,
      },
    },
    Stat: {
      variants: {
        statMain,
      },
    },
    Link: {
      variants: {
        brandPrimary,
        whiteSecondary,
        accentPrimary32,
      },
    },
    Container: {
      variants: {
        cardSection,
        paginationBar,
        filterCardSection,
      },
    },
    Menu: {
      variants: {
        menuWhite,
      },
    },
    Text,
    Checkbox,
    Input,
  },
  colors: {
    lightGray: {
      main: `#00242C`,
      50: `#F8FAFA`,
      100: `#EDEFFE`,
      200: `#DBDEE0`,
      300: `#CACED0`,
      400: `#B8BEC0`,
      500: `#949DA1`,
      600: `#717D81`,
      700: `#4D5C62`,
      800: `#3E4A4E`,
      900: `#2E373B`,
    },
    gray: {
      main: `#00242C`,
      50: `#`,
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
    blue: {
      main: `#0075FF`,
      50: `#ebf8ff`,
      100: `#bee3f8`,
      200: `#90cdf4`,
      300: `#46B1FD`,
      400: `#4299e1`,
      500: `#0075FF`,
      600: `#005ECC`,
      700: `#2a4365`,
      800: `#1A365D`,
      900: `#002F66`,
    },
    red: {
      main: `#FF5C53`,
      50: `#FFE9E8`,
      100: `#FFE9E8`,
      200: `#FF5C53`,
      300: `#CC4A42`,
      400: `#993732`,
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(`#F8FAFA`, `#000`)(props),
      },
      '.fixed': {
        position: `fixed`,
        top: `240px`,
        width: `100%`,
        display: `inherit`,
        tr: {
          overflowX: `scroll`,
          maxWidth: [`calc(100vw - 184px)`, `calc(100vw - 552px)`],
          display: `flex`,
          th: {
            display: `flex`,
            alignItems: `end`,
          },
        },
      },
      ' .hide-scrollbar::-webkit-scrollbar': { height: 0 },
      '.hide-scrollbar': {
        scrollbarWidth: `thin`,
        scrollbarColor: `transparent transparent`,
        '&::-webkit-scrollbar': {
          width: `1px`,
        },
        '&::-webkit-scrollbar-track': {
          background: `transparent`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `transparent`,
        },
      },
      ':focus-visible, [data-focus-visible]': {
        borderColor: `green.700 !important`,
        boxShadow: `0 0 0 1px var(--chakra-colors-green-800) !important`,
      },
      '.datepicker-calendar > div ': {
        border: `none`,
        boxShadow: `2px 2px 8px 0px #0000001A;`,
      },

      ...searchTable,
    }),
  },
})

export default theme
