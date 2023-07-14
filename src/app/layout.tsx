'use client'
import React from 'react'
import { Inter } from 'next/font/google'
import { Provider } from 'overmind-react'
import { config } from '../overmind'
const overmind = createOvermind(config)
import './globals.css'
import { createOvermind } from 'overmind'
import NoSSR from './noSSR'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Header } from '../components/organisms/Header/Header'
import { brandPrimary } from '@/styles/Button'
import { Menu } from '@/components/organisms/Menu/Menu'
import { mode } from '@chakra-ui/theme-tools'
import { cardSection } from '@/styles/Section'
import styles from './page.module.css'
import '../i18n'
/*eslint @typescript-eslint/quotes: off*/
const inter = Inter({ subsets: [`latin`] })

const theme = extendTheme({
  components: {
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
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(`#F8FAFA`, `#000`)(props),
      },
    }),
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <Provider value={overmind}>
      <html lang="en">
        <body className={inter.className}>
          <NoSSR>
            <CacheProvider>
              <ChakraProvider theme={theme}>
                <Header />
                <Menu />
                <main className={styles.main}>{children}</main>
              </ChakraProvider>
            </CacheProvider>
          </NoSSR>
        </body>
      </html>
    </Provider>
  )
}
