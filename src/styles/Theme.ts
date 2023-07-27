import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

import { brandPrimary, hoverOnly, lightGray, lightGrayRound, lightGrayRound32, whiteSecondary } from '@/styles/Button'
import { cardSection, creditHistoryCardSection } from '@/styles/Section'
import fontSizes from './FontSizes'
import { Text } from './Text'
// import { ellipsis } from './Text'
import { paginationBar } from './PaginationBar'
import { searchTable } from './SearchTable'
import { menuWhite } from './Menu'
import { Aeonik, AeonikFono } from './fonts'

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
    Button: {
      variants: {
        brandPrimary,
        whiteSecondary,
        lightGrayRound,
        lightGray,
        lightGrayRound32,
        hoverOnly,
      },
    },
    Link: {
      variants: {
        brandPrimary,
        whiteSecondary,
      },
    },
    Container: {
      variants: {
        cardSection,
        creditHistoryCardSection,
        paginationBar,
      },
    },
    Menu: {
      variants: {
        menuWhite,
      },
    },
    Text,
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
      300: `##46B1FD`,
      400: `#4299e1`,
      500: `#0075FF`,
      600: `#005ECC`,
      700: `#2a4365`,
      800: `#1A365D`,
      900: `#002F66`,
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
      ...searchTable,
    }),
  },
})

export default theme
