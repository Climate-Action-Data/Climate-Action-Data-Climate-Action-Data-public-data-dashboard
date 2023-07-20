'use client'
import React from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'

import { config } from '@/overmind'
import AppHeader from '@/components/organisms/AppHeader/AppHeader'
import { Menu } from '@/components/organisms/Menu/Menu'
import font from '@/styles/Font'
import theme from '@/styles/Theme'
import NoSSR from './noSSR'

import '../i18n'
import './globals.css'

const overmind = createOvermind(config)
export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <Provider value={overmind}>
      <html lang="en">
        <body className={font.className}>
          <NoSSR>
            <CacheProvider>
              <ChakraProvider theme={theme}>
                <AppHeader />
                <Menu />
                <Flex padding={{ md: 6 }} minHeight="100vh" alignItems="center" justifyContent="space-between" flexDirection="column">
                  {children}
                </Flex>
              </ChakraProvider>
            </CacheProvider>
          </NoSSR>
        </body>
      </html>
    </Provider>
  )
}
